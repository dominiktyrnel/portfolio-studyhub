/**
 * September 2026 - Korean Study Plan Data (PART 2)
 * Days 227-242 (15.9.2026 - 30.9.2026)
 * Month 8/10 - Level B1 - Smlouvy, Finance, Stavební dokumenty
 * 
 * AGENT 8B - ZÁŘÍ TÝDEN 3-4
 */

import type { KoreanDayData } from '../types/study-db';

// ============================================================
// TÝDEN 3: Smlouvy a Finance (15.9. - 21.9.2026)
// ============================================================

// DEN 227 - ÚT 15.9.2026 - Smlouvy #1
export const day227: KoreanDayData = {
    day: 227,
    date: 'ÚT 15.9.2026',
    title: '📝 Smlouvy #1',
    vocab: [
        { kr: '계약', cz: 'smlouva' },
        { kr: '조건', cz: 'podmínky' },
        { kr: '조항', cz: 'článek' },
        { kr: '기간', cz: 'období' },
        { kr: '금액', cz: 'částka' }
    ],
    grammar: {
        title: '-(으)ㄴ/는 바와 같이 (jak bylo uvedeno)',
        explanation: 'Formální výraz pro odkazování na dřívější informace. Používá se ve smlouvách a oficiálních dokumentech.',
        examples: [
            { kr: '계약서에 명시된 바와 같이', cz: 'Jak je uvedeno ve smlouvě' },
            { kr: '위에서 언급한 바와 같이', cz: 'Jak bylo výše zmíněno' }
        ]
    },
    sentences: [
        { kr: '계약 조건을 확인해 주세요.', cz: 'Zkontrolujte podmínky smlouvy.' },
        { kr: '계약 기간은 1년입니다.', cz: 'Období smlouvy je 1 rok.' },
        { kr: '금액이 맞는지 확인하세요.', cz: 'Zkontrolujte, zda je částka správná.' }
    ],
    isWeekend: false,
    isTest: false
};

// DEN 228 - ST 16.9.2026 - Smlouvy #2
export const day228: KoreanDayData = {
    day: 228,
    date: 'ST 16.9.2026',
    title: '📝 Smlouvy #2',
    vocab: [
        { kr: '위약금', cz: 'penále' },
        { kr: '해지', cz: 'ukončení' },
        { kr: '연장', cz: 'prodloužení' },
        { kr: '서명', cz: 'podpis' },
        { kr: '도장', cz: 'razítko' }
    ],
    sentences: [
        { kr: '위약금이 발생합니다.', cz: 'Vznikne penále.' },
        { kr: '계약 해지를 원합니다.', cz: 'Chci ukončit smlouvu.' },
        { kr: '계약 연장이 가능합니까?', cz: 'Je možné prodloužit smlouvu?' },
        { kr: '여기에 서명해 주세요.', cz: 'Podepište zde prosím.' },
        { kr: '도장이 필요합니다.', cz: 'Je potřeba razítko.' }
    ],
    isWeekend: false,
    isTest: false
};

// DEN 229 - ČT 17.9.2026 - Smlouvy #3
export const day229: KoreanDayData = {
    day: 229,
    date: 'ČT 17.9.2026',
    title: '📝 Smlouvy #3',
    vocab: [
        { kr: '원본', cz: 'originál' },
        { kr: '사본', cz: 'kopie' },
        { kr: '당사자', cz: 'strana' },
        { kr: '갑', cz: 'strana A (objednatel)' },
        { kr: '을', cz: 'strana B (dodavatel)' }
    ],
    sentences: [
        { kr: '원본을 보내 주세요.', cz: 'Pošlete originál prosím.' },
        { kr: '사본으로 충분합니다.', cz: 'Stačí kopie.' },
        { kr: '갑과 을이 합의했습니다.', cz: 'Strana A a B se dohodly.' },
        { kr: '양 당사자가 서명해야 합니다.', cz: 'Obě strany musí podepsat.' }
    ],
    isWeekend: false,
    isTest: false
};

