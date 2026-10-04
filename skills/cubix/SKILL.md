---
name: cubix
description: Build UI with Cubix, the copy-paste React component registry. Use when the project has a cubix.json, imports from components/cubix, or the user asks to add, compose, theme, or publish Cubix components, blocks, or registry items with the cubix-ui CLI.
---

# Cubix

Cubix components are source files the project owns. They are copied into the app by the `cubix-ui` CLI from the registry at `https://cubixflow.ir/r`, then edited like any other code. Never install Cubix components from npm and never hand-write a component that the registry already provides.

Public readiness contract: a component is installable only when it has Base UI, React Aria, and Radix UI sources, docs, and a registry entry. If `cubix-ui search` does not list a name, or `add` returns 404, it is on the roadmap - do not invent a stub and do not paste unfinished source from the monorepo.

## 1. Read project context first

Before generating UI, resolve the project configuration:

```bash
npx cubix-ui@latest info --json
```

If the CLI is unavailable, read `cubix.json` at the project root. The fields that matter:

| Field | Use it for |
| --- | --- |
| `base` | Primitive backend: `base` (Base UI), `radix` (Radix UI), or `aria` (React Aria). Never mix bases in one project. |
| `aliases.ui` | Import path for components, usually `@/components/cubix`. |
| `aliases.utils` | Import path for `cn()`, usually `@/lib/utils`. |
| `tailwind.css` | The global stylesheet that holds the design tokens. |
| `rsc` | When `true` (Next.js App Router), add `"use client"` only to files that use hooks, state, or event handlers. |
| `iconLibrary` | Icon package to import from, usually `lucide-react`. |

If there is no `cubix.json`, initialize the project before adding anything (see section 2).

## 2. Use the CLI, not hand-written copies

```bash
# Existing app: configure tokens, cubix.json, and lib/utils.ts
npx cubix-ui@latest init

# New app: scaffold a framework, then configure Cubix
npx cubix-ui@latest init -t next      # also: vite, start, react-router, astro
npx cubix-ui@latest init -t next --base radix

# Discover before you build
npx cubix-ui@latest search -q dialog
npx cubix-ui@latest view dialog

# Add components (dependencies and registry dependencies are resolved)
npx cubix-ui@latest add button dialog select
npx cubix-ui@latest add button --base aria
npx cubix-ui@latest add button --dry-run
npx cubix-ui@latest add button --overwrite
```

Rules:

- Search the registry before creating a new component. Only add names that search returns.
- Prefer Text Field / Email Field / Phone Field over a generic Input when those are what the registry publishes.
- Respect the package manager already used by the project (`pnpm dlx`, `yarn dlx`, `bunx --bun`, or `npx`).
- Use `--base` only when the user explicitly wants a different base than `cubix.json`.
- Use `--dry-run` to preview when files may already exist, and `--overwrite` only with the user's consent, because it replaces local edits.

## 3. Compose components correctly

Import from the `ui` alias with named exports:

```tsx
import { Button } from "@/components/cubix/button"
import { Field, FieldLabel, FieldDescription } from "@/components/cubix/field"
import { Input } from "@/components/cubix/input"
```

Every base exposes the same visual API. To render a component as another element, pass `render` and set `nativeButton={false}` when the target is not a `<button>`:

```tsx
import Link from "next/link"

<Button nativeButton={false} render={<Link href="/docs" />}>
  Read the docs
</Button>
```

On the Radix base, `asChild` is also accepted. Prefer `render` so code stays portable across bases.

Conventions every Cubix part follows, and that new code must follow too:

- A `data-slot` attribute on every part, for example `data-slot="card-header"`.
- `className` merged through `cn()` from the `utils` alias.
- Visual variants defined with `cva` and exported next to the component.
- Accessible states: keyboard operation, a visible `focus-visible` ring, `aria-invalid` for errors, and `disabled` handling.

## 4. Style with tokens only

Use the semantic Tailwind tokens defined in the stylesheet from `tailwind.css`. They switch automatically in dark mode.

| Purpose | Tokens |
| --- | --- |
| Surfaces | `bg-background`, `bg-card`, `bg-popover`, `bg-muted`, `bg-accent` |
| Text | `text-foreground`, `text-muted-foreground`, `text-card-foreground`, `text-primary-foreground` |
| Actions | `bg-primary`, `bg-secondary`, `bg-destructive` |
| Lines and focus | `border-border`, `border-input`, `ring-ring` |
| Charts and sidebar | `chart-1` to `chart-5`, `sidebar-*` |

Never use hex, rgb, or palette classes such as `bg-zinc-900` or `text-[#333]` in product UI. To re-brand, change the CSS variables (oklch values) in the stylesheet instead of overriding components.

Prefer logical properties (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`, `text-start`) so layouts work in right-to-left locales.

## 5. Agent and chat interfaces

Several agent surfaces are still on the roadmap. Before using any of them, confirm the name appears in `cubix-ui search`. Ready building blocks today include things like `attachment`, `branch`, and the standard form/overlay primitives. Do not hand-roll Conversation / Prompt Input / Thinking replacements from memory if search does not list them yet.

When an agent surface is public, handle every state: empty conversation, streaming, error, and stopped generation, not only the happy path.

## 6. Authoring registry items

To publish your own items, describe them in a source `registry.json`, then build the JSON the CLI consumes:

```bash
npx cubix-ui@latest build ./registry.json -o ./public/r
```

Each item needs a `name`, a `type` such as `registry:ui` or `registry:block`, its `files`, and accurate `dependencies` (npm packages) and `registryDependencies` (other Cubix items). Validate against `https://cubixflow.ir/schema/registry.json` and `https://cubixflow.ir/schema/registry-item.json`.

## 7. Optional: Cubix MCP

When the host supports MCP over HTTP, connect any client to the same public URL:

`https://cubixflow.ir/api/mcp`

- **Cursor** - project `.cursor/mcp.json` or `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "cubix": {
      "url": "https://cubixflow.ir/api/mcp"
    }
  }
}
```

- **Codex** - `codex mcp add cubix --url https://cubixflow.ir/api/mcp` (or `[mcp_servers.cubix]` with `url` in `~/.codex/config.toml`)
- **Claude** - `claude mcp add --transport http cubix https://cubixflow.ir/api/mcp`

Tools: `list_components`, `search_components`, `get_component`, `get_component_demo`, `get_install_command`. Prefer these for discovery, then still run `cubix-ui add` (or the command from `get_install_command`) so owned source lands correctly. Docs: https://cubixflow.ir/docs/mcp

## Reference

- Documentation: https://cubixflow.ir/docs
- MCP: https://cubixflow.ir/docs/mcp
- CLI reference: https://cubixflow.ir/docs/cli
- Components: https://cubixflow.ir/docs/components
- Theming: https://cubixflow.ir/docs/theming
- Registry: https://cubixflow.ir/docs/registry
