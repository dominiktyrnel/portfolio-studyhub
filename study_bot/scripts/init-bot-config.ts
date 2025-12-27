/**
 * Initialize config/bot document with BOT_Definice.md schema
 * 
 * Run with: npx ts-node scripts/init-bot-config.ts
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

/**
 * Default config/bot document per BOT_Definice.md
 */
const defaultBotConfig = {
    desiredState: 'stopped' as const,

    pomodoro: {
        focusSec: 1500,      // 25 minutes
        breakSec: 300,       // 5 minutes
        longBreakSec: 900    // 15 minutes
    },

    chatMessages: {
        // START
        startKR: '🔥 스터디 시작해요. 오늘도 같이 해봐요. 집중 갑시다.',
        startEN: '🔥 Study starts now. Let\'s focus together.',

        // FOCUS
        focusKR: '⏳ Focus 시작. 알림 끄고 딱 25분만 가요.',
        focusEN: '⏳ Focus started. Just 25 minutes.',

        // BREAK
        breakKR: '☕ 쉬는 시간! 물 마시고 스트레칭 1분만.',
        breakEN: '☕ Break time. Water + stretch.',

        // LONG BREAK
        longBreakKR: '🧘‍♂️ 롱브레이크! 눈·어깨 풀고 다시 돌아와요.',
        longBreakEN: '🧘‍♂️ Long break. Reset and come back.',

        // PAUSE
        pauseKR: '⏸️ 잠깐 멈출게요. 곧 다시 시작해요.',
        pauseEN: '⏸️ Paused. Back soon.',

        // RESUME
        resumeKR: '▶️ 다시 시작! 지금부터 또 집중해요.',
        resumeEN: '▶️ Resumed. Focus again.',

        // STOP
        stopKR: '✅ 오늘 스터디 끝! 여기까지 온 것만으로도 충분히 잘했어요.',
        stopEN: '✅ Study finished. You did great today.'
    },

    moderation: {
        adminChannelIds: [],   // Add your YouTube channel IDs for admin commands
        modChannelIds: []      // Optional moderators
    },

    features: {
        autoAnnouncements: true,       // Send chat messages on mode change
        writeEventsCollection: false   // Don't write to events collection (save costs)
    },

    // Metadata
    schemaVersion: 1,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
};

async function initBotConfig() {
    console.log('Initializing config/bot document...');

    try {
        const docRef = db.doc('config/bot');
        const doc = await docRef.get();

        if (doc.exists) {
            console.log('config/bot already exists. Current data:');
            console.log(JSON.stringify(doc.data(), null, 2));

            console.log('\nDo you want to update with new schema? (Will merge, not overwrite)');
            console.log('Run with --force to update');

            if (process.argv.includes('--force')) {
                await docRef.set(defaultBotConfig, { merge: true });
                console.log('✅ config/bot updated with new schema');
            }
        } else {
            await docRef.set(defaultBotConfig);
            console.log('✅ config/bot created successfully');
        }

        console.log('\nFinal document:');
        const finalDoc = await docRef.get();
        console.log(JSON.stringify(finalDoc.data(), null, 2));

    } catch (error) {
        console.error('❌ Failed to initialize config/bot:', error);
        process.exit(1);
    }

    process.exit(0);
}

initBotConfig();
