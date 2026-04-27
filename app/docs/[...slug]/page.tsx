// /app/docs/[...slug]/page.tsx

import { getDocsTree } from "@/lib/docs"
import { flattenDocs, getPrevNext } from "@/lib/navigation"
import { BottomNav } from "@/components/docs/BottomNav"
import { getDocBySlug } from "@/lib/mdx"

export default async function DocPage({
    params,
}: {
    params: Promise<{ slug?: string[] }>
}) {
    const { slug: rawSlug } = await params

    const slug = rawSlug ?? ["getting-started"]

    const { content, metadata } = await getDocBySlug(slug)


    const tree = getDocsTree()
    const flat = flattenDocs(tree)
    const { prev, next } = getPrevNext(flat, slug)

    return (
        <div className="flex">
            <div className="flex-1">
                <h1>{metadata.title}</h1>
                {content}
                <BottomNav prev={prev} next={next} />
            </div>
        </div>
    )
}