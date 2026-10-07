# How to Reuse All 16 Skills in Any Other Project

All 16 premier UI/UX, Design, Cloning, Browsing, Scraping, Typography, Copywriting, and Coding skills installed in this workspace can be reused across any other project on your system using three simple methods:

---

## Method 1: Instant 1-Click Installer (Recommended)

Two automated scripts are provided right in this workspace:
- [`install-skills-to-other-project.bat`](file:///c:/Users/Public/gaza%20support/install-skills-to-other-project.bat) (Command Prompt / CMD)
- [`install-skills-to-other-project.ps1`](file:///c:/Users/Public/gaza%20support/install-skills-to-other-project.ps1) (PowerShell)

### From Command Prompt (CMD):
```cmd
"c:\Users\Public\gaza support\install-skills-to-other-project.bat" "C:\path\to\your-other-project"
```

### From PowerShell:
```powershell
& "c:\Users\Public\gaza support\install-skills-to-other-project.ps1" -TargetPath "C:\path\to\your-other-project"
```

This immediately copies all 16 skills (`.agents/skills/`), design rules (`.agents/rules/`), and the master [`GEMINI.md`](file:///c:/Users/Public/gaza%20support/GEMINI.md) index into the target project.

---

## Method 2: Zero-Copy Configuration Inheritance (`skills.json`)

Antigravity has native **JSON configuration inheritance**:

1. In your other project, create `.agents/skills.json`:

```json
{
  "inherits": [
    {
      "path": "c:/Users/Public/gaza support/.agents/skills.json"
    }
  ]
}
```

Whenever you open that project in Antigravity, the agent automatically detects `.agents/skills.json`, resolves the inheritance, and activates all 16 skills.

---

## Method 3: Live Windows Directory Junction (Auto-Updating)

If you want a live link where editing a skill in one place automatically updates it in all other projects:

```powershell
& "c:\Users\Public\gaza support\install-skills-to-other-project.ps1" -TargetPath "C:\path\to\your-other-project" -Mode Link
```

---

## The Complete Suite of 16 Skills Included

### 🌐 Agentic Browsing & Web Scraping:
1. `agentic-human-browsing` — Human-like navigation, natural scrolling, cognitive pacing, cookie banner & modal handling.
2. `resilient-web-scraper` — Structured extraction of data tables, KPI metrics, articles, JSON-LD, and clean normalization.

### ✍️ Typography, Writing & Content:
3. `typography-craft-system` — Curated Google Fonts pairings, mathematical type scales, fluid clamp typography, and micro-typography.
4. `strategic-copywriting` — Anti-slop writing, UX microcopy (CTAs, empty states, error alerts), and data-driven impact storytelling.

### 🔄 Website & UI Cloning & Modernization:
5. `clone-ui` — Multi-source URL-to-code cloning, design token extraction, and DOM reconstruction.
6. `web-clone-engineer` — Real-source asset extraction, SVG preservation, data model harvesting, and project scaffolding.
7. `ui-modernizer-redesign` — Transforming legacy/cloned sites into modern Bento Grids, Google Fonts, micro-interactions, and WCAG 2.1 AA accessibility.

### 🎨 Visual & UI/UX Design:
8. `frontend-design` — Creative direction, anti-template philosophy, distinctive typography.
9. `ui-ux-pro-max` — 50+ styles, 192 color palettes, 74 font pairings, 119 UX guidelines.
10. `web-design-guidelines` — Vercel Labs standards for accessibility (WCAG 2.1 AA) and layout stability.
11. `modern-visuals-motion` — Spring physics, micro-interactions, card hover lifts, ambient radial glow.
12. `data-visualization-dashboard` — Bento metric cards, KPI summary tiles, interactive charts.

### 💻 Software Engineering & Coding:
13. `systematic-debugging` — 4-phase root-cause analysis: *"No fixes without root cause investigation first"*.
14. `test-driven-development` — Strict Red-Green-Refactor cycle: *"No production code without failing test"*.
15. `typescript-expert` — Strict type safety, Zod runtime validation, exhaustive pattern matching.
16. `clean-code-refactoring` — SOLID principles, guard clauses, cyclomatic complexity reduction.
