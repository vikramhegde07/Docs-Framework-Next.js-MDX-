import { getDocsTree } from "@/lib/docs"
import { Sidebar } from "@/components/docs/Sidebar"
import { Topbar } from "@/components/docs/Topbar"

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const tree = getDocsTree()

    return (
        <div className="flex min-h-screen">
            <Sidebar items={tree} />

            <div className="flex-1 flex flex-col">
                <Topbar tree={tree} />

                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}