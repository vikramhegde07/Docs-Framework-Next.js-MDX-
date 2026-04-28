import matter from "gray-matter"
import { docsConfig } from "@/lib/config"
import { getSource } from "@/lib/source"

/* =========================================================
   DOC ITEM TYPE (TREE NODE)

   Represents a node in the documentation tree.

   A node can be:
   - 📄 File (leaf node)
   - 📁 Folder (has children)

   This structure is used for:
   - Sidebar rendering
   - Navigation (prev/next)
   - Static route generation
   - Folder UI rendering

   NOTE:
   - Files do NOT have `children`
   - Folders ALWAYS have `children`
========================================================= */

export type DocItem = {
    title: string                // Display title
    slug: string[]               // Route path (e.g. ["guides", "intro"])
    order: number                // Sorting priority

    description?: string         // SEO / UI description
    keywords?: string[]          // SEO keywords
    ogImage?: string             // Open Graph image

    children?: DocItem[]         // Present only for folders
}


/* =========================================================
   EXTRACT FILE META

   Reads an MDX file and extracts frontmatter metadata.

   Used for:
   - Page titles
   - SEO fields
   - Ordering

   Behavior:
   - Uses `gray-matter` to parse frontmatter
   - Falls back to filename if title is missing
   - Returns null if file cannot be read

   IMPORTANT:
   - Uses source adapter (local / GitHub)
========================================================= */

async function getMeta(filePath: string) {
    const source = getSource()

    try {
        const raw = await source.readFile(filePath)
        const { data } = matter(raw)

        const fileName =
            filePath.split("/").pop()?.replace(".mdx", "") || ""

        return {
            title: data.title || fileName,
            description: data.description || "",
            keywords: data.keywords || [],
            ogImage: data.ogImage || null,
            order: data.order ?? 0,
        }
    } catch {
        // File read failure (invalid path / API error)
        return null
    }
}


/* =========================================================
   READ FOLDER META (_meta.mdx)

   Reads metadata for a folder from `_meta.mdx`.

   This file controls:
   - Folder title
   - Description
   - Order
   - Manual child ordering

   Example `_meta.mdx`:
   ---
   title: Guides
   order: 1
   items:
     intro:
       title: Introduction
   ---

   Behavior:
   - If `_meta.mdx` is missing → fallback to defaults
   - Works at ANY folder level
========================================================= */

async function getFolderMeta(dirPath: string) {
    const source = getSource()
    const metaPath = `${dirPath}/_meta.mdx`

    const exists = await source.exists(metaPath)

    /* =========================
       NO META FILE
    ========================= */
    if (!exists) {
        const name =
            dirPath.split("/").pop() || "root"

        return {
            title: name,
            description: "",
            keywords: [],
            order: 0,
            items: null as string[] | null,
        }
    }

    /* =========================
       READ META FILE
    ========================= */
    const raw = await source.readFile(metaPath)
    const { data } = matter(raw)

    const name =
        dirPath.split("/").pop() || "root"

    return {
        title: data.title || name,
        description: data.description || "",
        keywords: data.keywords || [],
        order: data.order ?? 0,
        items: data.items ?? null, // manual ordering config
    }
}


/* =========================================================
   APPLY MANUAL ORDERING

   Reorders items based on `_meta.mdx` configuration.

   Supports 2 formats:

   1. ARRAY (legacy):
      items: ["intro", "setup"]

   2. OBJECT (preferred):
      items:
        intro:
          title: Introduction
        setup:
          title: Setup Guide

   Features:
   - Custom ordering
   - Title override
   - Description override (extended)

   Behavior:
   - Items listed first
   - Remaining items appended automatically
========================================================= */

function applyManualOrder(
    items: DocItem[],
    metaItems: any
) {
    if (!metaItems) return items

    const isArray = Array.isArray(metaItems)

    const map = new Map(
        items.map((item) => [
            item.slug[item.slug.length - 1],
            item,
        ])
    )

    const ordered: DocItem[] = []

    /* =========================
       ARRAY FORMAT
    ========================= */
    if (isArray) {
        for (const key of metaItems) {
            const item = map.get(key)
            if (item) {
                ordered.push(item)
                map.delete(key)
            }
        }
    }

    /* =========================
       OBJECT FORMAT
    ========================= */
    else {
        for (const key of Object.keys(metaItems)) {
            const item = map.get(key)

            if (item) {
                const override = metaItems[key]

                if (override?.title) {
                    item.title = override.title
                }

                if (override?.description) {
                    item.description =
                        override.description
                }

                ordered.push(item)
                map.delete(key)
            }
        }
    }

    /* =========================
       APPEND REMAINING ITEMS
    ========================= */
    return [...ordered, ...Array.from(map.values())]
}


/* =========================================================
   BUILD DOCS TREE (ASYNC)

   Recursively builds the full documentation tree.

   Responsibilities:
   - Read directory structure
   - Identify files vs folders
   - Extract metadata
   - Apply ordering
   - Build nested structure

   Params:
   - dir: current directory path (relative)
   - parentSlug: accumulated slug path

   Returns:
   - Nested DocItem[] tree

   IMPORTANT:
   - Uses source adapter → works with local + GitHub
   - Fully async (network-safe)
   - Core engine powering entire docs system
========================================================= */

export async function getDocsTree(
    dir: string = "",
    parentSlug: string[] = []
): Promise<DocItem[]> {
    const source = getSource()

    const entries = await source.readDir(dir)

    const files: DocItem[] = []
    const folders: DocItem[] = []

    for (const entry of entries) {
        const fullPath = entry.path

        /* =========================
           FOLDER NODE
        ========================= */
        if (entry.type === "dir") {
            const meta = await getFolderMeta(fullPath)

            let children = await getDocsTree(
                fullPath,
                [...parentSlug, entry.name]
            )

            /* Apply ordering inside folder */
            children = applyManualOrder(
                children,
                meta.items
            )

            /* Handle empty folders */
            const showEmpty =
                docsConfig.docs.sidebar?.showEmptyFolders ??
                false

            if (!children.length && !showEmpty) {
                continue
            }

            folders.push({
                title: meta.title,
                description: meta.description,
                keywords: meta.keywords,
                slug: [...parentSlug, entry.name],
                order: meta.order,
                children,
            })
        }

        /* =========================
           FILE NODE (.mdx)
        ========================= */
        else if (
            entry.name.endsWith(".mdx") &&
            entry.name !== "_meta.mdx"
        ) {
            const meta = await getMeta(fullPath)

            if (!meta) continue

            files.push({
                title: meta.title,
                description: meta.description,
                keywords: meta.keywords,
                ogImage: meta.ogImage,
                order: meta.order,
                slug: [
                    ...parentSlug,
                    entry.name.replace(".mdx", ""),
                ],
            })
        }
    }

    /* =========================
       SORT FILES & FOLDERS
    ========================= */

    files.sort((a, b) => a.order - b.order)
    folders.sort((a, b) => a.order - b.order)

    /* =========================
       APPLY ROOT META
    ========================= */

    const currentMeta = await getFolderMeta(dir)

    let merged = [...files, ...folders]

    merged = applyManualOrder(
        merged,
        currentMeta.items
    )

    return merged
}