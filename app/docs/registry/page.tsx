import type { Metadata } from "next";
import Link from "next/link";
import {
  BlocksIcon,
  SparklesIcon,
  TerminalIcon,
  WaypointsIcon,
} from "lucide-react";

import { CodeBlock } from "@/components/docs/code-block";
import { CodeBlockCommand } from "@/components/docs/code-block-command";
import { siteConfig } from "@/lib/site";
import {
  DocsNextSteps,
  DocsPageHeader,
  InlineCode,
  linkClassName,
  sectionHeadingClassName,
} from "../docs-shared";
import {
  authorCatalogSnippet,
  catalogSnippet,
  itemFields,
  itemSnippet,
  itemTypes,
  itemWithDepsSnippet,
  namespaceCubixSnippet,
  namespaceCustomSnippet,
} from "./registry-data";

export const metadata: Metadata = {
  title: "Registry",
  description:
    "Distribute Cubix components with a flat-file registry. Learn the catalog schema, item format, build output, and how to publish your own.",
};

const buildCommands = {
  pnpm: "pnpm dlx cubix-ui@latest build",
  npm: "npx cubix-ui@latest build",
  yarn: "yarn dlx cubix-ui@latest build",
  bun: "bunx --bun cubix-ui@latest build",
};

const addUrlCommands = {
  pnpm: `pnpm dlx cubix-ui@latest add ${siteConfig.registryUrl}/button.json`,
  npm: `npx cubix-ui@latest add ${siteConfig.registryUrl}/button.json`,
  yarn: `yarn dlx cubix-ui@latest add ${siteConfig.registryUrl}/button.json`,
  bun: `bunx --bun cubix-ui@latest add ${siteConfig.registryUrl}/button.json`,
};

const addNameCommands = {
  pnpm: "pnpm dlx cubix-ui@latest add button",
  npm: "npx cubix-ui@latest add button",
  yarn: "yarn dlx cubix-ui@latest add button",
  bun: "bunx --bun cubix-ui@latest add button",
};

const addNamespaceCommands = {
  pnpm: "pnpm dlx cubix-ui@latest add @acme/button",
  npm: "npx cubix-ui@latest add @acme/button",
  yarn: "yarn dlx cubix-ui@latest add @acme/button",
  bun: "bunx --bun cubix-ui@latest add @acme/button",
};

const viewCommands = {
  pnpm: "pnpm dlx cubix-ui@latest view button",
  npm: "npx cubix-ui@latest view button",
  yarn: "yarn dlx cubix-ui@latest view button",
  bun: "bunx --bun cubix-ui@latest view button",
};

const searchCommands = {
  pnpm: 'pnpm dlx cubix-ui@latest search -q "dialog"',
  npm: 'npx cubix-ui@latest search -q "dialog"',
  yarn: 'yarn dlx cubix-ui@latest search -q "dialog"',
  bun: 'bunx --bun cubix-ui@latest search -q "dialog"',
};

