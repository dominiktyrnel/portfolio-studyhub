/**
 * SRPEN 2026 - TÝDEN 1-2 (DNY 182-195)
 * Month 7/10 - STAVBA #2: Stavební procesy a měření
 * 
 * 1.8.2026 - 14.8.2026
 * 115 slov, 4 gramatické struktury
 * 
 * BEZ ANGLIČTINY - pouze 한국어 + Česky
 */

import type { KoreanDayData } from '../types/study-db';

// ============================================================================
// TÝDEN 1: Stavební procesy (1.8. - 7.8.2026)
// ============================================================================

// Den 182: SO 1.8.2026 - Kopání a základy + Gramatika -더라도
export const day182: KoreanDayData = {
    day: 182,
    date: 'SO 1.8.2026',
    title: '⛏️ Kopání a základy',
    vocab: [
        { kr: '파다', cz: 'kopat' },
        { kr: '굴착하다', cz: 'hloubit' },
        { kr: '기초', cz: 'základy' },
        { kr: '터파기', cz: 'výkop' },
        { kr: '되메우기', cz: 'zásyp' },
        { kr: '다짐', cz: 'hutnění' },
        { kr: '잡석', cz: 'drť' },
        { kr: '버림콘크리트', cz: 'podkladní beton' },
        { kr: '지반', cz: 'podloží' },
        { kr: '토사', cz: 'zemina' },
        { kr: '굴착기', cz: 'bagr' },
        { kr: '덤프트럭', cz: 'sklápěč' }
    ],
    grammar: {
        title: '-더라도 (i kdyby)',
        explanation: 'Vyjadřuje hypotetickou podmínku.\n\n비가 와도 일해요 (Pracuji, i když prší) - skutečnost\n비가 오더라도 일할 거예요 (Budu pracovat, i kdyby pršelo) - hypotéza\n\nPoužití: Kmen + 더라도',
        examples: [
            { kr: '비가 오더라도 일할 거예요', cz: 'Budu pracovat, i kdyby pršelo' },
            { kr: '시간이 없더라도 해야 해요', cz: 'Musíš to udělat, i kdybys neměl čas' },
            { kr: '힘들더라도 끝까지 해요', cz: 'I kdyby to bylo těžké, dokončíme to' },
            { kr: '비싸더라도 사야 해요', cz: 'I kdyby to bylo drahé, musíme to koupit' }
        ]
    },
    isWeekend: true,
    isTest: false
};

// Den 183: NE 2.8.2026 - Betonáž
export const day183: KoreanDayData = {
    day: 183,
    date: 'NE 2.8.2026',
    title: '🧱 Betonáž',
    vocab: [
        { kr: '콘크리트 치다', cz: 'betonovat' },
        { kr: '타설', cz: 'lití betonu' },
        { kr: '진동다짐', cz: 'vibrování' },
        { kr: '양생', cz: 'ošetřování' },
        { kr: '거푸집', cz: 'bednění' },
        { kr: '동바리', cz: 'stojky' },
        { kr: '합판', cz: 'překližka' },
        { kr: '박리제', cz: 'odbedňovací olej' },
        { kr: '레미콘', cz: 'mixér' },
        { kr: '펌프카', cz: 'čerpadlo' },
        { kr: '슬럼프', cz: 'slump' },
        { kr: '강도시험', cz: 'zkouška pevnosti' }
    ],
    sentences: [
        { kr: '콘크리트를 쳐요', cz: 'Betonuji' },
        { kr: '거푸집을 설치해요', cz: 'Instaluji bednění' },
        { kr: '진동다짐을 해요', cz: 'Provádím vibrování' }
    ],
    isWeekend: true,
    isTest: false
};

// Den 184: PO 3.8.2026 - Zdění + Gramatika -(으)ㄹ수록
export const day184: KoreanDayData = {
    day: 184,
    date: 'PO 3.8.2026',
    title: '🧱 Zdění',
    vocab: [
        { kr: '쌓다', cz: 'zdít' },
        { kr: '벽돌쌓기', cz: 'zdění' },
        { kr: '블록쌓기', cz: 'kladení tvárnic' },
        { kr: '줄눈', cz: 'spárování' },
        { kr: '모르타르', cz: 'malta' },
        { kr: '수평', cz: 'vodorovně' },
        { kr: '수직', cz: 'svisle' },
        { kr: '줄', cz: 'šňůra' },
        { kr: '흙손', cz: 'zednická lžíce' },
        { kr: '고무망치', cz: 'gumová palice' },
        { kr: '스페이서', cz: 'distanční' },
        { kr: '보강철물', cz: 'výztuž' }
    ],
    grammar: {
        title: '-(으)ㄹ수록 (čím víc... tím víc)',
        explanation: 'Vyjadřuje stupňování - čím více A, tím více B.\n\nPoužití:\n- Po samohlásce/ㄹ: -ㄹ수록\n- Po souhlásce: -을수록\n\n배우다 → 배울수록\n먹다 → 먹을수록',
        examples: [
            { kr: '배우면 배울수록 어려워요', cz: 'Čím víc se učím, tím je to těžší' },
            { kr: '연습하면 할수록 좋아져요', cz: 'Čím víc cvičíš, tím jsi lepší' },
            { kr: '생각할수록 모르겠어요', cz: 'Čím víc o tom přemýšlím, tím méně chápu' },
            { kr: '볼수록 예뻐요', cz: 'Čím víc se dívám, tím je hezčí' }
        ]
    },
    isWeekend: false,
    isTest: false
};

