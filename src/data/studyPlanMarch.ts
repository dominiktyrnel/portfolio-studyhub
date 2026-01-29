/**
 * March 2026 - Days 29-42 (Week 1-2)
 * Agent 2A output
 * 
 * DŮLEŽITÉ: BEZ ANGLIČTINY - pouze 한국어 + Česky
 */

import type { KoreanMonthData, KoreanDayData } from '../types/study-db';

// ============ TÝDEN 1: 2. - 8. BŘEZNA ============

// Den 29 - PO 2.3.2026 - Korejská jídla
const day29: KoreanDayData = {
    day: 29,
    date: 'PO 2.3.2026',
    title: '🍜 Korejská jídla',
    vocab: [
        { kr: '비빔밥', cz: 'míchané jídlo s rýží a zeleninou' },
        { kr: '불고기', cz: 'marinované hovězí na grilu' },
        { kr: '김치찌개', cz: 'pálivá polévka s kimči' },
        { kr: '된장찌개', cz: 'polévka s fermentovanou sójovou pastou' },
        { kr: '삼겹살', cz: 'vepřový bok na grilu' },
        { kr: '치킨', cz: 'smažené kuře' },
        { kr: '라면', cz: 'instantní nudle' },
        { kr: '김밥', cz: 'rýžové rolky s náplní' },
        { kr: '떡볶이', cz: 'pálivé rýžové koláčky' },
        { kr: '만두', cz: 'plněné knedlíčky' }
    ],
    grammar: {
        title: '-았/었어요 - minulý čas',
        explanation: `Minulý čas se tvoří přidáním -았/었- před koncovku -어요.

PRAVIDLO VÝBĚRU:
• Kmen končí na ㅏ nebo ㅗ → -았어요
• Ostatní samohlásky → -었어요
• 하다 slovesa → 했어요 (speciální stahování)

JAK NAJÍT KMEN:
Odstraň -다 ze slovníkového tvaru.
가다 → 가 (kmen), 먹다 → 먹 (kmen)

PŘÍKLADY TVORBY:
가다 (jít):
  kmen = 가 (končí na ㅏ)
  가 + 았 = 갔 (stahuje se!)
  갔어요 = šel jsem

먹다 (jíst):
  kmen = 먹 (poslední samohláska ㅓ)
  먹 + 었 = 먹었
  먹었어요 = jedl jsem

마시다 (pít):
  kmen = 마시 (končí na ㅣ)
  마시 + 었 = 마셨 (ㅣ+ㅓ → ㅕ)
  마셨어요 = pil jsem

하다 (dělat):
  하 + 였 = 했 (speciální)
  했어요 = dělal jsem

KONTRAKCE:
ㅏ + 아 → ㅏ (가+았 → 갔)
ㅗ + 아 → ㅘ (오+았 → 왔)
ㅜ + 어 → ㅝ (주+었 → 줬)
ㅣ + 어 → ㅕ (마시+었 → 마셨)
ㅡ + 어 → ㅓ (쓰+었 → 썼)

FORMÁLNÍ VERZE: -았습니다/-었습니다
갔습니다, 먹었습니다, 했습니다`,
        examples: [
            { kr: '어제 뭐 했어요?', cz: 'Co jsi včera dělal?' },
            { kr: '비빔밥을 먹었어요.', cz: 'Jedl jsem bibimbap.' },
            { kr: '한국에 갔어요.', cz: 'Jel jsem do Koreje.' },
            { kr: '친구를 만났어요.', cz: 'Potkal jsem kamaráda.' },
            { kr: '어제 집에서 쉬었어요.', cz: 'Včera jsem odpočíval doma.' },
            { kr: '불고기를 처음 먹어 봤어요.', cz: 'Poprvé jsem ochutnal bulgogi.' }
        ]
    },
    tasks: [
        'Napiš všech 10 jídel 3× do sešitu',
        'Vyčasuj 10 sloves do minulého času (가다, 오다, 먹다, 마시다, 하다, 보다, 사다, 만나다, 쉬다, 자다)',
        'Řekni přítelkyni korejsky, co jsi včera dělal',
        'Přidej všechna slovíčka do Anki s obrázky jídel'
    ],
    exercises: [
        '가다 → ___ → 갔어요',
        '오다 → ___ → 왔어요',
        '먹다 → ___ → 먹었어요',
        '마시다 → ___ → 마셨어요',
        '하다 → ___ → 했어요',
        '보다 → ___ → 봤어요',
        '사다 → ___ → 샀어요',
        '만나다 → ___ → 만났어요',
        '자다 → ___ → 잤어요',
        '읽다 → ___ → 읽었어요'
    ],
    notes: [
        'TIP: 가+았 se stahuje na 갔, 오+았 na 왔, 보+았 na 봤',
        'CHYBA: ~~가았어요~~ → 갔어요',
        'CHYBA: ~~먹아어요~~ → 먹었어요 (kmen 먹 nemá ㅏ/ㅗ!)',
        'Korejská jídla: zkus je pojmenovat při sledování korejských videí!'
    ],
    isWeekend: false,
    isTest: false
};

// Den 30 - ÚT 3.3.2026 - V restauraci
const day30: KoreanDayData = {
    day: 30,
    date: 'ÚT 3.3.2026',
    title: '🍽️ V restauraci',
    vocab: [
        { kr: '메뉴', cz: 'menu/jídelní lístek' },
        { kr: '주문', cz: 'objednávka' },
        { kr: '주문하다', cz: 'objednat' },
        { kr: '계산', cz: 'účet/placení' },
        { kr: '계산하다', cz: 'zaplatit' },
        { kr: '맵다', cz: 'pálivý' },
        { kr: '달다', cz: 'sladký' },
        { kr: '짜다', cz: 'slaný' },
        { kr: '시다', cz: 'kyselý' },
        { kr: '쓰다', cz: 'hořký' }
    ],
    grammar: {
        title: '안 + sloveso - zápor (nechci/nedělám)',
        explanation: `안 jde PŘED časované sloveso. Vyjadřuje VOLBU - rozhodl jsem se nedělat.

STRUKTURA:
안 + sloveso (v jakémkoli čase)

PŘÍKLADY:
가요 → 안 가요 (nejdu - nechci jít)
먹어요 → 안 먹어요 (nejím - nechci jíst)
해요 → 안 해요 (nedělám - nechci dělat)
마셔요 → 안 마셔요 (nepiju - nechci pít)

V MINULÉM ČASE:
안 + minulý čas
갔어요 → 안 갔어요 (nešel jsem)
먹었어요 → 안 먹었어요 (nejedl jsem)

POZOR NA 하다 SLOVESA:
공부하다 → 공부 안 해요 (안 jde před 하다!)
운동하다 → 운동 안 해요
요리하다 → 요리 안 해요

NEBO: 안 공부해요 (taky správně, ale méně běžné)

DŮLEŽITÉ - ROZDÍL 안 vs 못:
안 = NECHCI (moje volba/rozhodnutí)
못 = NEMŮŽU (chybí schopnost/možnost)`,
        examples: [
            { kr: '고기를 안 먹어요.', cz: 'Nejím maso. (nechci/rozhodl jsem se)' },
            { kr: '오늘 안 가요.', cz: 'Dnes nejdu. (nechci)' },
            { kr: '술을 안 마셔요.', cz: 'Nepiju alkohol. (rozhodnutí)' },
            { kr: '매운 음식을 안 먹어요.', cz: 'Nejím pálivé jídlo.' },
            { kr: '커피를 안 마셨어요.', cz: 'Nepil jsem kávu. (nechtěl jsem)' },
            { kr: '어제 공부 안 했어요.', cz: 'Včera jsem se neučil.' }
        ]
    },
    tasks: [
        'Napiš 10 slovíček 3× do sešitu',
        'Vytvoř 10 záporných vět s 안 o jídle a pití',
        'Řekni přítelkyni, co NEJÍŠ a co NEPIJEŠ',
        'Přidej do Anki'
    ],
    exercises: [
        '가요 → ___ → 안 가요',
        '먹어요 → ___ → 안 먹어요',
        '해요 → ___ → 안 해요',
        '마셔요 → ___ → 안 마셔요',
        '봐요 → ___ → 안 봐요',
        '공부하다 → ___ → 공부 안 해요',
        '(minulý čas) 갔어요 → ___ → 안 갔어요',
        '(minulý čas) 먹었어요 → ___ → 안 먹었어요'
    ],
    notes: [
        'TIP: U 하다 sloves může 안 jít před celé sloveso NEBO jen před 하다',
        'SPRÁVNĚ: 공부 안 해요 nebo 안 공부해요',
        '맵다, 달다, 짜다 atd. jsou PŘÍDAVNÁ JMÉNA - časují se jako slovesa!',
        '매워요 (je to pálivé), 달아요 (je to sladké), 짜요 (je to slané)'
    ],
    isWeekend: false,
    isTest: false
};

