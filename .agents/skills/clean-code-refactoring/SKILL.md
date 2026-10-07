---
name: clean-code-refactoring
description: >-
  Refactoring, code quality, and clean architecture standards based on Martin Fowler and modern engineering best practices.
  Use when cleaning up existing codebases, reducing cyclomatic complexity, splitting monolithic files, eliminating duplication,
  or modernizing legacy modules.
---

# Clean Code & Architectural Refactoring Playbook

Transform messy, tangled, or fragile code into modular, readable, and resilient software.

---

## 1. Core Principles (SOLID & Clean Code)
1. **Single Responsibility (SRP)**: Each function, module, and component should have only one reason to change.
2. **Open/Closed Principle**: Open for extension, closed for modification. Favor strategy patterns or callbacks over massive `switch`/`if-else` chains.
3. **Dependency Inversion**: High-level modules should not depend on low-level utility implementations. Depend on interfaces/abstractions.
4. **Boy Scout Rule**: Always leave the codebase cleaner than you found it.

---

## 2. Code Smells & Antidotes

| Code Smell | Warning Sign | Antidote |
| :--- | :--- | :--- |
| **Monolithic Component / File** | File > 300 lines with mixed concerns | Extract presentation components, custom hooks, and pure domain calculation utilities. |
| **Deep Nesting** | `if` statements nested > 3 levels deep | Use early returns (guard clauses) to exit functions early. |
| **Magic Numbers / Strings** | Hardcoded literals scattered across logic | Extract to typed constants or domain enums with descriptive names. |
| **God Function** | Function doing 5 things (parsing, validating, fetching, updating DOM, logging) | Split into small, pipeline-oriented single-purpose functions. |
| **Prop Drilling** | Passing props through 5 layers of UI | Use composition, React Context, or a lightweight state store. |

---

## 3. Guard Clauses & Early Returns Pattern

❌ **Bad (Nested Pyramid of Doom)**:
```typescript
function processReport(report) {
  if (report) {
    if (report.isValid) {
      if (report.metrics && report.metrics.length > 0) {
        // actual logic buried 4 levels deep
        return calculateAggregates(report.metrics);
      } else {
        return null;
      }
    } else {
      throw new Error('Invalid report');
    }
  }
  return null;
}
```

✅ **Good (Clean Guard Clauses)**:
```typescript
function processReport(report?: Report): Aggregates | null {
  if (!report) return null;
  if (!report.isValid) throw new Error('Invalid report');
  if (!report.metrics || report.metrics.length === 0) return null;

  return calculateAggregates(report.metrics);
}
```
