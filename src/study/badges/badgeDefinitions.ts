/**
 * Badge definitions for Study Hub
 * Badges are awarded for various achievements
 */

export interface BadgeDefinition {
    id: string;
    nameKr: string;
    nameEn: string;
    descriptionKr: string;
    descriptionEn: string;
    icon: string;  // Lucide icon name
    color: string; // Tailwind color class
    requirement: string; // How to earn this badge
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
    {
        id: 'early_supporter',
        nameKr: '얼리 서포터',
        nameEn: 'Early Supporter',
        descriptionKr: '서비스 초기부터 함께한 사용자',
        descriptionEn: 'Joined during early access period',
        icon: 'Star',
        color: 'text-yellow-500',
        requirement: 'Joined before January 2025'
    },
    {
        id: 'first_question',
        nameKr: '첫 질문',
        nameEn: 'First Question',
        descriptionKr: '첫 번째 질문을 남긴 사용자',
        descriptionEn: 'Asked your first question',
        icon: 'MessageCircle',
        color: 'text-blue-500',
        requirement: 'Ask your first FAQ question'
    },
    {
        id: 'study_10h',
        nameKr: '10시간 공부',
        nameEn: '10 Hour Club',
        descriptionKr: '총 10시간 공부 달성',
        descriptionEn: 'Reached 10 hours of total study time',
        icon: 'Clock',
        color: 'text-green-500',
        requirement: 'Accumulate 10+ hours of study time'
    },
    {
        id: 'study_50h',
        nameKr: '50시간 공부',
        nameEn: '50 Hour Club',
        descriptionKr: '총 50시간 공부 달성',
        descriptionEn: 'Reached 50 hours of total study time',
        icon: 'Clock',
        color: 'text-emerald-500',
        requirement: 'Accumulate 50+ hours of study time'
    },
    {
        id: 'study_100h',
        nameKr: '100시간 클럽',
        nameEn: '100 Hour Club',
        descriptionKr: '총 100시간 공부 달성',
        descriptionEn: 'Reached 100 hours of total study time',
        icon: 'Trophy',
        color: 'text-amber-500',
        requirement: 'Accumulate 100+ hours of study time'
    },
    {
        id: 'streak_7',
        nameKr: '7일 연속',
        nameEn: '7 Day Streak',
        descriptionKr: '7일 연속 공부 달성',
        descriptionEn: 'Studied 7 days in a row',
        icon: 'Flame',
        color: 'text-orange-500',
        requirement: 'Maintain a 7-day study streak'
    },
    {
        id: 'streak_30',
        nameKr: '30일 연속',
        nameEn: '30 Day Streak',
        descriptionKr: '30일 연속 공부 달성',
        descriptionEn: 'Studied 30 days in a row',
        icon: 'Flame',
        color: 'text-red-500',
        requirement: 'Maintain a 30-day study streak'
    },
    {
        id: 'night_owl',
        nameKr: '올빼미',
        nameEn: 'Night Owl',
        descriptionKr: '밤 12시 이후 공부',
        descriptionEn: 'Studied after midnight',
        icon: 'Moon',
        color: 'text-indigo-500',
        requirement: 'Study session after midnight'
    },
    {
        id: 'early_bird',
        nameKr: '아침형 인간',
        nameEn: 'Early Bird',
        descriptionKr: '오전 6시 이전 공부',
        descriptionEn: 'Studied before 6 AM',
        icon: 'Sun',
        color: 'text-yellow-400',
        requirement: 'Study session before 6 AM'
    },
    {
        id: 'helpful',
        nameKr: '도움이 되는 사람',
        nameEn: 'Helpful',
        descriptionKr: '5개 이상의 질문에 답변',
        descriptionEn: 'Answered 5 or more questions',
        icon: 'Heart',
        color: 'text-pink-500',
        requirement: 'Answer 5+ questions (future feature)'
    }
];

/**
 * Get badge definition by ID
 */
export function getBadgeById(id: string): BadgeDefinition | undefined {
    return BADGE_DEFINITIONS.find(b => b.id === id);
}

/**
 * Get badge display name based on language
 */
export function getBadgeName(badge: BadgeDefinition, lang: 'kr' | 'en'): string {
    return lang === 'kr' ? badge.nameKr : badge.nameEn;
}

/**
 * Get badge description based on language
 */
export function getBadgeDescription(badge: BadgeDefinition, lang: 'kr' | 'en'): string {
    return lang === 'kr' ? badge.descriptionKr : badge.descriptionEn;
}
