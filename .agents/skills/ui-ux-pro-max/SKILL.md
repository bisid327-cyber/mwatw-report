---
name: ui-ux-pro-max
description: >-
  Comprehensive UI/UX design intelligence database containing 50+ modern design styles (Bento Grid, Linear Dark,
  Modern Aero Glassmorphism, Neo-Brutalism, Minimal Luxury), 192 color palettes, 74 font pairings, and 119 UX guidelines.
  Use when selecting design systems, choosing color tokens, structuring layouts, creating components, or planning user interactions.
---

# UI/UX Pro Max: Design Intelligence & System Playbook

A structured knowledge base for making rapid, intentional, and high-quality UI/UX design decisions across web and mobile.

## Priority Checklist

| Priority | Category | Key Checks | Anti-Patterns to Avoid |
| :--- | :--- | :--- | :--- |
| **1** | **Accessibility (CRITICAL)** | Contrast ratio ≥ 4.5:1, `aria-label` on icon buttons, keyboard focus rings (`:focus-visible`), alt text on media. | Removing focus outlines, unlabelled icon triggers, low contrast gray-on-gray. |
| **2** | **Touch & Interaction** | Minimum 44×44px hit targets, 8px+ spacing between touch items, instant visual response on tap/click. | Hover-only critical features, zero-millisecond dead clicks. |
| **3** | **Layout & Responsiveness** | Fluid fluid grids (`clamp()`), mobile-first breakpoints, zero horizontal scrolling (`overflow-x: hidden`). | Fixed pixel container widths, horizontal overflow on mobile screens. |
| **4** | **Typography & Hierarchy** | Base 16px font size, 1.5 line height for body, clear scale ratios, `tabular-nums` for data comparisons. | Text < 12px for body, erratic font switching (> 2 font families). |
| **5** | **Color & Tokens** | Semantic design tokens (`--bg-primary`, `--surface-elevated`, `--accent-primary`), 60-30-10 color balance. | Hardcoding raw hex values directly in component CSS. |
| **6** | **Motion & Feedback** | Springs (`cubic-bezier(0.16, 1, 0.3, 1)`), user-triggered transitions, `@media (prefers-reduced-motion)`. | 1-second long sluggish transitions, unskippable intro animations. |

---

## The 5 Premier Modern Design Archetypes

### 1. Bento Grid 2.0 (Modern Modular Layout)
- **Visual Pattern**: Asymmetric grid of self-contained rounded cards (`rounded-2xl` / `16px`).
- **Surface**: Subtle borders (`border: 1px solid rgba(255, 255, 255, 0.08)` or `rgba(0, 0, 0, 0.06)`), soft ambient shadows.
- **Card Hierarchy**: 1 primary large hero card (spanning 2 columns or 2 rows), 2-3 standard stat cards, 1 interactive widget card.
- **Micro-Detail**: Internal padding `p-6` or `p-8`, clear card header with tiny uppercase eyebrow or icon pill.

### 2. Linear / Dark High-Craft
- **Visual Pattern**: Deep obsidian canvas (`#08090a` to `#0d1117`), razor-sharp 1px dividers.
- **Accent**: Precise glowing accents (electric violet `#6366f1`, emerald `#10b981`, or cyan `#06b6d4`) with subtle radial backdrops.
- **Controls**: Micro keyboard shortcut badges (`<kbd>⌘K</kbd>`), segmented switchers, status indicator dots with ping animations.

### 3. Modern Aero / Glassmorphism 2.0
- **Visual Pattern**: Translucent frosted panels over rich backgrounds.
- **CSS Recipe**:
  ```css
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  ```
- **Depth**: Double border effect using `box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)`.

### 4. Minimal Luxury / Modern Editorial
- **Visual Pattern**: Expansive whitespace/negative space, high-contrast serif headlines with modern geometric body type.
- **Palette**: Warm slate, warm bone (`#F7F7F5`), charcoal (`#1A1A1A`), with rich bronze or hunter green accents.
- **Imagery**: Edge-to-edge photography, refined caption typography with subtle dividers.

### 5. Neo-Brutalism Modern
- **Visual Pattern**: High contrast, bold 2px-3px solid black borders, hard drop shadows without blur (`box-shadow: 4px 4px 0px #000`).
- **Color**: Vibrant saturated pastels (lemon yellow, lilac, mint, coral) on stark white or cream surfaces.

---

## Detailed References
- For detailed color palette specifications and font pairings, refer to [styles-and-palettes.md](file:///c:/Users/Public/gaza%20support/.agents/skills/ui-ux-pro-max/references/styles-and-palettes.md).
- For the full 119 UX guideline rulebook, refer to [ux-guidelines.md](file:///c:/Users/Public/gaza%20support/.agents/skills/ui-ux-pro-max/references/ux-guidelines.md).
