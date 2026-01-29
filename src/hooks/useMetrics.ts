import { useEffect, useRef } from 'react';
import { doc, setDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { logger } from '../utils/logger';
import { getKoreanDateString } from '../utils/koreanTime';

const SESSION_KEY = 'tyrnel_visit_session';
const UNIQUE_KEY = 'tyrnel_visitor_unique';
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

export function useMetrics() {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        if (!db) return;

        const trackVisit = async () => {
            try {
                const now = Date.now();
                const todayStr = getKoreanDateString();
                const dailyRef = doc(db!, 'metrics', `daily_${todayStr}`);
                const totalRef = doc(db!, 'metrics', 'total');

                const lastVisit = localStorage.getItem(SESSION_KEY);
                const isUnique = !localStorage.getItem(UNIQUE_KEY);

                // Writes to perform
                const dailyUpdates: Partial<Record<string, unknown>> = { lastUpdated: serverTimestamp() };
                const totalUpdates: Partial<Record<string, unknown>> = { lastUpdated: serverTimestamp() };
                let shouldWrite = false;

                // 1. Session Logic (Regular Visits)
                if (!lastVisit || (now - parseInt(lastVisit) > SESSION_DURATION)) {
                    // New Session
                    dailyUpdates.visits = increment(1);
                    totalUpdates.visits = increment(1);
                    shouldWrite = true;
                    localStorage.setItem(SESSION_KEY, now.toString());
                } else {
                    // Just extend session
                    localStorage.setItem(SESSION_KEY, now.toString());
                }

                // 2. Unique Visitor Logic
                if (isUnique) {
                    dailyUpdates.uniques = increment(1);
                    totalUpdates.uniques = increment(1);
                    shouldWrite = true;
                    localStorage.setItem(UNIQUE_KEY, 'true');
                }

                // Execute Writes if needed
                if (shouldWrite) {
                    dailyUpdates.date = todayStr;
                    await setDoc(dailyRef, dailyUpdates, { merge: true });
                    await setDoc(totalRef, totalUpdates, { merge: true });
                }

            } catch (e) {
                logger.warn(e instanceof Error ? e : new Error(`[Metrics] Failed to record visit: ${String(e)}`));
            }
        };

        trackVisit();
    }, []);
}

export const trackDownload = async () => {
    if (!db) return;
    try {
        const totalRef = doc(db, 'metrics', 'total');
        await setDoc(totalRef, {
            downloads: increment(1),
            lastUpdated: serverTimestamp()
        }, { merge: true });
    } catch (e) {
        logger.warn(e instanceof Error ? e : new Error(`[Metrics] Failed to record download: ${String(e)}`));
    }
};
