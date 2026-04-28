import { getDocsTree } from "@/lib/docs"
import { flattenDocs, getPrevNext } from "@/lib/navigation"
import { BottomNav } from "@/components/docs/BottomNav"
import { FolderView } from "@/components/docs/FolderView"
import { getDocBySlug } from "@/lib/mdx"
import { notFound } from "next/navigation"

/* =========================================================
DYNAMIC DOC PAGE ("/docs/[...slug]")

This is the core renderer of the docs system.

It handles:

* File pages (MDX rendering)
* Folder pages (explorer-style UI)
* Static generation (SSG)
* SEO metadata generation

Flow:

1. Generate all possible routes (SSG)
2. Generate metadata (SEO)
3. Render:
   → Folder → FolderView
   → File → MDX + navigation

Key Idea:

* Everything is slug-driven
* Source-agnostic (local / GitHub)
========================================================= */

/* =========================================================
STATIC PARAMS (SSG)

Generates all routes at build time.

Important:

* includeFolders = true
  → ensures folder routes are also generated
  → required for static export compatibility

Example output:
[
{ slug: ["getting-started"] },
{ slug: ["guides", "intro"] },
{ slug: ["guides"] }  // folder route
]
========================================================= */

export async function generateStaticParams() {
    const tree = await getDocsTree()

    const flat = flattenDocs(tree, {
        includeFolders: true, // 🔥 critical for folder pages
    })

    return flat.map((doc) => ({
        slug: doc.slug,
    }))

}

/* =========================================================
METADATA (SEO)

Dynamically generates metadata per page.

Handles:

* File → full metadata (SEO optimized)
* Folder → basic metadata

Used by Next.js for:

* <title>
* meta description
* Open Graph tags
========================================================= */

export async function generateMetadata(
    {
        params,
    }: {
        params: Promise<{ slug?: string[] }>
    }
) {
    const { slug: rawSlug } = await params

    const slug = rawSlug ?? ["getting-started"]

    const doc = await getDocBySlug(slug)

    if (!doc) return {}

    /* =========================
       FILE METADATA
    ========================= */
    if (doc.type === "file") {
        return {
            title: doc.metadata.title,
            description: doc.metadata.description,
            keywords: doc.metadata.keywords,
            openGraph: {
                images: doc.metadata.ogImage
                    ? [doc.metadata.ogImage]
                    : [],
            },
        }
    }

    /* =========================
       FOLDER METADATA
    ========================= */
    return {
        title: doc.title,
        description: doc.description || "",
    }

}

/* =========================================================
PAGE RENDERER
========================================================= */

export default async function DocPage({
    params,
}: {
    params: Promise<{ slug?: string[] }>
}) {
    const { slug: rawSlug } = await params

    const slug = rawSlug ?? ["getting-started"]

    const doc = await getDocBySlug(slug)

    if (!doc) notFound()


    /* =====================================================
       FOLDER VIEW
    
       Renders:
       - Grid of child pages/folders
       - Acts like a documentation explorer
    
       Important:
       - This replaces the old "fallback-to-first-child"
       - Better UX (user chooses what to open)
    ===================================================== */

    if (doc.type === "folder") {
        return (
            <div className="flex">
                <div className="flex-1">

                    <FolderView
                        title={doc.title}
                        description={doc.description}
                        children={doc.children}
                    />

                </div>
            </div>
        )
    }


    /* =====================================================
       FILE VIEW (MDX PAGE)
    
       Steps:
       1. Get full docs tree
       2. Flatten to linear list
       3. Compute prev/next navigation
       4. Merge metadata
       5. Render content
    ===================================================== */

    const tree = await getDocsTree()
    const flat = flattenDocs(tree)

    /* =========================
       PREV / NEXT NAVIGATION
    ========================= */
    const { prev, next } = getPrevNext(flat, doc.slug)


    /* =========================
       FIND CURRENT NODE
    
       Used to merge:
       - Sidebar/folder metadata
       - File metadata
    ========================= */
    const currentNode = flat.find(
        (item) =>
            JSON.stringify(item.slug) ===
            JSON.stringify(doc.slug)
    )


    /* =========================
       MERGE METADATA
    
       Priority:
       - File metadata overrides folder metadata
    ========================= */
    const metadata = {
        ...currentNode,
        ...doc.metadata,
    }


    return (
        <div className="flex">
            <div className="flex-1">

                {/* =========================
                    PAGE TITLE
                ========================= */}
                <h1 className="text-3xl font-bold mb-6">
                    {metadata.title}
                </h1>


                {/* =========================
                    MDX CONTENT
                ========================= */}
                <article className="prose dark:prose-invert max-w-none">
                    {doc.content}
                </article>


                {/* =========================
                    BOTTOM NAVIGATION
                ========================= */}
                <BottomNav
                    prev={prev}
                    next={next}
                />

            </div>
        </div>
    )
}
