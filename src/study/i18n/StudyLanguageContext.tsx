import { createContext, useState, useEffect, type ReactNode } from 'react';
import { safeGetString, safeSetString } from '../../utils/safeStorage';

type StudyLanguage = 'kr' | 'en';

interface StudyLanguageContextType {
    studyLang: StudyLanguage;
    setStudyLang: (lang: StudyLanguage) => void;
    toggleStudyLang: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components -- Exporting context alongside provider for architectural consistency
export const StudyLanguageContext = createContext<StudyLanguageContextType | undefined>(undefined);

export function StudyLanguageProvider({ children }: { children: ReactNode }) {
    const [studyLang, setStudyLangState] = useState<StudyLanguage>(() => {
        // ✅ SECURITY FIX: Validate stored language
        const stored = safeGetString('app-study-lang', ['kr', 'en']);
        return (stored === 'kr' || stored === 'en') ? stored : 'kr';
    });

    useEffect(() => {
        safeSetString('app-study-lang', studyLang);
    }, [studyLang]);

    const setStudyLang = (lang: StudyLanguage) => {
        setStudyLangState(lang);
    };

    const toggleStudyLang = () => {
        setStudyLangState(prev => prev === 'kr' ? 'en' : 'kr');
    };

    return (
        <StudyLanguageContext.Provider value={{ studyLang, setStudyLang, toggleStudyLang }}>
            {children}
        </StudyLanguageContext.Provider>
    );
}

// Re-export hook for backward compatibility
// eslint-disable-next-line react-refresh/only-export-components -- Re-exporting hook for backward compatibility
export { useStudyLanguage } from './useStudyLanguage';
