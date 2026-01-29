/**
 * Korean Study Plan - Complete Index
 * 10-month plan: ÚNOR - LISTOPAD 2026
 * 
 * 303 days, 2000 words, Level A1 → B1
 */

import type { KoreanStudyPlan, KoreanMonthData } from '../types/study-db';

// === ÚNOR ===
import { februaryData } from './studyPlanFebruary';

// === BŘEZEN === (spojení dvou částí)
import { marchDays29to42 } from './studyPlanMarch';
import { marchDays43to59 } from './studyPlanMarch2';

// === DUBEN ===
import { aprilData } from './studyPlanApril';

// === KVĚTEN === (spojení dvou částí)
import { mayDays90to103 } from './studyPlanMay1';
import { mayDays104to120 } from './studyPlanMay2';

// === ČERVEN === (spojení dvou částí)
import { juneDays121to134 } from './studyPlanJune';
import { juneDays135to150 } from './studyPlanJune2';

// === ČERVENEC === (spojení dvou částí)
import { julyDays151to164 } from './studyPlanJuly';
import { julyDays165to181 } from './studyPlanJuly2';

// === SRPEN === (spojení dvou částí)
import { augustDays182to195 } from './studyPlanAugust1';
import { augustDays196to212 } from './studyPlanAugust2';

// === ZÁŘÍ === (spojení dvou částí)
import { septemberDays213to226 } from './studyPlanSeptember1';
import { septemberDays227to242 } from './studyPlanSeptember2';

// === ŘÍJEN === (spojení dvou částí)
import { octoberDays243to256 } from './studyPlanOctober';
import { octoberDays257to273 } from './studyPlanOctober2';

// === LISTOPAD ===
import { novemberData } from './studyPlanNovember';


// === AGREGACE MĚSÍCŮ ===

// Březen - spojení
export const marchData: KoreanMonthData = {
    month: 2,
    nameKR: '3월 - 확장',
    nameCZ: 'BŘEZEN 2026 - MĚSÍC 2/10',
    targetLevel: 'A1+',
    targetWords: 220,
    totalWords: 440,
    goals: [
        '220 nových slov (celkem 440)',
        '8 gramatických struktur',
        'Jídlo, nakupování, doprava',
        'Výslovnost: 비음화'
    ],
    grammarOverview: [
        { kr: '-았/었어요', cz: 'minulý čas' },
        { kr: '안/못', cz: 'zápor' },
        { kr: '-고 싶다', cz: 'chtít' },
        { kr: '-(으)세요', cz: 'zdvořilá žádost' },
        { kr: '-고', cz: 'a (spojení)' },
        { kr: '-(으)면', cz: 'když/jestli' },
        { kr: '-아서/어서', cz: 'protože' },
        { kr: '-지만', cz: 'ale' }
    ],
    weeks: [
        { weekNumber: 1, dateRange: '2.-8.3.', theme: 'Jídlo, restaurace', days: [29,30,31,32,33,34,35] },
        { weekNumber: 2, dateRange: '9.-15.3.', theme: 'Nakupování', days: [36,37,38,39,40,41,42] },
        { weekNumber: 3, dateRange: '16.-22.3.', theme: 'Doprava', days: [43,44,45,46,47,48,49] },
        { weekNumber: 4, dateRange: '23.-1.4.', theme: 'Počasí, cesta', days: [50,51,52,53,54,55,56,57,58,59] }
    ],
    days: [...marchDays29to42, ...marchDays43to59]
};

