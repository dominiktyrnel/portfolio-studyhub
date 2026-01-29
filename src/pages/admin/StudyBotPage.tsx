import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, updateDoc, deleteDoc, collection, Timestamp, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { RefreshCcw, Square, Play, Plus, Edit, Trash, X, Save, AlertCircle, Terminal, Bot, Send, CheckCircle, Download, ExternalLink, Info, Settings2, Code } from 'lucide-react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { logger } from '../../utils/logger';
import type { BotCommand } from '../../types/bot';
import type { BotConfig } from '../../types/study-db';
import type { BotStatus } from '../../types/study-db';

// Built-in commands (hardcoded in bot)
const BUILTIN_COMMANDS = [
    { trigger: '!help', description: 'Zobrazí nápovědu', response: '(dynamická odpověď)' },
    { trigger: '!start', description: 'Spustí timer (viewer)', response: '(jen pokud timer neběží)' },
    { trigger: '!stop', description: 'Zastaví timer (viewer)', response: '(jen v break módu)' },
    { trigger: '!stats', description: 'Statistiky streamu', response: '(dynamická odpověď)' },
    { trigger: '!bot pause', description: 'Pozastaví timer (admin)', response: '(admin only)' },
    { trigger: '!bot resume', description: 'Obnoví timer (admin)', response: '(admin only)' },
    { trigger: '!bot stop', description: 'Zastaví timer úplně (admin)', response: '(admin only)' },
    { trigger: '!bot phase [mode] [sec]', description: 'Nastaví fázi (admin)', response: '(admin only)' },
    { trigger: '!bot announce [msg]', description: 'Pošle oznámení (admin)', response: '(admin only)' },
];

// Console history entry type
interface ConsoleEntry {
    id: string;
    command: string;
    timestamp: Date;
    status: 'sent' | 'processed' | 'error';
}

