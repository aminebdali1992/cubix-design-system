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
import { ResizableControlledDemo } from "./examples/resizable-controlled-demo"
import { ResizableDemo } from "./examples/resizable-demo"
import { ResizableHandleDemo } from "./examples/resizable-handle-demo"
import { ResizableHorizontalDemo } from "./examples/resizable-horizontal-demo"
import { ResizableVerticalDemo } from "./examples/resizable-vertical-demo"
import {
  handlePropRows,
  panelGroupPropRows,
  panelPropRows,
  resizableColorRows,
  resizableTypographyRows,
} from "./resizable-table-data"

const description = "Accessible resizable panel groups and layouts."

export const metadata: Metadata = {
  title: "Resizable",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/resizable"
const EXAMPLES_DIR = "app/docs/components/resizable/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `ResizablePanelGroup
├── ResizablePanel
├── ResizableHandle
└── ResizablePanel`

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
      <ComponentPreview code={code} previewClassName="min-h-56">
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function ResizableDocsPage() {
  const demoSource = loadExample("resizable-demo.tsx")
  const horizontalSource = loadExample("resizable-horizontal-demo.tsx")
  const verticalSource = loadExample("resizable-vertical-demo.tsx")
  const handleSource = loadExample("resizable-handle-demo.tsx")
  const controlledSource = loadExample("resizable-controlled-demo.tsx")

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Resizable" description={description} slug="resizable" />

      <ComponentPreview code={demoSource} previewClassName="min-h-80">
        <PreviewShell>
          <ResizableDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="resizable" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={extractDemoImports(demoSource)} title="Import" />
        <CodeBlock code={extractDemoJsx(demoSource)} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Built on <Code>react-resizable-panels</Code>. The group renders{" "}
          <Code>dir=&quot;rtl&quot;</Code>, so the first panel sits on the right.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection title="Horizontal" description="A sidebar and content side by side." code={horizontalSource}>
          <ResizableHorizontalDemo />
        </ExampleSection>

        <ExampleSection
          title="Vertical"
          description={<>Use <Code>orientation=&quot;vertical&quot;</Code> for vertical resizing.</>}
          code={verticalSource}
        >
          <ResizableVerticalDemo />
        </ExampleSection>

        <ExampleSection
          title="Without handle"
          description={<>Pass <Code>withHandle=&#123;false&#125;</Code> for a plain line only.</>}
          code={handleSource}
        >
          <ResizableHandleDemo />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description={<>Track panel sizes with <Code>onLayoutChange</Code> and stable <Code>id</Code> values.</>}
          code={controlledSource}
        >
          <ResizableControlledDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>

        <h3 className="scroll-m-20 font-semibold tracking-tight">ResizablePanelGroup</h3>
        <PropsTable data={panelGroupPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ResizablePanel</h3>
        <PropsTable data={panelPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ResizableHandle</h3>
        <PropsTable data={handlePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={resizableTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={resizableColorRows} />
      </section>
    </article>
  )
}
