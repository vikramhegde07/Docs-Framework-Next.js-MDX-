import { docsConfig } from "@/lib/config"
import { GitHubSourceAdapter } from "./github"
import { LocalSourceAdapter } from "./local"

/* =========================================================
   SOURCE RESOLVER (FACTORY)

   Returns the appropriate content source adapter
   based on the configuration.

   This function acts as a "factory" that abstracts
   away the underlying content source.

   Supported sources:
   - "local"  → filesystem (development / simple setups)
   - "github" → remote GitHub repository (production / CMS-like usage)

   Why this exists:
   - Decouples content fetching from implementation
   - Allows switching sources without changing core logic
   - Enables future extensions (S3, CMS, APIs, etc.)

   Usage:
   const source = getSource()
   await source.readFile(...)
   await source.readDir(...)
   await source.exists(...)

   IMPORTANT:
   - All adapters must implement the same interface:
     {
       readFile(path): Promise<string>
       readDir(path): Promise<DirEntry[]>
       exists(path): Promise<boolean>
     }
========================================================= */

export function getSource() {
    const type = docsConfig.docs.source.type

    /* =========================
       GITHUB SOURCE
    ========================= */
    if (type === "github") {
        return GitHubSourceAdapter
    }

    /* =========================
       LOCAL FILESYSTEM SOURCE
    ========================= */
    if (type === "local") {
        return LocalSourceAdapter
    }

    /* =========================
       UNSUPPORTED SOURCE
    ========================= */
    throw new Error(
        `Unsupported source: ${type}`
    )
}