export function StudyBotPage() {
    const [config, setConfig] = useState<BotConfig | null>(null);
    const [status, setStatus] = useState<BotStatus | null>(null);
    const [commands, setCommands] = useState<BotCommand[]>([]);
    // Initialize loading and error based on db availability
    const [loading, setLoading] = useState(!db);
    const [error, setError] = useState(db ? '' : 'Firebase databáze není inicializována (zkontrolujte env vars)');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCmd, setEditingCmd] = useState<BotCommand | null>(null);

    // Admin Console State
    const [consoleInput, setConsoleInput] = useState('');
    const [consoleHistory, setConsoleHistory] = useState<ConsoleEntry[]>([]);
    const [consoleSending, setConsoleSending] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<BotCommand>>({
        trigger: '',
        response: '',
        description: '',
        type: 'command',
        cooldown: 0,
        enabled: true
    });

    useEffect(() => {
        if (!db) {
            return;
        }

        // 1. Config
        const unsubConfig = onSnapshot(doc(db, 'config', 'bot'), (doc) => {
            if (doc.exists()) setConfig(doc.data() as BotConfig);
            else setDoc(doc.ref, { desiredState: 'stopped' });
            setLoading(false);
        }, (err) => {
            logger.error(err instanceof Error ? err : new Error(`Chyba načítání konfigurace: ${String(err)}`));
            setError(err.message);
            setLoading(false);
        });

        // 2. Status
        const unsubStatus = onSnapshot(doc(db, 'bot_status', 'current'), (doc) => {
            if (doc.exists()) setStatus(doc.data() as BotStatus);
        });

        // 3. Commands (ROOT collection for simplicity: bot_commands)
        const q = query(collection(db, 'bot_commands'));
        const unsubCmds = onSnapshot(q, (snap) => {
            const cmds = snap.docs.map(d => ({ id: d.id, ...d.data() } as BotCommand));
            // Sort by trigger
            cmds.sort((a, b) => a.trigger.localeCompare(b.trigger));
            setCommands(cmds);
        });

        return () => {
            unsubConfig();
            unsubStatus();
            unsubCmds();
        };
    }, []);

    const sendCommand = async (cmd: 'start' | 'stop' | 'restart') => {
        if (!db) return;
        const desiredState = cmd === 'start' ? 'running' : (cmd === 'stop' ? 'stopped' : 'running');
        try {
            await updateDoc(doc(db, 'config', 'bot'), {
                desiredState,
                lastCommand: cmd,
                lastCommandAt: Timestamp.now()
            });
        } catch (e) {
            logger.error(e instanceof Error ? e : new Error("Nepodařilo se odeslat příkaz"));
        }
    };

    // Send command via admin console (writes to Firestore for bot to process)
    const sendAdminCommand = async () => {
        if (!db || !consoleInput.trim() || consoleSending) return;

        const commandText = consoleInput.trim();
        const entryId = `cmd_${Date.now()}`;

        // Add to local history immediately
        const newEntry: ConsoleEntry = {
            id: entryId,
            command: commandText,
            timestamp: new Date(),
            status: 'sent'
        };
        setConsoleHistory(prev => [newEntry, ...prev].slice(0, 20)); // Keep last 20
        setConsoleInput('');
        setConsoleSending(true);

        try {
            // Write to Firestore - bot will read this and process
            await setDoc(doc(db, 'runtime', 'adminCommand'), {
                command: commandText,
                sentAt: Timestamp.now(),
                source: 'admin_console',
                processed: false
            });

            // Mark as processed in local history
            setConsoleHistory(prev =>
                prev.map(e => e.id === entryId ? { ...e, status: 'processed' as const } : e)
            );
        } catch (e) {
            logger.error(e instanceof Error ? e : new Error("Nepodařilo se odeslat příkaz"));
            // Mark as error in local history
            setConsoleHistory(prev =>
                prev.map(e => e.id === entryId ? { ...e, status: 'error' as const } : e)
            );
        } finally {
            setConsoleSending(false);
        }
    };

    // Handle Enter key in console
    const handleConsoleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendAdminCommand();
        }
    };

    const handleSaveCommand = async () => {
        if (!db || !formData.trigger || !formData.response) return;

        const id = editingCmd ? editingCmd.id : formData.trigger || 'cmd_' + Date.now();

        try {
            await setDoc(doc(db, 'bot_commands', id), {
                ...formData,
                id,
                updatedAt: Timestamp.now()
            }, { merge: true });

            setIsModalOpen(false);
            setEditingCmd(null);
            setFormData({ trigger: '!', response: '', type: 'command', cooldown: 0, enabled: true });
        } catch (e) {
            logger.error(e instanceof Error ? e : new Error("Nepodařilo se uložit příkaz"));
            alert("Chyba při ukládání příkazu");
        }
    };

    const handleDeleteCommand = async (id: string) => {
        if (!db || !confirm("Opravdu chcete smazat tento příkaz?")) return;
        try {
            await deleteDoc(doc(db, 'bot_commands', id));
        } catch (e) {
            logger.error(e instanceof Error ? e : new Error("Nepodařilo se smazat"));
        }
    };

    const openEdit = (cmd: BotCommand) => {
        setEditingCmd(cmd);
        setFormData(cmd);
        setIsModalOpen(true);
    };

    const openNew = () => {
        setEditingCmd(null);
        setFormData({ trigger: '!', response: '', type: 'command', cooldown: 30, enabled: true });
        setIsModalOpen(true);
    };

    const isRunning = status?.streamOnline ?? false;
    const isDesiredRunning = config?.desiredState === 'running';

    // Calculate uptime from streamStartedAt
    const getUptimeMinutes = () => {
        if (!isRunning || !status?.streamStartedAt) return 0;
        const startTime = status.streamStartedAt.toMillis();
        return Math.floor((Date.now() - startTime) / 60000);
    };

    if (loading) return <AdminLayout title="Ovládání Study Bota"><div className="p-12 text-center text-gray-500">Načítání ovládání bota...</div></AdminLayout>;

    if (error) return (
        <AdminLayout title="Ovládání Study Bota">
            <div className="p-12 text-center text-red-500 bg-red-50 rounded-xl border border-red-200 m-6">
                <AlertCircle className="mx-auto mb-4" size={48} />
                <h3 className="font-bold text-lg mb-2">Chyba připojení</h3>
                <p>{error}</p>
            </div>
        </AdminLayout>
    );

    return (
        <AdminLayout title="Ovládání Study Bota" maxWidth="max-w-6xl">
            {/* Control Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Status Card */}
                <div className="bg-admin-card p-6 rounded-xl border border-admin-border shadow-xs flex flex-col justify-between">
                    <div>
                        <div className="text-xs font-bold text-admin-sub uppercase tracking-wider mb-2">STAV</div>
                        <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-admin-sub'}`}></div>
                            <span className="text-2xl font-bold text-admin-text">
                                {isRunning ? 'ONLINE' : 'OFFLINE'}
                            </span>
                        </div>
                        <div className="text-sm text-admin-sub mt-1">
                            {isRunning ? `Běží: ${getUptimeMinutes()} min` : 'Bot je v pohotovostním režimu'}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-2 bg-admin-card p-6 rounded-xl border border-admin-border shadow-xs">
                    <div className="text-xs font-bold text-admin-sub uppercase tracking-wider mb-4">OVLÁDÁNÍ</div>
                    <div className="flex gap-4">
                        <button onClick={() => sendCommand('start')} disabled={isDesiredRunning} className={`flex-1 py-4 rounded-lg flex flex-col items-center justify-center gap-2 font-bold transition-all ${isDesiredRunning ? 'bg-green-900/30 text-green-400/50 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600 shadow-md'}`}>
                            <Play size={24} /> SPUSTIT
                        </button>
                        <button onClick={() => sendCommand('restart')} className="flex-1 py-4 rounded-lg flex flex-col items-center justify-center gap-2 font-bold bg-yellow-500 text-white hover:bg-yellow-600 shadow-md">
                            <RefreshCcw size={24} /> RESTARTOVAT
                        </button>
                        <button onClick={() => sendCommand('stop')} disabled={!isDesiredRunning} className={`flex-1 py-4 rounded-lg flex flex-col items-center justify-center gap-2 font-bold transition-all ${!isDesiredRunning ? 'bg-red-900/30 text-red-400/50 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600 shadow-md'}`}>
                            <Square size={24} /> ZASTAVIT
                        </button>
                    </div>
                </div>
            </div>

            {/* Admin Console */}
            <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-lg overflow-hidden mb-8">
                <div className="border-b border-gray-700 p-4 bg-gray-800 flex items-center gap-3">
                    <Terminal size={20} className="text-green-400" />
                    <h2 className="font-bold text-white">Příkazová konzole</h2>
                    <span className="text-xs bg-green-900 text-green-400 px-2 py-0.5 rounded-full font-medium">admin</span>
                </div>

                {/* Command History */}
                <div className="max-h-32 overflow-y-auto p-3 bg-gray-950 font-mono text-sm">
                    {consoleHistory.length === 0 ? (
                        <div className="text-gray-500 italic">Zatím žádné příkazy. Zadej příkaz níže...</div>
                    ) : (
                        consoleHistory.map((entry) => (
                            <div key={entry.id} className="flex items-center gap-2 py-0.5">
                                <span className="text-gray-500 text-xs">
                                    {entry.timestamp.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                                {entry.status === 'processed' && <CheckCircle size={12} className="text-green-500" />}
                                {entry.status === 'error' && <AlertCircle size={12} className="text-red-500" />}
                                {entry.status === 'sent' && <span className="w-3 h-3 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />}
                                <span className="text-green-400">{entry.command}</span>
                            </div>
                        ))
                    )}
                </div>

                {/* Input */}
                <div className="p-3 bg-gray-800 border-t border-gray-700 flex gap-2">
                    <div className="flex-1 flex items-center bg-gray-950 rounded border border-gray-600 focus-within:border-green-500 transition-colors">
                        <span className="text-green-400 pl-3 font-mono select-none">&gt;</span>
                        <input
                            type="text"
                            value={consoleInput}
                            onChange={(e) => setConsoleInput(e.target.value)}
                            onKeyDown={handleConsoleKeyDown}
                            placeholder="!bot pause, !bot phase focus 1500, !bot announce Zpráva..."
                            className="flex-1 bg-transparent text-white font-mono px-2 py-2 outline-none placeholder:text-gray-500"
                            disabled={consoleSending}
                        />
                    </div>
                    <button
                        onClick={sendAdminCommand}
                        disabled={!consoleInput.trim() || consoleSending}
                        className={`px-4 py-2 rounded font-bold flex items-center gap-2 transition-all ${consoleInput.trim() && !consoleSending
                            ? 'bg-green-600 text-white hover:bg-green-500'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <Send size={16} />
                        Odeslat
                    </button>
                </div>
            </div>
            {/* Built-in Commands (Read-only) */}
            <div className="bg-admin-card rounded-xl border border-admin-border shadow-xs overflow-hidden mb-8">
                <div className="border-b border-admin-border p-4 bg-purple-500/10 flex items-center gap-3">
                    <Bot size={20} className="text-purple-400" />
                    <h2 className="font-bold text-admin-text">Vestavěné příkazy</h2>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-medium">pouze pro čtení</span>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-admin-wash text-admin-sub text-xs uppercase font-bold border-b border-admin-border">
                        <tr>
                            <th className="px-6 py-3">Příkaz</th>
                            <th className="px-6 py-3">Popis</th>
                            <th className="px-6 py-3">Odpověď</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-admin-border">
                        {BUILTIN_COMMANDS.map((cmd, idx) => (
                            <tr key={idx} className="hover:bg-admin-wash/50">
                                <td className="px-6 py-3 font-mono text-sm text-purple-400 font-bold">{cmd.trigger}</td>
                                <td className="px-6 py-3 text-sm text-admin-sub">{cmd.description}</td>
                                <td className="px-6 py-3 text-sm text-admin-sub opacity-70 italic">{cmd.response}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Custom Commands */}
            <div className="bg-admin-card rounded-xl border border-admin-border shadow-xs overflow-hidden">
                <div className="border-b border-admin-border p-4 bg-admin-wash flex justify-between items-center">
                    <h2 className="font-bold text-admin-text flex items-center gap-2">
                        <Terminal size={18} />
                        Vlastní příkazy
                    </h2>
                    <button onClick={openNew} className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 font-medium flex items-center gap-1">
                        <Plus size={16} /> Nový příkaz
                    </button>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-admin-wash text-admin-sub text-xs uppercase font-bold border-b border-admin-border">
                        <tr>
                            <th className="px-6 py-3">Trigger / Událost</th>
                            <th className="px-6 py-3">Odpověď</th>
                            <th className="px-6 py-3">Typ</th>
                            <th className="px-6 py-3">Cooldown</th>
                            <th className="px-6 py-3 text-right">Akce</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-admin-border">
                        {commands.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-admin-sub">Žádné vlastní příkazy. Vytvořte nový!</td>
                            </tr>
                        )}
                        {commands.map((cmd) => (
                            <tr key={cmd.id} className="hover:bg-admin-wash/50 group">
                                <td className="px-6 py-4 font-mono text-sm text-blue-400 font-bold">{cmd.trigger}</td>
                                <td className="px-6 py-4 text-sm text-admin-sub truncate max-w-xs" title={cmd.response}>{cmd.response}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs px-2 py-1 rounded font-bold ${cmd.type === 'event' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                        {cmd.type === 'command' ? 'PŘÍKAZ' : cmd.type === 'event' ? 'UDÁLOST' : 'ČASOVAČ'}
                                    </span>
                                    {!cmd.enabled && <span className="ml-2 text-xs bg-admin-wash text-admin-sub px-2 py-1 rounded">VYPNUTO</span>}
                                </td>
                                <td className="px-6 py-4 text-sm text-admin-sub">{cmd.cooldown}s</td>
                                <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openEdit(cmd)} className="text-admin-sub hover:text-blue-400 font-medium text-sm mr-3">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDeleteCommand(cmd.id)} className="text-admin-sub hover:text-red-400 font-medium text-sm">
                                        <Trash size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* OBS Setup Guide */}
            <div className="bg-admin-card rounded-xl border border-admin-border shadow-xs overflow-hidden mt-8">
                <div className="border-b border-admin-border p-4 bg-gradient-to-r from-violet-500/10 to-blue-500/10 flex items-center gap-3">
                    <Info size={20} className="text-violet-400" />
                    <h2 className="font-bold text-admin-text">Nastavení OBS Studio</h2>
                    <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full font-medium">dokumentace</span>
                </div>

                <div className="p-6 space-y-6">
                    {/* Downloads */}
                    <div>
                        <h3 className="text-sm font-bold text-admin-text mb-3 flex items-center gap-2">
                            <Download size={16} className="text-blue-400" />
                            Soubory ke stažení
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <a
                                href="/docs/lua_scripts_bot/pomodoro-timer.py"
                                download="pomodoro-timer.py"
                                className="flex items-center gap-3 p-3 bg-admin-wash rounded-lg border border-admin-border hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
                            >
                                <Code size={24} className="text-blue-400" />
                                <div>
                                    <div className="font-medium text-admin-text group-hover:text-blue-400">pomodoro-timer.py</div>
                                    <div className="text-xs text-admin-sub">Hlavní Python skript</div>
                                </div>
                            </a>
                            <a
                                href="/docs/lua_scripts_bot/url-text.py"
                                download="url-text.py"
                                className="flex items-center gap-3 p-3 bg-admin-wash rounded-lg border border-admin-border hover:border-green-500/50 hover:bg-green-500/5 transition-all group"
                            >
                                <Code size={24} className="text-green-400" />
                                <div>
                                    <div className="font-medium text-admin-text group-hover:text-green-400">url-text.py</div>
                                    <div className="text-xs text-admin-sub">URL text overlay</div>
                                </div>
                            </a>
                            <a
                                href="/docs/lua_scripts_bot/clear-timeline.py"
                                download="clear-timeline.py"
                                className="flex items-center gap-3 p-3 bg-admin-wash rounded-lg border border-admin-border hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all group"
                            >
                                <Code size={24} className="text-yellow-400" />
                                <div>
                                    <div className="font-medium text-admin-text group-hover:text-yellow-400">clear-timeline.py</div>
                                    <div className="text-xs text-admin-sub">Vymazání timeline</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Setup Steps */}
                    <div>
                        <h3 className="text-sm font-bold text-admin-text mb-3 flex items-center gap-2">
                            <Settings2 size={16} className="text-emerald-400" />
                            Instalace do OBS Studio
                        </h3>
                        <div className="space-y-3">
                            <div className="flex gap-3 p-3 bg-admin-wash rounded-lg border border-admin-border">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">1</div>
                                <div>
                                    <div className="font-medium text-admin-text">Nainstaluj Python 3.12+</div>
                                    <div className="text-sm text-admin-sub mt-1">
                                        Stáhni z <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">python.org <ExternalLink size={12} /></a>. 
                                        Při instalaci zaškrtni <code className="bg-admin-border px-1 rounded text-xs">"Add to PATH"</code>.
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 p-3 bg-admin-wash rounded-lg border border-admin-border">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">2</div>
                                <div>
                                    <div className="font-medium text-admin-text">Nastav Python v OBS</div>
                                    <div className="text-sm text-admin-sub mt-1">
                                        <code className="bg-admin-border px-1 rounded text-xs">Tools → Scripts → Python Settings</code> → 
                                        Nastav cestu k Python instalaci (např. <code className="bg-admin-border px-1 rounded text-xs">C:\Users\...\AppData\Local\Programs\Python\Python312</code>)
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 p-3 bg-admin-wash rounded-lg border border-admin-border">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">3</div>
                                <div>
                                    <div className="font-medium text-admin-text">Přidej skript</div>
                                    <div className="text-sm text-admin-sub mt-1">
                                        <code className="bg-admin-border px-1 rounded text-xs">Tools → Scripts → + (Add)</code> → 
                                        Vyber stažený soubor <code className="bg-admin-border px-1 rounded text-xs">pomodoro-timer.py</code>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 p-3 bg-admin-wash rounded-lg border border-admin-border">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">4</div>
                                <div>
                                    <div className="font-medium text-admin-text">Vytvoř textové zdroje</div>
                                    <div className="text-sm text-admin-sub mt-1">
                                        V OBS vytvoř 3 <code className="bg-admin-border px-1 rounded text-xs">Text (GDI+)</code> zdroje s názvy:
                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            <code className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs">pomodoro_mode</code>
                                            <code className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs">pomodoro_timer</code>
                                            <code className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded text-xs">pomodoro_session</code>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 p-3 bg-admin-wash rounded-lg border border-admin-border">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">5</div>
                                <div>
                                    <div className="font-medium text-admin-text">Konfiguruj skript</div>
                                    <div className="text-sm text-admin-sub mt-1">
                                        Ve Script panelu nastav:
                                        <ul className="mt-1 ml-4 list-disc text-admin-sub">
                                            <li>Focus, Break, Long Break délky</li>
                                            <li>Počet sessions</li>
                                            <li>Zvukový soubor (volitelné)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Usage */}
                    <div>
                        <h3 className="text-sm font-bold text-admin-text mb-3 flex items-center gap-2">
                            <Play size={16} className="text-blue-400" />
                            Ovládání
                        </h3>
                        <div className="bg-admin-wash rounded-lg border border-admin-border p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="font-medium text-admin-text mb-2">Ve Script panelu:</div>
                                    <ul className="space-y-1 text-admin-sub">
                                        <li>• <span className="text-green-400 font-mono">▶ Start</span> - Spustí timer</li>
                                        <li>• <span className="text-yellow-400 font-mono">⏸ Pause</span> - Pozastaví</li>
                                        <li>• <span className="text-red-400 font-mono">⏹ Stop</span> - Zastaví a resetuje</li>
                                        <li>• <span className="text-blue-400 font-mono">⏭ Skip</span> - Přeskočí fázi</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="font-medium text-admin-text mb-2">Hotkeys (volitelné):</div>
                                    <ul className="space-y-1 text-admin-sub">
                                        <li>• <code className="bg-admin-border px-1 rounded text-xs">Settings → Hotkeys</code></li>
                                        <li>• Hledej "Pomodoro"</li>
                                        <li>• Přiřaď klávesy pro Start/Pause/Stop</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Firebase Info */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Info size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <div className="font-medium text-blue-400 mb-1">Automatická synchronizace</div>
                                <div className="text-admin-sub">
                                    Skript automaticky zapisuje stav do Firebase (<code className="bg-admin-border px-1 rounded text-xs">runtime/obsPomodoro</code>). 
                                    Webová stránka se aktualizuje v reálném čase. API klíč je již v skriptu nastaven.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit/Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-admin-surface rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-admin-border">
                        <div className="bg-admin-wash px-6 py-4 border-b border-admin-border flex justify-between items-center">
                            <h3 className="font-bold text-admin-text">{editingCmd ? 'Upravit příkaz' : 'Nový příkaz'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-admin-sub hover:text-admin-text"><X size={20} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-admin-sub uppercase mb-1">Trigger / Název události</label>
                                <input
                                    type="text"
                                    value={formData.trigger}
                                    onChange={e => setFormData({ ...formData, trigger: e.target.value })}
                                    className="w-full border border-admin-border bg-admin-wash rounded px-3 py-2 font-mono text-sm text-admin-text placeholder:text-admin-sub"
                                    placeholder="např. !mujprikaz nebo EVENT:START"
                                    disabled={!!editingCmd}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-admin-sub uppercase mb-1">Text odpovědi</label>
                                <textarea
                                    value={formData.response}
                                    onChange={e => setFormData({ ...formData, response: e.target.value })}
                                    className="w-full border border-admin-border bg-admin-wash rounded px-3 py-2 text-sm h-24 text-admin-text placeholder:text-admin-sub"
                                    placeholder="Ahoj světe..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-admin-sub uppercase mb-1">Typ</label>
                                    <select
                                        value={formData.type}
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- formData.type validated by select options
                                        onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                                        className="w-full border border-admin-border bg-admin-wash rounded px-3 py-2 text-sm text-admin-text"
                                    >
                                        <option value="command">Příkaz (!)</option>
                                        <option value="event">Událost (Auto)</option>
                                        <option value="timer">Časovač (Opakovat)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-admin-sub uppercase mb-1">Cooldown (sek)</label>
                                    <input
                                        type="number"
                                        value={formData.cooldown}
                                        onChange={e => setFormData({ ...formData, cooldown: parseInt(e.target.value) || 0 })}
                                        className="w-full border border-admin-border bg-admin-wash rounded px-3 py-2 text-sm text-admin-text"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="enabled"
                                    checked={formData.enabled}
                                    onChange={e => setFormData({ ...formData, enabled: e.target.checked })}
                                />
                                <label htmlFor="enabled" className="text-sm font-medium text-admin-text">Aktivní</label>
                            </div>
                        </div>
                        <div className="bg-admin-wash px-6 py-4 border-t border-admin-border flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-admin-sub hover:text-admin-text">Zrušit</button>
                            <button onClick={handleSaveCommand} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-bold flex items-center gap-2">
                                <Save size={16} /> Uložit příkaz
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

export default StudyBotPage;
