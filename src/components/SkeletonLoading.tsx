// Skeleton loading components for Portfolio and Dashboard

interface SkeletonCardProps {
    className?: string;
}

export function SkeletonCard({ className = '' }: SkeletonCardProps) {
    return (
        <div className={`bg-white rounded-xl overflow-hidden border border-slate-200 ${className}`}>
            {/* Image skeleton */}
            <div className="aspect-[16/10] bg-slate-200 skeleton" />

            {/* Content skeleton */}
            <div className="p-5 space-y-3">
                {/* Title */}
                <div className="h-6 bg-slate-200 rounded skeleton w-3/4" />

                {/* Summary */}
                <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded skeleton" />
                    <div className="h-4 bg-slate-200 rounded skeleton w-5/6" />
                </div>

                {/* Tags */}
                <div className="flex gap-2">
                    <div className="h-6 w-16 bg-slate-200 rounded-full skeleton" />
                    <div className="h-6 w-20 bg-slate-200 rounded-full skeleton" />
                    <div className="h-6 w-14 bg-slate-200 rounded-full skeleton" />
                </div>
            </div>
        </div>
    );
}

interface SkeletonDashboardProps {
    cards?: number;
}

export function SkeletonDashboard({ cards = 3 }: SkeletonDashboardProps) {
    return (
        <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-6">
            {Array.from({ length: cards }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}
