// /app/docs/page.tsx

import { redirect } from "next/navigation"

export default function DocsIndex() {
    redirect("/docs/getting-started")
    return null;
}