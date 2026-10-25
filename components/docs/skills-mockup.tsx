"use client";

import {
  EditorMockup,
  type MockupApi,
  type TreeRow,
} from "@/components/docs/editor-mockup";

/* Installing the Cubix agent skill with the Skills CLI (real output, run in a Next.js app). */

const tree: TreeRow[] = [
  { id: ".agents", name: ".agents", depth: 0, folder: true },
  { id: ".agents/skills", name: "skills", depth: 1, folder: true },
  { id: ".agents/skills/cubix", name: "cubix", depth: 2, folder: true },
  { id: ".agents/skills/cubix/SKILL.md", name: "SKILL.md", depth: 3 },
  { id: ".claude", name: ".claude", depth: 0, folder: true },
  { id: ".claude/skills", name: "skills", depth: 1, folder: true },
  { id: ".claude/skills/cubix", name: "cubix", depth: 2, folder: true },
  { id: ".claude/skills/cubix/SKILL.md", name: "SKILL.md", depth: 3 },
  { id: "app", name: "app", depth: 0, folder: true },
  { id: "app/layout.tsx", name: "layout.tsx", depth: 1 },
  { id: "app/page.tsx", name: "page.tsx", depth: 1 },
  { id: "components", name: "components", depth: 0, folder: true },
  { id: "components/cubix", name: "cubix", depth: 1, folder: true },
  { id: "components/cubix/button.tsx", name: "button.tsx", depth: 2 },
  { id: "lib", name: "lib", depth: 0, folder: true },
  { id: "lib/utils.ts", name: "utils.ts", depth: 1 },
  { id: "cubix.json", name: "cubix.json", depth: 0 },
  { id: "package.json", name: "package.json", depth: 0 },
  { id: "skills-lock.json", name: "skills-lock.json", depth: 0 },
];

const startFiles = ["app", "app/layout.tsx", "app/page.tsx", "components", "components/cubix", "lib", "lib/utils.ts", "cubix.json", "package.json", "components/cubix/button.tsx"];

