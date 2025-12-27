/**
 * Helper script to get your Firebase Auth UID
 * 
 * Usage:
 * 1. Make sure you're logged into the admin panel at http://localhost:5174/admin
 * 2. Open browser DevTools Console
 * 3. Paste this code and press Enter
 */

// Get current user UID
const user = firebase.auth().currentUser;

if (user) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Your Firebase Auth UID:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(user.uid);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:', user.email);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Copy to clipboard (if browser supports it)
    if (navigator.clipboard) {
        navigator.clipboard.writeText(user.uid).then(() => {
            console.log('✅ UID copied to clipboard!');
        });
    }
} else {
    console.error('❌ No user logged in!');
    console.log('Please log in at: http://localhost:5174/admin/login');
}
