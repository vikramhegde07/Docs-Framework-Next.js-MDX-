import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { docsConfig } from "@/lib/config"

/* =========================================================
FOOTER COMPONENT

Renders the global footer section for the docs site.

Purpose:

* Display brand identity
* Provide quick navigation links
* Show legal / copyright info

Structure:
┌───────────────────────────────┐
│ Brand        Links Columns    │
│ Description  (multiple groups)│
├───────────────────────────────┤
│ Bottom Bar (copyright/info)   │
└───────────────────────────────┘

Config-driven:

* Fully controlled via docsConfig.footer
* Supports optional sections (brand, links, bottom)

Responsive:

* Grid adapts across screen sizes
========================================================= */

export function Footer() {

    /* =====================================================
       CURRENT YEAR
    
       Used for dynamic copyright
    ===================================================== */

    const currentYear = new Date().getFullYear()

    /* =====================================================
       LOAD CONFIG
    
       Footer is optional → return null if not defined
    ===================================================== */

    const footer = docsConfig.footer

    if (!footer) return null


    return (
        <footer className="mt-20 border-t border-border/40 bg-muted/30">

            <div className="mx-auto max-w-screen-2xl px-6 py-12 lg:px-10">

                {/* =================================================
                    MAIN GRID

                    - Brand section
                    - Link groups (columns)
                ================================================= */}

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">

                    {/* =============================================
                        BRAND SECTION

                        Displays:
                        - Logo
                        - Name
                        - Description
                    ============================================= */}

                    {footer.brand && (
                        <div className="space-y-4">

                            <div className="flex items-center gap-2">

                                {/* Logo */}
                                {footer.brand.logo && (
                                    <img
                                        src={footer.brand.logo}
                                        alt="Logo"
                                        className="h-10 w-10 rounded object-contain"
                                    />
                                )}

                                {/* Brand Name */}
                                <span className="text-lg font-semibold text-foreground">
                                    {footer.brand.name}
                                </span>
                            </div>

                            {/* Description */}
                            {footer.brand.description && (
                                <p className="text-sm text-muted-foreground">
                                    {footer.brand.description}
                                </p>
                            )}
                        </div>
                    )}


                    {/* =============================================
                        LINK GROUPS

                        Renders multiple columns of links
                    ============================================= */}

                    {footer.links?.map((group, i) => (
                        <div key={i}>

                            {/* Group Title */}
                            <h3 className="mb-4 text-sm font-semibold text-foreground">
                                {group.title}
                            </h3>

                            {/* Links */}
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                {group.items.map((item, j) => (
                                    <li key={j}>

                                        {/* =========================
                                            EXTERNAL LINK
                                        ========================= */}
                                        {item.external ? (
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 hover:text-primary transition-colors"
                                            >
                                                {item.label}

                                                {/* External Icon */}
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        ) : (

                                            /* =========================
                                               INTERNAL LINK
                                            ========================= */

                                            <Link
                                                href={item.href}
                                                className="hover:text-primary transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>


                {/* =================================================
                    BOTTOM BAR      

                    - Copyright
                    - Additional footer text
                ================================================= */}

                <div className="mt-12 border-t border-border/40 pt-6 text-xs text-muted-foreground flex justify-between flex-col md:flex-row gap-2">

                    <p>
                        © {currentYear}{" "}
                        {footer.brand?.name || "Docs"}.{" "}
                        {footer.bottom?.text}
                    </p>

                </div>
            </div>
        </footer>
    )
}
