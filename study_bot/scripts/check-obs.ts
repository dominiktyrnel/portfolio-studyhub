import * as admin from 'firebase-admin';
import * as path from 'path';

admin.initializeApp({
    credential: admin.credential.cert(path.join(__dirname, '..', 'service-account.json'))
});

async function checkObsPomodoro() {
    const db = admin.firestore();
    const doc = await db.doc('runtime/obsPomodoro').get();
    console.log('=== runtime/obsPomodoro ===');
    console.log(JSON.stringify(doc.data(), null, 2));
    process.exit(0);
}

checkObsPomodoro();
