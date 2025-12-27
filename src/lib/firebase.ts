import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, type Auth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, type Firestore } from "firebase/firestore";
import { getStorage, connectStorageEmulator, type FirebaseStorage } from "firebase/storage";
import { logger } from '../utils/logger';

// Check for critical config availability
const isFirebaseConfigured = () => {
    return !!(
        import.meta.env.VITE_FIREBASE_API_KEY &&
        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
        import.meta.env.VITE_FIREBASE_PROJECT_ID
    );
};

export const firebaseEnabled = isFirebaseConfigured();

if (!firebaseEnabled) {
    logger.warn("[Firebase] Missing env vars. App will run in fallback mode.");
}

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

if (firebaseEnabled) {
    try {
        app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);

        // **Firebase Emulator Support for Development**
        // Auto-connect to emulators if VITE_FIREBASE_USE_EMULATORS is set
        if (import.meta.env.VITE_FIREBASE_USE_EMULATORS === 'true') {
            logger.log('[Firebase] Connecting to emulators...');

            try {
                // Auth Emulator (port 9099)
                connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
                logger.log('[Firebase] ✅ Auth Emulator connected');
            } catch {
                logger.warn('[Firebase] Auth Emulator already connected');
            }

            try {
                // Firestore Emulator (port 8080)
                connectFirestoreEmulator(db, 'localhost', 8080);
                logger.log('[Firebase] ✅ Firestore Emulator connected');
            } catch {
                logger.warn('[Firebase] Firestore Emulator already connected');
            }

            try {
                // Storage Emulator (port 9199)
                connectStorageEmulator(storage, 'localhost', 9199);
                logger.log('[Firebase] ✅ Storage Emulator connected');
            } catch {
                logger.warn('[Firebase] Storage Emulator already connected');
            }
        }
    } catch (e) {
        logger.error(e instanceof Error ? e : new Error(`Firebase init failed: ${String(e)}`));
    }
}

export { app, auth, db, storage };

// Admin UID Whitelist - filtered to prevent [undefined] if env var not set
export const ADMIN_UIDS: string[] = import.meta.env.VITE_ADMIN_UID
    ? [import.meta.env.VITE_ADMIN_UID]
    : []; 
