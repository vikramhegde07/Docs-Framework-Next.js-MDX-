import Link from "next/link"
import { getDocsTree, type DocItem } from "@/lib/docs"

/* =========================================================
TREE LIST (RECURSIVE RENDERER)

Renders the full docs tree as a nested list.

Purpose:

* Used in NotFound page as a fallback navigator
* Helps users recover from broken/invalid URLs

Behavior:

* Displays all files & folders
* Recursively renders children
* Each item links to its corresponding route

Example:
Guides
→ Intro
→ Advanced
→ Auth
========================================================= */

function TreeList({
    items,
}: {
    items: DocItem[]
}) {
    return (<ul className="ml-4 space-y-1">

        {items.map((item) => {

            /* =============================================
               BUILD LINK
            ============================================= */
            const href =
                "/docs/" + item.slug.join("/")

            return (
                <li key={href}>

                    {/* =====================================
                       LINK ITEM
                    ===================================== */}
                    <Link
                        href={href}
                        className="text-blue-600 hover:underline"
                    >
                        {item.title}
                    </Link>

                    {/* =====================================
                       CHILDREN (RECURSIVE)
                    ===================================== */}
                    {item.children?.length ? (
                        <TreeList items={item.children} />
                    ) : null}

                </li>
            )
        })}
    </ul>
    )

}

/* =========================================================
NOT FOUND PAGE (404)

Triggered when:

* Invalid slug is entered
* MDX file does not exist
* Folder/path is broken

Purpose:

* Prevents runtime crashes
* Provides recovery navigation
* Improves UX over blank 404

Features:

* Clear error message
* Full docs tree navigation
* Works with any source (local / GitHub)

UX Philosophy:
→ Don't dead-end the user
→ Always give a way back into content
========================================================= */

export default async function NotFound() {

    /* =====================================================
       FETCH DOCS TREE
    ===================================================== */
    const tree = await getDocsTree()


    return (
        <div className="flex flex-col gap-6 p-6">

            {/* =============================================
                HEADER
            ============================================= */}
            <div>
                <h1 className="text-3xl font-bold">
                    404 - Doc Not Found
                </h1>

                <p className="text-muted-foreground mt-2">
                    The page you're looking for doesn't exist.
                    Try exploring the docs below.
                </p>
            </div>


            {/* =============================================
                AVAILABLE DOCS (TREE NAVIGATION)
            ============================================= */}
            <div>
                <h2 className="text-lg font-semibold mb-2">
                    Available Docs
                </h2>

                <TreeList items={tree} />
            </div>

        </div>
    )
}
