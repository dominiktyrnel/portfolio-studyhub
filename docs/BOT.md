# YouTube Study Bot Documentation

## Complete Bot Architecture & Integration

**Bot Type**: YouTube Live Stream Chat Bot  
**Purpose**: Real-time study session tracking, automatic announcements, and moderation  
**Language**: TypeScript (Node.js)  
**Location**: `study_bot/` directory  
**Version**: 3.0.0 (December 2024)  
**Deployment**: Google Cloud Run (europe-west1)

---

## Recent Changes (December 2024)

### Bot Stats Optimization (v3.0.0)

- **Cloud Run Multi-Instance Robustness**: `active_sessions` collection as fallback
- **Firestore Writes Optimization**: Reduced from 3 writes to 1 write + 1 delete per `!stop`
- **Auto-Close Sessions**: Forgotten sessions auto-close on next `!start`
- **Stream End Cleanup**: `onStreamEndCleanup()` closes all active sessions
- **Better Feedback**: `!stop` shows study duration in minutes

### Cloud Run Deployment (v1.2.0)

- **Platform**: Google Cloud Run with Docker container
- **Region**: europe-west1
- **Health Check**: `/health` endpoint on port 8080
- **Secrets**: YouTube OAuth2 credentials via Cloud Run environment variables

### Adaptive Chat Polling

- **Fast Mode**: 3s polling when chat is active
- **Slow Mode**: 15s polling after 2 minutes of inactivity
- **Benefit**: Faster command response + YouTube API quota savings

### Admin Command Console

- **Feature**: Send bot commands from admin panel (useful for mobile streaming)
- **Integration**: Writes to `runtime/adminCommand`, bot processes via listener
- **Method**: `youtubeManager.executeAdminCommand()`

### Data Model Harmonization (BOT_Definice.md)

- **Heartbeat separation**: `bot_status/heartbeat` separate from `bot_status/current`
- **New field names**: `currentMode`, `phaseStartedAt`, `endsAt`, `durationSec`
- **timelineCompact**: Recent events array (max 30) embedded in `bot_status/current`
- **Legacy compatibility**: Old field names still written for migration period

### YouTube Live Chat Integration

- **Real OAuth2**: Full googleapis integration with refresh token
- **Chat polling**: API-recommended interval with rate limiting
- **Commands**: !help, !start, !stop, !stats, !bot \*
- **Auto-announcements**: Korean messages on mode changes

### Code Quality Audit

- **All P0/P1 issues fixed**: Memory leaks, race conditions, timezone, console.log
- **Firestore transactions**: timelineCompact uses atomic operations
- **Timezone**: Daily stats key uses Asia/Seoul (Korea timezone)

---

## Architecture

### Components

```
study_bot/
├── src/
│   ├── api/
│   │   └── healthCheck.ts      # HTTP health endpoint
│   ├── core/
│   │   ├── botController.ts    # Main orchestrator (start/stop)
│   │   ├── streamManager.ts    # Heartbeat & bot_status updates
│   │   ├── statsManager.ts     # Daily stats aggregation (KST)
│   │   ├── youtubeManager.ts   # YouTube Live Chat API (REAL)
│   │   ├── obsManager.ts       # OBS WebSocket + timelineCompact
│   │   └── obsDetector.ts      # State change detection
│   ├── lib/
│   │   └── writeThrottle.ts    # Rate limiting for Firestore
│   └── index.ts                # Entry point
├── scripts/
│   ├── get-youtube-token.ts    # OAuth refresh token helper
│   ├── init-bot-config.ts      # Initialize config/bot document
│   └── seed-test-data.ts       # Test data for web integration
├── dist/                       # Compiled JavaScript
├── .env                        # YouTube API credentials (GITIGNORED)
├── service-account.json        # Firebase Admin credentials (GITIGNORED)
└── package.json
```

### Bot Flow

```
1. Bot starts via `npm run dev` or PM2
   ↓
2. Listens to config/bot.desiredState
   ↓
3. If desiredState === 'running':
   - StreamManager: starts heartbeat (60s → bot_status/heartbeat)
   - ObsManager: listens to runtime/obsPomodoro
   - YoutubeManager: connects to YouTube Live Chat API
   ↓
4. On OBS scene change (Focus/Break/Pause):
   - Updates bot_status/current with new mode
   - Appends to timelineCompact (max 30 items)
   - Sends Korean announcement to chat
   ↓
5. On chat command (!start, !stop, etc.):
   - Tracks session in daily_stats
   - Responds in chat
   ↓
6. On shutdown:
   - ObsManager: stopListening() (unsubscribe)
   - YoutubeManager: disconnect()
   - StreamManager: setOffline()
```

---

## Core Components

### BotController (`core/botController.ts`)

**Responsibility**: Orchestrating all bot subsystems

