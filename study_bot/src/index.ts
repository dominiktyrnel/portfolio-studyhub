import dotenv from 'dotenv';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import winston from 'winston';

// Load env
dotenv.config();

// Logger Setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console()
    ]
});

logger.info("Initializing Study Bot...");

// Firebase Init - always use service-account.json
async function initFirebase() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports -- CommonJS require needed for dynamic path resolution
        const path = require('path');
        const serviceAccountPath = path.join(__dirname, '..', 'service-account.json');

        // eslint-disable-next-line @typescript-eslint/no-require-imports -- Service account JSON must be loaded via require for Firebase Admin SDK
        const serviceAccount = require(serviceAccountPath);
        initializeApp({
            credential: cert(serviceAccount),
            projectId: serviceAccount.project_id
        });
        logger.info(`Firebase initialized with Service Account (Project: ${serviceAccount.project_id})`);

        const db = getFirestore();
        logger.info("Firestore connected.");
        return db;
    } catch (e) {
        logger.error("Failed to init Firebase", e);
        process.exit(1);
    }
}


import { ObsManager } from './core/obsManager';
import { StreamManager } from './core/streamManager';
import { StatsManager } from './core/statsManager';
import { YoutubeManager } from './core/youtubeManager';
import { BotController } from './core/botController';
import { HealthCheckServer } from './api/healthCheck';

async function main() {
    const db = await initFirebase();
    if (!db) return;

    // Initialize Health Check Server (port from env for Cloud Run)
    const port = parseInt(process.env.PORT || '3000', 10);
    new HealthCheckServer(db, logger, port);

    // Initialize Core Managers
    const streamManager = new StreamManager(db, logger);
    const statsManager = new StatsManager(db, logger);
    const youtubeManager = new YoutubeManager(db, statsManager, streamManager, logger);
    const obsManager = new ObsManager(db, logger, streamManager);

    // Connect managers for cross-communication
    obsManager.setYoutubeManager(youtubeManager);
    streamManager.setStatsManager(statsManager);

    const managers = {
        stream: streamManager,
        obs: obsManager,
        stats: statsManager,
        youtube: youtubeManager
    };

    // Controller handles the lifecycle
    const controller = new BotController(db, logger, managers);
    controller.start();

    logger.info("Study Bot Process Started (Waiting for Admin Command)...");

    // Keep alive
    process.on('SIGINT', () => {
        logger.info("Process Terminated");
        process.exit(0);
    });
}


main();
