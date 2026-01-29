/**
 * November 2026 - Korean Study Plan Data
 * Month 10/10 - Level B1 - FINÁLNÍ MĚSÍC - Kompletní opakování
 * Days 274-303 (1.11.2026 - 30.11.2026)
 * 
 * FINÁLNÍ MĚSÍC - KOMPLETNÍ OPAKOVÁNÍ CELÉHO ROKU
 * Žádná nová gramatika, pouze 60 doplňkových slovíček
 * Opakování všech 50 gramatických struktur a 2000 slov
 */

import type { KoreanMonthData, KoreanDayData } from '../types/study-db';

// === TÝDEN 1: Opakování gramatiky 1-3 / Únor-Duben (1.11.-7.11.) ===

export const day274: KoreanDayData = {
    day: 274,
    date: 'NE 1.11.2026',
    title: '📚 ÚNOR #1 - Základní částice',
    vocab: [
        { kr: '복습', cz: 'opakování' },
        { kr: '문법', cz: 'gramatika' },
        { kr: '연습', cz: 'cvičení' },
        { kr: '시험', cz: 'test' }
    ],
    grammar: {
        title: 'Opakování: 이다/아니다, 은/는, 이/가, 을/를',
        explanation: `ÚNOROVÁ GRAMATIKA - ČÁST 1

1. 이다 (být):
   - Po samohlásce: -예요 (친구예요)
   - Po souhlásce: -이에요 (학생이에요)

2. 아니다 (nebýt):
   - Vždy s 이/가: 학생이 아니에요
   - Zdůrazňuje CO to NENÍ

3. 은/는 (téma):
   - Po souhlásce: 은 (물은)
   - Po samohlásce: 는 (커피는)
   - "Co se X týče..."

4. 이/가 (podmět):
   - Po souhlásce: 이 (물이)
   - Po samohlásce: 가 (커피가)
   - S 있다/없다/아니다

5. 을/를 (předmět):
   - Po souhlásce: 을 (밥을)
   - Po samohlásce: 를 (커피를)`,
        examples: [
            { kr: '저는 체코 사람이에요.', cz: 'Jsem Čech.' },
            { kr: '저는 학생이 아니에요.', cz: 'Nejsem student.' },
            { kr: '물이 있어요.', cz: 'Je tu voda.' },
            { kr: '밥을 먹어요.', cz: 'Jím rýži.' },
            { kr: '커피는 맛있어요.', cz: 'Káva je chutná.' }
        ]
    },
    exercises: [
        'A. Doplň 은/는 nebo 이/가:',
        '1. 저___ 도미니크예요.',
        '2. 물___ 있어요.',
        '3. 커피___ 맛있어요.',
        '4. 누___ 했어요?',
        '5. 친구___ 왔어요.',
        '',
        'B. Doplň 을/를:',
        '1. 밥___ 먹어요.',
        '2. 한국어___ 배워요.',
        '3. 영화___ 봐요.',
        '',
        'C. Přelož:',
        '1. Jsem stavbyvedoucí.',
        '2. Nejsem dělník.',
        '3. Je tu problém.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.는 2.이 3.는 4.가 5.가',
        'B: 1.을 2.를 3.를',
        'C: 1.저는 현장소장이에요. 2.저는 노동자가 아니에요. 3.문제가 있어요.'
    ],
    isWeekend: true,
    isTest: false
};

export const day275: KoreanDayData = {
    day: 275,
    date: 'PO 2.11.2026',
    title: '📚 ÚNOR #2 - Místní částice',
    vocab: [
        { kr: '위치', cz: 'pozice/místo' },
        { kr: '방향', cz: 'směr' }
    ],
    grammar: {
        title: 'Opakování: 에, 에서, 도, 있다/없다',
        explanation: `ÚNOROVÁ GRAMATIKA - ČÁST 2

1. 에 (místo/čas):
   - KAM jdu: 집에 가요
   - KDE jsem (staticky): 집에 있어요
   - KDY: 9시에 가요

2. 에서 (místo akce):
   - KDE dělám: 집에서 일해요
   - Akční slovesa!

3. 도 (také):
   - NAHRAZUJE ostatní částice!
   - 저도요 = Já taky

4. 있다/없다:
   - S 이/가, ne 은/는!
   - 물이 있어요 / 시간이 없어요

KLÍČOVÝ ROZDÍL 에 vs 에서:
- 집에 있어요 (Jsem doma - statické)
- 집에서 일해요 (Pracuji doma - akce)`,
        examples: [
            { kr: '현장에 가요.', cz: 'Jdu na stavbu.' },
            { kr: '현장에서 일해요.', cz: 'Pracuji na stavbě.' },
            { kr: '7시에 출근해요.', cz: 'V 7 jdu do práce.' },
            { kr: '저도 철근공이에요.', cz: 'Já jsem taky železář.' },
            { kr: '시간이 없어요.', cz: 'Nemám čas.' }
        ]
    },
    exercises: [
        'A. Doplň 에 nebo 에서:',
        '1. 현장___ 가요.',
        '2. 현장___ 일해요.',
        '3. 9시___ 시작해요.',
        '4. 사무실___ 있어요.',
        '5. 사무실___ 회의해요.',
        '',
        'B. Přepiš s 도:',
        '1. 저는 목수예요. → 저___',
        '2. 커피를 마셔요. → 커피___',
        '',
        'C. Přelož:',
        '1. Pracuji ve firmě.',
        '2. Nemám materiál.',
        '3. Já taky jdu.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.에 2.에서 3.에 4.에 5.에서',
        'B: 1.도 목수예요 2.도 마셔요',
        'C: 1.회사에서 일해요. 2.자재가 없어요. 3.저도 가요.'
    ],
    isWeekend: false,
    isTest: false
};

export const day276: KoreanDayData = {
    day: 276,
    date: 'ÚT 3.11.2026',
    title: '📚 BŘEZEN #1 - Minulý čas a zápor',
    vocab: [
        { kr: '과거', cz: 'minulost' },
        { kr: '부정', cz: 'zápor' }
    ],
    grammar: {
        title: 'Opakování: -았/었어요, 안/못',
        explanation: `BŘEZNOVÁ GRAMATIKA - ČÁST 1

1. Minulý čas -았/었어요:
   - Kmen s ㅏ/ㅗ: -았어요 (가다→갔어요)
   - Ostatní: -었어요 (먹다→먹었어요)
   - 하다→했어요

2. Zápor 안 (nechci/nedělám):
   - Před slovesem: 안 가요 (nejdu)
   - Volní rozhodnutí

3. Zápor 못 (nemohu):
   - Před slovesem: 못 가요 (nemohu jít)
   - Neschopnost/nemožnost

ROZDÍL 안 vs 못:
- 안 먹어요 = Nejím (nechci)
- 못 먹어요 = Nemohu jíst (fyzicky/zdravotně)`,
        examples: [
            { kr: '어제 현장에 갔어요.', cz: 'Včera jsem byl na stavbě.' },
            { kr: '공사를 끝냈어요.', cz: 'Dokončil jsem práci.' },
            { kr: '오늘 안 가요.', cz: 'Dnes nejdu.' },
            { kr: '비가 와서 못 해요.', cz: 'Prší, tak nemůžu.' },
            { kr: '아파서 못 왔어요.', cz: 'Byl jsem nemocný, nemohl jsem přijít.' }
        ]
    },
    exercises: [
        'A. Převeď do minulého času:',
        '1. 가다 → ___',
        '2. 먹다 → ___',
        '3. 일하다 → ___',
        '4. 마시다 → ___',
        '5. 끝내다 → ___',
        '',
        'B. Doplň 안 nebo 못:',
        '1. 오늘 ___ 가요. (nechci)',
        '2. 다리가 아파서 ___ 걸어요. (nemohu)',
        '3. 허가 없이 ___ 해요. (nesmím)',
        '',
        'C. Přelož:',
        '1. Včera jsem pracoval.',
        '2. Nemohu to udělat.',
        '3. Nejedl jsem.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.갔어요 2.먹었어요 3.일했어요 4.마셨어요 5.끝냈어요',
        'B: 1.안 2.못 3.못',
        'C: 1.어제 일했어요. 2.못 해요. 3.안 먹었어요.'
    ],
    isWeekend: false,
    isTest: false
};

