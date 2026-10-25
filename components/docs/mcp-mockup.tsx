"use client";

import { Button } from "@/components/cubix/button";
import {
  EditorMockup,
  type MockupApi,
  type TreeRow,
} from "@/components/docs/editor-mockup";
import { getRegistryItem } from "@/components/docs/mockup-sources";

/* Connecting the Cubix MCP server in Cursor, calling a tool, then installing what it returns. */

const tree: TreeRow[] = [
  { id: ".cursor", name: ".cursor", depth: 0, folder: true },
  { id: ".cursor/mcp.json", name: "mcp.json", depth: 1 },
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

const startFiles = ["app", "app/layout.tsx", "app/page.tsx", "components", "components/cubix", "lib", "lib/utils.ts", "cubix.json", "package.json"];

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

const cursorConfig = `{
  "mcpServers": {
    "cubix": {
      "url": "https://cubixflow.ir/api/mcp"
    }
  }
}`;

const curlCommand = "curl -sS -X POST https://cubixflow.ir/api/mcp -H \"Content-Type: application/json\" -H \"Accept: application/json, text/event-stream\" -d '{\"jsonrpc\":\"2.0\",\"id\":2,\"method\":\"tools/call\",\"params\":{\"name\":\"get_install_command\",\"arguments\":{\"name\":\"button\"}}}'";

const mcpResponse = "data: {\"jsonrpc\":\"2.0\",\"id\":2,\"result\":{\"content\":[{\"type\":\"text\",\"text\":\"{\\n  \\\"names\\\": [\\n    \\\"button\\\"\\n  ],\\n  \\\"base\\\": \\\"base\\\",\\n  \\\"command\\\": \\\"npx cubix-ui@latest add button\\\",\\n  \\\"registry\\\": \\\"https://cubixflow.ir/r\\\"\\n}\"}],\"structuredContent\":{\"names\":[\"button\"],\"base\":\"base\",\"command\":\"npx cubix-ui@latest add button\",\"registry\":\"https://cubixflow.ir/r\"}}}";

async function cursorScript(api: MockupApi) {
  const item = await getRegistryItem("button");
  if (api.cancelled()) return;
  const source = item?.files?.[0]?.content ?? "";

  // 1. register the server for this project
  await api.wait(900);
  api.write(".cursor/mcp.json", "", "U");
  api.open(".cursor/mcp.json");
  await api.wait(500);
  await api.typeInEditor(".cursor/mcp.json", "", cursorConfig);
  if (api.cancelled()) return;
  await api.wait(900);

  // 3. call a tool over Streamable HTTP
  await api.type(curlCommand);
  if (api.cancelled()) return;
  await api.wait(700);
  api.push("plain", "event: message");
  api.push("plain", mcpResponse);
  await api.wait(1600);

  // 4. run the command the tool returned
  await api.type("npx cubix-ui@latest add button");
  if (api.cancelled()) return;
  await api.wait(300);
  const s = api.push("spinner", "Adding button...");
  await api.wait(1300);
  if (api.cancelled()) return;
  api.update(s, "success", "Added button (1 file)");
  api.write("components/cubix/button.tsx", source, "U");
  api.open("components/cubix/button.tsx");
  await api.wait(1200);
  if (api.cancelled()) return;
  api.showPreview(
    "localhost:3000",
    <div dir="rtl" className="flex h-28 items-center justify-center">
      <Button>دکمه</Button>
    </div>
  );
}

const mcpUrl = "https://cubixflow.ir/api/mcp";

async function codexScript(api: MockupApi) {
  await api.wait(900);
  await api.type(`codex mcp add cubix --url ${mcpUrl}`);
  if (api.cancelled()) return;
  await api.wait(500);
  api.push("plain", "Added global MCP server 'cubix'.");
  await api.wait(1000);
  await api.type("codex mcp list");
  if (api.cancelled()) return;
  await api.wait(400);
  api.push("plain", "Name   Url                           Bearer Token Env Var  Status   Auth");
  api.push("plain", `cubix  ${mcpUrl}  -                     enabled  Unsupported`);
  await api.wait(1000);
  await api.type("cat ~/.codex/config.toml");
  if (api.cancelled()) return;
  await api.wait(300);
  api.push("plain", "[mcp_servers.cubix]");
  api.push("plain", `url = "${mcpUrl}"`);
}

async function claudeScript(api: MockupApi) {
  await api.wait(900);
  await api.type(`claude mcp add --transport http cubix ${mcpUrl}`);
  if (api.cancelled()) return;
  await api.wait(600);
  api.push("plain", `Added HTTP MCP server cubix with URL: ${mcpUrl} to local config`);
  api.push("plain", "File modified: /Users/you/.claude.json [project: /Users/you/my-app]");
}

const scripts = { cursor: cursorScript, codex: codexScript, claude: claudeScript };

export function McpMockup({
  client = "cursor",
}: {
  client?: "cursor" | "codex" | "claude";
}) {
  return (
    <EditorMockup
      project="my-app"
      tree={tree}
      startFiles={startFiles}
      initialContents={baseContents}
      initialTabs={["app/page.tsx"]}
      script={scripts[client]}
    />
  );
}
