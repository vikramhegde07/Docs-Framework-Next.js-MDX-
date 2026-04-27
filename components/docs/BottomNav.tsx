"use client"

import Link from "next/link"
import type { DocItem } from "@/lib/docs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { clsx } from "clsx"

export function BottomNav({
    prev,
    next,
}: {
    prev: DocItem | null
    next: DocItem | null
}) {
    return (
        <div className="mt-16 grid grid-cols-1 gap-4 border-t border-border/60 pt-8 sm:grid-cols-2">

            {/* Previous Page */}
            {prev ? (
                <Link
                    href={`/docs/${prev.slug.join("/")}`}
                    className={clsx(
                        "group flex flex-col items-start gap-2 rounded-xl border border-border/50 p-4 transition-all duration-200",
                        "hover:border-primary/50 hover:bg-muted/30 hover:shadow-sm"
                    )}
                >
                    <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary">
                        <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                        <span>Previous</span>
                    </div>
                    <span className="text-base font-semibold text-foreground">
                        {prev.title}
                    </span>
                </Link>
            ) : (
                <div />
            )}

            {/* Next Page */}
            {next ? (
                <Link
                    href={`/docs/${next.slug.join("/")}`}
                    className={clsx(
                        "group flex flex-col items-end gap-2 rounded-xl border border-border/50 p-4 text-right transition-all duration-200",
                        "hover:border-primary/50 hover:bg-muted/30 hover:shadow-sm"
                    )}
                >
                    <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary">
                        <span>Next</span>
                        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                    <span className="text-base font-semibold text-foreground">
                        {next.title}
                    </span>
                </Link>
            ) : (
                <div />
            )}
        </div>
    )
}