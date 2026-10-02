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
import {
  emailFieldClearPropRows,
  emailFieldControlPropRows,
  emailFieldInputPropRows,
  emailFieldPartPropRows,
  emailFieldPropRows,
} from "./email-field-table-data"
import { EmailFieldClearDemo } from "./examples/email-field-clear-demo"
import { EmailFieldCustomDemo } from "./examples/email-field-custom-demo"
import { EmailFieldDemo } from "./examples/email-field-demo"
import { EmailFieldDescriptionDemo } from "./examples/email-field-description-demo"
import { EmailFieldDisabledDemo } from "./examples/email-field-disabled-demo"
import { EmailFieldFormDemo } from "./examples/email-field-form-demo"
import { EmailFieldIconsDemo } from "./examples/email-field-icons-demo"
import { EmailFieldInvalidDemo } from "./examples/email-field-invalid-demo"
import { EmailFieldSizesDemo } from "./examples/email-field-sizes-demo"

const description =
  "A labeled email field with icons, clear, description, and error. type is locked to email with matching autocomplete and inputMode."

export const metadata: Metadata = {
  title: "Email Field",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/email-field"
const EXAMPLES_DIR = "app/docs/components/email-field/examples"

function loadEmailFieldExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `EmailField
├── EmailFieldLabel
├── EmailFieldControl
│   ├── Icon data-icon="inline-start" | "inline-end"
│   ├── EmailFieldInput
│   └── EmailFieldClear
├── EmailFieldDescription
└── EmailFieldError`

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

export default function EmailFieldPage() {
  const demoSource = loadEmailFieldExample("email-field-demo.tsx")
  const descriptionSource = loadEmailFieldExample("email-field-description-demo.tsx")
  const invalidSource = loadEmailFieldExample("email-field-invalid-demo.tsx")
  const disabledSource = loadEmailFieldExample("email-field-disabled-demo.tsx")
  const sizesSource = loadEmailFieldExample("email-field-sizes-demo.tsx")
  const iconsSource = loadEmailFieldExample("email-field-icons-demo.tsx")
  const clearSource = loadEmailFieldExample("email-field-clear-demo.tsx")
  const formSource = loadEmailFieldExample("email-field-form-demo.tsx")
  const customSource = loadEmailFieldExample("email-field-custom-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Email Field" description={description} slug="email-field" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <EmailFieldDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="email-field" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Same composition as Text Field. <Code>EmailFieldInput</Code> always renders{" "}
          <Code>type=&quot;email&quot;</Code> with email autocomplete and inputMode. Addresses are
          Latin, so the input defaults to <Code>dir=&quot;ltr&quot;</Code> while the text stays
          aligned with the surrounding form - a trailing <Code>@</Code> or <Code>.</Code> no longer
          jumps to the wrong side in right-to-left forms.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          <Code>EmailFieldLabel</Code> is wired to the input, and <Code>EmailFieldDescription</Code>{" "}
          and <Code>EmailFieldError</Code> are announced through <Code>aria-describedby</Code>.{" "}
          <Code>invalid</Code> sets <Code>aria-invalid</Code> on the input. Give{" "}
          <Code>EmailFieldClear</Code> a localized <Code>aria-label</Code>; it leaves the tab order
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
          <EmailFieldDescriptionDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              Set <Code>invalid</Code> on the root to apply destructive styles and show{" "}
              <Code>EmailFieldError</Code>.
            </>
          }
          code={invalidSource}
        >
          <EmailFieldInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disable the field to block interaction. The control uses a muted fill; label and description stay readable."
          code={disabledSource}
        >
          <EmailFieldDisabledDemo />
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
          <EmailFieldSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Icons"
          description={
            <>
              Place icons inside <Code>EmailFieldControl</Code> with <Code>data-icon</Code> like
              Button so spacing follows the reading direction.
            </>
          }
          code={iconsSource}
        >
          <EmailFieldIconsDemo />
        </ExampleSection>

        <ExampleSection
          title="Clear"
          description={
            <>
              <Code>EmailFieldClear</Code> appears inside the control while the input has a value
              and returns focus to the input after clearing.
            </>
          }
          code={clearSource}
        >
          <EmailFieldClearDemo />
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
          <EmailFieldFormDemo />
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
          <EmailFieldCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>email-field</Code>, <Code>email-field-label</Code>,{" "}
            <Code>email-field-control</Code>, <Code>email-field-input</Code>,{" "}
            <Code>email-field-clear</Code>, <Code>email-field-description</Code>,{" "}
            <Code>email-field-error</Code>) for targeting in tests and parent selectors. Use the
            same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">EmailField</h3>
        <PropsTable data={emailFieldPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">EmailFieldControl</h3>
        <PropsTable data={emailFieldControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">EmailFieldInput</h3>
        <PropsTable data={emailFieldInputPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">EmailFieldClear</h3>
        <PropsTable data={emailFieldClearPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          EmailFieldLabel / Description / Error
        </h3>
        <PropsTable data={emailFieldPartPropRows} />
      </section>
    </article>
  )
}
