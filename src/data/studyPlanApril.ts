/**
 * April 2026 - Korean Study Plan
 * Month 3/10 - Level A2
 * Days 60-89
 * 
 * SPECIÁLNÍ STRUKTURA:
 * - Dny 60-69: Normální studium (cestovní příprava)
 * - Dny 70-84: CESTA V KOREJI (jen praxe, deník)
 * - Dny 85-89: Návrat (zpracování zážitků)
 * 
 * DŮLEŽITÉ: BEZ ANGLIČTINY - pouze 한국어 + Česky
 */

import type { KoreanMonthData, KoreanDayData } from '../types/study-db';

// ============ DNY 60-69: PŘED CESTOU - NORMÁLNÍ STUDIUM ============

// Den 60 - ST 1.4.2026 - Letiště 1
const day60: KoreanDayData = {
    day: 60,
    date: 'ST 1.4.2026',
    title: '✈️ Letiště - základy',
    vocab: [
        { kr: '탑승구', cz: 'gate (brána k letadlu)' },
        { kr: '보안검색', cz: 'bezpečnostní kontrola' },
        { kr: '면세점', cz: 'duty-free obchod' },
        { kr: '환전', cz: 'směnárna/směna peněz' },
        { kr: '대기실', cz: 'čekárna' },
        { kr: '지연', cz: 'zpoždění' },
        { kr: '결항', cz: 'zrušení letu' },
        { kr: '연착', cz: 'zpoždění příjezdu' },
        { kr: '출발', cz: 'odlet' },
        { kr: '도착', cz: 'přílet' }
    ],
    grammar: {
        title: '-(으)ㄹ 거예요 - budoucí čas',
        explanation: `Vyjadřuje BUDOUCÍ čas - co se stane, co uděláš.

PRAVIDLO VÝBĚRU:
• Kmen končí na SAMOHLÁSKU nebo ㄹ → -ㄹ 거예요
• Kmen končí na SOUHLÁSKU → -을 거예요

PŘÍKLADY TVORBY:
가다 (jít):
  kmen = 가 (samohláska)
  가 + ㄹ 거예요 = 갈 거예요
  Půjdu.

먹다 (jíst):
  kmen = 먹 (souhláska)
  먹 + 을 거예요 = 먹을 거예요
  Budu jíst.

하다 (dělat):
  kmen = 하 (samohláska)
  하 + ㄹ 거예요 = 할 거예요
  Budu dělat.

ㄹ KMEN - přidáme jen 거예요:
살다 (žít): 살 + 거예요 = 살 거예요 (budu žít)
알다 (vědět): 알 + 거예요 = 알 거예요 (budu vědět)

OTÁZKA:
뭐 할 거예요? = Co budeš dělat?
어디 갈 거예요? = Kam půjdeš?

ZÁPOR:
안 + budoucí čas: 안 갈 거예요 (nepůjdu)
못 + budoucí čas: 못 갈 거예요 (nebudu moci jít)`,
        examples: [
            { kr: '내일 한국에 갈 거예요.', cz: 'Zítra pojedu do Koreje.' },
            { kr: '비행기를 탈 거예요.', cz: 'Poletím letadlem.' },
            { kr: '뭐 먹을 거예요?', cz: 'Co budeš jíst?' },
            { kr: '공항에서 만날 거예요.', cz: 'Setkáme se na letišti.' },
            { kr: '면세점에서 쇼핑할 거예요.', cz: 'Budu nakupovat v duty-free.' },
            { kr: '비행기가 지연될 거예요.', cz: 'Letadlo bude mít zpoždění.' }
        ]
    },
    tasks: [
        'Napiš všech 10 letištních slovíček 3× do sešitu',
        'Vytvoř 15 vět s budoucím časem -(으)ㄹ 거예요',
        'Procvič: 뭐 할 거예요? + odpovědi',
        'Přidej všechna slovíčka do Anki s obrázky letiště'
    ],
    exercises: [
        '가다 → ___ → 갈 거예요 (půjdu)',
        '먹다 → ___ → 먹을 거예요 (budu jíst)',
        '하다 → ___ → 할 거예요 (budu dělat)',
        '보다 → ___ → 볼 거예요 (uvidím)',
        '타다 → ___ → 탈 거예요 (nastoupím)',
        '사다 → ___ → 살 거예요 (koupím)',
        '마시다 → ___ → 마실 거예요 (budu pít)',
        '만나다 → ___ → 만날 거예요 (potkám se)'
    ],
    notes: [
        'TIP: -(으)ㄹ 거예요 je podobné anglickému "will" nebo "going to"',
        '탑승구 = 탑승 (nastoupení) + 구 (brána)',
        '면세점 = 면세 (bez daně) + 점 (obchod)',
        '환전 = 환 (měnit) + 전 (peníze)'
    ],
    isWeekend: false,
    isTest: false
};

// Den 61 - ČT 2.4.2026 - Letiště 2
const day61: KoreanDayData = {
    day: 61,
    date: 'ČT 2.4.2026',
    title: '✈️ V letadle',
    vocab: [
        { kr: '기내', cz: 'v letadle (paluba)' },
        { kr: '좌석', cz: 'sedadlo' },
        { kr: '창가', cz: 'u okna (sedadlo)' },
        { kr: '복도', cz: 'u uličky (sedadlo)' },
        { kr: '비상구', cz: 'nouzový východ' },
        { kr: '안전벨트', cz: 'bezpečnostní pás' },
        { kr: '기내식', cz: 'jídlo v letadle' },
        { kr: '승무원', cz: 'letuška/stevard' },
        { kr: '기장', cz: 'kapitán letadla' },
        { kr: '이륙', cz: 'vzlet' }
    ],
    tasks: [
        'Napiš 10 slovíček 3× do sešitu',
        'Vytvoř dialog v letadle se stevardkou',
        'Procvič: 창가 좌석 주세요 (Sedadlo u okna prosím)',
        'Přidej do Anki'
    ],
    exercises: [
        '창가 좌석 있어요? = Máte sedadlo u ___?',
        '복도 좌석이 좋아요 = Sedadlo u ___ je lepší',
        '안전벨트를 매세요 = ___ si bezpečnostní pás',
        '기내식 뭐예요? = Co je to za ___?',
        '비상구가 어디예요? = Kde je ___?'
    ],
    notes: [
        '기내 = 기 (letadlo/stroj) + 내 (uvnitř)',
        '창가 = 창 (okno) + 가 (místo u)',
        '안전벨트를 매다 = zapnout bezpečnostní pás',
        'V korejských letadlech často slyšíš: 이륙합니다 (Vzlétáme)'
    ],
    isWeekend: false,
    isTest: false
};

