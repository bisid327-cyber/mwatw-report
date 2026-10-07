# Core UX Guidelines & Heuristics Reference

This document encapsulates the essential UX heuristics, micro-ergonomics, and visual flow principles.

---

## 1. Visual Hierarchy & Scanning
- **The F-Pattern and Z-Pattern**: Users scan high-level text horizontally at the top, drop down the left edge, and make a second shorter horizontal pass. Place high-priority actions, key metrics, and primary headlines along these lines.
- **Heading Scale Ratios**: Maintain consistent type ratios (1.25x Major Third or 1.333x Perfect Fourth):
  - `H1`: 2.5rem – 3.5rem (Bold / Extrabold, tracking -0.02em)
  - `H2`: 1.75rem – 2.25rem (Semibold)
  - `H3`: 1.25rem – 1.5rem (Medium / Semibold)
  - `Body`: 1rem (16px) with 1.5–1.6 line height
  - `Caption / Eyebrow`: 0.75rem – 0.875rem (Uppercase tracking +0.05em or subtle gray)

## 2. Touch Targets & Interaction Areas
- **Minimum Tap Size**: Interactive targets (buttons, links, icon triggers, tabs) must have an active hit target of at least **44×44px**. Even if the visual icon is 18×18px, pad the wrapper to 44px.
- **Spacing**: Keep at least **8px** gap between adjacent interactive controls to prevent accidental mis-taps.
- **Immediate State Feedback**:
  - Hover: Subtle background shift (`brightness(1.05)` or opacity step) + slight scale/shadow lift.
  - Active / Press: Instant depression (`transform: scale(0.98)`).
  - Disabled: Lower opacity (40–50%), `cursor: not-allowed`, and `pointer-events: none` on click actions.

## 3. Forms & Data Input UX
- **Persistent Labels**: Never use placeholders as the sole label. Placeholders disappear when the user types, destroying user memory.
- **Inline Error Feedback**: Display errors directly adjacent to the input field, never grouped in a distant toast or hidden in console.
- **Button States during Submission**:
  - Keep the submit button disabled once clicked to prevent double-submissions.
  - Render an inline spinner while maintaining the button's physical dimensions (no jarring width collapse).
- **Sensible Defaults**: Pre-select common options and format numeric inputs with relevant grouping.

## 4. Navigation & Layout Ergonomics
- **Sticky Headers with Blur**: Fixed or sticky navigation bars should use a translucent backdrop filter (`backdrop-filter: blur(12px); background: rgba(...)`) so content remains slightly visible as it passes beneath.
- **Breadcrumbs for Deep Trees**: Any interface deeper than two levels requires breadcrumb navigation.
- **Modal & Drawer Overlays**:
  - Close on `Escape` key.
  - Close on backdrop click.
  - Lock background scroll (`overflow: hidden` on body) when open.
  - Focus trap inside the active modal.

## 5. Information Density & Scannability
- **Tabular Data**: Always right-align numbers and currency; left-align text labels; center status tags.
- **Data Callout Cards**: State the metric clearly, show the primary number in bold, and pair it with a contextual comparison badge (e.g., `+12% vs last month` or `74% of target`).
