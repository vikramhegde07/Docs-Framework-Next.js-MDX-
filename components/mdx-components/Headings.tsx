import type { ComponentPropsWithoutRef } from "react"
import { clsx } from "clsx"

/* =========================================================
TYPOGRAPHY COMPONENTS (HEADINGS & PARAGRAPH)

This file defines consistent typography styles
for MDX content across the documentation system.

It replaces default HTML elements:

* h1, h2, h3, h4 → custom heading components
* p              → styled paragraph

Purpose:

* Maintain consistent spacing and hierarchy
* Improve readability and visual rhythm
* Enable anchor navigation (scroll offset)
* Provide a clean, modern docs look

Used automatically via mdxComponents mapping
========================================================= */

/* =========================================================
BASE HEADING STYLES

Shared across all heading levels.

Includes:

* Font styling
* Tracking (letter spacing)
* Color
* Scroll offset (for anchor links)
* Smooth color transitions

IMPORTANT:
scroll-mt-28 → prevents headings from being hidden
behind sticky navbar when navigating via anchors (#id)
========================================================= */

const headingBase =
    "font-sans font-semibold tracking-tight text-foreground scroll-mt-28 transition-colors"

/* =========================================================
H1 (PAGE TITLE)

Usage:

* Main page title
* Highest level heading

Features:

* Large font size
* Extra bold weight
* Tight top spacing, larger bottom spacing
========================================================= */

export function H1(
    props: ComponentPropsWithoutRef<"h1">
) {
    return (
        <h1
            className={clsx(
                headingBase,
                "text-4xl font-extrabold lg:text-5xl mt-2 mb-8"
            )}
            {...props}
        />
    )
}

/* =========================================================
H2 (SECTION HEADING)

Usage:

* Major sections within a page

Features:

* Medium-large font size
* Bottom border for separation
* Large top spacing (section separation)
* Removes top margin for first element
========================================================= */

export function H2(
    props: ComponentPropsWithoutRef<"h2">
) {
    return (
        <h2
            className={clsx(
                headingBase,
                "text-2xl lg:text-3xl mt-16 mb-4 border-b border-border/60 pb-2 first:mt-0"
            )}
            {...props}
        />
    )
}

/* =========================================================
H3 (SUBSECTION HEADING)

Usage:

* Subsections under H2

Features:

* Slightly smaller than H2
* Balanced spacing
* Maintains hierarchy clarity
========================================================= */

export function H3(
    props: ComponentPropsWithoutRef<"h3">
) {
    return (
        <h3
            className={clsx(
                headingBase,
                "text-xl lg:text-2xl mt-12 mb-3 first:mt-0"
            )}
            {...props}
        />
    )
}

/* =========================================================
H4 (MINOR HEADING)

Usage:

* Smaller subsections or grouped content

Features:

* Smaller size
* Softer color (reduced emphasis)
* Medium font weight
========================================================= */

export function H4(
    props: ComponentPropsWithoutRef<"h4">
) {
    return (
        <h4
            className={clsx(
                headingBase,
                "text-lg lg:text-xl mt-8 mb-2 font-medium text-foreground/80"
            )}
            {...props}
        />
    )
}

/* =========================================================
PARAGRAPH (P)

Usage:

* Standard text blocks

Features:

* Comfortable reading size (16px)
* Relaxed line height for readability
* Slightly muted text color
* Bottom spacing between paragraphs
* Removes margin for last paragraph

Ensures:

* Clean vertical rhythm
* Consistent spacing across content
========================================================= */

export function P(
    props: ComponentPropsWithoutRef<"p">
) {
    return (
        <p
            className="text-[16px] leading-7 text-foreground/80 mb-6 last:mb-0"
            {...props}
        />
    )
}
