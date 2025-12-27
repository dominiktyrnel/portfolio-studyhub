import { useRef, type MouseEvent } from 'react';

interface RippleProps {
    children: React.ReactNode;
    className?: string;
}

export function Ripple({ children, className = '' }: RippleProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const createRipple = (event: MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!container) return;

        const ripple = document.createElement('span');
        const rect = container.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.className = 'ripple';

        container.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    };

    return (
        <div
            ref={containerRef}
            className={`ripple-container ${className}`}
            onClick={createRipple}
        >
            {children}
        </div>
    );
}
