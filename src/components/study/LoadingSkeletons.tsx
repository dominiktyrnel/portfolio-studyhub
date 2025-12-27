// Reusable loading skeleton components for Study Hub

export function SkeletonBox({ className = '' }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-[var(--study-text-muted)]/10 rounded ${className}`} />
    );
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <SkeletonBox
                    key={i}
                    className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
                />
            ))}
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header Skeleton */}
                <div className="text-center mb-12">
                    <SkeletonBox className="h-12 w-64 mx-auto mb-4" />
                    <SkeletonBox className="h-6 w-96 mx-auto" />
                </div>

                {/* Timer Widget Skeleton */}
                <div className="bg-[var(--study-surface)] rounded-2xl p-8 border border-[var(--study-border)]">
                    <SkeletonBox className="h-24 w-48 mx-auto mb-4" />
                    <SkeletonBox className="h-8 w-32 mx-auto" />
                </div>

                {/* Status Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-[var(--study-surface)] rounded-xl p-6 border border-[var(--study-border)]">
                            <SkeletonBox className="h-6 w-24 mb-4" />
                            <SkeletonBox className="h-10 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function RecordsSkeleton() {
    return (
        <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <SkeletonBox className="h-10 w-48 mx-auto mb-4" />
                    <SkeletonBox className="h-4 w-96 mx-auto" />
                </div>

                {/* Heatmap Skeleton */}
                <div className="bg-[var(--study-surface)] rounded-2xl p-8 border border-[var(--study-border)]">
                    <SkeletonBox className="h-6 w-32 mb-6" />

                    {/* Calendar grid simulation */}
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 35 }).map((_, i) => (
                            <SkeletonBox key={i} className="h-12 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PlanSkeleton() {
    return (
        <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
                <SkeletonBox className="h-12 w-64 mx-auto mb-4" />
                <SkeletonBox className="h-4 w-96 mx-auto" />
            </div>

            {/* Timeline Skeleton */}
            <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="relative pl-20">
                        {/* Timeline dot */}
                        <div className="absolute left-6 top-2">
                            <SkeletonBox className="w-5 h-5 rounded-full" />
                        </div>

                        {/* Month card */}
                        <div className="bg-[var(--study-surface)] rounded-xl border border-[var(--study-border)] p-6">
                            <SkeletonBox className="h-8 w-48 mb-4" />
                            <SkeletonText lines={2} className="mb-4" />

                            {/* Items */}
                            <div className="space-y-2">
                                {[1, 2, 3].map((j) => (
                                    <SkeletonBox key={j} className="h-12 w-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function FAQSkeleton() {
    return (
        <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 md:px-8 max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <SkeletonBox className="h-10 w-48 mx-auto" />
            </div>

            {/* FAQ Items */}
            <div className="space-y-4 mb-16">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-[var(--study-border)] rounded-lg bg-[var(--study-surface)] p-6">
                        <SkeletonBox className="h-6 w-3/4 mb-2" />
                        <SkeletonText lines={2} />
                    </div>
                ))}
            </div>

            {/* Inbox Form Skeleton */}
            <div className="bg-[var(--study-surface)] rounded-2xl p-8 border border-[var(--study-border)]">
                <SkeletonBox className="h-8 w-32 mx-auto mb-8" />
                <div className="space-y-4">
                    <SkeletonBox className="h-10 w-full" />
                    <SkeletonBox className="h-10 w-full" />
                    <SkeletonBox className="h-24 w-full" />
                    <SkeletonBox className="h-12 w-full" />
                </div>
            </div>
        </div>
    );
}

export function RoomSkeleton() {
    return (
        <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 md:px-8 max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <SkeletonBox className="h-12 w-64 mx-auto mb-4" />
                <SkeletonBox className="h-4 w-96 mx-auto" />
            </div>

            {/* Room Info Card */}
            <div className="bg-[var(--study-surface)] rounded-2xl p-8 border border-[var(--study-border)] mb-8">
                <SkeletonBox className="h-6 w-32 mb-6" />
                <div className="space-y-4">
                    <SkeletonBox className="h-12 w-full" />
                    <SkeletonBox className="h-12 w-full" />
                    <SkeletonBox className="h-12 w-full" />
                </div>
            </div>

            {/* Rules Section */}
            <div className="bg-[var(--study-surface)] rounded-xl p-6 border border-[var(--study-border)]">
                <SkeletonBox className="h-6 w-24 mb-4" />
                <SkeletonText lines={4} />
            </div>
        </div>
    );
}
