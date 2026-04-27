"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import clsx from "clsx"
import { ThemeToggle } from "@/components/ThemeToggle"
import { docsConfig } from "@/lib/config"

export function Navbar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const navbar = docsConfig.navbar

    if (!navbar) return null

    const { brand, links = [], showThemeToggle } = navbar

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
            <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-6 lg:px-10">

                {/* Brand */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5 hover:opacity-90 transition"
                >
                    {brand?.logo && (
                        <img
                            src={brand.logo}
                            alt="Logo"
                            className="h-8 w-8 rounded-md object-contain border border-border/50"
                        />
                    )}
                    <span className="hidden sm:inline-block font-semibold text-foreground">
                        {brand?.name || "Docs"}
                    </span>
                </Link>

                {/* Desktop Links */}
                <nav className="hidden md:flex items-center gap-1">
                    {links.map((link) => {
                        const isActive = pathname.startsWith(link.href)

                        return (
                            <div key={link.href} className="relative">
                                <Link
                                    href={link.href}
                                    className={clsx(
                                        "px-4 py-1.5 text-sm font-medium rounded-full transition-colors",
                                        isActive
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>

                                <span
                                    className={clsx(
                                        "absolute -bottom-2 h-1 transition-all duration-200",
                                        isActive
                                            ? "w-full left-0 bg-primary"
                                            : "w-0 left-1/2"
                                    )}
                                />
                            </div>
                        )
                    })}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2">

                    {showThemeToggle && <ThemeToggle />}

                    <button
                        onClick={() => setOpen(!open)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="fixed inset-x-0 top-14 z-50 h-screen bg-background px-6 py-8 md:hidden">
                    <nav className="flex flex-col gap-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={clsx(
                                    "text-lg font-semibold transition-colors",
                                    pathname.startsWith(link.href)
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    )
}