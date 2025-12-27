import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';

interface IntroSection {
    id: string;
    titleKR: string;
    titleEN: string;
    contentKR: string;
    contentEN: string;
    isFAQSection?: boolean;
}

const defaultSections: IntroSection[] = [
    { id: 'my-story', titleKR: '나의 이야기', titleEN: 'My Story', contentKR: '', contentEN: '' },
    { id: 'why-korea', titleKR: '왜 한국?', titleEN: 'Why Korea?', contentKR: '', contentEN: '' },
    { id: 'routine', titleKR: '현재 루틴', titleEN: 'My Routine', contentKR: '', contentEN: '' },
    { id: 'goals', titleKR: '목표와 로드맵', titleEN: 'Goals & Roadmap', contentKR: '', contentEN: '' },
    { id: 'progress', titleKR: '진행 상황', titleEN: 'Progress', contentKR: '', contentEN: '' },
    { id: 'preparation', titleKR: '한국 준비', titleEN: 'Preparing for Korea', contentKR: '', contentEN: '' },
    { id: 'work-skills', titleKR: '일/기술', titleEN: 'Work / Skills', contentKR: '', contentEN: '' },
    { id: 'faq-link', titleKR: 'FAQ', titleEN: 'FAQ', contentKR: '', contentEN: '', isFAQSection: true },
];

export function IntroductionEditor() {
    const [sections, setSections] = useState<IntroSection[]>(defaultSections);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!db) return;
            try {
                const docRef = doc(db, 'intro_content', 'current');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.sections && Array.isArray(data.sections)) {
                        setSections(data.sections);
                    }
                }
            } catch (error) {
                console.error('Error loading intro content:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        if (!db) return;
        setSaving(true);
        setMessage(null);
        try {
            const docRef = doc(db, 'intro_content', 'current');
            await setDoc(docRef, {
                sections,
                updatedAt: new Date().toISOString()
            });
            setMessage({ type: 'success', text: 'Ulozeno!' });
        } catch (error) {
            console.error('Error saving:', error);
            setMessage({ type: 'error', text: 'Chyba pri ukladani' });
        } finally {
            setSaving(false);
        }
    };

    const updateSection = (index: number, field: keyof IntroSection, value: string | boolean) => {
        const updated = [...sections];
        updated[index] = { ...updated[index], [field]: value };
        setSections(updated);
    };

    const addSection = () => {
        const newId = `section-${Date.now()}`;
        setSections([...sections, {
            id: newId,
            titleKR: 'Novy nadpis',
            titleEN: 'New Section',
            contentKR: '',
            contentEN: ''
        }]);
        setExpandedSection(newId);
    };

    const removeSection = (index: number) => {
        if (confirm('Opravdu smazat tuto sekci?')) {
            setSections(sections.filter((_, i) => i !== index));
        }
    };

    const moveSection = (index: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= sections.length) return;

        const updated = [...sections];
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        setSections(updated);
    };

    if (loading) {
        return (
            <AdminLayout title="Introduction Editor">
                <div className="p-8 text-center">Nacitam...</div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Introduction Editor">
            <div className="p-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Introduction Editor</h1>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        <Save size={18} />
                        {saving ? 'Ukladam...' : 'Ulozit'}
                    </button>
                </div>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {message.text}
                    </div>
                )}

                <div className="space-y-4">
                    {sections.map((section, index) => (
                        <div key={section.id} className="border border-admin-border rounded-lg bg-admin-card shadow-sm">
                            <div
                                className="flex items-center gap-2 p-4 cursor-pointer hover:bg-admin-wash"
                                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                            >
                                <GripVertical size={18} className="text-admin-sub" />
                                <div className="flex-1">
                                    <span className="font-medium text-admin-text">{section.titleKR}</span>
                                    <span className="text-admin-sub ml-2">/ {section.titleEN}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); moveSection(index, 'up'); }}
                                        disabled={index === 0}
                                        className="p-1 text-admin-sub hover:text-admin-text disabled:opacity-30"
                                    >
                                        <ChevronUp size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); moveSection(index, 'down'); }}
                                        disabled={index === sections.length - 1}
                                        className="p-1 text-admin-sub hover:text-admin-text disabled:opacity-30"
                                    >
                                        <ChevronDown size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeSection(index); }}
                                        className="p-1 text-red-400 hover:text-red-300 ml-2"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {expandedSection === section.id && (
                                <div className="border-t border-admin-border p-4 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-admin-sub">Nadpis KR</label>
                                            <input
                                                type="text"
                                                value={section.titleKR}
                                                onChange={(e) => updateSection(index, 'titleKR', e.target.value)}
                                                className="w-full px-3 py-2 border border-admin-border bg-admin-wash rounded-lg text-admin-text"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-admin-sub">Nadpis EN</label>
                                            <input
                                                type="text"
                                                value={section.titleEN}
                                                onChange={(e) => updateSection(index, 'titleEN', e.target.value)}
                                                className="w-full px-3 py-2 border border-admin-border bg-admin-wash rounded-lg text-admin-text"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-admin-sub">Obsah KR</label>
                                        <textarea
                                            value={section.contentKR}
                                            onChange={(e) => updateSection(index, 'contentKR', e.target.value)}
                                            rows={6}
                                            className="w-full px-3 py-2 border border-admin-border bg-admin-wash rounded-lg font-mono text-sm text-admin-text"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-admin-sub">Obsah EN</label>
                                        <textarea
                                            value={section.contentEN}
                                            onChange={(e) => updateSection(index, 'contentEN', e.target.value)}
                                            rows={6}
                                            className="w-full px-3 py-2 border border-admin-border bg-admin-wash rounded-lg font-mono text-sm text-admin-text"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={`faq-${section.id}`}
                                            checked={section.isFAQSection || false}
                                            onChange={(e) => updateSection(index, 'isFAQSection', e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label htmlFor={`faq-${section.id}`} className="text-sm text-admin-sub">
                                            Zobrazit tlacitko FAQ odkaz
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    onClick={addSection}
                    className="mt-4 flex items-center gap-2 px-4 py-2 border-2 border-dashed border-admin-border rounded-lg text-admin-sub hover:border-admin-sub hover:text-admin-text w-full justify-center"
                >
                    <Plus size={18} />
                    Pridat sekci
                </button>
            </div>
        </AdminLayout>
    );
}
