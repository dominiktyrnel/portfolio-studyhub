/**
 * WriteThrottle - Rate limiting helper for Firestore writes
 * 
 * Enforces minimum intervals between writes to prevent DB spam
 * Vision.md section 15.4 - Rate Limiting Enforcement
 */

export class WriteThrottle {
    private lastWrites: Map<string, Date> = new Map();
    private debugLogger: ((msg: string) => void) | null = null;

    /**
     * Create a WriteThrottle instance
     * @param debugLogger Optional logger function for debug messages
     */
    constructor(debugLogger?: (msg: string) => void) {
        this.debugLogger = debugLogger || null;
    }

    /**
     * Try to execute a write function with rate limiting
     * @param collectionName - Identifier for this write operation
     * @param minIntervalMs - Minimum milliseconds between writes
     * @param writeFn - Async function to execute
     * @returns true if write was executed, false if throttled
     */
    async tryWrite(
        collectionName: string,
        minIntervalMs: number,
        writeFn: () => Promise<void>
    ): Promise<boolean> {
        const now = new Date();
        const lastWrite = this.lastWrites.get(collectionName);

        if (lastWrite && now.getTime() - lastWrite.getTime() < minIntervalMs) {
            // Throttled - use logger if available, otherwise silent
            if (this.debugLogger) {
                this.debugLogger(`[THROTTLE] Skipping write to ${collectionName} - too soon (${now.getTime() - lastWrite.getTime()}ms since last)`);
            }
            return false;
        }

        await writeFn();
        this.lastWrites.set(collectionName, now);
        return true;
    }

    /**
     * Force reset throttle timer for a collection
     * Useful for testing or when you want to force an immediate write
     */
    reset(collectionName: string) {
        this.lastWrites.delete(collectionName);
    }

    /**
     * Get time since last write for a collection
     * Returns null if no write has occurred yet
     */
    getTimeSinceLastWrite(collectionName: string): number | null {
        const lastWrite = this.lastWrites.get(collectionName);
        if (!lastWrite) return null;
        return Date.now() - lastWrite.getTime();
    }
}
