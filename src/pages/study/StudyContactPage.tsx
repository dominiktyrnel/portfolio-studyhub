import { useStudyLanguage } from '../../study/i18n/StudyLanguageContext';
import { ArrowLeft, MessageSquare, Mail, AlertTriangle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useStudyGlobalSettings } from '../../hooks/useStudyGlobalSettings';

export function StudyContactPage() {
    const { studyLang } = useStudyLanguage();
    const { settings } = useStudyGlobalSettings();

    const kakaoLink = settings?.kakaoLink || 'https://open.kakao.com/o/sPMiHoZf';
    const title = studyLang === 'kr' ? '문의하기' : 'Contact';

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
            <h1 className="text-3xl font-bold text-[var(--study-text)] mb-4 font-heading">{title}</h1>
            <p className="text-[var(--study-text-muted)] text-lg mb-8">
                {studyLang === 'kr'
                    ? '가장 빠른 연락 방법은 카카오톡 1:1 채팅입니다.'
                    : 'The fastest way to reach me is via KakaoTalk 1:1 chat.'}
            </p>

            <div className="space-y-6">
                {/* KakaoTalk */}
                <div className="bg-[var(--study-surface)] border border-[var(--study-border)] rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#FEE500] rounded-lg">
                            <MessageSquare size={24} className="text-[#3D1E00]" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[var(--study-text)] mb-2">
                                {studyLang === 'kr' ? '카카오톡 1:1' : 'KakaoTalk 1:1'}
                            </h2>
                            <p className="text-[var(--study-text-muted)] mb-4">
                                {studyLang === 'kr'
                                    ? '상단 헤더의 카카오톡 링크를 눌러 1:1 채팅으로 바로 연락해 주세요.'
                                    : 'Tap the KakaoTalk link in the header to open a direct chat.'}
                            </p>
                            <a
                                href={kakaoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FEE500] text-[#3D1E00] font-bold rounded-lg hover:opacity-90 transition-opacity"
                            >
                                <MessageSquare size={18} />
                                {studyLang === 'kr' ? '카카오톡 열기' : 'Open KakaoTalk'}
                            </a>
                        </div>
                    </div>
                </div>

                {/* FAQ Form */}
                <div className="bg-[var(--study-surface)] border border-[var(--study-border)] rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-[var(--study-accent)]/10 rounded-lg">
                            <Mail size={24} className="text-[var(--study-accent)]" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[var(--study-text)] mb-2">
                                {studyLang === 'kr' ? 'FAQ / 문의 폼' : 'FAQ / Contact Form'}
                            </h2>
                            <p className="text-[var(--study-text-muted)] mb-4">
                                {studyLang === 'kr'
                                    ? '웹사이트, 라이브, 봇, 스터디룸 관련 질문은 가능하면 사이트의 FAQ 폼으로 보내 주세요. 제가 정리해서 더 빠르고 정확하게 답변할 수 있습니다.'
                                    : 'If your question is related to the website, stream, bot, or study room, please use the FAQ form on this site so I can organize and answer it properly.'}
                            </p>
                            <NavLink
                                to="/study/faq"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--study-accent)] text-[var(--study-bg)] font-bold rounded-lg hover:opacity-90 transition-opacity"
                            >
                                {studyLang === 'kr' ? 'FAQ 페이지로 이동' : 'Go to FAQ Page'}
                            </NavLink>
                        </div>
                    </div>
                </div>

                {/* Warning */}
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <AlertTriangle size={24} className="text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
                                {studyLang === 'kr' ? '중요 안내' : 'Important'}
                            </h2>
                            <ul className="text-amber-800 dark:text-amber-200 space-y-2 text-sm">
                                <li>
                                    {studyLang === 'kr'
                                        ? '• 메시지/폼에 개인정보(전화번호, 주소, 비밀번호, 주민번호/여권번호, 결제정보 등)는 작성하지 마세요.'
                                        : '• Please do not include personal data in messages or forms (phone number, home address, passwords, ID numbers, payment details, etc.).'}
                                </li>
                                <li>
                                    {studyLang === 'kr'
                                        ? '• 계정 관련 문제라도 비밀번호는 절대 공유하지 마세요. 저는 비밀번호를 요구하지 않습니다.'
                                        : '• For account-related issues, never share your password. I will never ask for it.'}
                                </li>
                                <li>
                                    {studyLang === 'kr'
                                        ? '• 카카오톡 링크를 클릭하면 웹사이트 밖의 카카오 서비스로 이동하며, 카카오의 정책이 적용됩니다.'
                                        : '• If you click the KakaoTalk link, you will leave this website and your interaction will be governed by Kakao\'s policies.'}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div className="text-center text-[var(--study-text-muted)] text-sm">
                    <p className="mb-2">
                        {studyLang === 'kr' ? '이메일 (중요한 문의만)' : 'Email (for serious matters only)'}
                    </p>
                    <a
                        href="mailto:dominiktyrnel@gmail.com"
                        className="text-[var(--study-accent)] hover:underline"
                    >
                        dominiktyrnel@gmail.com
                    </a>
                </div>
            </div>
        </div>
    );
}