// Den 31 - ST 4.3.2026 - Fráze v restauraci
const day31: KoreanDayData = {
    day: 31,
    date: 'ST 4.3.2026',
    title: '🗣️ Fráze v restauraci',
    vocab: [
        { kr: '메뉴판 주세요', cz: 'dejte mi jídelní lístek' },
        { kr: '주문할게요', cz: 'objednám si' },
        { kr: '이거 주세요', cz: 'dejte mi tohle' },
        { kr: '얼마예요?', cz: 'kolik to stojí?' },
        { kr: '계산해 주세요', cz: 'účet prosím' },
        { kr: '맛있어요', cz: 'je to chutné' },
        { kr: '배불러요', cz: 'jsem plný/najedený' },
        { kr: '더 주세요', cz: 'dejte mi víc' },
        { kr: '물 주세요', cz: 'vodu prosím' },
        { kr: '잘 먹겠습니다', cz: 'budu dobře jíst (před jídlem)' }
    ],
    grammar: {
        title: '못 + sloveso - zápor (nemůžu)',
        explanation: `못 jde PŘED časované sloveso. Vyjadřuje NESCHOPNOST - nemám možnost/schopnost.

STRUKTURA:
못 + sloveso (v jakémkoli čase)

PŘÍKLADY:
가요 → 못 가요 (nemůžu jít)
먹어요 → 못 먹어요 (nemůžu jíst)
해요 → 못 해요 (neumím/nemůžu dělat)

V MINULÉM ČASE:
갔어요 → 못 갔어요 (nemohl jsem jít)
먹었어요 → 못 먹었어요 (nemohl jsem jíst)

POZOR NA 하다 SLOVESA:
한국어를 하다 → 한국어를 못 해요 (neumím korejsky)
운전하다 → 운전을 못 해요 (neumím řídit)

KLÍČOVÝ ROZDÍL 안 vs 못:
안 먹어요 = Nejím. (nechci, je to moje volba)
못 먹어요 = Nemůžu jíst. (alergíe, nemoc, zákaz...)

안 가요 = Nejdu. (nechci jít)
못 가요 = Nemůžu jít. (nemám čas, jsem nemocný...)

PŘÍKLADY ROZDÍLU:
고기를 안 먹어요. = Nejím maso. (jsem vegetarián - volba)
고기를 못 먹어요. = Nemůžu jíst maso. (alergie, lékař zakázal)`,
        examples: [
            { kr: '한국어를 못 해요.', cz: 'Neumím korejsky.' },
            { kr: '오늘 못 와요.', cz: 'Dnes nemůžu přijít.' },
            { kr: '매운 거 못 먹어요.', cz: 'Nemůžu jíst pálivé.' },
            { kr: '운전을 못 해요.', cz: 'Neumím řídit.' },
            { kr: '어제 못 갔어요.', cz: 'Včera jsem nemohl jít.' },
            { kr: '시간이 없어서 못 먹었어요.', cz: 'Neměl jsem čas, tak jsem nemohl jíst.' }
        ]
    },
    tasks: [
        'Nauč se všech 10 frází nazpaměť',
        'Vytvoř 10 vět s 못 - co neumíš',
        'Procvičuj ROZDÍL mezi 안 a 못 - 10 párů vět',
        'Role-play: objednej si v restauraci s přítelkyní'
    ],
    exercises: [
        '가요 → 못 ___ → 못 가요',
        '먹어요 → 못 ___ → 못 먹어요',
        '해요 → 못 ___ → 못 해요',
        '와요 → 못 ___ → 못 와요',
        'ROZDÍL - přelož:',
        'Nejím maso (volba) → 고기를 안 먹어요',
        'Nemůžu jíst maso (alergie) → 고기를 못 먹어요',
        'Nejdu (nechci) → 안 가요',
        'Nemůžu jít (nemám čas) → 못 가요'
    ],
    notes: [
        'TIP: 잘 먹겠습니다 říkáš PŘED jídlem, 잘 먹었습니다 PO jídle',
        'V restauraci: 여기요! = Tady! (volání obsluhy)',
        'Korejci říkají 네 (ano) hodně často - i jako "rozumím"',
        '이거 = tohle (ukázat prstem), 그거 = tamto, 저거 = tamhle to'
    ],
    isWeekend: false,
    isTest: false
};