// Květen - spojení
export const mayData: KoreanMonthData = {
    month: 4,
    nameKR: '5월 - 업무',
    nameCZ: 'KVĚTEN 2026 - MĚSÍC 4/10',
    targetLevel: 'A2',
    targetWords: 230,
    totalWords: 790,
    goals: [
        '230 nových slov (celkem 790)',
        '6 gramatických struktur',
        'Práce, emoce, hobby'
    ],
    grammarOverview: [
        { kr: '-거나', cz: 'nebo' },
        { kr: '-는데', cz: 'ale/kontext' },
        { kr: '-(으)ㄹ게요', cz: 'slib' },
        { kr: '-아/어 주다', cz: 'pro někoho' },
        { kr: '-(으)면서', cz: 'zatímco' },
        { kr: '-기 전에', cz: 'před' }
    ],
    weeks: [
        { weekNumber: 1, dateRange: '1.-10.5.', theme: 'Zpracování cesty, práce', days: [90,91,92,93,94,95,96,97,98,99] },
        { weekNumber: 2, dateRange: '11.-17.5.', theme: 'Čas, plánování', days: [100,101,102,103,104,105,106] },
        { weekNumber: 3, dateRange: '18.-24.5.', theme: 'Emoce, komunikace', days: [107,108,109,110,111,112,113] },
        { weekNumber: 4, dateRange: '25.-31.5.', theme: 'Hobby, sport', days: [114,115,116,117,118,119,120] }
    ],
    days: [...mayDays90to103, ...mayDays104to120]
};

// Červen - spojení
export const juneData: KoreanMonthData = {
    month: 5,
    nameKR: '6월 - 건설 #1',
    nameCZ: 'ČERVEN 2026 - MĚSÍC 5/10 - STAVBA #1',
    targetLevel: 'A2-B1',
    targetWords: 230,
    totalWords: 1020,
    goals: [
        '230 nových slov - STAVEBNÍ!',
        '6 gramatických struktur',
        'Materiály, nástroje, bezpečnost'
    ],
    grammarOverview: [
        { kr: '-아/어야 하다', cz: 'muset' },
        { kr: '-(으)면 안 되다', cz: 'nesmí' },
        { kr: '-아/어도 되다', cz: 'smět' },
        { kr: '-(으)ㄹ까요?', cz: 'mám?' },
        { kr: '-(으)ㅂ시다', cz: 'pojďme' },
        { kr: '-(으)ㄴ 후에', cz: 'poté' }
    ],
    weeks: [
        { weekNumber: 1, dateRange: '1.-7.6.', theme: 'Stavební materiály', days: [121,122,123,124,125,126,127] },
        { weekNumber: 2, dateRange: '8.-14.6.', theme: 'Nástroje', days: [128,129,130,131,132,133,134] },
        { weekNumber: 3, dateRange: '15.-21.6.', theme: 'Bezpečnost', days: [135,136,137,138,139,140,141] },
        { weekNumber: 4, dateRange: '22.-30.6.', theme: 'Místa na stavbě', days: [142,143,144,145,146,147,148,149,150] }
    ],
    days: [...juneDays121to134, ...juneDays135to150]
};

// Červenec - spojení
export const julyData: KoreanMonthData = {
    month: 6,
    nameKR: '7월 - 건강',
    nameCZ: 'ČERVENEC 2026 - MĚSÍC 6/10',
    targetLevel: 'B1',
    targetWords: 230,
    totalWords: 1250,
    goals: [
        '230 nových slov',
        '5 gramatických struktur',
        'Zdraví, tělo, nouze, sport'
    ],
    grammarOverview: [
        { kr: '-게 되다', cz: 'stát se' },
        { kr: '-기로 하다', cz: 'rozhodnout' },
        { kr: '-(으)ㄴ/는 것 같다', cz: 'zdá se' },
        { kr: '-나 보다', cz: 'asi' },
        { kr: '-(으)ㄹ 줄 알다', cz: 'umět' }
    ],
    weeks: [
        { weekNumber: 1, dateRange: '1.-7.7.', theme: 'Tělo, bolesti', days: [151,152,153,154,155,156,157] },
        { weekNumber: 2, dateRange: '8.-14.7.', theme: 'Lékař, léky', days: [158,159,160,161,162,163,164] },
        { weekNumber: 3, dateRange: '15.-21.7.', theme: 'Nehody, nouze', days: [165,166,167,168,169,170,171] },
        { weekNumber: 4, dateRange: '22.-31.7.', theme: 'Sport, fitness', days: [172,173,174,175,176,177,178,179,180,181] }
    ],
    days: [...julyDays151to164, ...julyDays165to181]
};

