---
description: Universal design and styling standards for all web interfaces and frontend code in this workspace.
globs: "**/*.{html,css,js,jsx,ts,tsx,vue,svelte}"
always_on: true
---

# Workspace Modern Design & UI Standards

Whenever writing, editing, or generating frontend code (HTML, CSS, JavaScript/TypeScript), enforce the following studio-grade visual standards:

1. **Aesthetic Excellence & Visual Polish**:
   - Never generate plain, default HTML/CSS. Every interface must feature rich visual hierarchy, modern depth, curated typography, and harmonious palettes.
   - Use subtle 1px translucent borders (`rgba(255, 255, 255, 0.08)` or `rgba(0, 0, 0, 0.06)`), refined card elevations, and ambient glows where appropriate.

2. **Typography**:
   - Use Google Fonts (e.g. *Plus Jakarta Sans*, *Outfit*, *Inter*, *Fraunces*, *Geist*) instead of browser system defaults.
   - Apply `text-wrap: balance` to major headlines.
   - Keep body copy line lengths within 65–75 characters.
   - Use `tabular-nums` for statistics, tables, and numeric data.

3. **Accessibility & Usability**:
   - Ensure all interactive elements have visible `:focus-visible` rings.
   - Always supply `aria-label` on icon-only buttons.
   - Maintain minimum 44×44px hit targets on interactive controls.
   - Maintain a minimum contrast ratio of 4.5:1 for body copy against its background.

4. **Responsive Layouts**:
   - Design mobile-first using fluid grids (`grid-template-columns: repeat(auto-fit, minmax(...))`) and flexbox.
   - Strictly prevent horizontal page scrolling (`overflow-x: hidden` on viewport roots).

5. **Motion**:
   - Use physics-informed spring timing functions (`cubic-bezier(0.16, 1, 0.3, 1)`).
   - Honor `@media (prefers-reduced-motion: reduce)` across all animated properties.
