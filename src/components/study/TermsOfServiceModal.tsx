import { X } from 'lucide-react';
import { useStudyTranslations } from '../../study/i18n/useStudyTranslations';
import { useStudyLanguage } from '../../study/i18n/StudyLanguageContext';
import { termsOfService } from '../../study/legal/termsOfService';

interface TermsOfServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
    const t = useStudyTranslations();
    const { studyLang } = useStudyLanguage();

    if (!isOpen) return null;

    const tos = studyLang === 'kr' ? termsOfService.kr : termsOfService.en;

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-[var(--study-surface)] rounded-2xl shadow-2xl border border-[var(--study-border)] max-w-2xl w-full max-h-[85vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--study-border)]">
                    <h2 className="text-xl font-bold text-[var(--study-text)]">
                        {t.auth.tosTitle}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[var(--study-text-muted)] hover:text-[var(--study-text)] hover:bg-[var(--study-bg)] transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    <p className="text-xs text-[var(--study-text-muted)] mb-6">
                        {studyLang === 'kr' ? '최종 업데이트' : 'Last Updated'}: {tos.lastUpdated}
                    </p>

                    <div className="space-y-6">
                        {tos.sections.map((section, index) => (
                            <div key={index}>
                                <h3 className="text-sm font-bold text-[var(--study-text)] mb-2">
                                    {section.title}
                                </h3>
                                <p className="text-sm text-[var(--study-text-muted)] whitespace-pre-line leading-relaxed">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[var(--study-border)]">
                    <button
                        onClick={onClose}
                        className="w-full bg-[var(--study-accent)] text-[var(--study-bg)] font-bold py-3 rounded-lg hover:bg-[var(--study-accent-sub)] transition-colors"
                    >
                        {t.auth.tosClose}
                    </button>
                </div>
            </div>
        </div>
    );
}
