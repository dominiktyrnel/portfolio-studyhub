/**
 * July 2026 - Days 151-164 (Week 1-2)
 * Agent 6A output
 * ZDRAVÍ A TĚLO - Nouzové situace
 * 
 * Struktura měsíce:
 * - Dny 151-153: Části těla
 * - Den 154: Sobotní maraton - Vnitřní orgány
 * - Den 155: Nedělní test
 * - Dny 156-160: Bolesti, symptomy, lékař, léky, zranění
 * - Den 161: Sobotní maraton - Zranění na stavbě
 * - Den 162: Nedělní test
 * - Dny 163-164: Lékárnička a opakování
 */

import type { KoreanDayData } from '../types/study-db';

// ============================================================================
// DEN 151 - ST 1.7.2026 - Tělo 1 (hlava)
// ============================================================================
const day151: KoreanDayData = {
    day: 151,
    date: 'ST 1.7.2026',
    title: '👤 Tělo 1 - Hlava',
    vocab: [
        { kr: '머리', cz: 'hlava' },
        { kr: '이마', cz: 'čelo' },
        { kr: '눈썹', cz: 'obočí' },
        { kr: '눈', cz: 'oči' },
        { kr: '코', cz: 'nos' },
        { kr: '입', cz: 'ústa' },
        { kr: '턱', cz: 'brada' },
        { kr: '볼', cz: 'tvář' },
        { kr: '귀', cz: 'uši' },
        { kr: '목', cz: 'krk' },
        { kr: '머리카락', cz: 'vlasy' },
        { kr: '치아', cz: 'zuby' }
    ],
    grammar: {
        title: '-게 되다 - stát se, dojít k',
        explanation: `Vyjadřuje ZMĚNU stavu nebo situace - něco se stalo/změnilo.

TVORBA:
• Slovesný kmen + 게 되다

PŘÍKLADY TVORBY:
• 알다 → 알게 되다 (dozvědět se, naučit se)
• 가다 → 가게 되다 (dojít k tomu, že jdu)
• 일하다 → 일하게 되다 (začít pracovat)
• 살다 → 살게 되다 (začít žít někde)
• 만나다 → 만나게 되다 (potkat se)

POUŽITÍ:
Vyjadřuje, že se něco stalo přirozeně nebo postupně,
ne z vlastní vůle - spíš "tak to dopadlo".

NA STAVBĚ:
이 회사에서 일하게 됐어요 = Začal jsem pracovat v této firmě
(= dostal jsem tuto práci)`,
        examples: [
            { kr: '한국어를 알게 됐어요', cz: 'Naučil jsem se korejsky' },
            { kr: '친구가 되게 됐어요', cz: 'Stali jsme se přáteli' },
            { kr: '회사에 다니게 됐어요', cz: 'Začal jsem pracovat ve firmě' },
            { kr: '한국에 살게 됐어요', cz: 'Začal jsem žít v Koreji' },
            { kr: '건설 현장에서 일하게 됐어요', cz: 'Začal jsem pracovat na stavbě' },
            { kr: '이 사람을 만나게 됐어요', cz: 'Potkal jsem tohoto člověka' }
        ]
    },
    tasks: [
        '📚 Nauč se 12 slov - části hlavy',
        '✍️ Vytvoř 10 vět s -게 되다',
        '🗣️ Popiš svůj obličej korejsky',
        '📱 Přidej všechna slova do Anki'
    ],
    exercises: [
        '알다 + 게 되다 → ?',
        '일하다 + 게 되다 → ?',
        '살다 + 게 되다 → ?',
        'Přelož: Začal jsem se učit korejsky',
        'Přelož: Stal jsem se jeho přítelem'
    ],
    notes: [
        '머리 = hlava, ale také vlasy v některých kontextech',
        '머리카락 = vlasy (přesněji)',
        '치아 = zuby (formální), 이 = zub (hovorově)',
        'STAVEBNÍ SLOVÍČKA: 용접하다 (svařovat), 드릴하다 (vrtat)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 152 - ČT 2.7.2026 - Tělo 2 (trup)
// ============================================================================
const day152: KoreanDayData = {
    day: 152,
    date: 'ČT 2.7.2026',
    title: '💪 Tělo 2 - Trup',
    vocab: [
        { kr: '어깨', cz: 'rameno' },
        { kr: '팔', cz: 'paže' },
        { kr: '손목', cz: 'zápěstí' },
        { kr: '손', cz: 'ruka' },
        { kr: '손가락', cz: 'prst' },
        { kr: '가슴', cz: 'hrudník' },
        { kr: '배', cz: 'břicho' },
        { kr: '허리', cz: 'pas/záda' },
        { kr: '엉덩이', cz: 'zadek' },
        { kr: '등', cz: 'záda' },
        { kr: '옆구리', cz: 'bok' },
        { kr: '겨드랑이', cz: 'podpaží' }
    ],
    grammar: {
        title: 'Opakování: -게 되다 v praxi',
        explanation: `PRAKTICKÉ POUŽITÍ -게 되다:

NA STAVBĚ:
• 이 현장에서 일하게 됐어요
  = Začal jsem pracovat na tomto staveništi
• 한국 회사에 들어가게 됐어요
  = Dostal jsem se do korejské firmy
• 용접을 배우게 됐어요
  = Naučil jsem se svařovat

OBECNĚ:
• 그렇게 되다 = stát se tak, dopadnout tak
• 어떻게 됐어요? = Jak to dopadlo?
• 잘 됐어요 = Dopadlo to dobře

DŮLEŽITÉ:
-게 되다 vs 하다:
• 한국어를 공부하게 됐어요 = Začal jsem se učit (osud/okolnosti)
• 한국어를 공부했어요 = Učil jsem se (vlastní rozhodnutí)`,
        examples: [
            { kr: '어깨가 아프게 됐어요', cz: 'Začalo mě bolet rameno' },
            { kr: '손목을 다치게 됐어요', cz: 'Zranil jsem si zápěstí' },
            { kr: '허리가 안 좋게 됐어요', cz: 'Záda mi zhoršila' },
            { kr: '그렇게 됐어요', cz: 'Tak to dopadlo' }
        ]
    },
    tasks: [
        '📚 Nauč se 12 slov - trup a paže',
        '✍️ Procvičuj -게 되다 s částmi těla',
        '🔁 Opakuj slovíčka z dne 151',
        '📱 Přidej do Anki'
    ],
    exercises: [
        'Přelož: Bolí mě rameno',
        'Přelož: Zranil jsem si ruku',
        'Přelož: Začal jsem pracovat rukama',
        '어깨 + 아프다 + 게 되다 → ?'
    ],
    notes: [
        '손 = ruka (celá), 손가락 = prst na ruce',
        '허리 = pas i dolní záda (bederní)',
        '등 = záda (horní část)',
        'STAVEBNÍ SLOVÍČKA: 자르다 (řezat), 깎다 (brousit), 섞다 (míchat)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 153 - PÁ 3.7.2026 - Tělo 3 (nohy)
// ============================================================================
const day153: KoreanDayData = {
    day: 153,
    date: 'PÁ 3.7.2026',
    title: '🦵 Tělo 3 - Nohy',
    vocab: [
        { kr: '다리', cz: 'noha' },
        { kr: '허벅지', cz: 'stehno' },
        { kr: '무릎', cz: 'koleno' },
        { kr: '종아리', cz: 'lýtko' },
        { kr: '발목', cz: 'kotník' },
        { kr: '발', cz: 'chodidlo' },
        { kr: '발가락', cz: 'prst u nohy' },
        { kr: '발뒤꿈치', cz: 'pata' },
        { kr: '정강이', cz: 'holeň' },
        { kr: '넓적다리', cz: 'stehno (formálně)' }
    ],
    grammar: {
        title: '-기로 하다 - rozhodnout se',
        explanation: `Vyjadřuje ROZHODNUTÍ - vědomé rozhodnutí něco udělat.

TVORBA:
• Slovesný kmen + 기로 하다

PŘÍKLADY TVORBY:
• 가다 → 가기로 하다 (rozhodnout se jít)
• 하다 → 하기로 하다 (rozhodnout se udělat)
• 결혼하다 → 결혼하기로 하다 (rozhodnout se vzít)
• 그만두다 → 그만두기로 하다 (rozhodnout se přestat)

ROZDÍL OD -게 되다:
• -기로 하다 = vědomé rozhodnutí
• -게 되다 = změna okolnostmi

PŘÍKLADY:
한국에 가기로 했어요 = Rozhodl jsem se jet do Koreje (mé rozhodnutí)
한국에 가게 됐어요 = Musím/Mám jet do Koreje (okolnosti)`,
        examples: [
            { kr: '한국에 가기로 했어요', cz: 'Rozhodl jsem se jet do Koreje' },
            { kr: '결혼하기로 했어요', cz: 'Rozhodli jsme se vzít' },
            { kr: '그렇게 하기로 합시다', cz: 'Dohodněme se na tom' },
            { kr: '내일 병원에 가기로 했어요', cz: 'Rozhodl jsem se jít zítra k lékaři' },
            { kr: '쉬기로 했어요', cz: 'Rozhodl jsem se odpočinout' },
            { kr: '운동하기로 했어요', cz: 'Rozhodl jsem se cvičit' }
        ]
    },
    tasks: [
        '📚 Nauč se 10 slov - nohy',
        '✍️ Vytvoř 10 vět s -기로 하다',
        '🔁 Opakuj všechna slovíčka týdne (151-153)',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '가다 + 기로 하다 → ?',
        '결혼하다 + 기로 하다 → ?',
        '쉬다 + 기로 하다 → ?',
        'Přelož: Rozhodl jsem se jít k lékaři',
        'Přelož: Dohodli jsme se tak udělat'
    ],
    notes: [
        '다리 = noha (celá), 발 = chodidlo',
        '허벅지 = stehno (hovorově), 넓적다리 = stehno (formálně)',
        '발가락 = prst na noze (발 + 가락)',
        'STAVEBNÍ SLOVÍČKA: 붓다 (lít), 파다 (kopat), 운반하다 (přepravovat)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 154 - SO 4.7.2026 - SOBOTNÍ MARATON
// ============================================================================
const day154: KoreanDayData = {
    day: 154,
    date: 'SO 4.7.2026',
    title: '⭐ SOBOTNÍ MARATON - Vnitřní orgány',
    vocab: [
        { kr: '심장', cz: 'srdce' },
        { kr: '폐', cz: 'plíce' },
        { kr: '위', cz: 'žaludek' },
        { kr: '간', cz: 'játra' },
        { kr: '신장', cz: 'ledviny' },
        { kr: '뇌', cz: 'mozek' },
        { kr: '혈관', cz: 'cévy' },
        { kr: '뼈', cz: 'kost' },
        { kr: '근육', cz: 'sval' },
        { kr: '피', cz: 'krev' },
        { kr: '신경', cz: 'nerv' },
        { kr: '피부', cz: 'kůže' }
    ],
    grammar: {
        title: 'Opakování: -게 되다 vs -기로 하다',
        explanation: `SHRNUTÍ DVOU GRAMATIK:

1. -게 되다 = STÁT SE (okolnosti, osud)
• 한국에서 일하게 됐어요
  = Začal jsem pracovat v Koreji (tak to dopadlo)
• 아프게 됐어요
  = Onemocněl jsem (stalo se to)

2. -기로 하다 = ROZHODNOUT SE (vědomá volba)
• 한국에 가기로 했어요
  = Rozhodl jsem se jet do Koreje
• 병원에 가기로 했어요
  = Rozhodl jsem se jít k lékaři

KOMBINACE:
아파서 병원에 가기로 했어요.
= Protože jsem nemocný, rozhodl jsem se jít k lékaři.

그래서 수술을 받게 됐어요.
= A tak jsem musel na operaci (tak to dopadlo).`,
        examples: [
            { kr: '심장이 안 좋게 됐어요', cz: 'Srdce mi zhoršilo' },
            { kr: '병원에서 검사받기로 했어요', cz: 'Rozhodl jsem se na vyšetření' },
            { kr: '건강해지게 됐어요', cz: 'Stal jsem se zdravějším' },
            { kr: '운동하기로 했어요', cz: 'Rozhodl jsem se cvičit' }
        ]
    },
    tasks: [
        '⏰ Hodina 1-2: Opakování slovíček dny 151-153 (34 slov)',
        '⏰ Hodina 3-4: Nová slovíčka - vnitřní orgány (12 slov)',
        '⏰ Hodina 5-6: Gramatika - porovnání -게 되다 a -기로 하다',
        '⏰ Hodina 7-8: Psaní vět o těle a zdraví',
        '📱 Anki: Všechna slovíčka z týdne'
    ],
    exercises: [
        'Popiš lidské tělo od hlavy k patě',
        'Vytvoř 5 vět s -게 되다 (změny zdraví)',
        'Vytvoř 5 vět s -기로 하다 (rozhodnutí o zdraví)',
        'Kombinuj obě gramatiky v příběhu'
    ],
    notes: [
        'SHRNUTÍ TÝDNE 1 - ČÁSTI TĚLA:',
        '• Hlava: 머리, 눈, 코, 입, 귀, 목...',
        '• Trup: 어깨, 팔, 손, 가슴, 배, 허리...',
        '• Nohy: 다리, 무릎, 발목, 발...',
        '• Orgány: 심장, 폐, 위, 간, 뇌...',
        '',
        '46 SLOV CELKEM ZA TÝDEN 1!'
    ],
    isWeekend: true,
    isTest: false
};

// ============================================================================
// DEN 155 - NE 5.7.2026 - NEDĚLNÍ TEST
// ============================================================================
const day155: KoreanDayData = {
    day: 155,
    date: 'NE 5.7.2026',
    title: '📝 NEDĚLNÍ TEST - Části těla',
    vocab: [],
    grammar: {
        title: 'TEST: Části těla + Gramatika',
        explanation: `TESTOVÉ OBLASTI:

ČÁST A: SLOVÍČKA (30 bodů)
Přelož z češtiny do korejštiny:
- Hlava, oči, nos, ústa, uši
- Rameno, ruka, prst, břicho, záda
- Noha, koleno, kotník, chodidlo
- Srdce, plíce, mozek, krev

ČÁST B: GRAMATIKA (40 bodů)
1. -게 되다 (stát se):
   - 아프다 + 게 되다 → ?
   - 일하다 + 게 되다 → ?

2. -기로 하다 (rozhodnout se):
   - 가다 + 기로 하다 → ?
   - 쉬다 + 기로 하다 → ?

ČÁST C: VĚTY (30 bodů)
Přelož celé věty:
- Začal jsem pracovat v Koreji
- Rozhodl jsem se jít k lékaři
- Bolí mě hlava`,
        examples: []
    },
    tasks: [
        '📝 TEST: Část A - Slovíčka (30 bodů)',
        '📝 TEST: Část B - Gramatika (40 bodů)',
        '📝 TEST: Část C - Věty (30 bodů)',
        '🔄 Opakování chyb'
    ],
    exercises: [
        '머리 = ?',
        '심장 = ?',
        '다리 = ?',
        '일하다 + 게 되다 = ?',
        '가다 + 기로 하다 = ?'
    ],
    notes: [
        'ODPOVĚDI:',
        '머리 = hlava, 심장 = srdce, 다리 = noha',
        '일하게 됐어요 = Začal jsem pracovat',
        '가기로 했어요 = Rozhodl jsem se jít',
        '',
        'ROZLIŠENÍ:',
        '-게 되다 = změna okolnostmi',
        '-기로 하다 = vědomé rozhodnutí'
    ],
    isWeekend: true,
    isTest: true
};

// ============================================================================
// DEN 156 - PO 6.7.2026 - Bolesti
// ============================================================================
const day156: KoreanDayData = {
    day: 156,
    date: 'PO 6.7.2026',
    title: '😣 Bolesti',
    vocab: [
        { kr: '아프다', cz: 'bolet' },
        { kr: '통증', cz: 'bolest' },
        { kr: '두통', cz: 'bolest hlavy' },
        { kr: '복통', cz: 'bolest břicha' },
        { kr: '요통', cz: 'bolest zad' },
        { kr: '근육통', cz: 'svalová bolest' },
        { kr: '치통', cz: 'bolest zubů' },
        { kr: '관절통', cz: 'bolest kloubů' },
        { kr: '가슴통증', cz: 'bolest na hrudi' },
        { kr: '편두통', cz: 'migréna' }
    ],
    grammar: {
        title: 'Vyjádření bolesti - základní fráze',
        explanation: `JAK ŘÍCT, ŽE TĚ NĚCO BOLÍ:

ZÁKLADNÍ STRUKTURA:
• [část těla]가/이 아파요 = Bolí mě [část těla]

PŘÍKLADY:
• 머리가 아파요 = Bolí mě hlava
• 배가 아파요 = Bolí mě břicho
• 허리가 아파요 = Bolí mě záda

S PŘÍSLOVCI:
• 많이 아파요 = Hodně to bolí
• 조금 아파요 = Trochu to bolí
• 너무 아파요 = Moc to bolí

NA STAVBĚ - DŮLEŽITÉ FRÁZE:
• 아파서 못 해요 = Nemůžu to dělat, bolí mě to
• 여기가 아파요 = Tady to bolí (ukazuješ)
• 다쳤어요 = Zranil jsem se`,
        examples: [
            { kr: '머리가 아파요', cz: 'Bolí mě hlava' },
            { kr: '두통이 있어요', cz: 'Mám bolest hlavy' },
            { kr: '허리가 너무 아파요', cz: 'Moc mě bolí záda' },
            { kr: '어디가 아파요?', cz: 'Kde tě to bolí?' },
            { kr: '여기가 아파요', cz: 'Tady to bolí' },
            { kr: '아파서 쉬어야 해요', cz: 'Bolí mě to, musím si odpočinout' }
        ]
    },
    tasks: [
        '📚 Nauč se 10 slov o bolestech',
        '✍️ Procvičuj strukturu "X가 아파요"',
        '🗣️ Řekni 5 druhů bolestí, které můžeš mít',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '머리 + 아프다 → ?',
        '배 + 아프다 → ?',
        '허리 + 아프다 → ?',
        'Přelož: Bolí mě zuby',
        'Přelož: Mám migrén'
    ],
    notes: [
        '통 = bolest (Hanja), spojuje se s částmi těla:',
        '두(頭) + 통 = bolest hlavy',
        '복(腹) + 통 = bolest břicha',
        '요(腰) + 통 = bolest zad',
        '치(齒) + 통 = bolest zubů',
        'STAVEBNÍ SLOVÍČKA: 설치하다 (instalovat), 철거하다 (bourat)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 157 - ÚT 7.7.2026 - Symptomy
// ============================================================================
const day157: KoreanDayData = {
    day: 157,
    date: 'ÚT 7.7.2026',
    title: '🤒 Symptomy',
    vocab: [
        { kr: '열', cz: 'horečka' },
        { kr: '기침', cz: 'kašel' },
        { kr: '콧물', cz: 'rýma' },
        { kr: '재채기', cz: 'kýchání' },
        { kr: '구토', cz: 'zvracení' },
        { kr: '설사', cz: 'průjem' },
        { kr: '어지럽다', cz: 'závrať' },
        { kr: '메스껍다', cz: 'nevolnost' },
        { kr: '오한', cz: 'zimnice' },
        { kr: '식은땀', cz: 'studený pot' }
    ],
    grammar: {
        title: 'Symptomy - jak je popsat',
        explanation: `JAK POPSAT SYMPTOMY:

SE SLOVESEM 나다 (vycházet, objevit se):
• 열이 나요 = Mám horečku (doslova: horečka vychází)
• 기침이 나요 = Kašlu (kašel vychází)
• 콧물이 나요 = Teče mi z nosu

SE SLOVESEM 하다:
• 기침을 해요 = Kašlu
• 재채기를 해요 = Kýchám
• 구토를 해요 = Zvracím

S PŘÍDAVNÝMI JMÉNY:
• 어지러워요 = Mám závrať
• 메스꺼워요 = Je mi špatně

KOMBINACE:
열이 나고 기침을 해요 = Mám horečku a kašlu
머리가 아프고 어지러워요 = Bolí mě hlava a mám závrať`,
        examples: [
            { kr: '열이 나요', cz: 'Mám horečku' },
            { kr: '기침이 나요', cz: 'Kašlu' },
            { kr: '콧물이 나요', cz: 'Teče mi z nosu' },
            { kr: '어지러워요', cz: 'Mám závrať' },
            { kr: '메스꺼워요', cz: 'Je mi špatně' },
            { kr: '열이 나고 오한이 있어요', cz: 'Mám horečku a zimnici' }
        ]
    },
    tasks: [
        '📚 Nauč se 10 slov o symptomech',
        '✍️ Procvičuj struktury s 나다 a 하다',
        '🔁 Opakuj slovíčka z dne 156',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '열 + 나다 → ?',
        '기침 + 하다 → ?',
        'Přelož: Mám horečku a kašel',
        'Přelož: Je mi špatně a mám závrať'
    ],
    notes: [
        '열 = horečka i teplo obecně',
        '콧물 = rýma (코 nos + 물 voda)',
        '식은땀 = studený pot (식다 ochladit + 땀 pot)',
        'STAVEBNÍ SLOVÍČKA: 측정하다 (měřit), 조립하다 (montovat)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 158 - ST 8.7.2026 - U lékaře
// ============================================================================
const day158: KoreanDayData = {
    day: 158,
    date: 'ST 8.7.2026',
    title: '🏥 U lékaře',
    vocab: [
        { kr: '의사', cz: 'lékař' },
        { kr: '간호사', cz: 'sestra' },
        { kr: '병원', cz: 'nemocnice' },
        { kr: '진료', cz: 'vyšetření' },
        { kr: '검사', cz: 'testy' },
        { kr: '처방', cz: 'předpis' },
        { kr: '약', cz: 'lék' },
        { kr: '주사', cz: 'injekce' },
        { kr: '수술', cz: 'operace' },
        { kr: '입원', cz: 'hospitalizace' },
        { kr: '퇴원', cz: 'propuštění' },
        { kr: '진단', cz: 'diagnóza' }
    ],
    grammar: {
        title: '-(으)ㄴ/는 것 같다 - zdá se, vypadá to',
        explanation: `Vyjadřuje DOMNĚNKU - zdá se, že...

TVORBA:
Pro SLOVESA (přítomný čas): -는 것 같아요
Pro PŘÍDAVNÁ JMÉNA: -(으)ㄴ 것 같아요
Pro SLOVESA (minulý čas): -(으)ㄴ 것 같아요

PŘÍKLADY - SLOVESA:
• 아프다 (bolet) → 아픈 것 같아요 (zdá se, že bolí)
• 열이 나다 → 열이 나는 것 같아요 (zdá se, že má horečku)
• 먹다 → 먹는 것 같아요 (zdá se, že jí)

PŘÍKLADY - PŘÍDAVNÁ JMÉNA:
• 아프다 (nemocný) → 아픈 것 같아요 (zdá se nemocný)
• 피곤하다 → 피곤한 것 같아요 (zdá se unavený)

NA STAVBĚ:
다친 것 같아요 = Zdá se, že je zraněný
아픈 것 같아요 = Vypadá to, že je nemocný`,
        examples: [
            { kr: '아픈 것 같아요', cz: 'Zdá se, že je nemocný' },
            { kr: '열이 나는 것 같아요', cz: 'Vypadá to, že má horečku' },
            { kr: '다친 것 같아요', cz: 'Zdá se, že je zraněný' },
            { kr: '피곤한 것 같아요', cz: 'Vypadá unaveně' },
            { kr: '감기인 것 같아요', cz: 'Zdá se, že je to chřipka' },
            { kr: '병원에 가야 할 것 같아요', cz: 'Asi budu muset k lékaři' }
        ]
    },
    tasks: [
        '📚 Nauč se 12 slov o nemocnici a lékaři',
        '✍️ Vytvoř 10 vět s -(으)ㄴ/는 것 같다',
        '🗣️ Procvičuj domněnky o zdravotním stavu',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '아프다 + 는 것 같다 → ?',
        '열이 나다 + 는 것 같다 → ?',
        '다치다 (minulý) + 은 것 같다 → ?',
        'Přelož: Zdá se, že má chřipku',
        'Přelož: Asi budu muset na operaci'
    ],
    notes: [
        '병원 = nemocnice, 의원 = klinika (menší)',
        '입원 = vstup do nemocnice (입 vstup + 원 nemocnice)',
        '퇴원 = odchod z nemocnice (퇴 odejít + 원)',
        'STAVEBNÍ SLOVÍČKA: 고정하다 (upevnit), 풀다 (uvolnit)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 159 - ČT 9.7.2026 - Léky
// ============================================================================
const day159: KoreanDayData = {
    day: 159,
    date: 'ČT 9.7.2026',
    title: '💊 Léky',
    vocab: [
        { kr: '알약', cz: 'tableta' },
        { kr: '가루약', cz: 'prášek' },
        { kr: '물약', cz: 'sirup' },
        { kr: '연고', cz: 'mast' },
        { kr: '파스', cz: 'náplast (léčivá)' },
        { kr: '붕대', cz: 'obvaz' },
        { kr: '반창고', cz: 'leukoplast' },
        { kr: '소독약', cz: 'dezinfekce' },
        { kr: '진통제', cz: 'analgetikum' },
        { kr: '항생제', cz: 'antibiotikum' },
        { kr: '해열제', cz: 'na horečku' },
        { kr: '소화제', cz: 'na trávení' }
    ],
    grammar: {
        title: 'Opakování: -(으)ㄴ/는 것 같다 v praxi',
        explanation: `PRAKTICKÉ POUŽITÍ NA STAVBĚ:

POZOROVÁNÍ KOLEGŮ:
• 피곤한 것 같아요 = Vypadá unaveně
• 아픈 것 같아요 = Zdá se, že je nemocný
• 다친 것 같아요 = Zdá se, že je zraněný

VLASTNÍ POCITY:
• 감기에 걸린 것 같아요 = Asi jsem chytl chřipku
• 약을 먹어야 할 것 같아요 = Asi budu muset vzít léky
• 병원에 가야 할 것 같아요 = Asi budu muset k lékaři

DOPORUČENÍ:
• 진통제가 필요한 것 같아요 = Zdá se, že potřebuje analgetikum
• 연고를 발라야 할 것 같아요 = Asi bude třeba namazat mast
• 쉬어야 할 것 같아요 = Asi si bude muset odpočinout`,
        examples: [
            { kr: '진통제가 필요한 것 같아요', cz: 'Zdá se, že potřebuje prášky na bolest' },
            { kr: '약을 먹어야 할 것 같아요', cz: 'Asi budu muset vzít léky' },
            { kr: '연고를 바르는 것 같아요', cz: 'Zdá se, že si maže mast' },
            { kr: '해열제가 있어야 할 것 같아요', cz: 'Asi bychom měli mít léky na horečku' }
        ]
    },
    tasks: [
        '📚 Nauč se 12 slov o lécích',
        '✍️ Procvičuj domněnky o lécích a léčbě',
        '🔁 Opakuj slovíčka z dní 156-158',
        '📱 Přidej do Anki'
    ],
    exercises: [
        'Přelož: Potřebuji léky na bolest hlavy',
        'Přelož: Asi budu muset vzít antibiotika',
        'Přelož: Zdá se, že potřebuje obvaz'
    ],
    notes: [
        '약 = lék obecně',
        '알약 = tableta (알 = zrno, kuličky)',
        '가루약 = prášek (가루 = prášek)',
        '물약 = sirup (물 = voda)',
        '제 = přípravek (Hanja): 진통제, 항생제, 해열제, 소화제',
        'STAVEBNÍ SLOVÍČKA: 조이다 (utáhnout)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 160 - PÁ 10.7.2026 - Zranění
// ============================================================================
const day160: KoreanDayData = {
    day: 160,
    date: 'PÁ 10.7.2026',
    title: '🩹 Zranění',
    vocab: [
        { kr: '다치다', cz: 'zranit se' },
        { kr: '베이다', cz: 'říznout se' },
        { kr: '화상', cz: 'popálenina' },
        { kr: '골절', cz: 'zlomenina' },
        { kr: '타박상', cz: 'modřina (úraz)' },
        { kr: '찰과상', cz: 'odřenina' },
        { kr: '염좌', cz: 'vymknutí' },
        { kr: '탈구', cz: 'vykloubení' },
        { kr: '출혈', cz: 'krvácení' },
        { kr: '부종', cz: 'otok' },
        { kr: '멍', cz: 'modřina' },
        { kr: '상처', cz: 'rána' }
    ],
    grammar: {
        title: '-나 보다 - asi, zřejmě (domněnka z pozorování)',
        explanation: `Vyjadřuje DOMNĚNKU na základě pozorování nebo důkazů.

TVORBA:
Pro SLOVESA: -나 보다
Pro PŘÍDAVNÁ JMÉNA: -(으)ㄴ가 보다

PŘÍKLADY - SLOVESA:
• 아프다 → 아픈가 봐요 (asi je nemocný - vidím to)
• 다치다 → 다쳤나 봐요 (asi se zranil - vidím)
• 바쁘다 → 바쁜가 봐요 (asi je busy - nevyzvedá telefon)

ROZDÍL:
• 것 같다 = zdá se (obecná domněnka)
• -나 보다 = asi (domněnka z důkazů)

PŘÍKLAD:
아픈 것 같아요 = Zdá se, že je nemocný (obecně)
아픈가 봐요 = Asi je nemocný (vidím, že kulhá apod.)`,
        examples: [
            { kr: '아픈가 봐요', cz: 'Asi je nemocný' },
            { kr: '다쳤나 봐요', cz: 'Asi se zranil' },
            { kr: '많이 바쁜가 봐요', cz: 'Zřejmě je hodně busy' },
            { kr: '손을 베었나 봐요', cz: 'Asi se řízl do ruky' },
            { kr: '발목을 삐었나 봐요', cz: 'Asi si vyvrtnul kotník' },
            { kr: '피가 나나 봐요', cz: 'Asi mu teče krev' }
        ]
    },
    tasks: [
        '📚 Nauč se 12 slov o zraněních',
        '✍️ Vytvoř 10 vět s -나 보다',
        '🔁 Opakuj všechna slovíčka týdne 2',
        '📱 Přidej do Anki'
    ],
    exercises: [
        '다치다 + 나 보다 → ?',
        '아프다 + (으)ㄴ가 보다 → ?',
        '베이다 + 나 보다 → ?',
        'Přelož: Asi si zlomil nohu',
        'Přelož: Zřejmě má popáleninu'
    ],
    notes: [
        '다치다 = zranit se (obecně)',
        '베이다 = říznout se (ostrým)',
        '멍 = modřina (hovorově), 타박상 = modřina (formálně)',
        '염좌 = vymknutí (ligamenta), 탈구 = vykloubení (kloub)',
        'STAVEBNÍ SLOVÍČKA: 용접하다 (svařovat) - opakování'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 161 - SO 11.7.2026 - SOBOTNÍ MARATON
// ============================================================================
const day161: KoreanDayData = {
    day: 161,
    date: 'SO 11.7.2026',
    title: '⭐ SOBOTNÍ MARATON - Zranění na stavbě',
    vocab: [
        { kr: '손가락 베였어요', cz: 'řízl jsem si prst' },
        { kr: '머리 부딪혔어요', cz: 'uhodil jsem se do hlavy' },
        { kr: '발목 삐었어요', cz: 'vyvrtnul jsem si kotník' },
        { kr: '눈에 뭔가 들어갔어요', cz: 'něco mi vletělo do oka' },
        { kr: '화상 입었어요', cz: 'popálil jsem se' }
    ],
    grammar: {
        title: '-(으)ㄹ 줄 알다/모르다 - umět/neumět',
        explanation: `Vyjadřuje SCHOPNOST - umět/neumět něco udělat.

TVORBA:
• Kmen na samohlásku + ㄹ 줄 알다/모르다
• Kmen na souhlásku + 을 줄 알다/모르다

알다 = umět, vědět jak
모르다 = neumět, nevědět jak

PŘÍKLADY:
• 수영하다 → 수영할 줄 알아요 (Umím plavat)
• 운전하다 → 운전할 줄 몰라요 (Neumím řídit)
• 용접하다 → 용접할 줄 알아요? (Umíš svařovat?)
• 읽다 → 읽을 줄 알아요 (Umím číst)

NA STAVBĚ - VELMI DŮLEŽITÉ:
용접할 줄 알아요? = Umíš svařovat?
드릴 사용할 줄 알아요? = Umíš používat vrtačku?
응급처치할 줄 알아요? = Umíš první pomoc?`,
        examples: [
            { kr: '수영할 줄 알아요', cz: 'Umím plavat' },
            { kr: '운전할 줄 몰라요', cz: 'Neumím řídit' },
            { kr: '용접할 줄 알아요?', cz: 'Umíš svařovat?' },
            { kr: '한국어 읽을 줄 알아요', cz: 'Umím číst korejsky' },
            { kr: '응급처치할 줄 알아요?', cz: 'Umíš první pomoc?' },
            { kr: '그라인더 쓸 줄 몰라요', cz: 'Neumím používat brusku' }
        ]
    },
    tasks: [
        '⏰ Hodina 1-2: Opakování slovíček dny 156-160 (56 slov)',
        '⏰ Hodina 3-4: Fráze - zranění na stavbě (5 frází)',
        '⏰ Hodina 5-6: Gramatika -(으)ㄹ 줄 알다/모르다',
        '⏰ Hodina 7-8: Dialogy - hlášení zranění na stavbě',
        '📱 Anki: Všechna slovíčka'
    ],
    exercises: [
        'Vytvoř dialog: Hlášení zranění na stavbě',
        '수영하다 + (으)ㄹ 줄 알다 → ?',
        '운전하다 + (으)ㄹ 줄 모르다 → ?',
        '용접하다 + (으)ㄹ 줄 알다 + ? (otázka) → ?'
    ],
    notes: [
        'DŮLEŽITÉ FRÁZE PRO STAVBU:',
        '• 다쳤어요! = Zranil jsem se!',
        '• 도와주세요! = Pomozte!',
        '• 피가 나요 = Krvácím',
        '• 못 움직여요 = Nemůžu se hýbat',
        '• 병원에 가야 해요 = Musím do nemocnice',
        '',
        'STAVEBNÍ SLOVÍČKA - SHRNUTÍ:',
        '용접하다, 드릴하다, 자르다, 깎다, 섞다, 붓다, 파다,',
        '운반하다, 설치하다, 철거하다, 측정하다, 조립하다,',
        '고정하다, 풀다, 조이다'
    ],
    isWeekend: true,
    isTest: false
};

// ============================================================================
// DEN 162 - NE 12.7.2026 - NEDĚLNÍ TEST
// ============================================================================
const day162: KoreanDayData = {
    day: 162,
    date: 'NE 12.7.2026',
    title: '📝 NEDĚLNÍ TEST - Zdraví komplet',
    vocab: [],
    grammar: {
        title: 'KOMPLETNÍ TEST TÝDNE 1-2',
        explanation: `TESTOVÉ OBLASTI:

ČÁST A: SLOVÍČKA (40 bodů)
Části těla:
- hlava, rameno, noha, srdce, mozek

Bolesti a symptomy:
- bolest hlavy, horečka, kašel, závrať

U lékaře:
- lékař, nemocnice, operace, diagnóza

Léky a zranění:
- tableta, obvaz, zlomenina, popálenina

ČÁST B: GRAMATIKA (40 bodů)
1. -게 되다 (stát se)
2. -기로 하다 (rozhodnout se)
3. -(으)ㄴ/는 것 같다 (zdá se)
4. -나 보다 (asi z pozorování)
5. -(으)ㄹ 줄 알다/모르다 (umět/neumět)

ČÁST C: FRÁZE (20 bodů)
Stavební fráze o zranění.`,
        examples: []
    },
    tasks: [
        '📝 TEST: Část A - Slovíčka (40 bodů)',
        '📝 TEST: Část B - Gramatika (40 bodů)',
        '📝 TEST: Část C - Fráze (20 bodů)',
        '🔄 Analýza chyb'
    ],
    exercises: [
        '머리 = ?',
        '두통 = ?',
        '병원 = ?',
        '골절 = ?',
        '일하다 + 게 되다 = ?',
        '가다 + 기로 하다 = ?',
        '아프다 + 는 것 같다 = ?',
        '다치다 + 나 보다 = ?',
        '수영하다 + (으)ㄹ 줄 알다 = ?'
    ],
    notes: [
        'ODPOVĚDI:',
        '머리 = hlava, 두통 = bolest hlavy',
        '병원 = nemocnice, 골절 = zlomenina',
        '일하게 됐어요 = Začal jsem pracovat',
        '가기로 했어요 = Rozhodl jsem se jít',
        '아픈 것 같아요 = Zdá se nemocný',
        '다쳤나 봐요 = Asi se zranil',
        '수영할 줄 알아요 = Umím plavat',
        '',
        'SHRNUTÍ DNY 151-162:',
        '• Tělo: 46 slov',
        '• Zdraví: 56 slov',
        '• Fráze: 5',
        '• CELKEM: 107 SLOV/FRÁZÍ!',
        '• 5 gramatických struktur'
    ],
    isWeekend: true,
    isTest: true
};

// ============================================================================
// DEN 163 - PO 13.7.2026 - Lékárnička
// ============================================================================
const day163: KoreanDayData = {
    day: 163,
    date: 'PO 13.7.2026',
    title: '🧰 Lékárnička',
    vocab: [
        { kr: '응급상자', cz: 'lékárnička' },
        { kr: '붕대', cz: 'obvaz' },
        { kr: '소독약', cz: 'dezinfekce' },
        { kr: '반창고', cz: 'náplast' },
        { kr: '가위', cz: 'nůžky' },
        { kr: '핀셋', cz: 'pinzeta' },
        { kr: '장갑', cz: 'rukavice' },
        { kr: '삼각건', cz: 'trojcípý šátek' },
        { kr: '냉찜질팩', cz: 'chladící obklad' },
        { kr: '부목', cz: 'dlaha' }
    ],
    grammar: {
        title: 'Kombinace všech gramatik - první pomoc',
        explanation: `PRVNÍ POMOC - KOMBINACE GRAMATIK:

SITUACE 1 - Pozorování:
다친 것 같아요 = Zdá se zraněný
아픈가 봐요 = Asi je nemocný (vidím)

SITUACE 2 - Schopnosti:
응급처치할 줄 알아요? = Umíš první pomoc?
붕대 감을 줄 알아요? = Umíš ovázat obvazem?

SITUACE 3 - Rozhodnutí:
병원에 가기로 했어요 = Rozhodli jsme se jet do nemocnice
쉬기로 했어요 = Rozhodl jsem se odpočinout

SITUACE 4 - Změna:
건강해지게 됐어요 = Uzdravil jsem se
일할 수 있게 됐어요 = Zase můžu pracovat

KOMPLETNÍ DIALOG:
A: 다쳤나 봐요! (Asi se zranil!)
B: 응급처치할 줄 알아요? (Umíš první pomoc?)
A: 네, 붕대 가져올게요. (Ano, přinesu obvaz.)
B: 병원에 가야 할 것 같아요. (Asi bude muset do nemocnice.)`,
        examples: [
            { kr: '응급상자 어디 있어요?', cz: 'Kde je lékárnička?' },
            { kr: '붕대로 감아야 해요', cz: 'Musíš to ovázat' },
            { kr: '소독약 발라야 해요', cz: 'Musíš namazat dezinfekci' },
            { kr: '냉찜질팩 가져올까요?', cz: 'Mám přinést chladící obklad?' }
        ]
    },
    tasks: [
        '📚 Nauč se 10 slov z lékárničky',
        '✍️ Kombinuj všech 5 gramatik',
        '🗣️ Procvičuj dialogy první pomoci',
        '📱 Přidej do Anki'
    ],
    exercises: [
        'Přelož: Kde je lékárnička?',
        'Přelož: Umíš ovázat ránu?',
        'Přelož: Asi bude potřebovat dlahu',
        'Vytvoř dialog: Zranění → První pomoc → Nemocnice'
    ],
    notes: [
        '응급 = nouzový, akutní',
        '응급상자 = lékárnička (nouzová skříňka)',
        '응급처치 = první pomoc (nouzové ošetření)',
        '냉찜질 = studený obklad (냉 = studený)',
        '부목 = dlaha (na zlomeniny)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 164 - ÚT 14.7.2026 - Opakování a praktické dialogy
// ============================================================================
const day164: KoreanDayData = {
    day: 164,
    date: 'ÚT 14.7.2026',
    title: '🔄 Opakování - Zdraví komplet',
    vocab: [],
    grammar: {
        title: 'Souhrnné opakování 5 gramatik',
        explanation: `SHRNUTÍ 5 GRAMATICKÝCH STRUKTUR:

1. -게 되다 (stát se, změna)
한국에서 일하게 됐어요 = Začal jsem pracovat v Koreji

2. -기로 하다 (rozhodnout se)
병원에 가기로 했어요 = Rozhodl jsem se jít k lékaři

3. -(으)ㄴ/는 것 같다 (zdá se)
아픈 것 같아요 = Zdá se, že je nemocný

4. -나 보다 (asi, z pozorování)
다쳤나 봐요 = Asi se zranil (vidím)

5. -(으)ㄹ 줄 알다/모르다 (umět/neumět)
용접할 줄 알아요? = Umíš svařovat?

PRAKTICKÝ DIALOG NA STAVBĚ:
A: 어! 뭔가 다쳤나 봐요!
B: 어디가 아파요?
A: 손가락 베였어요. 피가 나요.
B: 응급상자 가져올게요. 붕대 감을 줄 알아요?
A: 네, 알아요. 감사합니다.
B: 병원에 가야 할 것 같아요.
A: 네, 가기로 했어요.`,
        examples: [
            { kr: '다쳤어요! 도와주세요!', cz: 'Zranil jsem se! Pomozte!' },
            { kr: '어디가 아파요?', cz: 'Kde vás to bolí?' },
            { kr: '피가 나요', cz: 'Krvácím' },
            { kr: '병원에 가야 해요', cz: 'Musím do nemocnice' }
        ]
    },
    tasks: [
        '🔁 Opakuj všech 115 slov z týdne 1-2',
        '✍️ Napiš 5 dialogů s různými gramatickými strukturami',
        '🗣️ Procvičuj nouzové fráze nahlas',
        '📱 Anki maraton - všechna slovíčka'
    ],
    exercises: [
        'Dialog 1: Bolest → Lékař',
        'Dialog 2: Zranění na stavbě → První pomoc',
        'Dialog 3: Symptomy → Léky',
        'Dialog 4: Schopnosti na stavbě',
        'Dialog 5: Změny v životě (-게 되다)'
    ],
    notes: [
        'SHRNUTÍ ČERVENEC TÝDEN 1-2:',
        '',
        'SLOVNÍ ZÁSOBA:',
        '• Části těla: 46 slov',
        '• Bolesti a symptomy: 20 slov',
        '• Lékař a léky: 24 slov',
        '• Zranění: 17 slov',
        '• Lékárnička: 10 slov',
        '• CELKEM: 117 SLOV!',
        '',
        'GRAMATIKA:',
        '• -게 되다 (stát se)',
        '• -기로 하다 (rozhodnout se)',
        '• -(으)ㄴ/는 것 같다 (zdá se)',
        '• -나 보다 (asi)',
        '• -(으)ㄹ 줄 알다/모르다 (umět)',
        '',
        'STAVEBNÍ SLOVÍČKA (15):',
        '용접하다, 드릴하다, 자르다, 깎다, 섞다,',
        '붓다, 파다, 운반하다, 설치하다, 철거하다,',
        '측정하다, 조립하다, 고정하다, 풀다, 조이다'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// EXPORT
// ============================================================================

export const julyDays151to164: KoreanDayData[] = [
    day151, day152, day153, day154, day155, day156, day157,
    day158, day159, day160, day161, day162, day163, day164
];

export default julyDays151to164;
