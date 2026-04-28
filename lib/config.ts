import type { DocsConfig } from "@/interfaces/config"

/* =========================================================
   DOCS CONFIGURATION

   This is the central configuration file for the docs framework.

   It controls:
   - Layout (navbar, footer)
   - Navigation (links, branding)
   - Theme behavior
   - Component overrides
   - Docs engine (routing, source, sidebar, etc.)

   Think of this as:
   → the "control panel" for the entire docs system
========================================================= */

export const docsConfig: DocsConfig = {

    /* =========================================================
       LAYOUT CONFIG

       Controls visibility of global layout elements
       across the entire application
    ========================================================= */
    layout: {
        navbar: true,   // Show / hide navbar
        footer: true,   // Show / hide footer
    },


    /* =========================================================
       NAVBAR CONFIG

       Controls top navigation bar
    ========================================================= */
    navbar: {
        brand: {
            name: "Docs Framework",  // Brand name text
            logo: "/logo.svg",       // Logo image path (public/)
        },

        links: [
            {
                label: "Docs",
                href: "/docs",
            },
        ],

        showThemeToggle: true, // Light/Dark/System toggle
    },


    /* =========================================================
       COMPONENT OVERRIDES

       Allows replacing default UI components.

       Use cases:
       - Custom Navbar
       - Custom Footer
       - Custom MDX elements

       Set to null → use built-in components
    ========================================================= */
    components: {
        Navbar: null, // Replace with custom component if needed
        Footer: null,

        /**
         * MDX component overrides
         * Example:
         * mdx: { h1: CustomH1 }
         */
        mdx: {},
    },


    /* =========================================================
       THEME CONFIG

       Controls theme behavior
    ========================================================= */
    theme: {
        defaultTheme: "system", // "light" | "dark" | "system"
        enableSystem: true,     // Respect OS theme
    },


    /* =========================================================
       FOOTER CONFIG

       Controls footer layout and content
    ========================================================= */
    footer: {
        brand: {
            name: "Docs Framework",
            description:
                "Lightweight documentation framework built with Next.js and MDX.",
            logo: "/logo.svg",
        },

        links: [
            {
                title: "Documentation",
                items: [
                    {
                        label: "Getting Started",
                        href: "/docs/getting-started",
                    },
                ],
            },
            {
                title: "Community",
                items: [
                    {
                        label: "GitHub",
                        href: "https://github.com/vikramhegde07/Docs-Framework-Next.js-MDX-",
                        external: true, // opens in new tab
                    },
                ],
            },
        ],

        bottom: {
            text: "© 2026 Docs Framework. All rights reserved.",
        },
    },


    /* =========================================================
       DOCS ENGINE CONFIG (CORE)

       This section controls how documentation content is:
       - sourced
       - structured
       - routed
       - displayed
    ========================================================= */
    docs: {

        /* =========================
           CONTENT SOURCE

           Defines where docs content is loaded from.

           Supported:
           - "local"  → filesystem
           - "github" → remote repository

           IMPORTANT:
           Only one source is active at a time
        ========================= */
        source: {
            type: "local", // Defaultly Using the local souce type

            /* ---------- LOCAL SOURCE ---------- */
            local: {
                /**
                 * Root directory for docs content
                 * Used when type = "local"
                 *
                 * Example:
                 * content/docs/
                 */
                contentDir: "content/docs",
            },

            /* ---------- GITHUB SOURCE ---------- */
            github: {
                /**
                 * GitHub repository owner
                 */
                owner: process.env.GITHUB_OWNER ?? "",

                /**
                 * Repository name
                 */
                repo: process.env.GITHUB_REPO ?? "",

                /**
                 * Branch to fetch content from
                 */
                branch: "main",

                /**
                 * Path inside repo where docs live
                 *
                 * Example:
                 * repo/
                 *   └── docs/
                 */
                docsPath: "docs",

                /**
                 * Optional token:
                 * - Required for private repos
                 * - Helps avoid rate limits
                 */
                token: process.env.GITHUB_TOKEN,
            },
        },


        /* =========================
           ROUTING CONFIG
        ========================= */

        /**
         * Base path for docs pages
         *
         * Example:
         * /docs/getting-started
         */
        basePath: "/docs",

        /**
         * Default fallback page
         *
         * Used when:
         * - slug is empty
         * - invalid route fallback
         */
        defaultSlug: ["getting-started"],

        /**
         * Home entry point
         *
         * Used for:
         * - landing page
         * - redirects
         * - navigation
         */
        home: ["introduction"],


        /* =========================
           BREADCRUMB CONFIG
        ========================= */
        breadcrumb: {
            enabled: true,

            /**
             * Show root label
             * Example: "Documentation"
             */
            showRoot: true,

            /**
             * Root label text
             */
            rootLabel: "Documentation",
        },


        /* =========================
           SIDEBAR CONFIG
        ========================= */
        sidebar: {
            /**
             * Show folders even if they have no content
             */
            showEmptyFolders: false,

            /**
             * Label for empty folders
             */
            emptyLabel: "No content",
        },
    },
}