const baseContents: Record<string, string> = {
  "app/layout.tsx": `import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}`,
  "app/page.tsx": `import { Button } from "@/components/cubix/button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Button>دکمه</Button>
    </main>
  );
}`,
  "components/cubix/button.tsx": "// Installed with cubix-ui add button",
  "lib/utils.ts": `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
  "cubix.json": `{
  "$schema": "https://cubixflow.ir/schema.json",
  "style": "cubix",
  "base": "base",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "app/globals.css",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "ui": "@/components/cubix",
    "utils": "@/lib/utils"
  }
}`,
  "package.json": `{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start"
  },
  "dependencies": {
    "@base-ui/react": "^1.8.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.545.0",
    "next": "15.5.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "tailwind-merge": "^3.3.1"
  }
}`,
};

const skillMd = "---\nname: cubix\ndescription: Build UI with Cubix, the copy-paste React component registry. Use when the project has a cubix.json, imports from components/cubix, or the user asks to add, compose, theme, or publish Cubix components, blocks, or registry items with the cubix-ui CLI.\n---\n\n# Cubix\n\nCubix components are source files the project owns. They are copied into the app by the `cubix-ui` CLI from the registry at `https://cubixflow.ir/r`, then edited like any other code. Never install Cubix components from npm and never hand-write a component that the registry already provides.\n\nPublic readiness contract: a component is installable only when it has Base UI, React Aria, and Radix UI sources, docs, and a registry entry. If `cubix-ui search` does not list a name, or `add` returns 404, it is on the roadmap - do not invent a stub and do not paste unfinished source from the monorepo.\n\n## 1. Read project context first\n\nBefore generating UI, resolve the project configuration:\n\n```bash\nnpx cubix-ui@latest info --json\n```\n\nIf the CLI is unavailable, read `cubix.json` at the project root. The fields that matter:\n\n| Field | Use it for |\n| --- | --- |\n| `base` | Primitive backend: `base` (Base UI), `radix` (Radix UI), or `aria` (React Aria). Never mix bases in one project. |\n| `aliases.ui` | Import path for components, usually `@/components/cubix`. |\n| `aliases.utils` | Import path for `cn()`, usually `@/lib/utils`. |\n| `tailwind.css` | The global stylesheet that holds the design tokens. |\n| `rsc` | When `true` (Next.js App Router), add `\"use client\"` only to files that use hooks, state, or event handlers. |\n| `iconLibrary` | Icon package to import from, usually `lucide-react`. |\n\nIf there is no `cubix.json`, initialize the project before adding anything (see section 2).\n\n## 2. Use the CLI, not hand-written copies\n\n```bash\n# Existing app: configure tokens, cubix.json, and lib/utils.ts\nnpx cubix-ui@latest init\n\n# New app: scaffold a framework, then configure Cubix\nnpx cubix-ui@latest init -t next      # also: vite, start, react-router, astro\nnpx cubix-ui@latest init -t next --base radix\n\n# Discover before you build\nnpx cubix-ui@latest search -q dialog\nnpx cubix-ui@latest view dialog\n\n# Add components (dependencies and registry dependencies are resolved)\nnpx cubix-ui@latest add button dialog select\nnpx cubix-ui@latest add button --base aria\nnpx cubix-ui@latest add button --dry-run\nnpx cubix-ui@latest add button --overwrite\n```\n\nRules:\n\n- Search the registry before creating a new component. Only add names that search returns.\n- Prefer Text Field / Email Field / Phone Field over a generic Input when those are what the registry publishes.\n- Respect the package manager already used by the project (`pnpm dlx`, `yarn dlx`, `bunx --bun`, or `npx`).\n- Use `--base` only when the user explicitly wants a different base than `cubix.json`.\n- Use `--dry-run` to preview when files may already exist, and `--overwrite` only with the user's consent, because it replaces local edits.\n\n## 3. Compose components correctly\n\nImport from the `ui` alias with named exports:\n\n```tsx\nimport { Button } from \"@/components/cubix/button\"\nimport { Field, FieldLabel, FieldDescription } from \"@/components/cubix/field\"\nimport { Input } from \"@/components/cubix/input\"\n```\n\nEvery base exposes the same visual API. To render a component as another element, pass `render` and set `nativeButton={false}` when the target is not a `<button>`:\n\n```tsx\nimport Link from \"next/link\"\n\n<Button nativeButton={false} render={<Link href=\"/docs\" />}>\n  Read the docs\n</Button>\n```\n\nOn the Radix base, `asChild` is also accepted. Prefer `render` so code stays portable across bases.\n\nConventions every Cubix part follows, and that new code must follow too:\n\n- A `data-slot` attribute on every part, for example `data-slot=\"card-header\"`.\n- `className` merged through `cn()` from the `utils` alias.\n- Visual variants defined with `cva` and exported next to the component.\n- Accessible states: keyboard operation, a visible `focus-visible` ring, `aria-invalid` for errors, and `disabled` handling.\n\n## 4. Style with tokens only\n\nUse the semantic Tailwind tokens defined in the stylesheet from `tailwind.css`. They switch automatically in dark mode.\n\n| Purpose | Tokens |\n| --- | --- |\n| Surfaces | `bg-background`, `bg-card`, `bg-popover`, `bg-muted`, `bg-accent` |\n| Text | `text-foreground`, `text-muted-foreground`, `text-card-foreground`, `text-primary-foreground` |\n| Actions | `bg-primary`, `bg-secondary`, `bg-destructive` |\n| Lines and focus | `border-border`, `border-input`, `ring-ring` |\n| Charts and sidebar | `chart-1` to `chart-5`, `sidebar-*` |\n\nNever use hex, rgb, or palette classes such as `bg-zinc-900` or `text-[#333]` in product UI. To re-brand, change the CSS variables (oklch values) in the stylesheet instead of overriding components.\n\nPrefer logical properties (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`, `text-start`) so layouts work in right-to-left locales.\n\n## 5. Agent and chat interfaces\n\nSeveral agent surfaces are still on the roadmap. Before using any of them, confirm the name appears in `cubix-ui search`. Ready building blocks today include things like `attachment`, `branch`, and the standard form/overlay primitives. Do not hand-roll Conversation / Prompt Input / Thinking replacements from memory if search does not list them yet.\n\nWhen an agent surface is public, handle every state: empty conversation, streaming, error, and stopped generation, not only the happy path.\n\n## 6. Authoring registry items\n\nTo publish your own items, describe them in a source `registry.json`, then build the JSON the CLI consumes:\n\n```bash\nnpx cubix-ui@latest build ./registry.json -o ./public/r\n```\n\nEach item needs a `name`, a `type` such as `registry:ui` or `registry:block`, its `files`, and accurate `dependencies` (npm packages) and `registryDependencies` (other Cubix items). Validate against `https://cubixflow.ir/schema/registry.json` and `https://cubixflow.ir/schema/registry-item.json`.\n\n## 7. Optional: Cubix MCP\n\nWhen the host supports MCP over HTTP, connect any client to the same public URL:\n\n`https://cubixflow.ir/api/mcp`\n\n- **Cursor** - project `.cursor/mcp.json` or `~/.cursor/mcp.json`:\n\n```json\n{\n  \"mcpServers\": {\n    \"cubix\": {\n      \"url\": \"https://cubixflow.ir/api/mcp\"\n    }\n  }\n}\n```\n\n- **Codex** - `codex mcp add cubix --url https://cubixflow.ir/api/mcp` (or `[mcp_servers.cubix]` with `url` in `~/.codex/config.toml`)\n- **Claude** - `claude mcp add --transport http cubix https://cubixflow.ir/api/mcp`\n\nTools: `list_components`, `search_components`, `get_component`, `get_component_demo`, `get_install_command`. Prefer these for discovery, then still run `cubix-ui add` (or the command from `get_install_command`) so owned source lands correctly. Docs: https://cubixflow.ir/docs/mcp\n\n## Reference\n\n- Documentation: https://cubixflow.ir/docs\n- MCP: https://cubixflow.ir/docs/mcp\n- CLI reference: https://cubixflow.ir/docs/cli\n- Components: https://cubixflow.ir/docs/components\n- Theming: https://cubixflow.ir/docs/theming\n- Registry: https://cubixflow.ir/docs/registry\n";