// Den 62 - PÁ 3.4.2026 - Hotel 1
const day62: KoreanDayData = {
    day: 62,
    date: 'PÁ 3.4.2026',
    title: '🏨 Hotel - check-in',
    vocab: [
        { kr: '호텔', cz: 'hotel' },
        { kr: '체크인', cz: 'check-in' },
        { kr: '체크아웃', cz: 'check-out' },
        { kr: '열쇠', cz: 'klíč' },
        { kr: '방', cz: 'pokoj' },
        { kr: '싱글룸', cz: 'jednolůžkový pokoj' },
        { kr: '더블룸', cz: 'dvoulůžkový pokoj' },
        { kr: '조식', cz: 'snídaně (hotelová)' },
        { kr: '프론트', cz: 'recepce' },
        { kr: '엘리베이터', cz: 'výtah' }
    ],
    grammar: {
        title: '-는 중이다 - právě teď (probíhající akce)',
        explanation: `Vyjadřuje, že akce právě PROBÍHÁ - "jsem uprostřed..."

STRUKTURA:
Slovesný kmen + 는 중이에요

PŘÍKLADY:
가다 (jít):
  가 + 는 중이에요 = 가는 중이에요
  Právě jdu. (jsem na cestě)

먹다 (jíst):
  먹 + 는 중이에요 = 먹는 중이에요
  Právě jím.

하다 (dělat):
  하 + 는 중이에요 = 하는 중이에요
  Právě dělám.

공부하다 (studovat):
  공부하 + 는 중이에요 = 공부하는 중이에요
  Právě studuji.

OTÁZKA:
뭐 하는 중이에요? = Co právě děláš?
지금 뭐 하는 중이에요? = Co teď právě děláš?

POZOR:
는 중이다 se používá JEN s AKČNÍMI slovesy!
Nemůžeš říct ~~있는 중이에요~~ (být)`,
        examples: [
            { kr: '지금 체크인하는 중이에요.', cz: 'Právě se přihlašuji (check-in).' },
            { kr: '짐을 풀고 있는 중이에요.', cz: 'Právě vybaluji.' },
            { kr: '샤워하는 중이에요.', cz: 'Právě se sprchuji.' },
            { kr: '뭐 하는 중이에요?', cz: 'Co právě děláš?' },
            { kr: '전화하는 중이에요.', cz: 'Právě telefonuji.' },
            { kr: '한국어를 배우는 중이에요.', cz: 'Právě se učím korejsky.' }
        ]
    },
    tasks: [
        'Napiš 10 hotelových slovíček 3×',
        'Vytvoř 10 vět s -는 중이에요',
        'Role-play: check-in v hotelu',
        'Přidej do Anki'
    ],
    exercises: [
        '가다 → ___ → 가는 중이에요 (právě jdu)',
        '먹다 → ___ → 먹는 중이에요 (právě jím)',
        '하다 → ___ → 하는 중이에요 (právě dělám)',
        '체크인하다 → ___ → 체크인하는 중이에요',
        '공부하다 → ___ → 공부하는 중이에요',
        '전화하다 → ___ → 전화하는 중이에요',
        '샤워하다 → ___ → 샤워하는 중이에요'
    ],
    notes: [
        'TIP: -는 중이다 = "být uprostřed něčeho"',
        '조식 = 조 (ráno) + 식 (jídlo) = snídaně',
        '프론트 je z angličtiny "front desk"',
        'V Koreji: 모닝콜 = budíček (wake-up call)'
    ],
    isWeekend: false,
    isTest: false
};

// Den 63 - SO 4.4.2026 - Hotel 2
const day63: KoreanDayData = {
    day: 63,
    date: 'SO 4.4.2026',
    title: '🏨 Hotel - vybavení',
    vocab: [
        { kr: '짐', cz: 'zavazadlo/kufr' },
        { kr: '청소', cz: 'úklid' },
        { kr: '수건', cz: 'ručník' },
        { kr: '비누', cz: 'mýdlo' },
        { kr: '샴푸', cz: 'šampon' },
        { kr: '에어컨', cz: 'klimatizace' },
        { kr: '난방', cz: 'topení' },
        { kr: '와이파이', cz: 'wifi' },
        { kr: '금고', cz: 'trezor' },
        { kr: '미니바', cz: 'minibar' }
    ],
    tasks: [
        'SOBOTNÍ MARATON (8 hodin)',
        'Hodina 1-2: Opakování slovíček dny 60-62',
        'Hodina 3-4: Gramatika budoucí čas + probíhající akce',
        'Hodina 5: Konverzace - letiště a hotel',
        'Hodina 6-7: Role-play scénáře',
        'Hodina 8: Pasivní poslech - korejská cestovatelská videa'
    ],
    exercises: [
        '수건 좀 더 주세요 = Dejte mi víc ___',
        '청소 안 해 주세요 = ___ prosím nedělejte',
        '와이파이 비밀번호가 뭐예요? = Jaké je heslo na ___?',
        '에어컨이 안 돼요 = ___ nefunguje',
        '난방을 켜 주세요 = Zapněte mi ___'
    ],
    notes: [
        '청소해 주세요 = Ukliďte prosím',
        '청소 안 해 주세요 = Prosím neuklízejte (když chceš soukromí)',
        '짐을 맡기다 = uložit zavazadlo',
        'V Koreji: 온돌 = podlahové vytápění (tradiční)'
    ],
    isWeekend: true,
    isTest: false
};

// Den 64 - NE 5.4.2026 - Taxi
const day64: KoreanDayData = {
    day: 64,
    date: 'NE 5.4.2026',
    title: '🚕 Taxi a doprava',
    vocab: [
        { kr: '택시', cz: 'taxi' },
        { kr: '기사님', cz: 'řidič (zdvořile)' },
        { kr: '어디까지요?', cz: 'kam jedete?' },
        { kr: '여기서 세워 주세요', cz: 'zastavte tady prosím' },
        { kr: '카드로 할게요', cz: 'budu platit kartou' },
        { kr: '현금으로 할게요', cz: 'budu platit hotově' },
        { kr: '영수증 주세요', cz: 'účtenku prosím' },
        { kr: '얼마예요?', cz: 'kolik to stojí?' },
        { kr: '잔돈', cz: 'drobné (nazpět)' },
        { kr: '트렁크', cz: 'kufr auta' }
    ],
    grammar: {
        title: '-(으)ㄹ 수 있다/없다 - moci/nemoci',
        explanation: `Vyjadřuje SCHOPNOST nebo MOŽNOST - můžu/nemůžu.

STRUKTURA:
Kmen + (으)ㄹ 수 있어요 = můžu
Kmen + (으)ㄹ 수 없어요 = nemůžu

PRAVIDLO:
• Kmen na samohlásku/ㄹ → -ㄹ 수 있어요
• Kmen na souhlásku → -을 수 있어요

PŘÍKLADY:
가다 (jít):
  갈 수 있어요 = Můžu jít.
  갈 수 없어요 = Nemůžu jít.

먹다 (jíst):
  먹을 수 있어요 = Můžu jíst.
  먹을 수 없어요 = Nemůžu jíst.

하다 (dělat):
  할 수 있어요 = Můžu udělat.
  할 수 없어요 = Nemůžu udělat.

OTÁZKA:
할 수 있어요? = Můžeš to udělat?
여기서 먹을 수 있어요? = Můžu tady jíst?

ROZDÍL 못 vs -(으)ㄹ 수 없다:
못 = kratší, hovorovější
-(으)ㄹ 수 없다 = delší, formálnější`,
        examples: [
            { kr: '카드로 낼 수 있어요?', cz: 'Můžu platit kartou?' },
            { kr: '여기서 내릴 수 있어요?', cz: 'Můžu tady vystoupit?' },
            { kr: '한국어를 할 수 있어요.', cz: 'Umím korejsky.' },
            { kr: '지금 갈 수 없어요.', cz: 'Teď nemůžu jít.' },
            { kr: '택시를 탈 수 있어요?', cz: 'Můžu jet taxíkem?' },
            { kr: '트렁크에 넣을 수 있어요?', cz: 'Můžete to dát do kufru?' }
        ]
    },
    tasks: [
        'NEDĚLNÍ MARATON (12 hodin)',
        'Hodina 1-4: Všech 40 slovíček z týdne',
        'Hodina 5-7: Gramatika - budoucí čas, probíhající, moci',
        'Hodina 8-9: Konverzace - taxi role-play',
        'Hodina 10-11: Dialogy letiště-hotel-taxi',
        'Hodina 12: Příprava na test'
    ],
    exercises: [
        '가다 → 갈 수 있어요 / 갈 수 없어요',
        '먹다 → ___ 수 있어요 / ___ 수 없어요',
        '하다 → ___ 수 있어요 / ___ 수 없어요',
        '보다 → ___ 수 있어요 / ___ 수 없어요',
        '타다 → ___ 수 있어요 / ___ 수 없어요',
        '내리다 → ___ 수 있어요 / ___ 수 없어요'
    ],
    notes: [
        'V taxi: 기사님 = řidič (zdvořilé oslovení)',
        '어디까지요? = Kam to bude? (řidič se ptá)',
        '똑바로 가 주세요 = Jeďte rovně',
        '좌회전/우회전 = odbočit vlevo/vpravo'
    ],
    isWeekend: true,
    isTest: false
};

