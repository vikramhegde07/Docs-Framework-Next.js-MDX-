import { visit } from "unist-util-visit"

/* =========================
   REHYPE EXTRACT META

   Extracts metadata from code blocks:

   ```ts filename="example.ts"
   → attaches:

<pre data-meta="filename=example.ts"> Used later for: - filename display - copy button logic 

========================= */
export function rehypeExtractMeta() {
    return (tree: any) => {
        visit(tree, "element", (node: any) => {
            /* ========================= 
            TARGET: <pre><code/></pre>
             ========================= */

            if (node.tagName !== "pre") return

            const codeNode = node.children?.find(
                (child: any) => child.tagName === "code"
            )

            if (!codeNode) return

            /* =========================
               EXTRACT META
            ========================= */

            const meta = codeNode?.data?.meta

            if (!meta) return

            /* =========================
               ATTACH TO <pre>
            ========================= */

            node.properties = node.properties || {}
            node.properties["data-meta"] = meta
        })
    }
}