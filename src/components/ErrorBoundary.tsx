import { Component, type ErrorInfo, type ReactNode } from "react";
import { logger } from "../utils/logger";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    isChunkError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        isChunkError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        // Detect chunk loading errors (failed to fetch dynamically imported module)
        // Check both message strings and error names to catch all variants
        const errorString = error?.toString() || '';
        const errorMessage = error?.message || '';

        const isChunkError =
            errorMessage.includes('Failed to fetch dynamically imported module') ||
            errorMessage.includes('Loading chunk') ||
            errorMessage.includes('ChunkLoadError') ||
            error.name === 'ChunkLoadError' ||
            // Fallback for some browsers where message is in the string representation
            errorString.includes('Failed to fetch dynamically imported module');

        return {
            hasError: true,
            error,
            isChunkError
        };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        logger.error(error, { context: errorInfo });

        // Auto-reload for chunk errors (likely deployment update)
        if (this.state.isChunkError) {
            logger.info('[ErrorBoundary] Chunk load error detected, reloading in 1.5s...');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }

    public render() {
        if (this.state.hasError) {
            // Special handling for chunk errors - show loading message while auto-reloading
            if (this.state.isChunkError) {
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 p-4">
                        <div className="max-w-md text-center">
                            {/* Spinner */}
                            <div className="mb-6 flex justify-center">
                                <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
                            </div>

                            <h1 className="text-2xl font-bold mb-3">Aktualizace dostupná</h1>
                            <p className="mb-2 text-gray-600 dark:text-gray-400">
                                Stahujeme novou verzi aplikace...
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                Automaticky se znovu načte o chvíli
                            </p>
                        </div>
                    </div>
                );
            }

            // Generic error fallback
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
                    <div className="max-w-md text-center">
                        <h1 className="text-2xl font-bold mb-2">Něco se pokazilo</h1>
                        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            Aplikace narazila na neočekávanou chybu.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Zkusit znovu
                        </button>
                        {/* Debug info */}
                        {import.meta.env.DEV && (
                            <pre className="mt-8 text-xs text-red-600 dark:text-red-400 bg-gray-100 dark:bg-gray-800 p-3 rounded max-w-lg overflow-auto text-left">
                                {this.state.error?.message}
                            </pre>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
