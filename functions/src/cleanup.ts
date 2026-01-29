/**
 * Firebase Cloud Functions for Study Hub
 * 
 * Scheduled function to cleanup old study events and maintain database hygiene.
 */

import * as functions from 'firebase-functions/v2';
import * as admin from 'firebase-admin';
import type { Request } from 'firebase-functions/v2/https';
import type { Response } from 'express';

// Initialize Firebase Admin
admin.initializeApp();

// ✅ SECURITY: CORS configuration
const ALLOWED_ORIGINS = [
    'https://your-project.web.app',
    'https://your-project.firebaseapp.com',
    'http://localhost:5173', // Dev only
    'http://localhost:4173'  // Preview only
];

/**
 * Cleanup Old Study Events
 * 
 * Scheduled to run every Sunday at 3:00 AM KST (6:00 PM Saturday UTC)
 * Deletes study_sessions and daily_stats older than 90 days
 */
export const cleanupOldEvents = functions.scheduler.onSchedule({
    schedule: '0 18 * * 6', // Every Saturday 18:00 UTC = Sunday 03:00 KST
    timeZone: 'Asia/Seoul',
    region: 'asia-northeast3', // Seoul region
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
}, async (_event) => {
    const db = admin.firestore();
    const now = new Date();
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    console.log(`[Cleanup] Starting cleanup for data older than ${ninetyDaysAgo.toISOString()}`);

    let totalDeleted = 0;

    try {
        // Cleanup study_sessions collection
        const sessionsRef = db.collection('study_sessions');
        const oldSessions = await sessionsRef
            .where('startedAt', '<', ninetyDaysAgo)
            .limit(500) // Batch delete to avoid timeout
            .get();

        if (!oldSessions.empty) {
            const batch = db.batch();
            oldSessions.docs.forEach(doc => {
                batch.delete(doc.ref);
                totalDeleted++;
            });
            await batch.commit();
            console.log(`[Cleanup] Deleted ${oldSessions.size} old study sessions`);
        }

        // Cleanup daily_stats collection
        const statsRef = db.collection('daily_stats');
        const oldStats = await statsRef
            .where('date', '<', ninetyDaysAgo.toISOString().split('T')[0]) // YYYY-MM-DD format
            .limit(500)
            .get();

        if (!oldStats.empty) {
            const batch = db.batch();
            oldStats.docs.forEach(doc => {
                batch.delete(doc.ref);
                totalDeleted++;
            });
            await batch.commit();
            console.log(`[Cleanup] Deleted ${oldStats.size} old daily stats`);
        }

        // Cleanup inbox messages older than 180 days (6 months)
        const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        const inboxRef = db.collection('inbox');
        const oldInbox = await inboxRef
            .where('createdAt', '<', sixMonthsAgo)
            .where('read', '==', true) // Only delete read messages
            .limit(500)
            .get();

        if (!oldInbox.empty) {
            const batch = db.batch();
            oldInbox.docs.forEach(doc => {
                batch.delete(doc.ref);
                totalDeleted++;
            });
            await batch.commit();
            console.log(`[Cleanup] Deleted ${oldInbox.size} old inbox messages`);
        }

        console.log(`[Cleanup] ✅ Successfully deleted ${totalDeleted} total documents`);

    } catch (error) {
        console.error('[Cleanup] ❌ Error during cleanup:', error);
        throw error;
    }
});

/**
 * Manual Cleanup Trigger (HTTP Function for testing)
 * 
 * Usage: Call via HTTP POST to manually trigger cleanup
 * Requires authentication with admin token
 */
export const manualCleanup = functions.https.onRequest({
    region: 'asia-northeast3',
    cors: ALLOWED_ORIGINS,
}, async (req: Request, res: Response) => {
    // CORS is handled automatically via cors option in v2

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    // ✅ SECURITY FIX: Proper authentication with token verification
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith('Bearer ')) {
        res.status(403).send('Unauthorized - No token provided');
        return;
    }

    const idToken = authToken.split('Bearer ')[1];

    try {
        const db = admin.firestore();

        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        // ✅ SECURITY: Rate limiting - 1 request per minute per user
        const rateLimitRef = db.collection('rate_limits').doc(`cleanup_${decodedToken.uid}`);
        const rateLimitDoc = await rateLimitRef.get();

        if (rateLimitDoc.exists) {
            const lastCall = rateLimitDoc.data()?.lastCall?.toMillis() || 0;
            const now = Date.now();
            const timeSinceLastCall = now - lastCall;

            if (timeSinceLastCall < 60000) { // 1 minute
                const waitSeconds = Math.ceil((60000 - timeSinceLastCall) / 1000);
                res.status(429).json({
                    error: 'Rate limit exceeded',
                    retryAfter: waitSeconds,
                    message: `Please wait ${waitSeconds} seconds before calling again`
                });
                return;
            }
        }

        // Update rate limit
        await rateLimitRef.set({
            lastCall: admin.firestore.Timestamp.now(),
            uid: decodedToken.uid
        });

        // Check if user is admin in Firestore
        const adminDoc = await admin.firestore()
            .collection('admins')
            .doc(decodedToken.uid)
            .get();

        if (!adminDoc.exists || !adminDoc.data()?.isAdmin) {
            res.status(403).send('Forbidden - Admin access required');
            return;
        }

        // User is authenticated and is admin - proceed with cleanup
        const now = new Date();
        const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

        let totalDeleted = 0;

        // Cleanup study_sessions collection
        const sessionsRef = db.collection('study_sessions');
        const oldSessions = await sessionsRef
            .where('startedAt', '<', ninetyDaysAgo)
            .limit(500)
            .get();

        if (!oldSessions.empty) {
            const batch = db.batch();
            oldSessions.docs.forEach(doc => {
                batch.delete(doc.ref);
                totalDeleted++;
            });
            await batch.commit();
        }

        // Cleanup daily_stats collection
        const statsRef = db.collection('daily_stats');
        const oldStats = await statsRef
            .where('date', '<', ninetyDaysAgo.toISOString().split('T')[0])
            .limit(500)
            .get();

        if (!oldStats.empty) {
            const batch = db.batch();
            oldStats.docs.forEach(doc => {
                batch.delete(doc.ref);
                totalDeleted++;
            });
            await batch.commit();
        }

        // Cleanup inbox messages older than 180 days
        const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        const inboxRef = db.collection('inbox');
        const oldInbox = await inboxRef
            .where('createdAt', '<', sixMonthsAgo)
            .where('read', '==', true)
            .limit(500)
            .get();

        if (!oldInbox.empty) {
            const batch = db.batch();
            oldInbox.docs.forEach(doc => {
                batch.delete(doc.ref);
                totalDeleted++;
            });
            await batch.commit();
        }

        res.status(200).json({
            success: true,
            deletedCount: totalDeleted,
            executedBy: decodedToken.email || decodedToken.uid,
            timestamp: now.toISOString()
        });
    } catch (error) {
        console.error('[Manual Cleanup] Auth/Execution error:', error);

        // Distinguish between auth errors and execution errors
        if (error instanceof Error) {
            if (error.message.includes('auth')) {
                res.status(403).json({ error: 'Invalid or expired token' });
            } else {
                res.status(500).json({ error: 'Cleanup execution failed', details: error.message });
            }
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});


