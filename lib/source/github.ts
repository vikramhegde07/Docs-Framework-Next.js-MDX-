import { docsConfig } from "@/lib/config"

/* =========================================================
   DIRECTORY ENTRY TYPE

   Represents a file or folder returned by the source adapter.

   This is a normalized structure so that:
   - Local filesystem
   - GitHub API

   both return the SAME shape.

   Used by:
   - getDocsTree()
   - navigation system
   - folder rendering
========================================================= */

export type DirEntry = {
    name: string               // File or folder name (e.g. "intro.mdx")
    path: string               // Relative path (e.g. "guides/intro.mdx")
    type: "file" | "dir"       // Entry type
}


/* =========================================================
   HELPER: REPO CONFIG

   Extracts GitHub configuration from docsConfig.

   Ensures all required fields are present.

   Required fields:
   - owner → GitHub username/org
   - repo → repository name
   - docsPath → root docs directory inside repo

   Optional:
   - branch → defaults to "main"
   - token → for private repos / higher rate limits

   Throws error if config is missing
========================================================= */

function getRepoConfig() {
    const github = docsConfig.docs.source.github

    if (!github) {
        throw new Error("GitHub config missing")
    }

    const {
        owner,
        repo,
        branch = "main",
        docsPath,
        token,
    } = github

    return { owner, repo, branch, docsPath, token }
}


/* =========================================================
   HELPER: BUILD API URL

   Constructs GitHub REST API URL for a given file/folder path.

   Example:
   input:  "guides/intro.mdx"
   output: https://api.github.com/repos/{owner}/{repo}/contents/docs/guides/intro.mdx?ref=main

   Notes:
   - Uses GitHub "contents" API
   - Automatically prefixes docsPath
   - Cleans duplicate slashes
========================================================= */

function buildApiUrl(path: string) {
    const { owner, repo, branch, docsPath } =
        getRepoConfig()

    const fullPath = `${docsPath}/${path}`.replace(
        /\/+/g,
        "/"
    )

    return `https://api.github.com/repos/${owner}/${repo}/contents/${fullPath}?ref=${branch}`
}


/* =========================================================
   FETCH HELPER

   Wrapper around fetch for GitHub API requests.

   Features:
   - Adds Authorization header (if token provided)
   - Uses Next.js caching (SSG-friendly)
   - Handles failed responses safely

   IMPORTANT:
   - `next: { revalidate: false }` ensures static export compatibility
   - Avoids dynamic rendering errors

   Returns:
   - JSON response (file or directory)
   - null if request fails
========================================================= */

async function githubFetch(url: string) {
    const { token } = getRepoConfig()

    const res = await fetch(url, {
        headers: token
            ? {
                Authorization: `Bearer ${token}`,
            }
            : {},
        next: { revalidate: false },
        // cache: "force-cache", // optional alternative
    })

    if (!res.ok) {
        return null
    }

    return res.json()
}


/* =========================================================
   GITHUB SOURCE ADAPTER

   Implements the Source Adapter interface.

   Provides:
   - readFile → fetch file contents
   - exists → check file/folder existence
   - readDir → list directory contents

   This adapter allows the docs engine to treat
   GitHub as a virtual filesystem.

   IMPORTANT:
   - Uses GitHub REST API (contents endpoint)
   - All paths are relative to docsPath
========================================================= */

export const GitHubSourceAdapter = {

    /* =========================
       READ FILE

       Fetches a single file from GitHub.

       Behavior:
       - Calls GitHub API
       - Decodes base64 content
       - Returns UTF-8 string

       Throws:
       - if file doesn't exist or is not a file
    ========================= */

    async readFile(filePath: string) {
        const url = buildApiUrl(filePath)

        const data = await githubFetch(url)

        if (!data || data.type !== "file") {
            throw new Error(
                `GitHub readFile failed: ${filePath}`
            )
        }

        // GitHub returns file content as base64
        const content = Buffer.from(
            data.content,
            "base64"
        ).toString("utf-8")

        return content
    },


    /* =========================
       CHECK EXISTS

       Checks whether a file or folder exists.

       Behavior:
       - Calls GitHub API
       - Returns true if response exists
       - Returns false if not found

       Used heavily in:
       - routing logic
       - fallback resolution
    ========================= */

    async exists(targetPath: string) {
        const url = buildApiUrl(targetPath)

        const data = await githubFetch(url)

        return !!data
    },


    /* =========================
       READ DIRECTORY

       Fetches directory contents from GitHub.

       Behavior:
       - Calls GitHub API
       - Maps response into normalized DirEntry[]
       - Filters structure into "file" | "dir"

       IMPORTANT:
       - Removes docsPath prefix from returned paths
       - Ensures consistency with local adapter

       Returns:
       - Array of DirEntry
       - Empty array if not a directory
    ========================= */

    async readDir(dirPath: string) {
        const url = buildApiUrl(dirPath)

        const data = await githubFetch(url)

        if (!Array.isArray(data)) {
            return []
        }

        return data.map((item: any) => ({
            name: item.name,
            path: item.path.replace(
                `${getRepoConfig().docsPath}/`,
                ""
            ),
            type: item.type === "dir" ? "dir" : "file",
        })) as DirEntry[]
    },
}