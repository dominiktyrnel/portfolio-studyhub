// Canonical English Content Tokens for Consistency
// Shared between Home and Profile pages

export const EN_COMMON = {
    // Identity
    NAME_KR: "Dominik Tyrnel",
    ROLE_LINE: "Construction Site Technician · Small Team Leader (2–8 people)",

    // Status
    AVAILABILITY: "Available from Late 2026 (Negotiable)",
    REGION: "Seoul Preferred (Travel Possible)",
    VISA: "Visa Sponsorship Required",

    // Key Phrases
    MEP_SEPARATION: "Licensed trades (electrical/plumbing/HVAC/gas) handled by subcontractors; I coordinate schedule and quality",
    CONTACT_KR_PHONE: "Korean Phone: Unavailable (Residing in Czechia)",

    // Section Titles (Shared)
    SECTION: {
        SUMMARY: "Summary",
        EXPERIENCE: "Experience (2009 ~ Present)",
        SCOPE: "Scope of Work",
        SKILLS: "Key Skills",
        TOOLS: "Equipment & Tools",
        STYLE: "Work Style",
        REFERENCE: "Reference",
        KOREA: "Employment in Korea",
        CONDITIONS: "Conditions",
        CONTACT: "Contact"
    },

    // Navigation Labels
    NAV: {
        MENU: "Menu",
        LANG_KR: "Korean",
        LANG_EN: "English",
        PROFILE_LINK: "View Full Profile",
        PROFILE_TITLE: "Full Profile"
    },

    // UI Elements & Actions
    UI: {
        PAGE_PREPARING: "This page is under construction.",
        IMAGE_PREPARING: "Image Coming Soon",
        NO_PHOTOS: "No photos available.",
        PROJECT_OVERVIEW: "Project Overview",
        GALLERY_TITLE: "Site Photo Gallery",
        GALLERY_COUNT_UNIT: (count: number) => `(${count} photos)`,
        COPYRIGHT_PRE: "Private CV Page. © 2025 ",
        COPYRIGHT_POST: ". Unauthorized distribution prohibited.",
        CONTACT_NOTE: "Seeking employment in Korea (from late 2026)"
    }
} as const;
