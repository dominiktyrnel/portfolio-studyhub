/**
 * seed-test-data.ts
 * 
 * Creates test data in Firestore to verify web integration without running the bot.
 * 
 * Usage: npx ts-node scripts/seed-test-data.ts
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import path from 'path';

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, '..', 'service-account.json');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const serviceAccount = require(serviceAccountPath);

initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id
});

const db = getFirestore();

async function seedTestData() {
    console.log('🌱 Seeding test data for web integration verification...\n');

    const now = Date.now();

    // 1. Create bot_status/current with timelineCompact
    const botStatus = {
        schemaVersion: 1,

        // Bot state
        online: true,
        actualState: 'running',

        // Stream state
        streamOnline: true,
        streamId: 'test-stream-123',
        liveChatId: 'test-chat-456',
        connectedAt: Timestamp.fromMillis(now - 3600000), // 1 hour ago

        // Mode - simulating Focus
        currentMode: 'Focus',
        phaseStartedAt: Timestamp.fromMillis(now - 300000), // 5 min ago
        durationSec: 1500, // 25 min
        endsAt: Timestamp.fromMillis(now + 1200000), // 20 min from now
        lastUpdatedAt: Timestamp.now(),

        // Legacy fields
        mode: 'FOCUS',
        modeStartedAt: Timestamp.fromMillis(now - 300000),
        modeEndsAt: Timestamp.fromMillis(now + 1200000),
        uptimeSeconds: 3600,
        updatedAt: Timestamp.now(),

        // Timeline compact - test data
        timelineCompact: [
            {
                t: Timestamp.fromMillis(now - 3600000),
                type: 'start',
                labelKR: '🔴 스트림 시작',
                labelEN: '🔴 Stream started',
                by: 'system'
            },
            {
                t: Timestamp.fromMillis(now - 3300000),
                type: 'focus',
                labelKR: '⏳ Focus 시작',
                labelEN: '⏳ Focus started',
                by: 'system'
            },
            {
                t: Timestamp.fromMillis(now - 1800000),
                type: 'short_break',
                labelKR: '☕ 휴식 시간',
                labelEN: '☕ Break time',
                by: 'system'
            },
            {
                t: Timestamp.fromMillis(now - 1500000),
                type: 'focus',
                labelKR: '⏳ Focus 시작',
                labelEN: '⏳ Focus started',
                by: 'system'
            },
            {
                t: Timestamp.fromMillis(now - 300000),
                type: 'focus',
                labelKR: '🔄 새 사이클 Focus',
                labelEN: '🔄 New cycle Focus',
                by: 'system'
            }
        ]
    };

    await db.doc('bot_status/current').set(botStatus);
    console.log('✅ bot_status/current created with timelineCompact (5 events)');

    // 2. Create bot_status/heartbeat
    await db.doc('bot_status/heartbeat').set({
        lastHeartbeat: Timestamp.now(),
        uptimeSeconds: 3600,
        version: '1.0.0',
        lastError: null
    });
    console.log('✅ bot_status/heartbeat created');

    // 3. Create stream_stats/current
    await db.doc('stream_stats/current').set({
        schemaVersion: 1,
        activeUsersLast5minCount: 12,
        chatMessagesCount: 47,
        lastMessageAt: Timestamp.now(),
        updatedAt: Timestamp.now()
    });
    console.log('✅ stream_stats/current created');

    // 4. Create config/bot with full schema
    const configExists = (await db.doc('config/bot').get()).exists;
    if (!configExists) {
        await db.doc('config/bot').set({
            desiredState: 'running',
            pomodoro: {
                focusSec: 1500,
                breakSec: 300,
                longBreakSec: 900
            },
            chatMessages: {
                startKR: '🔥 스터디 시작해요.',
                startEN: '🔥 Study starts now.',
                focusKR: '⏳ Focus 시작.',
                focusEN: '⏳ Focus started.',
                breakKR: '☕ 쉬는 시간!',
                breakEN: '☕ Break time.',
                longBreakKR: '🧘‍♂️ 롱브레이크!',
                longBreakEN: '🧘‍♂️ Long break.',
                pauseKR: '⏸️ 잠깐 멈출게요.',
                pauseEN: '⏸️ Paused.',
                resumeKR: '▶️ 다시 시작!',
                resumeEN: '▶️ Resumed.',
                stopKR: '✅ 오늘 스터디 끝!',
                stopEN: '✅ Study finished.'
            },
            features: {
                autoAnnouncements: true,
                writeEventsCollection: false
            },
            schemaVersion: 1,
            updatedAt: Timestamp.now()
        });
        console.log('✅ config/bot created');
    } else {
        console.log('ℹ️  config/bot already exists, skipping');
    }

    console.log('\n🎉 Test data seeded successfully!');
    console.log('\nYou can now:');
    console.log('1. Run the web app: npm run dev');
    console.log('2. Visit /study/now to see the dashboard');
    console.log('3. Check if timelineCompact is displayed correctly');

    process.exit(0);
}

seedTestData().catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
});
