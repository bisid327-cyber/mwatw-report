---
name: systematic-debugging
description: >-
  Disciplined root-cause analysis and systematic debugging methodology based on obra/superpowers.
  Use whenever encountering bugs, test failures, unhandled exceptions, build breakages, or unexpected behavior.
  Strictly enforces finding root causes before writing fixes.
---

# Systematic Debugging Playbook

The Iron Law of Debugging:
```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```
Symptom fixes and speculative guessing are engineering failures. You must trace and prove the root cause before modifying code.

---

## The Four Phases of Debugging

### Phase 1: Root Cause Investigation
Before touching any implementation code:
1. **Analyze Error Outputs Completely**:
   - Never skim error logs or stack traces.
   - Note exact file paths, line numbers, error codes, and exception types.
2. **Reproduce Consistently**:
   - Establish a deterministic, reproducible trigger (e.g. a failing unit test or specific curl/browser payload).
   - If not reproducible, add non-invasive diagnostic logging before making assumptions.
3. **Trace System Boundaries**:
   - In multi-layer systems (UI -> API -> Service -> DB), log inputs and outputs at each interface to isolate which boundary is violating contracts.
4. **Identify Recent Deltas**:
   - Review recent git commits, dependency upgrades, or configuration adjustments.

### Phase 2: Hypothesis Formulation & Proof
1. Formulate a single falsifiable hypothesis: *"The bug occurs because component X assumes parameter Y is non-null when Z event fires."*
2. Verify the hypothesis with a minimal test or probe before writing the fix.
3. If the test disproves the hypothesis, formulate a new one. Do not apply patches "just in case."

### Phase 3: Minimal, Targeted Fix
1. Implement the minimal necessary change that addresses the verified root cause.
2. Avoid shotgun debugging (changing multiple files simultaneously hoping one works).
3. Preserve existing architecture and interfaces unless the architectural defect itself is the cause.

### Phase 4: Verification & Regression Shield
1. Verify the reproduction test passes.
2. Run the entire test suite to ensure zero unintended side effects.
3. Add a dedicated regression test covering this exact edge case.
