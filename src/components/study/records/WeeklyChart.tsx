
interface WeeklyChartProps {
    data: { date: string; minutes: number; dayLabel: string }[];
    loading?: boolean;
}

export function WeeklyChart({ data, loading }: WeeklyChartProps) {
    if (loading) return <div className="h-40 animate-pulse bg-[var(--study-surface)] rounded-xl" />;

    const maxVal = Math.max(...data.map(d => d.minutes), 60); // Min scale 1h

    return (
        <div className="flex flex-col h-full justify-end">
            <div className="flex items-end justify-between gap-2 h-40 pb-2">
                {data.map((day) => {
                    const heightPct = Math.max((day.minutes / maxVal) * 100, 4); // Min 4% height

                    return (
                        <div key={day.date} className="flex flex-col items-center w-full group">
                            {/* Tooltipish value */}
                            <div className="mb-1 text-[10px] font-bold text-[var(--study-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                                {Math.round(day.minutes / 60 * 10) / 10}h
                            </div>

                            {/* Bar */}
                            <div
                                className={`w-full max-w-[24px] rounded-t-sm transition-all duration-500 ease-out
                                    ${day.minutes > 0 ? 'bg-[var(--study-accent)]' : 'bg-[var(--study-border)]'}
                                    hover:brightness-110
                                `}
                                style={{ height: `${heightPct}%` }}
                            />

                            {/* Label */}
                            <div className="mt-2 text-xs font-bold text-[var(--study-text-muted)] uppercase">
                                {day.dayLabel}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
