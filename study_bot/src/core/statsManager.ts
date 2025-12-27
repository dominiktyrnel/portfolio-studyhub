
import { Firestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import winston from 'winston';

interface SessionTracker {
    oduserId: string;
    userName?: string;        // Display name if known
    channelId?: string;       // YouTube channel ID
    startedAt: Date;
    mode: 'FOCUS' | 'BREAK';
    source: 'youtube_bot' | 'web_manual' | 'obs_timer';
}

interface StreamSessionTracker {
    streamId: string;
    startedAt: Date;
    focusMinutes: number;
    breakMinutes: number;
    sessionsCount: number;
}

export class StatsManager {
    private db: Firestore;
    private logger: winston.Logger;

    // In-memory counters (flush periodically)
    private messageCountSession = 0;
    private messageQueue = 0;

    // Activity window
    private activeUserTimestamps = new Map<string, number>();

    // Individual user session tracking
    private activeSessions: Map<string, SessionTracker> = new Map();

    // Stream-level session tracking (for 최근 세션)
    private currentStreamSession: StreamSessionTracker | null = null;

    constructor(db: Firestore, logger: winston.Logger) {
        this.db = db;
        this.logger = logger;

        // Cleanup inactive users every min
        setInterval(() => this.cleanupActiveUsers(), 60000);

        // Flush stats every 30s (Cost optimized)
        setInterval(() => this.flushStats(), 30000);
    }

    public trackMessage(authorId: string) {
        this.messageCountSession++;
        this.messageQueue++;
        this.activeUserTimestamps.set(authorId, Date.now());
    }

    /**
     * Called when stream goes online - starts tracking the stream session
     */
    public onStreamStart(streamId: string) {
        this.currentStreamSession = {
            streamId,
            startedAt: new Date(),
            focusMinutes: 0,
            breakMinutes: 0,
            sessionsCount: 0
        };
        this.logger.info(`Stream session started: ${streamId}`);
    }

    /**
     * Called when stream goes offline - saves the stream session to study_sessions
     */
    public async onStreamEnd(streamTitle?: string) {
        if (!this.currentStreamSession) {
            this.logger.warn('No active stream session to end');
            return;
        }

        const session = this.currentStreamSession;
        const endTime = new Date();
        const totalMinutes = Math.floor((endTime.getTime() - session.startedAt.getTime()) / 60000);

        // Only save if meaningful session (> 5 min)
        if (totalMinutes >= 5) {
            try {
                await this.db.collection('study_sessions').add({
                    schemaVersion: 1,
                    streamId: session.streamId,
                    streamTitle: streamTitle || null,
                    userName: 'Dominik', // Host name
                    source: 'youtube_stream',
                    minutes: totalMinutes,
                    focusMinutes: session.focusMinutes,
                    breakMinutes: session.breakMinutes,
                    sessionsCount: session.sessionsCount,
                    startedAt: Timestamp.fromDate(session.startedAt),
                    endedAt: Timestamp.now(),
                    dayKey: this.getDayKey(session.startedAt)
                });
                this.logger.info(`Saved stream session: ${totalMinutes}min (${session.focusMinutes}min focus, ${session.breakMinutes}min break)`);
            } catch (e) {
                this.logger.error('Failed to save stream session', e);
            }
        }

        this.currentStreamSession = null;
    }

    /**
     * Check if user has an active session (in-memory)
     */
    public hasActiveSession(userId: string): boolean {
        return this.activeSessions.has(userId);
    }

    /**
     * Start tracking a user's study session
     * Called when bot detects !start command or FOCUS mode starts
     * 
     * CLOUD RUN ROBUSTNESS: Writes to active_sessions FIRST (sync)
     * to ensure fallback works across instances.
     */
    public async onSessionStart(userId: string, options?: {
        userName?: string;
        channelId?: string;
        mode?: 'FOCUS' | 'BREAK';
        source?: 'youtube_bot' | 'web_manual' | 'obs_timer';
        streamId?: string;
    }): Promise<void> {
        const mode = options?.mode || 'FOCUS';
        const now = new Date();

        // 1. FIRST: Write to Firestore as backup (SYNC - wait for completion)
        // This ensures fallback works even if !stop hits different Cloud Run instance
        try {
            await this.db.doc(`active_sessions/${userId}`).set({
                channelId: userId,
                displayName: options?.userName || 'Unknown',
                startedAt: Timestamp.fromDate(now),
                streamId: options?.streamId || this.currentStreamSession?.streamId || null,
                mode,
                source: options?.source || 'youtube_bot'
            });
        } catch (e) {
            this.logger.error(`Failed to write active_sessions backup for ${userId}`, e);
            // Continue anyway - in-memory will still work for same instance
        }

        // 2. THEN: In-memory cache for fast access on same instance
        this.activeSessions.set(userId, {
            oduserId: userId,
            userName: options?.userName,
            channelId: options?.channelId,
            startedAt: now,
            mode,
            source: options?.source || 'youtube_bot'
        });

        // Track session count for stream
        if (this.currentStreamSession) {
            this.currentStreamSession.sessionsCount++;
        }

        this.logger.info(`User session started: ${userId} (${mode}) [active_sessions backup written]`);
    }

    /**
     * End tracking a study session and save to study_sessions
     * Called when bot detects !stop command or mode change
     * 
     * CLOUD RUN ROBUSTNESS: Falls back to active_sessions if not in memory.
     * COST OPTIMIZED: Single write to study_sessions + delete active_sessions
     * (removed redundant user_study_sessions writes - use aggregation on web)
     */
    public async onSessionEnd(userId: string): Promise<number> {
        let session = this.activeSessions.get(userId);

        // FALLBACK: If not in memory, try reading from Firestore backup
        // This handles Cloud Run multi-instance scenario
        if (!session) {
            try {
                const doc = await this.db.doc(`active_sessions/${userId}`).get();
                if (!doc.exists) {
                    this.logger.warn(`No active session for ${userId} (checked in-memory and Firestore)`);
                    return 0;
                }

                const data = doc.data()!;
                session = {
                    oduserId: userId,
                    userName: data.displayName,
                    channelId: userId,
                    startedAt: data.startedAt.toDate(),
                    mode: data.mode || 'FOCUS',
                    source: data.source || 'youtube_bot'
                };
                this.logger.info(`Recovered session from Firestore backup for ${userId} (multi-instance fallback)`);
            } catch (e) {
                this.logger.error(`Failed to read active_sessions fallback for ${userId}`, e);
                return 0;
            }
        }

        const endTime = new Date();
        const durationSec = Math.floor((endTime.getTime() - session.startedAt.getTime()) / 1000);
        const minutes = Math.floor(durationSec / 60);

        if (durationSec < 60) {
            this.logger.warn(`Session too short for ${userId} (${durationSec}s), skipping save`);
            this.activeSessions.delete(userId);
            // Still cleanup Firestore backup
            try {
                await this.db.doc(`active_sessions/${userId}`).delete();
            } catch (e) {
                this.logger.error(`Failed to cleanup active_sessions for ${userId}`, e);
            }
            return 0;
        }

        // Track time for stream session
        if (this.currentStreamSession) {
            if (session.mode === 'FOCUS') {
                this.currentStreamSession.focusMinutes += minutes;
            } else {
                this.currentStreamSession.breakMinutes += minutes;
            }
        }

        const dayKey = this.getDayKey(new Date());

        // SINGLE WRITE: Save to study_sessions with extended schema
        // Per-user stats are calculated via aggregation queries on web
        try {
            await this.db.collection('study_sessions').add({
                schemaVersion: 2,
                userKey: userId,
                displayNameSnapshot: session.userName || 'Unknown',
                startedAt: Timestamp.fromDate(session.startedAt),
                endedAt: Timestamp.now(),
                durationSec,
                dayKey,
                streamId: this.currentStreamSession?.streamId || null,
                source: session.source,
                mode: session.mode.toLowerCase()
            });
            this.logger.info(`Saved study_session: ${userId} ${minutes}min (${session.mode})`);
        } catch (e) {
            this.logger.error(`Failed to save study_session for ${userId}`, e);
        }

        // Cleanup: delete from memory and Firestore backup
        this.activeSessions.delete(userId);
        try {
            await this.db.doc(`active_sessions/${userId}`).delete();
        } catch (e) {
            this.logger.error(`Failed to cleanup active_sessions for ${userId}`, e);
        }

        return minutes;
    }

    /**
     * Auto-close all active sessions when stream ends
     * Called from streamManager.setOffline()
     */
    public async onStreamEndCleanup(): Promise<void> {
        const activeCount = this.activeSessions.size;
        if (activeCount === 0) {
            this.logger.info('No active user sessions to cleanup on stream end');
            return;
        }

        this.logger.info(`Stream ending - auto-closing ${activeCount} active sessions`);

        // Close all in-memory sessions
        const userIds = Array.from(this.activeSessions.keys());
        for (const userId of userIds) {
            try {
                await this.onSessionEnd(userId);
                this.logger.info(`Auto-closed session for ${userId}`);
            } catch (e) {
                this.logger.error(`Failed to auto-close session for ${userId}`, e);
            }
        }

        // Also cleanup any orphaned active_sessions in Firestore
        // (in case some were created by other instances)
        try {
            const orphaned = await this.db.collection('active_sessions').get();
            for (const doc of orphaned.docs) {
                await doc.ref.delete();
                this.logger.info(`Cleaned up orphaned active_session: ${doc.id}`);
            }
        } catch (e) {
            this.logger.error('Failed to cleanup orphaned active_sessions', e);
        }
    }

    /**
     * Record a completed pomodoro session from OBS timer
     * Called when OBS timer completes a focus/break cycle
     */
    public async recordPomodoroSession(options: {
        phase: 'focus' | 'shortBreak' | 'longBreak';
        durationMinutes: number;
        sessionNumber: number;
        totalSessions: number;
    }) {
        const dayKey = this.getDayKey(new Date());
        const isFocus = options.phase === 'focus';

        // Track for stream session
        if (this.currentStreamSession) {
            if (isFocus) {
                this.currentStreamSession.focusMinutes += options.durationMinutes;
            } else {
                this.currentStreamSession.breakMinutes += options.durationMinutes;
            }
            this.currentStreamSession.sessionsCount++;
        }

        // Aggregate to daily_stats
        try {
            await this.db.doc(`daily_stats/${dayKey}`).set({
                schemaVersion: 1,
                dayKey,
                date: Timestamp.fromDate(this.getStartOfDay(new Date())),
                totalMinutes: FieldValue.increment(options.durationMinutes),
                focusMinutes: isFocus ? FieldValue.increment(options.durationMinutes) : FieldValue.increment(0),
                breakMinutes: !isFocus ? FieldValue.increment(options.durationMinutes) : FieldValue.increment(0),
                blocks: isFocus ? FieldValue.increment(1) : FieldValue.increment(0),
                sessionsCount: FieldValue.increment(1),
                updatedAt: Timestamp.now()
            }, { merge: true });

            this.logger.info(`Recorded pomodoro: ${options.phase} ${options.durationMinutes}min (Session ${options.sessionNumber}/${options.totalSessions})`);
        } catch (e) {
            this.logger.error('Failed to record pomodoro session', e);
        }
    }

    private cleanupActiveUsers() {
        const now = Date.now();
        const cutoff = now - (5 * 60 * 1000); // 5 min window

        for (const [uid, ts] of this.activeUserTimestamps.entries()) {
            if (ts < cutoff) {
                this.activeUserTimestamps.delete(uid);
            }
        }
    }

    private async flushStats() {
        const activeCount = this.activeUserTimestamps.size;

        try {
            await this.db.doc('stream_stats/current').set({
                schemaVersion: 1,
                activeUsersLast5minCount: activeCount,
                chatMessagesCount: this.messageCountSession,
                lastMessageAt: activeCount > 0 ? Timestamp.now() : null,
                updatedAt: Timestamp.now()
            }, { merge: true });
        } catch (e) {
            this.logger.error("Failed to flush stats", e);
        }

        this.messageQueue = 0;
    }

    /**
     * Get day key in YYYY-MM-DD format using Korea timezone
     */
    private getDayKey(date: Date): string {
        const koreaDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
        const year = koreaDate.getFullYear();
        const month = String(koreaDate.getMonth() + 1).padStart(2, '0');
        const day = String(koreaDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    /**
     * Get start of day (00:00:00) for a given date in Korea timezone
     */
    private getStartOfDay(date: Date): Date {
        const koreaDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
        koreaDate.setHours(0, 0, 0, 0);
        return koreaDate;
    }
}
