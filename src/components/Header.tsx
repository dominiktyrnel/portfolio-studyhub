import { MessageCircle, Printer, Menu, Phone, Mail, X, Expand, Smartphone } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { useGlobalContent } from "../hooks/useGlobalContent";

interface HeaderProps {
    onNavigate: (page: 'home' | 'portfolio' | 'study' | 'profile' | 'documents') => void;
}

export function Header({ onNavigate }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Use Language Hook - destructure with safety check
    const languageContext = useLanguage();
    const { data: global } = useGlobalContent();

    // Get values with safe optional chaining
    const lang = languageContext?.lang;

    // Handle Scroll for Dual State - must be before early return
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Early return AFTER all hooks
    if (!languageContext) {
        return null; // Or loading state
    }
    const { toggleLang, content, common } = languageContext;
    // Destructure content for easier access
    const { header, contact: staticContact } = content;

    const contact = {
        email: global?.contact?.email || staticContact.email,
        phone: global?.contact?.phoneCz || staticContact.phone,
        phoneKr: (global?.contact?.phoneKr && global.contact.phoneKr !== 'none') ? global.contact.phoneKr : staticContact.phoneKr,
        kakaoId: global?.contact?.kakaoId || staticContact.kakaoId,
        kakaoLink: global?.contact?.kakaoLink || "https://open.kakao.com/o/sX8hY7bg" // Fallback to current hardcoded one if not set
    };

    const handlePrint = () => window.print();
    const scrollToSection = (id: string) => {
        onNavigate('home');
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* LIGHTBOX FOR PROFILE PHOTO */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <button className="absolute top-6 right-6 text-white text-white/80 hover:text-white/100 p-2">
                        <X size={32} />
                    </button>
                    <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
                        <img
                            src="/img/profile/profile_full.webp"
                            alt="Profile"
                            className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm border-4 border-white"
                        />
                    </div>
                </div>
            )}

            {/* HEADER CONTAINER */}
            <header className="relative z-50 print:hidden">

                {/* STATE 1: TOP EXPANDED HEADER (Visible when not scrolled) */}
                <div className={`w-full bg-kr-wash transition-all duration-300 border-b border-kr-border ${isScrolled ? 'opacity-0 pointer-events-none absolute top-0' : 'opacity-100 relative'}`}>
                    <div className="max-w-6xl mx-auto px-6 py-10">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8">

                            {/* LEFT: Identity & Contacts - Stretched Layout */}
                            <div className="flex flex-row gap-6 items-stretch">
                                {/* Photo Frame - Stretches to match text height */}
                                <div
                                    className="relative w-32 sm:w-40 bg-gray-200 cursor-pointer overflow-hidden shadow-xs group border border-kr-border shrink-0"
                                    onClick={() => setIsLightboxOpen(true)}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 font-bold text-2xl group-hover:scale-105 transition-transform">DT</div>
                                    <img src="/img/profile/profile.webp" alt="Profile" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 onLoad={(e) => e.currentTarget.style.opacity = '1'}" onLoad={(e) => e.currentTarget.style.opacity = '1'} />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                        <Expand className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all" size={24} />
                                    </div>
                                </div>

                                {/* Info Block */}
                                <div className="flex flex-col justify-between py-1">
                                    <div className="mb-2">
                                        <h1 className="text-3xl font-bold text-kr-text-heading leading-tight">{header.nameLat}</h1>
                                        <div className="text-xl text-kr-text-sub font-bold">{header.nameKr}</div>
                                    </div>
                                    <div className="flex flex-col gap-1 text-sm font-medium text-kr-text-sub">
                                        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-kr-primary transition-colors">
                                            <Mail size={16} className="shrink-0 text-kr-text-meta" />
                                            {contact.email}
                                        </a>
                                        <a href={contact.kakaoLink} target="_blank" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                                            <MessageCircle size={16} className="shrink-0 text-kr-text-meta" />
                                            Kakao ID: {contact.kakaoId}
                                        </a>
                                        <div className="flex items-center gap-2">
                                            <Phone size={16} className="shrink-0 text-kr-text-meta" />
                                            {contact.phone} (CZ)
                                        </div>
                                        <div className="flex items-center gap-2 text-kr-text-meta">
                                            <Smartphone size={16} className="shrink-0 text-kr-text-meta" />
                                            {contact.phoneKr}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: Actions */}
                            <div className="flex flex-col items-end gap-2 w-full md:w-auto mt-1">
                                {/* Top Row: Menu + Languages */}
                                <div className="flex flex-wrap justify-end items-center gap-2">
                                    {/* Menu Trigger */}
                                    <button
                                        onClick={() => setIsMenuOpen(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-kr-primary text-white rounded hover:bg-kr-primary-hover transition-all shadow-xs group h-10"
                                    >
                                        <Menu size={18} />
                                        <span className="font-bold">{common.NAV.MENU}</span>
                                    </button>

                                    {/* Language Switch */}
                                    <button
                                        onClick={toggleLang}
                                        className="flex items-center gap-2 px-3 py-2 bg-white border border-kr-border rounded hover:border-gray-300 transition-colors shadow-xs h-10 hover:bg-gray-50 active:bg-gray-100"
                                        title="Switch Language"
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                src="https://flagcdn.com/w40/kr.png"
                                                alt="KR"
                                                className={`w-5 rounded-[2px] transition-opacity ${lang === 'kr' ? 'opacity-100' : 'opacity-40 grayscale'}`}
                                            />
                                            <span className="text-gray-300">|</span>
                                            <img
                                                src="https://flagcdn.com/w40/gb.png"
                                                alt="EN"
                                                className={`w-5 rounded-[2px] transition-opacity ${lang === 'en' ? 'opacity-100' : 'opacity-40 grayscale'}`}
                                            />
                                        </div>
                                        <span className="text-sm font-bold text-kr-text-main ml-1">
                                            {lang === 'kr' ? '한국어' : 'English'}
                                        </span>
                                    </button>
                                </div>

                                {/* Bottom Row: Print/PDF (Right Aligned) */}
                                <button
                                    onClick={handlePrint}
                                    className="px-4 py-1.5 text-xs font-bold text-kr-text-sub hover:text-kr-text-heading flex items-center gap-2 transition-colors"
                                >
                                    <Printer size={14} /> PDF 저장 / 인쇄
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STATE 2: STICKY HEADER (Visible when scrolled) */}
                <div className={`fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-kr-border transition-transform duration-300 ${isScrolled ? 'translate-y-0 shadow-xs' : '-translate-y-full'}`}>
                    <div className="max-w-6xl mx-auto px-4 h-14 flex justify-between items-center">
                        {/* Compact Identity */}
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { onNavigate('home'); window.scrollTo(0, 0); }}>
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-kr-border">
                                <img src="/img/profile/profile.webp" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <span className="font-bold text-kr-text-heading">{header.nameLat}</span>
                        </div>

                        {/* Right: Flags + Hamburger */}
                        <div className="flex items-center gap-4">
                            {/* Sticky Header Toggle */}
                            <button
                                onClick={toggleLang}
                                className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded transition-colors"
                                title="Switch Language"
                            >
                                <img
                                    src="https://flagcdn.com/w40/kr.png"
                                    alt="KR"
                                    className={`w-5 rounded-[1px] shadow-xs transition-all ${lang === 'kr' ? 'opacity-100 scale-110' : 'opacity-40 grayscale scale-90'}`}
                                />
                                <img
                                    src="https://flagcdn.com/w40/gb.png"
                                    alt="EN"
                                    className={`w-5 rounded-[1px] shadow-xs transition-all ${lang === 'en' ? 'opacity-100 scale-110' : 'opacity-40 grayscale scale-90'}`}
                                />
                            </button>

                            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-kr-text-main hover:bg-kr-surface rounded-lg transition-colors">
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* MENU OVERLAY */}
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex justify-end"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div
                            className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col animate-slide-in-right overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Menu Header with Blue BG */}
                            <div className="h-14 flex items-center justify-between px-6 bg-kr-wash border-b border-kr-border shrink-0">
                                <span className="font-bold text-lg text-kr-text-heading">{common.NAV.MENU}</span>
                                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-kr-text-sub hover:text-kr-text-heading rounded-full hover:bg-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Menu Content */}
                            <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-0">

                                {/* Mobile Language Toggle inside Menu (Optional but good for access) */}
                                <div className="px-6 mb-6">
                                    <button
                                        onClick={() => { toggleLang(); setIsMenuOpen(false); }}
                                        className="w-full flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 transition-all font-bold text-slate-700"
                                    >
                                        <span className="flex items-center gap-2">
                                            {lang === 'kr' ? '한국어' : 'English'}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <img src="https://flagcdn.com/w40/kr.png" className={`w-5 rounded-[1px] ${lang === 'kr' ? '' : 'opacity-40 grayscale'}`} />
                                            <img src="https://flagcdn.com/w40/gb.png" className={`w-5 rounded-[1px] ${lang === 'en' ? '' : 'opacity-40 grayscale'}`} />
                                        </div>
                                    </button>
                                </div>

                                {/* SECTION 1: PROFILES */}
                                <div className="px-6 mb-8">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 select-none">
                                        {header.menu.profile.title}
                                    </h3>
                                    <div className="space-y-1">
                                        {header.menu.profile.items.map((item: { id: string; label: string; to?: string; action?: () => void }) => (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    if (item.id === 'portfolio') onNavigate('portfolio');
                                                    else if (item.id === 'home') onNavigate('home');
                                                    else if (item.id === 'profile') onNavigate('profile');
                                                    else if (item.id === 'documents') onNavigate('documents');
                                                    else if (item.id === 'contact') scrollToSection('contact');
                                                    else scrollToSection(item.id);
                                                    setIsMenuOpen(false);
                                                }}
                                                className="block w-full text-left text-base font-bold text-kr-text-heading py-2.5 px-3 rounded-lg hover:bg-kr-surface hover:text-kr-primary transition-all"
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* CONTACT BLOCK - Blue Highlighted Section */}
                                <div className="bg-kr-wash py-6 px-6 border-y border-kr-border mb-8">
                                    <div className="flex flex-col gap-3 text-sm text-kr-text-sub font-medium">
                                        <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 hover:text-kr-primary transition-colors">
                                            <Mail size={16} className="text-kr-text-main" />
                                            {contact.email}
                                        </a>
                                        <a href={contact.kakaoLink} target="_blank" className="flex items-center gap-2.5 hover:text-amber-500 transition-colors">
                                            <MessageCircle size={16} className="text-kr-text-main" />
                                            Kakao ID: {contact.kakaoId}
                                        </a>
                                        <div className="flex items-center gap-2.5">
                                            <Phone size={16} className="text-kr-text-main" />
                                            {contact.phone} (CZ)
                                        </div>
                                        {contact.phoneKr && (
                                            <div className="flex items-center gap-2.5 text-xs text-kr-text-meta">
                                                <Smartphone size={16} className="text-gray-400" />
                                                {contact.phoneKr}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* SECTION 2: STUDY */}
                                <div className="px-6 pb-8">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 select-none">
                                        {header.menu.study.title}
                                    </h3>
                                    <button
                                        onClick={() => {
                                            // Force hard navigation to ensure fresh chunk loading
                                            // This prevents "Failed to fetch dynamically imported module" if Main App is stale
                                            window.location.href = '/study/now';
                                        }}
                                        className="block w-full text-left text-base font-medium text-kr-text-sub py-2.5 px-3 rounded-lg hover:bg-kr-surface hover:text-kr-text-heading transition-all"
                                    >
                                        {header.menu.study.title}
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
