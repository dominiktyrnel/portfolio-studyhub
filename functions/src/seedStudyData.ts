import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Data zůstávají stejná jako v seed scriptu
const faqData = [
    {
        id: 'faq-001',
        category: 'general',
        tags: ['스트림', 'stream', 'about'],
        kr: {
            title: '이 스트림은 어떤 분들을 위한 건가요?',
            perex: '조용히 공부하고 싶은 분들을 위한 공간이에요.',
            body: '이 스트림은 조용히 공부하고 싶은 분들을 위한 공간이에요. 꼭 말을 하거나 참여하지 않아도 괜찮아요. 혼자 공부하지만 누군가와 같은 시간과 리듬을 나누고 싶을 때 편하게 켜 둘 수 있는 스트림이에요. 집중이 잘 안 되거나 공부하면서 외로움을 느낄 때, 그냥 배경처럼 함께 있어도 괜찮은 공간을 만들고 싶어요. 각자 자기 자리에서 자기 속도로 공부해 주시면 돼요.'
        },
        en: {
            title: 'Who is this stream for?',
            perex: 'A space for those who want to study quietly.',
            body: 'This stream is a space for those who want to study quietly. You don\'t have to speak or actively participate. It\'s a stream you can comfortably keep on when you want to study alone but share the same time and rhythm with someone. When you\'re having trouble focusing or feeling lonely while studying, I want to create a space where you can just be together like background presence. Just study at your own place at your own pace.'
        }
    },
    {
        id: 'faq-002',
        category: 'participation',
        tags: ['참여', 'how-to', 'join'],
        kr: {
            title: '이 스트림은 어떻게 참여하면 되나요?',
            perex: '그냥 들어와서 각자 할 공부를 하시면 돼요.',
            body: '이 스트림은 같이 공부하는 공간이에요. 그냥 들어와서 각자 할 공부를 하시면 돼요. 말 안 해도 되고, 조용히 집중만 해도 괜찮아요. 함께 있다는 느낌이 중요해요.'
        },
        en: {
            title: 'How do I participate in this stream?',
            perex: 'Just come in and do your own studying.',
            body: 'This stream is a space to study together. Just come in and do whatever studying you need to do. You don\'t have to talk, it\'s okay to just quietly focus. The feeling of being together is what matters.'
        }
    },
    {
        id: 'faq-003',
        category: 'schedule',
        tags: ['포모도로', 'pomodoro', 'breaks', 'schedule'],
        kr: {
            title: '왜 이렇게 자주 쉬는 시간이 있나요?',
            perex: '집중력을 오래 유지하려면 휴식이 꼭 필요해요.',
            body: '집중력을 오래 유지하려면 휴식이 꼭 필요해요. 이 스트림은 포모도로 방식으로 운영돼서, 공부와 휴식을 반복하면서 더 효율적으로 공부할 수 있어요.'
        },
        en: {
            title: 'Why are there so many breaks?',
            perex: 'Rest is essential to maintain focus for a long time.',
            body: 'Rest is essential to maintain long-term focus. This stream operates in Pomodoro style, so you can study more efficiently by alternating between study and rest periods.'
        }
    }
];

const dailyStatsData = [
    { dayKey: '2024-12-13', totalMinutes: 250, blocks: 6, focusMinutes: 200 },
    { dayKey: '2024-12-14', totalMinutes: 280, blocks: 7, focusMinutes: 230 },
    { dayKey: '2024-12-15', totalMinutes: 195, blocks: 5, focusMinutes: 160 },
    { dayKey: '2024-12-16', totalMinutes: 310, blocks: 8, focusMinutes: 255 },
    { dayKey: '2024-12-17', totalMinutes: 265, blocks: 6, focusMinutes: 215 },
    { dayKey: '2024-12-18', totalMinutes: 240, blocks: 6, focusMinutes: 195 },
    { dayKey: '2024-12-19', totalMinutes: 290, blocks: 7, focusMinutes: 240 },
    { dayKey: '2024-12-20', totalMinutes: 220, blocks: 5, focusMinutes: 180 },
    { dayKey: '2024-12-21', totalMinutes: 275, blocks: 7, focusMinutes: 225 },
    { dayKey: '2024-12-22', totalMinutes: 305, blocks: 8, focusMinutes: 250 },
];

