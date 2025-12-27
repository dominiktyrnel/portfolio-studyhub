import React, { useRef } from "react";

interface HiddenLinkProps {
    children: React.ReactNode;
    onTrigger: () => void;
}

export function HiddenLink({ children, onTrigger }: HiddenLinkProps) {
    // Use useRef for timer to avoid immutability warnings
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const PRESS_TIME = 1000; // 1s (Long press for mobile)

    const start = () => {
        timerRef.current = setTimeout(() => {
            onTrigger();
        }, PRESS_TIME);
    };

    const clear = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    return (
        <span
            className="cursor-pointer select-none hover:text-gray-900 transition-colors"
            role="link"
            aria-label="Admin Access"
            tabIndex={0}
            onClick={(e) => {
                e.preventDefault(); // Click works immediately
                onTrigger();
            }}
            onTouchStart={start}
            onTouchEnd={clear}
            onTouchMove={clear}
            onMouseDown={() => { }}
        >
            {children}
        </span>
    );
}
