// /app/docs/[...slug]/page.tsx

import { getDocsTree } from "@/lib/docs"
import { flattenDocs, getPrevNext } from "@/lib/navigation"
import { BottomNav } from "@/components/docs/BottomNav"
import { getDocBySlug } from "@/lib/mdx"
import { notFound } from "next/navigation"
import { DocMeta } from "@/interfaces/meta"

/* =========================
   STATIC PARAMS (SSG)

   Generates all possible doc routes
========================= */

export async function generateStaticParams() {
    const tree = getDocsTree()
    const flat = flattenDocs(tree)

    return flat.map((doc) => ({
        slug: doc.slug,
    }))
}

export async function generateMetadata(
    {
        params
    }: {
        params: Promise<{ slug?: string[] }>
    }
) {
    const { slug: rawSlug } = await params

    const slug = rawSlug ?? ["getting-started"];

    const doc = await getDocBySlug(slug)

    if (!doc) return {}

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
   PAGE
========================= */

export default async function DocPage({
    params,
}: {
    params: Promise<{ slug?: string[] }>
}) {
    const { slug: rawSlug } = await params

    const slug = rawSlug ?? ["getting-started"]

    const doc = await getDocBySlug(slug)
    if (!doc) notFound();

    const tree = getDocsTree()
    const flat = flattenDocs(tree)
    const { prev, next } = getPrevNext(flat, doc.slug)

    // find matching node
    const currentNode = flat.find(
        (item) =>
            JSON.stringify(item.slug) ===
            JSON.stringify(doc.slug)
    )

    // merge meta
    const metadata = {
        ...currentNode,     // folder fallback
        ...doc.metadata,    // file overrides
    }

    return (
        <div className="flex">
            <div className="flex-1">
                <h1>{metadata.title}</h1>
                {doc.content}

                <BottomNav prev={prev} next={next} />
            </div>
        </div>
    )
}