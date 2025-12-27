import { useLanguage } from "../i18n/useLanguage";
import { PortfolioGrid } from "../components/sections/PortfolioGrid";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { ContentRepository } from "../lib/contentRepository";

interface PortfolioIndexProps {
    onNavigate: (page: 'home' | 'portfolio') => void;
    onViewDetail: (id: string) => void;
}

export function PortfolioIndex({ onNavigate, onViewDetail }: PortfolioIndexProps) {
    // All hooks MUST be called before any early returns
    const languageContext = useLanguage();
    const [filter, setFilter] = useState("전체");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Projects have dynamic structure from Firestore
    const [projects, setProjects] = useState<any[]>([]);

    // Get values with safe optional chaining
    const lang = languageContext?.lang || 'kr';

    // useEffect before early return
    useEffect(() => {
        ContentRepository.getProjects(lang).then(p => setProjects(p));
    }, [lang]);

    // Early return AFTER all hooks
    if (!languageContext) return null;
    const { content } = languageContext;
    const { portfolio } = content;

    // Derived state
    // const categories = [
    //     "전체", "전체 리모델링", "욕실/타일", "석고보드", "도장/마감", "단열/외장", "상업 공간", "의료/위생 공간"
    // ]; // Hardcoded for now or fetch from Global/KR? Actually content object has categories. 
    // Let's assume content.portfolio.categories still exists in static. 
    // Ideally we fetch projects dynamically, but categories might be static/global.
    // For now, let's keep categories from content if possible.

    // actually filtered in Grid
    // const filteredProjects = ...

    // Ensure "전체" is always the first category
    const allCategories = ["전체", ...portfolio.categories.filter(cat => cat !== "전체")];

    return (
        <div className="min-h-screen bg-slate-50 pb-20 pt-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <button
                    onClick={() => onNavigate('home')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    홈으로 돌아가기
                </button>

                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{portfolio.pageTitle}</h1>
                    <p className="text-slate-600 font-medium">{portfolio.pageSubtitle}</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {allCategories.map((cat: string) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === cat
                                ? "bg-slate-900 text-white shadow-md"
                                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <PortfolioGrid onViewDetail={onViewDetail} categoryFilter={filter} projects={projects} />
            </div>
        </div>
    );
}
