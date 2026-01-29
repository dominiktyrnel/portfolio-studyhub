
import winston from 'winston';
import { google, youtube_v3 } from 'googleapis';
import admin from 'firebase-admin';
import { Firestore } from 'firebase-admin/firestore';
import { StatsManager } from './statsManager';
import type { StreamManager } from './streamManager';

/**
 * Command handler type
 */
type CommandHandler = (authorId: string, authorName: string, args: string[]) => Promise<void>;

/**
 * Chat message from YouTube
 */
interface ChatMessage {
    id: string;
    authorChannelId: string;
    authorDisplayName: string;
    messageText: string;
    publishedAt: Date;
}

/**
 * Bot config loaded from Firestore
 */
interface BotChatConfig {
    chatMessages: {
        startKR: string; startEN: string;
        focusKR: string; focusEN: string;
        breakKR: string; breakEN: string;
        longBreakKR: string; longBreakEN: string;
        pauseKR: string; pauseEN: string;
        resumeKR: string; resumeEN: string;
        stopKR: string; stopEN: string;
    };
    pomodoro?: {
        focusSec?: number;
        breakSec?: number;
        longBreakSec?: number;
    };
    moderation?: {
        adminChannelIds?: string[];
    };
    features: {
        autoAnnouncements: boolean;
    };
}

/**
 * YoutubeManager - Handles YouTube Live Chat API integration
 * 
 * Per BOT_Definice.md:
 * 1. Connects to YouTube Live Chat via googleapis
 * 2. Polls chat messages and parses commands
 * 3. Sends automatic announcements on mode changes
 * 4. Rate limits commands and messages
 */
export class YoutubeManager {
    private db: Firestore;
    private logger: winston.Logger;
    private statsManager: StatsManager;
    private streamManager: StreamManager;

    // YouTube API client
    private youtube: youtube_v3.Youtube | null = null;
    private liveChatId: string | null = null;
    private nextPageToken: string | null = null;

    // Polling - SMART ADAPTIVE SYSTEM
    private pollInterval: NodeJS.Timeout | null = null;
    private pollIntervalMs: number = 5000; // Default 5s from API
    private fastPollMs: number = 3000; // Fast polling for active chat (3s)
    private slowPollMs: number = 15000; // Slow polling when idle (15s)
    private currentPollMode: 'fast' | 'slow' = 'fast';
    private lastChatActivity: number = Date.now(); // Track last message time

    // Stream detection - exponential backoff (P2 optimization)
    private retryDelayMs: number = 15000; // Start at 15s, max 120s

    // Rate limiting
    private lastCommandByUser: Map<string, number> = new Map();
    private lastBotReplyAt: number = 0;
    private lastAnnouncementType: string | null = null;
    private lastAnnouncementAt: number = 0;

    // Config
    private config: BotChatConfig | null = null;
    private isConnected: boolean = false;

    // Command handlers
    private commands: Map<string, CommandHandler> = new Map();

    constructor(
        db: Firestore,
        statsManager: StatsManager,
        streamManager: StreamManager,
        logger: winston.Logger
    ) {
        this.db = db;
        this.statsManager = statsManager;
        this.streamManager = streamManager;
        this.logger = logger;

        // Register commands
        this.registerCommands();

        // Cleanup old command timestamps every 10 minutes to prevent memory leak
        setInterval(() => this.cleanupOldCommands(), 10 * 60 * 1000);
    }

    /**
     * Cleanup command timestamps older than 10 minutes to prevent memory leak
     */
    private cleanupOldCommands() {
        const cutoff = Date.now() - (10 * 60 * 1000);
        let cleaned = 0;

        for (const [userId, timestamp] of this.lastCommandByUser.entries()) {
            if (timestamp < cutoff) {
                this.lastCommandByUser.delete(userId);
                cleaned++;
            }
        }

        if (cleaned > 0) {
            this.logger.debug(`Cleaned ${cleaned} old command timestamps`);
        }
    }

