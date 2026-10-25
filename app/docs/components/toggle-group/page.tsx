import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import { extractDemoImports, readDocsExampleSource } from "@/lib/docs/example-source"
import { ToggleGroupCustomDemo } from "./examples/toggle-group-custom-demo"
import { ToggleGroupDemo } from "./examples/toggle-group-demo"
import { ToggleGroupDisabledDemo } from "./examples/toggle-group-disabled-demo"
import { ToggleGroupOutlineDemo } from "./examples/toggle-group-outline-demo"
import { ToggleGroupSegmentedDemo } from "./examples/toggle-group-segmented-demo"
import { ToggleGroupSizesDemo } from "./examples/toggle-group-sizes-demo"
import { ToggleGroupSpacingDemo } from "./examples/toggle-group-spacing-demo"
import { ToggleGroupVerticalDemo } from "./examples/toggle-group-vertical-demo"
import {
  toggleGroupColorRows,
  toggleGroupItemPropRows,
  toggleGroupPropRows,
  toggleGroupTypographyRows,
} from "./toggle-group-table-data"

const description = "A set of two-state buttons that can be toggled on or off."

export const metadata: Metadata = {
  title: "Toggle Group",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/toggle-group"
const EXAMPLES_DIR = "app/docs/components/toggle-group/examples"

function load(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, { publicImport: PUBLIC_IMPORT })
}

const usageSnippet = `<ToggleGroup>
  <ToggleGroupItem value="a">الف</ToggleGroupItem>
  <ToggleGroupItem value="b">ب</ToggleGroupItem>
  <ToggleGroupItem value="c">پ</ToggleGroupItem>
</ToggleGroup>`

const compositionSnippet = `ToggleGroup
├── ToggleGroupItem
└── ToggleGroupItem`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

function ExampleSection({
  title,
  description,
  code,
  previewClassName = "min-h-32",
  children,
}: {
  title: string
  description?: ReactNode
  code: string
  previewClassName?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      {description ? <p className="leading-relaxed text-muted-foreground">{description}</p> : null}
      <ComponentPreview code={code} previewClassName={previewClassName}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function ToggleGroupDocsPage() {
  const demoSource = load("toggle-group-demo.tsx")

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Toggle Group" description={description} slug="toggle-group" />

      <ComponentPreview code={demoSource} previewClassName="min-h-32">
        <PreviewShell>
          <ToggleGroupDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="toggle-group" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={extractDemoImports(demoSource)} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build a <Code>ToggleGroup</Code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Outline"
          description={<>Use <Code>variant=&quot;outline&quot;</Code> for an outline style.</>}
          code={load("toggle-group-outline-demo.tsx")}
        >
          <ToggleGroupOutlineDemo />
        </ExampleSection>

        <ExampleSection
          title="Segmented"
          description={
            <>
              Use <Code>variant=&quot;segmented&quot;</Code> for a single-choice switch on a muted
              track, where the selected item is raised onto a card surface.
            </>
          }
          code={load("toggle-group-segmented-demo.tsx")}
        >
          <ToggleGroupSegmentedDemo />
        </ExampleSection>

        <ExampleSection
          title="Size"
          description={<>Use the <Code>size</Code> prop to change the size of the toggle group.</>}
          code={load("toggle-group-sizes-demo.tsx")}
          previewClassName="min-h-64"
        >
          <ToggleGroupSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Spacing"
          description={
            <>
              Use <Code>spacing</Code> to control the gap between items. Default is <Code>2</Code>.
              Use <Code>spacing={"{0}"}</Code> for connected items.
            </>
          }
          code={load("toggle-group-spacing-demo.tsx")}
        >
          <ToggleGroupSpacingDemo />
        </ExampleSection>

        <ExampleSection
          title="Vertical"
          description={<>Use <Code>orientation=&quot;vertical&quot;</Code> for vertical toggle groups.</>}
          code={load("toggle-group-vertical-demo.tsx")}
          previewClassName="min-h-40"
        >
          <ToggleGroupVerticalDemo />
        </ExampleSection>

        <ExampleSection title="Disabled" code={load("toggle-group-disabled-demo.tsx")}>
          <ToggleGroupDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom"
          description="A custom toggle group example."
          code={load("toggle-group-custom-demo.tsx")}
          previewClassName="min-h-56"
        >
          <ToggleGroupCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <p className="leading-relaxed text-muted-foreground">
          See also the Base UI Toggle Group documentation for primitive props.
        </p>

        <h3 className="scroll-m-20 font-semibold tracking-tight">ToggleGroup</h3>
        <PropsTable data={toggleGroupPropRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">ToggleGroupItem</h3>
        <PropsTable data={toggleGroupItemPropRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={toggleGroupTypographyRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={toggleGroupColorRows} />
      </section>
    </article>
  )
}
