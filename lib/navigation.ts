import type { DocItem } from "./docs"

/* =========================
   FLATTEN DOCS TREE

   Converts nested docs tree into a linear array.

   Notes:
   - Only leaf nodes (actual pages) are included
   - Folder nodes are skipped
   - Order is preserved (depth-first traversal)

   Example:
   Tree:
     Guides
       → Intro
       → Setup
     API
       → Users

   Result:
     [Intro, Setup, Users]
========================= */

export function flattenDocs(tree: DocItem[]): DocItem[] {
    const result: DocItem[] = []

    function traverse(items: DocItem[]) {
        for (const item of items) {
            /* =========================
               IF FOLDER → RECURSE
            ========================= */
            if (item.children && item.children.length > 0) {
                traverse(item.children)
            }

            /* =========================
               IF FILE → ADD
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