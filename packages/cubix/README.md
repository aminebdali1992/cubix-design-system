# cubix

Official Cubix CLI.

```bash
npx cubix@latest init -t next
npx cubix@latest add button
```

## Commands

| Command | Description |
| --- | --- |
| `init` | Configure an existing app, or scaffold a new one with `-t` |
| `add` | Copy components from the registry into your project |
| `view` | Inspect registry items as JSON |
| `search` / `list` | Search the registry index |
| `build` | Embed component sources into `public/r/*.json` |
| `info` | Print project + `cubix.json` details |

## Templates

| Template | Scaffolder |
| --- | --- |
| `next` | `create-next-app` (App Router, Tailwind CSS, `@/*`) |
| `vite` | `create-vite` `react-ts`, plus Tailwind CSS v4 and the `@` alias |
| `start` | TanStack CLI (`@tanstack/cli create`) |
| `react-router` | `create-react-router` |
| `astro` | `create-astro` `with-tailwindcss` + React integration |

```bash
npx cubix@latest init -t next --src-dir
npx cubix@latest init -t start --base radix
npx cubix@latest init -t astro --name marketing -y
```

`init -t` runs the official scaffolder, then writes `cubix.json`, design tokens, and `lib/utils.ts`, and ensures the `@/*` alias. Laravel has no template: create the app with `laravel new`, then run `cubix init` in it.

## Local development

From the Cubix monorepo root:

```bash
npm install
npm run build:cli
node packages/cubix/dist/index.js --help
```
