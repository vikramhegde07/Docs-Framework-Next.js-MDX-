import { getDocsTree } from "@/lib/docs"
import { Sidebar } from "@/components/docs/Sidebar"
import { Topbar } from "@/components/docs/Topbar"

/* =========================================================
DOCS LAYOUT ("/docs")

This layout is applied to all routes under `/docs`.

Responsibilities:

* Fetch and provide docs tree
* Render sidebar navigation
* Render top breadcrumb bar
* Wrap page content with consistent layout

Structure:
┌──────────────────────────────────────────────┐
│ Sidebar │ Topbar                            │
│         │-----------------------------------│
│         │ Page Content                      │
│         │                                   │
└──────────────────────────────────────────────┘

Key Features:

* Server-side tree generation (SSG compatible)
* Persistent sidebar across navigation
* Dynamic breadcrumb updates
* Clean separation of layout vs page logic
========================================================= */

export default async function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {

    /* =====================================================
       FETCH DOCS TREE
    
       - Source-aware (local / GitHub)
       - Used by:
         → Sidebar (navigation)
         → Topbar (breadcrumbs)
    ===================================================== */

    const tree = await getDocsTree()


    return (
        <div className="flex min-h-screen">

            {/* =================================================
                SIDEBAR (LEFT NAVIGATION)

                - Recursive tree rendering
                - Sticky positioning (desktop)
                - Hidden on small screens
            ================================================= */}
            <Sidebar items={tree} />


            {/* =================================================
                MAIN CONTENT AREA
            ================================================= */}
            <div className="flex-1 flex flex-col">

                {/* =============================================
                    TOPBAR (BREADCRUMBS)
                ============================================= */}
                <Topbar tree={tree} />


                {/* =============================================
                    PAGE CONTENT
                ============================================= */}
                <main className="flex-1 p-8">
                    {children}
                </main>

            </div>
        </div>
    )
}
