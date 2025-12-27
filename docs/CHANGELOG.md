# Changelog

## Version History & Recent Fixes

**Current Version**: 3.0  
**Last Updated**: December 27, 2024

---

## [3.0] - December 27, 2024 - Bot Stats Optimization & Documentation Audit

### 🚀 Major Features

#### Cloud Run Multi-Instance Robustness

- **Problem**: In-memory session state not shared across Cloud Run instances
- **Solution**: `active_sessions/{channelId}` collection as fallback backup
- **Lifecycle**: Created on `!start` (sync), deleted on `!stop`
- **Benefit**: `!stop` works even if request hits different instance than `!start`

#### Firestore Writes Optimization

- **Before**: 3 writes per `!stop` (daily_stats + user_study_sessions + user_study_sessions/daily)
- **After**: 1 write + 1 delete per `!stop` (study_sessions + delete active_sessions)
- **Savings**: ~50% reduction in Firestore operations

#### Study Sessions Schema v2

- **Extended fields**: `userKey`, `displayNameSnapshot`, `durationSec`, `dayKey`
- **Per-user stats**: Calculated via aggregation queries on web instead of separate collection
- **Deprecated**: `user_study_sessions` collection (replaced by `study_sessions` aggregation)

#### Session Management Improvements

- **Auto-Close**: Forgotten sessions auto-close on next `!start`
- **Better Feedback**: `!stop` shows study duration ("수고했어요! 45분 공부 완료 ✨")
- **Stream End Cleanup**: `onStreamEndCleanup()` auto-closes all active sessions

### 📚 Documentation Audit

Complete documentation update to v3.0:

| Document        | Changes                                                             |
| --------------- | ------------------------------------------------------------------- |
| `README.md`     | Version 3.0, fixed broken links, updated tech stack                 |
| `AI_GUIDE.md`   | Added `active_sessions` to Firestore table, v3.0 notes              |
| `BOT.md`        | New StatsManager methods, study_sessions v2, active_sessions schema |
| `DATA_MODEL.md` | Added `active_sessions` collection, updated `study_sessions` schema |

### 📁 Modified Files

**Bot (study_bot/):**

- `src/core/statsManager.ts` - onSessionStart (await), onSessionEnd (fallback), onStreamEndCleanup, hasActiveSession
- `src/core/youtubeManager.ts` - handleStart (auto-close), handleStop (feedback)

**Docs:**

- `docs/README.md`, `docs/AI_GUIDE.md`, `docs/BOT.md`, `docs/DATA_MODEL.md`, `docs/CHANGELOG.md`

**Config:**

- `firestore.rules` - Added `active_sessions` rule

### 🔧 Technical Details

**New Firestore Structure:**

```
active_sessions/
└── {channelId}    → Temporary session backup (Cloud Run robustness)

study_sessions/    → Extended schema v2
├── schemaVersion: 2
├── userKey        → YouTube channel ID
├── durationSec    → Duration in seconds
└── dayKey         → 'YYYY-MM-DD' in KST
```

**StatsManager Methods:**

| Method                 | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `onSessionStart()`     | Writes to `active_sessions` (sync), then in-memory cache          |
| `onSessionEnd()`       | Fallback read → write `study_sessions` → delete `active_sessions` |
| `onStreamEndCleanup()` | Auto-close all active sessions                                    |
| `hasActiveSession()`   | Check in-memory session existence                                 |

### Migration Guide 2.9 → 3.0

**Required Actions:**

1. **Deploy Bot to Cloud Run:**

   ```bash
   cd study_bot
   gcloud run deploy study-bot --source . --region europe-west1
   ```

2. **Deploy Firestore Rules:**
   ```bash
   firebase deploy --only firestore:rules,hosting
   ```

**Breaking Changes**: None (new features, backward compatible)

---

## [2.9] - December 26, 2024 - Cloud Run & Real-time Optimizations

### 🚀 Major Features

#### Cloud Run Deployment

- **Platform Migration**: Bot now runs on Google Cloud Run (europe-west1)
- **Docker Container**: Full containerized deployment with health checks
- **Revision**: `study-bot-00009-q89`
- **Environment**: YouTube OAuth2 credentials via Cloud Run secrets

#### Adaptive Chat Polling

- **Smart Polling**: Fast mode (3s) when chat is active, slow mode (15s) when idle
- **Activity Detection**: Switches to fast mode when new messages arrive
- **Idle Timeout**: Falls back to slow mode after 2 minutes of inactivity
- **Quota Optimization**: Reduces YouTube API usage during quiet periods

#### Admin Command Console

- **Console UI**: Terminal-style interface in Study Bot admin page
- **Direct Commands**: Send bot commands without YouTube chat (useful for mobile streaming)
- **Command History**: Shows last 20 commands with status (sent/processed/error)
- **Integration**: Commands written to `runtime/adminCommand`, bot processes them

