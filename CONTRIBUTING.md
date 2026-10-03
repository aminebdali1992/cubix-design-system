# Contributing

Thanks for helping improve Cubix. This guide covers the repository layout, local development, and what a pull request needs before it can be merged.

## Repository structure

This is an npm workspaces monorepo.

```
app/                  Documentation site (Next.js App Router), served at https://cubixflow.ir
components/cubix/     Component source that ships to users
  base/               Base UI implementations (default base)
  aria/               React Aria implementations
  radix/              Radix UI implementations
components/docs/      Documentation site chrome (previews, code blocks, tables)
components/examples/  Live examples rendered in the docs
registry.json         Source registry definition
public/r/             Built registry JSON consumed by the CLI
packages/cubix/       The cubix-ui CLI, published to npm
skills/cubix/         Agent Skill installed with `npx skills add`
docs/                 Contributor guidelines
```

## Local development

Requirements: Node.js 18.18 or newer and npm.

```bash
git clone https://github.com/aminebdali1992/cubix-design-system.git
cd cubix-design-system
npm install
npm run dev
```

The documentation site runs at http://localhost:3000.

### Working on the CLI

```bash
npm run build:cli
node packages/cubix/dist/index.js --help
```

Point the CLI at your local documentation server to test registry changes before they are deployed:

```bash
CUBIX_REGISTRY_URL=http://localhost:3000/r node packages/cubix/dist/index.js add button
```

### Public readiness contract

A component is public only when it has Base UI, React Aria, and Radix UI sources, a docs page, and a `registry.json` entry. Sync the catalog flags and rebuild the public registry with:

```bash
npm run registry:build
```

That command refreshes `lib/ready-components.json`, sets `ready` in `components-data.ts`, embeds all three bases under `public/r`, and removes unpublished items from the public install surface.

### Rebuilding the registry

After changing a component or `registry.json`, run `npm run registry:build` and commit the regenerated `public/r` files, `lib/ready-components.json`, and any `components-data.ts` readiness updates together with the source change.

## Component standards

Read [docs/component-guidelines.md](./docs/component-guidelines.md) before adding or changing a component. In short:

- Keep the three bases aligned. A fix, state, or prop added to one base is ported to Base UI, React Aria, and Radix UI in the same pull request.
- Use semantic tokens only (`background`, `foreground`, `muted`, `accent`, `primary`, `destructive`, `border`, `input`, `ring`). No hex or rgb colors.
- Every interactive part is keyboard operable, has a visible `focus-visible` ring, and handles `disabled` and `aria-invalid`.
- Named exports, `data-slot` on every part, and `className` merged with `cn()`.
- Prefer logical properties (`ps-*`, `me-*`, `start-*`) so layouts work right to left.
- Do not use the em dash character in code, comments, or copy. Use a hyphen.

A new component also needs its docs page, API table data, a `registry.json` entry, the regenerated `public/r/<name>.json`, and entries in the sidebar, pager, and components index.

## Before opening a pull request

```bash
npm run typecheck
npm run build
```

Both must pass. Keep pull requests focused on one change, describe what changed and why, and include screenshots for visual changes in light and dark mode.

## Releasing

Maintainers publish the CLI by following [RELEASING.md](./RELEASING.md).
