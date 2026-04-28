import type { ReactNode } from "react"
import clsx from "clsx"

/* =========================================================
CALLOUT COMPONENT

A reusable MDX component for highlighting important content
such as notes, warnings, tips, and alerts.

Purpose:

* Improve content readability
* Visually distinguish important information
* Provide semantic meaning (info, success, warning, danger)

Used in MDX as: <Callout type="warning">
Be careful with this step! </Callout>

Features:

* Multiple variants (info, success, warning, danger)
* Colored border + subtle background
* Emoji icon for quick visual recognition
* Responsive and accessible design
* Works in both light and dark themes

Design Philosophy:

* Use soft background (low opacity)
* Stronger border + text for visibility
* Minimal but expressive UI
========================================================= */

/* =========================================================
TYPES

Defines supported callout variants
========================================================= */

type CalloutType =
    | "info"
    | "success"
    | "warning"
    | "danger"

interface CalloutProps {
    type?: CalloutType   // Variant type (default: "info")
    children: ReactNode // Content inside callout
}

/* =========================================================
STYLE MAP

Maps each callout type to its corresponding styles.

Strategy:

* Light background (bg- 10 or /15)
* Visible border (border-30)
* Strong text color for readability

Dark mode:

* Ensures text remains visible and consistent
========================================================= */

const styles: Record<CalloutType, string> = {
    info: "bg-info/10 border-info/30 text-info dark:text-info",

    success:
        "bg-success/10 border-success/30 text-success dark:text-success",

    warning:
        "bg-warning/15 border-warning/30 text-warning-foreground dark:text-warning",

    danger:
        "bg-danger/10 border-danger/30 text-danger dark:text-danger",

}

/* =========================================================
CALLOUT COMPONENT IMPLEMENTATION

Structure:

* Container (styled box)
* Icon (left side)
* Content (right side)

Layout:
[ ICON ]  [ CONTENT ]
========================================================= */

export function Callout({
    type = "info",
    children,
}: CalloutProps) {
    return (
        <div
            className={clsx(
                /* =========================
                BASE STYLING
                ========================= */
                "my-8 flex items-start gap-4 rounded-xl border-l-[6px] p-4 text-[15px] shadow-sm",

                /* =========================
                   TYPE-BASED STYLES
                ========================= */
                styles[type]
            )}
        >

            {/* =================================================
                ICON SECTION

                Displays emoji based on type.
                Provides quick visual identification.

                NOTE:
                - Can be replaced with icons later
                - Uses emojis for simplicity
            ================================================= */}

            <div className="flex-shrink-0 select-none text-xl leading-none">
                {type === "info" && "ℹ️"}
                {type === "success" && "✅"}
                {type === "warning" && "⚠️"}
                {type === "danger" && "🚨"}
            </div>

            {/* =================================================
                CONTENT SECTION

                - Renders children (MDX content)
                - Removes extra paragraph spacing inside callout
                - Ensures clean typography
            ================================================= */}

            <div className="flex-1 leading-relaxed prose-p:my-0">
                {children}
            </div>
        </div>
    )

}
