/**
 * June 2026 - Days 121-150 (Complete Month)
 * Agent 5A (days 121-134) + Agent 5B (days 135-150)
 * STAVEBNÍ MĚSÍC #1 - Kompletní
 * 
 * Struktura měsíce:
 * - Dny 121-125: Stavební materiály
 * - Den 126: Sobotní maraton
 * - Den 127: Nedělní test
 * - Dny 128-132: Nástroje
 * - Den 133: Sobotní maraton
 * - Den 134: Nedělní test
 * - Dny 135-139: Bezpečnost
 * - Den 140: Sobotní maraton
 * - Den 141: Nedělní test
 * - Dny 142-145: Místa na stavbě
 * - Dny 146-148: Opakování + test
 * - Den 149: Příprava na měsíční test
 * - Den 150: MĚSÍČNÍ TEST
 */

import type { KoreanMonthData, KoreanDayData } from '../types/study-db';
import { juneDays135to150 } from './studyPlanJune2';

// ============================================================================
// DEN 121 - PO 1.6.2026 - Beton a složky
// ============================================================================
const day121: KoreanDayData = {
    day: 121,
    date: 'PO 1.6.2026',
    title: '🔨 Beton a složky',
    vocab: [
        { kr: '시멘트', cz: 'cement' },
        { kr: '콘크리트', cz: 'beton' },
        { kr: '레미콘', cz: 'transportbeton' },
        { kr: '골재', cz: 'kamenivo' },
        { kr: '모래', cz: 'písek' },
        { kr: '자갈', cz: 'štěrk' },
        { kr: '물', cz: 'voda' },
        { kr: '혼화제', cz: 'přísada' },
        { kr: '철근', cz: 'výztuž' },
        { kr: '철골', cz: 'ocelová konstrukce' },
        { kr: '배합', cz: 'míchání' },
        { kr: '강도', cz: 'pevnost' }
    ],
    grammar: {
        title: '-아/어야 하다 - muset',
        explanation: `Vyjadřuje POVINNOST nebo NUTNOST.

TVORBA:
• Kmen ㅏ/ㅗ + 아야 하다
• Ostatní + 어야 하다
• 하다 → 해야 하다

PŘÍKLADY TVORBY:
• 가다 → 가야 해요 (musím jít)
• 먹다 → 먹어야 해요 (musím jíst)
• 하다 → 해야 해요 (musím dělat)
• 끝내다 → 끝내야 해요 (musím dokončit)
• 쓰다 → 써야 해요 (musím nosit/psát)

NA STAVBĚ:
Tato gramatika je VELMI důležitá pro pracovní prostředí!
Používá se pro pravidla a povinnosti.

FORMÁLNÍ vs NEFORMÁLNÍ:
• 해야 해요 (neformální)
• 해야 합니다 (formální - na práci!)`,
        examples: [
            { kr: '헬멧을 써야 해요', cz: 'Musíš nosit helmu' },
            { kr: '안전화를 신어야 합니다', cz: 'Musíte nosit bezp. boty' },
            { kr: '9시까지 와야 해요', cz: 'Musíš přijít do 9' },
            { kr: '작업 전에 확인해야 해요', cz: 'Před prací musíš zkontrolovat' },
            { kr: '오늘 끝내야 해요', cz: 'Musím to dnes dokončit' },
            { kr: '매일 연습해야 해요', cz: 'Musíš cvičit každý den' }
        ]
    },
    tasks: [
        '📚 Nauč se 12 slov o betonu a složkách',
        '✍️ Vytvoř 10 vět s -아/어야 하다',
        '🗣️ Řekni 5 pravidel na stavbě (co musíš dělat)',
        '📱 Přidej všechna slova do Anki'
    ],
    exercises: [
        '헬멧을 쓰다 + 아/어야 하다 → ?',
        '확인하다 + 아/어야 하다 → ?',
        '9시에 오다 + 아/어야 하다 → ?',
        '작업을 끝내다 + 아/어야 하다 → ?',
        '안전 규칙을 지키다 + 아/어야 하다 → ?'
    ],
    notes: [
        '시멘트 vs 콘크리트: 시멘트 je prášek, 콘크리트 je směs!',
        '레미콘 = 레디믹스트 콘크리트 (ready-mixed concrete)',
        '배합 = míchání složek v určitém poměru',
        'Na stavbě je formální jazyk (합니다) běžnější!'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 122 - ÚT 2.6.2026 - Dřevo a desky
// ============================================================================
const day122: KoreanDayData = {
    day: 122,
    date: 'ÚT 2.6.2026',
    title: '🪵 Dřevo a desky',
    vocab: [
        { kr: '목재', cz: 'dřevo (materiál)' },
        { kr: '합판', cz: 'překližka' },
        { kr: '각목', cz: 'hranol' },
        { kr: 'OSB', cz: 'OSB deska' },
        { kr: '석고보드', cz: 'sádrokarton' },
        { kr: 'MDF', cz: 'MDF deska' },
        { kr: '원목', cz: 'masivní dřevo' },
        { kr: '가공목', cz: 'upravené dřevo' },
        { kr: '나무', cz: 'strom/dřevo' },
        { kr: '판자', cz: 'prkno' },
        { kr: '널빤지', cz: 'fošna' },
        { kr: '각재', cz: 'trám' }
    ],
    grammar: {
        title: '-(으)면 안 되다 - nesmí se',
        explanation: `Vyjadřuje ZÁKAZ nebo co se NESMÍ dělat.

TVORBA:
• Kmen na samohlásku/ㄹ + 면 안 돼요
• Kmen na souhlásku + 으면 안 돼요

PŘÍKLADY TVORBY:
• 가다 → 가면 안 돼요 (nesmíš jít)
• 하다 → 하면 안 돼요 (nesmíš dělat)
• 만지다 → 만지면 안 돼요 (nesmíš sahat)
• 먹다 → 먹으면 안 돼요 (nesmíš jíst)
• 들어가다 → 들어가면 안 돼요 (nesmíš vstoupit)

NA STAVBĚ:
Velmi důležité pro bezpečnostní pravidla!
Používá se pro zákazy a varování.`,
        examples: [
            { kr: '헬멧 없이 들어가면 안 돼요', cz: 'Bez helmy se nesmí vstoupit' },
            { kr: '여기 만지면 안 돼요', cz: 'Tady se nesmí sahat' },
            { kr: '담배 피우면 안 됩니다', cz: 'Nesmí se kouřit' },
            { kr: '이거 버리면 안 돼요', cz: 'Tohle se nesmí vyhodit' },
            { kr: '늦게 오면 안 돼요', cz: 'Nesmíš přijít pozdě' },
            { kr: '여기서 자면 안 돼요', cz: 'Tady se nesmí spát' }
        ]
    },
    tasks: [
        '📚 Nauč se 12 slov o dřevu a deskách',
        '✍️ Vytvoř 10 vět s -(으)면 안 되다',
        '🗣️ Řekni 5 zákazů na stavbě',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '들어가다 + (으)면 안 되다 → ?',
        '만지다 + (으)면 안 되다 → ?',
        '담배를 피우다 + (으)면 안 되다 → ?',
        '이거 버리다 + (으)면 안 되다 → ?',
        '여기서 먹다 + (으)면 안 되다 → ?'
    ],
    notes: [
        '목재 = dřevo jako materiál (formální)',
        '나무 = strom nebo dřevo (obecně)',
        '합판 vs 원목: 합판 je vrstvené, 원목 je masiv',
        'OSB, MDF = píší se stejně jako v češtině!'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 123 - ST 3.6.2026 - Izolace
// ============================================================================
const day123: KoreanDayData = {
    day: 123,
    date: 'ST 3.6.2026',
    title: '🧱 Izolační materiály',
    vocab: [
        { kr: '단열재', cz: 'izolace/izolační materiál' },
        { kr: '스티로폼', cz: 'polystyren' },
        { kr: '유리면', cz: 'skelná vata' },
        { kr: '암면', cz: 'minerální vata' },
        { kr: '우레탄폼', cz: 'PUR pěna' },
        { kr: '방수시트', cz: 'hydroizolace' },
        { kr: '기포콘크리트', cz: 'pórobeton' },
        { kr: '방음재', cz: 'zvuková izolace' },
        { kr: '방습지', cz: 'parozábrana' },
        { kr: '실란트', cz: 'tmel' },
        { kr: '코킹', cz: 'tmelení' }
    ],
    grammar: {
        title: 'Opakování: -아/어야 하다 + -(으)면 안 되다',
        explanation: `KOMBINACE NA STAVBĚ:

POVINNOSTI (-아/어야 하다):
• 헬멧을 써야 해요 = Musíš nosit helmu
• 장갑을 껴야 해요 = Musíš nosit rukavice
• 확인해야 해요 = Musíš zkontrolovat

ZÁKAZY (-(으)면 안 되다):
• 만지면 안 돼요 = Nesmíš sahat
• 피우면 안 돼요 = Nesmíš kouřit
• 들어가면 안 돼요 = Nesmíš vstoupit

KOMBINACE V PRAXI:
작업 전에 확인해야 하고, 허락 없이 만지면 안 돼요.
= Před prací musíš zkontrolovat a bez povolení nesmíš sahat.`,
        examples: [
            { kr: '단열재를 붙여야 해요', cz: 'Musíš přilepit izolaci' },
            { kr: '방수시트를 깔아야 해요', cz: 'Musíš položit hydroizolaci' },
            { kr: '실란트 없이 하면 안 돼요', cz: 'Bez tmelu se to nesmí dělat' },
            { kr: '이 재료를 섞으면 안 돼요', cz: 'Tyto materiály se nesmí míchat' }
        ]
    },
    tasks: [
        '📚 Nauč se 11 slov o izolaci',
        '✍️ Kombinuj obě gramatiky v jedné větě',
        '🔁 Opakuj slovíčka z dní 121-122',
        '📱 Přidej do Anki'
    ],
    exercises: [
        'Přelož: Musíš položit izolaci',
        'Přelož: Bez rukavic se nesmí pracovat',
        'Přelož: Před prací musíš zkontrolovat',
        'Přelož: Tady se nesmí kouřit'
    ],
    notes: [
        '단열 = tepelná izolace, 방수 = hydroizolace, 방음 = zvuková izolace',
        '코킹 = proces tmelení, 실란트 = tmel jako materiál',
        '방습지 = parozábrana (방 = bránit, 습 = vlhkost)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 124 - ČT 4.6.2026 - Kovy
// ============================================================================
const day124: KoreanDayData = {
    day: 124,
    date: 'ČT 4.6.2026',
    title: '⚙️ Kovy a kovové materiály',
    vocab: [
        { kr: '철', cz: 'železo/ocel' },
        { kr: '알루미늄', cz: 'hliník' },
        { kr: '스테인리스', cz: 'nerez' },
        { kr: '아연', cz: 'zinek' },
        { kr: '구리', cz: 'měď' },
        { kr: '황동', cz: 'mosaz' },
        { kr: '납', cz: 'olovo' },
        { kr: '강판', cz: 'ocelový plech' },
        { kr: '파이프', cz: 'trubka' },
        { kr: '앵글', cz: 'úhelník (profil)' },
        { kr: '채널', cz: 'profil (U)' },
        { kr: '플레이트', cz: 'deska/plát' }
    ],
    grammar: {
        title: '-아/어도 되다 - smět',
        explanation: `Vyjadřuje POVOLENÍ nebo ptání se na povolení.

TVORBA:
• Kmen ㅏ/ㅗ + 아도 돼요
• Ostatní + 어도 돼요
• 하다 → 해도 돼요

PŘÍKLADY:
• 가다 → 가도 돼요 (můžeš jít)
• 먹다 → 먹어도 돼요 (můžeš jíst)
• 쓰다 → 써도 돼요 (můžeš použít)
• 쉬다 → 쉬어도 돼요 (můžeš si odpočinout)

OTÁZKA - ŽÁDOST O POVOLENÍ:
• 이거 써도 돼요? = Můžu tohle použít?
• 들어가도 돼요? = Můžu vstoupit?

ODPOVĚĎ:
• 네, 돼요 / 네, 써도 돼요 = Ano, můžeš
• 아니요, 안 돼요 = Ne, nesmíš`,
        examples: [
            { kr: '여기 앉아도 돼요?', cz: 'Můžu si tady sednout?' },
            { kr: '사진 찍어도 돼요?', cz: 'Můžu fotit?' },
            { kr: '이거 써도 돼요?', cz: 'Můžu tohle použít?' },
            { kr: '잠깐 쉬어도 돼요?', cz: 'Můžu si chvilku odpočinout?' },
            { kr: '이 공구 빌려도 돼요?', cz: 'Můžu si půjčit tento nástroj?' },
            { kr: '네, 써도 돼요', cz: 'Ano, můžeš to použít' }
        ]
    },
    tasks: [
        '📚 Nauč se 12 slov o kovech',
        '✍️ Vytvoř 10 otázek s -아/어도 되다',
        '🗣️ Procvičuj dialogy: otázka + odpověď',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '쓰다 + 아/어도 되다 → ? (otázka)',
        '들어가다 + 아/어도 되다 → ? (otázka)',
        '쉬다 + 아/어도 되다 → ? (otázka)',
        '가다 + 아/어도 되다 → ? (otázka)',
        '빌리다 + 아/어도 되다 → ? (otázka)'
    ],
    notes: [
        '철 = železo/ocel obecně, 강 = ocel (specificky)',
        '스테인리스 = z anglického "stainless (steel)"',
        '파이프, 앵글, 채널, 플레이트 = převzatá slova z angličtiny'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 125 - PÁ 5.6.2026 - Spojovací materiál
// ============================================================================
const day125: KoreanDayData = {
    day: 125,
    date: 'PÁ 5.6.2026',
    title: '🔩 Spojovací materiál',
    vocab: [
        { kr: '못', cz: 'hřebík' },
        { kr: '나사', cz: 'šroub' },
        { kr: '볼트', cz: 'šroub (velký)' },
        { kr: '너트', cz: 'matice' },
        { kr: '앵커', cz: 'kotva' },
        { kr: '와셔', cz: 'podložka' },
        { kr: '피스', cz: 'vrut' },
        { kr: '타카', cz: 'sponky' },
        { kr: '클램프', cz: 'svorka' },
        { kr: '철사', cz: 'drát' },
        { kr: '케이블타이', cz: 'stahovací páska' },
        { kr: '테이프', cz: 'páska' }
    ],
    grammar: {
        title: '구개음화 (palatalizace) - výslovnost',
        explanation: `PRAVIDLO VÝSLOVNOSTI:
ㄷ nebo ㅌ + 이 → [지] nebo [치]

PŘÍKLADY:
• 같이 [가치] = spolu
• 굳이 [구지] = záměrně
• 해돋이 [해도지] = východ slunce
• 붙이다 [부치다] = přilepit
• 닫히다 [다치다] = být zavřeno

PROČ JE TO DŮLEŽITÉ:
Na stavbě uslyšíš 같이 해요 (dělejme to spolu).
Vyslovuje se [가치 해요], ne [가티 해요]!

PROCVIČUJ:
같이 가요 [가치 가요] = Pojďme spolu
굳이 안 해도 돼요 [구지...] = Nemusíš to dělat záměrně`,
        examples: [
            { kr: '같이 합시다', cz: 'Pojďme to udělat spolu [가치 합시다]' },
            { kr: '굳이 안 해도 돼요', cz: 'Nemusíš to dělat naschvál [구지...]' },
            { kr: '해돋이를 봤어요', cz: 'Viděl jsem východ slunce [해도지...]' },
            { kr: '테이프를 붙여요', cz: 'Přilepím pásku [부쳐요]' }
        ]
    },
    tasks: [
        '📚 Nauč se 12 slov o spojovacím materiálu',
        '🔊 Procvičuj výslovnost 구개음화',
        '🔁 Opakuj všechna slovíčka z týdne (dny 121-125)',
        '📱 Přidej do Anki'
    ],
    exercises: [
        'Vyslov: 같이 일해요 [가치...]',
        'Vyslov: 굳이 그렇게 하면 안 돼요 [구지...]',
        'Vyslov: 테이프를 붙이세요 [부치세요]',
        'Přelož: Můžu použít hřebíky?',
        'Přelož: Musíš použít podložku'
    ],
    notes: [
        '못 vs 나사 vs 볼트 vs 피스:',
        '- 못 = hřebík (zatlouká se)',
        '- 나사 = šroub (šroubuje se)',
        '- 볼트 = velký šroub (s maticí)',
        '- 피스 = vrut (do dřeva)',
        '타카 = sponkovačka i sponky'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 126 - SO 6.6.2026 - SOBOTNÍ MARATON
// ============================================================================
const day126: KoreanDayData = {
    day: 126,
    date: 'SO 6.6.2026',
    title: '⭐ SOBOTNÍ MARATON - Povrchové materiály',
    vocab: [
        { kr: '페인트', cz: 'barva' },
        { kr: '프라이머', cz: 'základ (penetrace)' },
        { kr: '타일', cz: 'dlaždice/obklad' },
        { kr: '벽지', cz: 'tapeta' },
        { kr: '몰딩', cz: 'lišta' },
        { kr: '실리콘', cz: 'silikon' },
        { kr: '에폭시', cz: 'epoxid' },
        { kr: '바니시', cz: 'lak' }
    ],
    grammar: {
        title: 'Opakování: 3 gramatiky povinnosti/povolení',
        explanation: `SHRNUTÍ TÝDNE - 3 DŮLEŽITÉ STRUKTURY:

1. -아/어야 하다 = MUSÍŠ (povinnost)
   헬멧을 써야 해요 = Musíš nosit helmu

2. -(으)면 안 되다 = NESMÍŠ (zákaz)
   여기 들어가면 안 돼요 = Sem nesmíš vstoupit

3. -아/어도 되다 = SMÍŠ (povolení)
   이거 써도 돼요? = Můžu tohle použít?

NA STAVBĚ KAŽDÝ DEN:
• 안전모를 써야 합니다 (Musíte nosit helmu)
• 흡연구역 외 담배 피우면 안 됩니다 (Mimo kuřárnu se nesmí kouřit)
• 필요하면 사용해도 됩니다 (Pokud potřebujete, můžete použít)`,
        examples: [
            { kr: '페인트 칠하기 전에 프라이머를 발라야 해요', cz: 'Před malováním musíš nanést základ' },
            { kr: '젖은 타일 위에 걸으면 안 돼요', cz: 'Na mokré dlažbě se nesmí chodit' },
            { kr: '실리콘 써도 돼요?', cz: 'Můžu použít silikon?' },
            { kr: '이 바니시 사용해도 돼요', cz: 'Tento lak můžeš použít' }
        ]
    },
    tasks: [
        '⏰ Hodina 1-2: Opakování slovíček dny 121-125 (59 slov)',
        '⏰ Hodina 3-4: Nová slovíčka - povrchové materiály (8 slov)',
        '⏰ Hodina 5-6: Gramatika - všechny 3 struktury',
        '⏰ Hodina 7-8: Psaní vět, kombinace gramatik',
        '📱 Anki: Všechna slovíčka z týdne'
    ],
    exercises: [
        'Vytvoř 5 vět s -아/어야 하다 (stavební kontext)',
        'Vytvoř 5 vět s -(으)면 안 되다 (bezpečnostní pravidla)',
        'Vytvoř 5 otázek s -아/어도 되다',
        'Kombinuj: "Musíš X, ale nesmíš Y"'
    ],
    notes: [
        'SHRNUTÍ TÝDNE 1:',
        '• Beton: 시멘트, 콘크리트, 레미콘, 골재, 모래, 자갈...',
        '• Dřevo: 목재, 합판, 각목, OSB, 석고보드...',
        '• Izolace: 단열재, 스티로폼, 유리면, 방수시트...',
        '• Kovy: 철, 알루미늄, 스테인리스, 구리...',
        '• Spojovací: 못, 나사, 볼트, 앵커...',
        '',
        '67 SLOV CELKEM ZA TÝDEN 1!'
    ],
    isWeekend: true,
    isTest: false
};

// ============================================================================
// DEN 127 - NE 7.6.2026 - NEDĚLNÍ TEST
// ============================================================================
const day127: KoreanDayData = {
    day: 127,
    date: 'NE 7.6.2026',
    title: '📝 NEDĚLNÍ TEST - Materiály',
    vocab: [],
    grammar: {
        title: 'TEST: Materiály + Gramatika',
        explanation: `TESTOVÉ OBLASTI:

ČÁST A: SLOVÍČKA (30 bodů)
Přelož z češtiny do korejštiny:
- Beton, cement, transportbeton
- Překližka, sádrokarton, masiv
- Polystyren, skelná vata, hydroizolace
- Hliník, nerez, měď
- Hřebík, šroub, kotva

ČÁST B: GRAMATIKA (40 bodů)
Doplň správnou gramatiku:
- 헬멧을 _____ (musíš nosit)
- 여기 _____ (nesmíš vstoupit)  
- 이거 _____ (můžu použít?)

ČÁST C: VÝSLOVNOST (10 bodů)
Napiš výslovnost:
- 같이 → [?]
- 굳이 → [?]

ČÁST D: VĚTY (20 bodů)
Přelož celé věty.`,
        examples: []
    },
    tasks: [
        '📝 TEST: Část A - Slovíčka (30 bodů)',
        '📝 TEST: Část B - Gramatika (40 bodů)',
        '📝 TEST: Část C - Výslovnost (10 bodů)',
        '📝 TEST: Část D - Věty (20 bodů)',
        '🔄 Opakování chyb'
    ],
    exercises: [
        '시멘트 = ?',
        '콘크리트 = ?',
        '합판 = ?',
        '단열재 = ?',
        '알루미늄 = ?',
        '못 = ?',
        '헬멧을 쓰다 + 아/어야 하다 = ?',
        '여기 들어가다 + (으)면 안 되다 = ?',
        '이거 쓰다 + 아/어도 되다 + ? = ?'
    ],
    notes: [
        'ODPOVĚDI:',
        '시멘트 = cement, 콘크리트 = beton',
        '합판 = překližka, 단열재 = izolace',
        '알루미늄 = hliník, 못 = hřebík',
        '헬멧을 써야 해요 = Musíš nosit helmu',
        '여기 들어가면 안 돼요 = Sem nesmíš vstoupit',
        '이거 써도 돼요? = Můžu tohle použít?',
        '',
        '같이 → [가치], 굳이 → [구지]'
    ],
    isWeekend: true,
    isTest: true
};

// ============================================================================
// DEN 128 - PO 8.6.2026 - Ruční nástroje 1
// ============================================================================
const day128: KoreanDayData = {
    day: 128,
    date: 'PO 8.6.2026',
    title: '🔧 Ruční nástroje 1',
    vocab: [
        { kr: '망치', cz: 'kladivo' },
        { kr: '드라이버', cz: 'šroubovák' },
        { kr: '렌치', cz: 'klíč (na matice)' },
        { kr: '스패너', cz: 'plochý klíč' },
        { kr: '플라이어', cz: 'kleště' },
        { kr: '펜치', cz: 'kombinačky' },
        { kr: '니퍼', cz: 'štípací kleště' },
        { kr: '몽키스패너', cz: 'francouzský klíč' },
        { kr: '육각렌치', cz: 'imbusový klíč' },
        { kr: '소켓렌치', cz: 'nástrčný klíč' }
    ],
    grammar: {
        title: '-(으)ㄹ까요? - mám...? (návrh/otázka)',
        explanation: `Vyjadřuje NÁVRH nebo ptání se, co mám/máme udělat.

TVORBA:
• Kmen na samohlásku + ㄹ까요?
• Kmen na souhlásku + 을까요?
• ㄹ kmen: ㄹ mizí + ㄹ까요?

PŘÍKLADY TVORBY:
• 가다 → 갈까요? (Mám jít? / Půjdeme?)
• 하다 → 할까요? (Mám to udělat?)
• 먹다 → 먹을까요? (Máme jíst?)
• 만들다 → 만들까요? (Mám to udělat?)
• 도와주다 → 도와줄까요? (Mám pomoct?)

POUŽITÍ NA STAVBĚ:
• Nabízení pomoci
• Návrhy
• Ptaní se na další postup`,
        examples: [
            { kr: '뭐 먹을까요?', cz: 'Co bychom jedli?' },
            { kr: '이거 할까요?', cz: 'Mám to udělat?' },
            { kr: '같이 갈까요?', cz: 'Půjdeme spolu?' },
            { kr: '도와줄까요?', cz: 'Mám pomoct?' },
            { kr: '망치 가져올까요?', cz: 'Mám přinést kladivo?' },
            { kr: '시작할까요?', cz: 'Máme začít?' }
        ]
    },
    tasks: [
        '📚 Nauč se 10 ručních nástrojů',
        '✍️ Vytvoř 10 vět s -(으)ㄹ까요?',
        '🗣️ Procvičuj nabízení pomoci',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '가다 + (으)ㄹ까요? → ?',
        '하다 + (으)ㄹ까요? → ?',
        '도와주다 + (으)ㄹ까요? → ?',
        '가져오다 + (으)ㄹ까요? → ?',
        '시작하다 + (으)ㄹ까요? → ?'
    ],
    notes: [
        '드라이버 = šroubovák (z anglického "driver")',
        '렌치 vs 스패너: oba jsou klíče, 렌치 je obecnější',
        '플라이어 vs 펜치 vs 니퍼:',
        '- 플라이어 = kleště obecně',
        '- 펜치 = kombinačky',
        '- 니퍼 = štípací kleště',
        '몽키스패너 = "monkey wrench" = francouzák'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 129 - ÚT 9.6.2026 - Ruční nástroje 2
// ============================================================================
const day129: KoreanDayData = {
    day: 129,
    date: 'ÚT 9.6.2026',
    title: '🪚 Ruční nástroje 2',
    vocab: [
        { kr: '톱', cz: 'pila' },
        { kr: '끌', cz: 'dláto' },
        { kr: '줄', cz: 'pilník' },
        { kr: '대패', cz: 'hoblík' },
        { kr: '정', cz: 'sekáč' },
        { kr: '쇠톱', cz: 'pilka na kov' },
        { kr: '손톱', cz: 'ruční pila' },
        { kr: '활톱', cz: 'rámová pila' },
        { kr: '망치', cz: 'palice' },
        { kr: '고무망치', cz: 'gumová palice' }
    ],
    grammar: {
        title: 'Opakování: -(으)ㄹ까요? v praxi',
        explanation: `PRAKTICKÉ POUŽITÍ NA STAVBĚ:

NABÍZENÍ POMOCI:
• 도와줄까요? = Mám pomoct?
• 들어줄까요? = Mám to vzít/zvednout?
• 가져다줄까요? = Mám to přinést?

PTANÍ SE NA POSTUP:
• 어떻게 할까요? = Jak to uděláme?
• 뭐 먼저 할까요? = Co uděláme nejdřív?
• 이거 여기 놓을까요? = Mám to položit sem?

NÁVRHY:
• 쉴까요? = Dáme si pauzu?
• 점심 먹을까요? = Půjdeme na oběd?
• 내일 할까요? = Uděláme to zítra?

ODPOVĚDI:
• 네, 그렇게 해요 = Ano, udělejme to tak
• 아니요, 괜찮아요 = Ne, to je v pořádku`,
        examples: [
            { kr: '톱 가져올까요?', cz: 'Mám přinést pilu?' },
            { kr: '이거 잘라줄까요?', cz: 'Mám to uříznout?' },
            { kr: '대패로 깎을까요?', cz: 'Mám to ohoblovat?' },
            { kr: '어디에 놓을까요?', cz: 'Kam to mám položit?' }
        ]
    },
    tasks: [
        '📚 Nauč se 10 dalších nástrojů (řezání, tvarování)',
        '✍️ Praktikuj -(으)ㄹ까요? v pracovních situacích',
        '🔁 Opakuj nástroje z dne 128',
        '📱 Přidej do Anki'
    ],
    exercises: [
        'Přelož: Mám to přinést?',
        'Přelož: Kam to mám položit?',
        'Přelož: Mám to uříznout pilou?',
        'Přelož: Půjdeme na oběd?'
    ],
    notes: [
        '톱 = obecně pila',
        '쇠톱 = pilka na kov (쇠 = železo)',
        '손톱 = ruční pila (pozor: 손톱 také = nehet!)',
        '활톱 = rámová pila (활 = luk)',
        '망치 může být kladivo i palice podle kontextu',
        '고무망치 = gumová palice (고무 = guma)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 130 - ST 10.6.2026 - Měřicí nástroje
// ============================================================================
const day130: KoreanDayData = {
    day: 130,
    date: 'ST 10.6.2026',
    title: '📐 Měřicí nástroje',
    vocab: [
        { kr: '줄자', cz: 'svinovací metr' },
        { kr: '수평계', cz: 'vodováha' },
        { kr: '직각자', cz: 'úhelník' },
        { kr: '레이저레벨', cz: 'laserová vodováha' },
        { kr: '각도기', cz: 'úhloměr' },
        { kr: '콤비자', cz: 'kombinovaný úhelník' },
        { kr: '거리측정기', cz: 'dálkoměr' },
        { kr: '버니어캘리퍼스', cz: 'posuvné měřítko' },
        { kr: '마킹', cz: 'značení' },
        { kr: '분필', cz: 'křída' }
    ],
    grammar: {
        title: 'Kombinace gramatik pro pracovní instrukce',
        explanation: `PRACOVNÍ INSTRUKCE - KOMBINACE:

SEKVENCE ÚKOLŮ:
먼저 측정해야 해요. 그 다음에 마킹하세요.
= Nejdřív musíš změřit. Potom udělejte značení.

VAROVÁNÍ + POVINNOST:
수평계 없이 하면 안 돼요. 꼭 확인해야 해요.
= Bez vodováhy se to nesmí dělat. Musíš to zkontrolovat.

NABÍDKA POMOCI:
측정해줄까요? - 네, 부탁해요.
= Mám to změřit? - Ano, prosím.

ŽÁDOST O POVOLENÍ:
줄자 써도 돼요? - 네, 사용하세요.
= Můžu použít metr? - Ano, použijte.`,
        examples: [
            { kr: '줄자로 측정해야 해요', cz: 'Musíš změřit metrem' },
            { kr: '수평계로 확인해야 해요', cz: 'Musíš zkontrolovat vodováhou' },
            { kr: '직각자 없이 하면 안 돼요', cz: 'Bez úhelníku se to nesmí dělat' },
            { kr: '레이저레벨 써도 돼요?', cz: 'Můžu použít laserovou vodováhu?' },
            { kr: '여기 마킹할까요?', cz: 'Mám to tady označit?' }
        ]
    },
    tasks: [
        '📚 Nauč se 10 měřicích nástrojů',
        '✍️ Kombinuj všechny 4 gramatiky',
        '🗣️ Procvičuj pracovní dialogy',
        '📱 Přidej do Anki'
    ],
    exercises: [
        'Přelož: Musíš to změřit metrem',
        'Přelož: Bez vodováhy se to nesmí dělat',
        'Přelož: Můžu použít laserovou vodováhu?',
        'Přelož: Mám to tady označit?'
    ],
    notes: [
        '줄자 = svinovací metr (줄 = provaz + 자 = pravítko)',
        '수평계 = vodováha (수평 = horizontální + 계 = měřidlo)',
        '레이저레벨 = laserová vodováha (z angličtiny)',
        '버니어캘리퍼스 = posuvné měřítko (vernier caliper)',
        '분필 = křída (stavební značení)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 131 - ČT 11.6.2026 - Elektrické nástroje 1
// ============================================================================
const day131: KoreanDayData = {
    day: 131,
    date: 'ČT 11.6.2026',
    title: '🔌 Elektrické nástroje 1',
    vocab: [
        { kr: '드릴', cz: 'vrtačka' },
        { kr: '충전드릴', cz: 'aku vrtačka' },
        { kr: '해머드릴', cz: 'příklepová vrtačka' },
        { kr: '임팩드릴', cz: 'rázová vrtačka' },
        { kr: '드릴비트', cz: 'vrták' },
        { kr: '드라이버비트', cz: 'bit (šroubovací)' },
        { kr: '홀소', cz: 'korunka' },
        { kr: '스텝드릴', cz: 'stupňový vrták' },
        { kr: '척', cz: 'sklíčidlo' },
        { kr: '배터리', cz: 'baterie' }
    ],
    grammar: {
        title: '-(으)ㅂ시다 - pojďme',
        explanation: `Vyjadřuje NÁVRH pro skupinu - "pojďme".

TVORBA:
• Kmen na samohlásku + ㅂ시다
• Kmen na souhlásku + 읍시다
• ㄹ kmen: ㄹ mizí + ㅂ시다

PŘÍKLADY TVORBY:
• 가다 → 갑시다 (Pojďme)
• 하다 → 합시다 (Udělejme to)
• 시작하다 → 시작합시다 (Začněme)
• 쉬다 → 쉽시다 (Odpočiňme si)
• 먹다 → 먹읍시다 (Pojďme jíst)
• 만들다 → 만듭시다 (Vyrobme to)

NA STAVBĚ:
Používá se pro týmové instrukce a návrhy.
Je to formálnější než -아/어요.`,
        examples: [
            { kr: '시작합시다', cz: 'Začněme' },
            { kr: '갑시다', cz: 'Pojďme' },
            { kr: '쉽시다', cz: 'Odpočiňme si' },
            { kr: '점심 먹읍시다', cz: 'Pojďme na oběd' },
            { kr: '다시 합시다', cz: 'Udělejme to znovu' },
            { kr: '끝냅시다', cz: 'Dokončeme to' }
        ]
    },
    tasks: [
        '📚 Nauč se 10 slov o vrtačkách a příslušenství',
        '✍️ Vytvoř 10 vět s -(으)ㅂ시다',
        '🗣️ Procvičuj týmové instrukce',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '가다 + (으)ㅂ시다 → ?',
        '시작하다 + (으)ㅂ시다 → ?',
        '쉬다 + (으)ㅂ시다 → ?',
        '먹다 + (으)ㅂ시다 → ?',
        '끝내다 + (으)ㅂ시다 → ?'
    ],
    notes: [
        '드릴 = vrtačka obecně',
        '충전드릴 = aku vrtačka (충전 = nabíjení)',
        '해머드릴 = příklepová (hammer drill)',
        '임팩드릴 = rázová (impact drill)',
        '드릴비트 = vrták, 드라이버비트 = bit',
        '척 = sklíčidlo (drží vrták/bit)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 132 - PÁ 12.6.2026 - Elektrické nástroje 2
// ============================================================================
const day132: KoreanDayData = {
    day: 132,
    date: 'PÁ 12.6.2026',
    title: '⚡ Elektrické nástroje 2',
    vocab: [
        { kr: '그라인더', cz: 'úhlová bruska' },
        { kr: '전동톱', cz: 'motorová pila' },
        { kr: '원형톱', cz: 'okružní pila' },
        { kr: '직소', cz: 'přímočará pila' },
        { kr: '대패', cz: 'elektrický hoblík' },
        { kr: '샌더', cz: 'vibrační bruska' },
        { kr: '폴리셔', cz: 'leštička' },
        { kr: '라우터', cz: 'horní frézka' },
        { kr: '날', cz: 'kotouč/čepel' },
        { kr: '디스크', cz: 'disk' }
    ],
    grammar: {
        title: '유음화 (lateralizace) - výslovnost',
        explanation: `PRAVIDLO VÝSLOVNOSTI:
ㄴ + ㄹ nebo ㄹ + ㄴ → [ㄹㄹ]

PŘÍKLADY:
• 신라 → [실라] (Silla - dynastia)
• 연락 → [열락] (kontakt)
• 설날 → [설랄] (Nový rok)
• 진리 → [질리] (pravda)
• 난로 → [날로] (kamna)

NA STAVBĚ:
• 연락하세요 [열락하세요] = Kontaktujte mě
• 관리자 [괄리자] = správce

DŮLEŽITÉ:
Toto pravidlo uslyšíš velmi často!
연락 je běžné slovo = kontakt/spojení.`,
        examples: [
            { kr: '연락하세요', cz: 'Kontaktujte mě [열락하세요]' },
            { kr: '설날에 쉬어요', cz: 'Na Nový rok odpočíváme [설랄...]' },
            { kr: '관리자에게 말하세요', cz: 'Řekněte správci [괄리자...]' },
            { kr: '신라 시대', cz: 'Období Silla [실라 시대]' }
        ]
    },
    tasks: [
        '📚 Nauč se 10 elektrických nástrojů (řezání, broušení)',
        '🔊 Procvičuj výslovnost 유음화',
        '🔁 Opakuj všechny nástroje z týdne 2',
        '📱 Přidej do Anki'
    ],
    exercises: [
        'Vyslov: 연락처 [열락처] = kontaktní údaje',
        'Vyslov: 설날 [설랄] = Nový rok',
        'Vyslov: 관리 [괄리] = správa',
        'Přelož: Pojďme použít brusku',
        'Přelož: Musíš vyměnit kotouč'
    ],
    notes: [
        '그라인더 = úhlová bruska (grinder)',
        '원형톱 = okružní pila (원형 = kruhový)',
        '직소 = přímočará pila (jigsaw)',
        '샌더 = vibrační bruska (sander)',
        '대패 = může být ruční i elektrický hoblík!',
        '날 = obecně čepel/kotouč, 디스크 = disk'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 133 - SO 13.6.2026 - SOBOTNÍ MARATON
// ============================================================================
const day133: KoreanDayData = {
    day: 133,
    date: 'SO 13.6.2026',
    title: '⭐ SOBOTNÍ MARATON - Speciální nástroje',
    vocab: [
        { kr: '용접기', cz: 'svářečka' },
        { kr: '컴프레서', cz: 'kompresor' },
        { kr: '발전기', cz: 'generátor' },
        { kr: '고압세척기', cz: 'vysokotlaký čistič' },
        { kr: '에어건', cz: 'vzduchová pistole' },
        { kr: '스프레이건', cz: 'stříkací pistole' }
    ],
    grammar: {
        title: 'Kombinace příkazů a návrhů na stavbě',
        explanation: `KOMPLETNÍ GRAMATIKA PRO STAVBU:

1. POVINNOST (-아/어야 하다):
안전모를 써야 합니다.

2. ZÁKAZ (-(으)면 안 되다):
허락 없이 만지면 안 됩니다.

3. POVOLENÍ (-아/어도 되다):
필요하면 사용해도 됩니다.

4. NÁVRH/OTÁZKA (-(으)ㄹ까요?):
도와줄까요?

5. POJĎME (-(으)ㅂ시다):
시작합시다!

PRACOVNÍ DIALOG:
A: 시작할까요? (Máme začít?)
B: 네, 시작합시다! (Ano, začněme!)
A: 용접기 써도 돼요? (Můžu použít svářečku?)
B: 네, 그런데 보안경을 써야 해요. (Ano, ale musíš nosit brýle.)
A: 알겠습니다. (Rozumím.)`,
        examples: [
            { kr: '용접하기 전에 보안경을 써야 해요', cz: 'Před svařováním musíš nosit brýle' },
            { kr: '컴프레서 없이 하면 안 돼요', cz: 'Bez kompresoru se to nesmí dělat' },
            { kr: '발전기 켤까요?', cz: 'Mám zapnout generátor?' },
            { kr: '청소합시다', cz: 'Pojďme uklidit' }
        ]
    },
    tasks: [
        '⏰ Hodina 1-2: Opakování nástrojů dny 128-132 (46 slov)',
        '⏰ Hodina 3-4: Nová slovíčka - speciální nástroje (6 slov)',
        '⏰ Hodina 5-6: Všech 5 gramatických struktur',
        '⏰ Hodina 7-8: Pracovní dialogy a role-play',
        '📱 Anki: Všechny nástroje'
    ],
    exercises: [
        'Vytvoř dialog: nabídka pomoci → přijetí',
        'Vytvoř dialog: žádost o povolení → povolení s podmínkou',
        'Kombinuj: "Pojďme X, ale nejdřív musíme Y"',
        'Praktikuj bezpečnostní instrukce'
    ],
    notes: [
        'SHRNUTÍ TÝDNE 2 - NÁSTROJE:',
        '• Ruční 1: 망치, 드라이버, 렌치, 플라이어...',
        '• Ruční 2: 톱, 끌, 줄, 대패...',
        '• Měřicí: 줄자, 수평계, 직각자...',
        '• Elektrické 1: 드릴, 충전드릴, 해머드릴...',
        '• Elektrické 2: 그라인더, 원형톱, 직소...',
        '• Speciální: 용접기, 컴프레서, 발전기...',
        '',
        '52 SLOV NÁSTROJŮ + 6 SPECIÁLNÍCH = 58 SLOV!'
    ],
    isWeekend: true,
    isTest: false
};

// ============================================================================
// DEN 134 - NE 14.6.2026 - NEDĚLNÍ TEST
// ============================================================================
const day134: KoreanDayData = {
    day: 134,
    date: 'NE 14.6.2026',
    title: '📝 NEDĚLNÍ TEST - Nástroje + Kompletní gramatika',
    vocab: [],
    grammar: {
        title: 'KOMPLETNÍ TEST TÝDNE 1-2',
        explanation: `TESTOVÉ OBLASTI:

ČÁST A: NÁSTROJE (40 bodů)
Ruční nástroje:
- kladivo, šroubovák, kleště, pila, dláto

Měřicí nástroje:
- svinovací metr, vodováha, úhelník

Elektrické nástroje:
- vrtačka, aku vrtačka, bruska, okružní pila

ČÁST B: GRAMATIKA (40 bodů)
1. -아/어야 하다 (musíš)
2. -(으)면 안 되다 (nesmíš)
3. -아/어도 되다 (smíš)
4. -(으)ㄹ까요? (mám?)
5. -(으)ㅂ시다 (pojďme)

ČÁST C: VÝSLOVNOST (10 bodů)
- 유음화: 연락 → ?
- 구개음화: 같이 → ?

ČÁST D: DIALOG (10 bodů)
Vytvoř pracovní dialog.`,
        examples: []
    },
    tasks: [
        '📝 TEST: Část A - Nástroje (40 bodů)',
        '📝 TEST: Část B - Gramatika (40 bodů)',
        '📝 TEST: Část C - Výslovnost (10 bodů)',
        '📝 TEST: Část D - Dialog (10 bodů)',
        '🔄 Analýza chyb a plán na příští týden'
    ],
    exercises: [
        '망치 = ?',
        '드릴 = ?',
        '줄자 = ?',
        '그라인더 = ?',
        '용접기 = ?',
        '헬멧을 쓰다 + 아/어야 하다 = ?',
        '여기 들어가다 + (으)면 안 되다 = ?',
        '이거 쓰다 + 아/어도 되다 = ?',
        '도와주다 + (으)ㄹ까요 = ?',
        '시작하다 + (으)ㅂ시다 = ?'
    ],
    notes: [
        'ODPOVĚDI NÁSTROJE:',
        '망치 = kladivo, 드릴 = vrtačka',
        '줄자 = svinovací metr, 그라인더 = bruska',
        '용접기 = svářečka',
        '',
        'ODPOVĚDI GRAMATIKA:',
        '헬멧을 써야 해요 = Musíš nosit helmu',
        '여기 들어가면 안 돼요 = Sem nesmíš vstoupit',
        '이거 써도 돼요? = Můžu tohle použít?',
        '도와줄까요? = Mám pomoct?',
        '시작합시다 = Začněme',
        '',
        'VÝSLOVNOST:',
        '연락 → [열락], 같이 → [가치]',
        '',
        'SHRNUTÍ DNY 121-134:',
        '• Materiály: 67 slov',
        '• Nástroje: 58 slov',
        '• CELKEM: 125 SLOV!',
        '• 6 gramatických struktur',
        '• 2 pravidla výslovnosti'
    ],
    isWeekend: true,
    isTest: true
};

// ============================================================================
// EXPORT
// ============================================================================

export const juneDays121to134: KoreanDayData[] = [
    day121, day122, day123, day124, day125, day126, day127,
    day128, day129, day130, day131, day132, day133, day134
];

// Kompletní červen: dny 121-150
export const juneDaysComplete: KoreanDayData[] = [
    ...juneDays121to134,
    ...juneDays135to150
];

export const juneData: KoreanMonthData = {
    month: 5,
    nameKR: '6월 - 건설 #1',
    nameCZ: 'ČERVEN 2026 - MĚSÍC 5/10 - STAVBA #1',
    targetLevel: 'A2-B1',
    targetWords: 250,
    totalWords: 1000,
    goals: [
        '250 nových slov (celkem 1000!) - MILNÍK!',
        '7 gramatických struktur',
        'Intenzivní stavební slovní zásoba',
        'Bezpečnost a příkazy na stavbě',
        'Místa a zóny na staveništi',
        'Výslovnost: 유음화, 구개음화'
    ],
    grammarOverview: [
        { kr: '-아/어야 하다', cz: 'muset' },
        { kr: '-(으)면 안 되다', cz: 'nesmí se' },
        { kr: '-아/어도 되다', cz: 'smět' },
        { kr: '-(으)ㄹ까요?', cz: 'mám...?' },
        { kr: '-(으)ㅂ시다', cz: 'pojďme' },
        { kr: '-지 마세요', cz: 'nedělej (přímý zákaz)' },
        { kr: '유음화/구개음화', cz: 'pravidla výslovnosti' }
    ],
    weeks: [
        {
            weekNumber: 1,
            dateRange: '1. - 7. ČERVNA',
            theme: 'Stavební materiály (beton, dřevo, izolace, kovy, spojovací)',
            days: [121, 122, 123, 124, 125, 126, 127]
        },
        {
            weekNumber: 2,
            dateRange: '8. - 14. ČERVNA',
            theme: 'Nástroje (ruční, měřicí, elektrické, speciální)',
            days: [128, 129, 130, 131, 132, 133, 134]
        },
        {
            weekNumber: 3,
            dateRange: '15. - 21. ČERVNA',
            theme: 'Bezpečnost (pomůcky, zařízení, nebezpečí, fráze, nouze)',
            days: [135, 136, 137, 138, 139, 140, 141]
        },
        {
            weekNumber: 4,
            dateRange: '22. - 30. ČERVNA',
            theme: 'Místa na stavbě (budova, venkovní, zóny, dočasné) + TEST',
            days: [142, 143, 144, 145, 146, 147, 148, 149, 150]
        }
    ],
    days: juneDaysComplete
};

export default juneData;