    /**
     * Register all available commands
     */
    private registerCommands() {
        // Viewer commands
        this.commands.set('!help', this.handleHelp.bind(this));
        this.commands.set('!start', this.handleStart.bind(this));
        this.commands.set('!stop', this.handleStop.bind(this));
        this.commands.set('!stats', this.handleStats.bind(this));
        this.commands.set('!mystats', this.handleMyStats.bind(this));

        // Admin commands (prefixed with !bot)
        this.commands.set('!bot', this.handleBotCommand.bind(this));
    }

    /**
     * Connect to YouTube Live Chat
     */
    public async connect() {
        this.logger.info("YouTube Manager: Connecting...");

        try {
            // Load config from Firestore
            await this.loadConfig();

            // Initialize YouTube API client
            await this.initializeYouTubeClient();

            // Find active live broadcast
            const liveStream = await this.findActiveLiveBroadcast();

            if (liveStream) {
                this.liveChatId = liveStream.liveChatId;
                this.streamManager.setStreamId(liveStream.videoId, liveStream.liveChatId);

                this.logger.info(`Connected to live stream: ${liveStream.title}`);
                this.logger.info(`Live Chat ID: ${this.liveChatId}`);

                // Reset retry delay on successful connection
                this.retryDelayMs = 15000;

                // Start polling chat
                this.startChatPolling();
                this.isConnected = true;
            } else {
                // Exponential backoff: 15s → 30s → 60s → 120s (max)
                this.logger.info(`No active live broadcast found. Retrying in ${this.retryDelayMs / 1000}s...`);
                setTimeout(() => this.connect(), this.retryDelayMs);
                this.retryDelayMs = Math.min(this.retryDelayMs * 2, 120000); // Max 2 minutes
            }
        } catch (error) {
            this.logger.error("Failed to connect to YouTube:", error);
            // On error, also use exponential backoff
            this.logger.info(`Retrying in ${this.retryDelayMs / 1000}s...`);
            setTimeout(() => this.connect(), this.retryDelayMs);
            this.retryDelayMs = Math.min(this.retryDelayMs * 2, 120000);
        }
    }

    /**
     * Disconnect and stop polling
     */
    public disconnect() {
        if (this.pollInterval) {
            clearTimeout(this.pollInterval);
            this.pollInterval = null;
        }
        this.isConnected = false;
        this.liveChatId = null;
        this.logger.info("YouTube Manager: Disconnected");
    }

    /**
     * Load config from Firestore
     */
    private async loadConfig() {
        try {
            const configDoc = await this.db.doc('config/bot').get();
            if (configDoc.exists) {
                this.config = configDoc.data() as BotChatConfig;
                this.logger.info("Loaded bot config from Firestore");
            }
        } catch (e) {
            this.logger.error("Failed to load config:", e);
        }
    }

    /**
     * Initialize YouTube API client with OAuth2
     */
    private async initializeYouTubeClient() {
        // Check for credentials in environment
        const clientId = process.env.YOUTUBE_CLIENT_ID;
        const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
        const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN;

        if (!clientId || !clientSecret || !refreshToken) {
            throw new Error(
                "Missing YouTube API credentials. Required env vars: " +
                "YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN"
            );
        }

        // Create OAuth2 client
        const oauth2Client = new google.auth.OAuth2(
            clientId,
            clientSecret,
            'urn:ietf:wg:oauth:2.0:oob' // For installed apps
        );

        // Set refresh token
        oauth2Client.setCredentials({
            refresh_token: refreshToken
        });

        // Initialize YouTube client
        this.youtube = google.youtube({
            version: 'v3',
            auth: oauth2Client
        });

        this.logger.info("YouTube API client initialized");
    }

