---
title: "Getting Started with File Attachments"
linkedContent: "file-attachments-guide"

description: "A practical guide on how to use file attachments in blog posts, with downloadable templates and examples."
keywords: "file attachments, blog features, download, templates, documents, PDF, spreadsheet"

author: "Changmin Cho"
pubDate: 2026-03-17
isDraft: false

image: "@blogImages/image-2.png"
imageAlt: "Illustration of file management"

attachments:
  - name: "Project Proposal Template"
    file: "/attachments/project-proposal-template.pdf"
    size: "120 KB"
  - name: "Budget Planning Spreadsheet"
    file: "/attachments/budget-planning.xlsx"
    size: "85 KB"
  - name: "Meeting Notes Template"
    file: "/attachments/meeting-notes-template.docx"
    size: "42 KB"
---

## Why File Attachments Matter

Blog posts are a great way to share knowledge, but sometimes words alone aren't enough. Attaching downloadable files lets you provide **templates**, **spreadsheets**, **reports**, and other resources directly to your readers.

### How It Works

Adding attachments to a blog post is straightforward. Simply include an `attachments` array in your post's frontmatter:

```yaml
attachments:
  - name: "My Document"
    file: "/attachments/my-document.pdf"
    size: "120 KB"
```

Each attachment requires:

- **name** — A human-readable label for the file
- **file** — The path to the file (stored in `public/attachments/`)
- **size** — *(optional)* File size displayed to the reader

### Supported File Types

The attachment component automatically detects file types and displays a color-coded badge:

| Extension | Type | Badge Color |
|-----------|------|-------------|
| `.pdf` | PDF | Red |
| `.docx` | DOCX | Blue |
| `.xlsx` | XLSX | Green |
| `.pptx` | PPTX | Orange |
| `.csv` | CSV | Green |
| `.txt` | TXT | Gray |
| `.zip` | ZIP | Yellow |

### Try It Out

Scroll down to see the attachments section below this post. You can download the sample files to see how the feature works in practice.

> Tip: Place your files in the `public/attachments/` directory so Astro serves them as static assets.
