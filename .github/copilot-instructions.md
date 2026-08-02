# Project Overview

## Frontend:

- React 19
- Material UI
- Apollo GraphQL
- TypeScript

## Structure:

- src/
  - components/ - Reusable components
  - modules/ - Feature-based modules
  - hooks/ - Custom React hooks
  - utils/ - Utility functions
  - services/ - API services and GraphQL Apollo client setup
  - router/ - Routing configuration react-router-dom

## File Organization

- Inside each module, there is:
  - pages/ - Feature-specific pages for page header and children
  - containers/ - Feature-specific containers where graphql queries and mutations are executed
  - components/ - Feature-specific components
  - forms/ - Feature-specific form components with schema and validation
  - helpers/ - Helper functions for the feature
  - context/ - Feature-specific context providers
  - router/ - Paths and lazy loaded components for the feature
  - locales/ - Feature-specific translation files.
  - hooks/ - Feature-specific custom hooks
  - graphql/ - Feature-specific GraphQL queries and mutations
- Reusable UI belongs in src/components.
- GraphQL operations belong beside the consuming feature.
- Do not create new folders unless requested.
- Follow existing feature structure.

## Patterns

### Features

When adding a feature, follow this order:

1. Add the GraphQL query/mutation in `modules/<feature>/graphql/`
2. Create or update the container in `modules/<feature>/containers/`
3. Build the component in `modules/<feature>/components/`
4. Wire it into the page in `modules/<feature>/pages/`

Copy the nearest existing feature (e.g. `players/`) rather than building from scratch.

### i18n

- Each module has a `locales/` folder with `en.json`, `es.json`, and `index.ts`.
- `index.ts` re-exports both: `export { en, es };`
- When adding a new module, register it in `src/i18n/resources.ts`.
- Use `useTranslation('<moduleName>')` — the namespace matches the module folder name.
- Keys use SCREAMING_SNAKE_CASE, grouped by category (e.g. `PAGES`, `SECTIONS`, `FILTERS`).
- Always add keys to both `en.json` and `es.json`.

### Tests

- Use Jest and React Testing Library.
- Test files live alongside the component being tested, inside a `test/` folder.
- Test files are named `<ComponentName>.test.tsx` or `<ComponentName>.test.ts` if React is not used.
- Use `describe` blocks to group related tests.
- Tests should be isolated and not depend on external state or other tests.
- Tests should be deterministic and not rely on random values or external APIs.
- Tests should cover both happy and sad paths, including edge cases.

## GraphQL

- Reuse existing queries where possible.
- Extend existing operations before creating new ones.
- Use codegen types.
- Avoid any.
- Do not modify schema files unless explicitly requested.

### Codegen

Generated types live in `src/types/__generated__/graphql.ts`. Operation-level types are generated alongside their `.graphql` files using the near-operation-file preset.

To update `schema.graphql` from a running local API:

```
npm run codegen:schema
```

To regenerate TypeScript types after changing queries or the schema:

```
npm run codegen
```

Run both when the backend schema changes. Run only `codegen` when adding or editing GraphQL operations.

## Performance

- Avoid unnecessary useMemo.
- Avoid unnecessary useCallback.
- Prefer simple solutions first.
- Do not optimize unless there is a demonstrated issue.

## Avoid

- Do not add dependencies without approval.
- Do not refactor unrelated code.
- Do not rename files unless requested.
- Do not modify backend code for frontend tasks.
- Do not change GraphQL schema for UI requests.
- Do not change API contracts.

## Agent Guidance

When implementing a change:

1. Inspect the smallest possible set of files.
2. Prefer copying an existing pattern over creating a new one.
3. Do not search the entire repository unless necessary.
4. Limit modifications to files directly related to the task.
5. Explain why additional files need changes before modifying them.

## Token efficiency

- Be concise by default; prefer short answers and minimal commentary.
- Do not inspect unrelated files, generated output, or coverage reports unless the request requires it.
- For simple questions, answer directly without opening files or running tools.
- For code tasks, inspect the smallest relevant files first and stop once the issue is understood.
- Avoid broad repo searches, refactors, or extra verification steps unless explicitly requested.
- Ask one targeted clarification question rather than exploring widely.
