
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { logger } from "../utils/logger";

export interface GlobalContent {
    contact: {
        email: string;
        phoneCz: string;
        phoneKr: string;
        kakaoId: string;
        kakaoLink: string;
    };
    profile: {
        image: string;
        imageFull: string;
    };
}

export function useGlobalContent() {
    const [data, setData] = useState<GlobalContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (!db) return;
            try {
                // Fallback / Cache logic could go here
                const ref = doc(db, "content", "global");
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setData(snap.data() as GlobalContent);
                }
            } catch (e) {
                logger.warn(e instanceof Error ? e : new Error(`Global content load warning: ${String(e)}`));
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return { data, loading };
}
