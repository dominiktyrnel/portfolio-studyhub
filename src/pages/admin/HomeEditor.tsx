import { useAdminContent } from "../../hooks/useAdminContent";
import { StickySaveBar } from "../../components/admin/StickySaveBar";
import { ViewModeSelector, type ViewMode } from "../../components/admin/ViewModeSelector";
import { useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";

// Minimal Spinner
const Spinner = () => <div className="animate-spin h-5 w-5 border-2 border-indigo-500 rounded-full border-t-transparent"></div>;

// FieldPair component extracted to avoid react-hooks/static-components warning
const FieldPair = ({
    label,
    path,
    type = "text",
    rows = 3,
    kr,
    en,
    viewMode
}: {
    label: string;
    path: string[];
    type?: "text" | "textarea" | "array";
    rows?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Admin content has dynamic structure
    kr: { data: any; handleNestedChange: (path: string[], val: any) => void };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Admin content has dynamic structure
    en: { data: any; handleNestedChange: (path: string[], val: any) => void };
    viewMode: ViewMode;
}) => {
    // Safe access
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Reduce callback for nested path access
    const valKr = path.reduce((obj: any, key) => obj?.[key], kr.data) || "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Reduce callback for nested path access
    const valEn = path.reduce((obj: any, key) => obj?.[key], en.data) || "";

    // Array handling: separate by newline for textarea
    const isArray = type === "array";
    const strKr = isArray ? (Array.isArray(valKr) ? valKr.join('\n') : valKr) : valKr;
    const strEn = isArray ? (Array.isArray(valEn) ? valEn.join('\n') : valEn) : valEn;

    const update = (lang: 'kr' | 'en', val: string) => {
        const finalVal = isArray ? val.split('\n') : val;
        if (lang === 'kr') kr.handleNestedChange(path, finalVal);
        else en.handleNestedChange(path, finalVal);
    };

    const showKr = viewMode === 'KR' || viewMode === 'SPLIT';
    const showEn = viewMode === 'EN' || viewMode === 'SPLIT';
    const gridClass = viewMode === 'SPLIT' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'block';

    return (
        <div className={`${gridClass} mb-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0`}>
            {/* KR Column */}
            {showKr && (
                <div className="mb-4 md:mb-0">
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider flex items-center justify-between">
                        <span>🇰🇷 {label} (KR)</span>
                    </label>
                    {type === "textarea" || type === "array" ? (
                        <textarea
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 text-sm font-mono"
                            rows={rows}
                            value={strKr}
                            onChange={(e) => update('kr', e.target.value)}
                        />
                    ) : (
                        <input
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 text-sm"
                            type="text"
                            value={strKr}
                            onChange={(e) => update('kr', e.target.value)}
                        />
                    )}
                </div>
            )}
            {/* EN Column */}
            {showEn && (
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider flex items-center justify-between">
                        <span>🇺🇸 {label} (EN)</span>
                    </label>
                    {type === "textarea" || type === "array" ? (
                        <textarea
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-200 text-sm font-mono"
                            rows={rows}
                            value={strEn}
                            onChange={(e) => update('en', e.target.value)}
                        />
                    ) : (
                        <input
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-200 text-sm"
                            type="text"
                            value={strEn}
                            onChange={(e) => update('en', e.target.value)}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

// Dual Editor Component
export function HomeEditor() {
    // We need 2 hooks: one for KR, one for EN
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Admin content has dynamic structure
    const kr = useAdminContent<any>("content/kr");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Admin content has dynamic structure
    const en = useAdminContent<any>("content/en");

    // Unified state
    const loading = kr.loading || en.loading;
    const error = kr.error || en.error;
    const isDirty = kr.isDirty || en.isDirty;
    const saving = kr.saving || en.saving;
    const saveResult = (kr.saveResult === "success" && en.saveResult === "success") ? "success" :
        (kr.saveResult === "error" || en.saveResult === "error") ? "error" : null;

    const [viewMode, setViewMode] = useState<ViewMode>('SPLIT');

    const handleSaveAll = async () => {
        await Promise.all([
            kr.isDirty ? kr.handleSave() : Promise.resolve(),
            en.isDirty ? en.handleSave() : Promise.resolve()
        ]);
    };

    if (loading) return <div className="p-8 flex justify-center"><Spinner /></div>;
    if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

    return (
        <AdminLayout title="Editace Úvodní stránky" maxWidth="max-w-6xl">
            <div className="space-y-6 pb-24">

                <div className="flex justify-between items-center mb-6">
                    <ViewModeSelector mode={viewMode} onChange={setViewMode} />
                </div>

                {/* HERO */}
                <div className="bg-admin-card rounded border border-admin-border p-6">
                    <h3 className="text-lg font-bold border-b border-admin-border pb-4 mb-4 text-admin-text">1. Hero Sekce</h3>
                    <FieldPair label="Hlavní nápis (Title)" path={['hero', 'title']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Podtitul (řádky)" path={['hero', 'subtitle']} type="array" rows={4} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Štítek (lokace)" path={['hero', 'badge', 'kr']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Štítek (text)" path={['hero', 'badge', 'txt']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Chips" path={['hero', 'chips']} type="array" rows={4} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="CTA Tlačítko (Primary)" path={['hero', 'cta', 'primary']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="CTA Tlačítko (Secondary)" path={['hero', 'cta', 'secondary']} kr={kr} en={en} viewMode={viewMode} />
                </div>

                {/* SKILLS */}
                <div className="bg-admin-card rounded border border-admin-border p-6">
                    <h3 className="text-lg font-bold border-b border-admin-border pb-4 mb-4 text-admin-text">2. Skills Sekce</h3>
                    <FieldPair label="Nadpis sekce" path={['skills', 'title']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Popis" path={['skills', 'desc']} type="textarea" kr={kr} en={en} viewMode={viewMode} />
                </div>

                {/* EQUIPMENT */}
                <div className="bg-admin-card rounded border border-admin-border p-6">
                    <h3 className="text-lg font-bold border-b border-admin-border pb-4 mb-4 text-admin-text">3. Vybavení & Nástroje</h3>
                    <FieldPair label="Nadpis sekce" path={['equipment', 'title']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Popis" path={['equipment', 'desc']} type="textarea" rows={4} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Odrážky" path={['equipment', 'bullets']} type="array" rows={6} kr={kr} en={en} viewMode={viewMode} />
                </div>

                {/* STRENGTHS */}
                <div className="bg-admin-card rounded border border-admin-border p-6">
                    <h3 className="text-lg font-bold border-b border-admin-border pb-4 mb-4 text-admin-text">4. Silné stránky (Karty)</h3>
                    <FieldPair label="Nadpis sekce" path={['strengths', 'title']} kr={kr} en={en} viewMode={viewMode} />
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className="mb-4 pt-4 border-t border-dashed">
                            <div className="text-xs font-bold text-admin-sub mb-2">Karta {i + 1}</div>
                            <FieldPair label="Titulek" path={['strengths', 'cards', String(i), 'title']} kr={kr} en={en} viewMode={viewMode} />
                            <FieldPair label="Popis" path={['strengths', 'cards', String(i), 'desc']} kr={kr} en={en} viewMode={viewMode} />
                        </div>
                    ))}
                </div>

                {/* CONTACT */}
                <div className="bg-admin-card rounded border border-admin-border p-6">
                    <h3 className="text-lg font-bold border-b border-admin-border pb-4 mb-4 text-admin-text">5. Kontakt (Patička)</h3>
                    <FieldPair label="Nadpis" path={['contact', 'heading']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Podtext" path={['contact', 'sub']} type="array" kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Poznámka" path={['contact', 'note']} kr={kr} en={en} viewMode={viewMode} />
                </div>

                <StickySaveBar
                    status={saving ? 'saving' : (saveResult === 'success' ? 'saved' : (saveResult === 'error' ? 'error' : 'idle'))}
                    isDirty={isDirty}
                    onSave={handleSaveAll}
                    lastSaved={new Date().toLocaleTimeString()}
                />
            </div>
        </AdminLayout>
    );
}
