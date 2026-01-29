/**
 * May 2026 - Days 104-120 (Week 3-4+)
 * Agent 4B output
 * 
 * Období: 15.5.2026 - 31.5.2026
 * Témata: Emoce, vztahy, komunikace, hobby, sport, volný čas
 * Gramatika: -기 전에 (opakování), -(으)ㄴ 후에, kombinace časových výrazů
 * Stavební slovíčka: zeď, podlaha, strop, střecha, okno, dveře, sloup, trám, potrubí, kabel, vypínač, zásuvka, osvětlení, topení, klimatizace
 */

import type { KoreanDayData } from '../types/study-db';

// ============ DEN 104 - PÁ 15.5.2026 ============
const day104: KoreanDayData = {
    day: 104,
    date: 'PÁ 15.5.2026',
    title: '😊 Emoce 1',
    vocab: [
        { kr: '기쁘다', cz: 'šťastný' },
        { kr: '슬프다', cz: 'smutný' },
        { kr: '화나다', cz: 'naštvaný' },
        { kr: '무섭다', cz: 'strašidelný' },
        { kr: '걱정되다', cz: 'mít starost' },
        { kr: '기대되다', cz: 'těšit se' },
        { kr: '실망하다', cz: 'zklamaný' },
        { kr: '놀라다', cz: 'překvapený' },
        { kr: '부끄럽다', cz: 'stydět se' },
        { kr: '창피하다', cz: 'trapný' }
    ],
    grammar: {
        title: '-기 전에 - před tím než (opakování)',
        explanation: `Částice -기 전에 vyjadřuje "před tím, než".

TVAR:
Kmen slovesa + 기 전에

PŘÍKLADY:
자다 → 자기 전에 (před spaním)
먹다 → 먹기 전에 (před jídlem)
가다 → 가기 전에 (před odchodem)

S EMOCEMI:
화내기 전에 생각하세요
(Než se naštveš, přemýšlej)

걱정하기 전에 확인하세요
(Než se budeš strachovat, ověř si to)`,
        examples: [
            { kr: '자기 전에 책을 읽어요', cz: 'Před spaním čtu' },
            { kr: '화내기 전에 생각하세요', cz: 'Než se naštveš, přemýšlej' },
            { kr: '걱정하기 전에 확인해 봐요', cz: 'Než se budeš strachovat, ověř si to' },
            { kr: '실망하기 전에 기다려요', cz: 'Než budeš zklamaný, počkej' },
            { kr: '기뻐하기 전에 확실히 해요', cz: 'Než se budeš radovat, ujisti se' }
        ]
    },
    tasks: [
        'Napiš 10 emocí 3×',
        'Vytvoř 5 vět s -기 전에 a emocemi',
        'Popiš své emoce z cesty do Koreje',
        'Přidej do Anki'
    ],
    exercises: [
        '기쁘다 → Jsem šťastný = 기뻐요',
        '슬프다 → Jsem smutný = 슬퍼요',
        '화나다 → Jsem naštvaný = 화나요',
        '걱정되다 → Mám starost = 걱정돼요',
        '놀라다 → Jsem překvapený = 놀랐어요'
    ],
    notes: [
        '기쁘다 vs 행복하다: 기쁘다 = momentální radost, 행복하다 = celkové štěstí',
        '화나다 vs 짜증나다: 화나다 = naštvaný, 짜증나다 = otravný/frustrovaný',
        '부끄럽다 vs 창피하다: podobné, 창피하다 je silnější (trapný před lidmi)'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 105 - SO 16.5.2026 ============
const day105: KoreanDayData = {
    day: 105,
    date: 'SO 16.5.2026',
    title: '⭐ SOBOTNÍ MARATON - Emoce 2 (8 hodin)',
    vocab: [
        { kr: '외롭다', cz: 'osamělý' },
        { kr: '지루하다', cz: 'nudný' },
        { kr: '심심하다', cz: 'znuděný' },
        { kr: '피곤하다', cz: 'unavený' },
        { kr: '졸리다', cz: 'ospalý' },
        { kr: '배고프다', cz: 'hladový' },
        { kr: '목마르다', cz: 'žíznivý' },
        { kr: '아프다', cz: 'bolet' },
        { kr: '편하다', cz: 'pohodlný' },
        { kr: '불편하다', cz: 'nepohodlný' }
    ],
    grammar: {
        title: 'Emoce - pokročilé vyjádření',
        explanation: `FYZICKÉ POCITY:
배고프다 = hladový → 배고파요
목마르다 = žíznivý → 목말라요
졸리다 = ospalý → 졸려요
피곤하다 = unavený → 피곤해요

MENTÁLNÍ STAVY:
외롭다 = osamělý → 외로워요
지루하다 = nudný → 지루해요
심심하다 = znuděný → 심심해요

POZOR NA ROZDÍL:
지루하다 = něco JE nudné (film je nudný)
심심하다 = JÁ jsem znuděný (nemám co dělat)`,
        examples: [
            { kr: '혼자 있어서 외로워요', cz: 'Jsem sám, tak jsem osamělý' },
            { kr: '이 영화가 지루해요', cz: 'Tento film je nudný' },
            { kr: '할 일이 없어서 심심해요', cz: 'Nemám co dělat, tak se nudím' },
            { kr: '어제 많이 일해서 피곤해요', cz: 'Včera jsem hodně pracoval, tak jsem unavený' },
            { kr: '밤에 잘 못 자서 졸려요', cz: 'V noci jsem nespal dobře, tak jsem ospalý' }
        ]
    },
    tasks: [
        'Hodina 1-2: Slovíčka emocí - 20 slov',
        'Hodina 3-4: Gramatika -기 전에 + emoce',
        'Hodina 5: Psaní o emocích z cesty do Koreje',
        'Hodina 6-7: Konverzace s přítelkyní o pocitech',
        'Hodina 8: Pasivní poslech'
    ],
    notes: [
        '외롭다 se často používá s -어서: 외로워서 슬퍼요',
        '심심하다 vs 지루하다 - zapamatuj si rozdíl!',
        'TIP: Korejci často říkají 힘들다 (je to náročné) místo konkrétní emoce'
    ],
    isWeekend: true,
    isTest: false
};

// ============ DEN 106 - NE 17.5.2026 ============
const day106: KoreanDayData = {
    day: 106,
    date: 'NE 17.5.2026',
    title: '🔄 NEDĚLNÍ MEGA OPAKOVÁNÍ + TEST - Vztahy 1',
    vocab: [
        { kr: '관계', cz: 'vztah' },
        { kr: '사이', cz: 'vztah mezi' },
        { kr: '친하다', cz: 'blízký (vztah)' },
        { kr: '가깝다', cz: 'blízký (vzdálenost/vztah)' },
        { kr: '멀다', cz: 'vzdálený' },
        { kr: '만나다', cz: 'potkat' },
        { kr: '헤어지다', cz: 'rozejít se' },
        { kr: '사귀다', cz: 'chodit s' },
        { kr: '연애', cz: 'randění' },
        { kr: '결혼', cz: 'manželství' }
    ],
    grammar: {
        title: 'TEST TÝDNE - Emoce',
        explanation: `SHRNUTÍ EMOCÍ:

POZITIVNÍ:
기쁘다 (šťastný), 기대되다 (těšit se)

NEGATIVNÍ:
슬프다 (smutný), 화나다 (naštvaný), 무섭다 (strašidelný)
걱정되다 (mít starost), 실망하다 (zklamaný)

FYZICKÉ:
피곤하다 (unavený), 졸리다 (ospalý)
배고프다 (hladový), 목마르다 (žíznivý)

GRAMATIKA S EMOCEMI:
Emoce + -아서/어서 = protože jsem [emoce]
기뻐서 웃었어요 (Protože jsem byl šťastný, smál jsem se)`,
        examples: [
            { kr: '우리 사이가 좋아요', cz: 'Máme dobrý vztah' },
            { kr: '그 사람과 친해요', cz: 'S tou osobou jsem blízký' },
            { kr: '언제 만났어요?', cz: 'Kdy jste se potkali?' },
            { kr: '1년 동안 사귀었어요', cz: 'Chodili jsme spolu rok' },
            { kr: '헤어진 후에 슬펐어요', cz: 'Po rozchodu jsem byl smutný' }
        ]
    },
    exercises: [
        'A. Překlad emocí: šťastný=기쁘다, smutný=슬프다, naštvaný=화나다',
        'B. Překlad fyzických pocitů: unavený=피곤하다, hladový=배고프다',
        'C. Věty: Jsem šťastný = 기뻐요, Mám starost = 걱정돼요',
        'D. -기 전에: Před spaním = 자기 전에, Před jídlem = 먹기 전에'
    ],
    tasks: [
        'Hodina 1-4: Opakování emocí (20 slov)',
        'Hodina 5-7: Nová slovíčka - vztahy',
        'Hodina 8-9: Gramatika test',
        'Hodina 10-11: Konverzace o vztazích',
        'Hodina 12: Pasivní poslech'
    ],
    isWeekend: true,
    isTest: true
};

// ============ DEN 107 - PO 18.5.2026 ============
const day107: KoreanDayData = {
    day: 107,
    date: 'PO 18.5.2026',
    title: '💕 Vztahy 2 + Gramatika',
    vocab: [
        { kr: '이혼', cz: 'rozvod' },
        { kr: '사랑하다', cz: 'milovat' },
        { kr: '좋아하다', cz: 'mít rád' },
        { kr: '싫어하다', cz: 'nemít rád' },
        { kr: '미워하다', cz: 'nenávidět' },
        { kr: '벽', cz: 'zeď' },
        { kr: '바닥', cz: 'podlaha' },
        { kr: '천장', cz: 'strop' }
    ],
    grammar: {
        title: '-(으)ㄴ 후에 - po tom co',
        explanation: `Částice -(으)ㄴ 후에 vyjadřuje "po tom, co".

TVAR:
• Po samohlásce: -ㄴ 후에
• Po souhlásce: -은 후에

PŘÍKLADY:
먹다 → 먹은 후에 (po jídle)
만나다 → 만난 후에 (po setkání)
결혼하다 → 결혼한 후에 (po svatbě)

SROVNÁNÍ:
-기 전에 = PŘED tím, než
-(으)ㄴ 후에 = PO tom, co

만나기 전에 = před setkáním
만난 후에 = po setkání`,
        examples: [
            { kr: '밥을 먹은 후에 커피를 마셔요', cz: 'Po jídle piju kávu' },
            { kr: '일이 끝난 후에 연락할게요', cz: 'Ozvu se po práci' },
            { kr: '결혼한 후에 행복해요', cz: 'Po svatbě jsem šťastný' },
            { kr: '헤어진 후에 많이 울었어요', cz: 'Po rozchodu jsem hodně plakal' },
            { kr: '만난 후에 사랑에 빠졌어요', cz: 'Po setkání jsem se zamiloval' }
        ]
    },
    tasks: [
        'Napiš 8 slovíček o vztazích 3×',
        'Vytvoř 5 vět s -(으)ㄴ 후에',
        'Srovnej -기 전에 vs -(으)ㄴ 후에',
        'Přidej do Anki'
    ],
    exercises: [
        '만나다 + (으)ㄴ 후에 → 만난 후에',
        '결혼하다 + (으)ㄴ 후에 → 결혼한 후에',
        '먹다 + (으)ㄴ 후에 → 먹은 후에',
        '헤어지다 + (으)ㄴ 후에 → 헤어진 후에',
        '사귀다 + (으)ㄴ 후에 → 사귄 후에'
    ],
    notes: [
        '사랑하다 vs 좋아하다: 사랑하다 = silnější (milovat), 좋아하다 = mít rád',
        '싫어하다 vs 미워하다: 싫어하다 = nemít rád, 미워하다 = nenávidět (silnější)',
        'STAVBA: 벽, 바닥, 천장 - základní části místnosti'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 108 - ÚT 19.5.2026 ============
const day108: KoreanDayData = {
    day: 108,
    date: 'ÚT 19.5.2026',
    title: '💬 Komunikace 1',
    vocab: [
        { kr: '말', cz: 'slovo/řeč' },
        { kr: '대화', cz: 'rozhovor' },
        { kr: '이야기', cz: 'příběh' },
        { kr: '설명', cz: 'vysvětlení' },
        { kr: '질문', cz: 'otázka' },
        { kr: '대답', cz: 'odpověď' },
        { kr: '지붕', cz: 'střecha' },
        { kr: '창문', cz: 'okno' }
    ],
    grammar: {
        title: 'Komunikační fráze',
        explanation: `ZÁKLADNÍ KOMUNIKAČNÍ FRÁZE:

ZEPTAT SE:
질문이 있어요 = Mám otázku
질문해도 돼요? = Můžu se zeptat?

ODPOVĚDĚT:
대답할게요 = Odpovím
대답을 못 해요 = Nemůžu odpovědět

VYSVĚTLIT:
설명해 주세요 = Prosím, vysvětlete
다시 설명해 주세요 = Prosím, vysvětlete znovu

PŘÍBĚH:
이야기해 주세요 = Řekněte mi (příběh)
무슨 이야기예요? = O čem to je?`,
        examples: [
            { kr: '질문이 있어요', cz: 'Mám otázku' },
            { kr: '다시 설명해 주세요', cz: 'Prosím, vysvětlete znovu' },
            { kr: '대화하고 싶어요', cz: 'Chci si promluvit' },
            { kr: '이야기를 들었어요', cz: 'Slyšel jsem ten příběh' },
            { kr: '말이 너무 빨라요', cz: 'Mluvíte příliš rychle' }
        ]
    },
    tasks: [
        'Napiš 8 komunikačních slovíček 3×',
        'Vytvoř 5 konverzačních vět',
        'Procvič žádání o vysvětlení',
        'Přidej do Anki'
    ],
    exercises: [
        '질문___ 있어요 (이/가) → 이',
        '대답___ 하다 (을/를) → 을',
        '이야기___ 듣다 (를/을) → 를',
        '설명___ 주다 (해/을) → 해'
    ],
    notes: [
        '말 = obecně slovo/řeč, 단어 = konkrétní slovíčko',
        '대화 = formální rozhovor, 이야기 = příběh nebo neformální povídání',
        'STAVBA: 지붕, 창문 - vnější části domu'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 109 - ST 20.5.2026 ============
const day109: KoreanDayData = {
    day: 109,
    date: 'ST 20.5.2026',
    title: '💭 Komunikace 2 - Názory',
    vocab: [
        { kr: '의견', cz: 'názor' },
        { kr: '생각', cz: 'myšlenka' },
        { kr: '느낌', cz: 'pocit' },
        { kr: '표현', cz: 'vyjádření' },
        { kr: '동의하다', cz: 'souhlasit' },
        { kr: '문', cz: 'dveře' },
        { kr: '기둥', cz: 'sloup' },
        { kr: '보', cz: 'trám' }
    ],
    grammar: {
        title: 'Vyjádření názoru',
        explanation: `JAK VYJÁDŘIT NÁZOR:

FORMÁLNĚ:
제 생각에는... = Podle mě...
제 의견으로는... = Podle mého názoru...

NEFORMÁLNĚ:
내 생각에... = Myslím, že...
나는 ~라고 생각해요 = Myslím, že ~

SOUHLASIT:
동의해요 = Souhlasím
저도 그렇게 생각해요 = Já si také myslím

NESOUHLASIT:
동의하지 않아요 = Nesouhlasím
저는 다르게 생각해요 = Já si myslím jinak`,
        examples: [
            { kr: '제 생각에는 좋은 것 같아요', cz: 'Podle mě je to dobré' },
            { kr: '동의해요', cz: 'Souhlasím' },
            { kr: '저는 다르게 생각해요', cz: 'Já si myslím jinak' },
            { kr: '어떻게 생각해요?', cz: 'Co si myslíte?' },
            { kr: '느낌이 어때요?', cz: 'Jaký z toho máš pocit?' }
        ]
    },
    tasks: [
        'Napiš 8 slovíček 3×',
        'Vytvoř 5 vět vyjadřující názor',
        'Procvič souhlas a nesouhlas',
        'Přidej do Anki'
    ],
    exercises: [
        '제 생각___ (에/에는) → 에는',
        '의견___ 말하다 (을/를) → 을',
        '동의하다 → Souhlasím = 동의해요',
        '생각하다 → Myslím = 생각해요'
    ],
    notes: [
        '생각 = myšlenka, 생각하다 = myslet',
        '느낌 = pocit (intuice), 감정 = emoce',
        'STAVBA: 기둥 = nosný sloup, 보 = nosný trám'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 110 - ČT 21.5.2026 ============
const day110: KoreanDayData = {
    day: 110,
    date: 'ČT 21.5.2026',
    title: '🗣️ Komunikace 3 - Porozumění',
    vocab: [
        { kr: '반대하다', cz: 'nesouhlasit' },
        { kr: '이해하다', cz: 'rozumět' },
        { kr: '모르다', cz: 'nevědět' },
        { kr: '알다', cz: 'vědět' },
        { kr: '배관', cz: 'potrubí' },
        { kr: '전선', cz: 'kabel' },
        { kr: '스위치', cz: 'vypínač' },
        { kr: '콘센트', cz: 'zásuvka' }
    ],
    grammar: {
        title: 'Porozumění a neporozumění',
        explanation: `ROZUMÍM/NEROZUMÍM:

ROZUMÍM:
이해해요 = Rozumím
알겠어요 = Rozumím (po vysvětlení)
알아요 = Vím

NEROZUMÍM:
이해를 못 해요 = Nerozumím
모르겠어요 = Nevím/Nechápu
잘 모르겠어요 = Moc nechápu

ŽÁDOST O VYSVĚTLENÍ:
다시 말해 주세요 = Řekněte to znovu
천천히 말해 주세요 = Mluvte pomalu`,
        examples: [
            { kr: '이해해요', cz: 'Rozumím' },
            { kr: '잘 모르겠어요', cz: 'Moc nechápu' },
            { kr: '다시 말해 주세요', cz: 'Řekněte to znovu' },
            { kr: '반대 의견이 있어요', cz: 'Mám opačný názor' },
            { kr: '이해하기 어려워요', cz: 'Je těžké tomu rozumět' }
        ]
    },
    tasks: [
        'Napiš 8 slovíček 3×',
        'Vytvoř 5 vět o porozumění',
        'Procvič žádost o opakování',
        'Přidej do Anki'
    ],
    exercises: [
        '이해하다 → Rozumím = 이해해요',
        '모르다 → Nevím = 몰라요',
        '알다 → Vím = 알아요',
        '반대하다 → Nesouhlasím = 반대해요'
    ],
    notes: [
        '알다 vs 이해하다: 알다 = znát/vědět, 이해하다 = chápat/rozumět',
        '모르다 vs 이해 못 하다: 모르다 = nevědět, 이해 못 하다 = nechápat',
        'STAVBA: 배관, 전선, 스위치, 콘센트 - elektrika a instalace'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 111 - PÁ 22.5.2026 ============
const day111: KoreanDayData = {
    day: 111,
    date: 'PÁ 22.5.2026',
    title: '🎨 Hobby 1 + Kombinace časových výrazů',
    vocab: [
        { kr: '취미', cz: 'hobby' },
        { kr: '운동', cz: 'sport' },
        { kr: '음악', cz: 'hudba' },
        { kr: '영화', cz: 'film' },
        { kr: '독서', cz: 'čtení' },
        { kr: '조명', cz: 'osvětlení' },
        { kr: '난방', cz: 'topení' },
        { kr: '에어컨', cz: 'klimatizace' }
    ],
    grammar: {
        title: 'Kombinace časových výrazů',
        explanation: `ČASOVÉ VÝRAZY - KOMBINACE:

PŘED:
-기 전에 = před tím, než
운동하기 전에 = před cvičením

PO:
-(으)ㄴ 후에 = po tom, co
운동한 후에 = po cvičení

BĚHEM:
동안 = během
운동하는 동안 = během cvičení

KDYŽ:
때 = když/v době
운동할 때 = když cvičím

UPROSTŘED:
중에 = uprostřed/během
운동 중에 = během cvičení (právě teď)`,
        examples: [
            { kr: '운동하기 전에 스트레칭을 해요', cz: 'Před cvičením se protáhnu' },
            { kr: '운동한 후에 샤워해요', cz: 'Po cvičení se osprchuji' },
            { kr: '운동하는 동안 음악을 들어요', cz: 'Během cvičení poslouchám hudbu' },
            { kr: '운동할 때 물을 마셔요', cz: 'Když cvičím, piju vodu' },
            { kr: '영화 보는 중에 전화하지 마세요', cz: 'Nevolejte během filmu' }
        ]
    },
    tasks: [
        'Napiš 8 slovíček o hobby 3×',
        'Vytvoř věty se všemi časovými výrazy',
        'Procvič kombinace: 전에, 후에, 동안, 때, 중에',
        'Přidej do Anki'
    ],
    exercises: [
        '영화를 보다 + 기 전에 → 영화를 보기 전에',
        '영화를 보다 + (으)ㄴ 후에 → 영화를 본 후에',
        '운동하다 + 는 동안 → 운동하는 동안',
        '독서하다 + 때 → 독서할 때'
    ],
    notes: [
        '동안 vs 중에: 동안 = po celou dobu, 중에 = právě uprostřed',
        '취미 = hobby (obecně), 운동 = sport/cvičení',
        'STAVBA: 조명, 난방, 에어컨 - technické vybavení'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 112 - SO 23.5.2026 ============
const day112: KoreanDayData = {
    day: 112,
    date: 'SO 23.5.2026',
    title: '⭐ SOBOTNÍ MARATON - Hobby 2 (8 hodin)',
    vocab: [
        { kr: '요리', cz: 'vaření' },
        { kr: '여행', cz: 'cestování' },
        { kr: '사진', cz: 'fotografie' },
        { kr: '게임', cz: 'hry' },
        { kr: '등산', cz: 'turistika' },
        { kr: '수영', cz: 'plavání' },
        { kr: '달리기', cz: 'běh' },
        { kr: '자전거', cz: 'kolo' },
        { kr: '축구', cz: 'fotbal' },
        { kr: '농구', cz: 'basketbal' }
    ],
    grammar: {
        title: 'Mluvení o hobby',
        explanation: `JAK SE PTÁT NA HOBBY:

취미가 뭐예요? = Jaké máte hobby?
뭘 좋아해요? = Co máte rádi?
주말에 뭐 해요? = Co děláte o víkendu?

JAK ODPOVĚDĚT:
제 취미는 ~이에요/예요 = Moje hobby je ~
~(으)ㄹ 때 좋아요 = Mám rád, když ~
~는 것을 좋아해요 = Rád dělám ~

PŘÍKLADY:
제 취미는 등산이에요 = Moje hobby je turistika
사진 찍는 것을 좋아해요 = Rád fotím`,
        examples: [
            { kr: '취미가 뭐예요?', cz: 'Jaké máte hobby?' },
            { kr: '제 취미는 요리예요', cz: 'Moje hobby je vaření' },
            { kr: '주말에 등산해요', cz: 'O víkendu chodím na hory' },
            { kr: '수영하는 것을 좋아해요', cz: 'Rád plavu' },
            { kr: '자전거 타기 전에 헬멧을 써요', cz: 'Před jízdou na kole si nasadím helmu' }
        ]
    },
    tasks: [
        'Hodina 1-2: Slovíčka hobby - 15 slov',
        'Hodina 3-4: Časové výrazy - kombinace',
        'Hodina 5: Psaní o svých hobby',
        'Hodina 6-7: Konverzace o volném čase',
        'Hodina 8: Pasivní poslech'
    ],
    notes: [
        '등산 = chodit do hor (populární v Koreji)',
        '자전거를 타다 = jezdit na kole (타다 = jet na něčem)',
        'Korejci: 한강 (řeka Han) je oblíbené místo pro běh a kolo'
    ],
    isWeekend: true,
    isTest: false
};

// ============ DEN 113 - NE 24.5.2026 ============
const day113: KoreanDayData = {
    day: 113,
    date: 'NE 24.5.2026',
    title: '🔄 NEDĚLNÍ MEGA OPAKOVÁNÍ + TEST',
    vocab: [],
    grammar: {
        title: 'TEST TÝDNE - Komunikace a Hobby',
        explanation: `SHRNUTÍ GRAMATIKY TÝDNE:

ČASOVÉ VÝRAZY:
1. -기 전에 = před tím, než
2. -(으)ㄴ 후에 = po tom, co
3. 동안 = během
4. 때 = když
5. 중에 = uprostřed

KOMUNIKACE:
• 질문/대답 = otázka/odpověď
• 동의하다/반대하다 = souhlasit/nesouhlasit
• 이해하다/모르다 = rozumět/nevědět

HOBBY:
• 취미가 뭐예요? = Jaké máte hobby?
• ~는 것을 좋아해요 = Rád dělám ~`,
        examples: [
            { kr: '운동하기 전에 스트레칭해요', cz: 'Před cvičením se protáhnu' },
            { kr: '밥을 먹은 후에 쉬어요', cz: 'Po jídle odpočívám' },
            { kr: '공부하는 동안 음악을 들어요', cz: 'Během studia poslouchám hudbu' },
            { kr: '취미가 뭐예요?', cz: 'Jaké máte hobby?' },
            { kr: '제 취미는 독서예요', cz: 'Moje hobby je čtení' }
        ]
    },
    exercises: [
        'A. Časové výrazy: před jídlem=먹기 전에, po jídle=먹은 후에',
        'B. Komunikace: otázka=질문, odpověď=대답, souhlasím=동의해요',
        'C. Hobby: čtení=독서, vaření=요리, cestování=여행',
        'D. Věty: Rád fotím = 사진 찍는 것을 좋아해요'
    ],
    tasks: [
        'Hodina 1-4: Opakování komunikace',
        'Hodina 5-7: Opakování hobby',
        'Hodina 8-9: Gramatika test',
        'Hodina 10-11: Konverzace',
        'Hodina 12: Pasivní poslech'
    ],
    isWeekend: true,
    isTest: true
};

// ============ DEN 114 - PO 25.5.2026 ============
const day114: KoreanDayData = {
    day: 114,
    date: 'PO 25.5.2026',
    title: '⚽ Sport 1',
    vocab: [
        { kr: '헬스', cz: 'fitness' },
        { kr: '요가', cz: 'jóga' },
        { kr: '테니스', cz: 'tenis' },
        { kr: '골프', cz: 'golf' },
        { kr: '야구', cz: 'baseball' },
        { kr: '배구', cz: 'volejbal' },
        { kr: '탁구', cz: 'stolní tenis' },
        { kr: '스키', cz: 'lyžování' }
    ],
    grammar: {
        title: 'Sportovní slovesa',
        explanation: `SPORTOVNÍ SLOVESA:

S 하다 (dělat):
운동하다 = cvičit
요가하다 = dělat jógu
헬스하다 = cvičit ve fitku

S 치다 (hrát - s raketou/pálkou):
테니스 치다 = hrát tenis
골프 치다 = hrát golf
탁구 치다 = hrát stolní tenis

S 타다 (jet na):
스키 타다 = lyžovat
자전거 타다 = jezdit na kole

S 하다 (hrát - týmové sporty):
축구하다 = hrát fotbal
농구하다 = hrát basketbal`,
        examples: [
            { kr: '헬스장에서 운동해요', cz: 'Cvičím ve fitku' },
            { kr: '테니스를 잘 쳐요', cz: 'Dobře hraji tenis' },
            { kr: '겨울에 스키를 타요', cz: 'V zimě lyžuji' },
            { kr: '친구와 축구해요', cz: 'S kamarádem hraji fotbal' },
            { kr: '요가하는 것을 좋아해요', cz: 'Rád dělám jógu' }
        ]
    },
    tasks: [
        'Napiš 8 sportů 3×',
        'Procvič slovesa: 하다, 치다, 타다',
        'Popiš jaké sporty děláš',
        'Přidej do Anki'
    ],
    exercises: [
        '테니스 + sloveso → 테니스를 치다',
        '축구 + sloveso → 축구를 하다',
        '스키 + sloveso → 스키를 타다',
        '요가 + sloveso → 요가를 하다'
    ],
    notes: [
        '헬스 = fitness (z angl. health)',
        '치다 se používá pro sporty s raketou nebo pálkou',
        'V Koreji: baseball (야구) je nejpopulárnější sport'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 115 - ÚT 26.5.2026 ============
const day115: KoreanDayData = {
    day: 115,
    date: 'ÚT 26.5.2026',
    title: '🏂 Sport 2',
    vocab: [
        { kr: '스노보드', cz: 'snowboard' },
        { kr: '서핑', cz: 'surfování' },
        { kr: '쉬다', cz: 'odpočívat' },
        { kr: '놀다', cz: 'hrát si' },
        { kr: '즐기다', cz: 'užívat si' },
        { kr: '시간 보내다', cz: 'trávit čas' },
        { kr: '휴식', cz: 'odpočinek' },
        { kr: '주말', cz: 'víkend' }
    ],
    grammar: {
        title: 'Trávení volného času',
        explanation: `JAK MLUVIT O VOLNÉM ČASE:

OTÁZKY:
주말에 뭐 해요? = Co děláte o víkendu?
시간이 있으면 뭐 해요? = Co děláš, když máš čas?
어떻게 쉬어요? = Jak odpočíváš?

ODPOVĚDI:
집에서 쉬어요 = Odpočívám doma
친구와 놀아요 = Bavím se s kamarády
운동을 즐겨요 = Rád sportuji

S ČASOVÝMI VÝRAZY:
운동하기 전에 쉬어요 = Před cvičením odpočívám
운동한 후에 샤워해요 = Po cvičení se osprchuji`,
        examples: [
            { kr: '주말에 뭐 해요?', cz: 'Co děláte o víkendu?' },
            { kr: '집에서 쉬어요', cz: 'Odpočívám doma' },
            { kr: '친구와 놀아요', cz: 'Bavím se s kamarády' },
            { kr: '시간을 어떻게 보내요?', cz: 'Jak trávíte čas?' },
            { kr: '스노보드 타는 것을 즐겨요', cz: 'Rád jezdím na snowboardu' }
        ]
    },
    tasks: [
        'Napiš 8 slovíček 3×',
        'Popiš svůj víkend korejsky',
        'Vytvoř 5 vět o volném čase',
        'Přidej do Anki'
    ],
    exercises: [
        '쉬다 → Odpočívám = 쉬어요',
        '놀다 → Bavím se = 놀아요',
        '즐기다 → Užívám si = 즐겨요',
        '시간을 보내다 → Trávím čas = 시간을 보내요'
    ],
    notes: [
        '쉬다 = odpočívat (fyzicky), 놀다 = bavit se/hrát si',
        '즐기다 = užívat si něco (+ 을/를)',
        '시간을 보내다 = trávit čas (doslovně "posílat čas")'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 116 - ST 27.5.2026 ============
const day116: KoreanDayData = {
    day: 116,
    date: 'ST 27.5.2026',
    title: '🏖️ Volný čas',
    vocab: [
        { kr: '연휴', cz: 'prázdniny' },
        { kr: '방학', cz: 'prázdniny (škola)' },
        { kr: '휴가', cz: 'dovolená' },
        { kr: '여가', cz: 'volný čas' },
        { kr: '취미 생활', cz: 'koníčky' },
        { kr: '문화 생활', cz: 'kulturní aktivity' },
        { kr: '야외 활동', cz: 'venkovní aktivity' },
        { kr: '실내 활동', cz: 'vnitřní aktivity' }
    ],
    grammar: {
        title: 'Prázdniny a dovolená',
        explanation: `ROZDÍLY:

연휴 = státní svátky/prázdniny
방학 = školní prázdniny
휴가 = dovolená (z práce)
여가 = volný čas (obecně)

FRÁZE:
연휴에 뭐 해요? = Co děláte o svátcích?
휴가를 내다 = vzít si dovolenou
여가 시간에 = ve volném čase

S ČASOVÝMI VÝRAZY:
휴가 전에 일을 끝내야 해요
= Před dovolenou musím dokončit práci

휴가 후에 다시 연락할게요
= Po dovolené se znovu ozvu`,
        examples: [
            { kr: '연휴에 가족을 만나요', cz: 'O svátcích se setkám s rodinou' },
            { kr: '방학 동안 여행해요', cz: 'Během prázdnin cestuji' },
            { kr: '휴가를 내고 싶어요', cz: 'Chci si vzít dovolenou' },
            { kr: '여가 시간에 책을 읽어요', cz: 'Ve volném čase čtu' },
            { kr: '야외 활동을 좋아해요', cz: 'Mám rád venkovní aktivity' }
        ]
    },
    tasks: [
        'Napiš 8 slovíček 3×',
        'Popiš své plány na dovolenou',
        'Srovnej 연휴, 방학, 휴가',
        'Přidej do Anki'
    ],
    exercises: [
        '연휴___ 뭐 해요? (에/를) → 에',
        '휴가___ 내다 (를/을) → 를',
        '방학 ___ 여행해요 (동안/전에) → 동안',
        '여가 시간___ 뭐 해요? (에/을) → 에'
    ],
    notes: [
        '추석 (추석연휴) = Korejské díkůvzdání (září)',
        '설날 (설연휴) = Korejský Nový rok (únor)',
        'Korejci mají málo dovolené - 휴가 je vzácný'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 117 - ČT 28.5.2026 ============
const day117: KoreanDayData = {
    day: 117,
    date: 'ČT 28.5.2026',
    title: '📚 Opakování týdne',
    vocab: [
        { kr: '복습', cz: 'opakování' },
        { kr: '정리', cz: 'shrnutí' },
        { kr: '연습', cz: 'cvičení' },
        { kr: '준비', cz: 'příprava' }
    ],
    grammar: {
        title: 'Opakování gramatiky května',
        explanation: `GRAMATIKA KVĚTNA - KOMPLETNÍ:

Z DUBNA (opakování):
• -거나 = nebo
• -는데 = ale/a (kontext)
• -(으)ㄹ게요 = budu (slib)
• -아/어 주다 = udělat pro někoho
• -(으)면서 = zatímco

NOVÉ V KVĚTNU:
• -기 전에 = před tím, než
• -(으)ㄴ 후에 = po tom, co
• 동안 = během
• 때 = když
• 중에 = uprostřed`,
        examples: [
            { kr: '먹기 전에 손을 씻어요', cz: 'Před jídlem si myji ruce' },
            { kr: '먹은 후에 쉬어요', cz: 'Po jídle odpočívám' },
            { kr: '공부하는 동안 음악을 들어요', cz: 'Během studia poslouchám hudbu' },
            { kr: '운동할 때 물을 마셔요', cz: 'Když cvičím, piju vodu' },
            { kr: '회의 중에 전화하지 마세요', cz: 'Nevolejte během schůze' }
        ]
    },
    tasks: [
        'Opakuj všechna slovíčka týdne',
        'Procvič všechny časové výrazy',
        'Připrav se na víkendové opakování',
        'Anki marathon'
    ],
    focus: [
        'Emoce: 기쁘다, 슬프다, 화나다, 걱정되다',
        'Vztahy: 사랑하다, 좋아하다, 만나다, 헤어지다',
        'Komunikace: 질문, 대답, 동의하다, 이해하다',
        'Hobby: 취미, 운동, 독서, 여행',
        'Sport: 축구, 농구, 테니스, 수영'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 118 - PÁ 29.5.2026 ============
const day118: KoreanDayData = {
    day: 118,
    date: 'PÁ 29.5.2026',
    title: '📝 Příprava na měsíční test',
    vocab: [],
    grammar: {
        title: 'Shrnutí května - příprava na test',
        explanation: `KVĚTEN - KOMPLETNÍ PŘEHLED:

TÉMATA:
1. Emoce (기쁘다, 슬프다, 화나다...)
2. Vztahy (사랑하다, 만나다, 헤어지다...)
3. Komunikace (질문, 대답, 의견...)
4. Hobby (취미, 독서, 요리...)
5. Sport (축구, 테니스, 수영...)
6. Volný čas (휴가, 여가, 쉬다...)

GRAMATIKA:
• -기 전에 = před tím, než
• -(으)ㄴ 후에 = po tom, co
• 동안 = během
• 때 = když
• 중에 = uprostřed

STAVEBNÍ SLOVÍČKA:
벽, 바닥, 천장, 지붕, 창문, 문, 기둥, 보
배관, 전선, 스위치, 콘센트, 조명, 난방, 에어컨`,
        examples: [
            { kr: '한국에 가기 전에 한국어를 공부해요', cz: 'Před cestou do Koreje studuji korejsky' },
            { kr: '한국에 간 후에 더 잘 해요', cz: 'Po návštěvě Koreje mluvím lépe' },
            { kr: '여행하는 동안 많이 배웠어요', cz: 'Během cestování jsem se hodně naučil' }
        ]
    },
    tasks: [
        'Opakuj všechna slovíčka května',
        'Procvič všechny gramatické struktury',
        'Napiš 10 vět kombinující gramatiku',
        'Připrav se na zítřejší opakování'
    ],
    focus: [
        'Slovíčka: 115 slov (emoce, vztahy, komunikace, hobby, sport)',
        'Gramatika: -기 전에, -(으)ㄴ 후에, 동안, 때, 중에',
        'Stavba: 15 stavebních termínů'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 119 - SO 30.5.2026 ============
const day119: KoreanDayData = {
    day: 119,
    date: 'SO 30.5.2026',
    title: '⭐ SOBOTNÍ MARATON - Závěrečné opakování',
    vocab: [],
    grammar: {
        title: 'Měsíční opakování - KVĚTEN',
        explanation: `8 HODINOVÝ MARATON - OPAKOVÁNÍ KVĚTNA

HODINA 1-2: EMOCE (20 slov)
기쁘다, 슬프다, 화나다, 무섭다, 걱정되다
기대되다, 실망하다, 놀라다, 부끄럽다, 창피하다
외롭다, 지루하다, 심심하다, 피곤하다, 졸리다
배고프다, 목마르다, 아프다, 편하다, 불편하다

HODINA 3-4: VZTAHY + KOMUNIKACE (30 slov)
관계, 사이, 친하다, 가깝다, 멀다
만나다, 헤어지다, 사귀다, 연애, 결혼
이혼, 사랑하다, 좋아하다, 싫어하다, 미워하다
말, 대화, 이야기, 설명, 질문
대답, 의견, 생각, 느낌, 표현
동의하다, 반대하다, 이해하다, 모르다, 알다

HODINA 5-6: HOBBY + SPORT (30 slov)
취미, 운동, 음악, 영화, 독서
요리, 여행, 사진, 게임, 등산
수영, 달리기, 자전거, 축구, 농구
헬스, 요가, 테니스, 골프, 야구
배구, 탁구, 스키, 스노보드, 서핑

HODINA 7: VOLNÝ ČAS (10 slov)
쉬다, 놀다, 즐기다, 시간 보내다, 휴식
주말, 연휴, 방학, 휴가, 여가

HODINA 8: GRAMATIKA
-기 전에, -(으)ㄴ 후에, 동안, 때, 중에`,
        examples: []
    },
    tasks: [
        'Hodina 1-2: Emoce - 20 slov',
        'Hodina 3-4: Vztahy + Komunikace - 30 slov',
        'Hodina 5-6: Hobby + Sport - 30 slov',
        'Hodina 7: Volný čas - 10 slov',
        'Hodina 8: Gramatika opakování'
    ],
    notes: [
        'STAVBA: 벽, 바닥, 천장, 지붕, 창문, 문',
        'STAVBA: 기둥, 보, 배관, 전선',
        'STAVBA: 스위치, 콘센트, 조명, 난방, 에어컨'
    ],
    isWeekend: true,
    isTest: false
};

// ============ DEN 120 - NE 31.5.2026 ============
const day120: KoreanDayData = {
    day: 120,
    date: 'NE 31.5.2026',
    title: '🏆 MĚSÍČNÍ TEST KVĚTNA - ÚROVEŇ A2+',
    vocab: [],
    grammar: {
        title: 'MĚSÍČNÍ TEST KVĚTNA',
        explanation: `Čas: 3 hodiny
Celkem: 100 bodů

ČÁST A: SLOVÍČKA (30 bodů)
60 slovíček - 30 KR→CZ, 30 CZ→KR

ČÁST B: GRAMATIKA (40 bodů)
1. -거나 (nebo)
2. -는데 (ale/a - kontext)
3. -(으)ㄹ게요 (budu - slib)
4. -아/어 주다 (udělat pro někoho)
5. -(으)면서 (zatímco)
6. -기 전에 (před tím než)
7. -(으)ㄴ 후에 (po tom co)
+ 동안, 때, 중에

ČÁST C: PŘEKLAD VĚT (30 bodů)`,
        examples: []
    },
    exercises: [
        '═══════════════════════════════════════',
        'ČÁST A: SLOVÍČKA (30 bodů)',
        '═══════════════════════════════════════',
        '',
        'KR → CZ (15 bodů):',
        '1. 기쁘다 = ___',
        '2. 슬프다 = ___',
        '3. 화나다 = ___',
        '4. 걱정되다 = ___',
        '5. 피곤하다 = ___',
        '6. 관계 = ___',
        '7. 사랑하다 = ___',
        '8. 헤어지다 = ___',
        '9. 질문 = ___',
        '10. 대답 = ___',
        '11. 취미 = ___',
        '12. 운동 = ___',
        '13. 축구 = ___',
        '14. 휴가 = ___',
        '15. 벽 = ___',
        '16. 천장 = ___',
        '17. 창문 = ___',
        '18. 스위치 = ___',
        '19. 난방 = ___',
        '20. 에어컨 = ___',
        '',
        'CZ → KR (15 bodů):',
        '21. smutný = ___',
        '22. překvapený = ___',
        '23. hladový = ___',
        '24. osamělý = ___',
        '25. manželství = ___',
        '26. milovat = ___',
        '27. názor = ___',
        '28. rozumět = ___',
        '29. čtení = ___',
        '30. basketbal = ___',
        '31. plavání = ___',
        '32. víkend = ___',
        '33. podlaha = ___',
        '34. střecha = ___',
        '35. dveře = ___',
        '36. kabel = ___',
        '37. zásuvka = ___',
        '38. osvětlení = ___',
        '39. potrubí = ___',
        '40. sloup = ___',
        '',
        '═══════════════════════════════════════',
        'ČÁST B: GRAMATIKA (40 bodů)',
        '═══════════════════════════════════════',
        '',
        'B1. Doplň správnou gramatiku (20 bodů):',
        '',
        '1. 커피___ 차___ 마셔요 (nebo) → -거나',
        '2. 시간이 없___ 도와주세요 (ale/kontext) → -는데',
        '3. 내일 전화할___ (slib) → -(으)ㄹ게요',
        '4. 설명해 ___ (pro mě) → 주세요',
        '5. 음악을 들___ 공부해요 (zatímco) → -(으)면서',
        '6. 먹___ 전에 손을 씻어요 (před) → -기',
        '7. 먹___ 후에 쉬어요 (po) → -(으)ㄴ',
        '8. 일주일 ___ 여행했어요 (během) → 동안',
        '9. 운동할 ___ 물을 마셔요 (když) → 때',
        '10. 회의 ___ 전화하지 마세요 (uprostřed) → 중에',
        '',
        'B2. Přetvoř slovesa (10 bodů):',
        '',
        '1. 가다 + 거나 = ___',
        '2. 바쁘다 + 는데 = ___',
        '3. 하다 + (으)ㄹ게요 = ___',
        '4. 도와주다 + 아/어 주다 = ___',
        '5. 먹다 + (으)면서 = ___',
        '6. 자다 + 기 전에 = ___',
        '7. 끝나다 + (으)ㄴ 후에 = ___',
        '8. 공부하다 + 는 동안 = ___',
        '9. 운동하다 + 때 = ___',
        '10. 이야기하다 + 중에 = ___',
        '',
        'B3. Opakování z dubna (10 bodů):',
        '',
        '1. -아서/어서: 피곤하다 → ___',
        '2. -(으)면: 시간이 있다 → ___',
        '3. -지만: 어렵다 → ___',
        '4. -(으)ㄹ 수 있다: 하다 → ___',
        '5. -고: 먹다 → ___',
        '',
        '═══════════════════════════════════════',
        'ČÁST C: PŘEKLAD VĚT (30 bodů)',
        '═══════════════════════════════════════',
        '',
        '1. Piju kávu nebo čaj. = ___',
        '2. Nemám čas, ale pomohu ti. = ___',
        '3. Zítra zavolám. = ___',
        '4. Prosím, vysvětlete mi to. = ___',
        '5. Poslouchám hudbu a učím se. = ___',
        '6. Před spaním čtu. = ___',
        '7. Po jídle odpočívám. = ___',
        '8. Během cestování jsem se hodně naučil. = ___',
        '9. Když cvičím, piju vodu. = ___',
        '10. Nevolejte během schůze. = ___',
        '11. Jsem šťastný. = ___',
        '12. Mám starost. = ___',
        '13. Jaké máte hobby? = ___',
        '14. Rád plavu. = ___',
        '15. Co děláte o víkendu? = ___'
    ],
    notes: [
        '═══════════════════════════════════════',
        'ODPOVĚDI',
        '═══════════════════════════════════════',
        '',
        'ČÁST A - KR → CZ:',
        '1. šťastný, 2. smutný, 3. naštvaný, 4. mít starost, 5. unavený',
        '6. vztah, 7. milovat, 8. rozejít se, 9. otázka, 10. odpověď',
        '11. hobby, 12. sport, 13. fotbal, 14. dovolená, 15. zeď',
        '16. strop, 17. okno, 18. vypínač, 19. topení, 20. klimatizace',
        '',
        'ČÁST A - CZ → KR:',
        '21. 슬프다, 22. 놀라다, 23. 배고프다, 24. 외롭다, 25. 결혼',
        '26. 사랑하다, 27. 의견, 28. 이해하다, 29. 독서, 30. 농구',
        '31. 수영, 32. 주말, 33. 바닥, 34. 지붕, 35. 문',
        '36. 전선, 37. 콘센트, 38. 조명, 39. 배관, 40. 기둥',
        '',
        'ČÁST B1:',
        '1. 커피거나 차를 마셔요, 2. 없는데, 3. 할게요, 4. 주세요',
        '5. 들으면서, 6. 먹기, 7. 먹은, 8. 동안, 9. 때, 10. 중에',
        '',
        'ČÁST B2:',
        '1. 가거나, 2. 바쁜데, 3. 할게요, 4. 도와줘요',
        '5. 먹으면서, 6. 자기 전에, 7. 끝난 후에',
        '8. 공부하는 동안, 9. 운동할 때, 10. 이야기하는 중에',
        '',
        'ČÁST B3:',
        '1. 피곤해서, 2. 시간이 있으면, 3. 어렵지만',
        '4. 할 수 있어요, 5. 먹고',
        '',
        'ČÁST C:',
        '1. 커피나 차를 마셔요 / 커피를 마시거나 차를 마셔요',
        '2. 시간이 없는데 도와줄게요',
        '3. 내일 전화할게요',
        '4. 설명해 주세요',
        '5. 음악을 들으면서 공부해요',
        '6. 자기 전에 책을 읽어요',
        '7. 밥을 먹은 후에 쉬어요',
        '8. 여행하는 동안 많이 배웠어요',
        '9. 운동할 때 물을 마셔요',
        '10. 회의 중에 전화하지 마세요',
        '11. 기뻐요',
        '12. 걱정돼요',
        '13. 취미가 뭐예요?',
        '14. 수영하는 것을 좋아해요 / 수영을 좋아해요',
        '15. 주말에 뭐 해요?',
        '',
        '═══════════════════════════════════════',
        '화이팅! Květen dokončen!',
        'Připrav se na ČERVEN - Stavba pokračuje! 🏗️',
        '═══════════════════════════════════════'
    ],
    isWeekend: true,
    isTest: true
};

// Export all days
export const mayDays104to120: KoreanDayData[] = [
    day104, day105, day106, day107, day108, day109, day110,
    day111, day112, day113, day114, day115, day116, day117,
    day118, day119, day120
];

export default mayDays104to120;
