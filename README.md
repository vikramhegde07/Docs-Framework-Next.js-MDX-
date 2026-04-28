# 📘 Docs Framework (Next.js + MDX)

A lightweight, extensible documentation framework built with **Next.js App Router + MDX**.

Designed for developers who want **full control over content, structure, and UI** — without the complexity of heavy documentation tools.

---

## 🚀 Create a Project

Bootstrap a new docs app using the template:

```bash
npx create-next-app@latest my-docs --example "https://github.com/vikramhegde07/Docs-Framework-Next.js-MDX-"
```

You’ll get a fully configured documentation system out of the box.

---

## ✨ Features

* ⚡ Built with Next.js (App Router)
* 📝 MDX-powered documentation
* 📂 File-based routing
* 🧠 Config-driven architecture
* 📁 `_meta.mdx` for structure control
* 🧭 Auto-generated sidebar & breadcrumbs
* ⏮️ Previous / Next navigation
* 📄 Folder-based navigation (explorer UI)
* 🔌 Pluggable content sources (Local / GitHub)
* 🎨 TailwindCSS + Theme system
* 🧩 Fully customizable components
* ⚡ Static export compatible

---

## 📂 Project Structure

```txt
app/
  docs/
    [...slug]/page.tsx

components/
  docs/
  mdx-components/
  layout/

lib/
  docs.ts
  mdx.ts
  navigation.ts
  breadcrumb.ts
  source/

content/
  docs/
    introduction.mdx
    getting-started.mdx
    _meta.mdx
```

---

## 🧠 Core Concepts

---

### 📄 MDX-Based Content

All documentation lives inside:

```txt
content/docs/
```

Each `.mdx` file becomes a page automatically.

---

### 📁 Folder-Based Docs (New)

Folders are **first-class citizens**.

* If a folder has `index.mdx` → rendered as a page
* Otherwise → rendered as a **Folder View (cards UI)**

```txt
guides/
  intro.mdx
  advanced/
    auth.mdx
```

---

### 📁 `_meta.mdx` (Structure & Control)

Controls sidebar structure, ordering, and labels.

```mdx
---
title: Guides
order: 2
items:
  intro:
    title: Introduction
  advanced:
    title: Advanced
---
```

#### Supports:

* Title override
* Ordering
* Nested structure control
* Works at any level

---

### 🧭 Navigation System

Automatically generated from your content:

* Sidebar (tree-based)
* Breadcrumbs (context-aware)
* Previous / Next navigation

---

### 🔌 Content Sources (🔥 Core Feature)

Docs Framework supports multiple sources:

#### 1. Local (default)

```ts
source: {
  type: "local",
  local: {
    contentDir: "content/docs"
  }
}
```

#### 2. GitHub (remote)

```ts
source: {
  type: "github",
  github: {
    owner: "your-username",
    repo: "your-repo",
    branch: "main",
    docsPath: "docs",
    token: process.env.GITHUB_TOKEN
  }
}
```

👉 Enables:

* Remote documentation
* Headless CMS-like behavior
* No redeploy for content changes

---

### ⚙️ Configuration

All behavior is controlled via:

```ts
/lib/config.ts
```

#### Example

```ts
export const docsConfig = {
  layout: {
    navbar: true,
    footer: true,
  },

  docs: {
    source: {
      type: "local"
    },

    basePath: "/docs",

    home: ["introduction"],
    defaultSlug: ["getting-started"],

    breadcrumb: {
      enabled: true,
      showRoot: true,
      rootLabel: "Docs",
    },

    sidebar: {
      showEmptyFolders: false,
    },
  },

  theme: {
    defaultTheme: "system",
    enableSystem: true,
  },
}
```

---

### 🧩 MDX Components

Use rich components inside MDX:

```mdx
<Callout type="info">
This is an info message
</Callout>

<Tabs>
  <Tab title="JavaScript">
    console.log("Hello")
  </Tab>
</Tabs>
```

Also supports:

* Custom `<Image />`
* Code blocks with filename + copy button
* Tables, blockquotes, lists

---

### 🎨 Theming

* Light / Dark / System themes
* TailwindCSS powered
* Fully customizable UI

---

### 🧱 Layout System

Configurable layout:

* Navbar
* Sidebar
* Topbar (breadcrumbs)
* Footer

Override easily:

```ts
components: {
  Navbar: CustomNavbar,
  Footer: CustomFooter,
}
```

---

### ⚡ Static Export

Fully compatible with static export:

```bash
npm run build
```

Works with both:

* Local content
* GitHub content (with caching)

---

## 🧪 Example Docs Structure

```txt
content/docs/
├── introduction.mdx
├── getting-started.mdx
├── guides/
│   ├── _meta.mdx
│   ├── intro.mdx
│   └── advanced/
│       └── auth.mdx
```

---

## 🛠️ Philosophy

* Simplicity over abstraction
* Structure over magic
* Config over hardcoding
* Developer-first experience

---

## 🤝 Contributing

PRs are welcome.

If you find issues or have ideas:

* Open an issue
* Submit a pull request

---

## 📄 License

MIT