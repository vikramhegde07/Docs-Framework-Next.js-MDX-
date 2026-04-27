import type { DocItem } from "./docs"
import { docsConfig } from "@/lib/config"

/* =========================
   TYPES
========================= */

export type Breadcrumb = {
    name: string
    href: string
}

/* =========================
   GET BASE PATH
   Default: /docs
========================= */

function getBasePath() {
    return docsConfig.docs?.basePath || "/docs"
}

/* =========================
   BUILD BREADCRUMBS FROM TREE

   Params:
   - tree: full docs tree
   - slug: current route slug (e.g. ["guides", "auth", "login"])

   Returns:
   - array of breadcrumb items
========================= */

export function getBreadcrumbsFromTree(
    tree: DocItem[],
    slug: string[]
): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = []
    const basePath = getBasePath()

    /* =========================
       RECURSIVE TRAVERSAL
  
       We walk the tree level-by-level
       matching each segment of the slug
    ========================= */

    function traverse(
        items: DocItem[],
        depth: number
    ) {
        for (const item of items) {
            const currentSegment =
                item.slug[item.slug.length - 1]

            /* =========================
               MATCH CURRENT LEVEL
      
               Compare current tree level
               with slug segment
            ========================= */

            if (currentSegment === slug[depth]) {
                /* =========================
                   ADD BREADCRUMB
        
                   Build full URL using basePath
                ========================= */

                breadcrumbs.push({
                    name: item.title,
                    href: `${basePath}/${item.slug.join("/")}`,
                })

                /* =========================
                   GO DEEPER (if needed)
        
                   Only traverse children if:
                   - children exist
                   - more slug segments remain
                ========================= */

                if (
                    item.children &&
                    depth + 1 < slug.length
                ) {
                    traverse(item.children, depth + 1)
                }

                break // stop after match
            }
        }
    }

    /* =========================
       START TRAVERSAL
    ========================= */

    traverse(tree, 0)

    return breadcrumbs
}