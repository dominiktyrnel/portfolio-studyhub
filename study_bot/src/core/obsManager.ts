
import { Firestore, Timestamp } from 'firebase-admin/firestore';
import winston from 'winston';
import { detectObsAnnouncement, DetectionResult, ObsState } from './obsDetector';
import type { StreamManager } from './streamManager';
import type { YoutubeManager } from './youtubeManager';

/**
 * Mode name mapping from OBS phase to display format
 */
const MODE_MAP: Record<string, 'Focus' | 'Break' | 'Long Break' | 'Pause' | 'Ready' | 'Completed' | 'Offline'> = {
    'focus': 'Focus',
    'shortBreak': 'Break',
    'longBreak': 'Long Break',
    'paused': 'Pause',
    'ready': 'Ready',
    'completed': 'Completed'
};

/**
 * Legacy mode mapping for backward compatibility
 */
const LEGACY_MODE_MAP: Record<string, 'FOCUS' | 'BREAK' | 'LONG_BREAK' | 'PAUSE' | 'READY' | 'COMPLETED' | 'OFFLINE'> = {
    'focus': 'FOCUS',
    'shortBreak': 'BREAK',
    'longBreak': 'LONG_BREAK',
    'paused': 'PAUSE',
    'ready': 'READY',
    'completed': 'COMPLETED'
};

/**
 * Timeline event labels (KR/EN)
 * Keys match DetectionResult.event types from obsDetector.ts
 */
const EVENT_LABELS: Record<string, { kr: string; en: string }> = {
    'START': { kr: '🟢 시작', en: '🟢 Started' },
    'STOP': { kr: '🔴 종료', en: '🔴 Stopped' },
    'FOCUS': { kr: '⏳ 집중', en: '⏳ Focus' },
    'NEW_SESSION': { kr: '🔄 새 세션', en: '🔄 New Session' },
    'SHORT_BREAK': { kr: '☕ 휴식', en: '☕ Break' },
    'LONG_BREAK': { kr: '🧘‍♂️ 긴 휴식', en: '🧘‍♂️ Long Break' },
    'PAUSE': { kr: '⏸️ 일시정지', en: '⏸️ Paused' },
    'RESUME': { kr: '▶️ 재개', en: '▶️ Resumed' },
    'SKIP': { kr: '⏭️ 건너뛰기', en: '⏭️ Skipped' },
    'COMPLETED': { kr: '🎉 완료!', en: '🎉 Completed!' },
    'MANUAL_ADJUST': { kr: '⏱️ 시간 조정', en: '⏱️ Time adjusted' }
};

/**
 * ObsManager - Handles OBS state detection and bot_status updates
 * 
 * Updated per BOT_Definice.md:
 * 1. Uses new field names (currentMode, phaseStartedAt, endsAt, durationSec)
 * 2. Maintains timelineCompact array (max 30 items) for cost-effective web reads
 * 3. Optionally writes to events collection (configurable)
 */
export class ObsManager {
    private db: Firestore;
    private logger: winston.Logger;
    private streamManager: StreamManager;
    private youtubeManager: YoutubeManager | null = null;

    private prevState: ObsState | null = null;
    private startJustHappenedAt: number = 0;
    private unsubscribeObs: (() => void) | null = null;

    // Config from Firestore (cached)
    private writeEventsCollection: boolean = false;
    private autoAnnouncements: boolean = true;
    private pomodoroConfig = {
        focusSec: 1500,    // 25 min
        breakSec: 300,     // 5 min
        longBreakSec: 900  // 15 min
    };

    constructor(db: Firestore, logger: winston.Logger, streamManager: StreamManager) {
        this.db = db;
        this.logger = logger;
        this.streamManager = streamManager;
    }

    /**
     * Set YoutubeManager for automatic announcements
     * Called after both managers are initialized to avoid circular dependency
     */
    public setYoutubeManager(ytManager: YoutubeManager) {
        this.youtubeManager = ytManager;
        this.logger.info("YoutubeManager connected to ObsManager");
    }

