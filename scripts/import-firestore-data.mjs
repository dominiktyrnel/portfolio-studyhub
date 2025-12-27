import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
const db = getFirestore(app);

// Convert Firestore export timestamp format to Date
function convertTimestamps(obj) {
    if (!obj || typeof obj !== 'object') return obj;

    if (obj.__datatype__ === 'timestamp') {
        return new Date(obj.value._seconds * 1000);
    }

    if (Array.isArray(obj)) {
        return obj.map(convertTimestamps);
    }

    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        result[key] = convertTimestamps(value);
    }
    return result;
}

async function importCollection(collectionName, jsonPath) {
    console.log(`\n📥 Importing ${collectionName}...`);

    const fullPath = join(__dirname, '..', jsonPath);
    const rawData = readFileSync(fullPath, 'utf8');
    const data = JSON.parse(rawData);

    let count = 0;
    for (const [docId, docData] of Object.entries(data)) {
        const processedData = convertTimestamps(docData);
        await setDoc(doc(db, collectionName, docId), processedData);
        count++;
        console.log(`  ✓ ${docId}`);
    }

    console.log(`✅ ${collectionName}: ${count} documents imported`);
}

async function main() {
    console.log('🌱 Starting Firestore import...\n');

    try {
        await importCollection('faq_items', 'firestore-import/faq_items/all_namespaces_all_kinds.export_metadata');
        await importCollection('daily_stats', 'firestore-import/daily_stats/all_namespaces_all_kinds.export_metadata');
        await importCollection('study_plan', 'firestore-import/study_plan/all_namespaces_all_kinds.export_metadata');

        console.log('\n🎉 All data imported successfully!');
        console.log('\nVerify at: https://dominik-tyrnel.web.app/study/faq');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Import failed:', error.message);
        console.error('\nFull error:', error);
        process.exit(1);
    }
}

main();
