---
trigger: always_on
---

# UI & Assets
- **NO SVG Replication**: DO NOT replicate icons, illustrations, or logos using SVG paths. Use `lucide-react` or existing icon libraries.
- **Asset Placeholders**: For images in design drafts, use placeholders (e.g., `src/assets/temp.png`) or `<img>`/`<Image />` tags instead of recreating them with code.

# Performance & Tools
- **Disable Browser Sub-agent**: Skip browser verification tasks by default to save resources.
- **Explicit Verification**: Only run browser verification when I explicitly type "verify in browser".
- **Validation Focus**: Prioritize code correctness and terminal-level validation (e.g., build checks, linting).

# Robust Error Handling (Result Pattern)
- **Safe Utility First**: All async operations (API, Storage, Native Modules) and side effects must use the `safe()` utility. Pattern: `const { data, error } = await safe(promise);`.
- **Exist Check & Auto-Gen**: 
  - Before implementation, check if a `safe` utility exists in the project (e.g., `@/utils/safe.ts`).
  - If NOT found, Antigravity must first generate a standard `safe` implementation in `@/utils/safe.ts` that returns `{ data: T | null, error: E | null }` and then use it.
- **No Raw Try-Catch**: Never use raw `try-catch` blocks in business logic; delegate wrapping to the `safe` utility to ensure a consistent return shape.
- **Error-First Handling**: Always handle the `if (error)` case immediately after the call before accessing `data`.

# Strict Internationalization (i18n)
- **No Hard-coded Strings**: DO NOT hard-code user-facing strings.
- **Library Usage**: Use `next-intl` (`useTranslations` for Client Components, `getTranslations` for Server Components).
- **Workflow**: If a new key is needed, add it to `messages/zh-TW.json` (primary) and `en.json` first, then use it in the component.

# Feature-First Architecture
- **Component Placement Logic**: Always follow this decision tree to determine the directory:
  1. **components/ui/**: If the component is pure UI, 100% prop-driven, and has **NO hooks** (e.g., Button, Card, Input).
  2. **components/shared/**: If the component contains hooks/logic (e.g., `useTheme`, `useTranslations`) AND is shared by **2 or more features** (e.g., Header, ThemeToggle).
  3. **features/[name]/components/**: If the component is specific to a single business domain or feature (e.g., ProjectCard, SkillBadge).
- **Quick Decision Table**:
  - Pure UI & No Hooks? -> `components/ui/`
  - Used by 2+ Features? -> `components/shared/`
  - Business Specific? -> `features/[name]/components/`
- **Named Exports**: Always use named exports (e.g., `export const MyComponent...`) to facilitate IDE auto-imports.

# Conventional Commits
- **Format**: Use `feat:`, `fix:`, `refactor:`, `style:`, etc.
- **Scope**: Keep subjects under 50 chars. Use platform prefixes: `fix(android): ...` or `feat(ios): ...`.

# Communication Style
- **Language**: Responses must be in **Traditional Chinese (Taiwan)**.
- **Concise & Technical**: Focus on "Why" it was changed. Provide a brief plan before complex execution.