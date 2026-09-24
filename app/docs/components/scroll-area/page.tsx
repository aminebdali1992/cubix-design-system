import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ScrollAreaDemo,
  ScrollAreaHorizontalDemo,
} from "@/components/examples/scroll-area-examples"

import {
  scrollAreaPropRows,
  scrollBarPropRows,
} from "./scroll-area-table-data"

const description =
  "Augments native scroll functionality for custom, cross-browser styling."

export const metadata: Metadata = {
  title: "Scroll Area",
  description,
}

const usageImport = `import { ScrollArea, ScrollBar } from "@/components/cubix/scroll-area"`

const usageSnippet = `<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  Your scrollable content here.
</ScrollArea>`

const compositionSnippet = `ScrollArea
└── ScrollBar`

const demoSnippet = `<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="flex flex-col gap-2 p-4">
    <h4 className="mb-2 text-sm leading-none font-medium">Tags</h4>
    {Array.from({ length: 50 }).map((_, index) => (
      <div key={index} className="h-8 w-full rounded-md bg-muted" />
    ))}
  </div>
</ScrollArea>`

const horizontalSnippet = `<ScrollArea className="w-96 rounded-md border whitespace-nowrap">
  <div className="flex w-max space-x-4 p-4">
    {works.map((artwork) => (
      <figure key={artwork.artist} className="shrink-0">
        <div className="aspect-square w-[150px] rounded-md bg-muted" />
        <figcaption className="pt-2 text-xs text-muted-foreground">
          Photo by{" "}
          <span className="font-semibold text-foreground">
            {artwork.artist}
          </span>
        </figcaption>
      </figure>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`

export default function ScrollAreaDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Scroll Area"
        description={description}
        slug="scroll-area"
      />

      <ComponentPreview code={demoSnippet} previewClassName="h-96">
        <ScrollAreaDemo />
      </ComponentPreview>

      <ComponentInstall name="scroll-area" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build a{" "}
          <code className="font-mono text-sm">ScrollArea</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Horizontal
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">ScrollBar</code> with{" "}
          <code className="font-mono text-sm">
            orientation=&quot;horizontal&quot;
          </code>{" "}
          for horizontal scrolling.
        </p>
        <ComponentPreview code={horizontalSnippet} previewClassName="min-h-80">
          <ScrollAreaHorizontalDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          See also the Base UI Scroll Area documentation for primitive props.
        </p>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ScrollArea
          </h3>
          <PropsTable data={scrollAreaPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ScrollBar
          </h3>
          <PropsTable data={scrollBarPropRows} />
        </div>
      </section>
    </article>
  )
}
