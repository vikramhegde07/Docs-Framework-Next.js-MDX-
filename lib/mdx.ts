import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import remarkGfm from "remark-gfm"

import { mdxComponents } from "@/components/mdx-components"
import { docsConfig } from "@/lib/config"
import { rehypeExtractMeta } from "./rehype-meta"
import { getDocsTree } from "@/lib/docs"
import { getSource } from "@/lib/source"
import { DocResult, FileDoc, FolderDoc } from "@/interfaces/mdx"

/* =========================================================
   DEFAULT CODE THEME

   Configuration for syntax highlighting using rehype-pretty-code.

   Supports:
   - Light mode theme
   - Dark mode theme

   Applied during MDX compilation
========================================================= */

const defaultCodeOptions = {
    theme: {
        dark: "github-dark",
        light: "github-light",
    },
    keepBackground: false,
}


/* =========================================================
   LOAD + COMPILE MDX

   Responsibilities:
   - Read MDX file from source (local / GitHub)
   - Parse frontmatter using gray-matter
   - Compile MDX → React components
   - Apply plugins (GFM, syntax highlighting, metadata extraction)

   Returns:
   - React-renderable content
   - Metadata (frontmatter)
   - Slug

   IMPORTANT:
   - This is used ONLY for actual files (not folders)
   - Returns null if file cannot be read
========================================================= */

async function loadMdx(
    filePath: string,
    slug: string[]
) {
    const source = getSource()

    /* =========================
       READ FILE (SOURCE-BASED)
    ========================= */
    let raw: string

    try {
        raw = await source.readFile(filePath)
    } catch {
        // File not found or fetch error
        return null
    }

    /* =========================
       PARSE FRONTMATTER
    ========================= */
    const { content, data } = matter(raw)

    /* =========================
       COMPILE MDX → REACT
    ========================= */
    const { content: compiledContent } =
        await compileMDX({
            source: content,
            components: mdxComponents,
            options: {
                mdxOptions: {
                    remarkPlugins: [
                        remarkGfm, // GitHub Flavored Markdown
                    ],
                    rehypePlugins: [
                        [
                            rehypePrettyCode,
                            defaultCodeOptions,
                        ],
                        rehypeExtractMeta, // custom plugin
                    ],
                },
            },
        })

    /* =========================
       RETURN RESULT
    ========================= */
    return {
        content: compiledContent,
        metadata: {
            title: data.title || "",
            description: data.description || "",
            keywords: data.keywords || [],
            ogImage: data.ogImage || null,
        },
        slug,
    }
}


/* =========================================================
   FIND NODE IN TREE

   Recursively searches the docs tree to find a node
   matching the given slug.

   Used for:
   - Resolving folder routes
   - Building folder UI
   - Fallback logic

   NOTE:
   - Performs deep traversal
   - Returns null if not found
========================================================= */

function findNode(
    nodes: any[],
    targetSlug: string[]
): any | null {
    for (const node of nodes) {
        if (
            JSON.stringify(node.slug) ===
            JSON.stringify(targetSlug)
        ) {
            return node
        }

        if (node.children) {
            const found = findNode(
                node.children,
                targetSlug
            )
            if (found) return found
        }
    }
    return null
}


/* =========================================================
   GET DOC BY SLUG (CORE RESOLVER)

   This is the main entry point for fetching docs content.

   It resolves a slug into either:
   - 📄 FileDoc → MDX page
   - 📁 FolderDoc → folder navigation UI
   - null → not found

   Resolution order:

   1. Exact file match
      → guides/intro.mdx

   2. Folder index file
      → guides/index.mdx

   3. Folder fallback (virtual page)
      → guides/advanced → render children

   4. Not found
========================================================= */

export async function getDocBySlug(
    slug?: string[],
    visited = new Set<string>()
): Promise<DocResult | null> {
    const source = getSource()

    /* =========================
       RESOLVE DEFAULT SLUG
    ========================= */
    const defaultSlug =
        docsConfig.docs.defaultSlug ||
        docsConfig.docs.home ||
        ["getting-started"]

    const safeSlug =
        slug && slug.length > 0 ? slug : defaultSlug

    const slugKey = safeSlug.join("/")

    /* =========================
       PREVENT INFINITE LOOPS

       Needed for recursive fallback logic
    ========================= */
    if (visited.has(slugKey)) {
        return null
    }
    visited.add(slugKey)

    /* =========================
       BUILD FILE PATHS
    ========================= */
    const filePath = `${safeSlug.join("/")}.mdx`
    const indexPath = `${safeSlug.join("/")}/index.mdx`

    /* =========================
       1. EXACT FILE MATCH
    ========================= */
    if (await source.exists(filePath)) {
        const doc = await loadMdx(filePath, safeSlug)

        return {
            type: "file",
            ...doc,
        } as FileDoc
    }

    /* =========================
       2. FOLDER INDEX FILE
    ========================= */
    if (await source.exists(indexPath)) {
        const doc = await loadMdx(indexPath, safeSlug)

        return {
            type: "file",
            ...doc,
        } as FileDoc
    }

    /* =========================
       3. FOLDER (VIRTUAL PAGE)

       If no file exists but folder is present,
       return folder node to render UI
    ========================= */

    const tree = await getDocsTree()
    const node = findNode(tree, safeSlug)

    if (node) {
        return {
            type: "folder",
            title: node.title,
            description: node.description,
            slug: node.slug,
            children: node.children || [],
        } as FolderDoc
    }

    /* =========================
       4. NOT FOUND
    ========================= */
    return null
}