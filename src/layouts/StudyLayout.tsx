import { Outlet, NavLink } from 'react-router-dom';
import { MapPin, Globe, Moon, Sun, Menu, X, Youtube, Instagram, MessageCircle, Expand, LogOut, ArrowUp, Download } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useStudyTheme } from '../study/theme/useStudyTheme';
import { useStudyLanguage } from '../study/i18n/useStudyLanguage';
import { useStudyTranslations } from '../study/i18n/useStudyTranslations';
import { OfflineBanner } from '../components/study/OfflineBanner';
import { useAuth } from '../lib/auth';
import { User } from 'lucide-react';
import { useStudyGlobalSettings } from '../hooks/useStudyGlobalSettings';
import { usePWAInstall } from '../hooks/usePWAInstall';

export default function StudyLayout() {
    const { studyTheme, toggleStudyTheme } = useStudyTheme();
    const { studyLang, toggleStudyLang } = useStudyLanguage();
    const t = useStudyTranslations();
    const { user, signOut } = useAuth();
    const { settings: globalSettings } = useStudyGlobalSettings();
    const { installApp } = usePWAInstall();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Navigation Items
    const navItems = [
        { path: '/study/now', label: '현황', labelEn: 'Dashboard' },
        { path: '/study/records', label: '기록', labelEn: 'Records' },
        { path: '/study/plan', label: '계획', labelEn: 'Plan' },
        { path: '/study/about', label: '소개', labelEn: 'About' },
        { path: '/study/faq', label: '문의', labelEn: 'FAQ' },
        { path: '/study/room', label: '입장', labelEn: 'Enter Room' },
    ];

    // Handle Scroll for Dual State Header + Scroll to Top button
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                            src="/img/profile/youtube_profil.webp"
                            alt="Profile"
                            className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm border-4 border-white"
                        />
                    </div>
                </div>
            )}

            <div
                className="study-scope min-h-screen transition-colors duration-300 relative"
                data-app="study"
                data-theme={studyTheme}
            >
                {/* Offline Indicator Banner */}
                <OfflineBanner />

                {/* HEADER CONTAINER - Dual State Design */}
                <header className="relative z-50 print:hidden text-study-text">

                    {/* STATE 1: TOP EXPANDED HEADER (Visible when not scrolled) */}
                    <div className={`w-full bg-study-surface/50 transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>
                        {/* Header Content */}
                        <div className="max-w-6xl mx-auto px-6 py-10">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                                {/* LEFT: Photo Frame + Channel Info (inspired by CV Header.tsx) */}
                                <div className="flex flex-row gap-6 items-stretch">
                                    {/* Photo Frame - Rectangle with lightbox */}
                                    <div
                                        className="relative w-32 sm:w-40 bg-study-surface cursor-pointer overflow-hidden shadow-xs group border border-study-inverted shrink-0 rounded-md"
                                        onClick={() => setIsLightboxOpen(true)}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center bg-study-bg text-study-muted font-bold text-2xl">DT</div>
                                        <img
                                            src="/img/profile/youtube_profil.webp"
                                            alt="Profile"
                                            className="absolute inset-0 w-full h-full object-cover opacity-0"
                                            onLoad={(e) => e.currentTarget.style.opacity = '1'}
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                            <Expand className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all" size={24} />
                                        </div>
                                    </div>

                                    {/* Info Block: Channel Name + Motivational Sentence + Social Links */}
                                    <div className="flex flex-col justify-between py-1">
                                        {/* Channel Name */}
                                        <div className="mb-2">
                                            <h1 className="text-3xl font-bold text-study-text leading-tight">도미니크</h1>
                                            <div className="text-sm text-study-muted font-medium">Quiet Study Room</div>
                                        </div>

                                        {/* Motivational Sentence */}
                                        <p className="text-sm text-study-muted mb-2 leading-relaxed">
                                            {studyLang === 'kr' ?
                                                (globalSettings?.motivationQuote || '조용히, 꾸준히. 함께 집중하고 성장하는 공간입니다.') :
                                                'Quietly, consistently. A space to focus and grow together.'
                                            }
                                        </p>

                                        {/* Social Links - Vertical Stack */}
                                        <div className="flex flex-col gap-1 text-sm font-medium text-study-muted">
                                            <a
                                                href={globalSettings?.youtubeLink || 'https://youtube.com/@dominiktyrkr'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 hover:text-red-500 transition-colors"
                                            >
                                                <Youtube size={16} className="shrink-0" />
                                                {globalSettings?.youtubeName || '@dominiktyrkr'}
                                            </a>
                                            <a
                                                href={globalSettings?.instagramLink || 'https://instagram.com/dominiktyrnel'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 hover:text-pink-500 transition-colors"
                                            >
                                                <Instagram size={16} className="shrink-0" />
                                                {globalSettings?.instagramName || '@dominiktyrnel'}
                                            </a>
                                            <a
                                                href={globalSettings?.kakaoLink || 'https://open.kakao.com/o/sX8hY7bg'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 hover:text-amber-500 transition-colors"
                                            >
                                                <MessageCircle size={16} className="shrink-0" />
                                                {globalSettings?.kakaoId || 'Open KakaoChat'}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section: Actions & Navigation */}
                                <div className="flex flex-col items-end gap-6">
                                    {/* Top Row: Actions */}
                                    <div className="flex items-center gap-4">
                                        {/* Back to CV */}
                                        <a href="/" className="flex text-sm font-medium text-study-muted hover:text-study-text items-center gap-2 transition-colors" title="Back to Main CV">
                                            <MapPin size={16} />
                                        </a>

                                        <div className="w-px h-5 bg-study-border"></div>

                                        {/* Theme Toggle */}
                                        <button
                                            onClick={toggleStudyTheme}
                                            className="p-2 rounded-md text-study-muted hover:text-study-text hover:bg-study-surface transition-colors"
                                            title={studyTheme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
                                        >
                                            {studyTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                        </button>

                                        {/* Language Toggle */}
                                        <button
                                            onClick={toggleStudyLang}
                                            className="flex items-center gap-2 px-3 py-2 bg-study-surface hover:bg-study-bg border border-study-border rounded-md text-sm font-bold transition-all text-study-muted hover:text-study-text"
                                        >
                                            <Globe size={15} />
                                            {studyLang === 'kr' ? 'KR' : 'EN'}
                                        </button>

                                        {/* Mobile Menu Toggle */}
                                        <button
                                            className="md:hidden p-2 rounded-md text-study-muted hover:text-study-text hover:bg-study-surface transition-colors"
                                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                                            aria-label="Toggle mobile menu"
                                        >
                                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MENU BAR - Full width, attached to bottom border */}
                        <nav className="hidden md:flex items-center justify-center gap-0 border-t border-study-border bg-study-surface" aria-label="Study navigation">
                            <div className="max-w-6xl mx-auto w-full flex items-center justify-center">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }: { isActive: boolean }) => `px-6 py-3 text-sm font-medium transition-all border-b-2 focus:outline-none ${isActive ? 'text-study-text border-study-accent font-bold' : 'text-study-muted hover:text-study-text border-transparent hover:border-study-border'}`}
                                    >
                                        {studyLang === 'kr' ? item.label : item.labelEn}
                                    </NavLink>
                                ))}
                            </div>
                        </nav>

                        {/* MOBILE MENU DROPDOWN */}
                        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            <nav className="flex flex-col bg-study-surface border-t border-study-border" aria-label="Mobile study navigation">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) => `block w-full px-6 py-3 text-base font-medium border-b border-study-border/50 transition-colors ${isActive ? 'bg-study-bg text-study-text font-bold' : 'text-study-muted hover:text-study-text hover:bg-study-bg/50'}`}
                                    >
                                        {studyLang === 'kr' ? item.label : item.labelEn}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* STATE 2: COMPACT HEADER (Visible when scrolled) */}
                    <div className={`sticky top-0 w-full bg-study-bg/95 backdrop-blur-sm border-b border-study-border shadow-xs transition-all duration-300 ${isScrolled ? 'block' : 'hidden'}`}>
                        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                            {/* LEFT: Identity */}
                            <div className="flex items-center gap-3">
                                <NavLink to="/study/now" className="flex items-center gap-2 group">
                                    <div className="w-8 h-8 rounded-lg bg-study-text flex items-center justify-center text-study-bg font-serif italic text-lg shadow-xs group-hover:bg-study-accent transition-colors">
                                        Q
                                    </div>
                                    <div className="flex flex-col -space-y-0.5">
                                        <span className="font-bold text-sm tracking-tight text-study-text">조용한 스터디룸</span>
                                        <span className="text-[10px] text-study-muted uppercase tracking-wider font-medium">Quiet Study Room</span>
                                    </div>
                                </NavLink>
                            </div>

                            {/* CENTER: Desktop Navigation */}
                            <nav className="hidden md:flex items-center gap-0" aria-label="Study navigation">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }: { isActive: boolean }) => `px-4 py-2 text-sm font-medium transition-all border-b-2 focus:outline-none ${isActive ? 'text-study-text border-study-accent font-bold' : 'text-study-muted hover:text-study-text border-transparent hover:border-study-border'}`}
                                    >
                                        {studyLang === 'kr' ? item.label : item.labelEn}
                                    </NavLink>
                                ))}
                            </nav>

                            {/* RIGHT: Actions */}
                            <div className="flex items-center gap-3">
                                {/* Back to CV */}
                                <a href="/" className="hidden sm:flex text-xs font-medium text-study-muted hover:text-study-text items-center gap-1.5 transition-colors" title="Back to Main CV">
                                    <MapPin size={14} />
                                    <span className="hidden lg:inline">Dominik Tyrnel</span>
                                </a>

                                <div className="w-px h-4 bg-study-border hidden sm:block"></div>

                                {/* Theme Toggle */}
                                <button
                                    onClick={toggleStudyTheme}
                                    className="p-1.5 rounded-md text-study-muted hover:text-study-text hover:bg-study-surface transition-colors"
                                    title={studyTheme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
                                >
                                    {studyTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                                </button>

                                {/* Language Toggle */}
                                <button
                                    onClick={toggleStudyLang}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-study-surface hover:bg-study-bg border border-study-border rounded-md text-xs font-bold transition-all text-study-muted hover:text-study-text"
                                >
                                    <Globe size={13} />
                                    {studyLang === 'kr' ? 'KR' : 'EN'}
                                </button>

                                {/* Mobile Menu Toggle */}
                                <button
                                    className="md:hidden p-1.5 rounded-md text-study-muted hover:text-study-text hover:bg-study-surface transition-colors"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    aria-label="Toggle mobile menu"
                                >
                                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* MOBILE NAV (Dropdown) */}
                        <div className={`md:hidden absolute top-full left-0 w-full bg-study-surface border-t border-study-border shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            <nav className="flex flex-col px-4 py-2 gap-1" aria-label="Mobile study navigation">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) => `block w-full px-4 py-2 rounded-md text-base font-medium transition-colors ${isActive ? 'bg-study-bg text-study-text font-bold' : 'text-study-muted hover:text-study-text hover:bg-study-bg/50'}`}
                                    >
                                        {studyLang === 'kr' ? item.label : item.labelEn}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT OUTLET */}
                <main className="animate-fade-in min-h-[calc(100vh-4rem-100px)]">
                    <Outlet context={{ lang: studyLang }} />
                </main>

                {/* SIMPLE FOOTER */}
                <footer className="border-t border-study-border mt-20 py-8 text-center text-xs text-study-muted bg-study-surface">
                    <p className="mb-3 font-medium opacity-80">같이 공부해요. 같이 성장해요. 계속 나아가요.</p>

                    {/* Auth Buttons or User Profile */}
                    <div className="flex justify-center gap-3 mb-4">
                        {user ? (
                            // Logged in - show profile info + logout
                            <>
                                <NavLink
                                    to="/study/profile"
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-study-text border border-study-border rounded-lg hover:bg-study-bg transition-colors"
                                >
                                    <User size={16} />
                                    <span className="truncate max-w-[150px]">{user.email?.split('@')[0]}</span>
                                </NavLink>
                                <button
                                    onClick={() => signOut()}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-study-muted border border-study-border rounded-lg hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-colors"
                                >
                                    <LogOut size={16} />
                                    {t.footer.logout}
                                </button>
                            </>
                        ) : (
                            // Not logged in - show login/register
                            <>
                                <NavLink
                                    to="/study/auth"
                                    state={{ mode: 'login' }}
                                    className="px-4 py-2 text-sm font-medium text-study-text border border-study-border rounded-lg hover:bg-study-bg transition-colors"
                                >
                                    {t.footer.login}
                                </NavLink>
                                <NavLink
                                    to="/study/auth"
                                    state={{ mode: 'signup' }}
                                    className="px-4 py-2 text-sm font-medium bg-study-accent text-study-bg rounded-lg hover:bg-study-sub transition-colors"
                                >
                                    {t.footer.register}
                                </NavLink>
                            </>
                        )}
                    </div>

                    {/* Legal Links */}
                    <div className="flex justify-center gap-4 mb-4 flex-wrap">
                        <NavLink to="/study/privacy" className="hover:text-study-text transition-colors">
                            {t.footer.privacy}
                        </NavLink>
                        <span className="text-study-border">|</span>
                        <NavLink to="/study/terms" className="hover:text-study-text transition-colors">
                            {t.footer.terms}
                        </NavLink>
                        <span className="text-study-border">|</span>
                        <NavLink to="/study/contact" className="hover:text-study-text transition-colors">
                            {t.footer.contact}
                        </NavLink>
                        <span className="text-study-border">|</span>
                        <button
                            onClick={installApp}
                            className="hover:text-study-text transition-colors flex items-center gap-1"
                        >
                            <Download size={12} />
                            {studyLang === 'kr' ? '앱 설치' : 'Install App'}
                        </button>
                    </div>

                    <p>&copy; {new Date().getFullYear()} Dominik Tyrnel. All rights reserved. (모든 권리 보유)</p>
                </footer>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[var(--study-accent)] text-[var(--study-bg)] rounded-full shadow-lg flex items-center justify-center hover:bg-[var(--study-accent-sub)] transition-all hover:scale-110 animate-fade-in"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={24} />
                </button>
            )}
        </>
    );
}
