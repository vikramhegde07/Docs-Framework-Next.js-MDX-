import type { DocItem } from "./docs"
import { docsConfig } from "@/lib/config"

/* =========================================================
   BREADCRUMB TYPE

   Represents a single breadcrumb item in the UI.

   Example:
   [
     { name: "Guides", href: "/docs/guides" },
     { name: "Auth", href: "/docs/guides/auth" }
   ]

   Used for:
   - Breadcrumb navigation UI
   - Page hierarchy visualization
========================================================= */

export type Breadcrumb = {
    name: string   // Display label (usually title)
    href: string   // Full URL path
}


/* =========================================================
   GET BASE PATH

   Returns the base route for docs.

   Default:
   "/docs"

   Can be customized via config:
   docsConfig.docs.basePath

   Example:
   basePath = "/docs"
   → final URL = /docs/guides/intro
========================================================= */

function getBasePath() {
    return docsConfig.docs?.basePath || "/docs"
}


/* =========================================================
   BUILD BREADCRUMBS FROM TREE

   Generates breadcrumb navigation based on:
   - docs tree structure
   - current slug

   Params:
   - tree → full docs tree (nested structure)
   - slug → current route (e.g. ["guides", "auth", "login"])

   Returns:
   - ordered array of breadcrumb items

   Example:

   Input:
     slug = ["guides", "auth", "login"]

   Output:
     [
       { name: "Guides", href: "/docs/guides" },
       { name: "Auth", href: "/docs/guides/auth" },
       { name: "Login", href: "/docs/guides/auth/login" }
     ]

   How it works:
   - Traverses the tree level-by-level
   - Matches each slug segment with tree nodes
   - Builds breadcrumb path incrementally

   IMPORTANT:
   - Relies on consistent slug structure
   - Stops traversal when no match is found
========================================================= */

export function getBreadcrumbsFromTree(
    tree: DocItem[],
    slug: string[]
): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = []
    const basePath = getBasePath()

    /* =====================================================
       RECURSIVE TRAVERSAL

       Walks the tree depth-by-depth, matching
       each segment of the slug.

       depth = current level in slug
    ===================================================== */

    function traverse(
        items: DocItem[],
        depth: number
    ) {
        for (const item of items) {
            /* =========================
               CURRENT SEGMENT

               Extract last part of slug:
               ["guides", "auth"] → "auth"
            ========================= */
            const currentSegment =
                item.slug[item.slug.length - 1]

            /* =========================
               MATCH CURRENT LEVEL

               Compare tree node with slug segment
            ========================= */
            if (currentSegment === slug[depth]) {

                /* =========================
                   ADD BREADCRUMB

                   Build full URL:
                   basePath + full slug
                ========================= */
                breadcrumbs.push({
                    name: item.title,
                    href: `${basePath}/${item.slug.join("/")}`,
                })

                /* =========================
                   GO DEEPER

                   Continue traversal only if:
                   - node has children
                   - more slug segments remain
                ========================= */
                if (
                    item.children &&
                    depth + 1 < slug.length
                ) {
                    traverse(item.children, depth + 1)
                }

                break // stop searching this level after match
            }
        }
    }

    /* =========================
       START TRAVERSAL
    ========================= */

    traverse(tree, 0)

    return breadcrumbs
}