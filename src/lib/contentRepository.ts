import { doc, getDoc, collection, query, orderBy, getDocs } from "firebase/firestore";
import { db, firebaseEnabled } from "./firebase";
import { content as contentKr } from "../content/kr";
import { contentEn } from "../content/en";
import { safeGetJSON, safeSetJSON, safeGetString, safeSetString } from "../utils/safeStorage";
import type { ContentStructure, PortfolioProject } from '../types/content';
import { logger } from "../utils/logger";

export type Lang = 'kr' | 'en';

const CACHE_PREFIX = "tyrnel_content_";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
const VERSION_KEY = "tyrnel_data_version";


export const ContentRepository = {
    async checkVersion() {
        if (!firebaseEnabled || !db) return;
        try {
            // Fetch remote version
            const snap = await getDoc(doc(db, "settings", "config"));
            if (snap.exists()) {
                const remoteVersion = snap.data().dataVersion;
                const localVersion = safeGetString(VERSION_KEY); // ✅ SECURITY FIX

                if (!localVersion || Number(remoteVersion) > Number(localVersion)) {
                    logger.info("[Content] New version detected. Clearing cache.");
                    // Clear all cache keys
                    localStorage.removeItem(CACHE_PREFIX + "kr");
                    localStorage.removeItem(CACHE_PREFIX + "en");
                    localStorage.removeItem("tyrnel_projects_kr");
                    localStorage.removeItem("tyrnel_projects_en");
                    localStorage.removeItem("tyrnel_documents_kr");
                    localStorage.removeItem("tyrnel_documents_en");
                    safeSetString(VERSION_KEY, String(remoteVersion));
                }
            }
        } catch (e) {
            logger.warn(e instanceof Error ? e : new Error(`[Content] Version check failed: ${String(e)}`));
        }
    },

    async getContent(lang: Lang) {
        const cacheKey = `${CACHE_PREFIX}${lang}`;

        // 1. Try Cache with validation
        try {
            const cached = safeGetJSON<{ data: unknown; timestamp: number }>(cacheKey); // ✅ SECURITY FIX
            if (cached && cached.data && cached.timestamp) {
                if (Date.now() - cached.timestamp < CACHE_TTL) {
                    return cached.data;
                }
            }
        } catch (e) {
            logger.warn(e instanceof Error ? e : new Error(`Cache read error: ${String(e)}`));
        }

        // 2. Try Firestore
        if (firebaseEnabled && db) {
            try {
                const snapshot = await getDoc(doc(db, "content", lang));
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    // Save to cache
                    safeSetJSON(cacheKey, { // ✅ SECURITY FIX
                        data: data,
                        timestamp: Date.now()
                    });
                    return data;
                }
            } catch (error) {
                logger.warn(error instanceof Error ? error : new Error(`[Content] Firestore fetch failed for ${lang}`));
            }
        }

        // 3. Fallback to Static
        return lang === 'kr' ? contentKr : contentEn;
    },

    async getProjects(lang: Lang) {
        const cacheKey = `tyrnel_projects_${lang}`;

        // 1. Try Cache with validation
        try {
            const cached = safeGetJSON<{ data: unknown[]; timestamp: number }>(cacheKey); // ✅ SECURITY FIX
            if (cached && Array.isArray(cached.data)) {
                if (Date.now() - cached.timestamp < CACHE_TTL) {
                    return cached.data;
                }
            }
        } catch (error) {
            // Cache read failed, continue to Firestore
            logger.info(`[Content] Cache read failed for projects: ${String(error)}`);
        }

        // 2. Try Firestore
        if (firebaseEnabled && db) {
            try {
                const q = query(collection(db, "projects"), orderBy("order", "asc"));
                const snap = await getDocs(q);
                if (!snap.empty) {
                    const projects = snap.docs.map(doc => {
                        const d = doc.data();
                        // Merge localized content
                        const localized = d[lang] || {};

                        // Get storageImages if available
                        const storageImages = d.media?.storageImages || [];

                        // Cover image priority: 
                        // 1. mainImageUrl (selected from gallery)
                        // 2. First storageImage
                        // 3. Legacy folder/file path
                        let coverImg = `/img/${d.media?.folderId}/${d.media?.mainImage}`;
                        if (d.media?.mainImageUrl) {
                            coverImg = d.media.mainImageUrl;
                        } else if (storageImages.length > 0) {
                            coverImg = storageImages[0].url;
                        }

                        return {
                            id: doc.id,
                            ...d,
                            ...localized, // Flatten localized props (title, summary, detail etc)
                            detail: localized.detail || {},
                            img: coverImg,
                            storageImages: storageImages // Pass to PortfolioDetail for gallery
                        };
                    });

                    safeSetJSON(cacheKey, { data: projects, timestamp: Date.now() }); // ✅ SECURITY FIX
                    return projects;
                }
            } catch (e) {
                logger.warn(e instanceof Error ? e : new Error(`Firestore projects fetch failed: ${String(e)}`));
            }
        }

        // 3. Fallback - ✅ FIXED: Properly typed
        const staticData = (lang === 'kr' ? contentKr : contentEn) as ContentStructure;
        return staticData.portfolio?.projects || [];
    },

    async getProjectById(lang: Lang, id: string) {
        const projects = await this.getProjects(lang);
        return projects.find((p: PortfolioProject) => p.id === id);
    },

    async getDocuments(lang: Lang) {
        const cacheKey = `tyrnel_documents_${lang}`;
        // 1. Cache with validation
        try {
            const cached = safeGetJSON<{ data: unknown[]; timestamp: number }>(cacheKey); // ✅ SECURITY FIX
            if (cached && Array.isArray(cached.data)) {
                if (Date.now() - cached.timestamp < CACHE_TTL) return cached.data;
            }
        } catch (error) {
            // Cache read failed, continue to Firestore
            logger.info(`[Content] Cache read failed for documents: ${String(error)}`);
        }

        // 2. Firestore
        if (firebaseEnabled && db) {
            try {
                const q = query(collection(db, "documents"), orderBy("order", "asc"));
                const snap = await getDocs(q);
                if (!snap.empty) {
                    const docs = snap.docs.map(doc => {
                        const d = doc.data();
                        const localized = d[lang] || {};
                        return {
                            id: doc.id,
                            ...d,
                            titleKr: localized.title, // Map to existing shape expected by UI
                            descriptionKr: localized.desc,
                            // If EN, map accordingly or keep empty if fallback logic handles it differently
                            // Actually existing UI expects flat object. Let's produce flat object.
                            title: localized.title,
                            description: localized.desc,
                            kind: localized.label || (lang === 'kr' ? d.kr?.label : d.en?.label) || "Document",
                            fileUrl: d.filePath,
                            fileName: d.filePath.split('/').pop() || "document.pdf",
                            format: "PDF",
                            note: d.isSensitive ? (lang === 'kr' ? "개인정보 포함" : "Contains sensitive info") : undefined
                        };
                    });
                    safeSetJSON(cacheKey, { data: docs, timestamp: Date.now() }); // ✅ SECURITY FIX
                    return docs;
                }
            } catch (e) { logger.warn(e instanceof Error ? e : new Error(`Firestore documents fetch error: ${String(e)}`)); }
        }

        // 3. Fallback
        // We need to import the static documents.ts. Dynamic import or top level?
        // Let's use top level import locally in this file or just return empty for logic now, but wait,
        // user wants fallback to work. Existing fallback was simple export.
        return (await import("../data/documents")).documents;
    }
};
