---
name: data-visualization-dashboard
description: >-
  Specialized skill for designing and building high-impact dashboards, analytics interfaces, KPI summary cards,
  bento report grids, interactive charts, and data storytelling layouts. Use whenever displaying complex data,
  visualizing statistics, summarizing impact reports, or building executive dashboards.
---

# Data Visualization & Dashboard Design Playbook

Design information-rich, visually stunning, and highly legible analytics interfaces and data-driven impact hubs.

---

## 1. Information Hierarchy & Bento Metric Architecture
Structure data displays using an asymmetric **Bento Metric Matrix**:

```
+------------------------------------+--------------------------+
| PRIMARY KPI HERO                   | SECONDARY KPI 1          |
| Key Value: 2.1M Affected           | Value: 85% Displaced     |
| Delta: [+14.2% Critical]           | Trend Sparkline          |
+------------------------------------+--------------------------+
| TERTIARY KPI 2                     | TERTIARY KPI 3          |
| 142 Shelters Operational           | 48 Aid Convoys Received  |
+------------------------------------+--------------------------+
| MAIN INTERACTIVE CHART / BREAKDOWN                            |
| Filter by Sector: [Health] [Water] [Food] [Shelter]          |
| Time Series / Geographic Distribution Matrix                  |
+---------------------------------------------------------------+
```

---

## 2. KPI Metric Card Specifications
Every metric tile should consist of 4 distinct visual layers:

1. **Card Header**: Subtle category label (uppercase, tracking +0.05em, text-muted) paired with a contextual category icon.
2. **Hero Figure**: High-contrast, large numeric display (`2rem`–`2.5rem`, bold, `tabular-nums`).
3. **Trend Badge / Context Pill**: A compact colored status badge:
   - Positive/Favorable: Soft green background (`rgba(16, 185, 129, 0.15)`) with emerald text.
   - Critical/Severe: Soft rose background (`rgba(239, 68, 68, 0.15)`) with crimson text.
   - Neutral/Baseline: Slate pill with subtle gray border.
4. **Context Subtitle**: One brief explanatory line (e.g., *“vs. previous month baseline”* or *“as of September 2026 update”*).

---

## 3. Data Tables & Tabular Ergonomics
- **Number Alignment**: Always right-align numeric columns (`text-right`) and apply `font-variant-numeric: tabular-nums`.
- **Text Alignment**: Left-align string identifiers and descriptions (`text-left`).
- **Sticky Headers**: Freeze table headers (`position: sticky; top: 0; background: var(--bg-surface)`) with a subtle bottom divider.
- **Zebra Striping / Subtle Row Separation**: Use ultra-subtle border separators (`border-b: 1px solid var(--border-subtle)`) rather than heavy alternating row colors.
- **Row Hover State**: Highlight rows softly on hover (`background-color: var(--bg-surface-hover)`) to aid horizontal eye-tracking across wide data sets.

---

## 4. Visual Color Encoding & Accessibility
- Never rely solely on color to communicate state. Always pair color with an icon (e.g. checkmark, alert triangle), badge text, or pattern.
- Choose palette sets with distinct brightness levels so they remain decipherable in monochrome or for color-blind viewers:
  - Severity High: `#ef4444` (Crimson)
  - Warning/Caution: `#f59e0b` (Amber)
  - Stable/Normal: `#10b981` (Emerald)
  - Informational: `#3b82f6` (Sky Blue)
