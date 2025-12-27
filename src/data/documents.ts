export interface DocumentItem {
    id: string;
    titleKr: string;
    descriptionKr: string;
    kind: string;
    fileUrl: string;
    fileName: string; // for download attribute
    format: string; // e.g. 'PDF'
    note?: string;
    openButton?: string;
    downloadButton?: string;
}

export const documents: DocumentItem[] = [
    {
        id: 'practice',
        titleKr: '확인서 / 실무 경력 증빙',
        descriptionKr: 'Cita Trading s.r.o.에서 발급한 실무 경력 및 장기 협업 확인서입니다.',
        kind: '원문 + 번역',
        fileUrl: '/docs/Practice_Confirmation.pdf',
        fileName: 'Practice_Confirmation.pdf',
        format: 'PDF',
    },
    {
        id: 'reference',
        titleKr: '추천서 / 평가서',
        descriptionKr: '고용주(Ing. Tomáš Citnar)의 평가 및 추천 내용이 포함되어 있습니다.',
        kind: '원문 + 번역',
        fileUrl: '/docs/Employment_Reference.pdf',
        fileName: 'Employment_Reference.pdf',
        format: 'PDF',
    },
    {
        id: 'cv',
        titleKr: '한국어 이력서',
        descriptionKr: '경력, 역량, 프로젝트 요약이 포함된 이력서입니다.',
        kind: '한국어',
        fileUrl: '/docs/CV.pdf',
        fileName: 'Dominik_Tyrnel_CV.pdf',
        format: 'PDF',
        note: '개인정보 포함'
    }
];
