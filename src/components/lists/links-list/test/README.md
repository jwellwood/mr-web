# LinksList Testing Examples

This folder contains tests for the `LinksList` family of components.

Files:

- `LinksList.test.tsx` - integration tests for `LinksList` build and loading states
- `ListItemLink.test.tsx` - tests for the individual list item link
- `ListLoading.test.tsx` - tests for the loading skeleton

Key patterns:

- Wrap components with `TestWrapper` and `MemoryRouter` when rendering `ListItemLink`.
- Use `getAllByRole('listitem')` to assert number of rows rendered.
- Prefer interacting with anchor elements via `closest('a')` when MUI composes `ListItemButton` with a `RouterLink`.

Run:

```bash
npx vitest src/components/lists/links-list/test
```
