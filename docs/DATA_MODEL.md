# Firestore Data Model

## Complete Schema Reference

**Purpose**: Authoritative schema definitions for all Firestore collections  
**Status**: FROZEN - changes require user approval  
**Last Updated**: December 27, 2024 (v3.0)

---

## Collection Index

| Collection                                        | Purpose                     | Write Access    | Read Access |
| ------------------------------------------------- | --------------------------- | --------------- | ----------- |
| [`bot_status/current`](#bot_status_current)       | Bot & stream status         | Bot (Admin SDK) | Public      |
| [`bot_status/heartbeat`](#bot_status_heartbeat)   | Bot health (admin only)     | Bot             | Admin       |
| [`config/bot`](#config_bot)                       | Bot configuration           | Admin           | Bot         |
| [`runtime/obsPomodoro`](#runtime_obspomodoro)     | OBS timer data (v2.9)       | OBS Script      | Public      |
| [`runtime/adminCommand`](#runtime_admincommand)   | Admin console commands      | Admin           | Bot         |
| [`bot_commands`](#bot_commands)                   | Custom chat commands        | Admin           | Admin       |
| [`stream_stats`](#stream_stats)                   | Live stream statistics      | Bot             | Public      |
| [`events`](#events)                               | Timeline events (optional)  | Bot             | Public      |
| [`daily_stats`](#daily_stats)                     | Aggregated daily study data | Bot             | Public      |
| [`study_sessions`](#study_sessions)               | Individual study sessions   | Bot             | Public      |
| [`active_sessions`](#active_sessions)             | Active user sessions (v3.0) | Bot             | Bot         |
| [`study_plan`](#study_plan)                       | Monthly study plans         | Admin           | Public      |
| [`study_schedule`](#study_schedule)               | Weekly stream schedule      | Admin           | Public      |
| [`study_global_settings`](#study_global_settings) | Global Study Hub settings   | Admin           | Public      |
| [`faq_items`](#faq_items)                         | FAQ articles                | Admin           | Public      |
| [`room_settings`](#room_settings)                 | Stream room info            | Admin           | Public      |
| [`inbox_questions`](#inbox_questions)             | User submitted questions    | Auth users      | Admin       |
| [`admins`](#admins)                               | Admin permissions           | Manual          | Auth check  |
| [`study_users`](#study_users)                     | User profiles (v2.4)        | Auth users      | Public      |
| [`study_handles`](#study_handles)                 | Unique @handle registry     | Auth users      | Public      |

---

<a name="bot_status_current"></a>

## `bot_status/current`

**Purpose**: Real-time bot & stream status for public dashboard  
**Writer**: YouTube Bot (Admin SDK)  
**Reader**: Web app (public via onSnapshot)

```typescript
{
  // Schema version
  schemaVersion: 1,

  // Bot process state
  online: boolean,                 // Bot is running
  actualState: 'running' | 'stopped',

  // Stream state
  streamOnline: boolean,           // Is YouTube stream live?
  streamId: string | null,         // YouTube video ID
  liveChatId: string | null,       // YouTube chat ID
  connectedAt: Timestamp | null,   // When stream started

  // Current mode (BOT_Definice.md naming)
  currentMode: 'Focus' | 'Break' | 'Long Break' | 'Pause' | 'Offline',
  phaseStartedAt: Timestamp | null,
  durationSec: number | null,      // Mode duration in seconds
  endsAt: Timestamp | null,        // When mode ends
  lastUpdatedAt: Timestamp,        // Last state change

  // Timeline (embedded, max 30 items)
  // Replaces events collection queries for cost optimization
  timelineCompact: Array<{
    t: Timestamp,
    type: string,           // 'start', 'focus', 'short_break', etc.
    labelKR: string,        // Korean label (e.g., '⏳ Focus 시작')
    labelEN: string,        // English label
    by: 'system' | 'admin' | 'user'
  }>,

  // Legacy fields (for backward compatibility during migration)
  mode: 'FOCUS' | 'BREAK' | 'LONG_BREAK' | 'PAUSE' | 'OFFLINE',
  modeStartedAt: Timestamp | null,
  modeEndsAt: Timestamp | null,
  uptimeSeconds: number,
  updatedAt: Timestamp
}
```

**UI Usage**: `StudyDashboard.tsx` displays live status + countdown via `useStudyStatus` hook

---

<a name="bot_status_heartbeat"></a>

## `bot_status/heartbeat`

**Purpose**: Bot health monitoring (admin/debug only - NOT for public dashboard)  
**Writer**: Bot (every 60s)  
**Reader**: Admin only (to avoid triggering reads on all clients)

```typescript
{
  lastHeartbeat: Timestamp,    // Last health check
  uptimeSeconds: number,       // Bot process uptime
  version: string,             // Bot version (e.g., '1.0.0')
  lastError: string | null     // Last error message if any
}
```

**Note**: Separated from `current` to prevent 60s heartbeat writes from triggering onSnapshot for all connected clients.

---

<a name="config_bot"></a>

## `config/bot`

**Purpose**: Bot configuration (admin-controlled)  
**Writer**: Admin  
**Reader**: Bot

```typescript
{
  desiredState: 'running' | 'stopped',

  pomodoro: {
    focusSec: 1500,       // 25 minutes
    breakSec: 300,        // 5 minutes
    longBreakSec: 900     // 15 minutes
  },

  chatMessages: {
    startKR: string, startEN: string,
    focusKR: string, focusEN: string,
    breakKR: string, breakEN: string,
    longBreakKR: string, longBreakEN: string,
    pauseKR: string, pauseEN: string,
    resumeKR: string, resumeEN: string,
    stopKR: string, stopEN: string
  },

  features: {
    autoAnnouncements: boolean,     // Send Korean messages on mode change
    writeEventsCollection: boolean  // Write to events collection (optional)
  },

  moderation: {
    adminChannelIds: string[]       // YouTube channel IDs with admin access
  },

  schemaVersion: 1,
  updatedAt: Timestamp
}
```

---

<a name="runtime_obspomodoro"></a>

## `runtime/obsPomodoro`

**Purpose**: OBS Pomodoro timer state synced from OBS Python script  
**Writer**: OBS Python script (via REST API)  
**Reader**: Web app (public), Bot  
**Added**: v2.9 (December 2024)

```typescript
{
  running: boolean,              // Timer is active
  mode: 'focus' | 'shortBreak' | 'longBreak' | 'paused' | 'ready' | 'completed',
  currentSession: number,        // Current pomodoro session (1-4)
  totalSessions: number,         // Total sessions in cycle
  durationSec: number,           // Phase duration in seconds
  remainingSeconds: number,      // Countdown remaining
  phaseStartedAt: Timestamp,     // When current phase started
  endsAt: Timestamp,             // When phase ends
  updatedAt: Timestamp           // Last update from OBS
}
```

**Security Note**: `allow write: if true` - OBS script uses API key, not Firebase Auth.

---

<a name="runtime_admincommand"></a>

## `runtime/adminCommand`

**Purpose**: Buffer for admin commands from web console  
**Writer**: Admin (via web console)  
**Reader**: Bot (listener for command execution)  
**Added**: v2.9 (December 2024)

```typescript
{
  command: string,               // Command text (e.g., "!bot pause")
  sentAt: Timestamp,             // When command was sent
  source: 'admin_console',       // Always 'admin_console'
  processed: boolean             // True after bot processes
}
```

**Workflow**: Admin sends → Bot listener receives → Bot marks processed → Bot executes

---

<a name="bot_commands"></a>

## `bot_commands/{id}`

**Purpose**: Custom chat command definitions  
**Writer**: Admin panel  
**Reader**: Admin, Bot  
**Added**: v2.9 (December 2024)

```typescript
{
  trigger: string,               // Command trigger (e.g., "!hello")
  response: string,              // Bot response text
  enabled: boolean,              // Command is active
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

<a name="stream_stats"></a>

## `stream_stats/current`

**Purpose**: Current stream activity metrics  
**Writer**: Bot (flushed every 30s)  
**Reader**: Public

```typescript
{
  schemaVersion: 1,
  activeUsersLast5minCount: number,   // Active users in last 5 minutes
  chatMessagesCount: number,          // Total messages this session
  lastMessageAt: Timestamp | null,    // Last chat activity
  updatedAt: Timestamp
}
```

---

<a name="events"></a>

## `events/{id}`

**Purpose**: Timeline events (stream start/stop, mode changes)  
**Writer**: Bot  
**Reader**: Public

```typescript
{
  type: 'STREAM_ONLINE' | 'STREAM_OFFLINE' |
        'FOCUS_START' | 'BREAK_START' | 'LONG_BREAK_START' |
        'DAILY_SUMMARY';
  timestamp: Timestamp;
  metadata?: {
    blocks?: number;
    minutes?: number;
    streamId?: string;
    // Event-specific data
  };
}
```

**Cleanup**: Cloud Function deletes events older than 30 days (weekly)

---

<a name="daily_stats"></a>

## `daily_stats/{YYYY-MM-DD}`

**Purpose**: Aggregated study statistics per day  
**Writer**: Bot (aggregation logic)  
**Reader**: Public

```typescript
{
  date: string; // 'YYYY-MM-DD'
  totalMinutes: number; // Study time in minutes
  blocks: number; // Pomodoro blocks
  sessions: number; // Number of sessions
  averageFocus: number; // Avg focus duration
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**UI Usage**: `StudyRecordsPage.tsx` → Heatmap visualization

---

<a name="study_sessions"></a>

## `study_sessions/{id}`

**Purpose**: Individual study session records (v3.0 - extended for per-user aggregation)  
**Writer**: Bot  
**Reader**: Public

```typescript
{
  schemaVersion: 2;
  userKey: string; // YouTube channel ID (stable identifier)
  displayNameSnapshot: string; // Display name at session time
  startedAt: Timestamp;
  endedAt: Timestamp;
  durationSec: number; // Duration in seconds (more precise)
  dayKey: string; // 'YYYY-MM-DD' in KST timezone
  streamId: string | null; // YouTube video ID if during stream
  source: "youtube_bot" | "web" | "obs_timer";
  mode: "focus" | "break";
}
```

**Indexes Required**:

- `userKey ASC, dayKey DESC` - Per-user daily stats aggregation
- `dayKey ASC` - Global leaderboard

**UI Usage**: Aggregation queries for user stats, Recent Sessions widget

---

<a name="active_sessions"></a>

## `active_sessions/{channelId}`

**Purpose**: Temporary backup for active user sessions (Cloud Run robustness)  
**Writer**: Bot (Admin SDK)  
**Reader**: Bot (Admin SDK)  
**Added**: v3.0 (December 2024)

**Document ID**: YouTube channel ID

```typescript
{
  channelId: string; // YouTube channel ID
  displayName: string; // Display name snapshot
  startedAt: Timestamp;
  streamId: string | null; // Current stream ID
  mode: "FOCUS" | "BREAK";
  source: "youtube_bot";
}
```

**Lifecycle**:

1. Created synchronously on `!start` command
2. Deleted on `!stop` command (after saving to study_sessions)
3. Auto-deleted on stream end (onStreamEndCleanup)

**Why**: Cloud Run can scale to multiple instances. In-memory session state is not shared. This collection ensures `!stop` works even if it hits a different instance than `!start`.

---

<a name="study_plan"></a>

## `study_plan/{month}`

**Purpose**: Monthly study goals and tasks  
**Writer**: Admin panel  
**Reader**: Public

**Document ID**: `YYYY-MM` (e.g., `2024-12`)

```typescript
{
  month: string; // 'YYYY-MM'
  status: "planned" | "active" | "completed";
  goals: {
    kr: string; // Korean description
    en: string; // English description
  }
  tasks: Array<{
    id: string;
    kr: { title: string; description?: string };
    en: { title: string; description?: string };
    completed: boolean;
    order: number;
  }>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**UI Usage**: `StudyPlanPage.tsx` displays 10 months

---

<a name="study_schedule"></a>

## `study_schedule/current`

**Purpose**: Weekly stream schedule (v2.5)  
**Writer**: Admin panel (`/admin/study-schedule`)  
**Reader**: Public (Dashboard when offline)

```typescript
{
  schemaVersion: number; // 1
  monday: string; // "Today is rest day!"
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  updatedAt: Timestamp;
}
```

**UI Usage**: `StudyDashboard.tsx` shows current day's schedule when stream is offline

---

<a name="study_global_settings"></a>

## `study_global_settings/current`

**Purpose**: Global Study Hub settings (v2.4)  
**Writer**: Admin panel (`/admin/study-global-settings`)  
**Reader**: Public

```typescript
{
  schemaVersion: number; // 1
  motivationQuote: string; // Korean motivational quote
  youtubeLink: string; // YouTube channel URL
  youtubeName: string; // @handle display
  instagramLink: string;
  instagramName: string;
  kakaoLink: string;
  kakaoId: string;
  updatedAt: Timestamp;
}
```

**UI Usage**: `StudyLayout.tsx` header displays social links and quote

---

<a name="faq_items"></a>

## `faq_items/{id}`

**Purpose**: FAQ knowledge base articles  
**Writer**: Admin panel  
**Reader**: Public

```typescript
{
  kr: {
    title: string;
    body: string;             // Markdown supported
  };
  en: {
    title: string;
    body: string;
  };
  category: 'general' | 'technical' | 'study' | 'stream';
  published: boolean;         // Only published shown to users
  order: number;              // Display order
  createdAt: Timestamp;
  updatedAt: Timestamp;
  archivedAt?: Timestamp;     // For bulk archive
}
```

**CRITICAL**: Web app must map `{kr, en}` to `{q, a}` based on active language!

```typescript
// StudyFAQPage.tsx
const q = studyLang === "kr" ? item.kr.title : item.en.title;
const a = studyLang === "kr" ? item.kr.body : item.en.body;
```

---

<a name="room_settings"></a>

## `room_settings/current`

**Purpose**: Gooroomee room information  
**Writer**: Admin panel  
**Reader**: Public

```typescript
{
  link: string; // Gooroomee room URL
  password: string; // Room password
  rules: {
    kr: string; // Room rules in Korean
    en: string; // Room rules in English
  }
  active: boolean; // Is room currently active?
  updatedAt: Timestamp;
}
```

**UI Usage**: `StudyDashboard.tsx` → "스터디룸 입장" expandable card

---

<a name="inbox_questions"></a>

## `inbox_questions/{id}`

**Purpose**: Anonymous questions submitted by users  
**Writer**: Authenticated users  
**Reader**: Admin only

```typescript
{
  question: string;
  userId: string;            // Firebase Auth UID
  userEmail?: string;        // Optional
  language: 'kr' | 'en';     // Submission language
  status: 'pending' | 'answered' | 'archived';
  answeredAt?: Timestamp;
  convertedToFaqId?: string; // If converted to FAQ
  createdAt: Timestamp;
}
```

**Security Rule**: User can only create with their own `userId`. Admin can read/write/delete all.

---

<a name="admins"></a>

## `admins/{uid}`

**Purpose**: Admin permission tracking  
**Writer**: Manual (Firestore Console)  
**Reader**: Auth checks

```typescript
{
  isAdmin: boolean; // MUST be true for admin access
  email: string; // Admin email (for reference)
  createdAt: Timestamp;
}
```

**Security Rule**: Only users in this collection with `isAdmin: true` can access `/admin`.

---

<a name="study_users"></a>

## `study_users/{uid}`

**Purpose**: User profile data for Study Hub  
**Writer**: Authenticated users (own profile only)  
**Reader**: Public  
**Added**: v2.4 (December 2024)

```typescript
{
  schemaVersion: number;          // Currently 1
  handle: string;                 // Unique @handle (3-20 chars, lowercase)
  displayName?: string;           // Display name (3-20 chars)
  bio?: string;                   // User bio (max 200 chars)
  avatarUrl?: string;             // Profile image URL
  preferredLang: 'kr' | 'en';     // Preferred language
  status: 'studying' | 'break' | 'offline';
  studyVibe?: {
    template: string;             // Vibe template ID
    customText?: string;          // Custom vibe text (max 50 chars)
  };
  socialLinks?: {
    youtube?: string;
    instagram?: string;
    discord?: string;
    x?: string;
  };
  stats: {
    totalHours: number;
    currentStreak: number;
    weeklyAverage: number;
  };
  badges: string[];               // Array of earned badge IDs
  faqStats: {
    totalAsked: number;
    todayAsked: number;
  };
  tosAcceptedAt: Timestamp;       // When ToS was accepted
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**UI Usage**: `StudyProfilePage.tsx`, `useUserProfile.ts` hook

---

<a name="study_handles"></a>

## `study_handles/{handle}`

**Purpose**: Registry for unique @handles  
**Writer**: Authenticated users (on registration only)  
**Reader**: Public (for availability check)  
**Added**: v2.4 (December 2024)

**Document ID**: Lowercase handle (e.g., `dominik123`)

```typescript
{
  uid: string; // Firebase Auth UID
  createdAt: Timestamp;
}
```

**Security Rule**: User can only create/update their own handle document. Document ID must match the handle field in their `study_users` profile.

---

## Firestore Rules Summary

```javascript
// Public read, admin write
match /study_plan/{document} {
  allow read: if true;
  allow write: if isAdmin();
}

// Bot-only write (Admin SDK), public read
match /bot_status/{document} {
  allow read: if true;
  allow write: if false;  // Only Admin SDK
}

// Inbox: auth create own, admin all
match /inbox_questions/{questionId} {
  allow read: if isAuthenticated();
  allow create: if isAuthenticated() &&
                   request.resource.data.userId == request.auth.uid;
  allow update, delete: if isAdmin();
}

function isAdmin() {
  return request.auth != null &&
         get(/databases/$(database)/documents/admins/$(request.auth.uid))
           .data.isAdmin == true;
}
```

---

## Migration Notes

**FROZEN**: This schema is production-stable. Changes require:

1. User approval
2. Migration script
3. Updated Firestore rules
4. TypeScript type updates (`src/types/study-db.ts`)

---

**You are in**: `docs/docs/DATA_MODEL.md`  
**Last Schema Change**: October 2024 (P.5 implementation)  
**Status**: Frozen ❄️
