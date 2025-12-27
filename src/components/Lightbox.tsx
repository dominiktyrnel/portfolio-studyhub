import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { workCases } from "../data/portfolio";
import { machineExperience } from "../data/machines";
import { profile } from "../data/cv";

interface LightboxProps {
    initialIndex: number;
    caseId: string;
    onClose: () => void;
}

export default function Lightbox({ initialIndex, caseId, onClose }: LightboxProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(initialIndex);

    // Data Source Logic
    let images: string[] = [];
    let title = "";

    if (caseId === 'machines') {
        images = machineExperience.images;
        title = machineExperience.title;
    } else if (caseId === 'profile') {
        images = [profile.photo];
        title = profile.name;
    } else {
        const currentCase = workCases.find(c => c.id === caseId);
        if (currentCase) {
            images = currentCase.images;
            title = currentCase.title;
        }
    }

    const prev = useCallback(() => setIndex(i => (i === 0 ? images.length - 1 : i - 1)), [images.length]);
    const next = useCallback(() => setIndex(i => (i === images.length - 1 ? 0 : i + 1)), [images.length]);

    useEffect(() => {
        document.body.classList.add("modal-open");

        // Focus container on mount
        modalRef.current?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.classList.remove("modal-open");
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, prev, next]); // Include all dependencies

    if (images.length === 0) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Image Gallery"
            onClick={onClose}
        >
            <div
                ref={modalRef}
                className="outline-none w-full h-full flex items-center justify-center p-4"
                tabIndex={-1}
            >
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
                    aria-label="Close"
                >
                    <X size={32} />
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                    className="absolute left-4 text-white/70 hover:text-white hidden md:block p-2"
                    aria-label="Previous Image"
                >
                    <ChevronLeft size={48} />
                </button>

                <div
                    className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={images[index]}
                        alt={`${title} - ${index + 1} `}
                        className="max-h-[80vh] max-w-full object-contain shadow-xl"
                    />
                    <div className="text-center text-white/70 mt-4 text-sm font-medium">
                        <span aria-hidden="true">{index + 1} / {images.length}</span>
                        <span className="mx-2 text-white/30">|</span>
                        <span>{title}</span>
                    </div>
                </div>

                <button
                    onClick={(e) => { e.stopPropagation(); next(); }}
                    className="absolute right-4 text-white/70 hover:text-white hidden md:block p-2"
                    aria-label="Next Image"
                >
                    <ChevronRight size={48} />
                </button>
            </div>

            {/* Mobile Nav Overlay (Touch zones) */}
            <div className="absolute inset-0 md:hidden flex justify-between pointer-events-none">
                <div onClick={(e) => { e.stopPropagation(); prev(); }} className="w-1/3 h-full pointer-events-auto" role="button" aria-label="Previous" />
                <div onClick={(e) => { e.stopPropagation(); next(); }} className="w-1/3 h-full pointer-events-auto ml-auto" role="button" aria-label="Next" />
            </div>
        </div>
    );
}
