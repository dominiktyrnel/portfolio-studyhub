import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { StudySchedule } from '../types/study-db';
import { logger } from '../utils/logger';
import { getKoreanDayOfWeek } from '../utils/koreanTime';

const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

const DEFAULT_SCHEDULE: StudySchedule = {
    schemaVersion: 1,
    days: {
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
    }
};

export function useStudySchedule() {
    const [schedule, setSchedule] = useState<StudySchedule | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) {
            setSchedule(DEFAULT_SCHEDULE);
            setLoading(false);
            return;
        }

        const fetchSchedule = async () => {
            try {
                const snap = await getDoc(doc(db!, 'study_schedule', 'current'));
                if (snap.exists()) {
                    setSchedule(snap.data() as StudySchedule);
                } else {
                    setSchedule(DEFAULT_SCHEDULE);
                }
            } catch (err) {
                logger.error(err instanceof Error ? err : new Error(`Failed to fetch study schedule: ${String(err)}`));
                setSchedule(DEFAULT_SCHEDULE);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, []);

    // Get today's schedule text
    const getTodaySchedule = (): string => {
        if (!schedule) return '';
        const today = DAY_NAMES[getKoreanDayOfWeek()];
        return schedule.days[today] || '';
    };

    return { schedule, loading, getTodaySchedule };
}
