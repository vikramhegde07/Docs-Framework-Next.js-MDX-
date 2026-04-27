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
            { label: "API", href: "/api" },
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
            name: "Your Docs",
            description:
                "Simple documentation framework built with Next.js and MDX.",
            logo: "/logo.png",
        },

        links: [
            {
                title: "Docs",
                items: [
                    { label: "Getting Started", href: "/docs/getting-started" },
                    { label: "API", href: "/docs/api/overview" },
                ],
            },
            {
                title: "Resources",
                items: [
                    {
                        label: "Blog",
                        href: "https://example.com/blog",
                        external: true,
                    },
                    {
                        label: "GitHub",
                        href: "https://github.com",
                        external: true,
                    },
                ],
            },
            {
                title: "Legal",
                items: [
                    { label: "Privacy", href: "/privacy" },
                    { label: "Terms", href: "/terms" },
                ],
            },
        ],

        bottom: {
            text: "All rights reserved.",
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