import { Timestamp } from 'firebase/firestore';

// --- ENUMS & CONSTANTS ---

export type StudyMode = 'FOCUS' | 'BREAK' | 'LONG_BREAK' | 'PAUSE' | 'READY' | 'COMPLETED' | 'OFFLINE';

export const STUDY_MODES: Record<StudyMode, string> = {
    FOCUS: 'Focus Time',
    BREAK: 'Short Break',
    LONG_BREAK: 'Long Break',
    PAUSE: 'Paused',
    READY: 'Ready',
    COMPLETED: 'Completed',
    OFFLINE: 'Offline'
};

// --- FIRESTORE COLLECTIONS SCHEMA ---

/**
 * Timeline compact item - embedded in bot_status/current
 * Replaces query to events collection for cost optimization
 */
export interface TimelineCompactItem {
    t: Timestamp;                                          // Timestamp
    type: string;                                          // focus_start, break_start, etc.
    labelKR: string;
    labelEN?: string;
    by: 'system' | 'admin' | 'user';
}

/**
 * Collection: `bot_status`
 * Document: `current`
 * Source of Truth for the "Now" dashboard.
 * 
 * Updated per BOT_Definice.md - harmonized field names
 */
export interface BotStatus {
    // Bot process state
    online: boolean;                                       // Bot running (NEW)
    actualState: 'running' | 'stopped';                    // Bot desired state

    // Stream state
    streamOnline: boolean;
    streamId: string | null;
    liveChatId?: string | null;                            // YouTube chat ID (NEW)
    streamStartedAt?: Timestamp | null;                    // For uptime calculation (NEW - replaces uptimeSeconds)
    streamTitle?: string | null;                           // (NEW - optional)
    streamUrl?: string | null;                             // (NEW - optional)
    thumbnailUrl?: string | null;                          // (NEW - optional)

    // Pomodoro / mode
    currentMode: 'Focus' | 'Break' | 'Long Break' | 'Pause' | 'Ready' | 'Completed' | 'Offline';
    phaseStartedAt?: Timestamp | null;
    durationSec?: number | null;
    endsAt?: Timestamp | null;

    // Session tracking
    currentSession?: number;                               // Current session (1-based)
    totalSessions?: number;                                // Total sessions

    // Timestamps
    connectedAt: Timestamp | null;
    lastUpdatedAt?: Timestamp;                             // (NEW naming)

    // Timeline for UI (max 30 items) - replaces events query
    timelineCompact?: TimelineCompactItem[];               // (NEW - critical for cost)

    schemaVersion: number;

    // --- LEGACY FIELDS (for migration compatibility) ---
    // These are aliases that may exist during migration period
    mode?: StudyMode;                                      // Legacy: use currentMode
    modeStartedAt?: Timestamp | null;                      // Legacy: use phaseStartedAt
    modeEndsAt?: Timestamp | null;                         // Legacy: use endsAt
    uptimeSeconds?: number;                                // Moved to heartbeat doc
    lastPollAt?: Timestamp;                                // Moved to heartbeat doc
    updatedAt?: Timestamp;                                 // Legacy: use lastUpdatedAt
}

/**
 * Collection: `bot_status`
 * Document: `heartbeat`
 * Separated from current to avoid triggering reads on heartbeat updates.
 * Only admin/debug should listen to this.
 */
export interface BotHeartbeat {
    lastHeartbeat: Timestamp;
    uptimeSeconds: number;
    version?: string;
    lastError?: string | null;
}

/**
 * Collection: `stream_stats`
 * Document: `current`
 */
export interface StreamStats {
    chatMessagesCount: number;
    activeUsersLast5minCount?: number;           // New field from bot
    activeAuthorsLast5minCount?: number;         // Legacy field
    lastMessageAt: Timestamp | null;
    updatedAt: Timestamp;
    schemaVersion: number;
}

/**
 * Collection: `study_sessions`
 * Individual study sessions recorded by the bot
 */
