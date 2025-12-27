import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "../../layouts/AdminLayout";
import { useDocuments, type AdminDocument } from "../../hooks/useDocuments";
import { ArrowLeft } from "lucide-react";
import { getErrorMessage } from '../../utils/errorHelpers';
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { StickySaveBar } from "../../components/admin/StickySaveBar";
import { FileUploader } from "../../components/admin/FileUploader";
import { logger } from "../../utils/logger";

interface FieldPairProps {
    label: string;
    krVal: string;
    enVal: string;
    onKrChange: (v: string) => void;
    onEnChange: (v: string) => void;
    multiline?: boolean;
}

function FieldPair({ label, krVal, enVal, onKrChange, onEnChange, multiline }: FieldPairProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                <label className="block text-xs font-bold text-admin-sub uppercase mb-1">🇰🇷 {label} (KR)</label>
                {multiline ? (
                    <textarea
                        value={krVal} onChange={e => onKrChange(e.target.value)}
                        className="w-full border border-admin-border bg-admin-wash rounded p-2 text-sm h-24 text-admin-text"
                    />
                ) : (
                    <input
                        type="text" value={krVal} onChange={e => onKrChange(e.target.value)}
                        className="w-full border border-admin-border bg-admin-wash rounded p-2 text-sm text-admin-text"
                    />
                )}
            </div>
            <div>
                <label className="block text-xs font-bold text-admin-sub uppercase mb-1">🇺🇸 {label} (EN)</label>
                {multiline ? (
                    <textarea
                        value={enVal} onChange={e => onEnChange(e.target.value)}
                        className="w-full border border-admin-border bg-admin-wash rounded p-2 text-sm h-24 text-admin-text"
                    />
                ) : (
                    <input
                        type="text" value={enVal} onChange={e => onEnChange(e.target.value)}
                        className="w-full border border-admin-border bg-admin-wash rounded p-2 text-sm text-admin-text"
                    />
                )}
            </div>
        </div>
    );
}

// Local type for editor - guarantees kr and en are defined
type EditorDocument = Omit<AdminDocument, 'kr' | 'en'> & {
    kr: { title: string; desc: string; label: string };
    en: { title: string; desc: string; label: string };
};

