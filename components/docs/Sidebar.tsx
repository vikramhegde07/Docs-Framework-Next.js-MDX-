"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import clsx from "clsx"

import type { DocItem } from "@/lib/docs"
import { docsConfig } from "@/lib/config"

/* =========================
   RESOLVE BASE PATH

   Default: /docs
========================= */

function getBasePath() {
    return docsConfig.docs?.basePath || "/docs"
}

/* =========================
   SIDEBAR ROOT
========================= */

export function Sidebar({ items }: { items: DocItem[] }) {
    return (
        <nav className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border/50 bg-background/95 backdrop-blur-md px-4 py-8 lg:sticky lg:block">
            <SidebarItems items={items} level={0} />
        </nav>
    )
}

/* =========================
   RECURSIVE ITEM LIST

   Renders nested structure
========================= */

function SidebarItems({
    items,
    level,
}: {
    items: DocItem[]
    level: number
}) {
    return (
        <ul
            className={clsx(
                "space-y-1.5",
                level > 0 && "ml-4 mt-1 border-l border-border/40 pl-2"
            )}
        >
            {items.map((item, i) => (
                <SidebarItem key={i} item={item} level={level} />
            ))}
        </ul>
    )
}

/* =========================
   SINGLE ITEM (FILE / FOLDER)
========================= */

function SidebarItem({
    item,
    level,
}: {
    item: DocItem
    level: number
}) {
    const pathname = usePathname()
    const basePath = getBasePath()

    /* =========================
       BUILD URL
    ========================= */

    const href = `${basePath}/${item.slug.join("/")}`

    /* =========================
       DETECT TYPE
    ========================= */

    const isParent = !!item.children?.length

    /* =========================
       ACTIVE STATE
  
       - exact match for file
    ========================= */

    const isActive = pathname === href

    /* =========================
       CHILD ACTIVE STATE
  
       Used to auto-open folders
    ========================= */

    const isChildActive =
        item.children?.some((child) =>
            pathname.startsWith(
                `${basePath}/${child.slug.join("/")}`
            )
        ) ?? false

    /* =========================
       OPEN STATE (FOLDER)
    ========================= */

    const [open, setOpen] = useState(isChildActive)

    /* =========================
       SYNC ON ROUTE CHANGE
  
       Ensures folder opens when navigating
    ========================= */

    useEffect(() => {
        if (isChildActive) setOpen(true)
    }, [isChildActive])

    return (
        <li className="list-none">
            {isParent ? (
                /* =========================
                   FOLDER ITEM
                ========================= */
                <div className="space-y-1">
                    <button
                        onClick={() => setOpen(!open)}
                        className={clsx(
                            "flex w-full items-center justify-between px-2 py-1.5 text-sm font-semibold transition-colors rounded-md",
                            "hover:bg-secondary/50",
                            isChildActive
                                ? "text-foreground"
                                : "text-muted-foreground"
                        )}
                    >
                        <span>{item.title}</span>

                        <ChevronRight
                            className={clsx(
                                "h-3.5 w-3.5 transition-transform duration-200 opacity-50",
                                open && "rotate-90"
                            )}
                        />
                    </button>

                    {/* =========================
             CHILDREN (RECURSIVE)
          ========================= */}

                    {open && (
                        <SidebarItems
                            items={item.children!}
                            level={level + 1}
                        />
                    )}
                </div>
            ) : (
                /* =========================
                   FILE ITEM
                ========================= */
                <Link
                    href={href}
                    className={clsx(
                        "group flex w-full items-center px-3 py-1.5 text-sm transition-all rounded-md",
                        isActive
                            ? "bg-primary/10 text-primary font-medium ring-1 ring-primary/20"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                >
                    <span className="truncate">{item.title}</span>
                </Link>
            )}
        </li>
    )
}