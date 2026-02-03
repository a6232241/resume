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

# Communication Style
- **Language**: Responses must be in **Traditional Chinese (Taiwan)**.
- **Concise & Technical**: Focus on "Why" it was changed. Provide a brief plan before complex execution.