export const day277: KoreanDayData = {
    day: 277,
    date: 'ST 4.11.2026',
    title: '📚 BŘEZEN #2 - Spojování vět',
    vocab: [
        { kr: '연결', cz: 'spojení' },
        { kr: '조건', cz: 'podmínka' }
    ],
    grammar: {
        title: 'Opakování: -고 싶다, -(으)세요, -고, -(으)면, -아서/어서, -지만',
        explanation: `BŘEZNOVÁ GRAMATIKA - ČÁST 2

1. -고 싶다 (chtít):
   가고 싶어요 = Chci jít

2. -(으)세요 (zdvořilý rozkaz):
   가세요 = Jděte / 드세요 = Jezte

3. -고 (a, a pak):
   먹고 마셔요 = Jím a piju

4. -(으)면 (když, jestli):
   가면 = Když půjdu

5. -아서/어서 (protože, a tak):
   피곤해서 = Protože jsem unavený

6. -지만 (ale):
   크지만 = Je velký, ale...`,
        examples: [
            { kr: '쉬고 싶어요.', cz: 'Chci si odpočinout.' },
            { kr: '조심하세요.', cz: 'Buďte opatrní.' },
            { kr: '측정하고 잘라요.', cz: 'Změřím a uříznu.' },
            { kr: '비가 오면 멈춰요.', cz: 'Když prší, zastavíme.' },
            { kr: '위험해서 못 해요.', cz: 'Je to nebezpečné, tak nemůžu.' },
            { kr: '힘들지만 해야 해요.', cz: 'Je to těžké, ale musím.' }
        ]
    },
    exercises: [
        'A. Spoj věty pomocí -고:',
        '1. 측정하다 + 자르다 = ___',
        '2. 먹다 + 쉬다 = ___',
        '',
        'B. Použij -(으)면:',
        '1. 비가 오다 → 비가 ___ 안 해요.',
        '2. 끝나다 → ___ 가요.',
        '',
        'C. Použij -아서/어서:',
        '1. 바쁘다 → ___ 못 해요.',
        '2. 아프다 → ___ 안 왔어요.',
        '',
        'D. Přelož:',
        '1. Chci jíst.',
        '2. Je to těžké, ale zajímavé.',
        '3. Počkejte prosím.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.측정하고 잘라요 2.먹고 쉬어요',
        'B: 1.오면 2.끝나면',
        'C: 1.바빠서 2.아파서',
        'D: 1.먹고 싶어요. 2.어렵지만 재미있어요. 3.기다리세요.'
    ],
    isWeekend: false,
    isTest: false
};

export const day278: KoreanDayData = {
    day: 278,
    date: 'ČT 5.11.2026',
    title: '📚 DUBEN #1 - Budoucí čas a průběh',
    vocab: [
        { kr: '미래', cz: 'budoucnost' },
        { kr: '진행', cz: 'průběh' }
    ],
    grammar: {
        title: 'Opakování: -(으)ㄹ 거예요, -는 중이다, -(으)ㄹ 수 있다',
        explanation: `DUBNOVÁ GRAMATIKA - ČÁST 1

1. -(으)ㄹ 거예요 (budoucí čas):
   - Po samohlásce: -ㄹ 거예요 (갈 거예요)
   - Po souhlásce: -을 거예요 (먹을 거예요)
   - Plán nebo záměr

2. -는 중이다 (právě probíhá):
   - 하는 중이에요 = Právě dělám
   - Zdůrazňuje průběh akce

3. -(으)ㄹ 수 있다/없다 (moci/umět):
   - 할 수 있어요 = Můžu/Umím
   - 할 수 없어요 = Nemůžu/Neumím`,
        examples: [
            { kr: '내일 현장에 갈 거예요.', cz: 'Zítra půjdu na stavbu.' },
            { kr: '다음 주에 끝낼 거예요.', cz: 'Příští týden dokončím.' },
            { kr: '지금 용접하는 중이에요.', cz: 'Právě svařuji.' },
            { kr: '크레인을 운전할 수 있어요.', cz: 'Umím řídit jeřáb.' },
            { kr: '혼자 못 할 수 있어요.', cz: 'Sám to nezvládnu.' }
        ]
    },
    exercises: [
        'A. Převeď do budoucího času:',
        '1. 가다 → ___ 거예요',
        '2. 먹다 → ___ 거예요',
        '3. 끝내다 → ___ 거예요',
        '4. 만들다 → ___ 거예요',
        '',
        'B. Použij -는 중이다:',
        '1. 일하다 → 일___',
        '2. 먹다 → 먹___',
        '',
        'C. Přelož:',
        '1. Zítra budu pracovat.',
        '2. Právě měřím.',
        '3. Umíš svařovat?',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.갈 2.먹을 3.끝낼 4.만들',
        'B: 1.하는 중이에요 2.는 중이에요',
        'C: 1.내일 일할 거예요. 2.측정하는 중이에요. 3.용접할 수 있어요?'
    ],
    isWeekend: false,
    isTest: false
};

export const day279: KoreanDayData = {
    day: 279,
    date: 'PÁ 6.11.2026',
    title: '📚 DUBEN #2 - Zkušenost a příčina',
    vocab: [
        { kr: '경험', cz: 'zkušenost' },
        { kr: '이유', cz: 'důvod' }
    ],
    grammar: {
        title: 'Opakování: -아/어 보다, -(으)니까',
        explanation: `DUBNOVÁ GRAMATIKA - ČÁST 2

1. -아/어 보다 (zkusit):
   - 해 봐요 = Zkuste to
   - 먹어 봤어요 = Zkoušel jsem jíst
   - Zkušenost nebo pokus

2. -(으)니까 (protože - důraz):
   - Po samohlásce: -니까 (가니까)
   - Po souhlásce: -으니까 (먹으니까)
   - Důraz na příčinu (silnější než -아서/어서)
   - Lze použít s rozkazem!

ROZDÍL -아서 vs -(으)니까:
- 아파서 가세요 ❌ (nelze s rozkazem)
- 아프니까 가세요 ✓ (lze s rozkazem)`,
        examples: [
            { kr: '이 도구를 써 봐요.', cz: 'Zkuste tento nástroj.' },
            { kr: '한국에 가 봤어요.', cz: 'Byl jsem v Koreji.' },
            { kr: '위험하니까 조심하세요.', cz: 'Je to nebezpečné, buďte opatrní.' },
            { kr: '비가 오니까 실내에서 해요.', cz: 'Protože prší, děláme uvnitř.' },
            { kr: '시간이 없으니까 빨리 해요.', cz: 'Nemáme čas, tak rychle.' }
        ]
    },
    exercises: [
        'A. Použij -아/어 보다:',
        '1. 하다 → 해 ___',
        '2. 먹다 → 먹어 ___',
        '3. 가다 → 가 ___',
        '',
        'B. Použij -(으)니까:',
        '1. 바쁘다 → ___',
        '2. 위험하다 → ___',
        '3. 없다 → ___',
        '',
        'C. Přelož:',
        '1. Zkus to.',
        '2. Byl jsi v Koreji?',
        '3. Je to horké, buďte opatrní.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.봐요 2.봐요 3.봤어요',
        'B: 1.바쁘니까 2.위험하니까 3.없으니까',
        'C: 1.해 봐요. 2.한국에 가 봤어요? 3.뜨거우니까 조심하세요.'
    ],
    isWeekend: false,
    isTest: false
};

export const day280: KoreanDayData = {
    day: 280,
    date: 'SO 7.11.2026',
    title: '🏆 MINI TEST 1-3 (Únor-Duben)',
    vocab: [],
    exercises: [
        '═══════════════════════════════════════════════════════',
        'MINI TEST #1 - GRAMATIKA ÚNOR-DUBEN',
        '═══════════════════════════════════════════════════════',
        '',
        'ČÁST A: ČÁSTICE (20 bodů)',
        '1. 저___ 철근공이에요. (은/는)',
        '2. 물___ 있어요. (이/가)',
        '3. 밥___ 먹어요. (을/를)',
        '4. 현장___ 가요. (에/에서)',
        '5. 현장___ 일해요. (에/에서)',
        '',
        'ČÁST B: ČASY (20 bodů)',
        '1. 어제 일___ (minulý čas)',
        '2. 내일 일___ (budoucí čas)',
        '3. 지금 일___ (průběh)',
        '4. 일___ 싶어요. (chtít)',
        '',
        'ČÁST C: ZÁPOR (10 bodů)',
        '1. ___ 가요. (nechci jít)',
        '2. ___ 가요. (nemohu jít)',
        '',
        'ČÁST D: SPOJOVÁNÍ (20 bodů)',
        '1. 측정하___자르다 (a pak)',
        '2. 비가 오___ 안 해요. (když)',
        '3. 피곤___ 쉬어요. (protože)',
        '4. 어렵___ 재미있어요. (ale)',
        '',
        'ČÁST E: PŘEKLAD (30 bodů)',
        '1. Jsem tesař.',
        '2. Nemůžu pracovat.',
        '3. Zítra dokončím.',
        '4. Zkuste to.',
        '5. Je to nebezpečné, buďte opatrní.',
        '6. Je to těžké, ale musím.',
        '',
        '═══════════════════════════════════════════════════════',
        'ODPOVĚDI:',
        'A: 1.는 2.이 3.을 4.에 5.에서',
        'B: 1.했어요 2.할 거예요 3.하는 중이에요 4.하고',
        'C: 1.안 2.못',
        'D: 1.고 2.면 3.해서 4.지만',
        'E: 1.저는 목수예요. 2.일 못 해요./일할 수 없어요.',
        '   3.내일 끝낼 거예요. 4.해 봐요.',
        '   5.위험하니까 조심하세요. 6.어렵지만 해야 해요.',
        '',
        'HODNOCENÍ: 90-100: Výborně | 80-89: Velmi dobře | 70-79: Dobře | Pod 70: Opakovat',
        '═══════════════════════════════════════════════════════'
    ],
    isWeekend: true,
    isTest: true
};