```typescript
// Listens to config/bot.desiredState
this.db.doc("config/bot").onSnapshot((snap) => {
  const desired = snap.data()?.desiredState;
  if (desired === "running" && !this.isRunning) {
    this.boot();
  } else if (desired === "stopped" && this.isRunning) {
    this.shutdown();
  }
});

// Graceful shutdown (all managers stopped properly)
private async shutdown() {
  this.managers.stream.stopHeartbeat();
  this.managers.obs.stopListening();      // ← Unsubscribes listener
  this.managers.youtube.disconnect();     // ← Stops polling
  await this.managers.stream.setOffline();
}
```

---

### StreamManager (`core/streamManager.ts`)

**Responsibility**: Heartbeat and `bot_status/current` updates

**Key changes**:

- Heartbeat writes to `bot_status/heartbeat` (NOT `current`) every 60s
- `bot_status/current` updated only on state changes
- Uses WriteThrottle for rate limiting

```typescript
// Heartbeat document (admin/debug only)
{
  lastHeartbeat: Timestamp,
  uptimeSeconds: number,
  version: "1.0.0",
  lastError: null
}

// Current status document (public dashboard)
{
  online: true,
  actualState: 'running',
  streamOnline: boolean,
  currentMode: 'Focus' | 'Break' | 'Long Break' | 'Pause' | 'Offline',
  phaseStartedAt: Timestamp,
  durationSec: number,
  endsAt: Timestamp,
  timelineCompact: [...],  // Last 30 events
  // Legacy fields for backward compatibility
  mode: 'FOCUS',
  modeStartedAt: Timestamp,
  modeEndsAt: Timestamp
}
```

---

### YoutubeManager (`core/youtubeManager.ts`)

**Responsibility**: YouTube Live Chat API integration

**Features**:

- OAuth2 authentication with refresh token
- Auto-detection of active live broadcast
- Chat polling with API-recommended interval
- Command parsing with rate limiting (10s per user)
- Automatic announcements on mode changes (deduplicated 5s)

**Commands**:

| Command                         | Type   | Description                  | Response             |
| ------------------------------- | ------ | ---------------------------- | -------------------- |
| `!help`                         | Viewer | Show available commands      | Korean help text     |
| `!start`                        | Viewer | Start personal study session | Confirmation         |
| `!stop`                         | Viewer | End session                  | Thanks message       |
| `!stats`                        | Viewer | Today's statistics           | Hours/minutes/blocks |
| `!bot pause`                    | Admin  | Global pause                 | Pause announcement   |
| `!bot resume`                   | Admin  | Resume from pause            | Resume announcement  |
| `!bot stop`                     | Admin  | End stream session           | Stop announcement    |
| `!bot phase focus\|break\|long` | Admin  | Force mode                   | -                    |
| `!bot announce <text>`          | Admin  | Custom message               | Message sent         |

**Environment Variables**:

```env
YOUTUBE_CLIENT_ID=...
YOUTUBE_CLIENT_SECRET=...
YOUTUBE_REFRESH_TOKEN=...  # Get via scripts/get-youtube-token.ts
```

---

### ObsManager (`core/obsManager.ts`)

**Responsibility**: OBS state detection and mode updates

**Key features**:

- Listens to `runtime/obsPomodoro` document
- Maps OBS phases to mode names (BOT_Definice.md format)
- Maintains `timelineCompact` array (max 30 items)
- Calls YoutubeManager.announceEvent() on mode changes
- Uses Firestore transaction for atomic updates

**Mode mapping**:

```typescript
// OBS phase → New format → Legacy format
'focus'      → 'Focus'      → 'FOCUS'
'shortBreak' → 'Break'      → 'BREAK'
'longBreak'  → 'Long Break' → 'LONG_BREAK'
'paused'     → 'Pause'      → 'PAUSE'
```

---

### StatsManager (`core/statsManager.ts`)

**Responsibility**: User session tracking and daily statistics aggregation

**Key features (v3.0)**:

- Uses Korea timezone (Asia/Seoul) for dayKey
- Cloud Run multi-instance robustness via `active_sessions` backup
- Session data stored in `study_sessions` (extended schema v2)
- Auto-close forgotten sessions on duplicate `!start`

**Methods**:

| Method                 | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| `onSessionStart()`     | Starts session, writes to `active_sessions`                         |
| `onSessionEnd()`       | Ends session, writes to `study_sessions`, deletes `active_sessions` |
| `onStreamEndCleanup()` | Auto-closes all active sessions                                     |
| `hasActiveSession()`   | Checks if user has active session in memory                         |

**Firestore Operations per Command**:

| Command  | Writes              | Deletes             | Reads (fallback)              |
| -------- | ------------------- | ------------------- | ----------------------------- |
| `!start` | 1 (active_sessions) | -                   | -                             |
| `!stop`  | 1 (study_sessions)  | 1 (active_sessions) | 0-1 (multi-instance fallback) |

---

## Firestore Data Model

### `bot_status/current` (Public dashboard)

