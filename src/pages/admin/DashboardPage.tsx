import { AdminLayout } from "../../layouts/AdminLayout";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import { logger } from '../../utils/logger';
import { getKoreanDateString } from '../../utils/koreanTime';
import { buildInfo } from "../../admin/buildInfo";
import { BarChart3, Download, Eye, Server, RefreshCcw } from "lucide-react";
import { BotStatusCard } from "../../components/admin/BotStatusCard";

interface CurrentUser {
    email: string | null;
    uid: string;
}

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

export function DashboardPage() {
    const [stats, setStats] = useState({
        totalVisits: 0,
        todayVisits: 0,
        totalUniques: 0,
        todayUniques: 0,
        totalDownloads: 0
    });
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            if (auth?.currentUser) {
                setCurrentUser({
                    email: auth.currentUser.email,
                    uid: auth.currentUser.uid
                });
            }
            if (!db) return;
            try {
                // Fetch Total Metrics
                const totalRef = doc(db, "metrics", "total");
                const totalSnap = await getDoc(totalRef);
                const totalData = totalSnap.exists() ? totalSnap.data() : {};

                // Fetch Today Metrics
                const todayStr = getKoreanDateString();
                const todayRef = doc(db, "metrics", `daily_${todayStr}`);
                const todaySnap = await getDoc(todayRef);
                const todayData = todaySnap.exists() ? todaySnap.data() : {};

                setStats({
                    totalVisits: totalData.visits || 0,
                    todayVisits: todayData.visits || 0,
                    totalUniques: totalData.uniques || 0,
                    todayUniques: todayData.uniques || 0,
                    totalDownloads: totalData.downloads || 0
                });
            } catch (e) {
                logger.error(e instanceof Error ? e : new Error('Failed to fetch stats'));
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const StatCard = ({ title, value, icon, color }: StatCardProps) => (
        <div className="bg-admin-card p-6 rounded-xl shadow-xs border border-admin-border flex items-center justify-between card-3d-hover shadow-3d-hover">
            <div>
                <p className="text-admin-sub text-sm font-bold uppercase tracking-wider mb-1">{title}</p>
                <div className="text-3xl font-bold text-admin-text">{value}</div>
            </div>
            <div className={`p-4 rounded-full ${color} text-white shadow-md`}>
                {icon}
            </div>
        </div>
    );

    return (
        <AdminLayout title="Přehled">
            {/* P.8 Bot Health Status */}
            <div className="mb-8">
                <BotStatusCard />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Návštěvy dnes"
                    value={loading ? "..." : `${stats.todayVisits} / ${stats.todayUniques} unikátní`}
                    icon={<Eye size={24} />}
                    color="bg-emerald-500"
                />
                <StatCard
                    title="Návštěvy celkem"
                    value={loading ? "..." : stats.totalVisits}
                    icon={<BarChart3 size={24} />}
                    color="bg-blue-600"
                />
                <StatCard
                    title="Unikátní celkem"
                    value={loading ? "..." : stats.totalUniques}
                    icon={<Eye size={24} />}
                    color="bg-purple-600"
                />
                <StatCard
                    title="Stažení dokumentů"
                    value={loading ? "..." : stats.totalDownloads}
                    icon={<Download size={24} />}
                    color="bg-amber-500"
                />
            </div>

            {/* Build Info */}
            <div className="bg-admin-card rounded-xl shadow-xs border border-admin-border p-6">
                <div className="flex items-center gap-3 mb-4 text-admin-text">
                    <Server size={20} className="text-indigo-500" />
                    <h3 className="font-bold text-lg">Informace o sestavení (Build Info)</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div>
                        <div className="mb-4">
                            <span className="block text-admin-sub text-xs uppercase font-bold mb-1">Verze aplikace</span>
                            <span className="font-mono bg-admin-wash px-2 py-1 rounded text-admin-text">v{buildInfo?.version || "0.0.0"}</span>
                        </div>
                        <div className="mb-4">
                            <span className="block text-admin-sub text-xs uppercase font-bold mb-1">Datum sestavení</span>
                            <span className="text-admin-text font-medium">
                                {buildInfo?.buildTime ? new Date(buildInfo.buildTime).toLocaleString('cs-CZ') : "Neznámé"}
                            </span>
                        </div>
                    </div>
                    <div>
                        <span className="block text-admin-sub text-xs uppercase font-bold mb-2">Závislosti</span>
                        <div className="max-h-48 overflow-y-auto bg-admin-wash rounded border border-admin-border p-3 font-mono text-xs text-admin-sub">
                            {Object.entries(buildInfo?.dependencies || {}).map(([key, val]) => (
                                <div key={key} className="flex justify-between py-1 border-b border-admin-border last:border-0">
                                    <span>{key}</span>
                                    <span className="text-admin-sub opacity-70">{val as string}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-admin-border text-center">
                    <p className="text-xs text-admin-sub flex items-center justify-center gap-2 mb-2">
                        <RefreshCcw size={12} />
                        Statistiky jsou orientační. Aktualizují se s mírným zpožděním.
                    </p>
                    {currentUser && (
                        <p className="text-[10px] text-admin-sub opacity-50 font-mono">
                            Logged as: {currentUser.email} ({currentUser.uid})
                        </p>
                    )}
                </div>
            </div>

        </AdminLayout>
    );
}
