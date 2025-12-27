import { useEffect } from 'react';
import { logger } from '../utils/logger';

interface GlobalErrorFallbackProps {
    error: Error;
    resetError: () => void;
    eventId?: string;
}

export function GlobalErrorFallback({ error, resetError }: GlobalErrorFallbackProps) {
    // Detect chunk loading errors
    const errorString = error?.toString() || '';
    const errorMessage = error?.message || '';

    const isChunkError =
        errorMessage.includes('Failed to fetch dynamically imported module') ||
        errorMessage.includes('Loading chunk') ||
        errorMessage.includes('ChunkLoadError') ||
        error.name === 'ChunkLoadError' ||
        errorString.includes('Failed to fetch dynamically imported module');

    // Auto-reload effect for chunk errors
    useEffect(() => {
        if (isChunkError) {
            logger.info('[GlobalErrorFallback] Chunk load error detected, reloading in 1.5s...');
            const timer = setTimeout(() => {
                window.location.reload();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isChunkError]);

    // UI for Chunk Error (Auto-reloading)
    if (isChunkError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center border-t-4 border-blue-500">
                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Aktualizace dostupná</h1>
                    <p className="text-slate-600 mb-2">
                        Byla nalezena nová verze aplikace.
                    </p>
                    <p className="text-sm text-slate-500">
                        Stránka se automaticky obnoví...
                    </p>
                </div>
            </div>
        );
    }

    // Standard Error UI (The one user sees now, but refactored)
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Něco se pokazilo</h1>
                <p className="text-slate-600 mb-6">Omlouváme se za nepříjemnosti. Chyba byla automaticky nahlášena.</p>

                <details className="text-left mb-6 bg-slate-100 p-4 rounded text-sm">
                    <summary className="cursor-pointer font-medium text-slate-700 mb-2">Technické detaily</summary>
                    <pre className="text-red-600 whitespace-pre-wrap break-words text-xs">
                        {errorString}
                    </pre>
                </details>

                <button
                    onClick={() => {
                        // Force hard reload
                        resetError();
                        window.location.reload();
                    }}
                    className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
                >
                    Zkusit znovu
                </button>
            </div>
        </div>
    );
}
