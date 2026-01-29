/**
 * March 2026 - Days 43-59 (Week 3-4+)
 * Agent 2B output
 * 
 * Období: 16.3.2026 - 1.4.2026
 * Témata: Doprava, počasí, cestování, letiště
 * Gramatika: -(으)면, -아서/어서, -지만, 부터/까지, 동안, -기 전에, -(으)ㄴ 후에
 */

import type { KoreanDayData } from '../types/study-db';

// ============ DEN 43 - PO 16.3.2026 ============
const day43: KoreanDayData = {
    day: 43,
    date: 'PO 16.3.2026',
    title: '🚌 Doprava městská',
    vocab: [
        { kr: '버스', cz: 'autobus' },
        { kr: '지하철', cz: 'metro' },
        { kr: '택시', cz: 'taxi' },
        { kr: '정류장', cz: 'zastávka' },
        { kr: '역', cz: 'stanice' },
        { kr: '노선', cz: 'linka' },
        { kr: '환승', cz: 'přestup' },
        { kr: '요금', cz: 'jízdné' },
        { kr: '교통카드', cz: 'dopravní karta' },
        { kr: '배차', cz: 'interval spojů' }
    ],
    grammar: {
        title: '-(으)면 - když/jestli (rozšíření)',
        explanation: `Částice -(으)면 vyjadřuje podmínku (když, jestli).

TVARY:
• Po samohlásce nebo ㄹ: -면
• Po souhlásce: -으면

POUŽITÍ V DOPRAVĚ:
버스를 타면... (Když pojedeš autobusem...)
지하철이 오면... (Když přijede metro...)
환승하면... (Když přestoupíš...)

KOMBINACE S BUDOUCÍM ČASEM:
비가 오면 택시를 탈 거예요
(Když bude pršet, vezmu taxi)`,
        examples: [
            { kr: '역에 도착하면 전화하세요', cz: 'Až dorazíš na stanici, zavolej' },
            { kr: '버스가 없으면 지하철을 타세요', cz: 'Když nebude autobus, jeďte metrem' },
            { kr: '시간이 있으면 같이 가요', cz: 'Jestli máš čas, pojďme spolu' },
            { kr: '날씨가 좋으면 걸어갈게요', cz: 'Když bude hezky, půjdu pěšky' },
            { kr: '교통카드가 없으면 현금으로 내세요', cz: 'Když nemáš kartu, zaplať hotově' }
        ]
    },
    tasks: [
        'Napiš 10 dopravních slov 3×',
        'Vytvoř 5 vět s -(으)면 o dopravě',
        'Zeptej se přítelkyně jak jezdit v Soulu',
        'Přidej do Anki'
    ],
    exercises: [
        '버스___ 타다 (을/를) → 를',
        '역___ 도착하다 (에/에서) → 에',
        '지하철___ 오다 + 면 → 오면',
        '환승하다 + 면 → 환승하면',
        '시간이 없다 + 면 → 없으면'
    ],
    notes: [
        'V Soulu: T-money karta funguje na metro i autobus',
        'TIP: 환승 = přestup do 30 minut je zdarma',
        '역 se používá pro metro i vlak'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 44 - ÚT 17.3.2026 ============
const day44: KoreanDayData = {
    day: 44,
    date: 'ÚT 17.3.2026',
    title: '🎫 Jízdenky a časy',
    vocab: [
        { kr: '표', cz: 'jízdenka' },
        { kr: '편도', cz: 'jednosměrná' },
        { kr: '왕복', cz: 'zpáteční' },
        { kr: '출발', cz: 'odjezd' },
        { kr: '도착', cz: 'příjezd' },
        { kr: '시간표', cz: 'jízdní řád' },
        { kr: '첫차', cz: 'první spoj' },
        { kr: '막차', cz: 'poslední spoj' },
        { kr: '지연', cz: 'zpoždění' },
        { kr: '정시', cz: 'včas' }
    ],
    grammar: {
        title: '-아서/어서 - protože (rozšíření)',
        explanation: `Částice -아서/어서 vyjadřuje příčinu nebo důvod.

TVARY:
• Kmen končí na ㅏ nebo ㅗ: -아서
• Ostatní: -어서
• 하다: -해서

DŮLEŽITÉ:
-아서/어서 NELZE použít s rozkazem nebo návrhem!
• ❌ 배고파서 먹으세요 (špatně)
• ✅ 배고프니까 드세요 (správně)

V MINULÉM ČASE se -아서/어서 nemění!
• 늦어서 (protože jsem měl zpoždění) - NE ~~늦었어서~~`,
        examples: [
            { kr: '늦어서 택시를 탔어요', cz: 'Protože jsem měl zpoždění, vzal jsem taxi' },
            { kr: '막차가 없어서 걸었어요', cz: 'Protože nebyl poslední spoj, šel jsem pěšky' },
            { kr: '버스가 지연되어서 늦었어요', cz: 'Protože měl autobus zpoždění, přišel jsem pozdě' },
            { kr: '시간이 없어서 서둘렀어요', cz: 'Protože jsem neměl čas, spěchal jsem' },
            { kr: '표가 비싸서 안 샀어요', cz: 'Protože byla jízdenka drahá, nekoupil jsem ji' }
        ]
    },
    tasks: [
        'Napiš 10 slovíček 3×',
        'Vytvoř 5 vět s -아서/어서 o dopravě',
        'Procvič rozdíl 편도 vs 왕복',
        'Přidej do Anki'
    ],
    exercises: [
        '편도 표 주세요 = ___',
        '왕복 표가 얼마예요? = ___',
        '첫차가 몇 시예요? = ___',
        '막차를 놓치다 + 아서/어서 → 놓쳐서',
        '지연되다 + 아서/어서 → 지연되어서'
    ],
    notes: [
        '첫차 je obvykle kolem 5:30',
        '막차 je obvykle kolem 23:30-24:00',
        'KTX (rychlovlak) může mít zpoždění v zimě'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 45 - ST 18.3.2026 ============
const day45: KoreanDayData = {
    day: 45,
    date: 'ST 18.3.2026',
    title: '🧭 Směry ve městě',
    vocab: [
        { kr: '직진', cz: 'rovně' },
        { kr: '좌회전', cz: 'odbočit vlevo' },
        { kr: '우회전', cz: 'odbočit vpravo' },
        { kr: '유턴', cz: 'otočit se' },
        { kr: '횡단보도', cz: 'přechod' },
        { kr: '신호등', cz: 'semafor' },
        { kr: '교차로', cz: 'křižovatka' },
        { kr: '사거리', cz: 'čtyřcestí' },
        { kr: '삼거리', cz: 'trojcestí' },
        { kr: '골목', cz: 'ulička' }
    ],
    grammar: {
        title: '-지만 - ale, avšak',
        explanation: `Částice -지만 vyjadřuje kontrast nebo protiklad.

TVAR:
• Kmen slovesa/přídavného jména + 지만

POUŽITÍ:
Připojuje se přímo ke kmeni, bez ohledu na čas.
Čas se vyjadřuje v hlavní větě.

PŘÍKLADY:
비싸다 + 지만 → 비싸지만 (je to drahé, ale...)
멀다 + 지만 → 멀지만 (je to daleko, ale...)
좋다 + 지만 → 좋지만 (je to dobré, ale...)`,
        examples: [
            { kr: '비싸지만 좋아요', cz: 'Je to drahé, ale dobré' },
            { kr: '멀지만 가고 싶어요', cz: 'Je to daleko, ale chci jet' },
            { kr: '힘들지만 재미있어요', cz: 'Je to náročné, ale zábavné' },
            { kr: '길이 복잡하지만 찾을 수 있어요', cz: 'Cesta je složitá, ale najdu ji' },
            { kr: '택시가 빠르지만 비싸요', cz: 'Taxi je rychlé, ale drahé' }
        ]
    },
    tasks: [
        'Napiš 10 směrových slov 3×',
        'Vytvoř 5 vět s -지만',
        'Procvič popisy cesty',
        'Přidej do Anki'
    ],
    exercises: [
        '직진하세요 = ___',
        '좌회전하세요 = ___',
        '사거리에서 우회전하세요 = ___',
        '멀다 + 지만 → 멀지만',
        '가깝다 + 지만 → 가깝지만'
    ],
    notes: [
        '직진 = 곧장 (obě znamenají "rovně")',
        'V Soulu je mnoho 사거리 (čtyřcestí)',
        '골목 = úzká ulička mezi budovami'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 46 - ČT 19.3.2026 ============
const day46: KoreanDayData = {
    day: 46,
    date: 'ČT 19.3.2026',
    title: '❓ Ptaní se na cestu',
    vocab: [
        { kr: '어떻게 가요?', cz: 'jak se dostanu?' },
        { kr: '얼마나 걸려요?', cz: 'jak dlouho to trvá?' },
        { kr: '여기서 가까워요?', cz: 'je to odsud blízko?' },
        { kr: '몇 번 버스예요?', cz: 'jaké číslo autobusu?' },
        { kr: '어디서 내려요?', cz: 'kde vystoupit?' },
        { kr: '갈아타야 해요?', cz: 'musím přestoupit?' },
        { kr: '여기가 어디예요?', cz: 'kde to jsem?' },
        { kr: '길을 잃었어요', cz: 'ztratil jsem se' },
        { kr: '지도', cz: 'mapa' },
        { kr: '네비게이션', cz: 'navigace' }
    ],
    grammar: {
        title: '부터/까지 - od/do',
        explanation: `Částice 부터 a 까지 vyjadřují začátek a konec.

POUŽITÍ:
• 부터 = od (začátek)
• 까지 = do (konec)
• Často se používají společně

ČAS:
9시부터 6시까지 = od 9 do 6

MÍSTO:
여기부터 저기까지 = odtud dotamtud

DEN:
월요일부터 금요일까지 = od pondělí do pátku`,
        examples: [
            { kr: '9시부터 6시까지 일해요', cz: 'Pracuji od 9 do 6' },
            { kr: '여기부터 저기까지 걸어가세요', cz: 'Jděte pěšky odtud dotamtud' },
            { kr: '월요일부터 금요일까지 바빠요', cz: 'Od pondělí do pátku jsem zaneprázdněný' },
            { kr: '서울역부터 부산역까지 2시간 반이에요', cz: 'Ze stanice Soul do Pusanu je to 2,5 hodiny' },
            { kr: '처음부터 끝까지', cz: 'Od začátku do konce' }
        ]
    },
    tasks: [
        'Napiš 10 frází 3×',
        'Vytvoř 5 vět s 부터/까지',
        'Role-play: Ptej se na cestu',
        'Přidej do Anki'
    ],
    exercises: [
        '여기___ 얼마나 걸려요? (부터/까지) → 까지',
        '9시___ 시작해요 (부터/까지) → 부터',
        '서울___ 부산___ (부터/까지) → 서울부터 부산까지',
        '어디서 내려요? = ___',
        '갈아타야 해요? = ___'
    ],
    notes: [
        'V Soulu: Naver Map nebo Kakao Map jsou lepší než Google Maps',
        '길을 잃었어요 je užitečná fráze pro turisty',
        'Korejci jsou ochotní pomoci s navigací'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 47 - PÁ 20.3.2026 ============
const day47: KoreanDayData = {
    day: 47,
    date: 'PÁ 20.3.2026',
    title: '🏙️ Místa ve městě',
    vocab: [
        { kr: '광장', cz: 'náměstí' },
        { kr: '거리', cz: 'ulice' },
        { kr: '다리', cz: 'most' },
        { kr: '터널', cz: 'tunel' },
        { kr: '지하도', cz: 'podchod' },
        { kr: '육교', cz: 'nadchod' },
        { kr: '공원', cz: 'park' },
        { kr: '주차장', cz: 'parkoviště' },
        { kr: '주유소', cz: 'benzínka' },
        { kr: '편의점', cz: 'večerka' }
    ],
    grammar: {
        title: 'Opakování: -(으)면, -아서/어서, -지만, 부터/까지',
        explanation: `Shrnutí gramatiky tohoto týdne:

-(으)면 - KDYŽ/JESTLI (podmínka)
시간이 있으면 가요 (Když mám čas, jdu)

-아서/어서 - PROTOŽE (příčina)
늦어서 미안해요 (Promiň, že jdu pozdě)

-지만 - ALE (kontrast)
멀지만 갈 거예요 (Je to daleko, ale pojedu)

부터/까지 - OD/DO (rozsah)
여기부터 저기까지 (odtud dotamtud)`,
        examples: [
            { kr: '광장에 가면 만나요', cz: 'Když půjdeš na náměstí, setkáme se' },
            { kr: '편의점이 가까워서 자주 가요', cz: 'Protože je večerka blízko, chodím tam často' },
            { kr: '지하도가 있지만 육교로 갈게요', cz: 'Je tu podchod, ale půjdu nadchodem' },
            { kr: '공원부터 다리까지 걸었어요', cz: 'Šel jsem z parku k mostu' }
        ]
    },
    tasks: [
        'Napiš 10 míst 3×',
        'Vytvoř 5 vět kombinující gramatiku',
        'Popiš cestu někam v Soulu',
        'Přidej do Anki'
    ],
    exercises: [
        '광장에서 만나요 = ___',
        '편의점이 어디예요? = ___',
        '주차장___ 있으면 (이/가) → 이',
        '공원___ 다리___ (부터/까지) → 공원부터 다리까지'
    ],
    notes: [
        '광화문 광장 = Náměstí Gwanghwamun (slavné v Soulu)',
        '편의점 = CU, GS25, 7-Eleven jsou všude',
        '주유소 = benzínka (méně běžné ve městě)'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 48 - SO 21.3.2026 ============
const day48: KoreanDayData = {
    day: 48,
    date: 'SO 21.3.2026',
    title: '⭐ SOBOTNÍ MARATON (8 hodin)',
    vocab: [
        { kr: '정지', cz: 'stop' },
        { kr: '서행', cz: 'pomalu' },
        { kr: '진입금지', cz: 'zákaz vjezdu' },
        { kr: '일방통행', cz: 'jednosměrka' },
        { kr: '주차금지', cz: 'zákaz parkování' },
        { kr: '출입금지', cz: 'zákaz vstupu' },
        { kr: '위험', cz: 'nebezpečí' },
        { kr: '공사중', cz: 'probíhají práce' },
        { kr: '우회', cz: 'objížďka' },
        { kr: '속도제한', cz: 'rychlostní limit' }
    ],
    tasks: [
        'Hodina 1-2: Slovíčka týdne (50 nových)',
        'Hodina 3-4: Gramatika - -(으)면, -아서/어서, -지만, 부터/까지',
        'Hodina 5: Konverzace - navigace v Soulu',
        'Hodina 6-7: Role-play: Ptej se na cestu',
        'Hodina 8: Pasivní poslech'
    ],
    notes: [
        '정지 = STOP na dopravních značkách',
        '공사중 uvidíš často - hodně staveb v Koreji',
        'TIP: Fotky dopravních značek pomohou s učením'
    ],
    isWeekend: true,
    isTest: false
};

// ============ DEN 49 - NE 22.3.2026 ============
const day49: KoreanDayData = {
    day: 49,
    date: 'NE 22.3.2026',
    title: '🔄 NEDĚLNÍ MEGA OPAKOVÁNÍ (12 hodin) + TEST',
    vocab: [],
    grammar: {
        title: 'TEST TÝDNE - Doprava a navigace',
        explanation: `SHRNUTÍ GRAMATIKY TÝDNE:

1. -(으)면 - KDYŽ/JESTLI
   역에 도착하면 전화하세요

2. -아서/어서 - PROTOŽE
   늦어서 택시를 탔어요

3. -지만 - ALE
   멀지만 가고 싶어요

4. 부터/까지 - OD/DO
   9시부터 6시까지`,
        examples: [
            { kr: '버스가 없으면 지하철을 타세요', cz: 'Když nebude autobus, jeďte metrem' },
            { kr: '길을 잃어서 늦었어요', cz: 'Ztratil jsem se, tak jsem přišel pozdě' },
            { kr: '택시가 빠르지만 비싸요', cz: 'Taxi je rychlé, ale drahé' },
            { kr: '여기부터 역까지 10분이에요', cz: 'Odtud na stanici je to 10 minut' }
        ]
    },
    exercises: [
        'A. Slovíčka: autobus=버스, metro=지하철, zastávka=정류장, přechod=횡단보도',
        'B. Gramatika: 도착하다 + 면 → 도착하면, 늦다 + 아서/어서 → 늦어서',
        'C. Překlad: Jak se dostanu? = 어떻게 가요?, Kde vystoupit? = 어디서 내려요?',
        'D. 부터/까지: Od 9 do 6 = 9시부터 6시까지'
    ],
    tasks: [
        'Hodina 1-4: Opakování všech 60 slov',
        'Hodina 5-7: Gramatika - cvičení',
        'Hodina 8-9: Konverzace',
        'Hodina 10-11: Test',
        'Hodina 12: Pasivní poslech'
    ],
    isWeekend: true,
    isTest: true
};

// ============ DEN 50 - PO 23.3.2026 ============
const day50: KoreanDayData = {
    day: 50,
    date: 'PO 23.3.2026',
    title: '🌤️ Počasí detailně',
    vocab: [
        { kr: '맑다', cz: 'jasno' },
        { kr: '흐리다', cz: 'zataženo' },
        { kr: '비가 오다', cz: 'prší' },
        { kr: '눈이 오다', cz: 'sněží' },
        { kr: '바람이 불다', cz: 'fouká' },
        { kr: '안개', cz: 'mlha' },
        { kr: '천둥', cz: 'hrom' },
        { kr: '번개', cz: 'blesk' },
        { kr: '소나기', cz: 'přeháňka' },
        { kr: '장마', cz: 'období dešťů' }
    ],
    grammar: {
        title: '동안 - během',
        explanation: `Částice 동안 vyjadřuje trvání času.

POUŽITÍ:
• Číslo + časová jednotka + 동안
• Podstatné jméno + 동안

PŘÍKLADY:
일주일 동안 = během týdne
여행 동안 = během cestování
3시간 동안 = 3 hodiny (po dobu 3 hodin)

POZOR:
동안 odpovídá na otázku "jak dlouho?"
(얼마나 오래?)`,
        examples: [
            { kr: '일주일 동안 비가 왔어요', cz: 'Celý týden pršelo' },
            { kr: '여행 동안 날씨가 좋았어요', cz: 'Během cestování bylo hezky' },
            { kr: '3시간 동안 기다렸어요', cz: 'Čekal jsem 3 hodiny' },
            { kr: '장마 동안 밖에 못 나가요', cz: 'Během období dešťů nemůžu ven' },
            { kr: '회의 동안 전화하지 마세요', cz: 'Během schůzky nevolejte' }
        ]
    },
    tasks: [
        'Napiš 10 slovíček o počasí 3×',
        'Vytvoř 5 vět s 동안',
        'Popiš počasí v Koreji v dubnu',
        'Přidej do Anki'
    ],
    exercises: [
        '오늘 날씨가 어때요? → ___',
        '비가 오다 + 면 → 비가 오면',
        '일주일 ___ (동안) → 동안',
        '장마 ___ 비가 많이 와요 → 동안'
    ],
    notes: [
        '장마 = období dešťů (obvykle červen-červenec)',
        'V Koreji: jaro je krásné, ale krátké',
        'Duben: 15-20°C, někdy déšť'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 51 - ÚT 24.3.2026 ============
const day51: KoreanDayData = {
    day: 51,
    date: 'ÚT 24.3.2026',
    title: '🍂 Roční období',
    vocab: [
        { kr: '봄', cz: 'jaro' },
        { kr: '여름', cz: 'léto' },
        { kr: '가을', cz: 'podzim' },
        { kr: '겨울', cz: 'zima' },
        { kr: '계절', cz: 'roční období' },
        { kr: '날짜', cz: 'datum' },
        { kr: '달', cz: 'měsíc' },
        { kr: '년', cz: 'rok' },
        { kr: '일', cz: 'den' },
        { kr: '주', cz: 'týden' }
    ],
    grammar: {
        title: 'Roční období v Koreji',
        explanation: `ROČNÍ OBDOBÍ:
봄 = jaro (3-5월)
여름 = léto (6-8월)
가을 = podzim (9-11월)
겨울 = zima (12-2월)

CHARAKTERISTIKA:
봄: 따뜻해요, 꽃이 피어요 (teplo, kvetou květiny)
여름: 더워요, 장마가 있어요 (horko, období dešťů)
가을: 시원해요, 단풍이 예뻐요 (příjemně, krásné listí)
겨울: 추워요, 눈이 와요 (zima, sněží)`,
        examples: [
            { kr: '봄에 한국에 가요', cz: 'Na jaře jedu do Koreje' },
            { kr: '여름은 너무 더워요', cz: 'V létě je příliš horko' },
            { kr: '가을이 제일 좋아요', cz: 'Podzim mám nejraději' },
            { kr: '겨울에 눈이 많이 와요', cz: 'V zimě hodně sněží' },
            { kr: '어떤 계절을 좋아해요?', cz: 'Jaké roční období máš rád?' }
        ]
    },
    tasks: [
        'Napiš 10 slovíček 3×',
        'Popiš všechna roční období korejsky',
        'Řekni jaké období máš nejraději a proč',
        'Přidej do Anki'
    ],
    exercises: [
        '봄___ 따뜻해요 (에/은) → 에',
        '여름___ 더워요 (에/은) → 은',
        '어떤 계절___ 좋아해요? (을/를) → 을',
        '가을___ 한국에 가고 싶어요 (에/에서) → 에'
    ],
    notes: [
        '4월 = jaro, ideální čas pro návštěvu Koreje',
        '벚꽃 (třešňové květy) kvetou začátkem dubna',
        'Doporučuji navštívit 경복궁 na jaře'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 52 - ST 25.3.2026 ============
const day52: KoreanDayData = {
    day: 52,
    date: 'ST 25.3.2026',
    title: '👕 Oblečení podle počasí',
    vocab: [
        { kr: '우산', cz: 'deštník' },
        { kr: '우비', cz: 'pláštěnka' },
        { kr: '장갑', cz: 'rukavice' },
        { kr: '목도리', cz: 'šála' },
        { kr: '선글라스', cz: 'sluneční brýle' },
        { kr: '모자', cz: 'čepice' },
        { kr: '부츠', cz: 'boty' },
        { kr: '샌들', cz: 'sandály' },
        { kr: '반바지', cz: 'kraťasy' },
        { kr: '긴바지', cz: 'dlouhé kalhoty' }
    ],
    grammar: {
        title: 'Oblečení a počasí - fráze',
        explanation: `JAK SE PTÁT:
오늘 뭐 입어요? = Co si dnes vezmeš na sebe?
뭐 입을까요? = Co bych si měl vzít?

DOPORUČENÍ:
비가 오면 우산을 가져가세요
(Když bude pršet, vezměte si deštník)

추우면 목도리를 하세요
(Když bude zima, dejte si šálu)

더우면 반바지를 입으세요
(Když bude horko, oblékněte si kraťasy)`,
        examples: [
            { kr: '비가 오면 우산이 필요해요', cz: 'Když prší, potřebuji deštník' },
            { kr: '추우면 장갑을 끼세요', cz: 'Když je zima, nasaďte si rukavice' },
            { kr: '더우면 선글라스를 쓰세요', cz: 'Když je horko, nasaďte si sluneční brýle' },
            { kr: '겨울에는 부츠를 신어요', cz: 'V zimě nosím boty' },
            { kr: '여름에는 샌들을 신어요', cz: 'V létě nosím sandály' }
        ]
    },
    tasks: [
        'Napiš 10 slovíček 3×',
        'Popiš co si vezmeš na cestu do Koreje',
        'Vytvoř 5 doporučení s -(으)면',
        'Přidej do Anki'
    ],
    exercises: [
        '우산___ 가져가세요 (을/를) → 을',
        '장갑___ 끼다 (을/를) → 을',
        '모자___ 쓰다 (를/을) → 를',
        '비가 오다 + 면 + 우산이 필요해요 → 비가 오면 우산이 필요해요'
    ],
    notes: [
        '끼다 = nasadit (rukavice, prsten)',
        '쓰다 = nasadit (čepici, brýle)',
        '신다 = obout (boty, sandály)',
        '입다 = obléknout (oblečení)'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 53 - ČT 26.3.2026 ============
const day53: KoreanDayData = {
    day: 53,
    date: 'ČT 26.3.2026',
    title: '✈️ Cestovní slovíčka - intro',
    vocab: [
        { kr: '여행', cz: 'cestování' },
        { kr: '관광', cz: 'turistika' },
        { kr: '예약', cz: 'rezervace' },
        { kr: '취소', cz: 'zrušení' },
        { kr: '확인', cz: 'potvrzení' },
        { kr: '일정', cz: 'itinerář' },
        { kr: '숙소', cz: 'ubytování' },
        { kr: '호텔', cz: 'hotel' },
        { kr: '민박', cz: 'penzion' },
        { kr: '게스트하우스', cz: 'hostel' }
    ],
    grammar: {
        title: '-기 전에 - před tím než',
        explanation: `Částice -기 전에 vyjadřuje "před tím, než".

TVAR:
Kmen slovesa + 기 전에

PŘÍKLADY:
자다 → 자기 전에 (před spaním)
가다 → 가기 전에 (před odjezdem)
먹다 → 먹기 전에 (před jídlem)

POUŽITÍ:
가기 전에 확인하세요
(Před odjezdem zkontrolujte)`,
        examples: [
            { kr: '자기 전에 이를 닦아요', cz: 'Před spaním si čistím zuby' },
            { kr: '가기 전에 확인하세요', cz: 'Před odjezdem zkontrolujte' },
            { kr: '여행 가기 전에 예약했어요', cz: 'Před cestou jsem rezervoval' },
            { kr: '먹기 전에 손을 씻어요', cz: 'Před jídlem si myji ruce' },
            { kr: '출발하기 전에 전화할게요', cz: 'Před odjezdem zavolám' }
        ]
    },
    tasks: [
        'Napiš 10 cestovních slovíček 3×',
        'Vytvoř 5 vět s -기 전에',
        'Naplánuj co uděláš před cestou',
        'Přidej do Anki'
    ],
    exercises: [
        '여행___ 가다 (을/를/에) → 을',
        '예약___ 하다 (을/를) → 을',
        '가다 + 기 전에 → 가기 전에',
        '출발하다 + 기 전에 → 출발하기 전에',
        '확인하다 + 기 전에 → 확인하기 전에'
    ],
    notes: [
        '여행 vs 관광: 여행 = obecně cestování, 관광 = turistika/prohlídky',
        '민박 = tradiční korejský penzion (levnější)',
        'TIP: Rezervuj ubytování předem v dubnu'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 54 - PÁ 27.3.2026 ============
const day54: KoreanDayData = {
    day: 54,
    date: 'PÁ 27.3.2026',
    title: '🧳 Zavazadla',
    vocab: [
        { kr: '가방', cz: 'taška' },
        { kr: '캐리어', cz: 'kufr' },
        { kr: '배낭', cz: 'batoh' },
        { kr: '짐', cz: 'zavazadlo' },
        { kr: '여권', cz: 'pas' },
        { kr: '비자', cz: 'vízum' },
        { kr: '항공권', cz: 'letenka' },
        { kr: '탑승권', cz: 'palubní vstupenka' },
        { kr: '보험', cz: 'pojištění' },
        { kr: '환전', cz: 'směna peněz' }
    ],
    grammar: {
        title: 'Cestovní fráze a kontrola',
        explanation: `DŮLEŽITÉ VĚCI PRO CESTU:

DOKUMENTY:
여권 있어요? = Máš pas?
비자가 필요해요? = Potřebuješ vízum?
항공권 확인했어요? = Zkontroloval jsi letenku?

ZAVAZADLA:
짐을 쌌어요? = Sbalil jsi zavazadla?
캐리어가 무거워요? = Je kufr těžký?

PENÍZE:
환전했어요? = Směnil jsi peníze?
보험 들었어요? = Máš pojištění?`,
        examples: [
            { kr: '여권 가져왔어요?', cz: 'Vzal jsi pas?' },
            { kr: '짐을 다 쌌어요', cz: 'Sbalil jsem všechna zavazadla' },
            { kr: '환전을 해야 해요', cz: 'Musím směnit peníze' },
            { kr: '항공권을 인쇄했어요?', cz: 'Vytiskl jsi letenku?' },
            { kr: '여행 보험이 있어요', cz: 'Mám cestovní pojištění' }
        ]
    },
    tasks: [
        'Napiš 10 slovíček 3×',
        'Napiš checklist pro cestu korejsky',
        'Procvič otázky před cestou',
        'Přidej do Anki'
    ],
    exercises: [
        '여권___ 가져오다 (을/를) → 을',
        '짐___ 싸다 (을/를) → 을',
        '환전___ 하다 (을/를) → 을',
        '캐리어___ 무겁다 (이/가) → 가'
    ],
    notes: [
        'Češi NEPOTŘEBUJÍ vízum do Koreje (90 dní)',
        '환전 je lepší v Koreji (lepší kurz)',
        'TIP: Vezmi si kopii pasu'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 55 - SO 28.3.2026 ============
const day55: KoreanDayData = {
    day: 55,
    date: 'SO 28.3.2026',
    title: '⭐ SOBOTNÍ MARATON (8 hodin)',
    vocab: [
        { kr: '공항', cz: 'letiště' },
        { kr: '출국', cz: 'odlet' },
        { kr: '입국', cz: 'přílet' },
        { kr: '수속', cz: 'odbavení' },
        { kr: '탑승', cz: 'nastupování' },
        { kr: '게이트', cz: 'brána' },
        { kr: '면세점', cz: 'duty-free' },
        { kr: '환전소', cz: 'směnárna' },
        { kr: '안내소', cz: 'informace' },
        { kr: '대기', cz: 'čekání' }
    ],
    tasks: [
        'Hodina 1-2: Slovíčka týdne (50 nových)',
        'Hodina 3-4: Gramatika - 동안, -기 전에',
        'Hodina 5: Konverzace - příprava na cestu',
        'Hodina 6-7: Role-play: Na letišti',
        'Hodina 8: Pasivní poslech'
    ],
    notes: [
        '인천공항 = Letiště Incheon (hlavní)',
        '김포공항 = Letiště Gimpo (domácí lety)',
        'TIP: Přijeď 3 hodiny před odletem'
    ],
    isWeekend: true,
    isTest: false
};

// ============ DEN 56 - NE 29.3.2026 ============
const day56: KoreanDayData = {
    day: 56,
    date: 'NE 29.3.2026',
    title: '🔄 NEDĚLNÍ MEGA OPAKOVÁNÍ (12 hodin) + TEST',
    vocab: [],
    grammar: {
        title: 'TEST TÝDNE - Počasí a cestování',
        explanation: `SHRNUTÍ GRAMATIKY TÝDNE:

1. 동안 - BĚHEM
   일주일 동안 = během týdne

2. -기 전에 - PŘED TÍM NEŽ
   가기 전에 = před odjezdem

SPOJENÍ:
여행 가기 전에 예약했어요
(Před cestou jsem rezervoval)

여행 동안 날씨가 좋았어요
(Během cestování bylo hezky)`,
        examples: [
            { kr: '비가 오면 우산을 가져가세요', cz: 'Když bude pršet, vezměte si deštník' },
            { kr: '여행 동안 사진을 많이 찍었어요', cz: 'Během cestování jsem fotil hodně fotek' },
            { kr: '출발하기 전에 확인하세요', cz: 'Před odjezdem zkontrolujte' },
            { kr: '봄이지만 가끔 추워요', cz: 'Je jaro, ale občas je zima' }
        ]
    },
    exercises: [
        'A. Slovíčka: jaro=봄, deštník=우산, pas=여권, letiště=공항',
        'B. Gramatika: 여행 + 동안 → 여행 동안, 가다 + 기 전에 → 가기 전에',
        'C. Překlad: Před spaním = 자기 전에, Během týdne = 일주일 동안',
        'D. Věty: Před cestou jsem sbalil = 여행 가기 전에 짐을 쌌어요'
    ],
    tasks: [
        'Hodina 1-4: Opakování všech 60 slov',
        'Hodina 5-7: Gramatika - cvičení',
        'Hodina 8-9: Konverzace',
        'Hodina 10-11: Test',
        'Hodina 12: Pasivní poslech'
    ],
    isWeekend: true,
    isTest: true
};

// ============ DEN 57 - PO 30.3.2026 ============
const day57: KoreanDayData = {
    day: 57,
    date: 'PO 30.3.2026',
    title: '🛫 Letiště detailně',
    vocab: [
        { kr: '탑승구', cz: 'gate' },
        { kr: '보안검색', cz: 'bezpečnostní kontrola' },
        { kr: '면세점', cz: 'duty-free' },
        { kr: '대기실', cz: 'čekárna' },
        { kr: '수하물', cz: 'zavazadla' },
        { kr: '수하물 찾는 곳', cz: 'výdej zavazadel' },
        { kr: '세관', cz: 'celnice' },
        { kr: '출입국심사', cz: 'pasová kontrola' }
    ],
    grammar: {
        title: '-(으)ㄴ 후에 - po tom co (intro)',
        explanation: `Částice -(으)ㄴ 후에 vyjadřuje "po tom, co".

TVAR:
• Po samohlásce: -ㄴ 후에
• Po souhlásce: -은 후에

PŘÍKLADY:
먹다 → 먹은 후에 (po jídle)
도착하다 → 도착한 후에 (po příjezdu)
끝나다 → 끝난 후에 (po skončení)

POZOR: -기 전에 vs -(으)ㄴ 후에
가기 전에 = PŘED odjezdem
간 후에 = PO odjezdu`,
        examples: [
            { kr: '먹은 후에 커피를 마셔요', cz: 'Po jídle piju kávu' },
            { kr: '도착한 후에 연락할게요', cz: 'Po příjezdu se ozvu' },
            { kr: '수속한 후에 면세점에 가세요', cz: 'Po odbavení jděte do duty-free' },
            { kr: '보안검색을 받은 후에 탑승구로 가세요', cz: 'Po bezpečnostní kontrole jděte k bráně' },
            { kr: '짐을 찾은 후에 세관을 통과해요', cz: 'Po vyzvednutí zavazadel projdete celnicí' }
        ]
    },
    tasks: [
        'Napiš 8 slovíček 3×',
        'Vytvoř 5 vět s -(으)ㄴ 후에',
        'Popiš co uděláš po příletu do Koreje',
        'Přidej do Anki'
    ],
    exercises: [
        '도착하다 + (으)ㄴ 후에 → 도착한 후에',
        '먹다 + (으)ㄴ 후에 → 먹은 후에',
        '끝나다 + (으)ㄴ 후에 → 끝난 후에',
        '보안검색___ 받다 (을/를) → 을'
    ],
    notes: [
        '인천공항에서 서울까지 AREX로 43분',
        '출입국심사에서 영어로 대답해도 돼요',
        'TIP: K-ETA registrace PŘED cestou'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 58 - ÚT 31.3.2026 ============
const day58: KoreanDayData = {
    day: 58,
    date: 'ÚT 31.3.2026',
    title: '📚 Opakování březen',
    vocab: [],
    grammar: {
        title: 'Opakování gramatiky března',
        explanation: `GRAMATIKA BŘEZNA - KOMPLETNÍ PŘEHLED:

Z ÚNORA (opakování):
1. -았어요/었어요 - minulý čas
2. 안/못 - negace
3. -고 싶다 - chtít
4. -(으)세요 - zdvořilá žádost
5. -고 - a (spojování)

NOVÉ V BŘEZNU:
6. -(으)면 - když/jestli
7. -아서/어서 - protože
8. -지만 - ale
9. 부터/까지 - od/do
10. 동안 - během
11. -기 전에 - před tím než
12. -(으)ㄴ 후에 - po tom co`,
        examples: [
            { kr: '비가 오면 우산이 필요해요', cz: 'Když prší, potřebuji deštník' },
            { kr: '늦어서 택시를 탔어요', cz: 'Protože jsem se opozdil, vzal jsem taxi' },
            { kr: '멀지만 가고 싶어요', cz: 'Je to daleko, ale chci jet' },
            { kr: '9시부터 6시까지 일해요', cz: 'Pracuji od 9 do 6' },
            { kr: '일주일 동안 여행할 거예요', cz: 'Budu cestovat týden' },
            { kr: '가기 전에 확인하세요', cz: 'Před odjezdem zkontrolujte' },
            { kr: '도착한 후에 연락할게요', cz: 'Po příjezdu se ozvu' }
        ]
    },
    tasks: [
        'Opakuj všechna slovíčka března',
        'Vytvoř 10 vět kombinující gramatiku',
        'Připrav se na měsíční test',
        'Anki marathon'
    ],
    focus: [
        'Doprava: 버스, 지하철, 역, 정류장',
        'Počasí: 날씨, 비, 눈, 바람',
        'Cestování: 여행, 여권, 공항, 비행기',
        'Gramatika: -(으)면, -아서/어서, -지만, 부터/까지, 동안'
    ],
    isWeekend: false,
    isTest: false
};

// ============ DEN 59 - ST 1.4.2026 ============
const day59: KoreanDayData = {
    day: 59,
    date: 'ST 1.4.2026',
    title: '🏆 MĚSÍČNÍ TEST BŘEZEN',
    vocab: [],
    grammar: {
        title: 'MĚSÍČNÍ TEST BŘEZNA - ÚROVEŇ A1+',
        explanation: `Čas: 2 hodiny
Celkem: 100 bodů

ČÁST A: SLOVÍČKA (25 bodů)
50 slovíček - 25 KR→CZ, 25 CZ→KR

ČÁST B: GRAMATIKA (35 bodů)
1. -(으)면 - podmínka
2. -아서/어서 - příčina
3. -지만 - kontrast
4. 부터/까지 - rozsah
5. 동안 - trvání
6. -기 전에 - před
7. -(으)ㄴ 후에 - po
+ opakování z února

ČÁST C: PŘEKLAD VĚT (20 bodů)

ČÁST D: KONVERZACE (20 bodů)`,
        examples: []
    },
    exercises: [
        '═══════════════════════════════════════',
        'ČÁST A: SLOVÍČKA (25 bodů)',
        '═══════════════════════════════════════',
        '',
        'KR → CZ (12,5 bodů):',
        '1. 버스 = ___',
        '2. 지하철 = ___',
        '3. 정류장 = ___',
        '4. 환승 = ___',
        '5. 출발 = ___',
        '6. 도착 = ___',
        '7. 횡단보도 = ___',
        '8. 신호등 = ___',
        '9. 날씨 = ___',
        '10. 비가 오다 = ___',
        '11. 봄 = ___',
        '12. 여름 = ___',
        '13. 우산 = ___',
        '14. 여권 = ___',
        '15. 공항 = ___',
        '',
        'CZ → KR (12,5 bodů):',
        '16. metro = ___',
        '17. taxi = ___',
        '18. jízdenka = ___',
        '19. křižovatka = ___',
        '20. mapa = ___',
        '21. jasno = ___',
        '22. podzim = ___',
        '23. rukavice = ___',
        '24. letenka = ___',
        '25. pasová kontrola = ___',
        '',
        '═══════════════════════════════════════',
        'ČÁST B: GRAMATIKA (35 bodů)',
        '═══════════════════════════════════════',
        '',
        'B1. Doplň správnou gramatiku (15 bodů):',
        '',
        '1. 비가 오___ 택시를 탈 거예요 (když)',
        '2. 늦___ 미안해요 (protože)',
        '3. 멀___ 가고 싶어요 (ale)',
        '4. 9시___ 6시___ 일해요 (od/do)',
        '5. 일주일 ___ 여행했어요 (během)',
        '6. 가___ ___ 확인하세요 (před tím než)',
        '7. 도착___ ___ 연락할게요 (po tom co)',
        '',
        'B2. Přetvoř slovesa (10 bodů):',
        '',
        '1. 가다 + 면 = ___',
        '2. 먹다 + 아서/어서 = ___',
        '3. 좋다 + 지만 = ___',
        '4. 자다 + 기 전에 = ___',
        '5. 끝나다 + (으)ㄴ 후에 = ___',
        '',
        'B3. Opakování z února (10 bodů):',
        '',
        '1. 가다 → minulý čas = ___',
        '2. 먹다 → nechci = ___',
        '3. 한국어를 하다 → neumím = ___',
        '4. 가다 + 고 싶다 = ___',
        '5. 앉다 + (으)세요 = ___',
        '',
        '═══════════════════════════════════════',
        'ČÁST C: PŘEKLAD VĚT (20 bodů)',
        '═══════════════════════════════════════',
        '',
        '1. Když bude pršet, vezmu si deštník. = ___',
        '2. Protože jsem měl zpoždění, vzal jsem taxi. = ___',
        '3. Je to daleko, ale chci jet. = ___',
        '4. Pracuji od 9 do 6. = ___',
        '5. Během cestování bylo hezky. = ___',
        '6. Před odjezdem zkontrolujte. = ___',
        '7. Po příjezdu se ozvu. = ___',
        '8. Jak se dostanu na letiště? = ___',
        '9. Kde je zastávka autobusu? = ___',
        '10. Jaké počasí bude zítra? = ___',
        '',
        '═══════════════════════════════════════',
        'ČÁST D: KONVERZACE (20 bodů)',
        '═══════════════════════════════════════',
        '',
        'Napiš dialog: Ptáš se na cestu na letiště.',
        '(Minimálně 10 vět)',
        '',
        '나: (pozdrav)',
        '행인: (odpověď)',
        '나: (zeptej se jak se dostat na letiště)',
        '...'
    ],
    notes: [
        '═══════════════════════════════════════',
        'ODPOVĚDI',
        '═══════════════════════════════════════',
        '',
        'ČÁST A:',
        '1. autobus, 2. metro, 3. zastávka, 4. přestup, 5. odjezd',
        '6. příjezd, 7. přechod, 8. semafor, 9. počasí, 10. prší',
        '11. jaro, 12. léto, 13. deštník, 14. pas, 15. letiště',
        '16. 지하철, 17. 택시, 18. 표, 19. 교차로, 20. 지도',
        '21. 맑다, 22. 가을, 23. 장갑, 24. 항공권, 25. 출입국심사',
        '',
        'ČÁST B1:',
        '1. 오면, 2. 늦어서, 3. 멀지만, 4. 부터/까지, 5. 동안',
        '6. 가기 전에, 7. 도착한 후에',
        '',
        'ČÁST B2:',
        '1. 가면, 2. 먹어서, 3. 좋지만, 4. 자기 전에, 5. 끝난 후에',
        '',
        'ČÁST B3:',
        '1. 갔어요, 2. 안 먹어요, 3. 못 해요, 4. 가고 싶어요, 5. 앉으세요',
        '',
        'ČÁST C:',
        '1. 비가 오면 우산을 가져갈 거예요',
        '2. 늦어서 택시를 탔어요',
        '3. 멀지만 가고 싶어요',
        '4. 9시부터 6시까지 일해요',
        '5. 여행 동안 날씨가 좋았어요',
        '6. 가기 전에 확인하세요',
        '7. 도착한 후에 연락할게요',
        '8. 공항에 어떻게 가요?',
        '9. 버스 정류장이 어디예요?',
        '10. 내일 날씨가 어때요?',
        '',
        'ČÁST D (vzor):',
        '나: 안녕하세요, 실례합니다.',
        '행인: 네, 말씀하세요.',
        '나: 공항에 어떻게 가요?',
        '행인: 지하철로 가세요.',
        '나: 여기서 가까워요?',
        '행인: 아니요, 1시간쯤 걸려요.',
        '나: 몇 번 지하철이에요?',
        '행인: 9호선을 타세요.',
        '나: 갈아타야 해요?',
        '행인: 네, 김포공항역에서 공항철도로 갈아타세요.',
        '나: 감사합니다!',
        '',
        '═══════════════════════════════════════',
        '화이팅! Březen hotový!',
        'Připrav se na DUBEN - CESTA DO KOREJE! ✈️',
        '═══════════════════════════════════════'
    ],
    isWeekend: false,
    isTest: true
};

// Export all days
export const marchDays43to59: KoreanDayData[] = [
    day43, day44, day45, day46, day47, day48, day49,
    day50, day51, day52, day53, day54, day55, day56,
    day57, day58, day59
];

export default marchDays43to59;
