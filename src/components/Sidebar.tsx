import { profile } from "../data/cv";
import { Mail, Phone, MessageCircle, Download, Terminal, BookOpen, Inbox } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { useGlobalContent } from "../hooks/useGlobalContent";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
    onPhotoClick?: () => void;
}

type NavItem = {
    id?: string;
    label: string;
    icon?: LucideIcon;
    path?: string;
};

export function Sidebar({ onPhotoClick }: SidebarProps) {
    // All hooks MUST be called before early return
    const languageContext = useLanguage();
    const { data: global } = useGlobalContent();
    const navigate = useNavigate();

    // Early return AFTER all hooks
    if (!languageContext) return null;
    const { lang, toggleLang, content } = languageContext;

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const handleNav = (item: NavItem) => {
        if (item.path) {
            navigate(item.path);
        } else if (item.id) {
            scrollTo(item.id);
        }
    };

    const cleanTitle = profile.title.replace(" / 소규모 현장 리더", "");

    // Dynamic Contact Data
    const contact = {
        email: global?.contact?.email || profile.email,
        phone: global?.contact?.phoneCz || profile.phoneCz,
        kakaoId: global?.contact?.kakaoId || profile.kakaoId,
        kakaoLink: global?.contact?.kakaoLink || "https://open.kakao.com/o/sb994i6h"
    };

    // Navigation items mapped from content
    const navItems: NavItem[] = [
        { id: "summary", label: content.profilePageV4.nav.sections.find((s: { id: string }) => s.id === 'summary')?.label || "요약" },
        { id: "experience", label: content.profilePageV4.nav.sections.find((s: { id: string }) => s.id === 'experience')?.label || "경력" },
        { id: "scope", label: content.profilePageV4.nav.sections.find((s: { id: string }) => s.id === 'scope')?.label || "범위" },
        { id: "skills", label: content.profilePageV4.nav.sections.find((s: { id: string }) => s.id === 'skills')?.label || "역량" },
        { icon: Terminal, label: "Study Bot", path: '/admin/study-bot' },
        { icon: BookOpen, label: "Study Plan", path: '/admin/study-plan' },
        { icon: Inbox, label: "Inbox", path: '/admin/inbox' },
        { id: "tools", label: content.profilePageV4.nav.sections.find((s: { id: string }) => s.id === 'tools')?.label || "장비" },
        { id: "workstyle", label: content.profilePageV4.nav.sections.find((s: { id: string }) => s.id === 'workstyle')?.label || "스타일" },
        { id: "reference", label: content.profilePageV4.nav.sections.find((s: { id: string }) => s.id === 'reference')?.label || "추천" },
        { id: "contact", label: content.profilePageV4.nav.sections.find((s: { id: string }) => s.id === 'conditions')?.label || "연락" },
    ];

    return (
        <div className="h-full flex flex-col bg-slate-800 text-slate-200 border-r border-slate-700">
            {/* Mobile Header (Hidden on Desktop) - ONLY Lang Toggle as requested */}
            <div className="md:hidden bg-slate-900 text-white p-3 sticky top-0 z-50 flex justify-end items-center shadow-md border-b border-slate-800">
                <button
                    onClick={toggleLang}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-700 transition-colors"
                >
                    <span className="text-lg leading-none">{lang === "kr" ? "🇰🇷" : "🇨🇿"}</span>
                    <span className="text-xs font-bold uppercase tracking-wide">
                        {lang === "kr" ? "한국어" : "English"}
                    </span>
                </button>
            </div>

            {/* Desktop Content */}
            <div className="p-8 flex-1 flex flex-col gap-8 md:pt-14 overflow-y-auto">
                {/* Profile Block */}
                <div className="text-center md:text-left">
                    <div className="inline-block mb-6 relative group cursor-pointer" onClick={onPhotoClick}>
                        <img
                            src="/img/profile.webp"
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-slate-700 shadow-2xl mx-auto md:mx-0 group-hover:scale-105 group-hover:border-sky-400 transition-all duration-300"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-1 leading-tight">
                        {profile.nameKr}
                    </h1>
                    <p className="text-sm text-slate-400 font-medium mb-3">{cleanTitle}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/30 rounded-full text-sky-300 text-xs font-bold">
                        <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></span>
                        한국 취업 희망
                    </div>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                    <a
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-700/50 transition-colors group text-left"
                    >
                        <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-xs shrink-0">
                            <Mail size={18} />
                        </div>
                        <span className="font-medium group-hover:text-white transition-colors truncate">{contact.email}</span>
                    </a>

                    <a
                        href={contact.kakaoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-700/50 transition-colors group text-left"
                    >
                        <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all shadow-xs shrink-0">
                            <MessageCircle size={18} />
                        </div>
                        <span className="font-medium group-hover:text-white transition-colors">카카오톡 오픈채팅</span>
                    </a>

                    <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-700/50 transition-colors group text-left">
                        <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all shadow-xs shrink-0">
                            <Phone size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-white text-base">{contact.phone} <span className="text-xs font-normal text-slate-500 ml-1">(CZ)</span></span>
                            <span className="text-xs text-slate-500 mt-0.5">KR Phone: Not yet active</span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex flex-col gap-1 text-sm font-medium text-slate-400 mt-4 border-t border-slate-700/50 pt-8">
                    {navItems.map((item: NavItem, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => handleNav(item)}
                            className="text-left py-3 px-4 rounded-lg hover:bg-slate-700 hover:text-white transition-all border border-transparent hover:border-slate-600 flex items-center gap-2"
                        >
                            {item.icon && <item.icon size={16} className="opacity-70" />}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto hidden md:flex flex-col gap-4 pt-8 border-t border-slate-700/50">
                    {/* Language Toggle Desktop - Redesigned */}
                    <button onClick={toggleLang} className="group bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-full border border-slate-700 hover:border-[var(--accent)] transition-all flex items-center gap-2">
                        <span className="text-2xl group-hover:scale-110 transition-transform">{lang === "kr" ? "🇰🇷" : "🇨🇿"}</span>
                        <div className="text-left">
                            <div className="text-xs text-slate-400">Language</div>
                            <div className="text-sm font-bold">
                                {lang === "kr" ? "한국어 (Korean)" : "English / Čeština"}
                            </div>
                        </div>
                    </button>

                    {/* PDF/Print Button */}
                    <button onClick={() => window.print()} className="flex items-center justify-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors py-2">
                        <Download size={14} />
                        {content.header.actions.pdf}
                    </button>
                </div>
            </div>
        </div>
    );
}
