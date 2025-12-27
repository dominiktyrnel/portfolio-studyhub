import { useOutletContext } from 'react-router-dom';
import { useStudyStatus } from '../../hooks/useStudyStatus';
import { useStudySchedule } from '../../hooks/useStudySchedule';
import { StatusWidget } from '../../components/study/dashboard/StatusWidget';
import { TimerWidget } from '../../components/study/dashboard/TimerWidget';
import { ActivityWidget } from '../../components/study/dashboard/ActivityWidget';
import { TimelineFeed } from '../../components/study/dashboard/TimelineFeed';
import { GooroomeeCard } from '../../components/study/dashboard/GooroomeeCard';
import { DashboardSkeleton } from '../../components/study/LoadingSkeletons';
import { Radio, ExternalLink, Calendar } from 'lucide-react';
import { useStudyTranslations } from '../../study/i18n/useStudyTranslations';
import { useStudyGlobalSettings } from '../../hooks/useStudyGlobalSettings';

export function StudyDashboard() {
    const { lang } = useOutletContext<{ lang: 'kr' | 'en' }>();
    const { status, stats, feed, loading } = useStudyStatus();
    const { getTodaySchedule } = useStudySchedule();
    const t = useStudyTranslations();
    const { settings: globalSettings } = useStudyGlobalSettings();

    const isOnline = status?.streamOnline ?? false;
    const todaySchedule = getTodaySchedule();
    const youtubeLink = globalSettings?.youtubeLink || 'https://youtube.com/@tyrnel';

    if (loading) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="@starting-style:opacity-0 opacity-100 transition-opacity duration-500">
            <div className="max-w-5xl mx-auto px-4 py-8">

                {/* LIVE Panel - Only show when online */}
                {isOnline && (
                    <div className="mb-6 bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 flex items-center justify-between shadow-lg animate-pulse-slow">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Radio size={24} className="text-white" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                    <span className="text-white font-bold text-lg">{t.now.liveNow}</span>
                                </div>
                                <p className="text-white/80 text-sm">
                                    {lang === 'kr' ? '지금 라이브 진행 중이에요!' : 'Live stream in progress!'}
                                </p>
                            </div>
                        </div>
                        <a
                            href={youtubeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white text-red-600 font-bold px-5 py-2.5 rounded-lg hover:bg-red-50 transition-colors shadow-md"
                        >
                            {t.now.watchNow}
                            <ExternalLink size={16} />
                        </a>
                    </div>
                )}

                {/* Offline Schedule Banner - Only show when offline and schedule exists */}
                {!isOnline && todaySchedule && (
                    <div className="mb-6 bg-[var(--study-surface)] border border-[var(--study-border)] rounded-xl p-4 flex items-center gap-4">
                        <div className="w-10 h-10 bg-[var(--study-accent)]/10 rounded-full flex items-center justify-center shrink-0">
                            <Calendar size={20} className="text-[var(--study-accent)]" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-[var(--study-text-muted)] uppercase tracking-wider">
                                {t.now.nextSession}
                            </span>
                            <p className="text-[var(--study-text)] font-medium">{todaySchedule}</p>
                        </div>
                    </div>
                )}

                {/* Top Grid: Status & Timer (Side by Side on Desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <StatusWidget status={status} loading={loading} lang={lang} />
                    <TimerWidget status={status} stats={stats} lang={lang} />
                </div>

                {/* Bottom Grid: Activity, Room & Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Column: Activity Stats & Room Entry */}
                    <div className="md:col-span-1 flex flex-col gap-6">
                        <div className="h-40">
                            {/* Ensure Height matches for alignment if needed, or let is expand */}
                            <ActivityWidget status={status} stats={stats} lang={lang} />
                        </div>

                        <GooroomeeCard lang={lang} />
                    </div>

                    {/* Right Column: Timeline Feed */}
                    <div className="md:col-span-2 bg-[var(--study-surface)] rounded-xl border border-[var(--study-border)] p-6 shadow-xs min-h-[400px]">
                        <h3 className="font-bold text-[var(--study-text)] mb-6 flex items-center gap-2">
                            {lang === 'kr' ? '타임라인' : 'Timeline'}
                            <span className="text-[10px] font-normal text-[var(--study-text-muted)] border border-[var(--study-border)] px-2 py-0.5 rounded-full uppercase tracking-wide">
                                Recent Events
                            </span>
                        </h3>
                        <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            <TimelineFeed events={feed} lang={lang} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

