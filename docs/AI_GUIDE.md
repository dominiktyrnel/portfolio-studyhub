# AI Assistant Guide - Source of Truth

**Purpose**: This document is the **authoritative guide** for AI assistants working on this project.  
**Status**: Active - December 27, 2024 (v3.0)  
**Priority**: READ THIS FIRST before any code changes

---

## 🚨 CRITICAL MANDATORY RULES (FROM true.md)

> **WARNING**: These rules are **BINDING** and **NON-NEGOTIABLE**. Violation requires asking admin for permission.

### Rule 1: Vision is LAW (ABSOLUTNÍ PRIORITA)

**Source of Truth Hierarchy**:

```
1. docs/vision.md (or docs/docs/VISION.md)  ← HIGHEST AUTHORITY
2. docs/DATA_CONTRACTS.md (or DATA_MODEL.md) ← Schemas FROZEN
3. docs/docs/AI_GUIDE.md                     ← YOU ARE HERE
4. Other documentation
5. Code (code může být zastaralý, vision je pravda)
```

**MANDATORY ACTIONS**:

- ✅ **VŽDY** konzultovat vision PŘED implementací nových features
- ✅ **NIKDY** neimplementovat co ODPORUJE vision
- ✅ Pokud požadavek KONFLIKTUJE s vision → **ZEPTAT SE ADMINA**
- ✅ Vision má přednost před VŠÍM ostatním
- ✅ Pokud vision říká jinak než kód → **vision je pravda**

---

### Rule 2: Jazyk Komunikace (CZECH + KOREAN)

**Admin Panel**:

- ✅ **100% ČESKY** - všechny labels, buttons, toast, error messages
- ❌ **NIKDY anglicky** v admin UI

**Study Hub UI**:

- ✅ **KOREAN (KR) jako primární**
- ✅ **ENGLISH (EN) jako sekundární**
- ❌ **NE ČESKY** v Study Hub user-facing UI

**Komunikace s uživatelem (admin)**:

- ✅ **VŽDY ČESKY** (admin je Čech)

**AI Asistent - Všechny odpovědi a dokumentace**:

- ✅ **VŽDY ČESKY** - všechny odpovědi AI asistenta
- ✅ **VŽDY ČESKY** - všechny .md dokumenty v `brain/` artefaktech (task.md, implementation_plan.md, walkthrough.md, atd.)
- ✅ **VŽDY ČESKY** - všechny komentáře v komunikaci s adminem
- ✅ **VŽDY ČESKY** - všechny vysvětlení a analýzy
- ❌ **NIKDY anglicky** v komunikaci s adminem (pouze výjimečně technické termíny pokud nemají český ekvivalent)

**Commit messages, in-code dokumentace, code komentáře**:

- ✅ **ANGLICKY** (conventional commits + JSDoc)

```typescript
// ✅ SPRÁVNĚ
<button>Uložit změny</button>
toast.success('FAQ úspěšně vytvořeno');

// ❌ ŠPATNĚ
<button>Save changes</button>
toast.success('FAQ created successfully');
```

---

### Rule 3: Profesionální Standard - POMALU ALE KVALITNĚ

**KRITICKÉ PARADIGMA**: "Lieber langsam aber gründlich"

**VŽDY**:

- ✅ Bereš si čas na analýzu (i když to trvá déle)
- ✅ Navrhuješ robustní long-term řešení (NE quick wins)
- ✅ Implementuješ s PLNOU error handling & edge cases
- ✅ Refactoruješ pro udržovatelnost
- ✅ Dokumentuješ důležitá rozhodnutí
- ✅ Code review vlastní práce PŘED commitem
- ✅ Testuješ důkladně (unit + integration + edge cases)

**NIKDY**:

- ❌ Nespěchej jen aby to "fungovalo"
- ❌ Neobětuj kvalitu pro rychlost
- ❌ Quick fixes nebo hacky solutions
- ❌ TODO komentáře bez implementace
- ❌ Ignoruj warnings nebo errors
- ❌ Použij `any` type bez výjimečného důvodu
- ❌ Commituj kód s `console.log` (kromě error logů)

**Příklad profesionálního kódu**:

