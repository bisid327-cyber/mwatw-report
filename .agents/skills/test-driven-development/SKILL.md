---
name: test-driven-development
description: >-
  Strict Test-Driven Development (TDD) workflow based on obra/superpowers and industry standards.
  Use when implementing new features, modules, API endpoints, algorithms, or bugfixes.
  Enforces the Red-Green-Refactor cycle: write failing test, write minimal passing code, then refactor.
---

# Test-Driven Development (TDD) Playbook

The Iron Law of TDD:
```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```
If you didn't watch the test fail, you do not know if it actually tests the intended behavior or if it's a false positive.

---

## The Red-Green-Refactor Cycle

```
[ RED ]       -> Write a minimal, expressive test that fails for the right reason.
   |
[ GREEN ]     -> Write the simplest, cleanest code to make the test pass.
   |
[ REFACTOR ]  -> Clean up duplication, improve naming, optimize without changing behavior.
   |
[ REPEAT ]    -> Move to the next behavior or edge case.
```

---

## 1. Phase 1: RED (Write the Failing Test)
- Focus on observable public behavior, not internal private implementation details.
- Formulate test names using descriptive behavior statements:
  - `it('calculates total aid volume with fractional metric conversions')`
  - `it('rejects unauthenticated requests with a 401 status and error envelope')`
- Run the test suite and verify:
  1. The test fails (exit code != 0).
  2. The failure message matches the exact missing behavior, not a syntax typo or unrelated import error.

---

## 2. Phase 2: GREEN (Minimal Passing Implementation)
- Write the minimal code required to satisfy the test condition.
- Resist premature optimization or implementing speculative features not yet covered by tests.
- Verify that all tests pass cleanly.

---

## 3. Phase 3: REFACTOR (Craftsmanship)
- Remove duplicate logic.
- Extract descriptive helper functions and constants.
- Ensure type definitions and interfaces are clear.
- Confirm all tests continue to pass after every refactoring edit.

---

## Edge Case Checklist
Before concluding a unit:
- Boundary values (empty lists `[]`, zero `0`, negative numbers, max integer).
- Null, undefined, or missing object keys.
- Network timeouts, asynchronous rejections, or unexpected payload shapes.
