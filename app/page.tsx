import { notFound } from "next/navigation"
import { docsConfig } from "@/lib/config"
import { getDocBySlug } from "@/lib/mdx"
import { FolderView } from "@/components/docs/FolderView"

/* =========================================================
HOME PAGE ("/")

This is the root entry point of the application.

Behavior:

* Loads the configured home document
* Supports both:
  → File (MDX content)
  → Folder (renders FolderView)

Purpose:

* Acts as landing page for docs
* Dynamically resolves content from docs engine
* Keeps routing fully config-driven

Flow:

1. Resolve home slug from config
2. Fetch document via getDocBySlug
3. Handle:

   * Folder → render grid view
   * File → render MDX content
========================================================= */

export default async function Home() {

  /* =====================================================
    RESOLVE HOME SLUG

    Priority:
    1. docs.home
    2. docs.defaultSlug
    3. fallback → ["getting-started"]
  ===================================================== */

  const homeSlug =
    docsConfig.docs.home ||
    docsConfig.docs.defaultSlug ||
    ["getting-started"]

  /* =====================================================
    FETCH DOCUMENT
  
    Returns:
    - FileDoc → MDX content
    - FolderDoc → folder structure
    - null → not found
  ===================================================== */

  const doc = await getDocBySlug(homeSlug)

  if (!doc) {
    notFound()
  }

  /* =====================================================
    FOLDER VIEW
    
    If the resolved slug is a folder:
    - Render grid of children
    - Acts like a docs explorer
  ===================================================== */

  if (doc.type === "folder") {
    return (<main className="max-w-5xl mx-auto py-10 px-4">

      <FolderView
        title={doc.title}
        description={doc.description}
        children={doc.children}
      />

    </main>
    )

  }

  /* =====================================================
    FILE VIEW
  
    Standard MDX page rendering:
    - Title from metadata
    - Compiled MDX content
  
  ===================================================== */

  return (<main className="max-w-3xl mx-auto py-10 px-4">

    {/* =========================
      MDX CONTENT
    ========================= */}
    <article className="prose dark:prose-invert max-w-none">
      {doc.content}
    </article>

  </main>
  )
}
