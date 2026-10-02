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
import { PasswordFieldControlledDemo } from "./examples/password-field-controlled-demo"
import { PasswordFieldCustomDemo } from "./examples/password-field-custom-demo"
import { PasswordFieldDemo } from "./examples/password-field-demo"
import { PasswordFieldDescriptionDemo } from "./examples/password-field-description-demo"
import { PasswordFieldDisabledDemo } from "./examples/password-field-disabled-demo"
import { PasswordFieldFormDemo } from "./examples/password-field-form-demo"
import { PasswordFieldIconsDemo } from "./examples/password-field-icons-demo"
import { PasswordFieldInvalidDemo } from "./examples/password-field-invalid-demo"
import { PasswordFieldSizesDemo } from "./examples/password-field-sizes-demo"
import { PasswordFieldToggleDemo } from "./examples/password-field-toggle-demo"
import {
  passwordFieldControlPropRows,
  passwordFieldInputPropRows,
  passwordFieldPartPropRows,
  passwordFieldPropRows,
  passwordFieldTogglePropRows,
} from "./password-field-table-data"

const description =
  "A labeled password field with icons, visibility toggle, description, and error. type switches between password and text when revealed."

export const metadata: Metadata = {
  title: "Password Field",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/password-field"
const EXAMPLES_DIR = "app/docs/components/password-field/examples"

function loadPasswordFieldExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `PasswordField
├── PasswordFieldLabel
├── PasswordFieldControl
│   ├── Icon data-icon="inline-start" | "inline-end"
│   ├── PasswordFieldInput
│   └── PasswordFieldToggle
├── PasswordFieldDescription
└── PasswordFieldError`

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

export default function PasswordFieldPage() {
  const demoSource = loadPasswordFieldExample("password-field-demo.tsx")
  const toggleSource = loadPasswordFieldExample("password-field-toggle-demo.tsx")
  const controlledSource = loadPasswordFieldExample("password-field-controlled-demo.tsx")
  const descriptionSource = loadPasswordFieldExample("password-field-description-demo.tsx")
  const invalidSource = loadPasswordFieldExample("password-field-invalid-demo.tsx")
  const disabledSource = loadPasswordFieldExample("password-field-disabled-demo.tsx")
  const sizesSource = loadPasswordFieldExample("password-field-sizes-demo.tsx")
  const iconsSource = loadPasswordFieldExample("password-field-icons-demo.tsx")
  const formSource = loadPasswordFieldExample("password-field-form-demo.tsx")
  const customSource = loadPasswordFieldExample("password-field-custom-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Password Field" description={description} slug="password-field" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <PasswordFieldDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="password-field" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Same composition as Text Field, with <Code>PasswordFieldToggle</Code> in place of the
          clear button. <Code>PasswordFieldInput</Code> starts as{" "}
          <Code>type=&quot;password&quot;</Code> with current-password autocomplete and switches to
          text while revealed. The input defaults to <Code>dir=&quot;ltr&quot;</Code> so trailing
          symbols stay in place in right-to-left forms.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          <Code>PasswordFieldToggle</Code> swaps its accessible name between <Code>showLabel</Code>{" "}
          and <Code>hideLabel</Code> and returns focus to the input after each press.{" "}
          <Code>PasswordFieldDescription</Code> and <Code>PasswordFieldError</Code> are announced
          through <Code>aria-describedby</Code>, and <Code>invalid</Code> sets{" "}
          <Code>aria-invalid</Code> on the input.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Visibility toggle"
          description={
            <>
              Pass <Code>defaultVisible</Code> on the root to start revealed.
            </>
          }
          code={toggleSource}
        >
          <PasswordFieldToggleDemo />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description={
            <>
              Pass <Code>visible</Code> and <Code>onVisibleChange</Code> to own the visibility state
              from outside.
            </>
          }
          code={controlledSource}
        >
          <PasswordFieldControlledDemo />
        </ExampleSection>

        <ExampleSection
          title="Description"
          description={
            <>
              Add helper text below the control for strength hints. Use{" "}
              <Code>autoComplete=&quot;new-password&quot;</Code> when creating a password.
            </>
          }
          code={descriptionSource}
        >
          <PasswordFieldDescriptionDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              Set <Code>invalid</Code> on the root to apply destructive styles and show{" "}
              <Code>PasswordFieldError</Code>.
            </>
          }
          code={invalidSource}
        >
          <PasswordFieldInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disable the field to block the input and toggle. The control uses a muted fill; label and description stay readable."
          code={disabledSource}
        >
          <PasswordFieldDisabledDemo />
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
          <PasswordFieldSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Icons"
          description={
            <>
              Place icons inside <Code>PasswordFieldControl</Code> with <Code>data-icon</Code> like
              Button so spacing follows the reading direction.
            </>
          }
          code={iconsSource}
        >
          <PasswordFieldIconsDemo />
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
          <PasswordFieldFormDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Every part accepts a <Code>className</Code> merged with the shipped <Code>cn</Code>{" "}
              helper. When the toggle sits in the control, style <Code>PasswordFieldControl</Code>{" "}
              for a filled surface instead of the default outline.
            </>
          }
          code={customSource}
        >
          <PasswordFieldCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>password-field</Code>, <Code>password-field-label</Code>,{" "}
            <Code>password-field-control</Code>, <Code>password-field-input</Code>,{" "}
            <Code>password-field-toggle</Code>, <Code>password-field-description</Code>,{" "}
            <Code>password-field-error</Code>) for targeting in tests and parent selectors. Use the
            same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">PasswordField</h3>
        <PropsTable data={passwordFieldPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PasswordFieldControl</h3>
        <PropsTable data={passwordFieldControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PasswordFieldInput</h3>
        <PropsTable data={passwordFieldInputPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PasswordFieldToggle</h3>
        <PropsTable data={passwordFieldTogglePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PasswordFieldLabel / Description / Error
        </h3>
        <PropsTable data={passwordFieldPartPropRows} />
      </section>
    </article>
  )
}