// Den 65 - PO 6.4.2026 - Nouzové fráze
const day65: KoreanDayData = {
    day: 65,
    date: 'PO 6.4.2026',
    title: '🆘 Nouzové fráze',
    vocab: [
        { kr: '도와주세요', cz: 'pomozte mi' },
        { kr: '경찰', cz: 'policie' },
        { kr: '병원', cz: 'nemocnice' },
        { kr: '약국', cz: 'lékárna' },
        { kr: '아파요', cz: 'bolí mě / jsem nemocný' },
        { kr: '길을 잃었어요', cz: 'ztratil jsem se' },
        { kr: '한국어 못해요', cz: 'neumím korejsky' },
        { kr: '천천히 말해 주세요', cz: 'mluvte pomalu prosím' },
        { kr: '다시 한 번', cz: 'ještě jednou' },
        { kr: '이해 못 했어요', cz: 'nerozuměl jsem' }
    ],
    tasks: [
        'NAUČ SE VŠECHNY FRÁZE NAZPAMĚŤ!',
        'Řekni každou frázi 20×',
        'Role-play: nouzové situace',
        'Přidej do Anki jako prioritní'
    ],
    exercises: [
        'Jak zavoláš o pomoc? → ___',
        'Jak řekneš, že jsi ztracený? → ___',
        'Jak požádáš, aby mluvili pomalu? → ___',
        'Jak řekneš, že nerozumíš? → ___',
        'Kde je nemocnice? → ___ 어디예요?'
    ],
    notes: [
        '도와주세요! = POMOZTE! (kritická fráze)',
        '경찰을 불러 주세요 = Zavolejte policii',
        '119 = tísňová linka v Koreji (hasiči, záchranka)',
        '112 = policie v Koreji',
        'TIP: Ukaž telefon s přeloženým textem, když nevíš'
    ],
    isWeekend: false,
    isTest: false
};

// Den 66 - ÚT 7.4.2026 - Restaurace v Koreji
const day66: KoreanDayData = {
    day: 66,
    date: 'ÚT 7.4.2026',
    title: '🍜 Restaurace v Koreji',
    vocab: [
        { kr: '저기요', cz: 'promiňte/hej (volání obsluhy)' },
        { kr: '주문이요', cz: 'objednávám' },
        { kr: '여기 앉아도 돼요?', cz: 'můžu si tady sednout?' },
        { kr: '화장실 어디예요?', cz: 'kde je záchod?' },
        { kr: '물 좀 주세요', cz: 'vodu prosím' },
        { kr: '맛있게 드세요', cz: 'dobrou chuť (říká obsluha)' },
        { kr: '잘 먹겠습니다', cz: 'budu jíst (před jídlem)' },
        { kr: '잘 먹었습니다', cz: 'jedl jsem dobře (po jídle)' },
        { kr: '배불러요', cz: 'jsem plný/najedený' },
        { kr: '맵지 않게 해 주세요', cz: 'udělejte to nepálivé prosím' }
    ],
    grammar: {
        title: '-아/어 보다 - zkusit něco',
        explanation: `Vyjadřuje ZKUŠENÍ nebo VYZKOUŠENÍ něčeho.

STRUKTURA:
Kmen + 아/어 보다
(Stejné pravidlo jako -아/어요)

PRAVIDLO:
• Kmen má ㅏ/ㅗ → -아 보다: 가보다, 와 보다
• Ostatní → -어 보다: 먹어 보다, 마셔 보다
• 하다 → 해 보다

ČASOVÁNÍ:
먹어 보다 → 먹어 봐요 (zkus ochutnat)
먹어 보다 → 먹어 봤어요 (ochutnal jsem)
먹어 보다 → 먹어 볼 거예요 (zkusím ochutnat)

POUŽITÍ:
1. Zkusit jídlo: 이거 먹어 보세요 (Ochutnejte tohle)
2. Zkusit oblečení: 입어 봐도 돼요? (Můžu si to zkusit?)
3. Zkušenost: 한국에 가 봤어요? (Byl jsi v Koreji?)

ZDVOŘILÁ FORMA:
-아/어 보세요 = Zkuste prosím (žádost/doporučení)
먹어 보세요 = Ochutnejte prosím`,
        examples: [
            { kr: '이거 먹어 보세요.', cz: 'Ochutnejte tohle.' },
            { kr: '한국에 가 봤어요?', cz: 'Byl jste v Koreji?' },
            { kr: '김치를 먹어 봤어요.', cz: 'Ochutnal jsem kimči.' },
            { kr: '입어 봐도 돼요?', cz: 'Můžu si to zkusit?' },
            { kr: '해 볼게요.', cz: 'Zkusím to.' },
            { kr: '다시 해 보세요.', cz: 'Zkuste to znovu.' }
        ]
    },
    tasks: [
        'Napiš všech 10 restauračních frází 3×',
        'Vytvoř 10 vět s -아/어 보다',
        'Role-play: objednávání v restauraci',
        'Přidej do Anki'
    ],
    exercises: [
        '먹다 + 보다 → ___ → 먹어 봐요 (zkus jíst)',
        '가다 + 보다 → ___ → 가 봐요 (zkus jít)',
        '하다 + 보다 → ___ → 해 봐요 (zkus dělat)',
        '입다 + 보다 → ___ → 입어 봐요 (zkus obléknout)',
        '마시다 + 보다 → ___ → 마셔 봐요 (zkus pít)',
        '보다 + 보다 → ___ → 봐 봐요 (zkus vidět)'
    ],
    notes: [
        '저기요! = Hej! (volání obsluhy v restauraci)',
        '잘 먹겠습니다 říkáš PŘED jídlem',
        '잘 먹었습니다 říkáš PO jídle',
        '맵지 않게 = nepálivě (pro citlivé žaludky)'
    ],
    isWeekend: false,
    isTest: false
};

