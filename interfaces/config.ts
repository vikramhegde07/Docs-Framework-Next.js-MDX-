import type { ComponentType } from "react"

/* =========================================================
FOOTER CONFIG TYPES

Defines the structure of the footer section.

The footer supports:

* Brand section (logo, name, description)
* Multiple link groups (columns)
* Bottom section (copyright, notes)

Used for:

* Rendering structured footer UI
* Organizing navigation links
========================================================= */

/**

* Single footer link item
  */
export type FooterLinkItem = {
    label: string        // Display text
    href: string         // URL
    external?: boolean   // Open in new tab if true
}

/**

* Group of footer links (column)
  */
export type FooterLinkGroup = {
    title: string               // Section title
    items: FooterLinkItem[]     // Links under this section
}

/**

* Full footer configuration
  */
export type FooterConfig = {
    brand?: {
        name: string            // Brand name
        description?: string    // Short description
        logo?: string           // Logo path
    }

    links?: FooterLinkGroup[]   // Footer link columns

    bottom?: {
        text?: string           // Bottom text (e.g. copyright)
    }
}

/* =========================================================
NAVBAR CONFIG TYPES

Defines the structure of the top navigation bar.

Supports:

* Branding (logo + name)
* Navigation links
* Theme toggle
========================================================= */

/**

* Single navbar link
  */
export type NavItem = {
    label: string   // Display text
    href: string    // URL
}

/**

* Navbar configuration
  */
export type NavbarConfig = {
    brand?: {
        name: string    // Brand name
        logo?: string   // Logo path
    }

    links?: NavItem[]   // Navigation links

    /**
  
    * Enable light/dark/system theme toggle
      */
    showThemeToggle?: boolean
}

/* =========================================================
LAYOUT CONFIG

Controls visibility of global layout elements.

Allows enabling/disabling:

* Navbar
* Footer
========================================================= */

export type LayoutConfig = {
    navbar: boolean   // Show/hide navbar
    footer: boolean   // Show/hide footer
}

/* =========================================================
THEME CONFIG

Controls theme behavior for the entire app.

Supports:

* Light mode
* Dark mode
* System preference
========================================================= */

export type ThemeConfig = {
    /**
    * Default theme on load
    */
    defaultTheme: "light" | "dark" | "system"


    /**
     * Allow system-based theme switching
     */
    enableSystem: boolean

}

/* =========================================================
COMPONENT OVERRIDES

Allows replacing default UI components with custom ones.

Use cases:

* Custom Navbar UI
* Custom Footer UI
* Custom MDX rendering components

If null → default components are used
========================================================= */

export type ComponentOverrides = {
    /**
    * Custom Navbar component
    */
    Navbar?: ComponentType<any> | null


    /**
     * Custom Footer component
     */
    Footer?: ComponentType<any> | null

    /**
     * MDX component overrides
     * Example:
     * mdx: { h1: CustomH1 }
     */
    mdx?: Record<string, any>


}

/* =========================================================
CONTENT SOURCE CONFIG TYPES

Defines where documentation content is loaded from.

The system supports multiple sources:

* Local filesystem
* GitHub repository (remote)

This abstraction enables:

* Flexible content management
* Easy switching between sources
========================================================= */

/**

* Local filesystem source configuration
  */
export type LocalSourceConfig = {
    contentDir: string   // Root directory (e.g. "content/docs")
}

/**

* GitHub remote source configuration
  */
export type GitHubSourceConfig = {
    owner: string        // GitHub username or organization
    repo: string         // Repository name
    branch?: string      // Branch name (default: "main")
    docsPath: string     // Path inside repo where docs are stored
    token?: string       // Optional token (for private repos / rate limits)
}

/**

* Unified source configuration
*
* Only one source is active at a time.
  */
export type DocsSourceConfig = {
    type: "local" | "github"

    /**
  
    * Local source config
    * Used when type = "local"
      */
    local?: LocalSourceConfig

    /**
  
    * GitHub source config
    * Used when type = "github"
      */
    github?: GitHubSourceConfig
}

/* =========================================================
DOCS ENGINE CONFIG

Core configuration for the docs system.

Controls:

* Content source
* Routing behavior
* Breadcrumbs
* Sidebar behavior
========================================================= */

export type DocsEngineConfig = {


    /* =========================
       CONTENT SOURCE
    ========================= */

    /**
     * Defines where docs content comes from
     */
    source: DocsSourceConfig


    /* =========================
       ROUTING
    ========================= */

    /**
     * Base route for docs pages
     * Example: "/docs"
     */
    basePath?: string

    /**
     * Default page when no slug is provided
     * Example: ["getting-started"]
     */
    defaultSlug?: string[]

    /**
     * Entry point for docs
     * Used for homepage / redirects
     */
    home?: string[]


    /* =========================
       BREADCRUMB CONFIG
    ========================= */

    breadcrumb?: {
        enabled?: boolean    // Enable/disable breadcrumbs
        showRoot?: boolean   // Show root label (e.g. "Docs")
        rootLabel?: string   // Custom root label
    }


    /* =========================
       SIDEBAR CONFIG
    ========================= */

    sidebar?: {
        showEmptyFolders?: boolean  // Show empty folders
        emptyLabel?: string         // Label for empty folders
    }


}

/* =========================================================
ROOT CONFIG

Top-level configuration object for the entire docs system.

Combines:

* Layout
* UI components
* Theme
* Docs engine

This is the main config consumed by the application.
========================================================= */

export type DocsConfig = {


    /**
     * Global layout configuration
     */
    layout: LayoutConfig

    /**
     * Navbar configuration (optional)
     */
    navbar?: NavbarConfig

    /**
     * Footer configuration (optional)
     */
    footer?: FooterConfig

    /**
     * Component overrides
     */
    components?: ComponentOverrides

    /**
     * Theme configuration
     */
    theme?: ThemeConfig

    /**
     * Core docs engine configuration
     */
    docs: DocsEngineConfig
}
