import type { DocsConfig } from "@/interfaces/config"

export const docsConfig: DocsConfig = {
    home: ["getting-started"],

    layout: {
        navbar: true,
        footer: true,
    },

    /* =========================
       NAVBAR
    ========================= */
    navbar: {
        brand: {
            name: "Docs Framework",
            logo: "/logo.png",
        },
        links: [
            { label: "Docs", href: "/docs" },
        ],
        showThemeToggle: true,
    },

    /* =========================
       COMPONENT OVERRIDES
    ========================= */
    components: {
        Navbar: null,
        Footer: null,
    },

    /* =========================
       THEME
    ========================= */
    theme: {
        defaultTheme: "system",
        enableSystem: true,
    },

    /* =========================
       FOOTER
    ========================= */
    footer: {
        brand: {
            name: "Docs Framework",
            description:
                "Lightweight documentation framework built with Next.js and MDX.",
            logo: "/logo.png", // optional
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
                        external: true,
                    },
                ],
            },
        ],

        bottom: {
            text: "© 2026 Docs Framework. All rights reserved.",
        },
    },

    /* =========================
       DOCS ENGINE
    ========================= */
    docs: {
        contentDir: "content/docs",
        basePath: "/docs",
        defaultSlug: ["getting-started"],

        breadcrumb: {
            enabled: true,
            showRoot: true,
            rootLabel: "Documentation",
        },

        sidebar: {
            showEmptyFolders: false, // 👈 default clean behavior
            emptyLabel: "No content",
        },
    },
}