"use client";

import { authorCatalogSnippet } from "@/app/docs/registry/registry-data";
import {
  EditorMockup,
  type MockupApi,
  type TreeRow,
} from "@/components/docs/editor-mockup";
import { getRegistryItem } from "@/components/docs/mockup-sources";

/* A Next.js project that publishes its own Cubix registry with `cubix-ui build`. */

const tree: TreeRow[] = [
  { id: "app", name: "app", depth: 0, folder: true },
  { id: "app/layout.tsx", name: "layout.tsx", depth: 1 },
  { id: "app/page.tsx", name: "page.tsx", depth: 1 },
  { id: "components", name: "components", depth: 0, folder: true },
  { id: "components/cubix", name: "cubix", depth: 1, folder: true },
  { id: "components/cubix/button.tsx", name: "button.tsx", depth: 2 },
  { id: "lib", name: "lib", depth: 0, folder: true },
  { id: "lib/utils.ts", name: "utils.ts", depth: 1 },
  { id: "public", name: "public", depth: 0, folder: true },
  { id: "public/r", name: "r", depth: 1, folder: true },
  { id: "public/r/button.json", name: "button.json", depth: 2 },
  { id: "public/r/registry.json", name: "registry.json", depth: 2 },
  { id: "package.json", name: "package.json", depth: 0 },
  { id: "registry.json", name: "registry.json", depth: 0 },
  { id: "tsconfig.json", name: "tsconfig.json", depth: 0 },
];

const startFiles = [
  "app",
  "app/layout.tsx",
  "app/page.tsx",
  "components",
  "components/cubix",
  "components/cubix/button.tsx",
  "lib",
  "lib/utils.ts",
  "public",
  "package.json",
  "registry.json",
  "tsconfig.json",
];

const initialContents: Record<string, string> = {
  "app/layout.tsx": `export default function RootLayout({
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
  "app/page.tsx": `export default function Page() {
  return <main>Acme UI registry</main>
}`,
  "components/cubix/button.tsx": "// Loading…",
  "lib/utils.ts": `import { clsx, type ClassValue } from "clsx"
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
        "description",
        "caption",
        "label",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
  "package.json": `{
  "name": "acme-ui",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "registry:build": "cubix-ui build"
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
  "registry.json": authorCatalogSnippet,
  "tsconfig.json": `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "noEmit": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`,
};

const json = (value: unknown) => JSON.stringify(value, null, 2);

async function script(api: MockupApi) {
  const item = await getRegistryItem("button");
  if (api.cancelled()) return;
  const source = item?.files?.[0]?.content ?? "";
  api.write("components/cubix/button.tsx", source);

  const target = "components/cubix/button.tsx";
  const builtItem = {
    $schema: "https://cubixflow.ir/schema/registry-item.json",
    name: "button",
    type: "registry:ui",
    title: "Button",
    description: "A simple button component.",
    dependencies: item?.dependencies ?? [],
    registryDependencies: item?.registryDependencies ?? [],
    files: [{ path: target, type: "registry:ui", target, content: source }],
  };
  const builtIndex = {
    $schema: "https://cubixflow.ir/schema/registry.json",
    name: "acme",
    homepage: "https://acme.com",
    items: [
      {
        name: "button",
        type: "registry:ui",
        title: "Button",
        description: "A simple button component.",
        dependencies: builtItem.dependencies,
        registryDependencies: builtItem.registryDependencies,
        files: [{ path: target, type: "registry:ui" }],
        bases: ["base"],
      },
    ],
  };

  // 1. the source catalog and component are already in the project
  await api.wait(900);
  api.open("components/cubix/button.tsx");
  await api.wait(1400);
  api.open("registry.json");
  await api.wait(1000);

  // 2. build
  await api.type("npx cubix-ui@latest build");
  if (api.cancelled()) return;
  await api.wait(300);
  const s1 = api.push("spinner", "Building registry items with embedded source...");
  await api.wait(1500);
  if (api.cancelled()) return;
  api.update(s1, "success", "Built 1 registry items (base) and registry.json into ./public/r");
  api.write("public/r/button.json", json(builtItem), "U");
  api.write("public/r/registry.json", json(builtIndex), "U");
  api.push("success", "Registry ready for CLI add.");
  await api.wait(500);
  api.open("public/r/button.json");
  await api.wait(1800);
  api.open("public/r/registry.json");
  await api.wait(1400);

  // 3. serve it
  await api.type("npm run dev");
  if (api.cancelled()) return;
  await api.wait(300);
  api.push("plain", "");
  api.push("plain", "> acme-ui@0.1.0 dev");
  api.push("plain", "> next dev --turbopack");
  api.push("plain", "");
  await api.wait(700);
  api.push("plain", "   ▲ Next.js 15.5.4 (Turbopack)");
  api.push("plain", "   - Local:        http://localhost:3000");
  api.push("plain", "");
  await api.wait(800);
  api.push("plain", " ✓ Ready");
}

export function RegistryBuildMockup() {
  return (
    <EditorMockup
      project="acme-ui"
      tree={tree}
      startFiles={startFiles}
      initialContents={initialContents}
      initialTabs={["app/page.tsx"]}
      script={script}
    />
  );
}
