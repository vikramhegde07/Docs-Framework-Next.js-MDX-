import { redirect } from "next/navigation"
import { docsConfig } from "@/lib/config"

/* =========================================================
DOCS INDEX PAGE ("/docs")

This page acts as the entry point for the docs section.

Behavior:

* Redirects users from "/docs" → actual home doc
* Prevents rendering empty index page
* Keeps routing clean and predictable

Example:
/docs  →  /docs/getting-started

Why this is needed:

* Docs content is slug-based
* There is no dedicated index.mdx required
* Ensures a consistent landing experience

Flow:

1. Resolve basePath (default: "/docs")
2. Resolve home slug from config
3. Build full path
4. Redirect to resolved page
========================================================= */

export default function DocsIndex() {

    /* =====================================================
       RESOLVE BASE PATH
    
       Default fallback: "/docs"
    ===================================================== */

    const basePath =
        docsConfig.docs.basePath || "/docs"


    /* =====================================================
       RESOLVE HOME SLUG
    
       Priority:
       1. docs.home
       2. docs.defaultSlug
       3. fallback → ["getting-started"]
    ===================================================== */

    const homeSlug =
        docsConfig.docs.home ||
        docsConfig.docs.defaultSlug ||
        ["getting-started"]


    /* =====================================================
       BUILD REDIRECT PATH
    
       Example:
       "/docs" + "/getting-started"
       → "/docs/getting-started"
    ===================================================== */

    const path =
        basePath + "/" + homeSlug.join("/")


    /* =====================================================
       REDIRECT
    
       Immediately navigates to the resolved doc
    ===================================================== */

    redirect(path)
}
