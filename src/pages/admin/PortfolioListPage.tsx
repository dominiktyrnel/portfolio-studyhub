import { Link } from "react-router-dom";
import { AdminLayout } from "../../layouts/AdminLayout";
import { usePortfolioProjects, type AdminProject } from "../../hooks/usePortfolioProjects";
import { getErrorMessage } from '../../utils/errorHelpers';
import { Edit, Trash2, ArrowUp, ArrowDown, Plus } from "lucide-react";
import { doc, writeBatch } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { content as contentKr } from "../../content/kr";
import { contentEn } from "../../content/en";
import type { PortfolioProject, ContentStructure } from '../../types/content';
import { logger } from "../../utils/logger";

export function PortfolioListPage() {
    const { projects, loading, error, deleteProject, moveProject, fetchProjects } = usePortfolioProjects();

    const handleSeed = async () => {
        if (!db) return alert('Firebase not initialized');

        // ✅ FIXED: Properly typed content
        const contentKrTyped = contentKr as ContentStructure;
        const contentEnTyped = contentEn as ContentStructure;

        const krProjects: PortfolioProject[] = contentKrTyped.portfolio?.projects || [];
        const enProjects: PortfolioProject[] = contentEnTyped.portfolio?.projects || [];

        const confirm = window.confirm(`Seed ${krProjects.length} projects to Firestore?`);
        if (!confirm) return;

        try {
            const batch = writeBatch(db);

            krProjects.forEach((pKr, index) => {
                const pEn = enProjects.find(p => p.id === pKr.id) || {} as Partial<PortfolioProject>;
                const parts = pKr.img.split('/');
                const folderId = parts[2] || "1";
                const mainImage = parts[3] || "cover.webp";

                const docRef = doc(db!, "projects", pKr.id);
                const data = {
                    id: pKr.id,
                    order: index + 1,
                    isHighlight: index < 6,
                    media: { folderId, mainImage },
                    kr: {
                        title: pKr.title,
                        cat: pKr.cat,
                        summary: pKr.summary,
                        tags: pKr.tags,
                        detail: pKr.detail
                    },
                    en: {
                        title: pEn.title || "",
                        cat: pEn.cat || "",
                        summary: pEn.summary || "",
                        tags: pEn.tags || [],
                        detail: pEn.detail
                    },
                    meta: { createdAt: new Date().toISOString() }
                };
                batch.set(docRef, data);
            });

            await batch.set(doc(db!, "settings", "config"), {
                dataVersion: Date.now(),
                updatedBy: "admin_seed_portfolio"
            });

            await batch.commit();
            alert("Seeding dokončen!");
            fetchProjects();

        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Seed failed'));
            alert('Seed failed: ' + getErrorMessage(error));
        }
    };

    const ProjectCard = ({ p, isFirst, isLast }: { p: AdminProject; isFirst: boolean; isLast: boolean }) => {
        // Construct image source: either storageImages[0]?.url OR local public path
        const coverUrl = p.media?.storageImages?.[0]?.url || `/img/${p.media?.folderId}/${p.media?.mainImage}`;

        return (
            <div className="bg-admin-card rounded-lg border border-admin-border shadow-xs hover:shadow-md transition-shadow flex overflow-hidden group">
                {/* Cover Image */}
                <div className="w-32 h-32 bg-admin-wash shrink-0 relative">
                    <img src={coverUrl} alt="cover" className="w-full h-full object-cover" />
                    {p.isHighlight && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-xs">
                            Highlight
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="font-bold text-admin-text text-lg mb-1">{String(p.kr?.title || '')}</div>
                        <div className="text-sm text-admin-sub line-clamp-2">{String(p.kr?.summary || '')}</div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-admin-wash text-admin-sub px-2 py-1 rounded">{String(p.kr?.cat || '')}</span>
                        <span className="text-xs text-admin-sub">Order: {p.order}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-2 bg-admin-wash border-l border-admin-border flex flex-col justify-center gap-2">
                    <button onClick={() => moveProject(p.id, 'up')} disabled={isFirst} className="p-2 text-admin-sub hover:text-indigo-400 hover:bg-admin-card rounded disabled:opacity-30">
                        <ArrowUp size={18} />
                    </button>
                    <button onClick={() => moveProject(p.id, 'down')} disabled={isLast} className="p-2 text-admin-sub hover:text-indigo-400 hover:bg-admin-card rounded disabled:opacity-30">
                        <ArrowDown size={18} />
                    </button>
                    <Link to={`/admin/portfolio/${p.id}`} className="p-2 text-admin-sub hover:text-indigo-400 hover:bg-admin-card rounded">
                        <Edit size={18} />
                    </Link>
                    <button onClick={() => deleteProject(p.id)} className="p-2 text-admin-sub hover:text-red-400 hover:bg-red-500/10 rounded">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout title="Portfolio" actions={
            <div className="flex gap-2">
                <button onClick={handleSeed} className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-200 rounded">
                    Reset (Seed)
                </button>
                <Link to="/admin/portfolio/new" className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-indigo-700 shadow-xs font-bold">
                    <Plus size={18} /> Přidat projekt
                </Link>
            </div>
        }>
            {loading ? <div className="p-8 text-admin-sub">Načítám...</div> : error ? <div className="p-8 text-red-400">{error}</div> : (
                <div className="grid grid-cols-1 gap-4 pb-12">
                    {projects.length === 0 && <div className="p-8 text-center text-admin-sub">Žádné projekty.</div>}
                    {projects.map((p, i) => (
                        <ProjectCard key={p.id} p={p} isFirst={i === 0} isLast={i === projects.length - 1} />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
