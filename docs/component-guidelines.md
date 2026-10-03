# Cubix Component Guidelines

Cubix components are copy-paste source under `components/cubix`. Follow the same page and API shape across the catalog.

## Implementation

- Small composable primitives with named exports
- `data-slot` on each part
- Merge `className` with `cn`
- Cubix tokens only (`background`, `foreground`, `muted`, `primary`, `destructive`, `border`, `input`, `ring`)
- States: `disabled`, `aria-invalid`, focus-visible ring, dark mode
- Primitive backends: Base UI (default), React Aria, Radix UI
- Do not add dependencies unless that backend needs them
- Never use an em dash in copy
- Do not add a Manual install step for `lib/utils.ts`. The `cn` helper is part of `cubix-ui init`.
- Manual install: extra primitive packages, paste `components/cubix/<name>.tsx`, update import paths.

## Files

- `components/cubix/<name>.tsx`
- `app/docs/components/<name>/page.tsx`
- `app/docs/components/<name>/<name>-table-data.ts`
- An entry in the root `registry.json`, then `npm run registry:build` to regenerate `public/r/<name>.json` and `public/r/registry.json`
- Sidebar, pager, and components list

## Docs page

1. Breadcrumb
2. Title and description
3. Base switcher (Base UI, React Aria, Radix UI)
4. Registry and API Reference links
5. Centered hero preview
6. Installation (Command and Manual)
7. Usage
8. Examples
9. API Reference