// Den 32 - ČT 5.3.2026 - Nakupování slovesa
const day32: KoreanDayData = {
    day: 32,
    date: 'ČT 5.3.2026',
    title: '🛒 Nakupování - slovesa',
    vocab: [
        { kr: '사다', cz: 'koupit' },
        { kr: '팔다', cz: 'prodat' },
        { kr: '고르다', cz: 'vybrat' },
        { kr: '바꾸다', cz: 'vyměnit' },
        { kr: '돌려주다', cz: 'vrátit (něco někomu)' },
        { kr: '찾다', cz: 'hledat/najít' },
        { kr: '보여 주다', cz: 'ukázat' },
        { kr: '입다', cz: 'obléknout (na tělo)' },
        { kr: '신다', cz: 'obout (na nohy)' },
        { kr: '써 보다', cz: 'vyzkoušet (napsat/použít)' }
    ],
    grammar: {
        title: '-고 싶다 - chtít (něco dělat)',
        explanation: `Vyjadřuje PŘÁNÍ nebo TOUHU něco dělat.

STRUKTURA:
Kmen slovesa + 고 싶다

고 싶다 se pak časuje:
고 싶어요 (chci) - neformální zdvořilé
고 싶습니다 (chci) - formální
고 싶었어요 (chtěl jsem) - minulý čas

PŘÍKLADY TVORBY:
가다 (jít):
  kmen = 가
  가 + 고 싶어요 = 가고 싶어요
  Chci jít.

먹다 (jíst):
  kmen = 먹
  먹 + 고 싶어요 = 먹고 싶어요
  Chci jíst.

사다 (koupit):
  kmen = 사
  사 + 고 싶어요 = 사고 싶어요
  Chci koupit.

ZÁPOR:
-고 싶지 않아요 (nechci)
가고 싶지 않아요 = Nechci jít.

OTÁZKA:
뭐 하고 싶어요? = Co chceš dělat?
어디 가고 싶어요? = Kam chceš jít?

MINULÝ ČAS (chtěl jsem):
가고 싶었어요 = Chtěl jsem jít.
먹고 싶었어요 = Chtěl jsem jíst.`,
        examples: [
            { kr: '한국에 가고 싶어요.', cz: 'Chci jet do Koreje.' },
            { kr: '비빔밥을 먹고 싶어요.', cz: 'Chci jíst bibimbap.' },
            { kr: '이거 사고 싶어요.', cz: 'Chci koupit tohle.' },
            { kr: '쉬고 싶어요.', cz: 'Chci si odpočinout.' },
            { kr: '친구를 만나고 싶어요.', cz: 'Chci se potkat s kamarádem.' },
            { kr: '뭐 하고 싶어요?', cz: 'Co chceš dělat?' },
            { kr: '어제 자고 싶었어요.', cz: 'Včera jsem chtěl spát.' }
        ]
    },
    tasks: [
        'Napiš 10 sloves nakupování 3×',
        'Vytvoř 10 vět s -고 싶다 - co chceš dělat',
        'Zeptej se přítelkyně: 뭐 하고 싶어요?',
        'Přidej do Anki'
    ],
    exercises: [
        '가다 + 고 싶다 → ___ → 가고 싶어요',
        '먹다 + 고 싶다 → ___ → 먹고 싶어요',
        '사다 + 고 싶다 → ___ → 사고 싶어요',
        '보다 + 고 싶다 → ___ → 보고 싶어요',
        '쉬다 + 고 싶다 → ___ → 쉬고 싶어요',
        '만나다 + 고 싶다 → ___ → 만나고 싶어요',
        '(minulý) 가고 싶었어요 = Chtěl jsem ___',
        '(zápor) 가고 싶지 않아요 = Nechci ___'
    ],
    notes: [
        'TIP: -고 싶다 se připojuje přímo ke kmeni - žádné speciální změny!',
        '입다 = obléknout NA TĚLO (košili, kalhoty...)',
        '신다 = obout NA NOHY (boty, ponožky...)',
        '쓰다 = dát na hlavu (čepici, brýle), nebo psát/používat'
    ],
    isWeekend: false,
    isTest: false
};

// Den 33 - PÁ 6.3.2026 - Nakupování věci
const day33: KoreanDayData = {
    day: 33,
    date: 'PÁ 6.3.2026',
    title: '💰 Nakupování - věci a peníze',
    vocab: [
        { kr: '가격', cz: 'cena' },
        { kr: '싸다', cz: 'levný' },
        { kr: '비싸다', cz: 'drahý' },
        { kr: '할인', cz: 'sleva' },
        { kr: '현금', cz: 'hotovost' },
        { kr: '카드', cz: 'platební karta' },
        { kr: '영수증', cz: 'účtenka' },
        { kr: '거스름돈', cz: 'drobné/vrácené peníze' },
        { kr: '포장', cz: 'balení/zabalení' },
        { kr: '봉투', cz: 'taška/sáček' }
    ],
    grammar: {
        title: '-(으)세요 - zdvořilá žádost/příkaz',
        explanation: `Zdvořilý způsob, jak někoho požádat nebo mu říct, co má dělat.

PRAVIDLO VÝBĚRU:
• Kmen končí na SAMOHLÁSKU nebo ㄹ → -세요
• Kmen končí na SOUHLÁSKU → -으세요

PŘÍKLADY:
가다 (jít):
  kmen = 가 (samohláska)
  가 + 세요 = 가세요
  Jděte. / Běžte.

앉다 (sednout):
  kmen = 앉 (souhláska)
  앉 + 으세요 = 앉으세요
  Posaďte se.

읽다 (číst):
  kmen = 읽 (souhláska)
  읽 + 으세요 = 읽으세요
  Čtěte.

보다 (dívat se):
  kmen = 보 (samohláska)
  보 + 세요 = 보세요
  Dívejte se. / Podívejte se.

SPECIÁLNÍ PŘÍPADY:
먹다 → 드세요 (jezte) - zdvořilejší tvar od 들다
마시다 → 드세요 (pijte) - stejné, zdvořilé

ㄹ KMEN - ㄹ ODPADÁ:
살다 (žít): 살 + 세요 → 사세요 (žijte)
알다 (vědět): 알 + 세요 → 아세요 (vězte)
만들다 (vyrábět): 만들 + 세요 → 만드세요 (vyrobte)

POUŽITÍ:
1. Zdvořilá žádost: 여기 앉으세요. (Posaďte se sem.)
2. Pozvání: 많이 드세요. (Jezte hodně. = Dobrou chuť.)
3. Rady: 조심하세요. (Buďte opatrný.)`,
        examples: [
            { kr: '여기 앉으세요.', cz: 'Posaďte se sem.' },
            { kr: '이거 보세요.', cz: 'Podívejte se na tohle.' },
            { kr: '많이 드세요.', cz: 'Jezte hodně. (Dobrou chuť.)' },
            { kr: '안녕히 가세요.', cz: 'Sbohem. (tomu, kdo odchází)' },
            { kr: '안녕히 계세요.', cz: 'Sbohem. (tomu, kdo zůstává)' },
            { kr: '조심하세요.', cz: 'Buďte opatrný.' },
            { kr: '천천히 말씀하세요.', cz: 'Mluvte prosím pomalu.' }
        ]
    },
    tasks: [
        'Napiš 10 slovíček nakupování 3×',
        'Vytvoř 10 zdvořilých žádostí s -(으)세요',
        'Procvič 안녕히 가세요 vs 안녕히 계세요',
        'Role-play: nakupování s přítelkyní'
    ],
    exercises: [
        '가다 → ___ → 가세요 (jděte)',
        '오다 → ___ → 오세요 (přijďte)',
        '앉다 → ___ → 앉으세요 (posaďte se)',
        '읽다 → ___ → 읽으세요 (čtěte)',
        '보다 → ___ → 보세요 (dívejte se)',
        '먹다 → ___ → 드세요 (jezte - zdvořilé)',
        '기다리다 → ___ → 기다리세요 (počkejte)',
        '조심하다 → ___ → 조심하세요 (buďte opatrný)'
    ],
    notes: [
        'TIP: 안녕히 가세요 říkáš tomu, kdo ODCHÁZÍ (가다 = jít)',
        'TIP: 안녕히 계세요 říkáš tomu, kdo ZŮSTÁVÁ (계시다 = být - zdvořilé)',
        '싸다 a 비싸다 jsou PŘÍDAVNÁ JMÉNA - 싸요 (je to levné), 비싸요 (je to drahé)',
        'V Koreji je běžné platit kartou i malé částky'
    ],
    isWeekend: false,
    isTest: false
};

