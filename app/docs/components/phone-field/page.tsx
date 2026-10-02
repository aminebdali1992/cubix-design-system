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
import { PhoneFieldClearDemo } from "./examples/phone-field-clear-demo"
import { PhoneFieldCustomDemo } from "./examples/phone-field-custom-demo"
import { PhoneFieldDemo } from "./examples/phone-field-demo"
import { PhoneFieldDescriptionDemo } from "./examples/phone-field-description-demo"
import { PhoneFieldDisabledDemo } from "./examples/phone-field-disabled-demo"
import { PhoneFieldFormDemo } from "./examples/phone-field-form-demo"
import { PhoneFieldIconsDemo } from "./examples/phone-field-icons-demo"
import { PhoneFieldInvalidDemo } from "./examples/phone-field-invalid-demo"
import { PhoneFieldSizesDemo } from "./examples/phone-field-sizes-demo"
import {
  phoneFieldClearPropRows,
  phoneFieldControlPropRows,
  phoneFieldInputPropRows,
  phoneFieldPartPropRows,
  phoneFieldPropRows,
} from "./phone-field-table-data"

const description =
  "A labeled mobile phone field with icons, clear, description, and error. type is locked to tel with matching autocomplete and inputMode."

export const metadata: Metadata = {
  title: "Phone Field",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/phone-field"
const EXAMPLES_DIR = "app/docs/components/phone-field/examples"

function loadPhoneFieldExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `PhoneField
├── PhoneFieldLabel
├── PhoneFieldControl
│   ├── Icon data-icon="inline-start" | "inline-end"
│   ├── PhoneFieldInput
│   └── PhoneFieldClear
├── PhoneFieldDescription
└── PhoneFieldError`

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

export default function PhoneFieldPage() {
  const demoSource = loadPhoneFieldExample("phone-field-demo.tsx")
  const descriptionSource = loadPhoneFieldExample("phone-field-description-demo.tsx")
  const invalidSource = loadPhoneFieldExample("phone-field-invalid-demo.tsx")
  const disabledSource = loadPhoneFieldExample("phone-field-disabled-demo.tsx")
  const sizesSource = loadPhoneFieldExample("phone-field-sizes-demo.tsx")
  const iconsSource = loadPhoneFieldExample("phone-field-icons-demo.tsx")
  const clearSource = loadPhoneFieldExample("phone-field-clear-demo.tsx")
  const formSource = loadPhoneFieldExample("phone-field-form-demo.tsx")
  const customSource = loadPhoneFieldExample("phone-field-custom-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Phone Field" description={description} slug="phone-field" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <PhoneFieldDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="phone-field" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Same composition as Text Field. <Code>PhoneFieldInput</Code> always renders{" "}
          <Code>type=&quot;tel&quot;</Code> with telephone autocomplete and inputMode, so mobile
          keyboards open the dial pad.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          <Code>PhoneFieldLabel</Code> is wired to the input, and <Code>PhoneFieldDescription</Code>{" "}
          and <Code>PhoneFieldError</Code> are announced through <Code>aria-describedby</Code>.{" "}
          <Code>invalid</Code> sets <Code>aria-invalid</Code> on the input. Give{" "}
          <Code>PhoneFieldClear</Code> a localized <Code>aria-label</Code>; it leaves the tab order
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
          <PhoneFieldDescriptionDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              Set <Code>invalid</Code> on the root to apply destructive styles and show{" "}
              <Code>PhoneFieldError</Code>.
            </>
          }
          code={invalidSource}
        >
          <PhoneFieldInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disable the field to block interaction. The control uses a muted fill; label and description stay readable."
          code={disabledSource}
        >
          <PhoneFieldDisabledDemo />
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
          <PhoneFieldSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Icons"
          description={
            <>
              Place icons inside <Code>PhoneFieldControl</Code> with <Code>data-icon</Code> like
              Button so spacing follows the reading direction.
            </>
          }
          code={iconsSource}
        >
          <PhoneFieldIconsDemo />
        </ExampleSection>

        <ExampleSection
          title="Clear"
          description={
            <>
              <Code>PhoneFieldClear</Code> appears inside the control while the input has a value
              and returns focus to the input after clearing.
            </>
          }
          code={clearSource}
        >
          <PhoneFieldClearDemo />
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
          <PhoneFieldFormDemo />
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
          <PhoneFieldCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>phone-field</Code>, <Code>phone-field-label</Code>,{" "}
            <Code>phone-field-control</Code>, <Code>phone-field-input</Code>,{" "}
            <Code>phone-field-clear</Code>, <Code>phone-field-description</Code>,{" "}
            <Code>phone-field-error</Code>) for targeting in tests and parent selectors. Use the
            same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">PhoneField</h3>
        <PropsTable data={phoneFieldPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PhoneFieldControl</h3>
        <PropsTable data={phoneFieldControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PhoneFieldInput</h3>
        <PropsTable data={phoneFieldInputPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PhoneFieldClear</h3>
        <PropsTable data={phoneFieldClearPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PhoneFieldLabel / Description / Error
        </h3>
        <PropsTable data={phoneFieldPartPropRows} />
      </section>
    </article>
  )
}
