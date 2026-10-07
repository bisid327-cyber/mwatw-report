---
name: agentic-human-browsing
description: >-
  Human-like agentic web browsing and interaction methodology. Use when navigating websites, interacting with
  dynamic web applications, clicking, typing, scrolling, handling modals/cookie banners, or bypassing bot-like
  interaction patterns. Pairs directly with browser_subagent and headless automation tools.
---

# Agentic Human Browsing: Human-Like Web Navigation & Interaction Playbook

Guide AI agents to browse, navigate, and interact with web pages using natural human heuristics, realistic pacing, and adaptive problem-solving.

---

## 1. Core Principles of Human-Like Browsing

### A. Non-Linear Pacing & Cognitive Pauses
- **Avoid Instantaneous Bursts**: Automated scripts trigger anti-bot systems by firing actions at 0ms intervals. 
- Introduce brief, realistic cognitive delays between perception and action:
  - Reading a headline / hero section: `800ms - 1500ms`.
  - Reviewing a dropdown before selection: `400ms - 700ms`.
  - Keystroke variation: Inter-keystroke intervals between `45ms - 120ms` with occasional natural pauses.

### B. Natural Scroll Dynamics
- Humans never scroll instantly to the bottom of the page (`window.scrollTo(0, 99999)`).
- **Chunked Variable Scrolling**:
  - Scroll in increments of `300px - 600px`.
  - Pause briefly after each scroll tick to let dynamic content, infinite scroll feeds, and lazy-loaded images hydrate.
  - Implement smooth behavior: `window.scrollBy({ top: 400, behavior: 'smooth' })`.

### C. Viewport & Context Realism
- Always initialize viewports to realistic desktop or mobile resolutions:
  - Standard Desktop: `1440 × 900` or `1920 × 1080` (device scale factor: `1` or `2`).
  - Mobile Device: `390 × 844` (iPhone 14/15) or `412 × 915` (Pixel 7/8).
- Ensure realistic user agent strings that match the underlying browser engine.

---

## 2. Navigating Real-World Web Obstacles

### A. Dismissing Overlays & Cookie Banners
Before attempting to interact with main content, audit and clear obstruction layers:
1. **Consent Banners**: Search for buttons with text `Accept`, `Agree`, `Accept All`, `Allow All`, or `I Agree`. If not present, look for `Reject All` or close icons (`aria-label="Close"`).
2. **Promotional Modals / Newsletter Popups**:
   - Check for top-right close buttons (`.close`, `[aria-label="Close"]`, `svg[data-icon="x"]`).
   - Trigger the `Escape` key (`press_key: "Escape"`).
   - If trapped, click outside the modal boundary onto the translucent backdrop (`.modal-backdrop`, `.overlay`).

### B. Dynamic Content & Hydration Verification
- Modern SPAs (React, Vue, Next.js) often render blank loading skeletons before populating real DOM elements.
- **Do not read DOM immediately after navigation**.
- Wait for specific content anchors:
  - Headings (`<h1>`, `<h2>`), main feed containers (`main`, `article`, `[role="feed"]`), or table rows.
  - Verify that skeleton loading classes (`.animate-pulse`, `.skeleton`, `[aria-busy="true"]`) have disappeared.

### C. Handling Infinite Scroll & Pagination
- To scrape or explore continuous feeds:
  1. Scroll down by 500px.
  2. Wait 500ms for network requests to settle.
  3. Verify whether new DOM nodes have attached (`document.querySelectorAll('article').length > previousCount`).
  4. If count stopped increasing after 3 consecutive scrolls, the bottom has been reached.

---

## 3. Integration with Antigravity Browser Subagent

When invoking `browser_subagent`:
- Specify explicit start states, explicit targets, and stopping conditions.
- Instruct the subagent to take a visual screenshot or read DOM only after ensuring the page is fully settled.
