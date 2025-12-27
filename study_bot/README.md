# Study Bot - Real-time Data Manager

**Verze**: 1.0.0  
**Status**: ✅ Připraven k deploymentu  
**Poslední update**: 2025-12-22

## 📋 Účel

Study Bot je Node.js server proces, který:
1. Monitoruje OBS Pomodoro stav (`runtime/obsPomodoro`)
2. Aktualizuje `bot_status/current` s live stream statusem
3. Zapisuje Pomodoro události do `events` kolekce
4. Agreguje session data do `daily_stats`
5. Poskytuje health check HTTP endpoint

## 🏗️ Architektura

```
study_bot/
├── src/
│   ├── index.ts              # Entry point, Firebase init
│   ├── lib/
│   │   ├── firebase-admin.ts # Firebase Admin SDK setup
│   │   └── writeThrottle.ts  # Rate limiting helper
│   ├── core/
│   │   ├── botController.ts  # Lifecycle manager
│   │   ├── streamManager.ts  # Heartbeat & uptime tracking
│   │   ├── obsManager.ts     # OBS event listener
│   │   ├── statsManager.ts   # Session & daily stats
│   │   └── youtubeManager.ts # YouTube chat (placeholder)
│   └── api/
│       └── healthCheck.ts    # HTTP health endpoint
├── service-account.json      # Firebase credentials (GITIGNORED)
└── package.json
```

## 🚀 Setup

### 1. Install Dependencies
```bash
cd study_bot
npm install
```

### 2. Firebase Service Account

1. Jdi do Firebase Console → Project Settings → Service Accounts
2. Klikni "Generate new private key"
3. Stáhni JSON a ulož jako `service-account.json` do `study_bot/`
4. **DŮLEŽITÉ**: Soubor je v `.gitignore`, NIKDY ho necommituj!

### 3. Build
```bash
npm run build
```

### 4. Run Development
```bash
npm run dev
```

### 5. Production Deployment (pm2)
```bash
# Install pm2 globally
npm install -g pm2

# Start bot
pm2 start npm --name "study-bot" -- start

# View logs
pm2 logs study-bot

# Monitor
pm2 monit

# Save config (autostart on reboot)
pm2 save
pm2 startup
```

## 🔧 Konfigurace

### Environment Variables (volitelné)
```bash
# .env soubor (pokud chceš)
SERVICE_ACCOUNT_PATH=./service-account.json
HEALTH_CHECK_PORT=3000
```

## 🩺 Health Check

Bot běží na `http://localhost:3000` s těmito endpointy:

### GET /health
Vrací health status bota:
```json
{
  "status": "ok",
  "uptime": 3600,
  "bot": {
    "streamOnline": true,
    "mode": "FOCUS",
    "lastUpdate": "2025-12-22T21:00:00Z",
    "staleness": "5s"
  },
  "process": {
    "memory": {...},
    "pid": 12345
  },
  "timestamp": "2025-12-22T21:00:10Z"
}
```

Status hodnoty:
- `ok` - Bot aktualizoval data <60s
- `stale` - Žádná aktualizace >60s (možný problém)

### GET /ping
Vrací `pong` - jednoduchý keep-alive check

## 📊 Firestore Operace

### bot_status/current
Aktualizováno každých 10s (throttled):
```typescript
{
  schemaVersion: 1,
  streamOnline: boolean,
  streamId: string | null,
  mode: 'FOCUS' | 'BREAK' | 'LONG_BREAK' | 'PAUSE' | 'OFFLINE',
  modeStartedAt: Timestamp | null,
  endsAt: Timestamp | null,
  connectedAt: Timestamp | null,
  uptimeSeconds: number,
  lastPollAt: Timestamp,
  updatedAt: Timestamp
}
```

### events (timeline)
Nová událost při každé change (start, pause, stop):
```typescript
{
  type: 'pomo_start' | 'pomo_pause' | 'pomo_resume' | 'pomo_complete',
  createdAt: Timestamp,
  dayKey: 'YYYY-MM-DD',
  streamId: string | null,
  payload: {
    phase: 'focus' | 'shortBreak' | 'longBreak',
    cycle: number,
    remaining: number
  },
  schemaVersion: 1
}
```

### daily_stats/{YYYY-MM-DD}
Agregováno při každém session end:
```typescript
{
  schemaVersion: 1,
  dayKey: 'YYYY-MM-DD',
  date: Timestamp,  // Start of day 00:00:00
  totalMinutes: number,  // FieldValue.increment()
  focusMinutes: number,
  blocks: number,
  sessionsCount: number,
  updatedAt: Timestamp
}
```

## 🔐 Write Throttling

Bot používá `WriteThrottle` helper pro prevenci DB spamu:

- **bot_status** heartbeat: minimálně 10s mezi zápisy
- **Force writes** (stream start/stop): bypass throttle
- **Events**: bez throttle (rare events)
- **Daily stats**: pouze při session end

## 🐛 Debugging

```bash
# Live logs
pm2 logs study-bot --lines 100

# Restart
pm2 restart study-bot

# Stop
pm2 stop study-bot

# Delete
pm2 delete study-bot

# Check status
pm2 status
```

## ✅ Verifikace

Po deploymentu zkontroluj:

1. **Health endpoint funguje**:
   ```bash
   curl http://localhost:3000/health
   ```
   → Mělo by vrátit `{"status": "ok", ...}`

2. **Firebase Console**:
   - `bot_status/current` se aktualizuje každých 10s
   - `updatedAt` je aktuální
   - `mode` se mění podle OBS stavu

3. **PM2 status**:
   ```bash
   pm2 status
   ```
   → `study-bot` by měl být `online`

4. **Web dashboard**:
   - Jdi na `/admin/dashboard`
   - Bot health card ukazuje 🟢 status
   - Live mode se zobrazuje (ne "OFFLINE" mock)

## 📝 Changelog

### v1.0.0 (2025-12-22)
- ✅ Firebase Admin SDK integrace
- ✅ bot_status schema update (mode, modeStartedAt, endsAt)
- ✅ Events schema update (createdAt, dayKey, schemaVersion)
- ✅ Daily stats agregace
- ✅ WriteThrottle rate limiting
- ✅ Health check HTTP server
- ✅ TypeScript compilation fix
- ✅ Připraven k pm2 deployment

## 🔗 Související Dokumenty

- [vision.md](../docs/vision.md) - Bot kontrakt (sekce 5.2)
- [STUDY_BOT.md](../docs/STUDY_BOT.md) - Původní dokumentace
- [DATA_CONTRACTS.md](../docs/DATA_CONTRACTS.md) - Firestore schémata

## 📞 Support

Pokud bot nefunguje:
1. Zkontroluj `pm2 logs study-bot`
2. Ověř že `service-account.json` existuje
3. Zkontroluj Firebase permissions (Admin SDK role)
4. Zkus restart: `pm2 restart study-bot`
