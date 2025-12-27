import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "../../layouts/AdminLayout";
import { usePortfolioProjects, type AdminProject } from "../../hooks/usePortfolioProjects";
import { ArrowLeft, Trash2, Star, ChevronUp, ChevronDown } from "lucide-react";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { StickySaveBar } from "../../components/admin/StickySaveBar";
import { ImageUploader } from "../../components/admin/ImageUploader";
import { ViewModeSelector, type ViewMode } from "../../components/admin/ViewModeSelector";
import { getErrorMessage } from '../../utils/errorHelpers';
import { logger } from "../../utils/logger";

interface StorageImage {
    url: string;
    path: string;
    createdAt: number;
}

// Project categories from portfolio.categories in content/kr.ts (filters)
const CATEGORIES = [
    { kr: "전체 리모델링", en: "Full Remodel" },
    { kr: "욕실/타일", en: "Bath/Tile" },
    { kr: "석고보드", en: "Drywall" },
    { kr: "도장/마감", en: "Paint/Finish" },
    { kr: "단열/외장", en: "Insulation/Exterior" },
    { kr: "상업 공간", en: "Commercial" },
    { kr: "의료/위생 공간", en: "Medical/Hygiene" }
];

export function PortfolioEditorPage() {
    const { id } = useParams();
    const isNew = id === "new";
    const navigate = useNavigate();
    const { saveProject } = usePortfolioProjects();

    const [project, setProject] = useState<AdminProject>({
        id: "",
        order: 0,
        isHighlight: false,
        media: { folderId: "", mainImage: "" },
        kr: { tags: [], detail: { bullets: [] } } as Record<string, unknown>,
        en: { tags: [], detail: { bullets: [] } } as Record<string, unknown>
    });
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>('SPLIT');

    useEffect(() => {
        if (!isNew && id && db) {
            getDoc(doc(db, "projects", id)).then(snap => {
                if (snap.exists()) {
                    setProject({ id: snap.id, ...snap.data() } as AdminProject); // Cast to AdminProject
                }
                setLoading(false);
            });
        }
    }, [id, isNew]);

    const handleChange = useCallback((path: string[], value: unknown) => {
        setProject((prev: AdminProject) => {
            const next = { ...prev } as Record<string, unknown>;
            let current: Record<string, unknown> = next;
            for (let i = 0; i < path.length - 1; i++) {
                if (!current[path[i]]) current[path[i]] = {};
                current = current[path[i]] as Record<string, unknown>;
            }
            current[path[path.length - 1]] = value;
            return next as unknown as AdminProject;
        });
        setIsDirty(true);
    }, []);

    const handleSave = async () => {
        if (!project.id) return alert("ID projektu je povinné");
        setSaving(true);
        try {
            await saveProject(project, isNew);
            setIsDirty(false);
            if (isNew) navigate("/admin/portfolio");
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Portfolio save failed'));
            alert('Save failed: ' + getErrorMessage(error));
        } finally {
            setSaving(false);
        }
    };

    const handleAddImage = (url: string, path: string) => {
        const newImg: StorageImage = { url, path, createdAt: Date.now() };
        const current = project.media?.storageImages || [];
        handleChange(['media', 'storageImages'], [...current, newImg]);
    };

    const handleRemoveImage = (index: number) => {
        if (!confirm("Smazat obrázek z galerie? (Soubor v úložišti může zůstat, pokud ho nesmažete ručně)")) return;
        const current = [...(project.media?.storageImages || [])];
        current.splice(index, 1);
        handleChange(['media', 'storageImages'], current);
    };

    const handleMoveImage = (index: number, direction: 'up' | 'down') => {
        const current = [...(project.media?.storageImages || [])];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= current.length) return;

        // Swap images
        [current[index], current[targetIndex]] = [current[targetIndex], current[index]];
        handleChange(['media', 'storageImages'], current);
    };

    // Early return moved after all hooks (React hooks rule)

    // Helper to get nested value from project state
    const getValue = useCallback((lang: 'kr' | 'en', path: string[]): string => {
        const langData = lang === 'kr' ? project.kr : project.en;
        const val = path.reduce((acc: Record<string, unknown> | undefined, key: string) =>
            (acc as Record<string, unknown> | undefined)?.[key] as Record<string, unknown> | undefined,
            langData as Record<string, unknown>
        ) || "";
        return val as string;
    }, [project.kr, project.en]);

    // Helper to update nested value
    const handleFieldUpdate = useCallback((lang: 'kr' | 'en', path: string[], value: string, type: string) => {
        let processedValue: unknown = value;
        if (type === 'array') processedValue = value.split('\n');
        if (type === 'tags') processedValue = value.split(',').map((s: string) => s.trim());
        handleChange([lang, ...path], processedValue);
    }, [handleChange]);

    // Stabilní renderovací komponenta pro pole - zabraňuje scroll bugu
    const renderFieldPair = useCallback((label: string, path: string[], type: string = "text", rows: number = 3) => {
        const valKr = getValue('kr', path);
        const valEn = getValue('en', path);

        const displayKr = Array.isArray(valKr) ? (type === 'tags' ? valKr.join(', ') : valKr.join('\n')) : valKr;
        const displayEn = Array.isArray(valEn) ? (type === 'tags' ? valEn.join(', ') : valEn.join('\n')) : valEn;

        const showKr = viewMode === 'KR' || viewMode === 'SPLIT';
        const showEn = viewMode === 'EN' || viewMode === 'SPLIT';
        const gridClass = viewMode === 'SPLIT' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'block';

        return (
            <div key={path.join('.')} className={`${gridClass} mb-4 pt-4 border-t border-admin-border first:border-0 first:pt-0`}>
                {showKr && (
                    <div>
                        <label className="block text-xs font-bold text-admin-sub mb-1 uppercase">🇰🇷 {label} (KR)</label>
                        {type === "textarea" || type === "array" ?
                            <textarea className="w-full p-2 border border-admin-border bg-admin-wash rounded text-sm font-mono text-admin-text" rows={rows} value={displayKr} onChange={e => handleFieldUpdate('kr', path, e.target.value, type)} /> :
                            <input className="w-full p-2 border border-admin-border bg-admin-wash rounded text-sm text-admin-text" value={displayKr} onChange={e => handleFieldUpdate('kr', path, e.target.value, type)} />
                        }
                    </div>
                )}
                {showEn && (
                    <div>
                        <label className="block text-xs font-bold text-admin-sub mb-1 uppercase">🇺🇸 {label} (EN)</label>
                        {type === "textarea" || type === "array" ?
                            <textarea className="w-full p-2 border border-admin-border bg-admin-wash rounded text-sm font-mono text-admin-text" rows={rows} value={displayEn} onChange={e => handleFieldUpdate('en', path, e.target.value, type)} /> :
                            <input className="w-full p-2 border border-admin-border bg-admin-wash rounded text-sm text-admin-text" value={displayEn} onChange={e => handleFieldUpdate('en', path, e.target.value, type)} />
                        }
                    </div>
                )}
            </div>
        );
    }, [getValue, handleFieldUpdate, viewMode]);

    // Render category dropdown selector
    const renderCategorySelect = useCallback(() => {
        const valKr = getValue('kr', ['cat']);
        const valEn = getValue('en', ['cat']);

        const showKr = viewMode === 'KR' || viewMode === 'SPLIT';
        const showEn = viewMode === 'EN' || viewMode === 'SPLIT';
        const gridClass = viewMode === 'SPLIT' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'block';

        return (
            <div className={`${gridClass} mb-4 pt-4 border-t border-admin-border`}>
                {showKr && (
                    <div>
                        <label className="block text-xs font-bold text-admin-sub mb-1 uppercase">🇰🇷 Kategorie (KR)</label>
                        <select
                            className="w-full p-2 border border-admin-border bg-admin-wash rounded text-sm text-admin-text"
                            value={valKr}
                            onChange={e => {
                                const selected = CATEGORIES.find(c => c.kr === e.target.value);
                                if (selected) {
                                    handleChange(['kr', 'cat'], selected.kr);
                                    handleChange(['en', 'cat'], selected.en);
                                }
                            }}
                        >
                            <option value="">-- Vyberte kategorii --</option>
                            {CATEGORIES.map(cat => (
                                <option key={cat.kr} value={cat.kr}>{cat.kr}</option>
                            ))}
                        </select>
                    </div>
                )}
                {showEn && (
                    <div>
                        <label className="block text-xs font-bold text-admin-sub mb-1 uppercase">🇺🇸 Kategorie (EN)</label>
                        <select
                            className="w-full p-2 border border-admin-border bg-admin-wash rounded text-sm text-admin-text"
                            value={valEn}
                            onChange={e => {
                                const selected = CATEGORIES.find(c => c.en === e.target.value);
                                if (selected) {
                                    handleChange(['kr', 'cat'], selected.kr);
                                    handleChange(['en', 'cat'], selected.en);
                                }
                            }}
                        >
                            <option value="">-- Select category --</option>
                            {CATEGORIES.map(cat => (
                                <option key={cat.en} value={cat.en}>{cat.en}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        );
    }, [getValue, viewMode, handleChange]);

    // Early return AFTER all hooks (React hooks rule - #310 fix)
    if (loading) return <div className="p-8">Načítám...</div>;

    return (
        <AdminLayout title={isNew ? "Nový projekt" : "Upravit projekt"} actions={
            <div className="flex gap-4 items-center">
                <button onClick={() => navigate("/admin/portfolio")} className="text-gray-500 hover:text-gray-800 flex items-center gap-1 font-bold">
                    <ArrowLeft size={16} /> Zpět
                </button>
            </div>
        }>
            <div className="space-y-6 pb-24">

                <div className="flex justify-between items-center bg-admin-wash p-3 rounded border border-admin-border">
                    <div className="text-sm font-bold text-admin-sub uppercase">Globální nastavení</div>
                    <ViewModeSelector mode={viewMode} onChange={setViewMode} />
                </div>

                {/* Meta Panel */}
                <div className="bg-admin-card p-4 rounded border border-admin-border grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase mb-1 text-admin-sub">ID (Slug)</label>
                        <input className="w-full p-2 border border-admin-border bg-admin-wash rounded text-admin-text" value={project.id} onChange={e => { handleChange(['id'], e.target.value); }} disabled={!isNew} placeholder="my-awesome-project" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase mb-1 text-admin-sub">Highlight</label>
                        <button onClick={() => handleChange(['isHighlight'], !project.isHighlight)} className={`w-full p-2 rounded text-left font-bold transition-colors ${project.isHighlight ? 'bg-green-500/20 text-green-400' : 'bg-admin-wash text-admin-sub'}`}>
                            {project.isHighlight ? "VISIBLE ON HOME" : "HIDDEN (List only)"}
                        </button>
                    </div>
                    {/* Retrocompatibility fields */}
                    <div className="opacity-50 hover:opacity-100 transition-opacity">
                        <label className="block text-xs font-bold uppercase mb-1 text-admin-sub">Folder ID (Legacy)</label>
                        <input className="w-full p-2 border border-admin-border bg-admin-wash rounded text-admin-text" value={project.media.folderId} onChange={e => handleChange(['media', 'folderId'], e.target.value)} placeholder="e.g. 1" />
                    </div>
                    <div className="opacity-50 hover:opacity-100 transition-opacity">
                        <label className="block text-xs font-bold uppercase mb-1 text-admin-sub">Main Image (Legacy)</label>
                        <input className="w-full p-2 border border-admin-border bg-admin-wash rounded text-admin-text" value={project.media.mainImage} onChange={e => handleChange(['media', 'mainImage'], e.target.value)} placeholder="e.g. 27.webp" />
                    </div>
                </div>

                {/* Legacy Image Preview (if present) */}
                {(project.media.folderId && project.media.mainImage) && (
                    <div className="bg-amber-50 p-4 rounded border border-amber-200 flex items-center gap-4">
                        <div className="w-24 h-16 shrink-0 bg-white border border-amber-100 rounded overflow-hidden">
                            <img
                                src={`/img/portfolio/${project.media.folderId}/${project.media.mainImage}`}
                                alt="Legacy Cover"
                                className="w-full h-full object-cover"
                                onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-amber-800 uppercase mb-1">Legacy Cover Image</h4>
                            <p className="text-xs text-amber-700">
                                This image is loaded from local file system:
                                <code className="bg-amber-100 px-1 py-0.5 rounded ml-1 text-[10px]">
                                    /img/portfolio/{project.media.folderId}/{project.media.mainImage}
                                </code>
                            </p>
                            <p className="text-[10px] text-amber-600 mt-1">
                                (Pokud nahrajete obrázky do Galerie níže, tento starý obrázek bude ignorován.)
                            </p>
                        </div>
                    </div>
                )}

                {/* Image Gallery */}
                <div className="bg-admin-card p-6 rounded border border-admin-border space-y-4">
                    <h3 className="font-bold border-b border-admin-border pb-2 flex items-center gap-2 text-admin-text">
                        Galerie obrázků
                        <span className="text-xs font-normal text-admin-sub bg-admin-wash px-2 py-0.5 rounded-full">{(project.media?.storageImages || []).length} items</span>
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Existing Images */}
                        {(project.media?.storageImages || []).map((img: StorageImage, idx: number) => {
                            const isMain = project.media?.mainImageUrl === img.url;
                            const fileName = img.path.split('/').pop() || `image-${idx}`;
                            return (
                                <div key={idx} className={`relative group border rounded-lg overflow-hidden bg-slate-50 ${isMain ? 'ring-2 ring-yellow-400' : ''}`}>
                                    <div className="aspect-video">
                                        <img src={img.url} alt={`img-${idx}`} className="w-full h-full object-cover" />
                                    </div>
                                    {/* Filename label */}
                                    <div className="px-2 py-1 text-[10px] text-slate-500 truncate bg-slate-100 border-t" title={fileName}>
                                        {isMain && <Star size={10} className="inline mr-1 text-yellow-500 fill-yellow-400" />}
                                        {fileName}
                                    </div>
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                        <button onClick={() => handleMoveImage(idx, 'up')} className={`bg-white text-slate-800 p-1.5 rounded-full hover:bg-slate-200 ${idx === 0 ? 'opacity-30' : ''}`} title="Nahoru" disabled={idx === 0}><ChevronUp size={14} /></button>
                                        <button onClick={() => handleMoveImage(idx, 'down')} className={`bg-white text-slate-800 p-1.5 rounded-full hover:bg-slate-200 ${idx === (project.media?.storageImages?.length || 0) - 1 ? 'opacity-30' : ''}`} title="Dolů"><ChevronDown size={14} /></button>
                                        <button
                                            onClick={() => handleChange(['media', 'mainImageUrl'], img.url)}
                                            className={`${isMain ? 'bg-yellow-400 text-yellow-900' : 'bg-white text-slate-800'} p-2 rounded-full hover:bg-yellow-300`}
                                            title="Nastavit jako hlavní"
                                        >
                                            <Star size={16} className={isMain ? 'fill-yellow-600' : ''} />
                                        </button>
                                        <button onClick={() => handleRemoveImage(idx)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-transform hover:scale-110" title="Smazat">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Uploader */}
                        <div className="col-span-1 h-full min-h-[150px]">
                            <ImageUploader
                                storagePath={`projects/${project.id}/${Date.now()}.jpg`}
                                onUploadComplete={(url, path) => handleAddImage(url, path)}
                                label="Přidat fotku"
                                width="w-full" height="h-full"
                            />
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 italic">Pokud galerie obsahuje obrázky, bude na webu použita přednostně před starou složkovou strukturou.</p>
                </div>

                {/* Content Editors */}
                <div className="bg-admin-card p-6 rounded border border-admin-border space-y-4">
                    <h3 className="font-bold border-b border-admin-border pb-2 text-admin-text">Karta projektu (Card)</h3>
                    {renderFieldPair("Nadpis", ['title'])}
                    {renderCategorySelect()}
                    {renderFieldPair("Shrnuti", ['summary'], "textarea")}
                    {renderFieldPair("Tagy (čárkou)", ['tags'], "tags")}

                    <h3 className="font-bold border-b border-admin-border pb-2 mt-8 text-admin-text">Detail projektu</h3>
                    {renderFieldPair("Kategorie (Detail)", ['detail', 'category'])}
                    {renderFieldPair("Prostor (Space)", ['detail', 'space'])}
                    {renderFieldPair("Lokace", ['detail', 'loc'])}
                    {renderFieldPair("Období", ['detail', 'period'])}
                    {renderFieldPair("Role", ['detail', 'role'])}
                    {renderFieldPair("Rozsah (Scope)", ['detail', 'scope'])}
                    {renderFieldPair("Klíčová slova", ['detail', 'keywords'])}
                    {renderFieldPair("Popis", ['detail', 'desc'], "textarea", 6)}
                    {renderFieldPair("Odrážky (1 na řádek)", ['detail', 'bullets'], "array", 6)}
                    {renderFieldPair("Výsledek", ['detail', 'result'], "textarea")}
                </div>
            </div>

            <StickySaveBar
                status={saving ? 'saving' : (isDirty ? 'idle' : 'idle')} // Simplified status for custom save logic
                isDirty={isDirty}
                onSave={handleSave}
            />
        </AdminLayout>
    );
}
