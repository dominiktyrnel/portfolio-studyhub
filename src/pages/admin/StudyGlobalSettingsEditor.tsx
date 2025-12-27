import { useState, useEffect } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Loader, AlertCircle, MessageCircle, Youtube, Instagram, Quote } from 'lucide-react';
import toast from 'react-hot-toast';
import { logger } from '../../utils/logger';
import type { StudyGlobalSettings } from '../../types/study-db';

const DEFAULT_SETTINGS: StudyGlobalSettings = {
    schemaVersion: 1,
    kakaoId: '',
    kakaoLink: '',
    youtubeLink: '',
    youtubeName: '',
    instagramLink: '',
    instagramName: '',
    motivationQuote: '조용히, 꾸준히. 함께 집중하고 성장하는 공간입니다.',
    updatedAt: undefined
};

export function StudyGlobalSettingsEditor() {
    const [settings, setSettings] = useState<StudyGlobalSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setLoading(true);
            const docRef = doc(db!, 'study_global_settings', 'current');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setSettings(docSnap.data() as StudyGlobalSettings);
            } else {
                setSettings(DEFAULT_SETTINGS);
            }
        } catch (error) {
            logger.error(error instanceof Error ? error : new Error('Failed to load study global settings'));
            toast.error('Nepodařilo se načíst globální nastavení');
            setSettings(DEFAULT_SETTINGS);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!settings) return;

        try {
            setSaving(true);
            const docRef = doc(db!, 'study_global_settings', 'current');

            await setDoc(docRef, {
                ...settings,
                schemaVersion: 1,
                updatedAt: Timestamp.now()
            });

            toast.success('Globální nastavení uloženo ✅');
        } catch (error) {
            logger.error(error instanceof Error ? error : new Error('Failed to save study global settings'));
            toast.error('Chyba při ukládání');
        } finally {
            setSaving(false);
        }
    };

    const updateField = (field: keyof StudyGlobalSettings, value: string) => {
        if (!settings) return;
        setSettings({ ...settings, [field]: value });
    };

    if (loading) {
        return (
            <AdminLayout title="Study Hub - Globální nastavení">
                <div className="p-8 flex items-center justify-center">
                    <Loader className="animate-spin text-admin-sub" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout
            title="Study Hub - Globální nastavení"
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
            <div className="p-6 space-y-8">
                {/* Info Banner */}
                <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
                    <AlertCircle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={20} />
                    <div className="text-sm text-amber-900 dark:text-amber-100">
                        <p className="font-medium mb-1">Study Hub Global Settings</p>
                        <p className="text-amber-700 dark:text-amber-300">
                            Tyto údaje se zobrazují v Study Hub sekci - sociální sítě, motivační citát a externí odkazy.
                        </p>
                    </div>
                </div>

                {/* Kakao Section */}
                <section>
                    <h3 className="text-lg font-semibold text-admin-text mb-4 flex items-center gap-2">
                        <MessageCircle size={20} className="text-yellow-500" />
                        Kakao
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-admin-text mb-2">
                                Kakao ID
                            </label>
                            <input
                                type="text"
                                value={settings?.kakaoId || ''}
                                onChange={(e) => updateField('kakaoId', e.target.value)}
                                className="w-full px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="dominik_study"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-admin-text mb-2">
                                Kakao Open Chat Link
                            </label>
                            <input
                                type="url"
                                value={settings?.kakaoLink || ''}
                                onChange={(e) => updateField('kakaoLink', e.target.value)}
                                className="w-full px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="https://open.kakao.com/..."
                            />
                        </div>
                    </div>
                </section>

                {/* YouTube Section */}
                <section>
                    <h3 className="text-lg font-semibold text-admin-text mb-4 flex items-center gap-2">
                        <Youtube size={20} className="text-red-500" />
                        YouTube
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-admin-text mb-2">
                                YouTube Channel Link
                            </label>
                            <input
                                type="url"
                                value={settings?.youtubeLink || ''}
                                onChange={(e) => updateField('youtubeLink', e.target.value)}
                                className="w-full px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="https://youtube.com/@channel"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-admin-text mb-2">
                                YouTube Channel Name
                            </label>
                            <input
                                type="text"
                                value={settings?.youtubeName || ''}
                                onChange={(e) => updateField('youtubeName', e.target.value)}
                                className="w-full px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="도미니크 스터디"
                            />
                        </div>
                    </div>
                </section>

                {/* Instagram Section */}
                <section>
                    <h3 className="text-lg font-semibold text-admin-text mb-4 flex items-center gap-2">
                        <Instagram size={20} className="text-pink-500" />
                        Instagram
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-admin-text mb-2">
                                Instagram Link
                            </label>
                            <input
                                type="url"
                                value={settings?.instagramLink || ''}
                                onChange={(e) => updateField('instagramLink', e.target.value)}
                                className="w-full px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="https://instagram.com/username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-admin-text mb-2">
                                Instagram Username
                            </label>
                            <input
                                type="text"
                                value={settings?.instagramName || ''}
                                onChange={(e) => updateField('instagramName', e.target.value)}
                                className="w-full px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="@dominik_study"
                            />
                        </div>
                    </div>
                </section>

                {/* Motivation Quote Section */}
                <section>
                    <h3 className="text-lg font-semibold text-admin-text mb-4 flex items-center gap-2">
                        <Quote size={20} className="text-amber-500" />
                        Motivační citát
                    </h3>
                    <div>
                        <label className="block text-sm font-medium text-admin-text mb-2">
                            Citát zobrazený na stránkách
                        </label>
                        <textarea
                            value={settings?.motivationQuote || ''}
                            onChange={(e) => updateField('motivationQuote', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                            placeholder="조용히, 꾸준히. 함께 집중하고 성장하는 공간입니다."
                        />
                        <p className="text-xs text-admin-sub mt-1">
                            Tento text se zobrazuje v patičce a na různých místech Study Hub sekce.
                        </p>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}
