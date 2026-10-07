---
name: ui-modernizer-redesign
description: >-
  Upgrades, refactors, and modernizes cloned legacy websites, old projects, or extracted interfaces.
  Transforms outdated layouts into modern responsive Bento Grids, upgrades typography to modern Google Fonts,
  adds physics-based micro-interactions, implements dark/light theme tokens, and enforces WCAG 2.1 AA accessibility.
  Use whenever the user asks to modernize, redesign, improve, polish, or elevate an existing or cloned website.
---

# UI Modernizer & Legacy Redesign Playbook

Take existing legacy websites, old web projects, or cloned interfaces and upgrade them into cutting-edge, high-craft web applications while preserving their core content and brand identity.

---

## 1. The Modernization Audit Checklist

When receiving an old website or cloned project, perform a systematic 5-point modernization audit:

| Dimension | Legacy Pattern (Replace) | Modern Upgrade (Implement) |
| :--- | :--- | :--- |
| **Layout** | Fixed `width: 960px`, floats, table-based layouts | CSS Grid (`grid-template-columns: repeat(...)`), Flexbox, modern Bento card matrices. |
| **Typography** | Default Times New Roman, Arial, tiny 12px body text | Google Fonts (*Plus Jakarta Sans*, *Outfit*, *Geist*), fluid type (`clamp()`), `16px` base, `text-wrap: balance`. |
| **Depth & Surface**| Harsh solid borders, heavy black drop-shadows | 1px translucent borders (`rgba(255,255,255,0.08)` / `rgba(0,0,0,0.06)`), layered elevation, subtle ambient radial glows. |
| **Interactivity** | Instant 0ms abrupt hover changes, no active feedback | Physics springs (`cubic-bezier(0.16, 1, 0.3, 1)`), button press depression (`scale: 0.98`), smooth card elevation. |
| **Accessibility** | Missing `:focus` states, low contrast gray text, missing alt tags | WCAG 2.1 AA compliant contrast (≥ 4.5:1), visible `:focus-visible` rings, semantic HTML5, zero CLS. |

---

## 2. Step-by-Step Modernization Workflow

### Step 1: Content & Architecture Extraction
- Preserve the authentic content, brand naming, value propositions, navigation structure, and functional workflows from the original site.

### Step 2: Establish the Modern Design Token Foundation
- Introduce CSS custom properties in `tokens.css`:
  - Curated color tokens (canvas, elevated surfaces, subtle borders, accent colors).
  - Modern typography hierarchy with imported Google Fonts.
  - Spacing scale (4px/8px rhythm).
  - Spring transition curves.

### Step 3: Layout Reconstruction (Bento Grid 2.0)
- Transform monotonous horizontal lists into a visual Bento Grid:
  - Feature 1 large hero card with prominent visuals or metrics.
  - Pair with 2-3 compact stat/feature cards.
  - Add interactive filter controls or tabs.

### Step 4: Add Micro-Interactions & Visual Polish
- Add ambient spotlight glow behind key hero elements.
- Implement subtle card hover elevation (`hover:-translate-y-1 hover:shadow-xl`).
- Add accessible `:focus-visible` focus rings to all buttons and links.

### Step 5: Mobile-First Responsive Polish
- Ensure mobile layout collapses seamlessly with touch targets ≥ 44×44px.
- Test across mobile, tablet, and desktop viewports with zero horizontal overflow.