// Den 185: ÚT 4.8.2026 - Tesařské práce
export const day185: KoreanDayData = {
    day: 185,
    date: 'ÚT 4.8.2026',
    title: '🪵 Tesařské práce',
    vocab: [
        { kr: '짜다', cz: 'sestavovat' },
        { kr: '조립하다', cz: 'montovat' },
        { kr: '설치하다', cz: 'instalovat' },
        { kr: '고정하다', cz: 'upevňovat' },
        { kr: '거푸집공사', cz: 'bednicí práce' },
        { kr: '지붕공사', cz: 'střešní práce' },
        { kr: '트러스', cz: 'příhradový nosník' },
        { kr: '서까래', cz: 'krokev' },
        { kr: '대들보', cz: 'vazník' },
        { kr: '도리', cz: 'pozednice' },
        { kr: '각재', cz: 'hranoly' },
        { kr: '판재', cz: 'desky' }
    ],
    sentences: [
        { kr: '트러스를 조립해요', cz: 'Montuji příhradový nosník' },
        { kr: '서까래를 설치해요', cz: 'Instaluji krokve' },
        { kr: '거푸집을 짜요', cz: 'Sestavuji bednění' }
    ],
    isWeekend: false,
    isTest: false
};

// Den 186: ST 5.8.2026 - Železářské práce
export const day186: KoreanDayData = {
    day: 186,
    date: 'ST 5.8.2026',
    title: '🔩 Železářské práce',
    vocab: [
        { kr: '배근', cz: 'armování' },
        { kr: '결속', cz: 'vázání' },
        { kr: '간격', cz: 'rozteč' },
        { kr: '피복', cz: 'krytí' },
        { kr: '주근', cz: 'hlavní výztuž' },
        { kr: '배력근', cz: 'rozdělovací výztuž' },
        { kr: '스터럽', cz: 'třmínky' },
        { kr: '철근가공', cz: 'zpracování výztuže' },
        { kr: '절단', cz: 'řezání' },
        { kr: '절곡', cz: 'ohýbání' },
        { kr: '용접', cz: 'svařování' },
        { kr: '이음', cz: 'napojení' }
    ],
    sentences: [
        { kr: '철근을 배근해요', cz: 'Armuji výztuž' },
        { kr: '간격을 확인해요', cz: 'Kontroluji rozteč' },
        { kr: '스터럽을 결속해요', cz: 'Vážu třmínky' }
    ],
    isWeekend: false,
    isTest: false
};

// Den 187: ČT 6.8.2026 - Procvičení týden 1a
export const day187: KoreanDayData = {
    day: 187,
    date: 'ČT 6.8.2026',
    title: '📝 Procvičení',
    vocab: [],
    tasks: [
        'Procvičení slovíček: Kopání, betonáž, zdění',
        'Procvičení gramatiky: -더라도, -(으)ㄹ수록',
        'Dialog: Práce na základech'
    ],
    exercises: [
        'A. Doplň korejsky:',
        '1. kopat = ___',
        '2. bednění = ___',
        '3. malta = ___',
        '4. armování = ___',
        '',
        'B. Přelož do korejštiny:',
        '1. Musíš to udělat, i kdybys neměl čas.',
        '2. Čím víc cvičíš, tím jsi lepší.',
        '3. Instaluji bednění.'
    ],
    isWeekend: false,
    isTest: false
};

