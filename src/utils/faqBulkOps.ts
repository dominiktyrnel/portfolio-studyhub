/**
 * FAQ Bulk Operations Utilities - P.8.1 & P.8.2
 * 
 * Professional bulk operations for FAQ management.
 * Import these into StudyFAQEditor.tsx
 */

import { doc, setDoc, Timestamp } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import type { FAQItem } from '../types/study-db';
import toast from 'react-hot-toast';
import { getErrorMessage } from './errorHelpers';
import { logger } from './logger';

export interface FAQItemWithId extends FAQItem {
    id: string;
}

/**
 * Publish all draft FAQ items
 * P.8.1 - Professional implementation with progress feedback
 */
export async function publishAllDrafts(
    db: Firestore,
    items: FAQItemWithId[]
): Promise<void> {
    const draftItems = items.filter(item => !item.published);

    if (draftItems.length === 0) {
        toast.error('Žádné draft položky k publikování');
        return;
    }

    const confirmed = window.confirm(
        `Opravdu chcete publikovat ${draftItems.length} draft FAQ položek?`
    );
    if (!confirmed) return;

    let successCount = 0;
    let errorCount = 0;

    for (const item of draftItems) {
        try {
            await setDoc(doc(db, 'faq_items', item.id), {
                ...item,
                published: true,
                updatedAt: Timestamp.now()
            });
            successCount++;
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error(`FAQ Bulk Publish failed: ${getErrorMessage(error)}`));
            toast.error('Chyba při hromadném publikování: ' + getErrorMessage(error));
            errorCount++;
        }
    }

    if (errorCount === 0) {
        toast.success(`✅ Publikováno ${successCount} FAQ položek`);
    } else {
        toast.error(`Publikováno: ${successCount}, Chyby: ${errorCount}`);
    }
}

/**
 * Archive FAQ items older than 6 months
 * P.8.2 - Professional implementation
 */
export async function archiveOldFAQs(
    db: Firestore,
    items: FAQItemWithId[]
): Promise<void> {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const oldItems = items.filter(item => {
        if (!item.updatedAt) return false;
        const itemDate = item.updatedAt.toDate();
        return itemDate < sixMonthsAgo;
    });

    if (oldItems.length === 0) {
        toast.error('Žádné staré položky k archivaci');
        return;
    }

    const confirmed = window.confirm(
        `Opravdu chcete archivovat ${oldItems.length} starých FAQ položek (starší než 6 měsíců)?`
    );
    if (!confirmed) return;

    let successCount = 0;
    let errorCount = 0;

    for (const item of oldItems) {
        try {
            await setDoc(doc(db, 'faq_items', item.id), {
                ...item,
                published: false,
                tags: [...(item.tags || []), 'archived'],
                updatedAt: Timestamp.now()
            });
            successCount++;
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error(`FAQ Bulk Archive failed: ${getErrorMessage(error)}`));
            toast.error('Chyba při archivaci starých FAQ: ' + getErrorMessage(error));
            errorCount++;
        }
    }

    if (errorCount === 0) {
        toast.success(`✅ Archivováno ${successCount} FAQ položek`);
    } else {
        toast.error(`Archivováno: ${successCount}, Chyby: ${errorCount}`);
    }
}
