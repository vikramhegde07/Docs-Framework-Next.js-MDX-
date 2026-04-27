import type { ReactNode, ComponentType } from "react"

/* =========================
   FOOTER
========================= */

export type FooterLinkItem = {
    label: string
    href: string
    external?: boolean
}

export type FooterLinkGroup = {
    title: string
    items: FooterLinkItem[]
}

export type FooterConfig = {
    brand?: {
        name: string
        description?: string
        logo?: string
    }
    links?: FooterLinkGroup[]
    bottom?: {
        text?: string
    }
}

/* =========================
   NAVBAR
========================= */

export type NavItem = {
    label: string
    href: string
}

export type NavbarConfig = {
    brand?: {
        name: string
        logo?: string
    }
    links?: NavItem[]
    showThemeToggle?: boolean
}

/* =========================
   LAYOUT
========================= */

export type LayoutConfig = {
    navbar: boolean
    footer: boolean
}

/* =========================
   THEME
========================= */

export type ThemeConfig = {
    defaultTheme: "light" | "dark" | "system"
    enableSystem: boolean
}

/* =========================
   COMPONENT OVERRIDES
========================= */

export type ComponentOverrides = {
    Navbar?: ComponentType<any> | null
    Footer?: ComponentType<any> | null
    mdx?: Record<string, any>
}

/* =========================
   DOCS ENGINE CONFIG
========================= */
export type DocsEngineConfig = {
    /* =========================
       CONTENT SOURCE
    ========================= */
    contentDir?: string        // e.g. "content/docs"

    /* =========================
       ROUTING
    ========================= */
    basePath?: string          // e.g. "/docs"
    defaultSlug?: string[]     // e.g. ["getting-started"]

    /* =========================
       BREADCRUMB CONFIG
    ========================= */
    breadcrumb?: {
        enabled?: boolean        // default: true
        showRoot?: boolean       // include "Docs" as first item
        rootLabel?: string       // label for root (default: "Docs")
    },

    sidebar?: {
        showEmptyFolders?: boolean
        emptyLabel?: string
    }
}

/* =========================
   ROOT CONFIG
========================= */

export type DocsConfig = {
    home: string[]
    layout: LayoutConfig
    navbar?: NavbarConfig
    footer?: FooterConfig
    components?: ComponentOverrides
    theme?: ThemeConfig
    docs?: DocsEngineConfig
}