#### OBS → Web Real-time Integration

- **OBS Timer Data**: Web reads from `runtime/obsPomodoro` for accurate timer display
- **Data Merging**: OBS data takes priority when timer is running
- **Mode Mapping**: OBS phases correctly mapped to web display modes

### 🐛 Critical Fixes

#### Firestore Security Rules

- **Problem**: `runtime/obsPomodoro` blocked by default deny rule
- **Impact**: Web couldn't read timer data, showed "Updated: Unknown"
- **Solution**: Added explicit rules for `runtime/*` documents

#### StreamManager Compatibility

- **Problem**: `uptimeSeconds` was removed, breaking legacy web code
- **Solution**: Re-added `uptimeSeconds` field for backward compatibility

### 🎨 UI Improvements

#### Czech Admin Panel

- **Study Bot Page**: Fully translated to Czech
- **Built-in Commands**: Read-only table showing all available bot commands
- **Custom Commands**: Editable table for custom chat responses
- **Labels**: STAV, OVLÁDÁNÍ, SPUSTIT, RESTARTOVAT, ZASTAVIT

### 📁 Modified Files

**Bot (study_bot/):**

- `src/core/youtubeManager.ts` - Adaptive polling, executeAdminCommand
- `src/core/streamManager.ts` - uptimeSeconds compatibility, Cloud Run optimizations
- `src/core/botController.ts` - Admin command listener
- `Dockerfile` - Port 8080 for Cloud Run

**Web (src/):**

- `src/hooks/useStudyStatus.ts` - OBS data fetching and merging
- `src/pages/admin/StudyBotPage.tsx` - Czech translation, admin console

**Config:**

- `firestore.rules` - runtime/obsPomodoro, runtime/adminCommand, bot_commands rules

### 🔧 Technical Details

**New Firestore Documents:**

```
runtime/
├── obsPomodoro    → Timer state from OBS Python script
└── adminCommand   → Commands from admin console

bot_commands/
└── {commandId}    → Custom chat commands
```

**Adaptive Polling Algorithm:**

```typescript
// Fast mode: 3s polling when chat active
// Slow mode: 15s polling after 2min idle
const FAST_POLL_MS = 3000;
const SLOW_POLL_MS = 15000;
const IDLE_TIMEOUT_MS = 120000;
```

### Migration Guide 2.8 → 2.9

**Required Actions:**

1. **Deploy Firestore Rules**:

   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Deploy Bot to Cloud Run**:

   ```bash
   cd study_bot
   gcloud run deploy study-bot --source . --region europe-west1
   ```

3. **OBS Script**: Reload `pomodoro-timer.py` in OBS to ensure API key is set

**Breaking Changes**: None (backward compatible)

---

## [2.8] - December 26, 2024 - Admin Multi-Upload & Code Quality

### 🚀 Features

- **Multi-File Upload**: Portfolio gallery now supports selecting multiple images at once
- **Upload Progress**: Shows "x/y" progress indicator during batch upload
- **Improved UX**: Updated file input hints to indicate multi-file support

### 🐛 Fixes

- **React Hooks Purity**: Fixed ESLint errors in `StatusWidget.tsx` and `TimerWidget.tsx`
  - Moved `Date.now()` calls from render to `useEffect` intervals
  - All hooks now correctly placed before early returns
- **ESLint Cleanup**: Removed unused variables in `obsDetector.ts`

### 📁 Modified Files

- `src/components/admin/ImageUploader.tsx` - Multi-file upload support
- `src/components/study/dashboard/StatusWidget.tsx` - React hooks fixes
- `src/components/study/dashboard/TimerWidget.tsx` - React hooks fixes
- `study_bot/src/core/obsDetector.ts` - Unused variable cleanup

---

## [2.7] - December 26, 2024 - Study Hub UX Overhaul

### 🚀 Major Features

#### FAQ Page Improvements

- **Category Filtering**: FAQ items now filter by category (question, live, web, bot, troubleshooting, other)
- **Accordion Display**: FAQ items are collapsed by default, expand on click
- **Quiet Inbox Dropdown**: Moved submission form to collapsible dropdown under title

#### New Introduction Page (`/study/introduction`)

- **8 Content Sections**: My Story, Why Korea, Routine, Goals & Roadmap, Progress, Preparation, Work/Skills, FAQ
- **Dropdown Navigation**: Jump to section with smooth scroll
- **Bilingual Content**: Korean and English versions
- **FAQ Link Button**: Direct link to FAQ page from Introduction

#### Admin Introduction Editor (`/admin/introduction-editor`)

