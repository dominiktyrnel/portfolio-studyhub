import { useState, useEffect } from 'react';
import { Activity, Clock } from 'lucide-react';
import type { BotStatus } from '../../../types/study-db';

interface StatusWidgetProps {
    status: BotStatus | null;
    loading: boolean;
    lang: 'kr' | 'en';
}

// Map currentMode to display labels
const MODE_LABELS_KR: Record<string, string> = {
    'Focus': '집중',
    'Break': '휴식',
    'Long Break': '긴 휴식',
    'Pause': '일시정지',
    'Ready': '대기중',
    'Completed': '완료!',
    'Offline': '오프라인'
};

const MODE_LABELS_EN: Record<string, string> = {
    'Focus': 'Focus',
    'Break': 'Break',
    'Long Break': 'Long Break',
    'Pause': 'Paused',
    'Ready': 'Ready',
    'Completed': 'Completed',
    'Offline': 'Offline'
};

export function StatusWidget({ status, loading, lang }: StatusWidgetProps) {
    // All hooks must be before any early returns
    const lastUpdate = status?.lastUpdatedAt || status?.lastPollAt || status?.updatedAt;
    const [freshnessLabel, setFreshnessLabel] = useState('Unknown');
    const [isStale, setIsStale] = useState(false);
    const [uptimeSeconds, setUptimeSeconds] = useState(0);

    const isOnline = status?.streamOnline ?? false;

    useEffect(() => {
        const updateFreshness = () => {
            if (!lastUpdate) {
                setFreshnessLabel('Unknown');
                setIsStale(false);
                return;
            }

            const diffSeconds = (Date.now() - lastUpdate.toMillis()) / 1000;
            if (diffSeconds < 60) {
                setFreshnessLabel(lang === 'kr' ? '방금 전' : 'Just now');
                setIsStale(false);
            } else if (diffSeconds < 120) {
                setFreshnessLabel(lang === 'kr' ? '1분 전' : '1 min ago');
                setIsStale(false);
            } else {
                const mins = Math.floor(diffSeconds / 60);
                setFreshnessLabel(lang === 'kr' ? `${mins}분 전` : `${mins} mins ago`);
                setIsStale(mins > 2);
            }
        };

        updateFreshness();
        const interval = setInterval(updateFreshness, 10000);
        return () => clearInterval(interval);
    }, [lastUpdate, lang]);

    useEffect(() => {
        const updateUptime = () => {
            if (!isOnline || !status?.streamStartedAt) {
                setUptimeSeconds(0);
                return;
            }
            const startTime = status.streamStartedAt.toMillis();
            setUptimeSeconds(Math.floor((Date.now() - startTime) / 1000));
        };

        updateUptime();
        const interval = setInterval(updateUptime, 60000);
        return () => clearInterval(interval);
    }, [isOnline, status?.streamStartedAt]);

    if (loading) {
        return (
            <div className="bg-[var(--study-surface)] rounded-xl border border-[var(--study-border)] p-6 h-40 animate-pulse flex items-center justify-center">
                <div className="text-[var(--study-muted)]">Loading Status...</div>
            </div>
        );
    }

    // Use new currentMode field with fallback to legacy mode
    const currentMode = status?.currentMode || 'Offline';
    const modeLabel = lang === 'kr'
        ? (MODE_LABELS_KR[currentMode] || currentMode)
        : (MODE_LABELS_EN[currentMode] || currentMode);

    // Session tracking moved to TimerWidget

    const formatUptime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return `${h}h ${m}m`;
    };

    return (
        <div className="bg-[var(--study-surface)] rounded-xl border border-[var(--study-border)] p-6 shadow-xs relative overflow-hidden transition-colors duration-300 hover-tilt shadow-3d-hover">
            {/* Header / Badges */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-[var(--study-muted)] uppercase tracking-wider mb-1">
                        {lang === 'kr' ? '현재 상태' : 'CURRENT STATUS'}
                    </span>
                    <h2 className="text-2xl font-bold text-[var(--study-text)]">
                        {isOnline
                            ? (lang === 'kr' ? '공부 중입니다' : 'Study Session Live')
                            : (lang === 'kr' ? '오프라인' : 'Currently Offline')}
                    </h2>
                    {/* Freshness Indicator */}
                    <div className={`text-xs mt-1 font-medium ${isStale ? 'text-red-400' : 'text-[var(--study-muted)]'}`}>
                        {lang === 'kr' ? '업데이트: ' : 'Updated: '} {freshnessLabel}
                        {isStale && (lang === 'kr' ? ' (지연됨)' : ' (Delayed)')}
                    </div>
                </div>

                {/* Status Badge */}
                <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs ${isOnline
                    ? 'bg-[var(--study-live)] text-white'
                    : 'bg-[var(--study-border)] text-[var(--study-text-muted)]'
                    }`}>
                    {isOnline && <span className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                    {isOnline ? 'LIVE ON' : 'OFFLINE'}
                </div>
            </div>

            {/* Metrics Grid - now 2 columns (SESSION moved to TimerWidget) */}
            <div className="grid grid-cols-2 gap-3 mt-2">
                {/* MODE */}
                <div className="bg-[var(--study-bg)] rounded-lg p-3 border border-[var(--study-border)] flex items-center gap-2">
                    <div className={`p-2 rounded-full ${isOnline ? 'bg-[var(--study-accent)]/10 text-[var(--study-accent)]' : 'bg-[var(--study-surface)] text-[var(--study-text-muted)]'}`}>
                        <Activity size={16} />
                    </div>
                    <div className="min-w-0">
                        <div className="text-[10px] font-bold text-[var(--study-muted)] uppercase">MODE</div>
                        <div className="text-sm font-bold text-[var(--study-text)] truncate">
                            {modeLabel}
                        </div>
                    </div>
                </div>

                {/* UPTIME */}
                <div className="bg-[var(--study-bg)] rounded-lg p-3 border border-[var(--study-border)] flex items-center gap-2">
                    <div className={`p-2 rounded-full ${isOnline ? 'bg-[var(--study-focus)]/10 text-[var(--study-focus)]' : 'bg-[var(--study-surface)] text-[var(--study-text-muted)]'}`}>
                        <Clock size={16} />
                    </div>
                    <div className="min-w-0">
                        <div className="text-[10px] font-bold text-[var(--study-muted)] uppercase">UPTIME</div>
                        <div className="text-sm font-bold text-[var(--study-text)]">
                            {isOnline ? formatUptime(uptimeSeconds) : '--:--'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--study-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </div>
    );
}
