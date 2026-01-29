/**
 * July 2026 - Days 165-181 (Week 3-4+)
 * Agent 6B output
 * ČERVENEC - Nouzové situace, sport a fitness
 * 
 * Struktura:
 * - Dny 165-167: Nehody (15 slov)
 * - Dny 168-170: Volání o pomoc (12 slov)
 * - Den 171: Opakování
 * - Dny 172-174: Sporty (12 slov)
 * - Dny 175-177: Fitness (15 slov)
 * - Dny 178-180: Finální opakování
 * - Den 181: MĚSÍČNÍ TEST
 */

import type { KoreanDayData } from '../types/study-db';

// ============================================================================
// DEN 165 - ST 15.7.2026 - Nehody #1 + Gramatika -게 하다
// ============================================================================
const day165: KoreanDayData = {
    day: 165,
    date: 'ST 15.7.2026',
    title: '🚨 Nehody #1',
    vocab: [
        { kr: '사고', cz: 'nehoda' },
        { kr: '교통사고', cz: 'dopravní nehoda' },
        { kr: '화재', cz: 'požár' },
        { kr: '지진', cz: 'zemětřesení' },
        { kr: '홍수', cz: 'povodeň' }
    ],
    grammar: {
        title: '-게 하다 (způsobit, nechat)',
        explanation: `Vyjadřuje, že někdo ZPŮSOBÍ nebo NECHÁ někoho něco udělat.

TVORBA:
Kmen slovesa + 게 하다

PŘÍKLADY TVORBY:
• 울다 → 울게 하다 (rozplakat)
• 웃다 → 웃게 하다 (rozesmát)
• 기다리다 → 기다리게 하다 (nechat čekat)
• 가다 → 가게 하다 (nechat jít)
• 먹다 → 먹게 하다 (nechat jíst)

DVA VÝZNAMY:
1. ZPŮSOBIT (kauzativ):
   아이를 울게 했어요 = Rozplakal jsem dítě

2. NECHAT/DOVOLIT:
   집에 가게 해 주세요 = Nechte mě jít domů

NA STAVBĚ:
• 위험하게 하지 마세요 = Nedělejte to nebezpečné
• 안전하게 하세요 = Udělejte to bezpečně`,
        examples: [
            { kr: '아이를 울게 했어요', cz: 'Rozplakal jsem dítě' },
            { kr: '기다리게 해서 죄송해요', cz: 'Promiňte, že jsem vás nechal čekat' },
            { kr: '웃게 만들었어요', cz: 'Rozesmál jsem ho/ji' },
            { kr: '일찍 가게 해 주세요', cz: 'Nechte mě odejít brzy' },
            { kr: '쉬게 해 주세요', cz: 'Nechte mě odpočinout' },
            { kr: '알게 해 줘서 고마워요', cz: 'Děkuji, že jsi mi dal vědět' }
        ]
    },
    tasks: [
        '📚 Nauč se 5 slov o nehodách',
        '✍️ Vytvoř 10 vět s -게 하다',
        '🗣️ Procvičuj: způsobit vs nechat',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '울다 + 게 하다 → ?',
        '기다리다 + 게 하다 → ?',
        '알다 + 게 하다 → ?',
        'Přelož: Nechal jsem ho čekat',
        'Přelož: Rozesmál mě'
    ],
    notes: [
        '사고 = nehoda obecně',
        '교통사고 = dopravní nehoda (교통 = doprava)',
        '화재 = požár (火災, sino-korejské)',
        '지진 = zemětřesení (地震)',
        '홍수 = povodeň (洪水)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 166 - ČT 16.7.2026 - Nehody #2
// ============================================================================
const day166: KoreanDayData = {
    day: 166,
    date: 'ČT 16.7.2026',
    title: '🚨 Nehody #2',
    vocab: [
        { kr: '정전', cz: 'výpadek proudu' },
        { kr: '가스누출', cz: 'únik plynu' },
        { kr: '폭발', cz: 'výbuch' },
        { kr: '붕괴', cz: 'zřícení' },
        { kr: '익사', cz: 'utonutí' }
    ],
    grammar: {
        title: 'Opakování: -게 하다 v praxi',
        explanation: `PRAKTICKÉ POUŽITÍ -게 하다:

NA STAVBĚ - BEZPEČNOST:
• 위험하게 하면 안 돼요 = Nesmíte to dělat nebezpečně
• 안전하게 해야 해요 = Musíte to udělat bezpečně

PŘÍKAZY S -게 하다:
• 조심하게 하세요 = Nechte ho být opatrný
• 확인하게 해요 = Nechám to zkontrolovat

KOMBINACE S JINÝMI GRAMATIKAMI:
• 기다리게 해서 미안해요 = Promiň, že jsem tě nechal čekat
• 알게 해 줘서 고마워요 = Díky, že jsi mi dal vědět`,
        examples: [
            { kr: '정전이 나면 대피하세요', cz: 'Při výpadku proudu se evakuujte' },
            { kr: '가스누출을 발견하면 신고하세요', cz: 'Při úniku plynu nahlaste to' },
            { kr: '폭발 위험이 있어요', cz: 'Hrozí nebezpečí výbuchu' },
            { kr: '건물이 붕괴됐어요', cz: 'Budova se zřítila' }
        ]
    },
    tasks: [
        '📚 Nauč se 5 dalších slov o nehodách',
        '✍️ Procvičuj -게 하다 v kontextu bezpečnosti',
        '🔁 Opakuj slovíčka z dne 165',
        '📱 Přidej do Anki'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 167 - PÁ 17.7.2026 - Nehody #3
// ============================================================================
const day167: KoreanDayData = {
    day: 167,
    date: 'PÁ 17.7.2026',
    title: '🚨 Nehody #3',
    vocab: [
        { kr: '감전', cz: 'zásah proudem' },
        { kr: '질식', cz: 'udušení' },
        { kr: '중독', cz: 'otrava' },
        { kr: '낙뢰', cz: 'blesk (úder)' },
        { kr: '태풍', cz: 'tajfun' }
    ],
    grammar: {
        title: 'Kombinace: -게 하다 + předchozí gramatiky',
        explanation: `KOMBINACE GRAMATIK:

-게 하다 + -아/어야 하다:
조심하게 해야 해요 = Musím ho přimět být opatrný

-게 하다 + -(으)면 안 되다:
울게 하면 안 돼요 = Nesmíš ho rozplakat

-게 하다 + -아/어도 되다:
가게 해도 돼요? = Můžu ho nechat jít?

NOUZOVÉ SITUACE:
• 감전되면 전원을 끄세요 = Při zásahu proudem vypněte napájení
• 질식 위험이 있으면 환기하세요 = Při riziku udušení větrejte`,
        examples: [
            { kr: '감전되지 않게 조심하세요', cz: 'Dávejte pozor, abyste nedostali ránu' },
            { kr: '질식하지 않게 환기해요', cz: 'Větrejte, aby nedošlo k udušení' },
            { kr: '중독되지 않게 마스크를 쓰세요', cz: 'Noste masku, abyste se neotrávili' },
            { kr: '낙뢰가 치면 건물 안으로 들어가세요', cz: 'Při blesku jděte do budovy' },
            { kr: '태풍이 오면 외출하지 마세요', cz: 'Při tajfunu nevycházejte' }
        ]
    },
    tasks: [
        '📚 Nauč se posledních 5 slov o nehodách',
        '✍️ Kombinuj -게 하다 s předchozími gramatikami',
        '🔁 Opakuj všech 15 slov o nehodách',
        '📱 Přidej do Anki'
    ],
    notes: [
        '감전 = zásah elektrickým proudem (感電)',
        '질식 = udušení (窒息)',
        '중독 = otrava (中毒) - také "závislost"',
        '낙뢰 = úder blesku (落雷)',
        '태풍 = tajfun (颱風) - v Koreji časté!'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 168 - SO 18.7.2026 - Volání o pomoc #1 + Gramatika -도록
// ============================================================================
const day168: KoreanDayData = {
    day: 168,
    date: 'SO 18.7.2026',
    title: '🆘 Volání o pomoc #1',
    vocab: [
        { kr: '도와주세요', cz: 'pomozte' },
        { kr: '119', cz: 'hasiči/záchranka' },
        { kr: '112', cz: 'policie' },
        { kr: '구급차', cz: 'sanitka' }
    ],
    grammar: {
        title: '-도록 (aby, tak aby)',
        explanation: `Vyjadřuje ÚČEL nebo ZPŮSOB - "aby", "tak aby".

TVORBA:
Kmen slovesa + 도록

PŘÍKLADY TVORBY:
• 늦다 → 늦지 않도록 (aby nepřišel pozdě)
• 다치다 → 다치지 않도록 (aby se nezranil)
• 알다 → 알도록 (aby věděl)
• 듣다 → 들을 수 있도록 (aby slyšel)

DVA HLAVNÍ POUŽITÍ:
1. ÚČEL (aby):
   늦지 않도록 일찍 나가세요 = Vyjděte brzy, abyste nepřišli pozdě

2. MÍRA/STUPEŇ (tak aby):
   들을 수 있도록 크게 말하세요 = Mluvte nahlas, aby bylo slyšet

NA STAVBĚ:
• 다치지 않도록 조심하세요 = Buďte opatrní, abyste se nezranili
• 모두 볼 수 있도록 크게 써요 = Pište velkými písmeny, aby všichni viděli`,
        examples: [
            { kr: '늦지 않도록 일찍 나가세요', cz: 'Vyjděte brzy, abyste nepřišli pozdě' },
            { kr: '다치지 않도록 조심하세요', cz: 'Buďte opatrní, abyste se nezranili' },
            { kr: '잊지 않도록 메모해요', cz: 'Poznamenám si to, abych nezapomněl' },
            { kr: '모두 들을 수 있도록 크게 말하세요', cz: 'Mluvte nahlas, aby všichni slyšeli' },
            { kr: '문제가 없도록 확인하세요', cz: 'Zkontrolujte, aby nebyl problém' },
            { kr: '아프지 않도록 약을 드세요', cz: 'Berte léky, abyste nebyli nemocní' }
        ]
    },
    tasks: [
        '📚 Nauč se 4 základní nouzová slova',
        '✍️ Vytvoř 10 vět s -도록',
        '🗣️ Procvičuj: účel vs míra',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '늦다 + 지 않도록 → ?',
        '다치다 + 지 않도록 → ?',
        '알다 + 도록 → ?',
        'Přelož: Abyste se nezranili, noste helmu',
        'Přelož: Mluvte hlasitě, aby vás slyšeli'
    ],
    notes: [
        '도와주세요! = Pomozte mi! (nejdůležitější fráze)',
        '119 = hasiči a záchranná služba v Koreji',
        '112 = policie v Koreji',
        '구급차 = sanitka (救急車)'
    ],
    isWeekend: true,
    isTest: false
};

// ============================================================================
// DEN 169 - NE 19.7.2026 - Volání o pomoc #2
// ============================================================================
const day169: KoreanDayData = {
    day: 169,
    date: 'NE 19.7.2026',
    title: '🆘 Volání o pomoc #2',
    vocab: [
        { kr: '소방차', cz: 'hasičský vůz' },
        { kr: '경찰차', cz: 'policejní auto' },
        { kr: '구조대', cz: 'záchranáři' },
        { kr: '응급처치', cz: 'první pomoc' }
    ],
    grammar: {
        title: 'Opakování: -도록 v nouzových situacích',
        explanation: `NOUZOVÉ FRÁZE S -도록:

PREVENCE:
• 사고가 나지 않도록 조심하세요 = Dávejte pozor, aby nedošlo k nehodě
• 화재가 나지 않도록 주의하세요 = Pozor, aby nevznikl požár

ZÁCHRANA:
• 숨을 쉴 수 있도록 도와주세요 = Pomozte mu dýchat
• 빨리 오도록 말했어요 = Řekl jsem jim, ať přijedou rychle

KOMUNIKACE S DISPEČINKEM:
• 위치를 알 수 있도록 주소를 말하세요 = Řekněte adresu, aby věděli, kde jste`,
        examples: [
            { kr: '소방차가 올 수 있도록 길을 비켜 주세요', cz: 'Uvolněte cestu, aby projela sanitka' },
            { kr: '경찰차가 빨리 오도록 신고했어요', cz: 'Zavolal jsem, aby policie přijela rychle' },
            { kr: '구조대가 찾을 수 있도록 신호를 보내세요', cz: 'Dejte signál, aby vás záchranáři našli' },
            { kr: '응급처치를 할 수 있도록 배웠어요', cz: 'Naučil jsem se poskytovat první pomoc' }
        ]
    },
    tasks: [
        '📚 Nauč se 4 slova o záchranných složkách',
        '✍️ Procvičuj -도록 v nouzových situacích',
        '🔁 Opakuj slovíčka z dne 168',
        '📱 Přidej do Anki'
    ],
    focus: ['Opakování dnů 165-168', 'Nehody 15 slov', 'Gramatika: -게 하다, -도록'],
    isWeekend: true,
    isTest: false
};

// ============================================================================
// DEN 170 - PO 20.7.2026 - Volání o pomoc #3
// ============================================================================
const day170: KoreanDayData = {
    day: 170,
    date: 'PO 20.7.2026',
    title: '🆘 Volání o pomoc #3',
    vocab: [
        { kr: 'CPR', cz: 'oživování (resuscitace)' },
        { kr: 'AED', cz: 'defibrilátor' },
        { kr: '산소호흡기', cz: 'kyslíkový přístroj' },
        { kr: '들것', cz: 'nosítka' }
    ],
    grammar: {
        title: 'Kombinace: -게 하다 + -도록',
        explanation: `KOMBINACE OBOU GRAMATIK:

-게 하다 (způsobit/nechat) + -도록 (aby):

PŘÍKLADY:
• 다치지 않게 하도록 조심해요
  = Dávám pozor, abych ho nenechal zranit se

• 기다리게 하지 않도록 빨리 가요
  = Jdu rychle, abych ho nenechal čekat

NA ZÁCHRANCE:
• 환자가 숨을 쉴 수 있게 해 주세요
  = Pomozte pacientovi dýchat

• 사람들이 다치지 않도록 대피시키세요
  = Evakuujte lidi, aby se nezranili`,
        examples: [
            { kr: 'CPR을 할 수 있도록 배웠어요', cz: 'Naučil jsem se dělat CPR' },
            { kr: 'AED를 사용하게 해 주세요', cz: 'Nechte mě použít AED' },
            { kr: '산소호흡기로 숨을 쉴 수 있게 해요', cz: 'Kyslíkovým přístrojem mu umožňujeme dýchat' },
            { kr: '들것에 눕히도록 도와주세요', cz: 'Pomozte ho položit na nosítka' }
        ]
    },
    tasks: [
        '📚 Nauč se 4 slova o záchranářském vybavení',
        '✍️ Kombinuj -게 하다 a -도록',
        '🔁 Opakuj všech 12 slov o volání o pomoc',
        '📱 Přidej do Anki'
    ],
    notes: [
        'CPR = Cardiopulmonary Resuscitation (심폐소생술)',
        'AED = Automated External Defibrillator (자동제세동기)',
        '산소호흡기 = kyslíkový přístroj (산소 = kyslík)',
        '들것 = nosítka (들다 = nést + 것 = věc)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 171 - ÚT 21.7.2026 - Opakování týdne
// ============================================================================
const day171: KoreanDayData = {
    day: 171,
    date: 'ÚT 21.7.2026',
    title: '🔄 OPAKOVÁNÍ',
    vocab: [],
    grammar: {
        title: 'Shrnutí: -게 하다 + -도록',
        explanation: `SHRNUTÍ TÝDNE 3:

-게 하다 (způsobit, nechat):
• 울게 하다 = rozplakat
• 기다리게 하다 = nechat čekat
• 가게 하다 = nechat jít

-도록 (aby, tak aby):
• 늦지 않도록 = aby nepřišel pozdě
• 다치지 않도록 = aby se nezranil
• 알 수 있도록 = aby věděl

NOUZOVÉ FRÁZE:
• 도와주세요! = Pomozte!
• 119에 전화하세요! = Zavolejte 119!
• 사고가 났어요! = Stala se nehoda!`,
        examples: [
            { kr: '도와주세요! 사고가 났어요!', cz: 'Pomozte! Stala se nehoda!' },
            { kr: '119에 전화해 주세요!', cz: 'Zavolejte 119!' },
            { kr: '다치지 않도록 조심하세요', cz: 'Buďte opatrní, abyste se nezranili' },
            { kr: '기다리게 해서 죄송해요', cz: 'Promiňte, že jsem vás nechal čekat' }
        ]
    },
    tasks: [
        '🔁 Opakuj všech 27 slov (nehody + volání o pomoc)',
        '✍️ Procvičuj obě gramatiky',
        '🗣️ Nácvik nouzových dialogů',
        '📱 Anki: opakování'
    ],
    focus: [
        'Nehody: 15 slov',
        'Volání o pomoc: 12 slov',
        'Gramatika: -게 하다',
        'Gramatika: -도록'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 172 - ST 22.7.2026 - Sporty #1 + Gramatika -(으)ㄴ/는데도
// ============================================================================
const day172: KoreanDayData = {
    day: 172,
    date: 'ST 22.7.2026',
    title: '⚽ Sporty #1',
    vocab: [
        { kr: '축구', cz: 'fotbal' },
        { kr: '야구', cz: 'baseball' },
        { kr: '농구', cz: 'basketbal' },
        { kr: '배구', cz: 'volejbal' }
    ],
    grammar: {
        title: '-(으)ㄴ/는데도 (i když, přestože)',
        explanation: `Vyjadřuje KONTRAST - "i když", "přestože", "ačkoli".

TVORBA:
• Přídavné jméno: -(으)ㄴ데도
  작다 → 작은데도 (i když je malý)
  바쁘다 → 바쁜데도 (i když je busy)

• Sloveso (přítomný): -는데도
  가다 → 가는데도 (i když jde)
  먹다 → 먹는데도 (i když jí)

• Sloveso (minulý): -(으)ㄴ데도
  갔다 → 갔는데도 (i když šel)
  먹었다 → 먹었는데도 (i když jedl)

POUŽITÍ:
Zdůrazňuje, že výsledek je NEOČEKÁVANÝ nebo PŘEKVAPIVÝ.
"I když X, tak přesto Y" - Y je překvapení.`,
        examples: [
            { kr: '바쁜데도 와 줘서 고마워요', cz: 'Děkuji, že jsi přišel, i když jsi busy' },
            { kr: '아픈데도 일했어요', cz: 'Pracoval jsem, i když jsem byl nemocný' },
            { kr: '비가 오는데도 축구를 해요', cz: 'Hrají fotbal, i když prší' },
            { kr: '어려운데도 포기하지 않았어요', cz: 'Nevzdal jsem to, i když to bylo těžké' },
            { kr: '많이 먹는데도 살이 안 쪄요', cz: 'I když hodně jím, nepřibírám' },
            { kr: '피곤한데도 운동했어요', cz: 'Cvičil jsem, i když jsem byl unavený' }
        ]
    },
    tasks: [
        '📚 Nauč se 4 míčové sporty',
        '✍️ Vytvoř 10 vět s -(으)ㄴ/는데도',
        '🗣️ Procvičuj kontrast: i když X, tak Y',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '바쁘다 + (으)ㄴ/는데도 → ?',
        '아프다 + (으)ㄴ/는데도 → ?',
        '가다 + 는데도 → ?',
        'Přelož: I když prší, hrají fotbal',
        'Přelož: I když jsem unavený, cvičím'
    ],
    notes: [
        '축구 = fotbal (蹴球, čínské znaky)',
        '야구 = baseball (野球)',
        '농구 = basketbal (籠球)',
        '배구 = volejbal (排球)',
        'Všechny končí na 구 (球 = míč)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 173 - ČT 23.7.2026 - Sporty #2
// ============================================================================
const day173: KoreanDayData = {
    day: 173,
    date: 'ČT 23.7.2026',
    title: '🎾 Sporty #2',
    vocab: [
        { kr: '테니스', cz: 'tenis' },
        { kr: '배드민턴', cz: 'badminton' },
        { kr: '탁구', cz: 'stolní tenis' },
        { kr: '골프', cz: 'golf' }
    ],
    grammar: {
        title: 'Opakování: -(으)ㄴ/는데도 v praxi',
        explanation: `SPORTOVNÍ KONTEXT:

VÝKONY NAVZDORY PŘEKÁŽKÁM:
• 다쳤는데도 경기를 계속했어요 = Pokračoval v zápase, i když se zranil
• 피곤한데도 연습했어요 = Trénoval, i když byl unavený
• 졌는데도 웃었어요 = Usmíval se, i když prohrál

NA STAVBĚ:
• 위험한데도 일했어요 = Pracoval, i když to bylo nebezpečné
• 어두운데도 작업했어요 = Pracovali, i když byla tma

DŮRAZ NA PŘEKVAPENÍ:
Tato gramatika zdůrazňuje, že situace Y je PŘEKVAPIVÁ vzhledem k X.`,
        examples: [
            { kr: '테니스를 처음 하는데도 잘해요', cz: 'Je dobrý v tenisu, i když hraje poprvé' },
            { kr: '연습을 안 했는데도 이겼어요', cz: 'Vyhrál, i když netrénoval' },
            { kr: '어린데도 탁구를 잘 쳐요', cz: 'Hraje dobře stolní tenis, i když je malý' },
            { kr: '골프가 어려운데도 좋아해요', cz: 'Má rád golf, i když je těžký' }
        ]
    },
    tasks: [
        '📚 Nauč se 4 raketové sporty',
        '✍️ Procvičuj -(으)ㄴ/는데도 ve sportovním kontextu',
        '🔁 Opakuj sporty z dne 172',
        '📱 Přidej do Anki'
    ],
    notes: [
        '테니스 = tenis (z angličtiny)',
        '배드민턴 = badminton (z angličtiny)',
        '탁구 = stolní tenis (卓球, "stolní míč")',
        '골프 = golf (z angličtiny)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 174 - PÁ 24.7.2026 - Sporty #3
// ============================================================================
const day174: KoreanDayData = {
    day: 174,
    date: 'PÁ 24.7.2026',
    title: '🏃 Sporty #3',
    vocab: [
        { kr: '수영', cz: 'plavání' },
        { kr: '달리기', cz: 'běh' },
        { kr: '마라톤', cz: 'maraton' },
        { kr: '사이클링', cz: 'cyklistika' }
    ],
    grammar: {
        title: 'Kombinace: všechny tři nové gramatiky',
        explanation: `-게 하다 + -도록 + -(으)ㄴ/는데도

KOMBINACE:
• 다치지 않게 하도록 조심해요 = Dávám pozor, abych se nenechal zranit
• 피곤한데도 포기하지 않게 해 줘요 = I když jsem unavený, nenech mě to vzdát

VYTRVALOSTNÍ SPORTY:
• 힘든데도 마라톤을 완주했어요 = Dokončil jsem maraton, i když to bylo náročné
• 늦지 않도록 달렸어요 = Běžel jsem, abych nepřišel pozdě

MOTIVACE:
• 힘들어도 포기하지 마세요 = Nevzdávejte to, i když je to těžké
• 지쳐도 계속하세요 = Pokračujte, i když jste vyčerpaní`,
        examples: [
            { kr: '수영을 못하는데도 바다에 갔어요', cz: 'Šel jsem k moři, i když neumím plavat' },
            { kr: '더운데도 달리기를 해요', cz: 'Běhá, i když je horko' },
            { kr: '마라톤이 힘든데도 완주했어요', cz: 'Dokončil jsem maraton, i když to bylo těžké' },
            { kr: '비가 오는데도 사이클링을 해요', cz: 'Jezdí na kole, i když prší' }
        ]
    },
    tasks: [
        '📚 Nauč se 4 vytrvalostní sporty',
        '✍️ Kombinuj všechny 3 nové gramatiky',
        '🔁 Opakuj všech 12 sportů',
        '📱 Přidej do Anki'
    ],
    notes: [
        '수영 = plavání (水泳)',
        '달리기 = běh (od 달리다 = běžet)',
        '마라톤 = maraton (z angličtiny)',
        '사이클링 = cyklistika (z angličtiny cycling)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 175 - SO 25.7.2026 - Fitness #1
// ============================================================================
const day175: KoreanDayData = {
    day: 175,
    date: 'SO 25.7.2026',
    title: '💪 Fitness #1',
    vocab: [
        { kr: '헬스장', cz: 'posilovna' },
        { kr: '운동', cz: 'cvičení' },
        { kr: '근육', cz: 'sval' },
        { kr: '스트레칭', cz: 'protahování' },
        { kr: '유산소', cz: 'kardio' }
    ],
    grammar: {
        title: 'Opakování gramatik ve fitness kontextu',
        explanation: `FITNESS FRÁZE:

-게 하다:
• 근육을 크게 하려면 = Aby svaly zesílily
• 몸을 강하게 해요 = Posiluje tělo

-도록:
• 다치지 않도록 스트레칭하세요 = Protahujte se, abyste se nezranili
• 건강하도록 운동하세요 = Cvičte, abyste byli zdraví

-(으)ㄴ/는데도:
• 매일 운동하는데도 살이 안 빠져요 = Cvičím každý den, ale nehubnu
• 힘든데도 계속해요 = Pokračuji, i když je to těžké`,
        examples: [
            { kr: '헬스장에 매일 가요', cz: 'Chodím do posilovny každý den' },
            { kr: '운동하면 건강해져요', cz: 'Cvičením zůstanete zdraví' },
            { kr: '근육을 키우고 싶어요', cz: 'Chci nabrat svaly' },
            { kr: '운동 전에 스트레칭하세요', cz: 'Před cvičením se protáhněte' },
            { kr: '유산소 운동이 중요해요', cz: 'Kardio je důležité' }
        ]
    },
    tasks: [
        '📚 Nauč se 5 základních fitness slov',
        '✍️ Procvičuj gramatiky ve fitness kontextu',
        '🔁 Opakuj sporty z dnů 172-174',
        '📱 Přidej do Anki'
    ],
    notes: [
        '헬스장 = posilovna (헬스 = health + 장 = místo)',
        '운동 = cvičení, sport obecně (運動)',
        '근육 = sval (筋肉)',
        '스트레칭 = protahování (stretching)',
        '유산소 = kardio, aerobní (有酸素)'
    ],
    isWeekend: true,
    isTest: false
};

// ============================================================================
// DEN 176 - NE 26.7.2026 - Fitness #2
// ============================================================================
const day176: KoreanDayData = {
    day: 176,
    date: 'NE 26.7.2026',
    title: '💪 Fitness #2',
    vocab: [
        { kr: '무산소', cz: 'silový (anaerobní)' },
        { kr: '웨이트', cz: 'závaží' },
        { kr: '러닝머신', cz: 'běžecký pás' },
        { kr: '아령', cz: 'činka' },
        { kr: '벤치프레스', cz: 'benchpress' }
    ],
    grammar: {
        title: 'Posilovací slovesa a fráze',
        explanation: `CVIČEBNÍ FRÁZE:

ZÁKLADNÍ SLOVESA:
• 들다 = zvednout (웨이트를 들어요)
• 밀다 = tlačit (벤치프레스를 밀어요)
• 당기다 = táhnout (턱걸이를 해요)

KOMBINACE S GRAMATIKAMI:
• 무리하지 않도록 조심하세요 = Dávejte pozor, abyste to nepřehnali
• 힘든데도 한 세트 더 해요 = Udělám ještě jeden set, i když je to těžké

INSTRUKCE:
• 천천히 하세요 = Dělejte to pomalu
• 자세를 바르게 하세요 = Udržujte správný postoj`,
        examples: [
            { kr: '무산소 운동으로 근육을 키워요', cz: 'Silovým tréninkem nabiram svaly' },
            { kr: '웨이트를 들어요', cz: 'Zvedám závaží' },
            { kr: '러닝머신에서 달려요', cz: 'Běhám na běžeckém pásu' },
            { kr: '아령으로 팔 운동을 해요', cz: 'Cvičím paže s činkami' },
            { kr: '벤치프레스 몇 킬로 해요?', cz: 'Kolik dáváte na bench?' }
        ]
    },
    tasks: [
        '📚 Nauč se 5 slov o vybavení',
        '✍️ Procvičuj cvičební fráze',
        '🔁 Opakuj fitness slovíčka z dne 175',
        '📱 Přidej do Anki'
    ],
    focus: ['Opakování dnů 172-175', 'Sporty 12 slov', 'Fitness 10 slov'],
    isWeekend: true,
    isTest: false
};

// ============================================================================
// DEN 177 - PO 27.7.2026 - Fitness #3
// ============================================================================
const day177: KoreanDayData = {
    day: 177,
    date: 'PO 27.7.2026',
    title: '💪 Fitness #3',
    vocab: [
        { kr: '스쿼트', cz: 'dřep' },
        { kr: '턱걸이', cz: 'shyby' },
        { kr: '푸쉬업', cz: 'kliky' },
        { kr: '플랭크', cz: 'plank' },
        { kr: '버피', cz: 'burpees' }
    ],
    grammar: {
        title: 'Cvičební pokyny a počítání',
        explanation: `POČÍTÁNÍ OPAKOVÁNÍ:

ČÍSLOVKY + 번 (krát):
• 10번 = 10krát
• 스쿼트 20번 하세요 = Udělejte 20 dřepů

SETY:
• 세트 = set
• 3세트 하세요 = Udělejte 3 sety

POKYNY:
• 더 해요 = Udělejte víc
• 쉬세요 = Odpočiňte si
• 천천히 = Pomalu
• 빨리 = Rychle

MOTIVACE:
• 힘내세요! = Držte se!
• 조금만 더요! = Ještě trošku!
• 할 수 있어요! = Zvládnete to!`,
        examples: [
            { kr: '스쿼트 30번 하세요', cz: 'Udělejte 30 dřepů' },
            { kr: '턱걸이 몇 번 할 수 있어요?', cz: 'Kolik shybů zvládneš?' },
            { kr: '푸쉬업 3세트 해요', cz: 'Dělám 3 sety kliků' },
            { kr: '플랭크 1분 해요', cz: 'Držte plank 1 minutu' },
            { kr: '버피 10번 하는데도 힘들어요', cz: 'I 10 burpees je pro mě těžké' }
        ]
    },
    tasks: [
        '📚 Nauč se 5 cviků bez náčiní',
        '✍️ Procvičuj pokyny a počítání',
        '🔁 Opakuj všech 15 fitness slov',
        '📱 Přidej do Anki'
    ],
    notes: [
        '스쿼트 = dřep (squat)',
        '턱걸이 = shyby (턱 = brada + 걸이 = věšení)',
        '푸쉬업 = kliky (push-up)',
        '플랭크 = plank (držení)',
        '버피 = burpees (celotělový cvik)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 178 - ÚT 28.7.2026 - Finální opakování #1
// ============================================================================
const day178: KoreanDayData = {
    day: 178,
    date: 'ÚT 28.7.2026',
    title: '📖 Finální opakování #1',
    vocab: [],
    tasks: [
        '🔁 Opakování: Tělo a zdraví (z předchozích týdnů)',
        '🔁 Opakování: Nemoci a symptomy',
        '✍️ Psaní vět o zdraví s novými gramatikami',
        '📱 Anki maraton'
    ],
    focus: [
        'Části těla',
        'Zdraví a nemoci',
        'Symptomy a léčba',
        'Gramatika: -게 하다'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 179 - ST 29.7.2026 - Finální opakování #2
// ============================================================================
const day179: KoreanDayData = {
    day: 179,
    date: 'ST 29.7.2026',
    title: '📖 Finální opakování #2',
    vocab: [],
    tasks: [
        '🔁 Opakování: Zranění na stavbě',
        '🔁 Opakování: Nouzové situace (dny 165-170)',
        '✍️ Psaní nouzových dialogů',
        '📱 Anki maraton'
    ],
    focus: [
        'Zranění na stavbě',
        'Nehody 15 slov',
        'Volání o pomoc 12 slov',
        'Gramatika: -도록'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 180 - ČT 30.7.2026 - Finální opakování #3
// ============================================================================
const day180: KoreanDayData = {
    day: 180,
    date: 'ČT 30.7.2026',
    title: '📖 Finální opakování #3',
    vocab: [],
    tasks: [
        '🔁 Opakování: Sport (dny 172-174)',
        '🔁 Opakování: Fitness (dny 175-177)',
        '✍️ Psaní o sportu a cvičení',
        '📱 Anki maraton - všechno!'
    ],
    focus: [
        'Sporty 12 slov',
        'Fitness 15 slov',
        'Gramatika: -(으)ㄴ/는데도',
        'Všechny 3 nové gramatiky dohromady'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 181 - PÁ 31.7.2026 - MĚSÍČNÍ TEST
// ============================================================================
const day181: KoreanDayData = {
    day: 181,
    date: 'PÁ 31.7.2026',
    title: '📝 MĚSÍČNÍ TEST ČERVENCE',
    vocab: [],
    grammar: {
        title: 'TEST: Tělo, zdraví, nouzové situace, sport',
        explanation: `TESTOVÉ OBLASTI:

ČÁST A: TĚLO A ZDRAVÍ (25 bodů)
1. 머리 = ___
2. 심장 = ___
3. 아프다 = ___
4. 병원 = ___
5. 약 = ___

ČÁST B: NOUZOVÉ SITUACE (25 bodů)
1. nehoda = ___
2. požár = ___
3. sanitka = ___
4. první pomoc = ___
5. 119에 전화하세요! = ___

ČÁST C: SPORT A FITNESS (25 bodů)
1. fotbal = ___
2. plavání = ___
3. posilovna = ___
4. cvičení = ___
5. dřep = ___

ČÁST D: GRAMATIKA (25 bodů)
1. -게 하다: 기다리게 해서 ___ (promiňte)
2. -도록: 늦지 않___ 일찍 나가세요
3. -(으)ㄴ/는데도: 바쁜___ 와 줘서 고마워요`,
        examples: []
    },
    tasks: [
        '📝 TEST: Část A - Tělo a zdraví (25 bodů)',
        '📝 TEST: Část B - Nouzové situace (25 bodů)',
        '📝 TEST: Část C - Sport a fitness (25 bodů)',
        '📝 TEST: Část D - Gramatika (25 bodů)',
        '🔄 Analýza výsledků'
    ],
    exercises: [
        'ČÁST A - TĚLO A ZDRAVÍ:',
        '1. hlava = ___',
        '2. srdce = ___',
        '3. bolest = ___',
        '4. nemocnice = ___',
        '5. lék = ___',
        '',
        'ČÁST B - NOUZOVÉ SITUACE:',
        '1. 사고 = ___',
        '2. 화재 = ___',
        '3. 구급차 = ___',
        '4. 응급처치 = ___',
        '5. Zavolejte záchranku! = ___',
        '',
        'ČÁST C - SPORT A FITNESS:',
        '1. 축구 = ___',
        '2. 수영 = ___',
        '3. 헬스장 = ___',
        '4. 운동 = ___',
        '5. 스쿼트 = ___',
        '',
        'ČÁST D - GRAMATIKA:',
        '1. Rozplakal jsem dítě = 아이를 ___',
        '2. Abyste nepřišli pozdě = 늦지 않___',
        '3. I když jsem busy = 바쁜___',
        '',
        'ČÁST E - KONVERZACE (BONUS):',
        'Popiš, co děláš, když se stane nehoda na stavbě (3 min).'
    ],
    notes: [
        'ODPOVĚDI:',
        '',
        'ČÁST A: 머리=hlava, 심장=srdce, 아프다=bolet, 병원=nemocnice, 약=lék',
        '',
        'ČÁST B: 사고=nehoda, 화재=požár, 구급차=sanitka, 응급처치=první pomoc, 119에 전화하세요!=Zavolejte záchranku!',
        '',
        'ČÁST C: 축구=fotbal, 수영=plavání, 헬스장=posilovna, 운동=cvičení, 스쿼트=dřep',
        '',
        'ČÁST D:',
        '1. 아이를 울게 했어요',
        '2. 늦지 않도록',
        '3. 바쁜데도',
        '',
        'SHRNUTÍ DNY 165-181:',
        '• Nehody: 15 slov',
        '• Volání o pomoc: 12 slov',
        '• Sporty: 12 slov',
        '• Fitness: 15 slov',
        '• CELKEM: 54 NOVÝCH SLOV',
        '• 3 nové gramatické struktury'
    ],
    isWeekend: false,
    isTest: true
};

// ============================================================================
// EXPORT
// ============================================================================

export const julyDays165to181: KoreanDayData[] = [
    day165, day166, day167, day168, day169, day170, day171,
    day172, day173, day174, day175, day176, day177,
    day178, day179, day180, day181
];

export default julyDays165to181;