const studyPlanMonths = [
    {
        monthKey: '2025-01',
        titleKR: '기초 다지기 (한글 완벽 마스터)',
        titleEN: 'Building Foundation (Perfect Hangul Mastery)',
        goalKR: '한글 읽기/쓰기 완벽 숙달, 기본 발음 규칙 이해',
        goalEN: 'Perfect Hangul reading/writing, basic pronunciation rules',
        items: [
            { id: 'jan-1', textKR: '한글 자모 완벽 암기 (모음 14개, 자음 19개)', textEN: 'Memorize all Hangul letters (14 vowels, 19 consonants)', status: 'done', order: 1 },
            { id: 'jan-2', textKR: '받침 소리 규칙 익히기 (7종성)', textEN: 'Learn final consonant rules (7 sounds)', status: 'done', order: 2 },
            { id: 'jan-3', textKR: '연음, 경음화, 비음화 발음 규칙', textEN: 'Liaison, tensification, nasalization rules', status: 'done', order: 3 },
            { id: 'jan-4', textKR: '기본 인사말 50개 암기', textEN: 'Memorize 50 basic greetings', status: 'done', order: 4 },
            { id: 'jan-5', textKR: '숫자 읽기 (한자어/고유어 숫자)', textEN: 'Number reading (Sino-Korean/Native)', status: 'done', order: 5 }
        ]
    },
    {
        monthKey: '2025-02',
        titleKR: '초급 문법 & 필수 어휘 500',
        titleEN: 'Beginner Grammar & Essential 500 Vocabulary',
        goalKR: 'TOPIK I 수준 기본 문법, 일상 회화 어휘 500개',
        goalEN: 'TOPIK I basic grammar, 500 daily conversation words',
        items: [
            { id: 'feb-1', textKR: '조사 완벽 이해 (은/는, 이/가, 을/를)', textEN: 'Master particles (은/는, 이/가, 을/를)', status: 'doing', order: 1 },
            { id: 'feb-2', textKR: '동사/형용사 기본형과 해요체', textEN: 'Verb/adjective basic & 해요 form', status: 'doing', order: 2 },
            { id: 'feb-3', textKR: '필수 어휘 500개 암기 (Anki 활용)', textEN: 'Memorize 500 essential words (Anki)', status: 'todo', order: 3 },
            { id: 'feb-4', textKR: '시제 표현 (과거/현재/미래)', textEN: 'Tense expressions (past/present/future)', status: 'todo', order: 4 },
            { id: 'feb-5', textKR: '간단한 자기소개 작성 및 암기', textEN: 'Write & memorize simple self-introduction', status: 'todo', order: 5 }
        ]
    },
    {
        monthKey: '2025-03',
        titleKR: '일상 회화 패턴 100',
        titleEN: '100 Daily Conversation Patterns',
        goalKR: '자주 쓰는 문장 패턴 100개로 기본 대화 가능',
        goalEN: 'Basic conversation with 100 common patterns',
        items: [
            { id: 'mar-1', textKR: '-(으)ㄹ 수 있다/없다 (can/cannot)', textEN: '-(으)ㄹ 수 있다/없다 pattern', status: 'todo', order: 1 },
            { id: 'mar-2', textKR: '-고 싶다 (want to)', textEN: '-고 싶다 pattern', status: 'todo', order: 2 },
            { id: 'mar-3', textKR: '-아/어야 하다 (must)', textEN: '-아/어야 하다 pattern', status: 'todo', order: 3 },
            { id: 'mar-4', textKR: '간단한 대화 30개 암기 (식당/쇼핑/교통)', textEN: 'Memorize 30 dialogues (restaurant/shopping/transport)', status: 'todo', order: 4 },
            { id: 'mar-5', textKR: '한국어로 일기 쓰기 시작 (주 3회)', textEN: 'Start Korean diary (3x/week)', status: 'todo', order: 5 }
        ]
    },
    {
        monthKey: '2025-04',
        titleKR: '중급 문법 & 어휘 확장 (총 1500)',
        titleEN: 'Intermediate Grammar & Vocab Expansion (1500 total)',
        goalKR: '중급 문법 패턴 익히기, 누적 어휘 1500개',
        goalEN: 'Learn intermediate grammar, 1500 cumulative vocabulary',
        items: [
            { id: 'apr-1', textKR: '-(으)ㄴ/는/(으)ㄹ 관형사형 (modifiers)', textEN: 'Noun modifying forms', status: 'todo', order: 1 },
            { id: 'apr-2', textKR: '-기 때문에, -(으)니까 (because)', textEN: 'Causative expressions', status: 'todo', order: 2 },
            { id: 'apr-3', textKR: '-(으)면, -아/어도 (if, even if)', textEN: 'Conditional forms', status: 'todo', order: 3 },
            { id: 'apr-4', textKR: '어휘 1000개 추가 학습 (주제별)', textEN: 'Learn 1000 more words (by topic)', status: 'todo', order: 4 },
            { id: 'apr-5', textKR: 'TOPIK I 모의고사 1회 풀이', textEN: 'TOPIK I practice test (1st)', status: 'todo', order: 5 }
        ]
    },
    {
        monthKey: '2025-05',
        titleKR: '듣기 & 읽기 집중 훈련',
        titleEN: 'Listening & Reading Intensive Training',
        goalKR: '자연스러운 속도의 한국어 이해, 간단한 뉴스/글 읽기',
        goalEN: 'Understand natural speed Korean, read simple news/articles',
        items: [
            { id: 'may-1', textKR: '한국 드라마/예능 매일 30분 시청 (자막 활용)', textEN: 'Watch Korean shows 30min/day (with subs)', status: 'todo', order: 1 },
            { id: 'may-2', textKR: '뉴스 기사 읽기 (주 5개, 모르는 단어 정리)', textEN: 'Read news articles (5/week, note new words)', status: 'todo', order: 2 },
            { id: 'may-3', textKR: '받아쓰기 연습 (듣고 쓰기)', textEN: 'Dictation practice', status: 'todo', order: 3 },
            { id: 'may-4', textKR: '쉬운 한국 소설/웹툰 읽기 시작', textEN: 'Start reading simple Korean novels/webtoons', status: 'todo', order: 4 },
            { id: 'may-5', textKR: 'TOPIK I 모의고사 2회 (듣기/읽기 집중)', textEN: 'TOPIK I mock test #2 (focus listening/reading)', status: 'todo', order: 5 }
        ]
    },
    {
        monthKey: '2025-06',
        titleKR: '말하기 & 쓰기 연습',
        titleEN: 'Speaking & Writing Practice',
        goalKR: '간단한 주제로 1분 말하기, 짧은 에세이 작성',
        goalEN: '1-minute speaking on simple topics, short essay writing',
        items: [
            { id: 'jun-1', textKR: '쉐도잉 연습 (드라마/뉴스 따라 말하기)', textEN: 'Shadowing practice (repeat drama/news)', status: 'todo', order: 1 },
            { id: 'jun-2', textKR: '언어 교환 파트너 찾기 (주 2회 대화)', textEN: 'Find language exchange partner (2x/week)', status: 'todo', order: 2 },
            { id: 'jun-3', textKR: '한국어 일기 매일 쓰기 (최소 5문장)', textEN: 'Write Korean diary daily (min 5 sentences)', status: 'todo', order: 3 },
            { id: 'jun-4', textKR: '짧은 에세이 작성 (주 1회, 200자)', textEN: 'Write short essay (1/week, 200 chars)', status: 'todo', order: 4 },
            { id: 'jun-5', textKR: '발음 교정 (유튜브 튜토리얼 활용)', textEN: 'Pronunciation fixes (YouTube tutorials)', status: 'todo', order: 5 }
        ]
    },
    {
        monthKey: '2025-07',
        titleKR: 'TOPIK II 준비 시작',
        titleEN: 'TOPIK II Preparation Start',
        goalKR: 'TOPIK II 수준 문법 학습, 어휘 3000개 목표',
        goalEN: 'TOPIK II grammar learning, 3000 vocabulary goal',
        items: [
            { id: 'jul-1', textKR: '고급 문법 패턴 50개 학습', textEN: 'Learn 50 advanced grammar patterns', status: 'todo', order: 1 },
            { id: 'jul-2', textKR: '어휘 누적 3000개 달성 (중급 단어 집중)', textEN: 'Reach 3000 cumulative vocab (intermediate focus)', status: 'todo', order: 2 },
            { id: 'jul-3', textKR: 'TOPIK II 모의고사 1회 풀이 및 분석', textEN: 'TOPIK II mock test #1 + analysis', status: 'todo', order: 3 },
            { id: 'jul-4', textKR: '긴 글 읽기 연습 (신문 사설, 에세이)', textEN: 'Long reading practice (editorials, essays)', status: 'todo', order: 4 },
            { id: 'jul-5', textKR: '숙어/관용표현 100개 암기', textEN: 'Memorize 100 idioms/expressions', status: 'todo', order: 5 }
        ]
    },
    {
        monthKey: '2025-08',
        titleKR: '실전 회화 & 한국 문화 이해',
        titleEN: 'Real Conversation & Korean Culture Understanding',
        goalKR: '자연스러운 대화, 한국 문화/관습 이해',
        goalEN: 'Natural conversation, understand Korean culture/customs',
        items: [
            { id: 'aug-1', textKR: '한국인과 실전 대화 연습 (주 3회 이상)', textEN: 'Practice with Koreans (3+ times/week)', status: 'todo', order: 1 },
            { id: 'aug-2', textKR: '한국 문화/역사 다큐 시청 및 정리', textEN: 'Watch Korean culture/history docs + notes', status: 'todo', order: 2 },
            { id: 'aug-3', textKR: '존댓말/반말 사용법 완벽 이해', textEN: 'Perfect understanding of formal/informal speech', status: 'todo', order: 3 },
            { id: 'aug-4', textKR: '한국 요리 레시피로 어휘 학습', textEN: 'Learn vocab through Korean cooking recipes', status: 'todo', order: 4 },
            { id: 'aug-5', textKR: '한국 가요/드라마 OST 가사 분석', textEN: 'Analyze K-pop/drama OST lyrics', status: 'todo', order: 5 }
        ]
    },
    {
        monthKey: '2025-09',
        titleKR: 'TOPIK II 최종 대비',
        titleEN: 'TOPIK II Final Preparation',
        goalKR: 'TOPIK II 4급 이상 목표, 약점 집중 보완',
        goalEN: 'Target TOPIK II Level 4+, fix weaknesses',
        items: [
            { id: 'sep-1', textKR: 'TOPIK II 기출문제 10회분 풀이', textEN: 'Solve 10 sets of TOPIK II past papers', status: 'todo', order: 1 },
            { id: 'sep-2', textKR: '쓰기 영역 집중 훈련 (주제별 에세이)', textEN: 'Writing section intensive (topic essays)', status: 'todo', order: 2 },
            { id: 'sep-3', textKR: '듣기 약점 분석 및 보완', textEN: 'Analyze & fix listening weaknesses', status: 'todo', order: 3 },
            { id: 'sep-4', textKR: '시간 관리 연습 (실전 모의고사)', textEN: 'Time management practice (full mock tests)', status: 'todo', order: 4 },
            { id: 'sep-5', textKR: '어휘 최종 점검 (취약 분야)', textEN: 'Final vocab review (weak areas)', status: 'todo', order: 5 }
        ]
    },
    {
        monthKey: '2025-10',
        titleKR: '한국 생활 준비 & 실전 적응',
        titleEN: 'Korea Life Preparation & Real-world Adaptation',
        goalKR: '실생활 한국어 완벽 대비, 현지 적응 준비',
        goalEN: 'Perfect real-life Korean, prepare for local adaptation',
        items: [
            { id: 'oct-1', textKR: '은행/관공서 업무 표현 학습', textEN: 'Learn bank/government office expressions', status: 'todo', order: 1 },
            { id: 'oct-2', textKR: '병원/약국 의료 용어 익히기', textEN: 'Learn hospital/pharmacy medical terms', status: 'todo', order: 2 },
            { id: 'oct-3', textKR: '한국 뉴스 매일 시청 (무자막)', textEN: 'Watch Korean news daily (no subs)', status: 'todo', order: 3 },
            { id: 'oct-4', textKR: '현지 생활 관련 유튜브 채널 정주행', textEN: 'Binge Korean life YouTube channels', status: 'todo', order: 4 },
            { id: 'oct-5', textKR: '최종 점검: 한국인과 30분 자유 대화', textEN: 'Final check: 30min free talk with Korean', status: 'todo', order: 5 }
        ]
    }
];

