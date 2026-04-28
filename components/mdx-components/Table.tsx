import type { ComponentPropsWithoutRef } from "react"

/* =========================================================
TABLE COMPONENTS (TABLE, THEAD, TBODY, TR, TH, TD)

Custom renderers for table elements in MDX.

Replaces default HTML table elements with styled versions:

* <table> → Table
* <thead> → THead
* <tbody> → TBody
* <tr>    → TR
* <th>    → TH
* <td>    → TD

Purpose:

* Improve readability of tabular data
* Add responsive behavior (horizontal scroll)
* Enhance visual hierarchy
* Maintain consistent styling across docs

Used automatically via mdxComponents mapping
========================================================= */

/* =========================================================
TABLE WRAPPER

Wraps the <table> inside a scrollable container.

Features:

* Horizontal scrolling (for wide tables)
* Rounded borders
* Prevents layout breaking on small screens

IMPORTANT:

* Keeps table responsive
* Avoids overflow issues in docs layout
========================================================= */

export function Table(
    props: ComponentPropsWithoutRef<"table">
) {
    return (<div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
        <table
            className="w-full text-sm border-collapse"
            {...props}
        /> </div>
    )
}

/* =========================================================
TABLE HEAD (<thead>)

Features:

* Subtle background for header distinction
* Bottom border for separation
* Sticky positioning (optional UX enhancement)

Sticky Behavior:

* Keeps header visible when scrolling long tables
========================================================= */

export function THead(
    props: ComponentPropsWithoutRef<"thead">
) {
    return (
        <thead
            className="
                bg-muted/60
                border-b border-border
                sticky top-0 z-10
            "
            {...props}
        />
    )
}

/* =========================================================
TABLE BODY (<tbody>)

Simple passthrough component.

Purpose:

* Keeps structure consistent
* Allows future enhancements if needed
========================================================= */

export function TBody(
    props: ComponentPropsWithoutRef<"tbody">
) {
    return <tbody {...props} />
}

/* =========================================================
TABLE ROW (<tr>)

Features:

* Bottom border between rows
* Zebra striping (even rows)
* Hover highlight for better UX
* Smooth color transitions

Improves:

* Row readability
* Scanability of data
========================================================= */

export function TR(
    props: ComponentPropsWithoutRef<"tr">
) {
    return (
        <tr
            className="
                border-b border-border last:border-0
                even:bg-muted/30
                hover:bg-muted/50 transition-colors
            "
            {...props}
        />
    )
}

/* =========================================================
TABLE HEADER CELL (<th>)

Features:

* Bold text for emphasis
* Left alignment
* Padding for spacing
* Prevents text wrapping (whitespace-nowrap)

Purpose:

* Clearly define column headers
========================================================= */

export function TH(
    props: ComponentPropsWithoutRef<"th">
) {
    return (
        <th
            className="
                px-4 py-2.5
                text-left
                font-semibold
                text-foreground
                whitespace-nowrap
            "
            {...props}
        />
    )
}

/* =========================================================
TABLE DATA CELL (<td>)

Features:

* Muted text color for contrast with headers
* Consistent padding
* Vertical alignment (middle)

Purpose:

* Improve readability of table content
========================================================= */

export function TD(
    props: ComponentPropsWithoutRef<"td">
) {
    return (
        <td
            className="
                px-4 py-2.5
                text-muted-foreground
                align-middle
            "
            {...props}
        />
    )
}
