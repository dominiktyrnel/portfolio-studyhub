import * as admin from 'firebase-admin';
import * as path from 'path';

// Initialize Firebase Admin SDK
let adminApp: admin.app.App;

try {
    // Try to load service account from file
    const serviceAccountPath = path.join(__dirname, '../../service-account.json');
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- Service account JSON must be loaded via require for Firebase Admin SDK
    const serviceAccount = require(serviceAccountPath);

    adminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    console.log('✅ Firebase Admin SDK initialized');
} catch (error) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', error);
    console.error('Make sure service-account.json exists in study_bot/ directory');
    throw error;
}

// Export Firestore instance
export const adminDb = admin.firestore();

// Export useful Firebase Admin types and utilities
export const Timestamp = admin.firestore.Timestamp;
export const FieldValue = admin.firestore.FieldValue;
export const serverTimestamp = () => admin.firestore.FieldValue.serverTimestamp();

// Export admin app for potential other uses
export { adminApp };