export interface StudySession {
    id: string;
    userName?: string;
    streamId?: string;                    // YouTube stream ID
    streamTitle?: string;                 // Stream title
    source: string;                       // 'youtube_stream' | 'youtube_bot' | 'web_manual'
    minutes: number;                      // Total session duration
    focusMinutes?: number;                // Focus time within session
    breakMinutes?: number;                // Break time within session
    sessionsCount?: number;               // Number of pomodoro cycles
    startedAt: Timestamp;
    endedAt?: Timestamp;
    dayKey?: string;                      // YYYY-MM-DD for grouping
    schemaVersion?: number;
}

/**
 * Collection: `daily_stats`
 * Document ID: `YYYY-MM-DD` (dayKey)
 */
export interface DailyStat {
    id: string;
    dayKey: string; // YYYY-MM-DD
    date: Timestamp; // Start of day for query range
    totalMinutes: number;
    focusMinutes?: number;
    blocks?: number;
    sessionsCount?: number;
    activeUsersCount?: number;
    summaryLine?: string;
    updatedAt: Timestamp;
}

/**
 * Collection: `events`
 */
export interface TimelineEvent {
    id: string;
    type: 'FOCUS_START' | 'BREAK_START' | 'STREAM_ONLINE' | 'STREAM_OFFLINE' | 'DAILY_SUMMARY';
    createdAt: Timestamp;
    streamId: string | null;
    dayKey: string; // YYYY-MM-DD
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Payload is intentionally flexible for different event types
    payload?: Record<string, any>;
}

// Backward compatibility alias
export type StudyEvent = TimelineEvent;

/**
 * Collection: `config`
 * Document: `bot`
 * 
 * Updated per BOT_Definice.md with pomodoro, chatMessages, and features.
 */
export interface BotConfig {
    desiredState: 'running' | 'stopped';

    pomodoro: {
        focusSec: number;        // 1500 (25min)
        breakSec: number;        // 300 (5min)
        longBreakSec: number;    // 900 (15min)
    };

    chatMessages: {
        startKR: string; startEN: string;
        focusKR: string; focusEN: string;
        breakKR: string; breakEN: string;
        longBreakKR: string; longBreakEN: string;
        pauseKR: string; pauseEN: string;
        resumeKR: string; resumeEN: string;
        stopKR: string; stopEN: string;
    };

    moderation?: {
        adminChannelIds?: string[];   // YouTube channel IDs for admin commands
        modChannelIds?: string[];     // Optional moderator list
    };

    features: {
        autoAnnouncements: boolean;       // Send chat messages on mode change
        writeEventsCollection: boolean;   // Write to events collection (false = save costs)
    };

    // Legacy fields
    lastCommand?: 'start' | 'stop' | 'restart';
    lastCommandAt?: Timestamp;
}

// --- CONTENT COLLECTIONS SCHEMA ---

export type StudyPlanStatus = 'planned' | 'in-progress' | 'completed';

/**
 * Collection: `study_plan`
 * Document: `current` (Single Document)
 * Schema Version: 2 (upgraded from 1)
 * 
 * Contains both original month plan items AND complete Korean vocabulary data.
 */
export interface StudyPlan {
    schemaVersion: number;  // 2 for new structure
    updatedAt: Timestamp;
    months: MonthPlan[];    // Original structure (backward compatible)

    // NEW: Complete Korean study plan data
    koreanPlan?: KoreanStudyPlan;
}

export interface MonthPlan {
    monthKey: string;           // "YYYY-MM"
    titleKR: string;
    titleEN: string;
    goalKR?: string;
    goalEN?: string;
    items: PlanItem[];
}

export interface PlanItem {
    id: string;
    textKR: string;
    textEN: string;
    status: StudyPlanStatus;
    order: number;
}

// --- NEW: Korean Study Plan Complete Types ---

/**
 * Complete Korean study plan with ALL content from markdown files
 */
export interface KoreanStudyPlan {
    titleKR: string;
    titleCZ: string;
    startDate: string;
    endDate: string;
    milestones: StudyMilestone[];
    monthsData: KoreanMonthData[];
    overview?: StudyPlanOverview;
}