export default function RegistryPage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="Registry"
        description="Cubix distributes components as a flat-file registry. JSON items describe source files and dependencies; the CLI copies them into your project. You can consume the Cubix catalog or publish your own."
      />

      <section className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          A registry is any HTTP endpoint that serves schema-valid JSON - a
          Next.js <InlineCode>public/r</InlineCode> folder, a static host, or
          your own API. The Cubix docs site itself ships the official catalog
          from <InlineCode>public/r</InlineCode>.
        </p>
        <ul className="list-disc space-y-2 ps-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">Catalog</strong> -{" "}
            <InlineCode>registry.json</InlineCode> lists every item.
          </li>
          <li>
            <strong className="text-foreground">Items</strong> - one JSON file
            per component, for example <InlineCode>button.json</InlineCode>.
          </li>
          <li>
            <strong className="text-foreground">CLI</strong> -{" "}
            <InlineCode>cubix-ui add</InlineCode>, <InlineCode>view</InlineCode>,{" "}
            <InlineCode>search</InlineCode>, and{" "}
            <InlineCode>build</InlineCode> speak this format.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Catalog schema</h2>
        <p className="leading-relaxed text-muted-foreground">
          The catalog is the registry entry point. Cubix uses{" "}
          <InlineCode>{siteConfig.registrySchemaUrl}</InlineCode>:
        </p>
        <CodeBlock
          code={catalogSnippet}
          title="public/r/registry.json"
          lang="json"
          collapsible
        />
        <p className="leading-relaxed text-muted-foreground">
          Required fields: <InlineCode>name</InlineCode> and{" "}
          <InlineCode>items</InlineCode>. Each catalog entry summarizes one
          item; the CLI fetches the full item, source included, from{" "}
          <InlineCode>/r/[name].json</InlineCode>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Item schema</h2>
        <p className="leading-relaxed text-muted-foreground">
          Each component is a registry item. Schema:{" "}
          <InlineCode>
            {siteConfig.registryItemSchemaUrl}
          </InlineCode>
          .
        </p>
        <CodeBlock
          code={itemSnippet}
          title="public/r/button.json"
          lang="json"
          collapsible
        />
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-start font-semibold">Field</th>
                <th className="px-4 py-3 text-start font-semibold">Required</th>
                <th className="px-4 py-3 text-start font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {itemFields.map((field) => (
                <tr key={field.name} className="border-b last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-foreground">
                    {field.name}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {field.required ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {field.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="leading-relaxed text-muted-foreground">
          When an item needs other Cubix pieces and npm packages, list both:
        </p>
        <CodeBlock
          code={itemWithDepsSnippet}
          title="public/r/calendar.json"
          lang="json"
          collapsible
        />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Item types</h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix primarily ships <InlineCode>registry:ui</InlineCode> items. The
          schema also supports related kinds for larger catalogs:
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-start font-semibold">Type</th>
                <th className="px-4 py-3 text-start font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {itemTypes.map((row) => (
                <tr key={row.type} className="border-b last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-foreground">
                    {row.type}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Build and serve</h2>
        <p className="leading-relaxed text-muted-foreground">
          Author a source <InlineCode>registry.json</InlineCode>, then generate
          static files with the CLI. Output defaults to{" "}
          <InlineCode>public/r</InlineCode>:
        </p>
        <CodeBlockCommand commands={buildCommands} />
        <p className="leading-relaxed text-muted-foreground">
          On Next.js, those files are served as{" "}
          <InlineCode>/r/button.json</InlineCode>,{" "}
          <InlineCode>/r/registry.json</InlineCode>, and so on. Any host that
          serves static JSON works the same way. Full{" "}
          <InlineCode>build</InlineCode> flags are on the{" "}
          <Link href="/docs/cli" className={linkClassName}>
            CLI
          </Link>{" "}
          page.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Consume a registry</h2>
        <p className="leading-relaxed text-muted-foreground">
          After{" "}
          <Link href="/docs/installation" className={linkClassName}>
            Installation
          </Link>
          , add components by name from the configured Cubix registry:
        </p>
        <CodeBlockCommand commands={addNameCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Or pass a full item URL:
        </p>
        <CodeBlockCommand commands={addUrlCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Inspect before install:
        </p>
        <CodeBlockCommand commands={viewCommands} />
        <CodeBlockCommand commands={searchCommands} />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Namespaces</h2>
        <p className="leading-relaxed text-muted-foreground">
          Map a short namespace to a URL template in{" "}
          <InlineCode>cubix.json</InlineCode>.{" "}
          <InlineCode>{"{name}"}</InlineCode> is replaced with the item id:
        </p>
        <CodeBlock
          code={namespaceCubixSnippet}
          title="cubix.json"
          lang="json"
        />
        <p className="leading-relaxed text-muted-foreground">
          Custom registries work the same way:
        </p>
        <CodeBlock
          code={namespaceCustomSnippet}
          title="cubix.json"
          lang="json"
        />
        <CodeBlockCommand commands={addNamespaceCommands} />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Publish your own</h2>
        <p className="leading-relaxed text-muted-foreground">
          To distribute internal components with the same CLI flow:
        </p>
        <ol className="list-decimal space-y-3 ps-6 text-muted-foreground">
          <li>
            Keep source under paths your consumers expect (Cubix uses{" "}
            <InlineCode>components/cubix</InlineCode>).
          </li>
          <li>
            Define a root catalog that conforms to the Cubix registry schema:
          </li>
        </ol>
        <CodeBlock
          code={authorCatalogSnippet}
          title="registry.json"
          lang="json"
          collapsible
        />
        <ol
          className="list-decimal space-y-3 ps-6 text-muted-foreground"
          start={3}
        >
          <li>
            Run <InlineCode>cubix-ui build</InlineCode> and deploy the output
            directory.
          </li>
          <li>
            Share the namespace URL template so teams can{" "}
            <InlineCode>cubix-ui add @acme/button</InlineCode>.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Authoring guidelines</h2>
        <ul className="list-disc space-y-2 ps-6 text-muted-foreground">
          <li>
            Give every item a clear <InlineCode>title</InlineCode> and{" "}
            <InlineCode>description</InlineCode> - humans and Skills both rely
            on them.
          </li>
          <li>
            List all npm packages in <InlineCode>dependencies</InlineCode> and
            all Cubix peers in <InlineCode>registryDependencies</InlineCode>.
          </li>
          <li>
            Set <InlineCode>files[].target</InlineCode> to the path consumers
            should receive after <InlineCode>add</InlineCode>.
          </li>
          <li>
            Keep the visual API aligned across Base UI, React Aria, and Radix
            when you publish base variants.
          </li>
          <li>
            Prefer Cubix tokens only - never ship hardcoded brand colors in
            registry source.
          </li>
          <li>
            Update the catalog whenever you add or rename an item so{" "}
            <InlineCode>search</InlineCode> stays accurate.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <DocsNextSteps
          steps={[
            {
              title: "CLI",
              description: "build, add, view, and search against a registry.",
              href: "/docs/cli",
              icon: TerminalIcon,
            },
            {
              title: "MCP",
              description: "HTTP tools that read this registry for agents.",
              href: "/docs/mcp",
              icon: WaypointsIcon,
            },
            {
              title: "Skills",
              description: "Teach assistants your registry schemas and rules.",
              href: "/docs/skills",
              icon: SparklesIcon,
            },
            {
              title: "Components",
              description: "See the official Cubix catalog today.",
              href: "/docs/components",
              icon: BlocksIcon,
            },
          ]}
        />
      </section>
    </article>
  );
}
