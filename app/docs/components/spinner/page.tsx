import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import { extractDemoImports, readDocsExampleSource } from "@/lib/docs/example-source"
import { SpinnerBadgeDemo } from "./examples/spinner-badge-demo"
import { SpinnerButtonDemo } from "./examples/spinner-button-demo"
import { SpinnerCustomDemo } from "./examples/spinner-custom-demo"
import { SpinnerDemo } from "./examples/spinner-demo"
import { SpinnerEmptyDemo } from "./examples/spinner-empty-demo"
import { SpinnerInputGroupDemo } from "./examples/spinner-input-group-demo"
import { SpinnerSizeDemo } from "./examples/spinner-size-demo"
import { spinnerColorRows, spinnerPropRows, spinnerTypographyRows } from "./spinner-table-data"

const description = "An indicator that can be used to show a loading state."

export const metadata: Metadata = {
  title: "Spinner",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/spinner"
const EXAMPLES_DIR = "app/docs/components/spinner/examples"

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

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function SpinnerDocsPage() {
  const demoSource = load("spinner-demo.tsx")

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Spinner" description={description} slug="spinner" />

      <ComponentPreview code={demoSource} previewClassName="min-h-32">
        <PreviewShell>
          <SpinnerDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="spinner" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={extractDemoImports(demoSource)} title="Import" />
        <CodeBlock code={`<Spinner />`} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Customization"
          description={<>Replace the default icon with any other icon by editing the <Code>Spinner</Code> component.</>}
          code={load("spinner-custom-demo.tsx")}
        >
          <SpinnerCustomDemo />
        </ExampleSection>

        <ExampleSection
          title="Size"
          description={<>Use the <Code>size-*</Code> utility class to change the size.</>}
          code={load("spinner-size-demo.tsx")}
        >
          <SpinnerSizeDemo />
        </ExampleSection>

        <ExampleSection
          title="Button"
          description={<>Place the spinner before the label with <Code>data-icon=&quot;inline-start&quot;</Code>.</>}
          code={load("spinner-button-demo.tsx")}
        >
          <SpinnerButtonDemo />
        </ExampleSection>

        <ExampleSection
          title="Badge"
          description="Add a spinner to a badge to show a loading state."
          code={load("spinner-badge-demo.tsx")}
        >
          <SpinnerBadgeDemo />
        </ExampleSection>

        <ExampleSection
          title="Input group"
          description="Show progress at the end of an input."
          code={load("spinner-input-group-demo.tsx")}
          previewClassName="min-h-40"
        >
          <SpinnerInputGroupDemo />
        </ExampleSection>

        <ExampleSection
          title="Empty"
          description="Use a spinner as the media of an empty state."
          code={load("spinner-empty-demo.tsx")}
          previewClassName="min-h-56"
        >
          <SpinnerEmptyDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Spinner</h3>
        <PropsTable data={spinnerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={spinnerTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={spinnerColorRows} />
      </section>
    </article>
  )
}