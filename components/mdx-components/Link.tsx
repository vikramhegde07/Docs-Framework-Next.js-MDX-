import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"

type AnchorProps = ComponentPropsWithoutRef<"a">

export function MDXLink({ href = "", children, ...props }: AnchorProps) {
    const isExternal =
        href.startsWith("http") || href.startsWith("mailto:")

    const baseClass =
        "inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"

    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={baseClass}
                {...props}
            >
                <span>{children}</span>

                {/* External Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 opacity-70"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                </svg>
            </a>
        )
    }

    return (
        <Link href={href} className={baseClass} {...props}>
            {children}
        </Link>
    )
}   