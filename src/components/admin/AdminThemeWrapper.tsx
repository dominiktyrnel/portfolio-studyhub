import { ThemeProvider } from '../../context/ThemeContext';
import type { ReactNode } from 'react';

export function AdminThemeWrapper({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}