    public startListening() {
        this.logger.info("Starting OBS Manager...");

        // Load config first
        this.loadConfig();

        // Listen for OBS state changes
        this.unsubscribeObs = this.db.doc('runtime/obsPomodoro').onSnapshot((snap) => {
            if (!snap.exists) return;
            const nextState = snap.data() as ObsState;

            this.processState(nextState);
        }, (err) => {
            this.logger.error("OBS Listener Error", err);
        });
    }

    /**
     * Stop listening to OBS state changes
     * Called during bot shutdown to prevent memory leaks
     */
    public stopListening() {
        if (this.unsubscribeObs) {
            this.unsubscribeObs();
            this.unsubscribeObs = null;
            this.logger.info("OBS Manager stopped listening");
        }
    }

    /**
     * Load config from Firestore
     */
    private async loadConfig() {
        try {
            const configDoc = await this.db.doc('config/bot').get();
            if (configDoc.exists) {
                const data = configDoc.data();
                if (data?.features?.writeEventsCollection !== undefined) {
                    this.writeEventsCollection = data.features.writeEventsCollection;
                }
                if (data?.features?.autoAnnouncements !== undefined) {
                    this.autoAnnouncements = data.features.autoAnnouncements;
                }
                if (data?.pomodoro) {
                    this.pomodoroConfig = {
                        ...this.pomodoroConfig,
                        ...data.pomodoro
                    };
                }
                this.logger.info(`Config loaded: writeEventsCollection=${this.writeEventsCollection}, autoAnnouncements=${this.autoAnnouncements}`);
            }
        } catch (e) {
            this.logger.error("Failed to load config", e);
        }
    }

    private async processState(next: ObsState) {
        const result = detectObsAnnouncement(this.prevState, next, {
            startJustHappenedAt: this.startJustHappenedAt,
            config: {
                startFocusSuppressSeconds: 10,
                enableManualAdjustMessage: false
            }
        });

        if (result) {
            await this.handleEvent(result, next);
        }

        this.prevState = next;
    }

    private async handleEvent(result: DetectionResult, state: ObsState) {
        this.logger.info(`Detected Event: ${result.event}`);

        if ('session' in result && result.event === 'START') {
            this.startJustHappenedAt = Date.now();
        }

        // 1. Optionally write to Events Collection (BOT_Definice.md: configurable)
        if (this.writeEventsCollection) {
            try {
                await this.db.collection('events').add({
                    type: result.event,
                    createdAt: Timestamp.now(),
                    dayKey: new Date().toISOString().split('T')[0],
                    streamId: this.streamManager.getStreamId(),
                    payload: {
                        phase: state.phase,
                        session: state.currentSession ?? state.currentCycle,
                        totalSessions: state.totalSessions,
                        remaining: state.remainingSeconds
                    },
                    schemaVersion: 1
                });
                this.logger.info(`Logged event ${result.event} to events collection`);
            } catch (e) {
                this.logger.error("Failed to log event to collection", e);
            }
        }

        // 2. Update bot_status/current with mode and timelineCompact
        try {
            // Map OBS phase to display mode
            let currentMode: 'Focus' | 'Break' | 'Long Break' | 'Pause' | 'Ready' | 'Completed' | 'Offline' = 'Offline';
            let legacyMode: 'FOCUS' | 'BREAK' | 'LONG_BREAK' | 'PAUSE' | 'READY' | 'COMPLETED' | 'OFFLINE' = 'OFFLINE';
            let durationSec: number | null = null;

            if (state.state === 'running') {
                currentMode = MODE_MAP[state.phase] || 'Offline';
                legacyMode = LEGACY_MODE_MAP[state.phase] || 'OFFLINE';

                // Get duration from config
                if (state.phase === 'focus') durationSec = this.pomodoroConfig.focusSec;
                else if (state.phase === 'shortBreak') durationSec = this.pomodoroConfig.breakSec;
                else if (state.phase === 'longBreak') durationSec = this.pomodoroConfig.longBreakSec;
            } else if (state.state === 'paused') {
                currentMode = 'Pause';
                legacyMode = 'PAUSE';
            }

            const now = Date.now();
            const endsAt = state.remainingSeconds > 0
                ? Timestamp.fromMillis(now + (state.remainingSeconds * 1000))
                : null;

            // Create timeline compact item
            const labels = EVENT_LABELS[result.event] || { kr: result.event, en: result.event };
            const timelineItem = {
                t: Timestamp.now(),
                type: result.event.toLowerCase(),
                labelKR: labels.kr,
                labelEN: labels.en,
                by: 'system' as const
            };

            // Update bot_status/current
            await this.db.doc('bot_status/current').set({
                // New fields
                currentMode,
                phaseStartedAt: Timestamp.now(),
                durationSec,
                endsAt,
                lastUpdatedAt: Timestamp.now(),

                // Session tracking
                currentSession: state.currentSession ?? state.currentCycle ?? 1,
                totalSessions: state.totalSessions ?? 1,

                // Legacy fields for backward compatibility
                mode: legacyMode,
                modeStartedAt: Timestamp.now(),
                modeEndsAt: endsAt,
                updatedAt: Timestamp.now()
            }, { merge: true });

            // Append to timelineCompact (max 30 items)
            // Use arrayUnion then trim if needed
            await this.appendToTimelineCompact(timelineItem);

            this.logger.info(`Updated bot_status: currentMode=${currentMode}, endsAt=${endsAt ? 'set' : 'null'}`);

            // 3. Send automatic announcement to YouTube chat (BOT_Definice.md section 6)
            if (this.autoAnnouncements && this.youtubeManager) {
                // Map event to announcement type
                let announcementType: 'START' | 'FOCUS' | 'BREAK' | 'LONG_BREAK' | 'PAUSE' | 'RESUME' | 'STOP' | null = null;

                switch (result.event) {
                    case 'START':
                        announcementType = 'START';
                        break;
                    case 'FOCUS':
                    case 'NEW_SESSION':
                        announcementType = 'FOCUS';
                        break;
                    case 'SHORT_BREAK':
                        announcementType = 'BREAK';
                        break;
                    case 'LONG_BREAK':
                        announcementType = 'LONG_BREAK';
                        break;
                    case 'PAUSE':
                        announcementType = 'PAUSE';
                        break;
                    case 'RESUME':
                        announcementType = 'RESUME';
                        break;
                    case 'STOP':
                    case 'COMPLETED':
                        announcementType = 'STOP';
                        break;
                }

                if (announcementType) {
                    await this.youtubeManager.announceEvent(announcementType);
                }
            }
        } catch (e) {
            this.logger.error("Failed to update bot_status", e);
        }
    }

