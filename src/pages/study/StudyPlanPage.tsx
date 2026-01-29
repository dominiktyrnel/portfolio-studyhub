/**
 * Study Plan Page - Public View (Read-Only)
 * 
 * Displays the Korean study plan with progress from Firestore.
 * All editing is done in admin panel (/admin/study-progress)
 */

import { useState, useEffect, useMemo } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Calendar,
    BookOpen,
    GraduationCap,
    CheckCircle2,
    Target,
    Flame,
    Clock,
    Star,
    BarChart3,
    CalendarDays,
    PlayCircle,
    Volume2,
    Lightbulb,
    AlertTriangle,
    Plane,
    Globe,
    Loader2
} from 'lucide-react';
import type {
    KoreanStudyPlan,
    KoreanMonthData,
    KoreanDayData,
    StudyProgress
} from '../../types/study-db';
import { koreanStudyPlanComplete } from '../../data/studyPlanIndex';

type Lang = 'kr' | 'cz';
type ViewMode = 'day' | 'calendar' | 'overview';

const translations = {
    kr: {
        title: '한국어 학습 플랜',
        today: '오늘',
        yesterday: '어제',
        tomorrow: '내일',
        day: '일차',
        week: '주차',
        month: '월',
        vocabulary: '단어',
        grammar: '문법',
        tasks: '할 일',
        notes: '메모',
        progress: '진행률',
        totalProgress: '전체 진행률',
        streak: '연속 학습',
        days: '일',
        words: '단어',
        structures: '문법',
        level: '레벨',
        overview: '개요',
        calendar: '캘린더',
        dailyView: '일일 보기',
        weekend: '주말',
        test: '시험',
        review: '복습',
        rule: '규칙',
        examples: '예문',
        exercises: '연습',
        loading: '로딩 중...',
        completed: '완료',
        notStarted: '시작 전',
        travel: '여행',
        construction: '건설',
        months: ['2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월']
    },
    cz: {
        title: 'Studijní plán korejštiny',
        today: 'Dnes',
        yesterday: 'Včera',
        tomorrow: 'Zítra',
        day: 'Den',
        week: 'Týden',
        month: 'Měsíc',
        vocabulary: 'Slovíčka',
        grammar: 'Gramatika',
        tasks: 'Úkoly',
        notes: 'Poznámky',
        progress: 'Pokrok',
        totalProgress: 'Celkový pokrok',
        streak: 'Série',
        days: 'dní',
        words: 'slov',
        structures: 'gramatik',
        level: 'Úroveň',
        overview: 'Přehled',
        calendar: 'Kalendář',
        dailyView: 'Denní pohled',
        weekend: 'Víkend',
        test: 'Test',
        review: 'Opakování',
        rule: 'Pravidlo',
        examples: 'Příklady',
        exercises: 'Cvičení',
        loading: 'Načítání...',
        completed: 'Hotovo',
        notStarted: 'Nezačato',
        travel: 'Cesta',
        construction: 'Stavba',
        months: ['Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad']
    }
};

// Helper to get day data from plan
function getDayData(plan: KoreanStudyPlan, dayNumber: number): { day: KoreanDayData | null; month: KoreanMonthData | null } {
    let currentDay = 0;
    for (const month of plan.monthsData) {
        for (const day of month.days) {
            currentDay++;
            if (currentDay === dayNumber) {
                return { day, month };
            }
        }
    }
    return { day: null, month: null };
}

// Get total days in plan
function getTotalDays(plan: KoreanStudyPlan): number {
    return plan.monthsData.reduce((sum, m) => sum + m.days.length, 0);
}

// Get month for a specific day number
function getMonthForDay(plan: KoreanStudyPlan, dayNumber: number): number {
    let currentDay = 0;
    for (let i = 0; i < plan.monthsData.length; i++) {
        currentDay += plan.monthsData[i].days.length;
        if (dayNumber <= currentDay) {
            return i + 1;
        }
    }
    return plan.monthsData.length;
}

