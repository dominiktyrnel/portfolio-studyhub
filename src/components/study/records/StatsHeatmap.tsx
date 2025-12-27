
interface HeatmapItem {
    date: string;
    count: number; // minutes
}

interface StatsHeatmapProps {
    data: HeatmapItem[];
    loading?: boolean;
}

export function StatsHeatmap({ data, loading }: StatsHeatmapProps) {
    if (loading) return <div className="h-32 bg-[var(--study-surface)] animate-pulse rounded-lg"></div>;

    // Helper to get color based on minutes
    // Level 0: empty
    // Level 1: < 60 min
    // Level 2: 60-180 min
    // Level 3: 180-300 min
    // Level 4: 300+ min
    const getColorClass = (minutes: number) => {
        if (minutes === 0) return 'bg-[var(--study-bg)]';
        if (minutes < 60) return 'bg-[#ffe8cc]';  // Lightest orange
        if (minutes < 180) return 'bg-[#ffd8a8]'; // Light orange
        if (minutes < 300) return 'bg-[#ffa94d]'; // Medium orange
        return 'bg-[var(--study-accent)]';        // Deep orange/accent
    };

    // We need a map for quick lookup
    const statsMap = new Map(data.map(d => [d.date, d.count]));

    // Generate last 365 days
    const days = [];
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 364); // 52 weeks approx

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        const minutes = statsMap.get(dateStr) || 0;
        days.push({
            date: dateStr,
            minutes
        });
    }

    return (
        <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
            <div className="min-w-[800px]">
                <div className="grid grid-flow-col grid-rows-7 gap-1">
                    {days.map((day) => (
                        <div
                            key={day.date}
                            title={`${day.date}: ${(day.minutes / 60).toFixed(1)}h`}
                            className={`w-3 h-3 rounded-sm ${getColorClass(day.minutes)} transition-all hover:scale-125 hover:ring-2 hover:ring-gray-300 cursor-help`}
                        ></div>
                    ))}
                </div>
                <div className="flex justify-end items-center gap-2 mt-3 text-xs text-gray-400 font-medium">
                    <span>Less</span>
                    <div className={`w-3 h-3 rounded-sm ${getColorClass(0)}`}></div>
                    <div className={`w-3 h-3 rounded-sm ${getColorClass(30)}`}></div>
                    <div className={`w-3 h-3 rounded-sm ${getColorClass(120)}`}></div>
                    <div className={`w-3 h-3 rounded-sm ${getColorClass(240)}`}></div>
                    <div className={`w-3 h-3 rounded-sm ${getColorClass(360)}`}></div>
                    <span>More</span>
                </div>
            </div>
        </div>
    );
}