// DEN 230 - PÁ 18.9.2026 - Smlouvy #4
export const day230: KoreanDayData = {
    day: 230,
    date: 'PÁ 18.9.2026',
    title: '📝 Smlouvy #4',
    vocab: [
        { kr: '효력', cz: 'platnost' },
        { kr: '만료', cz: 'expirace' },
        { kr: '갱신', cz: 'obnovení' },
        { kr: '변경', cz: 'změna' },
        { kr: '추가', cz: 'dodatek' }
    ],
    grammar: {
        title: '-(으)로 인해 (kvůli)',
        explanation: 'Formální výraz pro vyjádření příčiny. Používá se v oficiálních dokumentech.',
        examples: [
            { kr: '날씨로 인해 공사가 지연됐습니다.', cz: 'Kvůli počasí se stavba opozdila.' },
            { kr: '계약 변경으로 인해 추가 비용이 발생했습니다.', cz: 'Kvůli změně smlouvy vznikly dodatečné náklady.' }
        ]
    },
    sentences: [
        { kr: '계약이 효력을 발생합니다.', cz: 'Smlouva nabývá platnosti.' },
        { kr: '계약 만료일이 언제입니까?', cz: 'Kdy je datum expirace smlouvy?' },
        { kr: '계약 갱신을 요청합니다.', cz: 'Žádám o obnovení smlouvy.' },
        { kr: '변경 사항이 있습니다.', cz: 'Jsou zde změny.' }
    ],
    isWeekend: false,
    isTest: false
};

// DEN 231 - SO 19.9.2026 - Finance #1
export const day231: KoreanDayData = {
    day: 231,
    date: 'SO 19.9.2026',
    title: '💰 Finance #1',
    vocab: [
        { kr: '비용', cz: 'náklady' },
        { kr: '견적', cz: 'nabídka/cenová kalkulace' },
        { kr: '예산', cz: 'rozpočet' },
        { kr: '지불', cz: 'platba' },
        { kr: '입금', cz: 'příjem/vklad' }
    ],
    sentences: [
        { kr: '비용이 얼마입니까?', cz: 'Kolik jsou náklady?' },
        { kr: '견적서를 보내 주세요.', cz: 'Pošlete cenovou nabídku.' },
        { kr: '예산 초과입니다.', cz: 'Je to nad rozpočet.' },
        { kr: '지불 방법이 뭐예요?', cz: 'Jaký je způsob platby?' },
        { kr: '입금 확인됐습니다.', cz: 'Platba byla přijata.' }
    ],
    isWeekend: true,
    isTest: false
};

// DEN 232 - NE 20.9.2026 - Finance #2
export const day232: KoreanDayData = {
    day: 232,
    date: 'NE 20.9.2026',
    title: '💰 Finance #2',
    vocab: [
        { kr: '송금', cz: 'převod' },
        { kr: '잔액', cz: 'zůstatek' },
        { kr: '세금', cz: 'daň' },
        { kr: '부가세', cz: 'DPH' },
        { kr: '할인', cz: 'sleva' }
    ],
    sentences: [
        { kr: '송금해 주세요.', cz: 'Převeďte prosím.' },
        { kr: '잔액이 부족합니다.', cz: 'Zůstatek je nedostatečný.' },
        { kr: '세금 포함 가격입니다.', cz: 'Cena včetně daně.' },
        { kr: '부가세 별도입니다.', cz: 'DPH zvlášť.' },
        { kr: '할인 가능합니까?', cz: 'Je možná sleva?' }
    ],
    isWeekend: true,
    isTest: false
};

