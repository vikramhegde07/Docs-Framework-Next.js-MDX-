import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { docsConfig } from "@/lib/config"

/* =========================
   TYPES
========================= */

export type DocItem = {
    title: string
    slug: string[]
    order: number
    children?: DocItem[]
}

/* =========================
   RESOLVE CONTENT DIRECTORY

   Uses config:
   docs.contentDir → fallback: "content/docs"
========================= */

function getDocsPath() {
    const contentDir =
        docsConfig.docs?.contentDir || "content/docs"

    return path.join(process.cwd(), contentDir)
}

/* =========================
   EXTRACT FRONTMATTER

   Reads:
   - title
   - order

   Fallbacks:
   - title → filename
   - order → 0
========================= */

function getMeta(filePath: string) {
    const source = fs.readFileSync(filePath, "utf-8")
    const { data } = matter(source)

    return {
        title:
            data.title ||
            path.basename(filePath, ".mdx"),

        order: data.order ?? 0,
    }
}

/* =========================
   READ FOLDER META (_meta.mdx)
========================= */

function getFolderMeta(dirPath: string) {
    const metaPath = path.join(dirPath, "_meta.mdx")

    if (!fs.existsSync(metaPath)) {
        return {
            title: path.basename(dirPath),
            order: 0,
            items: null as string[] | null,
        }
    }

    const source = fs.readFileSync(metaPath, "utf-8")
    const { data } = matter(source)

    return {
        title: data.title || path.basename(dirPath),
        order: data.order ?? 0,
        items: data.items ?? null,
    }
}

/* =========================
   APPLY MANUAL ORDERING

   If `_meta.mdx` has:
   items: ["intro", "setup"]

   → reorder children accordingly
========================= */
function applyManualOrder(
    items: DocItem[],
    metaItems: any
) {
    if (!metaItems) return items

    const isArray = Array.isArray(metaItems)

    const map = new Map(
        items.map((item) => [
            item.slug[item.slug.length - 1],
            item,
        ])
    )

    const ordered: DocItem[] = []

    /* =========================
       ARRAY FORMAT (OLD)
    ========================= */

    if (isArray) {
        for (const key of metaItems) {
            const item = map.get(key)
            if (item) {
                ordered.push(item)
                map.delete(key)
            }
        }
    }

    /* =========================
       OBJECT FORMAT (NEW)
    ========================= */

    else {
        for (const key of Object.keys(metaItems)) {
            const item = map.get(key)

            if (item) {
                const override = metaItems[key]

                /* 🔥 APPLY TITLE OVERRIDE */
                if (override?.title) {
                    item.title = override.title
                }

                ordered.push(item)
                map.delete(key)
            }
        }
    }

    /* =========================
       APPEND REMAINING
    ========================= */

    return [...ordered, ...Array.from(map.values())]
}

/* =========================
   BUILD DOCS TREE (RECURSIVE)

   Params:
   - dir: current directory
   - parentSlug: accumulated slug path

   Returns:
   - structured DocItem[]
========================= */

export function getDocsTree(
    dir: string = getDocsPath(),
    parentSlug: string[] = []
): DocItem[] {
    const entries = fs.readdirSync(dir, {
        withFileTypes: true,
    })

    const files: DocItem[] = []
    const folders: DocItem[] = []

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)

        /* =========================
           HANDLE FOLDERS
        ========================= */

        if (entry.isDirectory()) {

            const meta = getFolderMeta(fullPath)

            let children = getDocsTree(fullPath, [
                ...parentSlug,
                entry.name,
            ])

            /* =========================
               APPLY MANUAL ORDER
            ========================= */

            children = applyManualOrder(children, meta.items)

            /* =========================
               HANDLE EMPTY FOLDERS
            ========================= */

            const showEmpty =
                docsConfig.docs?.sidebar?.showEmptyFolders ?? false

            if (!children.length && !showEmpty) {
                continue // 🚫 skip folder entirely
            }

            folders.push({
                title: meta.title,
                slug: [...parentSlug, entry.name],
                order: meta.order,
                children,
            })
        }

        /* =========================
           HANDLE FILES (.mdx)
        ========================= */

        else if (
            entry.name.endsWith(".mdx") &&
            entry.name !== "_meta.mdx"
        ) {
            const meta = getMeta(fullPath)

            files.push({
                title: meta.title,
                order: meta.order,
                slug: [
                    ...parentSlug,
                    entry.name.replace(".mdx", ""),
                ],
            })
        }
    }

    /* =========================
       SORTING
  
       - files sorted by order
       - folders sorted by order
    ========================= */

    files.sort((a, b) => a.order - b.order)
    folders.sort((a, b) => a.order - b.order)

    /* =========================
     APPLY ROOT LEVEL META
  ========================= */

    const currentMeta = getFolderMeta(dir)


    let merged = [...files, ...folders]

    merged = applyManualOrder(merged, currentMeta.items)

    /* =========================
      FINAL MERGE
 
      UX decision:
      - files first
      - folders after
   ========================= */

    return merged
}