// Den 34 - SO 7.3.2026 - SOBOTNÍ MARATON
const day34: KoreanDayData = {
    day: 34,
    date: 'SO 7.3.2026',
    title: '⭐ SOBOTNÍ MARATON (8 hodin)',
    vocab: [
        { kr: '마트', cz: 'supermarket' },
        { kr: '시장', cz: 'tržiště/trh' },
        { kr: '백화점', cz: 'obchodní dům' },
        { kr: '옷가게', cz: 'obchod s oblečením' },
        { kr: '서점', cz: 'knihkupectví' },
        { kr: '신발가게', cz: 'obchod s botami' },
        { kr: '전자제품점', cz: 'obchod s elektronikou' },
        { kr: '약국', cz: 'lékárna' }
    ],
    grammar: {
        title: '안 vs 못 - PROCVIČENÍ ROZDÍLU',
        explanation: `KLÍČOVÝ ROZDÍL - kdy použít 안 a kdy 못:

안 = NECHCI / NEBUDU (moje VOLBA)
Rozhodl jsem se to nedělat. Mohl bych, ale nechci.

못 = NEMŮŽU / NEUMÍM (chybí SCHOPNOST nebo MOŽNOST)
Chtěl bych, ale nemůžu. Něco mi brání.

PŘÍKLADY ROZDÍLU:

고기 (maso):
안 먹어요 = Nejím maso. (jsem vegetarián - moje volba)
못 먹어요 = Nemůžu jíst maso. (alergie, lékař zakázal)

한국어 (korejština):
안 배워요 = Neučím se korejsky. (nemám zájem)
못 배워요 = Nemůžu se učit korejsky. (nemám čas, peníze...)
한국어를 못 해요 = Neumím korejsky. (ještě jsem se nenaučil)

오늘 (dnes):
오늘 안 가요 = Dnes nejdu. (nechci)
오늘 못 가요 = Dnes nemůžu jít. (musím pracovat, jsem nemocný)

술 (alkohol):
술을 안 마셔요 = Nepiju alkohol. (rozhodnutí - třeba náboženství)
술을 못 마셔요 = Nemůžu pít alkohol. (řídím, beru léky)

POZOR - některá slovesa jdou JEN s 못:
한국어를 못 해요. (neumím - SCHOPNOST)
~~한국어를 안 해요~~ (špatně v tomto kontextu)

운전을 못 해요. (neumím řídit)
~~운전을 안 해요~~ (špatně, pokud myslíš "neumím")`,
        examples: [
            { kr: '저는 고기를 안 먹어요. 채식주의자예요.', cz: 'Nejím maso. Jsem vegetarián. (volba)' },
            { kr: '저는 고기를 못 먹어요. 알레르기가 있어요.', cz: 'Nemůžu jíst maso. Mám alergii.' },
            { kr: '오늘 안 갈 거예요. 피곤해요.', cz: 'Dnes nepůjdu. Jsem unavený. (nechci)' },
            { kr: '오늘 못 가요. 일이 있어요.', cz: 'Dnes nemůžu jít. Mám práci.' },
            { kr: '한국어를 못 해요. 아직 배우고 있어요.', cz: 'Neumím korejsky. Ještě se učím.' },
            { kr: '술을 안 마셔요. 건강 때문에요.', cz: 'Nepiju alkohol. Kvůli zdraví. (rozhodnutí)' }
        ]
    },
    tasks: [
        'Hodina 1-2: Opakování všech 58 slovíček z týdne (Anki maraton)',
        'Hodina 3-4: Gramatika - minulý čas (30 vět), 안/못 (20 párů vět)',
        'Hodina 5: Konverzace s přítelkyní - restaurace role-play',
        'Hodina 6-7: -고 싶다 a -(으)세요 (po 20 vět)',
        'Hodina 8: Pasivní poslech korejských videí (jídlo, nakupování)'
    ],
    exercises: [
        'PŘELOŽ - zvol 안 nebo 못:',
        'Nejím pálivé (volba) → 매운 거 ___ 먹어요 → 안',
        'Nemůžu jíst pálivé (žaludek) → 매운 거 ___ 먹어요 → 못',
        'Dnes nejdu (nechci) → 오늘 ___ 가요 → 안',
        'Dnes nemůžu jít (práce) → 오늘 ___ 가요 → 못',
        'Neumím korejsky → 한국어를 ___ 해요 → 못',
        'Nepiju alkohol (volba) → 술을 ___ 마셔요 → 안',
        'Nemůžu pít (řídím) → 술을 ___ 마셔요 → 못'
    ],
    notes: [
        'DŮLEŽITÉ: Když mluví o SCHOPNOSTI (umět/neumět), použij vždy 못',
        '한국어를 못 해요 = Neumím korejsky',
        '수영을 못 해요 = Neumím plavat',
        '운전을 못 해요 = Neumím řídit'
    ],
    isWeekend: true,
    isTest: false
};

// Den 35 - NE 8.3.2026 - NEDĚLNÍ MEGA OPAKOVÁNÍ + TEST
const day35: KoreanDayData = {
    day: 35,
    date: 'NE 8.3.2026',
    title: '🔄 NEDĚLNÍ MEGA OPAKOVÁNÍ (12 hodin) + TEST',
    vocab: [],
    grammar: {
        title: 'TEST TÝDNE 1 - BŘEZEN',
        explanation: `SHRNUTÍ GRAMATIKY TÝDNE:

1. MINULÝ ČAS (-았/었어요)
   • ㅏ/ㅗ → -았어요: 가다→갔어요, 오다→왔어요
   • ostatní → -었어요: 먹다→먹었어요
   • 하다 → 했어요

2. ZÁPOR 안 (nechci - volba)
   • 안 + sloveso: 안 가요, 안 먹어요
   • 하다 slovesa: 공부 안 해요

3. ZÁPOR 못 (nemůžu - schopnost)
   • 못 + sloveso: 못 가요, 못 먹어요
   • 못 해요 = neumím

4. CHTÍT (-고 싶다)
   • kmen + 고 싶어요: 가고 싶어요, 먹고 싶어요

5. ZDVOŘILÁ ŽÁDOST (-(으)세요)
   • samohláska/ㄹ → -세요: 가세요, 보세요
   • souhláska → -으세요: 앉으세요, 읽으세요`,
        examples: [
            { kr: '어제 뭐 했어요?', cz: 'Co jsi včera dělal?' },
            { kr: '비빔밥을 먹었어요.', cz: 'Jedl jsem bibimbap.' },
            { kr: '고기를 안 먹어요.', cz: 'Nejím maso. (volba)' },
            { kr: '한국어를 못 해요.', cz: 'Neumím korejsky.' },
            { kr: '한국에 가고 싶어요.', cz: 'Chci jet do Koreje.' },
            { kr: '여기 앉으세요.', cz: 'Posaďte se sem.' }
        ]
    },
    tasks: [
        'Hodina 1-4: Slovíčka - všech 68 slov (Anki maraton, psaní 3×)',
        'Hodina 5-7: Gramatika - po 20 vět s každou strukturou',
        'Hodina 8-9: Konverzace s přítelkyní (restaurace, nakupování)',
        'Hodina 10-11: TEST TÝDNE',
        'Hodina 12: Pasivní poslech'
    ],
    exercises: [
        '=== TEST TÝDNE 1 ===',
        '',
        'A. MINULÝ ČAS (10 bodů):',
        '1. 가다 → ___',
        '2. 먹다 → ___',
        '3. 마시다 → ___',
        '4. 하다 → ___',
        '5. 보다 → ___',
        '',
        'B. 안 vs 못 (10 bodů):',
        '1. Nejím maso (volba) → 고기를 ___ 먹어요',
        '2. Neumím korejsky → 한국어를 ___ 해요',
        '3. Dnes nepůjdu (nechci) → 오늘 ___ 갈 거예요',
        '4. Nemůžu přijít (práce) → ___ 와요',
        '',
        'C. -고 싶다 (10 bodů):',
        '1. Chci jít → ___',
        '2. Chci jíst → ___',
        '3. Chci koupit → ___',
        '',
        'D. -(으)세요 (10 bodů):',
        '1. Jděte → ___',
        '2. Posaďte se → ___',
        '3. Podívejte se → ___',
        '',
        'E. PŘEKLAD (10 bodů):',
        '1. Včera jsem jedl bibimbap.',
        '2. Chci jet do Koreje.',
        '3. Kolik to stojí?',
        '4. Dejte mi menu prosím.',
        '5. Je to chutné.',
        '',
        '=== ODPOVĚDI ===',
        'A: 갔어요, 먹었어요, 마셨어요, 했어요, 봤어요',
        'B: 안, 못, 안, 못',
        'C: 가고 싶어요, 먹고 싶어요, 사고 싶어요',
        'D: 가세요, 앉으세요, 보세요',
        'E: 어제 비빔밥을 먹었어요, 한국에 가고 싶어요, 얼마예요?, 메뉴판 주세요, 맛있어요'
    ],
    notes: [
        'Minimum pro pokračování: 40/50 bodů (80%)',
        'Slabé oblasti zopakuj v pondělí ráno',
        'Pokud máš pod 40 bodů, zopakuj celý týden'
    ],
    isWeekend: true,
    isTest: true
};