// Den 67 - ST 8.4.2026 - Obchod
const day67: KoreanDayData = {
    day: 67,
    date: 'ST 8.4.2026',
    title: '🛒 Nakupování',
    vocab: [
        { kr: '얼마예요?', cz: 'kolik to stojí?' },
        { kr: '이거 주세요', cz: 'dejte mi tohle' },
        { kr: '카드 돼요?', cz: 'můžu platit kartou?' },
        { kr: '현금만요', cz: 'pouze hotovost' },
        { kr: '봉투 필요해요?', cz: 'potřebujete tašku?' },
        { kr: '아니요 괜찮아요', cz: 'ne, děkuji' },
        { kr: '영수증 드릴까요?', cz: 'chcete účtenku?' },
        { kr: '네 주세요', cz: 'ano, prosím' },
        { kr: '감사합니다', cz: 'děkuji' },
        { kr: '안녕히 가세요', cz: 'sbohem (prodavač zákazníkovi)' }
    ],
    tasks: [
        'Napiš 10 nákupních frází 3×',
        'Vytvoř celý nákupní dialog',
        'Role-play: v obchodě',
        'Přidej do Anki'
    ],
    exercises: [
        'Zákazník: 이거 ___? (kolik to stojí)',
        'Prodavač: 오천 원이에요. (5000 wonů)',
        'Zákazník: ___ 돼요? (můžu kartou?)',
        'Prodavač: 네, 돼요.',
        'Zákazník: 영수증 ___. (prosím účtenku)',
        'Prodavač: 감사합니다. ___. (sbohem)'
    ],
    notes: [
        '봉투 = taška (v Koreji jsou placené)',
        '카드 돼요? = Můžu kartou? (krátká verze)',
        '안녕히 가세요 říká ten, kdo ZŮSTÁVÁ',
        '안녕히 계세요 říká ten, kdo ODCHÁZÍ'
    ],
    isWeekend: false,
    isTest: false
};

// Den 68 - ČT 9.4.2026 - Doprava v Koreji
const day68: KoreanDayData = {
    day: 68,
    date: 'ČT 9.4.2026',
    title: '🚇 Doprava v Koreji',
    vocab: [
        { kr: '지하철', cz: 'metro' },
        { kr: '버스', cz: 'autobus' },
        { kr: 'KTX', cz: 'rychlovlak' },
        { kr: 'T-money', cz: 'dopravní karta' },
        { kr: '충전', cz: 'dobíjení' },
        { kr: '환승', cz: 'přestup' },
        { kr: '몇 호선', cz: 'která linka' },
        { kr: '출구', cz: 'východ' },
        { kr: '노선도', cz: 'mapa tras' },
        { kr: '막차', cz: 'poslední spoj' }
    ],
    grammar: {
        title: '-(으)니까 - protože (příčina)',
        explanation: `Vyjadřuje PŘÍČINU nebo DŮVOD - protože...

STRUKTURA:
Kmen + (으)니까

PRAVIDLO:
• Samohláska/ㄹ → -니까: 가니까, 오니까
• Souhláska → -으니까: 먹으니까, 있으니까

PŘÍKLADY:
바쁘다 (být busy):
  바쁘 + 니까 = 바쁘니까
  Protože jsem busy...

비가 오다 (pršet):
  비가 오 + 니까 = 비가 오니까
  Protože prší...

ROZDÍL -아서/어서 vs -(으)니까:
• -아서/어서 = neutrální vysvětlení
• -(으)니까 = silnější důvod, doporučení

POUŽITÍ:
1. Vysvětlení: 바쁘니까 못 가요 (Nemůžu jít, protože jsem busy)
2. Doporučení: 비가 오니까 택시 타세요 (Prší, tak jeďte taxíkem)
3. Příkaz: 위험하니까 조심하세요 (Je to nebezpečné, tak buďte opatrní)`,
        examples: [
            { kr: '바쁘니까 못 가요.', cz: 'Nemůžu jít, protože jsem zaneprázdněný.' },
            { kr: '비가 오니까 택시를 타세요.', cz: 'Protože prší, jeďte taxíkem.' },
            { kr: '지하철이 빠르니까 지하철로 가세요.', cz: 'Metro je rychlé, tak jeďte metrem.' },
            { kr: '막차니까 빨리 가세요.', cz: 'Je to poslední spoj, tak rychle.' },
            { kr: '멀으니까 KTX를 타세요.', cz: 'Je to daleko, tak jeďte KTX.' },
            { kr: '환승이 복잡하니까 조심하세요.', cz: 'Přestup je složitý, tak pozor.' }
        ]
    },
    tasks: [
        'Napiš 10 dopravních slovíček 3×',
        'Vytvoř 10 vět s -(으)니까',
        'Nauč se zeptat: 몇 호선이에요? (Která je to linka?)',
        'Přidej do Anki'
    ],
    exercises: [
        '바쁘다 → 바쁘니까 (protože jsem busy)',
        '비가 오다 → ___ (protože prší)',
        '멀다 → ___ (protože je to daleko)',
        '늦다 → ___ (protože je pozdě)',
        '빠르다 → ___ (protože je to rychlé)',
        '위험하다 → ___ (protože je to nebezpečné)'
    ],
    notes: [
        'T-money = nejběžnější dopravní karta v Koreji',
        '충전하다 = nabít/dobít (充電)',
        '환승역 = přestupní stanice',
        'Seoulské metro má číslované linky: 1호선, 2호선...'
    ],
    isWeekend: false,
    isTest: false
};

// Den 69 - PÁ 10.4.2026 - Poslední příprava
const day69: KoreanDayData = {
    day: 69,
    date: 'PÁ 10.4.2026',
    title: '📋 Poslední příprava + Stavební slovíčka',
    vocab: [
        { kr: '비행기표', cz: 'letenka' },
        { kr: '여권', cz: 'pas' },
        { kr: '지갑', cz: 'peněženka' },
        { kr: '휴대폰', cz: 'mobilní telefon' },
        { kr: '충전기', cz: 'nabíječka' },
        { kr: '어댑터', cz: 'adaptér' },
        { kr: '약', cz: 'léky' },
        { kr: '보험증', cz: 'průkaz pojištění' },
        { kr: '비상연락처', cz: 'nouzový kontakt' },
        { kr: '대사관', cz: 'ambasáda' }
    ],
    tasks: [
        'ZKONTROLUJ VŠECHNO:',
        '✅ 여권 (pas) - platný?',
        '✅ 비행기표 (letenka) - vytištěná?',
        '✅ 호텔 예약 (rezervace hotelu)',
        '✅ T-money 카드',
        '✅ 충전기, 어댑터',
        '✅ 약 (léky)',
        '✅ 보험 (pojištění)',
        '',
        'MEGA OPAKOVÁNÍ:',
        'Hodina 1-3: Všech 120 slovíček z dubna',
        'Hodina 4-6: Všech 5 gramatických struktur',
        'Hodina 7-8: Role-play všech situací',
        '',
        '📝 STAVEBNÍ SLOVÍČKA - zapiš do poznámek:',
        '건설현장 (staveniště), 헬멧 (helma), 안전조끼 (vesta)',
        '공구 (nářadí), 작업 (práce), 휴식시간 (přestávka)',
        '출근 (příchod do práce), 퇴근 (odchod z práce)',
        '야근 (přesčas), 주말 (víkend)'
    ],
    exercises: [
        '=== MINI-TEST PŘED CESTOU ===',
        '',
        'A. Budoucí čas (-을 거예요):',
        '1. 가다 → ___',
        '2. 먹다 → ___',
        '3. 하다 → ___',
        '',
        'B. Probíhající (-는 중이에요):',
        '1. 가다 → ___',
        '2. 공부하다 → ___',
        '',
        'C. Moci (-을 수 있어요):',
        '1. 가다 → ___',
        '2. 먹다 → ___',
        '',
        'D. Zkusit (-아/어 보다):',
        '1. 먹다 → ___',
        '2. 하다 → ___',
        '',
        'E. Protože (-(으)니까):',
        '1. 바쁘다 → ___',
        '2. 멀다 → ___',
        '',
        '=== ODPOVĚDI ===',
        'A: 갈 거예요, 먹을 거예요, 할 거예요',
        'B: 가는 중이에요, 공부하는 중이에요',
        'C: 갈 수 있어요, 먹을 수 있어요',
        'D: 먹어 봐요, 해 봐요',
        'E: 바쁘니까, 머니까'
    ],
    notes: [
        '체코 대사관 연락처를 저장하세요!',
        'V Koreji: 220V, stejná zástrčka jako v ČR!',
        '비상연락처 = 비상 (nouze) + 연락처 (kontakt)',
        '',
        '🎉 ZÍTRA LETÍŠ DO KOREJE!',
        '한국에서 많이 배우고 즐기세요!',
        '(V Koreji se hodně nauč a užij si to!)'
    ],
    isWeekend: false,
    isTest: true
};

