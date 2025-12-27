import { Columns } from "lucide-react";

export type ViewMode = 'KR' | 'EN' | 'SPLIT';

interface ViewModeSelectorProps {
    mode: ViewMode;
    onChange: (mode: ViewMode) => void;
}

export function ViewModeSelector({ mode, onChange }: ViewModeSelectorProps) {
    return (
        <div className="flex bg-slate-200 p-1 rounded-lg border border-slate-300 inline-flex shadow-inner">
            <button
                onClick={() => onChange('KR')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${mode === 'KR' ? 'bg-white text-blue-600 shadow-xs ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
                <span className="text-lg">🇰🇷</span> KR Only
            </button>
            <button
                onClick={() => onChange('EN')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${mode === 'EN' ? 'bg-white text-blue-600 shadow-xs ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
                <span className="text-lg">🇺🇸</span> EN Only
            </button>
            <button
                onClick={() => onChange('SPLIT')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${mode === 'SPLIT' ? 'bg-white text-blue-600 shadow-xs ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
                <Columns size={16} className={mode === 'SPLIT' ? "text-blue-600" : "text-slate-500"} /> Split View
            </button>
        </div>
    );
}
