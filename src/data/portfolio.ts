export interface WorkCase {
    id: string;
    title: string;
    category: string;
    description: string[];
    images: string[];
}

export const workCases: WorkCase[] = [
    {
        id: "villa",
        title: "시골 별장 신축 공사 (기초~골조)",
        category: "신축/구조",
        description: [
            "기초 띠 굴착, 자갈 채움, 콘크리트 타설 및 조적식 거푸집 설치",
            "기초 슬래브 철근 배근 및 콘크리트 타설, 방수 처리",
            "Porotherm 벽돌 조적(1, 2층), 슬래브/계단 거푸집 및 타설",
            "지붕 골조 및 임시 마감, Ytong 내부 벽체 시공"
        ],
        images: Array.from({ length: 24 }, (_, i) => `/img/6/${i + 1}.webp`)
    },
    {
        id: "bathroom",
        title: "욕실 전체 리모델링 (2개소)",
        category: "실내/마감",
        description: [
            "수도/전기 배선 굴착, 천장 석고보드 및 벽체 평탄화",
            "전체 방수 처리 및 고급 타일 시공",
            "샤워 구역 경사 형성 및 전기 난방 시스템 설치",
            "최종 마감 및 위생기구 설치"
        ],
        images: Array.from({ length: 16 }, (_, i) => `/img/8/${i + 1}.webp`)
    },
    {
        id: "club",
        title: "댄스 클럽 방음 천장 시공",
        category: "석고보드/특수",
        description: [
            "기존 구조 철거 및 보강 구조물 설치",
            "미네랄 울(방음재) 및 방습 필름 시공",
            "방음 석고보드 2겹 마감 및 도장",
            "틈새 충진 및 최종 컬러 도색"
        ],
        images: Array.from({ length: 6 }, (_, i) => `/img/10/${i + 1}.webp`)
    },
    {
        id: "fence",
        title: "장식 블록 담장 및 목재 마감",
        category: "조경/외장",
        description: [
            "기존 담장 철거, 기초 굴착 및 손실 거푸집 블록 설치",
            "철근 배근 및 콘크리트 타설로 기초 강화",
            "장식 콘크리트 블록 조적 및 목재 상단부 마감",
            "목재 방부/도색 및 주변 정리"
        ],
        images: Array.from({ length: 10 }, (_, i) => `/img/2/${i + 1}.webp`)
    },
    {
        id: "concrete-floor",
        title: "내외부 콘크리트 바닥 재시공",
        category: "바닥/콘크리트",
        description: [
            "기존 토양/잔디 제거 및 자갈층/방수 시트 시공",
            "철근 메쉬(카리망) 배근 및 콘크리트 타설",
            "표면 기계 미장 및 평탄화 마감",
            "내부 노후 콘크리트 교체 및 동일 공정 수행"
        ],
        images: Array.from({ length: 7 }, (_, i) => `/img/3/${i + 1}.webp`)
    },
    {
        id: "industrial-floor",
        title: "산업용 고하중 바닥 시공",
        category: "산업/콘크리트",
        description: [
            "물류 창고 바닥 레벨링 및 방수/자갈층 조성",
            "고하중 대비 정밀 철근 배근 및 펌프카 타설",
            "기계 연마 마감 및 신축 이음장치 설치",
            "내구성과 평탄도 품질 확보"
        ],
        images: Array.from({ length: 9 }, (_, i) => `/img/5/${i + 1}.webp`)
    },
    {
        id: "special-structure",
        title: "특수 구조물 철근/콘크리트 공사",
        category: "구조/설비",
        description: [
            "도면에 따른 정밀 철근 가공 및 결속",
            "시스템 거푸집(Doka/Peri) 설치 및 치수 확보",
            "콘크리트 타설 및 진동 다짐",
            "거푸집 해체 후 표면 품질 검수"
        ],
        images: Array.from({ length: 6 }, (_, i) => `/img/9/${i + 1}.webp`)
    },
    {
        id: "pavement",
        title: "주택 진입로 및 계단 재시공",
        category: "조경/석공",
        description: [
            "기존 보도 및 타일 철거, 지반 다짐",
            "경계석 설치 및 쇄석층 조성",
            "인터락킹 블록 포장 및 콘크리트 계단석 설치",
            "미끄럼 방지 및 배수 고려 시공"
        ],
        images: Array.from({ length: 6 }, (_, i) => `/img/11/${i + 1}.webp`)
    }
];
