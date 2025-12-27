# YouTube Study Bot (Dominik) — Spec & Docs (Firestore Realtime)

**Project**: dominik.tyrnel.com + YouTube “Study With Me”  
**Version of this doc**: 3.0  
**Last updated**: 2024-12-27

> This document updates your current `BOT.md` so it matches what you want now:
>
> - automatic KR chat messages on Focus / Break / Long Break / Pause / Resume / Start / Stop
> - realtime dashboard **without** wasteful Firestore traffic
> - Firebase billing rules explained for devs
> - **v3.0**: Cloud Run multi-instance robustness via `active_sessions` backup
> - **v3.0**: Extended `study_sessions` schema with `userKey`, `durationSec`, `dayKey`

---

## TL;DR (what to build)

1. Keep **Variant 1**: the public `/study/now` page uses **one** realtime listener:
   - `onSnapshot(doc(db, "bot_status", "current"))`

2. **Never write “ticks”** (no per-second/per-15s updates to `bot_status/current`).
   - Only write on **state changes**.

3. Avoid realtime listeners on queries (timeline collections).
   - Put a small **`timelineCompact` array (max 30 items)** directly inside `bot_status/current`.

4. If you still want heartbeat, store it separately:
   - `bot_status/heartbeat` (admin/debug only; not used by the public dashboard).

---

## Contents

