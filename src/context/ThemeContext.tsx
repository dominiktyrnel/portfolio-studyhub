import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { safeGetString, safeSetString } from '../utils/safeStorage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => {
        // ✅ SECURITY FIX: Validate theme value
        const stored = safeGetString('app-theme', ['light', 'dark']);
        return (stored === 'light' || stored === 'dark') ? stored : 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        safeSetString('app-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setThemeState(prev => prev === 'light' ? 'dark' : 'light');
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components -- Hook export for backward compatibility
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
