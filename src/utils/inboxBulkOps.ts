/**
 * Inbox Bulk Operations Utilities - P.8.4, P.8.5, P.8.6
 * 
 * Professional inbox management with multi-select, bulk archive, and CSV export.
 */

import { doc, setDoc, Timestamp } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import type { InboxQuestion } from '../types/study-db';
import toast from 'react-hot-toast';
import { getErrorMessage } from './errorHelpers';
import { logger } from './logger';

export interface InboxQuestionWithId extends InboxQuestion {
    id: string;
}

/**
 * Bulk archive selected inbox items
 * P.8.5 - Professional implementation
 */
export async function bulkArchive(
    db: Firestore,
    selectedIds: string[],
    questions: InboxQuestionWithId[]
): Promise<void> {
    if (selectedIds.length === 0) {
        toast.error('Nevybrány žádné položky');
        return;
    }

    const confirmed = window.confirm(
        `Opravdu chcete archivovat ${selectedIds.length} otázek?`
    );
    if (!confirmed) return;

    let successCount = 0;
    let errorCount = 0;

    for (const id of selectedIds) {
        const question = questions.find(q => q.id === id);
        if (!question) continue;

        try {
            await setDoc(doc(db, 'inbox_questions', id), {
                ...question,
                status: 'ARCHIVED' as const,
                updatedAt: Timestamp.now()
            });
            successCount++;
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error(`Inbox Bulk Archive failed: ${getErrorMessage(error)}`));
            toast.error('Chyba při archivaci: ' + getErrorMessage(error));
            errorCount++;
        }
    }

    if (errorCount === 0) {
        toast.success(`✅ Archivováno ${successCount} otázek`);
    } else {
        toast.error(`Archivováno: ${successCount}, Chyby: ${errorCount}`);
    }
}

/**
 * Export inbox questions to CSV
 * P.8.6 - Professional CSV export with proper escaping
 */
export function exportToCSV(questions: InboxQuestionWithId[]): void {
    if (questions.length === 0) {
        toast.error('Žádné otázky k exportu');
        return;
    }

    // CSV Header
    const headers = [
        'ID',
        'Jméno',
        'Email',
        'Otázka',
        'Odpověď',
        'Status',
        'Vytvořeno',
        'Změněno'
    ];

    // CSV Rows
    const rows = questions.map(q => [
        q.id,
        escapeCsv(q.contactName || ''),
        escapeCsv(q.contactInfo || ''),
        escapeCsv(q.question),
        escapeCsv(q.adminAnswer || ''),
        q.status,
        q.createdAt?.toDate().toLocaleString('cs-CZ') || '',
        q.updatedAt?.toDate().toLocaleString('cs-CZ') || ''
    ]);

    // Combine
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    // Download
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `inbox_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`✅ Exportováno ${questions.length} otázek`);
}

/**
 * Escape CSV field value
 */
function escapeCsv(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}
