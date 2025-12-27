
import { Firestore, Timestamp } from 'firebase-admin/firestore';
import winston from 'winston';
import type { StatsManager } from './statsManager';

/**
 * StreamManager - Optimized for Cloud Run
 * 
 * Changes from previous version:
 * 1. REMOVED: Heartbeat interval (Cloud Run has /health endpoint)
 * 2. REMOVED: Uptime counter (calculated on frontend from streamStartedAt)
 * 3. Event-driven writes only (no polling)
 */
export class StreamManager {
    private db: Firestore;
    private logger: winston.Logger;
    private streamId: string | null = null;
    private liveChatId: string | null = null;
    private streamStartedAt: number | null = null;
    private statsManager: StatsManager | null = null;

    constructor(db: Firestore, logger: winston.Logger) {
        this.db = db;
        this.logger = logger;
    }

    /**
     * Set StatsManager reference for session tracking
     */
    public setStatsManager(statsManager: StatsManager) {
        this.statsManager = statsManager;
    }

    public setStreamId(id: string | null, chatId?: string | null) {
        const wasOnline = !!this.streamId;
        const willBeOnline = !!id;

        if (this.streamId !== id) {
            if (!wasOnline && willBeOnline && id) {
                // Stream just started
                this.streamId = id;
                this.liveChatId = chatId ?? null;
                this.streamStartedAt = Date.now();
                this.logger.info(`Stream started: ${id}`);

                if (this.statsManager) {
                    this.statsManager.onStreamStart(id);
                }

                // Write immediately on stream start
                this.updateStatus(true);

            } else if (wasOnline && !willBeOnline) {
                // Stream ended
                this.logger.info('Stream ended.');

                if (this.statsManager) {
                    this.statsManager.onStreamEnd();
                }

                // Write immediately on stream end
                this.updateStatus(false);

                this.streamId = null;
                this.liveChatId = null;
                this.streamStartedAt = null;

            } else {
                // Stream ID changed
                this.streamId = id;
                this.liveChatId = chatId ?? null;
                this.updateStatus(!!id);
            }
        }
    }

    public getStreamId(): string | null {
        return this.streamId;
    }

    public getLiveChatId(): string | null {
        return this.liveChatId;
    }

    /**
     * Update bot_status/current - called ONLY on state changes
     * No polling, no intervals - pure event-driven
     */
    private async updateStatus(streamOnline: boolean) {
        try {
            const now = Timestamp.now();
            const uptimeMs = this.streamStartedAt ? Date.now() - this.streamStartedAt : 0;

            await this.db.doc('bot_status/current').set({
                schemaVersion: 2,

                // Bot process state (bot is running while this code executes)
                online: true,
                actualState: 'running',

                // Stream state
                streamOnline: streamOnline,
                streamId: this.streamId || null,
                liveChatId: this.liveChatId || null,

                // Timestamp for uptime calculation (frontend calculates from this)
                streamStartedAt: this.streamStartedAt
                    ? Timestamp.fromMillis(this.streamStartedAt)
                    : null,

                // Legacy uptimeSeconds for backward compatibility
                uptimeSeconds: Math.floor(uptimeMs / 1000),

                // Mode - will be updated by ObsManager
                currentMode: streamOnline ? 'Ready' : 'Offline',
                phaseStartedAt: null,
                durationSec: null,
                endsAt: null,

                // Last update timestamp
                lastUpdatedAt: now,

                // Legacy fields for migration
                mode: streamOnline ? 'READY' : 'OFFLINE',
                connectedAt: this.streamStartedAt
                    ? Timestamp.fromMillis(this.streamStartedAt)
                    : null,
                updatedAt: now
            }, { merge: true });

            this.logger.info(`bot_status/current updated: streamOnline=${streamOnline}`);
        } catch (e) {
            this.logger.error("Failed to update bot_status/current", e);
        }
    }

    /**
     * Called when bot is shutting down
     */
    public async setOffline() {
        try {
            await this.db.doc('bot_status/current').set({
                online: false,
                actualState: 'stopped',
                streamOnline: false,
                currentMode: 'Offline',
                lastUpdatedAt: Timestamp.now(),
                mode: 'OFFLINE',
                updatedAt: Timestamp.now()
            }, { merge: true });

            this.logger.info("Bot status set to offline");
        } catch (e) {
            this.logger.error("Failed to set offline status", e);
        }
    }

    // REMOVED: startHeartbeat() - not needed on Cloud Run
    // REMOVED: stopHeartbeat() - not needed on Cloud Run
    // REMOVED: updateHeartbeat() - not needed on Cloud Run

    // Stub methods for compatibility (do nothing)
    public startHeartbeat() {
        this.logger.info("Heartbeat disabled (Cloud Run uses /health endpoint)");
    }

    public stopHeartbeat() {
        // No-op
    }
}
