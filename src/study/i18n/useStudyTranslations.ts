import { useStudyLanguage } from './StudyLanguageContext';
import { studyTranslations } from './translations';

/**
 * Hook to access Study Hub translations
 * Returns translations object based on current study language (kr/en)
 * 
 * @example
 * const t = useStudyTranslations();
 * <h1>{t.records.title}</h1>
 */
export function useStudyTranslations() {
    const { studyLang } = useStudyLanguage();
    return studyTranslations[studyLang];
}
