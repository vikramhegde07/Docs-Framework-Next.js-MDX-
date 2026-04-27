import type { ComponentPropsWithoutRef } from "react"

/* =========================
   TABLE WRAPPER
========================= */

export function Table(props: ComponentPropsWithoutRef<"table">) {
    return (
        <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
            <table
                className="w-full text-sm border-collapse"
                {...props}
            />
        </div>
    )
}

/* =========================
   TABLE HEAD
========================= */

export function THead(props: ComponentPropsWithoutRef<"thead">) {
    return (
        <thead
            className="
        bg-muted/60 
        border-b border-border 
        sticky top-0 z-10
      "
            {...props}
        />
    )
}

/* =========================
   TABLE BODY
========================= */

export function TBody(props: ComponentPropsWithoutRef<"tbody">) {
    return <tbody {...props} />
}

/* =========================
   TABLE ROW
========================= */

export function TR(props: ComponentPropsWithoutRef<"tr">) {
    return (
        <tr
            className="
        border-b border-border last:border-0
        even:bg-muted/30
        hover:bg-muted/50 transition-colors
      "
            {...props}
        />
    )
}

/* =========================
   TABLE HEADER CELL
========================= */

export function TH(props: ComponentPropsWithoutRef<"th">) {
    return (
        <th
            className="
        px-4 py-2.5 
        text-left 
        font-semibold 
        text-foreground
        whitespace-nowrap
      "
            {...props}
        />
    )
}

/* =========================
   TABLE DATA CELL
========================= */

export function TD(props: ComponentPropsWithoutRef<"td">) {
    return (
        <td
            className="
        px-4 py-2.5 
        text-muted-foreground
        align-middle
      "
            {...props}
        />
    )
}