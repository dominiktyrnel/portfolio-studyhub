import type { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
            {children}
        </div>
    );
}
