import { MessageSquare, Clock, CheckCircle, XCircle, Archive, AlertCircle, Loader2 } from 'lucide-react';
import { useUserFAQ, getQuestionStatusColor, getQuestionStatusLabel } from '../../../hooks/useUserFAQ';
import { useStudyLanguage } from '../../../study/i18n/StudyLanguageContext';
import type { InboxQuestion } from '../../../types/study-db';

export function UserFAQHistory() {
    const { questions, todayCount, remainingToday, loading, error } = useUserFAQ();
    const { studyLang } = useStudyLanguage();

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin text-[var(--study-accent)]" size={24} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 text-red-500">
                <AlertCircle size={24} className="mx-auto mb-2" />
                <p>{error}</p>
            </div>
        );
    }

    const statusIcons: Record<InboxQuestion['status'], React.ElementType> = {
        NEW: Clock,
        IN_PROGRESS: Clock,
        ANSWERED: CheckCircle,
        PUBLISHED: CheckCircle,
        REJECTED: XCircle,
        ARCHIVED: Archive
    };

    return (
        <div className="space-y-4">
            {/* Rate limit info */}
            <div className="flex items-center justify-between text-sm text-[var(--study-text-muted)] mb-4">
                <span>
                    {studyLang === 'kr'
                        ? `오늘 ${todayCount}/5 질문`
                        : `Today: ${todayCount}/5 questions`
                    }
                </span>
                <span className={remainingToday === 0 ? 'text-red-500' : 'text-green-500'}>
                    {studyLang === 'kr'
                        ? `${remainingToday}개 남음`
                        : `${remainingToday} remaining`
                    }
                </span>
            </div>

            {questions.length === 0 ? (
                <div className="text-center py-8 text-[var(--study-text-muted)]">
                    <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                    <p>
                        {studyLang === 'kr'
                            ? '아직 질문이 없습니다'
                            : 'No questions yet'
                        }
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {questions.map((q) => {
                        const StatusIcon = statusIcons[q.status] || Clock;
                        return (
                            <div
                                key={(q as InboxQuestion & { id: string }).id}
                                className="p-4 rounded-xl border border-[var(--study-border)] bg-[var(--study-bg)]"
                            >
                                {/* Status badge */}
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${getQuestionStatusColor(q.status)}`}>
                                        <StatusIcon size={12} />
                                        {getQuestionStatusLabel(q.status, studyLang)}
                                    </span>
                                    <span className="text-xs text-[var(--study-text-muted)]">
                                        {q.createdAt?.toDate().toLocaleDateString(studyLang === 'kr' ? 'ko-KR' : 'en-US')}
                                    </span>
                                </div>

                                {/* Question */}
                                <p className="text-[var(--study-text)] text-sm line-clamp-2">
                                    {q.question}
                                </p>

                                {/* Admin answer (if answered) */}
                                {q.adminAnswer && q.status === 'ANSWERED' && (
                                    <div className="mt-3 pt-3 border-t border-[var(--study-border)]">
                                        <p className="text-xs text-[var(--study-text-muted)] mb-1">
                                            {studyLang === 'kr' ? '답변:' : 'Answer:'}
                                        </p>
                                        <p className="text-sm text-[var(--study-text)]">{q.adminAnswer}</p>
                                    </div>
                                )}

                                {/* Rejection note (if rejected) */}
                                {q.adminNote && q.status === 'REJECTED' && (
                                    <div className="mt-3 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                                        <p className="text-xs text-red-500 mb-1">
                                            {studyLang === 'kr' ? '거절 사유:' : 'Rejection reason:'}
                                        </p>
                                        <p className="text-sm text-[var(--study-text)]">{q.adminNote}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
