---
name: web-clone-engineer
description: >-
  Reverse-engineering methodology for downloading, dissecting, and extracting assets, styles, markup, and data
  from live website URLs or legacy project directories. Use when reconstructing an entire web application from a URL,
  harvesting its assets, or analyzing its data models and API endpoints.
---

# Web Clone Engineer: Asset Extraction & Site Reverse-Engineering

A technical playbook for extracting markup, styles, fonts, icons, media, and data structures from existing URLs or archived projects to enable faithful reconstruction.

---

## 1. Asset & Content Extraction Workflow

```
[ Target URL / Project ]
        │
        ├── 1. Fetch & Capture HTML/CSS/DOM (read_url_content / browser_subagent)
        │
        ├── 2. Extract Static Assets:
        │       ├── Vector Icons & Logos (extract inline <svg> & favicon)
        │       ├── Typography & Web Fonts (identify @font-face and font families)
        │       └── Media & Imagery (download/link image URLs)
        │
        ├── 3. Reverse-Engineer Data Models:
        │       ├── JSON-LD scripts / Metadata / SEO headers
        │       ├── Data tables, metric statistics, and list entries
        │       └── Dynamic API request/response shapes
        │
        └── 4. Generate Clean Project Skeleton:
                ├── index.html (semantic markup)
                ├── style.css (tokens, resets, layout)
                └── app.js (state, handlers, interactivity)
```

---

## 2. Real-Source Inspection Rules
- **Anti-Hallucination**: Extract real copy, headings, and data from the URL instead of guessing or replacing them with generic placeholders.
- **SVG Preservation**: When cloning navigation icons, social icons, or logos, capture the real SVG markup directly. SVGs guarantee pixel-sharp rendering at all screen densities.
- **Font Detection**: Inspect `<link rel="stylesheet">` or `@import` declarations to identify the exact Google Fonts or custom font faces used by the target site.

---

## 3. Project Skeleton Generation
When cloning a project from a URL, scaffold the local directory structure cleanly:

```text
cloned-project/
├── index.html        # Clean, semantic reconstructed HTML5
├── styles/
│   ├── tokens.css    # Extracted colors, typography, spacing variables
│   └── main.css      # Component layouts and responsive media queries
├── assets/
│   ├── icons/        # Extracted SVG symbols
│   └── images/       # Extracted or synthesized image assets
└── js/
    └── app.js        # Interactive behaviors, tabs, modals, filter controls
```