- **Section Management**: Add, remove, reorder sections
- **Bilingual Editing**: KR and EN titles and content
- **Firestore Integration**: Saves to `intro_content/current`
- **FAQ Checkbox**: Mark sections to show FAQ link button

#### Room Settings Improvements

- **Dynamic Rules**: Rules now load from admin `/admin/room-settings`
- **Link & Password**: Configurable from admin panel
- **Live Updates**: Changes reflect immediately on Room page

### 🎨 UI/UX Improvements

- **Scroll to Top Button**: Fixed button in bottom-right corner on all Study Hub pages
- **About Page Button**: Dynamic language (소개 / Introduction) based on current language
- **Updated Texts**: "온라인 스터디룸에서 함께 공부해요 🤫" replaces Gooroomee references
- **New Favicon**: Study-themed favicon with Korean text
- **New Title**: "이력서 & 스터디" replaces old CV title

### 📁 New Files

- `src/pages/study/StudyIntroductionPage.tsx` - Introduction page component
- `src/pages/admin/IntroductionEditor.tsx` - Admin editor for Introduction content

### 📁 Modified Files

- `src/pages/study/StudyFAQPage.tsx` - Accordion + category filter + Quiet Inbox dropdown
- `src/pages/study/StudyAboutPage.tsx` - Introduction button
- `src/pages/study/StudyRoomPage.tsx` - Dynamic rules from settings
- `src/components/study/dashboard/GooroomeeCard.tsx` - New text
- `src/layouts/StudyLayout.tsx` - Scroll to Top button
- `src/layouts/AdminLayout.tsx` - Introduction Editor menu item
- `src/study/i18n/translations.ts` - introButton translations, em dash fixes
- `index.html` - New title and OG tags
- `public/favicon.svg` - New favicon design

### 🔧 Technical Details

**New Firestore Collections**:

```
intro_content/
└── current    → sections[], updatedAt
```

---

## [2.6] - December 26, 2024 - YouTube Study Bot Integration

### 🚀 Major Features

#### YouTube Live Chat API Integration

- **Real OAuth2 Authentication**: Full googleapis integration with refresh token
- **Chat Polling**: API-recommended polling interval with proper rate limiting
- **Auto-detection**: Finds active live broadcast automatically
- **Commands Implemented**:
  - Viewer: `!help`, `!start`, `!stop`, `!stats`
  - Admin: `!bot pause`, `!bot resume`, `!bot stop`, `!bot phase`, `!bot announce`
- **Rate Limiting**: 10s per user, 2s global for bot replies

#### Automatic Korean Announcements

- Focus/Break/Long Break/Pause mode change announcements
- Configurable messages in `config/bot.chatMessages`
- 5-second deduplication window

#### Data Model Harmonization (BOT_Definice.md)

- **Heartbeat Separation**: `bot_status/heartbeat` for admin/debug only
- **New Field Names**: `currentMode`, `phaseStartedAt`, `endsAt`, `durationSec`
- **timelineCompact**: Recent 30 events embedded in `bot_status/current`
- **Legacy Compatibility**: Old field names still written during migration

### 🔧 Code Quality Audit (All Fixed)

| Issue                              | Priority | Fix                                           |
| ---------------------------------- | -------- | --------------------------------------------- |
| YouTube disconnect during shutdown | P0       | Added `youtube.disconnect()` in botController |
| OBS listener memory leak           | P0       | Added `stopListening()` with unsubscribe      |
| timelineCompact race condition     | P0       | Changed to Firestore transaction              |
| lastCommandByUser memory leak      | P1       | Cleanup every 10 minutes                      |
| HealthCheck legacy fields          | P1       | Added fallback to new fields                  |
| Timezone issue (dayKey UTC)        | P1       | Changed to Asia/Seoul timezone                |
| WriteThrottle console.log          | P1       | Changed to logger callback                    |

### 📁 New Files

- `study_bot/scripts/get-youtube-token.ts` - OAuth refresh token helper
- `study_bot/scripts/init-bot-config.ts` - Initialize config/bot document
- `study_bot/scripts/seed-test-data.ts` - Test data for web integration
- `study_bot/.env.example` - Environment variables template

### 📁 Modified Files

- `study_bot/src/core/youtubeManager.ts` - Complete rewrite with real YouTube API
- `study_bot/src/core/streamManager.ts` - Heartbeat separation, new fields
- `study_bot/src/core/obsManager.ts` - timelineCompact, transactions, announcements
- `study_bot/src/core/statsManager.ts` - Korea timezone for dayKey
- `study_bot/src/core/botController.ts` - Proper shutdown with all managers
- `study_bot/src/lib/writeThrottle.ts` - Logger callback instead of console.log
- `study_bot/src/api/healthCheck.ts` - New field fallbacks
- `study_bot/src/index.ts` - YoutubeManager wiring
- `src/types/study-db.ts` - BotStatus, BotHeartbeat, TimelineCompactItem types
- `src/hooks/useStudyStatus.ts` - New/legacy field compatibility
- `firestore.rules` - Added bot_status/heartbeat rule
- `docs/BOT.md` - Complete documentation update

