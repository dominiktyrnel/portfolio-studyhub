import { useState, useEffect, useRef } from 'react';
import { doc, getDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { BotStatus, StudyEvent, StreamStats, StudyMode } from '../types/study-db';
import { getErrorMessage } from '../utils/errorHelpers';
import { logger } from '../utils/logger';

// Helper: Map legacy mode (ALL_CAPS) to new mode (PascalCase)
function mapLegacyMode(legacyMode?: StudyMode): 'Focus' | 'Break' | 'Long Break' | 'Pause' | 'Ready' | 'Completed' | 'Offline' {
    switch (legacyMode) {
        case 'FOCUS': return 'Focus';
        case 'BREAK': return 'Break';
        case 'LONG_BREAK': return 'Long Break';
        case 'PAUSE': return 'Pause';
        case 'READY': return 'Ready';
        case 'COMPLETED': return 'Completed';
        default: return 'Offline';
    }
}

// Helper: Map new mode (PascalCase) to legacy mode (ALL_CAPS)
function mapNewModeToLegacy(newMode?: string): StudyMode {
    switch (newMode) {
        case 'Focus': return 'FOCUS';
        case 'Break': return 'BREAK';
        case 'Long Break': return 'LONG_BREAK';
        case 'Pause': return 'PAUSE';
        case 'Ready': return 'READY';
        case 'Completed': return 'COMPLETED';
        default: return 'OFFLINE';
    }
}

// Map OBS mode names to our mode names
function mapObsMode(obsMode?: string): 'Focus' | 'Break' | 'Long Break' | 'Pause' | 'Ready' | 'Completed' | 'Offline' {
    switch (obsMode) {
        case 'focus': return 'Focus';
        case 'shortBreak': return 'Break';
        case 'longBreak': return 'Long Break';
        case 'paused': return 'Pause';
        case 'completed': return 'Completed';
        case 'ready': return 'Ready';
        default: return 'Offline';
    }
}

/**
 * useStudyStatus - Real-time listener version
 * 
 * BENEFITS of real-time vs polling:
 * - Instant updates when bot_status changes (focus→break transitions)
 * - CHEAPER than polling! Only charged for actual changes, not repeated reads
 * - 1 read for initial load + 1 read per change vs 360 reads/hour (polling 10s)
 * 
 * Cost comparison (8h stream, ~50 changes):
 * - Polling 10s: 2,880 reads
 * - Real-time:   ~50-100 reads (96% savings!)
 */
export function useStudyStatus() {
    const [status, setStatus] = useState<BotStatus | null>(null);
    const [stats, setStats] = useState<StreamStats | null>(null);
    const [feed, setFeed] = useState<StudyEvent[]>([]);
    const [loading, setLoading] = useState(!db);
    const [error, setError] = useState<string | null>(db ? null : "Firebase not initialized");

    // Ref to store latest OBS data for merging with bot_status
    const rawBotDataRef = useRef<Record<string, unknown> | null>(null);
    // OBS data as STATE (not ref) - triggers rerender when OBS script updates timer
    const [obsData, setObsData] = useState<Record<string, unknown> | null>(null);

    useEffect(() => {
        if (!db) return;

        // Helper to process and merge bot_status with OBS data
        const processBotStatus = (rawData: Record<string, unknown>, currentObsData: Record<string, unknown> | null) => {
            const obsRunning = currentObsData?.running === true;
            const useObsData = obsRunning && currentObsData;

            const normalizedStatus: BotStatus = {
                ...rawData,
                online: rawData.online ?? rawData.actualState === 'running',
                actualState: rawData.actualState ?? 'stopped',
                currentMode: useObsData
                    ? mapObsMode(currentObsData.mode as string | undefined)
                    : (rawData.currentMode ?? mapLegacyMode(rawData.mode as StudyMode | undefined)),
                phaseStartedAt: useObsData
                    ? currentObsData.phaseStartedAt
                    : (rawData.phaseStartedAt ?? rawData.modeStartedAt ?? null),
                endsAt: useObsData
                    ? currentObsData.endsAt
                    : (rawData.endsAt ?? rawData.modeEndsAt ?? null),
                durationSec: useObsData
                    ? currentObsData.durationSec
                    : rawData.durationSec,
                lastUpdatedAt: rawData.lastUpdatedAt ?? rawData.updatedAt ?? null,
                currentSession: useObsData
                    ? currentObsData.currentSession
                    : (rawData.currentSession ?? 1),
                totalSessions: useObsData
                    ? currentObsData.totalSessions
                    : (rawData.totalSessions ?? 1),
                mode: rawData.mode ?? mapNewModeToLegacy(rawData.currentMode as string | undefined),
                modeStartedAt: rawData.modeStartedAt ?? rawData.phaseStartedAt ?? null,
                modeEndsAt: rawData.modeEndsAt ?? rawData.endsAt ?? null,
                timelineCompact: rawData.timelineCompact ?? [],
            } as BotStatus;

            setStatus(normalizedStatus);
            // Note: Timeline is now handled by separate listener for runtime/timeline document
        };

        // Default offline status
        const setOfflineStatus = () => {
            setStatus({
                schemaVersion: 1,
                online: false,
                actualState: 'stopped',
                streamOnline: false,
                streamId: null,
                connectedAt: null,
                currentMode: 'Offline',
                phaseStartedAt: null,
                endsAt: null,
                timelineCompact: [],
                mode: 'OFFLINE',
                modeStartedAt: null,
                modeEndsAt: null,
                uptimeSeconds: 0,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                lastPollAt: null as any,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                updatedAt: null as any
            } as BotStatus);
        };

        // 1. REAL-TIME LISTENER: bot_status/current
        const unsubscribeBotStatus = onSnapshot(
            doc(db!, 'bot_status', 'current'),
            (snapshot) => {
                if (snapshot.exists()) {
                    const rawData = snapshot.data();
                    rawBotDataRef.current = rawData;
                    processBotStatus(rawData, obsData);
                } else {
                    setOfflineStatus();
                }
                setLoading(false);
                setError(null);
            },
            (err) => {
                logger.error(new Error(`[useStudyStatus] bot_status listener error: ${getErrorMessage(err)}`));
                setError(getErrorMessage(err));
                setLoading(false);
            }
        );

        // 2. REAL-TIME LISTENER: runtime/obsPomodoro (for timer data from OBS script)
        const unsubscribeObs = onSnapshot(
            doc(db!, 'runtime', 'obsPomodoro'),
            (snapshot) => {
                const newObsData = snapshot.exists() ? snapshot.data() : null;
                setObsData(newObsData); // Trigger rerender!
                // Re-process bot status if we have raw data
                if (rawBotDataRef.current) {
                    processBotStatus(rawBotDataRef.current, newObsData);
                }
            },
            (err) => {
                logger.error(new Error(`[useStudyStatus] obsPomodoro listener error: ${getErrorMessage(err)}`));
            }
        );

        // 3. REAL-TIME LISTENER: runtime/timeline (for timeline events from OBS script)
        const unsubscribeTimeline = onSnapshot(
            doc(db!, 'runtime', 'timeline'),
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    const items = data.items as Array<{
                        type: string;
                        t: { seconds: number } | { _seconds: number };
                        labelKR: string;
                        labelEN: string;
                        by: string;
                    }> | undefined;

                    console.log('[Timeline] Items from runtime/timeline:', items?.length ?? 0);

                    if (items && items.length > 0) {
                        const timelineEvents = items
                            .slice(-10)
                            .reverse()
                            .map((item, idx) => {
                                const timeRaw = item.t as { seconds?: number; _seconds?: number };
                                const seconds = timeRaw?.seconds ?? timeRaw?._seconds ?? 0;
                                return {
                                    id: `timeline_${idx}`,
                                    type: item.type?.toUpperCase() || 'FOCUS_START',
                                    createdAt: Timestamp.fromMillis(seconds * 1000),
                                    dayKey: new Date(seconds * 1000).toISOString().split('T')[0],
                                    streamId: null,
                                    metadata: {
                                        labelKR: item.labelKR,
                                        labelEN: item.labelEN,
                                        by: item.by
                                    }
                                };
                            }) as StudyEvent[];
                        setFeed(timelineEvents);
                    }
                }
            },
            (err) => {
                logger.error(new Error(`[useStudyStatus] timeline listener error: ${getErrorMessage(err)}`));
            }
        );

        // 3. POLLING: stream_stats/current (bot writes every 30s, no need for real-time)
        const fetchStats = async () => {
            try {
                const statsDoc = await getDoc(doc(db!, 'stream_stats', 'current'));
                if (statsDoc.exists()) {
                    setStats(statsDoc.data() as StreamStats);
                } else {
                    setStats(null);
                }
            } catch (err) {
                logger.error(new Error(`[useStudyStatus] stats fetch error: ${getErrorMessage(err)}`));
            }
        };

        // Initial stats fetch
        fetchStats();
        // Poll stats every 30s (matches bot flush interval)
        const statsInterval = setInterval(fetchStats, 30000);

        // Cleanup
        return () => {
            unsubscribeBotStatus();
            unsubscribeObs();
            unsubscribeTimeline();
            clearInterval(statsInterval);
        };
        // Note: obsData intentionally excluded from deps - we pass it directly to processBotStatus
        // Adding it would cause listener re-registration on every OBS update which defeats the purpose
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { status, stats, feed, loading, error };
}
