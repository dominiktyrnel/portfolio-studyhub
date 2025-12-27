import { useStudyLanguage } from '../../study/i18n/StudyLanguageContext';
import { ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { termsOfService } from '../../study/legal/termsOfService';

export function StudyTermsPage() {
    const { studyLang } = useStudyLanguage();

    const terms = studyLang === 'kr' ? termsOfService.kr : termsOfService.en;
    const title = studyLang === 'kr' ? '이용약관' : 'Terms of Service';

    return (
        <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
            {/* Back Button */}
            <NavLink
                to="/study/now"
                className="inline-flex items-center gap-2 text-[var(--study-text-muted)] hover:text-[var(--study-text)] mb-8 transition-colors"
            >
                <ArrowLeft size={18} />
                {studyLang === 'kr' ? '돌아가기' : 'Go Back'}
            </NavLink>

            {/* Header */}
            <h1 className="text-3xl font-bold text-[var(--study-text)] mb-2 font-heading">{title}</h1>
            <p className="text-[var(--study-text-muted)] text-sm mb-8">
                Last updated: {terms.lastUpdated}
            </p>

            {/* Content */}
            <div className="bg-[var(--study-surface)] border border-[var(--study-border)] rounded-xl p-6 md:p-8 space-y-8">
                {terms.sections.map((section, index) => (
                    <div key={index}>
                        <h2 className="text-lg font-bold text-[var(--study-text)] mb-3">
                            {section.title}
                        </h2>
                        <div className="text-[var(--study-text-muted)] whitespace-pre-line leading-relaxed">
                            {section.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
