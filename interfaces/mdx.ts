/* =========================================================
   DOC RESULT TYPES

   These types define the possible return values from
   `getDocBySlug()`.

   The docs system now supports two kinds of routes:

   1. FILE → actual MDX content
   2. FOLDER → virtual page representing a directory

   This enables:
   - rendering MDX pages
   - rendering folder navigation UI (like VS Code / Notion)
   - static export compatibility (all routes materialized)

   NOTE:
   Always check `doc.type` before accessing properties.
========================================================= */


/* =========================
   FILE DOC (MDX PAGE)
========================= */

/**
 * Represents a real MDX document.
 *
 * This is returned when:
 * - a `.mdx` file exists for the slug
 * - OR an `index.mdx` exists inside a folder
 *
 * Used for:
 * - rendering page content
 * - SEO metadata (title, description, OG, etc.)
 */
export type FileDoc = {
    /**
     * Discriminator field for type narrowing
     */
    type: "file"

    /**
     * Compiled MDX content (React node)
     */
    content: React.ReactNode

    /**
     * Metadata extracted from frontmatter
     */
    metadata: {
        title: string
        description?: string
        keywords?: string[]
        ogImage?: string | null
    }

    /**
     * Route slug (e.g. ["guides", "intro"])
     */
    slug: string[]
}


/* =========================
   FOLDER DOC (VIRTUAL PAGE)
========================= */

/**
 * Represents a folder (directory) in the docs tree.
 *
 * This is returned when:
 * - no `.mdx` file exists for the slug
 * - but the slug matches a folder in the docs structure
 *
 * Used for:
 * - rendering folder navigation UI
 * - listing child pages and subfolders
 *
 * IMPORTANT:
 * Folder docs do NOT have `content` or `metadata`
 */
export type FolderDoc = {
    /**
     * Discriminator field for type narrowing
     */
    type: "folder"

    /**
     * Folder title (from `_meta.mdx` or folder name)
     */
    title: string

    /**
     * Optional folder description (from `_meta.mdx`)
     */
    description?: string

    /**
     * Route slug (e.g. ["guides", "advanced"])
     */
    slug: string[]

    /**
     * Child items (files + subfolders)
     * Used to render folder view UI
     */
    children: any[] // (DocItem[] ideally)
}


/* =========================
   DOC RESULT (UNION)
========================= */

/**
 * Union type representing all possible results
 * returned by `getDocBySlug()`.
 *
 * You MUST check `doc.type` before accessing properties:
 *
 * Example:
 *
 * if (doc.type === "file") {
 *   doc.content       ✅ safe
 *   doc.metadata      ✅ safe
 * }
 *
 * if (doc.type === "folder") {
 *   doc.children      ✅ safe
 *   doc.title         ✅ safe
 * }
 */
export type DocResult = FileDoc | FolderDoc