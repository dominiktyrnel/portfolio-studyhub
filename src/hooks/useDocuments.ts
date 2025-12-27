import { useState, useEffect, useCallback } from "react";
import {
    collection, getDocs, doc, setDoc, deleteDoc,
    query, orderBy, writeBatch
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { getErrorMessage } from "../utils/errorHelpers";
import { logger } from "../utils/logger";

export interface AdminDocument {
    id: string;
    order: number;
    filePath: string;
    isSensitive?: boolean;
    kr?: {
        title: string;
        desc: string;
        label: string;
    };
    en?: {
        title: string;
        desc: string;
        label: string;
    };
    // Legacy fields for backwards compatibility
    titleKr?: string;
    titleEn?: string;
    descKr?: string;
    descEn?: string;
    labelKr?: string;
    labelEn?: string;
    fileUrl?: string;
    note?: string;
    meta?: Record<string, unknown>;
}

export function useDocuments() {
    const [documents, setDocuments] = useState<AdminDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDocuments = useCallback(async () => {
        if (!db) return;
        setLoading(true);
        try {
            const q = query(collection(db, "documents"), orderBy("order", "asc"));
            const snap = await getDocs(q);
            const list = snap.docs.map(d => ({ id: d.id, ...d.data() })) as AdminDocument[];
            setDocuments(list);
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Fetch documents error'));
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    const saveDocument = async (docData: AdminDocument, isNew: boolean) => {
        if (!db) return;
        try {
            // Set order if new (append to end)
            if (isNew) {
                const maxOrder = documents.length > 0 ? Math.max(...documents.map(p => p.order || 0)) : 0;
                docData.order = maxOrder + 1;
            } else if (docData.order === undefined) {
                docData.order = 999;
            }

            const payload = {
                ...docData,
                meta: {
                    ...(docData.meta || {}),
                    updatedAt: new Date().toISOString(),
                    ...(isNew ? { createdAt: new Date().toISOString() } : {})
                }
            };

            const ref = doc(db, "documents", docData.id);
            await setDoc(ref, payload, { merge: true });

            // Update version config
            await setDoc(doc(db, "settings", "config"), {
                dataVersion: Date.now(),
                updatedBy: "admin_documents"
            });

            await fetchDocuments();
            return true;
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Save document error'));
            throw error;
        }
    };

    const deleteDocument = async (id: string) => {
        if (!db) return;
        if (!confirm("Are you sure you want to delete this document?")) return;
        try {
            await deleteDoc(doc(db, "documents", id));
            // Update version
            await setDoc(doc(db, "settings", "config"), {
                dataVersion: Date.now(),
                updatedBy: "admin_documents"
            });
            await fetchDocuments();
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Delete document error'));
            alert("Error deleting: " + getErrorMessage(error));
        }
    };

    const moveDocument = async (id: string, direction: 'up' | 'down') => {
        if (!db) return;
        const currentIndex = documents.findIndex(p => p.id === id);
        if (currentIndex === -1) return;

        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (targetIndex < 0 || targetIndex >= documents.length) return;

        const current = documents[currentIndex];
        const target = documents[targetIndex];

        try {
            const batch = writeBatch(db);
            const refCurrent = doc(db, "documents", current.id);
            const refTarget = doc(db, "documents", target.id);

            // Swap their order values
            batch.update(refCurrent, { order: target.order });
            batch.update(refTarget, { order: current.order });

            // Update version
            batch.set(doc(db, "settings", "config"), {
                dataVersion: Date.now(),
                updatedBy: "admin_documents"
            });

            await batch.commit();

            // Optimistic update
            const newDocs = [...documents];
            newDocs[currentIndex] = { ...current, order: target.order };
            newDocs[targetIndex] = { ...target, order: current.order };
            newDocs.sort((a, b) => a.order - b.order);
            setDocuments(newDocs);

        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Move document error'));
            alert("Move failed: " + getErrorMessage(error));
        }
    };

    return { documents, loading, error, fetchDocuments, saveDocument, deleteDocument, moveDocument };
}