- [1. Goals & non-goals](#1-goals--non-goals)
- [2. Current architecture (as-is)](#2-current-architecture-as-is)
- [3. Final realtime model (Variant 1)](#3-final-realtime-model-variant-1)
- [4. Firestore data model](#4-firestore-data-model)
- [5. Bot behavior](#5-bot-behavior)
- [6. Automatic chat messages (KR/EN)](#6-automatic-chat-messages-kren)
- [7. Commands](#7-commands)
- [8. Web integration (React/Next)](#8-web-integration-reactnext)
- [9. Firebase security rules (safe + cheap)](#9-firebase-security-rules-safe--cheap)
- [10. Firebase billing & performance notes (for dev)](#10-firebase-billing--performance-notes-for-dev)
- [11. Deployment (PM2)](#11-deployment-pm2)
- [12. Troubleshooting](#12-troubleshooting)

---

## 1. Goals & non-goals

### Goals

- Bot reads YouTube Live chat and handles commands (`!start`, `!stop`, …)
- Bot connects to OBS WebSocket and detects **mode changes** from scenes (Focus/Break/Long Break/Pause)
- Bot writes a single canonical “live state” document to Firestore for the website dashboard
- Bot posts short Korean announcements automatically when mode changes
- Dashboard updates in near-realtime with minimal Firestore operations

### Non-goals (for now)

- Full multi-user presence / per-user “online now” heartbeats (too expensive and noisy)
- Leaderboards (unless later explicitly requested)
- Autopomodoro timer that progresses itself without OBS/admin events (optional later)

---

## 2. Current architecture (as-is)

Directory layout:

```text
study_bot/
├── src/
│   ├── core/
│   │   ├── botController.ts
│   │   ├── streamManager.ts
│   │   ├── statsManager.ts
│   │   ├── youtubeManager.ts
│   │   └── obsManager.ts
│   ├── utils/
│   │   ├── firebase.ts
│   │   └── logger.ts
│   └── index.ts
├── dist/
├── logs/
├── ecosystem.config.js
├── service-account.json (GITIGNORED)
└── package.json
```

Core flow (today):

- `botController` listens to `config/bot.desiredState` (running / stopped)
- If running: YouTube manager connects to chat, OBS manager connects to OBS, Stream manager writes status/heartbeat
- Commands create/update `study_sessions`, update `stream_stats/current`, aggregate `daily_stats/{date}`

---

## 3. Final realtime model (Variant 1)

### Key decision: the public dashboard listens to **one doc only**

Public `/study/now`:

- `bot_status/current` via `onSnapshot` (document listener)

What **must NOT** happen:

- a public listener to a timeline query like `events` or `study_sessions` (query listeners scale badly with audience)
- frequent “heartbeat” writes to `bot_status/current` (every write becomes a read for every connected client)

---

## 4. Firestore data model

### 4.1 `config/bot` (control + settings)

Doc: `config/bot`

```ts
type ConfigBot = {
  desiredState: "running" | "stopped";

  pomodoro: {
    focusSec: number; // 1500
    breakSec: number; // 300
    longBreakSec: number; // 900
  };

  chatMessages: {
    startKR: string;
    startEN: string;
    focusKR: string;
    focusEN: string;
    breakKR: string;
    breakEN: string;
    longBreakKR: string;
    longBreakEN: string;
    pauseKR: string;
    pauseEN: string;
    resumeKR: string;
    resumeEN: string;
    stopKR: string;
    stopEN: string;
  };

  moderation: {
    adminChannelIds: string[]; // allowlist, optional
    modChannelIds: string[]; // allowlist, optional
  };

  features: {
    autoAnnouncements: boolean; // true
    writeEventsCollection: boolean; // false by default
  };
};
```

### 4.2 `bot_status/current` (PUBLIC realtime dashboard doc)

Doc: `bot_status/current`

**This doc should change ONLY on state changes.**

```ts
type BotStatusCurrent = {
  // bot process state
  online: boolean; // bot running
  actualState: "running" | "stopped";

  // stream state
  streamOnline: boolean; // Dominik is live
  streamId?: string | null;
  liveChatId?: string | null;
  streamTitle?: string | null;
  streamUrl?: string | null;
  thumbnailUrl?: string | null;

  // pomodoro / mode
  currentMode: "Focus" | "Break" | "Long Break" | "Pause" | "Offline";
  phaseStartedAt?: FirebaseFirestore.Timestamp | null;
  durationSec?: number | null;
  endsAt?: FirebaseFirestore.Timestamp | null;

  // timestamps
  connectedAt?: FirebaseFirestore.Timestamp | null;
  lastUpdatedAt: FirebaseFirestore.Timestamp; // update only on state change

  // tiny timeline for UI (max 30)
  timelineCompact?: Array<{
    t: FirebaseFirestore.Timestamp;
    type: string; // focus_start / break_start / ...
    labelKR: string;
    labelEN?: string;
    by: "system" | "admin" | "user";
  }>;
};
```

### 4.3 `bot_status/heartbeat` (ADMIN/debug only)

Doc: `bot_status/heartbeat`  
This doc may update every 60–120s if desired, but **public pages should not listen to it**.

```ts
type BotHeartbeat = {
  lastHeartbeat: FirebaseFirestore.Timestamp;
  uptimeSeconds: number;
  version?: string;
  lastError?: string | null;
};
```

### 4.6 `study_sessions/{id}` (v3.0 extended schema)

Collection: `study_sessions`  
Created on `!stop` with extended fields for per-user aggregation.

```ts
type StudySession = {
  schemaVersion: 2;
  userKey: string; // YouTube channel ID
  displayNameSnapshot: string; // Display name at session time
  startedAt: Timestamp;
  endedAt: Timestamp;
  durationSec: number; // Duration in seconds
  dayKey: string; // 'YYYY-MM-DD' in KST
  streamId: string | null;
  source: "youtube_bot" | "web" | "obs_timer";
  mode: "focus" | "break";
};
```

**Per-user stats**: Calculated via Firestore aggregation queries (`sum`, `count`) on web.

### 4.7 `active_sessions/{channelId}` (v3.0 Cloud Run backup)

Doc: `active_sessions/{channelId}`  
Temporary backup for Cloud Run multi-instance robustness.

```ts
type ActiveSession = {
  channelId: string;
  displayName: string;
  startedAt: Timestamp;
  streamId: string | null;
  mode: "FOCUS" | "BREAK";
  source: "youtube_bot";
};
```

**Lifecycle**:

1. Created synchronously on `!start` (before chat response)
2. Deleted on `!stop` (after saving to study_sessions)
3. Fallback read if in-memory session not found (multi-instance scenario)

### 4.8 `daily_stats/{YYYY-MM-DD}` (heatmap)

Doc: `daily_stats/2025-12-25`

```ts
type DailyStats = {
  date: string; // "YYYY-MM-DD"
  totalMinutes: number; // increment
  blocks: number; // increment
  sessions: number; // increment
  updatedAt: FirebaseFirestore.Timestamp;
};
```

### 4.6 `stream_stats/current` (optional)

Doc: `stream_stats/current`  
Only if you really need it on UI. Otherwise skip.

---

## 5. Bot behavior

### 5.1 Startup / shutdown

- `botController` listens to `config/bot.desiredState`
- On `running`:
  - connect YouTube chat
  - connect OBS WebSocket
  - set `bot_status/current.actualState = "running", online=true`
- On `stopped`:
  - disconnect managers
  - set `bot_status/current.actualState = "stopped", online=false, streamOnline=false, currentMode="Offline"`

### 5.2 Stream detection

You have two options (both can exist):

- A) Poll YouTube API to detect active live stream and get `liveChatId` (recommended)
- B) Manual admin command that sets streamOnline true/false (fallback)

### 5.3 Mode detection via OBS scenes

OBS scene change -> detect mode:

- Focus scene => mode = Focus, duration = focusSec
- Break scene => mode = Break, duration = breakSec
- Long Break => mode = Long Break, duration = longBreakSec
- Pause => mode = Pause, endsAt null (or keep endsAt but paused)

On each mode change:

1. update `bot_status/current` (single write)
2. append timelineCompact (max 30)
3. post automatic KR message to YouTube chat (deduped + rate limited)

### 5.4 Stats aggregation

Stop doing “StatsManager listens to study_sessions changes”.  
Instead:

- on `!stop`, compute duration, blocks, etc
- update `daily_stats/{date}` with atomic increments

---

## 6. Automatic chat messages (KR/EN)

**Requirement**: one fixed message per event, short + clear, start/stop motivational.

Store them in `config/bot.chatMessages`:

```text
START
KR: 🔥 스터디 시작해요. 오늘도 같이 해봐요. 집중 갑시다.
EN: 🔥 Study starts now. Let’s focus together.

FOCUS START
KR: ⏳ Focus 시작. 알림 끄고 딱 25분만 가요.
EN: ⏳ Focus started. Just 25 minutes.

BREAK START
KR: ☕ 쉬는 시간! 물 마시고 스트레칭 1분만.
EN: ☕ Break time. Water + stretch.

LONG BREAK START
KR: 🧘‍♂️ 롱브레이크! 눈·어깨 풀고 다시 돌아와요.
EN: 🧘‍♂️ Long break. Reset and come back.

PAUSE
KR: ⏸️ 잠깐 멈출게요. 곧 다시 시작해요.
EN: ⏸️ Paused. Back soon.

RESUME
KR: ▶️ 다시 시작! 지금부터 또 집중해요.
EN: ▶️ Resumed. Focus again.

STOP
KR: ✅ 오늘 스터디 끝! 여기까지 온 것만으로도 충분히 잘했어요.
EN: ✅ Study finished. You did great today.
```

### 6.1 When to announce

- START: when `streamOnline` becomes true OR first Focus after stream starts
- FOCUS/BREAK/LONG: when `currentMode` changes to those values
- PAUSE: when `currentMode` becomes Pause
- RESUME: when leaving Pause to Focus (or previous mode)
- STOP: when stream ends or admin `!bot stop`

### 6.2 Dedup / anti-spam

Keep in memory:

- `lastAnnouncedKey` (e.g., "FOCUS_START")
- `lastAnnouncedAt`
  Rules:
- only announce if key changed
- minimal interval 5 seconds (safety)

---

## 7. Commands

### 7.1 Viewer commands (MVP)

- `!help` – show available commands
- `!start` – start a personal study session
- `!stop` – stop the personal session
- `!pause` – pause personal session (optional)
- `!resume` – resume personal session (optional)
- `!stats` – show today's stats (optional)

Rate limits:

- per user: 1 command / 10s
- global: 1 bot reply / 2s

### 7.2 Admin commands

- `!bot pause` – set global mode Pause + announce
- `!bot resume` – resume (Focus) + announce
- `!bot stop` – set streamOnline false + announce STOP
- `!bot phase focus|break|long` – force mode + announce
- `!bot announce <text>` – manual message (max 1/min)

---

## 8. Web integration (React/Next)

### 8.1 `/study/now` (Dashboard)

Use exactly one listener:

```ts
import { doc, onSnapshot } from "firebase/firestore";

const ref = doc(db, "bot_status", "current");
const unsub = onSnapshot(ref, (snap) => {
  const data = snap.data();
  // update UI
});
```

Timer UI logic:

- never read time every second from Firestore
- compute locally:
  - `elapsed = now - phaseStartedAt`
  - `remaining = durationSec - elapsed`

Timeline UI:

- render `timelineCompact` from the same document
- no query listeners

### 8.2 `/study/records`

- load `daily_stats` with `getDocs(query(limit(30)))`
- load latest `study_sessions` with `getDocs(limit(10))` only when needed
- do not enable realtime listeners here for now

---

## 9. Firebase security rules (safe + cheap)

### 9.1 Public read policy

Public website can read:

- `bot_status/current`
- `daily_stats/*`
  Optionally:
- `stream_stats/current`
- `study_sessions` (read-only; but consider privacy)

Public website cannot write to any bot collections.

### 9.2 Avoid extra reads in rules

If you use `get()` or `exists()` inside rules, it performs extra document reads (billed), even if the request is denied.
Try to write rules without cross-document reads for public resources.

---

## 10. Firebase billing & performance notes (for dev)

### 10.1 What costs money

Firestore bills:

- document reads
- document writes
- document deletes

Reads include:

- normal `getDoc/getDocs`
- updates delivered via realtime listeners
- reads required to evaluate security rules

### 10.2 Why we remove heartbeat writes to `bot_status/current`

Every write to `bot_status/current` will push an update to every connected client listener.
That means:

- 1 write can cause N reads (N = number of open dashboards)

With 10–15 people it is still OK, but it scales badly.
So:

- update `bot_status/current` only on real changes
- keep optional heartbeat in `bot_status/heartbeat` and don’t show it on public dashboard

### 10.3 Query listeners are dangerous

Listening to query results charges reads when:

- documents are added/updated in result set
- documents are removed from result set because they changed
  So do not use a realtime query listener for timeline.
  Use `timelineCompact` in one doc instead.

### 10.4 Free tier reminder

Spark free quota (daily) includes:

- 50,000 document reads/day
- 20,000 document writes/day
- 20,000 document deletes/day

---

## 11. Deployment (PM2)

Keep your existing `ecosystem.config.js`.  
Recommended env changes:

- Remove (or increase) `HEARTBEAT_INTERVAL_MS` usage for `bot_status/current`
- If you keep heartbeat, write to `bot_status/heartbeat` every 60–120s

Example:

```js
env: {
  NODE_ENV: "production",
  HEARTBEAT_INTERVAL_MS: 60000, // if used at all
  FIREBASE_PROJECT_ID: "tyrnel-web-portfolio",
}
```

---

## 12. Troubleshooting

### Bot shows offline in web

Check:

- `config/bot.desiredState === "running"`
- `bot_status/current.actualState === "running"`
- PM2 logs: `pm2 logs study-bot --lines 200`

### Dashboard timer freezes

Common causes:

- `phaseStartedAt` missing
- `durationSec` missing
- client code uses Firestore `endsAt` directly and doesn’t compute locally

### Too many reads

Check:

- is `/study/now` listening to more than 1 doc?
- is there a query listener for timeline or sessions?
- is `bot_status/current` being updated on a timer?
