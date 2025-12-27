import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

/**
 * OfflineBanner - Professional offline indicator
 * 
 * Shows a banner when user loses internet connection.
 * Auto-hides when connection is restored.
 * Uses browser's online/offline events.
 */
export function OfflineBanner() {
    // Initialize isOnline from navigator to avoid setState in effect
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [wasOffline, setWasOffline] = useState(false);

    useEffect(() => {
        // No initial setState needed - already initialized from navigator.onLine

        const handleOnline = () => {
            setIsOnline(true);
            // Show "back online" notification briefly
            setTimeout(() => setWasOffline(false), 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setWasOffline(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Don't show anything if online and never was offline
    if (isOnline && !wasOffline) {
        return null;
    }

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isOnline ? 'translate-y-0' : 'translate-y-0'
            }`}>
            {!isOnline ? (
                // Offline banner
                <div className="bg-red-600 text-white px-4 py-3 shadow-lg">
                    <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
                        <WifiOff size={20} />
                        <span className="font-medium">
                            오프라인 상태입니다. 일부 기능이 제한될 수 있습니다.
                        </span>
                    </div>
                </div>
            ) : wasOffline ? (
                // Back online banner (temporary)
                <div className="bg-green-600 text-white px-4 py-3 shadow-lg animate-fade-in">
                    <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
                        <Wifi size={20} />
                        <span className="font-medium">
                            연결이 복구되었습니다 ✓
                        </span>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
