---
name: resilient-web-scraper
description: >-
  Advanced web scraping, content extraction, and data harvesting methodology. Use when extracting structured data,
  tables, statistics, long-form articles, reports, or lists from live websites, HTML dumps, or complex DOMs.
  Enforces clean data normalization, schema validation, and resilient selector strategies.
---

# Resilient Web Scraper: Content & Data Extraction Playbook

A structured methodology for extracting clean, high-fidelity data from public web pages, dashboards, reports, and legacy applications.

---

## 1. Hierarchy of Extraction Strategies

Always use the cleanest, lowest-overhead extraction method available:

```
[ Target URL ]
       │
       ├── Strategy 1: Hidden JSON & API Endpoints (Network Tab / __NEXT_DATA__)
       │   └── Inspect page source for <script id="__NEXT_DATA__">, window.__INITIAL_STATE__,
       │       or direct REST/GraphQL endpoints returning pure JSON.
       │
       ├── Strategy 2: Structured Metadata & JSON-LD
       │   └── Extract <script type="application/ld+json">, OpenGraph tags (<meta property="og:...">),
       │       and microdata before parsing messy presentation HTML.
       │
       ├── Strategy 3: Semantic DOM Extraction
       │   └── Extract semantic elements: <table>, <article>, <dl>, <ol>, <ul> with CSS selectors.
       │
       └── Strategy 4: Fallback Full Document Conversion
           └── Utilize read_url_content or browser_subagent DOM capture for dynamic SPAs.
```

---

## 2. Scraping Specific Data Structures

### A. Data Tables (`<table>`)
Never scrape tables as plain text. Reconstruct them into structured objects:
```javascript
// Browser / Node DOM table parser pattern
const tableData = Array.from(document.querySelectorAll('table tr')).map(row => {
  const cells = Array.from(row.querySelectorAll('th, td'));
  return cells.map(cell => cell.innerText.trim().replace(/\s+/g, ' '));
});
```

### B. Impact Reports & Key Performance Indicators (KPIs)
When scraping reports or statistical dashboards (e.g., humanitarian trackers, financial dashboards):
1. **Locate Metric Callouts**: Target containers with distinct numeric styles:
   - High font-size values (`text-3xl`, `stat-value`, `metric-number`).
   - Accompanying label/category (`stat-title`, `metric-label`).
   - Trend badges (`+14%`, `-5%`, `critical`, `warning`).
2. **Preserve Units**: Never drop numeric multipliers (e.g., `2.1M`, `450k`, `85%`, `$12.4B`). Store both raw string display and parsed numeric value.

### C. Article & Long-Form Text Extraction
- Identify the primary text container: `<main>`, `<article>`, `.post-content`, `.entry-content`.
- **Content Hygiene (Stripping Clutter)**:
  - Remove navigation menus, headers, footers, and sidebars.
  - Remove inline advertisements, promo banners, and cookie prompts.
  - Strip tracking scripts, inline styles, and unneeded attributes (`data-*`, `class`).
  - Preserve heading hierarchy (`h1` -> `h2` -> `h3`), blockquotes, and ordered lists.

---

## 3. Data Normalization & Output Standards
Always normalize scraped datasets into:
- **Clean JSON**: With strictly typed keys (e.g. `metric_name`, `value`, `unit`, `date_reported`, `source_url`).
- **Markdown Tables**: For human review and executive reporting.
- **Sanitized Values**: Trim excess whitespace, standardize dates to ISO 8601 (`YYYY-MM-DD`), and convert currency/percentages cleanly.
