import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

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
import { inputColorRows, inputPropRows, inputTypographyRows } from "./input-table-data"
import { InputDemo } from "./examples/input-demo"
import { InputDisabledDemo } from "./examples/input-disabled-demo"
import { InputFormDemo } from "./examples/input-form-demo"
import { InputIconDemo } from "./examples/input-icon-demo"
import { InputInvalidDemo } from "./examples/input-invalid-demo"
import { InputSizeDemo } from "./examples/input-size-demo"
import { InputTypesDemo } from "./examples/input-types-demo"

const description =
  "Displays a form input field or a component that looks like an input field."

export const metadata: Metadata = {
  title: "Input",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/input"
const EXAMPLES_DIR = "app/docs/components/input/examples"

function loadInputExample(fileName: string) {
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

export default function InputPage() {
  const demoSource = loadInputExample("input-demo.tsx")
  const typesSource = loadInputExample("input-types-demo.tsx")
  const sizeSource = loadInputExample("input-size-demo.tsx")
  const iconSource = loadInputExample("input-icon-demo.tsx")
  const invalidSource = loadInputExample("input-invalid-demo.tsx")
  const disabledSource = loadInputExample("input-disabled-demo.tsx")
  const formSource = loadInputExample("input-form-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Input" description={description} slug="input" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <InputDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="input" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Sizes"
          description="Two sizes that match the Cubix fields: default (40px) and lg (48px)."
          code={sizeSource}
        >
          <InputSizeDemo />
        </ExampleSection>

        <ExampleSection
          title="Types"
          description="Every native input type is supported - file inputs even get styled file-button treatment."
          code={typesSource}
        >
          <InputTypesDemo />
        </ExampleSection>

        <ExampleSection
          title="With icon"
          description={
            <>
              Icons are plain siblings positioned with logical utilities like{" "}
              <Code>start-2</Code> and <Code>ps-10</Code>, so they stay on the
              right in RTL.
            </>
          }
          code={iconSource}
        >
          <InputIconDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid state"
          description={
            <>
              Set <Code>aria-invalid</Code> to switch to destructive border and
              ring styles - no extra prop needed.
            </>
          }
          code={invalidSource}
        >
          <InputInvalidDemo />
        </ExampleSection>

        <ExampleSection title="Disabled" code={disabledSource}>
          <InputDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="In a form"
          description="Pair the Input with the Button to build native, accessible forms."
          code={formSource}
        >
          <InputFormDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> The input renders{" "}
            <code className="font-mono">data-slot=&quot;input&quot;</code> for
            targeting in tests and parent selectors, and switches to destructive
            styles automatically when <code className="font-mono">aria-invalid</code>{" "}
            is set.
          </p>
        </div>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Props</h3>
        <PropsTable data={inputPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={inputTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={inputColorRows} />
      </section>
    </article>
  )
}
