import { visit } from "unist-util-visit"
import { toString } from "hast-util-to-string"

/* =========================
   TYPES
========================= */

export type Heading = {
    id: string
    text: string
    level: 2 | 3
}

/* =========================
   SLUG GENERATOR

   - lowercases
   - removes symbols
   - replaces spaces with "-"
========================= */

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
}

/* =========================
   REHYPE PLUGIN

   Extracts:
   - h2, h3 headings
   - generates id
   - collects TOC data

   Also:
   - prevents duplicate IDs
========================= */

export function rehypeExtractHeadings(headings: Heading[]) {
    const usedIds = new Map<string, number>()

    return (tree: any) => {
        visit(tree, "element", (node: any) => {
            if (!node?.tagName) return

            if (node.tagName === "h2" || node.tagName === "h3") {
                /* =========================
                   EXTRACT TEXT (ROBUST)
                ========================= */

                const text = toString(node)

                if (!text) return

                /* =========================
                   GENERATE UNIQUE ID
                ========================= */

                let id = slugify(text)

                if (usedIds.has(id)) {
                    const count = usedIds.get(id)! + 1
                    usedIds.set(id, count)
                    id = `${id}-${count}`
                } else {
                    usedIds.set(id, 0)
                }

                /* =========================
                   ATTACH ID TO NODE
                ========================= */

                node.properties = node.properties || {}
                node.properties.id = id

                /* =========================
                   PUSH TO HEADINGS ARRAY
                ========================= */

                headings.push({
                    id,
                    text,
                    level: node.tagName === "h2" ? 2 : 3,
                })
            }
        })
    }
}