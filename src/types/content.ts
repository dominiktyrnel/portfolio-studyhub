/**
 * Content Type Definitions
 * Defines TypeScript interfaces for all content structures
 * Used to eliminate @ts-ignore suppressions in content imports
 */

export interface ProjectDetail {
    category?: string;
    space?: string;
    loc?: string;
    period?: string;
    role?: string;
    scope?: string;
    keywords?: string;
    description?: string;
    bullets?: string[];
    result?: string;
}

export interface PortfolioProject {
    id: string;
    title: string;
    cat: string;
    summary: string;
    tags: string[];
    detail: ProjectDetail;
    img: string;
    order?: number;
}

export interface PortfolioSection {
    projects: PortfolioProject[];
}

export interface ContentStructure {
    portfolio?: PortfolioSection;
    // Add other sections as needed
    [key: string]: unknown;
}

/**
 * Admin Content Data - used by HomeEditor, ProfileEditor
 * Represents the nested structure of editable content
 */
export interface AdminContentData {
    hero?: {
        title?: string;
        subtitle?: string[];
        badge?: { kr?: string; txt?: string };
        chips?: string[];
        cta?: { primary?: string; secondary?: string };
    };
    skills?: { title?: string; desc?: string };
    equipment?: { title?: string; desc?: string; bullets?: string[] };
    strengths?: { title?: string; cards?: Array<{ title?: string; desc?: string }> };
    contact?: { heading?: string; sub?: string[]; note?: string };
    // Allow additional nested properties
    [key: string]: unknown;
}

/**
 * Helper type for nested path access in admin editors
 */
export type NestedPathValue = string | string[] | Record<string, unknown> | undefined;
