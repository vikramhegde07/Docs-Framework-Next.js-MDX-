"use client"

import { useState, ReactNode } from "react"
import clsx from "clsx"

interface TabProps {
    title: string
    children: ReactNode
}

interface TabsProps {
    children: ReactNode
}

export function Tab({ children }: TabProps) {
    return <div className="mt-2">{children}</div>
}

export function Tabs({ children }: TabsProps) {
    const tabs = Array.isArray(children) ? children : [children]
    const titles = tabs.map((tab: any) => tab.props.title)
    const [active, setActive] = useState(0)

    return (
        <div className="my-8 w-full">
            {/* Tab Headers */}
            <div className="flex gap-1 border-b border-border/60 px-1">
                {titles.map((title, index) => {
                    const isActive = active === index
                    return (
                        <button
                            key={index}
                            onClick={() => setActive(index)}
                            className={clsx(
                                "relative px-4 py-2.5 text-sm font-medium transition-all duration-200",
                                "outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            {title}

                            {/* Active Indicator Line */}
                            {isActive && (
                                <div
                                    className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary shadow-[0_-1px_4px_rgba(var(--primary),0.2)]"
                                />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Tab Content */}
            <div className="rounded-b-xl border-x border-b border-border/40 bg-card/30 p-6 shadow-sm">
                <div className="animate-in fade-in duration-300">
                    {tabs[active]}
                </div>
            </div>
        </div>
    )
}