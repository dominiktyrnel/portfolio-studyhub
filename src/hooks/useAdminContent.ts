import { useState, useEffect, useCallback } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { getErrorMessage } from '../utils/errorHelpers';
import { logger } from '../utils/logger';

type DocPath = "content/global" | "content/kr" | "content/en";

interface UseAdminContentReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    isDirty: boolean;
    saving: boolean;
    saveResult: "success" | "error" | null;
    lastSaved: Date | null;
    handleChange: (key: string, value: unknown) => void;
    // For nested changes (e.g. hero.title)
    handleNestedChange: (path: string[], value: unknown) => void;
    handleSave: () => Promise<void>;
    reset: () => void;
}

// Helper to update nested object by path
function setNestedValue<T extends Record<string, unknown>>(obj: T, path: string[], value: unknown): T {
    if (path.length === 0) return value as T;
    const [head, ...tail] = path;
    const current = obj?.[head];
    if (typeof current === 'object' && current !== null) {
        return {
            ...obj,
            [head]: setNestedValue(current as Record<string, unknown>, tail, value),
        } as T;
    }
    // If current is not an object, create a new object
    return {
        ...obj,
        [head]: setNestedValue({} as Record<string, unknown>, tail, value),
    } as T;
}

export function useAdminContent<T>(docId: DocPath): UseAdminContentReturn<T> {
    const [originalData, setOriginalData] = useState<T | null>(null);
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [saveResult, setSaveResult] = useState<"success" | "error" | null>(null);

    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Load initial data
    useEffect(() => {
        if (!db) return;
        setLoading(true);

        async function load() {
            try {
                const parts = docId.split("/");
                const ref = doc(db!, parts[0], parts[1]);
                const snap = await getDoc(ref);

                if (snap.exists()) {
                    const d = snap.data() as T;
                    setOriginalData(d);
                    setData(d);
                } else {
                    // Initialize with empty object if missing? Or error?
                    // For now let's assume empty object to allow editing
                    logger.warn(`Document ${docId} not found, initializing empty.`);
                    const empty = {} as T;
                    setOriginalData(empty);
                    setData(empty);
                }
            } catch (error: unknown) {
                logger.error(error instanceof Error ? error : new Error(`Content load failed: ${getErrorMessage(error)}`));
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [docId]);

    const isDirty = JSON.stringify(data) !== JSON.stringify(originalData);

    const handleChange = useCallback((key: string, value: unknown) => {
        setData(prev => prev ? { ...prev, [key]: value } : null);
    }, []);

    const handleNestedChange = useCallback((path: string[], value: unknown) => {
        setData(prev => prev ? setNestedValue(prev as Record<string, unknown>, path, value) as T : null);
    }, []);

    const handleSave = async () => {
        if (!db || !data) return;
        const firestore = db; // Local reference for TS narrowing

        setSaving(true);
        setSaveResult(null);
        try {
            const parts = docId.split("/");
            const ref = doc(firestore, parts[0], parts[1]);

            // Add/Update _version
            const payload = {
                ...data,
                _version: Date.now() // Simple timestamp versioning
            };

            await setDoc(ref, payload);

            // Also update global settings version if needed
            await setDoc(doc(firestore, "settings", "config"), {
                dataVersion: Date.now(),
                updatedBy: "admin"
            });

            setOriginalData(payload as T);
            setData(payload as T);
            setSaveResult("success");
            setLastSaved(new Date());

            // Clear result after 5s
            setTimeout(() => setSaveResult(null), 5000);

        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error(`Content save failed: ${getErrorMessage(error)}`));
            setSaveResult("error");
            setError(getErrorMessage(error));
        } finally {
            setSaving(false);
        }
    };

    const reset = () => {
        setData(originalData);
        setSaveResult(null);
    };

    return {
        data, loading, error,
        isDirty, saving, saveResult, lastSaved,
        handleChange, handleNestedChange, handleSave, reset
    };
}
