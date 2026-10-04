import type { Metadata } from "next";
import Link from "next/link";
import {
  BlocksIcon,
  BookOpenIcon,
  SparklesIcon,
  TerminalIcon,
} from "lucide-react";

import { CodeBlock } from "@/components/docs/code-block";
import { siteConfig } from "@/lib/site";
import {
  DocsNextSteps,
  DocsPageHeader,
  InlineCode,
  linkClassName,
  sectionHeadingClassName,
} from "../docs-shared";

export const metadata: Metadata = {
  title: "MCP",
  description:
    "Connect Cursor, Codex, Claude, and any MCP client to the Cubix registry over Streamable HTTP - list, search, install commands, and demos.",
};

const tools = [
  {
    name: "list_components",
    body: "Every installable registry name with title, bases, and docs URL.",
  },
  {
    name: "search_components",
    body: "Find components by name, title, or description.",
  },
  {
    name: "get_component",
    body: "Install command, dependencies, files (optional source).",
  },
  {
    name: "get_component_demo",
    body: "Paste-ready docs demo with public @/components/cubix imports.",
  },
  {
    name: "get_install_command",
    body: "Exact cubix-ui add line for one or more names.",
  },
] as const;

const cursorConfig = `{
  "mcpServers": {
    "cubix": {
      "url": "${siteConfig.mcpUrl}"
    }
  }
}`;

const codexCli = `codex mcp add cubix --url ${siteConfig.mcpUrl}`;

const codexToml = `[mcp_servers.cubix]
url = "${siteConfig.mcpUrl}"`;

const claudeCli = `claude mcp add --transport http cubix ${siteConfig.mcpUrl}`;

const curlInitialize = `curl -sS -X POST ${siteConfig.mcpUrl} \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2025-03-26",
      "capabilities": {},
      "clientInfo": { "name": "curl", "version": "1.0.0" }
    }
  }'`;

export default function McpPage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="MCP"
        description="A Streamable HTTP Model Context Protocol server over the live Cubix registry - so Cursor, Codex, Claude, and other agents can list, search, and install components without scraping the docs."
      />

      <section className="space-y-4">
        <p className="border-s-2 border-foreground ps-4 font-medium text-foreground">
          One public URL for every MCP client. Pair it with the Cubix Skill for
          composition rules.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          The endpoint is public and read-only. It speaks MCP{" "}
          <InlineCode>2025-03-26</InlineCode> Streamable HTTP (JSON or SSE
          responses), backed by the same <InlineCode>public/r</InlineCode>{" "}
          catalog the{" "}
          <Link href="/docs/cli" className={linkClassName}>
            CLI
          </Link>{" "}
          uses. No API key is required for registry reads.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Endpoint: <InlineCode>{siteConfig.mcpUrl}</InlineCode>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Cursor</h2>
        <p className="leading-relaxed text-muted-foreground">
          Add a remote server in project{" "}
          <InlineCode>.cursor/mcp.json</InlineCode> or the global{" "}
          <InlineCode>~/.cursor/mcp.json</InlineCode>, then enable Cubix in
          Cursor Settings → MCP:
        </p>
        <CodeBlock code={cursorConfig} title=".cursor/mcp.json" lang="json" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Codex</h2>
        <p className="leading-relaxed text-muted-foreground">
          CLI:
        </p>
        <CodeBlock code={codexCli} title="Terminal" lang="bash" />
        <p className="leading-relaxed text-muted-foreground">
          Or in <InlineCode>~/.codex/config.toml</InlineCode> (top-level key is{" "}
          <InlineCode>mcp_servers</InlineCode>):
        </p>
        <CodeBlock code={codexToml} title="config.toml" lang="toml" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Claude</h2>
        <p className="leading-relaxed text-muted-foreground">
          Claude Code / Claude Desktop style clients:
        </p>
        <CodeBlock code={claudeCli} title="Terminal" lang="bash" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Tools</h2>
        <p className="leading-relaxed text-muted-foreground">
          Five tools wrap the public registry. Prefer{" "}
          <InlineCode>search_components</InlineCode> then{" "}
          <InlineCode>get_component_demo</InlineCode> before composing a
          screen; use <InlineCode>get_install_command</InlineCode> or the{" "}
          <InlineCode>install</InlineCode> field from{" "}
          <InlineCode>get_component</InlineCode> so the agent runs{" "}
          <InlineCode>cubix-ui add</InlineCode> instead of pasting stubs.
        </p>
        <ul className="my-6 grid list-none gap-3 ps-0 sm:grid-cols-2">
          {tools.map((tool) => (
            <li key={tool.name} className="rounded-xl border bg-card p-5">
              <h3 className="font-mono text-sm font-semibold text-foreground">
                {tool.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tool.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Protocol notes</h2>
        <ul className="list-disc space-y-2 ps-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">Client-agnostic</strong> - any
            MCP host that supports Streamable HTTP can use the same URL
            (Cursor, Codex, Claude, and others).
          </li>
          <li>
            <strong className="text-foreground">Transport</strong> - single{" "}
            <InlineCode>POST</InlineCode> endpoint.{" "}
            <InlineCode>GET</InlineCode> returns{" "}
            <InlineCode>405</InlineCode> (no long-lived SSE listen stream).
          </li>
          <li>
            <strong className="text-foreground">Responses</strong> - if{" "}
            <InlineCode>Accept</InlineCode> includes{" "}
            <InlineCode>text/event-stream</InlineCode>, the server replies with
            SSE <InlineCode>event: message</InlineCode> frames; otherwise JSON.
          </li>
          <li>
            <strong className="text-foreground">Sessions</strong> - stateless.
            No <InlineCode>Mcp-Session-Id</InlineCode> is issued.
          </li>
          <li>
            <strong className="text-foreground">Notifications</strong> -{" "}
            <InlineCode>notifications/initialized</InlineCode> and similar
            return <InlineCode>202 Accepted</InlineCode> with an empty body.
          </li>
        </ul>
        <CodeBlock code={curlInitialize} title="Terminal" lang="bash" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>With Skills</h2>
        <p className="leading-relaxed text-muted-foreground">
          MCP gives the agent live registry tools. The{" "}
          <Link href="/docs/skills" className={linkClassName}>
            Cubix Skill
          </Link>{" "}
          teaches project context (<InlineCode>cubix.json</InlineCode>), token
          rules, bases, and composition. Install both for the best results:
        </p>
        <CodeBlock
          code={`npx skills add ${siteConfig.githubRepo}\n# then connect MCP in Cursor, Codex, or Claude - see above`}
          title="Terminal"
          lang="bash"
        />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <DocsNextSteps
          steps={[
            {
              title: "Skills",
              description: "Project-aware guidance that pairs with these tools.",
              href: "/docs/skills",
              icon: SparklesIcon,
            },
            {
              title: "CLI",
              description: "The same add / search / view commands MCP wraps.",
              href: "/docs/cli",
              icon: TerminalIcon,
            },
            {
              title: "Registry",
              description: "Schemas behind public/r and the MCP catalog.",
              href: "/docs/registry",
              icon: BookOpenIcon,
            },
            {
              title: "Components",
              description: "Browse installable names in the docs.",
              href: "/docs/components",
              icon: BlocksIcon,
            },
          ]}
        />
      </section>
    </article>
  );
}