// === TÝDEN 2: Opakování gramatiky 4-6 / Květen-Červenec (8.11.-14.11.) ===

export const day281: KoreanDayData = {
    day: 281,
    date: 'NE 8.11.2026',
    title: '📚 KVĚTEN #1 - Alternativy a situace',
    vocab: [
        { kr: '선택', cz: 'výběr' },
        { kr: '상황', cz: 'situace' }
    ],
    grammar: {
        title: 'Opakování: -거나, -는데',
        explanation: `KVĚTNOVÁ GRAMATIKA - ČÁST 1

1. -거나 (nebo):
   - 가거나 오거나 = Jít nebo přijít
   - Výběr mezi možnostmi

2. -는데 (ale/a/situace):
   - Slovesa: -는데 (가는데)
   - Příd. jména: -(으)ㄴ데 (큰데)
   - Uvádí situaci nebo kontrast
   - Velmi běžné v běžné řeči!

POUŽITÍ -는데:
- Uvádí pozadí: 비가 오는데... (Prší, a...)
- Měkký kontrast: 좋은데 비싸요 (Je to dobré, ale drahé)
- Žádost o reakci: 어떻게 하는데요? (A jak to děláte?)`,
        examples: [
            { kr: '시멘트거나 모르타르 써요.', cz: 'Použijte cement nebo maltu.' },
            { kr: '먹거나 마시거나 해요.', cz: 'Jíme nebo pijeme.' },
            { kr: '비가 오는데 어떻게 해요?', cz: 'Prší, co budeme dělat?' },
            { kr: '좋은데 비싸요.', cz: 'Je to dobré, ale drahé.' },
            { kr: '일하는데 전화가 왔어요.', cz: 'Pracoval jsem, když přišel telefon.' }
        ]
    },
    exercises: [
        'A. Spoj pomocí -거나:',
        '1. 가다 / 오다 = ___',
        '2. 시멘트 / 모르타르 = ___',
        '',
        'B. Použij -는데:',
        '1. 일하다 → 일___',
        '2. 좋다 → ___',
        '3. 비가 오다 → ___',
        '',
        'C. Přelož:',
        '1. Používáme kladivo nebo vrtačku.',
        '2. Pracuji, ale jsem unavený.',
        '3. Prší, tak co budeme dělat?',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.가거나 오거나 2.시멘트거나 모르타르',
        'B: 1.하는데 2.좋은데 3.비가 오는데',
        'C: 1.망치거나 드릴을 써요. 2.일하는데 피곤해요. 3.비가 오는데 어떻게 해요?'
    ],
    isWeekend: true,
    isTest: false
};

export const day282: KoreanDayData = {
    day: 282,
    date: 'PO 9.11.2026',
    title: '📚 KVĚTEN #2 - Slib a pomoc',
    vocab: [
        { kr: '약속', cz: 'slib' },
        { kr: '도움', cz: 'pomoc' }
    ],
    grammar: {
        title: 'Opakování: -(으)ㄹ게요, -아/어 주다, -(으)면서, -기 전에',
        explanation: `KVĚTNOVÁ GRAMATIKA - ČÁST 2

1. -(으)ㄹ게요 (slib/záměr):
   - 할게요 = Udělám to (slibuji)
   - Reakce na situaci

2. -아/어 주다 (udělat pro někoho):
   - 도와 줘요 = Pomozte mi
   - 해 주세요 = Udělejte to pro mě

3. -(으)면서 (zatímco):
   - 일하면서 = Zatímco pracuji
   - Dvě činnosti současně

4. -기 전에 (před tím než):
   - 가기 전에 = Před odchodem
   - Časová posloupnost`,
        examples: [
            { kr: '제가 할게요.', cz: 'Já to udělám.' },
            { kr: '도와 주세요.', cz: 'Pomozte mi prosím.' },
            { kr: '이것 좀 들어 주세요.', cz: 'Podržte mi to prosím.' },
            { kr: '일하면서 음악을 들어요.', cz: 'Poslouchám hudbu při práci.' },
            { kr: '시작하기 전에 확인해요.', cz: 'Před začátkem zkontrolujeme.' }
        ]
    },
    exercises: [
        'A. Použij -(으)ㄹ게요:',
        '1. 하다 → ___',
        '2. 가다 → ___',
        '3. 끝내다 → ___',
        '',
        'B. Použij -아/어 주다:',
        '1. 돕다 → 도와 ___',
        '2. 들다 → 들어 ___',
        '',
        'C. Použij -기 전에:',
        '1. 시작하다 → ___',
        '2. 가다 → ___',
        '',
        'D. Přelož:',
        '1. Já to udělám.',
        '2. Pomozte mi prosím.',
        '3. Před začátkem si nasaďte helmu.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.할게요 2.갈게요 3.끝낼게요',
        'B: 1.줘요/주세요 2.줘요/주세요',
        'C: 1.시작하기 전에 2.가기 전에',
        'D: 1.제가 할게요. 2.도와 주세요. 3.시작하기 전에 헬멧을 쓰세요.'
    ],
    isWeekend: false,
    isTest: false
};

export const day283: KoreanDayData = {
    day: 283,
    date: 'ÚT 10.11.2026',
    title: '📚 ČERVEN #1 - Povinnost a zákaz',
    vocab: [
        { kr: '의무', cz: 'povinnost' },
        { kr: '금지', cz: 'zákaz' }
    ],
    grammar: {
        title: 'Opakování: -(으)ㄴ 후에, -아/어야 하다, -(으)면 안 되다',
        explanation: `ČERVNOVÁ GRAMATIKA - ČÁST 1

1. -(으)ㄴ 후에 (po tom co):
   - 끝난 후에 = Po dokončení
   - Časová posloupnost (opak -기 전에)

2. -아/어야 하다 (musí se):
   - 해야 해요 = Musím to udělat
   - Povinnost nebo nutnost

3. -(으)면 안 되다 (nesmí se):
   - 하면 안 돼요 = Nesmíte to dělat
   - Zákaz nebo varování

STAVEBNÍ BEZPEČNOST:
- 헬멧을 써야 해요 = Musíte nosit helmu
- 허가 없이 하면 안 돼요 = Bez povolení se nesmí`,
        examples: [
            { kr: '끝난 후에 청소해요.', cz: 'Po dokončení uklidíme.' },
            { kr: '헬멧을 써야 해요.', cz: 'Musíte nosit helmu.' },
            { kr: '안전화를 신어야 해요.', cz: 'Musíte mít bezpečnostní boty.' },
            { kr: '담배 피우면 안 돼요.', cz: 'Nesmíte kouřit.' },
            { kr: '혼자 하면 안 돼요.', cz: 'Sám to nesmíte dělat.' }
        ]
    },
    exercises: [
        'A. Použij -(으)ㄴ 후에:',
        '1. 끝나다 → ___',
        '2. 먹다 → ___',
        '',
        'B. Použij -아/어야 하다:',
        '1. 쓰다 (nosit) → ___',
        '2. 확인하다 → ___',
        '',
        'C. Použij -(으)면 안 되다:',
        '1. 만지다 → ___',
        '2. 들어가다 → ___',
        '',
        'D. Přelož:',
        '1. Musíte nosit rukavice.',
        '2. Nesmíte vstupovat.',
        '3. Po dokončení podepište.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.끝난 후에 2.먹은 후에',
        'B: 1.써야 해요 2.확인해야 해요',
        'C: 1.만지면 안 돼요 2.들어가면 안 돼요',
        'D: 1.장갑을 껴야 해요. 2.들어가면 안 돼요. 3.끝난 후에 사인하세요.'
    ],
    isWeekend: false,
    isTest: false
};

