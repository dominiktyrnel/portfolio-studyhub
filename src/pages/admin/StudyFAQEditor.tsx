import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Search, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';
import type { FAQItem, FAQCategory } from '../../types/study-db';
import { FAQ_CATEGORIES } from '../../types/study-db';
import toast from 'react-hot-toast';
import { publishAllDrafts, archiveOldFAQs } from '../../utils/faqBulkOps';
import { getErrorMessage } from '../../utils/errorHelpers';
import { logger } from '../../utils/logger';

type FilterMode = 'all' | 'published' | 'draft';

export function StudyFAQEditor() {
    const [items, setItems] = useState<(FAQItem & { id: string })[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterMode, setFilterMode] = useState<FilterMode>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const [formData, setFormData] = useState<Omit<FAQItem, 'createdAt' | 'updatedAt'>>({
        schemaVersion: 1,
        published: false,
        category: 'other',
        tags: [],
        order: 0,
        kr: { title: '', perex: '', body: '' },
        en: { title: '', perex: '', body: '' }
    });

    useEffect(() => {
        if (!db) {
            setLoading(false);
            return;
        }

        const q = query(collection(db, 'faq_items'), orderBy('order'));
        const unsub = onSnapshot(q, (snap) => {
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as FAQItem & { id: string }));
            setItems(data);
            setLoading(false);
        }, (err) => {
            logger.error(err instanceof Error ? err : new Error(`FAQ fetch error: ${getErrorMessage(err)}`));
            toast.error('Chyba při načítání FAQ');
            setLoading(false);
        });

        return () => unsub();
    }, []);

    const filteredItems = items
        .filter(item => {
            if (filterMode === 'published') return item.published;
            if (filterMode === 'draft') return !item.published;
            return true;
        })
        .filter(item => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return (
                item.kr.title.toLowerCase().includes(query) ||
                item.en.title.toLowerCase().includes(query) ||
                item.kr.body.toLowerCase().includes(query) ||
                item.en.body.toLowerCase().includes(query)
            );
        });

    const handleSave = async () => {
        if (!db || !formData.kr.title || !formData.en.title) {
            toast.error('Vyplňte alespoň titulky v obou jazycích');
            return;
        }

        try {
            // eslint-disable-next-line react-hooks/purity -- Date.now() for unique ID generation is safe
            const id = editingId || `faq_${Date.now()} `;
            const now = Timestamp.now();

            await setDoc(doc(db, 'faq_items', id), {
                ...formData,
                createdAt: editingId ? items.find(i => i.id === id)?.createdAt || now : now,
                updatedAt: now
            });

            toast.success(editingId ? 'FAQ upraveno ✅' : 'FAQ vytvořeno ✅');
            setIsModalOpen(false);
            resetForm();
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error(`FAQ save failed: ${getErrorMessage(error)}`));
            toast.error('Chyba při ukládání: ' + getErrorMessage(error));
        }
    };

    const handleDelete = async (id: string) => {
        if (!db) return;

        try {
            await deleteDoc(doc(db, 'faq_items', id));
            toast.success('FAQ smazáno');
            setDeleteConfirm(null);
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error(`FAQ delete failed: ${getErrorMessage(error)}`));
            toast.error('Delete failed: ' + getErrorMessage(error));
        }
    };

    const togglePublish = async (item: FAQItem & { id: string }) => {
        if (!db) return;

        try {
            await setDoc(doc(db, 'faq_items', item.id), {
                ...item,
                published: !item.published,
                updatedAt: Timestamp.now()
            });
            toast.success(item.published ? 'FAQ skryto' : 'FAQ publikováno');
        } catch (error: unknown) {
            logger.error(error instanceof Error ? error : new Error(`FAQ reorder/publish error: ${getErrorMessage(error)}`));
            toast.error('Chyba při přeřazení: ' + getErrorMessage(error));
        }
    };

    const openEdit = (item: FAQItem & { id: string }) => {
        setEditingId(item.id);
        setFormData({
            schemaVersion: item.schemaVersion,
            published: item.published,
            category: item.category,
            tags: item.tags,
            order: item.order,
            kr: { ...item.kr },
            en: { ...item.en }
        });
        setIsModalOpen(true);
    };

    const openNew = () => {
        setEditingId(null);
        const maxOrder = items.length > 0 ? Math.max(...items.map(i => i.order)) : 0;
        resetForm();
        setFormData(prev => ({ ...prev, order: maxOrder + 1 }));
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            schemaVersion: 1,
            published: false,
            category: 'other',
            tags: [],
            order: 0,
            kr: { title: '', perex: '', body: '' },
            en: { title: '', perex: '', body: '' }
        });
    };

    if (loading) {
        return (
            <AdminLayout title="FAQ Editor">
                <div className="p-12 text-center text-admin-sub">Načítání...</div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout
            title="FAQ Editor"
            actions={
                <div className="flex gap-2">
                    <button
                        onClick={() => db && publishAllDrafts(db, items)}
                        className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                        📤 Publikovat drafty
                    </button>
                    <button
                        onClick={() => db && archiveOldFAQs(db, items)}
                        className="flex items-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                    >
                        📦 Archivovat staré
                    </button>
                    <button
                        onClick={openNew}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={20} />
                        Nová FAQ
                    </button>
                </div>
            }
        >
            <div className="p-6 space-y-4">
                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-sub" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Hledat v FAQ..."
                            className="w-full pl-10 pr-4 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterMode('all')}
                            className={`px - 4 py - 2 rounded - lg transition - colors ${filterMode === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-admin-bg border border-admin-border text-admin-sub hover:text-admin-text'
                                } `}
                        >
                            Vše ({items.length})
                        </button>
                        <button
                            onClick={() => setFilterMode('published')}
                            className={`px - 4 py - 2 rounded - lg transition - colors ${filterMode === 'published'
                                ? 'bg-green-600 text-white'
                                : 'bg-admin-bg border border-admin-border text-admin-sub hover:text-admin-text'
                                } `}
                        >
                            Publikováno ({items.filter(i => i.published).length})
                        </button>
                        <button
                            onClick={() => setFilterMode('draft')}
                            className={`px - 4 py - 2 rounded - lg transition - colors ${filterMode === 'draft'
                                ? 'bg-orange-600 text-white'
                                : 'bg-admin-bg border border-admin-border text-admin-sub hover:text-admin-text'
                                } `}
                        >
                            Koncepty ({items.filter(i => !i.published).length})
                        </button>
                    </div>
                </div>

                {/* FAQ List */}
                {filteredItems.length === 0 ? (
                    <div className="text-center py-12 text-admin-sub">
                        {searchQuery ? 'Žádné výsledky' : 'Zatím žádné FAQ'}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 bg-admin-surface border border-admin-border rounded-lg hover:border-blue-500/50 transition-colors group"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px - 2 py - 0.5 rounded text - xs font - bold ${item.published
                                                ? 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400'
                                                : 'bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400'
                                                } `}>
                                                {item.published ? 'Publikováno' : 'Koncept'}
                                            </span>
                                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-admin-border text-admin-sub">
                                                {FAQ_CATEGORIES.find(c => c.value === item.category)?.labelEN || item.category}
                                            </span>
                                            <span className="text-xs text-admin-sub font-mono">#{item.order}</span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            <div>
                                                <span className="text-xs text-admin-sub">🇰🇷 Korean:</span>
                                                <p className="font-semibold text-admin-text truncate">{item.kr.title}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-admin-sub">🇬🇧 English:</span>
                                                <p className="font-semibold text-admin-text truncate">{item.en.title}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => togglePublish(item)}
                                            className={`p - 2 rounded - lg transition - colors ${item.published
                                                ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20'
                                                : 'text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20'
                                                } `}
                                            title={item.published ? 'Skrýt' : 'Publikovat'}
                                        >
                                            {item.published ? <Eye size={18} /> : <EyeOff size={18} />}
                                        </button>
                                        <button
                                            onClick={() => openEdit(item)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-colors"
                                            title="Upravit"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirm(item.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                                            title="Smazat"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-admin-surface rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-admin-sidebar px-6 py-4 border-b border-admin-border flex justify-between items-center">
                            <h3 className="font-bold text-admin-text text-lg">
                                {editingId ? 'Upravit FAQ' : 'Nová FAQ'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-admin-sub hover:text-admin-text transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Basic Settings */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-admin-text mb-2">Kategorie</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value as FAQCategory })}
                                        className="w-full px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {FAQ_CATEGORIES.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.labelEN}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-admin-text mb-2">Pořadí</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex items-end">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.published}
                                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                            className="w-5 h-5 rounded border-admin-border"
                                        />
                                        <span className="text-sm font-medium text-admin-text">Publikovat</span>
                                    </label>
                                </div>
                            </div>

                            {/* Korean Content */}
                            <div className="space-y-3 p-4 bg-admin-bg rounded-lg border border-admin-border">
                                <h4 className="font-semibold text-admin-text flex items-center gap-2">
                                    🇰🇷 Korejská verze
                                </h4>
                                <div>
                                    <label className="block text-xs font-medium text-admin-sub mb-1">Otázka *</label>
                                    <input
                                        type="text"
                                        value={formData.kr.title}
                                        onChange={(e) => setFormData({ ...formData, kr: { ...formData.kr, title: e.target.value } })}
                                        className="w-full px-3 py-2 bg-admin-surface border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="예: 언제 스트리밍하시나요?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-admin-sub mb-1">Krátká odpověď</label>
                                    <input
                                        type="text"
                                        value={formData.kr.perex || ''}
                                        onChange={(e) => setFormData({ ...formData, kr: { ...formData.kr, perex: e.target.value } })}
                                        className="w-full px-3 py-2 bg-admin-surface border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-admin-sub mb-1">Plná odpověď (Markdown)</label>
                                    <textarea
                                        value={formData.kr.body}
                                        onChange={(e) => setFormData({ ...formData, kr: { ...formData.kr, body: e.target.value } })}
                                        className="w-full px-3 py-2 bg-admin-surface border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                        rows={4}
                                    />
                                </div>
                            </div>

                            {/* English Content */}
                            <div className="space-y-3 p-4 bg-admin-bg rounded-lg border border-admin-border">
                                <h4 className="font-semibold text-admin-text flex items-center gap-2">
                                    🇬🇧 Anglická verze
                                </h4>
                                <div>
                                    <label className="block text-xs font-medium text-admin-sub mb-1">Question *</label>
                                    <input
                                        type="text"
                                        value={formData.en.title}
                                        onChange={(e) => setFormData({ ...formData, en: { ...formData.en, title: e.target.value } })}
                                        className="w-full px-3 py-2 bg-admin-surface border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g. When do you stream?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-admin-sub mb-1">Short answer</label>
                                    <input
                                        type="text"
                                        value={formData.en.perex || ''}
                                        onChange={(e) => setFormData({ ...formData, en: { ...formData.en, perex: e.target.value } })}
                                        className="w-full px-3 py-2 bg-admin-surface border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-admin-sub mb-1">Full answer (Markdown)</label>
                                    <textarea
                                        value={formData.en.body}
                                        onChange={(e) => setFormData({ ...formData, en: { ...formData.en, body: e.target.value } })}
                                        className="w-full px-3 py-2 bg-admin-surface border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                        rows={4}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-admin-sidebar px-6 py-4 border-t border-admin-border flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-admin-sub hover:text-admin-text transition-colors"
                            >
                                Zrušit
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Uložit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-admin-surface rounded-xl shadow-2xl p-6 max-w-md">
                        <h3 className="font-bold text-admin-text text-lg mb-3">Smazat FAQ?</h3>
                        <p className="text-admin-sub mb-6">Tato akce je nevratná.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-4 py-2 text-admin-sub hover:text-admin-text transition-colors"
                            >
                                Zrušit
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Smazat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
