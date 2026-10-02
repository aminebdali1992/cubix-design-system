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
import { NumberFieldCustomDemo } from "./examples/number-field-custom-demo"
import { NumberFieldDemo } from "./examples/number-field-demo"
import { NumberFieldDescriptionDemo } from "./examples/number-field-description-demo"
import { NumberFieldDisabledDemo } from "./examples/number-field-disabled-demo"
import { NumberFieldFormDemo } from "./examples/number-field-form-demo"
import { NumberFieldIconsDemo } from "./examples/number-field-icons-demo"
import { NumberFieldInvalidDemo } from "./examples/number-field-invalid-demo"
import { NumberFieldSizesDemo } from "./examples/number-field-sizes-demo"
import { NumberFieldStepperDemo } from "./examples/number-field-stepper-demo"
import {
  numberFieldControlPropRows,
  numberFieldInputPropRows,
  numberFieldPartPropRows,
  numberFieldPropRows,
  numberFieldStepperPropRows,
} from "./number-field-table-data"

const description =
  "A labeled number field with icons, stepper arrows, description, and error. inputMode is locked to numeric; values always display as Persian digits."

export const metadata: Metadata = {
  title: "Number Field",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/number-field"
const EXAMPLES_DIR = "app/docs/components/number-field/examples"

function loadNumberFieldExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `NumberField
├── NumberFieldLabel
├── NumberFieldControl
│   ├── Icon data-icon="inline-start" | "inline-end"
│   ├── NumberFieldInput
│   └── NumberFieldStepper
├── NumberFieldDescription
└── NumberFieldError`

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

export default function NumberFieldPage() {
  const demoSource = loadNumberFieldExample("number-field-demo.tsx")
  const stepperSource = loadNumberFieldExample("number-field-stepper-demo.tsx")
  const descriptionSource = loadNumberFieldExample("number-field-description-demo.tsx")
  const invalidSource = loadNumberFieldExample("number-field-invalid-demo.tsx")
  const disabledSource = loadNumberFieldExample("number-field-disabled-demo.tsx")
  const sizesSource = loadNumberFieldExample("number-field-sizes-demo.tsx")
  const iconsSource = loadNumberFieldExample("number-field-icons-demo.tsx")
  const formSource = loadNumberFieldExample("number-field-form-demo.tsx")
  const customSource = loadNumberFieldExample("number-field-custom-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Number Field" description={description} slug="number-field" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <NumberFieldDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="number-field" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Same composition as Text Field. Place <Code>NumberFieldStepper</Code> inside the control
          for up and down arrows that change the value. <Code>NumberFieldInput</Code> uses{" "}
          <Code>inputMode=&quot;numeric&quot;</Code> with <Code>type=&quot;text&quot;</Code> so
          values always display as Persian digits; Latin and Arabic-Indic digits are converted as
          they are typed or pasted.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          ArrowUp and ArrowDown on the input step the value by <Code>step</Code> and respect{" "}
          <Code>min</Code> and <Code>max</Code>, so the stepper buttons stay out of the tab order
          without losing keyboard access. The buttons are named by <Code>incrementLabel</Code> and{" "}
          <Code>decrementLabel</Code>. <Code>NumberFieldDescription</Code> and{" "}
          <Code>NumberFieldError</Code> are announced through <Code>aria-describedby</Code>.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Stepper"
          description={
            <>
              <Code>NumberFieldStepper</Code> renders up and down arrows that increase or decrease
              the value. Set <Code>min</Code>, <Code>max</Code>, and <Code>step</Code> on the input
              to bound both the arrows and the keyboard.
            </>
          }
          code={stepperSource}
        >
          <NumberFieldStepperDemo />
        </ExampleSection>

        <ExampleSection
          title="Description"
          description="Add helper text below the input for format hints or guidance."
          code={descriptionSource}
        >
          <NumberFieldDescriptionDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              Set <Code>invalid</Code> on the root to apply destructive styles and show{" "}
              <Code>NumberFieldError</Code>.
            </>
          }
          code={invalidSource}
        >
          <NumberFieldInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disable the field to block the input and stepper. The control uses a muted fill; label and description stay readable."
          code={disabledSource}
        >
          <NumberFieldDisabledDemo />
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
          <NumberFieldSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Icons"
          description={
            <>
              Place icons inside <Code>NumberFieldControl</Code> with <Code>data-icon</Code> like
              Button so spacing follows the reading direction.
            </>
          }
          code={iconsSource}
        >
          <NumberFieldIconsDemo />
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
          <NumberFieldFormDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Every part accepts a <Code>className</Code> merged with the shipped <Code>cn</Code>{" "}
              helper. Here the field uses a filled surface instead of the default outline.
            </>
          }
          code={customSource}
        >
          <NumberFieldCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>number-field</Code>, <Code>number-field-label</Code>,{" "}
            <Code>number-field-control</Code>, <Code>number-field-input</Code>,{" "}
            <Code>number-field-stepper</Code>, <Code>number-field-increment</Code>,{" "}
            <Code>number-field-decrement</Code>, <Code>number-field-description</Code>,{" "}
            <Code>number-field-error</Code>) for targeting in tests and parent selectors. Use the
            same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">NumberField</h3>
        <PropsTable data={numberFieldPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">NumberFieldControl</h3>
        <PropsTable data={numberFieldControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">NumberFieldInput</h3>
        <PropsTable data={numberFieldInputPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">NumberFieldStepper</h3>
        <PropsTable data={numberFieldStepperPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          NumberFieldLabel / Description / Error
        </h3>
        <PropsTable data={numberFieldPartPropRows} />
      </section>
    </article>
  )
}
