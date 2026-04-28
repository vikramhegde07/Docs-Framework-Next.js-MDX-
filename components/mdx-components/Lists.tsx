import type { ComponentPropsWithoutRef } from "react"
import { clsx } from "clsx"

/* =========================================================
LIST COMPONENTS (UL, OL, LI)

Custom renderers for list elements in MDX.

Replaces default HTML:

* <ul> → UL
* <ol> → OL
* <li> → LI

Purpose:

* Maintain consistent spacing and typography
* Improve readability of lists
* Enhance visual hierarchy
* Handle nested lists gracefully

Used automatically via mdxComponents mapping
========================================================= */

/* =========================================================
UNORDERED LIST (UL)

Usage:

* Bullet lists

Features:

* Disc markers
* Vertical spacing between items
* Indentation for hierarchy
* Styled markers (color)

Example MDX:

* Item 1
* Item 2
========================================================= */

export function UL({
    className,
    ...props
}: ComponentPropsWithoutRef<"ul">) {
    return (
        <ul
            className={clsx(
                /* =========================
                SPACING & LAYOUT
                ========================= */
                "my-6 ml-6 list-disc space-y-3",

                /* =========================
                   TYPOGRAPHY
                ========================= */
                "text-[16px] leading-7 text-foreground/85",

                /* =========================
                   MARKER STYLING
                ========================= */
                "marker:text-primary/60",

                /* =========================
                   CUSTOM OVERRIDES
                ========================= */
                className
            )}
            {...props}
        />
    )
}

/* =========================================================
ORDERED LIST (OL)

Usage:

* Numbered lists

Features:

* Decimal numbering
* Monospace markers (for clean alignment)
* Slightly muted marker color
* Consistent spacing with UL

Example MDX:

1. Step one
2. Step two
========================================================= */

export function OL({
    className,
    ...props
}: ComponentPropsWithoutRef<"ol">) {
    return (
        <ol
            className={clsx(
                /* =========================
                    SPACING & LAYOUT
                ========================= */
                "my-6 ml-6 list-decimal space-y-3",

                /* =========================
                   TYPOGRAPHY
                ========================= */
                "text-[16px] leading-7 text-foreground/85",

                /* =========================
                   MARKER STYLING
                ========================= */
                "marker:font-mono marker:text-sm marker:text-muted-foreground",

                /* =========================
                   CUSTOM OVERRIDES
                ========================= */
                className
            )}
            {...props}
        />
    )

}

/* =========================================================
LIST ITEM (LI)

Usage:

* Individual list entries inside UL/OL

Features:

* Slight left padding for alignment
* Handles nested lists gracefully

Nested List Handling:

* Adds top margin when UL/OL is inside LI
* Prevents cramped nested structures

Example:

* Parent item

  * Nested item
========================================================= */

export function LI({
    className,
    ...props
}: ComponentPropsWithoutRef<"li">) {
    return (
        <li
            className={clsx(
                /* =========================
                    BASE SPACING
                ========================= */
                "pl-1",

                /* =========================
                   NESTED LIST HANDLING
    
                   Adds spacing above nested lists
                ========================= */
                "[&>ul]:mt-3 [&>ol]:mt-3",

                /* =========================
                   CUSTOM OVERRIDES
                ========================= */
                className
            )}
            {...props}
        />
    )

}
