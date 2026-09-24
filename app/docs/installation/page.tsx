import type { Metadata } from "next";
import Link from "next/link";
import { CircleAlertIcon } from "lucide-react";

import { CodeBlock } from "@/components/docs/code-block";
import { CodeBlockCommand } from "@/components/docs/code-block-command";
import { DocsMobileMenuTrigger } from "@/components/docs/docs-sidebar";
import {
  addComponentCommands,
  installDependencyCommands,
} from "@/lib/package-manager-commands";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install Cubix in a new or existing React project. Initialize tokens and utilities, pick a primitive base, then add components with the CLI.",
};

const initCommands = {
  pnpm: "pnpm dlx cubix@latest init",
  npm: "npx cubix@latest init",
  yarn: "yarn dlx cubix@latest init",
  bun: "bunx --bun cubix@latest init",
};

const addButtonCommands = addComponentCommands("button");
const addRadixCommands = addComponentCommands("button", "radix");

const coreDeps = installDependencyCommands([
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
  "lucide-react",
]);

const baseUiDeps = installDependencyCommands(["@base-ui/react"]);

const utilsSnippet = `import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display",
        "headline",
        "title",
        "lead",
        "body",
        "caption",
        "label",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

const tsconfigSnippet = `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}`;

const cubixJsonSnippet = `{
  "$schema": "https://cubix.design/schema.json",
  "style": "cubix",
  "base": "base",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/cubix",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}`;

const usageSnippet = `import { Button } from "@/components/cubix/button"

export function Example() {
  return <Button>Get started</Button>
}`;

const linkClassName =
  "font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80";

export default function InstallationPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <DocsMobileMenuTrigger />
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
            Installation
          </h1>
        </div>
        <p className="text-base text-muted-foreground">
          Set up Cubix in a new or existing React app. Initialize design tokens
          and utilities, choose a primitive backend, then add components as
          source files you own.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Requirements
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">React 18+</strong> (React 19
            recommended)
          </li>
          <li>
            <strong className="text-foreground">Tailwind CSS v4</strong>
          </li>
          <li>
            <strong className="text-foreground">TypeScript</strong> (project
            default)
          </li>
          <li>
            A path alias for{" "}
            <code className="font-mono text-sm">@/*</code> pointing at your
            project root
          </li>
        </ul>
        <div className="my-6 flex items-start gap-2 rounded-lg border bg-muted/30 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="leading-relaxed text-muted-foreground">
            Cubix works with Next.js, Vite, Remix / React Router, Astro
            islands, TanStack Start, and other React hosts. See{" "}
            <Link href="/docs" className={linkClassName}>
              Introduction
            </Link>{" "}
            for framework notes.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Initialize a project
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Run <code className="font-mono text-sm">init</code> in the root of
          your app. The CLI writes Cubix tokens into your CSS entry, creates{" "}
          <code className="font-mono text-sm">lib/utils.ts</code> with the{" "}
          <code className="font-mono text-sm">cn</code> helper, and adds a{" "}
          <code className="font-mono text-sm">cubix.json</code> config:
        </p>
        <CodeBlockCommand commands={initCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Default base is Base UI. Pass{" "}
          <code className="font-mono text-sm">--base aria</code> or{" "}
          <code className="font-mono text-sm">--base radix</code> if your team
          standardizes on React Aria or Radix UI instead.
        </p>
        <CodeBlock code={cubixJsonSnippet} title="cubix.json" lang="json" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Add a component
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Components are copied into{" "}
          <code className="font-mono text-sm">components/cubix</code> from the
          registry. Install only what you need:
        </p>
        <CodeBlockCommand commands={addButtonCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Override the project base for a single add:
        </p>
        <CodeBlockCommand commands={addRadixCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Then import from your local path:
        </p>
        <CodeBlock code={usageSnippet} title="components/example.tsx" />
        <p className="leading-relaxed text-muted-foreground">
          Full CLI reference lives on the{" "}
          <Link href="/docs/cli" className={linkClassName}>
            CLI
          </Link>{" "}
          page. Browse the catalog under{" "}
          <Link href="/docs/components" className={linkClassName}>
            Components
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Choose a base
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix keeps one visual API across three accessibility backends. Pick
          the stack that matches your product; switch per component with{" "}
          <code className="font-mono text-sm">--base</code> when needed.
        </p>
        <div className="my-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              name: "Base UI",
              flag: "base (default)",
              detail: "Default for new Cubix projects.",
            },
            {
              name: "React Aria",
              flag: "--base aria",
              detail: "When your app already centers on React Aria.",
            },
            {
              name: "Radix UI",
              flag: "--base radix",
              detail: "When you prefer Radix primitives under Cubix.",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-xl border bg-card p-5 transition-colors"
            >
              <h3 className="font-semibold">{item.name}</h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {item.flag}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Manual setup
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Prefer not to use the CLI for bootstrap? Wire the shared pieces by
          hand, then paste component files from the registry or docs Manual
          tab.
        </p>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          1. Path alias
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Ensure TypeScript (and your bundler) resolve{" "}
          <code className="font-mono text-sm">@/*</code>:
        </p>
        <CodeBlock code={tsconfigSnippet} title="tsconfig.json" lang="json" />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          2. Core dependencies
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Install the packages every Cubix component expects. Tailwind CSS v4
          should already be in the project:
        </p>
        <CodeBlockCommand commands={coreDeps} />
        <p className="leading-relaxed text-muted-foreground">
          For the default base, also install Base UI:
        </p>
        <CodeBlockCommand commands={baseUiDeps} />
        <p className="leading-relaxed text-muted-foreground">
          Other bases and individual components may need extra packages. The
          Manual install section on each component page lists them.
        </p>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          3. Utilities and tokens
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Add <code className="font-mono text-sm">lib/utils.ts</code>:
        </p>
        <CodeBlock code={utilsSnippet} title="lib/utils.ts" />
        <p className="leading-relaxed text-muted-foreground">
          Copy the Cubix design tokens (oklch light and dark palettes, radius,
          and related variables) into your global CSS entry - typically{" "}
          <code className="font-mono text-sm">app/globals.css</code>. See{" "}
          <Link href="/docs/theming" className={linkClassName}>
            Theming
          </Link>{" "}
          for the token map.
        </p>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          4. Paste a component
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Create{" "}
          <code className="font-mono text-sm">
            components/cubix/button.tsx
          </code>{" "}
          (or your chosen name), paste the source from the docs or{" "}
          <code className="font-mono text-sm">public/r/*.json</code>, install
          any listed dependencies, and fix import paths if your aliases differ.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Next steps
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>
            Browse and install from{" "}
            <Link href="/docs/components" className={linkClassName}>
              Components
            </Link>
          </li>
          <li>
            Restyle the system in{" "}
            <Link href="/docs/theming" className={linkClassName}>
              Theming
            </Link>
          </li>
          <li>
            Learn every command on the{" "}
            <Link href="/docs/cli" className={linkClassName}>
              CLI
            </Link>{" "}
            page
          </li>
        </ul>
      </section>
    </article>
  );
}
