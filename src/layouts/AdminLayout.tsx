import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Globe, Home, User, LogOut, Briefcase, FileText, Database, Terminal, BookOpen, Inbox, MessageSquare, Settings, DownloadCloud, Calendar, FileUser, Target } from "lucide-react";
import { useAuth } from "../lib/auth";
import { Toaster } from 'react-hot-toast';

interface AdminLayoutProps {
    children: ReactNode;
    title: string;
    actions?: ReactNode;
    maxWidth?: string;
}

import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export function AdminLayout({ children, title, actions, maxWidth }: AdminLayoutProps) {
    const { user, signOut } = useAuth();
    const { theme, toggleTheme, setTheme } = useTheme();
    const location = useLocation();

    // Default to Dark Mode for Admin if not explicitly set in this session/storage logic
    // But since we use a global storage key, we just respect it. 
    // If we strictly want "Admin defaults to Dark", we can do:
    useEffect(() => {
        // Optional: Force dark on first admin visit if we wanted distinct Defaults
        // But simplifying to just respect global toggle for consistency.
        // User asked: "default tmavý" (default dark). 
        // Let's check if storage is empty?
        if (!localStorage.getItem('app-theme')) {
            setTheme('dark');
        }
    }, [setTheme]); // Include setTheme dependency

    const sections = [
        {
            title: "CV",
            items: [
                { path: "/admin", icon: <LayoutDashboard size={18} />, label: "Přehled" },
                { path: "/admin/global", icon: <Globe size={18} />, label: "Globální nastavení" },
                { path: "/admin/home", icon: <Home size={18} />, label: "Úvodní stránka" },
                { path: "/admin/profile", icon: <User size={18} />, label: "Profil" },
                { path: "/admin/portfolio", icon: <Briefcase size={18} />, label: "Portfolio" },
                { path: "/admin/documents", icon: <FileText size={18} />, label: "Dokumenty" },
                { path: "/admin/backup", icon: <Database size={18} />, label: "Záloha & Data" },
                { path: "/admin/import-export", icon: <DownloadCloud size={18} />, label: "Import / Export" },
            ]
        },
        {
            title: "STUDY HUB",
            items: [
                { path: "/admin/study-bot", icon: <Terminal size={18} />, label: "Study Bot" },
                { path: "/admin/room-settings", icon: <Settings size={18} />, label: "Místnost" },
                { path: "/admin/study-global-settings", icon: <Globe size={18} />, label: "Globální nastavení" },
                { path: "/admin/study-schedule", icon: <Calendar size={18} />, label: "Rozvrh" },
                { path: "/admin/study-plan", icon: <BookOpen size={18} />, label: "Studijní plán" },
                { path: "/admin/study-progress", icon: <Target size={18} />, label: "Progress" },
                { path: "/admin/faq-editor", icon: <MessageSquare size={18} />, label: "FAQ" },
                { path: "/admin/inbox", icon: <Inbox size={18} />, label: "Schránka" },
                { path: "/admin/introduction-editor", icon: <FileUser size={18} />, label: "Intro" },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-admin-bg flex font-sans text-admin-text transition-colors duration-200">
            {/* Toast Notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: theme === 'dark' ? '#1e293b' : '#ffffff',
                        color: theme === 'dark' ? '#e2e8f0' : '#0f172a',
                        border: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#ffffff',
                        },
                    },
                }}
            />

            {/* Sidebar */}
            <aside className="w-64 bg-admin-sidebar border-r border-admin-border flex flex-col fixed h-full z-40 overflow-y-auto shadow-xs transition-colors duration-200">
                <div className="p-6 border-b border-admin-border">
                    <h1 className="text-admin-sidebar-text font-bold text-lg tracking-tight">Tyrnel Admin</h1>
                    <div className="text-xs text-admin-sub mt-1 truncate opacity-70">{user?.email}</div>
                </div>

                <nav className="flex-1 p-4 space-y-6">
                    {sections.map((section, idx) => (
                        <div key={idx}>
                            <h3 className="px-3 text-xs font-bold text-admin-sub uppercase tracking-wider mb-2 opacity-80">
                                {section.title}
                            </h3>
                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const active = location.pathname === item.path || (item.path !== "/admin" && location.pathname.startsWith(item.path));
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${active
                                                ? "bg-admin-wash text-admin-primary shadow-xs border border-admin-primary/10"
                                                : "text-admin-sub hover:bg-admin-border/30 hover:text-admin-text"
                                                }`}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                            {/* Divider between sections */}
                            {idx < sections.length - 1 && <div className="mt-4 border-b border-admin-border mx-2" />}
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-admin-border">
                    <button
                        onClick={signOut}
                        className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-admin-sub hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
                    >
                        <LogOut size={18} />
                        Odhlásit se
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <div className="@starting-style:opacity-0 opacity-100 transition-opacity duration-500">
                    <div className={`mx-auto ${maxWidth || 'max-w-7xl'}`}>
                        <header className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-admin-text tracking-tight">{title}</h2>

                            <div className="flex items-center gap-4">
                                {/* Theme Toggle */}
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-full bg-admin-surface border border-admin-border text-admin-sub hover:text-admin-text hover:bg-admin-border/50 transition-colors"
                                    title="Switch Theme"
                                >
                                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                </button>

                                {actions && <div className="flex items-center gap-3">{actions}</div>}
                            </div>
                        </header>

                        <div className="bg-admin-surface rounded-xl shadow-xs border border-admin-border overflow-hidden transition-colors duration-200">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
