import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import remarkGfm from "remark-gfm"

import { mdxComponents } from "@/components/mdx-components"
import { docsConfig } from "@/lib/config"
import { rehypeExtractMeta } from "./rehype-meta"

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
   GET DOC BY SLUG
========================= */

export async function getDocBySlug(slug?: string[]) {
    const defaultSlug =
        docsConfig.docs?.defaultSlug ||
        docsConfig.home ||
        ["getting-started"]

    const safeSlug =
        slug && slug.length > 0 ? slug : defaultSlug

    const docsPath = getDocsPath()

    const filePath =
        path.join(docsPath, ...safeSlug) + ".mdx"

    /* =========================
       READ FILE
    ========================= */

    let source: string

    try {
        source = fs.readFileSync(filePath, "utf-8")
    } catch (err) {
        throw new Error(
            `MDX file not found: ${safeSlug.join("/")}`
        )
    }

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
        metadata: data,
        slug: safeSlug,
    }
}