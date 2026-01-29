/**
 * May 2026 - Days 90-103 (Week 1-2)
 * Agent 4A output
 * 
 * Student se právě vrátil z Koreje - první týden obsahuje zpracování zážitků.
 * KLÍČOVÉ: Pouze 한국어 + Česky, žádná romanizace, žádná angličtina.
 */

import type { KoreanDayData } from '../types/study-db';

// ============================================================================
// DEN 90 - PÁ 1.5.2026 - Svátek práce - Zpracování cesty
// ============================================================================
const day90: KoreanDayData = {
    day: 90,
    date: 'PÁ 1.5.2026',
    title: '🎉 Svátek práce - Zpracování cesty z Koreje',
    vocab: [
        { kr: '경험', cz: 'zkušenost' },
        { kr: '추억', cz: 'vzpomínka' },
        { kr: '사진', cz: 'fotka' },
        { kr: '선물', cz: 'dárek' },
        { kr: '기념품', cz: 'suvenýr' }
    ],
    grammar: {
        title: 'Opakování cesty - žádná nová gramatika',
        explanation: `Dnes je svátek a volnější den po návratu z Koreje.

Úkoly na dnešek:
1. Projdi si deník z Koreje
2. Vypiš slova, která ti chyběla
3. Vytvoř Anki kartičky z nových slov
4. Popovídej si s přítelkyní o cestě

Reflexe cesty je klíčová - co fungovalo, co ne?`,
        examples: [
            { kr: '한국에서 뭐 했어요?', cz: 'Co jsi dělal v Koreji?' },
            { kr: '정말 재미있었어요', cz: 'Bylo to opravdu zábavné' },
            { kr: '좋은 경험이었어요', cz: 'Byla to dobrá zkušenost' },
            { kr: '추억이 많아요', cz: 'Mám hodně vzpomínek' }
        ]
    },
    tasks: [
        'Projdi deník z Koreje',
        'Vypiš 20 slov, která ti chyběla',
        'Vytvoř Anki kartičky',
        'Konverzace: Vyprávěj o cestě'
    ],
    exercises: [
        '한국 여행 어땠어요? - Jaká byla cesta do Koreje?',
        '가장 좋았던 곳이 어디예요? - Které místo se ti líbilo nejvíc?',
        '뭘 샀어요? - Co jsi koupil?'
    ],
    notes: [
        'Svátek práce - volnější tempo',
        'Zpracuj zážitky, než je zapomeneš',
        'Fotky = nejlepší způsob, jak si vzpomenout na slovíčka'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 91 - SO 2.5.2026 - SOBOTNÍ MARATON
// ============================================================================
const day91: KoreanDayData = {
    day: 91,
    date: 'SO 2.5.2026',
    title: '⭐ SOBOTNÍ MARATON - Zážitky z Koreje (8 hodin)',
    vocab: [
        { kr: '맛집', cz: 'dobrá restaurace' },
        { kr: '명소', cz: 'pamětihodnost' },
        { kr: '관광지', cz: 'turistická atrakce' },
        { kr: '감동', cz: 'dojmutí' },
        { kr: '인상', cz: 'dojem' },
        { kr: '문화', cz: 'kultura' },
        { kr: '풍경', cz: 'krajina' },
        { kr: '친절하다', cz: 'milý' },
        { kr: '재미있다', cz: 'zábavný' },
        { kr: '힘들다', cz: 'náročný' }
    ],
    grammar: {
        title: 'Popis zážitků - kombinace gramatik',
        explanation: `Dnes procvičujeme kombinaci gramatik pro popis zážitků:

-아서/어서 (protože): 맛있어서 많이 먹었어요
-(으)면 (pokud): 시간이 있으면 다시 갈 거예요
-지만 (ale): 힘들었지만 재미있었어요

Kombinuj tyto struktury pro bohatší popis.`,
        examples: [
            { kr: '한국 음식이 맛있어서 많이 먹었어요', cz: 'Protože korejské jídlo bylo chutné, hodně jsem jedl' },
            { kr: '사람들이 친절해서 좋았어요', cz: 'Protože lidé byli milí, bylo to fajn' },
            { kr: '힘들었지만 좋은 경험이었어요', cz: 'Bylo to náročné, ale byla to dobrá zkušenost' },
            { kr: '다시 가면 그 맛집에 갈 거예요', cz: 'Když půjdu znovu, půjdu do té restaurace' }
        ]
    },
    tasks: [
        'Hodina 1-2: Slovíčka z cesty - místa a zážitky',
        'Hodina 3-4: Popis dojmů - kombinace gramatik',
        'Hodina 5: Psaní o nejlepších místech',
        'Hodina 6-7: Konverzace o cestě s přítelkyní',
        'Hodina 8: Pasivní poslech - korejské video z míst, která jsi navštívil'
    ],
    exercises: [
        '한국에서 가장 인상적인 곳이 어디였어요?',
        '맛집에서 뭘 먹었어요?',
        '힘들었던 일이 있었어요?'
    ],
    isWeekend: true,
    isTest: false
};

// ============================================================================
// DEN 92 - NE 3.5.2026 - NEDĚLE + TEST
// ============================================================================
const day92: KoreanDayData = {
    day: 92,
    date: 'NE 3.5.2026',
    title: '📝 NEDĚLNÍ MEGA OPAKOVÁNÍ + TEST (12 hodin)',
    vocab: [
        // Stavební slovíčka - první část
        { kr: '출근하다', cz: 'jít do práce' },
        { kr: '퇴근하다', cz: 'odejít z práce' },
        { kr: '작업', cz: 'úkol' },
        { kr: '현장', cz: 'staveniště' },
        { kr: '공사', cz: 'stavba' },
        { kr: '작업복', cz: 'pracovní oděv' },
        { kr: '안전모', cz: 'helma' },
        { kr: '안전화', cz: 'bezpečnostní boty' }
    ],
    grammar: {
        title: 'TEST - Opakování zážitků z Koreje',
        explanation: `Test zaměřený na popis cesty:

ČÁST A: Slovíčka z cesty (20 bodů)
ČÁST B: Gramatika -아서/어서, -(으)면, -지만 (40 bodů)
ČÁST C: Popis nejlepšího zážitku (40 bodů)

Piš kompletní věty, kombinuj gramatiky.`,
        examples: [
            { kr: '경험 = ?', cz: 'zkušenost' },
            { kr: '맛집 = ?', cz: 'dobrá restaurace' },
            { kr: '친절해서 좋았어요', cz: 'Protože byli milí, bylo to fajn' },
            { kr: '힘들었지만 재미있었어요', cz: 'Bylo to náročné, ale zábavné' }
        ]
    },
    tasks: [
        'TEST: Slovíčka z cesty',
        'TEST: Gramatika z dubna',
        'TEST: Popis zážitku (psaní)',
        'Opakování stavebních slovíček pro práci'
    ],
    exercises: [
        'Napiš 5 vět o nejlepším místě v Koreji',
        'Popiš problém a jak jsi ho vyřešil',
        'Co bys udělal jinak příště?'
    ],
    isWeekend: true,
    isTest: true
};

// ============================================================================
// DEN 93 - PO 4.5.2026 - Práce obecně
// ============================================================================
const day93: KoreanDayData = {
    day: 93,
    date: 'PO 4.5.2026',
    title: 'Práce obecně',
    vocab: [
        { kr: '일', cz: 'práce' },
        { kr: '직장', cz: 'zaměstnání' },
        { kr: '직업', cz: 'povolání' },
        { kr: '월급', cz: 'plat' },
        { kr: '휴가', cz: 'dovolená' },
        { kr: '출근', cz: 'jít do práce' },
        { kr: '퇴근', cz: 'odejít z práce' },
        { kr: '야근', cz: 'přesčas' },
        { kr: '회의', cz: 'schůzka' },
        { kr: '프로젝트', cz: 'projekt' }
    ],
    grammar: {
        title: '-거나 - nebo (alternativy)',
        explanation: `Kmen + 거나 = nebo

Použití: Když dáváš na výběr mezi dvěma možnostmi.

Tvorba:
- Sloveso/adjektivum kmen + 거나
- 먹다 → 먹거나
- 보다 → 보거나
- 좋다 → 좋거나`,
        examples: [
            { kr: '밥을 먹거나 빵을 먹어요', cz: 'Jím rýži nebo chleba' },
            { kr: '영화를 보거나 책을 읽어요', cz: 'Dívám se na film nebo čtu' },
            { kr: '출근하거나 집에서 일해요', cz: 'Jdu do práce nebo pracuji z domu' },
            { kr: '회의를 하거나 이메일을 써요', cz: 'Mám schůzku nebo píšu e-maily' }
        ]
    },
    tasks: [
        '10 vět s -거나',
        'Popiš svůj pracovní den',
        'Přidej slovíčka do Anki',
        'Konverzace: Co děláš v práci?'
    ],
    exercises: [
        '점심에 ___ 거나 ___ 먹어요 (rýže/nudle)',
        '주말에 ___ 거나 ___ 해요 (odpočívat/cvičit)',
        '야근을 ___ 거나 집에 ___ (dělat/jít)'
    ],
    notes: [
        '직장 = místo práce (firma)',
        '직업 = povolání (co děláš)',
        '일 = práce obecně'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 94 - ÚT 5.5.2026 - Kancelář
// ============================================================================
const day94: KoreanDayData = {
    day: 94,
    date: 'ÚT 5.5.2026',
    title: 'Kancelář',
    vocab: [
        { kr: '사무실', cz: 'kancelář' },
        { kr: '책상', cz: 'stůl' },
        { kr: '의자', cz: 'židle' },
        { kr: '컴퓨터', cz: 'počítač' },
        { kr: '프린터', cz: 'tiskárna' },
        { kr: '복사기', cz: 'kopírka' },
        { kr: '전화기', cz: 'telefon' },
        { kr: '서류', cz: 'dokumenty' },
        { kr: '파일', cz: 'soubor' },
        { kr: '폴더', cz: 'složka' }
    ],
    grammar: {
        title: '-는데 - ale, kontext',
        explanation: `-는데 / -은데 / -ㄴ데 = ale, mimochodem, kontext

Použití: Dáváš kontext nebo pozadí před hlavní informací.

Tvorba:
- Sloveso: kmen + 는데
- Adjektivum po samohlásce: kmen + ㄴ데
- Adjektivum po souhlásce: kmen + 은데
- 이다: 인데

Tip: Je to jako "víš co, ..." nebo "hele, ..."`,
        examples: [
            { kr: '배고픈데 뭐 먹을까요?', cz: 'Mám hlad, co bychom jedli?' },
            { kr: '비가 오는데 우산 있어요?', cz: 'Prší, máš deštník?' },
            { kr: '사무실인데 조용해요', cz: 'Je to kancelář, ale je tu ticho' },
            { kr: '일하는데 전화가 왔어요', cz: 'Pracoval jsem a přišel telefon' }
        ]
    },
    tasks: [
        '10 vět s -는데',
        'Popiš svou kancelář/pracoviště',
        'Přidej slovíčka do Anki',
        'Konverzace: Co máš na stole?'
    ],
    exercises: [
        '피곤___데 일해야 해요 (být unavený)',
        '바___데 시간이 없어요 (být zaneprázdněný)',
        '컴퓨터가 고장___데 어떡해요? (být rozbitý)'
    ],
    notes: [
        '사무실 = kancelář (místnost)',
        '서류 = papírové dokumenty',
        '파일 = digitální soubor'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 95 - ST 6.5.2026 - Kolegové
// ============================================================================
const day95: KoreanDayData = {
    day: 95,
    date: 'ST 6.5.2026',
    title: 'Kolegové',
    vocab: [
        { kr: '동료', cz: 'kolega' },
        { kr: '상사', cz: 'nadřízený' },
        { kr: '부하', cz: 'podřízený' },
        { kr: '팀장', cz: 'vedoucí týmu' },
        { kr: '사장님', cz: 'ředitel' },
        { kr: '직원', cz: 'zaměstnanec' },
        { kr: '신입', cz: 'nováček' },
        { kr: '선배', cz: 'senior' },
        { kr: '후배', cz: 'junior' },
        { kr: '팀', cz: 'tým' }
    ],
    grammar: {
        title: '-(으)ㄹ게요 - slibuji že, hodlám',
        explanation: `-(으)ㄹ게요 = slibuji, hodlám, udělám to

Použití: Vyjadřuješ SVŮJ záměr nebo slib.

Tvorba:
- Po samohlásce nebo ㄹ: -ㄹ게요
- Po souhlásce: -을게요

DŮLEŽITÉ: Používá se POUZE pro 1. osobu (já)!`,
        examples: [
            { kr: '제가 할게요', cz: 'Já to udělám' },
            { kr: '내일 연락할게요', cz: 'Zítra se ozvu' },
            { kr: '팀장님께 말할게요', cz: 'Řeknu to vedoucímu' },
            { kr: '열심히 일할게요', cz: 'Budu tvrdě pracovat' }
        ]
    },
    tasks: [
        '10 slibů s -(으)ㄹ게요',
        'Popiš svůj tým',
        'Přidej slovíčka do Anki',
        'Konverzace: Kdo je tvůj nadřízený?'
    ],
    exercises: [
        '보고서 ___게요 (napsat)',
        '___게요 (pomoct)',
        '내일 일찍 ___게요 (přijít)'
    ],
    notes: [
        '선배/후배 - korejská hierarchie podle věku/zkušeností',
        '사장님 - vždy s 님 (úcta)',
        '신입 = 신입사원 (nový zaměstnanec)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 96 - ČT 7.5.2026 - Schůzky
// ============================================================================
const day96: KoreanDayData = {
    day: 96,
    date: 'ČT 7.5.2026',
    title: 'Schůzky a plánování',
    vocab: [
        { kr: '회의', cz: 'schůzka' },
        { kr: '약속', cz: 'schůzka/slib' },
        { kr: '미팅', cz: 'meeting' },
        { kr: '발표', cz: 'prezentace' },
        { kr: '보고', cz: 'report' },
        { kr: '계획', cz: 'plán' },
        { kr: '일정', cz: 'harmonogram' },
        { kr: '마감', cz: 'deadline' },
        { kr: '결과', cz: 'výsledek' },
        { kr: '목표', cz: 'cíl' }
    ],
    grammar: {
        title: 'Procvičování -거나, -는데, -(으)ㄹ게요',
        explanation: `Dnes kombinujeme gramatiku z tohoto týdne:

-거나: Dávám na výběr
-는데: Dávám kontext
-(으)ㄹ게요: Slibuji/hodlám

Kombinace v praxi:
회의가 있는데 발표할게요 = Mám schůzku a budu prezentovat`,
        examples: [
            { kr: '회의가 있거나 미팅이 있어요', cz: 'Mám schůzku nebo meeting' },
            { kr: '마감인데 아직 안 끝났어요', cz: 'Je deadline, ale ještě jsem neskončil' },
            { kr: '목표를 달성할게요', cz: 'Dosáhnu cíle' },
            { kr: '보고서를 쓰는데 도와주세요', cz: 'Píšu report, pomozte mi' }
        ]
    },
    tasks: [
        'Procvičování všech 3 gramatik',
        'Popiš svůj pracovní týden',
        'Přidej slovíčka do Anki',
        'Konverzace: Máš dnes schůzku?'
    ],
    exercises: [
        '오늘 회의가 ___는데 준비했어요? (být)',
        '발표를 ___거나 보고서를 ___요 (dělat/psát)',
        '마감까지 ___게요 (dokončit)'
    ],
    notes: [
        '회의 = formální schůzka',
        '약속 = schůzka (i soukromá) nebo slib',
        '마감 = deadline (uzávěrka)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 97 - PÁ 8.5.2026 - E-mail
// ============================================================================
const day97: KoreanDayData = {
    day: 97,
    date: 'PÁ 8.5.2026',
    title: 'E-mail a komunikace',
    vocab: [
        { kr: '이메일', cz: 'e-mail' },
        { kr: '보내다', cz: 'odeslat' },
        { kr: '받다', cz: 'přijmout' },
        { kr: '답장', cz: 'odpověď' },
        { kr: '첨부', cz: 'příloha' },
        { kr: '제목', cz: 'předmět' },
        { kr: '내용', cz: 'obsah' },
        { kr: '수신', cz: 'příjemce' },
        { kr: '발신', cz: 'odesílatel' },
        { kr: '참조', cz: 'kopie' }
    ],
    grammar: {
        title: 'Opakování týdne - příprava na test',
        explanation: `Tento týden jsme se naučili:

1. -거나 (nebo): 보내거나 받거나
2. -는데 (kontext): 이메일을 보내는데...
3. -(으)ㄹ게요 (slib): 답장할게요

E-mail v korejštině:
수신: Komu
발신: Od koho
제목: Předmět
첨부: Příloha`,
        examples: [
            { kr: '이메일을 보낼게요', cz: 'Pošlu e-mail' },
            { kr: '답장을 기다리는데 안 와요', cz: 'Čekám na odpověď, ale nepřichází' },
            { kr: '파일을 첨부하거나 링크를 보내요', cz: 'Přiložím soubor nebo pošlu odkaz' },
            { kr: '확인하고 답장할게요', cz: 'Zkontroluji a odpovím' }
        ]
    },
    tasks: [
        'Napiš pracovní e-mail v korejštině',
        'Opakování slovíček týdne',
        'Opakování gramatiky',
        'Příprava na víkendový test'
    ],
    exercises: [
        '이메일을 ___거나 전화를 ___요 (poslat/volat)',
        '답장을 ___는데 시간이 없어요 (psát)',
        '첨부파일을 ___게요 (poslat)'
    ],
    notes: [
        '참조 (CC) vs 숨은참조 (BCC)',
        '첨부파일 = příloha (soubor)',
        '받은편지함 = doručená pošta'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 98 - SO 9.5.2026 - SOBOTNÍ MARATON
// ============================================================================
const day98: KoreanDayData = {
    day: 98,
    date: 'SO 9.5.2026',
    title: '⭐ SOBOTNÍ MARATON - Telefonování (8 hodin)',
    vocab: [
        { kr: '전화', cz: 'telefon' },
        { kr: '걸다', cz: 'volat' },
        { kr: '받다', cz: 'zvednout' },
        { kr: '끊다', cz: 'zavěsit' },
        { kr: '문자', cz: 'SMS' },
        { kr: '통화', cz: 'hovor' },
        { kr: '번호', cz: 'číslo' },
        { kr: '음성메시지', cz: 'hlasová zpráva' },
        // Stavební slovíčka
        { kr: '안전조끼', cz: 'bezpečnostní vesta' },
        { kr: '장갑', cz: 'rukavice' },
        { kr: '보안경', cz: 'ochranné brýle' },
        { kr: '귀마개', cz: 'chrániče sluchu' },
        { kr: '마스크', cz: 'respirátor' },
        { kr: '안전벨트', cz: 'bezpečnostní pás' },
        { kr: '공구', cz: 'nářadí' }
    ],
    grammar: {
        title: 'Telefonní fráze',
        explanation: `Telefonování v korejštině:

Zvednutí:
여보세요? = Haló?

Představení:
저는 [jméno]입니다 = Tady [jméno]

Žádost o spojení:
[jméno]씨 계세요? = Je tam [jméno]?

Ukončení:
그럼 끊을게요 = Tak zavěsím`,
        examples: [
            { kr: '여보세요? 저는 도미니크입니다', cz: 'Haló? Tady Dominik' },
            { kr: '전화 받아 주세요', cz: 'Zvedněte prosím telefon' },
            { kr: '문자 보낼게요', cz: 'Pošlu SMS' },
            { kr: '통화 중이에요', cz: 'Volá (linka obsazena)' }
        ]
    },
    tasks: [
        'Hodina 1-2: Telefonní slovíčka a fráze',
        'Hodina 3-4: Role-play telefonáty',
        'Hodina 5: Psaní SMS v korejštině',
        'Hodina 6-7: Stavební bezpečnostní vybavení',
        'Hodina 8: Opakování pracovních slovíček'
    ],
    exercises: [
        '전화를 ___요 (volat)',
        '문자를 ___요 (poslat)',
        '안전___를 써야 해요 (helma)'
    ],
    notes: [
        '여보세요 - pouze na telefonu!',
        '전화 걸다 = volat (aktivně)',
        '전화 받다 = zvednout telefon'
    ],
    isWeekend: true,
    isTest: false
};

// ============================================================================
// DEN 99 - NE 10.5.2026 - NEDĚLE + TEST
// ============================================================================
const day99: KoreanDayData = {
    day: 99,
    date: 'NE 10.5.2026',
    title: '📝 NEDĚLNÍ MEGA OPAKOVÁNÍ + TEST (12 hodin)',
    vocab: [
        // Opakování - práce
        { kr: '일', cz: 'práce' },
        { kr: '직장', cz: 'zaměstnání' },
        { kr: '사무실', cz: 'kancelář' },
        { kr: '동료', cz: 'kolega' },
        { kr: '회의', cz: 'schůzka' }
    ],
    grammar: {
        title: 'TEST TÝDNE - Práce a komunikace',
        explanation: `ČÁST A: Slovíčka (25 bodů)
- Práce, kancelář, kolegové, e-mail, telefon

ČÁST B: Gramatika (50 bodů)
- -거나 (nebo)
- -는데 (kontext)
- -(으)ㄹ게요 (slib)

ČÁST C: Situace (25 bodů)
- Napiš pracovní e-mail
- Popiš telefonát`,
        examples: [
            { kr: '-거나: 회의를 하거나 보고서를 써요', cz: 'Mám schůzku nebo píšu report' },
            { kr: '-는데: 바쁜데 도와줄 수 있어요?', cz: 'Jsem zaneprázdněný, můžeš pomoct?' },
            { kr: '-(으)ㄹ게요: 내일 연락할게요', cz: 'Zítra se ozvu' }
        ]
    },
    tasks: [
        'TEST: Slovíčka z týdne',
        'TEST: Gramatika -거나, -는데, -(으)ㄹ게요',
        'TEST: Psaní e-mailu',
        'Opakování a analýza chyb'
    ],
    exercises: [
        '직장에서 뭐 해요? - Co děláš v práci?',
        '동료가 몇 명이에요? - Kolik máš kolegů?',
        '오늘 회의가 있어요? - Máš dnes schůzku?'
    ],
    isWeekend: true,
    isTest: true
};

// ============================================================================
// DEN 100 - PO 11.5.2026 - Čas pokročile
// ============================================================================
const day100: KoreanDayData = {
    day: 100,
    date: 'PO 11.5.2026',
    title: '🎉 DEN 100! - Čas pokročile',
    vocab: [
        { kr: '아까', cz: 'před chvílí' },
        { kr: '방금', cz: 'právě teď' },
        { kr: '곧', cz: 'brzy' },
        { kr: '이따가', cz: 'za chvíli' },
        { kr: '잠시', cz: 'chvíli' },
        { kr: '잠깐', cz: 'moment' },
        { kr: '오래', cz: 'dlouho' },
        { kr: '벌써', cz: 'už' },
        { kr: '아직', cz: 'ještě' },
        { kr: '드디어', cz: 'konečně' }
    ],
    grammar: {
        title: '-아/어 주다 - udělat pro někoho',
        explanation: `-아/어 주다 = udělat něco PRO NĚKOHO

Použití: Když někdo něco dělá pro tebe nebo ty pro někoho.

Tvorba:
- Kmen + 아/어 주다
- 도와 + 주다 = 도와주다 (pomoct)
- 가르쳐 + 주다 = 가르쳐 주다 (naučit)

S 주세요 = prosba
S 줄게요 = slib`,
        examples: [
            { kr: '도와주세요', cz: 'Pomozte mi' },
            { kr: '가르쳐 주세요', cz: 'Naučte mě' },
            { kr: '설명해 주세요', cz: 'Vysvětlete mi' },
            { kr: '제가 도와줄게요', cz: 'Já vám pomůžu' }
        ]
    },
    tasks: [
        'DEN 100 - Reflexe pokroku!',
        '10 vět s -아/어 주다',
        'Procvič časové výrazy',
        'Přidej slovíčka do Anki'
    ],
    exercises: [
        '방금 뭐 ___요? (dělat)',
        '이따가 ___줄게요 (pomoct)',
        '벌써 100일이에요! = ?'
    ],
    notes: [
        '방금 = právě teď (minulost)',
        '이따가 = za chvíli (budoucnost)',
        '벌써 vs 아직 - už vs ještě'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 101 - ÚT 12.5.2026 - Plánování
// ============================================================================
const day101: KoreanDayData = {
    day: 101,
    date: 'ÚT 12.5.2026',
    title: 'Plánování',
    vocab: [
        { kr: '계획', cz: 'plán' },
        { kr: '준비', cz: 'příprava' },
        { kr: '예정', cz: 'plánovaný' },
        { kr: '변경', cz: 'změna' },
        { kr: '연기', cz: 'odložení' },
        { kr: '취소', cz: 'zrušení' },
        { kr: '확정', cz: 'potvrzení' },
        { kr: '예약', cz: 'rezervace' },
        { kr: '신청', cz: 'žádost' },
        { kr: '승인', cz: 'schválení' }
    ],
    grammar: {
        title: '-(으)면서 - zatímco',
        explanation: `-(으)면서 = zatímco, během toho co

Použití: Dvě akce probíhají SOUČASNĚ.

Tvorba:
- Po samohlásce nebo ㄹ: -면서
- Po souhlásce: -으면서

DŮLEŽITÉ: Stejný podmět pro obě akce!`,
        examples: [
            { kr: '음악을 들으면서 공부해요', cz: 'Studuji a poslouchám hudbu' },
            { kr: '밥을 먹으면서 TV를 봐요', cz: 'Jím a dívám se na TV' },
            { kr: '일하면서 한국어를 배워요', cz: 'Pracuji a učím se korejsky' },
            { kr: '걸으면서 전화해요', cz: 'Jdu a volám' }
        ]
    },
    tasks: [
        '10 vět s -(으)면서',
        'Popiš co děláš současně',
        'Přidej slovíčka do Anki',
        'Konverzace: Jaké máš plány?'
    ],
    exercises: [
        '___으면서 공부해요 (poslouchat hudbu)',
        '___면서 일해요 (jíst)',
        '계획을 ___요 (změnit)'
    ],
    notes: [
        '예정 = plánováno (formální)',
        '연기 vs 취소 - odložit vs zrušit',
        '승인 = schválení (od nadřízeného)'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 102 - ST 13.5.2026 - Frekvence
// ============================================================================
const day102: KoreanDayData = {
    day: 102,
    date: 'ST 13.5.2026',
    title: 'Frekvence',
    vocab: [
        { kr: '매일', cz: 'každý den' },
        { kr: '매주', cz: 'každý týden' },
        { kr: '매달', cz: 'každý měsíc' },
        { kr: '매년', cz: 'každý rok' },
        { kr: '자주', cz: 'často' },
        { kr: '가끔', cz: 'občas' },
        { kr: '거의', cz: 'skoro' },
        { kr: '전혀', cz: 'vůbec' },
        { kr: '항상', cz: 'vždy' },
        { kr: '보통', cz: 'obvykle' }
    ],
    grammar: {
        title: 'Procvičování -아/어 주다, -(으)면서',
        explanation: `Kombinace gramatik z tohoto týdne:

-아/어 주다: Pro někoho
-(으)면서: Zatímco

Příklady kombinací:
음악을 들으면서 도와줄게요 = Pomohu ti, zatímco poslouchám hudbu`,
        examples: [
            { kr: '매일 한국어를 공부해요', cz: 'Každý den studuji korejštinu' },
            { kr: '자주 도와줘요', cz: 'Často pomáhám' },
            { kr: '가끔 음악을 들으면서 일해요', cz: 'Občas pracuji a poslouchám hudbu' },
            { kr: '항상 설명해 주세요', cz: 'Vždy mi to vysvětlete' }
        ]
    },
    tasks: [
        'Popiš své návyky s frekvencí',
        'Kombinuj gramatiky',
        'Přidej slovíčka do Anki',
        'Konverzace: Jak často studuješ?'
    ],
    exercises: [
        '___ 한국어를 공부해요 (každý den)',
        '___ 운동해요 (často)',
        '___ 안 해요 (vůbec)'
    ],
    notes: [
        '매 = každý (매일, 매주, 매달, 매년)',
        '거의 + 부정 = skoro ne',
        '전혀 + 부정 = vůbec ne'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// DEN 103 - ČT 14.5.2026 - Sekvence
// ============================================================================
const day103: KoreanDayData = {
    day: 103,
    date: 'ČT 14.5.2026',
    title: 'Sekvence',
    vocab: [
        { kr: '먼저', cz: 'nejdřív' },
        { kr: '다음', cz: 'další' },
        { kr: '그리고', cz: 'a pak' },
        { kr: '마지막', cz: 'nakonec' },
        { kr: '드디어', cz: 'konečně' },
        { kr: '결국', cz: 'nakonec (výsledek)' },
        { kr: '처음', cz: 'poprvé' },
        { kr: '두 번째', cz: 'podruhé' },
        { kr: '이후', cz: 'poté' },
        { kr: '이전', cz: 'předtím' }
    ],
    grammar: {
        title: '-기 전에 - před tím než',
        explanation: `-기 전에 = před tím než

Tvorba: Sloveso kmen + 기 전에

Použití: Akce, která se děje PŘED jinou akcí.

Opak: -ㄴ/은 후에 = po tom co`,
        examples: [
            { kr: '자기 전에', cz: 'před spaním' },
            { kr: '가기 전에 확인하세요', cz: 'Před odchodem zkontrolujte' },
            { kr: '먹기 전에 손을 씻어요', cz: 'Před jídlem si myju ruce' },
            { kr: '출근하기 전에 아침을 먹어요', cz: 'Před prací snídám' }
        ]
    },
    tasks: [
        '10 vět s -기 전에',
        'Popiš svou ranní rutinu',
        'Opakování týdne',
        'Příprava na víkendový test'
    ],
    exercises: [
        '___기 전에 손을 씻어요 (jíst)',
        '___기 전에 확인해요 (odejít)',
        '먼저 ___, 그리고 ___, 마지막으로 ___'
    ],
    notes: [
        '-기 전에 = před (+ sloveso)',
        '-ㄴ/은 후에 = po (+ sloveso)',
        '이전 vs 이후 - předtím vs poté'
    ],
    isWeekend: false,
    isTest: false
};

// ============================================================================
// EXPORT
// ============================================================================
export const mayDays90to103: KoreanDayData[] = [
    day90,
    day91,
    day92,
    day93,
    day94,
    day95,
    day96,
    day97,
    day98,
    day99,
    day100,
    day101,
    day102,
    day103
];

export default mayDays90to103;
