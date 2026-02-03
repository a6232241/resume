---
name: Strict Internationalization (i18n)
description: This skill should be used when the user asks to "add translation", "support multiple languages", "i18n", "text change", or when implementing user-facing strings.
version: 0.1.0
---

# Strict Internationalization (i18n) Guidelines

This skill provides guidelines for implementing internationalization using `next-intl`.

## Core Rules

1.  **No Hard-coded Strings**:
    *   **DO NOT** hard-code user-facing strings in components.

2.  **Library Usage**:
    *   Use `next-intl`.
    *   Use `useTranslations` for Client Components.
    *   Use `getTranslations` for Server Components.

3.  **Workflow**:
    *   If a new key is needed, add it to `messages/zh-TW.json` (primary) and `en.json` first.
    *   Then use the key in the component.

## Best Practices

*   Ensure keys are descriptive and nested logically if supported.
*   Keep translation files (JSON) synchronized regarding keys.
