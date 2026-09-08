# Project Architecture

## Stack

- React + TypeScript
- GraphQL
- Material UI (MUI)
- Custom reusable UI components live in `components/`

## Structure

### Top-level directories

The application is organized into the following top-level directories within the `src/` directory:

- `components/` — reusable UI components - prefer this to creating new components in a module
- `constants/` — constants used throughout the application
- `hooks/` — custom React hooks used throughout the application
- `i18n/` — where localization namespaces and translations are processed
- `modules/` — feature-level modules, each with its own components, hooks, and GraphQL queries/mutations/fragments etc
- `services/` — API services, including GraphQL client and REST API clients (file uploads, etc)
- `store/` — global state management (Redux Toolkit)
- `theme/` — MUI theme and custom component overrides
- `types/` — App-wide types and generated GraphQL types
- `utils/` — utility functions used throughout the application

- `main.ts` — entry point for the application

### Modules

Each module may contain:

- `pages/` — page-level components that are routed
- `router/` — exported pages for routing
- `components/` — module-specific UI
- `containers/` — page/feature-level orchestration: graphql queries/mutations, state management, and rendering of module-specific components
- `hooks/` — module-specific React hooks
- `forms/` — forms and form logic including zod validation schemas
- `graphql/` — GraphQL queries/mutations/fragments as appropriate
- `locales/` — module-specific localization namespaces and translations
- `helpers/` — module-specific utility functions

## Rules

### Searching workspace

- Do not inspect node_modules, build output, coverage or other generated artifacts.
- Start by inspecting the relevant module rather than searching the entire repository.

### Implementation

- Prefer existing patterns in the relevant module.
- Reuse components from `components/` before creating new UI components.
- Use the existing MUI wrapper/custom components rather than importing MUI primitives directly when an equivalent project component exists.
- Keep module-specific components inside their module.
- Do not move code between modules unless explicitly requested.
- Reuse existing GraphQL queries, mutations, fragments, hooks and generated types where possible.
- Do not duplicate GraphQL fragments or types.
- Keep changes narrowly scoped to the requested feature.
- Do not introduce new dependencies without asking.
- Do not modify generated files manually.
- Follow existing naming and file-placement conventions.
