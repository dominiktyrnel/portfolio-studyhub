import { useState } from "react";
import { useAuth } from "../../lib/auth";
import { useNavigate } from "react-router-dom";
import { logger } from '../../utils/logger';

export function LoginPage() {
    const { signIn, firebaseEnabled } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (!firebaseEnabled) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-admin-bg p-4">
                <div className="p-8 bg-admin-card rounded shadow-md w-full max-w-sm text-center border border-admin-border">
                    <h1 className="text-xl font-bold mb-4 text-red-400">Admin není dostupný</h1>
                    <p className="text-admin-sub">Chybí konfigurace Firebase (VITE_FIREBASE_*).</p>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await signIn(email, pass);
            navigate("/admin");
        } catch (error) {
            logger.error(error instanceof Error ? error : new Error('Login failed'));
            setError('Chyba při přihlášení. Zkontroluj email a heslo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-admin-bg">
            <form onSubmit={handleSubmit} className="p-8 bg-admin-card rounded shadow-md w-full max-w-sm border border-admin-border">
                <h1 className="text-xl font-bold mb-4 text-admin-text">Admin Login</h1>
                {error && <div className="bg-red-900/20 text-red-400 p-2 mb-4 text-sm rounded border border-red-500/30">{error}</div>}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-admin-sub">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full border border-admin-border bg-admin-wash p-2 rounded text-admin-text placeholder:text-admin-sub"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1 text-admin-sub">Password</label>
                    <input
                        type="password"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        className="w-full border border-admin-border bg-admin-wash p-2 rounded text-admin-text"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
