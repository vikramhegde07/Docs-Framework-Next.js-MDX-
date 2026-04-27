# 📘 Docs Framework (Next.js + MDX)

A lightweight, fully customizable documentation framework built with **Next.js App Router + MDX**.

Designed for developers who want **full control** without the complexity of heavy documentation tools.

---

## 🚀 Create a Project

Use the template to bootstrap a new docs app:

```bash
npx create-next-app@latest my-docs --example "https://github.com/your-username/your-repo"
```

This gives you a fully configured documentation system out of the box.

---

## ✨ Features

* ⚡ Built with Next.js (App Router)
* 📝 MDX-powered content
* 🎨 TailwindCSS + theme system
* 📂 File-based routing
* 📁 `_meta.mdx` for structure control
* 🧭 Automatic sidebar generation
* 📑 Breadcrumb navigation
* ⏮️ Previous / Next navigation
* 📌 Table of contents (headings extraction)
* ⚙️ Config-driven architecture
* 🧩 Fully customizable components

---

## 📂 Project Structure

```txt
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
    getting-started.mdx
    guides/
      _meta.mdx
      intro.mdx
```

---

## 🧠 Core Concepts

---

### 📄 MDX-Based Content

All documentation lives inside:

```txt
content/docs/
```

Each `.mdx` file becomes a page.

---

### 📁 `_meta.mdx` (Structure & Control)

Controls how folders and files appear in the sidebar.

#### Example

```mdx
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

#### Capabilities

* Set folder title
* Control ordering
* Override file titles
* Works at any level (including root)

---

### 🧭 Navigation System

Automatically generated from the file structure:

* Sidebar (tree-based)
* Breadcrumbs (context-aware)
* Previous / Next navigation

---

### ⚙️ Configuration

All behavior is controlled via:

```ts
/lib/config.ts
```

#### Example

```ts
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

### 🧩 MDX Components

Supports custom components inside MDX:

```mdx
<Callout type="info">
Important note
</Callout>
```

Fully overrideable via config.

---

### 🎨 Theming

* Light / Dark mode
* System preference support
* TailwindCSS-based styling

---

### 🔌 Extensibility

Override core UI:

```ts
components: {
  Navbar: CustomNavbar,
  Footer: CustomFooter,
}
```

---

## 🛠️ Philosophy

* Simplicity over abstraction
* Full control over structure and UI
* Minimal dependencies
* Developer-first experience

---

## 🤝 Contributing

PRs are welcome. Feel free to open issues or suggest improvements.

---

## 📄 License

MIT