// ============ TÝDEN 2: 9. - 15. BŘEZNA ============

// Den 36 - PO 9.3.2026 - Ukazovací zájmena
const day36: KoreanDayData = {
    day: 36,
    date: 'PO 9.3.2026',
    title: '👆 Ukazovací zájmena',
    vocab: [
        { kr: '이거', cz: 'tohle (blízko mě)' },
        { kr: '그거', cz: 'tamto (blízko tebe)' },
        { kr: '저거', cz: 'tamhle to (daleko od obou)' },
        { kr: '이것', cz: 'toto (formální)' },
        { kr: '그것', cz: 'tamto (formální)' },
        { kr: '저것', cz: 'tamhle to (formální)' },
        { kr: '어떤', cz: 'jaký/který' },
        { kr: '이런', cz: 'takový (jako tohle)' },
        { kr: '그런', cz: 'takový (jako tamto)' },
        { kr: '저런', cz: 'takový (jako tamhle)' }
    ],
    grammar: {
        title: '-고 - spojení vět (a, a pak)',
        explanation: `Spojka -고 spojuje dvě věty nebo akce. Význam: "a", "a pak".

STRUKTURA:
Věta 1 (kmen + 고) + Věta 2

PŘÍKLADY TVORBY:
밥을 먹다 + 커피를 마시다:
  먹 + 고 + 커피를 마셔요
  = 밥을 먹고 커피를 마셔요
  = Jím a piju kávu.

집에 가다 + 쉬다:
  가 + 고 + 쉬어요
  = 집에 가고 쉬어요
  = Jdu domů a odpočívám.

POUŽITÍ:
1. Souběžné akce (a):
   음악을 듣고 공부해요.
   Poslouchám hudbu a studuji.

2. Posloupnost (a pak):
   손을 씻고 밥을 먹어요.
   Umyju si ruce a pak jím.

3. Popis (a):
   이 가방은 크고 예뻐요.
   Tato taška je velká a pěkná.

POZOR:
-고 se připojuje ke KMENI, ne k časovanému tvaru!
ŠPATNĚ: ~~먹어요고~~ 
SPRÁVNĚ: 먹고

Čas celé věty určuje POSLEDNÍ sloveso:
먹고 마셔요 (přítomný)
먹고 마셨어요 (minulý)`,
        examples: [
            { kr: '밥을 먹고 커피를 마셔요.', cz: 'Jím a piju kávu.' },
            { kr: '집에 가고 쉬어요.', cz: 'Jdu domů a odpočívám.' },
            { kr: '샤워하고 잤어요.', cz: 'Osprchoval jsem se a šel spát.' },
            { kr: '이 옷은 싸고 예뻐요.', cz: 'Tohle oblečení je levné a pěkné.' },
            { kr: '아침에 일어나고 운동해요.', cz: 'Ráno vstanu a cvičím.' },
            { kr: '친구를 만나고 영화를 봤어요.', cz: 'Potkal jsem kamaráda a díval se na film.' }
        ]
    },
    tasks: [
        'Napiš 10 ukazovacích zájmen 3×',
        'Vytvoř 15 vět s -고 (spojení dvou akcí)',
        'Popiš svůj denní rozvrh pomocí -고',
        'Přidej do Anki'
    ],
    exercises: [
        '밥을 먹다 + 커피를 마시다 → 밥을 먹고 커피를 마셔요',
        '집에 가다 + 쉬다 → ___',
        '샤워하다 + 자다 → ___',
        '음악을 듣다 + 공부하다 → ___',
        '친구를 만나다 + 영화를 보다 → ___',
        '일어나다 + 운동하다 → ___',
        '이/그/저 + 거 → 이거, 그거, 저거',
        '이/그/저 + 런 → 이런, 그런, 저런'
    ],
    notes: [
        'TIP: 이/그/저 systém - tři úrovně vzdálenosti',
        '이 = blízko MĚ (tohle u mě)',
        '그 = blízko TEBE (tamto u tebe) nebo zmíněné dříve',
        '저 = daleko OD OBOU (tamhle)',
        '이거 = 이것의 zkrácená forma (hovorová)'
    ],
    isWeekend: false,
    isTest: false
};

// Den 37 - ÚT 10.3.2026 - Velikosti
const day37: KoreanDayData = {
    day: 37,
    date: 'ÚT 10.3.2026',
    title: '📏 Velikosti a vlastnosti',
    vocab: [
        { kr: '크기', cz: 'velikost' },
        { kr: '사이즈', cz: 'velikost (anglicismus)' },
        { kr: '작은', cz: 'malý' },
        { kr: '중간', cz: 'střední' },
        { kr: '큰', cz: 'velký' },
        { kr: '다른', cz: 'jiný/odlišný' },
        { kr: '같은', cz: 'stejný' },
        { kr: '색깔', cz: 'barva' },
        { kr: '무늬', cz: 'vzor' },
        { kr: '디자인', cz: 'design/vzhled' }
    ],
    tasks: [
        'Napiš 10 slovíček 3×',
        'Popiš předměty kolem sebe (velikost, barva)',
        'Procvičuj: 이거 큰 거 있어요? (Máte tohle větší?)',
        'Přidej do Anki'
    ],
    exercises: [
        'Přelož:',
        'Máte větší? → 더 큰 거 있어요?',
        'Máte menší? → 더 ___ 거 있어요?',
        'Máte jiný? → ___ 거 있어요?',
        'Máte stejný? → ___ 거 있어요?',
        'Jaká je velikost? → 크기가 ___?',
        'Jaká barva? → 색깔이 ___?'
    ],
    notes: [
        'TIP: 작은, 큰, 다른, 같은 jsou MODIFIKÁTORY (před podstatným jménem)',
        '큰 가방 = velká taška',
        '작은 사이즈 = malá velikost',
        '다른 색깔 = jiná barva',
        '같은 디자인 = stejný design'
    ],
    isWeekend: false,
    isTest: false
};