### 🔧 Technical Details

**Firestore Structure**:

```
bot_status/
├── current    → Public dashboard (onSnapshot listener)
└── heartbeat  → Admin only (60s interval)

config/
└── bot        → desiredState, pomodoro, chatMessages, features, moderation
```

**Environment Variables (study_bot/.env)**:

```env
YOUTUBE_CLIENT_ID=...
YOUTUBE_CLIENT_SECRET=...
YOUTUBE_REFRESH_TOKEN=...
BOT_VERSION=1.0.0
```

### Migration Guide 2.5 → 2.6

**Required Actions**:

1. **YouTube API Setup** (if using live chat):

   ```bash
   cd study_bot
   cp .env.example .env
   # Add YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET from Google Cloud Console
   npx ts-node scripts/get-youtube-token.ts
   # Add YOUTUBE_REFRESH_TOKEN from output
   ```

2. **Initialize Bot Config**:

   ```bash
   npx ts-node scripts/init-bot-config.ts
   ```

3. **Deploy Firestore Rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

**Breaking Changes**: None (backward compatible with legacy fields)

---

## [2.5] - December 25, 2024 - Study Hub UX Overhaul & Tailwind 4

### 🚀 New Features

#### Study Hub UX Enhancements

- **LIVE Panel** on Dashboard: Shows when stream is online with "Watch Now" button
- **Offline Schedule**: Displays weekly schedule when stream is offline
- **Room Page Improvements**:
  - 3-step tutorial (Click Enter → Enter Password → Start Studying!)
  - Focus & Break Rhythm section with vibe descriptions
  - Password hidden for unauthenticated users
- **FAQ Category Filter**: Bubble-style category filtering (전체, 질문, 라이브, 웹/계정, 봇/명령어, 문제 해결, 기타)
- **Plan Page**: Title changed to Korean (2025 마스터 플랜)
- **Legal Pages**: Privacy Policy, Terms of Service, Contact pages added
- **Admin Schedule Editor**: `/admin/study-schedule` for weekly schedule management

#### Tailwind 4 Optimization

- **Custom Variants**: `@variant dark`, `@variant live`, `@variant focus-mode`
- **Color Aliases**: `bg-surface`, `text-primary`, `border-border` etc.
- **Container Queries**: `cq-container`, `cq-sm-*`, `cq-md-*`, `cq-lg-*`
- **Modern Utilities**: `text-balance`, `text-pretty`, `has-focus`, `not-first`, `not-last`
- **Fluid Typography**: `--font-size-fluid-*` scale
- **Animations**: `animate-fade-in`, `animate-slide-up`, `animate-pulse-slow`

#### Firebase Billing Audit

- Created `docs/FIREBASE_BILLING_AUDIT.md` with cost analysis
- Added `limit(50)` to FAQ query for read optimization
- Added `study_schedule/current` to Firestore rules

### 📁 New Files

- `src/pages/study/StudyPrivacyPage.tsx` - Privacy Policy page
- `src/pages/study/StudyTermsPage.tsx` - Terms of Service page
- `src/pages/study/StudyContactPage.tsx` - Contact page
- `src/pages/admin/StudyScheduleEditor.tsx` - Admin schedule editor
- `src/hooks/useStudySchedule.ts` - Schedule hook
- `docs/FIREBASE_BILLING_AUDIT.md` - Billing optimization guide
- `docs/TAILWIND4_AUDIT.md` - Tailwind 4 feature audit

### 📁 Modified Files

- `src/layouts/StudyLayout.tsx` - Legal footer links, header cleanup
- `src/layouts/AdminLayout.tsx` - Added Schedule to menu
- `src/pages/study/StudyDashboard.tsx` - LIVE panel, offline schedule
- `src/pages/study/StudyRoomPage.tsx` - Tutorial steps, Focus/Break, auth-only password
- `src/pages/study/StudyFAQPage.tsx` - Category filter bubbles
- `src/pages/study/StudyPlanPage.tsx` - Korean title
- `src/study/i18n/translations.ts` - All new translations (KR/EN)
- `src/styles/tailwind-theme.css` - TW4 variants, color aliases, animations
- `src/styles/utils.css` - Container queries, modern utilities
- `src/styles/global.css` - Dark mode CSS overrides
- `firestore.rules` - Added study_schedule rules
- `src/App.tsx` - Legal routes, Schedule editor route

### 🔧 Technical Details

**Firestore Collections Added**:

- `study_schedule/current` - Weekly schedule (7 days)

**CSS Improvements**:

