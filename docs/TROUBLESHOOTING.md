# Troubleshooting Guide

## Common Issues & Solutions

**Purpose**: Quick solutions to frequent problems  
**Last Updated**: December 25, 2024

---

## Table of Contents

1. [Deployment Issues](#deployment-issues)
2. [Build Errors](#build-errors)
3. [Runtime Errors](#runtime-errors)
4. [Firebase Issues](#firebase-issues)
5. [Development Issues](#development-issues)

---

## Deployment Issues

### "Failed to fetch dynamically imported module" After Deploy

**Symptoms**:

- Users see error screen after new deployment
- Error message: `Failed to fetch dynamically imported module: .../StudyLayout-HASH.js`
- Hard refresh (Ctrl+Shift+R) fixes it temporarily

**Root Cause**: Service Worker or browser caching old `index.html` with stale chunk references

**Solutions** (in order):

#### 1. Verify Service Worker (MOST COMMON)

Check `public/sw.js`:

```javascript
// ✅ CORRECT - index.html is NOT in precache
const PRECACHE_ASSETS = [
  "/study/now",
  "/study/plan",
  // ... NO '/index.html' or '/'
];

// ✅ CORRECT - Network-only for index.html
if (url.pathname === "/" || url.pathname === "/index.html") {
  event.respondWith(fetch(request));
  return;
}
```

#### 2. Check Version Detection Script

In `index.html`, verify:

```html
<meta name="app-version" content="__BUILD_TIMESTAMP__" />
<script>
  (function () {
    const current = document.querySelector('meta[name="app-version"]').content;
    const stored = localStorage.getItem("app-version");
    if (stored && stored !== current && stored !== "__BUILD_TIMESTAMP__") {
      localStorage.setItem("app-version", current);
      window.location.reload(true);
    } else {
      localStorage.setItem("app-version", current);
    }
  })();
</script>
```

#### 3. Verify Vite Plugin

In `vite.config.ts`:

```typescript
function injectBuildTimestamp() {
  return {
    name: "inject-build-timestamp",
    transformIndexHtml(html: string) {
      return html.replace("__BUILD_TIMESTAMP__", Date.now().toString());
    },
  };
}

export default defineConfig({
  plugins: [react(), injectBuildTimestamp()],
  // ...
});
```

#### 4. Clear Everything (Nuclear Option)

```bash
# Delete dist and redeploy
rm -rf dist
npm run build
firebase deploy --only hosting

# Tell users to:
# 1. Clear browser cache
# 2. Hard refresh (Ctrl+Shift+R)
```

---

### Users Still See Old Version After Deploy

**Symptoms**: New code deployed but users see old UI

**Cause**: Service Worker cache

**Solution**:

1. Check SW cache version in `public/sw.js`:

   ```javascript
   const CACHE_NAME = "study-hub-v2-nocache-index"; // Bump version number
   ```

2. Deploy:

   ```bash
   npm run build
   firebase deploy --only hosting
   ```

3. Old SW will be replaced on next visit

---

## Build Errors

### TypeScript Error: "html implicitly has 'any' type"

**File**: `vite.config.ts`

**Error**:

```
vite.config.ts(8,24): error TS7006: Parameter 'html' implicitly has an 'any' type.
```

**Solution**:

```typescript
// Add type annotation
transformIndexHtml(html: string) {
  return html.replace('__BUILD_TIMESTAMP__', Date.now().toString());
}
```

---

### Build Fails: "Cannot find module vite"

**Solution**:

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Runtime Errors

### "TypeError: Cannot read properties of null (reading 'useState')"

**Location**: Study Hub routes (`/study/*`)

**Root Cause**: React Context providers loaded after lazy component

**Solution**: Verify providers wrap `<StudyLayout />` in `App.tsx`:

```tsx
// ✅ CORRECT
<Route path="/study" element={
  <Suspense fallback={...}>
    <StudyThemeProvider>
      <StudyLanguageProvider>
        <StudyLayout />
      </StudyLanguageProvider>
    </StudyThemeProvider>
  </Suspense>
}>
```

**DO NOT** export providers from inside `StudyLayout.tsx`!

---

### FAQ Items Display Empty Cards

**Symptoms**: FAQ page shows expandable cards but no title or content

**Root Cause**: Data structure mismatch

**Firestore Structure**:

```javascript
{
  kr: { title: "...", body: "..." },
  en: { title: "...", body: "..." }
}
```

**Component Expects**:

```javascript
{ q: "...", a: "..." }
```

**Solution** (`StudyFAQPage.tsx`):

```typescript
const getLocalizedContent = (item: DBFAQItem) => ({
  q: studyLang === "kr" ? item.kr.title : item.en.title,
  a: studyLang === "kr" ? item.kr.body : item.en.body,
});

const faqItems = rawItems.map(getLocalizedContent);
```

---

### Admin Login Redirects to Login Again

**Symptoms**: Enter credentials → redirects back to `/admin/login`

**Causes**:

1. **User not in `admins` collection**:

   ```javascript
   // Firestore Console → admins/{uid}
   {
     isAdmin: true,  // MUST be true
     email: "user@example.com"
   }
   ```

2. **Firestore rules not deployed**:

   ```bash
   firebase deploy --only firestore:rules
   ```

3. **Browser cache**:
   - Clear cookies for the domain
   - Or incognito mode

---

## Firebase Issues

### "Permission denied" Reading Firestore

**Check Firestore Rules** (`firestore.rules`):

```javascript
// For bot collections (public read)
match /bot_status/{document} {
  allow read: if true;
  allow write: if false;  // Only Admin SDK
}

// For admin collections
match /study_plan/{document} {
  allow read: if true;
  allow write: if request.auth != null &&
                  get(/databases/$(database)/documents/admins/$(request.auth.uid))
                    .data.isAdmin == true;
}
```

Deploy rules:

```bash
firebase deploy --only firestore:rules
```

---

### Firebase Emulators Not Connecting

**Check `.env.development`:**

```env
VITE_FIREBASE_USE_EMULATORS=true
```

**Start emulators:**

```bash
firebase emulators:start
```

**Emulator ports**:

- Firestore: 8080
- Auth: 9099
- Functions: 5001
- Hosting: 5000

Access: http://localhost:4000 (Emulator UI)

---

## Development Issues

### Port 5173 Already in Use

**Windows**:

```powershell
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Mac/Linux**:

```bash
lsof -ti:5173 | xargs kill
```

---

### Hot Reload Not Working

**Solutions**:

1. **Check Vite config**:

   ```typescript
   server: {
     watch: {
       usePolling: true; // For WSL/Docker
     }
   }
   ```

2. **Restart dev server**:
   ```bash
   # Ctrl+C to stop
   npm run dev
   ```

---

### CSS Changes Not Appearing

**Causes**:

1. **Wrong scope**: Study Hub needs `.study-scope` prefix

   ```css
   /* ✅ CORRECT for Study Hub */
   .study-scope .my-component { ... }

   /* ❌ WRONG - will apply to CV too */
   .my-component { ... }
   ```

2. **Browser cache**: Hard refresh (Ctrl+Shift+R)

3. **CSS file not imported**: Check `main.tsx` or component imports

---

## Quick Diagnostic Checklist

When something breaks, run through this list:

```
□ Hard refresh (Ctrl+Shift+R)
□ Check browser console for errors
□ Check Network tab for failed requests
□ Verify .env file exists and has all keys
□ Check Firebase Console for service status
□ Verify Firestore rules are deployed
□ Check Service Worker version (bump if needed)
□ Clear localStorage: localStorage.clear()
□ Clear cookies
□ Try incognito mode
□ Check recent git commits (what changed?)
```

---

## Still Stuck?

1. **Check Logs**:
   - Browser console
   - Firebase Console → Functions → Logs
   - Build output

2. **Review Recent Changes**:

   ```bash
   git log --oneline -10
   git diff HEAD~1
   ```

3. **Ask for Help**:
   - Include error message
   - Include what you tried
   - Include relevant code snippets

---

**You are in**: `docs/docs/TROUBLESHOOTING.md`  
**Common Issue?** Add it to this doc!  
**Fixed Something?** Document the solution here!
