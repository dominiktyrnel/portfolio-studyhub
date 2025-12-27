import { useState } from 'react';
import { Upload, Download, FileJson, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import {
    exportAndDownload,
    importCollection,
    parseJSONFile,
    validateImportJSON
} from '../../lib/firestoreImportExport';

interface CollectionConfig {
    id: string;
    name: string;
    description: string;
}

const COLLECTIONS: CollectionConfig[] = [
    {
        id: 'faq_items',
        name: 'FAQ Items',
        description: 'Frequently asked questions articles'
    },
    {
        id: 'daily_stats',
        name: 'Daily Stats',
        description: 'Study session statistics and records'
    },
    {
        id: 'study_sessions',
        name: 'Study Sessions',
        description: 'Individual study session records'
    },
    {
        id: 'study_plan',
        name: 'Study Plan',
        description: 'Monthly study plan and progress'
    }
];

export function ImportExportPage() {
    const [importing, setImporting] = useState<string | null>(null);
    const [exporting, setExporting] = useState<string | null>(null);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // ==================== EXPORT ====================

    const handleExport = async (collectionId: string) => {
        setExporting(collectionId);
        setMessage(null);

        try {
            await exportAndDownload(collectionId);
            setMessage({ type: 'success', text: `${collectionId} exported successfully!` });
        } catch (error) {
            setMessage({
                type: 'error',
                text: `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            });
        } finally {
            setExporting(null);
        }
    };

    // ==================== IMPORT ====================

    const handleImport = async (file: File, collectionId: string) => {
        setImporting(collectionId);
        setMessage(null);
        setProgress({ current: 0, total: 0 });

        try {
            // Parse JSON file
            const data = await parseJSONFile(file);

            // Validate
            const validation = validateImportJSON(data, collectionId);
            if (!validation.valid) {
                throw new Error(validation.error);
            }

            // Import with progress
            const result = await importCollection(
                collectionId,
                data,
                (current, total) => setProgress({ current, total })
            );

            if (result.success) {
                setMessage({
                    type: 'success',
                    text: `Imported ${result.docsWritten} documents into ${collectionId}`
                });
            } else {
                throw new Error(result.errors.join(', '));
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            });
        } finally {
            setImporting(null);
            setProgress({ current: 0, total: 0 });
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, collectionId: string) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.name.endsWith('.json')) {
                setMessage({ type: 'error', text: 'Please upload a .json file' });
                return;
            }
            handleImport(file, collectionId);
        }
    };

    // ==================== RENDER ====================

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-admin-text mb-2">
                    Import / Export
                </h1>
                <p className="text-admin-sub">
                    Import JSON data or export collections for backup
                </p>
            </div>

            {/* Global Message */}
            {message && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                    }`}>
                    {message.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5" />
                    ) : (
                        <AlertCircle className="w-5 h-5" />
                    )}
                    <span className="font-medium">{message.text}</span>
                </div>
            )}

            {/* Progress Bar */}
            {progress.total > 0 && (
                <div className="mb-6 p-4 bg-blue-500/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-400">
                            Importing... {progress.current} / {progress.total}
                        </span>
                        <span className="text-sm font-medium text-blue-400">
                            {Math.round((progress.current / progress.total) * 100)}%
                        </span>
                    </div>
                    <div className="w-full bg-admin-wash rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(progress.current / progress.total) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Collections Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {COLLECTIONS.map((coll) => (
                    <div
                        key={coll.id}
                        className="bg-admin-card rounded-lg border border-admin-border p-6 shadow-xs hover:shadow-md transition-shadow"
                    >
                        {/* Collection Header */}
                        <div className="flex items-start gap-3 mb-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <FileJson className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-admin-text">
                                    {coll.name}
                                </h3>
                                <p className="text-sm text-admin-sub mt-1">
                                    {coll.description}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                            {/* Import */}
                            <label
                                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-colors cursor-pointer text-admin-text ${importing === coll.id
                                    ? 'border-blue-400 bg-blue-500/10'
                                    : 'border-admin-border hover:border-blue-400 hover:bg-admin-wash'
                                    }`}
                            >
                                <input
                                    type="file"
                                    accept=".json"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e, coll.id)}
                                    disabled={importing === coll.id || exporting === coll.id}
                                />
                                {importing === coll.id ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-sm font-medium">Importing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4" />
                                        <span className="text-sm font-medium">Import JSON</span>
                                    </>
                                )}
                            </label>

                            {/* Export */}
                            <button
                                onClick={() => handleExport(coll.id)}
                                disabled={importing === coll.id || exporting === coll.id}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-admin-wash hover:bg-admin-border/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-admin-text"
                            >
                                {exporting === coll.id ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-sm font-medium">Exporting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-4 h-4" />
                                        <span className="text-sm font-medium">Export JSON</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Help Section */}
            <div className="mt-8 p-6 bg-admin-wash rounded-lg border border-admin-border">
                <h3 className="font-semibold text-admin-text mb-3">
                    💡 How to use
                </h3>
                <ul className="space-y-2 text-sm text-admin-sub">
                    <li className="flex items-start gap-2">
                        <span className="text-blue-400 font-bold">•</span>
                        <span><strong>Import:</strong> Click "Import JSON" and select a .json file to upload data into a collection</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-400 font-bold">•</span>
                        <span><strong>Export:</strong> Click "Export JSON" to download current collection data as a backup</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-400 font-bold">•</span>
                        <span><strong>Format:</strong> JSON files must use the format: <code className="bg-admin-card px-1 rounded">{"{ \"doc-id\": {...fields} }"}</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-400 font-bold">•</span>
                        <span><strong>Safety:</strong> Import will overwrite existing documents with the same ID</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
