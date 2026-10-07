# Modern Styles, Color Palettes & Typography Pairings Reference

This reference catalog provides pre-formulated palettes, typography pairings, and design token architectures.

---

## 1. Curated Color Palettes by Mood & Industry

### A. High-Craft Dark (Linear / Raycast Style)
- `--bg-canvas`: `#0a0b0e` (Deepest Charcoal Obsidian)
- `--bg-surface`: `#12141a` (Elevated Card Base)
- `--bg-surface-hover`: `#1a1d26`
- `--border-subtle`: `rgba(255, 255, 255, 0.08)`
- `--border-active`: `rgba(255, 255, 255, 0.20)`
- `--text-primary`: `#f3f4f6`
- `--text-secondary`: `#9ca3af`
- `--text-muted`: `#6b7280`
- `--accent-primary`: `#6366f1` (Electric Indigo)
- `--accent-glow`: `rgba(99, 102, 241, 0.15)`
- `--status-success`: `#10b981` (Emerald)
- `--status-warning`: `#f59e0b` (Amber)
- `--status-danger`: `#ef4444` (Rose)

### B. Clean Editorial & Humanitarian (Authority, Clarity, Trust)
- `--bg-canvas`: `#f8fafc` (Ultra-light Slate)
- `--bg-surface`: `#ffffff` (Pure White Card)
- `--border-subtle`: `#e2e8f0` (Crisp Border)
- `--text-primary`: `#0f172a` (Deep Slate Navy)
- `--text-secondary`: `#475569`
- `--text-muted`: `#94a3b8`
- `--accent-primary`: `#0284c7` (Humanitarian Sky Blue) or `#dc2626` (Urgent Crimson)
- `--accent-secondary`: `#0d9488` (Teal Calming)
- `--highlight-bg`: `#f0fdf4`

### C. Emerald Precision (Fintech, Health & Environmental Metrics)
- `--bg-canvas`: `#05100c` (Very Deep Forest Midnight)
- `--bg-surface`: `#0b1d16` (Deep Emerald Tint Surface)
- `--border-subtle`: `rgba(16, 185, 129, 0.15)`
- `--text-primary`: `#ecfdf5`
- `--text-secondary`: `#a7f3d0`
- `--accent-primary`: `#10b981` (Vibrant Mint Emerald)
- `--accent-glow`: `rgba(16, 185, 129, 0.25)`

### D. Modern Warm Minimalist (Calm, Reflective, Thoughtful)
- `--bg-canvas`: `#faf8f5` (Warm Cream White)
- `--bg-surface`: `#ffffff`
- `--border-subtle`: `#e8e4df`
- `--text-primary`: `#1c1917` (Deep Warm Charcoal)
- `--text-secondary`: `#57534e`
- `--accent-primary`: `#ea580c` (Earthy Rust Ochre)

---

## 2. High-Impact Typography Pairings

| Aesthetic | Heading Typeface | Body Typeface | Best Use Case |
| :--- | :--- | :--- | :--- |
| **Modern High-Craft** | *Cabinet Grotesk* or *Space Grotesk* | *Inter* or *Geist Sans* | SaaS, Developer Tools, Dashboards |
| **Editorial & Impact** | *Fraunces* or *Instrument Serif* | *Plus Jakarta Sans* | Humanitarian Reports, Storytelling, Journalism |
| **Clean Tech & Corporate**| *Outfit* or *Satoshi* | *Public Sans* or *System UI* | Product Landings, Portals, Analytics |
| **Data & Metrics** | *Syne* or *Clash Display* | *Geist Mono* (Numbers) + *Inter* | KPI Dashboards, Financial Stats, Impact Trackers |

---

## 3. Standard Design Token Scale

```css
:root {
  /* Spacing Scale (4px base) */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */

  /* Border Radii */
  --radius-sm: 0.375rem; /* 6px */
  --radius-md: 0.5rem;   /* 8px */
  --radius-lg: 0.75rem;  /* 12px */
  --radius-xl: 1rem;     /* 16px */
  --radius-2xl: 1.5rem;  /* 24px */
  --radius-full: 9999px;

  /* Elevation Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-glow: 0 0 25px -5px var(--accent-glow);
}
```
