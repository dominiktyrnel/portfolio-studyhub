# Quick Start Guide

## Get Running in 15 Minutes

**Goal**: Local development environment up and running  
**Time**: ~15 minutes  
**Prerequisites**: Node.js 20+, Git

---

## Step 1: Clone & Install (3 min)

```bash
# Clone repository
git clone https://github.com/animat12356/personal_site.git
cd personal_site

# Install dependencies
npm install

# Install Cloud Functions dependencies (optional)
cd functions && npm install && cd ..
```

---

## Step 2: Environment Setup (5 min)

### Create `.env.development`

```bash
# In project root
cp .env.example .env.development
```

### Edit `.env.development` with Firebase credentials:

```env
# Firebase Config
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# Sentry (optional - set to empty to disable)
VITE_SENTRY_DSN=

# Emulators (optional - set to true to use local Firebase)
VITE_FIREBASE_USE_EMULATORS=false
```

**Where to get Firebase config?**

1. Go to https://console.firebase.google.com
2. Select project → Project Settings (gear icon)
3. Scroll to "Your apps" → Web app → Config object

---

## Step 3: Start Development Server (1 min)

```bash
npm run dev
```

**Expected output:**

```
  VITE v7.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open http://localhost:5173 - you should see the CV homepage.

**Key Routes to Verify**:

- CV: `/`
- Study Hub: `/study/now`
- User Profile: `/study/profile` (requires auth)
- Admin: `/admin/login`

---

## Step 4: Verify Setup (3 min)

### Test Routes

- **CV Homepage**: http://localhost:5173/
- **Study Hub**: http://localhost:5173/study/now
- **Admin Login**: http://localhost:5173/admin/login

### Check Console

Open browser DevTools → Console. You should see:

```
[SW] Service Worker registered: ...
Firebase initialized
```

**Warnings are OK** (e.g., meta tag deprecation). **Errors** mean something's wrong.

---

## Step 5: Create Admin User (Optional, 3 min)

To access `/admin`:

### 1. Enable Email/Password Auth in Firebase Console

1. Firebase Console → Authentication → Sign-in method
2. Enable "Email/Password"

### 2. Create User

```bash
# Option A: Firebase Console
# Authentication → Users → Add user
# Email: your@email.com
# Password: your_password

# Option B: Using Firebase CLI
firebase auth:import users.json --hash-algo=scrypt
```

### 3. Add Admin Permission

```bash
# Firestore Console → Create collection
# Collection: admins
# Document ID: <your_user_uid>
# Field: isAdmin = true (boolean)
```

### 4. Login

1. Go to http://localhost:5173/admin/login
2. Enter email/password
3. Should redirect to `/admin` dashboard

---

## Common Issues

### Port 5173 already in use

```bash
# Kill process on port
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill
```

### Firebase connection errors

- Check `.env.development` values
- Verify Firebase project exists
- Check Firestore rules allow read access

### "Cannot find module" errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

- **Understand architecture**: [VISION.md](./VISION.md)
- **Data model**: [DATA_MODEL.md](./DATA_MODEL.md)
- **Bot integration**: [BOT.md](./BOT.md)

---

**You are in**: `docs/QUICKSTART.md`  
**Time to complete**: ~15 minutes  
**Status**: Ready for development ✅
