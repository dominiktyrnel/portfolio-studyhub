import { StatsHeatmap } from '../../components/study/records/StatsHeatmap';
import { WeeklyChart } from '../../components/study/records/WeeklyChart';
import { Clock, Calendar, BarChart3, Play, Users } from 'lucide-react';
import { useStudyRecords } from '../../hooks/useStudyRecords';
import { useStudyTranslations } from '../../study/i18n/useStudyTranslations';
import { RecordsSkeleton } from '../../components/study/LoadingSkeletons';
import { useNavigate } from 'react-router-dom';

export function StudyRecordsPage() {
    const { sessions, heatmap, weekly, totals, loading } = useStudyRecords();
    const t = useStudyTranslations();
    const navigate = useNavigate();

    if (loading) {
        return <RecordsSkeleton />;
    }

    return (
        <div className="@starting-style:opacity-0 opacity-100 transition-opacity duration-500">
            <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-[var(--study-text)] mb-3 font-heading">{t.records.title}</h1>
                    <p className="text-[var(--study-text-muted)] max-w-2xl text-lg">
                        {t.records.subtitle}
                    </p>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                    {/* Visual: Heatmap (Span 2) */}
                    <div className="lg:col-span-2 bg-[var(--study-surface)] rounded-2xl p-6 md:p-8 shadow-xs border border-[var(--study-border)]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-[var(--study-text)] flex items-center gap-2">
                                <Calendar size={20} className="text-[var(--study-accent)]" />
                                {t.records.consistency}
                            </h2>
                        </div>
                        {/* Assuming StatsHeatmap can handle the simplistic heatmap object or needs refactor. Passing heatmap object for now, might need check */}
                        <StatsHeatmap data={Object.entries(heatmap).map(([date, val]) => ({ date, count: val }))} loading={loading} />
                    </div>

                    {/* Summary Card + Weekly Chart */}
                    <div className="bg-[var(--study-surface)] rounded-2xl p-6 md:p-8 shadow-xs border border-[var(--study-border)] flex flex-col relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-xl font-bold text-[var(--study-text)] flex items-center gap-2">
                                <BarChart3 size={20} className="text-[var(--study-accent)]" />
                                {t.records.weeklyFocus}
                            </h2>
                        </div>

                        <div className="flex-1">
                            <WeeklyChart data={weekly} loading={loading} />
                        </div>

                        <div className="pt-6 mt-6 border-t border-[var(--study-border)] grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs font-bold text-[var(--study-text-muted)] uppercase tracking-wider mb-1">{t.records.totalHours}</div>
                                <div className="text-2xl font-bold text-[var(--study-text)] font-mono">
                                    {loading ? '-' : totals.hours}
                                    <span className="text-sm text-[var(--study-text-muted)] ml-1">h</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-xs font-bold text-[var(--study-text-muted)] uppercase tracking-wider mb-1">{t.records.totalDays}</div>
                                <div className="text-2xl font-bold text-[var(--study-text)] font-mono">
                                    {loading ? '-' : totals.days}
                                    <span className="text-sm text-[var(--study-text-muted)] ml-1">d</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Sessions List */}
                <div className="bg-[var(--study-surface)] rounded-2xl shadow-xs border border-[var(--study-border)] overflow-hidden">
                    <div className="p-6 border-b border-[var(--study-border)] flex justify-between items-center">
                        <h2 className="text-xl font-bold text-[var(--study-text)] flex items-center gap-2">
                            <Clock size={20} className="text-[var(--study-accent)]" />
                            {t.records.recentSessions}
                        </h2>
                    </div>
                    <div className="divide-y divide-[var(--study-border)]">
                        {loading && <div className="p-8 text-center text-[var(--study-text-muted)]">{t.records.loading}</div>}

                        {!loading && sessions.length === 0 && (
                            <div className="p-12 text-center">
                                <div className="text-[var(--study-text-muted)] mb-4">
                                    {t.records.noRecordsYet}
                                </div>
                                <button
                                    onClick={() => navigate('/study/now')}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--study-accent)] text-[var(--study-bg)] font-bold rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    <Play size={18} />
                                    {t.records.startSession}
                                </button>
                            </div>
                        )}

                        {sessions.slice(0, 5).map((session) => {
                            const formatSource = (src: string) => {
                                if (src === 'youtube_stream') return '📺 YouTube';
                                if (src === 'youtube_bot') return '🤖 Bot';
                                if (src === 'web_manual') return '🌐 Web';
                                return src;
                            };

                            return (
                                <div key={session.id} className="p-6 hover:bg-[var(--study-bg)] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[var(--study-bg)] text-[var(--study-text-muted)] font-bold flex flex-col items-center justify-center text-xs text-center leading-tight">
                                            <span className="uppercase">{session.startedAt?.toDate().toLocaleString('en-US', { month: 'short' }) || '-'}</span>
                                            <span className="text-lg">{session.startedAt?.toDate().getDate() || '-'}</span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-[var(--study-text)]">{session.userName || t.records.anonymous}</div>
                                            <div className="text-sm text-[var(--study-text-muted)]">{formatSource(session.source)}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 pl-16 md:pl-0">
                                        {/* Focus/Break breakdown if available */}
                                        {session.focusMinutes !== undefined && (
                                            <div className="text-left md:text-right">
                                                <div className="text-xs text-[var(--study-text-muted)] font-bold uppercase">Focus</div>
                                                <div className="font-mono font-medium text-amber-500">
                                                    {session.focusMinutes} min
                                                </div>
                                            </div>
                                        )}
                                        <div className="text-left md:text-right">
                                            <div className="text-xs text-[var(--study-text-muted)] font-bold uppercase">{t.records.duration}</div>
                                            <div className="font-mono font-medium text-[var(--study-text)]">
                                                {(session.minutes || 0)} min
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Community Records Placeholder */}
                <div className="bg-[var(--study-surface)] rounded-2xl shadow-xs border border-[var(--study-border)] overflow-hidden mt-8">
                    <div className="p-6 border-b border-[var(--study-border)]">
                        <h2 className="text-xl font-bold text-[var(--study-text)] flex items-center gap-2">
                            <Users size={20} className="text-[var(--study-accent)]" />
                            {t.records.community}
                        </h2>
                    </div>
                    <div className="p-12 text-center">
                        <div className="text-[var(--study-accent)] font-bold mb-2">
                            {t.records.comingSoon}
                        </div>
                        <p className="text-[var(--study-text-muted)] text-sm">
                            {t.records.communityDesc}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

