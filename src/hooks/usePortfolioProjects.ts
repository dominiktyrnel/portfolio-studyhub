import { useState, useEffect, useCallback } from "react";
import {
    collection, getDocs, doc, setDoc, deleteDoc,
    query, orderBy, writeBatch
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { getErrorMessage } from "../utils/errorHelpers";
import { logger } from "../utils/logger";

export interface AdminProject {
    id: string;
    order: number;
    isHighlight: boolean;
    media: {
        folderId: string;
        mainImage: string;
        mainImageUrl?: string; // Selected from storageImages gallery
        storageImages?: Array<{
            url: string;
            path: string;
            createdAt: number;
        }>;
    };
    kr: Record<string, unknown>;
    en: Record<string, unknown>;
}

export function usePortfolioProjects() {
    const [projects, setProjects] = useState<AdminProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = useCallback(async () => {
        if (!db) return;
        setLoading(true);
        try {
            const q = query(collection(db, "projects"), orderBy("order", "asc"));
            const snap = await getDocs(q);
            const list = snap.docs.map(d => ({ id: d.id, ...d.data() })) as AdminProject[];
            setProjects(list);
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Fetch projects error'));
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const saveProject = async (project: AdminProject, isNew: boolean) => {
        if (!db) return;
        try {
            // Set order if new (append to end)
            if (isNew) {
                const maxOrder = projects.length > 0 ? Math.max(...projects.map(p => p.order || 0)) : 0;
                project.order = maxOrder + 1;
            } else if (project.order === undefined) {
                project.order = 999;
            }

            // Clean payloads? (Optional, Firestore handles objects well)
            // Add meta
            const payload = {
                ...project,
                meta: {
                    updatedAt: new Date().toISOString(),
                    // preserve createdAt if exists? We overwrite usually in this logic or merge.
                    // For CRUD editor we usually load full object.
                }
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Meta object needs flexible typing for createdAt field
            if (isNew) (payload.meta as any).createdAt = new Date().toISOString();

            const ref = doc(db, "projects", project.id);
            await setDoc(ref, payload, { merge: true });

            // Update version config
            await setDoc(doc(db, "settings", "config"), {
                dataVersion: Date.now(),
                updatedBy: "admin_portfolio"
            });

            await fetchProjects();
            return true;
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Save project error'));
            throw error;
        }
    };

    const deleteProject = async (id: string) => {
        if (!db) return;
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await deleteDoc(doc(db, "projects", id));
            // Update version
            await setDoc(doc(db, "settings", "config"), {
                dataVersion: Date.now(),
                updatedBy: "admin_portfolio"
            });
            await fetchProjects();
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Delete project error'));
            alert("Error deleting: " + getErrorMessage(error));
        }
    };

    const moveProject = async (id: string, direction: 'up' | 'down') => {
        if (!db) return;
        const currentIndex = projects.findIndex(p => p.id === id);
        if (currentIndex === -1) return;

        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (targetIndex < 0 || targetIndex >= projects.length) return;

        const current = projects[currentIndex];
        const target = projects[targetIndex];

        // Swap orders. Use transaction/batch for atomicity
        try {
            const batch = writeBatch(db);
            const refCurrent = doc(db, "projects", current.id);
            const refTarget = doc(db, "projects", target.id);

            // Swap their order values
            batch.update(refCurrent, { order: target.order });
            batch.update(refTarget, { order: current.order });

            // Update version
            batch.set(doc(db, "settings", "config"), {
                dataVersion: Date.now(),
                updatedBy: "admin_portfolio"
            });

            await batch.commit();

            // Refresh local state optimistically or fetch
            // Let's just swap local array to be fast, then fetch
            const newProjects = [...projects];
            newProjects[currentIndex] = { ...current, order: target.order };
            newProjects[targetIndex] = { ...target, order: current.order };
            newProjects.sort((a, b) => a.order - b.order);
            setProjects(newProjects);

        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error('Move project error'));
            alert("Move failed: " + getErrorMessage(error));
        }
    };

    return { projects, loading, error, fetchProjects, saveProject, deleteProject, moveProject };
}
