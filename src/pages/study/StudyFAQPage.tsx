import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Send, Loader2, MessageSquare, Search } from 'lucide-react';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useStudyTranslations } from '../../study/i18n/useStudyTranslations';
import { useAuth } from '../../lib/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { FAQSkeleton } from '../../components/study/LoadingSkeletons';
import { getErrorMessage } from '../../utils/errorHelpers';
import { logger } from '../../utils/logger';

import { useStudyLanguage } from '../../study/i18n/StudyLanguageContext';

export function StudyFAQPage() {
    const t = useStudyTranslations();
    const { studyLang } = useStudyLanguage(); // Get current language
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get current language context
    // We need to access the language from the context or prop passed via outlet
    // Since we are in StudyLayout outlet, we can use useOutletContext, but better to use the hook directly if available
    // or rely on a Prop passed if the context is available.
    // Let's assume we can get it from storage or check props.
    // Actually, StudyLayoutWrapper wraps StudyLanguageProvider, so we can use useStudyLanguage() hook if we import it.
    // But standard way here is to grab it from Outlet context as seen in layout, OR just use the hook.
    // Let's use the hook for cleaner code if possible, but we need to import it.
    // Checking imports... useStudyTranslations uses it internally probably?
    // Let's add the import.

    // We need to define the Type for FAQ Item from DB
    interface DBFAQItem {
        id: string;
        kr: { title: string; perex: string; body: string };
        en: { title: string; perex: string; body: string };
        category?: string; // question, live, web, bot, troubleshooting, other
        published?: boolean;
    }

    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const [rawItems, setRawItems] = useState<DBFAQItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [consentPublish, setConsentPublish] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [showInboxForm, setShowInboxForm] = useState(false);

    useEffect(() => {
        if (!db) return;

        const fetchFaqs = async () => {
            try {
                setLoading(true);
                // Only show published items in public view
                const q = query(collection(db!, 'faq_items'), orderBy('order'), limit(50));
                const snap = await getDocs(q);

                if (!snap.empty) {
                    const data = snap.docs
                        .map(d => ({ id: d.id, ...d.data() } as DBFAQItem))
                        // Client-side filter for published (better to index 'published' in firestore, but this works for small data)
                        .filter(item => item.published !== false);

                    setRawItems(data);
                } else {
                    setRawItems([]);
                }
            } catch (error: unknown) {
                logger.error(error instanceof Error ? error : new Error(`[StudyFAQ] Fetch error: ${getErrorMessage(error)}`));
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, []);

    if (loading) {
        return <FAQSkeleton />;
    }

    // Helper to get content in current language
    const getLocalizedContent = (item: DBFAQItem) => {
        const langData = studyLang === 'kr' ? item.kr : item.en;
        return {
            q: langData.title || (studyLang === 'kr' ? '질문' : 'Question'),
            perex: langData.perex || '',
            a: langData.body || langData.perex || (studyLang === 'kr' ? '내용이 없습니다.' : 'No content available.')
        };
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const contact = formData.get('contact') as string;
        const message = formData.get('message') as string;

        try {
            if (!db) throw new Error("Database not connected");

            // Use authenticated user ID or fallback to 'anonymous'
            await addDoc(collection(db, 'inbox_questions'), {
                userId: user?.uid || 'anonymous',
                question: message,
                contactName: name,
                contactInfo: contact,
                consentPublish: consentPublish,
                status: 'NEW',
                createdAt: serverTimestamp()
            });

            setSent(true);
            e.currentTarget.reset();
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error(`[StudyFAQ] Submit error: ${getErrorMessage(error)}`));
            alert('Failed to submit question: ' + getErrorMessage(error));
            setError(`Failed: ${getErrorMessage(error)}`);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 md:px-8 max-w-3xl mx-auto">
            {/* Header */}
            <h1 className="text-3xl font-bold text-[var(--study-text)] mb-6 font-heading text-center">
                {t.faq.title}
            </h1>

            {/* Quiet Inbox Dropdown - Collapsible */}
            <div className="mb-8">
                <button
                    onClick={() => setShowInboxForm(!showInboxForm)}
                    className="w-full flex items-center justify-between gap-3 bg-[var(--study-surface)] border border-[var(--study-border)] rounded-xl px-6 py-4 text-left hover:border-[var(--study-accent)] transition-colors group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[var(--study-accent)]/10 text-[var(--study-accent)] rounded-full flex items-center justify-center">
                            <MessageSquare size={20} />
                        </div>
                        <div>
                            <span className="font-bold text-[var(--study-text)]">{t.faq.quietInbox}</span>
                            <span className="text-sm text-[var(--study-text-muted)] block">{t.faq.quietInboxDesc}</span>
                        </div>
                    </div>
                    {showInboxForm ? (
                        <ChevronUp size={20} className="text-[var(--study-text-muted)] group-hover:text-[var(--study-accent)]" />
                    ) : (
                        <ChevronDown size={20} className="text-[var(--study-text-muted)] group-hover:text-[var(--study-accent)]" />
                    )}
                </button>

                {showInboxForm && (
                    <div className="mt-4 bg-[var(--study-surface)] rounded-xl border border-[var(--study-border)] p-6 animate-fade-in">
                        <p className="text-sm text-[var(--study-text-muted)] italic mb-6 bg-[var(--study-bg)] py-2 px-4 rounded-md text-center">
                            {t.faq.quietInboxNote}
                        </p>

                        {sent ? (
                            <div className="text-center py-6 text-[var(--study-accent)] bg-[var(--study-accent)]/10 rounded-xl">
                                <p className="font-bold text-lg mb-2">{t.faq.messageSent}</p>
                                <p className="text-sm opacity-80">{t.faq.messageSentDesc}</p>
                                <button
                                    onClick={() => setSent(false)}
                                    className="mt-4 text-sm underline hover:text-[var(--study-text)] transition-colors"
                                >
                                    {t.faq.sendAnother}
                                </button>
                            </div>
                        ) : !user ? (
                            <div className="text-center py-8">
                                <p className="text-[var(--study-text-muted)] mb-4">{t.faq.loginRequired}</p>
                                <button
                                    onClick={() => navigate('/study/auth', { state: { from: location } })}
                                    className="inline-flex items-center gap-2 bg-[var(--study-accent)] text-[var(--study-bg)] font-bold px-6 py-3 rounded-lg hover:bg-[var(--study-accent-sub)] transition-colors"
                                >
                                    {t.faq.loginButton}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--study-text)] mb-1">
                                            {t.faq.formName}
                                        </label>
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            placeholder={t.faq.formNamePlaceholder}
                                            className="w-full px-4 py-2 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)] placeholder:text-[var(--study-text-muted)] focus:ring-2 focus:ring-[var(--study-accent)] focus:border-[var(--study-accent)] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--study-text)] mb-1">
                                            {t.faq.formContact}
                                        </label>
                                        <input
                                            name="contact"
                                            type="text"
                                            required
                                            placeholder={t.faq.formContactPlaceholder}
                                            className="w-full px-4 py-2 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)] placeholder:text-[var(--study-text-muted)] focus:ring-2 focus:ring-[var(--study-accent)] focus:border-[var(--study-accent)] outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--study-text)] mb-1">
                                        {t.faq.formMessage}
                                        <span className="text-[var(--study-text-muted)] ml-2 text-xs font-normal">({t.faq.noPersonalInfo})</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        required
                                        placeholder={t.faq.formMessagePlaceholder}
                                        className="w-full px-4 py-2 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)] placeholder:text-[var(--study-text-muted)] focus:ring-2 focus:ring-[var(--study-accent)] focus:border-[var(--study-accent)] outline-none resize-none"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="consentPublish"
                                        checked={consentPublish}
                                        onChange={(e) => setConsentPublish(e.target.checked)}
                                        className="w-4 h-4 accent-[var(--study-accent)]"
                                    />
                                    <label htmlFor="consentPublish" className="text-sm text-[var(--study-text-muted)]">
                                        {t.faq.consentPublish}
                                    </label>
                                </div>
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="w-full bg-[var(--study-accent)] text-[var(--study-bg)] font-bold py-3 rounded-lg hover:bg-[var(--study-accent-sub)] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                                    {sending ? t.faq.buttonSending : t.faq.buttonSend}
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>

            {/* Search Input */}
            <div className="relative mb-6">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--study-text-muted)]"
                />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.faq.search}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-[var(--study-border)] bg-[var(--study-surface)] text-[var(--study-text)] placeholder:text-[var(--study-text-muted)] focus:ring-2 focus:ring-[var(--study-accent)] focus:border-[var(--study-accent)] outline-none transition-all"
                />
            </div>

            {/* Category Filter Bubbles */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {[
                    { key: 'all', label: t.faq.allCategories },
                    { key: 'question', label: t.faq.categoryQuestion },
                    { key: 'live', label: t.faq.categoryLive },
                    { key: 'web', label: t.faq.categoryWeb },
                    { key: 'bot', label: t.faq.categoryBot },
                    { key: 'troubleshooting', label: t.faq.categoryTroubleshooting },
                    { key: 'other', label: t.faq.categoryOther },
                ].map(cat => (
                    <button
                        key={cat.key}
                        onClick={() => setSelectedCategory(cat.key)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.key
                            ? 'bg-[var(--study-accent)] text-[var(--study-bg)]'
                            : 'bg-[var(--study-surface)] text-[var(--study-text-muted)] border border-[var(--study-border)] hover:border-[var(--study-accent)] hover:text-[var(--study-text)]'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* FAQ Section */}
            <div className="space-y-4 mb-16">
                {rawItems.length === 0 ? (
                    <div className="text-center text-[var(--study-text-muted)] py-8">
                        {t.faq.loadingFaqs}
                    </div>
                ) : (
                    rawItems
                        .filter((item) => {
                            // Category filter
                            if (selectedCategory !== 'all') {
                                const itemCategory = item.category || 'other';
                                if (itemCategory !== selectedCategory) return false;
                            }
                            // Search filter
                            if (!searchQuery.trim()) return true;
                            const { q, perex, a } = getLocalizedContent(item);
                            const query = searchQuery.toLowerCase();
                            return q.toLowerCase().includes(query) ||
                                perex.toLowerCase().includes(query) ||
                                a.toLowerCase().includes(query);
                        })
                        .map((item) => {
                            const { q, perex, a } = getLocalizedContent(item);
                            return <FAQItem key={item.id} q={q} perex={perex} a={a} />;
                        })
                )}
            </div>

            {/* Quiet Inbox Section */}
            <div className="bg-[var(--study-surface)] rounded-2xl shadow-xs border border-[var(--study-border)] p-8 md:p-10">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-[var(--study-accent)]/10 text-[var(--study-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--study-text)] mb-2">
                        {t.faq.quietInbox}
                    </h2>
                    <p className="text-[var(--study-text-muted)] max-w-md mx-auto">
                        {t.faq.quietInboxDesc}
                    </p>
                    <p className="text-sm text-[var(--study-text-muted)] italic mt-6 bg-[var(--study-bg)] py-2 px-4 rounded-md max-w-md mx-auto">
                        {t.faq.quietInboxNote}
                    </p>
                </div>

                {sent ? (
                    <div className="text-center py-8 text-[var(--study-accent)] bg-[var(--study-accent)]/10 rounded-xl animate-fade-in">
                        <p className="font-bold text-lg mb-2">{t.faq.messageSent}</p>
                        <p className="text-sm opacity-80">{t.faq.messageSentDesc}</p>
                        <button
                            onClick={() => setSent(false)}
                            className="mt-4 text-sm underline hover:text-[var(--study-text)] transition-colors"
                        >
                            {t.faq.sendAnother}
                        </button>
                    </div>
                ) : !user ? (
                    // Not authenticated - show login prompt
                    <div className="text-center py-12">
                        <p className="text-[var(--study-text-muted)] mb-4">
                            {t.faq.loginRequired}
                        </p>
                        <button
                            onClick={() => navigate('/study/auth', { state: { from: location } })}
                            className="inline-flex items-center gap-2 bg-[var(--study-accent)] text-[var(--study-bg)] font-bold px-6 py-3 rounded-lg hover:bg-[var(--study-accent-sub)] transition-colors"
                        >
                            {t.faq.loginButton}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--study-text)] mb-1">
                                    {t.faq.formName}
                                </label>
                                <input
                                    name="name"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)] focus:ring-2 focus:ring-[var(--study-accent)] focus:border-[var(--study-accent)] outline-none transition-all"
                                    placeholder={t.faq.formNamePlaceholder}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--study-text)] mb-1">
                                    {t.faq.formContact}
                                </label>
                                <input
                                    name="contact"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)] focus:ring-2 focus:ring-[var(--study-accent)] focus:border-[var(--study-accent)] outline-none transition-all"
                                    placeholder={t.faq.formContactPlaceholder}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--study-text)] mb-1">
                                {t.faq.formMessage}
                            </label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)] focus:ring-2 focus:ring-[var(--study-accent)] focus:border-[var(--study-accent)] outline-none transition-all"
                                placeholder={t.faq.formMessagePlaceholder}
                            />
                            {/* Personal info warning */}
                            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                                ⚠️ {t.faq.noPersonalInfo}
                            </p>
                        </div>

                        {/* Consent Checkbox (Vision requirement) */}
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="consent"
                                checked={consentPublish}
                                onChange={(e) => setConsentPublish(e.target.checked)}
                                className="mt-1 w-4 h-4 text-[var(--study-accent)] bg-[var(--study-bg)] border-[var(--study-border)] rounded focus:ring-[var(--study-accent)]"
                            />
                            <label htmlFor="consent" className="text-sm text-[var(--study-text-muted)]">
                                {t.faq.consentPublish}
                            </label>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full bg-[var(--study-accent)] text-[var(--study-bg)] font-bold py-3 rounded-lg hover:bg-[var(--study-accent-sub)] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                            {sending ? t.faq.buttonSending : t.faq.buttonSend}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

function FAQItem({ q, perex, a }: { q: string, perex: string, a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-[var(--study-border)] rounded-lg bg-[var(--study-surface)] overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full px-6 py-4 text-left hover:bg-[var(--study-bg)] transition-colors"
            >
                <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                        <span className="font-medium text-[var(--study-text)] block">{q}</span>
                        {perex && !open && (
                            <span className="text-xs text-[var(--study-text-muted)] mt-1 block line-clamp-1 opacity-70">
                                {perex}
                            </span>
                        )}
                    </div>
                    {open ? (
                        <ChevronUp size={20} className="text-[var(--study-text-muted)] shrink-0 mt-1" />
                    ) : (
                        <ChevronDown size={20} className="text-[var(--study-text-muted)] shrink-0 mt-1" />
                    )}
                </div>
            </button>
            {open && (
                <div className="px-6 pb-4 text-[var(--study-text-muted)] text-sm leading-relaxed border-t border-[var(--study-border)] pt-4 animate-fade-in">
                    {a}
                </div>
            )}
        </div>
    );
}
