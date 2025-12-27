import * as admin from 'firebase-admin';
import * as path from 'path';

admin.initializeApp({
    credential: admin.credential.cert(path.join(__dirname, '..', 'service-account.json'))
});

async function checkStatus() {
    const db = admin.firestore();
    const doc = await db.doc('bot_status/current').get();
    console.log('=== bot_status/current ===');
    console.log(JSON.stringify(doc.data(), null, 2));
    process.exit(0);
}

checkStatus();
