import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ToggleGroupCustomDemo,
  ToggleGroupDemo,
  ToggleGroupDisabledDemo,
  ToggleGroupOutlineDemo,
  ToggleGroupRtlDemo,
  ToggleGroupSizesDemo,
  ToggleGroupSpacingDemo,
  ToggleGroupVerticalDemo,
} from "@/components/examples/toggle-group-examples"

import {
  toggleGroupItemPropRows,
  toggleGroupPropRows,
} from "./toggle-group-table-data"

const description =
  "A set of two-state buttons that can be toggled on or off."

export const metadata: Metadata = {
  title: "Toggle Group",
  description,
}

const usageImport = `import { ToggleGroup, ToggleGroupItem } from "@/components/cubix/toggle-group"`

const usageSnippet = `<ToggleGroup>
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>`

const compositionSnippet = `ToggleGroup
├── ToggleGroupItem
└── ToggleGroupItem`

const demoSnippet = `import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/cubix/toggle-group"

export function ToggleGroupDemo() {
  return (
    <ToggleGroup variant="outline" multiple>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`

const outlineSnippet = `<ToggleGroup variant="outline" defaultValue={["all"]}>
  <ToggleGroupItem value="all" aria-label="Toggle all">
    All
  </ToggleGroupItem>
  <ToggleGroupItem value="missed" aria-label="Toggle missed">
    Missed
  </ToggleGroupItem>
</ToggleGroup>`

const sizesSnippet = `<ToggleGroup size="sm" defaultValue={["top"]} variant="outline">
  <ToggleGroupItem value="top">Top</ToggleGroupItem>
  <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`

const spacingSnippet = `<ToggleGroup
  size="sm"
  defaultValue={["top"]}
  variant="outline"
  spacing={0}
>
  <ToggleGroupItem value="top">Top</ToggleGroupItem>
  <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`

const verticalSnippet = `<ToggleGroup
  multiple
  orientation="vertical"
  spacing={1}
  defaultValue={["bold", "italic"]}
>
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <BoldIcon />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <ItalicIcon />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <UnderlineIcon />
  </ToggleGroupItem>
</ToggleGroup>`

const disabledSnippet = `<ToggleGroup disabled>
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <BoldIcon />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <ItalicIcon />
  </ToggleGroupItem>
  <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
    <UnderlineIcon />
  </ToggleGroupItem>
</ToggleGroup>`

const customSnippet = `<Field>
  <FieldLabel>Font Weight</FieldLabel>
  <ToggleGroup
    value={[fontWeight]}
    onValueChange={(value) => {
      if (value[0]) setFontWeight(value[0])
    }}
    variant="outline"
    spacing={2}
    size="lg"
  >
    <ToggleGroupItem value="light" className="flex size-16 flex-col ...">
      <span className="text-2xl font-light">Aa</span>
      <span className="text-xs text-muted-foreground">Light</span>
    </ToggleGroupItem>
    {/* more items */}
  </ToggleGroup>
  <FieldDescription>
    Use <code>font-{fontWeight}</code> to set the font weight.
  </FieldDescription>
</Field>`

const rtlSnippet = `<div dir="rtl">
  <ToggleGroup variant="outline" defaultValue={["list"]}>
    <ToggleGroupItem value="list">List</ToggleGroupItem>
    <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
    <ToggleGroupItem value="cards">Cards</ToggleGroupItem>
  </ToggleGroup>
</div>`

export default function ToggleGroupDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Toggle Group"
        description={description}
        slug="toggle-group"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-32">
        <ToggleGroupDemo />
      </ComponentPreview>

      <ComponentInstall name="toggle-group" />

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
          <code className="font-mono text-sm">ToggleGroup</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Outline</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">variant=&quot;outline&quot;</code>{" "}
          for an outline style.
        </p>
        <ComponentPreview code={outlineSnippet} previewClassName="min-h-32">
          <ToggleGroupOutlineDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Size</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="font-mono text-sm">size</code> prop to change the
          size of the toggle group.
        </p>
        <ComponentPreview code={sizesSnippet} previewClassName="min-h-40">
          <ToggleGroupSizesDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Spacing</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">spacing</code> to control the gap
          between items. Default is{" "}
          <code className="font-mono text-sm">2</code>. Use{" "}
          <code className="font-mono text-sm">spacing={0}</code> for connected
          items.
        </p>
        <ComponentPreview code={spacingSnippet} previewClassName="min-h-40">
          <ToggleGroupSpacingDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Vertical</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">
            orientation=&quot;vertical&quot;
          </code>{" "}
          for vertical toggle groups.
        </p>
        <ComponentPreview code={verticalSnippet} previewClassName="min-h-40">
          <ToggleGroupVerticalDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Disabled</h2>
        <ComponentPreview code={disabledSnippet} previewClassName="min-h-32">
          <ToggleGroupDisabledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Custom</h2>
        <p className="leading-relaxed text-muted-foreground">
          A custom toggle group example.
        </p>
        <ComponentPreview code={customSnippet} previewClassName="min-h-56">
          <ToggleGroupCustomDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">RTL</h2>
        <p className="leading-relaxed text-muted-foreground">
          Wrap the group in a container with{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code> to
          mirror direction.
        </p>
        <ComponentPreview code={rtlSnippet} previewClassName="min-h-32">
          <ToggleGroupRtlDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          See also the Base UI Toggle Group documentation for primitive props.
        </p>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ToggleGroup
          </h3>
          <PropsTable data={toggleGroupPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ToggleGroupItem
          </h3>
          <PropsTable data={toggleGroupItemPropRows} />
        </div>
      </section>
    </article>
  )
}
