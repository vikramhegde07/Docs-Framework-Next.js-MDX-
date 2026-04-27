"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import clsx from "clsx"

import { getBreadcrumbsFromTree } from "@/lib/breadcrumb"
import { docsConfig } from "@/lib/config"
import type { DocItem } from "@/lib/docs"

/* =========================
   RESOLVE DOCS CONFIG
========================= */

function getDocsSettings() {
    const docs = docsConfig.docs || {}

    return {
        basePath: docs.basePath || "/docs",
        breadcrumb: docs.breadcrumb || {},
    }
}

/* =========================
   EXTRACT SLUG FROM PATHNAME

   Example:
   pathname: /docs/guides/intro
   basePath: /docs

   → ["guides", "intro"]
========================= */

function getSlugFromPath(pathname: string, basePath: string) {
    if (!pathname.startsWith(basePath)) return []

    return pathname
        .replace(basePath, "")
        .split("/")
        .filter(Boolean)
}

/* =========================
   TOPBAR COMPONENT
========================= */

export function Topbar({ tree }: { tree: DocItem[] }) {
    const pathname = usePathname()

    const { basePath, breadcrumb } = getDocsSettings()

    /* =========================
       HANDLE DISABLED BREADCRUMB
    ========================= */

    if (breadcrumb.enabled === false) {
        return null
    }

    /* =========================
       BUILD SLUG + BREADCRUMBS
    ========================= */

    const slug = getSlugFromPath(pathname, basePath)

    const breadcrumbs = getBreadcrumbsFromTree(tree, slug)

    /* =========================
       ROOT LABEL
    ========================= */

    const rootLabel = breadcrumb.rootLabel || "Docs"

    /* =========================
       CURRENT TITLE
    ========================= */

    const currentTitle =
        breadcrumbs[breadcrumbs.length - 1]?.name ||
        rootLabel

    return (
        <header className="sticky top-0 z-20 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="px-6 py-4 lg:px-10">

                {/* =========================
           BREADCRUMB NAVIGATION
        ========================= */}

                <nav
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-muted-foreground mb-2"
                >
                    {/* =========================
             ROOT (HOME)
          ========================= */}

                    {breadcrumb.showRoot !== false && (
                        <Link
                            href={basePath}
                            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                        >
                            <Home className="h-3.5 w-3.5" />
                            <span className="sr-only lg:not-sr-only">
                                {rootLabel}
                            </span>
                        </Link>
                    )}

                    {/* =========================
             BREADCRUMB ITEMS
          ========================= */}

                    {breadcrumbs.map((item, i) => {
                        const isLast = i === breadcrumbs.length - 1

                        return (
                            <div key={i} className="flex items-center gap-1.5">
                                <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" />

                                <Link
                                    href={item.href}
                                    className={clsx(
                                        "transition-colors hover:text-foreground truncate max-w-[120px] sm:max-w-none",
                                        isLast
                                            ? "text-primary font-semibold"
                                            : "hover:text-foreground"
                                    )}
                                    aria-current={isLast ? "page" : undefined}
                                >
                                    {item.name}
                                </Link>
                            </div>
                        )
                    })}
                </nav>

                {/* =========================
           PAGE TITLE (OPTIONAL)

           You can enable this later if needed:
           <h1>{currentTitle}</h1>
        ========================= */}

            </div>
        </header>
    )
}