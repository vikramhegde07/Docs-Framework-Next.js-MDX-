import { docsConfig } from "@/lib/config"

import { H1, H2, H3, H4, P } from "./mdx-components/Headings"
import { MDXLink } from "./mdx-components/Link"
import { UL, OL, LI } from "./mdx-components/Lists"
import { InlineCode, Pre } from "./mdx-components/Code"
import { Blockquote } from "./mdx-components/Blockquote"
import {
    Table,
    THead,
    TBody,
    TR,
    TH,
    TD,
} from "./mdx-components/Table"
import { Callout } from "./mdx-components/Callout"
import { Tabs, Tab } from "./mdx-components/Tabs"
import { MDXImage, Image } from "./mdx-components/MDXImage"

/* =========================================================
MDX COMPONENT MAPPING

This file defines how standard HTML/MDX elements
are rendered inside your documentation system.

It maps:

* HTML tags (h1, p, ul, etc.)
* MDX components (Callout, Tabs, etc.)

→ to custom React components

Purpose:

* Consistent styling across docs
* Enhanced functionality (code blocks, tabs, callouts)
* Centralized control over MDX rendering

Flow:
MDX → compiled → mapped here → rendered as React
========================================================= */

/* =========================================================
INLINE vs BLOCK CODE HANDLER

Determines whether a <code> element is:

* Inline code → <code> inside text
* Block code → part of a fenced code block

Logic:

* Block code has className like "language-ts"
* Inline code does not

Behavior:

* Block → handled by <pre> (via rehype-pretty-code)
* Inline → rendered using <InlineCode />

NOTE:

* We do NOT override block code here
* That is handled by the <pre> component
========================================================= */

function Code(props: any) {
    const { className, ...rest } = props

    const isBlock = className?.includes("language-")

    if (isBlock) {
        // Let rehype-pretty-code + <pre> handle it
        return <code {...props} />
    }

    // Inline code
    return <InlineCode {...props} />
}

/* =========================================================
DEFAULT MDX COMPONENTS

Maps standard HTML elements to custom components.

Categories:

1. Headings → custom typography + anchor support
2. Text → styled paragraphs
3. Links → enhanced navigation handling
4. Lists → consistent spacing + styling
5. Code → syntax highlighting + inline formatting
6. Tables → responsive + styled tables
7. Media → images with enhancements
8. UI Components → Callout, Tabs, etc.

IMPORTANT:

* These are the base components
* Can be overridden via config
========================================================= */

const defaultComponents = {

    /* =========================
       HEADINGS
    ========================= */
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,

    /* =========================
       TEXT
    ========================= */
    p: P,

    /* =========================
       LINKS
    ========================= */
    a: MDXLink,

    /* =========================
       LISTS
    ========================= */
    ul: UL,
    ol: OL,
    li: LI,

    /* =========================
       CODE
    ========================= */
    code: Code,  // inline vs block logic
    pre: Pre,    // block code renderer

    /* =========================
       BLOCK ELEMENTS
    ========================= */
    blockquote: Blockquote,

    /* =========================
       TABLES
    ========================= */
    table: Table,
    thead: THead,
    tbody: TBody,
    tr: TR,
    th: TH,
    td: TD,

    /* =========================
       MEDIA
    ========================= */

    /**
     * Standard Markdown image
     * ![alt](src)
     */
    img: MDXImage,

    /**
     * Custom Image component
     * <Image src="" width="" />
     */
    Image,

    /* =========================
       CUSTOM COMPONENTS
    ========================= */

    /**
     * Callout box
     * <Callout type="info">...</Callout>
     */
    Callout,

    /**
     * Tabs system
     * <Tabs>
     *   <Tab title="...">...</Tab>
     * </Tabs>
     */
    Tabs,
    Tab,

}

/* =========================================================
FINAL EXPORT (MERGED COMPONENTS)

Combines:

* Default components (framework-provided)
* User overrides (from docsConfig)

Priority:
user-defined components override defaults

Example:
docsConfig.components.mdx = {
h1: CustomH1
}

→ CustomH1 replaces default H1

This allows:

* Full customization
* Theme-level overrides
* Plugin-like extensibility
========================================================= */

export const mdxComponents = {
    ...defaultComponents,
    ...(docsConfig.components?.mdx || {}),
}