// Den 38 - ST 11.3.2026 - Oblečení detailně
const day38: KoreanDayData = {
    day: 38,
    date: 'ST 11.3.2026',
    title: '👔 Oblečení detailně',
    vocab: [
        { kr: '코트', cz: 'kabát' },
        { kr: '재킷', cz: 'bunda/sako' },
        { kr: '청바지', cz: 'džíny' },
        { kr: '치마', cz: 'sukně' },
        { kr: '원피스', cz: 'šaty (jednodílné)' },
        { kr: '티셔츠', cz: 'tričko' },
        { kr: '양말', cz: 'ponožky' },
        { kr: '속옷', cz: 'spodní prádlo' },
        { kr: '넥타이', cz: 'kravata' },
        { kr: '벨트', cz: 'pásek' }
    ],
    grammar: {
        title: '-(으)면 - když/jestli (podmínka)',
        explanation: `Vyjadřuje PODMÍNKU - když/jestli něco nastane.

PRAVIDLO VÝBĚRU:
• Kmen končí na SAMOHLÁSKU nebo ㄹ → -면
• Kmen končí na SOUHLÁSKU → -으면

PŘÍKLADY:
가다 (jít):
  kmen = 가 (samohláska)
  가 + 면 = 가면
  Když půjdu... / Jestli půjdu...

먹다 (jíst):
  kmen = 먹 (souhláska)
  먹 + 으면 = 먹으면
  Když sním... / Jestli sním...

있다 (mít/být):
  kmen = 있 (souhláska)
  있 + 으면 = 있으면
  Když mám... / Jestli je...

ㄹ KMEN - ㄹ ODPADÁ:
살다 (žít): 살 + 면 → 살면 (když žiju)
알다 (vědět): 알 + 면 → 알면 (když vím)

POUŽITÍ:
1. Podmínka:
   비가 오면 안 가요.
   Když bude pršet, nepůjdu.

2. Hypotéza:
   시간이 있으면 같이 가요.
   Jestli máš čas, pojďme spolu.

3. Obecná pravda:
   물을 끓이면 수증기가 나와요.
   Když se vaří voda, vzniká pára.`,
        examples: [
            { kr: '비가 오면 집에 있을 거예요.', cz: 'Když bude pršet, zůstanu doma.' },
            { kr: '시간이 있으면 같이 가요.', cz: 'Jestli máš čas, pojďme spolu.' },
            { kr: '맛있으면 더 먹을 거예요.', cz: 'Jestli to bude chutné, sním víc.' },
            { kr: '싸면 살 거예요.', cz: 'Jestli to bude levné, koupím to.' },
            { kr: '모르면 물어보세요.', cz: 'Jestli nevíte, zeptejte se.' },
            { kr: '피곤하면 쉬세요.', cz: 'Jestli jste unavený, odpočiňte si.' }
        ]
    },
    tasks: [
        'Napiš 10 slovíček oblečení 3×',
        'Vytvoř 15 podmínkových vět s -(으)면',
        'Popiš co si vezmeš na sebe když: prší, je teplo, je zima',
        'Přidej do Anki'
    ],
    exercises: [
        '가다 + 면 → 가면 (když půjdu)',
        '먹다 + 면 → ___ (když sním)',
        '있다 + 면 → ___ (když mám)',
        '없다 + 면 → ___ (když nemám)',
        '오다 + 면 → ___ (když přijde)',
        '싸다 + 면 → ___ (když je levné)',
        '비싸다 + 면 → ___ (když je drahé)',
        '알다 + 면 → ___ (když vím)'
    ],
    notes: [
        'TIP: -(으)면 se připojuje ke KMENI slovesa/přídavného jména',
        '원피스 = "one piece" - jednodílné šaty',
        '속옷 = 속 (vnitřek) + 옷 (oblečení) = spodní prádlo',
        'V Koreji se velikosti oblečení často udávají jako S, M, L, XL'
    ],
    isWeekend: false,
    isTest: false
};

// Den 39 - ČT 12.3.2026 - Materiály
const day39: KoreanDayData = {
    day: 39,
    date: 'ČT 12.3.2026',
    title: '🧵 Materiály',
    vocab: [
        { kr: '면', cz: 'bavlna' },
        { kr: '실크', cz: 'hedvábí' },
        { kr: '가죽', cz: 'kůže' },
        { kr: '울', cz: 'vlna' },
        { kr: '폴리에스터', cz: 'polyester' },
        { kr: '린넨', cz: 'len' },
        { kr: '데님', cz: 'džínovina' },
        { kr: '니트', cz: 'pletené/pletenina' },
        { kr: '방수', cz: 'voděodolný/nepromokavý' },
        { kr: '통기성', cz: 'prodyšný' }
    ],
    tasks: [
        'Napiš 10 materiálů 3×',
        'Popiš z čeho je tvoje oblečení',
        'Procvič: 이거 면이에요? (Je to bavlna?)',
        'Přidej do Anki'
    ],
    exercises: [
        '이 셔츠는 ___이에요. (bavlna) → 면',
        '이 가방은 ___이에요. (kůže) → 가죽',
        '이 스웨터는 ___이에요. (vlna) → 울',
        '이 재킷은 ___이에요. (voděodolný) → 방수',
        '청바지는 ___ 소재예요. (džínovina) → 데님'
    ],
    notes: [
        'TIP: 면 má dva významy - bavlna a také strana/plocha',
        '방수 = 방 (bránit) + 수 (voda) = voděodolný',
        '통기성 = 통 (procházet) + 기 (vzduch) + 성 (vlastnost) = prodyšný',
        'Korejci se často ptají na materiál oblečení'
    ],
    isWeekend: false,
    isTest: false
};

