import type { Metadata } from "next"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { AspectRatio } from "./docs-aspect-ratio"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { aspectRatioPropRows } from "./aspect-ratio-table-data"

export const metadata: Metadata = {
  title: "Aspect Ratio",
  description: "Displays content within a desired ratio.",
}

const usageImport = `import { AspectRatio } from "@/components/cubix/aspect-ratio"`

const shapeMarkup = `<div className="absolute inset-0 rounded-md bg-muted-foreground/25" />`

const usageSnippet = `<AspectRatio ratio={16 / 9}>
  ${shapeMarkup}
</AspectRatio>`

const squareSnippet = `<AspectRatio ratio={1 / 1}>
  ${shapeMarkup}
</AspectRatio>`

const portraitSnippet = `<AspectRatio ratio={9 / 16}>
  ${shapeMarkup}
</AspectRatio>`

function PreviewShape() {
  return <div className="absolute inset-0 rounded-md bg-muted-foreground/25" />
}

export default function AspectRatioPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Aspect Ratio"
        description="Displays content within a desired ratio."
        slug="aspect-ratio"
      />

      <ComponentPreview code={usageSnippet}>
        <div className="w-full max-w-sm">
          <AspectRatio ratio={16 / 9}>
            <PreviewShape />
          </AspectRatio>
        </div>
      </ComponentPreview>

      <ComponentInstall name="aspect-ratio" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Square</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">ratio={"{1 / 1}"}</code>{" "}
            for a square frame. This is useful for avatars and thumbnails.
          </p>
          <ComponentPreview code={squareSnippet}>
            <div className="w-full max-w-xs">
              <AspectRatio ratio={1 / 1}>
                <PreviewShape />
              </AspectRatio>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Portrait</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">ratio={"{9 / 16}"}</code>{" "}
            for a portrait frame. This is useful for stories and mobile
            previews.
          </p>
          <ComponentPreview code={portraitSnippet}>
            <div className="w-full max-w-[180px]">
              <AspectRatio ratio={9 / 16}>
                <PreviewShape />
              </AspectRatio>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Position the inner
            shape with <code className="font-mono">absolute inset-0</code> so it
            fills the ratio box.
          </p>
        </div>
        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AspectRatio
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          A container that keeps a constant width-to-height ratio.
        </p>
        <PropsTable data={aspectRatioPropRows} />
      </section>
    </article>
  )
}
