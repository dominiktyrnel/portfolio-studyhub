import { useAdminContent } from "../../hooks/useAdminContent";
import { StickySaveBar } from "../../components/admin/StickySaveBar";
import { ViewModeSelector, type ViewMode } from "../../components/admin/ViewModeSelector";
import { useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Admin content has dynamic nested structure from Firestore
    kr: { data: any; handleNestedChange: (path: string[], val: any) => void };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Admin content has dynamic nested structure from Firestore
    en: { data: any; handleNestedChange: (path: string[], val: any) => void };
    viewMode: ViewMode;
}) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Path reduction through dynamic nested object
    const valKr = path.reduce((obj: any, key) => obj?.[key], kr.data) || "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Path reduction through dynamic nested object
    const valEn = path.reduce((obj: any, key) => obj?.[key], en.data) || "";

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

export function ProfileEditor() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Admin content has dynamic structure
    const kr = useAdminContent<any>("content/kr");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Admin content has dynamic structure
    const en = useAdminContent<any>("content/en");

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
        <AdminLayout title="Editace Profilu" maxWidth="max-w-6xl">
            <div className="space-y-6 pb-24">

                <div className="flex justify-between items-center mb-6">
                    <ViewModeSelector mode={viewMode} onChange={setViewMode} />
                </div>

                {/* HEADER */}
                <div className="bg-admin-card rounded border border-admin-border p-6">
                    <h3 className="text-lg font-bold border-b border-admin-border pb-4 mb-4 text-admin-text">1. Hlavička (Header)</h3>
                    <FieldPair label="Jméno" path={['profilePageV4', 'header', 'name']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Role" path={['profilePageV4', 'header', 'role']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Tagy" path={['profilePageV4', 'header', 'tags']} type="array" kr={kr} en={en} viewMode={viewMode} />
                </div>

                {/* SECTIONS */}
                <div className="bg-admin-card rounded border border-admin-border p-6">
                    <h3 className="text-lg font-bold border-b border-admin-border pb-4 mb-4 text-admin-text">2. Sekce Profilu</h3>

                    <h4 className="font-bold text-admin-sub mt-4 mb-2">Shrnutí (Summary)</h4>
                    <FieldPair label="Nadpis" path={['profilePageV4', 'sections', 'summary', 'title']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Odrážky" path={['profilePageV4', 'sections', 'summary', 'items']} type="array" rows={6} kr={kr} en={en} viewMode={viewMode} />

                    <h4 className="font-bold text-gray-600 mt-8 mb-2">Zkušenosti (Experience)</h4>
                    <FieldPair label="Nadpis" path={['profilePageV4', 'sections', 'experience', 'title']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Role" path={['profilePageV4', 'sections', 'experience', 'role']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Popis" path={['profilePageV4', 'sections', 'experience', 'desc']} type="array" rows={5} kr={kr} en={en} viewMode={viewMode} />

                    <h4 className="font-bold text-gray-600 mt-8 mb-2">Rozsah (Scope - Direct)</h4>
                    <FieldPair label="Nadpis" path={['profilePageV4', 'sections', 'scope', 'direct', 'title']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Popis" path={['profilePageV4', 'sections', 'scope', 'direct', 'desc']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Položky" path={['profilePageV4', 'sections', 'scope', 'direct', 'items']} type="array" rows={5} kr={kr} en={en} viewMode={viewMode} />

                    <h4 className="font-bold text-gray-600 mt-8 mb-2">Rozsah (Scope - Partner)</h4>
                    <FieldPair label="Nadpis" path={['profilePageV4', 'sections', 'scope', 'partner', 'title']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Položky" path={['profilePageV4', 'sections', 'scope', 'partner', 'items']} type="array" rows={4} kr={kr} en={en} viewMode={viewMode} />

                    <h4 className="font-bold text-gray-600 mt-8 mb-2">Skills Groups</h4>
                    {/* Mapping first 3 groups */}
                    {[0, 1, 2].map(i => (
                        <div key={i} className="mb-4 pt-2 border-t border-dashed">
                            <div className="text-xs font-bold text-admin-sub mb-2">Skupina {i + 1}</div>
                            <FieldPair label="Nadpis" path={['profilePageV4', 'sections', 'skills', 'groups', String(i), 'title']} kr={kr} en={en} viewMode={viewMode} />
                            <FieldPair label="Položky" path={['profilePageV4', 'sections', 'skills', 'groups', String(i), 'items']} type="array" rows={4} kr={kr} en={en} viewMode={viewMode} />
                        </div>
                    ))}

                    <h4 className="font-bold text-gray-600 mt-8 mb-2">Nástroje (Tools)</h4>
                    <FieldPair label="Nadpis" path={['profilePageV4', 'sections', 'tools', 'title']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Položky" path={['profilePageV4', 'sections', 'tools', 'items']} type="array" rows={5} kr={kr} en={en} viewMode={viewMode} />

                    <h4 className="font-bold text-gray-600 mt-8 mb-2">Pracovní styl (Workstyle)</h4>
                    {[0, 1, 2, 3, 4].map(i => (
                        <div key={i} className="mb-4 pt-2 border-t border-dashed">
                            <FieldPair label={`Styl ${i + 1} - Nadpis`} path={['profilePageV4', 'sections', 'workstyle', 'items', String(i), 'title']} kr={kr} en={en} viewMode={viewMode} />
                            <FieldPair label={`Styl ${i + 1} - Popis`} path={['profilePageV4', 'sections', 'workstyle', 'items', String(i), 'desc']} kr={kr} en={en} viewMode={viewMode} />
                        </div>
                    ))}

                    <h4 className="font-bold text-gray-600 mt-8 mb-2">Reference</h4>
                    <FieldPair label="Zdroj" path={['profilePageV4', 'sections', 'reference', 'source']} kr={kr} en={en} viewMode={viewMode} />
                    <FieldPair label="Shrnutí" path={['profilePageV4', 'sections', 'reference', 'summary']} type="array" rows={4} kr={kr} en={en} viewMode={viewMode} />

                    <h4 className="font-bold text-gray-600 mt-8 mb-2">Korea</h4>
                    <FieldPair label="Obsah" path={['profilePageV4', 'sections', 'korea', 'content']} type="array" rows={5} kr={kr} en={en} viewMode={viewMode} />
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
