import { useContext } from 'react';
import { StudyThemeContext } from './StudyThemeContext';

export function useStudyTheme() {
    const context = useContext(StudyThemeContext);
    if (!context) {
        throw new Error('useStudyTheme must be used within a StudyThemeProvider');
    }
    return context;
}
