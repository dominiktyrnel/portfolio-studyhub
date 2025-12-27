import { Component, type ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import { logger } from '../../utils/logger';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error boundary pro Admin sekci
 * 
 * Záchytná síť pro neočekávané chyby v admin panelu.
 * - Zobrazuje user-friendly chybovou stránku (100% česky)
 * - Automaticky reportuje chyby do Sentry
 * - Umožňuje reset zpět na dashboard
 */
export class AdminErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        logger.error(error, { context: errorInfo });
        // Convert React.ErrorInfo to plain object for Sentry
        Sentry.captureException(error, {
            extra: {
                componentStack: errorInfo.componentStack
            },
            tags: { boundary: 'admin' }
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <svg
                                    className="h-6 w-6 text-red-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Chyba v Admin Panelu
                            </h1>

                            <p className="text-gray-600 mb-6">
                                Něco se pokazilo. Chyba byla automaticky nahlášena a bude opravena.
                            </p>

                            {import.meta.env.DEV && this.state.error && (
                                <div className="mb-6 p-4 bg-red-50 rounded-md text-left">
                                    <p className="text-sm font-mono text-red-800 break-all">
                                        {this.state.error.message}
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={() => window.location.href = '/admin'}
                                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Zpět na Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
