import type { ComponentPropsWithoutRef } from "react"
import { CopyButton } from "./CopyButton"

/* =========================
   INLINE CODE
========================= */

export function InlineCode(props: ComponentPropsWithoutRef<"code">) {
    return (
        <code
            className="
                relative rounded bg-muted/60 px-[0.3rem] py-[0.1rem] 
                font-mono text-[0.9em] font-medium text-foreground/90
                border border-border/40
            "
            {...props}
        />
    )
}

/* =========================
   UTIL: EXTRACT TEXT & FILENAME (Kept as requested)
========================= */
function extractText(node: any): string {
    if (typeof node === "string") return node
    if (Array.isArray(node)) return node.map(extractText).join("")
    if (node?.props?.children) return extractText(node.props.children)
    return ""
}

function extractFilename(meta?: string): string | undefined {
    if (!meta) return
    const match = meta.match(/filename="(.+?)"/)
    return match?.[1]
}

/* =========================
   CODE BLOCK WRAPPER
========================= */

export function Pre(props: ComponentPropsWithoutRef<"pre">) {
    const { children, ...rest } = props
    const code = extractText(children)
    const meta = (props as any)["data-meta"] as string | undefined
    const filename = extractFilename(meta)

    return (
        <div className="group relative my-8 overflow-hidden rounded-xl border border-border bg-card shadow-sm">

            {/* Header: Styled to feel like a window/tab */}
            {(filename || code) && (
                <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                        {/* Soft Folder Icon simulation */}
                        <div className="h-2 w-2 rounded-full bg-primary/40" />
                        <span className="font-mono text-xs font-medium text-muted-foreground">
                            {filename ?? "terminal"}
                        </span>
                    </div>

                    <div className="opacity-0 transition-opacity group-hover:opacity-100">
                        <CopyButton code={code} />
                    </div>
                </div>
            )}

            {/* Code: Forced overrides to prevent parent contamination */}
            <pre
                className="
                    relative
                    overflow-x-auto
                    py-4
                    text-[13px]
                    leading-[1.6]
                    bg-card !bg-transparent
                    selection:bg-primary/20
                    /* Force child code tag to behave */
                    [&>code]:!bg-transparent 
                    [&>code]:!p-0 
                    [&>code]:!border-none 
                    [&>code]:block
                    [&>code]:w-full
                    [&>code]:font-mono
                "
                {...rest}
            >
                {/* Horizontal padding applied to a wrapper or line to avoid scrollbar clipping */}
                <div className="px-4">
                    {children}
                </div>
            </pre>
        </div>
    )
}