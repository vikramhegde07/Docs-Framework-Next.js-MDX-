"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import clsx from "clsx"

/* =========================================================
COPY BUTTON COMPONENT

A reusable UI component for copying code snippets
(or any text) to the clipboard.

Purpose:

* Improve developer experience in docs
* Allow quick copying of code examples
* Provide visual feedback after copy action

Used in:

* Code blocks (<Pre /> component)
* Anywhere copy-to-clipboard is needed

Features:

* Clipboard API integration
* Success feedback ("Copied!")
* Icon transition (Copy → Check)
* Auto reset after 2 seconds
* Accessible (aria-label)

Dependencies:

* lucide-react → icons
* clsx → conditional class handling
========================================================= */

export function CopyButton({ code }: { code: string }) {

    /* =====================================================
       STATE
    
       Tracks whether content has been copied
       to provide visual feedback
    ===================================================== */

    const [copied, setCopied] = useState(false)


    /* =====================================================
       COPY HANDLER
    
       - Uses browser Clipboard API
       - Writes text to clipboard
       - Shows success state for 2 seconds
    
       Error Handling:
       - Logs error if copy fails (e.g., insecure context)
    ===================================================== */

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(code)

            setCopied(true)

            // Reset after 2 seconds
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy!", err)
        }
    }


    /* =====================================================
       RENDER BUTTON
    
       - Changes UI based on `copied` state
       - Shows Copy → Copied transition
       - Includes hover and focus styles
    ===================================================== */

    return (
        <button
            onClick={handleCopy}

            /* Accessibility */
            aria-label="Copy code"

            className={clsx(
                /* =========================
                   BASE LAYOUT
                ========================= */
                "group/btn flex items-center gap-1.5 rounded-md px-2 py-1.5",

                /* =========================
                   TYPOGRAPHY
                ========================= */
                "text-xs font-medium transition-all duration-200",

                /* =========================
                   VISUAL STYLE
                ========================= */
                "border border-border/50 bg-secondary/50 backdrop-blur-sm",

                /* =========================
                   HOVER EFFECTS
                ========================= */
                "hover:border-accent/50 hover:bg-accent hover:text-accent-foreground",

                /* =========================
                   STATE STYLING
                ========================= */
                copied
                    ? "text-success"
                    : "text-muted-foreground"
            )}
        >

            {/* =================================================
                ICON + TEXT (DYNAMIC)

                Shows different UI based on copy state
            ================================================= */}

            {copied ? (
                /* =========================
                   SUCCESS STATE
                ========================= */
                <>
                    <Check className="h-3.5 w-3.5 stroke-[3px]" />
                    <span>Copied!</span>
                </>
            ) : (
                /* =========================
                   DEFAULT STATE
                ========================= */
                <>
                    <Copy className="h-3.5 w-3.5 transition-transform group-hover/btn:scale-110" />
                    <span>Copy</span>
                </>
            )}
        </button>
    )
}
