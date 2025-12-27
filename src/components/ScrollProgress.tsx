import { useEffect, useState } from 'react';

interface ScrollProgressProps {
    className?: string;
}

export function ScrollProgress({ className = '' }: ScrollProgressProps) {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress(); // Initial calculation

        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    return (
        <div className={`fixed top-0 left-0 right-0 h-1 bg-slate-200 z-50 ${className}`}>
            <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    );
}
