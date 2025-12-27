import express from 'express';
import { Firestore } from 'firebase-admin/firestore';
import winston from 'winston';

/**
 * Health Check HTTP Server
 * Vision.md section 15.1 - Bot Health Monitoring
 * 
 * Provides /health endpoint for monitoring bot status
 */
export class HealthCheckServer {
    private app: express.Application;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- HTTP server instance has complex typing from Node.js
    private server: any;
    private db: Firestore;
    private logger: winston.Logger;
    private lastOBSPing: Date | null = null;
    private lastFirestoreWrite: Date | null = null;

    constructor(db: Firestore, logger: winston.Logger, port: number = 3000) {
        this.app = express();
        this.db = db;
        this.logger = logger;

        // Health check endpoint
        this.app.get('/health', async (req, res) => {
            try {
                const health = await this.getHealthStatus();
                res.json(health);
            } catch (e) {
                this.logger.error('Health check failed', e);
                res.status(500).json({ status: 'error', error: String(e) });
            }
        });

        // Ping endpoint (for keep-alive)
        this.app.get('/ping', (req, res) => {
            res.send('pong');
        });

        this.app.listen(port, () => {
            this.logger.info(`Health check server running on http://localhost:${port}`);
            this.logger.info(`  GET /health - Bot health status`);
            this.logger.info(`  GET /ping   - Keep-alive check`);
        });
    }

    private async getHealthStatus() {
        // Check bot_status/current
        const statusSnap = await this.db.doc('bot_status/current').get();
        const status = statusSnap.exists ? statusSnap.data() : null;

        const now = new Date();
        // Use new field with legacy fallback
        const lastUpdate = status?.lastUpdatedAt?.toDate() || status?.updatedAt?.toDate();
        const ageMs = lastUpdate ? now.getTime() - lastUpdate.getTime() : null;

        return {
            status: ageMs && ageMs < 60000 ? 'ok' : 'stale',  // <60s = OK
            uptime: process.uptime(),
            bot: {
                streamOnline: status?.streamOnline || false,
                mode: status?.currentMode || status?.mode || 'UNKNOWN',  // New field with legacy fallback
                lastUpdate: lastUpdate?.toISOString() || null,
                staleness: ageMs ? `${Math.floor(ageMs / 1000)}s` : 'unknown'
            },
            process: {
                memory: process.memoryUsage(),
                pid: process.pid
            },
            timestamp: now.toISOString()
        };
    }

    public updateOBSPing() {
        this.lastOBSPing = new Date();
    }

    public updateFirestoreWrite() {
        this.lastFirestoreWrite = new Date();
    }
}