- Removed 28 lines of redundant !important overrides
- Added 110 lines to tailwind-theme.css (variants, aliases)
- Added 198 lines to utils.css (container queries, utilities)

### Migration Guide 2.4 → 2.5

**Required Actions**: None (additive features)

**Firestore Rules**: Deploy with `firebase deploy --only firestore:rules`

---

## [2.4] - December 25, 2024 - User Profile System

### 🚀 New Features

#### Complete User Profile System (Phase 1-7)

- **@Handle Registration**: Unique username (3-20 chars) required at signup
  - Real-time availability check
  - Blacklist for reserved words
  - Firestore `study_handles` collection for uniqueness
- **Terms of Service**: Checkbox + modal with KR/EN content
- **Profile Page**: `/study/profile` with full edit capability
  - Display name, bio, status (studying/break/offline)
  - Study vibe (templates + custom text)
  - Social links (YouTube, Instagram, Discord, X)
- **Badges System**: 10 badge definitions with KR/EN translations
  - early_supporter, study_100h, study_500h, streak_7, streak_30
  - night_owl, early_bird, social_butterfly, faq_helper, beta_tester
- **FAQ History**: User's submitted questions with status tracking
  - Rate limit: 5 questions per day
  - Status: NEW, IN_PROGRESS, ANSWERED, PUBLISHED, REJECTED, ARCHIVED
  - Admin rejection with `adminNote` field

### 📁 New Files

- `src/pages/study/StudyProfilePage.tsx` - Profile page component
- `src/hooks/useUserProfile.ts` - Real-time profile hook
- `src/hooks/useUserFAQ.ts` - FAQ history hook with rate limiting
- `src/utils/handleValidation.ts` - @handle validation utilities
- `src/study/legal/termsOfService.ts` - ToS content (KR/EN)
- `src/study/badges/badgeDefinitions.ts` - 10 badge definitions
- `src/components/study/TermsOfServiceModal.tsx`
- `src/components/study/profile/BadgesSection.tsx`
- `src/components/study/profile/UserFAQHistory.tsx`

### 📁 Modified Files

- `src/pages/study/StudyAuthPage.tsx` - Added handle + ToS fields
- `src/pages/admin/InboxPage.tsx` - Added REJECTED status
- `src/types/study-db.ts` - Added UserProfile, extended InboxQuestion
- `src/App.tsx` - Added `/study/profile` route
- `src/study/i18n/translations.ts` - Profile translations (KR/EN)
- `firestore.rules` - Rules for study_users and study_handles

### 🔧 Technical Details

**Firestore Collections**:

- `study_users/{uid}` - User profile documents
- `study_handles/{handle}` - Handle-to-UID mapping

**Commit**: `9a55d5e` (17 files changed, +2218/-134)

### Migration Guide 2.3 → 2.4

**Required Actions**: None (new features, no breaking changes)

**New Environment Variables**: None required

**Firestore Rules**: Deploy new rules with `firebase deploy --only firestore:rules`

---

## [2.3] - December 24, 2024 - Audit Fixes & Code Quality

### 🔴 Critical Fixes (P0)

#### Incorrect Copyright Year in Documentation

- **Problem**: Documentation referenced 2024-2025, but project created in December 2024
- **Solution**: Corrected to `© Dominik Tyrnel 2024`
- **Files Changed**: `docs/README.md`

#### Deprecated API Usage

- **Problem**: `window.location.reload(true)` uses deprecated force parameter
- **Solution**: Removed deprecated parameter: `window.location.reload()`
- **Files Changed**: `index.html`
- **Impact**: Future browser compatibility

### ⚠️ High Priority Fixes (P1)

#### Removed Deprecated Dependencies

- **Removed**: `@sentry/tracing@7.120.4` (deprecated, merged into @sentry/react v10+)
- **Action**: `npm install` removes 5 packages
- **Files Changed**: `package.json`

#### Logger Utility for Production-Safe Logging

- **Feature**: Created centralized logger utility
- **Functionality**:
  - Development: All logs visible in console
  - Production: Only errors sent to Sentry
  - Public API: `logger.log()`, `logger.info()`, `logger.warn()`, `logger.error()`
- **Files Created**: `src/utils/logger.ts`
- **Files Modified**: `src/main.tsx`, `src/lib/firebase.ts`
- **Impact**: ~50+ console.log calls now production-safe

#### Package.json Metadata Update

- **Changes**:
  - `name`: "temp_vite" → "tyrnel-site"
  - `version`: "0.0.0" → "2.2.0"
  - Added: `description`, `author`, `license`, `repository`
- **Files Changed**: `package.json`

#### ESLint Configuration Fix

