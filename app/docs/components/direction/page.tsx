import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  DirectionDemo,
  DirectionHookDemo,
} from "@/components/examples/direction-examples"

import { providerPropRows, useDirectionRows } from "./direction-table-data"

const description =
  "A provider component that sets the text direction for your application."

export const metadata: Metadata = {
  title: "Direction",
  description,
}

const usageImport = `import { DirectionProvider } from "@/components/cubix/direction"`

const usageSnippet = `<html dir="rtl">
  <body>
    <DirectionProvider direction="rtl">
      {/* Your app content */}
    </DirectionProvider>
  </body>
</html>`

const demoSnippet = `const [direction, setDirection] = React.useState<"ltr" | "rtl">("rtl")

return (
  <div dir={direction}>
    <DirectionProvider direction={direction}>
      <Slider defaultValue={[40]} max={100} step={1} />
    </DirectionProvider>
  </div>
)`

const hookImport = `import { useDirection } from "@/components/cubix/direction"`

const hookSnippet = `function MyComponent() {
  const direction = useDirection()
  return <div>Current direction: {direction}</div>
}`

export default function DirectionDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Direction"
        description={description}
        slug="direction"
      />

      <p className="leading-relaxed text-muted-foreground">
        The{" "}
        <code className="font-mono text-sm">DirectionProvider</code> component
        sets the text direction (<code className="font-mono text-sm">ltr</code>{" "}
        or <code className="font-mono text-sm">rtl</code>) for Cubix primitives.
        This is essential for right-to-left languages like Arabic, Hebrew, and
        Persian. Pair it with{" "}
        <code className="font-mono text-sm">dir=&quot;rtl&quot;</code> on{" "}
        <code className="font-mono text-sm">html</code> (or a wrapping container)
        so CSS logical properties also flip.
      </p>

      <ComponentPreview code={demoSnippet} previewClassName="min-h-72">
        <DirectionDemo />
      </ComponentPreview>

      <ComponentInstall name="direction" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          useDirection
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          The{" "}
          <code className="font-mono text-sm">useDirection</code> hook returns
          the current direction from the nearest provider. Useful for portaled
          UI that renders outside your app root.
        </p>
        <CodeBlock code={hookImport} title="Import" />
        <CodeBlock code={hookSnippet} title="Example" />
        <ComponentPreview code={hookSnippet} previewClassName="min-h-32">
          <DirectionHookDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            DirectionProvider
          </h3>
          <PropsTable data={providerPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            useDirection
          </h3>
          <PropsTable data={useDirectionRows} />
        </div>
      </section>
    </article>
  )
}
