import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { RoomSettings } from '../types/study-db';
import { logger } from '../utils/logger';

const DEFAULT_SETTINGS: RoomSettings = {
    schemaVersion: 1,
    roomLink: "https://gooroomee.com/tyrnelstudy",
    roomPassword: "1234",
    rulesKR: [],
    rulesEN: [],
    updatedAt: undefined // ✅ FIXED: Optional timestamp, undefined for defaults
};

export function useRoomSettings() {
    const [settings, setSettings] = useState<RoomSettings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) {
            setSettings(DEFAULT_SETTINGS);
            setLoading(false);
            return;
        }

        const fetchSettings = async () => {
            try {
                const snap = await getDoc(doc(db!, 'room_settings', 'current'));
                if (snap.exists()) {
                    setSettings(snap.data() as RoomSettings);
                } else {
                    setSettings(DEFAULT_SETTINGS);
                }
            } catch (err) {
                logger.error(err instanceof Error ? err : new Error(`Failed to fetch room settings: ${String(err)}`));
                setSettings(DEFAULT_SETTINGS);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return { settings, loading };
}
