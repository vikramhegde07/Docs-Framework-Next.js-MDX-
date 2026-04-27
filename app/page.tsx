import { docsConfig } from "@/lib/config"
import { getDocBySlug } from "@/lib/mdx"

export default async function Home() {
  const { content, metadata } = await getDocBySlug(docsConfig.home)

  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">
        {metadata.title}
      </h1>

      <article className="prose dark:prose-invert">
        {content}
      </article>
    </main>
  )
}