// Default progress (when not loaded from Firestore)
function getDefaultProgress(): StudyProgress {
    return {
        schemaVersion: 1,
        currentDay: 1,
        currentMonth: 1,
        completedDays: [],
        totalVocabLearned: 0,
        totalGrammarLearned: 0,
        streak: 0,
        startDate: '2026-02-02',
        dayNotes: {},
        updatedAt: null as any
    };
}

export function StudyPlanPage() {
    const [lang, setLang] = useState<Lang>('cz');
    const [viewMode, setViewMode] = useState<ViewMode>('day');
    const [selectedDay, setSelectedDay] = useState(1);
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['vocab', 'grammar']));
    const [progress, setProgress] = useState<StudyProgress>(getDefaultProgress());
    const [loading, setLoading] = useState(true);
    const [plan] = useState<KoreanStudyPlan>(koreanStudyPlanComplete);

    const t = translations[lang];
    const totalDays = useMemo(() => getTotalDays(plan), [plan]);

    // Load progress from Firestore
    useEffect(() => {
        if (!db) {
            setLoading(false);
            return;
        }

        const docRef = doc(db, 'study_progress', 'current');
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data() as StudyProgress;
                setProgress(data);
                setSelectedDay(data.currentDay || 1);
            }
            setLoading(false);
        }, () => {
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const { day: currentDayData, month: currentMonth } = useMemo(
        () => getDayData(plan, selectedDay),
        [plan, selectedDay]
    );

    const currentMonthIndex = useMemo(
        () => getMonthForDay(plan, selectedDay),
        [plan, selectedDay]
    );

    const toggleSection = (section: string) => {
        setExpandedSections(prev => {
            const next = new Set(prev);
            if (next.has(section)) next.delete(section);
            else next.add(section);
            return next;
        });
    };

    const goToDay = (day: number) => {
        if (day >= 1 && day <= totalDays) {
            setSelectedDay(day);
        }
    };

    // Calculate overall stats
    const stats = useMemo(() => {
        let totalVocab = 0;
        let totalGrammar = 0;
        plan.monthsData.forEach(m => {
            m.days.forEach(d => {
                totalVocab += d.vocab.length;
                if (d.grammar) totalGrammar++;
            });
        });
        return {
            totalVocab,
            totalGrammar,
            vocabLearned: progress.totalVocabLearned,
            grammarLearned: progress.totalGrammarLearned
        };
    }, [plan, progress]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--study-bg)' }}>
                <div className="flex items-center gap-3 text-study-muted">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>{t.loading}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--study-bg)' }}>
            {/* Header */}
            <header className="sticky top-0 z-50 bg-study-surface/95 backdrop-blur border-b border-study-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-6 h-6 text-study-accent" />
                            <h1 className="text-lg font-bold text-study-text">
                                {t.title}
                            </h1>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* View Mode Toggle */}
                            <div className="hidden sm:flex bg-study-bg rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('day')}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'day'
                                        ? 'bg-study-accent text-study-bg'
                                        : 'text-study-muted hover:text-study-text'
                                    }`}
                                >
                                    <PlayCircle className="w-4 h-4 inline mr-1" />
                                    {t.dailyView}
                                </button>
                                <button
                                    onClick={() => setViewMode('calendar')}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'calendar'
                                        ? 'bg-study-accent text-study-bg'
                                        : 'text-study-muted hover:text-study-text'
                                    }`}
                                >
                                    <CalendarDays className="w-4 h-4 inline mr-1" />
                                    {t.calendar}
                                </button>
                                <button
                                    onClick={() => setViewMode('overview')}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'overview'
                                        ? 'bg-study-accent text-study-bg'
                                        : 'text-study-muted hover:text-study-text'
                                    }`}
                                >
                                    <BarChart3 className="w-4 h-4 inline mr-1" />
                                    {t.overview}
                                </button>
                            </div>

                            {/* Language Toggle */}
                            <button
                                onClick={() => setLang(lang === 'kr' ? 'cz' : 'kr')}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-study-bg hover:bg-study-border rounded-lg text-sm font-medium text-study-muted hover:text-study-text transition-all"
                            >
                                <Globe className="w-4 h-4" />
                                {lang === 'kr' ? 'CZ' : 'KR'}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <aside className="lg:w-72 flex-shrink-0">
                        <div className="lg:sticky lg:top-24 space-y-4">
                            {/* Day Navigation */}
                            <div className="bg-study-surface rounded-xl p-4 border border-study-border">
                                <div className="text-center mb-4">
                                    <div className="text-sm text-study-muted">{t.months[currentMonthIndex - 1]}</div>
                                    <div className="text-3xl font-bold text-study-accent">{t.day} {selectedDay}</div>
                                    {currentDayData?.date && (
                                        <div className="text-sm text-study-muted mt-1">{currentDayData.date}</div>
                                    )}
                                    {progress.completedDays.includes(selectedDay) && (
                                        <div className="mt-2 inline-flex items-center gap-1 text-emerald-600 text-sm font-medium">
                                            <CheckCircle2 className="w-4 h-4" />
                                            {t.completed}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => goToDay(selectedDay - 1)}
                                        disabled={selectedDay <= 1}
                                        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-study-bg hover:bg-study-border disabled:opacity-50 disabled:cursor-not-allowed transition-all text-study-muted hover:text-study-text"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        <span className="text-sm">{t.yesterday}</span>
                                    </button>
                                    <button
                                        onClick={() => goToDay(selectedDay + 1)}
                                        disabled={selectedDay >= totalDays}
                                        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-study-bg hover:bg-study-border disabled:opacity-50 disabled:cursor-not-allowed transition-all text-study-muted hover:text-study-text"
                                    >
                                        <span className="text-sm">{t.tomorrow}</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Progress Stats */}
                            <div className="bg-study-surface rounded-xl p-4 border border-study-border">
                                <h3 className="text-sm font-semibold text-study-muted mb-3 flex items-center gap-2">
                                    <Target className="w-4 h-4" />
                                    {t.totalProgress}
                                </h3>

                                <div className="space-y-3">
                                    {/* Days Progress */}
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-study-muted">{t.days}</span>
                                            <span className="text-study-text font-medium">
                                                {progress.completedDays.length}/{totalDays}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-study-bg rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-study-accent transition-all"
                                                style={{ width: `${(progress.completedDays.length / totalDays) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Vocab Progress */}
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-study-muted">{t.vocabulary}</span>
                                            <span className="text-study-text font-medium">
                                                {stats.vocabLearned}/{stats.totalVocab}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-study-bg rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 transition-all"
                                                style={{ width: `${(stats.vocabLearned / stats.totalVocab) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Grammar Progress */}
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-study-muted">{t.grammar}</span>
                                            <span className="text-study-text font-medium">
                                                {stats.grammarLearned}/{stats.totalGrammar}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-study-bg rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 transition-all"
                                                style={{ width: `${(stats.grammarLearned / stats.totalGrammar) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Streak */}
                                    <div className="flex items-center justify-between pt-2 border-t border-study-border">
                                        <span className="text-study-muted text-sm flex items-center gap-1">
                                            <Flame className="w-4 h-4 text-orange-500" />
                                            {t.streak}
                                        </span>
                                        <span className="text-study-text font-bold">
                                            {progress.streak} {t.days}
                                        </span>
                                    </div>

                                    {/* Current Level */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-study-muted text-sm flex items-center gap-1">
                                            <Star className="w-4 h-4 text-amber-500" />
                                            {t.level}
                                        </span>
                                        <span className="bg-study-accent/20 text-study-accent px-2 py-0.5 rounded font-bold text-sm">
                                            {currentMonth?.targetLevel || 'A1'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Month Navigation */}
                            <div className="bg-study-surface rounded-xl p-4 border border-study-border">
                                <h3 className="text-sm font-semibold text-study-muted mb-3 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {t.month}
                                </h3>
                                <div className="space-y-1">
                                    {plan.monthsData.map((_month, idx) => {
                                        const isActive = currentMonthIndex === idx + 1;
                                        const milestone = plan.milestones[idx];
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    let dayNum = 0;
                                                    for (let i = 0; i < idx; i++) {
                                                        dayNum += plan.monthsData[i].days.length;
                                                    }
                                                    goToDay(dayNum + 1);
                                                }}
                                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${isActive
                                                    ? 'bg-study-accent text-study-bg font-bold'
                                                    : 'text-study-muted hover:bg-study-bg hover:text-study-text'
                                                }`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    {milestone?.isCheckpoint && (
                                                        <Star className={`w-3 h-3 ${isActive ? '' : 'text-amber-500'} fill-current`} />
                                                    )}
                                                    {t.months[idx]}
                                                </span>
                                                <span className={`text-xs ${isActive ? 'opacity-80' : 'opacity-60'}`}>
                                                    {milestone?.level}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {viewMode === 'day' && currentDayData && currentMonth && (
                            <DayView
                                day={currentDayData}
                                month={currentMonth}
                                dayNumber={selectedDay}
                                lang={lang}
                                t={t}
                                expandedSections={expandedSections}
                                toggleSection={toggleSection}
                                isCompleted={progress.completedDays.includes(selectedDay)}
                                note={progress.dayNotes[selectedDay]}
                            />
                        )}

                        {viewMode === 'calendar' && (
                            <CalendarView
                                plan={plan}
                                selectedDay={selectedDay}
                                onSelectDay={goToDay}
                                completedDays={progress.completedDays}
                                lang={lang}
                                t={t}
                            />
                        )}

                        {viewMode === 'overview' && (
                            <OverviewView
                                plan={plan}
                                progress={progress}
                                stats={stats}
                                lang={lang}
                                t={t}
                                onSelectMonth={(monthIdx) => {
                                    let dayNum = 0;
                                    for (let i = 0; i < monthIdx; i++) {
                                        dayNum += plan.monthsData[i].days.length;
                                    }
                                    goToDay(dayNum + 1);
                                    setViewMode('day');
                                }}
                            />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

// Day View Component (Read-Only)
function DayView({
    day, month, dayNumber, lang, t, expandedSections, toggleSection, isCompleted, note
}: {
    day: KoreanDayData;
    month: KoreanMonthData;
    dayNumber: number;
    lang: Lang;
    t: typeof translations['cz'];
    expandedSections: Set<string>;
    toggleSection: (s: string) => void;
    isCompleted: boolean;
    note?: string;
}) {
    const isWeekend = day.isWeekend;
    const isTest = day.isTest;

    return (
        <div className="space-y-4">
            {/* Day Header */}
            <div className={`rounded-xl p-6 border ${isCompleted
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : isTest
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : isWeekend
                        ? 'bg-violet-500/10 border-violet-500/30'
                        : 'bg-study-surface border-study-border'
            }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <h2 className="text-2xl font-bold text-study-text">
                                {t.day} {dayNumber}
                            </h2>
                            {day.title && (
                                <span className="text-lg">{day.title}</span>
                            )}
                            {isCompleted && (
                                <span className="bg-emerald-500/30 text-emerald-700 px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" />
                                    {t.completed}
                                </span>
                            )}
                            {isTest && !isCompleted && (
                                <span className="bg-amber-500/30 text-amber-700 px-2 py-1 rounded text-sm font-medium">
                                    {t.test}
                                </span>
                            )}
                            {isWeekend && !isTest && !isCompleted && (
                                <span className="bg-violet-500/30 text-violet-700 px-2 py-1 rounded text-sm font-medium">
                                    {t.weekend}
                                </span>
                            )}
                        </div>
                        <p className="text-study-muted mt-1">
                            {lang === 'kr' ? month.nameKR : month.nameCZ} • {month.targetLevel}
                        </p>
                    </div>
                </div>

                {/* Day Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-study-border/50">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-study-accent">{day.vocab.length}</div>
                        <div className="text-xs text-study-muted">{t.vocabulary}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">{day.grammar ? 1 : 0}</div>
                        <div className="text-xs text-study-muted">{t.grammar}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-violet-500">{day.tasks?.length || 0}</div>
                        <div className="text-xs text-study-muted">{t.tasks}</div>
                    </div>
                </div>
            </div>

            {/* Admin Note */}
            {note && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-blue-600 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Poznámka
                    </h3>
                    <p className="text-study-text">{note}</p>
                </div>
            )}

            {/* Vocabulary Section */}
            {day.vocab.length > 0 && (
                <section className="bg-study-surface rounded-xl border border-study-border overflow-hidden">
                    <button
                        onClick={() => toggleSection('vocab')}
                        className="w-full flex items-center justify-between p-4 hover:bg-study-bg transition-colors"
                    >
                        <h3 className="text-lg font-bold text-study-text flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-emerald-500" />
                            {t.vocabulary} ({day.vocab.length})
                        </h3>
                        {expandedSections.has('vocab') ? (
                            <ChevronUp className="w-5 h-5 text-study-muted" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-study-muted" />
                        )}
                    </button>

                    {expandedSections.has('vocab') && (
                        <div className="border-t border-study-border">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-study-bg">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-study-muted">한국어</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-study-muted">Česky</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {day.vocab.map((v, i) => (
                                        <tr key={i} className="border-t border-study-border hover:bg-study-bg/50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-study-text text-lg">{v.kr}</td>
                                            <td className="px-4 py-3 text-study-muted">{v.cz}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            )}

            {/* Grammar Section */}
            {day.grammar && (
                <section className="bg-study-surface rounded-xl border border-blue-500/30 overflow-hidden">
                    <button
                        onClick={() => toggleSection('grammar')}
                        className="w-full flex items-center justify-between p-4 hover:bg-blue-500/5 transition-colors"
                    >
                        <h3 className="text-lg font-bold text-study-text flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-blue-500" />
                            {t.grammar}: {day.grammar.title}
                        </h3>
                        {expandedSections.has('grammar') ? (
                            <ChevronUp className="w-5 h-5 text-study-muted" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-study-muted" />
                        )}
                    </button>

                    {expandedSections.has('grammar') && (
                        <div className="border-t border-blue-500/30 p-4 space-y-4">
                            {day.grammar.explanation && (
                                <div className="bg-blue-500/10 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-blue-600 mb-2 flex items-center gap-2">
                                        <Lightbulb className="w-4 h-4" />
                                        {t.rule}
                                    </h4>
                                    <pre className="text-study-text whitespace-pre-wrap font-sans text-sm leading-relaxed">
                                        {day.grammar.explanation}
                                    </pre>
                                </div>
                            )}

                            {day.grammar.examples && day.grammar.examples.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-study-muted mb-2 flex items-center gap-2">
                                        <Volume2 className="w-4 h-4" />
                                        {t.examples}
                                    </h4>
                                    <div className="space-y-2">
                                        {day.grammar.examples.map((ex, i) => (
                                            <div key={i} className="bg-study-bg rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2">
                                                <span className="font-medium text-study-text text-lg">{ex.kr}</span>
                                                <span className="text-study-muted text-sm sm:ml-auto">= {ex.cz}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            )}

            {/* Tasks Section (Read-Only) */}
            {day.tasks && day.tasks.length > 0 && (
                <section className="bg-study-surface rounded-xl border border-study-border p-4">
                    <h3 className="text-lg font-bold text-study-text flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-violet-500" />
                        {t.tasks}
                    </h3>
                    <ul className="space-y-2">
                        {day.tasks.map((task, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-study-text">
                                <span className="text-study-accent">•</span>
                                {task}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Exercises Section */}
            {day.exercises && day.exercises.length > 0 && (
                <section className="bg-study-surface rounded-xl border border-study-border p-4">
                    <h3 className="text-lg font-bold text-study-text flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-orange-500" />
                        {t.exercises}
                    </h3>
                    <div className="space-y-2 bg-study-bg rounded-lg p-3">
                        {day.exercises.map((ex, i) => (
                            <div key={i} className="text-sm text-study-text font-mono">{ex}</div>
                        ))}
                    </div>
                </section>
            )}

            {/* Notes Section */}
            {day.notes && day.notes.length > 0 && (
                <section className="bg-amber-500/10 rounded-xl border border-amber-500/30 p-4">
                    <h3 className="text-lg font-bold text-study-text flex items-center gap-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-amber-500" />
                        {t.notes}
                    </h3>
                    <ul className="space-y-1">
                        {day.notes.map((noteItem, i) => (
                            <li key={i} className="text-sm text-study-text flex items-start gap-2">
                                <span className="text-amber-500">•</span> {noteItem}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}

// Calendar View Component
function CalendarView({
    plan, selectedDay, onSelectDay, completedDays, lang, t
}: {
    plan: KoreanStudyPlan;
    selectedDay: number;
    onSelectDay: (day: number) => void;
    completedDays: number[];
    lang: Lang;
    t: typeof translations['cz'];
}) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-study-text flex items-center gap-2">
                <CalendarDays className="w-6 h-6 text-study-accent" />
                {t.calendar}
            </h2>

            {plan.monthsData.map((month, monthIdx) => {
                let startDayNum = 0;
                for (let i = 0; i < monthIdx; i++) {
                    startDayNum += plan.monthsData[i].days.length;
                }

                return (
                    <div key={monthIdx} className="bg-study-surface rounded-xl border border-study-border p-4">
                        <h3 className="text-lg font-bold text-study-text mb-4 flex items-center gap-2">
                            {t.months[monthIdx]}
                            <span className="text-sm font-normal text-study-muted">
                                • {month.targetLevel} • {month.days.length} {t.days}
                            </span>
                        </h3>

                        <div className="grid grid-cols-7 gap-2">
                            {month.days.map((day, dayIdx) => {
                                const dayNum = startDayNum + dayIdx + 1;
                                const isSelected = selectedDay === dayNum;
                                const isCompleted = completedDays.includes(dayNum);

                                return (
                                    <button
                                        key={dayIdx}
                                        onClick={() => onSelectDay(dayNum)}
                                        className={`p-2 rounded-lg text-center transition-all ${isSelected
                                            ? 'bg-study-accent text-study-bg ring-2 ring-study-accent ring-offset-2 ring-offset-study-surface'
                                            : isCompleted
                                                ? 'bg-emerald-500/20 text-emerald-600 hover:bg-emerald-500/30'
                                                : day.isTest
                                                    ? 'bg-amber-500/20 text-amber-600 hover:bg-amber-500/30'
                                                    : day.isWeekend
                                                        ? 'bg-violet-500/20 text-violet-600 hover:bg-violet-500/30'
                                                        : 'bg-study-bg hover:bg-study-border text-study-muted hover:text-study-text'
                                        }`}
                                    >
                                        <div className="text-sm font-medium">{dayNum}</div>
                                        <div className="text-xs opacity-70">{day.vocab.length} {lang === 'kr' ? '단어' : 'sl.'}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// Overview View Component
function OverviewView({
    plan, progress, stats, lang, t, onSelectMonth
}: {
    plan: KoreanStudyPlan;
    progress: StudyProgress;
    stats: { totalVocab: number; totalGrammar: number; vocabLearned: number; grammarLearned: number };
    lang: Lang;
    t: typeof translations['cz'];
    onSelectMonth: (monthIdx: number) => void;
}) {
    const totalDays = getTotalDays(plan);

    return (
        <div className="space-y-6">
            {/* Hero Stats */}
            <div className="bg-gradient-to-br from-study-accent/20 to-blue-500/20 rounded-xl p-6 border border-study-accent/30">
                <h2 className="text-2xl font-bold text-study-text mb-4">
                    {lang === 'kr' ? plan.titleKR : plan.titleCZ}
                </h2>
                <p className="text-study-muted mb-6">
                    {plan.startDate} → {plan.endDate}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-study-surface/80 backdrop-blur rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-study-accent">{progress.completedDays.length}</div>
                        <div className="text-sm text-study-muted">/ {totalDays} {t.days}</div>
                    </div>
                    <div className="bg-study-surface/80 backdrop-blur rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-emerald-500">{stats.vocabLearned}</div>
                        <div className="text-sm text-study-muted">/ {stats.totalVocab} {t.words}</div>
                    </div>
                    <div className="bg-study-surface/80 backdrop-blur rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-500">{stats.grammarLearned}</div>
                        <div className="text-sm text-study-muted">/ {stats.totalGrammar} {t.structures}</div>
                    </div>
                    <div className="bg-study-surface/80 backdrop-blur rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-orange-500">{progress.streak}</div>
                        <div className="text-sm text-study-muted">{t.streak} {t.days}</div>
                    </div>
                </div>
            </div>

            {/* Months Grid */}
            <div className="bg-study-surface rounded-xl p-6 border border-study-border">
                <h3 className="text-lg font-bold text-study-text mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-study-accent" />
                    10 {lang === 'kr' ? '개월 플랜' : 'měsíční plán'}
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {plan.milestones.map((m, idx) => {
                        const monthData = plan.monthsData[idx];
                        const isSpecial = idx === 2; // Duben - cesta
                        const isConstruction = idx === 4 || idx === 6; // Červen, Srpen

                        // Calculate month progress
                        let startDay = 0;
                        for (let i = 0; i < idx; i++) {
                            startDay += plan.monthsData[i].days.length;
                        }
                        const endDay = startDay + (monthData?.days.length || 0);
                        const completedInMonth = progress.completedDays.filter(d => d > startDay && d <= endDay).length;
                        const monthTotal = monthData?.days.length || 0;
                        const percentage = monthTotal > 0 ? Math.round((completedInMonth / monthTotal) * 100) : 0;

                        return (
                            <button
                                key={idx}
                                onClick={() => onSelectMonth(idx)}
                                className={`p-4 rounded-lg text-left transition-all hover:ring-2 hover:ring-study-accent/50 ${m.isCheckpoint
                                    ? 'bg-amber-500/10 border border-amber-500/30'
                                    : 'bg-study-bg hover:bg-study-border'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-study-text flex items-center gap-2">
                                        {m.isCheckpoint && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                                        {isSpecial && <Plane className="w-4 h-4 text-blue-500" />}
                                        {isConstruction && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                                        {t.months[idx]}
                                    </span>
                                    <span className="bg-study-accent/20 text-study-accent px-2 py-0.5 rounded text-sm font-bold">
                                        {m.level}
                                    </span>
                                </div>
                                <div className="text-sm text-study-muted mb-2">
                                    {monthData?.goals?.[0] || `${m.words} ${t.words}`}
                                </div>
                                <div className="h-1.5 bg-study-border rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 transition-all"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <div className="text-xs text-study-muted mt-1">
                                    {completedInMonth}/{monthTotal} {t.days} ({percentage}%)
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tools & Schedule */}
            {plan.overview && (
                <div className="grid sm:grid-cols-2 gap-4">
                    {plan.overview.schedule && (
                        <div className="bg-study-surface rounded-xl p-4 border border-study-border">
                            <h3 className="text-lg font-bold text-study-text mb-3 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-study-accent" />
                                {lang === 'kr' ? '일정' : 'Rozvrh'}
                            </h3>
                            <div className="space-y-2">
                                {plan.overview.schedule.map((s, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm">
                                        <span className="text-study-text font-medium">{s.day}</span>
                                        <span className="text-study-accent">{s.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {plan.overview.tools && (
                        <div className="bg-study-surface rounded-xl p-4 border border-study-border">
                            <h3 className="text-lg font-bold text-study-text mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5 text-study-accent" />
                                {lang === 'kr' ? '도구' : 'Nástroje'}
                            </h3>
                            <div className="space-y-2">
                                {plan.overview.tools.map((tool, i) => (
                                    <div key={i} className="text-sm">
                                        <span className="text-study-text font-medium">{tool.name}</span>
                                        <span className="text-study-muted ml-2">- {tool.usage}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Motivation */}
            {plan.overview?.motivation && (
                <div className="bg-gradient-to-r from-study-accent/10 to-transparent rounded-xl p-6 border border-study-accent/30 text-center">
                    <Flame className="w-8 h-8 text-study-accent mx-auto mb-2" />
                    <p className="text-lg text-study-text italic">"{plan.overview.motivation}"</p>
                </div>
            )}
        </div>
    );
}

export default StudyPlanPage;
