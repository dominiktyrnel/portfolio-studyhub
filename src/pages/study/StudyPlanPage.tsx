import { useState, useMemo } from 'react';
import { useStudyPlan } from '../../hooks/useStudyPlan';
import { RoadmapTimeline } from '../../components/study/plan/RoadmapTimeline';
import { useStudyTranslations } from '../../study/i18n/useStudyTranslations';
import { PlanSkeleton } from '../../components/study/LoadingSkeletons';
import { useNavigate } from 'react-router-dom';
import { Play, Filter } from 'lucide-react';

/**
 * StudyPlanPage - Enhanced Implementation
 * 
 * Features:
 * - Month filter dropdown
 * - Current month highlight
 * - Progress summary
 * - CTA button to start studying
 */
export function StudyPlanPage() {
    const { plan, loading } = useStudyPlan();
    const t = useStudyTranslations();
    const navigate = useNavigate();

    // Current month for filtering
    const currentMonthKey = useMemo(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    }, []);

    const [filterMonth, setFilterMonth] = useState<string>('all');

    // Get available months from plan
    const availableMonths = useMemo(() => {
        return plan?.months?.map(m => m.monthKey) || [];
    }, [plan]);

    // Filter months based on selection
    const filteredMonths = useMemo(() => {
        if (!plan?.months) return [];
        if (filterMonth === 'all') return plan.months;
        return plan.months.filter(m => m.monthKey === filterMonth);
    }, [plan, filterMonth]);

    // Calculate progress for current month
    const currentMonthProgress = useMemo(() => {
        const currentMonth = plan?.months?.find(m => m.monthKey === currentMonthKey);
        if (!currentMonth?.items?.length) return { completed: 0, total: 0 };
        const completed = currentMonth.items.filter(i => i.status === 'completed').length;
        return { completed, total: currentMonth.items.length };
    }, [plan, currentMonthKey]);

    if (loading) {
        return <PlanSkeleton />;
    }

    return (
        <div className="@starting-style:opacity-0 opacity-100 transition-opacity duration-500">
            <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 md:px-8 max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-[var(--study-text)] mb-4 font-heading">
                        {t.plan.masterPlan}
                    </h1>
                    <p className="text-[var(--study-text-muted)] text-lg max-w-2xl mx-auto">
                        {t.plan.subtitle}
                    </p>
                </div>

                {/* Current Month Highlight + CTA */}
                <div className="bg-[var(--study-surface)] border border-[var(--study-border)] rounded-xl p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-[var(--study-text)] mb-1">
                                {t.plan.currentMonth} ({t.plan.thisMonth})
                            </h2>
                            <div className="flex items-center gap-3">
                                <div className="text-sm text-[var(--study-text-muted)]">
                                    {t.plan.monthProgress}: {currentMonthProgress.completed}/{currentMonthProgress.total}
                                </div>
                                {currentMonthProgress.total > 0 && (
                                    <div className="flex-1 max-w-[200px] h-2 bg-[var(--study-border)] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[var(--study-accent)] rounded-full transition-all"
                                            style={{ width: `${(currentMonthProgress.completed / currentMonthProgress.total) * 100}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/study/now')}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--study-accent)] text-[var(--study-bg)] font-bold rounded-lg hover:opacity-90 transition-opacity"
                        >
                            <Play size={18} />
                            {t.plan.startStudy}
                        </button>
                    </div>
                </div>

                {/* Month Filter */}
                <div className="flex items-center gap-3 mb-8">
                    <Filter size={16} className="text-[var(--study-text-muted)]" />
                    <select
                        value={filterMonth}
                        onChange={(e) => setFilterMonth(e.target.value)}
                        className="px-3 py-2 bg-[var(--study-surface)] border border-[var(--study-border)] rounded-lg text-[var(--study-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--study-accent)]"
                    >
                        <option value="all">{t.plan.allMonths}</option>
                        {availableMonths.map(month => (
                            <option key={month} value={month}>
                                {month} {month === currentMonthKey ? '✦' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Timeline - Filtered months */}
                <RoadmapTimeline months={filteredMonths} loading={loading} />

                {/* Footer Call to Action */}
                <div className="text-center mt-20 mb-12">
                    <p className="text-[var(--study-text-muted)] text-sm">
                        {t.plan.targetCompletion}{' '}
                        <span className="font-bold text-[var(--study-text)]">
                            {t.plan.completeMastery}
                        </span>{' '}
                        {t.plan.byDate} Dec 2025
                    </p>
                </div>

            </div>
        </div>
    );
}
