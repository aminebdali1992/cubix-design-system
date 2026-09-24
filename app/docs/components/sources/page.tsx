import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  SourcesClosedDemo,
  SourcesControlledDemo,
  SourcesCustomLabelDemo,
  SourcesDemo,
  SourcesEmptyDemo,
  SourcesMessageDemo,
  SourcesNoFaviconDemo,
  SourcesPreviewDemo,
  SourcesSingleDemo,
} from "@/components/examples/sources-examples"

import {
  sourcePreviewPropRows,
  sourcePropRows,
  sourcesPropRows,
  sourcesTriggerPropRows,
} from "./sources-table-data"

const description =
  "Citation list for retrieved documents and grounded answer references."

export const metadata: Metadata = {
  title: "Sources",
  description,
}

const usageImport = `import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/cubix/sources"`

const usageSnippet = `<Sources count={3} defaultOpen>
  <SourcesTrigger />
  <SourcesContent>
    <Source href="https://example.com" title="Example" />
  </SourcesContent>
</Sources>`

const compositionSnippet = `Sources
├── SourcesTrigger
└── SourcesContent
    ├── Source
    └── SourcesEmpty

SourcePreview`

const demoSnippet = usageSnippet

const closedSnippet = `<Sources count={3}>
  <SourcesTrigger />
  <SourcesContent>...</SourcesContent>
</Sources>`

const singleSnippet = `<Sources count={1} defaultOpen>
  <SourcesTrigger />
  ...
</Sources>`

const emptySnippet = `<Sources count={0} defaultOpen>
  <SourcesTrigger label="0 sources" />
  <SourcesContent>
    <SourcesEmpty>...</SourcesEmpty>
  </SourcesContent>
</Sources>`

const previewSnippet = `Keep rollback ready.{" "}
<SourcePreview href="..." title="Performance API">
  [1]
</SourcePreview>`

const messageSnippet = `<Message>
  <MessageContent>
    <Bubble>...</Bubble>
    <Sources count={3} defaultOpen>...</Sources>
  </MessageContent>
</Message>`

export default function SourcesDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Sources"
        description={description}
        slug="sources"
      />

      <p className="leading-relaxed text-muted-foreground">
        <code className="font-mono text-sm">Sources</code> lists the documents
        behind a grounded answer. Use the collapsible list under a message, and{" "}
        <code className="font-mono text-sm">SourcePreview</code> for inline
        citation chips.
      </p>

      <ComponentPreview code={demoSnippet} previewClassName="min-h-56">
        <SourcesDemo />
      </ComponentPreview>

      <ComponentInstall name="sources" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Features</h2>
        <ul className="list-disc space-y-2 ps-5 text-muted-foreground">
          <li>Compact trigger with source count and chevron</li>
          <li>Citation rows with favicon, title, host, and external link</li>
          <li>Inline SourcePreview hover cards for in-text citations</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Collapsed</h2>
        <ComponentPreview code={closedSnippet} previewClassName="min-h-28">
          <SourcesClosedDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Single source
        </h2>
        <ComponentPreview code={singleSnippet} previewClassName="min-h-40">
          <SourcesSingleDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Empty</h2>
        <ComponentPreview code={emptySnippet} previewClassName="min-h-40">
          <SourcesEmptyDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Without favicons
        </h2>
        <ComponentPreview
          code={`<Source showFavicon={false} ... />`}
          previewClassName="min-h-44"
        >
          <SourcesNoFaviconDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Inline preview
        </h2>
        <ComponentPreview code={previewSnippet} previewClassName="min-h-36">
          <SourcesPreviewDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Custom label
        </h2>
        <ComponentPreview
          code={`<SourcesTrigger label="Cited references" />`}
          previewClassName="min-h-48"
        >
          <SourcesCustomLabelDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Controlled</h2>
        <ComponentPreview
          code={`<Sources open={open} onOpenChange={setOpen}>`}
          previewClassName="min-h-48"
        >
          <SourcesControlledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          In a message
        </h2>
        <ComponentPreview code={messageSnippet} previewClassName="min-h-72">
          <SourcesMessageDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <h3 className="font-medium">Sources</h3>
        <PropsTable data={sourcesPropRows} />
        <h3 className="font-medium">SourcesTrigger</h3>
        <PropsTable data={sourcesTriggerPropRows} />
        <h3 className="font-medium">Source</h3>
        <PropsTable data={sourcePropRows} />
        <h3 className="font-medium">SourcePreview</h3>
        <PropsTable data={sourcePreviewPropRows} />
      </section>
    </article>
  )
}
