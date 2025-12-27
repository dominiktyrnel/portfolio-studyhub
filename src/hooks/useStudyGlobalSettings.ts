import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { StudyGlobalSettings } from '../types/study-db';
import { logger } from '../utils/logger';

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

export function useStudyGlobalSettings() {
    const [settings, setSettings] = useState<StudyGlobalSettings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) {
            setSettings(DEFAULT_SETTINGS);
            setLoading(false);
            return;
        }

        const fetchSettings = async () => {
            try {
                const snap = await getDoc(doc(db!, 'study_global_settings', 'current'));
                if (snap.exists()) {
                    setSettings(snap.data() as StudyGlobalSettings);
                } else {
                    setSettings(DEFAULT_SETTINGS);
                }
            } catch (err) {
                logger.error(err instanceof Error ? err : new Error(`Failed to fetch study global settings: ${String(err)}`));
                setSettings(DEFAULT_SETTINGS);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return { settings, loading };
}