export interface StudyPlanOverview {
    profile?: Record<string, string>;
    schedule?: { day: string; time: string; activity: string }[];
    tools?: { name: string; usage: string }[];
    rules?: { do: string[]; dont: string[] };
    motivation?: string;
    totalHoursPerWeek?: string;
}

export interface StudyMilestone {
    month: number;
    level: string;      // A1, A1+, A2, B1, B2-
    words: number;      // Cumulative word count
    isCheckpoint: boolean;
}

export interface KoreanMonthData {
    month: number;
    nameKR: string;
    nameCZ: string;
    targetLevel: string;
    targetWords: number;
    totalWords: number;

    // Month goals
    goals: string[];

    // Grammar overview for the month (with Czech descriptions)
    grammarOverview: GrammarListItem[];

    // Weeks structure
    weeks: WeekData[];

    // Days (for backwards compatibility)
    days: KoreanDayData[];
}

export interface GrammarListItem {
    kr: string;         // Korean structure
    cz: string;         // Czech description
}

export interface WeekData {
    weekNumber: number;
    dateRange: string;  // "1.-5. LEDNA"
    theme: string;      // "Čísla, pozdravy, 이다"
    days: number[];     // Day numbers in this week
}

export interface KoreanDayData {
    day: number;
    date?: string;      // "ST 1.1.2026"
    title?: string;     // "🎉 START!" or "⭐ VÍKEND"

    // Vocabulary
    vocab: VocabItem[];

    // Grammar section (detailed)
    grammar?: DayGrammar;

    // Tasks/Exercises
    tasks?: string[];
    exercises?: string[];
    notes?: string[];
    focus?: string[];  // For review/practice days

    // Sentence examples (from vocab tables with sentences)
    sentences?: SentenceExample[];

    isWeekend: boolean;
    isTest: boolean;
}

export interface VocabItem {
    kr: string;     // Korean word
    cz: string;     // Czech meaning
    en?: string;    // English meaning (optional, legacy)
}

// --- STUDY PROGRESS TRACKING (Firestore) ---

/**
 * Collection: `study_progress`
 * Document: `current`
 * 
 * Admin-managed progress tracking for the Korean study plan.
 * This is READ from the public page, WRITTEN from admin.
 */
export interface StudyProgress {
    schemaVersion: number;
    
    // Current state
    currentDay: number;              // Current day in plan (1-302)
    currentMonth: number;            // Current month (1-10)
    
    // Completed days (array of day numbers)
    completedDays: number[];
    
    // Stats
    totalVocabLearned: number;       // Calculated from completed days
    totalGrammarLearned: number;     // Calculated from completed days
    streak: number;                  // Days in a row
    
    // Dates
    startDate: string;               // When plan started (ISO date)
    lastStudyDate?: string;          // Last completed day (ISO date)
    
    // Notes per day (optional admin notes)
    dayNotes: Record<number, string>;
    
    // Timestamps
    updatedAt: Timestamp;
}

export interface DayGrammar {
    title: string;          // "이다 (být)"
    explanation?: string;   // "Po samohlásce: -예요\nPo souhlásce: -이에요"
    examples: SentenceExample[];
}

export interface SentenceExample {
    kr: string;
    cz: string;
}



/**
 * Collection: `room_settings`
 * Document: `current` (Single Document)
 * Schema Version: 1
 */
export interface RoomSettings {
    schemaVersion: number;
    updatedAt?: Timestamp;
    roomLink: string;
    roomPassword: string;
    rulesKR: string[];
    rulesEN: string[];
}

/**
 * Collection: `study_global_settings`
 * Document: `current` (Single Document)
 * Schema Version: 1
 * 
 * Stores global Study Hub configuration like social links and motivation quote.
 */
export interface StudyGlobalSettings {
    schemaVersion: number;
    updatedAt?: Timestamp;

    // Kakao
    kakaoId: string;
    kakaoLink: string;

