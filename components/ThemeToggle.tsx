"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import clsx from "clsx"

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Prevent hydration mismatch by only rendering after mount
    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return (
            <div className="h-9 w-9 rounded-md border border-border/50 bg-muted/20" />
        )
    }

    const isDark = resolvedTheme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={clsx(
                "group relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 transition-all duration-200",
                "bg-background/50 hover:bg-accent hover:border-accent/50",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
        >
            {/* Sun Icon (Visible in light mode) */}
            <Sun className={clsx(
                "h-[1.2rem] w-[1.2rem] transition-all duration-300",
                isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100 text-warning"
            )} />

            {/* Moon Icon (Visible in dark mode) */}
            <Moon className={clsx(
                "absolute h-[1.2rem] w-[1.2rem] transition-all duration-300",
                isDark ? "scale-100 rotate-0 opacity-100 text-primary" : "scale-0 -rotate-90 opacity-0"
            )} />

            <span className="sr-only">Toggle theme</span>
        </button>
    )
}