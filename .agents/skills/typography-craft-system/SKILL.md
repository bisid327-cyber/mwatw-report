---
name: typography-craft-system
description: >-
  Premier typography design, font pairing intelligence, and typographic layout craft.
  Use when selecting web fonts, configuring Google Fonts, setting mathematical type scales, implementing fluid typography (clamp),
  or ensuring world-class legibility and aesthetic character across web interfaces.
---

# Typography Craft System: Font Selection & Typographic Architecture

Typography is the foundation of digital product personality and readability. This playbook provides curated font pairings, mathematical scales, and modern CSS techniques to create world-class editorial and UI typography.

---

## 1. Curated Premier Font Pairings by Aesthetic Tone

### A. Modern High-Craft SaaS & Technology
- **Display / Headings**: *Cabinet Grotesk* or *Space Grotesk* (Sharp, geometric, forward-looking).
- **Body / Interface**: *Inter* or *Geist Sans* (Neutral, ultra-legible at small sizes).
- **Numbers / Metrics**: *Geist Mono* or *JetBrains Mono* (Tabular figures, aligned stats).
- **Google Fonts Import**:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  ```

### B. Editorial, Humanitarian & High-Trust Storytelling
- **Display / Headings**: *Fraunces* or *Instrument Serif* (Warm, authoritative, organic, editorial).
- **Body / Interface**: *Plus Jakarta Sans* or *Public Sans* (Friendly, crisp, effortless readability).
- **Google Fonts Import**:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  ```

### C. Clean Neo-Grotesque & Contemporary Web
- **Display / Headings**: *Outfit* or *Satoshi* (Balanced, geometric sans).
- **Body / Interface**: *Outfit* (Single family hierarchy: weights 400, 500, 600, 700).

### D. Data-Dense Dashboards & Technical Interfaces
- **Display / Headings**: *Syne* or *Clash Display* (Distinctive, punchy).
- **Body & Tabular Data**: *IBM Plex Sans* + *IBM Plex Mono*.

---

## 2. Mathematical Typographic Scale (CSS Token Blueprint)

Adopt a consistent geometric scale (Major Third ratio `1.250` or Perfect Fourth `1.333`):

```css
:root {
  /* Font Family Stacks */
  --font-display: 'Fraunces', Georgia, serif;
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', Consolas, monospace;

  /* Fluid Responsive Type Scale (clamp: min, preferred, max) */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem);  /* 12px - 13px */
  --text-sm: clamp(0.875rem, 0.82rem + 0.25vw, 0.9375rem); /* 14px - 15px */
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.0625rem);    /* 16px - 17px */
  --text-lg: clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem);   /* 18px - 20px */
  --text-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);      /* 20px - 24px */
  --text-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem);   /* 24px - 30px */
  --text-3xl: clamp(1.875rem, 1.65rem + 1.1vw, 2.375rem);  /* 30px - 38px */
  --text-4xl: clamp(2.25rem, 1.95rem + 1.5vw, 3.125rem);   /* 36px - 50px */
  --text-hero: clamp(2.75rem, 2.2rem + 2.5vw, 4.25rem);    /* 44px - 68px */

  /* Line Heights */
  --leading-tight: 1.15;   /* Headings */
  --leading-snug: 1.3;    /* Subheadings, Card Titles */
  --leading-normal: 1.55; /* Body copy */
  --leading-relaxed: 1.7; /* Long-form editorial */

  /* Letter Spacing (Tracking) */
  --tracking-tighter: -0.03em; /* Hero headings */
  --tracking-tight: -0.015em;  /* Section headings */
  --tracking-normal: 0em;      /* Body */
  --tracking-wide: 0.05em;     /* Eyebrows / Uppercase badges */
}
```

---

## 3. Micro-Typographic Rules for Production

1. **Line Length & Measure**:
   - Never allow body copy to exceed `75ch` (characters). Use `max-width: 65ch` for maximum reading comfort.
2. **Heading Balance**:
   - Always apply `text-wrap: balance` to `h1`, `h2`, and `h3` to eliminate awkward single-word orphans.
   - Apply `text-wrap: pretty` to lead paragraphs.
3. **Data Alignment with Tabular Numbers**:
   - Always apply `font-variant-numeric: tabular-nums` to stats, KPI counters, and table columns.
4. **Font Loading Performance**:
   - Always use `font-display: swap` to prevent Flash of Invisible Text (FOIT).
   - Add `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`.
