"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import clsx from "clsx"

import type { DocItem } from "@/lib/docs"
import { docsConfig } from "@/lib/config"

/* =========================================================
SIDEBAR COMPONENT SYSTEM

Renders the left navigation sidebar for the docs.

Structure:

* Sidebar (root container)
* SidebarItems (recursive list)
* SidebarItem (single file/folder)

Purpose:

* Display full docs tree
* Enable hierarchical navigation
* Auto-expand active sections
* Provide clear structure (like VS Code explorer)

Features:

* Recursive rendering
* Folder expand/collapse
* Active route highlighting
* Auto-open active parent folders
* Sticky layout for desktop
========================================================= */

/* =========================================================
RESOLVE BASE PATH

Used to build URLs for links

Default fallback: "/docs"
========================================================= */

function getBasePath() {
    return docsConfig.docs?.basePath || "/docs"
}

/* =========================================================
SIDEBAR ROOT

Container for the entire sidebar

Behavior:

* Fixed on desktop
* Scrollable vertically
* Hidden on small screens (handled separately)

Layout:

* Positioned below navbar (top-14)
========================================================= */

export function Sidebar({
    items,
}: {
    items: DocItem[]
}) {
    return (
        <nav className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border/50 bg-background/95 backdrop-blur-md px-4 py-8 lg:sticky lg:block">
            <SidebarItems items={items} level={0} />
        </nav>
    )

}

/* =========================================================
SIDEBAR ITEMS (RECURSIVE LIST)

Renders nested list structure

Features:

* Handles indentation via `level`
* Adds border for nested groups
========================================================= */

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

                /* Nested indentation */
                level > 0 &&
                "ml-4 mt-1 border-l border-border/40 pl-2"
            )}
        >
            {items.map((item, i) => (
                <SidebarItem
                    key={i}
                    item={item}
                    level={level}
                />
            ))}
        </ul>
    )
}

/* =========================================================
SIDEBAR ITEM

Handles both:

* File (leaf node)
* Folder (parent node)

Logic:

* Detect type (folder vs file)
* Manage open/close state (for folders)
* Highlight active route
* Auto-expand active parents
========================================================= */

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

    const href =
        `${basePath}/${item.slug.join("/")}`

    /* =========================
       DETECT TYPE
    
       Folder → has children
    ========================= */

    const isParent = !!item.children?.length

    /* =========================
       ACTIVE STATE (FILE)
    
       Exact match for current route
    ========================= */

    const isActive = pathname === href

    /* =========================
       CHILD ACTIVE STATE
    
       Used to:
       - Auto-open parent folders
       - Highlight hierarchy
    ========================= */

    const isChildActive =
        item.children?.some((child) =>
            pathname.startsWith(
                `${basePath}/${child.slug.join("/")}`
            )
        ) ?? false

    /* =========================
       OPEN STATE (FOLDER)
    
       Default:
       - Open if any child is active
    ========================= */

    const [open, setOpen] =
        useState(isChildActive)

    /* =========================
       SYNC ON ROUTE CHANGE
    
       Ensures:
       - Folder auto-expands when navigating
    ========================= */

    useEffect(() => {
        if (isChildActive) setOpen(true)
    }, [isChildActive])


    return (
        <li className="list-none">

            {isParent ? (

                /* =================================================
                   FOLDER ITEM
    
                   - Click toggles open/close
                   - Displays children recursively
                ================================================= */

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

                        {/* Chevron indicator */}
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

                /* =================================================
                   FILE ITEM
    
                   - Direct navigation link
                   - Highlights when active
                ================================================= */

                <Link
                    href={href}

                    className={clsx(
                        "group flex w-full items-center px-3 py-1.5 text-sm transition-all rounded-md",

                        isActive
                            ? "bg-primary/10 text-primary font-medium ring-1 ring-primary/20"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                >
                    <span className="truncate">
                        {item.title ||
                            item.slug[
                            item.slug.length - 1
                            ]}
                    </span>
                </Link>
            )}
        </li>
    )
}
