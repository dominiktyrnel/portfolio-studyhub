/**
 * SRPEN 2026 - TÝDEN 3-4+ (DNY 196-212)
 * Month 7/10 - STAVBA #2: Stroje a problémy
 * 
 * 15.8.2026 - 31.8.2026
 * 115 slov, 3 gramatické struktury
 * 
 * BEZ ANGLIČTINY - pouze 한국어 + Česky
 */

import type { KoreanDayData } from '../types/study-db';

// ============================================================================
// TÝDEN 3: Stroje (15.8. - 21.8.2026)
// ============================================================================

// Den 196: SO 15.8.2026 - Těžké stroje + Gramatika -기는 하다
export const day196: KoreanDayData = {
    day: 196,
    date: 'SO 15.8.2026',
    title: '🚜 Těžké stroje',
    vocab: [
        { kr: '굴삭기', cz: 'bagr' },
        { kr: '불도저', cz: 'buldozer' },
        { kr: '로더', cz: 'nakladač' },
        { kr: '덤프트럭', cz: 'sklápěč' },
        { kr: '롤러', cz: 'válec' },
        { kr: '그레이더', cz: 'grader' },
        { kr: '스크레이퍼', cz: 'skrejpr' },
        { kr: '파일드라이버', cz: 'beranidlo' },
        { kr: '항타기', cz: 'zarážeč pilot' },
        { kr: '천공기', cz: 'vrtná souprava' }
    ],
    grammar: {
        title: '-기는 하다 (sice... ale)',
        explanation: 'Vyjadřuje částečné přiznání s následným omezením.\n\nPoužití: Kmen + 기는 하다\n\n좋다 → 좋기는 하다\n알다 → 알기는 하다\n먹다 → 먹기는 하다\n\nČasto zkráceno na -긴 하다.',
        examples: [
            { kr: '좋기는 한데 비싸요', cz: 'Je to sice dobré, ale drahé' },
            { kr: '알기는 알아요', cz: 'Sice to vím, ale...' },
            { kr: '먹기는 했어요', cz: 'Sice jsem jedl, ale...' },
            { kr: '크기는 큰데 무거워요', cz: 'Sice je to velké, ale těžké' }
        ]
    },
    isWeekend: true,
    isTest: false
};

// Den 197: NE 16.8.2026 - Jeřáby
export const day197: KoreanDayData = {
    day: 197,
    date: 'NE 16.8.2026',
    title: '🏗️ Jeřáby',
    vocab: [
        { kr: '크레인', cz: 'jeřáb' },
        { kr: '타워크레인', cz: 'věžový jeřáb' },
        { kr: '이동식크레인', cz: 'mobilní jeřáb' },
        { kr: '와이어', cz: 'lano' },
        { kr: '훅', cz: 'hák' },
        { kr: '줄걸이', cz: 'vázání břemen' },
        { kr: '인양', cz: 'zvedání' },
        { kr: '권상', cz: 'zdvihání' },
        { kr: '선회', cz: 'otáčení' },
        { kr: '기복', cz: 'sklápění výložníku' },
        { kr: '붐', cz: 'výložník' },
        { kr: '카운터웨이트', cz: 'protizávaží' }
    ],
    sentences: [
        { kr: '크레인으로 인양해요', cz: 'Zvedám jeřábem' },
        { kr: '훅을 걸어요', cz: 'Zavěšuji na hák' },
        { kr: '타워크레인이 선회해요', cz: 'Věžový jeřáb se otáčí' }
    ],
    isWeekend: true,
    isTest: false
};

// Den 198: PO 17.8.2026 - Míchačky a čerpadla
export const day198: KoreanDayData = {
    day: 198,
    date: 'PO 17.8.2026',
    title: '🔄 Míchačky a čerpadla',
    vocab: [
        { kr: '믹서', cz: 'míchačka' },
        { kr: '콘크리트믹서', cz: 'míchačka betonu' },
        { kr: '펌프카', cz: 'čerpadlo betonu' },
        { kr: '레미콘', cz: 'autodomíchávač' },
        { kr: '호퍼', cz: 'násypka' },
        { kr: '호스', cz: 'hadice' },
        { kr: '붐파이프', cz: 'potrubí výložníku' },
        { kr: '배출구', cz: 'výpust' },
        { kr: '세척', cz: 'čištění' },
        { kr: '타설', cz: 'ukládání' }
    ],
    sentences: [
        { kr: '레미콘이 왔어요', cz: 'Přijel autodomíchávač' },
        { kr: '펌프카로 타설해요', cz: 'Ukládáme čerpadlem' },
        { kr: '세척해야 해요', cz: 'Musíme to vyčistit' }
    ],
    isWeekend: false,
    isTest: false
};

