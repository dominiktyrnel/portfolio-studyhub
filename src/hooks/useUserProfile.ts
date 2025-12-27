import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../lib/auth';
import type { UserProfile } from '../types/study-db';
import { logger } from '../utils/logger';

const DEFAULT_PROFILE: Partial<UserProfile> = {
    status: 'offline',
    preferredLang: 'kr',
    stats: {
        totalHours: 0,
        currentStreak: 0,
        weeklyAverage: 0
    },
    badges: [],
    faqStats: {
        totalAsked: 0,
        todayAsked: 0
    }
};

export function useUserProfile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Handle no user/db case
    useEffect(() => {
        if (!user || !db) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional sync reset on unmount
            setProfile(null);
             
            setLoading(false);
        }
    }, [user]);

    // Real-time listener for profile changes
    useEffect(() => {
        if (!user || !db) {
            return;
        }

        const unsubscribe = onSnapshot(
            doc(db, 'study_users', user.uid),
            (snapshot) => {
                if (snapshot.exists()) {
                    setProfile(snapshot.data() as UserProfile);
                } else {
                    setProfile(null);
                }
                setLoading(false);
                setError(null);
            },
            (err) => {
                logger.error(err instanceof Error ? err : new Error(`Profile fetch error: ${String(err)}`));
                setError('Failed to load profile');
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    // Update profile fields
    const updateProfile = async (updates: Partial<UserProfile>): Promise<boolean> => {
        if (!user || !db || !profile) return false;

        try {
            await updateDoc(doc(db, 'study_users', user.uid), {
                ...updates,
                updatedAt: serverTimestamp()
            });
            return true;
        } catch (err) {
            logger.error(err instanceof Error ? err : new Error(`Profile update error: ${String(err)}`));
            setError('Failed to update profile');
            return false;
        }
    };

    // Update specific fields
    const updateDisplayName = async (displayName: string) => {
        return updateProfile({ displayName: displayName.trim() || undefined });
    };

    const updateBio = async (bio: string) => {
        return updateProfile({ bio: bio.trim() || undefined });
    };

    const updatePreferredLang = async (lang: 'kr' | 'en') => {
        return updateProfile({ preferredLang: lang });
    };

    const updateStatus = async (status: 'studying' | 'break' | 'offline') => {
        return updateProfile({ status });
    };

    const updateStudyVibe = async (template: string, customText?: string) => {
        return updateProfile({
            studyVibe: {
                template,
                customText: customText?.trim() || undefined
            }
        });
    };

    const updateSocialLinks = async (links: UserProfile['socialLinks']) => {
        return updateProfile({ socialLinks: links });
    };

    const updateAvatarUrl = async (avatarUrl: string) => {
        return updateProfile({ avatarUrl });
    };

    return {
        profile,
        loading,
        error,
        updateProfile,
        updateDisplayName,
        updateBio,
        updatePreferredLang,
        updateStatus,
        updateStudyVibe,
        updateSocialLinks,
        updateAvatarUrl,
        DEFAULT_PROFILE
    };
}

/**
 * Fetch a user profile by UID (for viewing other profiles)
 */
export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
    if (!db) return null;

    try {
        const snap = await getDoc(doc(db, 'study_users', uid));
        if (snap.exists()) {
            return snap.data() as UserProfile;
        }
        return null;
    } catch (err) {
        logger.error(err instanceof Error ? err : new Error(`Fetch profile error: ${String(err)}`));
        return null;
    }
}

/**
 * Fetch a user profile by handle
 */
export async function fetchUserProfileByHandle(handle: string): Promise<UserProfile | null> {
    if (!db) return null;

    try {
        // First get the UID from handle document
        const handleDoc = await getDoc(doc(db, 'study_handles', handle.toLowerCase()));
        if (!handleDoc.exists()) return null;

        const uid = handleDoc.data().uid;
        return fetchUserProfile(uid);
    } catch (err) {
        logger.error(err instanceof Error ? err : new Error(`Fetch profile by handle error: ${String(err)}`));
        return null;
    }
}
