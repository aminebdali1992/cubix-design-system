import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import { extractDemoImports, readDocsExampleSource } from "@/lib/docs/example-source"
import { SingleValueFieldArrayDemo } from "./examples/single-value-field-array-demo"
import { SingleValueFieldArrayDisabledDemo } from "./examples/single-value-field-array-disabled-demo"
import { SingleValueFieldArrayMinimumDemo } from "./examples/single-value-field-array-minimum-demo"
import { SingleValueFieldArrayPasteDemo } from "./examples/single-value-field-array-paste-demo"
import {
  propRows,
  singleValueFieldArrayColorRows,
  singleValueFieldArrayTypographyRows,
} from "./single-value-field-array-table-data"

const description = "A shared form fragment for repeated single text inputs."

export const metadata: Metadata = {
  title: "Single Value Field Array",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/single-value-field-array"
const EXAMPLES_DIR = "app/docs/components/single-value-field-array/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, { publicImport: PUBLIC_IMPORT })
}

const usageSnippet = `<SingleValueFieldArray
  value={redirectUris}
  onValueChange={setRedirectUris}
  placeholder="https://example.com/callback"
  addLabel="افزودن نشانی بازگشت"
/>`

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
      <ComponentPreview code={code}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono">{children}</code>
}

export default function SingleValueFieldArrayPage() {
  const demoSource = loadExample("single-value-field-array-demo.tsx")
  const usageImport = extractDemoImports(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Single Value Field Array" description={description} slug="single-value-field-array" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <SingleValueFieldArrayDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="single-value-field-array" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <Code>SingleValueFieldArray</Code> when each row is a single text input, such as redirect URIs,
          SSO domains, or repeated attribute mapping values.
        </p>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
        <p className="leading-relaxed text-muted-foreground">
          <Code>SingleValueFieldArray</Code> owns the row add and remove behavior and renders each row as a
          <Code>TextField</Code>, or an <Code>EmailField</Code> with <Code>fieldType of email</Code>, with its own error message. Compose it inside <Code>FormItemLayout</Code> when you want the standard
          label, description, and message treatment around the entire section. An error replaces the helper
          text.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">When to use it</h2>
        <ul className="list-disc space-y-2 ps-6 leading-relaxed text-muted-foreground">
          <li>
            Use <Code>SingleValueFieldArray</Code> for repeated single text values such as redirect URIs and
            domains.
          </li>
          <li>Use a key/value field array when each row is two text inputs.</li>
          <li>
            Build a custom row UI instead when each row mixes different controls, such as a text input paired
            with a <Code>Select</Code>.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>
        <ExampleSection
          title="Paste to split"
          description="Set pasteSeparator to turn a pasted, comma- or space-separated list into one row per value."
          code={loadExample("single-value-field-array-paste-demo.tsx")}
        >
          <SingleValueFieldArrayPasteDemo />
        </ExampleSection>
        <ExampleSection
          title="Minimum rows"
          description="With minimumRows, the remove buttons are disabled once the row count reaches the minimum. Rows use EmailField through fieldType of email, and each invalid row shows its own error."
          code={loadExample("single-value-field-array-minimum-demo.tsx")}
        >
          <SingleValueFieldArrayMinimumDemo />
        </ExampleSection>
        <ExampleSection
          title="Disabled"
          description="disabled locks every input and both buttons, for read-only settings."
          code={loadExample("single-value-field-array-disabled-demo.tsx")}
        >
          <SingleValueFieldArrayDisabledDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Props</h3>
        <PropsTable data={propRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={singleValueFieldArrayTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={singleValueFieldArrayColorRows} />
      </section>
    </article>
  )
}
