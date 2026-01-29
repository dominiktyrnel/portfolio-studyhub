/**
 * September 2026 - Korean Study Plan Data (Týden 1-2)
 * Month 8/10 - Level B1+ - Formální komunikace & Dokumenty
 * Days 213-226 (1.9.2026 - 14.9.2026)
 * 
 * Agent 8A - ZÁŘÍ TÝDEN 1-2
 * BEZ ANGLIČTINY - pouze 한국어 + Česky
 */

import type { KoreanDayData } from '../types/study-db';

// =============================================================================
// TÝDEN 1: Dokumenty & Kancelář (1.9. - 6.9.2026)
// =============================================================================

export const day213: KoreanDayData = {
    day: 213,
    date: 'ÚT 1.9.2026',
    title: '📄 Dokumenty',
    vocab: [
        { kr: '서류', cz: 'dokumenty' },
        { kr: '문서', cz: 'dokument' },
        { kr: '계약서', cz: 'smlouva' },
        { kr: '견적서', cz: 'cenová nabídka' },
        { kr: '청구서', cz: 'faktura' },
        { kr: '영수증', cz: 'účtenka' },
        { kr: '보고서', cz: 'zpráva' },
        { kr: '제안서', cz: 'návrh' },
        { kr: '신청서', cz: 'žádost' },
        { kr: '확인서', cz: 'potvrzení' },
        { kr: '허가서', cz: 'povolení' },
        { kr: '증명서', cz: 'certifikát' }
    ],
    grammar: {
        title: '-고 말다 (nakonec - nežádoucí)',
        explanation: '동사 어간 + -고 말다\n\n이 문법은 원하지 않는 결과를 표현합니다.\nTato gramatika vyjadřuje nežádoucí výsledek, který nakonec nastal.',
        examples: [
            { kr: '결국 실수하고 말았어요.', cz: 'Nakonec jsem udělal chybu.' },
            { kr: '약속을 어기고 말았어요.', cz: 'Nakonec jsem porušil slib.' },
            { kr: '서류를 잃어버리고 말았어요.', cz: 'Nakonec jsem ztratil dokumenty.' },
            { kr: '계약서에 사인하고 말았어요.', cz: 'Nakonec jsem tu smlouvu podepsal.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day214: KoreanDayData = {
    day: 214,
    date: 'ST 2.9.2026',
    title: '🏢 Kancelářské výrazy',
    vocab: [
        { kr: '결재', cz: 'schválení' },
        { kr: '승인', cz: 'souhlas' },
        { kr: '반려', cz: 'zamítnutí' },
        { kr: '회람', cz: 'oběh' },
        { kr: '공지', cz: 'oznámení' },
        { kr: '통보', cz: 'upozornění' },
        { kr: '요청', cz: 'žádost' },
        { kr: '회신', cz: 'odpověď' },
        { kr: '마감', cz: 'deadline' },
        { kr: '기한', cz: 'termín' },
        { kr: '연장', cz: 'prodloužení' },
        { kr: '처리', cz: 'zpracování' }
    ],
    sentences: [
        { kr: '결재 부탁드립니다.', cz: 'Prosím o schválení.' },
        { kr: '승인이 필요합니다.', cz: 'Je potřeba souhlas.' },
        { kr: '반려 사유를 확인해 주세요.', cz: 'Zkontrolujte prosím důvod zamítnutí.' },
        { kr: '마감이 내일입니다.', cz: 'Deadline je zítra.' }
    ],
    isWeekend: false,
    isTest: false
};

export const day215: KoreanDayData = {
    day: 215,
    date: 'ČT 3.9.2026',
    title: '📧 E-mail formálně',
    vocab: [
        { kr: '수신', cz: 'příjemce' },
        { kr: '발신', cz: 'odesílatel' },
        { kr: '참조', cz: 'kopie' },
        { kr: '제목', cz: 'předmět' },
        { kr: '본문', cz: 'tělo' },
        { kr: '첨부파일', cz: 'příloha' },
        { kr: '회신', cz: 'odpověď' },
        { kr: '전달', cz: 'přeposlání' },
        { kr: '삭제', cz: 'smazání' },
        { kr: '저장', cz: 'uložení' },
        { kr: '인쇄', cz: 'tisk' },
        { kr: '서명', cz: 'podpis' }
    ],
    grammar: {
        title: '-(으)ㄹ 만하다 (stojí za to)',
        explanation: '동사 어간 + -(으)ㄹ 만하다\n\n이 문법은 가치가 있음을 표현합니다.\nTato gramatika vyjadřuje, že něco stojí za to.',
        examples: [
            { kr: '볼 만한 영화예요.', cz: 'Ten film stojí za shlédnutí.' },
            { kr: '먹을 만해요.', cz: 'Je to k jídlu/dá se to jíst.' },
            { kr: '읽을 만한 보고서예요.', cz: 'Ta zpráva stojí za přečtení.' },
            { kr: '참석할 만한 회의예요.', cz: 'Je to schůze, která stojí za účast.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day216: KoreanDayData = {
    day: 216,
    date: 'PÁ 4.9.2026',
    title: '📞 Telefon formálně',
    vocab: [
        { kr: '전화 드렸습니다', cz: 'volám vám' },
        { kr: '연결해 드리겠습니다', cz: 'spojím vás' },
        { kr: '잠시만요', cz: 'moment prosím' },
        { kr: '다시 걸겠습니다', cz: 'zavolám znovu' },
        { kr: '메시지 남기시겠습니까', cz: 'chcete zanechat vzkaz' },
        { kr: '통화 중입니다', cz: 'linka je obsazená' },
        { kr: '부재중입니다', cz: 'není přítomen' },
        { kr: '바꿔 드릴까요', cz: 'mám vás spojit' },
        { kr: '끊지 마세요', cz: 'nezavěšujte' },
        { kr: '들리세요?', cz: 'slyšíte mě?' }
    ],
    sentences: [
        { kr: '김 과장님 전화 드렸습니다.', cz: 'Volám panu vedoucímu Kimovi.' },
        { kr: '잠시만요, 연결해 드리겠습니다.', cz: 'Moment prosím, spojím vás.' },
        { kr: '지금 부재중입니다. 메시지 남기시겠습니까?', cz: 'Momentálně není přítomen. Chcete zanechat vzkaz?' }
    ],
    isWeekend: false,
    isTest: false
};

export const day217: KoreanDayData = {
    day: 217,
    date: 'SO 5.9.2026',
    title: '⭐ VÍKEND - Schůzky formálně',
    vocab: [
        { kr: '회의', cz: 'schůze' },
        { kr: '미팅', cz: 'meeting' },
        { kr: '안건', cz: 'bod jednání' },
        { kr: '발표', cz: 'prezentace' },
        { kr: '토론', cz: 'diskuze' },
        { kr: '결론', cz: 'závěr' },
        { kr: '합의', cz: 'dohoda' },
        { kr: '의결', cz: 'usnesení' },
        { kr: '참석', cz: 'účast' },
        { kr: '불참', cz: 'neúčast' },
        { kr: '연기', cz: 'odložení' },
        { kr: '취소', cz: 'zrušení' }
    ],
    sentences: [
        { kr: '오늘 회의 안건은 세 가지입니다.', cz: 'Dnes máme tři body jednání.' },
        { kr: '발표 후에 토론하겠습니다.', cz: 'Po prezentaci budeme diskutovat.' },
        { kr: '회의가 연기되었습니다.', cz: 'Schůze byla odložena.' }
    ],
    isWeekend: true,
    isTest: false
};

export const day218: KoreanDayData = {
    day: 218,
    date: 'NE 6.9.2026',
    title: '🔄 OPAKOVÁNÍ - Týden 1',
    vocab: [],
    tasks: [
        '서류/문서 복습 - Opakování dokumentů',
        '결재/승인/반려 복습 - Opakování kancelářských výrazů',
        '이메일 용어 복습 - Opakování e-mailové terminologie',
        '전화 표현 복습 - Opakování telefonních frází',
        '회의 용어 복습 - Opakování výrazů pro schůzky'
    ],
    focus: [
        '-고 말다 문법 연습',
        '-(으)ㄹ 만하다 문법 연습'
    ],
    isWeekend: true,
    isTest: true
};

// =============================================================================
// TÝDEN 2: Formální komunikace (7.9. - 14.9.2026)
// =============================================================================

export const day219: KoreanDayData = {
    day: 219,
    date: 'PO 7.9.2026',
    title: '📝 Procvičení týden 1',
    vocab: [],
    exercises: [
        'A. 서류 (dokumenty):',
        '1. 계약서 = smlouva',
        '2. 견적서 = cenová nabídka',
        '3. 청구서 = faktura',
        '4. 영수증 = účtenka',
        '',
        'B. 사무실 (kancelář):',
        '1. 결재 = schválení',
        '2. 승인 = souhlas',
        '3. 마감 = deadline',
        '',
        'C. 문법 (-고 말다):',
        '1. 결국 실수하고 말았어요. = Nakonec jsem udělal chybu.',
        '2. 약속을 어기고 말았어요. = Nakonec jsem porušil slib.'
    ],
    isWeekend: false,
    isTest: false
};

export const day220: KoreanDayData = {
    day: 220,
    date: 'ÚT 8.9.2026',
    title: '🙏 Žádosti formální',
    vocab: [
        { kr: '요청드립니다', cz: 'žádám vás' },
        { kr: '부탁드립니다', cz: 'prosím vás' },
        { kr: '문의드립니다', cz: 'dotazuji se' },
        { kr: '확인 부탁드립니다', cz: 'prosím o potvrzení' },
        { kr: '검토 부탁드립니다', cz: 'prosím o přezkoumání' },
        { kr: '회신 부탁드립니다', cz: 'prosím o odpověď' },
        { kr: '처리 부탁드립니다', cz: 'prosím o vyřízení' },
        { kr: '전달 부탁드립니다', cz: 'prosím o předání' }
    ],
    grammar: {
        title: '-는 바람에 (kvůli tomu že)',
        explanation: '동사 어간 + -는 바람에\n\n이 문법은 원인과 결과를 표현합니다 (주로 부정적).\nTato gramatika vyjadřuje příčinu a následek (většinou negativní).',
        examples: [
            { kr: '비가 오는 바람에 못 갔어요.', cz: 'Nemohl jsem jít, protože pršelo.' },
            { kr: '늦잠 자는 바람에 지각했어요.', cz: 'Přišel jsem pozdě, protože jsem zaspal.' },
            { kr: '전화가 오는 바람에 회의에 집중 못 했어요.', cz: 'Nemohl jsem se soustředit na schůzi, protože mi volali.' },
            { kr: '서류가 많은 바람에 야근했어요.', cz: 'Pracoval jsem přesčas, protože bylo moc dokumentů.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day221: KoreanDayData = {
    day: 221,
    date: 'ST 9.9.2026',
    title: '💬 Odpovědi formální',
    vocab: [
        { kr: '답변드리겠습니다', cz: 'odpovím' },
        { kr: '알려드리겠습니다', cz: 'informuji vás' },
        { kr: '안내드리겠습니다', cz: 'sdělím vám' },
        { kr: '확인해 드리겠습니다', cz: 'ověřím pro vás' },
        { kr: '처리해 드리겠습니다', cz: 'vyřídím' },
        { kr: '연락드리겠습니다', cz: 'kontaktuji vás' },
        { kr: '보내드리겠습니다', cz: 'pošlu vám' },
        { kr: '전달해 드리겠습니다', cz: 'předám vám' }
    ],
    sentences: [
        { kr: '확인 후 답변드리겠습니다.', cz: 'Po ověření vám odpovím.' },
        { kr: '내일까지 처리해 드리겠습니다.', cz: 'Do zítřka to vyřídím.' },
        { kr: '결과를 알려드리겠습니다.', cz: 'Informuji vás o výsledku.' }
    ],
    isWeekend: false,
    isTest: false
};

export const day222: KoreanDayData = {
    day: 222,
    date: 'ČT 10.9.2026',
    title: '🎩 Zdvořilé fráze',
    vocab: [
        { kr: '죄송합니다', cz: 'omlouvám se' },
        { kr: '감사드립니다', cz: 'děkuji vám' },
        { kr: '수고하셨습니다', cz: 'děkuji za práci' },
        { kr: '실례합니다', cz: 'promiňte' },
        { kr: '잠시만요', cz: 'moment' },
        { kr: '말씀해 주세요', cz: 'řekněte prosím' },
        { kr: '양해 부탁드립니다', cz: 'prosím o pochopení' },
        { kr: '불편을 드려 죄송합니다', cz: 'omlouváme se za nepříjemnosti' }
    ],
    grammar: {
        title: '-(으)ㄴ/는 셈이다 (dá se říct že)',
        explanation: '동사/형용사 어간 + -(으)ㄴ/는 셈이다\n\n이 문법은 대략적인 상황을 표현합니다.\nTato gramatika vyjadřuje přibližnou situaci nebo hodnocení.',
        examples: [
            { kr: '거의 끝난 셈이에요.', cz: 'Dá se říct, že je to skoro hotové.' },
            { kr: '성공한 셈이에요.', cz: 'Dá se říct, že to byl úspěch.' },
            { kr: '반쯤 끝난 셈이에요.', cz: 'Dá se říct, že je to z poloviny hotové.' },
            { kr: '잘 된 셈이에요.', cz: 'Dá se říct, že to dopadlo dobře.' }
        ]
    },
    isWeekend: false,
    isTest: false
};

export const day223: KoreanDayData = {
    day: 223,
    date: 'PÁ 11.9.2026',
    title: '🤝 Setkání #1',
    vocab: [
        { kr: '처음 뵙겠습니다', cz: 'těší mě' },
        { kr: '안녕히 가세요', cz: 'sbohem (jdoucímu)' },
        { kr: '안녕히 계세요', cz: 'sbohem (zůstávajícímu)' }
    ],
    sentences: [
        { kr: '처음 뵙겠습니다. 김철수입니다.', cz: 'Těší mě. Jsem Kim Čchŏlsu.' },
        { kr: '안녕히 가세요. 조심히 가세요.', cz: 'Sbohem. Jeďte opatrně.' },
        { kr: '저는 먼저 가겠습니다. 안녕히 계세요.', cz: 'Já už půjdu. Sbohem.' }
    ],
    isWeekend: false,
    isTest: false
};

export const day224: KoreanDayData = {
    day: 224,
    date: 'SO 12.9.2026',
    title: '⭐ VÍKEND - Setkání #2',
    vocab: [
        { kr: '다음에 뵙겠습니다', cz: 'uvidíme se příště' },
        { kr: '연락드리겠습니다', cz: 'ozvu se' },
        { kr: '감사히 받겠습니다', cz: 'vděčně přijmu' }
    ],
    grammar: {
        title: '-는 대로 (jakmile, jak)',
        explanation: '동사 어간 + -는 대로\n\n이 문법은 즉시성을 표현합니다.\nTato gramatika vyjadřuje "jakmile" nebo "hned jak".',
        examples: [
            { kr: '도착하는 대로 연락할게요.', cz: 'Jakmile dorazím, ozvu se.' },
            { kr: '끝나는 대로 갈게요.', cz: 'Jakmile skončím, přijdu.' },
            { kr: '확인하는 대로 알려드리겠습니다.', cz: 'Jakmile to ověřím, dám vám vědět.' },
            { kr: '받는 대로 처리하겠습니다.', cz: 'Jakmile to dostanu, vyřídím to.' }
        ]
    },
    sentences: [
        { kr: '다음에 뵙겠습니다. 건강하세요.', cz: 'Uvidíme se příště. Buďte zdráv.' },
        { kr: '결과가 나오는 대로 연락드리겠습니다.', cz: 'Jakmile budou výsledky, ozvu se.' }
    ],
    isWeekend: true,
    isTest: false
};

export const day225: KoreanDayData = {
    day: 225,
    date: 'NE 13.9.2026',
    title: '🔄 OPAKOVÁNÍ - Týden 2',
    vocab: [],
    tasks: [
        '요청 표현 복습 - Opakování žádostí',
        '답변 표현 복습 - Opakování odpovědí',
        '공손한 표현 복습 - Opakování zdvořilých frází',
        '인사말 복습 - Opakování pozdravů'
    ],
    focus: [
        '-는 바람에 문법 연습',
        '-(으)ㄴ/는 셈이다 문법 연습',
        '-는 대로 문법 연습'
    ],
    isWeekend: true,
    isTest: true
};

export const day226: KoreanDayData = {
    day: 226,
    date: 'PO 14.9.2026',
    title: '📝 TEST - Týden 1-2',
    vocab: [],
    exercises: [
        'A. 서류 SLOVÍČKA (20 bodů):',
        '1. 계약서 = smlouva',
        '2. 견적서 = cenová nabídka',
        '3. 청구서 = faktura',
        '4. 보고서 = zpráva',
        '5. 확인서 = potvrzení',
        '',
        'B. 사무실 SLOVÍČKA (20 bodů):',
        '1. 결재 = schválení',
        '2. 승인 = souhlas',
        '3. 마감 = deadline',
        '4. 처리 = zpracování',
        '',
        'C. 공손한 표현 ZDVOŘILÉ FRÁZE (20 bodů):',
        '1. 요청드립니다 = žádám vás',
        '2. 확인 부탁드립니다 = prosím o potvrzení',
        '3. 처리해 드리겠습니다 = vyřídím',
        '4. 양해 부탁드립니다 = prosím o pochopení',
        '',
        'D. 문법 GRAMATIKA (40 bodů):',
        '1. -고 말다: 결국 실수하고 말았어요. = Nakonec jsem udělal chybu.',
        '2. -(으)ㄹ 만하다: 볼 만한 영화예요. = Ten film stojí za shlédnutí.',
        '3. -는 바람에: 비가 오는 바람에 못 갔어요. = Nemohl jsem jít, protože pršelo.',
        '4. -(으)ㄴ/는 셈이다: 거의 끝난 셈이에요. = Dá se říct, že je to skoro hotové.',
        '5. -는 대로: 도착하는 대로 연락할게요. = Jakmile dorazím, ozvu se.'
    ],
    isWeekend: false,
    isTest: true
};

// =============================================================================
// EXPORT
// =============================================================================

export const septemberDays213to226: KoreanDayData[] = [
    day213, day214, day215, day216, day217, day218,
    day219, day220, day221, day222, day223, day224, day225, day226
];

export default septemberDays213to226;