export const day284: KoreanDayData = {
    day: 284,
    date: 'ST 11.11.2026',
    title: '📚 ČERVEN #2 - Povolení a návrhy',
    vocab: [
        { kr: '허가', cz: 'povolení' },
        { kr: '제안', cz: 'návrh' }
    ],
    grammar: {
        title: 'Opakování: -아/어도 되다, -(으)ㄹ까요?, -(으)ㅂ시다',
        explanation: `ČERVNOVÁ GRAMATIKA - ČÁST 2

1. -아/어도 되다 (smět/moci):
   - 해도 돼요 = Můžete to udělat
   - Povolení nebo souhlas

2. -(으)ㄹ까요? (mám/máme?):
   - 할까요? = Mám to udělat?
   - Návrh nebo otázka

3. -(으)ㅂ시다 (pojďme):
   - 합시다 = Pojďme to udělat
   - Společný návrh

KONVERZAČNÍ POUŽITÍ:
- 쉴까요? = Odpočineme si?
- 시작합시다! = Začněme!
- 가도 돼요? = Můžu jít?`,
        examples: [
            { kr: '담배 피워도 돼요?', cz: 'Můžu si zakouřit?' },
            { kr: '여기서 쉬어도 돼요.', cz: 'Tady si můžete odpočinout.' },
            { kr: '시작할까요?', cz: 'Začneme?' },
            { kr: '뭘 할까요?', cz: 'Co budeme dělat?' },
            { kr: '시작합시다!', cz: 'Začněme!' },
            { kr: '같이 합시다.', cz: 'Udělejme to spolu.' }
        ]
    },
    exercises: [
        'A. Použij -아/어도 되다:',
        '1. 가다 → 가___ 돼요?',
        '2. 쉬다 → ___',
        '',
        'B. Použij -(으)ㄹ까요?:',
        '1. 시작하다 → ___',
        '2. 끝내다 → ___',
        '',
        'C. Použij -(으)ㅂ시다:',
        '1. 시작하다 → ___',
        '2. 가다 → ___',
        '',
        'D. Přelož:',
        '1. Můžu odejít?',
        '2. Začneme?',
        '3. Pojďme to dokončit.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.도 2.쉬어도 돼요',
        'B: 1.시작할까요? 2.끝낼까요?',
        'C: 1.시작합시다 2.갑시다',
        'D: 1.가도 돼요? 2.시작할까요? 3.끝냅시다.'
    ],
    isWeekend: false,
    isTest: false
};

export const day285: KoreanDayData = {
    day: 285,
    date: 'ČT 12.11.2026',
    title: '📚 ČERVENEC #1 - Změna stavu a rozhodnutí',
    vocab: [
        { kr: '변화', cz: 'změna' },
        { kr: '결정', cz: 'rozhodnutí' }
    ],
    grammar: {
        title: 'Opakování: -게 되다, -기로 하다',
        explanation: `ČERVENCOVÁ GRAMATIKA - ČÁST 1

1. -게 되다 (stát se, dojít k):
   - 알게 됐어요 = Dozvěděl jsem se
   - 하게 됐어요 = Došlo k tomu, že dělám
   - Neúmyslná změna nebo výsledek

2. -기로 하다 (rozhodnout se):
   - 가기로 했어요 = Rozhodl jsem se jít
   - 하기로 했어요 = Rozhodl jsem se to udělat
   - Vědomé rozhodnutí

ROZDÍL:
- -게 되다 = stalo se (mimo mou kontrolu)
- -기로 하다 = rozhodl jsem se (moje volba)`,
        examples: [
            { kr: '한국에 가게 됐어요.', cz: 'Dostal jsem se do Koreje.' },
            { kr: '철근공이 되게 됐어요.', cz: 'Stal jsem se železářem.' },
            { kr: '알게 됐어요.', cz: 'Dozvěděl jsem se to.' },
            { kr: '내일 시작하기로 했어요.', cz: 'Rozhodl jsem se začít zítra.' },
            { kr: '콘크리트로 하기로 했어요.', cz: 'Rozhodli jsme se pro beton.' }
        ]
    },
    exercises: [
        'A. Použij -게 되다:',
        '1. 알다 → ___',
        '2. 일하다 → ___',
        '3. 가다 → ___',
        '',
        'B. Použij -기로 하다:',
        '1. 시작하다 → ___',
        '2. 끝내다 → ___',
        '',
        'C. Přelož:',
        '1. Dozvěděl jsem se.',
        '2. Rozhodl jsem se odejít.',
        '3. Stal se stavbyvedoucím.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.알게 됐어요 2.일하게 됐어요 3.가게 됐어요',
        'B: 1.시작하기로 했어요 2.끝내기로 했어요',
        'C: 1.알게 됐어요. 2.가기로 했어요. 3.현장소장이 되게 됐어요.'
    ],
    isWeekend: false,
    isTest: false
};

export const day286: KoreanDayData = {
    day: 286,
    date: 'PÁ 13.11.2026',
    title: '📚 ČERVENEC #2 - Odhady a schopnosti',
    vocab: [
        { kr: '추측', cz: 'odhad' },
        { kr: '능력', cz: 'schopnost' }
    ],
    grammar: {
        title: 'Opakování: -(으)ㄴ/는 것 같다, -나 보다, -(으)ㄹ 줄 알다',
        explanation: `ČERVENCOVÁ GRAMATIKA - ČÁST 2

1. -(으)ㄴ/는 것 같다 (zdá se, myslím):
   - Přítomnost: -는 것 같아요 (하는 것 같아요)
   - Minulost: -(으)ㄴ 것 같아요 (한 것 같아요)
   - Subjektivní odhad mluvčího

2. -나 보다 (vypadá to, že):
   - 비가 오나 봐요 = Vypadá to, že prší
   - Odhad na základě pozorování

3. -(으)ㄹ 줄 알다/모르다 (umět/neumět):
   - 할 줄 알아요 = Umím to
   - 할 줄 몰라요 = Neumím to
   - Naučená dovednost`,
        examples: [
            { kr: '끝난 것 같아요.', cz: 'Zdá se, že je hotovo.' },
            { kr: '비가 올 것 같아요.', cz: 'Myslím, že bude pršet.' },
            { kr: '문제가 있나 봐요.', cz: 'Vypadá to, že je problém.' },
            { kr: '용접할 줄 알아요.', cz: 'Umím svařovat.' },
            { kr: '크레인 운전할 줄 몰라요.', cz: 'Neumím řídit jeřáb.' }
        ]
    },
    exercises: [
        'A. Použij -(으)ㄴ/는 것 같다:',
        '1. 끝나다 (minulost) → ___',
        '2. 비가 오다 (budoucnost) → ___',
        '',
        'B. Použij -나 보다:',
        '1. 아프다 → ___',
        '2. 문제가 있다 → ___',
        '',
        'C. Použij -(으)ㄹ 줄 알다/모르다:',
        '1. 용접하다 (umět) → ___',
        '2. 운전하다 (neumět) → ___',
        '',
        'D. Přelož:',
        '1. Myslím, že je hotovo.',
        '2. Vypadá to, že prší.',
        '3. Umíte svařovat?',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.끝난 것 같아요 2.비가 올 것 같아요',
        'B: 1.아픈가 봐요 2.문제가 있나 봐요',
        'C: 1.용접할 줄 알아요 2.운전할 줄 몰라요',
        'D: 1.끝난 것 같아요. 2.비가 오나 봐요. 3.용접할 줄 알아요?'
    ],
    isWeekend: false,
    isTest: false
};

export const day287: KoreanDayData = {
    day: 287,
    date: 'SO 14.11.2026',
    title: '🏆 MINI TEST 4-6 (Květen-Červenec)',
    vocab: [],
    exercises: [
        '═══════════════════════════════════════════════════════',
        'MINI TEST #2 - GRAMATIKA KVĚTEN-ČERVENEC',
        '═══════════════════════════════════════════════════════',
        '',
        'ČÁST A: VÝBĚR A SITUACE (20 bodů)',
        '1. 시멘트___모르타르 써요. (nebo)',
        '2. 일하___피곤해요. (ale/situace)',
        '',
        'ČÁST B: SLIB A POMOC (20 bodů)',
        '1. 제가 ___. (udělám to - slib)',
        '2. 도와 ___. (pomozte mi)',
        '3. 시작하___ 전에 확인해요. (před)',
        '',
        'ČÁST C: POVINNOST A ZÁKAZ (20 bodů)',
        '1. 헬멧을 ___. (musíte nosit)',
        '2. 담배 피우___. (nesmíte)',
        '3. 끝난 ___에 청소해요. (po)',
        '',
        'ČÁST D: POVOLENÍ A NÁVRHY (20 bodů)',
        '1. 가___ 돼요? (můžu jít)',
        '2. 시작___? (začneme?)',
        '3. 시작___! (začněme)',
        '',
        'ČÁST E: PŘEKLAD (20 bodů)',
        '1. Rozhodl jsem se zítra začít.',
        '2. Umím svařovat.',
        '3. Vypadá to, že je problém.',
        '4. Stal jsem se železářem.',
        '',
        '═══════════════════════════════════════════════════════',
        'ODPOVĚDI:',
        'A: 1.거나 2.는데',
        'B: 1.할게요 2.주세요 3.기',
        'C: 1.써야 해요 2.면 안 돼요 3.후',
        'D: 1.도 2.할까요 3.합시다',
        'E: 1.내일 시작하기로 했어요. 2.용접할 줄 알아요.',
        '   3.문제가 있나 봐요. 4.철근공이 되게 됐어요.',
        '',
        'HODNOCENÍ: 90-100: Výborně | 80-89: Velmi dobře | 70-79: Dobře | Pod 70: Opakovat',
        '═══════════════════════════════════════════════════════'
    ],
    isWeekend: true,
    isTest: true
};

