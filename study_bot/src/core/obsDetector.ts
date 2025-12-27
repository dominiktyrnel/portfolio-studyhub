
export type ObsPhase = 'focus' | 'shortBreak' | 'longBreak' | 'ready' | 'completed';
export type ObsStateEnum = 'running' | 'paused' | 'stopped';

export interface ObsState {
    state: ObsStateEnum;
    phase: ObsPhase;
    currentSession: number;      // 1-based session number (replaces currentCycle)
    totalSessions: number;       // Total sessions (Y)
    remainingSeconds: number;
    totalSeconds: number;
    updatedAtEpochMs: number;

    // Legacy compatibility
    currentCycle?: number;
}

export interface DetectionResult {
    event:
    | 'START'
    | 'STOP'
    | 'PAUSE'
    | 'RESUME'
    | 'FOCUS'
    | 'SHORT_BREAK'
    | 'LONG_BREAK'
    | 'NEW_SESSION'      // New session started
    | 'SKIP'             // Phase skipped
    | 'COMPLETED'        // All sessions done
    | 'MANUAL_ADJUST';
    session?: number;        // Current session number for NEW_SESSION event
}

interface DetectOptions {
    startJustHappenedAt: number;
    config?: {
        startFocusSuppressSeconds?: number;
        enableManualAdjustMessage?: boolean;
    };
}

export function detectObsAnnouncement(
    prev: ObsState | null,
    next: ObsState,
    opts: DetectOptions
): DetectionResult | null {
    // Handle first state (no previous)
    if (!prev) {
        // If starting fresh with running state, emit START
        if (next.state === 'running' && next.phase === 'focus') {
            return { event: 'START', session: next.currentSession };
        }
        return null;
    }

    // 1. Completed detection
    if (next.phase === 'completed' && prev.phase !== 'completed') {
        return { event: 'COMPLETED' };
    }

    // 2. Status Transitions
    if (prev.state === 'stopped' && next.state === 'running') {
        return { event: 'START', session: next.currentSession };
    }
    if (prev.state === 'running' && next.state === 'paused') {
        return { event: 'PAUSE' };
    }
    if (prev.state === 'paused' && next.state === 'running') {
        return { event: 'RESUME' };
    }
    if ((prev.state === 'running' || prev.state === 'paused') && next.state === 'stopped') {
        return { event: 'STOP' };
    }

    // 3. Phase/Session Changes (Only while running)
    if (next.state === 'running') {
        // Session change detection
        const prevSession = prev.currentSession ?? prev.currentCycle ?? 1;
        const nextSession = next.currentSession ?? next.currentCycle ?? 1;

        if (nextSession !== prevSession && next.phase === 'focus') {
            return { event: 'NEW_SESSION', session: nextSession };
        }

        // Phase Change
        if (prev.phase !== next.phase) {
            // Note: Skip detection could be added here based on timeDiff
            // const timeDiff = Math.abs(next.remainingSeconds - (next.totalSeconds));

            if (next.phase === 'shortBreak') {
                return { event: 'SHORT_BREAK' };
            }
            if (next.phase === 'longBreak') {
                return { event: 'LONG_BREAK' };
            }
            if (next.phase === 'focus') {
                // Check Suppression (e.g. if START just happened)
                const now = Date.now();
                const suppressWindow = (opts.config?.startFocusSuppressSeconds || 10) * 1000;
                if (opts.startJustHappenedAt > 0 && (now - opts.startJustHappenedAt) < suppressWindow) {
                    return null;
                }
                return { event: 'FOCUS' };
            }
        }

        // 4. Manual Adjustment (Jump detection)
        if (opts.config?.enableManualAdjustMessage && prev.phase === next.phase) {
            const elapsedMs = next.updatedAtEpochMs - prev.updatedAtEpochMs;
            const elapsedSec = Math.floor(elapsedMs / 1000);
            const expectedRemaining = prev.remainingSeconds - elapsedSec;
            const deviation = Math.abs(next.remainingSeconds - expectedRemaining);

            if (deviation > 30) {
                return { event: 'MANUAL_ADJUST' };
            }
        }
    }

    return null;
}