export function DocumentsEditorPage() {
    const { id } = useParams();
    const isNew = id === "new";
    const navigate = useNavigate();
    const { saveDocument } = useDocuments();

    const [documentData, setDocumentData] = useState<EditorDocument>({
        id: isNew ? "doc_" + Date.now() : id!,
        order: 999,
        filePath: "",
        isSensitive: false,
        kr: { title: "", desc: "", label: "" },
        en: { title: "", desc: "", label: "" },
        meta: {}
    });

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    // Load existing
    useEffect(() => {
        if (!isNew && id && db) {
            getDoc(doc(db, "documents", id)).then(snap => {
                if (snap.exists()) {
                    const data = snap.data();
                    // Ensure kr and en are always defined with defaults
                    setDocumentData({
                        id: snap.id,
                        order: data.order || 999,
                        filePath: data.filePath || '',
                        isSensitive: data.isSensitive || false,
                        kr: data.kr || { title: '', desc: '', label: '' },
                        en: data.en || { title: '', desc: '', label: '' },
                        meta: data.meta || {}
                    });
                }
                setLoading(false);
            });
        }
    }, [id, isNew]);

    const [validationError, setValidationError] = useState<string | null>(null);

    const handleSave = async () => {
        setValidationError(null);

        if (!documentData.filePath) {
            setValidationError("Musíte nahrát soubor (PDF).");
            return;
        }
        if (!documentData.kr.title) {
            setValidationError("Český/KR název je povinný.");
            return;
        }

        setSaving(true);
        try {
            await saveDocument(documentData, isNew);
            setIsDirty(false);
            if (isNew) navigate("/admin/documents");
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Document save failed'));
            alert('Save failed: ' + getErrorMessage(error));
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = (url: string) => {
        setDocumentData(prev => ({ ...prev, filePath: url })); // We store the URL now as the main filePath for easier access in frontend
        setIsDirty(true);
    };

    const handleFileDelete = () => {
        setDocumentData(prev => ({ ...prev, filePath: "" }));
        setIsDirty(true);
    };

    if (loading) return <div className="p-8 text-center text-admin-sub">Načítám editor...</div>;

    return (
        <AdminLayout title={isNew ? "Nový dokument" : "Upravit dokument"} actions={
            <div className="flex gap-2">
                <button onClick={() => navigate("/admin/documents")} className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded flex items-center gap-1 font-bold">
                    <ArrowLeft size={16} /> Zpět
                </button>
            </div>
        }>
            <div className="space-y-6 pb-24">

                {/* Metadata */}
                <div className="bg-admin-card shadow rounded-lg p-6 border border-admin-border">
                    <h3 className="text-lg font-bold text-admin-text mb-4 pb-2 border-b border-admin-border">Soubor</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-admin-sub mb-2">PDF Soubor (Max 10MB)</label>
                            <FileUploader
                                storagePath={`documents/docs/${documentData.id}.pdf`}
                                currentUrl={documentData.filePath}
                                onUploadComplete={handleFileUpload}
                                onDelete={handleFileDelete}
                                label="Nahrát PDF dokument"
                                accept="application/pdf"
                            />
                            {validationError && <p className="text-sm text-red-400 font-bold mt-2">{validationError}</p>}
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center gap-3 cursor-pointer p-3 border border-admin-border rounded hover:bg-admin-wash w-full md:w-auto">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 text-indigo-600 rounded"
                                    checked={documentData.isSensitive}
                                    onChange={(e) => {
                                        setDocumentData({ ...documentData, isSensitive: e.target.checked });
                                        setIsDirty(true);
                                    }}
                                />
                                <div>
                                    <div className="font-bold text-admin-text">Citlivý dokument (Sensitive)</div>
                                    <div className="text-xs text-admin-sub">Zobrazí se varování při pokusu o stažení</div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-admin-card shadow rounded-lg p-6 border border-admin-border">
                    <h3 className="text-lg font-bold text-admin-text mb-4 pb-2 border-b border-admin-border">Obsah (Dvojjazyčný)</h3>

                    <FieldPair
                        label="Titulek (Title)"
                        krVal={documentData.kr.title} enVal={documentData.en.title}
                        onKrChange={v => { setDocumentData({ ...documentData, kr: { ...documentData.kr, title: v } }); setIsDirty(true); }}
                        onEnChange={v => { setDocumentData({ ...documentData, en: { ...documentData.en, title: v } }); setIsDirty(true); }}
                    />

                    <FieldPair
                        label="Popis (Description)" multiline
                        krVal={documentData.kr.desc} enVal={documentData.en.desc}
                        onKrChange={v => { setDocumentData({ ...documentData, kr: { ...documentData.kr, desc: v } }); setIsDirty(true); }}
                        onEnChange={v => { setDocumentData({ ...documentData, en: { ...documentData.en, desc: v } }); setIsDirty(true); }}
                    />

                    <FieldPair
                        label="Štítek / Typ (Label)"
                        krVal={documentData.kr.label} enVal={documentData.en.label}
                        onKrChange={v => { setDocumentData({ ...documentData, kr: { ...documentData.kr, label: v } }); setIsDirty(true); }}
                        onEnChange={v => { setDocumentData({ ...documentData, en: { ...documentData.en, label: v } }); setIsDirty(true); }}
                    />
                </div>

                <div className="text-center text-xs text-admin-sub font-mono">
                    ID: {documentData.id} • Order: {documentData.order} • Created: {String(documentData.meta?.createdAt || '')}
                </div>
            </div>

            <StickySaveBar
                status={saving ? 'saving' : (isDirty ? 'idle' : 'idle')}
                isDirty={isDirty}
                onSave={handleSave}
            />
        </AdminLayout>
    );
}
