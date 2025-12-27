import { Save, Check, AlertCircle, Loader2 } from "lucide-react";
import { useEffect } from "react";

interface StickySaveBarProps {
    status: 'idle' | 'saving' | 'saved' | 'error';
    onSave: () => void;
    isDirty: boolean;
    lastSaved?: string; // timestamp string
}

export function StickySaveBar({ status, onSave, isDirty, lastSaved }: StickySaveBarProps) {

    // Auto-hide saved state after 3s
    useEffect(() => {
        if (status === 'saved') {
            const t = setTimeout(() => {
                // optional cleanup or state reset if parent allows
            }, 3000);
            return () => clearTimeout(t);
        }
    }, [status]);

    const handleSaveClick = () => {
        if (status === 'saving') return;
        onSave();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-admin-surface p-2 pl-4 rounded-full shadow-xl border border-admin-border animate-in slide-in-from-bottom-4 fade-in">

            <div className="flex flex-col text-xs text-admin-sub mr-2">
                {status === 'saved' && <span className="text-green-400 font-bold flex items-center gap-1"><Check size={12} /> Uloženo</span>}
                {status === 'error' && <span className="text-red-400 font-bold flex items-center gap-1"><AlertCircle size={12} /> Chyba</span>}
                {status === 'saving' && <span className="text-blue-400 font-bold flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Ukládám...</span>}
                {status === 'idle' && isDirty && <span className="text-amber-400 font-bold">Neuložené změny</span>}

                {lastSaved && status !== 'saving' && <span className="opacity-75">Naposledy: {lastSaved}</span>}
            </div>

            <button
                onClick={handleSaveClick}
                disabled={!isDirty || status === 'saving'}
                className={`
                    flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white shadow-md transition-all
                    ${!isDirty
                        ? 'bg-admin-wash text-admin-sub cursor-not-allowed shadow-none'
                        : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:scale-105 active:scale-95'}
                `}
            >
                {status === 'saving' ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {status === 'saving' ? "Ukládám..." : "Uložit"}
            </button>
        </div>
    );
}

