import { useState, useEffect } from 'react';
import { Timer, Coffee, Zap, PartyPopper } from 'lucide-react';
import type { BotStatus, StreamStats } from '../../../types/study-db';

interface TimerWidgetProps {
    status: BotStatus | null;
    stats: StreamStats | null;
    lang: 'kr' | 'en';
}

export function TimerWidget({ status, lang }: TimerWidgetProps) {
    const [timeLeft, setTimeLeft] = useState<string>('--:--');
    const [progress, setProgress] = useState(0);

    // Use new field names with fallback to legacy
    const endsAt = status?.endsAt || status?.modeEndsAt;
    const phaseStartedAt = status?.phaseStartedAt || status?.modeStartedAt;
    const currentMode = status?.currentMode || 'Offline';

    useEffect(() => {
        const isOnline = status?.streamOnline ?? false;
        const isOffline = currentMode === 'Offline' || currentMode === 'Ready';

        if (!endsAt || !isOnline || isOffline) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- Timer synchronization requires setState in effect
            setTimeLeft(isOnline && !isOffline ? '00:00' : '--:--');

            setProgress(isOnline && !isOffline ? 100 : 0);
            return;
        }

        // Timer tick function - setState is intentional for real-time countdown

        const tick = () => {
            const now = Date.now();
            const start = phaseStartedAt?.toMillis() || now;
            const end = endsAt.toMillis();
            const diff = end - now;
            const total = end - start;

            if (diff <= 0) {
                setTimeLeft('00:00');
                setProgress(100);
                return;
            }

            // Format time
            const m = Math.floor((diff / 1000) / 60);
            const s = Math.floor((diff / 1000) % 60);
            setTimeLeft(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);

            // Progress
            if (total > 0) {
                const elapsed = now - start;
                const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
                setProgress(pct);
            } else {
                setProgress(100);
            }
        };

        tick();
        const interval = setInterval(tick, 1000);

        return () => clearInterval(interval);
    }, [endsAt, phaseStartedAt, status?.streamOnline, currentMode]);

    const isBreak = currentMode === 'Break' || currentMode === 'Long Break';
    const isFocus = currentMode === 'Focus';
    const isCompleted = currentMode === 'Completed';
    const isOnline = status?.streamOnline;

    // Get appropriate icon
    const getIcon = () => {
        if (isCompleted) return <PartyPopper size={20} />;
        if (isBreak) return <Coffee size={20} />;
        if (isFocus) return <Zap size={20} />;
        return <Timer size={20} />;
    };

    // Get appropriate message
    const getMessage = () => {
        if (!isOnline) {
            return lang === 'kr' ? '다음 세션을 기다리는 중...' : 'Waiting for next session...';
        }
        if (isCompleted) {
            return lang === 'kr' ? '🎉 오늘 목표 달성! 수고하셨습니다!' : '🎉 Goal achieved! Great work!';
        }
        if (isBreak) {
            return lang === 'kr' ? '휴식 시간입니다. 스트레칭!' : 'Take a break. Stretch!';
        }
        return lang === 'kr' ? '집중 시간입니다. 화이팅!' : 'Focus time. Keep going!';
    };

    return (
        <div className="bg-[var(--study-surface)] rounded-xl border border-[var(--study-border)] p-6 shadow-xs flex flex-col justify-between relative overflow-hidden h-40 transition-colors duration-300">

            <div className="flex justify-between items-start z-10">
                <div>
                    <span className="text-xs font-bold text-[var(--study-muted)] uppercase tracking-wider block mb-1">
                        {lang === 'kr' ? '남은 시간' : 'TIME REMAINING'}
                    </span>
                    <div className="text-4xl font-mono font-bold text-[var(--study-text)] tracking-tight">
                        {isOnline ? (isCompleted ? '🎉' : timeLeft) : '--:--'}
                    </div>
                    {/* Session counter - moved from StatusWidget */}
                    {isOnline && (status?.totalSessions ?? 1) > 1 && (
                        <div className="text-xs font-medium text-[var(--study-text-muted)] mt-1">
                            {lang === 'kr' ? '세션' : 'Session'} {status?.currentSession ?? 1} / {status?.totalSessions ?? 1}
                        </div>
                    )}
                </div>

                {/* Icon Badge */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCompleted
                    ? 'bg-green-500/20 text-green-500'
                    : isBreak
                        ? 'bg-[var(--study-accent)]/20 text-[var(--study-accent)]'
                        : isFocus
                            ? 'bg-[var(--study-accent)] text-[var(--study-bg)]'
                            : 'bg-[var(--study-surface)] text-[var(--study-text-muted)]'
                    }`}>
                    {getIcon()}
                </div>
            </div>

            {/* Message / Footer */}
            <div className="z-10 mt-auto">
                <div className="text-sm font-medium text-[var(--study-text-muted)]">
                    {getMessage()}
                </div>
            </div>

            {/* Progress Bar */}
            {isOnline && !isCompleted && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--study-border)]">
                    <div
                        className={`h-full transition-all duration-1000 ease-linear ${isBreak ? 'bg-green-500' : 'bg-[var(--study-accent)]'}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
}
