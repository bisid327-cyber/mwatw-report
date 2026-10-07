---
name: deep-research-investigation
description: >-
  Systematic deep research, multi-source investigation, and evidence-based analysis methodology. Use when the user
  asks to research a topic, find the best options, compare alternatives, investigate technologies, audit solutions,
  or gather intelligence before making critical decisions. Enforces structured evidence gathering before conclusions.
---

# Deep Research & Investigation Playbook

The Iron Law of Research:
```
NO CONCLUSIONS WITHOUT VERIFIED MULTI-SOURCE EVIDENCE FIRST
```
Gut instinct, single-source opinions, and unverified assumptions are engineering and decision-making failures.

---

## 1. The 5-Phase Research Methodology

### Phase 1: Define the Research Question
Before opening a single browser tab or search query:
1. **Restate the Core Question**: Convert the user's request into a precise, answerable question.
   - ❌ Vague: *"What's the best framework?"*
   - ✅ Precise: *"Which JavaScript framework (React, Vue, Svelte, or Solid) produces the fastest initial page load for a data-heavy humanitarian dashboard with 50+ interactive charts?"*
2. **Define Success Criteria**: What would make one option definitively better?
   - Performance benchmarks? Community support? Bundle size? Accessibility compliance? Learning curve?
3. **Scope Boundaries**: What is explicitly out of scope? (e.g., *"We are not evaluating backend frameworks."*)

### Phase 2: Systematic Multi-Source Evidence Gathering
Never rely on a single search result. Cross-reference across multiple independent sources:

```
[ Research Question ]
        │
        ├── Source 1: Official Documentation & Changelogs
        │       └── First-party facts: API surface, version status, breaking changes.
        │
        ├── Source 2: Independent Benchmarks & Comparisons
        │       └── Third-party data: performance tests, bundle analysis, lighthouse scores.
        │
        ├── Source 3: Community & Ecosystem Health
        │       └── GitHub stars/issues/PRs, npm weekly downloads, Stack Overflow activity.
        │
        ├── Source 4: Real-World Case Studies & Production Usage
        │       └── Who uses it at scale? What problems did they encounter?
        │
        └── Source 5: Expert Opinions & Technical Deep-Dives
                └── Blog posts, conference talks, and postmortems from recognized practitioners.
```

### Phase 3: Structured Comparison Matrix
Present findings as a clean, scannable decision table:

| Criterion | Option A | Option B | Option C | Winner |
| :--- | :--- | :--- | :--- | :--- |
| **Performance** | Data here | Data here | Data here | ✅ |
| **Bundle Size** | Data here | Data here | Data here | ✅ |
| **Ecosystem** | Data here | Data here | Data here | ✅ |
| **Accessibility** | Data here | Data here | Data here | ✅ |
| **Learning Curve** | Data here | Data here | Data here | ✅ |

### Phase 4: Tradeoff Analysis & Recommendation
- **State the recommendation clearly**: *"Based on the evidence, Option B is the strongest choice for this specific use case because..."*
- **Acknowledge tradeoffs honestly**: *"Option A has faster raw rendering, but Option B's ecosystem maturity and accessibility tooling outweigh that advantage for this project."*
- **Flag uncertainties**: If evidence is inconclusive or contradictory, say so. Never fabricate certainty.

### Phase 5: Decision Documentation
Record the final decision and its rationale for future reference:
- What was decided and why.
- What alternatives were rejected and why.
- What conditions would trigger revisiting this decision.

---

## 2. Anti-Patterns to Avoid

| Cognitive Trap | Why It Fails | Countermeasure |
| :--- | :--- | :--- |
| **Confirmation Bias** | Searching only for evidence supporting a pre-existing preference. | Actively search for *criticisms* and *failure cases* of the leading option. |
| **Recency Bias** | Favoring the newest/trendiest tool without evaluating maturity. | Check production stability, LTS support, and breaking change history. |
| **Popularity Fallacy** | Choosing solely based on GitHub stars or hype. | Stars ≠ quality. Evaluate documentation depth, issue response times, and real-world production adoption. |
| **Single-Source Trust** | Basing a decision on one blog post or one benchmark. | Cross-reference at least 3 independent sources before citing a claim as fact. |
| **Analysis Paralysis** | Researching indefinitely without converging on a decision. | Set a time/depth budget. After Phase 3, force a recommendation even if imperfect. |
