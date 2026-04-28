"use client"

import { useState, ReactNode } from "react"
import clsx from "clsx"

/* =========================================================
TABS COMPONENT SYSTEM (Tabs & Tab)

Provides interactive tabbed content inside MDX.

Usage in MDX: <Tabs> <Tab title="JavaScript">
JS content </Tab> <Tab title="Python">
Python content </Tab> </Tabs>

Purpose:

* Organize related content in a compact UI
* Improve readability for multi-variant examples
* Avoid long vertical scrolling

Features:

* Click-based tab switching
* Active tab highlighting
* Smooth transitions
* Accessible focus styles
========================================================= */

/* =========================================================
TAB COMPONENT (CHILD)

Represents a single tab panel.

Props:

* title → used as tab header label
* children → content of the tab

NOTE:

* This component does not render headers
* Tabs parent extracts `title` from props
========================================================= */

interface TabProps {
    title: string
    children: ReactNode
}

export function Tab({ children }: TabProps) {
    return <div className="mt-2">{children}</div>
}

/* =========================================================
TABS CONTAINER

Handles:

* Extracting tab titles
* Managing active tab state
* Rendering headers and content

Behavior:

* Converts children into an array
* Tracks active tab index
* Renders only active tab content
========================================================= */

interface TabsProps {
    children: ReactNode
}

export function Tabs({ children }: TabsProps) {

    /* =========================
       NORMALIZE CHILDREN
    
       Ensures children is always an array
    ========================= */

    const tabs = Array.isArray(children)
        ? children
        : [children]

    /* =========================
       EXTRACT TITLES
    
       Reads title prop from each <Tab />
    ========================= */

    const titles = tabs.map(
        (tab: any) => tab.props.title
    )

    /* =========================
       STATE
    
       Tracks currently active tab index
    ========================= */

    const [active, setActive] = useState(0)

    return (
        <div className="my-8 w-full">

            {/* =================================================
                TAB HEADERS

                - Clickable buttons
                - Shows active state
                - Displays underline indicator
            ================================================= */}

            <div className="flex gap-1 border-b border-border/60 px-1">
                {titles.map((title, index) => {

                    const isActive = active === index

                    return (
                        <button
                            key={index}
                            onClick={() => setActive(index)}

                            className={clsx(
                                /* =========================
                                   BASE STYLES
                                ========================= */
                                "relative px-4 py-2.5 text-sm font-medium transition-all duration-200",

                                /* =========================
                                   ACCESSIBILITY
                                ========================= */
                                "outline-none focus-visible:ring-2 focus-visible:ring-primary/50",

                                /* =========================
                                   ACTIVE vs INACTIVE
                                ========================= */
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            {title}

                            {/* =========================
                                ACTIVE INDICATOR

                                - Bottom border highlight
                                - Smooth visual feedback
                            ========================= */}

                            {isActive && (
                                <div
                                    className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary shadow-[0_-1px_4px_rgba(var(--primary),0.2)]"
                                />
                            )}
                        </button>
                    )
                })}
            </div>


            {/* =================================================
                TAB CONTENT
                    
                - Shows only active tab content
                - Includes fade-in animation
                - Styled container for separation
            ================================================= */}

            <div className="rounded-b-xl border-x border-b border-border/40 bg-card/30 p-6 shadow-sm">
                <div className="animate-in fade-in duration-300">
                    {tabs[active]}
                </div>
            </div>
        </div>
    )
}
