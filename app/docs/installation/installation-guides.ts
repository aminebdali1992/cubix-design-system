import type { PackageManager } from "@/lib/package-manager-commands";
import { siteConfig } from "@/lib/site";
import { frameworks } from "../frameworks";

export type CommandMap = Record<PackageManager, string>;

export type GuideBlock =
  | { type: "text"; content: string }
  | { type: "commands"; commands: CommandMap }
  | { type: "code"; title: string; lang?: string; content: string };

export type GuideStep = {
  title: string;
  description?: string;
  blocks?: GuideBlock[];
};

export type GuidePath = {
  id: string;
  label: string;
  description: string;
  steps: GuideStep[];
};

export type InstallationGuide = {
  slug: string;
  name: string;
  description: string;
  logo: string;
  paths: GuidePath[];
};

function logoFor(name: string) {
  const match = frameworks.find((item) => item.name === name);
  if (!match) {
    throw new Error(`Missing framework logo for ${name}`);
  }
  return match.logo;
}

function cmds(template: string): CommandMap {
  return {
    pnpm: template
      .replaceAll("{runner}", "pnpm dlx")
      .replaceAll("{create}", "pnpm create")
      .replaceAll("{add}", "pnpm add")
      .replaceAll("{addDev}", "pnpm add -D"),
    npm: template
      .replaceAll("{runner}", "npx")
      .replaceAll("{create}", "npm create")
      .replaceAll("{add}", "npm install")
      .replaceAll("{addDev}", "npm install -D"),
    yarn: template
      .replaceAll("{runner}", "yarn dlx")
      .replaceAll("{create}", "yarn create")
      .replaceAll("{add}", "yarn add")
      .replaceAll("{addDev}", "yarn add -D"),
    bun: template
      .replaceAll("{runner}", "bunx --bun")
      .replaceAll("{create}", "bun create")
      .replaceAll("{add}", "bun add")
      .replaceAll("{addDev}", "bun add -d"),
  };
}

const initCommands = cmds("{runner} cubix-ui@latest init");
const initNextTemplateCommands = cmds("{runner} cubix-ui@latest init -t next");
const initViteTemplateCommands = cmds("{runner} cubix-ui@latest init -t vite");
const initStartTemplateCommands = cmds("{runner} cubix-ui@latest init -t start");
const initReactRouterTemplateCommands = cmds(
  "{runner} cubix-ui@latest init -t react-router"
);
const initAstroTemplateCommands = cmds("{runner} cubix-ui@latest init -t astro");
const addButtonCommands = cmds("{runner} cubix-ui@latest add button");
const addCardCommands = cmds("{runner} cubix-ui@latest add card");

const nextUsage = `import { Button } from "@/components/cubix/button"

export default function Home() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Button>Get started</Button>
    </div>
  )
}`;

const viteUsage = `import { Button } from "@/components/cubix/button"

function App() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Button>Get started</Button>
    </div>
  )
}

export default App`;

const reactRouterUsage = `import { Button } from "@/components/cubix/button"

export default function Home() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Button>Get started</Button>
    </div>
  )
}`;

const astroUsage = `---
import "@/styles/global.css"
import { Button } from "@/components/cubix/button"
---

<div class="grid min-h-screen place-items-center">
  <Button client:load>Get started</Button>
</div>`;

const tanstackUsage = `import { Button } from "@/components/cubix/button"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Button>Get started</Button>
    </div>
  )
}`;

const laravelUsage = `import { Button } from "@/components/cubix/button"

export default function Welcome() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Button>Get started</Button>
    </div>
  )
}`;

const baseNote =
  "Default base is Base UI. Pass --base aria or --base radix if your team standardizes on React Aria or Radix UI.";

function cliTemplateSteps(options: {
  templateCommands: CommandMap;
  templateDescription: string;
  usageFile: string;
  usageCode: string;
}): GuideStep[] {
  return [
    {
      title: "Create project",
      description: options.templateDescription,
      blocks: [
        { type: "commands", commands: options.templateCommands },
        {
          type: "text",
          content: `Follow the prompts for project name and options. ${baseNote}`,
        },
      ],
    },
    {
      title: "Add a component",
      description:
        "Components are copied into your components/cubix folder as TypeScript source you own.",
      blocks: [
        { type: "commands", commands: addButtonCommands },
        {
          type: "text",
          content: "Then import from your local path:",
        },
        {
          type: "code",
          title: options.usageFile,
          content: options.usageCode,
        },
      ],
    },
  ];
}