- **Problem**: Invalid import `eslint/config` (doesn't exist in ESLint 9.x)
- **Solution**: Rewrote to proper ESLint 9.x flat config using `tseslint.config()`
- **Files Changed**: `eslint.config.js`
- **Impact**: Lint errors now properly caught

#### Admin Error Boundary

- **Feature**: Error boundary for admin section with Czech UI
- **Functionality**:
  - Catches unexpected admin panel errors
  - Shows user-friendly fallback (100% Czech)
  - Automatically reports to Sentry
  - Reset button to dashboard
- **Files Created**: `src/components/admin/AdminErrorBoundary.tsx`

#### Vite Configuration Optimization

- **Changes**:
  - Added type annotations for `injectBuildTimestamp(): Plugin`
  - Removed duplicate manual chunks for admin/study pages (already lazy-loaded)
- **Files Changed**: `vite.config.ts`
- **Impact**: Better bundle optimization

#### Firestore Security Rules Enhancement

- **Problem**: Admin collection had `allow read: if true` (security risk)
- **Solution**: Restricted to `allow read: if request.auth.uid == adminId`
- **Files Changed**: `firestore.rules`
- **Impact**: Prevents admin UID enumeration by attackers

### 🧪 Testing & Verification

**Automated Tests**:

```bash
✅ npm run typecheck - PASSED (0 errors)
✅ npm run lint      - PASSED (0 errors)
✅ npm run build     - PASSED (8.20s)
```

**Build Metrics**:

- index.html: 2.66 kB (gzip: 1.14 kB)
- CSS: 91.14 kB (gzip: 15.85 kB)
- Firebase chunk: 369.08 kB (gzip: 114.79 kB)
- Main bundle: 529.88 kB (gzip: 147.77 kB)

### 📚 Documentation

- Added comprehensive audit report in `.gemini/artifacts/audit_report.md`
- Created implementation plan in `.gemini/artifacts/implementation_plan.md`
- Updated walkthrough with verification results

### Migration Guide 2.2 → 2.3

**Required Actions**:

1. **PowerShell Execution Policy** (Windows only):

   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. **Install Dependencies**:

   ```bash
   npm install  # Removes @sentry/tracing
   ```

3. **Verify**:
   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

**Breaking Changes**: None

**New Files**:

- `src/utils/logger.ts` - Logger utility
- `src/components/admin/AdminErrorBoundary.tsx` - Error handler

### Technical Debt Addressed

- ✅ Deprecated APIs removed
- ✅ Production console.log suppressed
- ✅ TypeScript strict mode compliance
- ✅ ESLint properly configured
- ✅ Security rules tightened

### Known Issues

None - all P0 and P1 issues from audit resolved

---

## [2.2] - December 24, 2024 - Study Hub UX Fixes

### 🐛 Critical Bug Fixes

#### Study Hub Menu Invisibility on Desktop

- **Problem**: Navigation menu (지금, 기록, 계획, 소개, 문의) completely invisible on desktop browsers
- **Root Cause**: Tailwind CSS class order - `md:flex ... hidden` meant `hidden` always won
- **Solution**: Reordered to `hidden md:flex` so `md:flex` overrides on desktop breakpoint
- **Files Changed**: `src/layouts/StudyLayout.tsx:181`
- **Commit**: `b61f184`

#### Sticky Scroll Behavior Broken

- **Problem**: Header didn't shrink on scroll, dual-state (expanded/compact) not switching
- **Root Cause**: Using `opacity-0 pointer-events-none absolute top-0` left elements in DOM causing overlay
- **Solution**: Changed both STATE 1 and STATE 2 to use `hidden/block` toggle for clean mount/unmount
- **Files Changed**: `src/layouts/StudyLayout.tsx:67, 212`
- **Commit**: `b61f184`

### 🎨 Design Improvements

#### Study Hub Color Palette Unification

- **Feature**: Unified Study Hub and Admin colors per VISION.md specification
- **Changes**:
  - **Light Theme** ("Warm Paper"): `#F9F7F2` background, `#C59D5F` accent
  - **Dark Theme** ("Deep Room"): `#1A1816` background, `#FF9F43` accent
  - Admin section now shares Study Hub palette for visual consistency
- **Files Changed**: `src/styles/global.css`
- **Commit**: `3e62844`

#### Study Hub Header Restructure

- **Feature**: Added navigation menu as new row at bottom of expanded header
- **Layout**:
  - Top: Photo frame + channel info + social links
  - Right: Theme toggle, language toggle, mobile hamburger
  - **Bottom**: Desktop menu bar (centered, rounded pill design)
  - Mobile: Hamburger dropdown replaces bottom menu
- **Files Changed**: `src/layouts/StudyLayout.tsx`
- **Commit**: `31b31e4`

### 📚 Documentation

- Added comprehensive walkthrough in `.gemini/artifacts/walkthrough.md`
- Updated project status in `.gemini/artifacts/task.md`
- Root cause analysis, testing results, and lessons learned documented

### 🔧 Technical Details

**Tailwind Class Order Lesson**:

```tsx
// ❌ WRONG - 'hidden' at end wins
<nav className="md:flex ... hidden">

// ✅ CORRECT - 'md:flex' overrides on md breakpoint
<nav className="hidden md:flex ...">
```

**State Switching Lesson**:

```tsx
// ❌ WRONG - elements stay in DOM, cause overlay
${isScrolled ? 'opacity-0 absolute...' : 'opacity-100 relative'}

// ✅ CORRECT - clean mount/unmount
${isScrolled ? 'hidden' : 'block'}
```

### Migration Guide 2.1 → 2.2

**Required Actions**: None (automatic on hard refresh)

**Breaking Changes**: None

**Git Commits**:

- `b61f184` - Menu visibility and sticky scroll fixes
- `31b31e4` - Menu bar added to header
- `3e62844` - Color palette unification
- `0245006` - Mobile menu button added
- `5cabb2e` - Previous header fix attempt (superseded)

---

## [2.1] - December 24, 2024 - P0 Critical Fixes

### 🐛 Critical Bug Fixes

#### Service Worker Cache Issue (ROOT CAUSE)

- **Problem**: SW cached `/index.html` causing stale chunk references after deployment
- **Impact**: Users saw "Failed to fetch dynamically imported module" errors
- **Solution**:
  - Removed `/index.html` from `PRECACHE_ASSETS` in `public/sw.js`
  - Bumped cache version to `v2-nocache-index`
  - Added network-only fetch strategy for `/` and `/index.html`
- **Files Changed**: `public/sw.js`

#### React Hook Error in Study Hub

- **Problem**: `useState is null` error when loading `/study/*` routes
- **Root Cause**: Context providers inside lazy-loaded component
- **Solution**: Moved `StudyThemeProvider` and `StudyLanguageProvider` to `App.tsx` wrapping `<StudyLayout />`
- **Files Changed**: `src/App.tsx`, `src/layouts/StudyLayout.tsx`

#### FAQ Display Empty Cards

- **Problem**: FAQ page showed cards but no title/content
- **Root Cause**: Data structure mismatch (`{kr, en}` vs `{q, a}`)
- **Solution**: Added `getLocalizedContent()` helper to map structure
- **Files Changed**: `src/pages/study/StudyFAQPage.tsx`

###🚀 Features

#### Automatic Version Detection & Reload

- **Feature**: Auto-reload on new deployments
- **Implementation**:
  - Meta tag in `index.html`: `<meta name="app-version" content="TIMESTAMP">`
  - Vite plugin `injectBuildTimestamp()` replaces placeholder
  - Inline script compares version with localStorage → reloads if mismatch
- **Files Added**: `vite.config.ts` (new file)
- **Files Modified**: `index.html`

#### GlobalErrorFallback Component

- **Feature**: Graceful handling of chunk loading errors
- **Behavior**: Detects "Failed to fetch" → shows "Update available" → auto-reloads in 1.5s
- **Files Added**: `src/components/GlobalErrorFallback.tsx`
- **Files Modified**: `src/App.tsx`

#### Hard Navigation to Study Hub

- **Feature**: Force browser reload when entering Study Hub from CV
- **Why**: Prevents stale router state from trying to load old chunks
- **Implementation**: Changed menu link to `window.location.href` instead of React Router
- **Files Modified**: `src/components/Header.tsx`

#### Study Hub Header - Vision Compliance

- **Feature**: Redesigned header per `vision.md` section 3.1
- **Changes**:
  - Rectangle photo (w-32 sm:w-40, rounded-md) replacing circular avatar
  - Image: `youtube_profil.webp`
    -Lightbox on click (Expand icon overlay)
  - Channel name: "도미니크" (Dominik) as main h1
  - Subtitle: "Quiet Study Room"
  - Social links (vertical): YouTube (@dominiktyrkr), Instagram (@dominiktyrnel), KakaoChat
  - Updated footer: "같이 공부해요. 같이 성장해요. 계속 나아가요."
- **Files Modified**: `src/layouts/StudyLayout.tsx`

### 📚 Documentation

#### New Structured Documentation

- **Created**: `docs/docs/` directory with comprehensive, organized documentation
- **Files Added**:
  - `README.md` - Master navigation hub
  - `AI_GUIDE.md` - Source of truth for AI assistants
  - `QUICKSTART.md` - 15-minute setup guide
  - `DATA_MODEL.md` - Complete Firestore schemas
  - `CHANGELOG.md` - This file
  - `TROUBLESHOOTING.md` - Common issues
  - `DEPLOYMENT.md` - Deployment procedures
  - (more planned)

#### Updated Existing Documentation

- **Files Modified**:
  - `docs/README.md` - Added P.10 deployment reliability section
  - `docs/vision.md` - Updated section 3.1 + merged `vision_addendum.md`
  - `.gemini/artifacts/walkthrough.md` - Complete fix documentation
  - `.gemini/artifacts/task.md` - Updated status

---

## [2.0] - December 2024 - Data Management

### Features

#### JSON Import/Export Admin Page

- **Feature**: Admin panel for bulk data operations
- **Location**: `/admin/import-export`
- **Capabilities**:
  - Import: FAQ Items, Daily Stats, Study Sessions, Study Plan
  - Export: Download with timestamped filenames
  - Validation: Collection-specific schema checking
  - Progress: Real-time batch write tracking
- **Files Added**: `src/pages/admin/ImportExportPage.tsx`

#### Recent Sessions Widget

- **Feature**: Latest 10 study sessions in Records page
- **Data Source**: `study_sessions` collection
- **Files Modified**: `src/pages/study/StudyRecordsPage.tsx`

---

## [1.9] - November 2024 - P.8 Advanced Features

### Features

#### FAQ Bulk Operations

- **Feature**: Batch publish drafts, bulk archive old items
- **Location**: `/admin/faq-editor`
- **Files Added**: `src/utils/faqBulkOps.ts`

#### Inbox Multi-Select & CSV Export

- **Feature**: Select multiple inbox items, bulk archive, export to CSV
- **Location**: `/admin/inbox`
- **Files Added**: `src/utils/inboxBulkOps.ts`

#### Study Plan Templates

- **Feature**: Duplicate months, export/import JSON
- **Location**: `/admin/study-plan`
- **Files Added**: `src/utils/planTemplates.ts`

#### Bot Health Monitoring

- **Feature**: Real-time bot status dashboard
- **Indicators**: 🟢 Healthy / 🟡 Warning / 🔴 Critical
- **Location**: `/admin` dashboard
- **Files Added**: `src/components/admin/BotStatusCard.tsx`

---

## [1.8] - October 2024 - P.7 Quality & DevEx

### Infrastructure

#### Pre-commit Hooks

- **Feature**: Automated linting before commits
- **Tools**: Husky + lint-staged
- **Files Added**: `.husky/pre-commit`, `.lintstagedrc.json`

#### Environment Management

- **Feature**: Dev/Staging/Prod environment configs
- **Files**: `.env.development`, `.env.staging`, `.env.production` (gitignored)

#### Cloud Functions

- **Feature**: Scheduled event cleanup (weekly, Saturday 18:00 UTC)
- **Function**: `cleanupOldEvents` (deletes events > 30 days old)
- **Files Added**: `functions/src/cleanup.ts`

#### Firebase Emulator Support

- **Feature**: Local development with Firebase Emulators
- **Config**: `VITE_FIREBASE_USE_EMULATORS=true`

---

## [1.7] - September 2024 - P.6 Security & UX

### Security

#### Firestore Security Rules

- **Feature**: Complete security rules for all collections
- **File**: `firestore.rules`

#### Storage Security Rules

- **Feature**: Secure file uploads to Cloud Storage
- **File**: `storage.rules`

### UX

#### PWA Support

- **Feature**: Installable app, offline mode, service worker
- **Files**: `public/sw.js`, `public/manifest.json`, `public/offline.html`

#### Loading Skeletons

- **Feature**: Skeleton screens during data fetching
- **Files**: `src/components/study/LoadingSkeletons.tsx`

#### Sentry Error Tracking

- **Feature**: Production error monitoring
- **Config**: `VITE_SENTRY_DSN` environment variable
- **Files**: `src/lib/errorTracking.ts`

---

## [1.0-1.6] - July-August 2024

Initial development phases (P.1-P.5):

- CV Portfolio implementation
- Study Hub core features
- Admin Panel CRUD
- Bot backend integration
- Firebase setup

---

## Migration Guide

### From 2.1 to 2.2

**Required Actions**: None (automatic on hard refresh)

**Breaking Changes**: None

**Git Commits**:

- `b61f184` - Menu visibility and sticky scroll fixes
- `31b31e4` - Menu bar structure
- `3e62844` - Color unification

### From 2.0 to 2.1

**Required Actions**:

1. Hard refresh (Ctrl+Shift+R) once to get new Service Worker
2. No database migrations needed
3. No environment variable changes

**Breaking Changes**: None

**New Files**:

- `vite.config.ts` (create with `injectBuildTimestamp` plugin)
- `src/components/GlobalErrorFallback.tsx`
- `docs/docs/*` (new documentation structure)

---

**You are in**: `docs/docs/CHANGELOG.md`  
**Current Version**: 2.5  
**Last Deploy**: December 25, 2024
