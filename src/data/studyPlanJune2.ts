/**
 * June 2026 - Days 135-150 (Week 3-4)
 * Agent 5B output
 * STAVEBNÍ MĚSÍC #1 - Bezpečnost a místa na stavbě
 * 
 * Struktura:
 * - Dny 135-139: Bezpečnost (ochranné pomůcky, zařízení, nebezpečí, fráze, nouze)
 * - Den 140: Sobotní maraton
 * - Den 141: Nedělní test
 * - Dny 142-145: Místa na stavbě (části budovy, venkovní, zóny, dočasné)
 * - Den 146: Sobotní maraton
 * - Den 147: Nedělní test
 * - Dny 148-149: Příprava na měsíční test
 * - Den 150: MĚSÍČNÍ TEST ČERVNA
 * 
 * Gramatika: Opakování struktur z týdne 1-2
 * - -아/어야 하다 (muset)
 * - -(으)면 안 되다 (nesmí)
 * - -아/어도 되다 (smět)
 * - -(으)ㄹ까요? (mám?)
 * - -(으)ㅂ시다 (pojďme)
 */

import type { KoreanDayData } from '../types/study-db';

// ============================================================================
// DEN 135 - PO 15.6.2026 - Ochranné pomůcky
// ============================================================================
const day135: KoreanDayData = {
    day: 135,
    date: 'PO 15.6.2026',
    title: '🦺 Ochranné pomůcky',
    vocab: [
        { kr: '안전모', cz: 'helma' },
        { kr: '안전화', cz: 'bezpečnostní boty' },
        { kr: '안전조끼', cz: 'reflexní vesta' },
        { kr: '장갑', cz: 'rukavice' },
        { kr: '보안경', cz: 'ochranné brýle' },
        { kr: '귀마개', cz: 'chrániče sluchu' },
        { kr: '마스크', cz: 'respirátor' },
        { kr: '안전벨트', cz: 'bezpečnostní pás' },
        { kr: '안전대', cz: 'bezpečnostní postroj' },
        { kr: '무릎보호대', cz: 'chrániče kolen' },
        { kr: '팔꿈치보호대', cz: 'chrániče loktů' },
        { kr: '안면보호대', cz: 'obličejový štít' }
    ],
    grammar: {
        title: '-아/어야 하다 (opakování) - BEZPEČNOSTNÍ PŘÍKAZY',
        explanation: `OPAKOVÁNÍ: -아/어야 하다 = MUSÍŠ

Na stavbě je bezpečnost KLÍČOVÁ!
Každý den uslyšíš příkazy s touto gramatikou.

ZÁKLADNÍ TVAR:
• Kmen ㅏ/ㅗ + 아야 해요
• Ostatní + 어야 해요
• 하다 → 해야 해요

BEZPEČNOSTNÍ PRAVIDLA:
안전모를 써야 해요 = Musíš nosit helmu
안전화를 신어야 해요 = Musíš nosit bezp. boty
장갑을 껴야 해요 = Musíš nosit rukavice
보안경을 써야 해요 = Musíš nosit brýle

FORMÁLNÍ NA STAVBĚ:
안전모를 써야 합니다! (musíte nosit helmu!)
모든 작업자는 안전화를 착용해야 합니다!
(všichni pracovníci musí nosit bezp. boty!)`,
        examples: [
            { kr: '현장에서 안전모를 써야 해요', cz: 'Na stavbě musíš nosit helmu' },
            { kr: '높은 곳에서 안전대를 착용해야 합니다', cz: 'Ve výškách musíte nosit postroj' },
            { kr: '용접할 때 보안경을 써야 해요', cz: 'Při svařování musíš nosit brýle' },
            { kr: '귀마개를 끼고 작업해야 해요', cz: 'Musíš pracovat s chrániči sluchu' },
            { kr: '안전조끼를 입어야 합니다', cz: 'Musíte nosit vestu' },
            { kr: '마스크 없이 일하면 안 돼요', cz: 'Bez respirátoru se nesmí pracovat' }
        ]
    },
    tasks: [
        '📚 Nauč se 12 ochranných pomůcek',
        '✍️ Vytvoř 10 bezpečnostních příkazů s -아/어야 하다',
        '🗣️ Řekni 5 pravidel, co musíš na stavbě nosit',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '안전모 + 쓰다 + 아/어야 하다 → ?',
        '안전화 + 신다 + 아/어야 하다 → ?',
        '장갑 + 끼다 + 아/어야 하다 → ?',
        '보안경 + 착용하다 + 아/어야 하다 → ?',
        '안전벨트 + 하다 + 아/어야 하다 → ?'
    ],
    notes: [
        '안전 = bezpečnost (používá se jako prefix!)',
        '안전모 = 안전 + 모자 (bezp. čepice/helma)',
        '안전화 = 안전 + 신발 (bezp. obuv)',
        '착용하다 = nosit (formální), 쓰다/신다/끼다 = nosit (běžně)',
        'Na stavbě se používá formální jazyk (합니다체)!'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 136 - ÚT 16.6.2026 - Bezpečnostní zařízení
// ============================================================================
const day136: KoreanDayData = {
    day: 136,
    date: 'ÚT 16.6.2026',
    title: '🔥 Bezpečnostní zařízení',
    vocab: [
        { kr: '안전망', cz: 'záchytná síť' },
        { kr: '안전난간', cz: 'bezpečnostní zábradlí' },
        { kr: '소화기', cz: 'hasicí přístroj' },
        { kr: '응급상자', cz: 'lékárnička' },
        { kr: '비상구', cz: 'nouzový východ' },
        { kr: '경고등', cz: 'výstražné světlo' },
        { kr: '경보기', cz: 'alarm' },
        { kr: '스프링클러', cz: 'sprinkler' },
        { kr: '비상샤워', cz: 'nouzová sprcha' },
        { kr: '세안기', cz: 'oční sprcha' }
    ],
    grammar: {
        title: '-(으)면 안 되다 (opakování) - ZÁKAZY',
        explanation: `OPAKOVÁNÍ: -(으)면 안 되다 = NESMÍŠ

Na stavbě je spousta ZÁKAZŮ a VAROVÁNÍ!

ZÁKLADNÍ TVAR:
• Kmen na samohlásku + 면 안 돼요
• Kmen na souhlásku + 으면 안 돼요

BEZPEČNOSTNÍ ZÁKAZY:
소화기를 옮기면 안 돼요 = Nesmíš přemisťovat hasicí přístroj
비상구를 막으면 안 돼요 = Nesmíš blokovat nouzový východ
안전망을 제거하면 안 돼요 = Nesmíš odstraňovat záchytnou síť

DŮLEŽITÉ FRÁZE:
~없이 하면 안 돼요 = Bez ~ se to nesmí dělat
허락 없이 만지면 안 돼요 = Bez povolení se nesmí sahat`,
        examples: [
            { kr: '비상구를 막으면 안 됩니다', cz: 'Nesmíte blokovat nouzový východ' },
            { kr: '소화기 위치를 바꾸면 안 돼요', cz: 'Nesmíš měnit pozici hasicího přístroje' },
            { kr: '안전난간 없이 일하면 안 돼요', cz: 'Bez zábradlí se nesmí pracovat' },
            { kr: '경보기를 끄면 안 됩니다', cz: 'Nesmíte vypínat alarm' },
            { kr: '응급상자를 잠그면 안 돼요', cz: 'Nesmíš zamykat lékárničku' }
        ]
    },
    tasks: [
        '📚 Nauč se 10 bezpečnostních zařízení',
        '✍️ Vytvoř 10 zákazů s -(으)면 안 되다',
        '🗣️ Řekni 5 věcí, které se na stavbě nesmí',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '비상구 + 막다 + (으)면 안 되다 → ?',
        '소화기 + 옮기다 + (으)면 안 되다 → ?',
        '안전망 + 제거하다 + (으)면 안 되다 → ?',
        '경보기 + 끄다 + (으)면 안 되다 → ?',
        '응급상자 + 열다 + (으)면 안 되다 → ?'
    ],
    notes: [
        '비상 = nouze/nouzový (prefix)',
        '비상구 = 비상 + 출구 (nouzový + východ)',
        '비상샤워 = nouzová sprcha (pro chemické nehody)',
        '세안기 = oční sprcha (세안 = mytí očí)',
        '소화기 = hasicí přístroj (소화 = hašení)',
        '경고등 = výstražné světlo (경고 = varování)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 137 - ST 17.6.2026 - Nebezpečí a varování
// ============================================================================
const day137: KoreanDayData = {
    day: 137,
    date: 'ST 17.6.2026',
    title: '⚠️ Nebezpečí a varování',
    vocab: [
        { kr: '위험', cz: 'nebezpečí' },
        { kr: '주의', cz: 'pozor' },
        { kr: '금지', cz: 'zakázáno' },
        { kr: '경고', cz: 'varování' },
        { kr: '사고', cz: 'nehoda' },
        { kr: '부상', cz: 'zranění' },
        { kr: '화재', cz: 'požár' },
        { kr: '폭발', cz: 'výbuch' },
        { kr: '감전', cz: 'úraz elektrickým proudem' },
        { kr: '추락', cz: 'pád (z výšky)' },
        { kr: '낙하', cz: 'pád (předmětů)' },
        { kr: '충돌', cz: 'náraz/srážka' }
    ],
    grammar: {
        title: 'Kombinace: povinnosti + zákazy',
        explanation: `BEZPEČNOSTNÍ PRAVIDLA - KOMBINACE:

VZOR 1: Povinnost
~해야 해요/합니다 = Musíš/Musíte ~
안전모를 써야 합니다 = Musíte nosit helmu

VZOR 2: Zákaz
~(으)면 안 돼요/됩니다 = Nesmíš/Nesmíte ~
들어가면 안 됩니다 = Nesmíte vstoupit

VZOR 3: Kombinace
A를 하고, B는 하면 안 돼요
= Udělej A, ale B nesmíš
안전모를 쓰고, 달리면 안 돼요
= Nos helmu a neběhej

ZNAČKY NA STAVBĚ:
위험! = Nebezpečí!
주의! = Pozor!
금지! = Zakázáno!
경고! = Varování!`,
        examples: [
            { kr: '위험! 들어가면 안 됩니다', cz: 'Nebezpečí! Vstup zakázán' },
            { kr: '주의! 낙하물 위험', cz: 'Pozor! Nebezpečí pádu předmětů' },
            { kr: '금지! 흡연 금지', cz: 'Zakázáno! Kouření zakázáno' },
            { kr: '사고가 나면 119에 전화해야 해요', cz: 'Při nehodě musíš volat 119' },
            { kr: '부상을 당하면 응급상자를 사용하세요', cz: 'Při zranění použijte lékárničku' },
            { kr: '화재 시 비상구로 대피해야 합니다', cz: 'Při požáru musíte evakuovat nouzovým východem' }
        ]
    },
    tasks: [
        '📚 Nauč se 12 slov o nebezpečích',
        '✍️ Kombinuj povinnosti a zákazy',
        '🗣️ Přečti bezpečnostní značky nahlas',
        '📱 Přidej do Anki'
    ],
    exercises: [
        'Přelož: Nebezpečí! Vstup zakázán',
        'Přelož: Pozor! Pád předmětů',
        'Přelož: Při požáru musíš evakuovat',
        'Přelož: Bez helmy se nesmí vstoupit',
        'Přelož: Musíš hlásit nehody'
    ],
    notes: [
        '위험 vs 주의 vs 경고 vs 금지:',
        '- 위험 = nebezpečí (nejvážnější)',
        '- 경고 = varování',
        '- 주의 = pozor/opatrnost',
        '- 금지 = zákaz',
        '',
        '추락 vs 낙하:',
        '- 추락 = pád osoby (z výšky)',
        '- 낙하 = pád věcí (shora dolů)',
        '',
        '감전 = 감 (zasažení) + 전 (elektřina)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 138 - ČT 18.6.2026 - Bezpečnostní fráze
// ============================================================================
const day138: KoreanDayData = {
    day: 138,
    date: 'ČT 18.6.2026',
    title: '🗣️ Bezpečnostní fráze',
    vocab: [
        { kr: '조심하세요', cz: 'buďte opatrní' },
        { kr: '위험해요', cz: 'je to nebezpečné' },
        { kr: '만지지 마세요', cz: 'nedotýkejte se' },
        { kr: '들어가지 마세요', cz: 'nevstupujte' },
        { kr: '서 계세요', cz: 'stůjte/zůstaňte stát' },
        { kr: '물러서세요', cz: 'odstupte' },
        { kr: '119 불러요', cz: 'volejte 119' },
        { kr: '도와주세요', cz: 'pomozte' }
    ],
    grammar: {
        title: '-지 마세요 - nedělej/nezakázáno',
        explanation: `NOVÁ STRUKTURA: -지 마세요 = Nedělej(te)!

TVAR:
Kmen slovesa + 지 마세요

PŘÍKLADY:
• 만지다 → 만지지 마세요 (Nedotýkejte se)
• 들어가다 → 들어가지 마세요 (Nevstupujte)
• 열다 → 열지 마세요 (Neotvírejte)
• 닫다 → 닫지 마세요 (Nezavírejte)

ROZDÍL:
-(으)면 안 되다 = obecný zákaz (pravidlo)
-지 마세요 = přímý příkaz (teď, konkrétní situace)

"담배 피우면 안 돼요" = Kouření je zakázáno (pravidlo)
"담배 피우지 마세요!" = Nekuřte! (příkaz teď)

NA STAVBĚ:
만지지 마세요! = Nesahejte!
들어가지 마세요! = Nevstupujte!
물러서세요! = Odstupte! (jiná struktura)`,
        examples: [
            { kr: '만지지 마세요! 위험해요!', cz: 'Nesahejte! Je to nebezpečné!' },
            { kr: '여기 들어가지 마세요', cz: 'Sem nevstupujte' },
            { kr: '조심하세요! 낙하물 주의!', cz: 'Opatrně! Pozor na padající předměty!' },
            { kr: '물러서세요! 위험합니다!', cz: 'Odstupte! Je to nebezpečné!' },
            { kr: '119 불러요! 사고가 났어요!', cz: 'Volejte 119! Stala se nehoda!' },
            { kr: '도와주세요! 부상자가 있어요!', cz: 'Pomozte! Je tu zraněný!' }
        ]
    },
    tasks: [
        '📚 Nauč se 8 bezpečnostních frází',
        '✍️ Procvičuj -지 마세요',
        '🗣️ Řekni 5 příkazů co nedělat',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '만지다 + 지 마세요 → ?',
        '들어가다 + 지 마세요 → ?',
        '열다 + 지 마세요 → ?',
        '뛰다 (běžet) + 지 마세요 → ?',
        '담배 피우다 + 지 마세요 → ?'
    ],
    notes: [
        '조심하세요 = buďte opatrní (조심 = opatrnost)',
        '물러서세요 = odstupte (물러서다 = ustoupit)',
        '서 계세요 = stůjte (서다 + 계시다 = stát + zdvořilé)',
        '',
        '119 = číslo záchranné služby/hasičů v Koreji',
        '112 = policie v Koreji',
        '',
        'DŮLEŽITÉ FRÁZE PRO NOUZI:',
        '도와주세요! = Pomozte!',
        '119 불러 주세요! = Prosím zavolejte 119!'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 139 - PÁ 19.6.2026 - Nouzové situace
// ============================================================================
const day139: KoreanDayData = {
    day: 139,
    date: 'PÁ 19.6.2026',
    title: '🚨 Nouzové situace',
    vocab: [
        { kr: '응급', cz: 'nouze/nouzový' },
        { kr: '구조', cz: 'záchrana' },
        { kr: '신고', cz: 'nahlášení' },
        { kr: '대피', cz: 'evakuace' },
        { kr: '119', cz: 'hasiči/záchranka' },
        { kr: '112', cz: 'policie' },
        { kr: '구급차', cz: 'sanitka' },
        { kr: '소방차', cz: 'hasičské auto' },
        { kr: '대피소', cz: 'úkryt' },
        { kr: '집합장소', cz: 'shromaždiště' }
    ],
    grammar: {
        title: 'Nouzové příkazy - shrnutí',
        explanation: `NOUZOVÉ SITUACE - GRAMATIKA:

1. POVINNOST (-아/어야 하다):
대피해야 해요! = Musíš evakuovat!
신고해야 합니다! = Musíte nahlásit!

2. ZÁKAZ (-(으)면 안 되다):
엘리베이터를 사용하면 안 돼요!
= Nesmíš používat výtah!

3. PŘÍMÝ PŘÍKAZ (-지 마세요):
뛰지 마세요! = Neběhejte!
패닉하지 마세요! = Nepanikařte!

4. NÁVRH/NABÍDKA (-(으)ㄹ까요?):
119에 전화할까요? = Mám volat 119?
도와줄까요? = Mám pomoct?

5. POJĎME (-(으)ㅂ시다):
대피합시다! = Evakuujme!
침착합시다! = Zůstaňme v klidu!

NOUZOVÝ POSTUP:
1. 침착하세요 = Uklidněte se
2. 119에 신고하세요 = Nahlaste na 119
3. 대피하세요 = Evakuujte
4. 집합장소로 가세요 = Jděte na shromaždiště`,
        examples: [
            { kr: '119에 신고해야 해요!', cz: 'Musíš nahlásit na 119!' },
            { kr: '화재 시 엘리베이터 사용하면 안 돼요', cz: 'Při požáru nesmíš používat výtah' },
            { kr: '뛰지 마세요! 침착하게 대피하세요!', cz: 'Neběhejte! Klidně evakuujte!' },
            { kr: '구급차 부를까요?', cz: 'Mám volat sanitku?' },
            { kr: '집합장소로 갑시다!', cz: 'Pojďme na shromaždiště!' },
            { kr: '대피소가 어디예요?', cz: 'Kde je úkryt?' }
        ]
    },
    tasks: [
        '📚 Nauč se 10 slov o nouzových situacích',
        '✍️ Procvičuj všech 5 gramatických struktur',
        '🗣️ Nacvič nouzový postup korejsky',
        '📱 Přidej do Anki',
        '🔁 Opakuj slovíčka z dní 135-138'
    ],
    exercises: [
        'Přelož: Musíte evakuovat!',
        'Přelož: Nesmíte používat výtah!',
        'Přelož: Neběhejte!',
        'Přelož: Mám volat záchranku?',
        'Přelož: Pojďme na shromaždiště!'
    ],
    notes: [
        '응급 = nouze (prefix pro nouzové situace)',
        '응급상자 = lékárnička',
        '응급처치 = první pomoc',
        '',
        '구조 = záchrana, 구조대 = záchranný tým',
        '구급차 = sanitka (구급 = záchrana + 차 = auto)',
        '소방차 = hasičské auto (소방 = hašení)',
        '',
        '신고 = nahlášení (na úřady/policii)',
        '대피 = evakuace, 대피소 = úkryt',
        '집합장소 = shromaždiště (집합 = shromáždění)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 140 - SO 20.6.2026 - SOBOTNÍ MARATON
// ============================================================================
const day140: KoreanDayData = {
    day: 140,
    date: 'SO 20.6.2026',
    title: '⭐ SOBOTNÍ MARATON - Bezpečnost kompletně',
    vocab: [],
    grammar: {
        title: 'Opakování: Bezpečnost na stavbě',
        explanation: `8 HODINOVÝ MARATON - BEZPEČNOST

SHRNUTÍ TÝDNE 3 (Dny 135-139):

DEN 135 - OCHRANNÉ POMŮCKY (12 slov):
안전모, 안전화, 안전조끼, 장갑, 보안경
귀마개, 마스크, 안전벨트, 안전대
무릎보호대, 팔꿈치보호대, 안면보호대

DEN 136 - BEZPEČNOSTNÍ ZAŘÍZENÍ (10 slov):
안전망, 안전난간, 소화기, 응급상자, 비상구
경고등, 경보기, 스프링클러, 비상샤워, 세안기

DEN 137 - NEBEZPEČÍ (12 slov):
위험, 주의, 금지, 경고, 사고, 부상
화재, 폭발, 감전, 추락, 낙하, 충돌

DEN 138 - BEZPEČNOSTNÍ FRÁZE (8 slov):
조심하세요, 위험해요, 만지지 마세요
들어가지 마세요, 서 계세요, 물러서세요
119 불러요, 도와주세요

DEN 139 - NOUZOVÉ SITUACE (10 slov):
응급, 구조, 신고, 대피, 119, 112
구급차, 소방차, 대피소, 집합장소

CELKEM TÝDEN 3: 52 SLOV`,
        examples: [
            { kr: '안전모를 써야 합니다', cz: 'Musíte nosit helmu' },
            { kr: '비상구를 막으면 안 됩니다', cz: 'Nesmíte blokovat nouzový východ' },
            { kr: '만지지 마세요!', cz: 'Nesahejte!' },
            { kr: '119에 전화할까요?', cz: 'Mám volat 119?' },
            { kr: '대피합시다!', cz: 'Evakuujme!' }
        ]
    },
    tasks: [
        '⏰ Hodina 1-2: Opakování ochranných pomůcek (12 slov)',
        '⏰ Hodina 3-4: Opakování bezp. zařízení + nebezpečí (22 slov)',
        '⏰ Hodina 5-6: Bezpečnostní fráze + nouzové situace (18 slov)',
        '⏰ Hodina 7-8: Gramatika a dialogy',
        '📱 Anki: Všech 52 slov z týdne'
    ],
    exercises: [
        'Vytvoř 10 bezpečnostních příkazů',
        'Vytvoř 10 zákazů',
        'Nacvič nouzový dialog',
        'Překlad: "Při požáru musíte evakuovat nouzovým východem"'
    ],
    notes: [
        'GRAMATIKA TÝDNE 3:',
        '• -아/어야 하다 = musíš (povinnost)',
        '• -(으)면 안 되다 = nesmíš (zákaz)',
        '• -지 마세요 = nedělej (přímý zákaz)',
        '• -(으)ㄹ까요? = mám...? (nabídka)',
        '• -(으)ㅂ시다 = pojďme (návrh)',
        '',
        '52 BEZPEČNOSTNÍCH SLOV!'
    ],
    isWeekend: true,
    isTest: false
};

// ============================================================================
// DEN 141 - NE 21.6.2026 - NEDĚLNÍ TEST
// ============================================================================
const day141: KoreanDayData = {
    day: 141,
    date: 'NE 21.6.2026',
    title: '📝 NEDĚLNÍ TEST - Bezpečnost',
    vocab: [],
    grammar: {
        title: 'TEST: Bezpečnost na stavbě',
        explanation: `TESTOVÉ OBLASTI:

ČÁST A: SLOVÍČKA (30 bodů)
Přelož z češtiny do korejštiny:
- Helma, bezp. boty, rukavice, brýle
- Hasicí přístroj, lékárnička, nouzový východ
- Nebezpečí, varování, požár, zranění
- Sanitka, evakuace, shromaždiště

ČÁST B: GRAMATIKA (40 bodů)
1. -아/어야 하다: 안전모를 쓰다 → ?
2. -(으)면 안 되다: 비상구를 막다 → ?
3. -지 마세요: 만지다 → ?
4. -(으)ㄹ까요?: 119에 전화하다 → ?
5. -(으)ㅂ시다: 대피하다 → ?

ČÁST C: FRÁZE (20 bodů)
Přelož celé věty:
- Buďte opatrní!
- Je to nebezpečné!
- Nevstupujte!
- Pomozte!

ČÁST D: DIALOG (10 bodů)
Vytvoř nouzový dialog.`,
        examples: []
    },
    tasks: [
        '📝 TEST: Část A - Slovíčka (30 bodů)',
        '📝 TEST: Část B - Gramatika (40 bodů)',
        '📝 TEST: Část C - Fráze (20 bodů)',
        '📝 TEST: Část D - Dialog (10 bodů)',
        '🔄 Opakování chyb'
    ],
    exercises: [
        '안전모 = ?',
        '안전화 = ?',
        '소화기 = ?',
        '비상구 = ?',
        '위험 = ?',
        '화재 = ?',
        '구급차 = ?',
        '대피 = ?',
        '안전모를 쓰다 + 아/어야 하다 = ?',
        '비상구를 막다 + (으)면 안 되다 = ?',
        '만지다 + 지 마세요 = ?',
        '대피하다 + (으)ㅂ시다 = ?'
    ],
    notes: [
        'ODPOVĚDI:',
        '안전모 = helma, 안전화 = bezp. boty',
        '소화기 = hasicí přístroj, 비상구 = nouzový východ',
        '위험 = nebezpečí, 화재 = požár',
        '구급차 = sanitka, 대피 = evakuace',
        '',
        '안전모를 써야 해요 = Musíš nosit helmu',
        '비상구를 막으면 안 돼요 = Nesmíš blokovat nouz. východ',
        '만지지 마세요 = Nesahejte',
        '대피합시다 = Evakuujme',
        '',
        'FRÁZE:',
        '조심하세요! = Buďte opatrní!',
        '위험해요! = Je to nebezpečné!',
        '들어가지 마세요! = Nevstupujte!',
        '도와주세요! = Pomozte!'
    ],
    isWeekend: true,
    isTest: true
};

// ============================================================================
// DEN 142 - PO 22.6.2026 - Části budovy
// ============================================================================
const day142: KoreanDayData = {
    day: 142,
    date: 'PO 22.6.2026',
    title: '🏢 Části budovy',
    vocab: [
        { kr: '기초', cz: 'základy' },
        { kr: '지하실', cz: 'sklep' },
        { kr: '1층', cz: 'přízemí' },
        { kr: '옥상', cz: 'střecha (plochá)' },
        { kr: '계단', cz: 'schodiště' },
        { kr: '복도', cz: 'chodba' },
        { kr: '방', cz: 'místnost' },
        { kr: '화장실', cz: 'záchod' },
        { kr: '창문', cz: 'okno' },
        { kr: '문', cz: 'dveře' },
        { kr: '벽', cz: 'zeď' },
        { kr: '천장', cz: 'strop' }
    ],
    grammar: {
        title: '-에서 - místo činnosti',
        explanation: `OPAKOVÁNÍ: -에서 = v/na (kde se něco DĚJE)

ROZDÍL -에 vs -에서:
• -에 = kde něco JE (staticky)
• -에서 = kde se něco DĚJE (dynamicky)

PŘÍKLADY:
집에 있어요 = Jsem doma (staticky)
집에서 일해요 = Pracuji doma (dynamicky)

NA STAVBĚ:
1층에서 작업해요 = Pracuji v přízemí
지하실에서 일해요 = Pracuji ve sklepě
옥상에서 점심 먹어요 = Obědvám na střeše
계단에서 뛰면 안 돼요 = Na schodech se nesmí běhat

POZICE + ČINNOST:
복도에서 담배 피우면 안 됩니다
= Na chodbě se nesmí kouřit`,
        examples: [
            { kr: '1층에서 작업하고 있어요', cz: 'Pracuji v přízemí' },
            { kr: '지하실에서 자재를 보관해요', cz: 'Ve sklepě skladuji materiál' },
            { kr: '옥상에서 일할 때 안전대를 써야 해요', cz: 'Při práci na střeše musíš nosit postroj' },
            { kr: '계단에서 뛰지 마세요', cz: 'Na schodech neběhejte' },
            { kr: '복도에 뭐가 있어요?', cz: 'Co je na chodbě?' },
            { kr: '이 방에서 회의합시다', cz: 'Pojďme mít schůzi v této místnosti' }
        ]
    },
    tasks: [
        '📚 Nauč se 12 částí budovy',
        '✍️ Procvičuj -에 vs -에서',
        '🗣️ Popiš stavbu: co je kde a co se kde dělá',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '1층 + 에서 + 작업하다 → ?',
        '지하실 + 에 + 있다 → ?',
        '옥상 + 에서 + 일하다 → ?',
        '계단 + 에서 + 뛰다 + 지 마세요 → ?',
        '이 방 + 에서 + 회의하다 + ㅂ시다 → ?'
    ],
    notes: [
        '층 = patro (1층 = přízemí, 2층 = první patro)',
        'V Koreji 1층 = přízemí (jako v USA)!',
        '지하 = podzemí, 지하실 = sklep, 지하1층 = 1. podzemní',
        '옥상 = plochá střecha (kam se dá jít)',
        '지붕 = střecha (šikmá, obecně)',
        '',
        '화장실 = záchod (화장 = líčení, 실 = místnost)',
        '복도 = chodba',
        '방 = místnost/pokoj'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 143 - ÚT 23.6.2026 - Venkovní prostory
// ============================================================================
const day143: KoreanDayData = {
    day: 143,
    date: 'ÚT 23.6.2026',
    title: '🏗️ Venkovní prostory staveniště',
    vocab: [
        { kr: '현장', cz: 'staveniště' },
        { kr: '마당', cz: 'dvůr' },
        { kr: '주차장', cz: 'parkoviště' },
        { kr: '창고', cz: 'sklad' },
        { kr: '사무실', cz: 'kancelář' },
        { kr: '휴게실', cz: 'odpočívárna' },
        { kr: '식당', cz: 'jídelna' },
        { kr: '샤워실', cz: 'sprchy' },
        { kr: '탈의실', cz: 'šatna' }
    ],
    grammar: {
        title: '어디에 있어요? + 어디에서 해요?',
        explanation: `ORIENTACE NA STAVENIŠTI:

OTÁZKA NA MÍSTO (staticky):
~이/가 어디에 있어요?
= Kde je ~?
사무실이 어디에 있어요? = Kde je kancelář?

OTÁZKA NA MÍSTO (dynamicky):
어디에서 ~해요?
= Kde (se) ~?
어디에서 점심 먹어요? = Kde obědváte?

ODPOVĚDI:
~에 있어요 = Je v/na ~
~에서 해요 = Dělám to v/na ~

PRAKTICKÉ DIALOGY:
A: 창고가 어디에 있어요?
B: 주차장 옆에 있어요.

A: 점심 어디에서 먹어요?
B: 식당에서 먹어요.`,
        examples: [
            { kr: '현장이 어디에 있어요?', cz: 'Kde je staveniště?' },
            { kr: '사무실은 2층에 있어요', cz: 'Kancelář je ve 2. patře' },
            { kr: '점심은 식당에서 먹어요', cz: 'Oběd jím v jídelně' },
            { kr: '창고에서 자재를 가져와요', cz: 'Ze skladu přináším materiál' },
            { kr: '샤워실이 어디예요?', cz: 'Kde jsou sprchy?' },
            { kr: '탈의실에서 옷을 갈아입으세요', cz: 'V šatně se převlékněte' }
        ]
    },
    tasks: [
        '📚 Nauč se 9 venkovních prostor',
        '✍️ Procvičuj otázky a odpovědi na místo',
        '🗣️ Popiš uspořádání staveniště',
        '📱 Přidej do Anki'
    ],
    exercises: [
        'Přelož: Kde je sklad?',
        'Přelož: Kancelář je vedle parkoviště',
        'Přelož: Kde obědváte?',
        'Přelož: V jídelně obědvám',
        'Přelož: Převlékněte se v šatně'
    ],
    notes: [
        '현장 = staveniště/pracoviště (건설현장 = staveniště)',
        '창고 = sklad (jakýkoli)',
        '자재창고 = sklad materiálu (자재 = materiál)',
        '',
        '휴게실 = odpočívárna (휴게 = odpočinek)',
        '식당 = jídelna/restaurace',
        '샤워실 = sprchy (샤워 = sprcha + 실 = místnost)',
        '탈의실 = šatna (탈의 = svlékání)',
        '',
        '옆에 = vedle',
        '앞에 = před',
        '뒤에 = za'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 144 - ST 24.6.2026 - Pracovní zóny
// ============================================================================
const day144: KoreanDayData = {
    day: 144,
    date: 'ST 24.6.2026',
    title: '🔨 Pracovní zóny',
    vocab: [
        { kr: '작업장', cz: 'pracoviště' },
        { kr: '자재창고', cz: 'sklad materiálu' },
        { kr: '폐기물장', cz: 'odpadní místo' },
        { kr: '세척장', cz: 'místo na čištění' },
        { kr: '용접장', cz: 'svařovna' },
        { kr: '목공장', cz: 'truhlárna' },
        { kr: '철근가공장', cz: 'železárna' },
        { kr: '혼합장', cz: 'míchací místo' }
    ],
    grammar: {
        title: '-에서 + činnost - pracovní zóny',
        explanation: `PRACOVNÍ ZÓNY A ČINNOSTI:

VZOR: [zóna]에서 [činnost]해요

PŘÍKLADY:
용접장에서 용접해요 = Ve svařovně svařuji
목공장에서 나무를 자라요 = V truhlárně řežu dřevo
철근가공장에서 철근을 구부려요 = V železárně ohýbám výztuž
혼합장에서 콘크리트를 섞어요 = Na míchacím místě míchám beton

PRAVIDLA PRO ZÓNY:
작업장에서 안전모를 써야 해요
= Na pracovišti musíš nosit helmu

용접장에서 보안경을 착용해야 합니다
= Ve svařovně musíte nosit brýle

폐기물장에서 담배 피우면 안 돼요
= Na odpadním místě se nesmí kouřit`,
        examples: [
            { kr: '작업장에서 안전모를 써야 해요', cz: 'Na pracovišti musíš nosit helmu' },
            { kr: '자재창고에서 자재를 가져오세요', cz: 'Přineste materiál ze skladu' },
            { kr: '폐기물장에 쓰레기를 버리세요', cz: 'Vyhoďte odpad na odpadní místo' },
            { kr: '세척장에서 공구를 씻을까요?', cz: 'Mám umýt nástroje na místě na čištění?' },
            { kr: '용접장에서 일합시다', cz: 'Pojďme pracovat ve svařovně' },
            { kr: '혼합장이 어디에 있어요?', cz: 'Kde je míchací místo?' }
        ]
    },
    tasks: [
        '📚 Nauč se 8 pracovních zón',
        '✍️ Vytvoř věty: zóna + činnost',
        '🗣️ Popiš co se dělá v každé zóně',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '용접장 + 에서 + 용접하다 → ?',
        '목공장 + 에서 + 나무를 자르다 → ?',
        '폐기물장 + 에 + 버리다 → ?',
        '혼합장 + 에서 + 콘크리트를 섞다 → ?',
        '자재창고 + 에서 + 가져오다 → ?'
    ],
    notes: [
        '장 = místo/prostor (suffix)',
        '작업장 = pracoviště (작업 = práce)',
        '자재창고 = sklad materiálu',
        '폐기물장 = odpadní místo (폐기물 = odpad)',
        '',
        '세척장 = místo na čištění (세척 = čištění)',
        '용접장 = svařovna (용접 = svařování)',
        '목공장 = truhlárna (목공 = truhlářství)',
        '철근가공장 = železárna (철근가공 = zpracování výztuže)',
        '혼합장 = míchací místo (혼합 = míchání)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 145 - ČT 25.6.2026 - Dočasné konstrukce
// ============================================================================
const day145: KoreanDayData = {
    day: 145,
    date: 'ČT 25.6.2026',
    title: '🏗️ Dočasné konstrukce',
    vocab: [
        { kr: '가설물', cz: 'dočasná konstrukce' },
        { kr: '비계', cz: 'lešení' },
        { kr: '발판', cz: 'plošina' },
        { kr: '난간', cz: 'zábradlí' },
        { kr: '안전망', cz: 'záchytná síť' },
        { kr: '임시전기', cz: 'dočasná elektřina' },
        { kr: '임시조명', cz: 'dočasné osvětlení' },
        { kr: '임시화장실', cz: 'mobilní záchod' },
        { kr: '컨테이너', cz: 'kontejner' },
        { kr: '가설사무실', cz: 'stavební buňka' }
    ],
    grammar: {
        title: '임시/가설 + podstatné jméno',
        explanation: `DOČASNÉ VĚCI NA STAVBĚ:

PREFIX 임시- = dočasný/provizorní
임시전기 = dočasná elektřina
임시조명 = dočasné osvětlení
임시화장실 = mobilní záchod

PREFIX 가설- = dočasný (konstrukce)
가설물 = dočasná konstrukce
가설사무실 = stavební buňka

BEZPEČNOST NA LEŠENÍ:
비계에서 일할 때 안전대를 써야 해요
= Na lešení musíš nosit postroj

발판이 없으면 올라가면 안 돼요
= Bez plošiny se nesmí lézt

난간을 제거하면 안 됩니다
= Nesmíte odstraňovat zábradlí

안전망 없이 작업하면 안 돼요
= Bez záchytné sítě se nesmí pracovat`,
        examples: [
            { kr: '비계에서 일할 때 조심하세요', cz: 'Na lešení pracujte opatrně' },
            { kr: '발판이 튼튼해야 해요', cz: 'Plošina musí být pevná' },
            { kr: '난간을 잡으세요', cz: 'Držte se zábradlí' },
            { kr: '임시전기를 연결해야 해요', cz: 'Musíš připojit dočasnou elektřinu' },
            { kr: '가설사무실에서 회의합시다', cz: 'Pojďme mít schůzi v buňce' },
            { kr: '컨테이너에 공구를 보관해요', cz: 'V kontejneru skladuji nástroje' }
        ]
    },
    tasks: [
        '📚 Nauč se 10 dočasných konstrukcí',
        '✍️ Procvičuj 임시/가설 + podstatné jméno',
        '🗣️ Popiš bezpečnost na lešení',
        '📱 Přidej do Anki',
        '🔁 Opakuj slovíčka z dní 142-144'
    ],
    exercises: [
        'Přelož: Na lešení musíš nosit postroj',
        'Přelož: Bez plošiny se nesmí lézt',
        'Přelož: Držte se zábradlí',
        'Přelož: Pojďme do stavební buňky',
        'Přelož: Kde je mobilní záchod?'
    ],
    notes: [
        '비계 = lešení (tradiční korejské slovo)',
        '발판 = plošina/stupeň (발 = noha + 판 = deska)',
        '난간 = zábradlí',
        '',
        '임시 = dočasný (obecně)',
        '가설 = dočasný (stavební kontext)',
        '가설물 = jakákoliv dočasná konstrukce',
        '',
        '컨테이너 = kontejner (z angličtiny)',
        '가설사무실 = stavební buňka (dočasná kancelář)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 146 - PÁ 26.6.2026 - Opakování týdne
// ============================================================================
const day146: KoreanDayData = {
    day: 146,
    date: 'PÁ 26.6.2026',
    title: '📚 Opakování týdne 4',
    vocab: [],
    grammar: {
        title: 'Shrnutí: Místa na stavbě',
        explanation: `SHRNUTÍ TÝDNE 4 (Dny 142-145):

DEN 142 - ČÁSTI BUDOVY (12 slov):
기초, 지하실, 1층, 옥상
계단, 복도, 방, 화장실
창문, 문, 벽, 천장

DEN 143 - VENKOVNÍ PROSTORY (9 slov):
현장, 마당, 주차장, 창고
사무실, 휴게실, 식당
샤워실, 탈의실

DEN 144 - PRACOVNÍ ZÓNY (8 slov):
작업장, 자재창고, 폐기물장, 세척장
용접장, 목공장, 철근가공장, 혼합장

DEN 145 - DOČASNÉ KONSTRUKCE (10 slov):
가설물, 비계, 발판, 난간, 안전망
임시전기, 임시조명, 임시화장실
컨테이너, 가설사무실

CELKEM TÝDEN 4: 39 SLOV

GRAMATIKA:
• -에 = kde něco JE
• -에서 = kde se něco DĚJE
• Kombinace s příkazy a zákazy`,
        examples: [
            { kr: '1층에서 작업해요', cz: 'Pracuji v přízemí' },
            { kr: '창고가 어디에 있어요?', cz: 'Kde je sklad?' },
            { kr: '용접장에서 용접해요', cz: 'Ve svařovně svařuji' },
            { kr: '비계에서 안전대를 써야 해요', cz: 'Na lešení musíš nosit postroj' }
        ]
    },
    tasks: [
        '📚 Opakuj všech 39 slov z týdne 4',
        '✍️ Procvičuj -에 vs -에서',
        '🗣️ Popiš celé staveniště korejsky',
        '📱 Anki marathon'
    ],
    focus: [
        'Části budovy: 기초, 지하실, 1층, 옥상, 계단, 복도...',
        'Venkovní: 현장, 마당, 주차장, 창고, 사무실...',
        'Pracovní zóny: 작업장, 용접장, 목공장...',
        'Dočasné: 비계, 발판, 난간, 컨테이너...'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 147 - SO 27.6.2026 - SOBOTNÍ MARATON
// ============================================================================
const day147: KoreanDayData = {
    day: 147,
    date: 'SO 27.6.2026',
    title: '⭐ SOBOTNÍ MARATON - Místa kompletně',
    vocab: [],
    grammar: {
        title: 'Opakování: Všechna místa na stavbě',
        explanation: `8 HODINOVÝ MARATON - MÍSTA

PŘEHLED TÝDNE 4 (39 slov):

ČÁSTI BUDOVY (12):
기초 (základy), 지하실 (sklep), 1층 (přízemí)
옥상 (střecha), 계단 (schodiště), 복도 (chodba)
방 (místnost), 화장실 (záchod), 창문 (okno)
문 (dveře), 벽 (zeď), 천장 (strop)

VENKOVNÍ PROSTORY (9):
현장 (staveniště), 마당 (dvůr), 주차장 (parkoviště)
창고 (sklad), 사무실 (kancelář), 휴게실 (odpočívárna)
식당 (jídelna), 샤워실 (sprchy), 탈의실 (šatna)

PRACOVNÍ ZÓNY (8):
작업장, 자재창고, 폐기물장, 세척장
용접장, 목공장, 철근가공장, 혼합장

DOČASNÉ KONSTRUKCE (10):
가설물, 비계, 발판, 난간, 안전망
임시전기, 임시조명, 임시화장실
컨테이너, 가설사무실`,
        examples: []
    },
    tasks: [
        '⏰ Hodina 1-2: Části budovy (12 slov)',
        '⏰ Hodina 3-4: Venkovní prostory (9 slov)',
        '⏰ Hodina 5-6: Pracovní zóny + dočasné (18 slov)',
        '⏰ Hodina 7-8: Kombinace s gramatikou',
        '📱 Anki: Všech 39 slov'
    ],
    exercises: [
        'Popiš celou budovu (od základů po střechu)',
        'Popiš staveniště (všechny prostory)',
        'Vytvoř 10 vět s -에서',
        'Vytvoř 10 bezpečnostních pravidel pro místa'
    ],
    notes: [
        'CELKEM TÝDEN 3+4: 91 SLOV',
        '• Bezpečnost: 52 slov',
        '• Místa: 39 slov',
        '',
        'GRAMATIKA:',
        '• -에 = kde něco JE',
        '• -에서 = kde se něco DĚJE',
        '• Kombinace s 아/어야 하다, (으)면 안 되다'
    ],
    isWeekend: true,
    isTest: false
};

// ============================================================================
// DEN 148 - NE 28.6.2026 - NEDĚLNÍ TEST
// ============================================================================
const day148: KoreanDayData = {
    day: 148,
    date: 'NE 28.6.2026',
    title: '📝 NEDĚLNÍ TEST - Místa na stavbě',
    vocab: [],
    grammar: {
        title: 'TEST: Místa na stavbě',
        explanation: `TESTOVÉ OBLASTI:

ČÁST A: SLOVÍČKA (30 bodů)
Části budovy:
- základy, sklep, přízemí, střecha
- schodiště, chodba, místnost

Venkovní prostory:
- staveniště, sklad, kancelář, jídelna

Pracovní zóny:
- pracoviště, svařovna, truhlárna

Dočasné konstrukce:
- lešení, plošina, zábradlí, buňka

ČÁST B: GRAMATIKA (40 bodů)
-에 vs -에서:
- 사무실___ 있어요 (kde JE)
- 사무실___ 일해요 (kde DĚLÁM)

Kombinace s příkazy/zákazy

ČÁST C: VĚTY (30 bodů)
Překlad vět o místech a činnostech`,
        examples: []
    },
    tasks: [
        '📝 TEST: Část A - Slovíčka (30 bodů)',
        '📝 TEST: Část B - Gramatika (40 bodů)',
        '📝 TEST: Část C - Věty (30 bodů)',
        '🔄 Analýza chyb'
    ],
    exercises: [
        '기초 = ?',
        '1층 = ?',
        '현장 = ?',
        '작업장 = ?',
        '비계 = ?',
        '컨테이너 = ?',
        '사무실 + 에 + 있다 → ?',
        '사무실 + 에서 + 일하다 → ?',
        '비계 + 에서 + 안전대를 쓰다 + 아야 하다 → ?'
    ],
    notes: [
        'ODPOVĚDI SLOVÍČKA:',
        '기초 = základy, 1층 = přízemí',
        '현장 = staveniště, 작업장 = pracoviště',
        '비계 = lešení, 컨테이너 = kontejner',
        '',
        'ODPOVĚDI GRAMATIKA:',
        '사무실에 있어요 = Je v kanceláři',
        '사무실에서 일해요 = Pracuji v kanceláři',
        '비계에서 안전대를 써야 해요 = Na lešení musíš nosit postroj'
    ],
    isWeekend: true,
    isTest: true
};

// ============================================================================
// DEN 149 - PO 29.6.2026 - Příprava na měsíční test
// ============================================================================
const day149: KoreanDayData = {
    day: 149,
    date: 'PO 29.6.2026',
    title: '📝 Příprava na měsíční test',
    vocab: [],
    grammar: {
        title: 'ČERVEN - Kompletní přehled',
        explanation: `KOMPLETNÍ PŘEHLED ČERVNA:

TÝDEN 1 (Dny 121-127) - MATERIÁLY:
• Beton: 시멘트, 콘크리트, 레미콘, 골재...
• Dřevo: 목재, 합판, 각목, OSB...
• Izolace: 단열재, 스티로폼, 유리면...
• Kovy: 철, 알루미늄, 스테인리스...
• Spojovací: 못, 나사, 볼트, 앵커...
Celkem: 67 slov

TÝDEN 2 (Dny 128-134) - NÁSTROJE:
• Ruční: 망치, 드라이버, 톱, 끌...
• Měřicí: 줄자, 수평계, 직각자...
• Elektrické: 드릴, 그라인더, 원형톱...
• Speciální: 용접기, 컴프레서...
Celkem: 58 slov

TÝDEN 3 (Dny 135-141) - BEZPEČNOST:
• Pomůcky: 안전모, 안전화, 장갑...
• Zařízení: 소화기, 비상구, 경보기...
• Nebezpečí: 위험, 사고, 화재...
• Fráze: 조심하세요, 만지지 마세요...
Celkem: 52 slov

TÝDEN 4 (Dny 142-148) - MÍSTA:
• Budova: 기초, 지하실, 1층...
• Venkovní: 현장, 창고, 사무실...
• Zóny: 작업장, 용접장...
• Dočasné: 비계, 컨테이너...
Celkem: 39 slov

CELKEM ČERVEN: ~216 SLOV`,
        examples: []
    },
    tasks: [
        '📚 Opakuj všechna slovíčka června',
        '✍️ Procvič všech 6 gramatických struktur',
        '🗣️ Nacvič pracovní dialogy',
        '📱 Anki mega-marathon'
    ],
    focus: [
        'GRAMATIKA ČERVNA:',
        '• -아/어야 하다 = musíš',
        '• -(으)면 안 되다 = nesmíš',
        '• -아/어도 되다 = smíš',
        '• -(으)ㄹ까요? = mám?',
        '• -(으)ㅂ시다 = pojďme',
        '• -지 마세요 = nedělej',
        '',
        'VÝSLOVNOST:',
        '• 유음화: 연락 → [열락]',
        '• 구개음화: 같이 → [가치]'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 150 - ÚT 30.6.2026 - MĚSÍČNÍ TEST ČERVNA
// ============================================================================
const day150: KoreanDayData = {
    day: 150,
    date: 'ÚT 30.6.2026',
    title: '🏆 MĚSÍČNÍ TEST ČERVNA - STAVBA #1',
    vocab: [],
    grammar: {
        title: 'MĚSÍČNÍ TEST ČERVNA',
        explanation: `Čas: 3 hodiny
Celkem: 100 bodů
TÉMA: STAVEBNÍ TERMÍNY

═══════════════════════════════════════

ČÁST A: MATERIÁLY (15 bodů)
시멘트, 콘크리트, 목재, 단열재, 철

ČÁST B: NÁSTROJE (15 bodů)
망치, 드릴, 줄자, 그라인더, 용접기

ČÁST C: BEZPEČNOST (15 bodů)
안전모, 소화기, 비상구, 위험, 사고

ČÁST D: MÍSTA (15 bodů)
현장, 작업장, 비계, 1층, 지하실

ČÁST E: GRAMATIKA (25 bodů)
6 gramatických struktur

ČÁST F: DIALOGY (15 bodů)
Pracovní situace na stavbě

═══════════════════════════════════════`,
        examples: []
    },
    tasks: [
        '📝 ČÁST A: Materiály (15 bodů)',
        '📝 ČÁST B: Nástroje (15 bodů)',
        '📝 ČÁST C: Bezpečnost (15 bodů)',
        '📝 ČÁST D: Místa (15 bodů)',
        '📝 ČÁST E: Gramatika (25 bodů)',
        '📝 ČÁST F: Dialogy (15 bodů)'
    ],
    exercises: [
        '═══════════════════════════════════════',
        'ČÁST A: MATERIÁLY (15 bodů)',
        '═══════════════════════════════════════',
        '',
        'Přelož CZ → KR:',
        '1. cement = ___',
        '2. beton = ___',
        '3. překližka = ___',
        '4. izolace = ___',
        '5. nerez = ___',
        '6. hřebík = ___',
        '7. šroub = ___',
        '8. kotva = ___',
        '',
        'Přelož KR → CZ:',
        '9. 철 = ___',
        '10. 알루미늄 = ___',
        '11. 목재 = ___',
        '12. 석고보드 = ___',
        '13. 스티로폼 = ___',
        '14. 방수시트 = ___',
        '15. 볼트 = ___',
        '',
        '═══════════════════════════════════════',
        'ČÁST B: NÁSTROJE (15 bodů)',
        '═══════════════════════════════════════',
        '',
        'Přelož CZ → KR:',
        '1. kladivo = ___',
        '2. šroubovák = ___',
        '3. vrtačka = ___',
        '4. svinovací metr = ___',
        '5. vodováha = ___',
        '6. úhlová bruska = ___',
        '7. okružní pila = ___',
        '',
        'Přelož KR → CZ:',
        '8. 톱 = ___',
        '9. 끌 = ___',
        '10. 직각자 = ___',
        '11. 충전드릴 = ___',
        '12. 용접기 = ___',
        '13. 컴프레서 = ___',
        '14. 렌치 = ___',
        '15. 펜치 = ___',
        '',
        '═══════════════════════════════════════',
        'ČÁST C: BEZPEČNOST (15 bodů)',
        '═══════════════════════════════════════',
        '',
        'Přelož CZ → KR:',
        '1. helma = ___',
        '2. bezpečnostní boty = ___',
        '3. rukavice = ___',
        '4. hasicí přístroj = ___',
        '5. nouzový východ = ___',
        '6. nebezpečí = ___',
        '7. požár = ___',
        '',
        'Přelož KR → CZ:',
        '8. 보안경 = ___',
        '9. 안전대 = ___',
        '10. 응급상자 = ___',
        '11. 경보기 = ___',
        '12. 부상 = ___',
        '13. 대피 = ___',
        '14. 구급차 = ___',
        '15. 집합장소 = ___',
        '',
        '═══════════════════════════════════════',
        'ČÁST D: MÍSTA (15 bodů)',
        '═══════════════════════════════════════',
        '',
        'Přelož CZ → KR:',
        '1. staveniště = ___',
        '2. přízemí = ___',
        '3. sklep = ___',
        '4. sklad = ___',
        '5. kancelář = ___',
        '6. pracoviště = ___',
        '7. lešení = ___',
        '',
        'Přelož KR → CZ:',
        '8. 옥상 = ___',
        '9. 계단 = ___',
        '10. 복도 = ___',
        '11. 휴게실 = ___',
        '12. 용접장 = ___',
        '13. 발판 = ___',
        '14. 난간 = ___',
        '15. 가설사무실 = ___',
        '',
        '═══════════════════════════════════════',
        'ČÁST E: GRAMATIKA (25 bodů)',
        '═══════════════════════════════════════',
        '',
        'E1. Doplň gramatiku (15 bodů):',
        '',
        '1. 안전모를 쓰___ (musíš) → ___',
        '2. 비상구를 막___ (nesmíš) → ___',
        '3. 이거 써___ (smíš?) → ___',
        '4. 도와___ (mám?) → ___',
        '5. 시작___ (pojďme) → ___',
        '6. 만지___ (nedělej) → ___',
        '',
        'E2. Přetvoř slovesa (10 bodů):',
        '',
        '7. 가다 + 아야 하다 = ___',
        '8. 먹다 + 으면 안 되다 = ___',
        '9. 쓰다 + 아도 되다 = ___',
        '10. 하다 + ㄹ까요 = ___',
        '11. 쉬다 + ㅂ시다 = ___',
        '',
        '═══════════════════════════════════════',
        'ČÁST F: DIALOGY (15 bodů)',
        '═══════════════════════════════════════',
        '',
        'Přelož celé věty:',
        '',
        '1. Na stavbě musíš nosit helmu.',
        '= ___',
        '',
        '2. Bez povolení se nesmí vstoupit.',
        '= ___',
        '',
        '3. Můžu použít tuto vrtačku?',
        '= ___',
        '',
        '4. Mám přinést materiál ze skladu?',
        '= ___',
        '',
        '5. Pojďme pracovat ve svařovně.',
        '= ___',
        '',
        '6. Na lešení pracujte opatrně!',
        '= ___',
        '',
        '7. Kde je nouzový východ?',
        '= ___',
        '',
        '8. Při požáru musíte evakuovat.',
        '= ___'
    ],
    notes: [
        '═══════════════════════════════════════',
        'ODPOVĚDI',
        '═══════════════════════════════════════',
        '',
        'ČÁST A - MATERIÁLY:',
        '1. 시멘트, 2. 콘크리트, 3. 합판, 4. 단열재',
        '5. 스테인리스, 6. 못, 7. 나사, 8. 앵커',
        '9. železo/ocel, 10. hliník, 11. dřevo, 12. sádrokarton',
        '13. polystyren, 14. hydroizolace, 15. šroub (velký)',
        '',
        'ČÁST B - NÁSTROJE:',
        '1. 망치, 2. 드라이버, 3. 드릴, 4. 줄자',
        '5. 수평계, 6. 그라인더, 7. 원형톱',
        '8. pila, 9. dláto, 10. úhelník, 11. aku vrtačka',
        '12. svářečka, 13. kompresor, 14. klíč, 15. kombinačky',
        '',
        'ČÁST C - BEZPEČNOST:',
        '1. 안전모, 2. 안전화, 3. 장갑, 4. 소화기',
        '5. 비상구, 6. 위험, 7. 화재',
        '8. ochranné brýle, 9. postroj, 10. lékárnička',
        '11. alarm, 12. zranění, 13. evakuace',
        '14. sanitka, 15. shromaždiště',
        '',
        'ČÁST D - MÍSTA:',
        '1. 현장, 2. 1층, 3. 지하실, 4. 창고',
        '5. 사무실, 6. 작업장, 7. 비계',
        '8. střecha, 9. schodiště, 10. chodba',
        '11. odpočívárna, 12. svařovna, 13. plošina',
        '14. zábradlí, 15. stavební buňka',
        '',
        'ČÁST E - GRAMATIKA:',
        '1. 써야 해요, 2. 막으면 안 돼요',
        '3. 써도 돼요?, 4. 도와줄까요?',
        '5. 시작합시다, 6. 만지지 마세요',
        '7. 가야 해요, 8. 먹으면 안 돼요',
        '9. 써도 돼요, 10. 할까요?, 11. 쉽시다',
        '',
        'ČÁST F - DIALOGY:',
        '1. 현장에서 안전모를 써야 해요',
        '2. 허락 없이 들어가면 안 돼요',
        '3. 이 드릴 써도 돼요?',
        '4. 창고에서 자재를 가져올까요?',
        '5. 용접장에서 일합시다',
        '6. 비계에서 조심하세요! / 비계에서 작업할 때 조심하세요!',
        '7. 비상구가 어디에 있어요?',
        '8. 화재 시 대피해야 해요 / 화재가 나면 대피해야 합니다',
        '',
        '═══════════════════════════════════════',
        '화이팅! ČERVEN DOKONČEN!',
        '',
        'STATISTIKY ČERVNA:',
        '• Materiály: 67 slov',
        '• Nástroje: 58 slov',
        '• Bezpečnost: 52 slov',
        '• Místa: 39 slov',
        '• CELKEM: ~216 SLOV',
        '',
        '🎉 GRATULACE! 1000+ SLOV CELKEM! 🎉',
        '',
        'Připrav se na ČERVENEC - Stavba pokračuje! 🏗️',
        '═══════════════════════════════════════'
    ],
    isWeekend: false,
    isTest: true
};

// ============================================================================
// EXPORT
// ============================================================================

export const juneDays135to150: KoreanDayData[] = [
    day135, day136, day137, day138, day139, day140, day141,
    day142, day143, day144, day145, day146, day147, day148,
    day149, day150
];

export default juneDays135to150;
