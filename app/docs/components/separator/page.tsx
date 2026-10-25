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
import { SeparatorDemo } from "./examples/separator-demo"
import { SeparatorListDemo } from "./examples/separator-list-demo"
import { SeparatorMenuDemo } from "./examples/separator-menu-demo"
import { SeparatorVerticalDemo } from "./examples/separator-vertical-demo"
import {
  separatorColorRows,
  separatorPropRows,
  separatorTypographyRows,
} from "./separator-table-data"

const description = "Visually or semantically separates content."

export const metadata: Metadata = {
  title: "Separator",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/separator"
const EXAMPLES_DIR = "app/docs/components/separator/examples"

function loadSeparatorExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

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
  previewClassName,
  children,
}: {
  title: string
  description: ReactNode
  code: string
  previewClassName?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
      <ComponentPreview code={code} previewClassName={previewClassName}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

export default function SeparatorDocsPage() {
  const demoSource = loadSeparatorExample("separator-demo.tsx")
  const verticalSource = loadSeparatorExample("separator-vertical-demo.tsx")
  const menuSource = loadSeparatorExample("separator-menu-demo.tsx")
  const listSource = loadSeparatorExample("separator-list-demo.tsx")
  const usageImport = extractDemoImports(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Separator" description={description} slug="separator" />

      <ComponentPreview code={demoSource} previewClassName="min-h-48">
        <PreviewShell>
          <SeparatorDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="separator" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={`<Separator />`} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Vertical"
          description='Use orientation="vertical" for a vertical separator.'
          code={verticalSource}
          previewClassName="min-h-32"
        >
          <SeparatorVerticalDemo />
        </ExampleSection>

        <ExampleSection
          title="Menu"
          description="Vertical separators between menu items with descriptions."
          code={menuSource}
          previewClassName="min-h-40"
        >
          <SeparatorMenuDemo />
        </ExampleSection>

        <ExampleSection
          title="List"
          description={<>Horizontal separators between list items, drawn with <code className="font-mono text-sm">variant=&quot;dashed&quot;</code>.</>}
          code={listSource}
          previewClassName="min-h-40"
        >
          <SeparatorListDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Separator</h3>
        <PropsTable data={separatorPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={separatorTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={separatorColorRows} />
      </section>
    </article>
  )
}