    /**
     * Append item to timelineCompact array (max 30 items)
     * BOT_Definice.md: web reads this instead of querying events collection
     * 
     * Uses Firestore transaction to prevent race conditions when multiple
     * events happen in quick succession.
     */
    private async appendToTimelineCompact(item: {
        t: Timestamp;
        type: string;
        labelKR: string;
        labelEN: string;
        by: 'system' | 'admin' | 'user';
    }) {
        const docRef = this.db.doc('bot_status/current');

        try {
            await this.db.runTransaction(async (transaction: FirebaseFirestore.Transaction) => {
                const doc = await transaction.get(docRef);
                const data = doc.data() || {};

                // Get current timeline or initialize empty array
                let timeline: typeof item[] = Array.isArray(data.timelineCompact)
                    ? data.timelineCompact
                    : [];

                // Deduplication: skip if last event has same type and is < 5s old
                if (timeline.length > 0) {
                    const lastItem = timeline[timeline.length - 1];
                    // Handle both Firestore Timestamp and raw object form
                    const lastTimeRaw = lastItem.t as { seconds?: number; _seconds?: number } | undefined;
                    const lastTime = lastTimeRaw?.seconds ?? (lastTimeRaw as { _seconds?: number })?._seconds ?? 0;
                    const newTime = item.t.seconds || 0;

                    if (lastItem.type === item.type && Math.abs(newTime - lastTime) < 5) {
                        this.logger.debug(`Skipping duplicate timeline event: ${item.type}`);
                        return; // Skip duplicate
                    }
                }

                // Add new item
                timeline.push(item);

                // Keep only last 30 items
                if (timeline.length > 30) {
                    timeline = timeline.slice(-30);
                }

                // Write back
                transaction.update(docRef, { timelineCompact: timeline });
            });
        } catch (e) {
            this.logger.error("Failed to update timelineCompact", e);
        }
    }
}