// Srpen - spojení
export const augustData: KoreanMonthData = {
    month: 7,
    nameKR: '8월 - 건설 #2',
    nameCZ: 'SRPEN 2026 - MĚSÍC 7/10 - STAVBA #2',
    targetLevel: 'B1',
    targetWords: 230,
    totalWords: 1480,
    goals: [
        '230 nových slov - STAVEBNÍ!',
        '5 gramatických struktur',
        'Procesy, stroje, opravy'
    ],
    grammarOverview: [
        { kr: '-더라도', cz: 'i kdyby' },
        { kr: '-(으)ㄹ수록', cz: 'čím víc' },
        { kr: '-든지', cz: 'cokoliv' },
        { kr: '-다가', cz: 'a pak' },
        { kr: '-(으)ㄹ 뻔하다', cz: 'málem' }
    ],
    weeks: [
        { weekNumber: 1, dateRange: '1.-7.8.', theme: 'Stavební procesy', days: [182,183,184,185,186,187,188] },
        { weekNumber: 2, dateRange: '8.-14.8.', theme: 'Měření, výkresy', days: [189,190,191,192,193,194,195] },
        { weekNumber: 3, dateRange: '15.-21.8.', theme: 'Stroje', days: [196,197,198,199,200,201,202] },
        { weekNumber: 4, dateRange: '22.-31.8.', theme: 'Problémy, opravy', days: [203,204,205,206,207,208,209,210,211,212] }
    ],
    days: [...augustDays182to195, ...augustDays196to212]
};

// Září - spojení
export const septemberData: KoreanMonthData = {
    month: 8,
    nameKR: '9월 - 업무',
    nameCZ: 'ZÁŘÍ 2026 - MĚSÍC 8/10',
    targetLevel: 'B1',
    targetWords: 230,
    totalWords: 1710,
    goals: [
        '230 nových slov',
        '5 gramatických struktur',
        'Formální komunikace, dokumenty'
    ],
    grammarOverview: [
        { kr: '-고 말다', cz: 'nakonec' },
        { kr: '-(으)ㄹ 만하다', cz: 'stojí za to' },
        { kr: '-는 바람에', cz: 'kvůli' },
        { kr: '-(으)ㄴ/는 셈이다', cz: 'dá se říct' },
        { kr: '-는 대로', cz: 'jakmile' }
    ],
    weeks: [
        { weekNumber: 1, dateRange: '1.-7.9.', theme: 'Dokumenty, e-mail', days: [213,214,215,216,217,218,219] },
        { weekNumber: 2, dateRange: '8.-14.9.', theme: 'Formální fráze', days: [220,221,222,223,224,225,226] },
        { weekNumber: 3, dateRange: '15.-21.9.', theme: 'Smlouvy, finance', days: [227,228,229,230,231,232,233] },
        { weekNumber: 4, dateRange: '22.-30.9.', theme: 'Stavební dokumenty', days: [234,235,236,237,238,239,240,241,242] }
    ],
    days: [...septemberDays213to226, ...septemberDays227to242]
};

