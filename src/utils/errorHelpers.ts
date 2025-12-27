/**
 * Error handling utilities
 * Provides type-safe error handling and message extraction
 */

/**
 * Extract error message from unknown error type
 * @param error - Unknown error from catch block
 * @returns Human-readable error message
 */
export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    if (error && typeof error === 'object' && 'message' in error) {
        return String(error.message);
    }
    return 'Došlo k neznámé chybě';
}

/**
 * Check if error is a Firebase error with specific code
 * @param error - Unknown error from catch block
 * @param code - Firebase error code to check
 * @returns True if error matches the code
 */
export function isFirebaseError(error: unknown, code?: string): boolean {
    if (!(error && typeof error === 'object' && 'code' in error)) {
        return false;
    }
    if (!code) {
        return true; // Any Firebase error
    }
    return error.code === code;
}
