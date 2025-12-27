/**
 * Study Plan Template Utilities - P.8.7, P.8.8, P.8.9
 * 
 * Professional plan management with duplicate month, export, and import.
 */

import type { StudyPlan, MonthPlan } from '../types/study-db';
import toast from 'react-hot-toast';
import { getErrorMessage } from './errorHelpers';
import { logger } from './logger';

/**
 * Duplicate a month in the study plan
 * P.8.7 - Creates deep copy with new monthKey
 */
export function duplicateMonth(
    plan: StudyPlan,
    monthIndex: number
): StudyPlan {
    if (monthIndex < 0 || monthIndex >= plan.months.length) {
        toast.error('Neplatný index měsíce');
        return plan;
    }

    const sourceMonth = plan.months[monthIndex];

    // Generate new monthKey
    const baseKey = sourceMonth.monthKey.replace(/-copy(-\d+)?$/, '');
    const existingCopies = plan.months.filter(m =>
        m.monthKey.startsWith(baseKey + '-copy')
    ).length;
    const newKey = `${baseKey}-copy${existingCopies > 0 ? `-${existingCopies + 1}` : ''}`;

    // Deep clone month
    const newMonth: MonthPlan = {
        monthKey: newKey,
        titleKR: `${sourceMonth.titleKR} (Kopie)`,
        titleEN: `${sourceMonth.titleEN} (Copy)`,
        goalKR: sourceMonth.goalKR,
        goalEN: sourceMonth.goalEN,
        items: sourceMonth.items.map(item => ({ ...item }))
    };

    // Insert after source month
    const newMonths = [...plan.months];
    newMonths.splice(monthIndex + 1, 0, newMonth);

    toast.success('✅ Měsíc zkopírován');

    return {
        ...plan,
        months: newMonths
    };
}

/**
 * Export study plan to JSON
 * P.8.8 - Download plan as JSON file
 */
export function exportPlan(plan: StudyPlan): void {
    const jsonString = JSON.stringify(plan, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `study_plan_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('✅ Plán exportován');
}

/**
 * Import study plan from JSON file
 * P.8.9 - Parse and validate imported plan
 */
export function importPlan(
    file: File,
    onSuccess: (plan: StudyPlan) => void
): void {
    const reader = new FileReader();

    reader.onload = (e) => {
        try {
            const content = e.target?.result as string;
            const importedPlan = JSON.parse(content) as StudyPlan;

            // Basic validation
            if (!importedPlan.months || !Array.isArray(importedPlan.months)) {
                throw new Error('Invalid plan format: missing months array');
            }

            // Validate each month
            for (const month of importedPlan.months) {
                if (!month.monthKey || !month.titleKR || !month.titleEN) {
                    throw new Error('Invalid month format: missing required fields');
                }
            }

            onSuccess(importedPlan);
            toast.success('✅ Plán importován');
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error(`PlanTemplates error: ${getErrorMessage(error)}`));
            toast.error(`Chyba při importu: ${getErrorMessage(error)}`);
        }
    };

    reader.onerror = () => {
        toast.error('Chyba při čtení souboru');
    };

    reader.readAsText(file);
}
