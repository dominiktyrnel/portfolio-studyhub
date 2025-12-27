/**
 * OBS Pomodoro Sync Script
 * =========================
 * 
 * Reads pomodoro state from JSON file (written by OBS Lua script)
 * and syncs it to Firestore (runtime/obsPomodoro).
 * 
 * Usage:
 *   npx ts-node scripts/obs-sync.ts [path-to-json]
 * 
 * Default path: C:\Users\domin\Projekty\3_Tyrnel_site\docs\lua_scripts_bot\obs_pomodoro.json
 */

import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(path.join(__dirname, '..', 'service-account.json'))
});

const db = admin.firestore();

interface ObsState {
    state: 'running' | 'paused' | 'stopped';
    phase: 'focus' | 'shortBreak' | 'longBreak' | 'ready' | 'completed';
    currentSession: number;
    totalSessions: number;
    remainingSeconds: number;
    totalSeconds: number;
    updatedAtEpochMs: number;
}

// Get JSON file path from args or use default
const defaultPath = path.join(__dirname, '..', '..', 'docs', 'lua_scripts_bot', 'obs_pomodoro.json');
const jsonFilePath = process.argv[2] || defaultPath;

console.log('=== OBS Pomodoro Sync ===');
console.log(`Watching: ${jsonFilePath}`);
console.log('Press Ctrl+C to stop\n');

let lastUpdatedAt = 0;
let lastState: ObsState | null = null;

async function syncToFirestore(state: ObsState) {
    try {
        await db.doc('runtime/obsPomodoro').set({
            state: state.state,
            phase: state.phase,
            currentSession: state.currentSession,
            totalSessions: state.totalSessions,
            remainingSeconds: state.remainingSeconds,
            totalSeconds: state.totalSeconds,
            updatedAtEpochMs: state.updatedAtEpochMs
        });

        const sessionInfo = `Session ${state.currentSession}/${state.totalSessions}`;
        console.log(`[${new Date().toLocaleTimeString()}] Synced: ${state.phase} ${state.state} (${state.remainingSeconds}s) - ${sessionInfo}`);
    } catch (error) {
        console.error('Sync error:', error);
    }
}

function checkAndSync() {
    try {
        if (!fs.existsSync(jsonFilePath)) {
            return; // File not created yet
        }

        const content = fs.readFileSync(jsonFilePath, 'utf-8');
        let state: ObsState;

        try {
            state = JSON.parse(content);
        } catch {
            return; // Invalid JSON, skip
        }

        // Only sync if state changed
        if (state.updatedAtEpochMs === lastUpdatedAt) {
            return;
        }

        // Check for meaningful changes (not just time tick)
        const stateChanged = !lastState ||
            lastState.state !== state.state ||
            lastState.phase !== state.phase ||
            lastState.currentSession !== state.currentSession;

        // Sync every 5 seconds OR on state change
        const timeSinceLastSync = state.updatedAtEpochMs - lastUpdatedAt;

        if (stateChanged || timeSinceLastSync >= 5000) {
            lastUpdatedAt = state.updatedAtEpochMs;
            lastState = state;
            syncToFirestore(state);
        }
    } catch {
        // Ignore file read errors (file might be locked during write)
    }
}

// Check every second
setInterval(checkAndSync, 1000);

// Initial check
checkAndSync();

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nShutting down...');

    // Set offline state on exit
    try {
        await db.doc('runtime/obsPomodoro').set({
            state: 'stopped',
            phase: 'ready',
            currentSession: 1,
            totalSessions: 1,
            remainingSeconds: 0,
            totalSeconds: 0,
            updatedAtEpochMs: Date.now()
        });
        console.log('Set ready state');
    } catch (error) {
        console.error('Failed to set ready state:', error);
    }

    process.exit(0);
});
