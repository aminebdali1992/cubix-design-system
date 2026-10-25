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
import { labelColorRows, labelPropRows, labelTypographyRows } from "./label-table-data"
import { LabelCheckboxDemo } from "./examples/label-checkbox-demo"
import { LabelDemo } from "./examples/label-demo"
import { LabelDisabledDemo } from "./examples/label-disabled-demo"
import { LabelInputDemo } from "./examples/label-input-demo"
import { LabelTextareaDemo } from "./examples/label-textarea-demo"

const description = "Renders an accessible label associated with controls."

export const metadata: Metadata = {
  title: "Label",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/label"
const EXAMPLES_DIR = "app/docs/components/label/examples"

function loadLabelExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

/*
  Persian content needs dir="rtl" and lang="fa" so the IRANSans Cubix faces apply.
  Docs chrome only - not part of the paste-ready example source.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full items-center justify-center">
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
  description?: ReactNode
  code: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      {description ? (
        <p className="leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      <ComponentPreview code={code}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function LabelDocsPage() {
  const demoSource = loadLabelExample("label-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Label" description={description} slug="label" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <LabelDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="label" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="With Checkbox"
          description="Place the label after the checkbox in a horizontal Field; in RTL it sits to the left of the box."
          code={loadLabelExample("label-checkbox-demo.tsx")}
        >
          <LabelCheckboxDemo />
        </ExampleSection>

        <ExampleSection
          title="With Input"
          description={
            <>
              Link the label to the field with <Code>htmlFor</Code> and the input&apos;s{" "}
              <Code>id</Code>.
            </>
          }
          code={loadLabelExample("label-input-demo.tsx")}
        >
          <LabelInputDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description={
            <>
              Set <Code>data-disabled</Code> on a parent group such as <Code>Field</Code> to
              dim the label with a disabled control.
            </>
          }
          code={loadLabelExample("label-disabled-demo.tsx")}
        >
          <LabelDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="With Textarea"
          code={loadLabelExample("label-textarea-demo.tsx")}
        >
          <LabelTextareaDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Props</h3>
        <PropsTable data={labelPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={labelTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={labelColorRows} />
      </section>
    </article>
  )
}