import { Link } from "react-router-dom";
import { AdminLayout } from "../../layouts/AdminLayout";
import { useDocuments } from "../../hooks/useDocuments";
import { Plus, Edit, Trash2, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import { getErrorMessage } from "../../utils/errorHelpers";
import { documents as staticDocuments } from "../../data/documents";
import { db } from "../../lib/firebase";
import { writeBatch, doc } from "firebase/firestore";
import { logger } from "../../utils/logger";

export function DocumentsListPage() {
    const { documents, loading, deleteDocument, moveDocument, fetchDocuments } = useDocuments();

    // Migration / Seed Logic
    const handleSeed = async () => {
        if (!confirm("Přepsat databázi dokumentů daty ze statického souboru? Tuto akci nelze vrátit.")) return;
        if (!db) return;

        try {
            const batch = writeBatch(db);

            staticDocuments.forEach((d, index) => {
                const docRef = doc(db!, "documents", d.id);
                // Map existing static structure to new schema
                const data = {
                    id: d.id,
                    order: index + 1,
                    filePath: d.fileUrl,
                    isSensitive: !!d.note, // crude assumption based on existing data
                    // KR is primary in current data
                    kr: {
                        title: d.titleKr,
                        desc: d.descriptionKr,
                        label: d.kind
                    },
                    // EN is not in current data, so we create empty or copy KR
                    en: {
                        title: d.titleKr + " (EN)",
                        desc: d.descriptionKr + " (EN)",
                        label: d.kind === "한국어" ? "Korean" : "Original + Translation"
                    },
                    meta: { createdAt: new Date().toISOString() }
                };
                batch.set(docRef, data);
            });

            // Update version
            batch.set(doc(db!, "settings", "config"), {
                dataVersion: Date.now(),
                updatedBy: "admin_seed_documents"
            });

            await batch.commit();
            alert("Seeding dokončen!");
            fetchDocuments();
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Seed failed'));
            alert('Seed failed: ' + getErrorMessage(error));
        }
    };

    return (
        <AdminLayout title="Správa dokumentů" actions={
            <div className="flex gap-2">
                <button onClick={handleSeed} className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-200 rounded">
                    Reset (Seed)
                </button>
                <Link to="/admin/documents/new" className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-indigo-700 font-bold">
                    <Plus size={18} /> Přidat dokument
                </Link>
            </div>
        }>
            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                </div>
            ) : (
                <div className="bg-admin-card rounded-lg shadow overflow-hidden border border-admin-border">
                    <table className="w-full">
                        <thead className="bg-admin-wash border-b border-admin-border">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-admin-sub uppercase">Pořadí</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-admin-sub uppercase">Soubor (Cesta)</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-admin-sub uppercase">Titulek (KR / EN)</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-admin-sub uppercase">Akce</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border">
                            {documents.map((doc, index) => (
                                <tr key={doc.id} className="hover:bg-admin-wash/50">
                                    <td className="px-6 py-4 text-sm text-admin-sub font-mono">
                                        {doc.order}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-mono text-xs text-admin-sub">
                                        <div className="truncate max-w-[200px]" title={doc.filePath}>{doc.filePath}</div>
                                        {doc.isSensitive && (
                                            <span className="mt-1 inline-block px-1.5 py-0.5 bg-red-500/20 text-red-400 text-[10px] rounded font-bold">
                                                SENSITIVE
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="font-bold text-admin-text">{doc.kr?.title}</div>
                                        <div className="text-admin-sub text-xs">{doc.en?.title}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="flex bg-admin-wash rounded mr-2">
                                                <button
                                                    disabled={index === 0}
                                                    onClick={() => moveDocument(doc.id, 'up')}
                                                    className="p-1.5 text-admin-sub hover:text-indigo-400 disabled:opacity-30"
                                                >
                                                    <ArrowUp size={16} />
                                                </button>
                                                <div className="w-px bg-admin-border"></div>
                                                <button
                                                    disabled={index === documents.length - 1}
                                                    onClick={() => moveDocument(doc.id, 'down')}
                                                    className="p-1.5 text-admin-sub hover:text-indigo-400 disabled:opacity-30"
                                                >
                                                    <ArrowDown size={16} />
                                                </button>
                                            </div>

                                            <Link to={`/admin/documents/${doc.id}`} className="p-2 text-indigo-400 hover:bg-indigo-500/10 rounded">
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => deleteDocument(doc.id)}
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {documents.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-admin-sub">
                                        Žádné dokumenty. Klikněte na "Reset (Seed)" pro inicializaci.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
}
