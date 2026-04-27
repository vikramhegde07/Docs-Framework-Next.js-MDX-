"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import clsx from "clsx"

export function CopyButton({ code }: { code: string }) {
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy!", err)
        }
    }

    return (
        <button
            onClick={handleCopy}
            aria-label="Copy code"
            className={clsx(
                "group/btn flex items-center gap-1.5 rounded-md px-2 py-1.5",
                "text-xs font-medium transition-all duration-200",
                "border border-border/50 bg-secondary/50 backdrop-blur-sm",
                "hover:border-accent/50 hover:bg-accent hover:text-accent-foreground",
                copied ? "text-success" : "text-muted-foreground"
            )}
        >
            {copied ? (
                <>
                    <Check className="h-3.5 w-3.5 stroke-[3px]" />
                    <span>Copied!</span>
                </>
            ) : (
                <>
                    <Copy className="h-3.5 w-3.5 transition-transform group-hover/btn:scale-110" />
                    <span>Copy</span>
                </>
            )}
        </button>
    )
}