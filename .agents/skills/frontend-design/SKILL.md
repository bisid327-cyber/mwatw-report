---
name: frontend-design
description: >-
  Guidance for distinctive, intentional visual design when building new web interfaces, pages, or components.
  Helps with aesthetic creative direction, typography hierarchies, layout composition, and avoiding generic
  templated defaults or AI slop. Use whenever the user asks to build, redesign, or style a frontend interface.
---

# Frontend Design: Creative Direction & Anti-Template Playbook

Approach every web design as the design lead at a world-class studio. Every product and interface must have a distinct visual identity tailored specifically to its subject matter, tone, and audience.

## 1. Ground Designs in the Subject Matter
- Before writing CSS or layout code, establish the product's character, domain, audience, and functional job.
- A humanitarian impact hub, a financial analytics tool, an editorial publication, and a creative agency portfolio each demand fundamentally distinct aesthetics, type scales, and color weights.
- Always design with real, domain-accurate content rather than generic lorem ipsum.

## 2. Reject Generic AI Defaults ("Anti-Slop" Principles)
Avoid the typical tropes that make interfaces feel instantly templated or AI-generated:
- ❌ **No default purple/cyan gradients on dark backgrounds** unless that is the explicit brand identity.
- ❌ **No arbitrary single italicized or colored word** in the middle of a headline.
- ❌ **No generic pill-shaped buttons everywhere**; choose button geometry intentionally (e.g., crisp 6px-8px radius, brutalist 0px, or tailored 12px squircle).
- ❌ **No repetitive, floating feature cards** with identical icons in colored circles.
- ❌ **No indiscriminate fade-and-slide-up animations on every single element**.

## 3. Typography as Brand Character
- Choose typography pairings that convey strong personality. 
- High-impact pairings:
  - **Editorial / High Craft**: *Instrument Serif* / *Fraunces* (Display) + *Plus Jakarta Sans* / *Geist* (Body).
  - **Modern Tech / Sleek SaaS**: *Space Grotesk* or *Cabinet Grotesk* + *Inter* / *Geist Sans*.
  - **Clean Neo-Grotesque**: *Outfit* / *Satoshi* + *Public Sans*.
  - **Data / High Density**: *Geist Mono* / *JetBrains Mono* for figures and tables paired with crisp geometric sans.
- Set clear hierarchy following *The Elements of Typographic Style*:
  - Maximum body line length: 65–75 characters (`max-w-prose` or `max-width: 68ch`).
  - Leading: Heading line-height 1.1–1.2; body line-height 1.5–1.6.
  - Heading balance: Use `text-wrap: balance` on headers and `text-wrap: pretty` on paragraphs.

## 4. Visual Composition & Layout Dynamics
- **Hero Sections**: Lead with the most characteristic artifact of the domain—an interactive visualization, a live metric ticker, a provocative headline, or an authentic document snippet—not just a generic centered header with two buttons.
- **Asymmetry & Bento Grids**: Break monotony with varied card proportions (e.g., 2-column + 1-column hero bento, callout stat blocks, layered overlays).
- **Surface Depth**: Use layered elevation:
  - Deep canvas base (e.g., `#090a0f` or `#f8fafc`).
  - Elevated surfaces with 1px semi-transparent borders (`rgba(255, 255, 255, 0.08)` or `rgba(0, 0, 0, 0.06)`).
  - Subtle localized radial glows behind key focal points.

## 5. Motion Orchestration
- Use **one coordinated entrance reveal** on page load rather than uncoordinated animations on every element.
- Interactive motion should strictly respond to user intent: crisp button presses (`scale: 0.98`), smooth accordion expansions, and immediate hover feedback.
