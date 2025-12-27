/**
 * Reset Bot Status to Offline
 * 
 * Clears test data and sets bot_status/current to offline state.
 * Run this when no bot is running to show correct status on dashboard.
 */

import * as admin from 'firebase-admin';
import * as path from 'path';

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, '..', 'service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath)
});

const db = admin.firestore();

async function resetToOffline() {
    console.log('🔄 Resetting bot status to offline...\n');

    const now = admin.firestore.Timestamp.now();

    // Reset bot_status/current to offline state
    await db.doc('bot_status/current').set({
        schemaVersion: 1,
        
        // Bot is offline
        online: false,
        actualState: 'stopped',
        
        // Stream is offline
        streamOnline: false,
        streamId: null,
        liveChatId: null,
        connectedAt: null,
        
        // Mode is offline
        currentMode: 'Offline',
        phaseStartedAt: null,
        durationSec: null,
        endsAt: null,
        lastUpdatedAt: now,
        
        // Empty timeline
        timelineCompact: [],
        
        // Legacy fields
        mode: 'OFFLINE',
        modeStartedAt: null,
        modeEndsAt: null,
        uptimeSeconds: 0,
        updatedAt: now
    });
    console.log('✅ bot_status/current → OFFLINE');

    // Reset heartbeat
    await db.doc('bot_status/heartbeat').set({
        lastHeartbeat: now,
        uptimeSeconds: 0,
        version: '1.0.0',
        lastError: 'Bot not running'
    });
    console.log('✅ bot_status/heartbeat → reset');

    // Reset stream_stats
    await db.doc('stream_stats/current').set({
        schemaVersion: 1,
        activeUsersLast5minCount: 0,
        chatMessagesCount: 0,
        lastMessageAt: null,
        updatedAt: now
    });
    console.log('✅ stream_stats/current → reset');

    console.log('\n🎉 Done! Dashboard should now show bot as OFFLINE.');
}

resetToOffline()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('❌ Error:', err);
        process.exit(1);
    });
