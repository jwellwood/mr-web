# TextList Testing Examples

This folder contains tests for the `TextList` component.

Files:

- `TextList.test.tsx` - rendering, loading state, click interactions

Key patterns:

- Wrap components with `TestWrapper`.
- Use `getAllByRole('listitem')` to assert number of rows rendered.
- For click handlers, attach `onClick` to the `IListItem` and click the rendered primary text.

Run:

```bash
npx vitest src/components/lists/text-list/test
```