// Den 199: ÚT 18.8.2026 - Drobné stroje
export const day199: KoreanDayData = {
    day: 199,
    date: 'ÚT 18.8.2026',
    title: '🔧 Drobné stroje',
    vocab: [
        { kr: '지게차', cz: 'vysokozdvižný vozík' },
        { kr: '고소작업차', cz: 'plošina' },
        { kr: '컴프레서', cz: 'kompresor' },
        { kr: '발전기', cz: 'generátor' },
        { kr: '용접기', cz: 'svářečka' },
        { kr: '그라인더', cz: 'bruska' },
        { kr: '절단기', cz: 'řezačka' },
        { kr: '믹서', cz: 'míchadlo' },
        { kr: '진동기', cz: 'vibrátor' },
        { kr: '펌프', cz: 'čerpadlo' }
    ],
    sentences: [
        { kr: '지게차로 옮겨요', cz: 'Přemísťuji vysokozdvižným vozíkem' },
        { kr: '발전기를 켜요', cz: 'Zapínám generátor' },
        { kr: '그라인더로 갈아요', cz: 'Brousím bruskou' }
    ],
    isWeekend: false,
    isTest: false
};

// Den 200: ST 19.8.2026 - Operace strojů
export const day200: KoreanDayData = {
    day: 200,
    date: 'ST 19.8.2026',
    title: '🎮 Operace strojů',
    vocab: [
        { kr: '운전하다', cz: 'řídit' },
        { kr: '조작하다', cz: 'ovládat' },
        { kr: '작동하다', cz: 'spouštět' },
        { kr: '멈추다', cz: 'zastavit' },
        { kr: '후진', cz: 'couvání' },
        { kr: '전진', cz: 'vpřed' },
        { kr: '회전', cz: 'otáčení' },
        { kr: '상승', cz: 'nahoru' },
        { kr: '하강', cz: 'dolů' },
        { kr: '속도', cz: 'rychlost' },
        { kr: '신호', cz: 'signál' },
        { kr: '안전거리', cz: 'bezpečná vzdálenost' }
    ],
    sentences: [
        { kr: '굴삭기를 운전해요', cz: 'Řídím bagr' },
        { kr: '후진 신호를 보내요', cz: 'Dávám signál k couvání' },
        { kr: '안전거리를 지켜요', cz: 'Dodržuji bezpečnou vzdálenost' }
    ],
    isWeekend: false,
    isTest: false
};

// Den 201: ČT 20.8.2026 - Procvičení týden 3a
export const day201: KoreanDayData = {
    day: 201,
    date: 'ČT 20.8.2026',
    title: '📝 Procvičení',
    vocab: [],
    tasks: [
        'Procvičení slovíček: Stroje a operace',
        'Procvičení gramatiky: -기는 하다',
        'Dialog: Práce se stroji'
    ],
    exercises: [
        'A. Doplň korejsky:',
        '1. bagr = ___',
        '2. jeřáb = ___',
        '3. autodomíchávač = ___',
        '4. generátor = ___',
        '',
        'B. Přelož do korejštiny:',
        '1. Je to sice dobré, ale drahé.',
        '2. Řídím bagr.',
        '3. Dávám signál k couvání.'
    ],
    isWeekend: false,
    isTest: false
};

