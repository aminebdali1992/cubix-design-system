"use client";

import { Button } from "@/components/cubix/button";
import {
  EditorMockup,
  type MockupApi,
  type TreeRow,
} from "@/components/docs/editor-mockup";
import { getRegistryItem } from "@/components/docs/mockup-sources";

/* Updating a component that already lives in the project with `cubix-ui add`. */

const tree: TreeRow[] = [
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
  "components/cubix/button.tsx": "// Loading.",
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

const localEdit = "// Local edit: brand focus ring\n";

async function script(api: MockupApi) {
  const item = await getRegistryItem("button");
  if (api.cancelled()) return;
  const source = item?.files?.[0]?.content ?? "";
  const file = "components/cubix/button.tsx";
  api.write(file, localEdit + source);

  // 1. your copy, with a local edit
  await api.wait(900);
  api.open(file);
  await api.wait(1600);

  // 2. save local edits first
  await api.type('git commit -am "Save local edits"');
  if (api.cancelled()) return;
  await api.wait(300);
  api.push("plain", "[main 9580395] Save local edits");
  api.push("plain", " 1 file changed, 1 insertion(+)");
  await api.wait(900);

  // 3. pull the latest version from the registry
  await api.type("npx cubix-ui@latest add button");
  if (api.cancelled()) return;
  await api.wait(400);
  const q = api.push("plain", `? ${file} exists. Overwrite? \u203a (y/N)`);
  await api.wait(1200);
  if (api.cancelled()) return;
  api.update(q, "success", `${file} exists. Overwrite? \u2026 yes`);
  const s = api.push("spinner", "Adding button...");
  await api.wait(1300);
  if (api.cancelled()) return;
  api.update(s, "success", "Added button (1 file)");
  api.write(file, source, "M");
  api.open(file);
  await api.wait(1400);

  // 4. see what changed
  await api.type("git diff --stat");
  if (api.cancelled()) return;
  await api.wait(300);
  api.push("plain", ` ${file} | 1 -`);
  api.push("plain", " 1 file changed, 1 deletion(-)");
  await api.wait(1200);
  if (api.cancelled()) return;
  api.showPreview(
    "localhost:3000",
    <div dir="rtl" className="flex h-28 items-center justify-center">
      <Button>دکمه</Button>
    </div>
  );
}

export function UpgradeMockup() {
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