// Den 40 - PÁ 13.3.2026 - Zkouška, vracení
const day40: KoreanDayData = {
    day: 40,
    date: 'PÁ 13.3.2026',
    title: '🔄 Zkouška a vracení zboží',
    vocab: [
        { kr: '입어 보다', cz: 'vyzkoušet si (obléknout)' },
        { kr: '신어 보다', cz: 'vyzkoušet si (obout)' },
        { kr: '맞다', cz: 'sedět/pasovat' },
        { kr: '안 맞다', cz: 'nepadnout/nesedět' },
        { kr: '환불', cz: 'vrácení peněz' },
        { kr: '교환', cz: 'výměna' },
        { kr: '탈의실', cz: 'kabinka na převlékání' },
        { kr: '거울', cz: 'zrcadlo' },
        { kr: '어울리다', cz: 'slušet (někomu)' },
        { kr: '마음에 들다', cz: 'líbit se' }
    ],
    grammar: {
        title: '-아서/어서 - protože, a tak (příčina)',
        explanation: `Vyjadřuje PŘÍČINU nebo DŮVOD - protože X, tak Y.

PRAVIDLO VÝBĚRU:
• Kmen končí na ㅏ nebo ㅗ → -아서
• Ostatní → -어서
• 하다 → 해서

PŘÍKLADY:
배가 고프다 (mít hlad):
  kmen = 고프 (končí na ㅗ)
  고프 + 아서 = 고파서
  Protože mám hlad...

비가 오다 (pršet):
  kmen = 오 (končí na ㅗ)
  오 + 아서 = 와서
  Protože prší...

피곤하다 (být unavený):
  kmen = 피곤하 (하다)
  피곤하 + 여서 = 피곤해서
  Protože jsem unavený...

POUŽITÍ:
1. Příčina (protože):
   배가 고파서 밥을 먹어요.
   Protože mám hlad, jím.

2. Důvod (a tak):
   비가 와서 못 가요.
   Prší, tak nemůžu jít.

POZOR:
-아서/어서 NEMŮŽE být v minulém čase!
Čas celé věty určuje hlavní věta.

ŠPATNĚ: ~~배가 고팠어서 먹었어요~~
SPRÁVNĚ: 배가 고파서 먹었어요
(Protože jsem měl hlad, jedl jsem.)`,
        examples: [
            { kr: '배가 고파서 밥을 먹어요.', cz: 'Protože mám hlad, jím.' },
            { kr: '비가 와서 못 가요.', cz: 'Prší, tak nemůžu jít.' },
            { kr: '피곤해서 쉬고 싶어요.', cz: 'Protože jsem unavený, chci si odpočinout.' },
            { kr: '시간이 없어서 못 했어요.', cz: 'Neměl jsem čas, tak jsem to neudělal.' },
            { kr: '너무 비싸서 안 샀어요.', cz: 'Bylo to moc drahé, tak jsem to nekoupil.' },
            { kr: '사이즈가 안 맞아서 교환하고 싶어요.', cz: 'Velikost nesedí, tak bych chtěl vyměnit.' }
        ]
    },
    tasks: [
        'Napiš 10 slovíček 3×',
        'Vytvoř 15 vět s -아서/어서',
        'Role-play: Zkouška oblečení v obchodě',
        'Přidej do Anki'
    ],
    exercises: [
        '배가 고프다 + 아서 → 배가 고파서 (protože mám hlad)',
        '비가 오다 + 아서 → ___ (protože prší)',
        '피곤하다 + 어서 → ___ (protože jsem unavený)',
        '시간이 없다 + 어서 → ___ (protože nemám čas)',
        '비싸다 + 어서 → ___ (protože je to drahé)',
        '맛있다 + 어서 → ___ (protože je to chutné)',
        '좋다 + 아서 → ___ (protože je to dobré)',
        '춥다 + 어서 → ___ (protože je zima)'
    ],
    notes: [
        'TIP: 입어 보다 = 입다 (obléknout) + 보다 (zkusit) = vyzkoušet si',
        '마음에 들다 = doslova "vstoupit do srdce" = líbit se',
        '탈의실 = 탈의 (svléknout) + 실 (místnost) = kabinka',
        '-아서/어서 se NIKDY nečasuje do minulosti!'
    ],
    isWeekend: false,
    isTest: false
};

// Den 41 - SO 14.3.2026 - SOBOTNÍ MARATON
const day41: KoreanDayData = {
    day: 41,
    date: 'SO 14.3.2026',
    title: '⭐ SOBOTNÍ MARATON (8 hodin)',
    vocab: [
        { kr: '만 원', cz: '10 000 wonů' },
        { kr: '오천 원', cz: '5 000 wonů' },
        { kr: '천 원', cz: '1 000 wonů' },
        { kr: '백 원', cz: '100 wonů' },
        { kr: '십 원', cz: '10 wonů' },
        { kr: '얼마', cz: 'kolik (cena)' },
        { kr: '총', cz: 'celkem' },
        { kr: '할인가', cz: 'cena po slevě' }
    ],
    grammar: {
        title: 'KOMBINACE - -고, -(으)면, -아서/어서',
        explanation: `PŘEHLED SPOJEK:

1. -고 (a, a pak)
   Spojuje dvě akce nebo vlastnosti.
   밥을 먹고 커피를 마셔요.
   Jím a piju kávu.

2. -(으)면 (když, jestli)
   Vyjadřuje podmínku.
   비가 오면 안 가요.
   Když bude pršet, nepůjdu.

3. -아서/어서 (protože, a tak)
   Vyjadřuje příčinu/důvod.
   배가 고파서 먹어요.
   Protože mám hlad, jím.

KOMBINACE V JEDNÉ VĚTĚ:

피곤해서 집에 가고 쉴 거예요.
Protože jsem unavený, půjdu domů a budu odpočívat.

시간이 있으면 밥을 먹고 영화를 볼 거예요.
Jestli budu mít čas, najím se a podívám se na film.

비가 와서 못 가면 집에서 공부할 거예요.
Protože prší a nemůžu jít, budu studovat doma.`,
        examples: [
            { kr: '배가 고파서 밥을 먹고 커피를 마셨어요.', cz: 'Protože jsem měl hlad, najedl jsem se a napil se kávy.' },
            { kr: '시간이 있으면 같이 가고 싶어요.', cz: 'Jestli máš čas, chtěl bych jít spolu.' },
            { kr: '싸면 사고 싶어요.', cz: 'Jestli to bude levné, chci to koupit.' },
            { kr: '비싸서 안 사고 다른 가게에 갔어요.', cz: 'Bylo to drahé, tak jsem nekoupil a šel do jiného obchodu.' },
            { kr: '피곤해서 집에 가면 바로 잘 거예요.', cz: 'Jsem unavený, tak když přijdu domů, hned půjdu spát.' }
        ]
    },
    tasks: [
        'Hodina 1-2: Opakování slovíček týdne 2 (všech 48 slov)',
        'Hodina 3-4: Gramatika - -고, -(으)면, -아서/어서 (po 15 vět)',
        'Hodina 5: Konverzace - nakupování oblečení role-play',
        'Hodina 6-7: Kombinace gramatických struktur (20 složitých vět)',
        'Hodina 8: Pasivní poslech korejských videí (móda, nakupování)'
    ],
    exercises: [
        'KOMBINUJ struktury:',
        '(protože + a) 피곤하다 + 집에 가다 + 쉬다 → 피곤해서 집에 가고 쉬어요',
        '(jestli + chci) 싸다 + 사다 → 싸면 사고 싶어요',
        '(protože + nemohu) 비가 오다 + 가다 → 비가 와서 못 가요',
        '(jestli + a pak) 시간이 있다 + 밥을 먹다 + 영화를 보다 → ___',
        '',
        'ČÍSLA - přečti nahlas:',
        '15,000원 → 만 오천 원',
        '23,500원 → 이만 삼천 오백 원',
        '8,900원 → 팔천 구백 원',
        '100,000원 → 십만 원'
    ],
    notes: [
        'TIP: Korejské peníze - 1,000원 ≈ 17 Kč (přibližně)',
        '만 = 10,000 (základní jednotka pro větší částky)',
        'Při nakupování v Koreji se smlouvá hlavně na trzích (시장)',
        'V obchodních domech (백화점) jsou ceny pevné'
    ],
    isWeekend: true,
    isTest: false
};

