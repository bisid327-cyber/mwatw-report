---
name: web-design-guidelines
description: >-
  Audits and enforces Vercel Web Interface Guidelines across UI code. Covers accessibility (WCAG 2.1 AA/AAA),
  keyboard navigation, :focus-visible rings, layout shift prevention (CLS < 0.1), semantic HTML, form ergonomics,
  and typographic standards. Use when reviewing code, checking compliance, or implementing accessible components.
---

# Web Design Guidelines: Vercel Labs Interface Standards & Audit

Use this skill when designing, building, or auditing frontend interfaces to guarantee production rigor, accessibility compliance, and flawless visual performance.

---

## 1. Accessibility (WCAG 2.1 AA / AAA Compliance)
- **Interactive Semantics**:
  - Use `<button>` for actions and triggers; use `<a>` or `<Link>` for navigation. Never `<div onClick>`.
  - Icon-only buttons must have an explicit `aria-label` (e.g., `<button aria-label="Close modal">`).
  - Decorative icons or illustrations must have `aria-hidden="true"`.
- **Keyboard Navigation**:
  - All interactive elements must be focusable via `Tab` key.
  - Custom dropdowns, dialogs, and tabs must support arrow keys, `Enter`, `Space`, and `Escape`.
- **Media & Images**:
  - All meaningful images must have descriptive `alt` attributes. Decorative images must have `alt=""`.
- **Live Regions**:
  - Asynchronous notifications, toast messages, and dynamic search count updates must declare `aria-live="polite"`.

---

## 2. Focus States & Visual Indicators
- **Visible Focus**:
  - Interactive elements must possess clear, high-contrast focus rings:
    ```css
    :focus-visible {
      outline: 2px solid var(--accent-primary, #6366f1);
      outline-offset: 2px;
    }
    ```
  - **Never apply `outline: none` or `outline: 0`** without an explicit, visible `:focus-visible` replacement.
  - Prefer `:focus-visible` over `:focus` to avoid showing ring outlines on standard mouse clicks.
  - Use `:focus-within` on input container groups to highlight active search bars or compound fields.

---

## 3. Typography & Punctuation Polish
- **Punctuation Characters**:
  - Use genuine ellipsis `…` (`&hellip;`), never three consecutive periods `...`.
  - Use typographical curly quotes `“` `”` and `‘` `’`, never straight quotes `"` in display text.
  - Use non-breaking spaces before units: `12&nbsp;GB`, `95&nbsp;%`, `⌘&nbsp;K`.
- **Widow Prevention**:
  - Apply `text-wrap: balance` on all primary headers (`h1`, `h2`, `h3`).
  - Apply `text-wrap: pretty` on body paragraphs.
- **Tabular Data**:
  - Apply `font-variant-numeric: tabular-nums` to ensure numeric characters align vertically across columns and counters.

---

## 4. Performance & Core Web Vitals (CLS & LCP)
- **Cumulative Layout Shift (CLS < 0.1)**:
  - Every `<img>`, `<video>`, and canvas must declare explicit `width` and `height` or an explicit CSS `aspect-ratio` to reserve layout space prior to asset load.
  - Dynamic content cards (e.g. skeleton loaders) must match the rendered dimensions of final content.
- **Loading Priorities**:
  - Above-the-fold critical hero images: `fetchpriority="high"`.
  - Below-the-fold images: `loading="lazy"`.

---

## 5. Form Usability
- **Inputs**:
  - Always pair inputs with `<label htmlFor="...">` or wrap them in `<label>`.
  - Specify accurate `type` attributes (`email`, `tel`, `url`, `number`, `search`) and appropriate `inputmode`.
  - Never disable copy/paste functionality on input fields.
  - Disable browser spellcheck on tokens, usernames, and codes (`spellcheck="false"`).
  - Position validation errors directly inline below the offending field.
