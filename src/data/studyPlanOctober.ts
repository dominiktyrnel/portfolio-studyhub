/**
 * October 2026 - Korean Study Plan Data (Complete Month)
 * Month 9/10 - Level B1+ - Stavební profese, dokončovací práce, kontrola, předání
 * Days 243-273 (1.10.2026 - 31.10.2026)
 * 
 * TŘETÍ HLAVNÍ STAVEBNÍ MĚSÍC
 * Téma: Stavební profese, dokončovací práce, kontrola kvality, předání
 * 115 slovíček, opakování všech gramatických struktur roku
 */

import type { KoreanDayData, KoreanMonthData } from '../types/study-db';
import { octoberDays257to273 } from './studyPlanOctober2';

// === TÝDEN 1: Stavební profese (1.10.-7.10.) ===

export const day243: KoreanDayData = {
    day: 243,
    date: 'ČT 1.10.2026',
    title: '👷 Vedení stavby',
    vocab: [
        { kr: '현장소장', cz: 'stavbyvedoucí' },
        { kr: '감독', cz: 'dozor' },
        { kr: '관리자', cz: 'správce' },
        { kr: '안전관리자', cz: 'bezpečák' },
        { kr: '품질관리자', cz: 'kvalitář' },
        { kr: '공무', cz: 'admin' },
        { kr: '기술자', cz: 'technik' },
        { kr: '설계사', cz: 'projektant' },
        { kr: '감리', cz: 'stavební dozor' },
        { kr: '발주처', cz: 'investor' }
    ],
    grammar: {
        title: '-(으)면 안 되다 (nesmí se)',
        explanation: 'Zákaz nebo nesmí se dělat. Používá se pro bezpečnostní pravidla.',
        examples: [
            { kr: '현장소장 허가 없이 작업하면 안 돼요.', cz: 'Bez povolení stavbyvedoucího se nesmí pracovat.' },
            { kr: '안전관리자 없이 시작하면 안 됩니다.', cz: 'Bez bezpečáka se nesmí začít.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day244: KoreanDayData = {
    day: 244,
    date: 'PÁ 2.10.2026',
    title: '🔧 Technici',
    vocab: [
        { kr: '기사', cz: 'technik' },
        { kr: '엔지니어', cz: 'inženýr' },
        { kr: '측량사', cz: 'geodet' },
        { kr: '시험기사', cz: 'laborant' },
        { kr: '검사원', cz: 'kontrolor' },
        { kr: '안전요원', cz: 'bezp. pracovník' },
        { kr: '신호수', cz: 'signalista' },
        { kr: '장비기사', cz: 'operátor' },
        { kr: '정비사', cz: 'mechanik' },
        { kr: '전기기사', cz: 'elektrotechnik' }
    ],
    grammar: {
        title: '-아/어야 하다 (musí se)',
        explanation: 'Nutnost nebo povinnost. Opakování základní struktury.',
        examples: [
            { kr: '측량사가 먼저 확인해야 해요.', cz: 'Geodet musí nejdřív zkontrolovat.' },
            { kr: '검사원이 승인해야 합니다.', cz: 'Kontrolor musí schválit.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day245: KoreanDayData = {
    day: 245,
    date: 'SO 3.10.2026',
    title: '⭐ VÍKEND - Hlavní řemesla',
    vocab: [
        { kr: '목수', cz: 'tesař' },
        { kr: '철근공', cz: 'železář' },
        { kr: '콘크리트공', cz: 'betonář' },
        { kr: '미장공', cz: 'omítkář' },
        { kr: '방수공', cz: 'izolér' },
        { kr: '형틀목수', cz: 'bednář' },
        { kr: '조적공', cz: 'zedník' },
        { kr: '석공', cz: 'kameník' },
        { kr: '용접공', cz: 'svářeč' },
        { kr: '비계공', cz: 'lešenář' }
    ],
    tasks: ['Procvičení profesí', 'Anki karty'],
    isWeekend: true,
    isTest: false
};

export const day246: KoreanDayData = {
    day: 246,
    date: 'NE 4.10.2026',
    title: '🔄 VÍKEND - Instalace',
    vocab: [
        { kr: '배관공', cz: 'instalatér' },
        { kr: '전기공', cz: 'elektrikář' },
        { kr: '설비공', cz: 'vzduchotechnik' },
        { kr: '냉난방공', cz: 'topenář' },
        { kr: '가스공', cz: 'plynař' },
        { kr: '통신공', cz: 'komunikace' },
        { kr: '소방설비공', cz: 'sprinklery' },
        { kr: '승강기공', cz: 'výtahář' },
        { kr: '보온공', cz: 'izolér' },
        { kr: '덕트공', cz: 'vzduchotechnik' }
    ],
    tasks: ['Opakování slovíček profesí'],
    isWeekend: true,
    isTest: false
};

export const day247: KoreanDayData = {
    day: 247,
    date: 'PO 5.10.2026',
    title: '🎨 Dokončovací profese',
    vocab: [
        { kr: '도장공', cz: 'malíř' },
        { kr: '타일공', cz: 'obkladač' },
        { kr: '유리공', cz: 'sklenář' },
        { kr: '도배공', cz: 'tapetář' },
        { kr: '바닥공', cz: 'podlahář' },
        { kr: '샤시공', cz: 'okenář' },
        { kr: '잡철공', cz: 'zámečník' },
        { kr: '방충망공', cz: 'sítě' },
        { kr: '청소원', cz: 'úklidový pracovník' },
        { kr: '조경공', cz: 'zahradník' }
    ],
    grammar: {
        title: '-고 있다 (právě probíhá)',
        explanation: 'Průběhový čas. Kombinace s profesemi.',
        examples: [
            { kr: '도장공이 페인트칠하고 있어요.', cz: 'Malíř právě natírá.' },
            { kr: '타일공이 바닥을 깔고 있습니다.', cz: 'Obkladač právě pokládá podlahu.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day248: KoreanDayData = {
    day: 248,
    date: 'ÚT 6.10.2026',
    title: '📝 Opakování profesí #1',
    vocab: [],
    tasks: [
        'Opakování: vedení (현장소장, 감독, 관리자...)',
        'Opakování: technici (기사, 엔지니어, 측량사...)',
        'Procvičení vět s profesemi'
    ],
    grammar: {
        title: '-(으)ㄹ 수 있다/없다 (umět/moci)',
        explanation: 'Schopnost nebo možnost. Opakování s profesemi.',
        examples: [
            { kr: '용접공이 이 작업을 할 수 있어요.', cz: 'Svářeč to umí udělat.' },
            { kr: '비계공 없이 작업할 수 없어요.', cz: 'Bez lešenáře se nedá pracovat.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day249: KoreanDayData = {
    day: 249,
    date: 'ST 7.10.2026',
    title: '📝 Opakování profesí #2',
    vocab: [],
    tasks: [
        'Opakování: hlavní řemesla (목수, 철근공, 콘크리트공...)',
        'Opakování: instalace (배관공, 전기공, 설비공...)',
        'Mini-test: 50 profesí'
    ],
    isWeekend: false,
    isTest: true
};

// === TÝDEN 2: Dokončovací práce (8.10.-14.10.) ===

export const day250: KoreanDayData = {
    day: 250,
    date: 'ČT 8.10.2026',
    title: '🏗️ Omítky',
    vocab: [
        { kr: '미장', cz: 'omítka' },
        { kr: '시멘트미장', cz: 'cementová' },
        { kr: '석고미장', cz: 'sádrová' },
        { kr: '줄눈미장', cz: 'spárování' },
        { kr: '뿜칠', cz: 'stříkaná' },
        { kr: '손미장', cz: 'ruční' },
        { kr: '기계미장', cz: 'strojní' },
        { kr: '마감', cz: 'finální vrstva' },
        { kr: '초벌', cz: 'hrubá' },
        { kr: '재벌', cz: 'jemná' },
        { kr: '정벌', cz: 'finální' }
    ],
    grammar: {
        title: '-기 전에 / -은/ㄴ 후에 (před/po)',
        explanation: 'Časová posloupnost prací.',
        examples: [
            { kr: '초벌 바르기 전에 벽을 적셔요.', cz: 'Před hrubou omítkou navlhčíme zeď.' },
            { kr: '초벌 바른 후에 재벌 발라요.', cz: 'Po hrubé omítce naneseme jemnou.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day251: KoreanDayData = {
    day: 251,
    date: 'PÁ 9.10.2026',
    title: '🎨 Malování',
    vocab: [
        { kr: '도장', cz: 'natírání' },
        { kr: '페인트칠', cz: 'malování' },
        { kr: '프라이머', cz: 'základ' },
        { kr: '하도', cz: 'základní nátěr' },
        { kr: '중도', cz: 'mezivrstva' },
        { kr: '상도', cz: 'finální nátěr' },
        { kr: '락카', cz: 'lak' },
        { kr: '스프레이', cz: 'stříkání' },
        { kr: '롤러', cz: 'válečkem' },
        { kr: '붓', cz: 'štětcem' },
        { kr: '양생', cz: 'ochrana' }
    ],
    grammar: {
        title: '-(으)로 (nástroj/způsob)',
        explanation: 'Jakým způsobem nebo nástrojem.',
        examples: [
            { kr: '롤러로 칠해요.', cz: 'Natírám válečkem.' },
            { kr: '스프레이로 도장해요.', cz: 'Stříkám sprejem.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day252: KoreanDayData = {
    day: 252,
    date: 'SO 10.10.2026',
    title: '⭐ VÍKEND - Podlahy',
    vocab: [
        { kr: '바닥', cz: 'podlaha' },
        { kr: '타일', cz: 'dlažba' },
        { kr: '마루', cz: 'parkety' },
        { kr: '장판', cz: 'lino' },
        { kr: '카펫', cz: 'koberec' },
        { kr: '에폭시', cz: 'epoxid' },
        { kr: '폴리싱', cz: 'leštěná' },
        { kr: '자기질', cz: 'keramická' },
        { kr: '포세린', cz: 'porcelánová' },
        { kr: '줄눈', cz: 'spárování' },
        { kr: '방수', cz: 'hydroizolace' }
    ],
    tasks: ['Procvičení podlahových materiálů', 'Anki karty'],
    isWeekend: true,
    isTest: false
};

export const day253: KoreanDayData = {
    day: 253,
    date: 'NE 11.10.2026',
    title: '🔄 VÍKEND - Obklady',
    vocab: [
        { kr: '벽타일', cz: 'obklad' },
        { kr: '바닥타일', cz: 'dlažba' },
        { kr: '모자이크', cz: 'mozaika' },
        { kr: '대리석', cz: 'mramor' },
        { kr: '화강석', cz: 'žula' },
        { kr: '인조석', cz: 'umělý kámen' },
        { kr: '테라조', cz: 'terazzo' },
        { kr: '본딩', cz: 'lepení' },
        { kr: '줄눈재', cz: 'spárovací hmota' },
        { kr: '실리콘', cz: 'silikon' }
    ],
    tasks: ['Opakování obkladových materiálů'],
    isWeekend: true,
    isTest: false
};

export const day254: KoreanDayData = {
    day: 254,
    date: 'PO 12.10.2026',
    title: '📦 SDK práce',
    vocab: [
        { kr: '석고보드', cz: 'sádrokarton' },
        { kr: '천장', cz: 'strop' },
        { kr: '칸막이', cz: 'příčka' },
        { kr: '몰딩', cz: 'lišta' },
        { kr: '커튼박스', cz: 'krabice na záclony' },
        { kr: '간접조명', cz: 'nepřímé osvětlení' },
        { kr: '타공판', cz: 'děrovaná deska' },
        { kr: '방음', cz: 'akustická' },
        { kr: '내화', cz: 'protipožární' },
        { kr: '방습', cz: 'hydrofobní' }
    ],
    grammar: {
        title: '-는 것 (nominalizace)',
        explanation: 'Převod slovesa na podstatné jméno.',
        examples: [
            { kr: '석고보드 설치하는 것이 어려워요.', cz: 'Instalovat sádrokarton je těžké.' },
            { kr: '천장 마감하는 것이 중요해요.', cz: 'Dokončit strop je důležité.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day255: KoreanDayData = {
    day: 255,
    date: 'ÚT 13.10.2026',
    title: '📝 Opakování dokončovacích prací',
    vocab: [],
    tasks: [
        'Opakování: omítky (미장, 시멘트미장, 석고미장...)',
        'Opakování: malování (도장, 페인트칠, 프라이머...)',
        'Opakování: podlahy (바닥, 타일, 마루...)',
        'Procvičení vět s dokončovacími pracemi'
    ],
    grammar: {
        title: '-아/어서 (protože/a tak)',
        explanation: 'Příčina a důsledek. Opakování.',
        examples: [
            { kr: '초벌이 말라서 재벌 발라요.', cz: 'Hrubá omítka uschla, tak nanášíme jemnou.' },
            { kr: '프라이머 발라서 페인트칠해요.', cz: 'Nanesli jsme základ, tak malujeme.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day256: KoreanDayData = {
    day: 256,
    date: 'ST 14.10.2026',
    title: '🏆 TEST TÝDNŮ 1-2',
    vocab: [],
    exercises: [
        'A. Vedení a technici (25 bodů):',
        '1. stavbyvedoucí = 현장소장',
        '2. bezpečák = 안전관리자',
        '3. geodet = 측량사',
        '4. kontrolor = 검사원',
        '5. elektrotechnik = 전기기사',
        '',
        'B. Řemeslníci (25 bodů):',
        '1. tesař = 목수',
        '2. železář = 철근공',
        '3. svářeč = 용접공',
        '4. instalatér = 배관공',
        '5. malíř = 도장공',
        '',
        'C. Dokončovací práce (25 bodů):',
        '1. omítka = 미장',
        '2. základní nátěr = 하도',
        '3. sádrokarton = 석고보드',
        '4. spárování = 줄눈',
        '5. hydroizolace = 방수',
        '',
        'D. Překlad vět (25 bodů):',
        '1. Bez povolení stavbyvedoucího se nesmí pracovat.',
        '   = 현장소장 허가 없이 작업하면 안 돼요.',
        '2. Malíř právě natírá.',
        '   = 도장공이 페인트칠하고 있어요.',
        '3. Před hrubou omítkou navlhčíme zeď.',
        '   = 초벌 바르기 전에 벽을 적셔요.',
        '4. Natírám válečkem.',
        '   = 롤러로 칠해요.',
        '5. Instalovat sádrokarton je těžké.',
        '   = 석고보드 설치하는 것이 어려워요.'
    ],
    isWeekend: false,
    isTest: true
};

// Export all days for October weeks 1-2
export const octoberDays243to256: KoreanDayData[] = [
    day243, day244, day245, day246, day247, day248, day249,
    day250, day251, day252, day253, day254, day255, day256
];

// October Month Data (Complete)
export const octoberData: KoreanMonthData = {
    month: 9,
    nameKR: '10월',
    nameCZ: 'ŘÍJEN 2026 - MĚSÍC 9/10',
    targetLevel: 'B1+',
    targetWords: 115,
    totalWords: 1850,
    goals: [
        '115 nových slov (celkem 1850)',
        'Opakování všech gramatických struktur roku',
        'Stavební profese',
        'Dokončovací práce',
        'Kontrola kvality',
        'Předání a dokumentace'
    ],
    grammarOverview: [
        { kr: '-(으)면 안 되다', cz: 'nesmí se' },
        { kr: '-아/어야 하다', cz: 'musí se' },
        { kr: '-(으)ㄹ 수 있다/없다', cz: 'umět/moci' },
        { kr: '-고 있다', cz: 'právě probíhá' },
        { kr: '-기 전에 / -은/ㄴ 후에', cz: 'před/po' },
        { kr: '-(으)로', cz: 'nástroj/způsob' },
        { kr: '-는 것', cz: 'nominalizace' },
        { kr: '-에 따라(서)', cz: 'podle' },
        { kr: '-대로', cz: 'tak jak, podle' },
        { kr: '-동안', cz: 'během, po dobu' },
        { kr: '-아/어 놓다', cz: 'udělat předem' },
        { kr: '-기로 하다', cz: 'rozhodnout se' },
        { kr: '-아/어 주다', cz: 'udělat pro někoho' }
    ],
    weeks: [
        { weekNumber: 1, dateRange: '1.-7. ŘÍJNA', theme: 'Stavební profese', days: [243, 244, 245, 246, 247, 248, 249] },
        { weekNumber: 2, dateRange: '8.-14. ŘÍJNA', theme: 'Dokončovací práce', days: [250, 251, 252, 253, 254, 255, 256] },
        { weekNumber: 3, dateRange: '15.-21. ŘÍJNA', theme: 'Kontrola kvality + Standardy', days: [257, 258, 259, 260, 261, 262, 263] },
        { weekNumber: 4, dateRange: '22.-28. ŘÍJNA', theme: 'Předání + Dokumentace', days: [264, 265, 266, 267, 268, 269, 270] },
        { weekNumber: 5, dateRange: '29.-31. ŘÍJNA', theme: 'Opakování + MĚSÍČNÍ TEST', days: [271, 272, 273] }
    ],
    days: [
        // Weeks 1-2
        day243, day244, day245, day246, day247, day248, day249,
        day250, day251, day252, day253, day254, day255, day256,
        // Weeks 3-4+ (from October2)
        ...octoberDays257to273
    ]
};

export default octoberData;