function createThenInitSteps(options: {
  createTitle: string;
  createDescription: string;
  createCommands: CommandMap;
  createExtra?: GuideBlock[];
  setupSteps?: GuideStep[];
  usageFile: string;
  usageCode: string;
}): GuideStep[] {
  return [
    {
      title: options.createTitle,
      description: options.createDescription,
      blocks: [
        { type: "commands", commands: options.createCommands },
        ...(options.createExtra ?? []),
      ],
    },
    ...(options.setupSteps ?? []),
    {
      title: "Initialize Cubix",
      description: `Run init in the project root. It writes design tokens, creates lib/utils.ts with cn, and adds cubix.json. ${baseNote}`,
      blocks: [{ type: "commands", commands: initCommands }],
    },
    {
      title: "Add a component",
      description:
        "Components are copied into components/cubix as TypeScript source you own.",
      blocks: [
        { type: "commands", commands: addButtonCommands },
        {
          type: "text",
          content: "Then import from your local path:",
        },
        {
          type: "code",
          title: options.usageFile,
          content: options.usageCode,
        },
      ],
    },
  ];
}

function existingThenInitSteps(options: {
  setupSteps?: GuideStep[];
  usageFile: string;
  usageCode: string;
  intro?: string;
}): GuideStep[] {
  return [
    {
      title: "Open your project",
      description:
        options.intro ??
        "If you already have a React app with Tailwind CSS v4 and a @/* path alias, skip ahead to Initialize Cubix. Otherwise complete the setup steps below.",
    },
    ...(options.setupSteps ?? []),
    {
      title: "Initialize Cubix",
      description: `Run init in the project root. ${baseNote}`,
      blocks: [{ type: "commands", commands: initCommands }],
    },
    {
      title: "Add a component",
      description:
        "Install only what you need. Start with button, then browse the catalog.",
      blocks: [
        { type: "commands", commands: addButtonCommands },
        {
          type: "code",
          title: options.usageFile,
          content: options.usageCode,
        },
      ],
    },
  ];
}

const nextAliasSnippet = `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}`;

const viteTsconfigSnippet = `{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`;

const viteTsconfigAppSnippet = `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`;

const viteConfigSnippet = `import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`;

const viteCssSnippet = `@import "tailwindcss";`;

const astroTsconfigSnippet = `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`;

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

