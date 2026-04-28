import type { ComponentPropsWithoutRef } from "react"
import { CopyButton } from "./CopyButton"

/* =========================================================
CODE RENDERING COMPONENTS

This file handles all code-related rendering in MDX:

* InlineCode → for inline snippets (`const x = 1`)
* Pre        → for code blocks (`ts ... `)

It also includes utilities to:

* Extract raw code text (for copy button)
* Parse metadata (e.g., filename from code fences)

These components work together with:

* rehype-pretty-code → syntax highlighting
* rehypeExtractMeta → metadata extraction
========================================================= */

/* =========================================================
INLINE CODE COMPONENT

Renders inline <code> elements inside text.

Example MDX:
Use `npm install` to install dependencies.

Features:

* Subtle background
* Rounded corners
* Monospace font
* Slight border for definition

Purpose:

* Distinguish inline code from normal text
* Maintain readability without being too heavy
========================================================= */

export function InlineCode(
    props: ComponentPropsWithoutRef<"code">
) {
    return (
        <code
            className="
                relative rounded bg-muted/60 px-[0.3rem] py-[0.1rem]
                font-mono text-[0.9em] font-medium text-foreground/90
                border border-border/40
            "
            {...props}
        />
    )
}

/* =========================================================
UTIL: EXTRACT TEXT FROM NODE

Recursively extracts plain text from React children.

Why needed:

* Code blocks are nested React nodes
* CopyButton needs raw string

Handles:

* strings
* arrays
* nested children

Example: <code><span>console.log("hi")</span></code>
→ "console.log("hi")"
========================================================= */

function extractText(node: any): string {
    if (typeof node === "string") return node

    if (Array.isArray(node)) {
        return node.map(extractText).join("")
    }

    if (node?.props?.children) {
        return extractText(node.props.children)
    }

    return ""

}

/* =========================================================
UTIL: EXTRACT FILENAME FROM META

Reads metadata string attached by rehypeExtractMeta.

Example meta:
filename="example.ts"

Output:
"example.ts"

Used for:

* Displaying filename in code block header
========================================================= */

function extractFilename(
    meta?: string
): string | undefined {
    if (!meta) return

    const match = meta.match(/filename="(.+?)"/)
    return match?.[1]
}

/* =========================================================
CODE BLOCK WRAPPER (<Pre />)

Custom renderer for fenced code blocks.

Replaces default <pre> behavior with:

* Styled container
* Optional filename header
* Copy button
* Scrollable code area

Structure:
┌───────────────────────────────┐
│ filename.ts        [Copy]     │
├───────────────────────────────┤
│ code block content            │
└───────────────────────────────┘

Features:

* Extracts code text for copy
* Displays filename (if provided)
* Hover-revealed copy button
* Scrollable horizontal overflow
* Prevents style conflicts from parent elements

Works with:

* rehype-pretty-code → syntax highlighting
* rehypeExtractMeta → metadata injection
========================================================= */

export function Pre(
    props: ComponentPropsWithoutRef<"pre">
) {
    const { children, ...rest } = props

    /* =========================
       EXTRACT CODE STRING
    ========================= */
    const code = extractText(children)

    /* =========================
       EXTRACT META DATA
    ========================= */
    const meta = (props as any)["data-meta"] as
        | string
        | undefined

    const filename = extractFilename(meta)

    return (
        <div className="group relative my-8 overflow-hidden rounded-xl border border-border bg-card shadow-sm">

            {/* =================================================
                HEADER SECTION

                Displays:
                - filename (if available)
                - copy button (on hover)

                Styled like a terminal/tab header
            ================================================= */}

            {(filename || code) && (
                <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5">

                    {/* =========================
                        FILE NAME / LABEL
                    ========================= */}
                    <div className="flex items-center gap-2">
                        {/* Decorative dot (like editor UI) */}
                        <div className="h-2 w-2 rounded-full bg-primary/40" />

                        <span className="font-mono text-xs font-medium text-muted-foreground">
                            {filename ?? "terminal"}
                        </span>
                    </div>

                    {/* =========================
                        COPY BUTTON (HOVER)
                    ========================= */}
                    <div className="opacity-0 transition-opacity group-hover:opacity-100">
                        <CopyButton code={code} />
                    </div>
                </div>
            )}

            {/* =================================================
                CODE BLOCK AREA

                Handles:
                - scrolling
                - spacing
                - typography

                IMPORTANT:
                - Overrides styles from rehype-pretty-code
                - Prevents nested <code> conflicts
            ================================================= */}

            <pre
                className="
                relative
                overflow-x-auto
                py-4
                text-[13px]
                leading-[1.6]
                bg-card !bg-transparent
                selection:bg-primary/20

                /* Force inner <code> cleanup */
                [&>code]:!bg-transparent 
                [&>code]:!p-0 
                [&>code]:!border-none 
                [&>code]:block
                [&>code]:w-full
                [&>code]:font-mono
            "
                {...rest}
            >

                {/* =========================
                    INNER PADDING WRAPPER

                    Prevents scrollbar clipping
                =============================== */}

                <div className="px-4">
                    {children}
                </div>
            </pre>
        </div>
    )

}
