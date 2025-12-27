import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { useStudyLanguage } from '../../../study/i18n/StudyLanguageContext';
import type { MonthPlan, PlanItem, StudyPlanStatus } from '../../../types/study-db';


interface RoadmapTimelineProps {
    months: MonthPlan[];
    loading?: boolean;
}

/**
 * RoadmapTimeline - Professional Implementation
 * 
 * Displays study plan months using proper MonthPlan schema.
 * No data transformation - works directly with Firestore types.
 * Calculates month status from actual PlanItem statuses.
 * Handles language selection internally.
 */
export function RoadmapTimeline({ months, loading }: RoadmapTimelineProps) {
    const { studyLang } = useStudyLanguage();

    if (loading) {
        return (
            <div className="text-center text-[var(--study-text-muted)] py-12">
                Loading Roadmap...
            </div>
        );
    }

    if (months.length === 0) {
        return (
            <div className="text-center text-[var(--study-text-muted)] py-12 italic">
                No plan items public yet.
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--study-accent)] to-transparent opacity-20"></div>

            <div className="space-y-8">
                {months.map((month, index) => (
                    <MonthCard
                        key={month.monthKey}
                        month={month}
                        index={index}
                        studyLang={studyLang}
                    />
                ))}
            </div>
        </div>
    );
}

// Helper function: Calculate month status from items
function calculateMonthStatus(items: PlanItem[]): StudyPlanStatus {
    if (items.length === 0) return 'planned';

    const allCompleted = items.every(i => i.status === 'completed');
    if (allCompleted) return 'completed';

    const hasInProgress = items.some(i => i.status === 'in-progress');
    if (hasInProgress) return 'in-progress';

    return 'planned';
}

// Helper function: Render markdown-like text
function renderDescription(text: string) {
    if (!text) return null;

    return text.split('\n').map((line: string, i: number) => {
        if (line.startsWith('- ')) {
            return (
                <div key={i} className="flex gap-2 mb-1">
                    <span className="text-[var(--study-text-muted)]">•</span>
                    <span className="text-[var(--study-text-muted)] leading-relaxed">
                        {line.substring(2)}
                    </span>
                </div>
            );
        }
        return (
            <div key={i} className="mb-1 text-[var(--study-text-muted)] leading-relaxed">
                {line}
            </div>
        );
    });
}

// Month Card Component
interface MonthCardProps {
    month: MonthPlan;
    index: number;
    studyLang: 'kr' | 'en';
}

function MonthCard({ month, index, studyLang }: MonthCardProps) {
    const title = studyLang === 'kr' ? month.titleKR : month.titleEN;
    const goal = studyLang === 'kr' ? month.goalKR : month.goalEN;
    const status = calculateMonthStatus(month.items);

    const completedCount = month.items.filter(i => i.status === 'completed').length;
    const totalCount = month.items.length;
    const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <div className="relative pl-20 pb-8">
            {/* Timeline dot */}
            <div className={`absolute left-6 top-2 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10
                ${status === 'completed' ? 'bg-green-500 border-green-500' :
                    status === 'in-progress' ? 'bg-blue-500 border-blue-500' :
                        'bg-gray-300 border-gray-300'}`}
            >
                {status === 'completed' && <CheckCircle2 size={12} className="text-white" />}
                {status === 'in-progress' && <Clock size={12} className="text-white" />}
            </div>

            {/* Month number badge */}
            <div className="absolute left-0 top-0 w-12 h-8 flex items-center justify-center">
                <span className="text-xs font-bold text-[var(--study-text-muted)]">
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>

            {/* Card content */}
            <div className="bg-[var(--study-surface)] rounded-xl border border-[var(--study-border)] p-6 shadow-xs hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-mono text-[var(--study-text-muted)]">
                                {month.monthKey}
                            </span>
                            <StatusBadge status={status} />
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--study-text)] mb-2">
                            {title}
                        </h3>
                        {goal && (
                            <div className="text-sm mt-3">
                                {renderDescription(goal)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress bar */}
                {totalCount > 0 && (
                    <div className="mb-4">
                        <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-[var(--study-text-muted)]">Progress</span>
                            <span className="font-bold text-[var(--study-text)]">
                                {completedCount} / {totalCount}
                            </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[var(--study-accent)] to-[var(--study-accent-sub)] transition-all duration-500"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Plan Items */}
                {month.items.length > 0 && (
                    <div className="space-y-2 mt-4">
                        {month.items
                            .sort((a: PlanItem, b: PlanItem) => a.order - b.order)
                            .map((item: PlanItem) => (
                                <PlanItemRow
                                    key={item.id}
                                    item={item}
                                    studyLang={studyLang}
                                />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Plan Item Row Component
interface PlanItemRowProps {
    item: PlanItem;
    studyLang: 'kr' | 'en';
}

function PlanItemRow({ item, studyLang }: PlanItemRowProps) {
    const text = studyLang === 'kr' ? item.textKR : item.textEN;

    return (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--study-bg)] border border-[var(--study-border)]">
            <div className="mt-0.5">
                {item.status === 'completed' ? (
                    <CheckCircle2 size={18} className="text-green-500" />
                ) : item.status === 'in-progress' ? (
                    <Clock size={18} className="text-blue-500" />
                ) : (
                    <Circle size={18} className="text-gray-400" />
                )}
            </div>
            <div className="flex-1">
                <span className={`text-sm ${item.status === 'completed'
                    ? 'text-[var(--study-text-muted)] line-through'
                    : 'text-[var(--study-text)]'
                    }`}>
                    {text}
                </span>
            </div>
        </div>
    );
}

// Status Badge Component
function StatusBadge({ status }: { status: StudyPlanStatus }) {
    const config: Record<StudyPlanStatus, { label: string; className: string }> = {
        'completed': {
            label: 'Completed',
            className: 'bg-green-100 text-green-700 border-green-300'
        },
        'in-progress': {
            label: 'In Progress',
            className: 'bg-blue-100 text-blue-700 border-blue-300'
        },
        'planned': {
            label: 'Planned',
            className: 'bg-gray-100 text-gray-700 border-gray-300'
        }
    };

    const { label, className } = config[status];

    return (
        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase border ${className}`}>
            {label}
        </span>
    );
}