    /**
     * Find active live broadcast on the channel
     */
    private async findActiveLiveBroadcast(): Promise<{
        videoId: string;
        liveChatId: string;
        title: string;
    } | null> {
        if (!this.youtube) return null;

        try {
            // First, try to find broadcasts with any status to debug
            this.logger.info("Searching for live broadcasts...");

            // Search for active broadcasts on the channel
            const response = await this.youtube.liveBroadcasts.list({
                part: ['snippet', 'contentDetails', 'status'],
                broadcastStatus: 'active',
                broadcastType: 'all'
            });

            const broadcasts = response.data.items || [];
            this.logger.info(`Found ${broadcasts.length} active broadcasts`);

            // If no active, also try 'live' status
            if (broadcasts.length === 0) {
                this.logger.info("No 'active' broadcasts, trying 'live' status...");
                const liveResponse = await this.youtube.liveBroadcasts.list({
                    part: ['snippet', 'contentDetails', 'status'],
                    mine: true,
                    maxResults: 10
                });

                const allBroadcasts = liveResponse.data.items || [];
                this.logger.info(`Found ${allBroadcasts.length} broadcasts total (any status)`);

                // Log each broadcast status for debugging
                for (const bc of allBroadcasts) {
                    this.logger.info(`  - "${bc.snippet?.title}" status: ${bc.status?.lifeCycleStatus}, privacy: ${bc.status?.privacyStatus}`);
                }

                // Find one that is actually live
                const liveBroadcast = allBroadcasts.find(bc =>
                    bc.status?.lifeCycleStatus === 'live' ||
                    bc.status?.lifeCycleStatus === 'testing'
                );

                if (liveBroadcast) {
                    broadcasts.push(liveBroadcast);
                    this.logger.info(`Found live/testing broadcast: "${liveBroadcast.snippet?.title}"`);
                }
            }

            if (broadcasts.length === 0) {
                return null;
            }

            // Get the first active broadcast
            const broadcast = broadcasts[0];
            const videoId = broadcast.id;

            if (!videoId) return null;

            // Get live chat ID from video details
            const videoResponse = await this.youtube.videos.list({
                part: ['liveStreamingDetails'],
                id: [videoId]
            });

            const video = videoResponse.data.items?.[0];
            const liveChatId = video?.liveStreamingDetails?.activeLiveChatId;

            if (!liveChatId) {
                this.logger.warn("Live broadcast found but no active chat ID");
                return null;
            }

            return {
                videoId,
                liveChatId,
                title: broadcast.snippet?.title || 'Unknown'
            };
        } catch (error) {
            this.logger.error("Error finding live broadcast:", error);
            return null;
        }
    }

    /**
     * Start polling chat messages - ADAPTIVE SYSTEM
     * Fast polling (3s) when chat is active, slow (15s) when idle
     */
    private startChatPolling() {
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
        }

        // Start in fast mode
        this.currentPollMode = 'fast';
        this.lastChatActivity = Date.now();

        // Initial poll
        this.pollChatMessages();

        // Use setTimeout for adaptive interval (can't change setInterval)
        this.scheduleNextPoll();

