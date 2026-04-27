"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ReactNode } from "react"
import { docsConfig } from "@/lib/config"

export function ThemeProvider({ children }: { children: ReactNode }) {
    const themeConfig = docsConfig.theme

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme={themeConfig?.defaultTheme ?? "system"}
            enableSystem={themeConfig?.enableSystem ?? true}
        >
            {children}
        </NextThemesProvider>
    )
}