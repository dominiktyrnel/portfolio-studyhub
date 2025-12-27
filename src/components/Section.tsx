import type { ReactNode } from "react";

interface SectionProps {
    id: string;
    title?: string;
    className?: string;
    children: ReactNode;
}

export function Section({ id, title, className = "", children }: SectionProps) {
    return (
        <section id={id} className={`scroll-mt-24 ${className}`}>
            {title && (
                <div className="flex items-baseline gap-3 mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {title}
                    </h2>
                    <div className="h-1 w-12 bg-sky-500 rounded-full opacity-50"></div>
                </div>
            )}
            {children}
        </section>
    );
}
