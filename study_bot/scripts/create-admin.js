/**
 * Script to create admin user document in Firestore
 * 
 * Usage:
 * node scripts/create-admin.js YOUR_AUTH_UID
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, '..', 'service-account.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id
});

const db = admin.firestore();

async function createAdminUser(uid) {
    if (!uid) {
        console.error('❌ Error: UID is required!');
        console.log('\nUsage: node scripts/create-admin.js YOUR_AUTH_UID');
        console.log('\nTo get your UID:');
        console.log('1. Log in at http://localhost:5174/admin/login');
        console.log('2. Open DevTools Console');
        console.log('3. Run: firebase.auth().currentUser.uid');
        process.exit(1);
    }

    try {
        // Get user info from Auth
        const userRecord = await admin.auth().getUser(uid);

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📝 Creating admin user document...');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('UID:', uid);
        console.log('Email:', userRecord.email);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        // Create admin document
        await db.collection('admins').doc(uid).set({
            isAdmin: true,
            email: userRecord.email,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            displayName: userRecord.displayName || null,
            photoURL: userRecord.photoURL || null
        });

        console.log('✅ Admin user created successfully!');
        console.log('\nYou can now:');
        console.log('1. Deploy Firestore rules: firebase deploy --only firestore:rules');
        console.log('2. Test admin access in /admin dashboard');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);

        if (error.code === 'auth/user-not-found') {
            console.log('\n⚠️  User not found in Firebase Authentication!');
            console.log('Make sure you have logged in at least once.');
        }

        process.exit(1);
    }
}

// Get UID from command line args
const uid = process.argv[2];
createAdminUser(uid);
