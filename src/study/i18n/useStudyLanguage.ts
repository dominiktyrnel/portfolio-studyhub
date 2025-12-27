import { useContext } from 'react';
import { StudyLanguageContext } from './StudyLanguageContext';

export function useStudyLanguage() {
    const context = useContext(StudyLanguageContext);
    if (!context) {
        throw new Error('useStudyLanguage must be used within a StudyLanguageProvider');
    }
    return context;
}
