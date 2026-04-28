import type { ComponentPropsWithoutRef } from "react"

/* =========================================================
BLOCKQUOTE COMPONENT

Custom renderer for the <blockquote> element in MDX.

Purpose:

* Provides consistent styling for quoted content
* Enhances readability and visual hierarchy
* Adds subtle UI polish beyond default HTML rendering

Used when:
MDX contains:

> This is a quote

Features:

* Left accent border (primary color)
* Soft background for emphasis
* Italic typography for quote feel
* Proper spacing for readability
* Rounded edges for modern UI
* Optional decorative pseudo-element support

Design Notes:

* Uses Tailwind utility classes
* Keeps styling minimal but expressive
* Works well in both light and dark themes

Props:

* Accepts all native <blockquote> props
* Fully extensible via MDX

Example Usage (MDX):

> This is an important note or quote

========================================================= */

export function Blockquote(
    props: ComponentPropsWithoutRef<"blockquote">
) {
    return (
        <blockquote
            className="
            /* =========================
            SPACING
            ========================= */
            my-8

            /* =========================
               BORDER & SHAPE
            ========================= */
            border-l-4 border-primary
            rounded-tr-lg rounded-br-lg
            
            /* =========================
               LAYOUT & PADDING
            ========================= */
            pl-6 py-4 pr-4
            
            /* =========================
               BACKGROUND & TYPOGRAPHY
            ========================= */
            bg-secondary/30
            italic
            text-foreground/90
            leading-relaxed
            
            /* =========================
               DECORATIVE ELEMENT

               Reserved for future enhancements
               (e.g., quote icon, gradient accent)
            ========================= */
            relative
            before:content-['']
            before:absolute
            before:left-0 before:top-0
        "
            {...props}
        />
    )

}
