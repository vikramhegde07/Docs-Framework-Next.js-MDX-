import type { ComponentPropsWithoutRef } from "react"

export function Blockquote(
    props: ComponentPropsWithoutRef<"blockquote">
) {
    return (
        <blockquote
            className="
                my-8
                /* Border & Shape */
                border-l-4 border-primary
                rounded-tr-lg rounded-br-lg
                
                /* Layout & Spacing */
                pl-6 py-4 pr-4
                
                /* Background & Typography */
                bg-secondary/30
                italic
                text-foreground/90
                leading-relaxed
                
                /* Decorative Quote Mark (Optional but nice) */
                relative
                before:content-['']
                before:absolute
                before:left-0 before:top-0
            "
            {...props}
        />
    )
}