// Den 202: PÁ 21.8.2026 - Opakování týden 3
export const day202: KoreanDayData = {
    day: 202,
    date: 'PÁ 21.8.2026',
    title: '🔄 Opakování týden 3',
    vocab: [],
    focus: [
        'Opakování 54 slov z týdne 3',
        'Těžké stroje (10 slov)',
        'Jeřáby (12 slov)',
        'Míchačky a čerpadla (10 slov)',
        'Drobné stroje (10 slov)',
        'Operace strojů (12 slov)',
        'Gramatika: -기는 하다 (sice... ale)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// TÝDEN 4: Problémy a opravy (22.8. - 28.8.2026)
// ============================================================================

// Den 203: SO 22.8.2026 - Problémy + Gramatika -(으)ㄹ 뻔하다
export const day203: KoreanDayData = {
    day: 203,
    date: 'SO 22.8.2026',
    title: '⚠️ Problémy',
    vocab: [
        { kr: '문제', cz: 'problém' },
        { kr: '고장', cz: 'porucha' },
        { kr: '결함', cz: 'vada' },
        { kr: '균열', cz: 'trhlina' },
        { kr: '누수', cz: 'únik vody' },
        { kr: '변형', cz: 'deformace' },
        { kr: '침하', cz: 'sedání' },
        { kr: '박리', cz: 'odlupování' },
        { kr: '부식', cz: 'koroze' },
        { kr: '마모', cz: 'opotřebení' },
        { kr: '파손', cz: 'poškození' },
        { kr: '오염', cz: 'znečištění' }
    ],
    grammar: {
        title: '-(으)ㄹ 뻔하다 (málem)',
        explanation: 'Vyjadřuje, že se něco málem stalo (ale nestalo).\n\nPoužití:\n- Po samohlásce/ㄹ: -ㄹ 뻔하다\n- Po souhlásce: -을 뻔하다\n\n떨어지다 → 떨어질 뻔하다\n다치다 → 다칠 뻔하다\n늦다 → 늦을 뻔하다',
        examples: [
            { kr: '떨어질 뻔했어요', cz: 'Málem jsem spadl' },
            { kr: '다칠 뻔했어요', cz: 'Málem jsem se zranil' },
            { kr: '늦을 뻔했어요', cz: 'Málem jsem přišel pozdě' },
            { kr: '잊을 뻔했어요', cz: 'Málem jsem zapomněl' }
        ]
    },
    isWeekend: true,
    isTest: false
};

// Den 204: NE 23.8.2026 - Diagnostika
export const day204: KoreanDayData = {
    day: 204,
    date: 'NE 23.8.2026',
    title: '🔍 Diagnostika',
    vocab: [
        { kr: '확인하다', cz: 'kontrolovat' },
        { kr: '점검하다', cz: 'prohlížet' },
        { kr: '검사하다', cz: 'testovat' },
        { kr: '발견하다', cz: 'objevit' },
        { kr: '분석하다', cz: 'analyzovat' },
        { kr: '측정하다', cz: 'měřit' },
        { kr: '기록하다', cz: 'zapisovat' },
        { kr: '보고하다', cz: 'hlásit' },
        { kr: '원인', cz: 'příčina' },
        { kr: '결과', cz: 'výsledek' }
    ],
    sentences: [
        { kr: '문제를 발견했어요', cz: 'Objevil jsem problém' },
        { kr: '원인을 분석해요', cz: 'Analyzuji příčinu' },
        { kr: '결과를 보고해요', cz: 'Hlásím výsledek' }
    ],
    isWeekend: true,
    isTest: false
};

// Den 205: PO 24.8.2026 - Opravy + Gramatika -아/어 버리다
export const day205: KoreanDayData = {
    day: 205,
    date: 'PO 24.8.2026',
    title: '🔧 Opravy',
    vocab: [
        { kr: '수리하다', cz: 'opravovat' },
        { kr: '고치다', cz: 'spravit' },
        { kr: '교체하다', cz: 'vyměnit' },
        { kr: '보수하다', cz: 'udržovat' },
        { kr: '보강하다', cz: 'vyztužit' },
        { kr: '메우다', cz: 'vyplnit' },
        { kr: '덧대다', cz: 'přidat' },
        { kr: '절단하다', cz: 'odříznout' },
        { kr: '용접하다', cz: 'svařit' },
        { kr: '페인트칠하다', cz: 'natřít' }
    ],
    grammar: {
        title: '-아/어 버리다 (úplně, bohužel)',
        explanation: 'Vyjadřuje dokončení děje (často s lítostí nebo úlevou).\n\nPoužití:\n- ㅏ/ㅗ: -아 버리다\n- ostatní: -어 버리다\n- 하다 → 해 버리다\n\n잊다 → 잊어버리다\n고장나다 → 고장나 버리다\n쓰다 → 써 버리다',
        examples: [
            { kr: '잊어버렸어요', cz: 'Úplně jsem zapomněl' },
            { kr: '고장나 버렸어요', cz: 'Úplně se to rozbilo' },
            { kr: '다 써 버렸어요', cz: 'Všechno jsem spotřeboval' },
            { kr: '끝내 버렸어요', cz: 'Už jsem to dokončil' }
        ]
    },
    isWeekend: false,
    isTest: false
};

// Den 206: ÚT 25.8.2026 - Materiálové problémy
export const day206: KoreanDayData = {
    day: 206,
    date: 'ÚT 25.8.2026',
    title: '🧱 Materiálové problémy',
    vocab: [
        { kr: '부식', cz: 'koroze' },
        { kr: '녹', cz: 'rez' },
        { kr: '썩다', cz: 'hnít' },
        { kr: '갈라지다', cz: 'praskat' },
        { kr: '벗겨지다', cz: 'loupat se' },
        { kr: '휘다', cz: 'ohýbat se' },
        { kr: '늘어나다', cz: 'natahovat se' },
        { kr: '줄어들다', cz: 'srážet se' },
        { kr: '변색', cz: 'změna barvy' },
        { kr: '탈락', cz: 'odpadávání' }
    ],
    sentences: [
        { kr: '철근이 녹슬었어요', cz: 'Výztuž zrezivěla' },
        { kr: '나무가 썩었어요', cz: 'Dřevo shnilo' },
        { kr: '페인트가 벗겨졌어요', cz: 'Barva se loupala' }
    ],
    isWeekend: false,
    isTest: false
};

// Den 207: ST 26.8.2026 - Procvičení týden 4a
export const day207: KoreanDayData = {
    day: 207,
    date: 'ST 26.8.2026',
    title: '📝 Procvičení',
    vocab: [],
    tasks: [
        'Procvičení slovíček: Problémy a opravy',
        'Procvičení gramatiky: -(으)ㄹ 뻔하다, -아/어 버리다',
        'Dialog: Hlášení problémů'
    ],
    exercises: [
        'A. Doplň korejsky:',
        '1. problém = ___',
        '2. porucha = ___',
        '3. opravovat = ___',
        '4. rez = ___',
        '',
        'B. Přelož do korejštiny:',
        '1. Málem jsem spadl.',
        '2. Úplně jsem zapomněl.',
        '3. Objevil jsem problém.'
    ],
    isWeekend: false,
    isTest: false
};

// Den 208: ČT 27.8.2026 - Konverzace: Problémy na stavbě
export const day208: KoreanDayData = {
    day: 208,
    date: 'ČT 27.8.2026',
    title: '💬 Konverzace: Problémy',
    vocab: [],
    tasks: [
        'Praktická konverzace o problémech',
        'Použití všech gramatik týdne 3-4',
        'Hlášení a řešení problémů'
    ],
    sentences: [
        { kr: '크레인이 고장났어요', cz: 'Jeřáb se porouchal' },
        { kr: '균열을 발견했어요', cz: 'Objevil jsem trhlinu' },
        { kr: '수리해야 해요', cz: 'Musíme to opravit' },
        { kr: '교체하기는 할 수 있어요', cz: 'Vyměnit to sice můžeme, ale...' },
        { kr: '다칠 뻔했어요', cz: 'Málem jsem se zranil' },
        { kr: '부품이 다 써 버렸어요', cz: 'Díly se úplně vyčerpaly' }
    ],
    isWeekend: false,
    isTest: false
};

// Den 209: PÁ 28.8.2026 - Opakování týden 4
export const day209: KoreanDayData = {
    day: 209,
    date: 'PÁ 28.8.2026',
    title: '🔄 Opakování týden 4',
    vocab: [],
    focus: [
        'Opakování 42 slov z týdne 4',
        'Problémy (12 slov)',
        'Diagnostika (10 slov)',
        'Opravy (10 slov)',
        'Materiálové problémy (10 slov)',
        'Gramatika: -(으)ㄹ 뻔하다 (málem)',
        'Gramatika: -아/어 버리다 (úplně)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// TÝDEN 5: Závěr měsíce (29.8. - 31.8.2026)
// ============================================================================

// Den 210: SO 29.8.2026 - Víkend
export const day210: KoreanDayData = {
    day: 210,
    date: 'SO 29.8.2026',
    title: '⭐ VÍKEND',
    vocab: [],
    tasks: [
        'Volný den',
        'Samostudium dle potřeby'
    ],
    isWeekend: true,
    isTest: false
};

// Den 211: NE 30.8.2026 - Finální opakování
export const day211: KoreanDayData = {
    day: 211,
    date: 'NE 30.8.2026',
    title: '🔄 Finální opakování',
    vocab: [],
    focus: [
        'Opakování všech slovíček týdne 3-4',
        'Stroje a jejich obsluha (54 slov)',
        'Problémy a opravy (42 slov)',
        'Celkem 96 slov za 2 týdny',
        '',
        'Gramatika -기는 하다 (sice... ale)',
        'Gramatika -(으)ㄹ 뻔하다 (málem)',
        'Gramatika -아/어 버리다 (úplně)'
    ],
    tasks: [
        'Příprava na měsíční test',
        'Opakování všech gramatik'
    ],
    isWeekend: true,
    isTest: false
};

// Den 212: PO 31.8.2026 - Měsíční test srpna
export const day212: KoreanDayData = {
    day: 212,
    date: 'PO 31.8.2026',
    title: '🏆 MĚSÍČNÍ TEST SRPNA',
    vocab: [],
    exercises: [
        '═══════════════════════════════════════════',
        'MĚSÍČNÍ TEST - SRPEN 2026',
        'Stavební procesy, stroje, problémy a opravy',
        '═══════════════════════════════════════════',
        '',
        'A. STAVEBNÍ PROCESY (20 bodů):',
        '1. 기초 = ___',
        '2. 거푸집 = ___',
        '3. 양생 = ___',
        '4. 배근 = ___',
        '5. 도면 = ___',
        '',
        'B. STROJE (20 bodů):',
        '1. 굴삭기 = ___',
        '2. 크레인 = ___',
        '3. 레미콘 = ___',
        '4. 지게차 = ___',
        '5. 용접기 = ___',
        '',
        'C. OPERACE STROJŮ (10 bodů):',
        '1. 운전하다 = ___',
        '2. 후진 = ___',
        '3. 안전거리 = ___',
        '',
        'D. PROBLÉMY A OPRAVY (20 bodů):',
        '1. 고장 = ___',
        '2. 균열 = ___',
        '3. 부식 = ___',
        '4. 수리하다 = ___',
        '5. 교체하다 = ___',
        '',
        'E. MĚŘENÍ A PŘESNOST (10 bodů):',
        '1. 길이 = ___',
        '2. 오차 = ___',
        '3. 수평 = ___',
        '',
        'F. GRAMATIKA (20 bodů):',
        '',
        '1. -더라도 (i kdyby):',
        '비가 ___ 일할 거예요 (prší)',
        '',
        '2. -(으)ㄹ수록 (čím víc...):',
        '배우면 ___ 어려워요 (učit se)',
        '',
        '3. -기는 하다 (sice... ale):',
        '좋___ 한데 비싸요 (dobrý)',
        '',
        '4. -(으)ㄹ 뻔하다 (málem):',
        '다칠 ___어요 (zranit se)',
        '',
        '5. -아/어 버리다 (úplně):',
        '잊어___어요 (zapomenout)',
        '',
        '═══════════════════════════════════════════',
        'PŘEKLAD DO KOREJŠTINY:',
        '═══════════════════════════════════════════',
        '',
        'G. PŘEKLAD (bonus 10 bodů):',
        '1. Budu pracovat, i kdyby pršelo.',
        '   = ___',
        '2. Čím víc cvičíš, tím jsi lepší.',
        '   = ___',
        '3. Je to sice velké, ale těžké.',
        '   = ___',
        '4. Málem jsem přišel pozdě.',
        '   = ___',
        '5. Úplně se to rozbilo.',
        '   = ___',
        '',
        '═══════════════════════════════════════════',
        'CELKEM: 100 bodů + 10 bonus',
        '═══════════════════════════════════════════'
    ],
    isWeekend: false,
    isTest: true
};

// ============================================================================
// Export
// ============================================================================

export const augustDays196to212: KoreanDayData[] = [
    day196, day197, day198, day199, day200, day201, day202,
    day203, day204, day205, day206, day207, day208, day209,
    day210, day211, day212
];

export default augustDays196to212;
