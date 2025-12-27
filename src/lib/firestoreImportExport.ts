import {
    collection,
    getDocs,
    doc,
    writeBatch,
    Timestamp,
    type Firestore,
    type DocumentData
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Firestore Import/Export Utilities
 * Handles JSON import/export for Study Hub collections
 */

// Helper to get db and throw if not initialized
function getDb(): Firestore {
    if (!db) {
        throw new Error('Firestore is not initialized. Check Firebase configuration.');
    }
    return db;
}

// ==================== TYPES ====================

export interface ImportResult {
    success: boolean;
    docsWritten: number;
    errors: string[];
}

export interface ExportData {
    [docId: string]: DocumentData;
}

// ==================== TIMESTAMP CONVERSION ====================

/**
 * Convert Firestore Timestamp to JSON-serializable format
 */
function firestoreToJSON(value: unknown): unknown {
    if (value instanceof Timestamp) {
        return {
            __datatype__: 'timestamp',
            value: {
                _seconds: value.seconds,
                _nanoseconds: value.nanoseconds
            }
        };
    }

    if (value instanceof Date) {
        return value.toISOString();
    }

    if (Array.isArray(value)) {
        return value.map(firestoreToJSON);
    }

    if (value && typeof value === 'object') {
        const result: Record<string, unknown> = {};
        for (const [key, val] of Object.entries(value)) {
            result[key] = firestoreToJSON(val);
        }
        return result;
    }

    return value;
}

/**
 * Convert JSON format back to Firestore types
 */
function jsonToFirestore(value: unknown): unknown {
    if (!value || typeof value !== 'object') return value;

    // Check for timestamp format
    if ('__datatype__' in value && (value as Record<string, unknown>).__datatype__ === 'timestamp') {
        const tsValue = (value as Record<string, { _seconds: number; _nanoseconds: number }>).value;
        return new Timestamp(tsValue._seconds, tsValue._nanoseconds);
    }

    // Check for ISO date string
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
        return Timestamp.fromDate(new Date(value));
    }

    if (Array.isArray(value)) {
        return value.map(jsonToFirestore);
    }

    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
        result[key] = jsonToFirestore(val);
    }
    return result;
}

// ==================== EXPORT ====================

/**
 * Export entire collection as JSON
 */
export async function exportCollection(collectionName: string): Promise<ExportData> {
    const database = getDb();
    const collectionRef = collection(database, collectionName);
    const snapshot = await getDocs(collectionRef);

    const exportData: ExportData = {};

    snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        exportData[docSnap.id] = firestoreToJSON(data) as DocumentData;
    });

    return exportData;
}

/**
 * Download JSON data as file
 */
export function downloadJSON(data: ExportData, filename: string): void {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

/**
 * Export collection and trigger download
 */
export async function exportAndDownload(collectionName: string): Promise<void> {
    const data = await exportCollection(collectionName);
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${collectionName}_${timestamp}.json`;
    downloadJSON(data, filename);
}

// ==================== IMPORT ====================

/**
 * Validate JSON structure for import
 */
export function validateImportJSON(data: unknown, collectionName: string): { valid: boolean; error?: string } {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return { valid: false, error: 'JSON must be an object with document IDs as keys' };
    }

    const entries = Object.entries(data);
    if (entries.length === 0) {
        return { valid: false, error: 'JSON contains no documents' };
    }

    // Basic validation for known collections
    for (const [docId, docData] of entries) {
        if (!docData || typeof docData !== 'object') {
            return { valid: false, error: `Document ${docId} has invalid data` };
        }

        // Collection-specific validation
        if (collectionName === 'faq_items') {
            const required = ['kr', 'en', 'category', 'published'];
            for (const field of required) {
                if (!(field in docData)) {
                    return { valid: false, error: `Document ${docId} missing required field: ${field}` };
                }
            }
        }

        if (collectionName === 'daily_stats') {
            const required = ['dayKey', 'totalMinutes', 'focusMinutes'];
            for (const field of required) {
                if (!(field in docData)) {
                    return { valid: false, error: `Document ${docId} missing required field: ${field}` };
                }
            }
        }

        if (collectionName === 'study_plan') {
            if (!('months' in docData)) {
                return { valid: false, error: `Document ${docId} missing required field: months` };
            }
        }

        if (collectionName === 'study_sessions') {
            const required = ['source', 'minutes', 'startedAt'];
            for (const field of required) {
                if (!(field in docData)) {
                    return { valid: false, error: `Document ${docId} missing required field: ${field}` };
                }
            }
        }
    }

    return { valid: true };
}

/**
 * Import JSON data to Firestore collection
 * Uses batch write for better performance (max 500 docs per batch)
 */
export async function importCollection(
    collectionName: string,
    data: ExportData,
    onProgress?: (current: number, total: number) => void
): Promise<ImportResult> {
    const database = getDb();

    const result: ImportResult = {
        success: true,
        docsWritten: 0,
        errors: []
    };

    const entries = Object.entries(data);
    const BATCH_SIZE = 500;

    try {
        for (let i = 0; i < entries.length; i += BATCH_SIZE) {
            const batch = writeBatch(database);
            const batchEntries = entries.slice(i, i + BATCH_SIZE);

            for (const [docId, docData] of batchEntries) {
                try {
                    const docRef = doc(database, collectionName, docId);
                    const convertedData = jsonToFirestore(docData) as DocumentData;
                    batch.set(docRef, convertedData);
                } catch (error) {
                    result.errors.push(`Failed to prepare doc ${docId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
                }
            }

            await batch.commit();
            result.docsWritten += batchEntries.length;

            if (onProgress) {
                onProgress(result.docsWritten, entries.length);
            }
        }
    } catch (error) {
        result.success = false;
        result.errors.push(`Batch write failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
}

/**
 * Parse uploaded file as JSON
 */
export async function parseJSONFile(file: File): Promise<ExportData> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const json = JSON.parse(text);
                resolve(json);
            } catch {
                reject(new Error('Invalid JSON file'));
            }
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}