        this.logger.info(`Started adaptive chat polling (fast: ${this.fastPollMs}ms, slow: ${this.slowPollMs}ms)`);
    }

    /**
     * Schedule next poll with adaptive interval
     */
    private scheduleNextPoll() {
        if (this.pollInterval) {
            clearTimeout(this.pollInterval);
        }

        // Check if we should switch modes
        const idleTime = Date.now() - this.lastChatActivity;
        const idleThreshold = 2 * 60 * 1000; // 2 minutes

        if (idleTime > idleThreshold && this.currentPollMode === 'fast') {
            this.currentPollMode = 'slow';
            this.logger.info('Chat idle - switching to slow polling (15s)');
        }

        const interval = this.currentPollMode === 'fast' ? this.fastPollMs : this.slowPollMs;

        this.pollInterval = setTimeout(() => {
            this.pollChatMessages();
            this.scheduleNextPoll();
        }, interval);
    }

    /**
     * Poll chat messages from YouTube
     */
    private async pollChatMessages() {
        if (!this.youtube || !this.liveChatId) return;

        try {
            const response = await this.youtube.liveChatMessages.list({
                liveChatId: this.liveChatId,
                part: ['snippet', 'authorDetails'],
                pageToken: this.nextPageToken || undefined
            });

            // We ignore API recommended interval and use our adaptive system
            // (API recommendation is too slow for commands)

            // Update next page token
            this.nextPageToken = response.data.nextPageToken || null;

            // Process messages
            const messages = response.data.items || [];

            // If we got messages, update activity and switch to fast mode
            if (messages.length > 0) {
                this.lastChatActivity = Date.now();
                if (this.currentPollMode === 'slow') {
                    this.currentPollMode = 'fast';
                    this.logger.info('Chat activity detected - switching to fast polling (3s)');
                }
            }

            for (const msg of messages) {
                const chatMessage: ChatMessage = {
                    id: msg.id || '',
                    authorChannelId: msg.authorDetails?.channelId || '',
                    authorDisplayName: msg.authorDetails?.displayName || 'Unknown',
                    messageText: msg.snippet?.displayMessage || '',
                    publishedAt: new Date(msg.snippet?.publishedAt || Date.now())
                };

                await this.processMessage(chatMessage);
            }
        } catch (error: unknown) {
            // Check if stream ended
            const errorMessage = error instanceof Error ? error.message : String(error);
            if (errorMessage.includes('liveChatEnded')) {
                this.logger.info("Live chat ended");
                this.disconnect();
                // Retry connection after delay
                setTimeout(() => this.connect(), 60000);
            } else {
                this.logger.error("Error polling chat:", error);
            }
        }
    }

    /**
     * Process a single chat message
     */
    private async processMessage(msg: ChatMessage) {
        // Track message in stats
        this.statsManager.trackMessage(msg.authorChannelId);

        // Check if it's a command
        if (msg.messageText.startsWith('!')) {
            await this.handleCommand(msg);
        }
    }

    /**
     * Handle a command message
     */
    private async handleCommand(msg: ChatMessage) {
        const parts = msg.messageText.trim().split(/\s+/);
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        // Rate limiting per user (10s cooldown)
        const lastCommand = this.lastCommandByUser.get(msg.authorChannelId);
        const now = Date.now();

        if (lastCommand && now - lastCommand < 10000) {
            this.logger.debug(`Rate limited: ${msg.authorDisplayName}`);
            return;
        }

        // Find and execute command handler
        const handler = this.commands.get(command);

        if (handler) {
            this.lastCommandByUser.set(msg.authorChannelId, now);
            await handler(msg.authorChannelId, msg.authorDisplayName, args);
        }
    }

    // --- COMMAND HANDLERS ---

    private async handleHelp(authorId: string, authorName: string) {
        // Note: authorName from YouTube already includes @ prefix
        await this.sendMessage(
            `${authorName} 명령어: !start (공부 시작), !stop (종료), !mystats (내 통계)`
        );
    }

    private async handleStart(authorId: string, authorName: string) {
        // Auto-close forgotten session if exists (prevents duplicate sessions)
        if (this.statsManager.hasActiveSession(authorId)) {
            const closedMinutes = await this.statsManager.onSessionEnd(authorId);
            this.logger.info(`Auto-closed forgotten session for ${authorId} (${closedMinutes}min)`);
        }

        // Start new session (awaits Firestore backup write for Cloud Run robustness)
        await this.statsManager.onSessionStart(authorId, {
            userName: authorName,
            mode: 'FOCUS',
            source: 'youtube_bot'
        });

        await this.sendMessage(`${authorName} 공부 시작! 화이팅 💪`);
    }

    private async handleStop(authorId: string, authorName: string) {
        const minutes = await this.statsManager.onSessionEnd(authorId);

        if (minutes > 0) {
            await this.sendMessage(`${authorName} 수고했어요! ${minutes}분 공부 완료 ✨`);
        } else {
            // No session found or too short
            await this.sendMessage(`${authorName} 먼저 !start를 해주세요`);
        }
    }

    private async handleStats(authorId: string, authorName: string) {
        // !stats = global stream stats for today
        const today = new Date().toISOString().split('T')[0];
        try {
            const statsDoc = await this.db.doc(`daily_stats/${today}`).get();
            const stats = statsDoc.data();

            if (stats) {
                const hours = Math.floor((stats.totalMinutes || 0) / 60);
                const mins = (stats.totalMinutes || 0) % 60;
                await this.sendMessage(
                    `${authorName} 오늘 스트림 통계: ${hours}시간 ${mins}분, ${stats.blocks || 0}블록 ⏱️`
                );
            } else {
                await this.sendMessage(
                    `${authorName} 오늘 기록이 아직 없어요!`
                );
            }
        } catch (e) {
            this.logger.error("Error fetching stats:", e);
        }
    }

    private async handleMyStats(authorId: string, authorName: string) {
        // !mystats = link to user's web profile (no DB read needed)
        await this.sendMessage(
            `${authorName} 내 공부 통계 보기: https://your-domain.web.app/study 📊`
        );
    }

    private async handleBotCommand(authorId: string, authorName: string, args: string[]) {
        // Check if user is admin
        if (!this.isAdmin(authorId)) {
            this.logger.debug(`Non-admin tried bot command: ${authorName}`);
            return;
        }

        const subCommand = args[0]?.toLowerCase();

        switch (subCommand) {
            case 'pause':
                await this.db.doc('runtime/obsPomodoro').set({
                    state: 'paused'
                }, { merge: true });
                await this.announceEvent('PAUSE');
                break;

            case 'resume':
                await this.db.doc('runtime/obsPomodoro').set({
                    state: 'running'
                }, { merge: true });
                await this.announceEvent('RESUME');
                break;

            case 'stop':
                await this.streamManager.setOffline();
                await this.announceEvent('STOP');
                break;

            case 'phase': {
                const phase = args[1]?.toLowerCase();
                if (['focus', 'break', 'long'].includes(phase)) {
                    // Get duration from config
                    const pomodoroConfig = this.config?.pomodoro || { focusSec: 1500, breakSec: 300, longBreakSec: 900 };
                    let remainingSeconds = 0;
                    let obsPhase: 'focus' | 'shortBreak' | 'longBreak' = 'focus';
                    let currentMode: 'Focus' | 'Break' | 'Long Break' = 'Focus';
                    let legacyMode: 'FOCUS' | 'BREAK' | 'LONG_BREAK' = 'FOCUS';

                    if (phase === 'focus') {
                        remainingSeconds = pomodoroConfig.focusSec || 1500;
                        obsPhase = 'focus';
                        currentMode = 'Focus';
                        legacyMode = 'FOCUS';
                    } else if (phase === 'break') {
                        remainingSeconds = pomodoroConfig.breakSec || 300;
                        obsPhase = 'shortBreak';
                        currentMode = 'Break';
                        legacyMode = 'BREAK';
                    } else if (phase === 'long') {
                        remainingSeconds = pomodoroConfig.longBreakSec || 900;
                        obsPhase = 'longBreak';
                        currentMode = 'Long Break';
                        legacyMode = 'LONG_BREAK';
                    }

                    // Update runtime/obsPomodoro (for OBS script sync)
                    await this.db.doc('runtime/obsPomodoro').set({
                        state: 'running',
                        phase: obsPhase,
                        remainingSeconds,
                        currentCycle: 1
                    }, { merge: true });

                    // CRITICAL: Also update bot_status/current directly for instant web display
                    // Without this, web waits for OBS detector which may not fire if phase didn't change
                    const now = Date.now();
                    const endsAt = admin.firestore.Timestamp.fromMillis(now + (remainingSeconds * 1000));
                    const nowTs = admin.firestore.Timestamp.now();

                    await this.db.doc('bot_status/current').set({
                        currentMode,
                        mode: legacyMode,
                        phaseStartedAt: nowTs,
                        modeStartedAt: nowTs,
                        durationSec: remainingSeconds,
                        endsAt,
                        modeEndsAt: endsAt,
                        lastUpdatedAt: nowTs,
                        updatedAt: nowTs
                    }, { merge: true });

                    this.logger.info(`Admin forced phase: ${phase} (${remainingSeconds}s) → bot_status updated`);
                }
                break;
            }

            case 'announce': {
                const message = args.slice(1).join(' ');
                if (message) {
                    await this.sendMessage(message);
                }
                break;
            }

            default:
                this.logger.debug(`Unknown bot subcommand: ${subCommand}`);
        }
    }

    /**
     * Check if a channel ID is an admin
     */
    private isAdmin(channelId: string): boolean {
        const adminIds = this.config?.moderation?.adminChannelIds || [];
        return adminIds.includes(channelId);
    }

    /**
     * Send a message to the live chat
     */
    public async sendMessage(text: string): Promise<boolean> {
        if (!this.youtube || !this.liveChatId) {
            this.logger.warn("Cannot send message: not connected");
            return false;
        }

        // Global rate limit: 1 message per 2 seconds
        const now = Date.now();
        if (now - this.lastBotReplyAt < 2000) {
            this.logger.debug("Rate limited bot reply");
            return false;
        }

        try {
            await this.youtube.liveChatMessages.insert({
                part: ['snippet'],
                requestBody: {
                    snippet: {
                        liveChatId: this.liveChatId,
                        type: 'textMessageEvent',
                        textMessageDetails: {
                            messageText: text
                        }
                    }
                }
            });

            this.lastBotReplyAt = now;
            this.logger.info(`[CHAT] Sent: ${text.substring(0, 50)}...`);
            return true;
        } catch (error) {
            this.logger.error("Failed to send message:", error);
            return false;
        }
    }

    /**
     * Announce an event to the chat (with deduplication)
     * Called by ObsManager when mode changes
     */
    public async announceEvent(eventType: 'START' | 'FOCUS' | 'BREAK' | 'LONG_BREAK' | 'PAUSE' | 'RESUME' | 'STOP') {
        // Check if announcements are enabled
        if (!this.config?.features?.autoAnnouncements) {
            return;
        }

        // Deduplication: don't announce same event twice in 5 seconds
        const now = Date.now();
        if (this.lastAnnouncementType === eventType && now - this.lastAnnouncementAt < 5000) {
            this.logger.debug(`Skipping duplicate announcement: ${eventType}`);
            return;
        }

        // Get message from config
        const messages = this.config?.chatMessages;
        if (!messages) return;

        let message: string | undefined;

        switch (eventType) {
            case 'START':
                message = messages.startKR;
                break;
            case 'FOCUS':
                message = messages.focusKR;
                break;
            case 'BREAK':
                message = messages.breakKR;
                break;
            case 'LONG_BREAK':
                message = messages.longBreakKR;
                break;
            case 'PAUSE':
                message = messages.pauseKR;
                break;
            case 'RESUME':
                message = messages.resumeKR;
                break;
            case 'STOP':
                message = messages.stopKR;
                break;
        }

        if (message) {
            const sent = await this.sendMessage(message);
            if (sent) {
                this.lastAnnouncementType = eventType;
                this.lastAnnouncementAt = now;
            }
        }
    }

    /**
     * Simulate receiving a message (for testing without YouTube connection)
     */
    public mockReceiveMessage(authorId: string, authorName: string, text: string) {
        this.logger.debug(`[MOCK] Received from ${authorName}: ${text}`);

        const mockMessage: ChatMessage = {
            id: `mock-${Date.now()}`,
            authorChannelId: authorId,
            authorDisplayName: authorName,
            messageText: text,
            publishedAt: new Date()
        };

        this.processMessage(mockMessage);
    }

    /**
     * Execute command from admin console (Firestore runtime/adminCommand)
     * Simulates receiving the command as if it came from chat
     */
    public async executeAdminCommand(commandText: string) {
        this.logger.info(`Executing admin command: ${commandText}`);

        // Parse as if it's a chat message
        const text = commandText.trim();

        if (!text.startsWith('!')) {
            this.logger.warn('Admin command does not start with !, ignoring');
            return;
        }

        // Create a fake admin message and process it
        const adminMessage: ChatMessage = {
            id: `admin-${Date.now()}`,
            authorChannelId: 'ADMIN_CONSOLE',
            authorDisplayName: 'Admin Console',
            messageText: text,
            publishedAt: new Date()
        };

        await this.processMessage(adminMessage);
    }
}
