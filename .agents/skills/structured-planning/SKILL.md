---
name: structured-planning
description: >-
  Structured project planning and task decomposition methodology based on obra/superpowers. Use when breaking down
  complex projects into executable plans, defining implementation order, managing dependencies, and creating
  step-by-step execution roadmaps. Ensures no implementation begins without a verified, sequenced plan.
---

# Structured Planning & Task Decomposition Playbook

The Iron Law of Planning:
```
NO EXECUTION WITHOUT A SEQUENCED, DEPENDENCY-AWARE PLAN FIRST
```
Building without a plan guarantees integration failures, missed requirements, and architectural dead-ends.

---

## 1. Plan Structure: The Implementation Blueprint

Every plan must answer these 5 questions before any code is written:

1. **What** are we building? (Feature spec / desired outcome)
2. **In what order?** (Sequenced task list with explicit dependencies)
3. **What are the acceptance criteria?** (How do we know each step is done?)
4. **What could go wrong?** (Risks, unknowns, and contingencies)
5. **What is explicitly out of scope?** (Prevents scope creep mid-execution)

---

## 2. Task Decomposition Rules

### A. Break Down Until Atomic
Each task in the plan should be:
- **Independently testable**: Can be verified in isolation.
- **Small enough to complete in one focused session** (< 1 hour of agent work).
- **Clear entry and exit conditions**: *"Given X exists, implement Y, verify by running Z."*

### B. Dependency Mapping
Sequence tasks so that:
- Foundation layers are built first (data models, utility functions, design tokens).
- Components that depend on foundations come second.
- Integration and assembly come last.
- Tasks with no dependencies on each other can be parallelized.

```
[ 1. Data layer / schema definitions ]
          │
[ 2. Core utility functions ]
          │
    ┌─────┴─────┐
[ 3a. Component A ] [ 3b. Component B ]
    └─────┬─────┘
          │
[ 4. Integration & assembly ]
          │
[ 5. Polish, responsive, accessibility ]
          │
[ 6. Final verification & testing ]
```

### C. Risk-First Ordering
If any task has high uncertainty or risk of failure, schedule it **early**. Discovering a blocker on step 1 is fixable; discovering it on step 15 is catastrophic.

---

## 3. Plan Format Template

```markdown
# Implementation Plan: [Feature Name]

## Scope
- **Goal**: [One sentence]
- **Out of scope**: [Explicit exclusions]

## Prerequisites
- [ ] [Any setup, dependencies, or approvals needed]

## Tasks (in execution order)

### Task 1: [Name]
- **Description**: [What to build/change]
- **Dependencies**: None
- **Acceptance**: [How to verify completion]

### Task 2: [Name]
- **Description**: [What to build/change]
- **Dependencies**: Task 1
- **Acceptance**: [How to verify completion]

### Task 3: [Name]
...

## Risks & Contingencies
| Risk | Likelihood | Impact | Mitigation |
| :--- | :--- | :--- | :--- |
| [Risk 1] | Low/Med/High | Low/Med/High | [Plan B] |

## Definition of Done
- [ ] All tasks completed and verified
- [ ] No regressions in existing functionality
- [ ] Responsive across mobile/tablet/desktop
- [ ] Accessibility audit passed
```

---

## 4. Execution Discipline
- **Complete tasks in sequence**. Do not skip ahead.
- **Verify each task's acceptance criteria** before starting the next.
- **If scope grows mid-execution**: Stop, update the plan, and get user approval before continuing.
- **Track progress**: Mark completed tasks clearly so both agent and user know the current state.
