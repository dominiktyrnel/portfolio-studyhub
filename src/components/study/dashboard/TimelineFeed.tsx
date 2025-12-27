import { Zap, Coffee, Play, Power, Calendar, SkipForward, PartyPopper, Pause, PlayCircle } from 'lucide-react';
import type { TimelineEvent as DBTimelineEvent } from '../../../types/study-db';

interface TimelineFeedProps {
    events: DBTimelineEvent[];
    lang: 'kr' | 'en';
}

export function TimelineFeed({ events, lang }: TimelineFeedProps) {

    const formatTime = (ts: unknown) => {
        if (!ts) return '';
        // Handle Firestore Timestamp
        if (typeof ts === 'object' && ts !== null && 'toDate' in ts && typeof (ts as { toDate: () => Date }).toDate === 'function') {
            const date = (ts as { toDate: () => Date }).toDate();
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        // Handle Timestamp with seconds
        if (typeof ts === 'object' && ts !== null && 'seconds' in ts) {
            const date = new Date((ts as { seconds: number }).seconds * 1000);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        // Handle _seconds (raw Firestore object)
        if (typeof ts === 'object' && ts !== null && '_seconds' in ts) {
            const date = new Date((ts as { _seconds: number })._seconds * 1000);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        return '';
    };

    // Motivational messages for each event type
    const getEventDetails = (event: DBTimelineEvent) => {
        const type = event.type?.toUpperCase() || 'UNKNOWN';

        switch (type) {
            case 'START':
                return {
                    icon: Play,
                    color: 'text-green-500 bg-green-50 dark:bg-green-500/10',
                    textKr: '🟢 시작 — 지금 시작했어요. 오늘의 흐름은 여기서 만들어져요.',
                    textEn: "🟢 Start — You've started. Today's momentum begins right here."
                };
            case 'STOP':
                return {
                    icon: Power,
                    color: 'text-red-500 bg-red-50 dark:bg-red-500/10',
                    textKr: '🔴 종료 — 오늘은 여기까지. 충분히 잘했어요.',
                    textEn: "🔴 End — That's enough for today. You did well."
                };
            case 'FOCUS':
            case 'NEW_SESSION':
                return {
                    icon: Zap,
                    color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
                    textKr: '⏳ 집중 — 지금은 딱 한 가지에만. 조용히, 끝까지.',
                    textEn: '⏳ Focus — One thing only. Quietly, all the way through.'
                };
            case 'SHORT_BREAK':
                return {
                    icon: Coffee,
                    color: 'text-green-500 bg-green-50 dark:bg-green-500/10',
                    textKr: '☕ 휴식 — 물 한 모금, 어깨 풀고 다시 가요.',
                    textEn: '☕ Break — Take a sip of water, loosen your shoulders, and go again.'
                };
            case 'LONG_BREAK':
                return {
                    icon: Coffee,
                    color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10',
                    textKr: '🧘‍♂️ 긴 휴식 — 숨 고르고 리셋해요. 다음 라운드 준비.',
                    textEn: '🧘‍♂️ Long break — Breathe, reset, get ready for the next round.'
                };
            case 'PAUSE':
                return {
                    icon: Pause,
                    color: 'text-gray-500 bg-gray-50 dark:bg-gray-500/10',
                    textKr: '⏸️ 일시정지 — 잠깐 멈춰도 괜찮아요. 다시 돌아오면 돼요.',
                    textEn: "⏸️ Pause — It's okay to pause. Just come back."
                };
            case 'RESUME':
                return {
                    icon: PlayCircle,
                    color: 'text-green-500 bg-green-50 dark:bg-green-500/10',
                    textKr: '▶️ 재개 — 다시 시작. 흐름만 잡으면 돼요.',
                    textEn: '▶️ Resume — Start again. Just catch the flow.'
                };
            case 'SKIP':
                return {
                    icon: SkipForward,
                    color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10',
                    textKr: '⏭️ 건너뛰기 — 다음으로 넘어갈게요.',
                    textEn: '⏭️ Skip — Moving to the next phase.'
                };
            case 'COMPLETED':
                return {
                    icon: PartyPopper,
                    color: 'text-green-500 bg-green-50 dark:bg-green-500/10',
                    textKr: "🎉 완료! — 완료! 오늘의 승리는 '꾸준함'이에요.",
                    textEn: "🎉 Done! — Done. Today's win is consistency."
                };
            // Legacy event types (for backward compatibility)
            case 'FOCUS_START':
                return {
                    icon: Zap,
                    color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
                    textKr: '⏳ 집중 — 지금은 딱 한 가지에만. 조용히, 끝까지.',
                    textEn: '⏳ Focus — One thing only. Quietly, all the way through.'
                };
            case 'BREAK_START':
                return {
                    icon: Coffee,
                    color: 'text-green-500 bg-green-50 dark:bg-green-500/10',
                    textKr: '☕ 휴식 — 물 한 모금, 어깨 풀고 다시 가요.',
                    textEn: '☕ Break — Take a sip of water, loosen your shoulders, and go again.'
                };
            case 'STREAM_ONLINE':
                return {
                    icon: Play,
                    color: 'text-red-500 bg-red-50 dark:bg-red-500/10',
                    textKr: '🟢 시작 — 지금 시작했어요. 오늘의 흐름은 여기서 만들어져요.',
                    textEn: "🟢 Start — You've started. Today's momentum begins right here."
                };
            case 'STREAM_OFFLINE':
                return {
                    icon: Power,
                    color: 'text-gray-500 bg-gray-50 dark:bg-gray-500/10',
                    textKr: '🔴 종료 — 오늘은 여기까지. 충분히 잘했어요.',
                    textEn: "🔴 End — That's enough for today. You did well."
                };
            case 'DAILY_SUMMARY':
                return {
                    icon: Calendar,
                    color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10',
                    textKr: '📊 일일 요약 — 오늘 하루도 수고했어요.',
                    textEn: '📊 Daily Summary — Great work today.'
                };
            default:
                return {
                    icon: Zap,
                    color: 'text-gray-500 bg-gray-50 dark:bg-gray-500/10',
                    textKr: type,
                    textEn: type
                };
        }
    };

    if (events.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-[var(--study-text-muted)] text-sm mb-2">
                    {lang === 'kr'
                        ? '세션이 시작되면 여기에 기록이 남아요.'
                        : 'When a session starts, events will appear here.'}
                </div>
                <div className="text-xs text-[var(--study-text-muted)] opacity-70">
                    {lang === 'kr'
                        ? '라이브가 시작되면 타임라인이 업데이트됩니다.'
                        : 'Timeline updates when the stream goes live.'}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {events.map((event) => {
                const { icon: Icon, color, textKr, textEn } = getEventDetails(event);
                return (
                    <div key={event.id} className="flex gap-4 items-start group">
                        {/* Time Column */}
                        <div className="min-w-[50px] text-right pt-1">
                            <span className="text-xs font-mono font-medium text-[var(--study-text-muted)]">
                                {formatTime(event.createdAt)}
                            </span>
                        </div>

                        {/* Icon & Content */}
                        <div className="flex-1 flex gap-3 items-start p-3 rounded-lg border border-transparent hover:border-[var(--study-border)] hover:bg-[var(--study-bg)] transition-colors">
                            <div className={`p-1.5 rounded-full ${color} shrink-0 mt-0.5`}>
                                <Icon size={14} />
                            </div>
                            <div>
                                <p className="text-sm text-[var(--study-text)] leading-relaxed">
                                    {lang === 'kr' ? textKr : textEn}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
