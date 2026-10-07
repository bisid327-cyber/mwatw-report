---
name: typescript-expert
description: >-
  Advanced TypeScript and JavaScript engineering patterns. Enforces strict type-safety, discriminated unions,
  generic constraints, Zod runtime schema validation, exhaustive switch matching, and clean async concurrency.
  Use whenever writing or reviewing TypeScript or complex JavaScript logic.
---

# TypeScript & JavaScript Engineering Playbook

Write bulletproof, maintainable, and type-safe code that catches errors at compile time rather than in production.

---

## 1. Eliminate `any` & Unsafe Type Casting
- **Never use `any`**: Use `unknown` for values of unverified type, followed by type narrowing or schema validation.
- **Avoid `as TargetType` assertions**: Favor type guards (`is` operator) or Zod schema parsing (`schema.parse(data)`).
- **Discriminated Unions for State**:
  ```typescript
  type AsyncState<T> =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: T; timestamp: number }
    | { status: 'error'; error: Error };
  ```

---

## 2. Exhaustive Type Checking
Use exhaustive matching to ensure every branch of a union is handled:

```typescript
function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${JSON.stringify(x)}`);
}

function handleState(state: AsyncState<ReportData>) {
  switch (state.status) {
    case 'idle':
      return renderEmptyState();
    case 'loading':
      return renderSkeletonLoader();
    case 'success':
      return renderDashboard(state.data);
    case 'error':
      return renderErrorMessage(state.error);
    default:
      return assertNever(state); // Compile error if new status is added without handling
  }
}
```

---

## 3. Runtime Data Validation (Zod / Defensive Parsing)
Always validate external data (API responses, form inputs, local storage, URL search parameters):

```typescript
import { z } from 'zod';

export const ImpactMetricSchema = z.object({
  id: z.string().uuid(),
  category: z.enum(['health', 'water', 'food', 'shelter']),
  count: z.number().int().nonnegative(),
  lastUpdated: z.string().datetime(),
  verified: z.boolean().default(true),
});

export type ImpactMetric = z.infer<typeof ImpactMetricSchema>;
```

---

## 4. Async Concurrency & Error Ergonomics
- Prefer `Promise.allSettled` over `Promise.all` when fetching independent widgets so one failing widget does not crash the entire dashboard.
- Encapsulate async results in typed Result tuples/objects:
  ```typescript
  type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };
  ```