// ============ DNY 70-84: V KOREJI - PRAXE ============

// Den 70 - SO 11.4.2026 - V Koreji den 1
const day70: KoreanDayData = {
    day: 70,
    date: 'SO 11.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 1/15',
    vocab: [],
    tasks: [
        '☀️ RÁNO (30 min): Anki opakování',
        '🌞 BĚHEM DNE: Mluv korejsky co nejvíc!',
        '🌙 VEČER (30 min): Deník',
        '',
        '📝 DENÍK - ZAPIŠ:',
        '1. 5 frází co jsem dnes POUŽIL:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '2. 3 situace kde jsem NEVĚDĚL co říct:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '3. 1 nové slovo co jsem SLYŠEL:',
        '   - _______________ = _______________'
    ],
    notes: [
        '💪 Jsi v Koreji - to je ta nejlepší škola!',
        '🗣️ Neboj se mluvit, chyby jsou OK',
        '📱 Když nevíš, použij překladač a ZAPIŠ',
        '❤️ Užij si čas s přítelkyní'
    ],
    isWeekend: true,
    isTest: false
};

// Den 71 - NE 12.4.2026 - V Koreji den 2
const day71: KoreanDayData = {
    day: 71,
    date: 'NE 12.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 2/15',
    vocab: [],
    tasks: [
        '☀️ RÁNO (30 min): Anki opakování',
        '🌞 BĚHEM DNE: Mluv korejsky co nejvíc!',
        '🌙 VEČER (30 min): Deník',
        '',
        '📝 DENÍK - ZAPIŠ:',
        '1. 5 frází co jsem dnes POUŽIL:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '2. 3 situace kde jsem NEVĚDĚL co říct:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '3. 1 nové slovo co jsem SLYŠEL:',
        '   - _______________ = _______________'
    ],
    notes: [
        '💡 Dnešní TIP: Zkus objednat jídlo kompletně korejsky',
        '📍 Doporučení: Navštiv tradiční trh (시장)',
        '🎯 Cíl: Použij alespoň 20 různých frází'
    ],
    isWeekend: true,
    isTest: false
};

// Den 72 - PO 13.4.2026 - V Koreji den 3
const day72: KoreanDayData = {
    day: 72,
    date: 'PO 13.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 3/15',
    vocab: [],
    tasks: [
        '☀️ RÁNO (30 min): Anki opakování',
        '🌞 BĚHEM DNE: Mluv korejsky co nejvíc!',
        '🌙 VEČER (30 min): Deník',
        '',
        '📝 DENÍK - ZAPIŠ:',
        '1. 5 frází co jsem dnes POUŽIL:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '2. 3 situace kde jsem NEVĚDĚL co říct:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '3. 1 nové slovo co jsem SLYŠEL:',
        '   - _______________ = _______________'
    ],
    notes: [
        '💡 Dnešní TIP: Zkus jet metrem bez mapy',
        '📍 Doporučení: Zeptej se na cestu korejsky',
        '🎯 Cíl: Zeptej se alespoň 5 lidí na něco'
    ],
    isWeekend: false,
    isTest: false
};

// Den 73 - ÚT 14.4.2026 - V Koreji den 4
const day73: KoreanDayData = {
    day: 73,
    date: 'ÚT 14.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 4/15',
    vocab: [],
    tasks: [
        '☀️ RÁNO (30 min): Anki opakování',
        '🌞 BĚHEM DNE: Mluv korejsky co nejvíc!',
        '🌙 VEČER (30 min): Deník',
        '',
        '📝 DENÍK - ZAPIŠ:',
        '1. 5 frází co jsem dnes POUŽIL:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '2. 3 situace kde jsem NEVĚDĚL co říct:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '3. 1 nové slovo co jsem SLYŠEL:',
        '   - _______________ = _______________'
    ],
    notes: [
        '💡 Dnešní TIP: Nakupuj v místním obchodě',
        '📍 Doporučení: Zkus kavárnu a objednej korejsky',
        '🎯 Cíl: Žádná angličtina dnes!'
    ],
    isWeekend: false,
    isTest: false
};

// Den 74 - ST 15.4.2026 - V Koreji den 5
const day74: KoreanDayData = {
    day: 74,
    date: 'ST 15.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 5/15',
    vocab: [],
    tasks: [
        '☀️ RÁNO (30 min): Anki opakování',
        '🌞 BĚHEM DNE: Mluv korejsky co nejvíc!',
        '🌙 VEČER (30 min): Deník',
        '',
        '📝 DENÍK - ZAPIŠ:',
        '1. 5 frází co jsem dnes POUŽIL:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '2. 3 situace kde jsem NEVĚDĚL co říct:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '3. 1 nové slovo co jsem SLYŠEL:',
        '   - _______________ = _______________'
    ],
    notes: [
        '💡 Dnešní TIP: Poslouchej oznámení v metru',
        '📍 Doporučení: Zajdi do knihkupectví (서점)',
        '🎯 Cíl: Zapiš 10 nových slov z okolí'
    ],
    isWeekend: false,
    isTest: false
};

// Den 75 - ČT 16.4.2026 - V Koreji den 6
const day75: KoreanDayData = {
    day: 75,
    date: 'ČT 16.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 6/15',
    vocab: [],
    tasks: [
        '☀️ RÁNO (30 min): Anki opakování',
        '🌞 BĚHEM DNE: Mluv korejsky co nejvíc!',
        '🌙 VEČER (30 min): Deník',
        '',
        '📝 DENÍK - ZAPIŠ:',
        '1. 5 frází co jsem dnes POUŽIL:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '2. 3 situace kde jsem NEVĚDĚL co říct:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '3. 1 nové slovo co jsem SLYŠEL:',
        '   - _______________ = _______________'
    ],
    notes: [
        '💡 Dnešní TIP: Navštiv lékárnu a zeptej se na něco',
        '📍 Doporučení: Zkus korejskou kadeřnictví/holičství',
        '🎯 Cíl: Měj delší rozhovor s někým místním'
    ],
    isWeekend: false,
    isTest: false
};