```typescript
// ✅ SPRÁVNĚ - Production-ready
async function saveFAQ(data: FAQItem): Promise<void> {
  // Input validation
  if (!data.question || !data.answer) {
    toast.error("Všechna pole jsou povinná");
    throw new Error("Invalid FAQ data");
  }

  try {
    setLoading(true);
    await setDoc(doc(db, "faq_items", data.id), {
      ...data,
      updatedAt: Timestamp.now(),
    });
    toast.success("FAQ úspěšně uloženo");
  } catch (error: any) {
    console.error("Failed to save FAQ:", error);
    toast.error("Chyba při ukládání FAQ");
    Sentry.captureException(error);
    throw error;
  } finally {
    setLoading(false);
  }
}

// ❌ ŠPATNĚ - Nekompletní
async function saveFAQ(data: any) {
  await setDoc(doc(db, "faq_items", data.id), data);
}
```

---

### Rule 4: Zero Tolerance pro Chyby

**Opravovat VŠECHNO**:

- ✅ **VŠECHNY** TypeScript errors (i "nepodstatné")
- ✅ **VŠECHNY** ESLint warnings
- ✅ **VŠECHNY** console warnings
- ✅ **VŠECHNY** deprecation warnings
- ✅ **VŠECHNY** runtime errors v Sentry
- ✅ **VŠECHNY** broken links
- ✅ **VŠECHNY** accessibility issues

**Priority oprav**:

```
P0 - KRITICKÉ (okamžitě):
  - Build fails, Runtime errors, Security, Data loss

P1 - VYSOKÁ (před commitem):
  - TypeScript errors, ESLint errors, Broken functionality

P2 - STŘEDNÍ (před deploymentem):
  - Warnings, Accessibility, Performance, UX

P3 - NÍZKÁ (před release):
  - Code smells, Redundant code, Missing docs
```

**NIKDY** nepřeskakuj opravu s výmluvou "není prioritní"!

---

### Rule 5: Testing & Audit Po KAŽDÉ Fázi

**POVINNÝ PROCESS po implementaci**:

```
1. ✅ Code Audit
   ├─ npm run typecheck
   ├─ npm run lint
   ├─ npm run build
   └─ Review všech změněných souborů

2. ✅ Functional Testing
   ├─ Test ve všech browsers
   ├─ Test na mobile
   ├─ Test error cases
   └─ Test loading states

3. ✅ Integration Testing
   ├─ Test s ostatními features
   ├─ Test real-time updates
   └─ Test Firebase operations

4. ✅ Fix VŠECH Nalezených Issues

5. ✅ Re-test Po Oprávách
```

**NIKDY** nepokračuj na další fázi dokud současná není 100% hotová!

---

### Rule 6: Git Management

**Repository**: https://github.com/animat12356/personal_site.git

**Co commitovat**:
✅ Source files, configs, docs, package files  
❌ .env files, node_modules, dist/, service-account.json

**Commit messages**: Conventional Commits (anglicky)

```
feat: Add FAQ bulk operations
fix: Resolve chunk loading error
docs: Update AI_GUIDE with mandatory rules
```

---

### Rule 7: Když Se Zeptat Admina

**VŽDY se zeptat když**:

- Feature request NOT IN vision.md
- Breaking change k data schema
- Deployment strategy change
- Conflicting requirements
- Uncertainty o vision compliance
- Něco ODPORUJE těmto pravidlům

**NE se ptát na** běžné implementace které odpovídají vision.

---

## 🎯 Your Mission

You are assisting with a **dual-purpose web application**:

1. Professional Portfolio (CV) - Czech/English
2. Study Hub (Korean learning platform) - Korean/English
3. Admin Panel - **Czech only**

**Golden Rule**: Always consult `docs/VISION.md` (or `docs/docs/VISION.md`) before implementing new features. Vision is LAW.

---

## 📋 Table of Contents

