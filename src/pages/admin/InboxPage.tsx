import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ChevronDown, ChevronUp, Archive, BookOpen, CheckCircle, CheckSquare, Download } from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';
import type { InboxQuestion, QuestionStatus, FAQItem } from '../../types/study-db';
import toast from 'react-hot-toast';
import { bulkArchive, exportToCSV } from '../../utils/inboxBulkOps';
import { getErrorMessage } from '../../utils/errorHelpers'; // Added for catch block fixes
import { logger } from '../../utils/logger';

type FilterStatus = 'ALL' | QuestionStatus;

const STATUS_LABELS: Record<QuestionStatus, { label: string; color: string }> = {
    NEW: { label: 'Nové', color: 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400' },
    IN_PROGRESS: { label: 'Zpracovává se', color: 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400' },
    ANSWERED: { label: 'Odpovězeno', color: 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400' },
    PUBLISHED: { label: 'Publikováno', color: 'bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400' },
    REJECTED: { label: 'Zamítnuto', color: 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400' },
    ARCHIVED: { label: 'Archivováno', color: 'bg-gray-100 dark:bg-gray-950/30 text-gray-600 dark:text-gray-400' }
};

export default function InboxPage() {
    const [questions, setQuestions] = useState<(InboxQuestion & { id: string })[]>([]);
    // Initialize loading based on db availability to avoid setState in effect
    const [loading, setLoading] = useState(!db);
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [answerText, setAnswerText] = useState<{ [key: string]: string }>({});
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        if (!db) {
            // Loading already initialized to true, no setState needed
            return;
        }

        const q = query(collection(db, 'inbox_questions'), orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (snap) => {
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as InboxQuestion & { id: string }));
            setQuestions(data);
            setLoading(false);
        }, (err) => {
            logger.error(err instanceof Error ? err : new Error(`Inbox error: ${getErrorMessage(err)}`));
            toast.error('Chyba při načítání schránky');
            setLoading(false);
        });

        return () => unsub();
    }, []);

    const filteredQuestions = questions.filter(q => {
        if (filterStatus === 'ALL') return true;
        return q.status === filterStatus;
    });

    const updateStatus = async (id: string, status: QuestionStatus) => {
        if (!db) return;

        try {
            await setDoc(doc(db, 'inbox_questions', id), {
                status,
                updatedAt: Timestamp.now()
            }, { merge: true });
            toast.success('Status aktualizován');
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Update status error'));
            toast.error('Chyba při aktualizaci: ' + getErrorMessage(error));
        }
    };

    const saveAnswer = async (id: string) => {
        if (!db || !answerText[id]?.trim()) {
            toast.error('Napište odpověď');
            return;
        }

        try {
            await setDoc(doc(db, 'inbox_questions', id), {
                adminAnswer: answerText[id],
                status: 'ANSWERED',
                updatedAt: Timestamp.now()
            }, { merge: true });
            toast.success('Odpověď uložena ✅');
            setAnswerText({ ...answerText, [id]: '' });
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Save answer error'));
            toast.error('Chyba při ukládání: ' + getErrorMessage(error));
        }
    };

    const publishToFAQ = async (question: InboxQuestion & { id: string }) => {
        if (!db || !question.adminAnswer) {
            toast.error('Nejdřív odpovězte na otázku');
            return;
        }

        if (!question.consentPublish) {
            const confirm = window.confirm(
                'Uživatel nesouhlasil s publikací. Chcete přesto publikovat? (Odstraňte osobní údaje)'
            );
            if (!confirm) return;
        }

        try {
            const faqId = `faq_from_inbox_${Date.now()} `;
            const now = Timestamp.now();

            const faqData: Omit<FAQItem, 'id'> = {
                schemaVersion: 1,
                published: false, // Pro review
                category: 'other',
                tags: ['inbox'],
                order: 999,
                kr: {
                    title: question.question,
                    perex: '',
                    body: question.adminAnswer
                },
                en: {
                    title: '(Translation needed)',
                    perex: '',
                    body: question.adminAnswer
                },
                createdAt: now,
                updatedAt: now
            };

            await setDoc(doc(db, 'faq_items', faqId), faqData);

            await setDoc(doc(db, 'inbox_questions', question.id), {
                status: 'PUBLISHED',
                linkedFaqId: faqId,
                updatedAt: now
            }, { merge: true });

            toast.success('FAQ vytvořeno jako koncept 📝');
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Publish to FAQ error'));
            toast.error('Chyba při vytváření FAQ: ' + getErrorMessage(error));
        }
    };

    const archiveQuestion = async (id: string) => {
        if (!db) return;

        try {
            await setDoc(doc(db, 'inbox_questions', id), {
                status: 'ARCHIVED',
                updatedAt: Timestamp.now()
            }, { merge: true });
            toast.success('Archivováno');
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Archive error'));
            toast.error('Chyba: ' + getErrorMessage(error));
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
        if (!answerText[id]) {
            const question = questions.find(q => q.id === id);
            if (question?.adminAnswer) {
                setAnswerText({ ...answerText, [id]: question.adminAnswer });
            }
        }
    };

    // P.8 Bulk Operations Handlers
    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const selectAll = () => {
        setSelectedIds(filteredQuestions.map(q => q.id));
    };

    const clearSelection = () => {
        setSelectedIds([]);
    };

    const handleBulkArchive = async () => {
        if (!db) return;
        await bulkArchive(db, selectedIds, questions);
        clearSelection();
    };

    const handleExportCSV = () => {
        exportToCSV(filteredQuestions);
    };

    if (loading) {
        return (
            <AdminLayout title="Schránka">
                <div className="p-12 text-center text-admin-sub">Načítání...</div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Schránka">
            <div className="p-6 space-y-4">
                {/* P.8 Bulk Actions Bar */}
                {selectedIds.length > 0 && (
                    <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <CheckSquare className="text-blue-600" size={18} />
                        <span className="text-sm text-blue-700 dark:text-blue-400">
                            Vybráno: {selectedIds.length}
                        </span>
                        <button
                            onClick={handleBulkArchive}
                            className="ml-auto px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 transition-colors"
                        >
                            Archivovat vybrané
                        </button>
                        <button
                            onClick={clearSelection}
                            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                        >
                            Zrušit výběr
                        </button>
                    </div>
                )}

                {/* Tool Buttons */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={selectAll}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
                    >
                        Vybrat vše
                    </button>
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm transition-colors"
                    >
                        <Download size={16} />
                        Export CSV
                    </button>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilterStatus('ALL')}
                        className={`px - 4 py - 2 rounded - lg transition - colors ${filterStatus === 'ALL'
                            ? 'bg-blue-600 text-white'
                            : 'bg-admin-bg border border-admin-border text-admin-sub hover:text-admin-text'
                            } `}
                    >
                        Vše ({questions.length})
                    </button>
                    {(['NEW', 'IN_PROGRESS', 'ANSWERED', 'PUBLISHED', 'ARCHIVED'] as QuestionStatus[]).map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px - 4 py - 2 rounded - lg transition - colors ${filterStatus === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-admin-bg border border-admin-border text-admin-sub hover:text-admin-text'
                                } `}
                        >
                            {STATUS_LABELS[status].label} ({questions.filter(q => q.status === status).length})
                        </button>
                    ))}
                </div>

                {/* Questions List */}
                {filteredQuestions.length === 0 ? (
                    <div className="text-center py-12 text-admin-sub">
                        Žádné otázky
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredQuestions.map((question) => {
                            const isExpanded = expandedId === question.id;

                            return (
                                <div
                                    key={question.id}
                                    className="bg-admin-surface border border-admin-border rounded-lg overflow-hidden"
                                >
                                    {/* Header */}
                                    <div
                                        onClick={() => toggleExpand(question.id)}
                                        className="p-4 cursor-pointer hover:bg-admin-wash/30 transition-colors"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            {/* P.8 Checkbox */}
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(question.id)}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    toggleSelect(question.id);
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-4 h-4 text-blue-600 rounded mt-1 cursor-pointer"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`px - 2 py - 0.5 rounded text - xs font - bold ${STATUS_LABELS[question.status].color} `}>
                                                        {STATUS_LABELS[question.status].label}
                                                    </span>
                                                    {question.consentPublish && (
                                                        <span className="text-xs text-green-600 dark:text-green-400">✓ Souhlas s publikací</span>
                                                    )}
                                                    <span className="text-xs text-admin-sub ml-auto">
                                                        {question.createdAt?.toDate().toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="font-medium text-admin-text truncate mb-1">
                                                    {question.question}
                                                </p>
                                                {question.contactName && (
                                                    <p className="text-sm text-admin-sub">
                                                        Od: {question.contactName}
                                                        {question.contactInfo && ` (${question.contactInfo})`}
                                                    </p>
                                                )}
                                            </div>
                                            {isExpanded ? <ChevronUp className="text-admin-sub" size={20} /> : <ChevronDown className="text-admin-sub" size={20} />}
                                        </div>
                                    </div>

                                    {/* Expanded Detail */}
                                    {isExpanded && (
                                        <div className="border-t border-admin-border p-4 space-y-4 bg-admin-bg">
                                            {/* Question Detail */}
                                            <div>
                                                <label className="block text-xs font-medium text-admin-sub mb-1">Otázka</label>
                                                <div className="p-3 bg-admin-surface border border-admin-border rounded-lg text-sm text-admin-text whitespace-pre-wrap">
                                                    {question.question}
                                                </div>
                                            </div>

                                            {/* Answer Textarea */}
                                            {question.status !== 'ARCHIVED' && (
                                                <div>
                                                    <label className="block text-xs font-medium text-admin-sub mb-1">Odpověď admina</label>
                                                    <textarea
                                                        value={answerText[question.id] || ''}
                                                        onChange={(e) => setAnswerText({ ...answerText, [question.id]: e.target.value })}
                                                        className="w-full px-3 py-2 bg-admin-surface border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        rows={4}
                                                        placeholder="Napište odpověď..."
                                                    />
                                                    {question.adminAnswer && !answerText[question.id] && (
                                                        <p className="text-xs text-admin-sub mt-1">💾 Uložená odpověď: {question.adminAnswer.substring(0, 100)}...</p>
                                                    )}
                                                </div>
                                            )}

                                            {question.linkedFaqId && (
                                                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 rounded-lg">
                                                    <p className="text-sm text-purple-900 dark:text-purple-100">
                                                        📚 Publikováno jako FAQ: <code className="font-mono text-xs">{question.linkedFaqId}</code>
                                                    </p>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex flex-wrap gap-2">
                                                {question.status === 'NEW' && (
                                                    <button
                                                        onClick={() => updateStatus(question.id, 'IN_PROGRESS')}
                                                        className="px-3 py-1.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                                                    >
                                                        Začít zpracovávat
                                                    </button>
                                                )}

                                                {answerText[question.id]?.trim() && question.status !== 'ARCHIVED' && (
                                                    <button
                                                        onClick={() => saveAnswer(question.id)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                                                    >
                                                        <CheckCircle size={16} />
                                                        Uložit odpověď
                                                    </button>
                                                )}

                                                {question.status === 'ANSWERED' && !question.linkedFaqId && (
                                                    <button
                                                        onClick={() => publishToFAQ(question)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                                                    >
                                                        <BookOpen size={16} />
                                                        Publikovat do FAQ
                                                    </button>
                                                )}

                                                {question.status !== 'ARCHIVED' && (
                                                    <button
                                                        onClick={() => archiveQuestion(question.id)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                                                    >
                                                        <Archive size={16} />
                                                        Archivovat
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
