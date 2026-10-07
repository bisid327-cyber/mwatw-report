---
name: critical-thinking-decisions
description: >-
  Critical thinking, decision frameworks, and rational analysis methodology. Use when evaluating competing options,
  making architectural decisions, assessing tradeoffs, choosing technology stacks, prioritizing features, or any
  situation requiring structured judgment under uncertainty. Prevents cognitive biases and ensures defensible decisions.
---

# Critical Thinking & Decision Framework Playbook

The Iron Law of Decision-Making:
```
NO COMMITMENT WITHOUT STRUCTURED TRADEOFF ANALYSIS FIRST
```
Every significant decision must be defended with evidence, not instinct.

---

## 1. Decision Framework Selection

Choose the appropriate framework based on the decision type:

| Decision Type | Best Framework | When to Use |
| :--- | :--- | :--- |
| **Binary choice** (A vs B) | Pros/Cons with weighted criteria | Simple either/or decisions. |
| **Multi-option comparison** (A vs B vs C vs D) | Weighted scoring matrix | Choosing between 3+ alternatives with multiple criteria. |
| **Uncertain outcome** | Risk/reward matrix + reversibility test | Decisions with unknown consequences or high stakes. |
| **Sequencing / priority** | Impact vs Effort quadrant (Eisenhower matrix) | Deciding *what to do first* from a backlog of options. |
| **Architecture / technology** | ADR (Architecture Decision Record) | Decisions that constrain future development and are hard to reverse. |

---

## 2. The Weighted Scoring Matrix (Multi-Option Decisions)

### Step 1: Define Evaluation Criteria
List the 4–7 most important dimensions for this decision. Examples:
- Performance, Cost, Learning Curve, Ecosystem Size, Accessibility, Maintainability, Security.

### Step 2: Assign Weights (Must total 100%)
Not all criteria matter equally. Assign honest weights based on the project's real priorities:
- *Critical*: 25–30%
- *Important*: 15–20%
- *Nice-to-have*: 5–10%

### Step 3: Score Each Option (1–5 scale)
Rate each option against each criterion using verifiable evidence, not gut feeling.

### Step 4: Calculate Weighted Scores

| Criterion | Weight | Option A | Score | Option B | Score | Option C | Score |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Performance | 25% | Fast | 4 × 0.25 = 1.0 | Moderate | 3 × 0.25 = 0.75 | Fastest | 5 × 0.25 = 1.25 |
| Ecosystem | 20% | Huge | 5 × 0.20 = 1.0 | Growing | 3 × 0.20 = 0.60 | Small | 2 × 0.20 = 0.40 |
| ... | ... | ... | ... | ... | ... | ... | ... |
| **TOTAL** | 100% | | **X.XX** | | **X.XX** | | **X.XX** |

---

## 3. The Reversibility Test

Before committing to any decision, ask:

> **"How easily can we reverse this decision in 3 months?"**

| Reversibility | Approach |
| :--- | :--- |
| **Easily reversible** (config change, CSS swap, library replacement) | Decide quickly, optimize for speed. Bias toward action. |
| **Moderately reversible** (API shape, data schema, component architecture) | Invest moderate analysis time. Get a second opinion. |
| **Irreversible or very costly** (database engine, programming language, core framework) | Full weighted analysis. Document as an Architecture Decision Record (ADR). |

---

## 4. Architecture Decision Record (ADR) Format

For irreversible or high-impact decisions, document formally:

```markdown
# ADR-001: [Decision Title]

## Status: [Proposed / Accepted / Deprecated / Superseded]

## Context
What is the problem or situation that requires a decision?

## Options Considered
1. **Option A**: [Description, pros, cons]
2. **Option B**: [Description, pros, cons]
3. **Option C**: [Description, pros, cons]

## Decision
We chose **Option B** because [specific reasoning tied to project constraints].

## Consequences
- **Positive**: [What improves]
- **Negative**: [What tradeoffs we accept]
- **Risks**: [What could go wrong and our mitigation plan]

## Revisit Conditions
Re-evaluate this decision if: [specific trigger conditions].
```

---

## 5. Cognitive Bias Checklist

Before finalizing any recommendation, run this self-audit:

- [ ] **Anchoring**: Am I over-weighting the first option I encountered?
- [ ] **Confirmation Bias**: Did I actively search for evidence *against* my preferred option?
- [ ] **Sunk Cost**: Am I recommending this because of past investment rather than future value?
- [ ] **Authority Bias**: Am I choosing this because a famous company uses it, or because it genuinely fits *this* project?
- [ ] **Availability Bias**: Am I favoring this because I've used it before, not because it's the best fit?
- [ ] **Bandwagon Effect**: Am I choosing this because it's popular/trending right now?
