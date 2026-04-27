import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { docsConfig } from "@/lib/config"

export function Footer() {
    const currentYear = new Date().getFullYear()
    const footer = docsConfig.footer

    if (!footer) return null

    return (
        <footer className="mt-20 border-t border-border/40 bg-muted/30">
            <div className="mx-auto max-w-screen-2xl px-6 py-12 lg:px-10">

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">

                    {/* Brand */}
                    {footer.brand && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                {footer.brand.logo && (
                                    <img
                                        src={footer.brand.logo}
                                        alt="Logo"
                                        className="h-10 w-10 rounded object-contain"
                                    />
                                )}
                                <span className="text-lg font-semibold text-foreground">
                                    {footer.brand.name}
                                </span>
                            </div>

                            {footer.brand.description && (
                                <p className="text-sm text-muted-foreground">
                                    {footer.brand.description}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Link Columns */}
                    {footer.links?.map((group, i) => (
                        <div key={i}>
                            <h3 className="mb-4 text-sm font-semibold text-foreground">
                                {group.title}
                            </h3>

                            <ul className="space-y-3 text-sm text-muted-foreground">
                                {group.items.map((item, j) => (
                                    <li key={j}>
                                        {item.external ? (
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 hover:text-primary transition-colors"
                                            >
                                                {item.label}
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="hover:text-primary transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-12 border-t border-border/40 pt-6 text-xs text-muted-foreground flex justify-between flex-col md:flex-row gap-2">
                    <p>
                        © {currentYear} {footer.brand?.name || "Docs"}.{" "}
                        {footer.bottom?.text}
                    </p>
                </div>
            </div>
        </footer>
    )
}