// DEN 233 - PO 21.9.2026 - Finance #3
export const day233: KoreanDayData = {
    day: 233,
    date: 'PO 21.9.2026',
    title: '💰 Finance #3',
    vocab: [
        { kr: '수수료', cz: 'poplatek' },
        { kr: '이자', cz: 'úrok' },
        { kr: '대금', cz: 'cena/úhrada' },
        { kr: '선금', cz: 'záloha' },
        { kr: '잔금', cz: 'doplatek' }
    ],
    grammar: {
        title: '-(으)ㄹ 경우 (v případě že)',
        explanation: 'Formální podmínkový výraz pro dokumenty a smlouvy.',
        examples: [
            { kr: '지불이 늦을 경우 위약금이 발생합니다.', cz: 'V případě pozdní platby vznikne penále.' },
            { kr: '문제가 있을 경우 연락해 주세요.', cz: 'V případě problémů nás kontaktujte.' }
        ]
    },
    sentences: [
        { kr: '수수료가 얼마예요?', cz: 'Kolik je poplatek?' },
        { kr: '이자율이 높습니다.', cz: 'Úroková sazba je vysoká.' },
        { kr: '대금을 지불해 주세요.', cz: 'Uhraďte prosím platbu.' },
        { kr: '선금 30%를 보내 주세요.', cz: 'Pošlete 30% zálohu.' },
        { kr: '잔금은 완료 후 지불합니다.', cz: 'Doplatek uhradíme po dokončení.' }
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================
// TÝDEN 4: Stavební dokumenty a Reporting (22.9. - 30.9.2026)
// ============================================================

// DEN 234 - ÚT 22.9.2026 - Stavební dokumenty #1
export const day234: KoreanDayData = {
    day: 234,
    date: 'ÚT 22.9.2026',
    title: '📋 Stavební dokumenty #1',
    vocab: [
        { kr: '공사계약서', cz: 'smlouva o dílo' },
        { kr: '작업지시서', cz: 'pracovní příkaz' },
        { kr: '안전관리계획서', cz: 'plán bezpečnosti' },
        { kr: '품질검사서', cz: 'protokol kontroly kvality' }
    ],
    sentences: [
        { kr: '공사계약서를 확인해 주세요.', cz: 'Zkontrolujte smlouvu o dílo.' },
        { kr: '작업지시서대로 진행하세요.', cz: 'Postupujte podle pracovního příkazu.' },
        { kr: '안전관리계획서가 필요합니다.', cz: 'Je potřeba plán bezpečnosti.' },
        { kr: '품질검사서를 제출하세요.', cz: 'Odevzdejte protokol kontroly kvality.' }
    ],
    isWeekend: false,
    isTest: false
};

// DEN 235 - ST 23.9.2026 - Stavební dokumenty #2
export const day235: KoreanDayData = {
    day: 235,
    date: 'ST 23.9.2026',
    title: '📋 Stavební dokumenty #2',
    vocab: [
        { kr: '시방서', cz: 'technické specifikace' },
        { kr: '공정표', cz: 'harmonogram prací' },
        { kr: '준공검사', cz: 'kolaudace' },
        { kr: '하자보수', cz: 'záruční opravy' }
    ],
    sentences: [
        { kr: '시방서를 따라 시공하세요.', cz: 'Stavte podle technických specifikací.' },
        { kr: '공정표대로 진행되고 있습니까?', cz: 'Pokračuje se podle harmonogramu?' },
        { kr: '준공검사 날짜가 언제입니까?', cz: 'Kdy je termín kolaudace?' },
        { kr: '하자보수 기간은 2년입니다.', cz: 'Období záručních oprav je 2 roky.' }
    ],
    isWeekend: false,
    isTest: false
};

// DEN 236 - ČT 24.9.2026 - Stavební dokumenty #3
export const day236: KoreanDayData = {
    day: 236,
    date: 'ČT 24.9.2026',
    title: '📋 Stavební dokumenty #3',
    vocab: [
        { kr: '인수인계', cz: 'předání' },
        { kr: '설계변경', cz: 'změna projektu' }
    ],
    grammar: {
        title: '-에 따라 (podle)',
        explanation: 'Vyjadřuje soulad s něčím, následování pravidel nebo dokumentů.',
        examples: [
            { kr: '설계도에 따라 시공하세요.', cz: 'Stavte podle projektové dokumentace.' },
            { kr: '계획에 따라 진행합니다.', cz: 'Postupujeme podle plánu.' }
        ]
    },
    sentences: [
        { kr: '인수인계 서류를 준비하세요.', cz: 'Připravte dokumenty k předání.' },
        { kr: '설계변경이 필요합니다.', cz: 'Je potřeba změna projektu.' },
        { kr: '인수인계 완료됐습니다.', cz: 'Předání bylo dokončeno.' }
    ],
    isWeekend: false,
    isTest: false
};

// DEN 237 - PÁ 25.9.2026 - Reporting #1
export const day237: KoreanDayData = {
    day: 237,
    date: 'PÁ 25.9.2026',
    title: '📊 Reporting #1',
    vocab: [
        { kr: '일일보고', cz: 'denní zpráva' },
        { kr: '주간보고', cz: 'týdenní zpráva' },
        { kr: '월간보고', cz: 'měsíční zpráva' },
        { kr: '완료보고', cz: 'závěrečná zpráva' }
    ],
    sentences: [
        { kr: '일일보고를 제출하세요.', cz: 'Odevzdejte denní zprávu.' },
        { kr: '주간보고 시간입니다.', cz: 'Je čas na týdenní zprávu.' },
        { kr: '월간보고를 준비해 주세요.', cz: 'Připravte měsíční zprávu.' },
        { kr: '완료보고서를 작성하세요.', cz: 'Napište závěrečnou zprávu.' }
    ],
    isWeekend: false,
    isTest: false
};

// DEN 238 - SO 26.9.2026 - Reporting #2
export const day238: KoreanDayData = {
    day: 238,
    date: 'SO 26.9.2026',
    title: '📊 Reporting #2',
    vocab: [
        { kr: '진행상황', cz: 'stav průběhu' },
        { kr: '문제점', cz: 'problémy' },
        { kr: '조치사항', cz: 'opatření' },
        { kr: '다음단계', cz: 'další kroky' }
    ],
    sentences: [
        { kr: '진행상황을 알려 주세요.', cz: 'Informujte o stavu průběhu.' },
        { kr: '문제점이 있습니까?', cz: 'Jsou nějaké problémy?' },
        { kr: '조치사항을 보고하세요.', cz: 'Nahlaste přijatá opatření.' },
        { kr: '다음단계가 뭐예요?', cz: 'Jaký je další krok?' }
    ],
    isWeekend: true,
    isTest: false
};

// DEN 239 - NE 27.9.2026 - Reporting #3
export const day239: KoreanDayData = {
    day: 239,
    date: 'NE 27.9.2026',
    title: '📊 Reporting #3',
    vocab: [
        { kr: '승인', cz: 'schválení' },
        { kr: '반려', cz: 'vrácení/zamítnutí' }
    ],
    grammar: {
        title: '-(으)ㄴ/는 대로 (jakmile, tak jak)',
        explanation: 'Vyjadřuje "jakmile něco nastane" nebo "přesně tak, jak".',
        examples: [
            { kr: '승인되는 대로 시작하겠습니다.', cz: 'Začneme jakmile to bude schváleno.' },
            { kr: '지시한 대로 진행했습니다.', cz: 'Postupoval jsem podle instrukcí.' }
        ]
    },
    sentences: [
        { kr: '승인해 주세요.', cz: 'Schvalte prosím.' },
        { kr: '승인 대기 중입니다.', cz: 'Čeká se na schválení.' },
        { kr: '반려됐습니다.', cz: 'Bylo to vráceno.' },
        { kr: '반려 사유가 뭐예요?', cz: 'Jaký je důvod zamítnutí?' }
    ],
    isWeekend: true,
    isTest: false
};

// DEN 240 - PO 28.9.2026 - Opakování gramatiky
export const day240: KoreanDayData = {
    day: 240,
    date: 'PO 28.9.2026',
    title: '📚 Opakování gramatiky',
    vocab: [],
    tasks: [
        'Opakování: -(으)ㄴ/는 바와 같이 (jak bylo uvedeno)',
        'Opakování: -(으)로 인해 (kvůli)',
        'Opakování: -(으)ㄹ 경우 (v případě že)',
        'Opakování: -에 따라 (podle)',
        'Opakování: -(으)ㄴ/는 대로 (jakmile, tak jak)',
        'Procvičení všech struktur v kontextu smluv'
    ],
    focus: [
        '계약서에 명시된 바와 같이',
        '날씨로 인해 공사가 지연됐습니다',
        '지불이 늦을 경우 위약금이 발생합니다',
        '설계도에 따라 시공하세요',
        '승인되는 대로 시작하겠습니다'
    ],
    isWeekend: false,
    isTest: false
};

// DEN 241 - ÚT 29.9.2026 - Opakování slovíček
export const day241: KoreanDayData = {
    day: 241,
    date: 'ÚT 29.9.2026',
    title: '📝 Opakování slovíček',
    vocab: [],
    tasks: [
        'Opakování: Smlouvy (계약, 조건, 조항, 기간, 금액...)',
        'Opakování: Finance (비용, 견적, 예산, 지불, 입금...)',
        'Opakování: Stavební dokumenty (공사계약서, 작업지시서...)',
        'Opakování: Reporting (일일보고, 주간보고, 진행상황...)',
        'Anki - všechna slovíčka týdne 3-4'
    ],
    focus: [
        '계약 조건을 확인해 주세요',
        '견적서를 보내 주세요',
        '공정표대로 진행되고 있습니까?',
        '진행상황을 알려 주세요'
    ],
    isWeekend: false,
    isTest: false
};

// DEN 242 - ST 30.9.2026 - MĚSÍČNÍ TEST
export const day242: KoreanDayData = {
    day: 242,
    date: 'ST 30.9.2026',
    title: '🏆 TEST ZÁŘÍ - Smlouvy a dokumenty',
    vocab: [],
    exercises: [
        '═══════════════════════════════════════',
        'A. SMLOUVY (25 bodů)',
        '═══════════════════════════════════════',
        '',
        'Přeložte do korejštiny:',
        '1. smlouva = __________ (계약)',
        '2. podmínky = __________ (조건)',
        '3. podpis = __________ (서명)',
        '4. strana A = __________ (갑)',
        '5. prodloužení = __________ (연장)',
        '',
        'Doplňte věty:',
        '6. 계약 ______을 확인해 주세요. (조건)',
        '7. 여기에 ______해 주세요. (서명)',
        '8. 계약 ______이 언제입니까? (만료일)',
        '',
        '═══════════════════════════════════════',
        'B. FINANCE (25 bodů)',
        '═══════════════════════════════════════',
        '',
        'Přeložte do korejštiny:',
        '1. náklady = __________ (비용)',
        '2. rozpočet = __________ (예산)',
        '3. záloha = __________ (선금)',
        '4. DPH = __________ (부가세)',
        '5. doplatek = __________ (잔금)',
        '',
        'Přeložte věty:',
        '6. Kolik jsou náklady? = __________? (비용이 얼마입니까)',
        '7. Je to nad rozpočet. = __________. (예산 초과입니다)',
        '',
        '═══════════════════════════════════════',
        'C. STAVEBNÍ DOKUMENTY (25 bodů)',
        '═══════════════════════════════════════',
        '',
        'Přeložte do korejštiny:',
        '1. smlouva o dílo = __________ (공사계약서)',
        '2. harmonogram prací = __________ (공정표)',
        '3. kolaudace = __________ (준공검사)',
        '4. záruční opravy = __________ (하자보수)',
        '5. předání = __________ (인수인계)',
        '',
        'Přeložte věty:',
        '6. Kdy je termín kolaudace? = __________? (준공검사 날짜가 언제입니까)',
        '7. Je potřeba změna projektu. = __________. (설계변경이 필요합니다)',
        '',
        '═══════════════════════════════════════',
        'D. GRAMATIKA A REPORTING (25 bodů)',
        '═══════════════════════════════════════',
        '',
        'Spojte správně:',
        '1. -(으)ㄴ/는 바와 같이 → jak bylo uvedeno',
        '2. -(으)로 인해 → kvůli',
        '3. -(으)ㄹ 경우 → v případě že',
        '4. -에 따라 → podle',
        '5. -(으)ㄴ/는 대로 → jakmile',
        '',
        'Přeložte:',
        '6. denní zpráva = __________ (일일보고)',
        '7. stav průběhu = __________ (진행상황)',
        '8. schválení = __________ (승인)',
        '',
        'Přeložte věty:',
        '9. Jak je uvedeno ve smlouvě = 계약서에 명시된 __________ (바와 같이)',
        '10. Začneme jakmile to bude schváleno. = 승인되는 __________ 시작하겠습니다. (대로)',
        '',
        '═══════════════════════════════════════',
        '화이팅! 잘 했어요!',
        '═══════════════════════════════════════'
    ],
    isWeekend: false,
    isTest: true
};

// ============================================================
// EXPORT - Dny 227-242 pro září (týden 3-4)
// ============================================================

export const septemberDays227to242: KoreanDayData[] = [
    day227, day228, day229, day230,     // Smlouvy (ÚT-PÁ)
    day231, day232, day233,             // Finance (SO-PO)
    day234, day235, day236,             // Stavební dokumenty (ÚT-ČT)
    day237, day238, day239,             // Reporting (PÁ-NE)
    day240, day241, day242              // Opakování + TEST (PO-ST)
];

export default septemberDays227to242;
