import type { ComponentPropsWithoutRef } from "react"
import { clsx } from "clsx"

/* =========================
   UNORDERED LIST
========================= */

export function UL({ className, ...props }: ComponentPropsWithoutRef<"ul">) {
    return (
        <ul
            className={clsx(
                "my-6 ml-6 list-disc space-y-3",
                "text-[16px] leading-7 text-foreground/85",
                "marker:text-primary/60",
                className
            )}
            {...props}
        />
    )
}

/* =========================
   ORDERED LIST
========================= */

export function OL({ className, ...props }: ComponentPropsWithoutRef<"ol">) {
    return (
        <ol
            className={clsx(
                "my-6 ml-6 list-decimal space-y-3",
                "text-[16px] leading-7 text-foreground/85",
                "marker:font-mono marker:text-sm marker:text-muted-foreground",
                className
            )}
            {...props}
        />
    )
}

/* =========================
   LIST ITEM
========================= */

export function LI({ className, ...props }: ComponentPropsWithoutRef<"li">) {
    return (
        <li
            className={clsx(
                "pl-1",
                /* Handling nested lists: remove bottom margin if LI contains a UL/OL */
                "[&>ul]:mt-3 [&>ol]:mt-3",
                className
            )}
            {...props}
        />
    )
}