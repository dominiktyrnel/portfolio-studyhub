/**
 * Professional Sentry Error Tracking Setup
 * 
 * Captures and reports errors to Sentry for monitoring.
 * Configured for production use with sampling and filtering.
 */

import * as Sentry from '@sentry/react';

/**
 * Initialize Sentry error tracking
 * 
 * @param dsn - Sentry Data Source Name (get from sentry.io)
 * @param environment - Current environment (development/staging/production)
 */
export function initSentry(dsn?: string, environment: string = 'production') {
    // Don't initialize if no DSN provided
    if (!dsn || dsn === 'YOUR_SENTRY_DSN_HERE') {
        console.warn('[Sentry] No DSN provided - error tracking disabled');
        return;
    }

    // Don't track in development (unless explicitly enabled)
    if (environment === 'development' && !import.meta.env.VITE_SENTRY_ENABLE_DEV) {
        console.log('[Sentry] Skipping initialization in development');
        return;
    }

    Sentry.init({
        dsn,
        environment,

        // Performance Monitoring
        tracesSampleRate: environment === 'production' ? 0.2 : 1.0,

        // Set sampling rate for profiling
        profilesSampleRate: environment === 'production' ? 0.1 : 1.0,

        // Release tracking (optional - set via CI/CD)
        release: import.meta.env.VITE_APP_VERSION || 'unknown',

        // Before sending events, filter sensitive data
        beforeSend(event) {
            // Filter out errors from browser extensions
            if (event.exception?.values?.[0]?.value?.includes('chrome-extension://')) {
                return null;
            }

            // Filter out network errors (handled by app)
            if (event.exception?.values?.[0]?.type === 'NetworkError') {
                return null;
            }

            // Don't send events in development
            if (environment === 'development') {
                console.log('[Sentry] Would send event:', event);
                return null;
            }

            return event;
        },

        // Ignore specific errors
        ignoreErrors: [
            // Browser extensions
            'top.GLOBALS',
            'chrome-extension://',
            'moz-extension://',
            // Network errors (expected)
            'Network request failed',
            'Failed to fetch',
            'NetworkError',
            // Firebase errors (handled by app)
            'Firebase: Error',
            // User cancelled actions
            'AbortError',
            'cancelled',
        ],
    });

    console.log(`[Sentry] Initialized for ${environment}`);
}

/**
 * Manually capture an error
 * 
 * @param error - Error object or message
 * @param context - Additional context/tags
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Sentry context accepts arbitrary key-value pairs
export function captureError(error: Error | string, context?: Record<string, any>) {
    if (context) {
        Sentry.setContext('custom', context);
    }

    if (typeof error === 'string') {
        Sentry.captureMessage(error, 'error');
    } else {
        Sentry.captureException(error);
    }
}

/**
 * Set user context for error tracking
 * 
 * @param user - User information
 */
export function setUser(user: { id?: string; email?: string; username?: string } | null) {
    Sentry.setUser(user);
}

/**
 * Add breadcrumb for debugging
 * 
 * @param message - Breadcrumb message
 * @param category - Breadcrumb category
 * @param level - Severity level
 */
export function addBreadcrumb(
    message: string,
    category: string = 'custom',
    level: Sentry.SeverityLevel = 'info'
) {
    Sentry.addBreadcrumb({
        message,
        category,
        level,
        timestamp: Date.now() / 1000,
    });
}

// Export Sentry for advanced usage
export { Sentry };
