import { useRef, useState } from "react";
import { Upload, FileText, CheckCircle, Trash2, Loader2 } from "lucide-react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../lib/firebase";
import { getErrorMessage } from '../../utils/errorHelpers';
import { logger } from '../../utils/logger';

interface FileUploaderProps {
    storagePath: string; // e.g. "documents/doc_123.pdf"
    currentUrl?: string;
    onUploadComplete: (url: string, fullPath: string) => void;
    onDelete?: () => void;
    accept?: string; // e.g. "application/pdf"
    maxSizeMB?: number;
    label?: string;
}

export function FileUploader({
    storagePath,
    currentUrl,
    onUploadComplete,
    onDelete,
    accept = "application/pdf",
    maxSizeMB = 10,
    label = "Upload File"
}: FileUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);

        // Validate type
        if (accept && !file.type.match(accept.replace('*', '.*'))) {
            setError(`Invalid file type. Accepted: ${accept}`);
            return;
        }

        // Validate size
        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`File too large. Max: ${maxSizeMB}MB`);
            return;
        }

        try {
            setUploading(true);

            // Create reference
            if (!storage) throw new Error("Storage not initialized");
            const storageRef = ref(storage, storagePath);

            // Upload
            // Changed from uploadBytesResumable to uploadBytes as per diff,
            // but this means progress tracking will not work directly with this method.
            // If progress is still desired, uploadBytesResumable should be used.
            // For now, following the diff's instruction to use uploadBytes.
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setUploading(false);
            onUploadComplete(downloadURL, storageRef.fullPath);



        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Upload error'));
            setError(getErrorMessage(error));
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this file? This cannot be undone.")) return;

        try {
            setUploading(true);
            if (!storage) throw new Error("Storage not initialized");

            // If we know the component has a specific path derived from props, we try to delete it.
            // However, often the 'currentUrl' doesn't easily map back to a path if it wasn't stored.
            // But here we rely on the parent or the `storagePath` prop if it matches the current file.
            // For safety, we just call the parent's onDelete which should handle clearing the record.
            // If we actually want to delete the BLOB, we need the reference.

            // Strategy: Create a ref from the storagePath if it's the same file, or just let parent handle logic.
            // Let's try to delete the file at `storagePath` if it exists.
            const storageRef = ref(storage, storagePath);
            await deleteObject(storageRef).catch(e => {
                logger.warn(`Could not delete object from storage (might not exist or different path): ${String(e)}`);
            });

            if (onDelete) onDelete();
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Delete error'));
            alert('Delete failed: ' + getErrorMessage(error));
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full">
            {currentUrl ? (
                <div className="flex items-center gap-4 p-4 border rounded bg-slate-50">
                    <div className="w-12 h-12 bg-indigo-100 rounded flex items-center justify-center text-indigo-600">
                        <FileText size={24} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="font-bold text-sm truncate flex items-center gap-2">
                            File Uploaded
                            <CheckCircle size={14} className="text-green-500" />
                        </div>
                        <a href={currentUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline truncate block">
                            {currentUrl}
                        </a>
                    </div>
                    {onDelete && (
                        <button
                            onClick={handleDelete}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                            title="Delete File"
                            type="button"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                </div>
            ) : (
                <div
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors
                        ${error ? 'border-red-300 bg-red-50' : (uploading ? 'border-indigo-300 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50 cursor-pointer')}
                    `}
                    onClick={() => !uploading && fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept={accept}
                        className="hidden"
                    />

                    {uploading ? (
                        <div className="text-center">
                            <Loader2 className="animate-spin text-indigo-500 mb-2 mx-auto" size={24} />
                            <div className="text-xs font-bold text-indigo-600">Uploading...</div>
                        </div>
                    ) : (
                        <>
                            <Upload className="text-gray-400 mb-2" size={24} />
                            <div className="text-sm font-medium text-gray-600">{label}</div>
                            <div className="text-xs text-gray-400 mt-1">PDF, Max {maxSizeMB}MB</div>
                        </>
                    )}

                    {error && <div className="text-xs text-red-500 mt-2 font-bold">{error}</div>}
                </div>
            )}
        </div>
    );
}
