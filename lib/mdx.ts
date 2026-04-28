import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import remarkGfm from "remark-gfm"

import { mdxComponents } from "@/components/mdx-components"
import { docsConfig } from "@/lib/config"
import { rehypeExtractMeta } from "./rehype-meta"
import { getDocsTree } from "@/lib/docs"

/* =========================
   DEFAULT CODE THEME
========================= */

const defaultCodeOptions = {
    theme: {
        dark: "github-dark",
        light: "github-light",
    },
    keepBackground: false,
}

/* =========================
   RESOLVE DOCS PATH
========================= */

function getDocsPath() {
    const contentDir =
        docsConfig.docs?.contentDir || "content/docs"

    return path.join(process.cwd(), contentDir)
}

/* =========================
   LOAD + COMPILE MDX
========================= */

async function loadMdx(
    filePath: string,
    slug: string[]
) {
    /* =========================
       READ FILE
    ========================= */
    const source = fs.readFileSync(filePath, "utf-8")

    /* =========================
       PARSE FRONTMATTER
    ========================= */
    const { content, data } = matter(source)

    /* =========================
       COMPILE MDX
    ========================= */
    const { content: compiledContent } =
        await compileMDX({
            source: content,
            components: mdxComponents,
            options: {
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                        [rehypePrettyCode, defaultCodeOptions],
                        rehypeExtractMeta,
                    ],
                },
            },
        })

    /* =========================
       RETURN
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

/* =========================
   FIND NODE IN TREE
========================= */

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

/* =========================
   GET DOC BY SLUG
========================= */

export async function getDocBySlug(
    slug?: string[],
    visited = new Set<string>() // prevent infinite loops
) {
    const defaultSlug =
        docsConfig.docs?.defaultSlug ||
        docsConfig.home ||
        ["getting-started"]

    const safeSlug =
        slug && slug.length > 0 ? slug : defaultSlug

    const slugKey = safeSlug.join("/")

    /* =========================
       PREVENT INFINITE LOOP
    ========================= */
    if (visited.has(slugKey)) {
        return null
    }
    visited.add(slugKey)

    const docsPath = getDocsPath()

    const filePath =
        path.join(docsPath, ...safeSlug) + ".mdx"

    const indexPath =
        path.join(docsPath, ...safeSlug, "index.mdx")

    /* =========================
       1. EXACT FILE
    ========================= */
    if (fs.existsSync(filePath)) {
        return loadMdx(filePath, safeSlug)
    }

    /* =========================
       2. FOLDER INDEX
    ========================= */
    if (fs.existsSync(indexPath)) {
        return loadMdx(indexPath, safeSlug)
    }

    /* =========================
       3. FOLDER FALLBACK
    ========================= */

    const tree = getDocsTree()
    const node = findNode(tree, safeSlug)

    if (node?.children?.length) {
        const firstChild = node.children[0]

        return getDocBySlug(
            firstChild.slug,
            visited
        )
    }

    /* =========================
       4. NOT FOUND
    ========================= */
    return null
}