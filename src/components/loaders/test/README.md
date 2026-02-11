# Loaders Testing

This folder contains tests for small loader components used across the app.

Files added:

- `custom-skeleton/test/CustomSkeleton.test.tsx`
- `lazy-loader/test/LazyLoader.test.tsx`
- `spinner/test/Spinner.test.tsx`
- `stat-skeleton/test/StatSkeleton.test.tsx`
- `tab-loader/test/TabLoader.test.tsx`

Notes:

- Tests assert that MUI `Skeleton`, `LinearProgress`, and `CircularProgress` elements render.
- `CustomSkeleton` and `StatSkeleton` use `role=progressbar` via MUI Skeleton.
- `Spinner` and `TabLoader` use `role=status` via CircularProgress container.

Run:

```
npx vitest src/components/loaders/**/test
```
