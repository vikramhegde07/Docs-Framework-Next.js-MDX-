import Link from "next/link"
import { getDocsTree, type DocItem } from "@/lib/docs"

/* =========================
   TREE RENDERER (RECURSIVE)
========================= */

function TreeList({ items }: { items: DocItem[] }) {
    return (
        <ul className="ml-4 space-y-1">
            {items.map((item) => {
                const href = "/docs/" + item.slug.join("/")

                return (
                    <li key={href}>
                        <Link
                            href={href}
                            className="text-blue-600 hover:underline"
                        >
                            {item.title}
                        </Link>

                        {item.children?.length ? (
                            <TreeList items={item.children} />
                        ) : null}
                    </li>
                )
            })}
        </ul>
    )
}

/* =========================
   NOT FOUND PAGE
========================= */

export default function NotFound() {
    const tree = getDocsTree()

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">
                    404 – Doc Not Found
                </h1>
                <p className="text-muted-foreground mt-2">
                    The page you’re looking for doesn’t exist.
                    Try exploring the docs below.
                </p>
            </div>

            {/* Tree */}
            <div>
                <h2 className="text-lg font-semibold mb-2">
                    Available Docs
                </h2>

                <TreeList items={tree} />
            </div>
        </div>
    )
}