import { useState } from 'react';
import { ExternalLink, Copy, Check, Users, Video, Lock, Info, Zap, Coffee, ArrowRight } from 'lucide-react';
import { useRoomSettings } from '../../hooks/useRoomSettings';
import { useOutletContext } from 'react-router-dom';
import { RoomSkeleton } from '../../components/study/LoadingSkeletons';
import { useAuth } from '../../lib/auth';
import { useStudyTranslations } from '../../study/i18n/useStudyTranslations';

export function StudyRoomPage() {
    const { lang } = useOutletContext<{ lang: 'kr' | 'en' }>();
    const { settings, loading } = useRoomSettings();
    const { user } = useAuth();
    const t = useStudyTranslations();
    const [copied, setCopied] = useState(false);

    const ROOM_LINK = settings?.roomLink || "https://gooroomee.com/tyrnelstudy";
    const ROOM_PASS = settings?.roomPassword || "1234";

    const handleCopy = () => {
        navigator.clipboard.writeText(ROOM_PASS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return <RoomSkeleton />;
    }

    return (
        <div className="@starting-style:opacity-0 opacity-100 transition-opacity duration-500">
            <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 md:px-8">
                <div className="max-w-2xl mx-auto">

                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--study-accent)]/10 flex items-center justify-center">
                            <Video size={40} className="text-[var(--study-accent)]" />
                        </div>

                        <h1 className="text-3xl font-bold text-[var(--study-text)] mb-4 font-heading">
                            {lang === 'kr' ? '스터디룸 입장' : 'Enter Study Room'}
                        </h1>

                        <p className="text-xl text-[var(--study-text-muted)] max-w-md mx-auto leading-relaxed mb-2">
                            {lang === 'kr'
                                ? '온라인 스터디룸에서 함께 공부해요'
                                : "Let's study together in the online study room"}
                        </p>

                        <p className="text-sm text-[var(--study-text-muted)] flex items-center justify-center gap-2">
                            <Lock size={14} />
                            {lang === 'kr' ? '24/7 오픈 🤫' : '24/7 Open 🤫'}
                        </p>
                    </div>

                    {/* How It Works - 3 Steps */}
                    <div className="bg-[var(--study-surface)] rounded-2xl border border-[var(--study-border)] p-6 md:p-8 mb-8">
                        <h2 className="text-lg font-bold text-[var(--study-text)] mb-6 text-center">
                            {lang === 'kr' ? '이용 방법' : 'How It Works'}
                        </h2>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center flex-1">
                                <div className="w-12 h-12 rounded-full bg-[var(--study-accent)] text-[var(--study-bg)] flex items-center justify-center font-bold text-lg mb-3">
                                    1
                                </div>
                                <p className="text-sm text-[var(--study-text)]">
                                    {lang === 'kr' ? '입장 버튼 클릭' : 'Click Enter'}
                                </p>
                            </div>
                            <ArrowRight className="text-[var(--study-border)] hidden md:block" size={24} />
                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center flex-1">
                                <div className="w-12 h-12 rounded-full bg-[var(--study-accent)] text-[var(--study-bg)] flex items-center justify-center font-bold text-lg mb-3">
                                    2
                                </div>
                                <p className="text-sm text-[var(--study-text)]">
                                    {lang === 'kr' ? '비밀번호 입력' : 'Enter Password'}
                                </p>
                            </div>
                            <ArrowRight className="text-[var(--study-border)] hidden md:block" size={24} />
                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center flex-1">
                                <div className="w-12 h-12 rounded-full bg-[var(--study-accent)] text-[var(--study-bg)] flex items-center justify-center font-bold text-lg mb-3">
                                    3
                                </div>
                                <p className="text-sm text-[var(--study-text)]">
                                    {lang === 'kr' ? '함께 공부 시작!' : 'Start Studying!'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Card */}
                    <div className="bg-[var(--study-surface)] rounded-2xl border border-[var(--study-border)] p-8 md:p-10 shadow-lg mb-8">

                        {/* Enter Button - Auth-only */}
                        {user ? (
                            <a
                                href={ROOM_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full bg-[var(--study-accent)] text-[var(--study-bg)] font-bold py-4 rounded-xl hover:bg-[var(--study-accent-sub)] transition-all shadow-md hover:shadow-lg text-lg mb-6 group"
                            >
                                {lang === 'kr' ? '입장하기' : 'Enter Room'}
                                <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        ) : (
                            <div className="flex items-center justify-center gap-3 w-full text-[var(--study-text-muted)] py-4 rounded-xl bg-[var(--study-bg)] border border-dashed border-[var(--study-border)] mb-6">
                                <Lock size={18} />
                                {t.now.linkHidden}
                            </div>
                        )}

                        {/* Password Section - Auth-only */}
                        <div className="bg-[var(--study-bg)] rounded-xl p-6 border border-[var(--study-border)]">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-[var(--study-text-muted)] uppercase tracking-wider">
                                    {lang === 'kr' ? '비밀번호' : 'PASSWORD'}
                                </span>
                                {user && (
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--study-surface)] hover:bg-[var(--study-accent)]/10 border border-[var(--study-border)] transition-colors text-sm font-medium text-[var(--study-text)]"
                                        title={lang === 'kr' ? '복사하기' : 'Copy Password'}
                                    >
                                        {copied ? (
                                            <>
                                                <Check size={14} className="text-[var(--study-accent)]" />
                                                {lang === 'kr' ? '복사됨!' : 'Copied!'}
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={14} />
                                                {lang === 'kr' ? '복사' : 'Copy'}
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                            {user ? (
                                <div className="text-3xl font-mono font-bold text-[var(--study-text)] tracking-wider">
                                    {ROOM_PASS}
                                </div>
                            ) : (
                                <div className="text-[var(--study-text-muted)] italic">
                                    {t.now.passwordHidden}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Focus/Break Atmosphere */}
                    <div className="bg-[var(--study-surface)] rounded-2xl border border-[var(--study-border)] p-6 md:p-8 mb-8">
                        <h2 className="text-lg font-bold text-[var(--study-text)] mb-4 text-center">
                            {lang === 'kr' ? '집중 & 휴식 리듬' : 'Focus & Break Rhythm'}
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[var(--study-bg)] rounded-xl p-4 text-center border border-[var(--study-border)]">
                                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                    <Zap size={20} className="text-amber-600 dark:text-amber-400" />
                                </div>
                                <h3 className="font-bold text-[var(--study-text)] mb-1">Focus</h3>
                                <p className="text-xs text-[var(--study-text-muted)]">
                                    {lang === 'kr'
                                        ? '집중 시간에는 채팅 쉬고 조용히 공부해요'
                                        : 'During focus, stay quiet and study hard'}
                                </p>
                            </div>
                            <div className="bg-[var(--study-bg)] rounded-xl p-4 text-center border border-[var(--study-border)]">
                                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <Coffee size={20} className="text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="font-bold text-[var(--study-text)] mb-1">Break</h3>
                                <p className="text-xs text-[var(--study-text-muted)]">
                                    {lang === 'kr'
                                        ? '쉬는 시간에는 스트레칭하거나 물 마셔요'
                                        : 'During break, stretch or grab water'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* House Rules */}
                    <div className="bg-[var(--study-surface)] rounded-2xl border border-[var(--study-border)] p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-[var(--study-accent)]/10">
                                <Info size={20} className="text-[var(--study-accent)]" />
                            </div>
                            <h2 className="text-xl font-bold text-[var(--study-text)]">
                                {lang === 'kr' ? '참여 규칙' : 'Room Rules'}
                            </h2>
                        </div>

                        <ul className="space-y-3 text-[var(--study-text-muted)]">
                            {(lang === 'kr' ? settings?.rulesKR : settings?.rulesEN)?.map((rule, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className="text-[var(--study-accent)] font-bold shrink-0">•</span>
                                    <span>{rule}</span>
                                </li>
                            )) || (
                                    <>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[var(--study-accent)] font-bold shrink-0">•</span>
                                            <span>{lang === 'kr'
                                                ? '마이크는 항상 음소거 상태로 유지해주세요 (집중을 위해)'
                                                : 'Keep your microphone muted at all times (for focus)'}
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[var(--study-accent)] font-bold shrink-0">•</span>
                                            <span>{lang === 'kr'
                                                ? '카메라는 선택사항이지만 켜는 것을 권장합니다 (동기부여)'
                                                : 'Camera is optional but encouraged (for motivation)'}
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[var(--study-accent)] font-bold shrink-0">•</span>
                                            <span>{lang === 'kr'
                                                ? '다른 참여자를 존중하고 조용한 분위기를 유지해주세요'
                                                : 'Respect other participants and maintain a quiet atmosphere'}
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[var(--study-accent)] font-bold shrink-0">•</span>
                                            <span>{lang === 'kr'
                                                ? '채팅은 YouTube 라이브 채팅을 이용해주세요'
                                                : 'Use YouTube live chat for messaging'}
                                            </span>
                                        </li>
                                    </>
                                )}
                        </ul>

                        <div className="mt-6 pt-6 border-t border-[var(--study-border)] flex items-center gap-2 text-sm text-[var(--study-text-muted)]">
                            <Users size={16} />
                            <span>{lang === 'kr'
                                ? '카메라/마이크 권한이 필요합니다. 브라우저에서 허용해주세요.'
                                : 'Camera/microphone permissions required. Please allow in your browser.'}
                            </span>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <p className="text-center text-sm text-[var(--study-text-muted)] mt-8 italic">
                        {lang === 'kr'
                            ? '조용히, 꾸준히. 함께 성장해요. 📚'
                            : 'Quietly, consistently. Let\'s grow together. 📚'}
                    </p>
                </div>
            </div>
        </div>
    );
}
