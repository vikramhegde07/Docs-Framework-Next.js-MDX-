"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { getBreadcrumbsFromTree } from "@/lib/breadcrumb"
import type { DocItem } from "@/lib/docs"
import clsx from "clsx"

export function Topbar({ tree }: { tree: DocItem[] }) {
    const pathname = usePathname()
    const slug = pathname.replace("/docs/", "").split("/").filter(Boolean)
    const breadcrumbs = getBreadcrumbsFromTree(tree, slug)

    const currentTitle = breadcrumbs[breadcrumbs.length - 1]?.name || "Documentation"

    return (
        <header className="sticky top-0 z-20 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="px-6 py-4 lg:px-10">

                {/* Breadcrumb Navigation */}
                <nav
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-muted-foreground mb-2"
                >
                    <Link
                        href="/docs"
                        className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                    >
                        <Home className="h-3.5 w-3.5" />
                        <span className="sr-only lg:not-sr-only">Docs</span>
                    </Link>

                    {breadcrumbs.map((item, i) => {
                        const isLast = i === breadcrumbs.length - 1

                        return (
                            <div key={i} className="flex items-center gap-1.5">
                                <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" />
                                <Link
                                    href={item.href}
                                    className={clsx(
                                        "transition-colors hover:text-foreground truncate max-w-[120px] sm:max-w-none",
                                        isLast ? "text-primary font-semibold" : "hover:text-foreground"
                                    )}
                                    aria-current={isLast ? "page" : undefined}
                                >
                                    {item.name}
                                </Link>
                            </div>
                        )
                    })}
                </nav>

                {/* Page Header Title */}
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    {currentTitle}
                </h1>
            </div>
        </header>
    )
}