// === TÝDEN 3: Opakování gramatiky 7-9 / Srpen-Říjen (15.11.-21.11.) ===

export const day288: KoreanDayData = {
    day: 288,
    date: 'NE 15.11.2026',
    title: '📚 SRPEN #1 - Způsobení a účel',
    vocab: [
        { kr: '목적', cz: 'účel' },
        { kr: '원인', cz: 'příčina' }
    ],
    grammar: {
        title: 'Opakování: -게 하다, -도록',
        explanation: `SRPNOVÁ GRAMATIKA - ČÁST 1

1. -게 하다 (způsobit/nechat):
   - 하게 해요 = Nechám ho to udělat
   - 알게 해요 = Dám mu vědět
   - Způsobení akce u někoho jiného

2. -도록 (aby/tak, aby):
   - 알도록 = Aby věděl
   - 끝내도록 = Aby dokončil
   - Účel nebo záměr

STAVEBNÍ KONTEXT:
- 안전하게 하세요 = Dělejte to bezpečně
- 끝내도록 해요 = Uděláme to tak, aby to bylo hotové`,
        examples: [
            { kr: '일하게 해요.', cz: 'Nechám ho pracovat.' },
            { kr: '알게 해 주세요.', cz: 'Dejte mi vědět.' },
            { kr: '안전하도록 조심하세요.', cz: 'Buďte opatrní, aby to bylo bezpečné.' },
            { kr: '끝내도록 노력해요.', cz: 'Snažíme se to dokončit.' },
            { kr: '문제가 없도록 확인해요.', cz: 'Kontrolujeme, aby nebyly problémy.' }
        ]
    },
    exercises: [
        'A. Použij -게 하다:',
        '1. 일하다 → ___',
        '2. 알다 → ___',
        '',
        'B. Použij -도록:',
        '1. 끝나다 → ___',
        '2. 안전하다 → ___',
        '',
        'C. Přelož:',
        '1. Dejte mi vědět.',
        '2. Udělejte to tak, aby to bylo bezpečné.',
        '3. Nechte ho to udělat.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.일하게 해요 2.알게 해요',
        'B: 1.끝나도록 2.안전하도록',
        'C: 1.알게 해 주세요. 2.안전하도록 하세요. 3.하게 하세요.'
    ],
    isWeekend: true,
    isTest: false
};

export const day289: KoreanDayData = {
    day: 289,
    date: 'PO 16.11.2026',
    title: '📚 SRPEN #2 - Přípustka a stupeň',
    vocab: [
        { kr: '정도', cz: 'stupeň/míra' },
        { kr: '양보', cz: 'přípustka' }
    ],
    grammar: {
        title: 'Opakování: -(으)ㄴ/는데도, -더라도, -(으)ㄹ수록, -든지, -다가',
        explanation: `SRPNOVÁ GRAMATIKA - ČÁST 2

1. -(으)ㄴ/는데도 (i když):
   - 힘든데도 = I když je to těžké
   - Silnější než -지만

2. -더라도 (i kdyby):
   - 비가 오더라도 = I kdyby pršelo
   - Hypotetická situace

3. -(으)ㄹ수록 (čím víc... tím víc):
   - 할수록 = Čím víc dělám
   - 많을수록 = Čím víc

4. -든지 (ať už... nebo):
   - 뭐든지 = Cokoli
   - 어디든지 = Kdekoli

5. -다가 (při/během a pak):
   - 하다가 = Při dělání / a pak
   - Přerušení nebo změna`,
        examples: [
            { kr: '힘든데도 열심히 해요.', cz: 'I když je to těžké, dělám pilně.' },
            { kr: '비가 오더라도 할 거예요.', cz: 'I kdyby pršelo, udělám to.' },
            { kr: '연습할수록 잘해요.', cz: 'Čím víc cvičím, tím jsem lepší.' },
            { kr: '뭐든지 해요.', cz: 'Udělám cokoli.' },
            { kr: '일하다가 다쳤어요.', cz: 'Zranil jsem se při práci.' }
        ]
    },
    exercises: [
        'A. Použij -(으)ㄴ/는데도:',
        '1. 힘들다 → ___',
        '2. 바쁘다 → ___',
        '',
        'B. Použij -(으)ㄹ수록:',
        '1. 연습하다 → ___',
        '2. 많다 → ___',
        '',
        'C. Přelož:',
        '1. I kdyby bylo nebezpečné, udělám to.',
        '2. Udělám cokoli.',
        '3. Zranil jsem se při práci.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.힘든데도 2.바쁜데도',
        'B: 1.연습할수록 2.많을수록',
        'C: 1.위험하더라도 할 거예요. 2.뭐든지 해요. 3.일하다가 다쳤어요.'
    ],
    isWeekend: false,
    isTest: false
};

export const day290: KoreanDayData = {
    day: 290,
    date: 'ÚT 17.11.2026',
    title: '📚 ZÁŘÍ #1 - Zdůraznění a málem',
    vocab: [
        { kr: '강조', cz: 'zdůraznění' },
        { kr: '위험', cz: 'nebezpečí' }
    ],
    grammar: {
        title: 'Opakování: -기는 하다, -(으)ㄹ 뻔하다',
        explanation: `ZÁŘIJOVÁ GRAMATIKA - ČÁST 1

1. -기는 하다 (ano, ale...):
   - 하기는 해요 = Ano, dělám, ale...
   - 좋기는 좋아요 = Dobré to je, ale...
   - Přiznání s výhradou

2. -(으)ㄹ 뻔하다 (málem):
   - 떨어질 뻔했어요 = Málem jsem spadl
   - 다칠 뻔했어요 = Málem jsem se zranil
   - Něco, co se skoro stalo

STAVEBNÍ BEZPEČNOST:
- 떨어질 뻔했어요! = Málem jsem spadl!
- 다칠 뻔했어요! = Málem jsem se zranil!`,
        examples: [
            { kr: '힘들기는 해요.', cz: 'Těžké to je (ale zvládám).' },
            { kr: '좋기는 좋은데 비싸요.', cz: 'Dobré to je, ale je to drahé.' },
            { kr: '떨어질 뻔했어요!', cz: 'Málem jsem spadl!' },
            { kr: '사고 날 뻔했어요.', cz: 'Málem se stala nehoda.' },
            { kr: '늦을 뻔했어요.', cz: 'Málem jsem přišel pozdě.' }
        ]
    },
    exercises: [
        'A. Použij -기는 하다:',
        '1. 힘들다 → ___',
        '2. 좋다 → ___',
        '',
        'B. Použij -(으)ㄹ 뻔하다:',
        '1. 떨어지다 → ___',
        '2. 다치다 → ___',
        '3. 죽다 → ___',
        '',
        'C. Přelož:',
        '1. Dobré to je, ale drahé.',
        '2. Málem jsem se zranil.',
        '3. Málem se stala nehoda.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.힘들기는 해요 2.좋기는 좋아요',
        'B: 1.떨어질 뻔했어요 2.다칠 뻔했어요 3.죽을 뻔했어요',
        'C: 1.좋기는 좋은데 비싸요. 2.다칠 뻔했어요. 3.사고 날 뻔했어요.'
    ],
    isWeekend: false,
    isTest: false
};

