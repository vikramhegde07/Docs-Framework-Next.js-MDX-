import fs from "fs/promises"
import path from "path"
import { docsConfig } from "@/lib/config"

/* =========================================================
   DIRECTORY ENTRY TYPE

   Normalized structure representing a file or folder.

   This matches the shape used by ALL source adapters
   (GitHub, Local, future sources like S3, CMS, etc.)

   Purpose:
   - Keeps docs engine source-agnostic
   - Ensures consistent behavior across adapters
========================================================= */

export type DirEntry = {
    name: string               // File or folder name
    path: string               // Relative path (e.g. "guides/intro.mdx")
    type: "file" | "dir"       // Entry type
}


/* =========================================================
   RESOLVE BASE PATH

   Determines the root directory for local docs content.

   Reads from:
   docsConfig.docs.source.local.contentDir

   Fallback:
   "content/docs"

   Example:
   process.cwd() = /project
   contentDir = content/docs

   → /project/content/docs

   IMPORTANT:
   - Only valid when source.type === "local"
   - Throws error if misused
========================================================= */

function getBasePath() {
    const source = docsConfig.docs.source

    if (source.type !== "local") {
        throw new Error(
            "LocalSourceAdapter used with non-local source"
        )
    }

    const contentDir =
        source.local?.contentDir || "content/docs"

    return path.join(process.cwd(), contentDir)
}


/* =========================================================
   RESOLVE FULL PATH

   Converts a relative docs path into an absolute filesystem path.

   Example:
   input:  "guides/intro.mdx"
   output: "/project/content/docs/guides/intro.mdx"

   Ensures:
   - consistent path resolution
   - cross-platform compatibility
========================================================= */

function resolvePath(targetPath: string) {
    const basePath = getBasePath()

    return path.join(basePath, targetPath)
}


/* =========================================================
   LOCAL SOURCE ADAPTER

   Implements the Source Adapter interface for local filesystem.

   Provides:
   - readFile → read file contents
   - exists → check file/folder existence
   - readDir → list directory contents

   This allows the docs engine to treat the local filesystem
   the same way as remote sources like GitHub.

   IMPORTANT:
   - Uses async fs (fs/promises)
   - Fully compatible with SSG
========================================================= */

export const LocalSourceAdapter = {

    /* =========================
       READ FILE

       Reads a file from the local filesystem.

       Behavior:
       - Resolves full path
       - Returns UTF-8 string content

       Throws:
       - if file does not exist
    ========================= */

    async readFile(filePath: string) {
        const fullPath = resolvePath(filePath)

        return fs.readFile(fullPath, "utf-8")
    },


    /* =========================
       CHECK EXISTS

       Checks if a file or folder exists.

       Behavior:
       - Uses fs.access()
       - Returns true if accessible
       - Returns false if not found

       Used for:
       - routing resolution
       - fallback logic
    ========================= */

    async exists(targetPath: string) {
        const fullPath = resolvePath(targetPath)

        try {
            await fs.access(fullPath)
            return true
        } catch {
            return false
        }
    },


    /* =========================
       READ DIRECTORY

       Reads contents of a directory.

       Behavior:
       - Uses fs.readdir() with Dirent objects
       - Maps entries to normalized DirEntry[]
       - Converts Windows paths → POSIX (/)

       Returns:
       - Array of DirEntry
       - Empty array if directory not found

       IMPORTANT:
       - Path normalization ensures consistency
         across platforms (Windows/Linux/macOS)
    ========================= */

    async readDir(dirPath: string) {
        const fullPath = resolvePath(dirPath)

        try {
            const entries = await fs.readdir(fullPath, {
                withFileTypes: true,
            })

            return entries.map((entry) => ({
                name: entry.name,
                path: path
                    .join(dirPath, entry.name)
                    .replace(/\\/g, "/"), // normalize Windows paths
                type: entry.isDirectory()
                    ? "dir"
                    : "file",
            }))
        } catch {
            // Directory does not exist
            return []
        }
    },
}