// Říjen - spojení
export const octoberData: KoreanMonthData = {
    month: 9,
    nameKR: '10월 - 건설 #3',
    nameCZ: 'ŘÍJEN 2026 - MĚSÍC 9/10 - STAVBA #3',
    targetLevel: 'B1',
    targetWords: 230,
    totalWords: 1940,
    goals: [
        '230 nových slov - STAVEBNÍ!',
        'Opakování gramatiky',
        'Profese, dokončovací, kontrola'
    ],
    grammarOverview: [
        { kr: 'Opakování', cz: 'všechny struktury' }
    ],
    weeks: [
        { weekNumber: 1, dateRange: '1.-7.10.', theme: 'Stavební profese', days: [243,244,245,246,247,248,249] },
        { weekNumber: 2, dateRange: '8.-14.10.', theme: 'Dokončovací práce', days: [250,251,252,253,254,255,256] },
        { weekNumber: 3, dateRange: '15.-21.10.', theme: 'Kontrola kvality', days: [257,258,259,260,261,262,263] },
        { weekNumber: 4, dateRange: '22.-31.10.', theme: 'Předání, dokumentace', days: [264,265,266,267,268,269,270,271,272,273] }
    ],
    days: [...octoberDays243to256, ...octoberDays257to273]
};


// === KOMPLETNÍ STUDIJNÍ PLÁN ===

export const koreanStudyPlanComplete: KoreanStudyPlan = {
    titleCZ: '10měsíční plán korejštiny',
    titleKR: '10개월 한국어 학습 플랜',
    startDate: '2. února 2026',
    endDate: '30. listopadu 2026',
    milestones: [
        { month: 1, level: 'A1', words: 220, isCheckpoint: false },
        { month: 2, level: 'A1+', words: 440, isCheckpoint: false },
        { month: 3, level: 'A2', words: 560, isCheckpoint: true },       // CESTA DO KOREJE
        { month: 4, level: 'A2+', words: 790, isCheckpoint: false },
        { month: 5, level: 'A2-B1', words: 1020, isCheckpoint: true },   // 1000 slov!
        { month: 6, level: 'B1', words: 1250, isCheckpoint: false },
        { month: 7, level: 'B1', words: 1480, isCheckpoint: false },
        { month: 8, level: 'B1', words: 1710, isCheckpoint: false },
        { month: 9, level: 'B1', words: 1940, isCheckpoint: false },
        { month: 10, level: 'B1', words: 2000, isCheckpoint: true }      // FINÁLE
    ],
    monthsData: [
        februaryData,   // Měsíc 1 - ÚNOR
        marchData,      // Měsíc 2 - BŘEZEN
        aprilData,      // Měsíc 3 - DUBEN (Cesta)
        mayData,        // Měsíc 4 - KVĚTEN
        juneData,       // Měsíc 5 - ČERVEN (Stavba #1)
        julyData,       // Měsíc 6 - ČERVENEC
        augustData,     // Měsíc 7 - SRPEN (Stavba #2)
        septemberData,  // Měsíc 8 - ZÁŘÍ
        octoberData,    // Měsíc 9 - ŘÍJEN (Stavba #3)
        novemberData    // Měsíc 10 - LISTOPAD (Finále)
    ],
    overview: {
        schedule: [
            { day: 'Pondělí-Pátek', time: '2h', activity: 'Slovíčka + gramatika' },
            { day: 'Sobota', time: '8h', activity: 'Maraton - opakování + nová gramatika' },
            { day: 'Neděle', time: '12h', activity: 'Mega opakování + TEST' }
        ],
        tools: [
            { name: 'Anki', usage: 'Každý den min. 30 min' },
            { name: 'YouTube', usage: 'Pasivní poslech v práci' },
            { name: 'Rodilá mluvčí', usage: 'Denní konverzace s přítelkyní' },
            { name: 'Deník', usage: 'Zapisuj co se učíš a problémy' }
        ],
        rules: {
            do: ['Anki každý den', 'Mluv s přítelkyní korejsky', 'Pasivní poslech', 'Piš poznámky'],
            dont: ['Nepřeskakuj dny', 'Nepoužívej romanizaci', 'Neučí se bez kontextu', 'Neboj se chyb']
        },
        motivation: '천 리 길도 한 걸음부터 - I ta nejdelší cesta začíná jedním krokem.',
        totalHoursPerWeek: '30h aktivně'
    }
};

// Default export
export default koreanStudyPlanComplete;

// Re-export jednotlivých měsíců
export { februaryData };
export { aprilData };
export { novemberData };
