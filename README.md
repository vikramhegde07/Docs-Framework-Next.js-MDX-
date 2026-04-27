# 📘 Docs Framework (Next.js + MDX)

A lightweight, fully customizable documentation framework built with **Next.js App Router + MDX**.

Designed for developers who want **full control** without the complexity of heavy documentation tools.

---

## ✨ Features

* ⚡ Built with Next.js (App Router)
* 📝 MDX-powered content
* 🎨 TailwindCSS + theme system (light/dark)
* 📂 File-based routing with `_meta.mdx` support
* 🧭 Automatic sidebar generation
* 📑 Breadcrumb navigation
* ⏮️ Previous / Next navigation
* 📌 Table of contents (headings extraction)
* 🧩 Fully customizable components
* ⚙️ Config-driven architecture
* 📦 Zero vendor lock-in

---

## 🚀 Quick Start

### 1. Create a Next.js App

```bash id="z1s9qn"
npx create-next-app@latest my-docs
cd my-docs
```

---

### 2. Install Dependencies

```bash id="t5c9nl"
npm install @mdx-js/react @next/mdx next-mdx-remote gray-matter rehype-pretty-code remark-gfm shiki lucide-react clsx next-themes hast-util-to-string
```

---

### 3. Setup MDX

Configure `next.config.js`:

```js id="y2s4kp"
import createMDX from "@next/mdx"

const withMDX = createMDX()

export default withMDX({
  pageExtensions: ["ts", "tsx", "mdx"],
})
```

---

### 4. Add Content

```txt id="f0m3sd"
content/docs/
  getting-started.mdx
  guides/
    _meta.mdx
    intro.mdx
```

---

### 5. Run

```bash id="9p3rxt"
npm run dev
```

---

## 📂 Project Structure

```txt id="m2s8rf"
app/
  docs/
    [...slug]/page.tsx
components/
  docs/
  mdx-components/
lib/
  docs.ts
  mdx.ts
  navigation.ts
  breadcrumb.ts
content/
  docs/
```

---

## ⚙️ Configuration

All behavior is controlled via:

```ts id="v8k2qw"
/lib/config.ts
```

---

### Example

```ts id="x4p9zn"
export const docsConfig = {
  home: ["getting-started"],

  docs: {
    contentDir: "content/docs",
    basePath: "/docs",

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

## 📁 `_meta.mdx` (Structure & Control)

Use `_meta.mdx` to control how folders and files appear in the sidebar.

---

### 📦 Basic (Folder Title + Order)

```mdx id="h3l8rf"
---
title: Guides
order: 2
---
```

---

### 🔢 Manual Ordering (Array)

```mdx id="n7k1vz"
---
items:
  - intro
  - setup
---
```

---

### ✏️ Override File Titles (Object)

```mdx id="b6r2pt"
---
items:
  getting-started:
    title: Getting Started
  api:
    title: API Reference
---
```

---

### 🔥 Full Control (Recommended)

```mdx id="p9x4jw"
---
title: Guides
order: 2
items:
  intro:
    title: Introduction
  setup:
    title: Setup Guide
---
```

---

### 🧠 Notes

* `items` supports both **array** and **object** formats
* Array → controls **order only**
* Object → controls **order + overrides (like title)**
* Works at **any folder level**, including root (`content/docs`)
* Unlisted items are automatically appended

---

## 🧩 MDX Components

Supports custom components:

```mdx id="r3k7vc"
<Callout type="info">
Important note
</Callout>
```

Override via config:

```ts id="c5n8sy"
components: {
  mdx: {
    h1: CustomH1
  }
}
```

---

## 🎨 Theming

* Light / Dark mode via `next-themes`
* TailwindCSS + modern color system
* Fully customizable

---

## 🔌 Extensibility

You can override:

* Navbar
* Footer
* MDX components

```ts id="d7p2mk"
components: {
  Navbar: CustomNavbar,
  Footer: CustomFooter
}
```

---

## 🧭 Navigation System

* Auto-generated sidebar from file structure
* Manual ordering via `_meta.mdx`
* Breadcrumbs
* Prev / Next navigation

---

## 📌 Code Blocks

* Syntax highlighting via `shiki`
* Copy button support
* Filename support via MDX meta

````mdx id="k2r8qp"
```ts filename="example.ts"
console.log("Hello")
```
````

---

## 🛠️ Philosophy

This framework focuses on:

* Simplicity over abstraction
* Full control over black-box tools
* Minimal dependencies
* Developer-first experience

---

## 🤝 Contributing

PRs are welcome. Feel free to open issues or suggest improvements.

---

## 📄 License

MIT
