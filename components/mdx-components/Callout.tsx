import type { ReactNode } from "react"
import clsx from "clsx"

type CalloutType = "info" | "success" | "warning" | "danger"

interface CalloutProps {
    type?: CalloutType
    children: ReactNode
}

/**
 * We use the base color for border and text for better visibility 
 * against the translucent background.
 */
const styles: Record<CalloutType, string> = {
    info: "bg-info/10 border-info/30 text-info dark:text-info",
    success: "bg-success/10 border-success/30 text-success dark:text-success",
    warning: "bg-warning/15 border-warning/30 text-warning-foreground dark:text-warning",
    danger: "bg-danger/10 border-danger/30 text-danger dark:text-danger",
}

export function Callout({ type = "info", children }: CalloutProps) {
    return (
        <div
            className={clsx(
                "my-8 flex items-start gap-4 rounded-xl border-l-[6px] p-4 text-[15px] shadow-sm",
                styles[type]
            )}
        >
            <div className="flex-shrink-0 select-none text-xl leading-none">
                {type === "info" && "ℹ️"}
                {type === "success" && "✅"}
                {type === "warning" && "⚠️"}
                {type === "danger" && "🚨"}
            </div>

            <div className="flex-1 leading-relaxed prose-p:my-0">
                {children}
            </div>
        </div>
    )
}