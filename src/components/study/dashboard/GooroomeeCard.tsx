import { ExternalLink, Copy, Check, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { useRoomSettings } from '../../../hooks/useRoomSettings';
import { useAuth } from '../../../lib/auth';
import { useStudyTranslations } from '../../../study/i18n/useStudyTranslations';
import { NavLink } from 'react-router-dom';

interface GooroomeeCardProps {
    lang: 'kr' | 'en';
}

export function GooroomeeCard({ lang }: GooroomeeCardProps) {
    const { settings } = useRoomSettings();
    const { user } = useAuth();
    const t = useStudyTranslations();

    const ROOM_LINK = settings?.roomLink || "https://gooroomee.com/tyrnelstudy";
    const ROOM_PASS = settings?.roomPassword || "1234";

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(ROOM_PASS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[var(--study-surface)] rounded-xl border border-[var(--study-border)] p-6 shadow-xs transition-colors duration-200 hover-tilt shadow-3d-hover">
            <h3 className="font-bold text-lg mb-2">
                {lang === 'kr' ? '스터디룸 입장' : 'Join Study Room'}
            </h3>
            <p className="text-study-muted text-sm mb-6 leading-relaxed">
                {lang === 'kr'
                    ? '온라인 스터디룸에서 함께 공부해요. 🤫'
                    : "Let's study together in the online study room. 🤫"}
            </p>

            <div className="space-y-3">
                {user ? (
                    <a
                        href={ROOM_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[var(--study-bg)] text-[var(--study-text)] font-bold py-3 rounded-lg hover:bg-[var(--study-border)] transition-colors shadow-xs"
                    >
                        {lang === 'kr' ? '입장하기' : 'Enter Room'}
                        <ExternalLink size={16} />
                    </a>
                ) : (
                    <div className="flex items-center justify-center gap-2 w-full text-[var(--study-text-muted)] text-sm py-3 rounded-lg bg-[var(--study-bg)] border border-dashed border-[var(--study-border)]">
                        {t.now.linkHidden}
                    </div>
                )}

                {/* Password - Hidden for non-authenticated users */}
                <div className="flex items-center justify-between text-xs bg-study-surface px-3 py-2 rounded-lg border border-study-border">
                    <span className="text-study-muted font-medium">PASSWORD</span>
                    <div className="flex items-center gap-2">
                        {user ? (
                            <>
                                <span className="font-mono font-bold tracking-wider">{ROOM_PASS}</span>
                                <button
                                    onClick={handleCopy}
                                    className="p-1 hover:bg-[var(--study-bg)]/20 rounded transition-colors"
                                    title="Copy Password"
                                >
                                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                </button>
                            </>
                        ) : (
                            <span className="text-study-muted italic text-xs">
                                {t.now.passwordHidden}
                            </span>
                        )}
                    </div>
                </div>

                {/* View Rules Button */}
                <NavLink
                    to="/study/room"
                    className="flex items-center justify-center gap-2 w-full text-study-muted text-sm py-2 rounded-lg hover:bg-[var(--study-bg)] transition-colors border border-transparent hover:border-study-border"
                >
                    <BookOpen size={14} />
                    {t.now.viewRules}
                </NavLink>
            </div>

            {/* Decoration */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--study-accent)]/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
        </div>
    );
}