```typescript
{
  schemaVersion: 1,
  online: boolean,
  actualState: 'running' | 'stopped',
  streamOnline: boolean,
  streamId: string | null,
  liveChatId: string | null,
  connectedAt: Timestamp | null,

  // Mode (new format - BOT_Definice.md)
  currentMode: 'Focus' | 'Break' | 'Long Break' | 'Pause' | 'Offline',
  phaseStartedAt: Timestamp | null,
  durationSec: number | null,
  endsAt: Timestamp | null,
  lastUpdatedAt: Timestamp,

  // Timeline (embedded, max 30)
  timelineCompact: Array<{
    t: Timestamp,
    type: string,
    labelKR: string,
    labelEN: string,
    by: 'system' | 'admin' | 'user'
  }>,

  // Legacy fields (for migration)
  mode: 'FOCUS' | 'BREAK' | 'LONG_BREAK' | 'PAUSE' | 'OFFLINE',
  modeStartedAt: Timestamp | null,
  modeEndsAt: Timestamp | null,
  updatedAt: Timestamp
}
```

### `bot_status/heartbeat` (Admin/debug only)

```typescript
{
  lastHeartbeat: Timestamp,
  uptimeSeconds: number,
  version: string,
  lastError: string | null
}
```

### `config/bot`

```typescript
{
  desiredState: 'running' | 'stopped',
  pomodoro: {
    focusSec: 1500,      // 25 min
    breakSec: 300,       // 5 min
    longBreakSec: 900    // 15 min
  },
  chatMessages: {
    startKR: string, startEN: string,
    focusKR: string, focusEN: string,
    breakKR: string, breakEN: string,
    // ... etc
  },
  features: {
    autoAnnouncements: boolean,
    writeEventsCollection: boolean
  },
  moderation: {
    adminChannelIds: string[]
  }
}
```

### `study_sessions/{id}` (v2 - Extended)

```typescript
{
  schemaVersion: 2,
  userKey: string,              // YouTube channel ID
  displayNameSnapshot: string,  // Display name at session time
  startedAt: Timestamp,
  endedAt: Timestamp,
  durationSec: number,          // Duration in seconds
  dayKey: string,               // 'YYYY-MM-DD' in KST
  streamId: string | null,
  source: 'youtube_bot' | 'web' | 'obs_timer',
  mode: 'focus' | 'break'
}
```

### `active_sessions/{channelId}` (v3.0 - Cloud Run Backup)

```typescript
{
  channelId: string,
  displayName: string,
  startedAt: Timestamp,
  streamId: string | null,
  mode: 'FOCUS' | 'BREAK',
  source: 'youtube_bot'
}
```

**Purpose**: Temporary backup for Cloud Run multi-instance robustness.  
**Lifecycle**: Created on `!start`, deleted on `!stop` or stream end.

---

## Deployment

### Environment Setup

1. **YouTube OAuth credentials**:

   ```bash
   cd study_bot
   cp .env.example .env
   # Add YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET
   npx ts-node scripts/get-youtube-token.ts
   # Add YOUTUBE_REFRESH_TOKEN from output
   ```

2. **Firebase service account**:
   - Download from Firebase Console → Project Settings → Service Accounts
   - Save as `study_bot/service-account.json`

3. **Initialize Firestore config**:
   ```bash
   npx ts-node scripts/init-bot-config.ts
   ```

### Development

```bash
cd study_bot
npm run dev
```

### Production (PM2)

```bash
npm run build
pm2 start ecosystem.config.js
pm2 save
```

### Health Check

```bash
# Bot exposes health endpoint on port 3000
curl http://localhost:3000/health
curl http://localhost:3000/ping
```

---

## Firestore Security Rules

```javascript
// Bot status - public read, server-only write
match /bot_status/current {
  allow read: if true;
  allow write: if false;  // Admin SDK only
}

// Heartbeat - admin only (to avoid triggering reads)
match /bot_status/heartbeat {
  allow read: if isAdmin();
  allow write: if false;
}

// Config - admin only
match /config/bot {
  allow read: if isAdmin();
  allow write: if isAdmin();
}
```

---

## Troubleshooting

### Bot won't connect to YouTube

1. Check `.env` has all 3 YouTube credentials
2. Verify refresh token is valid (re-run get-youtube-token.ts if needed)
3. Check YouTube API quota in Google Cloud Console

### Dashboard shows stale data

1. Check `bot_status/current.lastUpdatedAt` in Firestore
2. Verify bot is running: `pm2 status` or check /health endpoint
3. Check OBS is sending scene changes

### Memory issues on long streams

- Memory leak fixes implemented (Dec 2024)
- Command timestamps cleaned every 10 minutes
- OBS listener properly unsubscribed on shutdown

---

**Location**: `docs/BOT.md`  
**Bot Source**: `study_bot/` directory  
**Last Updated**: December 27, 2024 (v3.0)