const skillsLock = "{\n  \"version\": 1,\n  \"skills\": {\n    \"cubix\": {\n      \"source\": \"aminebdali1992/cubix-design-system\",\n      \"sourceType\": \"github\",\n      \"skillPath\": \"skills/cubix/SKILL.md\",\n      \"computedHash\": \"d24f88b39a102648fc93e321a887f024379030281680cd48b1fb988d6444d421\"\n    }\n  }\n}";

async function script(api: MockupApi) {
  await api.wait(900);
  api.open("cubix.json");
  await api.wait(1200);

  await api.type("npx skills add aminebdali1992/cubix-design-system");
  if (api.cancelled()) return;
  await api.wait(400);
  api.push("plain", "\u250c   skills");
  api.push("plain", "\u25c7  Source: https://github.com/aminebdali1992/cubix-design-system.git");
  const c = api.push("spinner", "Cloning repository\u2026");
  await api.wait(1500);
  if (api.cancelled()) return;
  api.update(c, "plain", "\u25c7  Repository cloned");
  await api.wait(300);
  api.push("plain", "\u25c7  Found 1 skill");
  api.push("plain", "\u25cf  Skill: cubix");
  api.push("dim", "   Build UI with Cubix, the copy-paste React component registry.");
  api.push("plain", "\u25c7  73 agents");
  api.push("plain", "\u25cf  Installing to: Claude Code");
  await api.wait(700);
  const scope = api.push("plain", "\u25c6  Installation scope  \u25cf Project  \u25cb Global");
  await api.wait(1100);
  if (api.cancelled()) return;
  api.update(scope, "plain", "\u25c7  Installation scope: Project");
  const method = api.push("plain", "\u25c6  Installation method  \u25cf Symlink (Recommended)  \u25cb Copy to all agents");
  await api.wait(1100);
  if (api.cancelled()) return;
  api.update(method, "plain", "\u25c7  Installation method: Symlink (Recommended)");
  api.push("plain", "\u25c7  Installation Summary");
  api.push("plain", "   ./.agents/skills/cubix");
  api.push("dim", "     universal: Amp, Antigravity, Antigravity CLI, Cline, Codex +12 more");
  api.push("dim", "     symlink \u2192 Claude Code");
  api.push("plain", "\u25c7  Security Risk Assessments");
  api.push("dim", "   cubix  Gen: Safe  Socket: 0 alerts  Snyk: Med Risk");
  await api.wait(800);
  const go = api.push("plain", "\u25c6  Proceed with installation?  \u25cf Yes / \u25cb No");
  await api.wait(1100);
  if (api.cancelled()) return;
  api.update(go, "plain", "\u25c7  Proceed with installation? Yes");
  await api.wait(500);
  api.write(".agents/skills/cubix/SKILL.md", skillMd, "U");
  api.write(".claude/skills/cubix/SKILL.md", skillMd, "U");
  api.write("skills-lock.json", skillsLock, "U");
  api.push("plain", "\u25c7  Installation complete");
  api.push("success", "./.agents/skills/cubix");
  api.push("dim", "   symlinked: Claude Code");
  api.push("plain", "\u2514  Done!  Review skills before use; they run with full agent permissions.");
  await api.wait(700);
  api.open(".agents/skills/cubix/SKILL.md");
  await api.wait(2200);
  api.open("skills-lock.json");
}

export function SkillsMockup() {
  return (
    <EditorMockup
      project="my-app"
      tree={tree}
      startFiles={startFiles}
      initialContents={baseContents}
      initialTabs={["app/page.tsx"]}
      script={script}
    />
  );
}
