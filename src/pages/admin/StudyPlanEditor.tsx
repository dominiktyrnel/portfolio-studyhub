import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Plus, Edit, Trash, Save, X, ChevronDown, ChevronRight, GripVertical, Copy, Download, Upload } from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';
import type { StudyPlan, MonthPlan, PlanItem, StudyPlanStatus, KoreanStudyPlan } from '../../types/study-db';
import toast from 'react-hot-toast';
import { duplicateMonth, exportPlan, importPlan } from '../../utils/planTemplates';
import { logger } from '../../utils/logger';

/**
 * StudyPlanEditor - Professional Implementation
 * 
 * Manages the single-document study plan at `study_plan/current`
 * Schema: StudyPlan { months: MonthPlan[] }
 * Each MonthPlan contains: monthKey, titles (KR/EN), goals, and PlanItem[]
 */
export function StudyPlanEditor() {
    const [plan, setPlan] = useState<StudyPlan | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

    // Modal state for editing months
    const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
    const [editingMonthIndex, setEditingMonthIndex] = useState<number | null>(null);
    const [monthFormData, setMonthFormData] = useState<Partial<MonthPlan>>({});

    // Modal state for editing plan items
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<{ monthIndex: number; itemIndex: number | null }>({ monthIndex: -1, itemIndex: null });
    const [itemFormData, setItemFormData] = useState<Partial<PlanItem>>({});

    // Load study plan from Firestore
    useEffect(() => {
        loadPlan();
    }, []);

    const loadPlan = async () => {
        if (!db) {
            toast.error('Database not initialized');
            setLoading(false);
            return;
        }

        try {
            const docRef = doc(db, 'study_plan', 'current');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setPlan(docSnap.data() as StudyPlan);
            } else {
                // Initialize empty plan
                const emptyPlan: StudyPlan = {
                    schemaVersion: 1,
                    updatedAt: Timestamp.now(),
                    months: []
                };
                setPlan(emptyPlan);
            }
            setLoading(false);
        } catch (error) {
            logger.error(error instanceof Error ? error : new Error('Error loading study plan'));
            toast.error('Failed to load study plan');
            setLoading(false);
        }
    };

    const savePlan = async (updatedPlan: StudyPlan) => {
        if (!db) return;

        setSaving(true);
        try {
            const docRef = doc(db, 'study_plan', 'current');
            await setDoc(docRef, {
                ...updatedPlan,
                updatedAt: Timestamp.now()
            });
            setPlan(updatedPlan);
            toast.success('Study plan saved ✅');
        } catch (error) {
            logger.error(error instanceof Error ? error : new Error('Error saving study plan'));
            toast.error('Failed to save study plan');
        } finally {
            setSaving(false);
        }
    };

    // P.8 Template Operations Handlers
    const handleDuplicateMonth = (monthIndex: number) => {
        if (!plan) return;
        const updatedPlan = duplicateMonth(plan, monthIndex);
        savePlan(updatedPlan);
    };

    const handleExportPlan = () => {
        if (!plan) return;
        exportPlan(plan);
    };

    const handleImportPlan = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !plan) return;
        importPlan(file, (importedPlan) => {
            savePlan(importedPlan);
        });
    };

    // Import Korean Plan with vocabulary data
    const handleImportKoreanPlan = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !plan) return;

        setSaving(true);
        try {
            const text = await file.text();
            const data = JSON.parse(text);

            // Check if it's the koreanPlan format
            let koreanPlan: KoreanStudyPlan;
            if (data.koreanPlan) {
                koreanPlan = data.koreanPlan;
            } else if (data.titleKR && data.monthsData) {
                koreanPlan = data;
            } else {
                throw new Error('Neplatný formát Korean Plan');
            }

            const updatedPlan: StudyPlan = {
                ...plan,
                schemaVersion: 2,
                koreanPlan: koreanPlan,
                updatedAt: Timestamp.now()
            };

            await savePlan(updatedPlan);

            const totalVocab = koreanPlan.monthsData.reduce((sum, m) =>
                sum + m.days.reduce((dsum, d) => dsum + d.vocab.length, 0), 0);

            toast.success(`Korean Plan importován! ${koreanPlan.monthsData.length} měsíců, ${totalVocab} slovíček ✅`);
        } catch (error) {
            logger.error(error instanceof Error ? error : new Error('Error importing Korean Plan'));
            toast.error('Import Korean Plan selhal');
        } finally {
            setSaving(false);
            // Reset file input
            event.target.value = '';
        }
    };

    // Month CRUD operations
    const openNewMonth = () => {
        setEditingMonthIndex(null);
        setMonthFormData({
            monthKey: '',
            titleKR: '',
            titleEN: '',
            goalKR: '',
            goalEN: '',
            items: []
        });
        setIsMonthModalOpen(true);
    };

    const openEditMonth = (index: number) => {
        setEditingMonthIndex(index);
        setMonthFormData(plan!.months[index]);
        setIsMonthModalOpen(true);
    };

    const saveMonth = () => {
        if (!plan || !monthFormData.monthKey || !monthFormData.titleKR || !monthFormData.titleEN) {
            toast.error('Please fill required fields');
            return;
        }

        const newMonth: MonthPlan = {
            monthKey: monthFormData.monthKey,
            titleKR: monthFormData.titleKR,
            titleEN: monthFormData.titleEN,
            goalKR: monthFormData.goalKR || '',
            goalEN: monthFormData.goalEN || '',
            items: monthFormData.items || []
        };

        const updatedMonths = [...plan.months];
        if (editingMonthIndex !== null) {
            // Edit existing month
            updatedMonths[editingMonthIndex] = newMonth;
        } else {
            // Add new month
            updatedMonths.push(newMonth);
        }

        savePlan({ ...plan, months: updatedMonths });
        setIsMonthModalOpen(false);
    };

    const deleteMonth = (index: number) => {
        if (!plan || !confirm('Delete this month?')) return;

        const updatedMonths = plan.months.filter((_, i) => i !== index);
        savePlan({ ...plan, months: updatedMonths });
    };

    // Plan Item CRUD operations
    const openNewItem = (monthIndex: number) => {
        setEditingItem({ monthIndex, itemIndex: null });
        const existingItems = plan!.months[monthIndex].items;
        const maxOrder = existingItems.length > 0 ? Math.max(...existingItems.map(i => i.order)) : 0;

        setItemFormData({
            id: `item_${Date.now()}`,
            textKR: '',
            textEN: '',
            status: 'planned',
            order: maxOrder + 1
        });
        setIsItemModalOpen(true);
    };

    const openEditItem = (monthIndex: number, itemIndex: number) => {
        setEditingItem({ monthIndex, itemIndex });
        setItemFormData(plan!.months[monthIndex].items[itemIndex]);
        setIsItemModalOpen(true);
    };

    const saveItem = () => {
        if (!plan || editingItem.monthIndex === -1 || !itemFormData.textKR || !itemFormData.textEN) {
            toast.error('Please fill required fields');
            return;
        }

        const newItem: PlanItem = {
            id: itemFormData.id || `item_${Date.now()}`,
            textKR: itemFormData.textKR,
            textEN: itemFormData.textEN,
            status: itemFormData.status || 'planned',
            order: itemFormData.order || 0
        };

        const updatedMonths = [...plan.months];
        const monthItems = [...updatedMonths[editingItem.monthIndex].items];

        if (editingItem.itemIndex !== null) {
            // Edit existing item
            monthItems[editingItem.itemIndex] = newItem;
        } else {
            // Add new item
            monthItems.push(newItem);
        }

        updatedMonths[editingItem.monthIndex] = {
            ...updatedMonths[editingItem.monthIndex],
            items: monthItems.sort((a, b) => a.order - b.order)
        };

        savePlan({ ...plan, months: updatedMonths });
        setIsItemModalOpen(false);
    };

    const deleteItem = (monthIndex: number, itemIndex: number) => {
        if (!plan || !confirm('Delete this item?')) return;

        const updatedMonths = [...plan.months];
        updatedMonths[monthIndex] = {
            ...updatedMonths[monthIndex],
            items: updatedMonths[monthIndex].items.filter((_, i) => i !== itemIndex)
        };

        savePlan({ ...plan, months: updatedMonths });
    };

    const toggleMonthExpand = (monthKey: string) => {
        const newExpanded = new Set(expandedMonths);
        if (newExpanded.has(monthKey)) {
            newExpanded.delete(monthKey);
        } else {
            newExpanded.add(monthKey);
        }
        setExpandedMonths(newExpanded);
    };

    if (loading) {
        return (
            <AdminLayout title="Study Plan Editor">
                <div className="flex items-center justify-center h-64">
                    <div className="text-admin-sub">Loading study plan...</div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Editor plánu">
            <div className="max-w-5xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-admin-text">Editor plánu studia</h1>
                        <p className="text-admin-sub mt-1">Správa měsíců a cílů učení</p>
                    </div>
                    <div className="flex gap-2 flex-wrap justify-end">
                        <button
                            onClick={handleExportPlan}
                            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm transition-colors"
                        >
                            <Download size={16} />
                            Export
                        </button>
                        <label className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm cursor-pointer transition-colors">
                            <Upload size={16} />
                            Import
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleImportPlan}
                                className="hidden"
                            />
                        </label>
                        <label className="flex items-center gap-2 px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm cursor-pointer transition-colors">
                            <Upload size={16} />
                            🇰🇷 Korean Plan
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleImportKoreanPlan}
                                className="hidden"
                            />
                        </label>
                        <button
                            onClick={openNewMonth}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus size={20} />
                            Nový měsíc
                        </button>
                    </div>
                </div>

                {/* Korean Plan Status */}
                {plan?.koreanPlan && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-700/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-admin-text flex items-center gap-2">
                                    🇰🇷 {plan.koreanPlan.titleKR}
                                </h3>
                                <p className="text-sm text-admin-sub mt-1">
                                    {plan.koreanPlan.monthsData.length} měsíců • {' '}
                                    {plan.koreanPlan.monthsData.reduce((sum, m) =>
                                        sum + m.days.reduce((dsum, d) => dsum + d.vocab.length, 0), 0)} slovíček
                                </p>
                            </div>
                            <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded">
                                Nahráno ✓
                            </span>
                        </div>
                    </div>
                )}

                {/* Months List */}
                {plan && plan.months.length === 0 && (
                    <div className="text-center py-12 bg-admin-wash rounded-lg border-2 border-dashed border-admin-border">
                        <p className="text-admin-sub mb-4">No months created yet</p>
                        <button
                            onClick={openNewMonth}
                            className="text-blue-400 hover:text-blue-300 font-medium"
                        >
                            Create your first month →
                        </button>
                    </div>
                )}

                <div className="space-y-4">
                    {plan?.months.map((month, monthIndex) => {
                        const isExpanded = expandedMonths.has(month.monthKey);

                        return (
                            <div key={month.monthKey} className="bg-admin-card rounded-lg border border-admin-border shadow-xs">
                                {/* Month Header */}
                                <div className="p-4 flex items-center justify-between border-b border-admin-border">
                                    <div className="flex items-center gap-3 flex-1">
                                        <button
                                            onClick={() => toggleMonthExpand(month.monthKey)}
                                            className="p-1 hover:bg-admin-wash rounded transition-colors text-admin-sub"
                                        >
                                            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                        </button>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono text-admin-sub">{month.monthKey}</span>
                                                <h3 className="text-lg font-bold text-admin-text">{month.titleKR}</h3>
                                                <span className="text-sm text-admin-sub">/ {month.titleEN}</span>
                                            </div>
                                            {(month.goalKR || month.goalEN) && (
                                                <p className="text-sm text-admin-sub mt-1">
                                                    {month.goalKR} {month.goalEN && `/ ${month.goalEN}`}
                                                </p>
                                            )}
                                            <div className="text-xs text-admin-sub mt-1">
                                                {month.items.length} items
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => openEditMonth(monthIndex)}
                                            className="p-2 text-blue-400 hover:bg-blue-500/10 rounded transition-colors"
                                            title="Edit month"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDuplicateMonth(monthIndex)}
                                            className="p-2 text-green-400 hover:bg-green-500/10 rounded transition-colors"
                                            title="Duplicate month"
                                        >
                                            <Copy size={16} />
                                        </button>
                                        <button
                                            onClick={() => deleteMonth(monthIndex)}
                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                            title="Delete month"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Month Items (Expanded) */}
                                {isExpanded && (
                                    <div className="p-4 bg-admin-wash">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-admin-text">Plan Items</h4>
                                            <button
                                                onClick={() => openNewItem(monthIndex)}
                                                className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                            >
                                                <Plus size={14} />
                                                Add Item
                                            </button>
                                        </div>

                                        {month.items.length === 0 ? (
                                            <div className="text-center py-8 text-admin-sub text-sm">
                                                No items yet. Click "Add Item" to create one.
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                {month.items.map((item, itemIndex) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center gap-3 p-3 bg-admin-card rounded border border-admin-border hover:border-admin-border transition-colors"
                                                    >
                                                        <GripVertical size={16} className="text-admin-sub" />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <StatusBadge status={item.status} />
                                                                <span className="text-sm font-medium text-admin-text">{item.textKR}</span>
                                                            </div>
                                                            <div className="text-xs text-admin-sub mt-0.5">{item.textEN}</div>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={() => openEditItem(monthIndex, itemIndex)}
                                                                className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded transition-colors"
                                                            >
                                                                <Edit size={14} />
                                                            </button>
                                                            <button
                                                                onClick={() => deleteItem(monthIndex, itemIndex)}
                                                                className="p-1.5 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                                            >
                                                                <Trash size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Month Modal */}
                {isMonthModalOpen && (
                    <Modal
                        title={editingMonthIndex !== null ? 'Edit Month' : 'New Month'}
                        onClose={() => setIsMonthModalOpen(false)}
                        onSave={saveMonth}
                        saving={saving}
                    >
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-admin-sub mb-1">Month Key (YYYY-MM)</label>
                                <input
                                    type="text"
                                    value={monthFormData.monthKey || ''}
                                    onChange={(e) => setMonthFormData({ ...monthFormData, monthKey: e.target.value })}
                                    placeholder="2025-01"
                                    className="w-full px-3 py-2 border border-admin-border bg-admin-wash rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-admin-text placeholder:text-admin-sub"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-admin-sub mb-1">Title (Korean) *</label>
                                <input
                                    type="text"
                                    value={monthFormData.titleKR || ''}
                                    onChange={(e) => setMonthFormData({ ...monthFormData, titleKR: e.target.value })}
                                    placeholder="한국어 제목"
                                    className="w-full px-3 py-2 border border-admin-border bg-admin-wash rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-admin-text placeholder:text-admin-sub"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-admin-sub mb-1">Title (English) *</label>
                                <input
                                    type="text"
                                    value={monthFormData.titleEN || ''}
                                    onChange={(e) => setMonthFormData({ ...monthFormData, titleEN: e.target.value })}
                                    placeholder="English Title"
                                    className="w-full px-3 py-2 border border-admin-border bg-admin-wash rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-admin-text placeholder:text-admin-sub"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-admin-sub mb-1">Goal (Korean)</label>
                                <textarea
                                    value={monthFormData.goalKR || ''}
                                    onChange={(e) => setMonthFormData({ ...monthFormData, goalKR: e.target.value })}
                                    placeholder="목표 설명"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-admin-border bg-admin-wash rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-admin-text placeholder:text-admin-sub"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-admin-sub mb-1">Goal (English)</label>
                                <textarea
                                    value={monthFormData.goalEN || ''}
                                    onChange={(e) => setMonthFormData({ ...monthFormData, goalEN: e.target.value })}
                                    placeholder="Goal description"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-admin-border bg-admin-wash rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-admin-text placeholder:text-admin-sub"
                                />
                            </div>
                        </div>
                    </Modal>
                )}

                {/* Item Modal */}
                {isItemModalOpen && (
                    <Modal
                        title={editingItem.itemIndex !== null ? 'Edit Item' : 'New Item'}
                        onClose={() => setIsItemModalOpen(false)}
                        onSave={saveItem}
                        saving={saving}
                    >
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-admin-sub mb-1">Text (Korean) *</label>
                                <input
                                    type="text"
                                    value={itemFormData.textKR || ''}
                                    onChange={(e) => setItemFormData({ ...itemFormData, textKR: e.target.value })}
                                    placeholder="한국어 텍스트"
                                    className="w-full px-3 py-2 border border-admin-border bg-admin-wash rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-admin-text placeholder:text-admin-sub"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-admin-sub mb-1">Text (English) *</label>
                                <input
                                    type="text"
                                    value={itemFormData.textEN || ''}
                                    onChange={(e) => setItemFormData({ ...itemFormData, textEN: e.target.value })}
                                    placeholder="English text"
                                    className="w-full px-3 py-2 border border-admin-border bg-admin-wash rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-admin-text placeholder:text-admin-sub"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-admin-sub mb-2">Status</label>
                                <div className="flex gap-2">
                                    {(['planned', 'in-progress', 'completed'] as const).map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setItemFormData({ ...itemFormData, status })}
                                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${itemFormData.status === status
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-admin-wash text-admin-sub hover:bg-admin-wash/80'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-admin-sub mb-1">Order</label>
                                <input
                                    type="number"
                                    value={itemFormData.order || 0}
                                    onChange={(e) => setItemFormData({ ...itemFormData, order: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 border border-admin-border bg-admin-wash rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-admin-text"
                                />
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </AdminLayout>
    );
}

// Helper Components

function Modal({
    title,
    children,
    onClose,
    onSave,
    saving
}: {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    onSave: () => void;
    saving?: boolean;
}) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-admin-surface rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-admin-border">
                <div className="flex items-center justify-between p-6 border-b border-admin-border">
                    <h2 className="text-xl font-bold text-admin-text">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-admin-sub hover:text-admin-text hover:bg-admin-wash rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
                <div className="flex items-center justify-end gap-3 p-6 border-t border-admin-border bg-admin-wash">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-admin-sub hover:text-admin-text hover:bg-admin-card rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <Save size={16} />
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: StudyPlanStatus }) {
    const styles = {
        'planned': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
        'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        'completed': 'bg-green-500/20 text-green-400 border-green-500/30'
    };

    return (
        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase border ${styles[status]}`}>
            {status}
        </span>
    );
}

export default StudyPlanEditor;
