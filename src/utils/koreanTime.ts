/**
 * Korean Time Utilities
 * All user-facing dates/times should use Korean Standard Time (KST, UTC+9)
 */

const KST_OFFSET = 9 * 60; // minutes

/**
 * Get current date/time in Korean Standard Time
 */
export function getKoreanDate(): Date {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (KST_OFFSET * 60000));
}

/**
 * Get Korean day of week (0 = Sunday, 6 = Saturday)
 */
export function getKoreanDayOfWeek(): number {
    return getKoreanDate().getDay();
}

/**
 * Get Korean date string in YYYY-MM-DD format
 */
export function getKoreanDateString(): string {
    const kst = getKoreanDate();
    return kst.toISOString().split('T')[0];
}

/**
 * Get Korean time string in HH:MM:SS format
 */
export function getKoreanTimeString(): string {
    const kst = getKoreanDate();
    return kst.toTimeString().split(' ')[0];
}

/**
 * Format any date to Korean timezone for display
 */
export function formatToKoreanTime(date: Date): Date {
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    return new Date(utc + (KST_OFFSET * 60000));
}

/**
 * Get Korean year
 */
export function getKoreanYear(): number {
    return getKoreanDate().getFullYear();
}

/**
 * Get Korean month (0-11)
 */
export function getKoreanMonth(): number {
    return getKoreanDate().getMonth();
}

/**
 * Get Korean day of month
 */
export function getKoreanDayOfMonth(): number {
    return getKoreanDate().getDate();
}
