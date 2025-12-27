import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Check if already installed (standalone mode) - outside of hook for initial value
const checkIsStandalone = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(display-mode: standalone)').matches
        || (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
};

/**
 * Hook for handling PWA installation prompt
 * Returns install function and whether installation is available
 */
export function usePWAInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstallable, setIsInstallable] = useState(false);
    // Initialize with standalone check to avoid setState in useEffect
    const [isInstalled, setIsInstalled] = useState(checkIsStandalone);

    useEffect(() => {
        // Skip event listeners if already installed
        if (isInstalled) return;

        // Listen for beforeinstallprompt event
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setIsInstallable(true);
        };

        // Listen for app installed event
        const handleAppInstalled = () => {
            setIsInstalled(true);
            setIsInstallable(false);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, [isInstalled]);

    const installApp = useCallback(async () => {
        // If already installed
        if (isInstalled) {
            alert('이미 설치되어 있습니다! / App is already installed!');
            return false;
        }

        // If we have the install prompt (Chrome/Edge)
        if (deferredPrompt) {
            try {
                await deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;

                if (outcome === 'accepted') {
                    setIsInstalled(true);
                    setIsInstallable(false);
                }

                setDeferredPrompt(null);
                return outcome === 'accepted';
            } catch {
                return false;
            }
        }

        // iOS Safari detection
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
            alert('📱 iOS에서 설치하려면:\n\n1. Safari 하단의 공유 버튼 (□↑) 탭\n2. "홈 화면에 추가" 선택\n\n──────────────\n\n📱 To install on iOS:\n\n1. Tap Share button (□↑) at bottom\n2. Select "Add to Home Screen"');
            return false;
        }

        // Android detection
        const isAndroid = /Android/.test(navigator.userAgent);
        if (isAndroid) {
            alert('📱 Android에서 설치하려면:\n\n1. 브라우저 메뉴 (⋮) 탭\n2. "앱 설치" 또는 "홈 화면에 추가" 선택\n\n──────────────\n\n📱 To install on Android:\n\n1. Tap browser menu (⋮)\n2. Select "Install app" or "Add to Home screen"');
            return false;
        }

        // Other browsers
        alert('📱 앱을 설치하려면:\n\n브라우저 메뉴에서 "앱 설치" 또는 "홈 화면에 추가"를 선택하세요.\n\n──────────────\n\n📱 To install the app:\n\nSelect "Install app" or "Add to Home screen" from browser menu.');
        return false;
    }, [isInstalled, deferredPrompt]);

    return {
        isInstallable,
        isInstalled,
        installApp
    };
}
