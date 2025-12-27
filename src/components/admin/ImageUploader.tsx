import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, AlertCircle } from "lucide-react";
import { storage } from "../../lib/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

import { getErrorMessage } from '../../utils/errorHelpers';
import { logger } from '../../utils/logger';

interface ImageUploaderProps {
    storagePath: string; // e.g., "projects/p1/cover.jpg"
    currentUrl?: string; // Existing URL if any
    onUploadComplete: (url: string, path: string) => void;
    onDelete?: () => void;
    label?: string;
    width?: string;
    height?: string;
}

export function ImageUploader({ storagePath, currentUrl, onUploadComplete, onDelete, label = "Upload Image", width = "w-full", height = "h-48" }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<string>("");
    const [preview, setPreview] = useState<string | null>(currentUrl || null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // Reset
        setError(null);
        setUploading(true);
        setUploadProgress(`0/${files.length}`);

        try {
            if (!storage) throw new Error("Storage not initialized");

            // Process all files
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // Get actual file extension from the uploaded file
                const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';

                // Generate unique path using actual file extension
                const timestamp = Date.now();
                const basePath = storagePath.replace(/\.[^.]+$/, ''); // Remove extension from template
                const uniquePath = `${basePath}_${timestamp}_${i}.${fileExtension}`;

                // Create local preview for last file
                if (i === files.length - 1) {
                    const objectUrl = URL.createObjectURL(file);
                    setPreview(objectUrl);
                }

                // Upload to Storage
                const storageRef = ref(storage, uniquePath);
                const snapshot = await uploadBytes(storageRef, file);
                const downloadUrl = await getDownloadURL(snapshot.ref);

                // Notify parent for each file
                onUploadComplete(downloadUrl, uniquePath);

                // Update progress
                setUploadProgress(`${i + 1}/${files.length}`);
            }

        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Upload failed'));
            setError(getErrorMessage(error));
            setPreview(currentUrl || null); // revert
        } finally {
            setUploading(false);
            // Reset input so same files can be selected again
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDelete = async () => {
        if (!confirm("Opravdu smazat tento obrázek?")) return;
        setUploading(true);
        try {
            if (storage && storagePath) {
                // Try to delete from storage if it exists
                // Note: We might want to pass explicit delete logic or handle it here
                // For now, let's assume we clean up storage
                const storageRef = ref(storage, storagePath);
                await deleteObject(storageRef).catch(e => logger.warn(`Delete ignored: ${String(e)}`));
            }
            if (onDelete) onDelete();
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";

        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Upload error (delete)'));
            setError(getErrorMessage(error));
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={`border-2 border-dashed ${error ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-slate-50'} rounded-lg p-4 flex flex-col items-center justify-center gap-3 relative transition-all hover:bg-slate-100`}>
            {preview ? (
                <div className="relative group w-full flex justify-center">
                    <img src={preview} alt="Preview" className={`object-contain ${width} ${height} rounded shadow-xs`} />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity rounded">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white text-slate-800 p-2 rounded-full hover:bg-slate-200"
                            title="Replace"
                        >
                            <Upload size={16} />
                        </button>
                        {onDelete && (
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                title="Delete"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center cursor-pointer text-slate-400 hover:text-indigo-600 py-8 ${width}`}
                >
                    {uploading ? <div className="animate-spin mb-2"><LoaderIcon /></div> : <ImageIcon size={32} className="mb-2" />}
                    <span className="text-sm font-bold">{uploading ? `Nahrávám... ${uploadProgress}` : label}</span>
                    <span className="text-xs">{uploading ? "Prosím počkejte" : "Klikněte pro výběr (i více souborů najednou)"}</span>
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png,image/jpeg,image/webp,application/pdf"
                multiple
            />

            {error && <p className="text-xs text-red-600 flex items-center gap-1"><AlertCircle size={10} /> {error}</p>}
        </div>
    );
}

function LoaderIcon() {
    return (
        <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    )
}
