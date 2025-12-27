import { useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";
import { Download, Upload, RefreshCw, Database } from "lucide-react";
import { db } from "../../lib/firebase";
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { documents as staticDocuments } from "../../data/documents";
import { content as contentKr } from "../../content/kr";
import { contentEn } from "../../content/en";
import type { PortfolioProject, ContentStructure } from '../../types/content';
import { getErrorMessage } from '../../utils/errorHelpers';
import { logger } from '../../utils/logger';

const COLLECTIONS = ["projects", "documents", "content", "settings"];

export function BackupPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string>("");

    // 1. Export DB to JSON
    const handleExport = async () => {
        if (!db) return alert("Firebase not initialized");
        setLoading(true);
        setStatus("Exporting data...");

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Backup data structure is dynamic from multiple Firestore collections
            const data: Record<string, any> = {};

            for (const colName of COLLECTIONS) {
                const snap = await getDocs(collection(db, colName));
                data[colName] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            }

            // Trigger download
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `backup_tyrnel_${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);

            setStatus("Export complete!");
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Export error'));
            setStatus("Export failed: " + getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    // 2. Import DB from JSON
    const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !db) return;
        if (!confirm("VAROVÁNÍ: Import přepíše existující data v databázi! Chcete pokračovat?")) return;

        setLoading(true);
        setStatus("Importing data...");

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                const batch = writeBatch(db!);
                let count = 0;

                for (const colName of Object.keys(data)) {
                    if (!COLLECTIONS.includes(colName)) continue;
                    const items = data[colName];
                    if (!Array.isArray(items)) continue;

                    for (const item of items) {
                        if (!item.id) continue;
                        const docRef = doc(db!, colName, item.id);
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { id: _id, ...rest } = item;
                        batch.set(docRef, rest);
                        count++;
                    }
                }

                await batch.commit();
                setStatus(`Import completed! Imported ${count} documents.`);

            } catch (error: unknown) {
                logger.error(error instanceof Error ? error : new Error('Import error'));
                setStatus("Import failed: " + getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        reader.readAsText(file);
    };

    // 3. Reset All to Default (Seed functionality aggregated)
    const handleResetAll = async () => {
        if (!confirm("NEBEZPEČNÉ: Opravdu chcete smazat vše a obnovit výchozí hodnoty ze zdrojového kódu?")) return;
        if (!db) return;

        setLoading(true);
        setStatus("Resetting database...");

        try {
            const batch = writeBatch(db);

            // 1. Projects - ✅ FIXED: Properly typed instead of @ts-ignore
            const contentKrTyped = contentKr as ContentStructure;
            const contentEnTyped = contentEn as ContentStructure;

            const krProjects: PortfolioProject[] = contentKrTyped.portfolio?.projects || [];
            const enProjects: PortfolioProject[] = contentEnTyped.portfolio?.projects || [];

            krProjects.forEach((pKr, index: number) => {
                const pEn = enProjects.find(p => p.id === pKr.id) || {} as Partial<PortfolioProject>;
                const parts = pKr.img.split('/');
                const folderId = parts[2] || "1";
                const mainImage = parts[3] || "cover.webp";

                const docRef = doc(db!, "projects", pKr.id);
                batch.set(docRef, {
                    id: pKr.id, order: index + 1, isHighlight: index < 6,
                    media: { folderId, mainImage },
                    kr: { title: pKr.title, cat: pKr.cat, summary: pKr.summary, tags: pKr.tags, detail: pKr.detail },
                    en: { title: pEn.title, cat: pEn.cat, summary: pEn.summary, tags: pEn.tags, detail: pEn.detail },
                    meta: { createdAt: new Date().toISOString() }
                });
            });

            // 2. Documents
            staticDocuments.forEach((d, index) => {
                const docRef = doc(db!, "documents", d.id);
                batch.set(docRef, {
                    id: d.id, order: index + 1, filePath: d.fileUrl, isSensitive: !!d.note,
                    kr: { title: d.titleKr, desc: d.descriptionKr, label: d.kind },
                    en: { title: d.titleKr + " (EN)", desc: d.descriptionKr + " (EN)", label: d.kind === "한국어" ? "Korean" : "Original + Translation" },
                    meta: { createdAt: new Date().toISOString() }
                });
            });

            // 3. Content Global/KR/EN
            batch.set(doc(db!, "content", "global"), {
                contact: {
                    email: "dominik@tyrnel.com",
                    phoneCz: "+420 734 857 103",
                    kakaoId: "dominikt"
                }
            });
            batch.set(doc(db!, "content", "kr"), { ...contentKr, meta: { lang: "kr" } });
            batch.set(doc(db!, "content", "en"), { ...contentEn, meta: { lang: "en" } });

            // 4. Version
            batch.set(doc(db!, "settings", "config"), {
                dataVersion: Date.now(),
                updatedBy: "admin_full_reset"
            });

            await batch.commit();
            setStatus("Reset complete! All default data restored.");

        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Seed error'));
            alert('Chyba při seedingu: ' + getErrorMessage(error));
            setStatus("Reset failed: " + getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout title="Záloha a Obnova">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Status Bar */}
                {status && (
                    <div className={`p-4 rounded border ${status.includes("failed") ? "bg-red-900/20 border-red-500/30 text-red-400" : "bg-green-900/20 border-green-500/30 text-green-400"}`}>
                        <strong>Status: </strong> {status}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Export */}
                    <div className="bg-admin-card p-6 rounded-lg shadow border border-admin-border flex flex-col items-center text-center">
                        <div className="bg-blue-500/20 p-4 rounded-full text-blue-400 mb-4">
                            <Download size={32} />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-admin-text">Exportovat Data</h3>
                        <p className="text-admin-sub text-sm mb-6 flex-1">
                            Stáhnout kompletní zálohu databáze (Firestore) do JSON souboru.
                        </p>
                        <button
                            onClick={handleExport}
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 disabled:opacity-50 w-full"
                        >
                            {loading ? "Pracuji..." : "Stáhnout Backup"}
                        </button>
                    </div>

                    {/* Import */}
                    <div className="bg-admin-card p-6 rounded-lg shadow border border-admin-border flex flex-col items-center text-center">
                        <div className="bg-yellow-500/20 p-4 rounded-full text-yellow-400 mb-4">
                            <Upload size={32} />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-admin-text">Importovat Data</h3>
                        <p className="text-admin-sub text-sm mb-6 flex-1">
                            Nahrát JSON zálohu zpět do databáze. <span className="text-red-400 font-bold">Přepíše existující data!</span>
                        </p>
                        <label className={`bg-yellow-500 text-white px-6 py-2 rounded font-bold hover:bg-yellow-600 disabled:opacity-50 w-full cursor-pointer ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                            {loading ? "Pracuji..." : "Nahrát JSON"}
                            <input type="file" onChange={handleImport} accept=".json" className="hidden" disabled={loading} />
                        </label>
                    </div>

                    {/* Reset */}
                    <div className="bg-admin-card p-6 rounded-lg shadow border border-admin-border flex flex-col items-center text-center">
                        <div className="bg-red-500/20 p-4 rounded-full text-red-400 mb-4">
                            <RefreshCw size={32} />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-admin-text">Obnovit Výchozí</h3>
                        <p className="text-admin-sub text-sm mb-6 flex-1">
                            Smazat celou databázi a obnovit výchozí data z kódu (Hard Reset).
                        </p>
                        <button
                            onClick={handleResetAll}
                            disabled={loading}
                            className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 disabled:opacity-50 w-full"
                        >
                            {loading ? "Pracuji..." : "Resetovat DB"}
                        </button>
                    </div>
                </div>

                <div className="bg-admin-wash p-6 rounded border border-admin-border mt-8">
                    <h3 className="font-bold flex items-center gap-2 mb-4 text-admin-text">
                        <Database size={18} /> Databázové Kolekce
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-admin-sub">
                        <li><strong>projects</strong>: Portfolio projects</li>
                        <li><strong>documents</strong>: PDF documents management</li>
                        <li><strong>content</strong>: Global translations (kr/en) and global settings</li>
                        <li><strong>settings</strong>: Config (versioning)</li>
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}
