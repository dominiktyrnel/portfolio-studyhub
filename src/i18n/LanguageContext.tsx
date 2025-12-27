import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import { content as contentKr } from '../content/kr';
import { contentEn } from '../content/en';
import { KR_COMMON } from '../content/kr_common';
import { EN_COMMON } from '../content/en_common';
import { safeGetString, safeSetString } from '../utils/safeStorage';

// Helper to widen types (make all string literals just string) or simply satisfy TS
// by saying "trust me, it fits the shape".
// We use contentKr as the base type.
type ContentType = typeof contentKr;
type CommonType = typeof KR_COMMON;
type Language = 'kr' | 'en';

export interface LanguageContextType {
    lang: Language;
    toggleLang: () => void;
    setLang: (lang: Language) => void;
    content: ContentType;
    common: CommonType;
}

// Language Context - provides UI language state across the app
// eslint-disable-next-line react-refresh/only-export-components -- Exporting context alongside provider is architectural choice for backward compatibility
export const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const getInitialLang = (): Language => {
        // ✅ SECURITY FIX: Validate localStorage value to prevent XSS
        const savedLang = safeGetString('lang', ['kr', 'en']);
        if (savedLang === 'kr' || savedLang === 'en') {
            return savedLang;
        }

        // Default based on browser language
        const browserLang = navigator.language.toLowerCase();
        return browserLang.startsWith('ko') ? 'kr' : 'en';
    };

    const [lang, setLangState] = useState<Language>(getInitialLang());

    // Initialize from localStorage (now handled by getInitialLang)
    useEffect(() => {
        // Ensure localStorage is updated if initial lang came from browser default
        safeSetString('lang', lang);
    }, [lang]); // Include lang dependency

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        safeSetString('lang', newLang); // ✅ SECURITY: Use safe setter
    };

    const toggleLang = () => {
        setLangState((prev: Language) => {
            const newLang: Language = prev === 'kr' ? 'en' : 'kr';
            safeSetString('lang', newLang);
            return newLang;
        });
    };

    // We cast the EN content to 'any' then to the specific type to avoid 
    // TypeScript complaining about string literal mismatches (e.g. "NameKR" vs "NameEN")
    // This is safe because the structure matches, only the values differ.

    // We maintain local state for content to allow updates
    const [contentData, setContentData] = useState<ContentType>(lang === 'kr' ? contentKr : contentEn as unknown as ContentType);

    // Fetch content on mount and lang change
    useEffect(() => {
        let mounted = true;

        import('../lib/contentRepository').then(({ ContentRepository }) => {
            ContentRepository.getContent(lang).then(data => {
                if (mounted && data) {
                    setContentData(data as ContentType);
                }
            });
        });

        return () => { mounted = false; };
    }, [lang]);

    // Derived common data (kept static for now as it's small, or could be part of content)
    const currentCommon = (lang === 'kr' ? KR_COMMON : EN_COMMON) as unknown as CommonType;

    const value = {
        lang,
        toggleLang,
        setLang,
        content: contentData,
        common: currentCommon,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components -- Exporting hook for backward compatibility
export const useLanguage = () => {
    return useContext(LanguageContext);
};