// Den 76 - PÁ 17.4.2026 - V Koreji den 7
const day76: KoreanDayData = {
    day: 76,
    date: 'PÁ 17.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 7/15 (POLOVINA!)',
    vocab: [],
    tasks: [
        '🎉 POLOVINA CESTY!',
        '',
        '☀️ RÁNO (30 min): Anki opakování',
        '🌞 BĚHEM DNE: Mluv korejsky co nejvíc!',
        '🌙 VEČER (60 min): Velký deník + reflexe',
        '',
        '📝 TÝDENNÍ REFLEXE:',
        '1. 10 nejčastějších frází co používám:',
        '   1. _______________',
        '   2. _______________',
        '   3. _______________',
        '   4. _______________',
        '   5. _______________',
        '   6. _______________',
        '   7. _______________',
        '   8. _______________',
        '   9. _______________',
        '  10. _______________',
        '',
        '2. 5 věcí co jsem se NAUČIL (ne ze školy):',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '3. Co chci příští týden ZLEPŠIT:',
        '   - _______________'
    ],
    notes: [
        '🏆 Už jsi v půlce! Jak se cítíš?',
        '📈 Porovnej první a sedmý den',
        '💪 Příští týden ještě víc korejsky!'
    ],
    isWeekend: false,
    isTest: false
};

// Den 77 - SO 18.4.2026 - V Koreji den 8
const day77: KoreanDayData = {
    day: 77,
    date: 'SO 18.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 8/15',
    vocab: [],
    tasks: [
        '☀️ RÁNO (30 min): Anki opakování',
        '🌞 BĚHEM DNE: Mluv korejsky co nejvíc!',
        '🌙 VEČER (30 min): Deník',
        '',
        '📝 DENÍK - ZAPIŠ:',
        '1. 5 frází co jsem dnes POUŽIL:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '2. 3 situace kde jsem NEVĚDĚL co říct:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '3. 1 nové slovo co jsem SLYŠEL:',
        '   - _______________ = _______________'
    ],
    notes: [
        '💡 Dnešní TIP: Víkend = více času na konverzace',
        '📍 Doporučení: Navštiv kulturní místo a čti cedule',
        '🎯 Cíl: Zeptej se na historii místa korejsky'
    ],
    isWeekend: true,
    isTest: false
};

// Den 78 - NE 19.4.2026 - V Koreji den 9
const day78: KoreanDayData = {
    day: 78,
    date: 'NE 19.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 9/15',
    vocab: [],
    tasks: [
        '☀️ RÁNO (30 min): Anki opakování',
        '🌞 BĚHEM DNE: Mluv korejsky co nejvíc!',
        '🌙 VEČER (30 min): Deník',
        '',
        '📝 DENÍK - ZAPIŠ:',
        '1. 5 frází co jsem dnes POUŽIL:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '2. 3 situace kde jsem NEVĚDĚL co říct:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '3. 1 nové slovo co jsem SLYŠEL:',
        '   - _______________ = _______________'
    ],
    notes: [
        '💡 Dnešní TIP: Sleduj korejskou TV v hotelu',
        '📍 Doporučení: Zkus číst menu bez překladače',
        '🎯 Cíl: Objednej 3 různá jídla korejsky'
    ],
    isWeekend: true,
    isTest: false
};

// Den 79 - PO 20.4.2026 - V Koreji den 10
const day79: KoreanDayData = {
    day: 79,
    date: 'PO 20.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 10/15',
    vocab: [],
    tasks: [
        '☀️ RÁNO (30 min): Anki opakování',
        '🌞 BĚHEM DNE: Mluv korejsky co nejvíc!',
        '🌙 VEČER (30 min): Deník',
        '',
        '📝 DENÍK - ZAPIŠ:',
        '1. 5 frází co jsem dnes POUŽIL:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '2. 3 situace kde jsem NEVĚDĚL co říct:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '3. 1 nové slovo co jsem SLYŠEL:',
        '   - _______________ = _______________'
    ],
    notes: [
        '💡 Dnešní TIP: Nakup suvenýry a smlouvej!',
        '📍 Doporučení: Insadong nebo Myeongdong',
        '🎯 Cíl: Vyjednej slevu korejsky'
    ],
    isWeekend: false,
    isTest: false
};

// Den 80 - ÚT 21.4.2026 - V Koreji den 11
const day80: KoreanDayData = {
    day: 80,
    date: 'ÚT 21.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 11/15',
    vocab: [],
    tasks: [
        '☀️ RÁNO (30 min): Anki opakování',
        '🌞 BĚHEM DNE: Mluv korejsky co nejvíc!',
        '🌙 VEČER (30 min): Deník',
        '',
        '📝 DENÍK - ZAPIŠ:',
        '1. 5 frází co jsem dnes POUŽIL:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '2. 3 situace kde jsem NEVĚDĚL co říct:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '3. 1 nové slovo co jsem SLYŠEL:',
        '   - _______________ = _______________'
    ],
    notes: [
        '💡 Dnešní TIP: Zavolej si taxíka po telefonu',
        '📍 Doporučení: Navštiv nákupní centrum',
        '🎯 Cíl: Požádej o pomoc v obchodě'
    ],
    isWeekend: false,
    isTest: false
};

// Den 81 - ST 22.4.2026 - V Koreji den 12
const day81: KoreanDayData = {
    day: 81,
    date: 'ST 22.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 12/15',
    vocab: [],
    tasks: [
        '☀️ RÁNO (30 min): Anki opakování',
        '🌞 BĚHEM DNE: Mluv korejsky co nejvíc!',
        '🌙 VEČER (30 min): Deník',
        '',
        '📝 DENÍK - ZAPIŠ:',
        '1. 5 frází co jsem dnes POUŽIL:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '2. 3 situace kde jsem NEVĚDĚL co říct:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '3. 1 nové slovo co jsem SLYŠEL:',
        '   - _______________ = _______________'
    ],
    notes: [
        '💡 Dnešní TIP: Zkus rezervovat něco po telefonu',
        '📍 Doporučení: Korejská restaurace s rodinou přítelkyně?',
        '🎯 Cíl: Mluv s příbuznými přítelkyně korejsky'
    ],
    isWeekend: false,
    isTest: false
};

// Den 82 - ČT 23.4.2026 - V Koreji den 13
const day82: KoreanDayData = {
    day: 82,
    date: 'ČT 23.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 13/15',
    vocab: [],
    tasks: [
        '☀️ RÁNO (30 min): Anki opakování',
        '🌞 BĚHEM DNE: Mluv korejsky co nejvíc!',
        '🌙 VEČER (30 min): Deník',
        '',
        '📝 DENÍK - ZAPIŠ:',
        '1. 5 frází co jsem dnes POUŽIL:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '2. 3 situace kde jsem NEVĚDĚL co říct:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '3. 1 nové slovo co jsem SLYŠEL:',
        '   - _______________ = _______________'
    ],
    notes: [
        '💡 Dnešní TIP: Poslední velký nákup?',
        '📍 Doporučení: Nakup korejské knihy/učebnice',
        '🎯 Cíl: Zeptej se na doporučení v knihkupectví'
    ],
    isWeekend: false,
    isTest: false
};

