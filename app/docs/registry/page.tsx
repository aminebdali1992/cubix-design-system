import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/docs/code-block";
import { CodeBlockCommand } from "@/components/docs/code-block-command";
import { DocsMobileMenuTrigger } from "@/components/docs/docs-sidebar";
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
  pnpm: "pnpm dlx cubix@latest build",
  npm: "npx cubix@latest build",
  yarn: "yarn dlx cubix@latest build",
  bun: "bunx --bun cubix@latest build",
};

const addUrlCommands = {
  pnpm: "pnpm dlx cubix@latest add https://cubix.design/r/button.json",
  npm: "npx cubix@latest add https://cubix.design/r/button.json",
  yarn: "yarn dlx cubix@latest add https://cubix.design/r/button.json",
  bun: "bunx --bun cubix@latest add https://cubix.design/r/button.json",
};

const addNameCommands = {
  pnpm: "pnpm dlx cubix@latest add button",
  npm: "npx cubix@latest add button",
  yarn: "yarn dlx cubix@latest add button",
  bun: "bunx --bun cubix@latest add button",
};

const addNamespaceCommands = {
  pnpm: "pnpm dlx cubix@latest add @acme/button",
  npm: "npx cubix@latest add @acme/button",
  yarn: "yarn dlx cubix@latest add @acme/button",
  bun: "bunx --bun cubix@latest add @acme/button",
};

const viewCommands = {
  pnpm: "pnpm dlx cubix@latest view button",
  npm: "npx cubix@latest view button",
  yarn: "yarn dlx cubix@latest view button",
  bun: "bunx --bun cubix@latest view button",
};

const searchCommands = {
  pnpm: 'pnpm dlx cubix@latest search -q "dialog"',
  npm: 'npx cubix@latest search -q "dialog"',
  yarn: 'yarn dlx cubix@latest search -q "dialog"',
  bun: 'bunx --bun cubix@latest search -q "dialog"',
};

const linkClassName =
  "font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80";

export default function RegistryPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <DocsMobileMenuTrigger />
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
            Registry
          </h1>
        </div>
        <p className="text-base text-muted-foreground">
          Cubix distributes components as a flat-file registry. JSON items
          describe source files and dependencies; the CLI copies them into your
          project. You can consume the Cubix catalog or publish your own.
        </p>
      </header>

      <section className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          A registry is any HTTP endpoint that serves schema-valid JSON - a
          Next.js <code className="font-mono text-sm">public/r</code> folder, a
          static host, or your own API. The Cubix docs site itself ships the
          official catalog from{" "}
          <code className="font-mono text-sm">public/r</code>.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">Catalog</strong> -{" "}
            <code className="font-mono text-sm">index.json</code> (or{" "}
            <code className="font-mono text-sm">registry.json</code>) lists every
            item.
          </li>
          <li>
            <strong className="text-foreground">Items</strong> - one JSON file
            per component, for example{" "}
            <code className="font-mono text-sm">button.json</code>.
          </li>
          <li>
            <strong className="text-foreground">CLI</strong> -{" "}
            <code className="font-mono text-sm">cubix add</code>,{" "}
            <code className="font-mono text-sm">view</code>,{" "}
            <code className="font-mono text-sm">search</code>, and{" "}
            <code className="font-mono text-sm">build</code> speak this format.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Catalog schema
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          The catalog is the registry entry point. Cubix uses{" "}
          <code className="font-mono text-sm">
            https://cubix.design/schema/registry.json
          </code>
          :
        </p>
        <CodeBlock
          code={catalogSnippet}
          title="public/r/index.json"
          lang="json"
          collapsible
        />
        <p className="leading-relaxed text-muted-foreground">
          Required fields:{" "}
          <code className="font-mono text-sm">name</code>,{" "}
          <code className="font-mono text-sm">homepage</code>, and{" "}
          <code className="font-mono text-sm">items</code>. Each catalog entry
          points at the published item JSON the CLI will fetch.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Item schema
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Each component is a registry item. Schema:{" "}
          <code className="font-mono text-sm">
            https://cubix.design/schema/registry-item.json
          </code>
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
                <th className="px-4 py-3 text-left font-semibold">Field</th>
                <th className="px-4 py-3 text-left font-semibold">Required</th>
                <th className="px-4 py-3 text-left font-semibold">Description</th>
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
          title="public/r/date-picker.json"
          lang="json"
          collapsible
        />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Item types
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix primarily ships <code className="font-mono text-sm">registry:ui</code>{" "}
          items. The schema also supports related kinds for larger catalogs:
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-left font-semibold">Type</th>
                <th className="px-4 py-3 text-left font-semibold">Description</th>
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
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Build and serve
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Author a source{" "}
          <code className="font-mono text-sm">registry.json</code>, then generate
          static files with the CLI. Output defaults to{" "}
          <code className="font-mono text-sm">public/r</code>:
        </p>
        <CodeBlockCommand commands={buildCommands} />
        <p className="leading-relaxed text-muted-foreground">
          On Next.js, those files are served as{" "}
          <code className="font-mono text-sm">/r/button.json</code>,{" "}
          <code className="font-mono text-sm">/r/index.json</code>, and so on.
          Any host that serves static JSON works the same way. Full{" "}
          <code className="font-mono text-sm">build</code> flags are on the{" "}
          <Link href="/docs/cli" className={linkClassName}>
            CLI
          </Link>{" "}
          page.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Consume a registry
        </h2>
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
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Namespaces
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Map a short namespace to a URL template in{" "}
          <code className="font-mono text-sm">cubix.json</code>.{" "}
          <code className="font-mono text-sm">{"{name}"}</code> is replaced with
          the item id:
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
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Publish your own
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          To distribute internal components with the same CLI flow:
        </p>
        <ol className="list-decimal space-y-3 pl-6 text-muted-foreground">
          <li>
            Keep source under paths your consumers expect (Cubix uses{" "}
            <code className="font-mono text-sm">components/cubix</code>).
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
          className="list-decimal space-y-3 pl-6 text-muted-foreground"
          start={3}
        >
          <li>
            Run <code className="font-mono text-sm">cubix build</code> and
            deploy the output directory.
          </li>
          <li>
            Share the namespace URL template so teams can{" "}
            <code className="font-mono text-sm">cubix add @acme/button</code>.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Authoring guidelines
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>
            Give every item a clear{" "}
            <code className="font-mono text-sm">title</code> and{" "}
            <code className="font-mono text-sm">description</code> - humans and
            Skills both rely on them.
          </li>
          <li>
            List all npm packages in{" "}
            <code className="font-mono text-sm">dependencies</code> and all
            Cubix peers in{" "}
            <code className="font-mono text-sm">registryDependencies</code>.
          </li>
          <li>
            Set <code className="font-mono text-sm">files[].target</code> to the
            path consumers should receive after{" "}
            <code className="font-mono text-sm">add</code>.
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
            <code className="font-mono text-sm">search</code> stays accurate.
          </li>
        </ul>
        <p className="leading-relaxed text-muted-foreground">
          Next:{" "}
          <Link href="/docs/cli" className={linkClassName}>
            CLI
          </Link>
          ,{" "}
          <Link href="/docs/skills" className={linkClassName}>
            Skills
          </Link>
          , or browse{" "}
          <Link href="/docs/components" className={linkClassName}>
            Components
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