// Den 42 - NE 15.3.2026 - NEDĚLNÍ MEGA OPAKOVÁNÍ + TEST
const day42: KoreanDayData = {
    day: 42,
    date: 'NE 15.3.2026',
    title: '🔄 NEDĚLNÍ MEGA OPAKOVÁNÍ (12 hodin) + TEST',
    vocab: [
        { kr: '시멘트', cz: 'cement' },
        { kr: '벽돌', cz: 'cihla' },
        { kr: '모래', cz: 'písek' },
        { kr: '자갈', cz: 'štěrk' },
        { kr: '철근', cz: 'ocelová výztuž' },
        { kr: '콘크리트', cz: 'beton' },
        { kr: '목재', cz: 'řezivo/dřevo' },
        { kr: '합판', cz: 'překližka' },
        { kr: '유리', cz: 'sklo' },
        { kr: '타일', cz: 'dlaždice/obklad' }
    ],
    grammar: {
        title: 'TEST TÝDNE 2 - BŘEZEN',
        explanation: `SHRNUTÍ GRAMATIKY TÝDNE 2:

1. -고 (a, a pak)
   • kmen + 고: 먹고, 가고, 하고
   • 밥을 먹고 커피를 마셔요.

2. -(으)면 (když, jestli)
   • samohláska/ㄹ → -면: 가면, 오면
   • souhláska → -으면: 먹으면, 있으면
   • 비가 오면 안 가요.

3. -아서/어서 (protože)
   • ㅏ/ㅗ → -아서: 고파서, 와서
   • ostatní → -어서: 먹어서, 없어서
   • 하다 → 해서
   • 배가 고파서 먹어요.

POZOR:
• -아서/어서 se NEČASUJE do minulosti!`,
        examples: [
            { kr: '집에 가고 쉬어요.', cz: 'Jdu domů a odpočívám.' },
            { kr: '시간이 있으면 가요.', cz: 'Jestli mám čas, jdu.' },
            { kr: '피곤해서 쉬고 싶어요.', cz: 'Protože jsem unavený, chci odpočívat.' }
        ]
    },
    tasks: [
        'Hodina 1-4: Slovíčka - všech 116 slov za 2 týdny (Anki maraton)',
        'Hodina 5-7: Gramatika - všech 8 struktur (po 10 vět)',
        'Hodina 8-9: Konverzace s přítelkyní (restaurace, nakupování, oblečení)',
        'Hodina 10-11: TEST TÝDNE 2',
        'Hodina 12: Pasivní poslech + stavební slovíčka'
    ],
    exercises: [
        '=== TEST TÝDNE 2 ===',
        '',
        'A. -고 SPOJENÍ (10 bodů):',
        '1. Jdu domů a odpočívám → ___',
        '2. Jím a piju kávu → ___',
        '3. Je to levné a pěkné → ___',
        '',
        'B. -(으)면 PODMÍNKA (10 bodů):',
        '1. Když bude pršet → 비가 ___',
        '2. Jestli máš čas → 시간이 ___',
        '3. Jestli je to levné → ___',
        '4. Jestli nevíš → ___',
        '',
        'C. -아서/어서 PŘÍČINA (10 bodů):',
        '1. Protože mám hlad → 배가 ___',
        '2. Protože prší → 비가 ___',
        '3. Protože jsem unavený → ___',
        '4. Protože nemám čas → ___',
        '',
        'D. KOMBINACE (10 bodů):',
        '1. Protože jsem unavený, jdu domů a budu odpočívat.',
        '2. Jestli máš čas, pojďme se najíst a dívat na film.',
        '',
        'E. NAKUPOVÁNÍ - DIALOG (10 bodů):',
        '손님: 이거 얼마예요?',
        '직원: 만 오천 원이에요.',
        '손님: 좀 비싸네요. 깎아 주세요.',
        '직원: 만 원에 드릴게요.',
        '손님: 좋아요. 살게요.',
        '',
        '=== ODPOVĚDI ===',
        'A: 집에 가고 쉬어요, 밥을 먹고 커피를 마셔요, 싸고 예뻐요',
        'B: 오면, 있으면, 싸면, 모르면',
        'C: 고파서, 와서, 피곤해서, 시간이 없어서',
        'D: 피곤해서 집에 가고 쉴 거예요, 시간이 있으면 밥을 먹고 영화를 보아요'
    ],
    notes: [
        'Minimum pro pokračování: 40/50 bodů (80%)',
        'Po 2 týdnech března bys měl umět:',
        '• Mluvit v minulém čase',
        '• Říct co nechceš/nemůžeš (안/못)',
        '• Vyjádřit přání (-고 싶다)',
        '• Spojovat věty (-고)',
        '• Tvořit podmínky (-(으)면)',
        '• Udávat důvody (-아서/어서)',
        '• Základní nakupování a objednávání v restauraci',
        '',
        '화이팅! Polovina března za tebou!'
    ],
    isWeekend: true,
    isTest: true
};

// ============ EXPORT ============

export const marchDays29to42: KoreanDayData[] = [
    day29, day30, day31, day32, day33, day34, day35,
    day36, day37, day38, day39, day40, day41, day42
];

// March Month Data - Weeks 1-2
export const marchData: KoreanMonthData = {
    month: 2,
    nameKR: '3월',
    nameCZ: 'BŘEZEN 2026 - MĚSÍC 2/10',
    targetLevel: 'A1+',
    targetWords: 200,
    totalWords: 400,
    goals: [
        '200 nových slov (celkem 400)',
        '8 gramatických struktur',
        'Minulý čas, negace (안/못), chtít (-고 싶다)',
        'Podmínky (-(으)면), příčina (-아서/어서)',
        'Nakupování, restaurace, oblečení',
        'Výslovnost: 비음화 (nazalizace)'
    ],
    grammarOverview: [
        { kr: '-았/었어요', cz: 'minulý čas' },
        { kr: '안 + sloveso', cz: 'nechci/nebudu (volba)' },
        { kr: '못 + sloveso', cz: 'nemůžu/neumím (schopnost)' },
        { kr: '-고 싶다', cz: 'chtít (něco dělat)' },
        { kr: '-(으)세요', cz: 'zdvořilá žádost' },
        { kr: '-고', cz: 'spojení vět (a, a pak)' },
        { kr: '-(으)면', cz: 'podmínka (když, jestli)' },
        { kr: '-아서/어서', cz: 'příčina (protože)' }
    ],
    weeks: [
        {
            weekNumber: 1,
            dateRange: '2.-8. BŘEZNA',
            theme: 'Jídlo, restaurace, minulý čas, negace 안/못, chtít',
            days: [29, 30, 31, 32, 33, 34, 35]
        },
        {
            weekNumber: 2,
            dateRange: '9.-15. BŘEZNA',
            theme: 'Oblečení, velikosti, materiály, -고, -(으)면, -아서/어서',
            days: [36, 37, 38, 39, 40, 41, 42]
        }
    ],
    days: marchDays29to42
};

export default marchData;