// Den 83 - PÁ 24.4.2026 - V Koreji den 14
const day83: KoreanDayData = {
    day: 83,
    date: 'PÁ 24.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 14/15',
    vocab: [],
    tasks: [
        '☀️ RÁNO (30 min): Anki opakování',
        '🌞 BĚHEM DNE: Mluv korejsky co nejvíc!',
        '🌙 VEČER (60 min): Předposlední deník',
        '',
        '📝 DENÍK - ZAPIŠ:',
        '1. 5 frází co jsem dnes POUŽIL:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '2. 3 situace kde jsem NEVĚDĚL co říct:',
        '   - _______________',
        '   - _______________',
        '   - _______________',
        '',
        '3. Co chci ještě STIHNOUT:',
        '   - _______________',
        '   - _______________'
    ],
    notes: [
        '😢 Předposlední den!',
        '💡 Dnešní TIP: Využij každou příležitost mluvit',
        '📍 Doporučení: Oblíbené místo naposledy',
        '🎯 Cíl: Rozluč se korejsky s místy'
    ],
    isWeekend: false,
    isTest: false
};

// Den 84 - SO 25.4.2026 - V Koreji den 15 (poslední)
const day84: KoreanDayData = {
    day: 84,
    date: 'SO 25.4.2026',
    title: '🇰🇷 DEN V KOREJI - Den 15/15 (POSLEDNÍ!)',
    vocab: [],
    tasks: [
        '🛫 POSLEDNÍ DEN!',
        '',
        '☀️ RÁNO: Balení + poslední Anki',
        '🌞 BĚHEM DNE: Check-out, letiště',
        '🌙 VEČER (v letadle): VELKÁ REFLEXE',
        '',
        '📝 FINÁLNÍ REFLEXE:',
        '',
        '1. 20 nejužitečnějších frází z cesty:',
        '   (seřaď od nejčastější)',
        '   1. _______________',
        '   2. _______________',
        '   3. _______________',
        '   4. _______________',
        '   5. _______________',
        '   6. _______________',
        '   7. _______________',
        '   8. _______________',
        '   9. _______________',
        '  10. _______________',
        '  11. _______________',
        '  12. _______________',
        '  13. _______________',
        '  14. _______________',
        '  15. _______________',
        '  16. _______________',
        '  17. _______________',
        '  18. _______________',
        '  19. _______________',
        '  20. _______________',
        '',
        '2. 10 nových slov co jsem se NAUČIL:',
        '   1. _______________ = _______________',
        '   2. _______________ = _______________',
        '   3. _______________ = _______________',
        '   4. _______________ = _______________',
        '   5. _______________ = _______________',
        '   6. _______________ = _______________',
        '   7. _______________ = _______________',
        '   8. _______________ = _______________',
        '   9. _______________ = _______________',
        '  10. _______________ = _______________',
        '',
        '3. Největší úspěch cesty:',
        '   _______________',
        '',
        '4. Co chci zlepšit příště:',
        '   _______________'
    ],
    notes: [
        '🏆 GRATULACE! Zvládl jsi 15 dní v Koreji!',
        '📈 Tvá korejština je teď MNOHEM lepší',
        '💪 Máš reálnou praxi s rodilými mluvčími',
        '',
        '안녕히 가세요, 한국!',
        '(Sbohem, Koreo!)',
        '',
        '다음에 또 올게요!',
        '(Příště přijedu zase!)'
    ],
    isWeekend: true,
    isTest: false
};

// ============ DNY 85-89: PO NÁVRATU - ZPRACOVÁNÍ ============

// Den 85 - NE 26.4.2026 - Návrat
const day85: KoreanDayData = {
    day: 85,
    date: 'NE 26.4.2026',
    title: '🏠 Návrat domů - Odpočinek',
    vocab: [],
    tasks: [
        '😴 DEN ODPOČINKU',
        '',
        'Jet lag je normální. Dnes:',
        '• Vyspat se',
        '• Rozbalit se',
        '• Relaxovat',
        '',
        'JEDINÝ ÚKOL (30 min):',
        'Přepsat deníky do čistopisu',
        '(Začni organizovat poznámky)',
        '',
        'ANKI: Jen pokud chceš, není povinné dnes'
    ],
    notes: [
        '💤 Odpočinek je důležitý!',
        '🧳 Rozbal si v klidu',
        '📝 Deníky přepiš, dokud jsou v paměti',
        '❤️ Sdílej zážitky s rodinou/přáteli'
    ],
    isWeekend: true,
    isTest: false
};

// Den 86 - PO 27.4.2026 - Zpracování deníku 1
const day86: KoreanDayData = {
    day: 86,
    date: 'PO 27.4.2026',
    title: '📔 Zpracování deníku - Den 1',
    vocab: [],
    tasks: [
        '📝 ZPRACOVÁNÍ ZÁŽITKŮ (2-3 hodiny)',
        '',
        '1. Projdi všechny deníky z cesty',
        '',
        '2. VYTVOŘ SEZNAM:',
        '   A) Fráze co jsem POUŽÍVAL často:',
        '      (přidej do Anki jako "KOREA_REAL")',
        '   ',
        '   B) Situace kde jsem NEVĚDĚL:',
        '      (napiš, co jsem chtěl říct)',
        '   ',
        '   C) Nová slova co jsem SLYŠEL:',
        '      (vyhledej a přidej do Anki)',
        '',
        '3. ANKI (60 min):',
        '   - Opakování všeho',
        '   - Přidej nové karty z cesty'
    ],
    exercises: [
        'ANALÝZA MEZER:',
        '',
        'Situace 1: _______________',
        'Co jsem chtěl říct: _______________',
        'Jak se to řekne: _______________',
        '',
        'Situace 2: _______________',
        'Co jsem chtěl říct: _______________',
        'Jak se to řekne: _______________',
        '',
        'Situace 3: _______________',
        'Co jsem chtěl říct: _______________',
        'Jak se to řekne: _______________'
    ],
    notes: [
        '📊 Analyzuj své slabiny',
        '💡 Každá "mezera" = příležitost k učení',
        '🎯 Soustřeď se na PRAKTICKÉ fráze'
    ],
    isWeekend: false,
    isTest: false
};

// Den 87 - ÚT 28.4.2026 - Zpracování deníku 2
const day87: KoreanDayData = {
    day: 87,
    date: 'ÚT 28.4.2026',
    title: '📔 Zpracování deníku - Den 2',
    vocab: [],
    tasks: [
        '📝 DOPLNĚNÍ MEZER (2-3 hodiny)',
        '',
        '1. Seznam situací kde jsi nevěděl:',
        '   - Vyhledej správné fráze',
        '   - Napiš je do sešitu 5×',
        '   - Přidej do Anki',
        '',
        '2. KONVERZACE s přítelkyní (30 min):',
        '   - Povídej o cestě KOREJSKY',
        '   - Použij nové fráze',
        '',
        '3. ANKI (60 min):',
        '   - Opakování',
        '   - Nové karty z mezer'
    ],
    exercises: [
        'FRÁZE CO JSEM POTŘEBOVAL:',
        '',
        '1. V restauraci: _______________',
        '2. V obchodě: _______________',
        '3. Na ulici: _______________',
        '4. V hotelu: _______________',
        '5. V metru: _______________'
    ],
    notes: [
        '🔍 Každá mezera = nová znalost',
        '📚 Doplň si, co ti chybělo',
        '💪 Příště budeš připravenější!'
    ],
    isWeekend: false,
    isTest: false
};

