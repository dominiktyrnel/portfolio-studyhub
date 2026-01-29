/**
 * October 2026 - Korean Study Plan Data (Weeks 3-4+)
 * Month 9/10 - Level B1+ - Kontrola kvality, standardy, předání
 * Days 257-273 (15.10.2026 - 31.10.2026)
 * 
 * TŘETÍ HLAVNÍ STAVEBNÍ MĚSÍC - ČÁST 2
 * Téma: Kontrola kvality, předání a dokumentace
 * 55 slovíček, opakování všech gramatických struktur roku
 */

import type { KoreanDayData } from '../types/study-db';

// === TÝDEN 3: Kontrola kvality + Standardy (15.10.-21.10.) ===

export const day257: KoreanDayData = {
    day: 257,
    date: 'ČT 15.10.2026',
    title: '🔍 Kontrola #1',
    vocab: [
        { kr: '검사', cz: 'kontrola' },
        { kr: '점검', cz: 'prohlídka' },
        { kr: '확인', cz: 'ověření' },
        { kr: '시험', cz: 'zkouška' },
        { kr: '테스트', cz: 'test' }
    ],
    grammar: {
        title: '-아/어야 하다 (musí se)',
        explanation: 'Opakování povinnosti. Kritické pro kontrolu kvality.',
        examples: [
            { kr: '검사를 해야 해요.', cz: 'Musí se udělat kontrola.' },
            { kr: '모든 작업을 점검해야 합니다.', cz: 'Všechny práce musí být zkontrolovány.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day258: KoreanDayData = {
    day: 258,
    date: 'PÁ 16.10.2026',
    title: '✅ Kontrola #2 - Výsledky',
    vocab: [
        { kr: '합격', cz: 'prošel' },
        { kr: '불합격', cz: 'neprošel' },
        { kr: '재검사', cz: 'opakovaná kontrola' },
        { kr: '샘플', cz: 'vzorek' },
        { kr: '측정', cz: 'měření' }
    ],
    grammar: {
        title: '-(으)면 / -지 않으면 (když/pokud ne)',
        explanation: 'Podmínky kontroly a co následuje.',
        examples: [
            { kr: '합격하면 다음 단계로 가요.', cz: 'Když projde, jdeme na další fázi.' },
            { kr: '합격하지 않으면 재검사해요.', cz: 'Pokud neprojde, opakujeme kontrolu.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day259: KoreanDayData = {
    day: 259,
    date: 'SO 17.10.2026',
    title: '⭐ VÍKEND - Kontrola #3 - Dokumentace',
    vocab: [
        { kr: '기록', cz: 'záznam' },
        { kr: '보고서', cz: 'protokol' },
        { kr: '결과', cz: 'výsledek' },
        { kr: '평가', cz: 'hodnocení' },
        { kr: '판정', cz: 'rozhodnutí' }
    ],
    tasks: ['Procvičení kontrolní terminologie', 'Anki karty 검사-판정'],
    isWeekend: true,
    isTest: false
};

export const day260: KoreanDayData = {
    day: 260,
    date: 'NE 18.10.2026',
    title: '🔄 VÍKEND - Standardy #1',
    vocab: [
        { kr: '기준', cz: 'standard' },
        { kr: '규격', cz: 'specifikace' },
        { kr: '허용오차', cz: 'tolerance' },
        { kr: '품질', cz: 'kvalita' },
        { kr: '등급', cz: 'třída' }
    ],
    tasks: ['Opakování: kontrola', 'Nová slovíčka: standardy'],
    isWeekend: true,
    isTest: false
};

export const day261: KoreanDayData = {
    day: 261,
    date: 'PO 19.10.2026',
    title: '📋 Standardy #2 - Normy',
    vocab: [
        { kr: '인증', cz: 'certifikace' },
        { kr: '규정', cz: 'předpis' },
        { kr: '법규', cz: 'zákon' },
        { kr: '안전기준', cz: 'bezpečnostní norma' },
        { kr: '환경기준', cz: 'ekologická norma' }
    ],
    grammar: {
        title: '-에 따라(서) (podle)',
        explanation: 'Podle čeho se řídíme - normy, předpisy.',
        examples: [
            { kr: '규정에 따라 작업해요.', cz: 'Pracujeme podle předpisu.' },
            { kr: '안전기준에 따라서 검사해요.', cz: 'Kontrolujeme podle bezpečnostních norem.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day262: KoreanDayData = {
    day: 262,
    date: 'ÚT 20.10.2026',
    title: '📐 Standardy #3 - Dokumenty',
    vocab: [
        { kr: 'KS', cz: 'korejská norma' },
        { kr: 'ISO', cz: 'ISO' },
        { kr: '시방서', cz: 'specifikace' },
        { kr: '도면', cz: 'výkres' },
        { kr: '승인도', cz: 'schválený výkres' }
    ],
    grammar: {
        title: '-대로 (tak jak, podle)',
        explanation: 'Přesně podle výkresu, specifikace.',
        examples: [
            { kr: '도면대로 시공해요.', cz: 'Stavíme přesně podle výkresu.' },
            { kr: '시방서대로 해야 해요.', cz: 'Musí se dělat podle specifikace.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day263: KoreanDayData = {
    day: 263,
    date: 'ST 21.10.2026',
    title: '🏁 Předání #1 - Dokončení',
    vocab: [
        { kr: '준공', cz: 'dokončení' },
        { kr: '인수', cz: 'převzetí' },
        { kr: '인도', cz: 'předání' },
        { kr: '하자', cz: 'vada' },
        { kr: '보증', cz: 'záruka' }
    ],
    grammar: {
        title: '-(으)ㄴ 후에 (poté co)',
        explanation: 'Časová posloupnost při předání.',
        examples: [
            { kr: '준공 후에 인수해요.', cz: 'Po dokončení převezmeme.' },
            { kr: '검사한 후에 인도해요.', cz: 'Po kontrole předáme.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

// === TÝDEN 4: Předání + Dokumentace (22.10.-28.10.) ===

export const day264: KoreanDayData = {
    day: 264,
    date: 'ČT 22.10.2026',
    title: '🔧 Předání #2 - Záruky',
    vocab: [
        { kr: '유지보수', cz: 'údržba' },
        { kr: '하자보수기간', cz: 'záruční doba' },
        { kr: '무상보수', cz: 'bezplatná oprava' },
        { kr: '점검표', cz: 'kontrolní seznam' },
        { kr: '체크리스트', cz: 'checklist' }
    ],
    grammar: {
        title: '-동안 (během, po dobu)',
        explanation: 'Délka záruční doby.',
        examples: [
            { kr: '하자보수기간 동안 무상보수해요.', cz: 'Během záruční doby opravíme zdarma.' },
            { kr: '2년 동안 보증해요.', cz: 'Záruka platí 2 roky.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day265: KoreanDayData = {
    day: 265,
    date: 'PÁ 23.10.2026',
    title: '🏠 Předání #3 - Kolaudace',
    vocab: [
        { kr: '검수', cz: 'přejímka' },
        { kr: '사용승인', cz: 'kolaudace' },
        { kr: '준공검사', cz: 'závěrečná kontrola' },
        { kr: '완공', cz: 'dokončení' },
        { kr: '입주', cz: 'nastěhování' }
    ],
    grammar: {
        title: '-(으)면 되다 (stačí když)',
        explanation: 'Co je potřeba pro schválení.',
        examples: [
            { kr: '준공검사 합격하면 돼요.', cz: 'Stačí projít závěrečnou kontrolou.' },
            { kr: '사용승인 받으면 입주할 수 있어요.', cz: 'Po kolaudaci se můžete nastěhovat.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day266: KoreanDayData = {
    day: 266,
    date: 'SO 24.10.2026',
    title: '⭐ VÍKEND - Dokumentace #1',
    vocab: [
        { kr: '준공도서', cz: 'dokumentace skutečného provedení' },
        { kr: '사용설명서', cz: 'návod' },
        { kr: '보증서', cz: 'záruční list' },
        { kr: '유지관리매뉴얼', cz: 'provozní řád' }
    ],
    tasks: ['Procvičení předání a záruky', 'Anki karty 준공-입주'],
    isWeekend: true,
    isTest: false
};

export const day267: KoreanDayData = {
    day: 267,
    date: 'NE 25.10.2026',
    title: '🔄 VÍKEND - Dokumentace #2',
    vocab: [
        { kr: '장비목록', cz: 'seznam zařízení' },
        { kr: '자재목록', cz: 'seznam materiálů' },
        { kr: '시험성적서', cz: 'protokol zkoušek' }
    ],
    tasks: ['Opakování dokumentace', 'Tvorba vět s novými slovíčky'],
    isWeekend: true,
    isTest: false
};

export const day268: KoreanDayData = {
    day: 268,
    date: 'PO 26.10.2026',
    title: '📁 Dokumentace #3 - Archivace',
    vocab: [
        { kr: '인허가서류', cz: 'povolení' },
        { kr: '사진대장', cz: 'fotodokumentace' },
        { kr: '공사일지', cz: 'stavební deník' }
    ],
    grammar: {
        title: '-아/어 놓다 (udělat předem a nechat)',
        explanation: 'Dokumenty připravené k archivaci.',
        examples: [
            { kr: '사진대장을 정리해 놓았어요.', cz: 'Připravil jsem fotodokumentaci.' },
            { kr: '공사일지를 써 놓으세요.', cz: 'Napište stavební deník (a nechte ho).' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day269: KoreanDayData = {
    day: 269,
    date: 'ÚT 27.10.2026',
    title: '📝 Opakování - Kontrola kvality',
    vocab: [],
    tasks: [
        'Opakování: kontrola (검사, 점검, 확인, 시험, 테스트)',
        'Opakování: výsledky (합격, 불합격, 재검사, 샘플, 측정)',
        'Opakování: dokumentace (기록, 보고서, 결과, 평가, 판정)',
        'Procvičení vět s kontrolní terminologií'
    ],
    grammar: {
        title: '-(으)ㄴ/는지 확인하다 (zkontrolovat jestli)',
        explanation: 'Ověření stavu nebo kvality.',
        examples: [
            { kr: '합격했는지 확인해요.', cz: 'Kontroluji, jestli prošel.' },
            { kr: '품질이 좋은지 검사해요.', cz: 'Zkoumám, jestli je kvalita dobrá.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day270: KoreanDayData = {
    day: 270,
    date: 'ST 28.10.2026',
    title: '🇨🇿 Státní svátek - Opakování standardů',
    vocab: [],
    tasks: [
        'Opakování: základní standardy (기준, 규격, 허용오차, 품질, 등급)',
        'Opakování: normy (인증, 규정, 법규, 안전기준, 환경기준)',
        'Opakování: dokumenty (KS, ISO, 시방서, 도면, 승인도)',
        'Mini-test: standardy a normy'
    ],
    notes: ['28. říjen - Den vzniku samostatného československého státu'],
    isWeekend: false,
    isTest: false
};

// === TÝDEN 5: Finále října (29.10.-31.10.) ===

export const day271: KoreanDayData = {
    day: 271,
    date: 'ČT 29.10.2026',
    title: '📝 Opakování - Předání',
    vocab: [],
    tasks: [
        'Opakování: dokončení (준공, 인수, 인도, 하자, 보증)',
        'Opakování: záruky (유지보수, 하자보수기간, 무상보수)',
        'Opakování: kolaudace (검수, 사용승인, 준공검사, 완공, 입주)',
        'Procvičení předávacích dialogů'
    ],
    grammar: {
        title: '-기로 하다 (rozhodnout se)',
        explanation: 'Rozhodnutí při předání.',
        examples: [
            { kr: '내일 인수하기로 했어요.', cz: 'Rozhodli jsme se převzít zítra.' },
            { kr: '하자를 보수하기로 합의했어요.', cz: 'Dohodli jsme se na opravě vad.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day272: KoreanDayData = {
    day: 272,
    date: 'PÁ 30.10.2026',
    title: '📝 Opakování - Dokumentace',
    vocab: [],
    tasks: [
        'Opakování: hlavní dokumenty (준공도서, 사용설명서, 보증서)',
        'Opakování: seznamy (장비목록, 자재목록, 시험성적서)',
        'Opakování: archivace (인허가서류, 사진대장, 공사일지)',
        'Příprava na měsíční test'
    ],
    grammar: {
        title: '-아/어 주다 (udělat pro někoho)',
        explanation: 'Příprava dokumentů pro zákazníka.',
        examples: [
            { kr: '사용설명서를 준비해 줄게요.', cz: 'Připravím vám návod.' },
            { kr: '보증서를 발급해 드릴게요.', cz: 'Vystavím vám záruční list.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day273: KoreanDayData = {
    day: 273,
    date: 'SO 31.10.2026',
    title: '🏆 MĚSÍČNÍ TEST - ŘÍJEN',
    vocab: [],
    exercises: [
        '=== MĚSÍČNÍ TEST ŘÍJNA ===',
        '=== Stavební profese + Kontrola kvality + Předání ===',
        '',
        'A. STAVEBNÍ PROFESE (25 bodů)',
        '1. stavbyvedoucí = 현장소장',
        '2. geodet = 측량사',
        '3. tesař = 목수',
        '4. železář = 철근공',
        '5. instalatér = 배관공',
        '6. elektrikář = 전기공',
        '7. malíř = 도장공',
        '8. obkladač = 타일공',
        '9. svářeč = 용접공',
        '10. lešenář = 비계공',
        '',
        'B. DOKONČOVACÍ PRÁCE (20 bodů)',
        '1. omítka = 미장',
        '2. základní nátěr = 하도',
        '3. sádrokarton = 석고보드',
        '4. dlažba = 바닥타일',
        '5. spárování = 줄눈',
        '6. parkety = 마루',
        '7. lak = 락카',
        '8. hydroizolace = 방수',
        '',
        'C. KONTROLA KVALITY (20 bodů)',
        '1. kontrola = 검사',
        '2. prohlídka = 점검',
        '3. prošel = 합격',
        '4. neprošel = 불합격',
        '5. vzorek = 샘플',
        '6. protokol = 보고서',
        '7. standard = 기준',
        '8. tolerance = 허용오차',
        '',
        'D. PŘEDÁNÍ A DOKUMENTACE (20 bodů)',
        '1. dokončení = 준공',
        '2. převzetí = 인수',
        '3. předání = 인도',
        '4. vada = 하자',
        '5. záruka = 보증',
        '6. kolaudace = 사용승인',
        '7. záruční list = 보증서',
        '8. stavební deník = 공사일지',
        '',
        'E. PŘEKLAD VĚT (15 bodů)',
        '1. Musí se udělat kontrola.',
        '   = 검사를 해야 해요.',
        '2. Pracujeme podle předpisu.',
        '   = 규정에 따라 작업해요.',
        '3. Po dokončení převezmeme.',
        '   = 준공 후에 인수해요.',
        '4. Během záruční doby opravíme zdarma.',
        '   = 하자보수기간 동안 무상보수해요.',
        '5. Připravím vám návod.',
        '   = 사용설명서를 준비해 줄게요.',
        '',
        '=== CELKEM: 100 bodů ==='
    ],
    isWeekend: true,
    isTest: true
};

// Export all days for October weeks 3-4+
export const octoberDays257to273: KoreanDayData[] = [
    day257, day258, day259, day260, day261, day262, day263,
    day264, day265, day266, day267, day268, day269, day270,
    day271, day272, day273
];

export default octoberDays257to273;
