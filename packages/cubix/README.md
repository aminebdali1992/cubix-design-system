# cubix-ui

Official Cubix CLI. Scaffold a project, configure Cubix tokens, and copy registry components into your app.

```bash
npx cubix-ui@latest init -t next
npx cubix-ui@latest add button
```

Docs: https://cubixflow.ir/docs/cli

## Commands

| Command | Description |
| --- | --- |
| `init` | Configure an existing app, or scaffold a new one with `-t` |
| `add` | Copy components from the registry into your project |
| `view` | Inspect registry items as JSON |
| `search` / `list` | Search the registry index |
| `build` | Generate `public/r/*.json` and `registry.json` from a source `registry.json` |
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
npx cubix-ui@latest init -t next --src-dir
npx cubix-ui@latest init -t start --base radix
npx cubix-ui@latest init -t astro --name marketing -y
```

`init -t` runs the official scaffolder, then writes `cubix.json`, design tokens, and `lib/utils.ts`, and ensures the `@/*` alias. Laravel has no template: create the app with `laravel new`, then run `cubix-ui init` in it.

## Registry URL

The CLI reads the official catalog from `https://cubixflow.ir/r`. Override it with the `CUBIX_REGISTRY_URL` environment variable, or per project with `registries.cubix` in `cubix.json`. The environment variable wins when both are set.

```bash
CUBIX_REGISTRY_URL=https://registry.example.com/r npx cubix-ui@latest add button
```

## Contributing

Source, issues, and the contributing guide live at https://github.com/aminebdali1992/cubix-design-system.

## License

MIT
