// Canonical Korean Content Tokens for Consistency
// Shared between Home and Profile pages

export const KR_COMMON = {
    // Identity
    NAME_KR: "도미니크 티르넬",
    ROLE_LINE: "건설 현장 기술자 · 소규모 현장 팀 리더(2–8명)",

    // Status
    AVAILABILITY: "2026년 말부터 가능 (협의)",
    REGION: "서울 우선 (출장 가능)",
    VISA: "비자 협의 필요",

    // Key Phrases
    MEP_SEPARATION: "전기·설비(상하수/난방/가스) 공정은 협력업체 시공",
    CONTACT_KR_PHONE: "한국 현지 번호: 없음 (체코 거주)",

    // Section Titles (Shared)
    SECTION: {
        SUMMARY: "한눈에 보는 요약",
        EXPERIENCE: "경력 상세 (2009 ~ 현재)",
        SCOPE: "업무 수행 범위",
        SKILLS: "핵심 역량",
        TOOLS: "장비·공구 운용",
        STYLE: "업무 스타일",
        REFERENCE: "평가/추천",
        KOREA: "한국 취업",
        CONDITIONS: "근무 조건",
        CONTACT: "연락처"
    },

    // Navigation Labels
    NAV: {
        MENU: "메뉴",
        LANG_KR: "한국어",
        LANG_EN: "영어",
        PROFILE_LINK: "전체 프로필 상세 보기",
        PROFILE_TITLE: "전체 프로필"
    },

    // UI Elements & Actions
    UI: {
        PAGE_PREPARING: "준비 중인 페이지입니다.",
        IMAGE_PREPARING: "이미지 준비 중",
        NO_PHOTOS: "사진 준비 중입니다.",
        PROJECT_OVERVIEW: "프로젝트 개요",
        GALLERY_TITLE: "현장 사진 갤러리",
        GALLERY_COUNT_UNIT: (count: number) => `(${count}장)`,
        COPYRIGHT_PRE: "이력서 열람용 비공개 페이지입니다. © 2025 ",
        COPYRIGHT_POST: ". 무단 전재 및 배포 금지.",
        CONTACT_NOTE: "한국 취업 희망 (2026년 말 이후)"
    }
} as const;