const cubixJsonSnippet = `{
  "$schema": "${siteConfig.schemaUrl}",
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

const coreDeps = cmds(
  "{add} class-variance-authority clsx tailwind-merge lucide-react"
);
const baseUiDeps = cmds("{add} @base-ui/react");

export const installationGuides: InstallationGuide[] = [
  {
    slug: "next",
    name: "Next.js",
    description:
      "Install and configure Cubix for Next.js App Router projects.",
    logo: logoFor("Next.js"),
    paths: [
      {
        id: "new",
        label: "New project",
        description:
          "Create the Next.js app yourself, then initialize Cubix.",
        steps: createThenInitSteps({
          createTitle: "Create a Next.js project",
          createDescription:
            "Use create-next-app with the recommended defaults so Tailwind CSS, the App Router, and the @/* alias are ready.",
          createCommands: cmds("{create} next-app@latest"),
          createExtra: [
            {
              type: "text",
              content:
                "Prefer a src/ directory? Pass --src-dir to create-next-app, or use `cubix-ui init -t next --src-dir`.",
            },
            {
              type: "commands",
              commands: cmds("{create} next-app@latest --src-dir"),
            },
          ],
          usageFile: "app/page.tsx",
          usageCode: nextUsage,
        }),
      },
      {
        id: "cli",
        label: "Use the CLI",
        description:
          "Scaffold a new Next.js project and configure Cubix in one flow.",
        steps: cliTemplateSteps({
          templateCommands: initNextTemplateCommands,
          templateDescription:
            "Run init with the Next.js template. Cubix scaffolds the app with create-next-app, then writes tokens, lib/utils.ts, and cubix.json.",
          usageFile: "app/page.tsx",
          usageCode: nextUsage,
        }),
      },
      {
        id: "existing",
        label: "Existing project",
        description: "Configure Cubix in an existing Next.js app.",
        steps: existingThenInitSteps({
          intro:
            "Confirm Tailwind CSS v4 is installed and your app can resolve @/*. If create-next-app already set those up, jump to Initialize Cubix.",
          setupSteps: [
            {
              title: "Configure the path alias",
              description:
                "Make sure TypeScript (and your bundler) resolve @/*:",
              blocks: [
                {
                  type: "code",
                  title: "tsconfig.json",
                  lang: "json",
                  content: nextAliasSnippet,
                },
              ],
            },
          ],
          usageFile: "app/page.tsx",
          usageCode: nextUsage,
        }),
      },
    ],
  },
  {
    slug: "vite",
    name: "Vite",
    description: "Install and configure Cubix for Vite + React.",
    logo: logoFor("Vite"),
    paths: [
      {
        id: "new",
        label: "New project",
        description: "Scaffold Vite yourself, then add Cubix.",
        steps: createThenInitSteps({
          createTitle: "Create a Vite project",
          createDescription:
            "Create the app and choose the React + TypeScript template.",
          createCommands: cmds("{create} vite@latest"),
          setupSteps: [
            {
              title: "Add Tailwind CSS",
              description:
                "Install Tailwind and the Vite plugin, then replace src/index.css:",
              blocks: [
                {
                  type: "commands",
                  commands: cmds("{add} tailwindcss @tailwindcss/vite"),
                },
                {
                  type: "code",
                  title: "src/index.css",
                  lang: "css",
                  content: viteCssSnippet,
                },
              ],
            },
            {
              title: "Configure path aliases",
              description:
                "Vite splits TypeScript config. Add the alias to both files, install @types/node, and update vite.config.ts:",
              blocks: [
                {
                  type: "code",
                  title: "tsconfig.json",
                  lang: "json",
                  content: viteTsconfigSnippet,
                },
                {
                  type: "code",
                  title: "tsconfig.app.json",
                  lang: "json",
                  content: viteTsconfigAppSnippet,
                },
                {
                  type: "commands",
                  commands: cmds("{addDev} @types/node"),
                },
                {
                  type: "code",
                  title: "vite.config.ts",
                  content: viteConfigSnippet,
                },
              ],
            },
          ],
          usageFile: "src/App.tsx",
          usageCode: viteUsage,
        }),
      },
      {
        id: "cli",
        label: "Use the CLI",
        description:
          "Scaffold Vite + React + TypeScript and configure Cubix in one flow.",
        steps: cliTemplateSteps({
          templateCommands: initViteTemplateCommands,
          templateDescription:
            "Run init with the Vite template. Cubix scaffolds the app, wires Tailwind CSS v4 and the @/* alias, then writes tokens and cubix.json.",
          usageFile: "src/App.tsx",
          usageCode: viteUsage,
        }),
      },
      {
        id: "existing",
        label: "Existing project",
        description: "Wire Tailwind and aliases, then run Cubix init.",
        steps: existingThenInitSteps({
          setupSteps: [
            {
              title: "Confirm Tailwind CSS v4",
              description:
                "Your CSS entry should import Tailwind. Cubix tokens are written into that file during init.",
              blocks: [
                {
                  type: "code",
                  title: "src/index.css",
                  lang: "css",
                  content: viteCssSnippet,
                },
              ],
            },
            {
              title: "Confirm the @ alias",
              description:
                "tsconfig, tsconfig.app.json, and vite.config.ts should all resolve @ to ./src.",
              blocks: [
                {
                  type: "code",
                  title: "vite.config.ts",
                  content: viteConfigSnippet,
                },
              ],
            },
          ],
          usageFile: "src/App.tsx",
          usageCode: viteUsage,
        }),
      },
    ],
  },
  {
    slug: "tanstack",
    name: "TanStack Start",
    description:
      "Install and configure Cubix for TanStack Start.",
    logo: logoFor("TanStack Start"),
    paths: [
      {
        id: "new",
        label: "New project",
        description: "Create a TanStack Start app, then initialize Cubix.",
        steps: createThenInitSteps({
          createTitle: "Create a TanStack Start project",
          createDescription:
            "Scaffold with the TanStack CLI, then open the generated app directory.",
          createCommands: cmds("{runner} @tanstack/cli@latest create"),
          usageFile: "src/routes/index.tsx",
          usageCode: tanstackUsage,
        }),
      },
      {
        id: "cli",
        label: "Use the CLI",
        description:
          "Scaffold a new TanStack Start project and configure Cubix in one flow.",
        steps: cliTemplateSteps({
          templateCommands: initStartTemplateCommands,
          templateDescription:
            "Run init with the TanStack Start template. Cubix scaffolds the app with the TanStack CLI, then writes tokens, lib/utils.ts, and cubix.json.",
          usageFile: "src/routes/index.tsx",
          usageCode: tanstackUsage,
        }),
      },
      {
        id: "existing",
        label: "Existing project",
        description: "Add Cubix to an existing TanStack Start app.",
        steps: existingThenInitSteps({
          intro:
            "Confirm the project uses React 18+, Tailwind CSS v4, and a working @/* alias before running init.",
          usageFile: "src/routes/index.tsx",
          usageCode: tanstackUsage,
        }),
      },
    ],
  },
  {
    slug: "laravel",
    name: "Laravel",
    description:
      "Install Cubix in a Laravel app with a React frontend (Inertia).",
    logo: logoFor("Laravel"),
    paths: [
      {
        id: "new",
        label: "New project",
        description:
          "Create Laravel with a React starter, then initialize Cubix in the frontend tree.",
        steps: [
          {
            title: "Create a Laravel app",
            description:
              "Use the Laravel installer with a React / Inertia starter (or Breeze with React). Cubix components live in your React resources tree.",
            blocks: [
              {
                type: "commands",
                commands: {
                  pnpm: "laravel new my-app",
                  npm: "laravel new my-app",
                  yarn: "laravel new my-app",
                  bun: "laravel new my-app",
                },
              },
              {
                type: "text",
                content:
                  "Choose the React + Inertia option when prompted, or install Breeze with React after create.",
              },
            ],
          },
          {
            title: "Initialize Cubix",
            description: `From the app root (where package.json and your CSS entry live), run init. ${baseNote}`,
            blocks: [{ type: "commands", commands: initCommands }],
          },
          {
            title: "Add a component",
            blocks: [
              { type: "commands", commands: addButtonCommands },
              {
                type: "code",
                title: "resources/js/pages/welcome.tsx",
                content: laravelUsage,
              },
            ],
          },
        ],
      },
      {
        id: "existing",
        label: "Existing project",
        description: "Add Cubix to an existing Laravel + React setup.",
        steps: existingThenInitSteps({
          intro:
            "Your app needs a React frontend (Inertia or similar), Tailwind CSS v4, and a path alias that resolves @/* into the JS root.",
          usageFile: "resources/js/pages/welcome.tsx",
          usageCode: laravelUsage,
        }),
      },
    ],
  },
  {
    slug: "react-router",
    name: "React Router",
    description:
      "Install and configure Cubix for React Router (including Remix-style apps).",
    logo: logoFor("React Router"),
    paths: [
      {
        id: "new",
        label: "New project",
        description: "Scaffold React Router, then initialize Cubix.",
        steps: createThenInitSteps({
          createTitle: "Create a React Router project",
          createDescription:
            "Create the app with the React Router CLI, then continue in the generated directory.",
          createCommands: cmds("{create} react-router@latest"),
          usageFile: "app/routes/home.tsx",
          usageCode: reactRouterUsage,
        }),
      },
      {
        id: "cli",
        label: "Use the CLI",
        description:
          "Scaffold a new React Router project and configure Cubix in one flow.",
        steps: cliTemplateSteps({
          templateCommands: initReactRouterTemplateCommands,
          templateDescription:
            "Run init with the React Router template. Cubix scaffolds the app, installs dependencies, adds the @/* alias next to ~/*, then writes tokens and cubix.json.",
          usageFile: "app/routes/home.tsx",
          usageCode: reactRouterUsage,
        }),
      },
      {
        id: "existing",
        label: "Existing project",
        description: "Add Cubix to an existing React Router app.",
        steps: existingThenInitSteps({
          intro:
            "React Router apps ship with a ~/* alias. cubix-ui init adds @/* pointing at the same app/ folder, so both keep working.",
          usageFile: "app/routes/home.tsx",
          usageCode: reactRouterUsage,
        }),
      },
    ],
  },
  {
    slug: "astro",
    name: "Astro",
    description:
      "Install Cubix in Astro with React islands.",
    logo: logoFor("Astro"),
    paths: [
      {
        id: "new",
        label: "New project",
        description:
          "Create Astro with Tailwind and React, then initialize Cubix.",
        steps: createThenInitSteps({
          createTitle: "Create an Astro project",
          createDescription:
            "This scaffold enables Tailwind CSS and the React integration:",
          createCommands: {
            pnpm: "pnpm create astro@latest astro-app -- --template with-tailwindcss --install --add react --git",
            npm: "npm create astro@latest astro-app -- --template with-tailwindcss --install --add react --git",
            yarn: "yarn create astro astro-app --template with-tailwindcss --install --add react --git",
            bun: "bun create astro astro-app --template with-tailwindcss --install --add react --git",
          },
          setupSteps: [
            {
              title: "Configure the path alias",
              blocks: [
                {
                  type: "code",
                  title: "tsconfig.json",
                  lang: "json",
                  content: astroTsconfigSnippet,
                },
              ],
            },
          ],
          usageFile: "src/pages/index.astro",
          usageCode: astroUsage,
        }),
      },
      {
        id: "cli",
        label: "Use the CLI",
        description:
          "Scaffold a new Astro project with React and configure Cubix in one flow.",
        steps: cliTemplateSteps({
          templateCommands: initAstroTemplateCommands,
          templateDescription:
            "Run init with the Astro template. Cubix scaffolds Astro with Tailwind CSS and the React integration, adds the @/* alias, then writes tokens and cubix.json.",
          usageFile: "src/pages/index.astro",
          usageCode: astroUsage,
        }),
      },
      {
        id: "existing",
        label: "Existing project",
        description: "Add Cubix to an Astro app that already has React islands.",
        steps: existingThenInitSteps({
          intro:
            "Confirm @astrojs/react and Tailwind CSS v4 are configured, then ensure @/* resolves to ./src/*.",
          setupSteps: [
            {
              title: "Configure the path alias",
              blocks: [
                {
                  type: "code",
                  title: "tsconfig.json",
                  lang: "json",
                  content: astroTsconfigSnippet,
                },
              ],
            },
          ],
          usageFile: "src/pages/index.astro",
          usageCode: astroUsage,
        }),
      },
    ],
  },
  {
    slug: "manual",
    name: "Manual",
    description:
      "Wire Cubix by hand in any React 18+ host with Tailwind CSS v4.",
    logo: logoFor("Manual"),
    paths: [
      {
        id: "manual",
        label: "Manual setup",
        description: "No CLI bootstrap - paste utilities, tokens, and components yourself.",
        steps: [
          {
            title: "Path alias",
            description: "Ensure TypeScript and your bundler resolve @/*:",
            blocks: [
              {
                type: "code",
                title: "tsconfig.json",
                lang: "json",
                content: nextAliasSnippet,
              },
            ],
          },
          {
            title: "Core dependencies",
            description:
              "Install the packages every Cubix component expects. Tailwind CSS v4 should already be in the project.",
            blocks: [
              { type: "commands", commands: coreDeps },
              {
                type: "text",
                content: "For the default base, also install Base UI:",
              },
              { type: "commands", commands: baseUiDeps },
            ],
          },
          {
            title: "Utilities",
            description: "Add lib/utils.ts with the cn helper:",
            blocks: [
              {
                type: "code",
                title: "lib/utils.ts",
                content: utilsSnippet,
              },
            ],
          },
          {
            title: "Design tokens",
            description:
              "Copy Cubix tokens into your global CSS entry. See Theming for the full map, or run cubix-ui init in a scratch folder and copy the generated CSS.",
            blocks: [
              {
                type: "code",
                title: "cubix.json",
                lang: "json",
                content: cubixJsonSnippet,
              },
            ],
          },
          {
            title: "Paste a component",
            description:
              "Create components/cubix/button.tsx, paste source from the docs Manual tab or public/r/button.json, install listed dependencies, and fix import paths if needed.",
            blocks: [
              { type: "commands", commands: addCardCommands },
              {
                type: "text",
                content:
                  "Prefer the CLI for adds even in a manual bootstrap - it resolves registry dependencies for you.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getInstallationGuide(slug: string) {
  return installationGuides.find((guide) => guide.slug === slug);
}

export const installationGuideSlugs = installationGuides.map(
  (guide) => guide.slug
);
