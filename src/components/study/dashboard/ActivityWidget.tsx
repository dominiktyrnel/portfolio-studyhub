import { MessageSquare, Users } from 'lucide-react';
import type { BotStatus, StreamStats } from '../../../types/study-db';

interface ActivityWidgetProps {
    status: BotStatus | null;
    stats: StreamStats | null;
    lang: 'kr' | 'en';
}

export function ActivityWidget({ stats, lang }: ActivityWidgetProps) {

    // Bot writes 'activeUsersLast5minCount', legacy schema was 'activeAuthorsLast5minCount'
    // Support both field names for backwards compatibility
    const rawStats = stats as Record<string, unknown> | null;
    const msgCount = stats?.chatMessagesCount || 0;
    const activeUsers = (rawStats?.activeUsersLast5minCount ?? rawStats?.activeAuthorsLast5minCount ?? 0) as number;

    return (
        <div className="grid grid-cols-2 gap-4 h-full">
            {/* Messages Count */}
            <div className="bg-[var(--study-surface)] rounded-xl border border-[var(--study-border)] p-4 flex flex-col justify-center items-center shadow-xs">
                <div className="bg-[var(--study-accent)]/10 text-[var(--study-accent)] p-2 rounded-full mb-2">
                    <MessageSquare size={20} />
                </div>
                <div className="text-2xl font-bold text-[var(--study-text)]">
                    {msgCount}
                </div>
                <div className="text-[10px] uppercase font-bold text-[var(--study-muted)] text-center">
                    {lang === 'kr' ? '메시지' : 'Messages'}
                </div>
            </div>

            {/* Active Users */}
            <div className="bg-[var(--study-surface)] rounded-xl border border-[var(--study-border)] p-4 flex flex-col justify-center items-center shadow-xs">
                <div className="bg-[var(--study-accent)]/10 text-[var(--study-accent)] p-2 rounded-full mb-2">
                    <Users size={20} />
                </div>
                <div className="text-2xl font-bold text-[var(--study-text)]">
                    {activeUsers}
                </div>
                <div className="text-[10px] uppercase font-bold text-[var(--study-muted)] text-center">
                    {lang === 'kr' ? '참여중 (5분)' : 'Active (5m)'}
                </div>
            </div>
        </div>
    );
}
