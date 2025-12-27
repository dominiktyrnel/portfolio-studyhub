/**
 * Safe localStorage utility functions
 * Prevents XSS attacks and data corruption from localStorage
 * 
 * Usage:
 *   const lang = safeGetString('lang', ['kr', 'en']);
 *   const cached = safeGetJSON<ContentStructure>('cache_key');
 */

import { logger } from './logger';

/**
 * Safely get a string value from localStorage with validation
 * @param key - localStorage key
 * @param allowedValues - Optional array of allowed string values
 * @returns Validated string or null if invalid/missing
 */
export function safeGetString(
    key: string,
    allowedValues?: string[]
): string | null {
    try {
        const value = localStorage.getItem(key);
        if (!value) return null;

        // Validate against allowed values if provided
        if (allowedValues && !allowedValues.includes(value)) {
            logger.warn(`[Security] Invalid localStorage value for "${key}": "${value}". Allowed: ${allowedValues.join(', ')}`);
            localStorage.removeItem(key); // Clean up invalid data
            return null;
        }

        return value;
    } catch (error) {
        logger.error(error instanceof Error ? error : new Error(`localStorage read error for "${key}"`));
        return null;
    }
}

/**
 * Safely parse JSON from localStorage
 * @param key - localStorage key
 * @returns Parsed object or null if invalid/missing
 */
export function safeGetJSON<T>(key: string): T | null {
    try {
        const value = localStorage.getItem(key);
        if (!value) return null;

        const parsed = JSON.parse(value);
        return parsed as T;
    } catch (error) {
        logger.warn(error instanceof Error ? error : new Error(`[Security] Invalid JSON in localStorage for "${key}"`));
        localStorage.removeItem(key); // Clean up corrupted data
        return null;
    }
}

/**
 * Safely set a string value in localStorage
 * @param key - localStorage key
 * @param value - Value to store
 * @returns True if successful, false if quota exceeded
 */
export function safeSetString(key: string, value: string): boolean {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        logger.error(error instanceof Error ? error : new Error(`localStorage write error for "${key}"`));
        return false;
    }
}

/**
 * Safely set JSON in localStorage
 * @param key - localStorage key
 * @param value - Object to store
 * @returns True if successful, false if quota exceeded or serialization fails
 */
export function safeSetJSON<T>(key: string, value: T): boolean {
    try {
        const serialized = JSON.stringify(value);
        localStorage.setItem(key, serialized);
        return true;
    } catch (error) {
        logger.error(error instanceof Error ? error : new Error(`localStorage JSON write error for "${key}"`));
        return false;
    }
}
