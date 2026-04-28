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

/* =========================
   INLINE vs BLOCK CODE
========================= */

function Code(props: any) {
    const { className, ...rest } = props

    const isBlock = className?.includes("language-")

    if (isBlock) {
        return <code {...props} />
    }

    return <InlineCode {...props} />
}

/* =========================
   DEFAULT COMPONENTS
========================= */

const defaultComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,

    p: P,

    a: MDXLink,

    ul: UL,
    ol: OL,
    li: LI,

    code: Code,
    pre: Pre,

    blockquote: Blockquote,

    table: Table,
    thead: THead,
    tbody: TBody,
    tr: TR,
    th: TH,
    td: TD,

    img: MDXImage,

    Callout,

    Image,

    Tabs,
    Tab,
}

/* =========================
   FINAL EXPORT (MERGED)
========================= */

export const mdxComponents = {
    ...defaultComponents,
    ...(docsConfig.components?.mdx || {}),
}