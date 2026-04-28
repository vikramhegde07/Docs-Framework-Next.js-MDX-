import { visit } from "unist-util-visit"

/* =========================================================
REHYPE PLUGIN: EXTRACT CODE BLOCK META

This plugin extracts metadata from fenced code blocks
and attaches it to the <pre> element in the HTML AST.

Example MDX:

```ts filename="example.ts"
console.log("hello")
```

During MDX parsing, the metadata:
filename="example.ts"

is stored internally on the <code> node.

This plugin:

* Reads that metadata
* Moves it to the parent <pre> element
* Exposes it as a DOM attribute: data-meta

Resulting HTML:

   <pre data-meta="filename=example.ts">
     <code>...</code>
   </pre>

Why this matters:

* UI components (like <Pre />) can access metadata easily
* Enables features like:
  ✔ filename display
  ✔ copy button behavior
  ✔ line highlighting (future)
  ✔ custom rendering logic

NOTE:

* Only processes <pre><code> blocks
* Safe: ignores nodes without metadata
  ========================================================= */

export function rehypeExtractMeta() {
    return (tree: any) => {

        /* =================================================
           TRAVERSE ALL ELEMENT NODES
    
           Walks through the HTML AST (HAST)
           generated from MDX content
        ================================================= */

        visit(tree, "element", (node: any) => {

            /* =========================
               TARGET: <pre> ELEMENT
    
               Code blocks are structured as:
               <pre>
                 <code />
               </pre>
            ========================= */

            if (node.tagName !== "pre") return

            /* =========================
               FIND CHILD <code> NODE
            ========================= */

            const codeNode = node.children?.find(
                (child: any) => child.tagName === "code"
            )

            if (!codeNode) return

            /* =========================
               EXTRACT META FROM CODE NODE
    
               meta is parsed from MDX fence syntax:
               ```ts filename="file.ts"
            ========================= */

            const meta = codeNode?.data?.meta

            if (!meta) return

            /* =========================
               ATTACH META TO <pre>
    
               Makes metadata accessible in React components
               via props (e.g., data-meta attribute)
            ========================= */

            node.properties = node.properties || {}
            node.properties["data-meta"] = meta
        })
    }
}
