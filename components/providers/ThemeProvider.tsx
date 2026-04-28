"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ReactNode } from "react"
import { docsConfig } from "@/lib/config"

/* =========================================================
THEME PROVIDER WRAPPER

Wraps the application with theme support using `next-themes`.

Responsibilities:

* Provides theme context to the entire app
* Reads theme configuration from docsConfig
* Enables light / dark / system theme switching
* Applies theme via HTML class (Tailwind-compatible)

Why this wrapper exists:

* Centralizes theme configuration
* Keeps NextThemesProvider isolated
* Allows easy customization via config

Usage:
Wrap this at the root layout (e.g. app/layout.tsx)

   <ThemeProvider>
     {children}
   </ThemeProvider>
========================================================= */

export function ThemeProvider({
    children,
}: {
    children: ReactNode
}) {

    /* =====================================================
       LOAD THEME CONFIG
    
       Reads user-defined theme settings from config.
       Falls back to defaults if not provided.
    ===================================================== */

    const themeConfig = docsConfig.theme

    return (

        /* =================================================
           NEXT-THEMES PROVIDER
    
           attribute="class":
           - Applies theme as a class on <html>
           - Enables Tailwind dark mode via "dark" class
    
           defaultTheme:
           - Initial theme on first load
           - "light" | "dark" | "system"
    
           enableSystem:
           - If true → respects OS preference
        ================================================= */

        <NextThemesProvider
            attribute="class"
            defaultTheme={
                themeConfig?.defaultTheme ?? "system"
            }
            enableSystem={
                themeConfig?.enableSystem ?? true
            }
        >
            {children}
        </NextThemesProvider>
    )
}
