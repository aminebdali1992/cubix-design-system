import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import { ScrollAreaDemo } from "./examples/scroll-area-demo"
import { ScrollAreaHorizontalDemo } from "./examples/scroll-area-horizontal-demo"
import { ScrollAreaTextDemo } from "./examples/scroll-area-text-demo"
import {
  scrollAreaColorRows,
  scrollAreaPropRows,
  scrollAreaTypographyRows,
  scrollBarPropRows,
} from "./scroll-area-table-data"

const description = "Augments native scroll functionality for custom, cross-browser styling."

export const metadata: Metadata = {
  title: "Scroll Area",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/scroll-area"
const EXAMPLES_DIR = "app/docs/components/scroll-area/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `ScrollArea
└── ScrollBar`

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
  children,
}: {
  title: string
  description: ReactNode
  code: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
      <ComponentPreview code={code} previewClassName="min-h-80">
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function ScrollAreaDocsPage() {
  const demoSource = loadExample("scroll-area-demo.tsx")
  const horizontalSource = loadExample("scroll-area-horizontal-demo.tsx")
  const textSource = loadExample("scroll-area-text-demo.tsx")

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Scroll Area" description={description} slug="scroll-area" />

      <ComponentPreview code={demoSource} previewClassName="h-96">
        <PreviewShell>
          <ScrollAreaDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="scroll-area" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={extractDemoImports(demoSource)} title="Import" />
        <CodeBlock code={extractDemoJsx(demoSource)} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          The root renders <Code>dir=&quot;rtl&quot;</Code> by default.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Horizontal"
          description={<>Add <Code>ScrollBar</Code> with <Code>orientation=&quot;horizontal&quot;</Code> for horizontal scrolling.</>}
          code={horizontalSource}
        >
          <ScrollAreaHorizontalDemo />
        </ExampleSection>

        <ExampleSection title="Long text" description="Scroll long text, such as terms and conditions, inside a fixed box." code={textSource}>
          <ScrollAreaTextDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>

        <h3 className="scroll-m-20 font-semibold tracking-tight">ScrollArea</h3>
        <PropsTable data={scrollAreaPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ScrollBar</h3>
        <PropsTable data={scrollBarPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={scrollAreaTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={scrollAreaColorRows} />
      </section>
    </article>
  )
}
