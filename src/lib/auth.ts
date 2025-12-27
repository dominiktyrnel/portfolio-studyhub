import { signInWithEmailAndPassword, signOut as firebaseSignOut, type User } from "firebase/auth";
import { auth, firebaseEnabled } from "./firebase";
import { useState, useEffect } from "react";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    // Initialize loading based on firebase availability to avoid setState in effect
    const [loading, setLoading] = useState(firebaseEnabled && !!auth);

    useEffect(() => {
        if (!firebaseEnabled || !auth) {
            // Loading already initialized to false, no setState needed
            return;
        }

        return auth.onAuthStateChanged((u) => {
            setUser(u);
            setLoading(false);
        });
    }, []);

    const signIn = async (email: string, pass: string) => {
        if (!firebaseEnabled || !auth) {
            throw new Error("Firebase is not configured.");
        }
        return signInWithEmailAndPassword(auth, email, pass);
    };

    const signOut = async () => {
        if (!firebaseEnabled || !auth) return;
        return firebaseSignOut(auth);
    };

    return { user, loading, signIn, signOut, firebaseEnabled };
}
