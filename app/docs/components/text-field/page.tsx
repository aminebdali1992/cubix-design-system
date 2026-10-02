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
import { TextFieldClearDemo } from "./examples/text-field-clear-demo"
import { TextFieldCustomDemo } from "./examples/text-field-custom-demo"
import { TextFieldDemo } from "./examples/text-field-demo"
import { TextFieldDescriptionDemo } from "./examples/text-field-description-demo"
import { TextFieldDisabledDemo } from "./examples/text-field-disabled-demo"
import { TextFieldFormDemo } from "./examples/text-field-form-demo"
import { TextFieldIconsDemo } from "./examples/text-field-icons-demo"
import { TextFieldInvalidDemo } from "./examples/text-field-invalid-demo"
import { TextFieldSizesDemo } from "./examples/text-field-sizes-demo"
import {
  textFieldClearPropRows,
  textFieldControlPropRows,
  textFieldInputPropRows,
  textFieldPartPropRows,
  textFieldPropRows,
} from "./text-field-table-data"

const description =
  "A labeled plain-text field with optional icons, clear, description, and error - for names, usernames, and other free text. Email, phone, password, and similar inputs are separate components."

export const metadata: Metadata = {
  title: "Text Field",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/text-field"
const EXAMPLES_DIR = "app/docs/components/text-field/examples"

function loadTextFieldExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `TextField
├── TextFieldLabel
├── TextFieldControl
│   ├── Icon data-icon="inline-start" | "inline-end"
│   ├── TextFieldInput
│   └── TextFieldClear
├── TextFieldDescription
└── TextFieldError`

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

export default function TextFieldPage() {
  const demoSource = loadTextFieldExample("text-field-demo.tsx")
  const descriptionSource = loadTextFieldExample("text-field-description-demo.tsx")
  const invalidSource = loadTextFieldExample("text-field-invalid-demo.tsx")
  const disabledSource = loadTextFieldExample("text-field-disabled-demo.tsx")
  const sizesSource = loadTextFieldExample("text-field-sizes-demo.tsx")
  const iconsSource = loadTextFieldExample("text-field-icons-demo.tsx")
  const clearSource = loadTextFieldExample("text-field-clear-demo.tsx")
  const formSource = loadTextFieldExample("text-field-form-demo.tsx")
  const customSource = loadTextFieldExample("text-field-custom-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Text Field" description={description} slug="text-field" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <TextFieldDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="text-field" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Compose label, control, help text, and error as siblings under <Code>TextField</Code>.
          Wrap the input in <Code>TextFieldControl</Code> when you need icons or a clear button -
          mark icons with <Code>data-icon</Code> like Button so spacing follows the reading
          direction. <Code>TextFieldClear</Code> appears only while the input has a value.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          <Code>TextFieldLabel</Code> is wired to the input, and <Code>TextFieldDescription</Code>{" "}
          and <Code>TextFieldError</Code> are announced through <Code>aria-describedby</Code>.{" "}
          <Code>invalid</Code> sets <Code>aria-invalid</Code> on the input. Give{" "}
          <Code>TextFieldClear</Code> a localized <Code>aria-label</Code>; it leaves the tab order
          while hidden.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Description"
          description="Add helper text below the control for format hints or guidance."
          code={descriptionSource}
        >
          <TextFieldDescriptionDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              Set <Code>invalid</Code> on the root to apply destructive styles and show{" "}
              <Code>TextFieldError</Code>.
            </>
          }
          code={invalidSource}
        >
          <TextFieldInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disable the field to block interaction. The control uses a muted fill; label and description stay readable."
          code={disabledSource}
        >
          <TextFieldDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description={
            <>
              Two heights ship by default: <Code>default</Code> (40px) and <Code>lg</Code> (48px).
              Use <Code>className</Code> for any other size.
            </>
          }
          code={sizesSource}
        >
          <TextFieldSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Icons"
          description={
            <>
              Place icons inside <Code>TextFieldControl</Code> with <Code>data-icon</Code> like
              Button so spacing follows the reading direction.
            </>
          }
          code={iconsSource}
        >
          <TextFieldIconsDemo />
        </ExampleSection>

        <ExampleSection
          title="Clear"
          description={
            <>
              <Code>TextFieldClear</Code> appears inside the control while the input has a value and
              returns focus to the input after clearing.
            </>
          }
          code={clearSource}
        >
          <TextFieldClearDemo />
        </ExampleSection>

        <ExampleSection
          title="In a form"
          description={
            <>
              Set <Code>name</Code> on the root so the value is submitted with the form, and pair
              the field with Cubix Button.
            </>
          }
          code={formSource}
          previewClassName="bg-muted"
        >
          <TextFieldFormDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Every part accepts a <Code>className</Code> merged with the shipped <Code>cn</Code>{" "}
              helper. Here the input uses a filled surface instead of the default outline.
            </>
          }
          code={customSource}
        >
          <TextFieldCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>text-field</Code>, <Code>text-field-label</Code>,{" "}
            <Code>text-field-control</Code>, <Code>text-field-input</Code>,{" "}
            <Code>text-field-clear</Code>, <Code>text-field-description</Code>,{" "}
            <Code>text-field-error</Code>) for targeting in tests and parent selectors. Use the same
            props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">TextField</h3>
        <PropsTable data={textFieldPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TextFieldControl</h3>
        <PropsTable data={textFieldControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TextFieldInput</h3>
        <PropsTable data={textFieldInputPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TextFieldClear</h3>
        <PropsTable data={textFieldClearPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          TextFieldLabel / Description / Error
        </h3>
        <PropsTable data={textFieldPartPropRows} />
      </section>
    </article>
  )
}
