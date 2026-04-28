"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import clsx from "clsx"

import { getBreadcrumbsFromTree } from "@/lib/breadcrumb"
import { docsConfig } from "@/lib/config"
import type { DocItem } from "@/lib/docs"

/* =========================================================
TOPBAR COMPONENT (BREADCRUMB NAVIGATION)

Renders the top navigation bar for docs pages,
primarily focused on breadcrumb navigation.

Purpose:

* Show current page hierarchy
* Improve navigation clarity
* Provide quick access to parent sections

Layout:
┌──────────────────────────────────────┐
│ Home > Guides > Auth > Login         │
└──────────────────────────────────────┘

Features:

* Dynamic breadcrumb generation
* Config-driven behavior
* Responsive truncation
* Active page highlighting
* Optional root label

Depends on:

* Docs tree structure
* Current pathname
========================================================= */

/* =========================================================
RESOLVE DOCS SETTINGS

Extracts:

* basePath (e.g., "/docs")
* breadcrumb config

Provides defaults if not defined
========================================================= */

function getDocsSettings() {
    const docs = docsConfig.docs || {}

    return {
        basePath: docs.basePath || "/docs",
        breadcrumb: docs.breadcrumb || {},
    }

}

/* =========================================================
EXTRACT SLUG FROM PATHNAME

Converts current URL into slug array.

Example:
pathname: /docs/guides/intro
basePath: /docs

Result:
["guides", "intro"]

Used to:

* Match current location in docs tree
* Generate breadcrumb path
========================================================= */

function getSlugFromPath(
    pathname: string,
    basePath: string
) {
    if (!pathname.startsWith(basePath)) return []

    return pathname
        .replace(basePath, "")
        .split("/")
        .filter(Boolean)
}

/* =========================================================
TOPBAR COMPONENT

Props:

* tree → full docs tree

Responsibilities:

* Build breadcrumb list
* Render navigation UI
* Highlight current page
========================================================= */

export function Topbar({
    tree,
}: {
    tree: DocItem[]
}) {
    const pathname = usePathname()

    const { basePath, breadcrumb } = getDocsSettings()

    /* =====================================================
       DISABLE BREADCRUMB (CONFIG)
    
       If explicitly disabled, render nothing
    ===================================================== */

    if (breadcrumb.enabled === false) {
        return null
    }


    /* =====================================================
       BUILD SLUG + BREADCRUMBS
    ===================================================== */

    const slug = getSlugFromPath(
        pathname,
        basePath
    )

    const breadcrumbs =
        getBreadcrumbsFromTree(tree, slug)

    /* =====================================================
       ROOT LABEL
    
       Default: "Docs"
    ===================================================== */

    const rootLabel =
        breadcrumb.rootLabel || "Docs"

    /* =====================================================
       CURRENT TITLE
    
       Last breadcrumb item or fallback to root
    ===================================================== */

    const currentTitle =
        breadcrumbs[breadcrumbs.length - 1]?.name ||
        rootLabel


    return (
        <header className="sticky top-0 z-20 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">

            <div className="px-6 py-4 lg:px-10">

                {/* =================================================
                    BREADCRUMB NAVIGATION
                ================================================= */}

                <nav
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-muted-foreground mb-2"
                >

                    {/* =============================================
                        ROOT (HOME)

                        - Optional (can be disabled via config)
                        - Links to basePath (/docs)
                    ============================================= */}

                    {breadcrumb.showRoot !== false && (
                        <Link
                            href={basePath}
                            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                        >
                            <Home className="h-3.5 w-3.5" />

                            {/* Hidden on small screens */}
                            <span className="sr-only lg:not-sr-only">
                                {rootLabel}
                            </span>
                        </Link>
                    )}


                    {/* =============================================
                        BREADCRUMB ITEMS

                        - Iterates through hierarchy
                        - Adds separator (Chevron)
                        - Highlights current page
                    ============================================= */}

                    {breadcrumbs.map((item, i) => {

                        const isLast =
                            i === breadcrumbs.length - 1

                        return (
                            <div
                                key={i}
                                className="flex items-center gap-1.5"
                            >

                                {/* Separator */}
                                <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" />

                                {/* Link */}
                                <Link
                                    href={item.href}
                                    className={clsx(
                                        "transition-colors hover:text-foreground truncate max-w-[120px] sm:max-w-none",

                                        isLast
                                            ? "text-primary font-semibold"
                                            : "hover:text-foreground"
                                    )}

                                    /* Accessibility */
                                    aria-current={
                                        isLast
                                            ? "page"
                                            : undefined
                                    }
                                >
                                    {item.name}
                                </Link>
                            </div>
                        )
                    })}
                </nav>


                {/* =================================================
                    OPTIONAL PAGE TITLE

                    Can be enabled if needed:
                    <h1>{currentTitle}</h1>
                ================================================= */}
            </div>
        </header>
    )
}
