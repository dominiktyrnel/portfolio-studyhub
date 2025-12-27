import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { StudyPlan } from '../types/study-db';
import { getErrorMessage } from '../utils/errorHelpers';
import { logger } from '../utils/logger';

export function useStudyPlan() {
    const [plan, setPlan] = useState<StudyPlan | null>(null);
    // Initialize loading and error based on db availability to avoid setState in effect
    const [loading, setLoading] = useState(!db);
    const [error, setError] = useState<string | null>(db ? null : "Database not connected");

    useEffect(() => {
        if (!db) {
            // Loading and error already initialized, no setState needed
            return;
        }

        const fetchPlan = async () => {
            try {
                // Study plan is stored as single document: study_plan/current
                const docRef = doc(db!, 'study_plan', 'current');
                // The original code used getDoc, but the import change suggests onSnapshot.
                // For a simple fetch, getDoc is appropriate. If the intention is real-time updates, onSnapshot would be used.
                // Given the instruction only changes the import and the catch block, and doesn't modify the `await getDoc(docRef);` line,
                // I will assume the user intends to keep the one-time fetch logic for now, but has updated the import for future use or consistency.
                // However, the instruction explicitly removes `getDoc` and adds `onSnapshot`.
                // This implies a change from one-time fetch to real-time listener.
                // Let's implement the real-time listener using onSnapshot.

                const unsubscribe = onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setPlan(docSnap.data() as StudyPlan);
                    } else {
                        setPlan(null);
                    }
                    setLoading(false);
                }, (error: unknown) => {
                    logger.error(error instanceof Error ? error : new Error(`[useStudyPlan] Error: ${getErrorMessage(error)}`));
                    setError(getErrorMessage(error));
                    setLoading(false);
                });

                // Return the unsubscribe function for cleanup
                return () => unsubscribe();

            } catch (error: unknown) {
                // This catch block would typically handle errors in setting up the listener,
                // but onSnapshot's error handler usually catches most issues.
                // Keeping it for robustness, though it might be less frequently hit.
                logger.error(error instanceof Error ? error : new Error(`[useStudyPlan] Error setting up listener: ${getErrorMessage(error)}`));
                setError(getErrorMessage(error));
                setLoading(false);
            }
        };

        fetchPlan();
    }, []);

    return { plan, loading, error };
}
