---
name: strategic-brainstorming
description: >-
  Collaborative brainstorming and ideation methodology based on obra/superpowers. Use BEFORE any creative work,
  building features, designing components, or starting new projects. Explores user intent, maps requirements,
  evaluates multiple approaches, and produces an approved design before implementation begins.
---

# Strategic Brainstorming & Ideation Playbook

The Iron Law of Brainstorming:
```
NO IMPLEMENTATION WITHOUT AN APPROVED DESIGN FIRST
```
Rushing to code before understanding intent, constraints, and tradeoffs guarantees rework.

---

## 1. Classify the Request Scope

Before asking a single question, classify the task and announce the classification:

| Path | When to Use | Design Artifact | Gate Before Building |
| :--- | :--- | :--- | :--- |
| **Spike** | Feasibility question: *"Can we…?"*, *"Is it possible…?"* | 2–3 sentence probe plan | User nods before probing |
| **Bounded** | Small well-scoped change to existing code (a flag, endpoint, fix) | Short in-chat design (few sentences to short paragraphs) | User approves in-chat design |
| **Architectural** | New project, new subsystem, restructuring, or multi-component change | Full written specification + implementation plan | User reviews and approves written spec |

**When in doubt between two paths, take the heavier one.** Hidden complexity discovered mid-task upgrades the path — stop, announce, and step up.

---

## 2. The Brainstorming Workflow

### Step 1: Discover Intent
- **What** does the user want to accomplish?
- **Who** is this for? (End users, internal team, stakeholders?)
- **What does success look like?** (Specific, measurable outcome.)
- If any of these are missing, ask **one focused question** about purpose before proposing anything.

### Step 2: Write Back Understanding
Summarize in a short note the user can correct:
- **Intended outcome**: *"Build an interactive dashboard visualizing Gaza impact data with sector-level drill-down."*
- **Key constraints**: *"Must run as static HTML/CSS/JS with no backend. Data sourced from the existing PDF report."*
- **Success criteria**: *"Stakeholders can filter by sector, view KPI trends, and export to PDF."*
- **Assumptions**: Clearly separate facts from assumptions. Invite correction.

### Step 3: Explore Multiple Approaches (Minimum 3)
Never present a single solution. Generate at least 3 distinct approaches with honest tradeoffs:

| Approach | Core Idea | Pros | Cons | Risk Level |
| :--- | :--- | :--- | :--- | :--- |
| **A** | Description | Strengths | Weaknesses | Low / Medium / High |
| **B** | Description | Strengths | Weaknesses | Low / Medium / High |
| **C** | Description | Strengths | Weaknesses | Low / Medium / High |

### Step 4: Recommend & Get Approval
- State the recommended approach clearly with reasoning.
- **Wait for explicit user approval before writing any code.**

---

## 3. Red Flags & Anti-Patterns

| Thought Pattern | Reality Check |
| :--- | :--- |
| *"This is too simple to need a design."* | Simple tasks still get a short in-chat design. Scale the artifact to the path, but never skip it. |
| *"I understand this kind of app, so I'll start building."* | Familiarity with a genre does not mean you understand *this user's* specific intent and constraints. |
| *"The design is obvious — I'll start while they read it."* | The gate is the user's approval, not the design's length. Present, then stop until you hear yes. |
| *"It grew, but I'm almost done — no need to re-classify."* | Complexity that emerges mid-task upgrades the path. Stop and announce. |
