import Link from "next/link"

/* =========================================================
FOLDER VIEW COMPONENT

Renders a visual grid view for folder-level pages.

Purpose:

* Display contents of a folder (files + subfolders)
* Provide a clean, browsable UI (like VS Code / docs sites)
* Replace fallback behavior with structured navigation

When it is used:

* When the current slug represents a folder
* Instead of rendering nearest MDX file
* Helps users explore available content

Layout:
┌───────────────────────────────┐
│ Title                         │
│ Description (optional)        │
├───────────────────────────────┤
│ [Card] [Card] [Card]          │
│ [Card] [Card] [Card]          │
└───────────────────────────────┘

Each card:

* Title
* Description (optional)
* Type (Folder / Page)
* Clickable navigation

Data Source:

* children → array of DocItem nodes
========================================================= */

export function FolderView({
    title,
    description,
    children,
}: {
    title?: string
    description?: string
    children: any[]
}) {
    return (<div className="space-y-6">

        {/* =================================================
           HEADER

           Displays folder title and optional description
        ================================================= */}

        <div>
            <h1 className="text-3xl font-bold">
                {title}
            </h1>

            {description && (
                <p className="text-muted-foreground mt-2">
                    {description}
                </p>
            )}
        </div>


        {/* =================================================
           GRID VIEW

           Displays folder contents as cards
           Responsive layout:
           - 1 column (mobile)
           - 2 columns (sm)
           - 3 columns (lg)
        ================================================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {children.map((item) => {

                /* =========================
                   BUILD LINK

                   Converts slug → /docs/path
                ========================= */

                const href =
                    "/docs/" + item.slug.join("/")

                /* =========================
                   DETERMINE TYPE

                   Folder → has children
                   Page → no children
                ========================= */

                const isFolder =
                    item.children &&
                    item.children.length > 0

                return (
                    <Link
                        key={href}
                        href={href}

                        className="
                            block border rounded-xl p-4 
                            transition-all duration-200
                            hover:shadow-md hover:border-primary/40
                        "
                    >

                        {/* =========================
                           TITLE
                        ========================= */}

                        <div className="font-medium text-foreground">
                            {item.title}
                        </div>

                        {/* =========================
                           DESCRIPTION
                        ========================= */}

                        {item.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                                {item.description}
                            </p>
                        )}

                        {/* =========================
                           TYPE LABEL

                           Helps user understand structure
                        ========================= */}

                        <div className="text-xs mt-2 opacity-70">
                            {isFolder
                                ? "Folder"
                                : "Page"}
                        </div>
                    </Link>
                )
            })}
        </div>
    </div>
    )
}
