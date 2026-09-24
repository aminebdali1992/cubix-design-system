import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ToggleDemo,
  ToggleDisabledDemo,
  ToggleOutlineDemo,
  ToggleRtlDemo,
  ToggleSizesDemo,
  ToggleTextDemo,
} from "@/components/examples/toggle-examples"

import { togglePropRows } from "./toggle-table-data"

const description = "A two-state button that can be either on or off."

export const metadata: Metadata = {
  title: "Toggle",
  description,
}

const usageImport = `import { Toggle } from "@/components/cubix/toggle"`

const usageSnippet = `<Toggle>Toggle</Toggle>`

const demoSnippet = `import { BookmarkIcon } from "lucide-react"

import { Toggle } from "@/components/cubix/toggle"

export function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
      <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
      Bookmark
    </Toggle>
  )
}`

const outlineSnippet = `<div className="flex flex-wrap items-center gap-2">
  <Toggle variant="outline" aria-label="Toggle italic">
    <ItalicIcon />
    Italic
  </Toggle>
  <Toggle variant="outline" aria-label="Toggle bold">
    <BoldIcon />
    Bold
  </Toggle>
</div>`

const textSnippet = `<Toggle aria-label="Toggle italic">
  <ItalicIcon />
  Italic
</Toggle>`

const sizesSnippet = `<div className="flex flex-wrap items-center gap-2">
  <Toggle variant="outline" aria-label="Toggle small" size="sm">
    Small
  </Toggle>
  <Toggle variant="outline" aria-label="Toggle default" size="default">
    Default
  </Toggle>
  <Toggle variant="outline" aria-label="Toggle large" size="lg">
    Large
  </Toggle>
</div>`

const disabledSnippet = `<div className="flex flex-wrap items-center gap-2">
  <Toggle aria-label="Toggle disabled" disabled>
    Disabled
  </Toggle>
  <Toggle variant="outline" aria-label="Toggle disabled outline" disabled>
    Disabled
  </Toggle>
</div>`

const rtlSnippet = `<div dir="rtl">
  <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
    <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
    Bookmark
  </Toggle>
</div>`

export default function ToggleDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Toggle"
        description={description}
        slug="toggle"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-32">
        <ToggleDemo />
      </ComponentPreview>

      <ComponentInstall name="toggle" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Outline</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">variant=&quot;outline&quot;</code>{" "}
          for an outline style.
        </p>
        <ComponentPreview code={outlineSnippet} previewClassName="min-h-32">
          <ToggleOutlineDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">With Text</h2>
        <ComponentPreview code={textSnippet} previewClassName="min-h-32">
          <ToggleTextDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Size</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="font-mono text-sm">size</code> prop to change the
          size of the toggle.
        </p>
        <ComponentPreview code={sizesSnippet} previewClassName="min-h-32">
          <ToggleSizesDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Disabled</h2>
        <ComponentPreview code={disabledSnippet} previewClassName="min-h-32">
          <ToggleDisabledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">RTL</h2>
        <p className="leading-relaxed text-muted-foreground">
          Wrap the toggle in a container with{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code> to
          mirror direction.
        </p>
        <ComponentPreview code={rtlSnippet} previewClassName="min-h-32">
          <ToggleRtlDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          See also the Base UI Toggle documentation for primitive props.
        </p>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Toggle</h3>
          <PropsTable data={togglePropRows} />
        </div>
      </section>
    </article>
  )
}
