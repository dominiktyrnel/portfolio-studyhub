/**
 * StudyProgressAdmin - Admin page for managing Korean study progress
 * 
 * Features:
 * - Mark days as complete/incomplete
 * - View progress stats
 * - Add notes to days
 * - Calendar overview
 */

import { useState, useEffect, useMemo } from 'react';
import { doc, setDoc, Timestamp, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import {
    CheckCircle2,
    Circle,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    BookOpen,
    GraduationCap,
    Target,
    Flame,
    MessageSquare
} from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';
import type { StudyProgress } from '../../types/study-db';
import type { KoreanStudyPlan, KoreanMonthData } from '../../types/study-db';
import { koreanStudyPlanComplete } from '../../data/studyPlanIndex';
import toast from 'react-hot-toast';

const MONTH_NAMES = ['Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad'];

// Get default progress
function getDefaultProgress(): StudyProgress {
    return {
        schemaVersion: 1,
        currentDay: 1,
        currentMonth: 1,
        completedDays: [],
        totalVocabLearned: 0,
        totalGrammarLearned: 0,
        streak: 0,
        startDate: '2026-02-02',
        dayNotes: {},
        updatedAt: Timestamp.now()
    };
}

// Calculate stats from completed days
function calculateStats(plan: KoreanStudyPlan, completedDays: number[]): { vocab: number; grammar: number } {
    let vocab = 0;
    let grammar = 0;
    let dayNum = 0;
    
    for (const month of plan.monthsData) {
        for (const day of month.days) {
            dayNum++;
            if (completedDays.includes(dayNum)) {
                vocab += day.vocab.length;
                if (day.grammar) grammar++;
            }
        }
    }
    
    return { vocab, grammar };
}

// Get total days
function getTotalDays(plan: KoreanStudyPlan): number {
    return plan.monthsData.reduce((sum, m) => sum + m.days.length, 0);
}

export function StudyProgressAdmin() {
    const [progress, setProgress] = useState<StudyProgress>(getDefaultProgress());
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [editingNote, setEditingNote] = useState<number | null>(null);
    const [noteText, setNoteText] = useState('');
    
    const plan = koreanStudyPlanComplete;
    const totalDays = useMemo(() => getTotalDays(plan), [plan]);
    
    // Calculate month day ranges
    const monthRanges = useMemo(() => {
        const ranges: { start: number; end: number; month: KoreanMonthData }[] = [];
        let start = 1;
        for (const month of plan.monthsData) {
            ranges.push({
                start,
                end: start + month.days.length - 1,
                month
            });
            start += month.days.length;
        }
        return ranges;
    }, [plan]);
    
    // Load progress from Firestore
    useEffect(() => {
        if (!db) {
            setLoading(false);
            return;
        }
        
        const docRef = doc(db, 'study_progress', 'current');
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
                setProgress(snapshot.data() as StudyProgress);
            } else {
                setProgress(getDefaultProgress());
            }
            setLoading(false);
        }, (error) => {
            console.error('Error loading progress:', error);
            toast.error('Chyba při načítání progress');
            setLoading(false);
        });
        
        return () => unsubscribe();
    }, []);
    
    // Save progress to Firestore
    const saveProgress = async (newProgress: StudyProgress) => {
        if (!db) return;
        
        setSaving(true);
        try {
            const stats = calculateStats(plan, newProgress.completedDays);
            const docRef = doc(db, 'study_progress', 'current');
            
            // Build clean data object (no undefined values - Firestore doesn't like them)
            const dataToSave: Record<string, unknown> = {
                schemaVersion: newProgress.schemaVersion,
                currentDay: newProgress.currentDay,
                currentMonth: newProgress.currentMonth,
                completedDays: newProgress.completedDays,
                totalVocabLearned: stats.vocab,
                totalGrammarLearned: stats.grammar,
                streak: newProgress.streak,
                startDate: newProgress.startDate,
                dayNotes: newProgress.dayNotes || {},
                updatedAt: Timestamp.now()
            };
            
            // Only include lastStudyDate if it exists
            if (newProgress.lastStudyDate) {
                dataToSave.lastStudyDate = newProgress.lastStudyDate;
            }
            
            await setDoc(docRef, dataToSave);
            toast.success('Uloženo ✅');
        } catch (error) {
            console.error('Error saving progress:', error);
            toast.error('Chyba při ukládání');
        } finally {
            setSaving(false);
        }
    };
    
    // Toggle day completion
    const toggleDay = (dayNum: number) => {
        const isCompleted = progress.completedDays.includes(dayNum);
        let newCompletedDays: number[];
        
        if (isCompleted) {
            newCompletedDays = progress.completedDays.filter(d => d !== dayNum);
        } else {
            newCompletedDays = [...progress.completedDays, dayNum].sort((a, b) => a - b);
        }
        
        // Calculate streak
        let streak = 0;
        for (let i = newCompletedDays.length - 1; i >= 0; i--) {
            if (i === newCompletedDays.length - 1 || newCompletedDays[i] === newCompletedDays[i + 1] - 1) {
                streak++;
            } else {
                break;
            }
        }
        
        // Find current day (first incomplete day)
        let currentDay = 1;
        for (let i = 1; i <= totalDays; i++) {
            if (!newCompletedDays.includes(i)) {
                currentDay = i;
                break;
            }
            if (i === totalDays) currentDay = totalDays;
        }
        
        // Find current month
        let currentMonth = 1;
        let dayCount = 0;
        for (let i = 0; i < plan.monthsData.length; i++) {
            dayCount += plan.monthsData[i].days.length;
            if (currentDay <= dayCount) {
                currentMonth = i + 1;
                break;
            }
        }
        
        const newProgress: StudyProgress = {
            ...progress,
            completedDays: newCompletedDays,
            currentDay,
            currentMonth,
            streak
        };
        
        // Only set lastStudyDate if there are completed days
        if (newCompletedDays.length > 0) {
            newProgress.lastStudyDate = new Date().toISOString().split('T')[0];
        }
        
        setProgress(newProgress);
        saveProgress(newProgress);
    };
    
    // Save note for a day
    const saveNote = (dayNum: number) => {
        const newNotes = { ...progress.dayNotes };
        if (noteText.trim()) {
            newNotes[dayNum] = noteText.trim();
        } else {
            delete newNotes[dayNum];
        }
        
        const newProgress = { ...progress, dayNotes: newNotes };
        setProgress(newProgress);
        saveProgress(newProgress);
        setEditingNote(null);
        setNoteText('');
    };
    
    // Mark all days in month as complete
    const completeMonth = (monthIndex: number) => {
        const range = monthRanges[monthIndex];
        const daysToAdd: number[] = [];
        for (let d = range.start; d <= range.end; d++) {
            if (!progress.completedDays.includes(d)) {
                daysToAdd.push(d);
            }
        }
        
        if (daysToAdd.length === 0) return;
        
        const newCompletedDays = [...progress.completedDays, ...daysToAdd].sort((a, b) => a - b);
        const newProgress = { ...progress, completedDays: newCompletedDays };
        setProgress(newProgress);
        saveProgress(newProgress);
    };
    
    // Reset month
    const resetMonth = (monthIndex: number) => {
        const range = monthRanges[monthIndex];
        const newCompletedDays = progress.completedDays.filter(d => d < range.start || d > range.end);
        const newProgress = { ...progress, completedDays: newCompletedDays };
        setProgress(newProgress);
        saveProgress(newProgress);
    };
    
    // Get current month data
    const currentMonthRange = monthRanges[selectedMonth - 1];
    const currentMonthData = plan.monthsData[selectedMonth - 1];
    
    // Calculate month stats
    const monthStats = useMemo(() => {
        if (!currentMonthRange) return { completed: 0, total: 0, vocab: 0, grammar: 0 };
        
        const total = currentMonthRange.end - currentMonthRange.start + 1;
        const completed = progress.completedDays.filter(
            d => d >= currentMonthRange.start && d <= currentMonthRange.end
        ).length;
        
        let vocab = 0;
        let grammar = 0;
        let dayNum = currentMonthRange.start;
        
        for (const day of currentMonthData.days) {
            if (progress.completedDays.includes(dayNum)) {
                vocab += day.vocab.length;
                if (day.grammar) grammar++;
            }
            dayNum++;
        }
        
        return { completed, total, vocab, grammar };
    }, [currentMonthRange, currentMonthData, progress.completedDays]);
    
    if (loading) {
        return (
            <AdminLayout title="Studijní Progress">
                <div className="flex items-center justify-center h-64">
                    <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            </AdminLayout>
        );
    }
    
    return (
        <AdminLayout title="Studijní Progress">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Studijní Progress</h1>
                        <p className="text-gray-500">Správa pokroku ve studijním plánu korejštiny</p>
                    </div>
                    {saving && (
                        <div className="flex items-center gap-2 text-blue-600">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Ukládám...</span>
                        </div>
                    )}
                </div>
                
                {/* Overall Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <Target className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {progress.completedDays.length}/{totalDays}
                                </div>
                                <div className="text-sm text-gray-500">Hotových dnů</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <BookOpen className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {progress.totalVocabLearned}
                                </div>
                                <div className="text-sm text-gray-500">Slovíček</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-violet-100 rounded-lg">
                                <GraduationCap className="w-5 h-5 text-violet-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {progress.totalGrammarLearned}
                                </div>
                                <div className="text-sm text-gray-500">Gramatik</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <Flame className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {progress.streak}
                                </div>
                                <div className="text-sm text-gray-500">Série dní</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Month Selector */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSelectedMonth(m => Math.max(1, m - 1))}
                                    disabled={selectedMonth <= 1}
                                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                
                                <div className="text-center">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {MONTH_NAMES[selectedMonth - 1]} 2026
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Měsíc {selectedMonth}/10 • {currentMonthData?.targetLevel}
                                    </p>
                                </div>
                                
                                <button
                                    onClick={() => setSelectedMonth(m => Math.min(10, m + 1))}
                                    disabled={selectedMonth >= 10}
                                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => completeMonth(selectedMonth - 1)}
                                    className="px-3 py-1.5 text-sm bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                                >
                                    Označit vše hotovo
                                </button>
                                <button
                                    onClick={() => resetMonth(selectedMonth - 1)}
                                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Resetovat měsíc
                                </button>
                            </div>
                        </div>
                        
                        {/* Month Progress Bar */}
                        <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-500 mb-1">
                                <span>{monthStats.completed}/{monthStats.total} dnů</span>
                                <span>{Math.round((monthStats.completed / monthStats.total) * 100)}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 transition-all"
                                    style={{ width: `${(monthStats.completed / monthStats.total) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Days Grid */}
                    <div className="p-4">
                        <div className="grid grid-cols-7 gap-2">
                            {currentMonthData?.days.map((day, idx) => {
                                const dayNum = currentMonthRange.start + idx;
                                const isCompleted = progress.completedDays.includes(dayNum);
                                const hasNote = progress.dayNotes[dayNum];
                                
                                return (
                                    <div
                                        key={dayNum}
                                        className={`relative p-3 rounded-lg border transition-all cursor-pointer ${
                                            isCompleted
                                                ? 'bg-emerald-50 border-emerald-200 hover:border-emerald-300'
                                                : day.isTest
                                                    ? 'bg-amber-50 border-amber-200 hover:border-amber-300'
                                                    : day.isWeekend
                                                        ? 'bg-violet-50 border-violet-200 hover:border-violet-300'
                                                        : 'bg-white border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => toggleDay(dayNum)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="font-bold text-gray-900">Den {dayNum}</div>
                                                <div className="text-xs text-gray-500">{day.date}</div>
                                            </div>
                                            {isCompleted ? (
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-gray-300" />
                                            )}
                                        </div>
                                        
                                        <div className="mt-2 text-xs text-gray-500">
                                            {day.vocab.length} slov
                                            {day.grammar && ' • gram.'}
                                        </div>
                                        
                                        {day.isTest && (
                                            <div className="mt-1 text-xs font-medium text-amber-600">TEST</div>
                                        )}
                                        
                                        {hasNote && (
                                            <MessageSquare className="absolute bottom-2 right-2 w-3 h-3 text-blue-500" />
                                        )}
                                        
                                        {/* Note button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingNote(dayNum);
                                                setNoteText(progress.dayNotes[dayNum] || '');
                                            }}
                                            className="absolute top-2 right-8 p-1 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <MessageSquare className="w-3 h-3 text-gray-400" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                
                {/* Month Quick Select */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Rychlý výběr měsíce</h3>
                    <div className="flex flex-wrap gap-2">
                        {MONTH_NAMES.map((name, idx) => {
                            const range = monthRanges[idx];
                            const completed = progress.completedDays.filter(
                                d => d >= range.start && d <= range.end
                            ).length;
                            const total = range.end - range.start + 1;
                            const percentage = Math.round((completed / total) * 100);
                            
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedMonth(idx + 1)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                        selectedMonth === idx + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {name}
                                    <span className={`ml-1 text-xs ${
                                        selectedMonth === idx + 1 ? 'text-blue-200' : 'text-gray-500'
                                    }`}>
                                        {percentage}%
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                
                {/* Note Modal */}
                {editingNote !== null && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Poznámka k Den {editingNote}
                            </h3>
                            <textarea
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                placeholder="Přidej poznámku..."
                                className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => {
                                        setEditingNote(null);
                                        setNoteText('');
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Zrušit
                                </button>
                                <button
                                    onClick={() => saveNote(editingNote)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Uložit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

export default StudyProgressAdmin;
