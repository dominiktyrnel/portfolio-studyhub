import { useState, useEffect } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Loader, AlertCircle, Link as LinkIcon, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { logger } from '../../utils/logger';

interface RoomSettings {
    schemaVersion: number;
    updatedAt: Date | null;
    roomLink: string;
    roomPassword: string;
    rulesKR: string[];
    rulesEN: string[];
}

export function RoomSettingsEditor() {
    const [settings, setSettings] = useState<RoomSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setLoading(true);
            const docRef = doc(db!, 'room_settings', 'current');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setSettings(docSnap.data() as RoomSettings);
            } else {
                setSettings({
                    schemaVersion: 1,
                    updatedAt: null,
                    roomLink: 'https://gooroomee.com/도미니크-카페-스터디',
                    roomPassword: '1234',
                    rulesKR: ['마이크는 꺼주세요', '집중하는 분위기를 만들어요'],
                    rulesEN: ['Please mute your mic', 'Create focused atmosphere']
                });
            }
        } catch (error) {
            logger.error(error instanceof Error ? error : new Error('Failed to load room settings'));
            toast.error('Nepodařilo se načíst nastavení místnosti');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!settings) return;

        try {
            setSaving(true);
            const docRef = doc(db!, 'room_settings', 'current');

            await setDoc(docRef, {
                ...settings,
                updatedAt: Timestamp.now()
            });

            toast.success('Nastavení místnosti uloženo ✅');
        } catch (error) {
            logger.error(error instanceof Error ? error : new Error('Failed to save room settings'));
            toast.error('Chyba při ukládání');
        } finally {
            setSaving(false);
        }
    };

    const updateRule = (lang: 'KR' | 'EN', index: number, value: string) => {
        if (!settings) return;
        const key = lang === 'KR' ? 'rulesKR' : 'rulesEN';
        const newRules = [...settings[key]];
        newRules[index] = value;
        setSettings({ ...settings, [key]: newRules });
    };

    const addRule = (lang: 'KR' | 'EN') => {
        if (!settings) return;
        const key = lang === 'KR' ? 'rulesKR' : 'rulesEN';
        setSettings({ ...settings, [key]: [...settings[key], ''] });
    };

    const removeRule = (lang: 'KR' | 'EN', index: number) => {
        if (!settings) return;
        const key = lang === 'KR' ? 'rulesKR' : 'rulesEN';
        const newRules = settings[key].filter((_, i) => i !== index);
        setSettings({ ...settings, [key]: newRules });
    };

    if (loading) {
        return (
            <AdminLayout title="Nastavení místnosti">
                <div className="p-8 flex items-center justify-center">
                    <Loader className="animate-spin text-admin-sub" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout
            title="Nastavení místnosti"
            actions={
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {saving ? (
                        <>
                            <Loader size={16} className="animate-spin" />
                            Ukládání...
                        </>
                    ) : (
                        <>
                            <Save size={16} />
                            Uložit změny
                        </>
                    )}
                </button>
            }
        >
            <div className="p-6 space-y-6">
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-lg">
                    <AlertCircle className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={20} />
                    <div className="text-sm text-blue-900 dark:text-blue-100">
                        <p className="font-medium mb-1">Gooroomee Study Room</p>
                        <p className="text-blue-700 dark:text-blue-300">
                            Tyto údaje se zobrazují na stránce <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/30 rounded text-xs">/study/room</code>
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-admin-text mb-2">
                            <LinkIcon size={16} />
                            Odkaz na místnost
                        </label>
                        <input
                            type="url"
                            value={settings?.roomLink || ''}
                            onChange={(e) => setSettings(prev => prev ? { ...prev, roomLink: e.target.value } : null)}
                            className="w-full px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://gooroomee.com/..."
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-admin-text mb-2">
                            <Lock size={16} />
                            Heslo
                        </label>
                        <input
                            type="text"
                            value={settings?.roomPassword || ''}
                            onChange={(e) => setSettings(prev => prev ? { ...prev, roomPassword: e.target.value } : null)}
                            className="w-full px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="1234"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                    <div>
                        <h3 className="text-lg font-semibold text-admin-text mb-3 flex items-center gap-2">
                            🇰🇷 Pravidla (Korejsky)
                        </h3>
                        <div className="space-y-2">
                            {settings?.rulesKR.map((rule, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={rule}
                                        onChange={(e) => updateRule('KR', idx, e.target.value)}
                                        className="flex-1 px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Pravidlo..."
                                    />
                                    <button
                                        onClick={() => removeRule('KR', idx)}
                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addRule('KR')}
                                className="w-full px-3 py-2 border-2 border-dashed border-admin-border rounded-lg text-admin-sub hover:border-blue-500 hover:text-blue-500 transition-colors"
                            >
                                + Přidat pravidlo
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-admin-text mb-3 flex items-center gap-2">
                            🇬🇧 Pravidla (Anglicky)
                        </h3>
                        <div className="space-y-2">
                            {settings?.rulesEN.map((rule, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={rule}
                                        onChange={(e) => updateRule('EN', idx, e.target.value)}
                                        className="flex-1 px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Rule..."
                                    />
                                    <button
                                        onClick={() => removeRule('EN', idx)}
                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addRule('EN')}
                                className="w-full px-3 py-2 border-2 border-dashed border-admin-border rounded-lg text-admin-sub hover:border-blue-500 hover:text-blue-500 transition-colors"
                            >
                                + Add rule
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