// Den 88 - ST 29.4.2026 - Zpracování deníku 3
const day88: KoreanDayData = {
    day: 88,
    date: 'ST 29.4.2026',
    title: '📔 Zpracování deníku - Den 3',
    vocab: [],
    tasks: [
        '📝 FINALIZACE (2-3 hodiny)',
        '',
        '1. DOKONČENÍ zpracování deníků',
        '',
        '2. VYTVOŘ "KOREA SURVIVAL KIT":',
        '   - 50 nejdůležitějších frází',
        '   - Seřazených podle situací',
        '   - Pro příští cestu',
        '',
        '3. ANKI (60 min):',
        '   - Všechny nové karty z cesty',
        '   - Opakování',
        '',
        '4. PŘÍPRAVA na zítřejší test'
    ],
    exercises: [
        'KOREA SURVIVAL KIT - DRAFT:',
        '',
        '🛫 LETIŠTĚ:',
        '1. _______________',
        '2. _______________',
        '3. _______________',
        '',
        '🏨 HOTEL:',
        '1. _______________',
        '2. _______________',
        '3. _______________',
        '',
        '🍜 RESTAURACE:',
        '1. _______________',
        '2. _______________',
        '3. _______________',
        '',
        '🚕 DOPRAVA:',
        '1. _______________',
        '2. _______________',
        '3. _______________',
        '',
        '🛒 OBCHOD:',
        '1. _______________',
        '2. _______________',
        '3. _______________',
        '',
        '🆘 NOUZE:',
        '1. _______________',
        '2. _______________',
        '3. _______________'
    ],
    notes: [
        '📋 Survival kit = tvá osobní příručka',
        '🎯 Založeno na REÁLNÉ zkušenosti',
        '💪 Připrav se na zítřejší test!'
    ],
    isWeekend: false,
    isTest: false
};

// Den 89 - ČT 30.4.2026 - Měsíční test
const day89: KoreanDayData = {
    day: 89,
    date: 'ČT 30.4.2026',
    title: '📝 MĚSÍČNÍ TEST DUBNA + PŘÍPRAVA NA KVĚTEN',
    vocab: [],
    tasks: [
        '📝 TEST DUBNA (2 hodiny)',
        '',
        'TEST zahrnuje:',
        '• 120 slovíček z dnů 60-69',
        '• 5 gramatických struktur',
        '• Praktické situace z cesty',
        '',
        '📅 PŘÍPRAVA NA KVĚTEN:',
        '• Projdi, co tě čeká v květnu',
        '• Nastav si cíle',
        '• Připrav materiály'
    ],
    exercises: [
        '=== MĚSÍČNÍ TEST DUBNA ===',
        '',
        'ČÁST A - BUDOUCÍ ČAS (10 bodů):',
        '1. 가다 → ___ (půjdu)',
        '2. 먹다 → ___ (budu jíst)',
        '3. 하다 → ___ (budu dělat)',
        '4. 보다 → ___ (uvidím)',
        '5. 사다 → ___ (koupím)',
        '',
        'ČÁST B - PROBÍHAJÍCÍ AKCE (10 bodů):',
        '1. 가다 → ___ (právě jdu)',
        '2. 먹다 → ___ (právě jím)',
        '3. 공부하다 → ___ (právě studuji)',
        '',
        'ČÁST C - MOCI/NEMOCI (10 bodů):',
        '1. Můžu jít → ___',
        '2. Nemůžu jíst → ___',
        '3. Umím korejsky → ___',
        '',
        'ČÁST D - ZKUSIT (10 bodů):',
        '1. Ochutnej → ___',
        '2. Zkus to → ___',
        '3. Byl jsi v Koreji? → ___',
        '',
        'ČÁST E - PROTOŽE (10 bodů):',
        '1. Protože jsem busy → ___',
        '2. Protože prší → ___',
        '3. Protože je to daleko → ___',
        '',
        'ČÁST F - SITUACE Z CESTY (50 bodů):',
        '1. Řekni řidiči taxi, kam jedeš',
        '2. Zeptej se na cenu',
        '3. Požádej o účtenku',
        '4. Objednej jídlo',
        '5. Požádej, aby mluvili pomalu',
        '6. Řekni, že nerozumíš',
        '7. Check-in v hotelu',
        '8. Požádej o více ručníků',
        '9. Zeptej se kde je záchod',
        '10. Zavolej o pomoc',
        '',
        '=== ODPOVĚDI ===',
        'A: 갈 거예요, 먹을 거예요, 할 거예요, 볼 거예요, 살 거예요',
        'B: 가는 중이에요, 먹는 중이에요, 공부하는 중이에요',
        'C: 갈 수 있어요, 먹을 수 없어요, 한국어를 할 수 있어요',
        'D: 먹어 보세요, 해 보세요, 한국에 가 봤어요?',
        'E: 바쁘니까, 비가 오니까, 머니까',
        'F: Různé správné odpovědi'
    ],
    notes: [
        '📊 CÍL: Minimálně 80% (80/100)',
        '',
        '🏆 HODNOCENÍ DUBNA:',
        '• 90-100: Výborně! Cesta byla skvělá praxe',
        '• 80-89: Dobře! Solidní základ',
        '• 70-79: OK, ale opakuj slabé části',
        '• <70: Zopakuj duben před pokračováním',
        '',
        '🎉 GRATULACE K DOKONČENÍ DUBNA!',
        '',
        '한국 여행 잘 했어요!',
        '(Cesta do Koreje se povedla!)',
        '',
        '5월에도 화이팅!',
        '(V květnu taky fighting!)'
    ],
    isWeekend: false,
    isTest: true
};

// ============ EXPORT ============

export const aprilDays: KoreanDayData[] = [
    // Před cestou (60-69)
    day60, day61, day62, day63, day64, day65, day66, day67, day68, day69,
    // V Koreji (70-84)
    day70, day71, day72, day73, day74, day75, day76, day77, day78, day79,
    day80, day81, day82, day83, day84,
    // Po návratu (85-89)
    day85, day86, day87, day88, day89
];

export const aprilData: KoreanMonthData = {
    month: 3,
    nameKR: '4월 - 한국 여행',
    nameCZ: 'DUBEN 2026 - MĚSÍC 3/10 - CESTA DO KOREJE',
    targetLevel: 'A2',
    targetWords: 120,
    totalWords: 560,
    goals: [
        '120 nových slov (jen před cestou)',
        '5 gramatických struktur',
        'Praktická konverzace v Koreji',
        '15 dní praxe s rodilými mluvčími'
    ],
    grammarOverview: [
        { kr: '-(으)ㄹ 거예요', cz: 'budoucí čas' },
        { kr: '-는 중이다', cz: 'právě teď (probíhající)' },
        { kr: '-(으)ㄹ 수 있다/없다', cz: 'moci/nemoci' },
        { kr: '-아/어 보다', cz: 'zkusit' },
        { kr: '-(으)니까', cz: 'protože (příčina)' }
    ],
    weeks: [
        { weekNumber: 1, dateRange: '1.-7.4.', theme: 'Letiště, hotel, základy', days: [60, 61, 62, 63, 64, 65, 66] },
        { weekNumber: 2, dateRange: '8.-10.4.', theme: 'Finální příprava', days: [67, 68, 69] },
        { weekNumber: 3, dateRange: '11.-19.4.', theme: '🇰🇷 V KOREJI - Praxe', days: [70, 71, 72, 73, 74, 75, 76, 77, 78] },
        { weekNumber: 4, dateRange: '20.-25.4.', theme: '🇰🇷 V KOREJI - Praxe', days: [79, 80, 81, 82, 83, 84] },
        { weekNumber: 5, dateRange: '26.-30.4.', theme: 'Návrat, zpracování', days: [85, 86, 87, 88, 89] }
    ],
    days: aprilDays
};

export default aprilData;
