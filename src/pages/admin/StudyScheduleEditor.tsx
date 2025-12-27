import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Loader, AlertCircle, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { logger } from '../../utils/logger';
import type { StudySchedule } from '../../types/study-db';

const DAY_LABELS = [
    { key: 'monday', label: 'Pondělí', emoji: '🌙' },
    { key: 'tuesday', label: 'Úterý', emoji: '🌙' },
    { key: 'wednesday', label: 'Středa', emoji: '🌙' },
    { key: 'thursday', label: 'Čtvrtek', emoji: '🌙' },
    { key: 'friday', label: 'Pátek', emoji: '🌙' },
    { key: 'saturday', label: 'Sobota', emoji: '☀️' },
    { key: 'sunday', label: 'Neděle', emoji: '☀️' },
] as const;

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

export function StudyScheduleEditor() {
    const [schedule, setSchedule] = useState<StudySchedule | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadSchedule();
    }, []);

    const loadSchedule = async () => {
        try {
            setLoading(true);
            const docRef = doc(db!, 'study_schedule', 'current');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setSchedule(docSnap.data() as StudySchedule);
            } else {
                setSchedule(DEFAULT_SCHEDULE);
            }
        } catch (error) {
            logger.error(error instanceof Error ? error : new Error('Failed to load study schedule'));
            toast.error('Nepodařilo se načíst rozvrh');
            setSchedule(DEFAULT_SCHEDULE);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!schedule) return;

        try {
            setSaving(true);
            const docRef = doc(db!, 'study_schedule', 'current');

            await setDoc(docRef, {
                ...schedule,
                schemaVersion: 1,
                updatedAt: Timestamp.now()
            });

            toast.success('Rozvrh uložen ✅');
        } catch (error) {
            logger.error(error instanceof Error ? error : new Error('Failed to save study schedule'));
            toast.error('Chyba při ukládání');
        } finally {
            setSaving(false);
        }
    };

    const updateDay = (day: keyof StudySchedule['days'], value: string) => {
        if (!schedule) return;
        setSchedule({
            ...schedule,
            days: { ...schedule.days, [day]: value }
        });
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <Loader className="animate-spin text-admin-sub" />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header with Save Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Calendar className="text-blue-500" size={24} />
                    <div>
                        <h2 className="text-lg font-bold text-admin-text">Týdenní rozvrh</h2>
                        <p className="text-sm text-admin-sub">Text pro každý den se zobrazí na dashboardu když jsi offline</p>
                    </div>
                </div>
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
            </div>

            {/* Info Banner */}
            <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <AlertCircle className="text-blue-400 shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-admin-text">
                    <p className="font-medium mb-1">Jak to funguje</p>
                    <p className="text-admin-sub">
                        Když jsi offline, dashboard zobrazí text pro aktuální den.
                        Příklad: "오늘 21:00 (KST) 예정" nebo "오늘은 휴식일이에요"
                    </p>
                </div>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DAY_LABELS.map(({ key, label, emoji }) => (
                    <div key={key} className="p-4 bg-admin-surface border border-admin-border rounded-lg">
                        <label className="block text-sm font-bold text-admin-text mb-2 flex items-center gap-2">
                            <span>{emoji}</span>
                            {label}
                        </label>
                        <input
                            type="text"
                            value={schedule?.days[key as keyof StudySchedule['days']] || ''}
                            onChange={(e) => updateDay(key as keyof StudySchedule['days'], e.target.value)}
                            className="w-full px-3 py-2 bg-admin-bg border border-admin-border rounded-lg text-admin-text focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="예: 오늘 21:00 (KST) 예정"
                        />
                    </div>
                ))}
            </div>

            {/* Preview */}
            <div className="p-4 bg-admin-bg border border-admin-border rounded-lg">
                <h3 className="text-sm font-bold text-admin-sub mb-3">Náhled pro dnešní den:</h3>
                <div className="p-3 bg-admin-surface rounded-lg">
                    <p className="text-admin-text">
                        {(() => {
                            const today = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
                            const todayText = schedule?.days[today as keyof StudySchedule['days']];
                            return todayText || <span className="text-admin-sub italic">Žádný text pro dnešek</span>;
                        })()}
                    </p>
                </div>
            </div>
        </div>
    );
}
