import * as Sentry from '@sentry/react';

/**
 * Production-safe logger utility
 * 
 * Usage:
 * - Development: All logs go to console
 * - Production: Only errors go to Sentry, other logs are suppressed
 * 
 * @example
 * ```typescript
 * import { logger } from './utils/logger';
 * 
 * logger.log('Debug info'); // Dev only
 * logger.info('Information'); // Dev only
 * logger.warn('Warning'); // Dev only
 * logger.error(new Error('Something failed'), { context: 'data' }); // Sentry in prod
 * ```
 */
export const logger = {
    /**
     * Development-only logging
     * Suppressed in production builds
     */
    log: (...args: unknown[]): void => {
        if (import.meta.env.DEV) {
            console.log(...args);
        }
    },

    /**
     * Warning logging (development only)
     * Suppressed in production builds
     */
    warn: (...args: unknown[]): void => {
        if (import.meta.env.DEV) {
            console.warn(...args);
        }
    },

    /**
     * Information logging (development only)
     * Suppressed in production builds
     */
    info: (...args: unknown[]): void => {
        if (import.meta.env.DEV) {
            console.info(...args);
        }
    },

    /**
     * Error logging with Sentry integration
     * 
     * - Production: Sends to Sentry
     * - Development: Logs to console
     * 
     * @param error - Error object or error message string
     * @param context - Optional additional context for debugging
     */
    error: (error: Error | string, context?: Record<string, unknown>): void => {
        if (import.meta.env.PROD) {
            if (error instanceof Error) {
                Sentry.captureException(error, { extra: context });
            } else {
                Sentry.captureMessage(error, { level: 'error', extra: context });
            }
        } else {
            console.error(error, context || '');
        }
    },
};
