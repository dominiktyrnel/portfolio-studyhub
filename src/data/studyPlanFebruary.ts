import type { KoreanMonthData, KoreanDayData } from '../types/study-db';

export const februaryData: KoreanMonthData = {
    month: 1,
    nameKR: '2월 - 기초',
    nameCZ: 'ÚNOR 2026 - MĚSÍC 1/10',
    targetLevel: 'A1',
    targetWords: 220,
    totalWords: 220,
    goals: [
        '220 nových slov',
        '10 gramatických struktur',
        'Základní konverzace - představení, pozdravy',
        'Výslovnost: 받침, 연음, ㅎ 약화'
    ],
    grammarOverview: [
        { kr: '이다/아니다', cz: 'být/nebýt' },
        { kr: '은/는', cz: 'téma' },
        { kr: '이/가', cz: 'podmět' },
        { kr: '을/를', cz: 'předmět' },
        { kr: '에', cz: 'místo/čas' },
        { kr: '에서', cz: 'místo akce' },
        { kr: '도', cz: 'také' },
        { kr: '있다/없다', cz: 'být/mít' }
    ],
    weeks: [
        { weekNumber: 1, dateRange: '2.-8.2.', theme: 'Pozdravy, čísla, 이다', days: [1, 2, 3, 4, 5, 6, 7] },
        { weekNumber: 2, dateRange: '9.-15.2.', theme: 'Slovesa, jídlo, místa', days: [8, 9, 10, 11, 12, 13, 14] },
        { weekNumber: 3, dateRange: '16.-22.2.', theme: 'Přídavná jména, doprava, emoce', days: [15, 16, 17, 18, 19, 20, 21] },
        { weekNumber: 4, dateRange: '23.-1.3.', theme: 'Opakování a měsíční test', days: [22, 23, 24, 25, 26, 27, 28] }
    ],
    days: [
        // ============================================================
        // TÝDEN 1: DNY 1-7 (2.2. - 8.2.2026)
        // ============================================================

        // DEN 1 - PO 2.2.2026 - Pozdravy
        {
            day: 1,
            date: 'PO 2.2.2026',
            title: 'Pozdravy',
            vocab: [
                { kr: '안녕하세요', cz: 'dobrý den' },
                { kr: '안녕', cz: 'ahoj' },
                { kr: '감사합니다', cz: 'děkuji (formálně)' },
                { kr: '고마워요', cz: 'děkuji' },
                { kr: '죄송합니다', cz: 'omlouvám se (formálně)' },
                { kr: '미안해요', cz: 'promiň' },
                { kr: '네', cz: 'ano' },
                { kr: '아니요', cz: 'ne' },
                { kr: '괜찮아요', cz: 'v pořádku' },
                { kr: '여보세요', cz: 'haló (telefon)' }
            ],
            grammar: {
                title: '이다 - být',
                explanation: `Sloveso 이다 znamená "být". Připojuje se přímo za podstatné jméno.

TVARY:
• Po samohlásce: -예요 (neformální), -입니다 (formální)
• Po souhlásce: -이에요 (neformální), -입니다 (formální)

JAK POZNAT SAMOHLÁSKU/SOUHLÁSKU:
Podívej se na POSLEDNÍ PÍSMENO slova (받침 = spodní souhláska):
- 친구 končí na ㅜ (samohláska, žádný 받침) → 친구예요
- 학생 končí na ㅇ (souhláska, má 받침) → 학생이에요

DŮLEŽITÉ:
Formální tvar -입니다 je VŽDY stejný, bez ohledu na samohlásku/souhlásku!
Stačí si pamatovat jeden tvar pro všechny situace.

KDY POUŽÍT:
Když říkáš CO nebo KDO něco/někdo je. Je to jako české "jsem/je/jsou".`,
                examples: [
                    { kr: '저는 도미니크예요', cz: 'Já jsem Dominik' },
                    { kr: '저는 체코 사람이에요', cz: 'Jsem Čech' },
                    { kr: '이것은 물이에요', cz: 'Tohle je voda' },
                    { kr: '오늘은 월요일이에요', cz: 'Dnes je pondělí' },
                    { kr: '저는 학생입니다', cz: 'Jsem student (formálně)' }
                ]
            },
            tasks: [
                'Napiš každé slovo 3× do sešitu',
                'Řekni nahlas 안녕하세요, 감사합니다 každé 20×',
                'Přidej všech 10 slov do Anki',
                'Konverzace: Pozdrav přítelkyni korejsky',
                'Večer zopakuj všechna slova'
            ],
            exercises: [
                '저는 남자___ (예요/이에요) → 예요',
                '이것은 물___ (예요/이에요) → 이에요',
                '오늘은 월요일___ (예요/이에요) → 이에요',
                '저는 학생___ (예요/이에요) → 이에요',
                '이것은 커피___ (예요/이에요) → 예요',
                '그것은 책___ (예요/이에요) → 이에요',
                '저는 친구___ (예요/이에요) → 예요'
            ],
            notes: [
                '받침 pravidlo: 남자 končí na 자, což má samohlásku ㅏ bez 받침, proto 예요',
                'CHYBA: ~~저는 학생예요~~ → 저는 학생이에요 (학생 končí na ㅇ = souhláska)',
                'TIP: Formální 입니다 je vždy stejné, nemusíš řešit samohlásku/souhlásku',
                '받침 (koncové souhlásky): 27 písmen → pouze 7 zvuků: [ㄱ], [ㄴ], [ㄷ], [ㄹ], [ㅁ], [ㅂ], [ㅇ]'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 2 - ÚT 3.2.2026 - Zájmena
        {
            day: 2,
            date: 'ÚT 3.2.2026',
            title: 'Zájmena',
            vocab: [
                { kr: '저', cz: 'já (formálně)' },
                { kr: '나', cz: 'já' },
                { kr: '너', cz: 'ty' },
                { kr: '당신', cz: 'vy/ty (formálně)' },
                { kr: '우리', cz: 'my' },
                { kr: '이름', cz: 'jméno' },
                { kr: '사람', cz: 'člověk' },
                { kr: '남자', cz: 'muž' },
                { kr: '여자', cz: 'žena' },
                { kr: '친구', cz: 'přítel' }
            ],
            grammar: {
                title: '아니다 - nebýt',
                explanation: `Sloveso 아니다 znamená "nebýt". Používá se k popření 이다.

TVARY:
• Neformální: 아니에요
• Formální: 아닙니다

KRITICKY DŮLEŽITÉ:
아니다 se používá S ČÁSTICÍ 이/가, ne 은/는!
Proč? Protože 아니다 zdůrazňuje, CO to NENÍ - nová informace.

VZOREC:
[Téma]은/는 [Co to není]이/가 아니에요

PŘÍKLAD ANALÝZY:
저는 한국 사람이 아니에요
- 저는 = já (téma, o kom mluvíme)
- 한국 사람이 = Korejec (co to není - použij 이/가!)
- 아니에요 = nejsem`,
                examples: [
                    { kr: '저는 한국 사람이 아니에요', cz: 'Nejsem Korejec' },
                    { kr: '이것은 물이 아니에요', cz: 'Tohle není voda' },
                    { kr: '오늘은 월요일이 아니에요', cz: 'Dnes není pondělí' },
                    { kr: '저는 학생이 아닙니다', cz: 'Nejsem student (formálně)' },
                    { kr: '그 사람은 의사가 아니에요', cz: 'Ten člověk není doktor' }
                ]
            },
            tasks: [
                'Napiš každé slovo 3× do sešitu',
                'Představ se korejsky: 저는 [jméno]이에요/예요',
                'Přidej všech 10 slov do Anki',
                'Konverzace: Řekni přítelkyni, čím NEJSI',
                'Procvič rozdíl 이다 vs 아니다'
            ],
            exercises: [
                '저는 학생___ (이에요/이 아니에요) → 이 아니에요 (popření)',
                '이것은 커피___ (예요/가 아니에요) → 가 아니에요 (popření)',
                '저는 남자___ (예요/가 아니에요) → 예요 (kladné)',
                '그 사람은 선생님___ (이에요/이 아니에요) → 이 아니에요',
                '오늘은 화요일___ (이에요/이 아니에요) → 이에요 (je úterý)'
            ],
            notes: [
                'POZOR: U 아니다 vždy použij 이/가 před 아니에요!',
                'CHYBA: ~~저는 학생을 아니에요~~ → 저는 학생이 아니에요',
                'TIP: 저 končí na ㅓ (samohláska), proto 저는 (ne 저은)',
                '당신 se v Koreji moc nepoužívá - může znít nezdvořile nebo romanticky'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 3 - ST 4.2.2026 - Čísla sino 0-9
        {
            day: 3,
            date: 'ST 4.2.2026',
            title: 'Čísla sino-korejská 0-9',
            vocab: [
                { kr: '영/공', cz: 'nula' },
                { kr: '일', cz: 'jedna' },
                { kr: '이', cz: 'dva' },
                { kr: '삼', cz: 'tři' },
                { kr: '사', cz: 'čtyři' },
                { kr: '오', cz: 'pět' },
                { kr: '육', cz: 'šest' },
                { kr: '칠', cz: 'sedm' },
                { kr: '팔', cz: 'osm' },
                { kr: '구', cz: 'devět' }
            ],
            grammar: {
                title: '은/는 - částice tématu',
                explanation: `Částice 은/는 označuje TÉMA věty - o čem mluvíme.

TVARY:
• Po souhlásce (má 받침): 은 (학생은, 물은)
• Po samohlásce (nemá 받침): 는 (저는, 커피는)

JAK POZNAT:
Podívej se na poslední písmeno slova:
- 저 končí na ㅓ (samohláska) → 저는
- 물 končí na ㄹ (souhláska) → 물은

KDY POUŽÍT 은/는:
1. Když představuješ téma: "Co se týče X..."
2. Když srovnáváš: "X je..., ale Y je..."
3. Když je informace ZNÁMÁ nebo obecná

KONTRAST S 이/가:
• 은/는 = téma, starší/známá informace
• 이/가 = podmět, nová informace (naučíme se později)`,
                examples: [
                    { kr: '저는 도미니크예요', cz: 'Já jsem Dominik (co se mě týče)' },
                    { kr: '오늘은 수요일이에요', cz: 'Dnes je středa' },
                    { kr: '커피는 좋아요', cz: 'Kávu mám rád' },
                    { kr: '한국어는 재미있어요', cz: 'Korejština je zábavná' },
                    { kr: '물은 있어요, 커피는 없어요', cz: 'Voda je, káva není' }
                ]
            },
            tasks: [
                'Počítej od 0 do 9 nahlas 20×',
                'Napiš každé číslo 5× do sešitu',
                'Přidej do Anki',
                'Procvič 은/는 s 10 různými slovy',
                'Řekni telefonní číslo korejsky: 010-XXXX-XXXX'
            ],
            exercises: [
                '저___ 체코 사람이에요 (은/는) → 는',
                '물___ 있어요 (은/는) → 은',
                '오늘___ 수요일이에요 (은/는) → 은',
                '커피___ 맛있어요 (은/는) → 는',
                '한국어___ 어려워요 (은/는) → 는',
                '삼 + 사 = ___ (sino) → 칠',
                '팔 - 오 = ___ (sino) → 삼'
            ],
            notes: [
                'Sino-korejská čísla se používají pro: telefon, datum, peníze, minuty, patra',
                '연음 (linking): 한국어 → vyslov [한구거], 먹어요 → [머거요]',
                'CHYBA: ~~저은~~ → 저는 (저 končí na samohlásku)',
                'TIP: 영 = formální nula, 공 = hovorová nula (telefon)'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 4 - ČT 5.2.2026 - Čísla sino vyšší
        {
            day: 4,
            date: 'ČT 5.2.2026',
            title: 'Čísla sino-korejská vyšší',
            vocab: [
                { kr: '십', cz: 'deset' },
                { kr: '백', cz: 'sto' },
                { kr: '천', cz: 'tisíc' },
                { kr: '만', cz: 'deset tisíc' },
                { kr: '원', cz: 'won (měna)' },
                { kr: '번', cz: 'číslo/krát' },
                { kr: '층', cz: 'patro' },
                { kr: '분', cz: 'minuta' },
                { kr: '년', cz: 'rok' },
                { kr: '월', cz: 'měsíc' }
            ],
            grammar: {
                title: '이/가 - částice podmětu',
                explanation: `Částice 이/가 označuje PODMĚT - KDO/CO dělá akci nebo je v nějakém stavu.

TVARY:
• Po souhlásce (má 받침): 이 (물이, 학생이)
• Po samohlásce (nemá 받침): 가 (커피가, 누가)

SPECIÁLNÍ TVAR:
저 + 가 = 제가 (stahuje se!)
나 + 가 = 내가 (stahuje se!)

KDY POUŽÍT 이/가:
1. NOVÁ informace - kdo/co (odpověď na otázku)
2. Po tázacích slovech: 뭐가?, 누가?, 어디가?
3. S 있다/없다 (být/nebýt): 물이 있어요
4. S 아니다 (nebýt): 학생이 아니에요

은/는 vs 이/가 - SHRNUTÍ:
• 은/는 = "Co se X týče..." (téma, kontrast)
• 이/가 = "X konkrétně..." (podmět, nová info)`,
                examples: [
                    { kr: '물이 있어요', cz: 'Je tu voda' },
                    { kr: '뭐가 좋아요?', cz: 'Co je dobré?' },
                    { kr: '누가 왔어요?', cz: 'Kdo přišel?' },
                    { kr: '제가 할게요', cz: 'Já to udělám' },
                    { kr: '문제가 있어요', cz: 'Je problém' }
                ]
            },
            tasks: [
                'Sestav čísla: 11, 25, 100, 1000, 50000',
                'Řekni cenu: 삼천오백 원 (3500 wonů)',
                'Přidej do Anki',
                'Procvič 이/가 s 10 větami',
                'Konverzace: Kolik to stojí? 얼마예요?'
            ],
            exercises: [
                '물___ 있어요 (이/가) → 이',
                '커피___ 없어요 (이/가) → 가',
                '뭐___ 좋아요? (이/가) → 가',
                '누___ 했어요? (이/가) → 가',
                '25 sino = ___십___ → 이십오',
                '3500원 = ___천___백 원 → 삼천오백',
                '2026년 = ___천___십___ 년 → 이천이십육'
            ],
            notes: [
                'POZOR: 저가 → 제가 (stahuje se!)',
                'Skládání čísel: 11=십일, 20=이십, 35=삼십오, 100=백, 101=백일',
                '만 = 10,000 (korejský systém počítá po deseti tisících!)',
                '1,000,000 = 백만 (100 × 10,000)'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 5 - PÁ 6.2.2026 - Čísla nativní 1-10
        {
            day: 5,
            date: 'PÁ 6.2.2026',
            title: 'Čísla nativní korejská 1-10',
            vocab: [
                { kr: '하나', cz: 'jedna' },
                { kr: '둘', cz: 'dva' },
                { kr: '셋', cz: 'tři' },
                { kr: '넷', cz: 'čtyři' },
                { kr: '다섯', cz: 'pět' },
                { kr: '여섯', cz: 'šest' },
                { kr: '일곱', cz: 'sedm' },
                { kr: '여덟', cz: 'osm' },
                { kr: '아홉', cz: 'devět' },
                { kr: '열', cz: 'deset' }
            ],
            grammar: {
                title: 'Nativní číslovky - zkrácené formy',
                explanation: `Nativní korejská číslovka mají ZKRÁCENÉ FORMY před počítadly!

ZKRÁCENÉ FORMY (KRITICKÉ):
• 하나 → 한 (한 개, 한 시)
• 둘 → 두 (두 개, 두 시)
• 셋 → 세 (세 개, 세 명)
• 넷 → 네 (네 개, 네 시)
• 스물 → 스무 (스무 살)

KDY POUŽÍT NATIVNÍ ČÍSLOVKY:
1. Hodiny: 두 시 (2 hodiny), 세 시 (3 hodiny)
2. Věk: 스물다섯 살 (25 let)
3. Počítání s počítadly: 한 개, 두 명, 세 마리

CHYBA ZAČÁTEČNÍKŮ:
❌ 하나 개 → ✅ 한 개
❌ 둘 시 → ✅ 두 시
❌ 스물 살 → ✅ 스무 살`,
                examples: [
                    { kr: '한 개 주세요', cz: 'Dejte mi jeden kus' },
                    { kr: '두 시예요', cz: 'Jsou dvě hodiny' },
                    { kr: '세 명 있어요', cz: 'Jsou tu tři lidi' },
                    { kr: '저는 스물다섯 살이에요', cz: 'Je mi 25 let' },
                    { kr: '사과 네 개 주세요', cz: 'Dejte mi 4 jablka' }
                ]
            },
            tasks: [
                'Počítej od 1 do 10 nativně 20×',
                'Procvič zkrácené formy: 하나→한, 둘→두, 셋→세, 넷→네',
                'Řekni svůj věk: 저는 ___ 살이에요',
                'Přidej do Anki',
                'Zeptej se přítelkyně: 몇 살이에요?'
            ],
            exercises: [
                '___ 개 주세요 (1 kus) → 한',
                '___ 시예요 (2 hodiny) → 두',
                '___ 명 있어요 (3 lidi) → 세',
                '저는 ___살이에요 (25 let) → 스물다섯',
                '사과 ___ 개 (4 jablka) → 네',
                '열 + 둘 = ___ → 열둘 (12)'
            ],
            notes: [
                'ㅎ 약화 (H-weakening): 좋아요 → vyslov [조아요], 많아요 → [마나요]',
                'SINO vs NATIVNÍ - rychlý přehled:',
                '• SINO: telefon, datum, peníze, minuty, patra',
                '• NATIVNÍ: hodiny, věk, počítání věcí',
                'CHYBA: ~~하나 시~~ → 한 시'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 6 - SO 7.2.2026 - SOBOTNÍ MARATON
        {
            day: 6,
            date: 'SO 7.2.2026',
            title: '⭐ SOBOTNÍ MARATON (8 hodin)',
            vocab: [
                { kr: '스물', cz: 'dvacet' },
                { kr: '서른', cz: 'třicet' },
                { kr: '마흔', cz: 'čtyřicet' },
                { kr: '쉰', cz: 'padesát' },
                { kr: '살', cz: 'rok věku' },
                { kr: '시', cz: 'hodina' },
                { kr: '개', cz: 'kus (počítadlo)' },
                { kr: '명', cz: 'osoba (počítadlo)' },
                { kr: '마리', cz: 'zvíře (počítadlo)' },
                { kr: '병', cz: 'láhev' },
                { kr: '잔', cz: 'sklenice/šálek' },
                { kr: '권', cz: 'kniha (počítadlo)' }
            ],
            grammar: {
                title: '은/는 vs 이/가 - Kompletní srovnání',
                explanation: `Toto je NEJDŮLEŽITĚJŠÍ rozdíl v korejštině! Musíš ho chápat.

은/는 (TÉMA):
• "Co se X týče..." - uvádí téma
• Známá/stará informace
• Kontrast: "X je..., ale Y je..."
• Obecné pravdy: 커피는 좋아요 (Kávu obecně mám rád)

이/가 (PODMĚT):
• "X konkrétně" - zdůrazňuje kdo/co
• Nová informace
• Odpověď na otázku (누가? → 제가!)
• S 있다/없다: 물이 있어요
• S 아니다: 학생이 아니에요

PŘÍKLAD - STEJNÁ VĚTA, JINÝ VÝZNAM:
저는 학생이에요 = Co se mě týče, jsem student
제가 학생이에요 = JÁ jsem student (ne někdo jiný)

PRAVIDLO PRO ZAČÁTEČNÍKY:
• První zmínka o tématu → 은/는
• Odpověď na "kdo/co" → 이/가
• S 있다/없다/아니다 → 이/가`,
                examples: [
                    { kr: '물이 있어요', cz: 'Je tu voda (이/가 + 있다)' },
                    { kr: '커피는 좋아요', cz: 'Kávu mám rád (은/는 = téma)' },
                    { kr: '누가 했어요? - 제가 했어요', cz: 'Kdo to udělal? - Já (이/가 = odpověď)' },
                    { kr: '저는 한국어가 좋아요', cz: 'Co se mě týče, mám rád korejštinu' },
                    { kr: '물은 있어요, 커피는 없어요', cz: 'Voda je, káva není (kontrast)' },
                    { kr: '저는 학생이 아니에요', cz: 'Nejsem student (이/가 + 아니다)' }
                ]
            },
            tasks: [
                'HODINA 1-2: Anki všech 52 slov z týdne',
                'HODINA 3-4: Gramatika - 이다/아니다, 은/는 vs 이/가 (psaní 30 vět)',
                'HODINA 5: Konverzace s přítelkyní - představení, čísla, věk, telefon',
                'HODINA 6-7: Cvičení - počítání věcí s počítadly, říkání času',
                'HODINA 8: Pasivní poslech - korejská hudba/video'
            ],
            exercises: [
                '물___ 있어요 (은/는 vs 이/가) → 이',
                '커피___ 맛있어요 (은/는 vs 이/가) → 는',
                '누___ 했어요? (은/는 vs 이/가) → 가',
                '저___ 학생이에요 (은/는 vs 이/가) → 는',
                '제___ 할게요 (은/는 vs 이/가) → 가',
                '사과___ 없어요 (은/는 vs 이/가) → 가',
                '___ 시예요? (kolik je hodin) → 몇',
                '커피 ___ 잔 주세요 (2 šálky) → 두',
                '고양이 ___ 마리 있어요 (3 kočky) → 세',
                '맥주 ___ 병 주세요 (5 lahví) → 다섯'
            ],
            notes: [
                'PROGRAM 8 HODIN:',
                '• 09:00-11:00 - Slovíčka (všech 52, Anki, psaní)',
                '• 11:00-13:00 - Gramatika (은/는 vs 이/가 detailně)',
                '• 13:00-14:00 - Oběd + korejské video',
                '• 14:00-15:00 - Konverzace s přítelkyní',
                '• 15:00-17:00 - Cvičení (čísla, počítadla, čas)',
                '• 17:00-18:00 - Pasivní poslech',
                'TIP: Dělej 5min pauzy každých 25 minut (Pomodoro)'
            ],
            isWeekend: true,
            isTest: false
        },

        // DEN 7 - NE 8.2.2026 - NEDĚLNÍ MEGA OPAKOVÁNÍ + TEST
        {
            day: 7,
            date: 'NE 8.2.2026',
            title: '⭐ NEDĚLNÍ MEGA OPAKOVÁNÍ (12 hodin) + TEST',
            vocab: [
                { kr: '월요일', cz: 'pondělí' },
                { kr: '화요일', cz: 'úterý' },
                { kr: '수요일', cz: 'středa' },
                { kr: '목요일', cz: 'čtvrtek' },
                { kr: '금요일', cz: 'pátek' },
                { kr: '토요일', cz: 'sobota' },
                { kr: '일요일', cz: 'neděle' },
                { kr: '오늘', cz: 'dnes' },
                { kr: '내일', cz: 'zítra' },
                { kr: '어제', cz: 'včera' }
            ],
            tasks: [
                'HODINA 1-4: Slovíčka (všech 64 slov, Anki marathon, psaní 3×)',
                'HODINA 5-6: Gramatika 이다/아니다 (20 vět)',
                'HODINA 7-8: Gramatika 은/는 vs 이/가 (20 vět)',
                'HODINA 9-10: Konverzace s přítelkyní - dny, představení, čísla',
                'HODINA 11-12: TEST TÝDNE 1'
            ],
            exercises: [
                '=== TEST TÝDNE 1 ===',
                '',
                'ČÁST A - SLOVÍČKA (přelož do korejštiny):',
                '1. dobrý den = ___',
                '2. děkuji (formálně) = ___',
                '3. já (formálně) = ___',
                '4. přítel = ___',
                '5. pondělí = ___',
                '',
                'ČÁST B - ČÍSLA:',
                '1. Telefonní číslo 010-1234-5678 korejsky = ___',
                '2. 25 let věku = ___ 살',
                '3. 3 hodiny = ___ 시',
                '4. 5000 wonů = ___ 원',
                '',
                'ČÁST C - 이다/아니다:',
                '1. Jsem Čech = 저는 ___',
                '2. Nejsem student = 저는 ___',
                '3. Dnes je neděle = 오늘은 ___',
                '',
                'ČÁST D - 은/는 vs 이/가:',
                '1. 물___ 있어요',
                '2. 저___ 학생이에요',
                '3. 커피___ 맛있어요',
                '4. 누___ 했어요?',
                '',
                '=== ODPOVĚDI ===',
                'A: 1.안녕하세요 2.감사합니다 3.저 4.친구 5.월요일',
                'B: 1.공일공-일이삼사-오육칠팔 2.스물다섯 3.세 4.오천',
                'C: 1.체코 사람이에요 2.학생이 아니에요 3.일요일이에요',
                'D: 1.이 2.는 3.는 4.가'
            ],
            notes: [
                'PROGRAM 12 HODIN:',
                '• 08:00-12:00 - Slovíčka marathon (všech 64)',
                '• 12:00-13:00 - Oběd + odpočinek',
                '• 13:00-15:00 - Gramatika 이다/아니다',
                '• 15:00-17:00 - Gramatika 은/는 vs 이/가',
                '• 17:00-19:00 - Konverzace',
                '• 19:00-20:00 - TEST TÝDNE 1',
                'CÍL: Minimálně 80% správných odpovědí'
            ],
            isWeekend: true,
            isTest: true
        },

        // ============================================================
        // TÝDEN 2: DNY 8-14 (9.2. - 15.2.2026)
        // ============================================================

        // DEN 8 - PO 9.2.2026 - Základní slovesa
        {
            day: 8,
            date: 'PO 9.2.2026',
            title: 'Základní slovesa',
            vocab: [
                { kr: '가다', cz: 'jít' },
                { kr: '오다', cz: 'přijít' },
                { kr: '보다', cz: 'vidět' },
                { kr: '먹다', cz: 'jíst' },
                { kr: '마시다', cz: 'pít' },
                { kr: '하다', cz: 'dělat' },
                { kr: '있다', cz: 'být/mít' },
                { kr: '없다', cz: 'nebýt/nemít' },
                { kr: '알다', cz: 'vědět' },
                { kr: '모르다', cz: 'nevědět' }
            ],
            grammar: {
                title: '있다/없다 - být/mít/existovat',
                explanation: `Slovesa 있다 a 없다 jsou ZÁKLADEM korejštiny. Mají dva významy:

VÝZNAMY:
1. EXISTENCE: Je tu X / Není tu X
2. VLASTNICTVÍ: Mám X / Nemám X

TVARY:
• 있다 → 있어요 (neformální), 있습니다 (formální)
• 없다 → 없어요 (neformální), 없습니다 (formální)

DŮLEŽITÉ PRAVIDLO:
S 있다/없다 VŽDY použij částici 이/가!
물이 있어요 (Je voda) - ne ~~물은 있어요~~
시간이 없어요 (Nemám čas) - ne ~~시간을 없어요~~

VZOREC:
[Místo]에 [Co]이/가 있어요/없어요
집에 물이 있어요 = Doma je voda`,
                examples: [
                    { kr: '물이 있어요', cz: 'Je tu voda / Mám vodu' },
                    { kr: '시간이 없어요', cz: 'Nemám čas' },
                    { kr: '문제가 있어요', cz: 'Je problém' },
                    { kr: '집에 친구가 있어요', cz: 'Doma je kamarád' },
                    { kr: '돈이 없어요', cz: 'Nemám peníze' }
                ]
            },
            tasks: [
                'Napiš každé sloveso 3× s překladem',
                'Vytvoř 5 vět s 있어요 a 5 vět s 없어요',
                'Přidej všech 10 sloves do Anki',
                'Konverzace: Co máš? Co nemáš?',
                'Procvič: 이/가 s 있다/없다'
            ],
            exercises: [
                '물___ 있어요 (이/가) → 이',
                '커피___ 없어요 (이/가) → 가',
                '시간___ 있어요 (이/가) → 이',
                '친구___ 없어요 (이/가) → 가',
                '문제___ 있어요 (이/가) → 가'
            ],
            notes: [
                'CHYBA: ~~물은 있어요~~ → 물이 있어요',
                'CHYBA: ~~시간을 없어요~~ → 시간이 없어요',
                '있다 se používá i pro "být někde": 집에 있어요 (Jsem doma)',
                'TIP: Myšlenka "Existuje X?" = X가 있어요?'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 9 - ÚT 10.2.2026 - Další slovesa
        {
            day: 9,
            date: 'ÚT 10.2.2026',
            title: 'Další slovesa',
            vocab: [
                { kr: '사다', cz: 'koupit' },
                { kr: '주다', cz: 'dát' },
                { kr: '받다', cz: 'dostat' },
                { kr: '쓰다', cz: 'psát/používat' },
                { kr: '읽다', cz: 'číst' },
                { kr: '듣다', cz: 'slyšet' },
                { kr: '말하다', cz: 'mluvit' },
                { kr: '배우다', cz: 'učit se' },
                { kr: '가르치다', cz: 'učit (někoho)' },
                { kr: '일하다', cz: 'pracovat' }
            ],
            grammar: {
                title: '을/를 - částice předmětu',
                explanation: `Částice 을/를 označuje PŘEDMĚT - CO děláme.

TVARY:
• Po souhlásce (má 받침): 을 (밥을, 책을)
• Po samohlásce (nemá 받침): 를 (커피를, 물를→물을)

POZOR - 물 je výjimka:
물 končí na ㄹ, což JE souhláska, proto 물을 (ne 물를)

KDY POUŽÍT 을/를:
Když říkáš, CO děláš - předmět slovesa.
밥을 먹어요 = Jím RÝŽI (co jím? → rýži)
커피를 마셔요 = Piju KÁVU (co piju? → kávu)

V HOVOROVÉM JAZYCE:
을/를 se často vynechává:
밥 먹어요 = Jím (rýži) - správně v běžné řeči`,
                examples: [
                    { kr: '밥을 먹어요', cz: 'Jím rýži' },
                    { kr: '커피를 마셔요', cz: 'Piju kávu' },
                    { kr: '책을 읽어요', cz: 'Čtu knihu' },
                    { kr: '한국어를 배워요', cz: 'Učím se korejštinu' },
                    { kr: '이것을 주세요', cz: 'Dejte mi tohle' }
                ]
            },
            tasks: [
                'Napiš 10 vět s 을/를',
                'Řekni co jíš, piješ, čteš, učíš se',
                'Přidej do Anki',
                'Konverzace: Co dnes děláš?',
                'Procvič: 을 vs 를'
            ],
            exercises: [
                '밥___ 먹어요 (을/를) → 을',
                '커피___ 마셔요 (을/를) → 를',
                '책___ 읽어요 (을/를) → 을',
                '음악___ 들어요 (을/를) → 을',
                '한국어___ 배워요 (을/를) → 를',
                '영화___ 봐요 (을/를) → 를'
            ],
            notes: [
                'CHYBA: ~~커피을~~ → 커피를 (커피 končí na samohlásku ㅣ)',
                'CHYBA: ~~밥를~~ → 밥을 (밥 končí na souhlásku ㅂ)',
                'TIP: V běžné řeči se 을/를 často vynechává',
                '듣다 je NEPRAVIDELNÉ: 듣다 → 들어요 (ㄷ→ㄹ)'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 10 - ST 11.2.2026 - Jídlo základní
        {
            day: 10,
            date: 'ST 11.2.2026',
            title: 'Jídlo základní',
            vocab: [
                { kr: '밥', cz: 'rýže/jídlo' },
                { kr: '물', cz: 'voda' },
                { kr: '고기', cz: 'maso' },
                { kr: '생선', cz: 'ryba' },
                { kr: '야채', cz: 'zelenina' },
                { kr: '과일', cz: 'ovoce' },
                { kr: '빵', cz: 'chléb' },
                { kr: '계란', cz: 'vejce' },
                { kr: '우유', cz: 'mléko' },
                { kr: '커피', cz: 'káva' }
            ],
            grammar: {
                title: '에 - místo, čas (statické)',
                explanation: `Částice 에 má DVA hlavní významy:

1. MÍSTO - KAM jdu / KDE jsem (staticky):
집에 가요 = Jdu DOMŮ (směr)
집에 있어요 = Jsem DOMA (místo)

2. ČAS - KDY:
9시에 가요 = Jdu V 9 hodin
월요일에 일해요 = Pracuji V pondělí

DŮLEŽITÉ ROZLIŠENÍ:
• 에 = KDE jsem (staticky), KAM jdu
• 에서 = KDE DĚLÁM něco (naučíme zítra)

VZORCE:
[Místo]에 가요/와요/있어요
[Čas]에 [sloveso]

POZOR:
오늘, 내일, 어제, 지금 se používají BEZ 에!
오늘 가요 (Dnes jdu) - ne ~~오늘에 가요~~`,
                examples: [
                    { kr: '집에 가요', cz: 'Jdu domů' },
                    { kr: '집에 있어요', cz: 'Jsem doma' },
                    { kr: '한국에 가요', cz: 'Jedu do Koreje' },
                    { kr: '9시에 일어나요', cz: 'Vstávám v 9' },
                    { kr: '월요일에 일해요', cz: 'V pondělí pracuji' }
                ]
            },
            tasks: [
                'Řekni kam jdeš: ___에 가요',
                'Řekni kde jsi: ___에 있어요',
                'Řekni v kolik: ___시에 ___',
                'Přidej do Anki',
                'Konverzace: Kam jdeš? Kde jsi?'
            ],
            exercises: [
                '집___ 가요 (에/에서) → 에',
                '학교___ 있어요 (에/에서) → 에',
                '7시___ 일어나요 (에/에서) → 에',
                '한국___ 가요 (에/에서) → 에',
                '화요일___ 공부해요 (에/에서) → 에',
                '오늘 가요 / 오늘___ 가요 → (에 nepotřeba)'
            ],
            notes: [
                'CHYBA: ~~오늘에 가요~~ → 오늘 가요 (오늘, 내일, 어제 bez 에)',
                'CHYBA: ~~지금에~~ → 지금 (지금 také bez 에)',
                '밥 znamená "rýže" i "jídlo" obecně',
                '밥 먹었어요? = Jedl jsi? (doslovně: Jedl jsi rýži?)'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 11 - ČT 12.2.2026 - Nápoje a chutě
        {
            day: 11,
            date: 'ČT 12.2.2026',
            title: 'Nápoje a chutě',
            vocab: [
                { kr: '차', cz: 'čaj' },
                { kr: '주스', cz: 'džus' },
                { kr: '술', cz: 'alkohol' },
                { kr: '맥주', cz: 'pivo' },
                { kr: '맛', cz: 'chuť' },
                { kr: '맛있다', cz: 'chutný' },
                { kr: '맛없다', cz: 'nechutný' },
                { kr: '달다', cz: 'sladký' },
                { kr: '짜다', cz: 'slaný' },
                { kr: '맵다', cz: 'pálivý' }
            ],
            grammar: {
                title: '에서 - místo akce',
                explanation: `Částice 에서 označuje KDE se DĚJE AKCE.

에 vs 에서 - KLÍČOVÝ ROZDÍL:
• 에 = Kde JE něco/někdo (statické), kam jdu
• 에서 = Kde DĚLÁM něco (akce)

PŘÍKLADY KONTRASTU:
집에 있어요 = Jsem doma (statické - kde JE)
집에서 일해요 = Pracuji doma (akce - kde DĚLÁM)

학교에 가요 = Jdu DO školy (směr)
학교에서 공부해요 = Studuji VE škole (akce)

PRAVIDLO:
• 있다/없다 → použij 에
• Akční slovesa (jíst, pracovat, studovat) → použij 에서

VZOREC:
[Místo]에서 [akční sloveso]`,
                examples: [
                    { kr: '식당에서 먹어요', cz: 'Jím v restauraci' },
                    { kr: '회사에서 일해요', cz: 'Pracuji ve firmě' },
                    { kr: '집에서 공부해요', cz: 'Studuji doma' },
                    { kr: '카페에서 커피를 마셔요', cz: 'Piju kávu v kavárně' },
                    { kr: '학교에서 한국어를 배워요', cz: 'Učím se korejštinu ve škole' }
                ]
            },
            tasks: [
                'Napiš 10 vět rozlišujících 에 a 에서',
                'Řekni kde pracuješ, studuješ, jíš',
                'Přidej do Anki',
                'Konverzace: Kde děláš různé věci?',
                'Procvič: 맛있어요 / 맛없어요'
            ],
            exercises: [
                '학교___ 가요 (에/에서) → 에',
                '학교___ 공부해요 (에/에서) → 에서',
                '집___ 있어요 (에/에서) → 에',
                '집___ 일해요 (에/에서) → 에서',
                '식당___ 밥을 먹어요 (에/에서) → 에서',
                '카페___ 커피를 마셔요 (에/에서) → 에서'
            ],
            notes: [
                'CHYBA: ~~식당에 먹어요~~ → 식당에서 먹어요 (jíst = akce)',
                'CHYBA: ~~집에서 있어요~~ → 집에 있어요 (být = statické)',
                '맛있다 [마싣따] - vyslov [마시따] kvůli 받침',
                '맵다 je NEPRAVIDELNÉ: 맵다 → 매워요 (ㅂ→ㅜ)'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 12 - PÁ 13.2.2026 - Místa
        {
            day: 12,
            date: 'PÁ 13.2.2026',
            title: 'Místa',
            vocab: [
                { kr: '집', cz: 'dům/domov' },
                { kr: '학교', cz: 'škola' },
                { kr: '회사', cz: 'firma' },
                { kr: '가게', cz: 'obchod' },
                { kr: '식당', cz: 'restaurace' },
                { kr: '카페', cz: 'kavárna' },
                { kr: '은행', cz: 'banka' },
                { kr: '병원', cz: 'nemocnice' },
                { kr: '약국', cz: 'lékárna' },
                { kr: '화장실', cz: 'záchod' }
            ],
            grammar: {
                title: 'Přehled částic - Opakování',
                explanation: `Shrnutí všech částic, které znáš:

TÉMATICKÉ ČÁSTICE:
• 은/는 = téma ("Co se X týče...")
  - Po souhlásce: 은 (물은)
  - Po samohlásce: 는 (커피는)

PODMĚTOVÉ ČÁSTICE:
• 이/가 = podmět (kdo/co konkrétně)
  - Po souhlásce: 이 (물이)
  - Po samohlásce: 가 (커피가)

PŘEDMĚTOVÉ ČÁSTICE:
• 을/를 = předmět (co dělám)
  - Po souhlásce: 을 (밥을)
  - Po samohlásce: 를 (커피를)

MÍSTNÍ/ČASOVÉ ČÁSTICE:
• 에 = směr, místo (statické), čas
• 에서 = místo akce

PRAVIDLA PRO 이/가:
Používej s: 있다/없다, 아니다, po 누가/뭐가`,
                examples: [
                    { kr: '저는 학생이에요', cz: 'Jsem student (téma 은/는)' },
                    { kr: '물이 있어요', cz: 'Je tu voda (podmět 이/가)' },
                    { kr: '밥을 먹어요', cz: 'Jím rýži (předmět 을/를)' },
                    { kr: '집에 가요', cz: 'Jdu domů (směr 에)' },
                    { kr: '식당에서 먹어요', cz: 'Jím v restauraci (místo akce 에서)' }
                ]
            },
            tasks: [
                'Napiš 20 vět s různými částicemi',
                'Procvič všechna místa - kam jdeš, kde jsi, kde děláš co',
                'Přidej do Anki',
                'Konverzace: Popiš svůj den s místy',
                'Zítra je sobota - připrav se na maraton!'
            ],
            exercises: [
                '저___ 체코 사람이에요 (은/는/이/가) → 는',
                '물___ 있어요 (은/는/이/가) → 이',
                '밥___ 먹어요 (을/를/에/에서) → 을',
                '집___ 가요 (을/를/에/에서) → 에',
                '식당___ 밥을 먹어요 (을/를/에/에서) → 에서',
                '화장실___ 어디예요? (은/는/이/가) → 이'
            ],
            notes: [
                '화장실이 어디예요? = Kde je záchod? (velmi užitečná věta!)',
                '약국 = lékárna, 병원 = nemocnice - nezaměňuj!',
                'TIP: Na stavbě řekni 화장실 어디예요? nebo ukázat rukou',
                'Zítra Valentýn! Nauč se 사랑해요 (miluji tě)'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 13 - SO 14.2.2026 - SOBOTNÍ MARATON (Valentýn!)
        {
            day: 13,
            date: 'SO 14.2.2026',
            title: '💕 SOBOTNÍ MARATON (8 hodin) - Valentýn!',
            vocab: [
                { kr: '공원', cz: 'park' },
                { kr: '역', cz: 'stanice' },
                { kr: '공항', cz: 'letiště' },
                { kr: '호텔', cz: 'hotel' },
                { kr: '편의점', cz: 'večerka' },
                { kr: '시장', cz: 'trh' },
                { kr: '마트', cz: 'supermarket' },
                { kr: '서점', cz: 'knihkupectví' }
            ],
            grammar: {
                title: '도 - také',
                explanation: `Částice 도 znamená "také" nebo "i".

DŮLEŽITÉ PRAVIDLO:
도 NAHRAZUJE ostatní částice (은/는, 이/가, 을/를)!
Nepoužíváš je současně.

BEZ 도 → S 도:
저는 학생이에요 → 저도 학생이에요 (Já TAKY jsem student)
커피를 마셔요 → 커피도 마셔요 (TAKY piju kávu)
물이 있어요 → 물도 있어요 (Voda TAKY je)

UŽITEČNÉ FRÁZE:
저도요 = Já taky! (velmi běžné)
이것도 주세요 = Dejte mi i tohle

POZICE:
도 jde vždy za slovo, které zdůrazňuješ:
- 저도 가요 = JÁ taky jdu
- 학교도 가요 = Do ŠKOLY taky jdu`,
                examples: [
                    { kr: '저도요', cz: 'Já taky' },
                    { kr: '이것도 주세요', cz: 'Dejte mi i tohle' },
                    { kr: '맥주도 주세요', cz: 'Dejte mi i pivo' },
                    { kr: '저도 한국어를 배워요', cz: 'Já se taky učím korejštinu' },
                    { kr: '친구도 왔어요', cz: 'Kamarád taky přišel' },
                    { kr: '사랑해요', cz: 'Miluji tě (Valentýn!)' }
                ]
            },
            tasks: [
                'HODINA 1-2: Anki všech 100+ slov z týdne 1-2',
                'HODINA 3-4: Gramatika - všechny částice (20 vět)',
                'HODINA 5: Valentýnská konverzace s přítelkyní - 사랑해요!',
                'HODINA 6-7: Cvičení s 도 a 에/에서',
                'HODINA 8: Pasivní poslech - korejská romantická hudba'
            ],
            exercises: [
                '저는 학생이에요 → 저___ 학생이에요 (taky) → 도',
                '커피를 마셔요 → 커피___ 마셔요 (taky) → 도',
                '물이 있어요 → 물___ 있어요 (taky) → 도',
                '공원___ 가요 (에/에서) → 에',
                '공원___ 운동해요 (에/에서) → 에서',
                '편의점___ 뭐를 사요? (에/에서) → 에서',
                '역___ 어디예요? (은/는/이/가) → 이',
                '맥주___ 주세요 (도/를) → 도',
                '이것___ 주세요 (도/를) → 도',
                '사랑___! (해요/이에요) → 해요'
            ],
            notes: [
                'PROGRAM 8 HODIN - Valentýn edition:',
                '• 09:00-11:00 - Slovíčka (všech 100+)',
                '• 11:00-13:00 - Gramatika (částice)',
                '• 13:00-14:00 - Oběd s přítelkyní',
                '• 14:00-15:00 - Valentýnská konverzace - 사랑해요!',
                '• 15:00-17:00 - Cvičení',
                '• 17:00-18:00 - Romantický poslech',
                'BONUS: Napiš přítelkyni valentýnku korejsky!'
            ],
            isWeekend: true,
            isTest: false
        },

        // DEN 14 - NE 15.2.2026 - NEDĚLNÍ MEGA OPAKOVÁNÍ + TEST
        {
            day: 14,
            date: 'NE 15.2.2026',
            title: '⭐ NEDĚLNÍ MEGA OPAKOVÁNÍ (12 hodin) + TEST',
            vocab: [],
            tasks: [
                'HODINA 1-4: Slovíčka marathon (všech 110 slov z týdne 1-2)',
                'HODINA 5-6: Gramatika 이다/아니다 + 있다/없다 (opakování)',
                'HODINA 7-8: Gramatika částice 은/는, 이/가, 을/를, 에, 에서, 도',
                'HODINA 9-10: Konverzace - kompletní scénáře',
                'HODINA 11-12: TEST TÝDNE 2'
            ],
            exercises: [
                '=== TEST TÝDNE 2 ===',
                '',
                'ČÁST A - SLOVÍČKA (přelož do korejštiny):',
                '1. jíst = ___',
                '2. pít = ___',
                '3. pracovat = ___',
                '4. restaurace = ___',
                '5. nemocnice = ___',
                '6. chutný = ___',
                '7. pálivý = ___',
                '8. park = ___',
                '',
                'ČÁST B - SLOVESA (vyčasuj):',
                '1. 가다 → ___ (jít)',
                '2. 먹다 → ___ (jíst)',
                '3. 마시다 → ___ (pít)',
                '4. 하다 → ___ (dělat)',
                '5. 있다 → ___ (být/mít)',
                '',
                'ČÁST C - ČÁSTICE (doplň správnou):',
                '1. 밥___ 먹어요 (co jím)',
                '2. 집___ 가요 (kam)',
                '3. 식당___ 먹어요 (kde - akce)',
                '4. 물___ 있어요 (co je)',
                '5. 저___ 학생이에요 (téma)',
                '6. 커피___ 주세요 (taky)',
                '',
                'ČÁST D - PŘEKLAD DO KOREJŠTINY:',
                '1. Jím rýži v restauraci = ___',
                '2. Jsem doma = ___',
                '3. Nemám čas = ___',
                '4. Piju i kávu = ___',
                '5. Je to chutné = ___',
                '',
                '=== ODPOVĚDI ===',
                'A: 1.먹다 2.마시다 3.일하다 4.식당 5.병원 6.맛있다 7.맵다 8.공원',
                'B: 1.가요 2.먹어요 3.마셔요 4.해요 5.있어요',
                'C: 1.을 2.에 3.에서 4.이 5.는 6.도',
                'D: 1.식당에서 밥을 먹어요 2.집에 있어요 3.시간이 없어요 4.커피도 마셔요 5.맛있어요'
            ],
            notes: [
                'PROGRAM 12 HODIN:',
                '• 08:00-12:00 - Slovíčka marathon (všech 110)',
                '• 12:00-13:00 - Oběd + odpočinek',
                '• 13:00-15:00 - Gramatika 이다/아니다/있다/없다',
                '• 15:00-17:00 - Gramatika částice',
                '• 17:00-19:00 - Konverzace scénáře',
                '• 19:00-20:00 - TEST TÝDNE 2',
                'CÍL: Minimálně 80% správných odpovědí',
                'PO TESTU: Zapiš si, co potřebuješ ještě procvičit'
            ],
            isWeekend: true,
            isTest: true
        },

        // ============================================================
        // TÝDEN 3: DNY 15-21 (16.2. - 22.2.2026) - Přídavná jména
        // ============================================================

        // DEN 15 - PO 16.2.2026
        {
            day: 15,
            date: 'PO 16.2.2026',
            title: 'Přídavná jména',
            vocab: [
                { kr: '좋다', cz: 'dobrý' },
                { kr: '나쁘다', cz: 'špatný' },
                { kr: '크다', cz: 'velký' },
                { kr: '작다', cz: 'malý' },
                { kr: '많다', cz: 'hodně' },
                { kr: '적다', cz: 'málo' },
                { kr: '새롭다', cz: 'nový' },
                { kr: '오래되다', cz: 'starý (věc)' },
                { kr: '빠르다', cz: 'rychlý' },
                { kr: '느리다', cz: 'pomalý' }
            ],
            grammar: {
                title: 'Přídavná jména - časování',
                explanation: `V korejštině se přídavná jména ČASUJÍ jako slovesa!

ZÁKLADNÍ PRAVIDLO (-아요/어요):
Kmen končí na ㅏ nebo ㅗ → -아요
Ostatní → -어요

PŘÍKLADY:
좋다 (dobrý): 좋 + 아요 = 좋아요
크다 (velký): 크 + 어요 = 커요 (kontrakce ㅡ+ㅓ=ㅓ)
작다 (malý): 작 + 아요 = 작아요
많다 (hodně): 많 + 아요 = 많아요

NEPRAVIDELNOST ㅂ:
Přídavná jména končící na ㅂ mění ㅂ na 우:
새롭다 → 새로 + 우 + 어요 = 새로워요
어렵다 → 어려 + 우 + 어요 = 어려워요
덥다 → 더 + 우 + 어요 = 더워요
춥다 → 추 + 우 + 어요 = 추워요`,
                examples: [
                    { kr: '날씨가 좋아요', cz: 'Počasí je dobré' },
                    { kr: '방이 커요', cz: 'Pokoj je velký' },
                    { kr: '사람이 많아요', cz: 'Je tu hodně lidí' },
                    { kr: '한국어가 어려워요', cz: 'Korejština je těžká' },
                    { kr: '오늘 더워요', cz: 'Dnes je horko' }
                ]
            },
            tasks: [
                'Napiš 10 vět s přídavnými jmény',
                'Procvič ㅂ nepravidelnost',
                'Přidej do Anki',
                'Konverzace: Popiš věci kolem sebe'
            ],
            exercises: [
                '좋다 → ___ (dobrý)', 
                '크다 → ___ (velký)', 
                '작다 → ___ (malý)', 
                '많다 → ___ (hodně)', 
                '새롭다 → ___ (nový)'
            ],
            notes: [
                'Odpovědi: 좋아요, 커요, 작아요, 많아요, 새로워요',
                'Pravidlo: ㅂ → 우, pak + 어요 = 워요'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 16 - ÚT 17.2.2026
        {
            day: 16,
            date: 'ÚT 17.2.2026',
            title: 'Další přídavná jména',
            vocab: [
                { kr: '비싸다', cz: 'drahý' },
                { kr: '싸다', cz: 'levný' },
                { kr: '맛있다', cz: 'chutný' },
                { kr: '맛없다', cz: 'nechutný' },
                { kr: '재미있다', cz: 'zábavný' },
                { kr: '재미없다', cz: 'nudný' },
                { kr: '쉽다', cz: 'snadný' },
                { kr: '어렵다', cz: 'těžký' },
                { kr: '덥다', cz: 'horký' },
                { kr: '춥다', cz: 'chladný' }
            ],
            grammar: {
                title: 'Modifikátor přídavného jména',
                explanation: `Když chceš říct "velký dům" nebo "nový člověk", musíš změnit přídavné jméno na MODIFIKÁTOR.

PRAVIDLO:
Kmen končí na samohlásku: přidej -ㄴ (크다→큰)
Kmen končí na souhlásku: přidej -은 (작다→작은)

S ㅂ NEPRAVIDELNOSTÍ:
ㅂ → 우 + ㄴ = 운
새롭다 → 새로운
어렵다 → 어려운
덥다 → 더운

PŘÍKLADY:
크다 → 큰 집 (velký dům)
작다 → 작은 방 (malý pokoj)
좋다 → 좋은 사람 (dobrý člověk)
새롭다 → 새로운 도구 (nový nástroj)`,
                examples: [
                    { kr: '큰 집', cz: 'velký dům' },
                    { kr: '작은 방', cz: 'malý pokoj' },
                    { kr: '좋은 사람', cz: 'dobrý člověk' },
                    { kr: '새로운 도구', cz: 'nový nástroj' },
                    { kr: '맛있는 음식', cz: 'chutné jídlo' }
                ]
            },
            tasks: [
                '10 kombinací přídavné jméno + podstatné jméno',
                'Popiš svůj pokoj/dům',
                'Přidej do Anki',
                'Konverzace: Jaký je tvůj pokoj?'
            ],
            exercises: [
                '크다 + 집 = ___ (velký dům)',
                '작다 + 방 = ___ (malý pokoj)',
                '새롭다 + 차 = ___ (nové auto)',
                '맛있다 + 음식 = ___ (chutné jídlo)',
                '어렵다 + 문제 = ___ (těžký problém)'
            ],
            notes: [
                'Odpovědi: 큰 집, 작은 방, 새로운 차, 맛있는 음식, 어려운 문제'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 17 - ST 18.2.2026
        {
            day: 17,
            date: 'ST 18.2.2026',
            title: 'Doprava',
            vocab: [
                { kr: '차', cz: 'auto' },
                { kr: '버스', cz: 'autobus' },
                { kr: '지하철', cz: 'metro' },
                { kr: '택시', cz: 'taxi' },
                { kr: '비행기', cz: 'letadlo' },
                { kr: '기차', cz: 'vlak' },
                { kr: '자전거', cz: 'kolo' },
                { kr: '타다', cz: 'jet/nastoupit' },
                { kr: '내리다', cz: 'vystoupit' },
                { kr: '걷다', cz: 'chodit' }
            ],
            tasks: [
                'Řekni jak cestuješ: ___을/를 타요',
                'Napiš 5 vět o cestování',
                'Přidej do Anki',
                'Konverzace: Jak jezdíš do práce?'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 18 - ČT 19.2.2026
        {
            day: 18,
            date: 'ČT 19.2.2026',
            title: 'Emoce a stavy',
            vocab: [
                { kr: '피곤하다', cz: 'unavený' },
                { kr: '배고프다', cz: 'hladový' },
                { kr: '목마르다', cz: 'žíznivý' },
                { kr: '졸리다', cz: 'ospalý' },
                { kr: '바쁘다', cz: 'zaneprázdněný' },
                { kr: '행복하다', cz: 'šťastný' },
                { kr: '슬프다', cz: 'smutný' },
                { kr: '기쁘다', cz: 'radostný' },
                { kr: '화나다', cz: 'naštvaný' },
                { kr: '아프다', cz: 'bolet/nemocný' }
            ],
            tasks: [
                'Řekni jak se cítíš: 저는 ___아요/어요',
                'Napiš 10 vět o pocitech',
                'Přidej do Anki',
                'Konverzace: Jak se dnes cítíš?'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 19 - PÁ 20.2.2026
        {
            day: 19,
            date: 'PÁ 20.2.2026',
            title: 'Denní rutina',
            vocab: [
                { kr: '일어나다', cz: 'vstát' },
                { kr: '자다', cz: 'spát' },
                { kr: '씻다', cz: 'mýt se' },
                { kr: '샤워하다', cz: 'sprchovat se' },
                { kr: '이를 닦다', cz: 'čistit zuby' },
                { kr: '옷을 입다', cz: 'obléknout se' },
                { kr: '아침을 먹다', cz: 'snídat' },
                { kr: '출근하다', cz: 'jít do práce' },
                { kr: '퇴근하다', cz: 'odejít z práce' },
                { kr: '잠을 자다', cz: 'jít spát' }
            ],
            tasks: [
                'Popiš svůj denní rozvrh',
                'Řekni co děláš v kolik: ___시에 ___아요/어요',
                'Přidej do Anki',
                'Konverzace: Jaký je tvůj typický den?'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 20 - SO 21.2.2026 - SOBOTNÍ MARATON
        {
            day: 20,
            date: 'SO 21.2.2026',
            title: '⭐ SOBOTNÍ MARATON (8 hodin) - Stavební základy',
            vocab: [
                { kr: '건설', cz: 'stavebnictví' },
                { kr: '공사', cz: 'stavební práce' },
                { kr: '현장', cz: 'staveniště' },
                { kr: '작업', cz: 'práce/úkol' },
                { kr: '안전', cz: 'bezpečnost' },
                { kr: '헬멧', cz: 'helma' },
                { kr: '장갑', cz: 'rukavice' },
                { kr: '도구', cz: 'nástroj' },
                { kr: '망치', cz: 'kladivo' },
                { kr: '드릴', cz: 'vrtačka' },
                { kr: '톱', cz: 'pila' },
                { kr: '삽', cz: 'lopata' },
                { kr: '사다리', cz: 'žebřík' },
                { kr: '측정', cz: 'měření' },
                { kr: '줄자', cz: 'svinovací metr' }
            ],
            grammar: {
                title: '-고 싶다 - chtít',
                explanation: `Struktura -고 싶다 vyjadřuje "chtít něco dělat".

VZOREC:
Slovesný kmen + 고 싶다
가다 (jít) → 가고 싶다 → 가고 싶어요 (chci jít)
먹다 (jíst) → 먹고 싶다 → 먹고 싶어요 (chci jíst)

NEGACE:
-고 싶지 않다 = nechci
가고 싶지 않아요 = Nechci jít

OTÁZKA:
뭐 하고 싶어요? = Co chceš dělat?
어디 가고 싶어요? = Kam chceš jít?`,
                examples: [
                    { kr: '한국에 가고 싶어요', cz: 'Chci jet do Koreje' },
                    { kr: '밥을 먹고 싶어요', cz: 'Chci jíst' },
                    { kr: '쉬고 싶어요', cz: 'Chci si odpočinout' },
                    { kr: '자고 싶어요', cz: 'Chci spát' },
                    { kr: '뭐 하고 싶어요?', cz: 'Co chceš dělat?' }
                ]
            },
            tasks: [
                'HODINA 1-2: Slovíčka týdne (všech 145)',
                'HODINA 3-4: Gramatika - přídavná jména + -고 싶다',
                'HODINA 5: Konverzace s přítelkyní',
                'HODINA 6-7: Stavební slovíčka - cvičení',
                'HODINA 8: Pasivní poslech'
            ],
            notes: [
                'Program maratonu:',
                'Hodina 1-2: Slovíčka týdne (všech 145)',
                'Hodina 3-4: Gramatika - přídavná jména',
                'Hodina 5: Konverzace s přítelkyní',
                'Hodina 6-7: Stavební slovíčka - cvičení',
                'Hodina 8: Pasivní poslech'
            ],
            isWeekend: true,
            isTest: false
        },

        // DEN 21 - NE 22.2.2026 - NEDĚLNÍ MEGA OPAKOVÁNÍ + TEST
        {
            day: 21,
            date: 'NE 22.2.2026',
            title: '⭐ NEDĚLNÍ MEGA OPAKOVÁNÍ (12 hodin) + TEST',
            vocab: [
                { kr: '어떻게 지내세요?', cz: 'Jak se máte?' },
                { kr: '잘 지내요', cz: 'Mám se dobře' },
                { kr: '처음 뵙겠습니다', cz: 'Těší mě (formální)' },
                { kr: '만나서 반가워요', cz: 'Těší mě' },
                { kr: '알겠어요', cz: 'Rozumím' },
                { kr: '모르겠어요', cz: 'Nerozumím' },
                { kr: '다시 말해 주세요', cz: 'Zopakujte prosím' },
                { kr: '천천히 말해 주세요', cz: 'Mluvte pomalu' },
                { kr: '한국어로 뭐예요?', cz: 'Jak se to řekne korejsky?' },
                { kr: '화이팅', cz: 'Bojuj!/Hodně štěstí!' }
            ],
            exercises: [
                '=== TEST TÝDNE 3 ===',
                '',
                'ČÁST A - PŘÍDAVNÁ JMÉNA (vyčasuj):',
                '1. 좋다 → ___',
                '2. 크다 → ___',
                '3. 어렵다 → ___',
                '4. 덥다 → ___',
                '',
                'ČÁST B - MODIFIKÁTORY:',
                '1. 크다 + 집 = ___',
                '2. 새롭다 + 집 = ___',
                '3. 맛있다 + 음식 = ___',
                '',
                'ČÁST C - SLOVÍČKA:',
                '1. unavený = ___',
                '2. hladový = ___',
                '3. staveniště = ___',
                '4. kladivo = ___',
                '',
                '=== ODPOVĚDI ===',
                'A: 1.좋아요 2.커요 3.어려워요 4.더워요',
                'B: 1.큰 집 2.새로운 집 3.맛있는 음식',
                'C: 1.피곤하다 2.배고프다 3.현장 4.망치'
            ],
            isWeekend: true,
            isTest: true
        },

        // ============================================================
        // TÝDEN 4: DNY 22-28 (23.2. - 1.3.2026) - Opakování
        // ============================================================

        // DEN 22 - PO 23.2.2026
        {
            day: 22,
            date: 'PO 23.2.2026',
            title: 'Opakování: Částice',
            vocab: [],
            notes: [
                'Dnes žádná nová slovíčka - soustřeď se na opakování.',
                'Přehled částic:',
                '은/는 = Téma (저는 학생이에요)',
                '이/가 = Podmět (물이 있어요)',
                '을/를 = Předmět (밥을 먹어요)',
                '에 = Místo/čas (집에 가요, 7시에)',
                '에서 = Místo akce (집에서 일해요)',
                '도 = Také (저도요)'
            ],
            tasks: [
                '50 vět s různými částicemi',
                'Anki všechna slovíčka',
                'Konverzace s přítelkyní'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 23 - ÚT 24.2.2026
        {
            day: 23,
            date: 'ÚT 24.2.2026',
            title: 'Opakování: Slovesa a vyčasování',
            vocab: [],
            notes: [
                'Přehled sloves:',
                '가다→가요 (jít), 오다→와요 (přijít), 먹다→먹어요 (jíst)',
                '마시다→마셔요 (pít), 하다→해요 (dělat), 있다→있어요 (být/mít)',
                '없다→없어요 (nebýt/nemít), 보다→봐요 (vidět)',
                '사다→사요 (koupit), 알다→알아요 (vědět)'
            ],
            tasks: [
                'Vyčasuj všechna slovesa',
                '30 vět se slovesy',
                'Anki session'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 24 - ST 25.2.2026
        {
            day: 24,
            date: 'ST 25.2.2026',
            title: 'Opakování: Přídavná jména',
            vocab: [],
            notes: [
                'Přehled přídavných jmen:',
                '좋다→좋아요→좋은 (dobrý)',
                '크다→커요→큰 (velký)',
                '작다→작아요→작은 (malý)',
                '새롭다→새로워요→새로운 (nový)',
                '어렵다→어려워요→어려운 (těžký)',
                '맛있다→맛있어요→맛있는 (chutný)'
            ],
            tasks: [
                '20 vět s přídavnými jmény',
                '20 kombinací přídavné + podstatné jméno',
                'Anki session'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 25 - ČT 26.2.2026
        {
            day: 25,
            date: 'ČT 26.2.2026',
            title: 'Opakování: Čísla',
            vocab: [],
            notes: [
                'Sino-korejská (pro telefon, datum, peníze, minuty):',
                '일, 이, 삼, 사, 오, 육, 칠, 팔, 구, 십, 백, 천, 만',
                '',
                'Nativní (pro hodiny, věk, počítání):',
                '하나(한), 둘(두), 셋(세), 넷(네), 다섯, 여섯, 일곱, 여덟, 아홉, 열'
            ],
            tasks: [
                'Řekni své telefonní číslo',
                'Řekni svůj věk',
                'Řekni kolik je hodin',
                'Anki session'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 26 - PÁ 27.2.2026
        {
            day: 26,
            date: 'PÁ 27.2.2026',
            title: 'Opakování: Výslovnost',
            vocab: [],
            notes: [
                '받침: 7 zvuků - ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ',
                '연음 (linking): 한국어 → [한구거]',
                'ㅎ 약화 (H-weakening): 좋아요 → [조아요]'
            ],
            tasks: [
                'Přečti nahlas 50 slov',
                'Soustřeď se na výslovnost',
                'Nahrávej se a poslouchej'
            ],
            isWeekend: false,
            isTest: false
        },

        // DEN 27 - SO 28.2.2026
        {
            day: 27,
            date: 'SO 28.2.2026',
            title: '⭐ SOBOTNÍ MARATON - PŘÍPRAVA NA TEST (8 hodin)',
            vocab: [],
            notes: [
                'Program:',
                'Hodina 1-3: Všech 200 slovíček',
                'Hodina 4-5: Všech 10 gramatik',
                'Hodina 6: Konverzace',
                'Hodina 7-8: Mock test'
            ],
            isWeekend: true,
            isTest: false
        },

        // DEN 28 - NE 1.3.2026
        {
            day: 28,
            date: 'NE 1.3.2026',
            title: '📝 MĚSÍČNÍ TEST ÚNORA - ÚROVEŇ A1',
            vocab: [],
            notes: [
                'TEST ÚNORA - ÚROVEŇ A1',
                'Čas: 2 hodiny',
                'Celkem: 100 bodů',
                '',
                'ČÁST A: SLOVÍČKA (25 bodů)',
                'ČÁST B: ČÍSLA (15 bodů)',
                'ČÁST C: ČÁSTICE (20 bodů)',
                'ČÁST D: VYČASOVÁNÍ (20 bodů)',
                'ČÁST E: PŘEKLAD (20 bodů)'
            ],
            exercises: [
                '=== MĚSÍČNÍ TEST ÚNORA ===',
                '',
                'A. Slovíčka (25 bodů):',
                'dobrý den, děkuji, jíst, pít, restaurace, unavený, kladivo, staveniště, pondělí, miluji tě',
                '',
                'B. Čísla (15 bodů):',
                'telefonní číslo, hodiny, věk, peníze, čas',
                '',
                'C. Částice (20 bodů):',
                '은/는, 이/가, 을/를, 에, 에서, 도',
                '',
                'D. Vyčasování (20 bodů):',
                '가다, 오다, 먹다, 마시다, 하다, 있다, 보다, 좋다, 크다, 어렵다',
                '',
                'E. Překlad (20 bodů):',
                'Jsem Čech, Jdu domů, Jím rýži, Jsem ve firmě, Pracuji doma,',
                'Je velký dům, Mám se dobře, Vstávám v 7 hodin, Káva je chutná, Nerozumím'
            ],
            isWeekend: true,
            isTest: true
        }
    ] as KoreanDayData[]
};

export default februaryData;
