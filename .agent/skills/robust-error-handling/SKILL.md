---
name: Robust Error Handling
description: This skill should be used when the user asks to "handle errors", "implement safe function", "fix crash", "async operation", or when writing business logic that requires error management.
version: 0.1.0
---

# Robust Error Handling (Result Pattern)

This skill provides guidelines for implementing robust error handling using the Result Pattern.

## Core Rules

1.  **Safe Utility First**:
    *   All async operations (API, Storage, Native Modules) and side effects **must** use the `safe()` utility.
    *   **Pattern**: `const { data, error } = await safe(promise);`

2.  **Exist Check & Auto-Gen**:
    *   Before implementation, check if a `safe` utility exists in the project (e.g., `@/utils/safe.ts`).
    *   If **NOT** found, you must first generate a standard `safe` implementation in `@/utils/safe.ts` that returns `{ data: T | null, error: E | null }` and then use it.

3.  **No Raw Try-Catch**:
    *   **Never** use raw `try-catch` blocks in business logic.
    *   Delegate wrapping to the `safe` utility to ensure a consistent return shape.

4.  **Error-First Handling**:
    *   Always handle the `if (error)` case immediately after the call before accessing `data`.

## Workflow

1.  Identify async operations or side effects.
2.  Ensure `safe()` utility is available.
3.  Wrap operation with `safe()`.
4.  Handle `error` returned from `safe()`.
