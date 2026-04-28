"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import clsx from "clsx"

/* =========================================================
THEME TOGGLE COMPONENT

Provides a UI control to switch between light and dark themes.

Features:

* Uses next-themes for theme management
* Smooth icon transitions (Sun ↔ Moon)
* Prevents hydration mismatch (SSR-safe)
* Accessible (screen reader support)

Behavior:

* Detects current theme using `resolvedTheme`
* Toggles between "light" and "dark"
* Respects system theme if configured

Dependencies:

* next-themes → theme state management
* lucide-react → icons
* clsx → conditional class handling
========================================================= */

export function ThemeToggle() {

    /* =====================================================
       THEME HOOK
    
       resolvedTheme:
       - final theme after system resolution
       - ensures correct value even with "system" mode
    
       setTheme:
       - function to update theme ("light" | "dark" | "system")
    ===================================================== */

    const { resolvedTheme, setTheme } = useTheme()

    /* =====================================================
       MOUNT STATE
    
       Prevents hydration mismatch between server and client.
    
       Why needed:
       - Theme is client-side (depends on localStorage/system)
       - SSR does not know actual theme
       - Without this → UI flicker / mismatch warning
    ===================================================== */

    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    /* =====================================================
       SKELETON PLACEHOLDER
    
       Rendered before component mounts.
    
       Prevents layout shift and hydration issues
    ===================================================== */

    if (!mounted) {
        return (
            <div className="h-9 w-9 rounded-md border border-border/50 bg-muted/20" />
        )
    }

    /* =====================================================
       THEME STATE
    
       Determines current theme mode
    ===================================================== */

    const isDark = resolvedTheme === "dark"

    /* =====================================================
       RENDER BUTTON
    
       - Toggles theme on click
       - Shows animated icon transition
       - Accessible via title + sr-only text
    ===================================================== */

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}

            title={
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }

            className={clsx(
                /* Base layout */
                "group relative inline-flex h-9 w-9 items-center justify-center rounded-lg",

                /* Border + background */
                "border border-border/40 bg-background/50",

                /* Hover effects */
                "hover:bg-accent hover:border-accent/50",

                /* Focus styles (accessibility) */
                "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
        >

            {/* =================================================
                SUN ICON (LIGHT MODE)

                Visible when:
                - current theme = light

                Hidden when:
                - dark mode (scaled down + rotated)
            ================================================= */}

            <Sun
                className={clsx(
                    "h-[1.2rem] w-[1.2rem] transition-all duration-300",
                    isDark
                        ? "scale-0 rotate-90 opacity-0"
                        : "scale-100 rotate-0 opacity-100 text-warning"
                )}
            />

            {/* =================================================
                MOON ICON (DARK MODE)
                
                Visible when:
                - current theme = dark
                
                Hidden when:
                - light mode
            ================================================= */}

            <Moon
                className={clsx(
                    "absolute h-[1.2rem] w-[1.2rem] transition-all duration-300",
                    isDark
                        ? "scale-100 rotate-0 opacity-100 text-primary"
                        : "scale-0 -rotate-90 opacity-0"
                )}
            />

            {/* =================================================
                ACCESSIBILITY
                
                Screen-reader only text
            ================================================= */}

            <span className="sr-only">
                Toggle theme
            </span>
        </button>
    )
}
