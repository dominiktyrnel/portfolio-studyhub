import { useLanguage } from "../../i18n/useLanguage";
import type { PortfolioProject } from "../../types/content";

interface PortfolioGridProps {
    limit?: number;
    onViewDetail: (id: string) => void;
    categoryFilter?: string;
    // Projects from Firestore or static content - properly typed
    projects?: PortfolioProject[];
}

export function PortfolioGrid({ limit, onViewDetail, categoryFilter, projects: externalProjects }: PortfolioGridProps) {
    const languageContext = useLanguage();
    if (!languageContext) {
        return null;
    }
    const { content } = languageContext;
    let projects = externalProjects || content.portfolio.projects;

    if (categoryFilter && categoryFilter !== "전체" && categoryFilter !== "All") {
        projects = projects.filter((p: PortfolioProject) => {
            const catMatch = p.cat === categoryFilter;
            const categoryMatch = p.detail.category === categoryFilter;
            const medicalMatch = categoryFilter === "의료/위생 공간" && p.cat.includes("의료");
            const commercialMatch = categoryFilter === "상업 공간" && p.cat.includes("상업");
            return catMatch || categoryMatch || medicalMatch || commercialMatch;
        });
    }

    const displayProjects = limit ? projects.slice(0, limit) : projects;

    return (
        <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-6 @starting-style:opacity-0 opacity-100 transition-opacity duration-500">
            {displayProjects.map((p: PortfolioProject) => (
                <div
                    key={p.id}
                    onClick={() => onViewDetail(p.id)}
                    className="group bg-white rounded-xl overflow-hidden border border-slate-200 cursor-pointer hover:border-sky-300 hover:shadow-lg transition-all @starting-style:scale-95 @starting-style:opacity-0 scale-100 opacity-100 duration-300 card-3d-hover shadow-3d-hover stagger-item"
                >
                    {/* Image Cover */}
                    <div className="aspect-[16/10] relative bg-slate-100 overflow-hidden">
                        <img
                            src={p.img}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
                            {p.cat}
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {p.title}
                        </h3>
                        <p className="text-sm text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                            {p.summary}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {p.tags.slice(0, 3).map((tag: string, i: number) => (
                                <span key={i} className="text-[10px] font-medium text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
