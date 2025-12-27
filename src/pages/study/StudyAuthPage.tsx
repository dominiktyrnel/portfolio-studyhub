import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { Mail, Lock, Loader2, LogIn, UserPlus, AtSign, Check, AlertCircle } from 'lucide-react';
import { getErrorMessage } from '../../utils/errorHelpers';
import { logger } from '../../utils/logger';
import { useStudyTranslations } from '../../study/i18n/useStudyTranslations';
import { useStudyLanguage } from '../../study/i18n/StudyLanguageContext';
import { validateHandle, normalizeHandle } from '../../utils/handleValidation';
import { TermsOfServiceModal } from '../../components/study/TermsOfServiceModal';
import type { UserProfile } from '../../types/study-db';

export function StudyAuthPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const t = useStudyTranslations();
    const { studyLang } = useStudyLanguage();

    // Read initial mode from location.state if provided
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- React Router location.state is not typed by default
    const initialMode = (location.state as any)?.mode === 'signup' ? 'signup' : 'login';

    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [handle, setHandle] = useState('');
    const [handleError, setHandleError] = useState('');
    const [tosAccepted, setTosAccepted] = useState(false);
    const [tosModalOpen, setTosModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Update mode when location.state changes (e.g., navigating from footer buttons)
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stateMode = (location.state as any)?.mode;
        if (stateMode === 'signup' || stateMode === 'login') {
            setMode(stateMode);
        }
    }, [location.state]);

    // Redirect destination after successful login
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- React Router location.state is not typed by default
    const from = (location.state as any)?.from?.pathname || '/study/faq';

    // Validate handle on change
    const handleHandleChange = (value: string) => {
        const normalized = normalizeHandle(value);
        setHandle(normalized);

        if (normalized.length === 0) {
            setHandleError('');
            return;
        }

        const validation = validateHandle(normalized);
        if (!validation.valid && validation.errorKey) {
            // Use translation for error message
            const errorKey = validation.errorKey as keyof typeof t.auth;
            setHandleError(t.auth[errorKey] as string || validation.error || '');
        } else {
            setHandleError('');
        }
    };

    // Check if handle is available
    const checkHandleAvailability = async (handleToCheck: string): Promise<boolean> => {
        if (!db) return false;

        try {
            const handleDoc = await getDoc(doc(db, 'study_handles', handleToCheck));
            return !handleDoc.exists();
        } catch {
            return false;
        }
    };

    // Create user profile in Firestore
    const createUserProfile = async (uid: string, userEmail: string, userHandle: string) => {
        if (!db) throw new Error('Firestore not initialized');

        const now = serverTimestamp();

        const profile: Omit<UserProfile, 'tosAcceptedAt' | 'createdAt' | 'updatedAt'> & {
            tosAcceptedAt: ReturnType<typeof serverTimestamp>;
            createdAt: ReturnType<typeof serverTimestamp>;
            updatedAt: ReturnType<typeof serverTimestamp>;
        } = {
            schemaVersion: 1,
            uid,
            handle: userHandle,
            email: userEmail,
            emailVerified: false,
            preferredLang: studyLang,
            status: 'offline',
            stats: {
                totalHours: 0,
                currentStreak: 0,
                weeklyAverage: 0
            },
            badges: [],
            faqStats: {
                totalAsked: 0,
                todayAsked: 0
            },
            tosAcceptedAt: now,
            createdAt: now,
            updatedAt: now
        };

        // Create profile and reserve handle in parallel
        await Promise.all([
            setDoc(doc(db, 'study_users', uid), profile),
            setDoc(doc(db, 'study_handles', userHandle), { uid, createdAt: now })
        ]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!auth) throw new Error("Firebase Auth not initialized");

            if (mode === 'login') {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                // Signup mode - validate handle and ToS
                const normalizedHandle = normalizeHandle(handle);

                // Validate handle
                const validation = validateHandle(normalizedHandle);
                if (!validation.valid) {
                    const errorKey = validation.errorKey as keyof typeof t.auth;
                    setError(t.auth[errorKey] as string || validation.error || 'Invalid handle');
                    setLoading(false);
                    return;
                }

                // Check ToS
                if (!tosAccepted) {
                    setError(t.auth.tosRequired);
                    setLoading(false);
                    return;
                }

                // Check handle availability
                const isAvailable = await checkHandleAvailability(normalizedHandle);
                if (!isAvailable) {
                    setError(t.auth.handleTaken);
                    setLoading(false);
                    return;
                }

                // Create user account
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                // Create user profile
                await createUserProfile(userCredential.user.uid, email, normalizedHandle);
            }

            // Redirect after successful auth
            navigate(from, { replace: true });
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error(`[StudyAuth] Auth error: ${getErrorMessage(error)}`));
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');

        try {
            if (!auth || !db) throw new Error("Firebase not initialized");

            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // Check if user already has a profile
            const profileDoc = await getDoc(doc(db, 'study_users', result.user.uid));

            if (!profileDoc.exists()) {
                // New user - need to create profile with handle
                // Generate a default handle from email or displayName
                const baseHandle = result.user.email?.split('@')[0] ||
                    result.user.displayName?.toLowerCase().replace(/\s+/g, '_') ||
                    `user_${Date.now()}`;
                const normalizedHandle = normalizeHandle(baseHandle.slice(0, 15));

                // Check if handle is available, if not add random suffix
                let finalHandle = normalizedHandle;
                const handleDoc = await getDoc(doc(db, 'study_handles', normalizedHandle));
                if (handleDoc.exists()) {
                    finalHandle = `${normalizedHandle.slice(0, 12)}_${Math.floor(Math.random() * 1000)}`;
                }

                // Create profile
                await createUserProfile(result.user.uid, result.user.email || '', finalHandle);
                logger.info(new Error(`[StudyAuth] Created profile for Google user: ${finalHandle}`));
            }

            // Redirect after successful auth
            navigate(from, { replace: true });
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error(`[StudyAuth] Google auth error: ${getErrorMessage(error)}`));
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TermsOfServiceModal
                isOpen={tosModalOpen}
                onClose={() => setTosModalOpen(false)}
            />

            <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 md:px-8 flex items-center justify-center">
                <div className="max-w-md w-full">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--study-accent)]/10 flex items-center justify-center">
                            <LogIn size={32} className="text-[var(--study-accent)]" />
                        </div>
                        <h1 className="text-3xl font-bold text-[var(--study-text)] mb-2">
                            {mode === 'login' ? t.auth.loginTitle : t.auth.signupTitle}
                        </h1>
                        <p className="text-[var(--study-text-muted)]">
                            {mode === 'login' ? t.auth.loginSubtitle : t.auth.signupSubtitle}
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-[var(--study-surface)] rounded-2xl border border-[var(--study-border)] p-8 shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--study-text)] mb-2">
                                    <Mail size={16} className="inline mr-2" />
                                    {t.auth.email}
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="user@example.com"
                                    className="w-full px-4 py-3 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)] focus:ring-2 focus:ring-[var(--study-accent)] focus:border-[var(--study-accent)] outline-none transition-all"
                                />
                            </div>

                            {/* Handle - Only show on signup */}
                            {mode === 'signup' && (
                                <div>
                                    <label className="block text-sm font-medium text-[var(--study-text)] mb-2">
                                        <AtSign size={16} className="inline mr-2" />
                                        {t.auth.handle}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={handle}
                                            onChange={(e) => handleHandleChange(e.target.value)}
                                            required
                                            placeholder={t.auth.handlePlaceholder}
                                            className={`w-full px-4 py-3 rounded-lg border bg-[var(--study-bg)] text-[var(--study-text)] focus:ring-2 focus:ring-[var(--study-accent)] outline-none transition-all ${handleError
                                                ? 'border-red-500 focus:border-red-500'
                                                : handle.length >= 3 && !handleError
                                                    ? 'border-green-500 focus:border-green-500'
                                                    : 'border-[var(--study-border)] focus:border-[var(--study-accent)]'
                                                }`}
                                        />
                                        {handle.length >= 3 && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                {handleError ? (
                                                    <AlertCircle size={18} className="text-red-500" />
                                                ) : (
                                                    <Check size={18} className="text-green-500" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {handleError ? (
                                        <p className="mt-1 text-xs text-red-500">{handleError}</p>
                                    ) : (
                                        <p className="mt-1 text-xs text-[var(--study-text-muted)]">{t.auth.handleHint}</p>
                                    )}
                                </div>
                            )}

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--study-text)] mb-2">
                                    <Lock size={16} className="inline mr-2" />
                                    {t.auth.password}
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)] focus:ring-2 focus:ring-[var(--study-accent)] focus:border-[var(--study-accent)] outline-none transition-all"
                                />
                            </div>

                            {/* Terms of Service - Only show on signup */}
                            {mode === 'signup' && (
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="tos"
                                        checked={tosAccepted}
                                        onChange={(e) => setTosAccepted(e.target.checked)}
                                        className="mt-1 w-4 h-4 rounded border-[var(--study-border)] text-[var(--study-accent)] focus:ring-[var(--study-accent)]"
                                    />
                                    <label htmlFor="tos" className="text-sm text-[var(--study-text-muted)]">
                                        {t.auth.tosLabel}{' '}
                                        <button
                                            type="button"
                                            onClick={() => setTosModalOpen(true)}
                                            className="text-[var(--study-accent)] hover:underline"
                                        >
                                            ({t.auth.viewTos})
                                        </button>
                                    </label>
                                </div>
                            )}

                            {/* Error */}
                            {error && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || (mode === 'signup' && (!!handleError || handle.length < 3))}
                                className="w-full bg-[var(--study-accent)] text-[var(--study-bg)] font-bold py-3 rounded-lg hover:bg-[var(--study-accent-sub)] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        {mode === 'login' ? t.auth.loggingIn : t.auth.signingUp}
                                    </>
                                ) : (
                                    <>
                                        {mode === 'login' ? <LogIn size={20} /> : <UserPlus size={20} />}
                                        {mode === 'login' ? t.auth.loginButton : t.auth.signupButton}
                                    </>
                                )}
                            </button>

                            {/* OR Divider - Only for login */}
                            {mode === 'login' && (
                                <>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-[var(--study-border)]"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-[var(--study-surface)] text-[var(--study-text-muted)]">
                                                {t.auth.orDivider}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Google Sign-In Button */}
                                    <button
                                        type="button"
                                        onClick={handleGoogleSignIn}
                                        disabled={loading}
                                        className="w-full bg-white text-gray-700 border-2 border-gray-300 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <Loader2 className="animate-spin" size={20} />
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                </svg>
                                                {t.auth.googleSignIn}
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </form>

                        {/* Toggle Mode */}
                        <div className="mt-6 pt-6 border-t border-[var(--study-border)] text-center">
                            <p className="text-sm text-[var(--study-text-muted)]">
                                {mode === 'login' ? t.auth.noAccount : t.auth.hasAccount}
                                {' '}
                                <button
                                    onClick={() => {
                                        setMode(mode === 'login' ? 'signup' : 'login');
                                        setError('');
                                        setHandleError('');
                                    }}
                                    className="text-[var(--study-accent)] font-medium hover:underline"
                                >
                                    {mode === 'login' ? t.auth.createAccount : t.auth.loginLink}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
