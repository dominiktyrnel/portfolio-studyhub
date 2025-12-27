// Quick script to invoke seedstudydata Cloud Function
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, 'asia-northeast3');

async function callSeed() {
    try {
        console.log('🌱 Calling seedstudydata function...\n');

        const seedFunc = httpsCallable(functions, 'seedstudydata');
        const result = await seedFunc();

        console.log('✅ Success!');
        console.log(result.data);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

callSeed();
