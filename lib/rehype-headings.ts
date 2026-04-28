import { visit } from "unist-util-visit"
import { toString } from "hast-util-to-string"

/* =========================================================
   HEADING TYPE

   Represents a single heading extracted from MDX content.

   Used for:
   - Table of Contents (TOC)
   - In-page navigation (anchor links)

   Example:
   {
     id: "getting-started",
     text: "Getting Started",
     level: 2
   }
========================================================= */

export type Heading = {
    id: string        // Unique anchor ID (used in URL hash)
    text: string      // Visible heading text
    level: 2 | 3      // Heading level (h2 or h3)
}


/* =========================================================
   SLUG GENERATOR

   Converts heading text into a URL-friendly ID.

   Rules:
   - lowercase
   - trim whitespace
   - remove special characters
   - replace spaces with "-"

   Example:
   "Getting Started!" → "getting-started"

   NOTE:
   - Does NOT guarantee uniqueness (handled separately)
========================================================= */

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // remove symbols
        .replace(/\s+/g, "-")     // spaces → dash
}


/* =========================================================
   REHYPE PLUGIN: EXTRACT HEADINGS

   This plugin processes the HTML AST (HAST) generated from MDX
   and extracts heading information.

   Responsibilities:
   - Find <h2> and <h3> elements
   - Extract readable text from nodes
   - Generate unique IDs for each heading
   - Attach IDs to DOM nodes (for anchor links)
   - Collect heading data into an external array

   Params:
   - headings → mutable array to collect results

   Why external array?
   - Allows sharing data between MDX compilation and UI
   - Used later to render TOC/sidebar

   IMPORTANT:
   - Only processes h2 and h3 (configurable if needed)
   - Prevents duplicate IDs automatically
========================================================= */

export function rehypeExtractHeadings(headings: Heading[]) {

    /* =====================================================
       TRACK USED IDS

       Ensures all generated IDs are unique.

       Example:
       "intro" → "intro"
       "intro" → "intro-1"
       "intro" → "intro-2"
    ===================================================== */

    const usedIds = new Map<string, number>()

    return (tree: any) => {

        /* =================================================
           VISIT ALL ELEMENT NODES

           Traverses the HAST tree and inspects each node
        ================================================= */

        visit(tree, "element", (node: any) => {
            if (!node?.tagName) return

            /* =========================
               TARGET HEADINGS (h2, h3)
            ========================= */

            if (node.tagName === "h2" || node.tagName === "h3") {

                /* =========================
                   EXTRACT TEXT CONTENT

                   Uses hast-util-to-string to safely
                   extract readable text from node
                ========================= */

                const text = toString(node)

                if (!text) return

                /* =========================
                   GENERATE BASE ID
                ========================= */

                let id = slugify(text)

                /* =========================
                   ENSURE UNIQUE ID

                   If duplicate:
                   intro → intro-1 → intro-2
                ========================= */

                if (usedIds.has(id)) {
                    const count = usedIds.get(id)! + 1
                    usedIds.set(id, count)
                    id = `${id}-${count}`
                } else {
                    usedIds.set(id, 0)
                }

                /* =========================
                   ATTACH ID TO NODE

                   Enables anchor links:
                   /docs/page#heading-id
                ========================= */

                node.properties = node.properties || {}
                node.properties.id = id

                /* =========================
                   STORE HEADING

                   Push to external array for TOC rendering
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