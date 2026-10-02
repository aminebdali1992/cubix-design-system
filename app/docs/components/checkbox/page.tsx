import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import { checkboxPropRows, checkboxStateRows } from "./checkbox-table-data"
import { CheckboxDemo } from "./examples/checkbox-demo"
import { CheckboxDescriptionDemo } from "./examples/checkbox-description-demo"
import { CheckboxDisabledDemo } from "./examples/checkbox-disabled-demo"
import { CheckboxFormDemo } from "./examples/checkbox-form-demo"
import { CheckboxGroupDemo } from "./examples/checkbox-group-demo"
import { CheckboxInvalidDemo } from "./examples/checkbox-invalid-demo"
import { CheckboxPendingDemo } from "./examples/checkbox-pending-demo"

const description =
  "A control that toggles between checked, unchecked, and indeterminate. Compose with Label via id and htmlFor."

export const metadata: Metadata = {
  title: "Checkbox",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/checkbox"
const EXAMPLES_DIR = "app/docs/components/checkbox/examples"

function loadCheckboxExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `div
├── Checkbox (id)
└── Label (htmlFor)`

/*
  Persian labels need lang="fa" so the IRANSans Cubix faces apply. Docs
  chrome only - not part of the paste-ready example source.
*/
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

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function CheckboxPage() {
  const demoSource = loadCheckboxExample("checkbox-demo.tsx")
  const descriptionSource = loadCheckboxExample("checkbox-description-demo.tsx")
  const groupSource = loadCheckboxExample("checkbox-group-demo.tsx")
  const invalidSource = loadCheckboxExample("checkbox-invalid-demo.tsx")
  const disabledSource = loadCheckboxExample("checkbox-disabled-demo.tsx")
  const pendingSource = loadCheckboxExample("checkbox-pending-demo.tsx")
  const formSource = loadCheckboxExample("checkbox-form-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Checkbox" description={description} slug="checkbox" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <CheckboxDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="checkbox" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Checkbox is the control only. Pair it with <Code>Label</Code> using matching{" "}
          <Code>id</Code> and <Code>htmlFor</Code>. Use <Code>indeterminate</Code> for partial
          selection and <Code>aria-invalid</Code> for error states.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          Every base exposes a native checkbox role with <Code>aria-checked</Code>, including the
          mixed state for <Code>indeterminate</Code>. Space toggles the focused control, and
          clicking the Label toggles it too. Link helper or error text with{" "}
          <Code>aria-describedby</Code>, and group related options in a <Code>fieldset</Code> with a{" "}
          <Code>legend</Code>. While <Code>pending</Code> is set the control is disabled and reports{" "}
          <Code>aria-busy</Code>.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="With description"
          description="Add a helper line for consent and settings rows, linked with aria-describedby."
          code={descriptionSource}
        >
          <CheckboxDescriptionDemo />
        </ExampleSection>

        <ExampleSection
          title="Indeterminate"
          description={
            <>
              A parent checkbox shows <Code>indeterminate</Code> while only some children are
              selected, and toggles all of them at once.
            </>
          }
          code={groupSource}
        >
          <CheckboxGroupDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              Set <Code>aria-invalid</Code> when a required choice is missing. The control gets a
              destructive border and ring; show the error copy below it.
            </>
          }
          code={invalidSource}
        >
          <CheckboxInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disabled checkboxes cannot be toggled. Checked and indeterminate controls fade to reduced opacity."
          code={disabledSource}
        >
          <CheckboxDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="Pending"
          description={
            <>
              Set <Code>pending</Code> while a save is in flight. The square is replaced by a
              circular spinner and interaction is blocked until the request finishes.
            </>
          }
          code={pendingSource}
        >
          <CheckboxPendingDemo />
        </ExampleSection>

        <ExampleSection
          title="Form"
          description={
            <>
              Give each checkbox a <Code>name</Code> and <Code>value</Code> so checked options are
              submitted with the form.
            </>
          }
          code={formSource}
          previewClassName="bg-muted"
        >
          <CheckboxFormDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>checkbox</Code>, <Code>checkbox-indicator</Code>) for targeting in
            tests and parent selectors. Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Checkbox</h3>
        <PropsTable data={checkboxPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">States</h3>
        <PropsTable data={checkboxStateRows} />
      </section>
    </article>
  )
}
