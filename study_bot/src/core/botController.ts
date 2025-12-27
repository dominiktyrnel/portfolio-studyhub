import { ObsManager } from './obsManager';
import { StreamManager } from './streamManager';
import { StatsManager } from './statsManager';
import { YoutubeManager } from './youtubeManager';

/**
 * BotController - Main orchestrator for the Study Bot
 * 
 * Listens to config/bot.desiredState and starts/stops all managers accordingly.
 */
export class BotController {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Firestore instance from firebase-admin has complex typing
    private db: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Winston logger instance has complex typing
    private logger: any;
    private managers: {
        stream: StreamManager;
        obs: ObsManager;
        stats: StatsManager;
        youtube: YoutubeManager;
    };

    private isRunning = false;
     
    private adminCommandUnsubscribe: (() => void) | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Constructor params match Firebase/Winston complex types
    constructor(db: any, logger: any, managers: any) {
        this.db = db;
        this.logger = logger;
        this.managers = managers;
    }

    public start() {
        this.logger.info("Bot Controller: Listening for config/bot.desiredState...");

        // Listen to config/bot for desiredState
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Firestore snapshot typing is complex
        this.db.doc('config/bot').onSnapshot((snap: any) => {
            const config = snap.data();
            if (!config) {
                this.logger.warn("config/bot document not found or empty");
                return;
            }

            const desired = config.desiredState;
            this.logger.info(`config/bot.desiredState = ${desired}`);

            if (desired === 'running' && !this.isRunning) {
                this.boot();
            } else if (desired === 'stopped' && this.isRunning) {
                this.shutdown();
            }
        }, (err: Error) => {
            this.logger.error("Failed to listen to config/bot", err);
        });
    }

    private async boot() {
        this.logger.info(">>> STARTING BOT <<<");
        this.isRunning = true;

        // Start all managers
        this.managers.stream.startHeartbeat();
        this.managers.obs.startListening();
        this.managers.youtube.connect();

        // Listen for admin console commands
        this.adminCommandUnsubscribe = this.db.doc('runtime/adminCommand').onSnapshot(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Firestore snapshot typing is complex
            async (snap: any) => {
                const data = snap.data();
                if (!data || data.processed) return;

                // Process the command
                this.logger.info(`Admin console command received: ${data.command}`);

                // Mark as processed immediately to avoid double processing
                try {
                    await this.db.doc('runtime/adminCommand').update({ processed: true });
                } catch (e) {
                    this.logger.error("Failed to mark command as processed", e);
                }

                // Execute the command via YouTubeManager
                if (data.command && this.managers.youtube) {
                    await this.managers.youtube.executeAdminCommand(data.command);
                }
            },
            (err: Error) => {
                this.logger.error("Failed to listen to admin commands", err);
            }
        );

        // Set initial online state with new fields (BOT_Definice.md)
        try {
            await this.db.doc('bot_status/current').set({
                online: true,
                actualState: 'running',
                currentMode: 'Offline',
                // Legacy
                mode: 'OFFLINE'
            }, { merge: true });
        } catch (e) {
            this.logger.error("Failed to set initial bot status", e);
        }

        this.logger.info("Bot is now running");
    }

    private async shutdown() {
        this.logger.info(">>> STOPPING BOT (Standby) <<<");
        this.isRunning = false;

        // Stop all managers
        this.managers.stream.stopHeartbeat();
        this.managers.obs.stopListening();
        this.managers.youtube.disconnect();

        // Use new setOffline() method which handles all fields correctly
        await this.managers.stream.setOffline();

        this.logger.info("Bot is now stopped (standby mode)");
    }
}