export const seedstudydata = functions.https.onCall(async () => {
    const db = admin.firestore();

    try {
        // Seed FAQ
        const faqBatch = db.batch();
        for (const faq of faqData) {
            const docRef = db.collection('faq_items').doc(faq.id);
            faqBatch.set(docRef, {
                schemaVersion: 1,
                published: true,
                category: faq.category,
                tags: faq.tags,
                kr: faq.kr,
                en: faq.en,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
        }
        await faqBatch.commit();

        // Seed Daily Stats
        const statsBatch = db.batch();
        for (const stat of dailyStatsData) {
            const docRef = db.collection('daily_stats').doc(stat.dayKey);
            const date = new Date(stat.dayKey + 'T00:00:00Z');

            statsBatch.set(docRef, {
                schemaVersion: 1,
                dayKey: stat.dayKey,
                date: admin.firestore.Timestamp.fromDate(date),
                totalMinutes: stat.totalMinutes,
                focusMinutes: stat.focusMinutes,
                blocks: stat.blocks,
                sessionsCount: 1,
                activeUsersCount: 12 + Math.floor(Math.random() * 8),
                summaryLine: `${Math.floor(stat.totalMinutes / 60)}시간 ${stat.totalMinutes % 60}분 집중 학습`,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
        }
        await statsBatch.commit();

        // Seed Study Plan
        await db.collection('study_plan').doc('current').set({
            schemaVersion: 1,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            months: studyPlanMonths
        });

        const totalHours = dailyStatsData.reduce((sum, s) => sum + s.totalMinutes, 0) / 60;

        return {
            success: true,
            message: `Seeded ${faqData.length} FAQs, ${dailyStatsData.length} days (${totalHours.toFixed(1)}h), and ${studyPlanMonths.length} months study plan`
        };
    } catch (error) {
        console.error('Seed error:', error);
        throw new functions.https.HttpsError('internal', 'Failed to seed data');
    }
});