export const day291: KoreanDayData = {
    day: 291,
    date: 'ST 18.11.2026',
    title: '📚 ZÁŘÍ #2 - Dokončení a hodnocení',
    vocab: [
        { kr: '완료', cz: 'dokončení' },
        { kr: '평가', cz: 'hodnocení' }
    ],
    grammar: {
        title: 'Opakování: -아/어 버리다, -고 말다, -(으)ㄹ 만하다',
        explanation: `ZÁŘIJOVÁ GRAMATIKA - ČÁST 2

1. -아/어 버리다 (kompletně/bohužel):
   - 끝내 버렸어요 = Úplně jsem dokončil
   - 잊어 버렸어요 = Úplně jsem zapomněl
   - Dokončení nebo litování

2. -고 말다 (nakonec):
   - 하고 말았어요 = Nakonec jsem to udělal
   - 떨어지고 말았어요 = Nakonec spadl
   - Nevyhnutelný výsledek

3. -(으)ㄹ 만하다 (stojí za to):
   - 할 만해요 = Stojí to za to
   - 먹을 만해요 = Dá se to jíst
   - Hodnocení kvality`,
        examples: [
            { kr: '다 끝내 버렸어요.', cz: 'Úplně jsem to dokončil.' },
            { kr: '잊어 버렸어요.', cz: 'Úplně jsem zapomněl.' },
            { kr: '결국 실패하고 말았어요.', cz: 'Nakonec jsem selhal.' },
            { kr: '이 도구는 쓸 만해요.', cz: 'Tento nástroj stojí za to.' },
            { kr: '힘들지만 할 만해요.', cz: 'Je to těžké, ale dá se to.' }
        ]
    },
    exercises: [
        'A. Použij -아/어 버리다:',
        '1. 끝내다 → ___',
        '2. 잊다 → ___',
        '',
        'B. Použij -고 말다:',
        '1. 실패하다 → ___',
        '2. 떨어지다 → ___',
        '',
        'C. Použij -(으)ㄹ 만하다:',
        '1. 쓰다 → ___',
        '2. 하다 → ___',
        '',
        'D. Přelož:',
        '1. Úplně jsem to zapomněl.',
        '2. Nakonec jsem to udělal.',
        '3. Stojí to za to.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.끝내 버렸어요 2.잊어 버렸어요',
        'B: 1.실패하고 말았어요 2.떨어지고 말았어요',
        'C: 1.쓸 만해요 2.할 만해요',
        'D: 1.잊어 버렸어요. 2.하고 말았어요. 3.할 만해요.'
    ],
    isWeekend: false,
    isTest: false
};

export const day292: KoreanDayData = {
    day: 292,
    date: 'ČT 19.11.2026',
    title: '📚 ŘÍJEN #1 - Příčina a odhad',
    vocab: [
        { kr: '결과', cz: 'výsledek' },
        { kr: '계산', cz: 'výpočet' }
    ],
    grammar: {
        title: 'Opakování: -는 바람에, -(으)ㄴ/는 셈이다',
        explanation: `ŘÍJNOVÁ GRAMATIKA - ČÁST 1

1. -는 바람에 (kvůli tomu, že):
   - 비가 오는 바람에 = Kvůli tomu, že prší
   - 늦는 바람에 = Kvůli zpoždění
   - Negativní příčina (neplánovaná)

2. -(으)ㄴ/는 셈이다 (v podstatě/de facto):
   - 끝난 셈이에요 = V podstatě je to hotové
   - 하는 셈이에요 = Jako bych dělal
   - Přibližný odhad nebo výsledek

STAVEBNÍ KONTEXT:
- 재료가 없는 바람에 못 해요 = Kvůli chybějícímu materiálu nemůžu
- 거의 끝난 셈이에요 = V podstatě je to hotové`,
        examples: [
            { kr: '비가 오는 바람에 공사가 멈췄어요.', cz: 'Kvůli dešti se stavba zastavila.' },
            { kr: '자재가 늦는 바람에 기다려요.', cz: 'Kvůli zpožděnému materiálu čekáme.' },
            { kr: '거의 끝난 셈이에요.', cz: 'V podstatě je to hotové.' },
            { kr: '공짜로 한 셈이에요.', cz: 'V podstatě jsem to udělal zadarmo.' }
        ]
    },
    exercises: [
        'A. Použij -는 바람에:',
        '1. 비가 오다 → ___',
        '2. 자재가 늦다 → ___',
        '',
        'B. Použij -(으)ㄴ/는 셈이다:',
        '1. 끝나다 → ___',
        '2. 하다 → ___',
        '',
        'C. Přelož:',
        '1. Kvůli dešti jsme zastavili.',
        '2. V podstatě je to hotové.',
        '3. Kvůli nehodě se práce zpozdila.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.비가 오는 바람에 2.자재가 늦는 바람에',
        'B: 1.끝난 셈이에요 2.하는 셈이에요',
        'C: 1.비가 오는 바람에 멈췄어요. 2.거의 끝난 셈이에요. 3.사고 나는 바람에 일이 늦었어요.'
    ],
    isWeekend: false,
    isTest: false
};

export const day293: KoreanDayData = {
    day: 293,
    date: 'PÁ 20.11.2026',
    title: '📚 ŘÍJEN #2 - Způsob a hned',
    vocab: [
        { kr: '방법', cz: 'způsob' },
        { kr: '즉시', cz: 'ihned' }
    ],
    grammar: {
        title: 'Opakování: -는 대로',
        explanation: `ŘÍJNOVÁ GRAMATIKA - ČÁST 2

1. -는 대로 (tak jak/hned jak):
   DVA VÝZNAMY:

   A) Způsob "tak jak":
   - 하는 대로 해요 = Dělejte to tak, jak se to dělá
   - 말하는 대로 해요 = Dělejte, jak říkám

   B) Čas "hned jak":
   - 끝나는 대로 가요 = Hned jak skončí, jdu
   - 도착하는 대로 연락해요 = Hned jak dorazím, ozvů se

STAVEBNÍ KONTEXT:
- 도면대로 해요 = Dělejte podle výkresu
- 끝나는 대로 청소해요 = Hned jak skončí, uklidíme`,
        examples: [
            { kr: '도면대로 하세요.', cz: 'Dělejte podle výkresu.' },
            { kr: '말하는 대로 해요.', cz: 'Dělám, jak říkáte.' },
            { kr: '끝나는 대로 연락해요.', cz: 'Hned jak skončím, ozvů se.' },
            { kr: '도착하는 대로 시작해요.', cz: 'Hned jak dorazíme, začneme.' },
            { kr: '계획대로 해요.', cz: 'Děláme podle plánu.' }
        ]
    },
    exercises: [
        'A. Použij -는 대로 (způsob):',
        '1. 도면 → ___',
        '2. 말하다 → ___',
        '',
        'B. Použij -는 대로 (čas):',
        '1. 끝나다 → ___',
        '2. 도착하다 → ___',
        '',
        'C. Přelož:',
        '1. Dělejte podle výkresu.',
        '2. Hned jak skončím, ozvů se.',
        '3. Dělám, jak říkáte.',
        '',
        '=== ODPOVĚDI ===',
        'A: 1.도면대로 2.말하는 대로',
        'B: 1.끝나는 대로 2.도착하는 대로',
        'C: 1.도면대로 하세요. 2.끝나는 대로 연락할게요. 3.말하는 대로 해요.'
    ],
    isWeekend: false,
    isTest: false
};

export const day294: KoreanDayData = {
    day: 294,
    date: 'SO 21.11.2026',
    title: '🏆 MINI TEST 7-9 (Srpen-Říjen)',
    vocab: [],
    exercises: [
        '═══════════════════════════════════════════════════════',
        'MINI TEST #3 - GRAMATIKA SRPEN-ŘÍJEN',
        '═══════════════════════════════════════════════════════',
        '',
        'ČÁST A: ZPŮSOBENÍ A ÚČEL (20 bodů)',
        '1. 알___ 해 주세요. (dejte mi vědět)',
        '2. 안전하___ 조심하세요. (aby to bylo bezpečné)',
        '',
        'ČÁST B: PŘÍPUSTKA A STUPEŇ (20 bodů)',
        '1. 힘든___ 해요. (i když je to těžké)',
        '2. 연습___수록 잘해요. (čím víc)',
        '3. 뭐___ 해요. (cokoli)',
        '',
        'ČÁST C: ZDŮRAZNĚNÍ A MÁLEM (20 bodů)',
        '1. 힘들___ 해요. (těžké to je, ale...)',
        '2. 떨어___ 뻔했어요. (málem jsem spadl)',
        '',
        'ČÁST D: DOKONČENÍ A HODNOCENÍ (20 bodů)',
        '1. 끝내 ___. (úplně jsem dokončil)',
        '2. 결국 실패하___ 말았어요. (nakonec)',
        '3. 쓸 ___. (stojí to za to)',
        '',
        'ČÁST E: PŘEKLAD (20 bodů)',
        '1. Kvůli dešti jsme zastavili.',
        '2. V podstatě je to hotové.',
        '3. Dělejte podle výkresu.',
        '4. Hned jak skončím, ozvů se.',
        '',
        '═══════════════════════════════════════════════════════',
        'ODPOVĚDI:',
        'A: 1.게 2.도록',
        'B: 1.데도 2.할 3.든지',
        'C: 1.기는 2.질',
        'D: 1.버렸어요 2.고 3.만해요',
        'E: 1.비가 오는 바람에 멈췄어요. 2.거의 끝난 셈이에요.',
        '   3.도면대로 하세요. 4.끝나는 대로 연락할게요.',
        '',
        'HODNOCENÍ: 90-100: Výborně | 80-89: Velmi dobře | 70-79: Dobře | Pod 70: Opakovat',
        '═══════════════════════════════════════════════════════'
    ],
    isWeekend: true,
    isTest: true
};

