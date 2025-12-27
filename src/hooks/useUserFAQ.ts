import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../lib/auth';
import type { InboxQuestion } from '../types/study-db';
import { logger } from '../utils/logger';

const MAX_QUESTIONS_PER_DAY = 5;

interface UserFAQStats {
    questions: InboxQuestion[];
    todayCount: number;
    canAskMore: boolean;
    remainingToday: number;
    loading: boolean;
    error: string | null;
}

export function useUserFAQ(): UserFAQStats {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<InboxQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Handle no user/db case
    useEffect(() => {
        if (!user || !db) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional sync reset on unmount
            setQuestions([]);
             
            setLoading(false);
        }
    }, [user]);

    // Real-time listener for user's questions
    useEffect(() => {
        if (!user || !db) {
            return;
        }

        const q = query(
            collection(db, 'inbox_questions'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const docs = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as InboxQuestion & { id: string }));
                setQuestions(docs);
                setLoading(false);
                setError(null);
            },
            (err) => {
                logger.error(err instanceof Error ? err : new Error(`FAQ fetch error: ${String(err)}`));
                setError('Failed to load questions');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    // Calculate today's count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);

    const todayCount = questions.filter(q => {
        const createdAt = q.createdAt;
        if (!createdAt) return false;
        return createdAt.toMillis() >= todayTimestamp.toMillis();
    }).length;

    const canAskMore = todayCount < MAX_QUESTIONS_PER_DAY;
    const remainingToday = Math.max(0, MAX_QUESTIONS_PER_DAY - todayCount);

    return {
        questions,
        todayCount,
        canAskMore,
        remainingToday,
        loading,
        error
    };
}

/**
 * Get status color for FAQ question
 */
export function getQuestionStatusColor(status: InboxQuestion['status']): string {
    switch (status) {
        case 'NEW':
            return 'bg-blue-500/10 text-blue-500';
        case 'IN_PROGRESS':
            return 'bg-yellow-500/10 text-yellow-600';
        case 'ANSWERED':
            return 'bg-green-500/10 text-green-500';
        case 'PUBLISHED':
            return 'bg-emerald-500/10 text-emerald-500';
        case 'REJECTED':
            return 'bg-red-500/10 text-red-500';
        case 'ARCHIVED':
            return 'bg-gray-500/10 text-gray-500';
        default:
            return 'bg-gray-500/10 text-gray-500';
    }
}

/**
 * Get status label for FAQ question
 */
export function getQuestionStatusLabel(status: InboxQuestion['status'], lang: 'kr' | 'en'): string {
    const labels: Record<InboxQuestion['status'], { kr: string; en: string }> = {
        NEW: { kr: '대기 중', en: 'Pending' },
        IN_PROGRESS: { kr: '검토 중', en: 'In Review' },
        ANSWERED: { kr: '답변 완료', en: 'Answered' },
        PUBLISHED: { kr: '게시됨', en: 'Published' },
        REJECTED: { kr: '거절됨', en: 'Rejected' },
        ARCHIVED: { kr: '보관됨', en: 'Archived' }
    };
    return labels[status]?.[lang] || status;
}
