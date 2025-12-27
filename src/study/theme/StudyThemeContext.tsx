import { createContext, useState, useEffect, type ReactNode } from 'react';
import { safeGetString, safeSetString } from '../../utils/safeStorage';

type StudyTheme = 'light' | 'dark';

interface StudyThemeContextType {
    studyTheme: StudyTheme;
    setStudyTheme: (theme: StudyTheme) => void;
    toggleStudyTheme: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components -- Exporting context alongside provider for architectural consistency
export const StudyThemeContext = createContext<StudyThemeContextType | undefined>(undefined);

export function StudyThemeProvider({ children }: { children: ReactNode }) {
    const [studyTheme, setStudyThemeState] = useState<StudyTheme>(() => {
        const stored = safeGetString('app-study-theme', ['light', 'dark']);
        return (stored === 'light' || stored === 'dark') ? stored : 'light';
    });

    useEffect(() => {
        safeSetString('app-study-theme', studyTheme);
    }, [studyTheme]);

    const setStudyTheme = (theme: StudyTheme) => {
        setStudyThemeState(theme);
    };

    const toggleStudyTheme = () => {
        setStudyThemeState(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <StudyThemeContext.Provider value={{ studyTheme, setStudyTheme, toggleStudyTheme }}>
            {children}
        </StudyThemeContext.Provider>
    );
}

// Re-export hook for backward compatibility
// eslint-disable-next-line react-refresh/only-export-components -- Re-exporting hook for backward compatibility
export { useStudyTheme } from './useStudyTheme';