// === TÝDEN 4: FINÁLNÍ TESTY (22.11.-30.11.) ===

export const day295: KoreanDayData = {
    day: 295,
    date: 'NE 22.11.2026',
    title: '📝 Slovíčka marathon #1 (1-700)',
    vocab: [
        { kr: '마라톤', cz: 'maraton' },
        { kr: '시작', cz: 'začátek' }
    ],
    tasks: [
        '=== SLOVÍČKA MARATHON DEN 1 ===',
        '',
        'CÍL: Zopakovat slovíčka 1-700 (Únor-Duben)',
        '',
        'PROGRAM:',
        '• Hodina 1-2: Únor - základní slovíčka (220)',
        '• Hodina 3-4: Březen - slovesa a jídlo (200)',
        '• Hodina 5-6: Duben - příroda a práce (280)',
        '• Hodina 7-8: Anki session - všech 700',
        '',
        'METODA:',
        '1. Projdi Anki kartičky',
        '2. Označ slova, která neznáš',
        '3. Zapiš problematická slova',
        '4. Zopakuj problematická slova 3×',
        '',
        'KATEGORIE:',
        '• Pozdravy a základy',
        '• Čísla (sino + nativní)',
        '• Jídlo a nápoje',
        '• Místa a doprava',
        '• Přídavná jména',
        '• Základní slovesa',
        '• Emoce a stavy'
    ],
    isWeekend: true,
    isTest: false
};

export const day296: KoreanDayData = {
    day: 296,
    date: 'PO 23.11.2026',
    title: '📝 Slovíčka marathon #2 (701-1400)',
    vocab: [],
    tasks: [
        '=== SLOVÍČKA MARATHON DEN 2 ===',
        '',
        'CÍL: Zopakovat slovíčka 701-1400 (Květen-Červenec)',
        '',
        'PROGRAM:',
        '• Hodina 1-2: Květen - stavební základ (230)',
        '• Hodina 3-4: Červen - materiály (220)',
        '• Hodina 5-6: Červenec - procesy (250)',
        '• Hodina 7-8: Anki session - všech 700',
        '',
        'KATEGORIE:',
        '• Stavební nástroje',
        '• Stavební materiály',
        '• Stavební procesy',
        '• Bezpečnost na stavbě',
        '• Základní profese'
    ],
    isWeekend: false,
    isTest: false
};

export const day297: KoreanDayData = {
    day: 297,
    date: 'ÚT 24.11.2026',
    title: '📝 Slovíčka marathon #3 (1401-2000)',
    vocab: [],
    tasks: [
        '=== SLOVÍČKA MARATHON DEN 3 ===',
        '',
        'CÍL: Zopakovat slovíčka 1401-2000 (Srpen-Listopad)',
        '',
        'PROGRAM:',
        '• Hodina 1-2: Srpen - pokročilé stavebnictví (200)',
        '• Hodina 3-4: Září - instalace (200)',
        '• Hodina 5-6: Říjen - profese a dokončování (200)',
        '• Hodina 7-8: Anki session - všech 600',
        '',
        'KATEGORIE:',
        '• Pokročilé stavební procesy',
        '• Elektrické a instalační práce',
        '• Stavební profese',
        '• Dokončovací práce',
        '• Administrativní termíny'
    ],
    isWeekend: false,
    isTest: false
};

export const day298: KoreanDayData = {
    day: 298,
    date: 'ST 25.11.2026',
    title: '🔧 Stavební slovíčka focus #1',
    vocab: [],
    tasks: [
        '=== STAVEBNÍ SLOVÍČKA FOCUS DEN 1 ===',
        '',
        'CÍL: Intenzivní opakování stavebních termínů',
        '',
        'KATEGORIE DNES:',
        '',
        '1. MATERIÁLY (100 slov):',
        '   시멘트, 콘크리트, 철근, 모래, 자갈...',
        '   석고보드, 단열재, 방수재, 몰탈...',
        '',
        '2. NÁSTROJE (100 slov):',
        '   망치, 드릴, 톱, 삽, 줄자...',
        '   수평기, 레이저, 앵글그라인더...',
        '',
        'METODA:',
        '• Flashcards s obrázky',
        '• Použití ve větách',
        '• Párování KR-CZ'
    ],
    isWeekend: false,
    isTest: false
};

export const day299: KoreanDayData = {
    day: 299,
    date: 'ČT 26.11.2026',
    title: '🔧 Stavební slovíčka focus #2',
    vocab: [],
    tasks: [
        '=== STAVEBNÍ SLOVÍČKA FOCUS DEN 2 ===',
        '',
        'CÍL: Intenzivní opakování stavebních termínů',
        '',
        'KATEGORIE DNES:',
        '',
        '1. PROCESY (100 slov):',
        '   굴착, 타설, 양생, 철근배근...',
        '   미장, 도장, 방수, 단열...',
        '',
        '2. BEZPEČNOST (50 slov):',
        '   헬멧, 안전화, 장갑, 안전벨트...',
        '   위험, 주의, 금지, 허가...',
        '',
        '3. PROFESE (50 slov):',
        '   현장소장, 철근공, 목수, 전기공...',
        '   용접공, 배관공, 미장공...',
        '',
        'METODA:',
        '• Situační dialogy',
        '• Role-play na stavbě',
        '• Popis procesů korejsky'
    ],
    isWeekend: false,
    isTest: false
};

export const day300: KoreanDayData = {
    day: 300,
    date: 'PÁ 27.11.2026',
    title: '🔧 Stavební slovíčka focus #3',
    vocab: [],
    tasks: [
        '=== STAVEBNÍ SLOVÍČKA FOCUS DEN 3 ===',
        '',
        'CÍL: Finální opakování a test stavební terminologie',
        '',
        'PROGRAM:',
        '',
        '• Hodina 1-2: Rychlý průchod všech 400 stavebních slov',
        '• Hodina 3-4: Problematická slovíčka',
        '• Hodina 5-6: Mini-test stavební terminologie',
        '• Hodina 7-8: Konverzační praxe',
        '',
        'MINI-TEST STAVEBNÍ TERMINOLOGIE:',
        '',
        'A. Materiály (10 slov)',
        'B. Nástroje (10 slov)',
        'C. Procesy (10 slov)',
        'D. Bezpečnost (10 slov)',
        'E. Profese (10 slov)',
        '',
        'CÍL: Minimálně 90% správně'
    ],
    isWeekend: false,
    isTest: true
};

export const day301: KoreanDayData = {
    day: 301,
    date: 'SO 28.11.2026',
    title: '🎯 SIMULACE TOPIK',
    vocab: [],
    exercises: [
        '═══════════════════════════════════════════════════════',
        'SIMULACE TOPIK - PŘÍPRAVA NA CERTIFIKACI',
        '═══════════════════════════════════════════════════════',
        '',
        'ČAS: 3 hodiny',
        '',
        'ČÁST 1: SLOVNÍ ZÁSOBA (40 minut)',
        '• 50 otázek na slovíčka',
        '• Výběr správného slova',
        '• Doplnění věty',
        '',
        'ČÁST 2: GRAMATIKA (40 minut)',
        '• 30 otázek na gramatiku',
        '• Výběr správné formy',
        '• Oprava chyb',
        '',
        'ČÁST 3: ČTENÍ (50 minut)',
        '• 3 texty s otázkami',
        '• Porozumění textu',
        '• Hlavní myšlenka',
        '',
        'ČÁST 4: POSLECH (40 minut)',
        '• 20 audio nahrávek',
        '• Krátké dialogy',
        '• Delší monology',
        '',
        'ČÁST 5: PSANÍ (30 minut)',
        '• 2 krátké eseje',
        '• Popis situace',
        '• Vyjádření názoru',
        '',
        '═══════════════════════════════════════════════════════',
        'HODNOCENÍ:',
        '• 180-200 bodů: Připraven na TOPIK II',
        '• 160-179 bodů: Velmi dobře, drobné nedostatky',
        '• 140-159 bodů: Dobře, potřeba procvičit slabší oblasti',
        '• Pod 140 bodů: Doporučeno intenzivní opakování',
        '═══════════════════════════════════════════════════════'
    ],
    isWeekend: true,
    isTest: true
};