// Den 188: PÁ 7.8.2026 - Opakování týden 1
export const day188: KoreanDayData = {
    day: 188,
    date: 'PÁ 7.8.2026',
    title: '🔄 Opakování týden 1',
    vocab: [],
    focus: [
        'Opakování 60 slov z týdne 1',
        'Kopání a základy (12 slov)',
        'Betonáž (12 slov)',
        'Zdění (12 slov)',
        'Tesařské práce (12 slov)',
        'Železářské práce (12 slov)',
        'Gramatika: -더라도 (i kdyby)',
        'Gramatika: -(으)ㄹ수록 (čím víc... tím víc)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// TÝDEN 2: Měření a výkresy (8.8. - 14.8.2026)
// ============================================================================

// Den 189: SO 8.8.2026 - Měření + Gramatika -든지
export const day189: KoreanDayData = {
    day: 189,
    date: 'SO 8.8.2026',
    title: '📏 Měření',
    vocab: [
        { kr: '측정하다', cz: 'měřit' },
        { kr: '재다', cz: 'měřit' },
        { kr: '길이', cz: 'délka' },
        { kr: '높이', cz: 'výška' },
        { kr: '너비', cz: 'šířka' },
        { kr: '깊이', cz: 'hloubka' },
        { kr: '면적', cz: 'plocha' },
        { kr: '부피', cz: 'objem' },
        { kr: '각도', cz: 'úhel' },
        { kr: '경사', cz: 'sklon' },
        { kr: '직경', cz: 'průměr' },
        { kr: '반지름', cz: 'poloměr' }
    ],
    grammar: {
        title: '-든지 (ať už, cokoliv)',
        explanation: 'Vyjadřuje libovolnou volbu - cokoliv, kdokoliv, kdykoliv.\n\nPoužití: Kmen + 든지\n\n뭐 → 뭐든지 (cokoliv)\n언제 → 언제든지 (kdykoliv)\n어디 → 어디든지 (kdekoliv)',
        examples: [
            { kr: '뭐든지 좋아요', cz: 'Cokoliv je dobré' },
            { kr: '언제든지 연락하세요', cz: 'Ozvi se kdykoliv' },
            { kr: '어디든지 갈게요', cz: 'Půjdu kamkoliv' },
            { kr: '누구든지 올 수 있어요', cz: 'Kdokoliv může přijít' }
        ]
    },
    isWeekend: true,
    isTest: false
};

// Den 190: NE 9.8.2026 - Výkresy
export const day190: KoreanDayData = {
    day: 190,
    date: 'NE 9.8.2026',
    title: '📐 Výkresy',
    vocab: [
        { kr: '도면', cz: 'výkres' },
        { kr: '설계도', cz: 'projektová dokumentace' },
        { kr: '평면도', cz: 'půdorys' },
        { kr: '입면도', cz: 'pohled' },
        { kr: '단면도', cz: 'řez' },
        { kr: '상세도', cz: 'detail' },
        { kr: '배치도', cz: 'situace' },
        { kr: '시공도', cz: 'realizační výkres' },
        { kr: '준공도', cz: 'dokumentace skutečného provedení' },
        { kr: '스케일', cz: 'měřítko' }
    ],
    sentences: [
        { kr: '도면을 확인해요', cz: 'Kontroluji výkres' },
        { kr: '평면도를 봐요', cz: 'Dívám se na půdorys' },
        { kr: '스케일이 뭐예요?', cz: 'Jaké je měřítko?' }
    ],
    isWeekend: true,
    isTest: false
};

// Den 191: PO 10.8.2026 - Rozměry + Gramatika -다가
export const day191: KoreanDayData = {
    day: 191,
    date: 'PO 10.8.2026',
    title: '📏 Rozměry',
    vocab: [
        { kr: '밀리미터', cz: 'milimetr' },
        { kr: '센티미터', cz: 'centimetr' },
        { kr: '미터', cz: 'metr' },
        { kr: '제곱미터', cz: 'metr čtvereční' },
        { kr: '세제곱미터', cz: 'metr krychlový' },
        { kr: '킬로그램', cz: 'kilogram' },
        { kr: '톤', cz: 'tuna' },
        { kr: '리터', cz: 'litr' },
        { kr: '퍼센트', cz: 'procento' },
        { kr: '기준점', cz: 'referenční bod' }
    ],
    grammar: {
        title: '-다가 (a pak, během)',
        explanation: 'Vyjadřuje přerušení činnosti nebo změnu.\n\nPoužití: Kmen + 다가\n\n일하다 → 일하다가\n가다 → 가다가\n공부하다 → 공부하다가',
        examples: [
            { kr: '일하다가 쉬어요', cz: 'Pracuji a pak odpočívám' },
            { kr: '가다가 멈췄어요', cz: 'Šel jsem a zastavil se' },
            { kr: '공부하다가 잠들었어요', cz: 'Studoval jsem a usnul' },
            { kr: '먹다가 전화가 왔어요', cz: 'Jedl jsem a pak zazvonil telefon' }
        ]
    },
    isWeekend: false,
    isTest: false
};

// Den 192: ÚT 11.8.2026 - Přesnost
export const day192: KoreanDayData = {
    day: 192,
    date: 'ÚT 11.8.2026',
    title: '🎯 Přesnost',
    vocab: [
        { kr: '정확하다', cz: 'přesný' },
        { kr: '맞다', cz: 'souhlasit' },
        { kr: '틀리다', cz: 'nesouhlasit' },
        { kr: '오차', cz: 'odchylka' },
        { kr: '허용오차', cz: 'tolerance' },
        { kr: '수평', cz: 'vodorovně' },
        { kr: '수직', cz: 'svisle' },
        { kr: '직각', cz: 'pravý úhel' },
        { kr: '기울기', cz: 'sklon' },
        { kr: '평행', cz: 'rovnoběžně' },
        { kr: '대칭', cz: 'symetricky' }
    ],
    sentences: [
        { kr: '치수가 맞아요', cz: 'Rozměry souhlasí' },
        { kr: '수평이에요', cz: 'Je to vodorovné' },
        { kr: '오차가 있어요', cz: 'Je tam odchylka' }
    ],
    isWeekend: false,
    isTest: false
};

// Den 193: ST 12.8.2026 - Procvičení týden 2a
export const day193: KoreanDayData = {
    day: 193,
    date: 'ST 12.8.2026',
    title: '📝 Procvičení',
    vocab: [],
    tasks: [
        'Procvičení slovíček: Měření, výkresy, rozměry',
        'Procvičení gramatiky: -든지, -다가',
        'Dialog: Čtení výkresů'
    ],
    exercises: [
        'A. Doplň korejsky:',
        '1. délka = ___',
        '2. půdorys = ___',
        '3. metr = ___',
        '4. přesný = ___',
        '',
        'B. Přelož do korejštiny:',
        '1. Ozvi se kdykoliv.',
        '2. Pracuji a pak odpočívám.',
        '3. Jaké je měřítko?'
    ],
    isWeekend: false,
    isTest: false
};

// Den 194: ČT 13.8.2026 - Konverzace: Na stavbě
export const day194: KoreanDayData = {
    day: 194,
    date: 'ČT 13.8.2026',
    title: '💬 Konverzace: Na stavbě',
    vocab: [],
    tasks: [
        'Praktická konverzace na stavbě',
        'Použití všech gramatik týdne 1-2',
        'Popis stavebních procesů'
    ],
    sentences: [
        { kr: '기초 공사가 끝났어요', cz: 'Základy jsou hotové' },
        { kr: '도면을 보여 주세요', cz: 'Ukažte mi výkres' },
        { kr: '치수가 맞는지 확인해요', cz: 'Kontroluji, jestli souhlasí rozměry' },
        { kr: '비가 오더라도 일해요', cz: 'Pracujeme, i kdyby pršelo' },
        { kr: '연습하면 할수록 좋아져요', cz: 'Čím víc cvičíte, tím lepší jste' },
        { kr: '문제가 있으면 언제든지 말해요', cz: 'Když je problém, řekni kdykoliv' }
    ],
    isWeekend: false,
    isTest: false
};

// Den 195: PÁ 14.8.2026 - Opakování týden 1-2
export const day195: KoreanDayData = {
    day: 195,
    date: 'PÁ 14.8.2026',
    title: '🔄 OPAKOVÁNÍ TÝDEN 1-2',
    vocab: [],
    focus: [
        'Celkem 115 slov za 2 týdny',
        'Týden 1: Stavební procesy (60 slov)',
        'Týden 2: Měření a výkresy (55 slov)',
        'Gramatika: -더라도 (i kdyby)',
        'Gramatika: -(으)ㄹ수록 (čím víc... tím víc)',
        'Gramatika: -든지 (cokoliv, kdykoliv)',
        'Gramatika: -다가 (a pak, během)'
    ],
    exercises: [
        'MINI TEST - TÝDEN 1-2:',
        '',
        'A. SLOVÍČKA (50 bodů):',
        '1. 기초 = ___',
        '2. 거푸집 = ___',
        '3. 모르타르 = ___',
        '4. 배근 = ___',
        '5. 도면 = ___',
        '',
        'B. GRAMATIKA (50 bodů):',
        '1. ___ 오더라도 일할 거예요 (비)',
        '2. 배우면 ___ 어려워요 (배울)',
        '3. ___ 좋아요 (뭐)',
        '4. 일하___ 쉬어요 (-다가)',
        '',
        'C. PŘEKLAD:',
        '1. Kontroluji výkres = ___',
        '2. Je to vodorovné = ___',
        '3. Rozměry souhlasí = ___'
    ],
    isWeekend: false,
    isTest: true
};

// ============================================================================
// Export
// ============================================================================

export const augustDays182to195: KoreanDayData[] = [
    day182, day183, day184, day185, day186, day187, day188,
    day189, day190, day191, day192, day193, day194, day195
];

export default augustDays182to195;
