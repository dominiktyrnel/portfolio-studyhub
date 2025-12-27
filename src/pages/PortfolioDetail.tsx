import { useLanguage } from "../i18n/useLanguage";
import { ArrowLeft, CheckCircle, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { imageManifest } from "../data/imageManifest"; // Legacy fallback

import { ContentRepository } from "../lib/contentRepository";

interface PortfolioDetailProps {
    id: string;
    onBack: () => void;
}

export function PortfolioDetail({ id, onBack }: PortfolioDetailProps) {
    // All hooks MUST be called before any early returns
    const languageContext = useLanguage();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Project has dynamic structure from Firestore
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Get values with safe optional chaining
    const lang = languageContext?.lang || 'kr';

    // Gallery images: prioritize storageImages from Firestore, fallback to legacy manifest
    const storageImages = project?.storageImages || [];
    const legacyImages = imageManifest.projectImages[id] || [];
    const images = storageImages.length > 0
        ? storageImages.map((img: { url: string }) => img.url)
        : legacyImages;

    // ALL hooks before early return
    useEffect(() => {
        setLoading(true);
        ContentRepository.getProjectById(lang, id).then(p => {
            setProject(p);
            setLoading(false);
        });
    }, [lang, id]);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev! + 1) % images.length);
        }
    }, [lightboxIndex, images.length]);

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
        }
    }, [lightboxIndex, images.length]);

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
    const labels = content.portfolio.labels;

    if (loading) return <div className="min-h-screen pt-20 text-center">Loading...</div>;
    if (!project) return <div className="min-h-screen pt-20 text-center">Project not found</div>;
    const { detail } = project;

    return (
        <div className="@starting-style:opacity-0 opacity-100 transition-opacity duration-500">
            <div className="min-h-screen bg-slate-50 pb-20 pt-8">
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
                                src={images[lightboxIndex]}
                                alt={`Photo ${lightboxIndex + 1}`}
                                className="max-h-[85vh] max-w-full object-contain shadow-2xl rounded-sm"
                            />
                            <div className="absolute bottom-[-40px] left-0 w-full text-center text-white/60 text-sm font-medium">
                                {lightboxIndex + 1} / {images.length}
                            </div>
                        </div>
                    </div>
                )}


                <div className="max-w-4xl mx-auto px-4">
                    {/* Nav */}
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        {content.portfolio.pageTitle}
                    </button>

                    {/* Header */}
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{project.title}</h1>
                    <p className="text-lg text-slate-600 mb-8">{project.summary}</p>

                    {/* Hero Image */}
                    <div className="aspect-video w-full bg-slate-200 rounded-xl overflow-hidden mb-10 shadow-xs border border-slate-200">
                        <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Summary Box (Korean Style) */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 mb-12 shadow-xs">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">{common.UI.PROJECT_OVERVIEW}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                            <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-bold text-slate-500">{labels.cat}</span>
                                <span className="text-slate-900 font-medium">{detail.cat}</span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-bold text-slate-500">{labels.space}</span>
                                <span className="text-slate-900 font-medium">{detail.space}</span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-bold text-slate-500">{labels.loc}</span>
                                <span className="text-slate-900 font-medium">{detail.loc}</span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-bold text-slate-500">{labels.period}</span>
                                <span className="text-slate-900 font-medium">{detail.period}</span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-bold text-slate-500">{labels.role}</span>
                                <span className="text-slate-900 font-medium">{detail.role}</span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-bold text-slate-500">{labels.scope}</span>
                                <span className="text-slate-900 font-medium">{detail.scope}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-bold text-slate-500">{labels.keywords}</span>
                                <span className="text-sky-600 font-medium">{detail.keywords}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-12">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{labels.content}</h3>
                        <p className="text-slate-700 leading-relaxed mb-6">
                            {detail.desc}
                        </p>
                        <ul className="space-y-3">
                            {detail.bullets.map((item: string, i: number) => (
                                <li key={i} className="flex items-start gap-3 text-slate-700">
                                    <CheckCircle size={18} className="text-sky-500 mt-0.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* GALLERY GRID */}
                    <div className="mb-12">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ImageIcon size={20} className="text-slate-400" />
                            {common.UI.GALLERY_TITLE}
                            <span className="text-sm font-normal text-slate-500 ml-2">{common.UI.GALLERY_COUNT_UNIT(images.length)}</span>
                        </h3>

                        {images.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {images.map((imgSrc: string, idx: number) => (
                                    <div
                                        key={idx}
                                        onClick={() => openLightbox(idx)}
                                        className="aspect-square bg-slate-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity relative group border border-slate-200"
                                    >
                                        <img src={imgSrc} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 bg-slate-100 rounded-xl text-center text-slate-500 border border-slate-200 border-dashed">
                                {common.UI.NO_PHOTOS}
                            </div>
                        )}
                    </div>

                    {/* Result */}
                    <div className="bg-sky-50 rounded-xl p-6 border border-sky-100 flex items-start gap-4">
                        <div className="p-2 bg-white rounded-full text-sky-600 shadow-xs shrink-0">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-sky-900 mb-1">{labels.result}</h4>
                            <p className="text-sky-800 text-sm">
                                {detail.result}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
