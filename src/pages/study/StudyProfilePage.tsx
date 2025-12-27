import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail, sendEmailVerification, deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { useAuth } from '../../lib/auth';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useStudyTranslations } from '../../study/i18n/useStudyTranslations';
import {
    Edit2, Save, X, Camera, Award, BarChart3, MessageSquare,
    Key, Mail, Trash2, LogOut, Loader2, Check, AlertCircle,
    Youtube, Instagram, MessageCircle
} from 'lucide-react';
import { validateDisplayName, validateBio, validateStudyVibeText } from '../../utils/handleValidation';
import { logger } from '../../utils/logger';
import { getErrorMessage } from '../../utils/errorHelpers';
import { BadgesSection } from '../../components/study/profile/BadgesSection';
import { UserFAQHistory } from '../../components/study/profile/UserFAQHistory';

// Study vibe templates
const VIBE_TEMPLATES = [
    { id: 'pomodoro_25_5', key: 'vibePomodoro' },
    { id: 'deep_work_90', key: 'vibeDeepWork' },
    { id: 'study_50_10', key: 'vibe5050' },
    { id: 'custom', key: 'vibeCustomTemplate' },
];

export function StudyProfilePage() {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const { profile, loading, error, updateDisplayName, updateBio, updateStatus, updateStudyVibe, updateSocialLinks } = useUserProfile();
    const t = useStudyTranslations();

    // Edit states
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [editError, setEditError] = useState('');

    // Form states
    const [editDisplayName, setEditDisplayName] = useState('');
    const [editBio, setEditBio] = useState('');
    const [editStatus, setEditStatus] = useState<'studying' | 'break' | 'offline'>('offline');
    const [editVibeTemplate, setEditVibeTemplate] = useState('pomodoro_25_5');
    const [editVibeCustom, setEditVibeCustom] = useState('');
    const [editYoutube, setEditYoutube] = useState('');
    const [editInstagram, setEditInstagram] = useState('');
    const [editDiscord, setEditDiscord] = useState('');
    const [editTwitter, setEditTwitter] = useState('');
    const [editLinksPublic, setEditLinksPublic] = useState(true);

    // Account action states
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionMessage, setActionMessage] = useState('');

    // Start editing
    const startEditing = () => {
        if (profile) {
            setEditDisplayName(profile.displayName || '');
            setEditBio(profile.bio || '');
            setEditStatus(profile.status || 'offline');
            setEditVibeTemplate(profile.studyVibe?.template || 'pomodoro_25_5');
            setEditVibeCustom(profile.studyVibe?.customText || '');
            setEditYoutube(profile.socialLinks?.youtube || '');
            setEditInstagram(profile.socialLinks?.instagram || '');
            setEditDiscord(profile.socialLinks?.discord || '');
            setEditTwitter(profile.socialLinks?.twitter || '');
            setEditLinksPublic(profile.socialLinks?.isPublic ?? true);
        }
        setIsEditing(true);
        setEditError('');
    };

    // Cancel editing
    const cancelEditing = () => {
        setIsEditing(false);
        setEditError('');
    };

    // Save changes
    const saveChanges = async () => {
        setIsSaving(true);
        setEditError('');

        try {
            // Validate
            const nameValidation = validateDisplayName(editDisplayName);
            if (!nameValidation.valid) {
                setEditError(nameValidation.error || t.profile.updateError);
                setIsSaving(false);
                return;
            }

            const bioValidation = validateBio(editBio);
            if (!bioValidation.valid) {
                setEditError(bioValidation.error || t.profile.updateError);
                setIsSaving(false);
                return;
            }

            const vibeValidation = validateStudyVibeText(editVibeCustom);
            if (!vibeValidation.valid) {
                setEditError(vibeValidation.error || t.profile.updateError);
                setIsSaving(false);
                return;
            }

            // Update all fields
            await Promise.all([
                updateDisplayName(editDisplayName),
                updateBio(editBio),
                updateStatus(editStatus),
                updateStudyVibe(editVibeTemplate, editVibeCustom),
                updateSocialLinks({
                    youtube: editYoutube.trim() || undefined,
                    instagram: editInstagram.trim() || undefined,
                    discord: editDiscord.trim() || undefined,
                    twitter: editTwitter.trim() || undefined,
                    isPublic: editLinksPublic
                })
            ]);

            setIsEditing(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 2000);
        } catch (err) {
            logger.error(err instanceof Error ? err : new Error(`Profile save error: ${String(err)}`));
            setEditError(t.profile.updateError);
        } finally {
            setIsSaving(false);
        }
    };

    // Send verification email
    const handleSendVerification = async () => {
        if (!auth?.currentUser) return;
        setActionLoading(true);
        setActionMessage('');

        try {
            await sendEmailVerification(auth.currentUser);
            setActionMessage('Verification email sent!');
        } catch (err) {
            setActionMessage(getErrorMessage(err));
        } finally {
            setActionLoading(false);
        }
    };

    // Reset password
    const handleResetPassword = async () => {
        if (!user?.email) return;
        setActionLoading(true);
        setActionMessage('');

        try {
            await sendPasswordResetEmail(auth!, user.email);
            setActionMessage('Password reset email sent!');
        } catch (err) {
            setActionMessage(getErrorMessage(err));
        } finally {
            setActionLoading(false);
        }
    };

    // Delete account
    const handleDeleteAccount = async () => {
        if (!auth?.currentUser || !db || !profile) return;
        setActionLoading(true);

        try {
            const uid = auth.currentUser.uid;

            // Delete user data from Firestore
            await deleteDoc(doc(db, 'study_users', uid));
            if (profile.handle) {
                await deleteDoc(doc(db, 'study_handles', profile.handle));
            }

            // Delete auth user
            await deleteUser(auth.currentUser);

            navigate('/study/auth', { replace: true });
        } catch (err) {
            logger.error(err instanceof Error ? err : new Error(`Delete account error: ${String(err)}`));
            setActionMessage(getErrorMessage(err));
            setActionLoading(false);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 flex items-center justify-center">
                <Loader2 className="animate-spin text-[var(--study-accent)]" size={32} />
            </div>
        );
    }

    // Not logged in or no profile
    if (!user || !profile) {
        return (
            <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <AlertCircle size={48} className="text-[var(--study-text-muted)] mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-[var(--study-text)] mb-2">{t.profile.loadError}</h1>
                    <button
                        onClick={() => navigate('/study/auth')}
                        className="mt-4 px-6 py-2 bg-[var(--study-accent)] text-[var(--study-bg)] rounded-lg font-medium"
                    >
                        {t.footer.login}
                    </button>
                </div>
            </div>
        );
    }

    const statusColors = {
        studying: 'bg-green-500',
        break: 'bg-yellow-500',
        offline: 'bg-gray-400'
    };

    return (
        <div className="min-h-screen bg-[var(--study-bg)] pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-[var(--study-text)]">{t.profile.title}</h1>
                    <div className="flex gap-2">
                        {saveSuccess && (
                            <span className="flex items-center gap-1 text-green-500 text-sm">
                                <Check size={16} /> {t.profile.saved}
                            </span>
                        )}
                        {isEditing ? (
                            <>
                                <button
                                    onClick={cancelEditing}
                                    className="flex items-center gap-2 px-4 py-2 border border-[var(--study-border)] rounded-lg text-[var(--study-text-muted)] hover:bg-[var(--study-surface)]"
                                >
                                    <X size={16} /> {t.profile.cancel}
                                </button>
                                <button
                                    onClick={saveChanges}
                                    disabled={isSaving}
                                    className="flex items-center gap-2 px-4 py-2 bg-[var(--study-accent)] text-[var(--study-bg)] rounded-lg font-medium disabled:opacity-50"
                                >
                                    {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                    {t.profile.saveChanges}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={startEditing}
                                className="flex items-center gap-2 px-4 py-2 border border-[var(--study-border)] rounded-lg text-[var(--study-text)] hover:bg-[var(--study-surface)]"
                            >
                                <Edit2 size={16} /> {t.profile.editProfile}
                            </button>
                        )}
                    </div>
                </div>

                {/* Error */}
                {(editError || error) && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600">
                        {editError || error}
                    </div>
                )}

                {/* Avatar & Basic Info Card */}
                <div className="bg-[var(--study-surface)] rounded-2xl border border-[var(--study-border)] p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Avatar */}
                        <div className="flex flex-col items-center">
                            <div className="relative w-24 h-24 rounded-full bg-[var(--study-bg)] border-2 border-[var(--study-border)] overflow-hidden">
                                {profile.avatarUrl ? (
                                    <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[var(--study-text-muted)]">
                                        {profile.handle?.[0]?.toUpperCase() || '?'}
                                    </div>
                                )}
                                {/* Status indicator */}
                                <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-[var(--study-surface)] ${statusColors[profile.status]}`} />
                            </div>
                            {isEditing && (
                                <button className="mt-2 text-xs text-[var(--study-accent)] flex items-center gap-1">
                                    <Camera size={12} /> {t.profile.changeAvatar}
                                </button>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-4">
                            {/* Handle (read-only) */}
                            <div>
                                <label className="text-xs text-[var(--study-text-muted)] mb-1 block">{t.profile.handle}</label>
                                <p className="text-lg font-medium text-[var(--study-text)]">@{profile.handle}</p>
                            </div>

                            {/* Display Name */}
                            <div>
                                <label className="text-xs text-[var(--study-text-muted)] mb-1 block">{t.profile.displayName}</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editDisplayName}
                                        onChange={(e) => setEditDisplayName(e.target.value)}
                                        placeholder={t.profile.displayNamePlaceholder}
                                        maxLength={20}
                                        className="w-full px-3 py-2 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)]"
                                    />
                                ) : (
                                    <p className="text-[var(--study-text)]">{profile.displayName || '-'}</p>
                                )}
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="text-xs text-[var(--study-text-muted)] mb-1 block">{t.profile.bio}</label>
                                {isEditing ? (
                                    <textarea
                                        value={editBio}
                                        onChange={(e) => setEditBio(e.target.value)}
                                        placeholder={t.profile.bioPlaceholder}
                                        maxLength={200}
                                        rows={2}
                                        className="w-full px-3 py-2 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)] resize-none"
                                    />
                                ) : (
                                    <p className="text-[var(--study-text)]">{profile.bio || '-'}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status & Study Vibe */}
                <div className="bg-[var(--study-surface)] rounded-2xl border border-[var(--study-border)] p-6 mb-6">
                    <h3 className="font-bold text-[var(--study-text)] mb-4">{t.profile.status} & {t.profile.studyVibe}</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Status */}
                        <div>
                            <label className="text-xs text-[var(--study-text-muted)] mb-2 block">{t.profile.status}</label>
                            {isEditing ? (
                                <select
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value as 'studying' | 'break' | 'offline')}
                                    className="w-full px-3 py-2 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)]"
                                >
                                    <option value="studying">{t.profile.statusStudying}</option>
                                    <option value="break">{t.profile.statusBreak}</option>
                                    <option value="offline">{t.profile.statusOffline}</option>
                                </select>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${statusColors[profile.status]}`} />
                                    <span className="text-[var(--study-text)]">
                                        {profile.status === 'studying' ? t.profile.statusStudying :
                                            profile.status === 'break' ? t.profile.statusBreak : t.profile.statusOffline}
                                    </span>
                                </div>
                            )}
                            <p className="text-xs text-[var(--study-text-muted)] mt-1">{t.profile.statusHint}</p>
                        </div>

                        {/* Study Vibe */}
                        <div>
                            <label className="text-xs text-[var(--study-text-muted)] mb-2 block">{t.profile.studyVibe}</label>
                            {isEditing ? (
                                <div className="space-y-2">
                                    <select
                                        value={editVibeTemplate}
                                        onChange={(e) => setEditVibeTemplate(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)]"
                                    >
                                        {VIBE_TEMPLATES.map((v) => (
                                            <option key={v.id} value={v.id}>
                                                {t.profile[v.key as keyof typeof t.profile]}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        value={editVibeCustom}
                                        onChange={(e) => setEditVibeCustom(e.target.value)}
                                        placeholder={t.profile.vibeCustomPlaceholder}
                                        maxLength={60}
                                        className="w-full px-3 py-2 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)]"
                                    />
                                </div>
                            ) : (
                                <p className="text-[var(--study-text)]">
                                    {profile.studyVibe?.customText ||
                                        VIBE_TEMPLATES.find(v => v.id === profile.studyVibe?.template)?.key
                                        ? t.profile[VIBE_TEMPLATES.find(v => v.id === profile.studyVibe?.template)?.key as keyof typeof t.profile]
                                        : t.profile.vibePomodoro}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-[var(--study-surface)] rounded-2xl border border-[var(--study-border)] p-6 mb-6">
                    <h3 className="font-bold text-[var(--study-text)] mb-4">{t.profile.socialLinks}</h3>

                    {isEditing ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Youtube size={20} className="text-red-500" />
                                <input
                                    type="url"
                                    value={editYoutube}
                                    onChange={(e) => setEditYoutube(e.target.value)}
                                    placeholder={t.profile.linkPlaceholder}
                                    className="flex-1 px-3 py-2 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)]"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Instagram size={20} className="text-pink-500" />
                                <input
                                    type="url"
                                    value={editInstagram}
                                    onChange={(e) => setEditInstagram(e.target.value)}
                                    placeholder={t.profile.linkPlaceholder}
                                    className="flex-1 px-3 py-2 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)]"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageCircle size={20} className="text-indigo-500" />
                                <input
                                    type="url"
                                    value={editDiscord}
                                    onChange={(e) => setEditDiscord(e.target.value)}
                                    placeholder={t.profile.linkPlaceholder}
                                    className="flex-1 px-3 py-2 rounded-lg border border-[var(--study-border)] bg-[var(--study-bg)] text-[var(--study-text)]"
                                />
                            </div>
                            <label className="flex items-center gap-2 mt-3">
                                <input
                                    type="checkbox"
                                    checked={editLinksPublic}
                                    onChange={(e) => setEditLinksPublic(e.target.checked)}
                                    className="rounded"
                                />
                                <span className="text-sm text-[var(--study-text-muted)]">{t.profile.linksPublic}</span>
                            </label>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-3">
                            {profile.socialLinks?.youtube && (
                                <a href={profile.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--study-bg)] text-[var(--study-text)]">
                                    <Youtube size={16} className="text-red-500" /> YouTube
                                </a>
                            )}
                            {profile.socialLinks?.instagram && (
                                <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--study-bg)] text-[var(--study-text)]">
                                    <Instagram size={16} className="text-pink-500" /> Instagram
                                </a>
                            )}
                            {profile.socialLinks?.discord && (
                                <a href={profile.socialLinks.discord} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--study-bg)] text-[var(--study-text)]">
                                    <MessageCircle size={16} className="text-indigo-500" /> Discord
                                </a>
                            )}
                            {!profile.socialLinks?.youtube && !profile.socialLinks?.instagram && !profile.socialLinks?.discord && (
                                <span className="text-[var(--study-text-muted)]">-</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="bg-[var(--study-surface)] rounded-2xl border border-[var(--study-border)] p-6 mb-6">
                    <h3 className="font-bold text-[var(--study-text)] mb-4 flex items-center gap-2">
                        <BarChart3 size={18} /> {t.profile.stats}
                    </h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-[var(--study-accent)]">{profile.stats?.totalHours || 0}</p>
                            <p className="text-xs text-[var(--study-text-muted)]">{t.profile.totalHours}</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--study-accent)]">{profile.stats?.currentStreak || 0}</p>
                            <p className="text-xs text-[var(--study-text-muted)]">{t.profile.currentStreak}</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[var(--study-accent)]">{profile.stats?.weeklyAverage || 0}</p>
                            <p className="text-xs text-[var(--study-text-muted)]">{t.profile.weeklyAverage}</p>
                        </div>
                    </div>
                </div>

                {/* Badges */}
                <div className="bg-[var(--study-surface)] rounded-2xl border border-[var(--study-border)] p-6 mb-6">
                    <h3 className="font-bold text-[var(--study-text)] mb-4 flex items-center gap-2">
                        <Award size={18} /> {t.profile.badges}
                    </h3>
                    <BadgesSection earnedBadges={profile.badges || []} />
                </div>

                {/* FAQ History */}
                <div className="bg-[var(--study-surface)] rounded-2xl border border-[var(--study-border)] p-6 mb-6">
                    <h3 className="font-bold text-[var(--study-text)] mb-4 flex items-center gap-2">
                        <MessageSquare size={18} /> {t.profile.faqHistory}
                    </h3>
                    <UserFAQHistory />
                </div>

                {/* Account Settings */}
                <div className="bg-[var(--study-surface)] rounded-2xl border border-[var(--study-border)] p-6">
                    <h3 className="font-bold text-[var(--study-text)] mb-4">{t.profile.account}</h3>

                    {actionMessage && (
                        <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 text-sm">
                            {actionMessage}
                        </div>
                    )}

                    <div className="space-y-3">
                        {/* Email verification */}
                        <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-2">
                                <Mail size={18} className="text-[var(--study-text-muted)]" />
                                <span className="text-[var(--study-text)]">{t.profile.emailVerification}</span>
                                {user.emailVerified ? (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">{t.profile.verified}</span>
                                ) : (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600">{t.profile.notVerified}</span>
                                )}
                            </div>
                            {!user.emailVerified && (
                                <button
                                    onClick={handleSendVerification}
                                    disabled={actionLoading}
                                    className="text-sm text-[var(--study-accent)] hover:underline"
                                >
                                    {t.profile.sendVerification}
                                </button>
                            )}
                        </div>

                        {/* Reset password */}
                        <div className="flex items-center justify-between py-2 border-t border-[var(--study-border)]">
                            <div className="flex items-center gap-2">
                                <Key size={18} className="text-[var(--study-text-muted)]" />
                                <span className="text-[var(--study-text)]">{t.profile.resetPassword}</span>
                            </div>
                            <button
                                onClick={handleResetPassword}
                                disabled={actionLoading}
                                className="text-sm text-[var(--study-accent)] hover:underline"
                            >
                                {t.profile.resetPassword}
                            </button>
                        </div>

                        {/* Logout */}
                        <div className="flex items-center justify-between py-2 border-t border-[var(--study-border)]">
                            <div className="flex items-center gap-2">
                                <LogOut size={18} className="text-[var(--study-text-muted)]" />
                                <span className="text-[var(--study-text)]">{t.footer.logout}</span>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="text-sm text-[var(--study-accent)] hover:underline"
                            >
                                {t.footer.logout}
                            </button>
                        </div>

                        {/* Delete account */}
                        <div className="pt-4 border-t border-[var(--study-border)]">
                            {showDeleteConfirm ? (
                                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                                    <p className="text-sm text-red-600 mb-3">{t.profile.deleteAccountWarning}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className="px-4 py-2 border border-[var(--study-border)] rounded-lg text-[var(--study-text)]"
                                        >
                                            {t.profile.cancel}
                                        </button>
                                        <button
                                            onClick={handleDeleteAccount}
                                            disabled={actionLoading}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2"
                                        >
                                            {actionLoading && <Loader2 className="animate-spin" size={16} />}
                                            <Trash2 size={16} /> {t.profile.confirmDelete}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="flex items-center gap-2 text-red-500 hover:underline"
                                >
                                    <Trash2 size={16} /> {t.profile.deleteAccount}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