    // YouTube
    youtubeLink: string;
    youtubeName: string;

    // Instagram
    instagramLink: string;
    instagramName: string;

    // Motivation Quote
    motivationQuote: string;
}

/**
 * Collection: `study_schedule`
 * Document: `current` (Single Document)
 * Schema Version: 1
 * 
 * Weekly schedule for study streams - text for each day.
 */
export interface StudySchedule {
    schemaVersion: number;
    updatedAt?: Timestamp;
    days: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
}

/**
 * Collection: `study_users`
 * Document: `{userId}` (UID from Firebase Auth)
 * Schema Version: 1
 * 
 * User profile for Study Hub members.
 */
export interface UserProfile {
    schemaVersion: number;
    uid: string;
    handle: string;              // Unique @handle (3-20 chars, a-z0-9_)
    displayName?: string;        // Optional display name (3-20 chars)
    email: string;
    emailVerified: boolean;
    avatarUrl?: string;          // Firebase Storage URL
    bio?: string;                // Max 200 chars
    preferredLang: 'kr' | 'en';
    status: 'studying' | 'break' | 'offline';
    studyVibe?: {
        template: string;        // e.g., 'pomodoro_25_5', 'deep_work'
        customText?: string;     // Max 60 chars - "My style"
    };
    socialLinks?: {
        youtube?: string;
        instagram?: string;
        discord?: string;
        twitter?: string;
        isPublic: boolean;       // Privacy toggle
    };
    stats: {
        totalHours: number;
        currentStreak: number;
        weeklyAverage: number;
        lastActiveAt?: Timestamp;
    };
    badges: string[];            // Badge IDs
    faqStats: {
        totalAsked: number;
        todayAsked: number;
        lastAskedAt?: Timestamp;
    };
    tosAcceptedAt: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

/**
 * Collection: `study_handles`
 * Document: `{handle}` (lowercase)
 * 
 * Used for ensuring handle uniqueness.
 */
export interface HandleReservation {
    uid: string;
    createdAt: Timestamp;
}

/**
 * FAQ Categories (Fixed enum - not editable in admin)
 */
export type FAQCategory = 'question' | 'live' | 'web' | 'bot' | 'troubleshooting' | 'other';

export const FAQ_CATEGORIES: { value: FAQCategory; labelKR: string; labelEN: string }[] = [
    { value: 'question', labelKR: '질문(도미니크/채널)', labelEN: 'Questions (Dominik/Channel)' },
    { value: 'live', labelKR: '라이브(스트림)', labelEN: 'Live (Stream)' },
    { value: 'web', labelKR: '웹/계정', labelEN: 'Web/Account' },
    { value: 'bot', labelKR: '봇/명령어', labelEN: 'Bot/Commands' },
    { value: 'troubleshooting', labelKR: '문제 해결', labelEN: 'Troubleshooting' },
    { value: 'other', labelKR: '기타', labelEN: 'Other' },
];

/**
 * Collection: `faq_items`
 * Schema Version: 1
 */
export interface FAQItem {
    schemaVersion: number;
    published: boolean;
    category: FAQCategory;
    tags: string[];
    order: number;
    kr: FAQContent;
    en: FAQContent;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface FAQContent {
    title: string;
    perex?: string;
    body: string;               // Markdown supported
}

/**
 * Collection: `inbox_questions`
 * Schema Version: 1
 */
export type QuestionStatus = 'NEW' | 'IN_PROGRESS' | 'ANSWERED' | 'PUBLISHED' | 'ARCHIVED' | 'REJECTED';

export interface InboxQuestion {
    schemaVersion: number;
    userId: string;             // Firebase Auth UID or "anonymous"
    userHandle?: string;        // User's @handle for display
    contactName?: string;
    contactInfo?: string;
    question: string;
    consentPublish: boolean;
    status: QuestionStatus;
    adminAnswer?: string;
    adminNote?: string;         // Note for rejection reason (visible to user)
    linkedFaqId?: string;
    rejectedAt?: Timestamp;     // When the question was rejected
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
