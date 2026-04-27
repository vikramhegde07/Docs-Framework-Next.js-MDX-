import type { ComponentPropsWithoutRef } from "react"
import { clsx } from "clsx"

/* Utility for consistent spacing & anchor links */
const headingBase = "font-sans font-semibold tracking-tight text-foreground scroll-mt-28 transition-colors"

/* =========================
   HEADINGS
========================= */

export function H1(props: ComponentPropsWithoutRef<"h1">) {
    return (
        <h1
            className={clsx(
                headingBase,
                "text-4xl font-extrabold lg:text-5xl mt-2 mb-8"
            )}
            {...props}
        />
    )
}

export function H2(props: ComponentPropsWithoutRef<"h2">) {
    return (
        <h2
            className={clsx(
                headingBase,
                "text-2xl lg:text-3xl mt-16 mb-4 border-b border-border/60 pb-2 first:mt-0"
            )}
            {...props}
        />
    )
}

export function H3(props: ComponentPropsWithoutRef<"h3">) {
    return (
        <h3
            className={clsx(
                headingBase,
                "text-xl lg:text-2xl mt-12 mb-3 first:mt-0"
            )}
            {...props}
        />
    )
}

export function H4(props: ComponentPropsWithoutRef<"h4">) {
    return (
        <h4
            className={clsx(
                headingBase,
                "text-lg lg:text-xl mt-8 mb-2 font-medium text-foreground/80"
            )}
            {...props}
        />
    )
}

/* =========================
   PARAGRAPH & TEXT
========================= */

export function P(props: ComponentPropsWithoutRef<"p">) {
    return (
        <p
            className="text-[16px] leading-7 text-foreground/80 mb-6 last:mb-0"
            {...props}
        />
    )
}