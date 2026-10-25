import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import { extractDemoImports, readDocsExampleSource } from "@/lib/docs/example-source"
import { ToggleDemo } from "./examples/toggle-demo"
import { ToggleDisabledDemo } from "./examples/toggle-disabled-demo"
import { ToggleOutlineDemo } from "./examples/toggle-outline-demo"
import { ToggleSizesDemo } from "./examples/toggle-sizes-demo"
import { ToggleTextDemo } from "./examples/toggle-text-demo"
import { toggleColorRows, togglePropRows, toggleTypographyRows } from "./toggle-table-data"

const description = "A two-state button that can be either on or off."

export const metadata: Metadata = {
  title: "Toggle",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/toggle"
const EXAMPLES_DIR = "app/docs/components/toggle/examples"

function load(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, { publicImport: PUBLIC_IMPORT })
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

export default function ToggleDocsPage() {
  const demoSource = load("toggle-demo.tsx")

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Toggle" description={description} slug="toggle" />

      <ComponentPreview code={demoSource} previewClassName="min-h-32">
        <PreviewShell>
          <ToggleDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="toggle" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={extractDemoImports(demoSource)} title="Import" />
        <CodeBlock code={`<Toggle>تغییر وضعیت</Toggle>`} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Outline"
          description={<>Use <Code>variant=&quot;outline&quot;</Code> for an outline style.</>}
          code={load("toggle-outline-demo.tsx")}
        >
          <ToggleOutlineDemo />
        </ExampleSection>

        <ExampleSection title="With Text" code={load("toggle-text-demo.tsx")}>
          <ToggleTextDemo />
        </ExampleSection>

        <ExampleSection
          title="Size"
          description={<>Use the <Code>size</Code> prop to change the size of the toggle.</>}
          code={load("toggle-sizes-demo.tsx")}
        >
          <ToggleSizesDemo />
        </ExampleSection>

        <ExampleSection title="Disabled" code={load("toggle-disabled-demo.tsx")}>
          <ToggleDisabledDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <p className="leading-relaxed text-muted-foreground">
          See also the Base UI Toggle documentation for primitive props.
        </p>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Toggle</h3>
        <PropsTable data={togglePropRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={toggleTypographyRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={toggleColorRows} />
      </section>
    </article>
  )
}