import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"

/* =========================================================
MDX LINK COMPONENT

Custom renderer for anchor (<a>) elements in MDX.

Purpose:

* Automatically handle internal vs external links
* Provide consistent styling across docs
* Enhance UX with visual indicators (external icon)
* Leverage Next.js routing for internal links

Behavior:

* Internal links → use Next.js <Link> (client-side navigation)
* External links → use <a> with target="_blank"

Used automatically via mdxComponents mapping
========================================================= */

/* =========================================================
TYPES

Inherits all native anchor (<a>) props
========================================================= */

type AnchorProps = ComponentPropsWithoutRef<"a">

/* =========================================================
MDX LINK IMPLEMENTATION

Logic:

1. Detect if link is external
2. Apply shared styling
3. Render appropriate component

External detection:

* http / https → external site
* mailto:      → email link
========================================================= */

export function MDXLink({
    href = "",
    children,
    ...props
}: AnchorProps) {

    /* =========================
       CHECK IF EXTERNAL LINK
    ========================= */

    const isExternal =
        href.startsWith("http") ||
        href.startsWith("mailto:")

    /* =========================
       BASE STYLES
    
       - Inline flex for icon alignment
       - Underline styling
       - Smooth hover transition
    ========================= */

    const baseClass =
        "inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"


    /* =====================================================
       EXTERNAL LINK
    
       Behavior:
       - Opens in new tab
       - Adds security attributes
       - Shows external link icon
    ===================================================== */

    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={baseClass}
                {...props}
            >
                <span>{children}</span>

                {/* =========================================
                    EXTERNAL LINK ICON

                    Indicates navigation outside site
                ========================================= */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 opacity-70"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                </svg>
            </a>
        )
    }


    /* =====================================================
       INTERNAL LINK
    
       Behavior:
       - Uses Next.js <Link>
       - Enables client-side navigation
       - Faster page transitions
    ===================================================== */

    return (
        <Link
            href={href}
            className={baseClass}
            {...props}
        >
            {children}
        </Link>
    )
}
