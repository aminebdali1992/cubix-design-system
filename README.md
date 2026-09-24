# Cubix

**Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.**

Cubix is a design system you copy into your repository. Instead of installing components from `node_modules`, you own the source and can change every line.

## Features

- 🎨 **Token-based theming** - full oklch color palette (light + dark), radius and typography scales as CSS variables
- ⚛️ **React 19 + Next.js App Router** first-class support; also works with Vite, Remix and Astro
- ♿ **Accessible by default** - focus rings, ARIA states, keyboard support
- 📦 **Registry distribution** - `public/r/*.json` powers the CLI (`npx cubix@latest add button`)
- 🔤 **Geist typography** - Geist Sans + Geist Mono wired into Tailwind CSS v4

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the docs site
npm run dev
```

Open http://localhost:3000

## Install a component (consumer flow)

```bash
npx cubix@latest add button
```

This copies `components/cubix/button.tsx` into your project. You can also fetch it directly from the registry: [`public/r/button.json`](public/r/button.json).

## Project structure

```
├─ app/
│  ├─ globals.css               # Cubix design tokens (colors, radius, typography)
│  ├─ layout.tsx                # Root layout (fonts, theme provider)
│  ├─ page.tsx                  # Landing page
│  └─ docs/                     # Documentation
│     ├─ page.tsx               # Introduction
│     ├─ theming/page.tsx       # Color palette & tokens
│     ├─ typography/page.tsx    # Type scale
│     └─ components/button/     # Button docs page
├─ components/
│  ├─ cubix/                    # The design system (this is what ships)
│  │  └─ button.tsx
│  ├─ docs/                     # Docs-site chrome (preview, code block, tables)
│  └─ examples/                 # Interactive examples
├─ lib/utils.ts                 # cn() helper
├─ cubix.json                   # Cubix CLI config
└─ public/r/                    # Component registry
```

## The Button component

Variants: `default` · `secondary` · `destructive` · `outline` · `ghost` · `link`
Sizes: `default` · `sm` · `lg` · `icon` · `icon-sm` · `icon-lg`
Props: `asChild` (render a `<Link>` as a button), `loading` (spinner + `aria-busy` + disabled), `className` merge, and all native `<button>` props.

```tsx
import { Button } from "@/components/cubix/button";

<Button variant="outline" size="lg">Get started</Button>
<Button loading>Save changes</Button>
<Button asChild><Link href="/docs">Docs</Link></Button>
```

## Theming

Override the CSS variables in `app/globals.css` to re-brand the whole system:

```css
:root {
  --primary: oklch(0.55 0.2 262);
  --primary-foreground: oklch(0.98 0 0);
}
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the docs site in development |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |

## License

MIT
