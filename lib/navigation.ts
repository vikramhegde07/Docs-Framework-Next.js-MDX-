import type { DocItem } from "./docs"

/* =========================
   FLATTEN DOCS TREE

   Converts nested docs tree into a linear array.

   Modes:
   1. Files only (default)
      - Used for navigation (prev/next)
      - Returns only leaf nodes

   2. Include folders
      - Used for static generation (SSG)
      - Returns all nodes (folders + files)

   Params:
   - tree: Docs tree
   - options.includeFolders: include folder nodes

   Example:

   Tree:
     Guides
       → Intro
       → Setup

   includeFolders = false:
     [Intro, Setup]

   includeFolders = true:
     [Guides, Intro, Setup]
========================= */

export function flattenDocs(
    tree: DocItem[],
    options?: {
        includeFolders?: boolean
    }
): DocItem[] {
    const result: DocItem[] = []
    const includeFolders = options?.includeFolders ?? false

    function traverse(items: DocItem[]) {
        for (const item of items) {
            const isFolder =
                item.children && item.children.length > 0

            /* =========================
               INCLUDE FOLDER (OPTIONAL)
            ========================= */
            if (isFolder && includeFolders) {
                result.push(item)
            }

            /* =========================
               RECURSE INTO CHILDREN
            ========================= */
            if (isFolder) {
                traverse(item.children!)
            }

            /* =========================
               INCLUDE FILE (LEAF NODE)
            ========================= */
            else {
                result.push(item)
            }
        }
    }

    traverse(tree)

    return result
}

/* =========================
   GET PREVIOUS / NEXT DOC

   Params:
   - docs: flattened docs array
   - currentSlug: current page slug

   Returns:
   - prev: previous document (or null)
   - next: next document (or null)

   Notes:
   - Uses slug comparison
   - Safe fallback if not found
========================= */

export function getPrevNext(
    docs: DocItem[],
    currentSlug: string[]
) {
    const currentPath = currentSlug.join("/")

    const index = docs.findIndex(
        (doc) => doc.slug.join("/") === currentPath
    )

    /* =========================
       SAFETY: NOT FOUND
    ========================= */
    if (index === -1) {
        return {
            prev: null,
            next: null,
        }
    }

    /* =========================
       RETURN NEIGHBORS
    ========================= */

    return {
        prev: index > 0 ? docs[index - 1] : null,
        next:
            index < docs.length - 1
                ? docs[index + 1]
                : null,
    }
}