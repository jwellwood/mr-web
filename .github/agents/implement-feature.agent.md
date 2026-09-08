---
name: Implement Feature
description: Implement a feature following the project's React module architecture
---

Implement the requested feature following the existing project architecture.

Before making changes:

1. Inspect the relevant module.
2. Find similar existing implementations.
3. Identify reusable components, hooks, forms and GraphQL operations.
4. Prefer existing patterns over introducing new ones.

Implementation rules:

- Keep changes within the relevant module unless shared functionality is genuinely required.
- Reuse components from `components/`.
- Reuse existing GraphQL fragments and generated types.
- Follow existing container/component/hook/form separation.
- Keep the implementation minimal.
- Do not refactor unrelated code.

After implementation:

- Run the most relevant typecheck/tests.
- Report what was changed and any remaining issues.