export const day302: KoreanDayData = {
    day: 302,
    date: 'NE 29.11.2026',
    title: '🏆 FINÁLNÍ KOMPLETNÍ TEST',
    vocab: [],
    exercises: [
        '═══════════════════════════════════════════════════════',
        'FINÁLNÍ TEST - KOREJŠTINA B1',
        '═══════════════════════════════════════════════════════',
        '',
        'ČÁST A: SLOVÍČKA (100 bodů)',
        '',
        'A1. KR→CZ (50 slov) - 50 bodů',
        '    Přelož z korejštiny do češtiny',
        '',
        'A2. CZ→KR (50 slov) - 50 bodů',
        '    Přelož z češtiny do korejštiny',
        '',
        '───────────────────────────────────────────────────────',
        '',
        'ČÁST B: GRAMATIKA (100 bodů)',
        '',
        'B1. Částice (20 bodů)',
        '    은/는, 이/가, 을/를, 에, 에서, 도, (으)로',
        '',
        'B2. Časy (20 bodů)',
        '    Přítomný, minulý, budoucí, průběhový',
        '',
        'B3. Zápor (10 bodů)',
        '    안, 못, -지 않다, -지 못하다',
        '',
        'B4. Spojování vět (20 bodů)',
        '    -고, -아서/어서, -(으)면, -지만, -는데',
        '',
        'B5. Modální struktury (30 bodů)',
        '    -고 싶다, -(으)ㄹ 수 있다, -아/어야 하다, -(으)면 안 되다,',
        '    -아/어도 되다, -(으)ㄹ까요?, -(으)ㅂ시다',
        '',
        '───────────────────────────────────────────────────────',
        '',
        'ČÁST C: PŘEKLAD (50 bodů)',
        '',
        'C1. CZ→KR (25 vět) - 25 bodů',
        '',
        'C2. KR→CZ (25 vět) - 25 bodů',
        '',
        '───────────────────────────────────────────────────────',
        '',
        'ČÁST D: STAVEBNÍ TERMINOLOGIE (50 bodů)',
        '',
        'D1. Materiály (10 bodů)',
        '    시멘트, 콘크리트, 철근, 석고보드, 단열재...',
        '',
        'D2. Nástroje (10 bodů)',
        '    망치, 드릴, 톱, 줄자, 수평기...',
        '',
        'D3. Procesy (10 bodů)',
        '    굴착, 타설, 양생, 철근배근, 미장...',
        '',
        'D4. Bezpečnost (10 bodů)',
        '    헬멧, 안전화, 위험, 금지, 허가...',
        '',
        'D5. Profese (10 bodů)',
        '    현장소장, 철근공, 목수, 전기공, 용접공...',
        '',
        '───────────────────────────────────────────────────────',
        '',
        'ČÁST E: POSLECH (50 bodů)',
        '',
        'E1. Krátké věty (10 bodů)',
        '    Porozumění jednoduchým pokynům',
        '',
        'E2. Dialog (20 bodů)',
        '    Konverzace na stavbě',
        '',
        'E3. Monolog (20 bodů)',
        '    Popis procesu nebo situace',
        '',
        '───────────────────────────────────────────────────────',
        '',
        'ČÁST F: KONVERZACE (50 bodů)',
        '',
        'F1. Představení (10 bodů)',
        '    Představte se korejsky (jméno, práce, odkud jste)',
        '',
        'F2. Pracovní situace (20 bodů)',
        '    Popište svou práci, použijte stavební termíny',
        '',
        'F3. Nouzová situace (20 bodů)',
        '    Vysvětlete problém, požádejte o pomoc',
        '',
        '═══════════════════════════════════════════════════════',
        '',
        'CELKEM: 400 bodů',
        '',
        '═══════════════════════════════════════════════════════',
        '',
        'HODNOCENÍ:',
        '',
        '360-400 bodů: VÝBORNĚ!',
        '  → Připraven na TOPIK II',
        '  → Solidní B1 úroveň',
        '  → Můžeš komunikovat na stavbě',
        '',
        '320-359 bodů: VELMI DOBŘE',
        '  → Solidní B1 základ',
        '  → Drobné nedostatky k doplnění',
        '  → Pokračuj v praxi',
        '',
        '280-319 bodů: DOBŘE',
        '  → A2+ úroveň',
        '  → Potřeba více praxe',
        '  → Zaměř se na slabší oblasti',
        '',
        'Pod 280 bodů: POTŘEBA OPAKOVÁNÍ',
        '  → Identifikuj slabé oblasti',
        '  → Intenzivní opakování',
        '  → Nevzdávej se!',
        '',
        '═══════════════════════════════════════════════════════'
    ],
    isWeekend: true,
    isTest: true
};

export const day303: KoreanDayData = {
    day: 303,
    date: 'PO 30.11.2026',
    title: '🎉 VYHODNOCENÍ A PLÁN',
    vocab: [
        { kr: '축하합니다', cz: 'gratulujeme' },
        { kr: '성공', cz: 'úspěch' },
        { kr: '미래', cz: 'budoucnost' },
        { kr: '계속', cz: 'pokračování' }
    ],
    tasks: [
        '═══════════════════════════════════════════════════════',
        '🎉 GRATULACE! DOKONČIL JSI 10MĚSÍČNÍ STUDIJNÍ PLÁN! 🎉',
        '═══════════════════════════════════════════════════════',
        '',
        'CO JSI DOSÁHL:',
        '',
        '✓ 2000 slovíček',
        '✓ 50 gramatických struktur',
        '✓ 400 stavebních termínů',
        '✓ Úroveň B1',
        '✓ Schopnost komunikovat na stavbě',
        '',
        '═══════════════════════════════════════════════════════',
        '',
        'VYHODNOCENÍ FINÁLNÍHO TESTU:',
        '',
        '[ ] Zapiš své výsledky:',
        '    Část A (Slovíčka): ___/100',
        '    Část B (Gramatika): ___/100',
        '    Část C (Překlad): ___/50',
        '    Část D (Stavební): ___/50',
        '    Část E (Poslech): ___/50',
        '    Část F (Konverzace): ___/50',
        '    CELKEM: ___/400',
        '',
        '═══════════════════════════════════════════════════════',
        '',
        'PLÁN DALŠÍHO STUDIA:',
        '',
        '1. PROSINEC-LEDEN: TOPIK příprava',
        '   • Registrace na TOPIK II',
        '   • Procvičování testových úloh',
        '   • Focus na čtení a poslech',
        '',
        '2. PRŮBĚŽNĚ: Udržování úrovně',
        '   • Denně 30 minut Anki',
        '   • Týdně 1 hodina konverzace',
        '   • Korejská média (YouTube, drama)',
        '',
        '3. PRAXE: Použití na stavbě',
        '   • Komunikace s korejskými kolegy',
        '   • Čtení technické dokumentace',
        '   • Účast na meetingech',
        '',
        '═══════════════════════════════════════════════════════',
        '',
        '열심히 공부해서 정말 대단해요!',
        '(Pilně jsi studoval, jsi opravdu skvělý!)',
        '',
        '앞으로도 화이팅!',
        '(Hodně štěstí i nadále!)',
        '',
        '═══════════════════════════════════════════════════════'
    ],
    isWeekend: false,
    isTest: false
};

// === EXPORT ===

export const novemberDays: KoreanDayData[] = [
    day274, day275, day276, day277, day278, day279, day280,
    day281, day282, day283, day284, day285, day286, day287,
    day288, day289, day290, day291, day292, day293, day294,
    day295, day296, day297, day298, day299, day300,
    day301, day302, day303
];

export const novemberData: KoreanMonthData = {
    month: 10,
    nameKR: '11월 - 마무리',
    nameCZ: 'LISTOPAD 2026 - MĚSÍC 10/10 - FINÁLE',
    targetLevel: 'B1',
    targetWords: 60,
    totalWords: 2000,
    goals: [
        'Kompletní opakování všech 50 gramatik',
        'Opakování všech 2000 slov',
        'Finální testy',
        'Certifikace úrovně B1'
    ],
    grammarOverview: [], // Opakování - žádná nová gramatika
    weeks: [
        {
            weekNumber: 1,
            dateRange: '1.-7.11.',
            theme: 'Opakování gramatiky Únor-Duben',
            days: [274, 275, 276, 277, 278, 279, 280]
        },
        {
            weekNumber: 2,
            dateRange: '8.-14.11.',
            theme: 'Opakování gramatiky Květen-Červenec',
            days: [281, 282, 283, 284, 285, 286, 287]
        },
        {
            weekNumber: 3,
            dateRange: '15.-21.11.',
            theme: 'Opakování gramatiky Srpen-Říjen',
            days: [288, 289, 290, 291, 292, 293, 294]
        },
        {
            weekNumber: 4,
            dateRange: '22.-30.11.',
            theme: 'Finální testy a vyhodnocení',
            days: [295, 296, 297, 298, 299, 300, 301, 302, 303]
        }
    ],
    days: novemberDays
};

export default novemberData;
