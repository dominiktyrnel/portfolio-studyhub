/**
 * Handle validation utilities for Study Hub user registration
 */

// Blacklist of reserved/forbidden handles
export const HANDLE_BLACKLIST = [
    'admin', 'administrator', 'mod', 'moderator', 'support',
    'dominik', 'dominic', 'official', 'help', 'info',
    'study', 'studyhub', 'tyrnel', 'system', 'bot',
    'root', 'superuser', 'null', 'undefined', 'api'
];

// Handle validation regex: 3-20 chars, lowercase a-z, 0-9, underscore only
export const HANDLE_REGEX = /^[a-z0-9_]{3,20}$/;

export interface HandleValidationResult {
    valid: boolean;
    error?: string;
    errorKey?: string;  // For i18n
}

/**
 * Validate a handle string
 */
export function validateHandle(handle: string): HandleValidationResult {
    const trimmed = handle.trim().toLowerCase();

    // Check length
    if (trimmed.length < 3) {
        return {
            valid: false,
            error: 'Handle must be at least 3 characters',
            errorKey: 'handleTooShort'
        };
    }

    if (trimmed.length > 20) {
        return {
            valid: false,
            error: 'Handle must be at most 20 characters',
            errorKey: 'handleTooLong'
        };
    }

    // Check format (only a-z, 0-9, _)
    if (!HANDLE_REGEX.test(trimmed)) {
        return {
            valid: false,
            error: 'Handle can only contain lowercase letters, numbers, and underscores',
            errorKey: 'handleInvalidChars'
        };
    }

    // Check blacklist
    if (HANDLE_BLACKLIST.includes(trimmed)) {
        return {
            valid: false,
            error: 'This handle is reserved',
            errorKey: 'handleReserved'
        };
    }

    return { valid: true };
}

/**
 * Normalize handle (trim, lowercase)
 */
export function normalizeHandle(handle: string): string {
    return handle.trim().toLowerCase();
}

/**
 * Display name validation
 */
export function validateDisplayName(name: string): HandleValidationResult {
    const trimmed = name.trim();

    if (trimmed.length === 0) {
        return { valid: true }; // Display name is optional
    }

    if (trimmed.length < 3) {
        return {
            valid: false,
            error: 'Display name must be at least 3 characters',
            errorKey: 'displayNameTooShort'
        };
    }

    if (trimmed.length > 20) {
        return {
            valid: false,
            error: 'Display name must be at most 20 characters',
            errorKey: 'displayNameTooLong'
        };
    }

    return { valid: true };
}

/**
 * Bio validation
 */
export function validateBio(bio: string): HandleValidationResult {
    if (bio.length > 200) {
        return {
            valid: false,
            error: 'Bio must be at most 200 characters',
            errorKey: 'bioTooLong'
        };
    }

    return { valid: true };
}

/**
 * Study vibe custom text validation
 */
export function validateStudyVibeText(text: string): HandleValidationResult {
    if (text.length > 60) {
        return {
            valid: false,
            error: 'Study vibe text must be at most 60 characters',
            errorKey: 'vibeTextTooLong'
        };
    }

    return { valid: true };
}

/**
 * Basic URL validation for social links
 */
export function validateSocialUrl(url: string, platform: 'youtube' | 'instagram' | 'discord' | 'twitter'): HandleValidationResult {
    if (!url) return { valid: true }; // Optional

    const trimmed = url.trim();

    try {
        new URL(trimmed);
    } catch {
        return {
            valid: false,
            error: 'Invalid URL format',
            errorKey: 'invalidUrl'
        };
    }

    // Platform-specific domain check
    const domains: Record<string, string[]> = {
        youtube: ['youtube.com', 'youtu.be', 'www.youtube.com'],
        instagram: ['instagram.com', 'www.instagram.com'],
        discord: ['discord.gg', 'discord.com', 'discordapp.com'],
        twitter: ['twitter.com', 'x.com', 'www.twitter.com', 'www.x.com']
    };

    const urlObj = new URL(trimmed);
    const hostname = urlObj.hostname.toLowerCase();

    if (!domains[platform].some(d => hostname === d || hostname.endsWith('.' + d))) {
        return {
            valid: false,
            error: `URL must be from ${platform}`,
            errorKey: 'invalidPlatformUrl'
        };
    }

    return { valid: true };
}