1. [Mandatory Reading](#mandatory-reading)
2. [Architecture Patterns](#architecture-patterns)
3. [Language & Localization](#language--localization)
4. [Study Hub Specific Rules](#study-hub-specific-rules)
5. [Firebase & Data](#firebase--data)
6. [Deployment & Cache](#deployment--cache)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)
9. [Do's and Don'ts](#dos-and-donts)

---

## 📖 Mandatory Reading

### Document Hierarchy (Source of Truth Priority)

```
1. docs/vision.md                    ← HIGHEST AUTHORITY (what to build)
2. docs/docs/AI_GUIDE.md            ← YOU ARE HERE (how to build it)
3. docs/docs/DATA_MODEL.md          ← Firestore schemas (FROZEN)
4. docs/docs/ARCHITECTURE.md         ← Technical patterns
5. Code comments                     ← Implementation details
```

**Never** implement features that contradict `vision.md`. If user request conflicts with vision, **ASK USER FIRST**.

### Key Vision Principles

From `vision.md`:

- **Two independent language systems**: CV_LANG ≠ STUDY_LANG
- **No web chat**: Study Hub uses external Gooroomee for video/chat
- **Bot writes, web reads**: Discord bot owns `bot_status`, `events`, etc.
- **Admin = Czech**: All admin UI must be 100% Czech
- **Study scope isolation**: Study Hub CSS scoped with `.study-scope`

---

## 🏗 Architecture Patterns

### React Component Structure

```
src/
├── components/          # Shared components
│   ├── admin/          # Admin-only (Czech UI)
│   ├── study/          # Study Hub only (KR/EN)
│   └── sections/       # CV homepage sections
├── pages/
│   ├── admin/          # Admin CRUD pages (17)
│   ├── study/          # Study Hub pages (8)
│   └── HomePage.tsx    # CV main page
├── hooks/              # Custom hooks (12)
│   ├── useUserProfile.ts
│   ├── useUserFAQ.ts
│   ├── useStudyStatus.ts
│   └── ...             # useRoomSettings, useStudyPlan, etc.
├── utils/              # Utilities (7)
│   ├── logger.ts       # Production-safe logging
│   ├── handleValidation.ts
│   ├── faqBulkOps.ts
│   └── ...
└── layouts/
    ├── AdminLayout.tsx
    └── StudyLayout.tsx  # Has inline header (vision.md 3.1)
```

### Lazy Loading Pattern

**Study Hub is lazy-loaded** to reduce initial bundle:

```typescript
// App.tsx
const StudyLayout = lazy(() => import("./layouts/StudyLayout"));

// CRITICAL: Providers MUST wrap the lazy component in App.tsx
<Suspense fallback={...}>
  <StudyThemeProvider>
    <StudyLanguageProvider>
      <StudyLayout />
    </StudyLanguageProvider>
  </StudyThemeProvider>
</Suspense>
```

**Why?** Prevents `useState is null` errors. React context must be available **before** the lazy component loads.

### CSS Scoping

```css
/* Study Hub styles */
.study-scope {
  /* All Study Hub specific styles */
}

/* CV styles */
.kr-text-heading { ... }  /* Korean theme color variables */
```

**Never** mix CV and Study Hub styles. Study Hub must work in isolation.

---

## 🌍 Language & Localization

### CV Language System (cv_lang)

- **Languages**: Czech (cs), Korean (kr), English (en)
- **Context**: `LanguageContext.tsx`
- **Content**: `src/content/kr.ts`, `src/content/en.ts`, `src/i18n/kr.json`, `en.json`
- **Toggle**: Header component (flags)
- **Storage**: `localStorage.getItem('language')`

### Study Hub Language System (study_lang)

- **Languages**: Korean (kr), English (en)
- **Context**: `StudyLanguageContext.tsx` (separate from CV!)
- **Content**: `src/study/i18n/kr.ts`, `en.ts`
- **Toggle**: Study Header toggle (KR / EN pills)
- **Storage**: `localStorage.getItem('study-language')`

### Admin Language (ALWAYS CZECH)

```tsx
// ✅ CORRECT
<button>Uložit změny</button>;
toast.success("FAQ úspěšně uloženo");

// ❌ WRONG
<button>Save changes</button>;
toast.success("FAQ saved successfully");
```

**Rule**: If it's in `/admin/*`, it's in Czech. No exceptions.

---

## 📚 Study Hub Specific Rules

### Study Header (vision.md 3.1 - IMPLEMENTED)

**Current Implementation** (`StudyLayout.tsx`):

```tsx
{/* Photo Frame */}
<div className="relative w-32 sm:w-40 rounded-md" onClick={() => setIsLightboxOpen(true)}>
  <img src="/img/profile/youtube_profil.webp" />
  <Expand icon on hover />
</div>

{/* Info Block */}
<h1>도미니크</h1>  {/* Channel name */}
<div>Quiet Study Room</div>  {/* Subtitle */}
<p>{motivational sentence}</p>

{/* Social Links - Vertical */}
<a href="https://youtube.com/@dominiktyrkr">YouTube</a>
<a href="https://instagram.com/dominiktyrnel">Instagram</a>
<a href="https://open.kakao.com/...">KakaoChat</a>
```

**DO NOT** change this unless user requests AND it aligns with vision.md.

### Study Footer (IMPLEMENTED)

```tsx
<footer>
  <p>같이 공부해요. 같이 성장해요. 계속 나아가요.</p>
  <p>© 2025 Dominik Tyrnel. All rights reserved. (모든 권리 보유)</p>
</footer>
```

### Theme System

```typescript
// Study Hub has separate theme
const { studyTheme, toggleStudyTheme } = useStudyTheme();
// Values: 'light' | 'dark'
// Persisted to: localStorage.getItem('study-theme')
```

**DO NOT** link Study theme to CV theme. They are independent.

---

## 🔥 Firebase & Data

### Firestore Collections (Read-Only vs Write)

| Collection        | Web App Access   | Bot Access        | Admin Access      |
| ----------------- | ---------------- | ----------------- | ----------------- |
| `bot_status`      | Read             | Write (Admin SDK) | Read              |
| `study_sessions`  | Read             | Write             | Read              |
| `active_sessions` | -                | Write (backup)    | -                 |
| `events`          | Read             | Write             | Read              |
| `daily_stats`     | Read             | Write             | Read              |
| `study_plan`      | Read             | -                 | Write             |
| `faq_items`       | Read             | -                 | Write             |
| `room_settings`   | Read             | -                 | Write             |
| `inbox_questions` | Write (auth)     | -                 | Read/Write/Delete |
| `study_users`     | Read/Write (own) | -                 | Read              |
| `study_handles`   | Read/Write (own) | -                 | Read              |

### Bot Integration

- YouTube bot (separate codebase in `study_bot/`) writes to Firestore
- Bot uses **Admin SDK** (not web client)
- Web app is **read-only** for bot data (except admin)
- Bot collections: `bot_status`, `stream_stats`, `events`, `daily_stats`

**CRITICAL**: Bot is **YouTube Live Stream chat bot**, NOT Discord. See [BOT.md](./BOT.md) for details.

**Bot Location**: `study_bot/` directory in this repository.

**Key Rule**: Bot collections (`bot_status`, `stream_stats`, `study_sessions`, `active_sessions`) are **READ-ONLY** for web clients. Only bot uses Admin SDK to write.

**v3.0 Change**: `active_sessions` added for Cloud Run multi-instance robustness. Bot writes on `!start`, deletes on `!stop`.

### Data Schema

See [DATA_MODEL.md](./DATA_MODEL.md) for complete schemas. Example:

```typescript
// faq_items/{id}
{
  kr: { title: string, body: string },
  en: { title: string, body: string },
  category: string,
  published: boolean,
  order: number,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**CRITICAL**: When displaying FAQ, map `{kr, en}` structure to `{q, a}` based on active language.

---

## 🚢 Deployment & Cache

### Service Worker Rules (CRITICAL)

**File**: `public/sw.js`  
**Version**: `v2-nocache-index`

```javascript
// ✅ NEVER cache index.html
if (url.pathname === "/" || url.pathname === "/index.html") {
  event.respondWith(fetch(request)); // Network-only
  return;
}

// ✅ Cache JS/CSS with hashed names
const PRECACHE_ASSETS = [
  "/study/now",
  // ... but NOT '/index.html' or '/'
];
```

**Why?** Caching index.html causes "Failed to fetch chunk" errors after deployment. See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).

### Auto-Reload Mechanism

**Files**: `index.html`, `vite.config.ts`

1. **Build time**: Vite plugin replaces `__BUILD_TIMESTAMP__` with `Date.now()`
2. **Runtime**: Inline script in index.html compares version
3. **Mismatch**: `window.location.reload()` once

```html
<meta name="app-version" content="1735043220000" />
<script>
  const current = document.querySelector('meta[name="app-version"]').content;
  const stored = localStorage.getItem("app-version");
  if (stored && stored !== current) {
    localStorage.setItem("app-version", current);
    window.location.reload(true);
  }
</script>
```

**DO NOT** remove this. It's critical for deployment stability.

### GlobalErrorFallback

**File**: `src/components/GlobalErrorFallback.tsx`

Catches chunk loading errors → shows "Update available" → auto-reloads in 1.5s.

```tsx
// Used in App.tsx
<Sentry.ErrorBoundary fallback={<GlobalErrorFallback />}>
  <Router>...</Router>
</Sentry.ErrorBoundary>
```

---

## 👤 User Profile System (v2.4)

### Overview

Study Hub now has a complete user profile system with:

- **@Handle Registration**: Unique username (3-20 chars, lowercase)
- **Profile Page**: `/study/profile` with bio, status, social links
- **Badges System**: 10 badge definitions (early_supporter, study_100h, streak_7, etc.)
- **FAQ History**: Track submitted questions with rate limiting (5/day)

### Key Files

```
src/
├── pages/study/StudyProfilePage.tsx    # Profile page component
├── pages/study/StudyAuthPage.tsx       # Auth with @handle + ToS
├── hooks/useUserProfile.ts             # Real-time profile hook
├── hooks/useUserFAQ.ts                 # FAQ history + rate limiting
├── utils/handleValidation.ts           # @handle validation
├── study/badges/badgeDefinitions.ts    # 10 badge definitions (KR/EN)
├── study/legal/termsOfService.ts       # ToS content (KR/EN)
└── components/study/
    ├── TermsOfServiceModal.tsx
    ├── profile/BadgesSection.tsx
    └── profile/UserFAQHistory.tsx
```

### Firestore Collections

- `study_users/{uid}` - User profile data
- `study_handles/{handle}` - Handle-to-UID mapping (uniqueness)

### Usage

```typescript
// Real-time profile hook
const { profile, loading, updateProfile } = useUserProfile();

// FAQ with rate limiting
const { questions, canAskToday, askQuestion } = useUserFAQ();

// Handle validation
import { validateHandle, isHandleAvailable } from "@/utils/handleValidation";
```

---

## 🛠 Common Tasks

### Adding a New Study Hub Page

1. Create page in `src/pages/study/StudyNewPage.tsx`
2. Add route in `App.tsx`:
   ```tsx
   <Route path="new" element={<StudyNewPage />} />
   ```
3. Add nav link in `StudyLayout.tsx` navItems array
4. Use `useStudyLanguage()` for translations
5. Scope CSS with `.study-scope`

### Adding a New FAQ Category

1. Admin edits in `/admin/faq-editor`
2. Category is just a string field in `faq_items`
3. `StudyFAQPage.tsx` filters by category
4. Update FAQ editor category dropdown if needed

### Deploying to Production

```bash
npm run build
firebase deploy --only hosting

# For functions
firebase deploy --only functions

# Full deploy
firebase deploy
```

**Po každém deployi POVINNĚ**:

1. Přihlásit se do admin panelu (`/admin`)
2. V přehledu (Dashboard) aktualizovat číslo verze
3. Users with old code will auto-reload (version detection + GlobalErrorFallback)

---

## 🔍 Troubleshooting

### "Failed to fetch dynamically imported module"

**Cause**: Stale index.html or Service Worker cached old index.html  
**Solution**:

1. Check `sw.js` - index.html must be network-only
2. Check `index.html` - version detection script present?
3. Hard refresh (Ctrl+Shift+R) once

### "useState is null" in Study Hub

**Cause**: Context providers loaded after lazy component  
**Solution**: Providers must wrap `<StudyLayout />` in `App.tsx`, not inside `StudyLayout.tsx`

### FAQ Items Display Empty

**Cause**: Data structure mismatch  
**Solution**: Use `getLocalizedContent` helper:

```typescript
const faqItems = rawItems.map((item) => ({
  q: studyLang === "kr" ? item.kr.title : item.en.title,
  a: studyLang === "kr" ? item.kr.body : item.en.body,
}));
```

---

## ✅ Do's and Don'ts

### DO

✅ Read `vision.md` before implementing features  
✅ Use Czech for all admin UI  
✅ Keep CV_LANG and STUDY_LANG separate  
✅ Scope Study Hub CSS with `.study-scope`  
✅ Test deployment fixes with hard refresh  
✅ Update `docs/docs/CHANGELOG.md` after major changes  
✅ Ask user if request conflicts with vision

### DON'T

❌ Cache `index.html` in Service Worker  
❌ Mix CV and Study Hub themes/languages  
❌ Write to bot collections from web client  
❌ Use English in admin panel  
❌ Remove auto-reload mechanisms  
❌ Modify `DATA_MODEL.md` schemas without user approval  
❌ Skip reading vision.md for new features

---

## 📞 When to Ask User

- Feature request not in `vision.md`
- Breaking change to data schema
- Deployment strategy change
- Conflicting requirements
- Uncertainty about vision compliance

---

## 🔗 Quick Links

- **Vision**: `docs/vision.md` (sections 1-13 + 14-20 merged)
- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Data Model**: [DATA_MODEL.md](./DATA_MODEL.md)
- **Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Troubleshooting**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

**Last Updated**: December 27, 2024  
**Deployment**: v3.0 (Bot Stats Optimization deployed ✅)  
**Service Worker**: `v2-nocache-index`

**You are in**: `docs/docs/AI_GUIDE.md`
