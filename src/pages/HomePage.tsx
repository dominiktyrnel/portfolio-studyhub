import { MessageCircle, Mail, Phone, Smartphone, ChevronLeft, ChevronRight, X, Wrench } from "lucide-react";
import { ScrollProgress } from '../components/ScrollProgress';
import { PortfolioGrid } from "../components/sections/PortfolioGrid";
import { imageManifest } from "../data/imageManifest";
import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { HiddenLink } from "../components/HiddenLink";
import { useGlobalContent } from "../hooks/useGlobalContent";

import { ContentRepository } from "../lib/contentRepository";

interface HomePageProps {
    onNavigate: (page: 'home' | 'portfolio' | 'study' | 'profile') => void;
    onViewDetail: (id: string) => void;
}

export function HomePage({ onNavigate, onViewDetail }: HomePageProps) {
    // All hooks MUST be called before any early returns
    const languageContext = useLanguage();
    const { data: global } = useGlobalContent();
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Projects have dynamic structure from Firestore
    const [projects, setProjects] = useState<any[]>([]);

    // Get values with safe optional chaining before early return
    const lang = languageContext?.lang;
    const driveImages = imageManifest.driveImages || [];

    // useEffect and useCallback must be before early return
    useEffect(() => {
        if (!lang) return;
        ContentRepository.getProjects(lang).then(p => {
            // Filter only highlights for homepage if we have that flag, otherwise fallback to index order
            // actually 'isHighlight' is in the project object now.
            const highlights = p.filter((x: { isHighlight: boolean }) => x.isHighlight);
            // If no highlights marked, fallback to p (all)
            setProjects(highlights.length > 0 ? highlights : p);
        });
    }, [lang]);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev! + 1) % driveImages.length);
        }
    }, [lightboxIndex, driveImages.length]);

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev! - 1 + driveImages.length) % driveImages.length);
        }
    }, [lightboxIndex, driveImages.length]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, nextImage, prevImage]);

    // Early return AFTER all hooks
    if (!languageContext) return null;
    const { content, common } = languageContext;
    const { hero, skills, strengths, experience, contact: staticContact, portfolio } = content;

    const contact = {
        ...staticContact,
        email: global?.contact?.email || staticContact.email,
        phone: global?.contact?.phoneCz || staticContact.phone,
        phoneKr: (global?.contact?.phoneKr && global.contact.phoneKr !== 'none') ? global.contact.phoneKr : staticContact.phoneKr,
        kakaoId: global?.contact?.kakaoId || staticContact.kakaoId,
        kakaoLink: global?.contact?.kakaoLink || "https://open.kakao.com/o/sX8hY7bg"
    };


    return (
        <>
            <ScrollProgress />
            <main className="w-full bg-kr-bg font-sans">
                {/* LIGHTBOX MODAL */}
                {lightboxIndex !== null && (
                    <div
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
                        onClick={closeLightbox}
                    >
                        <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2 transition-colors z-[110]" onClick={closeLightbox}>
                            <X size={40} />
                        </button>

                        <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 transition-colors z-[110]" onClick={prevImage}>
                            <ChevronLeft size={48} />
                        </button>

                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 transition-colors z-[110]" onClick={nextImage}>
                            <ChevronRight size={48} />
                        </button>

                        <div className="relative max-w-7xl max-h-[90vh] p-2 @starting-style:scale-95 @starting-style:opacity-0 scale-100 opacity-100 transition-all duration-300" onClick={e => e.stopPropagation()}>
                            <img
                                src={driveImages[lightboxIndex]}
                                alt={`Equipment ${lightboxIndex + 1}`}
                                className="max-h-[85vh] max-w-full object-contain shadow-2xl rounded-sm"
                            />
                            <div className="absolute bottom-[-40px] left-0 w-full text-center text-white/60 text-sm font-medium">
                                {lightboxIndex + 1} / {driveImages.length}
                            </div>
                        </div>
                    </div>
                )}


                {/* HERO */}
                <section id="home" className="py-6 bg-white border-b border-kr-border @starting-style:translate-y-4 @starting-style:opacity-0 translate-y-0 opacity-100 transition-all duration-500 relative overflow-hidden">
                    {/* Parallax background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-30 pointer-events-none" style={{ transform: 'translateY(calc(var(--scroll-y, 0) * 0.3px))' }} />

                    <div className="max-w-4xl mx-auto px-6 relative z-10">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="flex-1">
                                {/* Badges / Flags */}
                                <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 bg-kr-wash border border-kr-border rounded-full mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <img src="https://flagcdn.com/w40/cz.png" alt="CZ" className="w-5 rounded-[2px] shadow-xs" />
                                        <span className="text-sm font-bold text-kr-text-main">{hero.badge.cz}</span>
                                    </div>
                                    <span className="text-kr-text-meta">|</span>
                                    <div className="flex items-center gap-1.5">
                                        <img src="https://flagcdn.com/w40/kr.png" alt="KR" className="w-5 rounded-[2px] shadow-xs" />
                                        <span className="text-sm font-bold text-kr-text-main">{hero.badge.kr}</span>
                                    </div>
                                    <span className="hidden sm:inline text-kr-text-meta">|</span>
                                    <span className="text-sm text-kr-text-sub font-medium">{hero.badge.txt}</span>
                                </div>

                                {/* Reduced Title Size */}
                                <h1 className="text-xl md:text-2xl font-bold text-kr-text-heading leading-tight mb-3 tracking-tight">
                                    {hero.title}
                                </h1>
                                <div className="space-y-1 mb-6">
                                    {hero.subtitle.map((line: string, i: number) => (
                                        <p key={i} className="text-base text-kr-text-sub font-medium">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {hero.chips.map((chip: string, i: number) => (
                                        <span key={i} className="px-2.5 py-1 bg-kr-surface text-kr-text-main text-sm font-bold rounded-lg border border-kr-border">
                                            {chip}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href="https://open.kakao.com/o/sX8hY7bg"
                                        target="_blank"
                                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 btn-elastic"
                                    >
                                        {hero.cta.primary}
                                    </a>
                                    <button
                                        onClick={() => onNavigate('portfolio')}
                                        className="px-6 py-2.5 bg-white text-kr-text-main border border-kr-border rounded-lg font-bold text-center hover:bg-kr-surface transition-colors text-sm md:text-base"
                                    >
                                        {hero.cta.secondary}
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() => onNavigate('profile')}
                                        className="text-sm text-kr-text-sub font-medium hover:text-kr-primary hover:underline decoration-kr-border underline-offset-4 transition-colors flex items-center gap-1"
                                    >
                                        {common.NAV.PROFILE_LINK} <span className="text-xs">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* SKILLS */}
                <section id="skills" className="py-8 max-w-5xl mx-auto px-6 @starting-style:translate-y-4 @starting-style:opacity-0 translate-y-0 opacity-100 transition-all duration-500">
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-kr-text-heading mb-1">{skills.title}</h2>
                        <p className="text-sm text-kr-text-sub">{skills.desc}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {skills.columns.map((col: { title: string; items: { name: string; level: string }[] }, i: number) => (
                            <div key={i} className="bg-white p-5 rounded-xl border border-kr-border shadow-xs">
                                <h3 className="text-base font-bold text-kr-text-heading mb-3 border-b border-kr-border pb-2">
                                    {col.title}
                                </h3>
                                <ul className="space-y-1.5">
                                    {col.items.map((item: { name: string; level: string }, j: number) => (
                                        <li key={j} className="flex flex-col">
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <span className="text-sm font-medium text-kr-text-main">{item.name}</span>
                                                <span className="text-[10px] text-kr-text-sub bg-kr-surface px-1.5 py-0.5 rounded border border-kr-border">
                                                    {item.level}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section >

                {/* EQUIPMENT SECTION */}
                < section className="py-8 max-w-5xl mx-auto px-6 border-b border-kr-border @starting-style:translate-y-4 @starting-style:opacity-0 translate-y-0 opacity-100 transition-all duration-500" >
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Wrench className="text-kr-primary" size={24} />
                                <h2 className="text-lg font-bold text-kr-text-heading">{content.equipment.title}</h2>
                            </div>
                            <p className="text-sm text-kr-text-sub mb-4 whitespace-pre-line leading-relaxed">{content.equipment.desc}</p>

                            <ul className="space-y-1.5 mb-6">
                                {content.equipment.bullets.map((txt: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-kr-text-main font-medium">
                                        <span className="w-1.5 h-1.5 bg-kr-primary rounded-full mt-1.5 shrink-0"></span>
                                        <span>{txt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="w-full md:w-1/2">
                            {driveImages.length > 0 ? (
                                <div className="grid grid-cols-3 gap-2">
                                    {driveImages.slice(0, 6).map((img, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => openLightbox(idx)}
                                            className="aspect-square bg-slate-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 border border-kr-border relative group"
                                        >
                                            <img src={img} alt="Equipment" className="w-full h-full object-cover" />
                                            {idx === 5 && driveImages.length > 6 && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-sm">
                                                    +{driveImages.length - 6}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-32 bg-slate-50 rounded border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">
                                    {common.UI.IMAGE_PREPARING}
                                </div>
                            )}
                        </div>
                    </div>
                </section >

                {/* STRENGTHS */}
                < section className="bg-white py-8 border-y border-kr-border @starting-style:translate-y-4 @starting-style:opacity-0 translate-y-0 opacity-100 transition-all duration-500" >
                    <div className="max-w-5xl mx-auto px-6">
                        <h2 className="text-lg font-bold text-kr-text-heading mb-4">{strengths.title}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {strengths.cards.map((card: { title: string; desc: string }, i: number) => (
                                <div key={i} className="p-4 rounded-lg bg-kr-surface border border-kr-border hover:border-kr-primary hover:bg-kr-wash transition-colors group">
                                    <h3 className="font-bold text-kr-text-heading mb-1 text-sm md:text-base group-hover:text-kr-primary transition-colors">{card.title}</h3>
                                    <p className="text-xs text-kr-text-sub leading-relaxed">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section >

                {/* PORTFOLIO HIGHLIGHTS */}
                < section id="portfolio" className="py-10 max-w-5xl mx-auto px-6 @starting-style:translate-y-4 @starting-style:opacity-0 translate-y-0 opacity-100 transition-all duration-500" >
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-lg font-bold text-kr-text-heading">{portfolio.sectionTitle}</h2>
                    </div>
                    <PortfolioGrid limit={6} onViewDetail={onViewDetail} projects={projects.length > 0 ? projects : undefined} />
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => onNavigate('portfolio')}
                            className="px-6 py-2.5 bg-white border border-kr-border text-kr-text-main font-bold rounded-lg hover:bg-kr-surface transition-colors shadow-xs text-sm"
                        >
                            {portfolio.viewAll}
                        </button>
                    </div>
                </section >

                {/* EXPERIENCE (Adapted to Light 'Clean' Theme) */}
                < section id="experience" className="bg-kr-surface py-10 border-y border-kr-border @starting-style:translate-y-4 @starting-style:opacity-0 translate-y-0 opacity-100 transition-all duration-500" >
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-lg font-bold mb-6 text-kr-text-heading">{experience.title}</h2>
                        <div className="border-l-2 border-kr-border pl-6 ml-2">
                            <div className="mb-1 text-kr-primary font-bold text-base">{experience.main.period}</div>
                            <h3 className="text-xl font-bold mb-1 text-kr-text-heading">{experience.main.company}</h3>
                            <p className="text-base text-kr-text-main mb-6 font-medium">{experience.main.role}</p>
                            <ul className="space-y-3 mb-8">
                                {experience.main.bullets.map((b: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-kr-text-sub leading-relaxed text-sm md:text-base">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></span>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-6 border-t border-kr-border">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{experience.education.title}</h4>
                                <p className="text-sm text-kr-text-sub">{experience.education.desc}</p>
                            </div>
                        </div>
                    </div>
                </section >

                {/* CONTACT FOOTER */}
                < section id="contact" className="py-12 bg-white text-center px-6 border-t border-kr-border @starting-style:translate-y-4 @starting-style:opacity-0 translate-y-0 opacity-100 transition-all duration-500" >
                    <h2 className="text-xl md:text-2xl font-bold text-kr-text-heading mb-3">{contact.heading}</h2>
                    <div className="space-y-1.5 mb-8">
                        {contact.sub.map((line: string, i: number) => (
                            <p key={i} className="text-sm text-kr-text-sub font-medium">
                                {line}
                            </p>
                        ))}
                        <p className="text-xs text-kr-text-meta mt-1">{common.UI.CONTACT_NOTE}</p>
                    </div>

                    <div className="max-w-md mx-auto">
                        {/* Contact Box - LEFT Aligned Items */}
                        <div className="w-full text-kr-text-sub font-medium bg-kr-surface p-6 rounded-xl border border-kr-border inline-block text-left">
                            <div className="flex flex-col gap-3 items-start">
                                <div className="flex items-center gap-3">
                                    <Mail size={16} className="text-gray-400" />
                                    <a href={`mailto:${contact.email}`} className="text-kr-text-main hover:text-kr-primary transition-colors underline-offset-4 hover:underline text-sm">{contact.email}</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MessageCircle size={16} className="text-gray-400" />
                                    <a href={contact.kakaoLink} target="_blank" className="text-kr-text-main hover:text-amber-500 transition-colors text-sm">Kakao ID: {contact.kakaoId}</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={16} className="text-gray-400" />
                                    <span className="text-kr-text-main text-sm">{contact.phone}</span>
                                </div>
                                {contact.phoneKr && (
                                    <div className="flex items-center gap-3 text-xs text-kr-text-meta">
                                        <Smartphone size={14} className="text-gray-400" />
                                        <span>{contact.phoneKr}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Copyright at the very bottom - Smaller Text */}
                        <div className="mt-10 text-[10px] text-kr-text-meta opacity-60">
                            {common.UI.COPYRIGHT_PRE}
                            <HiddenLink onTrigger={() => window.location.href = "/admin/login"}>
                                Dominik Tyrnel
                            </HiddenLink>
                            {common.UI.COPYRIGHT_POST}
                        </div>
                    </div>
                </section >
            </main>
        </>
    );
}
