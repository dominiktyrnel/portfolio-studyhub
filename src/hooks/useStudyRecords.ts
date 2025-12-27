import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getErrorMessage } from '../utils/errorHelpers';
import type { DailyStat, StudySession } from '../types/study-db';
import { logger } from '../utils/logger';

export interface RecordsData {
    sessions: StudySession[];
    heatmap: Record<string, number>; // YYYY-MM-DD -> minutes
    weekly: { date: string; minutes: number; dayLabel: string }[];
    totals: {
        hours: number;
        cycles: number;
        days: number;
    };
    loading: boolean;
    error: string | null;
}

export function useStudyRecords() {
    const [data, setData] = useState<RecordsData>({
        sessions: [],
        heatmap: {},
        weekly: [],
        totals: { hours: 0, cycles: 0, days: 0 },
        loading: true,
        error: null
    });

    useEffect(() => {
        if (!db) return;

        // OPTIMIZED: Fetch once instead of real-time listener
        // Heatmap data changes max 1×/day, no need for real-time updates
        // BEFORE: 60 reads every change → AFTER: 60 reads once per session
        const fetchRecords = async () => {
            try {
                // Fetch daily stats for heatmap and totals
                const statsQuery = query(
                    collection(db!, 'daily_stats'),
                    orderBy('date', 'desc'),
                    limit(90)  // 3 months for heatmap coverage
                );

                const statsSnapshot = await getDocs(statsQuery);
                const dailyStats = statsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as DailyStat));

                // Fetch recent study sessions for "Recent Sessions" widget
                const sessionsQuery = query(
                    collection(db!, 'study_sessions'),
                    orderBy('startedAt', 'desc'),
                    limit(10)  // Show last 10 sessions (display top 5)
                );

                const sessionsSnapshot = await getDocs(sessionsQuery);
                const sessions = sessionsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as StudySession));

                // Build heatmap directly from daily_stats
                const heatmap: Record<string, number> = {};
                let totalMin = 0;
                let totalBlocks = 0;

                dailyStats.forEach(stat => {
                    const dayKey = stat.dayKey;
                    const mins = stat.totalMinutes || 0;

                    heatmap[dayKey] = mins;
                    totalMin += mins;
                    totalBlocks += (stat.blocks || 0);
                });

                // Weekly Stats (Last 7 days)
                const weekly = [];
                const daysMap = new Map<string, number>();

                // Initialize last 7 days with 0 (use local timezone)
                for (let i = 6; i >= 0; i--) {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    // Use local date format to match timezone correctly
                    const year = d.getFullYear();
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const day = String(d.getDate()).padStart(2, '0');
                    const dateKey = `${year}-${month}-${day}`;
                    daysMap.set(dateKey, 0);
                }

                // Fill with data from heatmap
                for (const [date, mins] of Object.entries(heatmap)) {
                    if (daysMap.has(date)) {
                        daysMap.set(date, mins);
                    }
                }

                // Convert to array
                for (const [date, mins] of daysMap.entries()) {
                    const d = new Date(date);
                    weekly.push({
                        date,
                        minutes: mins,
                        dayLabel: d.toLocaleDateString('en-US', { weekday: 'short' })
                    });
                }

                setData({
                    sessions, // Now populated with real sessions!
                    heatmap,
                    weekly,
                    totals: {
                        hours: Math.floor(totalMin / 60),
                        cycles: totalBlocks,
                        days: Object.keys(heatmap).length
                    },
                    loading: false,
                    error: null
                });
            } catch (error: unknown) {
                logger.error(error instanceof Error ? error : new Error(`[useStudyRecords] Fetch error: ${getErrorMessage(error)}`));
                setData(prev => ({ ...prev, loading: false, error: "Failed to load records" }));
            }
        };

        fetchRecords();
    }, []);

    return data;
}
