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
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import {
  formControlRows,
  formItemLayoutColorRows,
  formItemLayoutRows,
  formItemLayoutTypographyRows,
} from "./form-item-layout-table-data"
import { FormItemLayoutAfterLabel } from "./examples/form-item-layout-after-label"
import { FormItemLayoutBeforeLabel } from "./examples/form-item-layout-before-label"
import { FormItemLayoutDemo } from "./examples/form-item-layout-demo"
import { FormItemLayoutWithCheckbox } from "./examples/form-item-layout-with-checkbox"
import { FormItemLayoutWithCheckboxList } from "./examples/form-item-layout-with-checkbox-list"
import { FormItemLayoutHorizontal } from "./examples/form-item-layout-with-horizontal"
import { FormItemLayoutWithSelect } from "./examples/form-item-layout-with-select"
import { FormItemLayoutWithSwitch } from "./examples/form-item-layout-with-switch"

const description = "A helper component that provides a layout for form items."

export const metadata: Metadata = {
  title: "Form Item Layout",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/form-item-layout"
const EXAMPLES_DIR = "app/docs/components/form-item-layout/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const atomsSnippet = `<Field>
  <FieldLabel>نام کاربری</FieldLabel>
  <TextFieldControl>
    <TextFieldInput placeholder="امین" />
  </TextFieldControl>
  <FieldDescription>این نام نمایشی عمومی شماست.</FieldDescription>
  <FieldError />
</Field>`

const layoutSnippet = `<FormItemLayout label="نام کاربری" description="این نام نمایشی عمومی شماست." error={error}>
  <TextFieldControl>
    <FormControl>
      <TextFieldInput placeholder="امین" />
    </FormControl>
  </TextFieldControl>
</FormItemLayout>`

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
  return <code className="font-mono text-sm">{children}</code>
}

function Item({ name, children }: { name: string; children: ReactNode }) {
  return (
    <li>
      <Code>{name}</Code> - {children}
    </li>
  )
}

export default function FormItemLayoutPage() {
  const demoSource = loadExample("form-item-layout-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const sources = {
    "form-item-layout-with-select": loadExample("form-item-layout-with-select.tsx"),
    "form-item-layout-with-horizontal": loadExample("form-item-layout-with-horizontal.tsx"),
    "form-item-layout-with-switch": loadExample("form-item-layout-with-switch.tsx"),
    "form-item-layout-with-checkbox": loadExample("form-item-layout-with-checkbox.tsx"),
    "form-item-layout-with-checkbox-list": loadExample("form-item-layout-with-checkbox-list.tsx"),
    "form-item-layout-before-label": loadExample("form-item-layout-before-label.tsx"),
    "form-item-layout-after-label": loadExample("form-item-layout-after-label.tsx"),
  }

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Form Item Layout" description={description} slug="form-item-layout" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <FormItemLayoutDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="form-item-layout" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <p className="leading-relaxed text-muted-foreground">
          This component helps with the layout of form items. It provides the item wrapper, label,
          description and message, so instead of composing each form atom:
        </p>
        <CodeBlock code={atomsSnippet} title="Form atoms" />
        <p className="leading-relaxed text-muted-foreground">
          you pass them as props. Wrap the control in <Code>FormControl</Code> so it receives the
          field id, <Code>aria-describedby</Code> and <Code>aria-invalid</Code>.
        </p>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={layoutSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Layouts</h2>
        <ul className="list-disc space-y-2 ps-6 leading-relaxed text-muted-foreground">
          <Item name="vertical">Default. Label and optional hint on one row, control, message and description below.</Item>
          <Item name="horizontal">
            12-column grid from <Code>md</Code> (label 4, control 8), or from <Code>@xl</Code> with{" "}
            <Code>isContainerResponsive</Code>. Useful in a Sheet or side panel.
          </Item>
          <Item name="flex">Control beside the label and description, for Switch and Checkbox.</Item>
          <Item name="flex-row-reverse">
            Stacked on mobile; from <Code>md</Code> the label and control sit on opposite ends, with the
            control at <Code>md:w-1/2 xl:w-2/5</Code>.
          </Item>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The label is a real Cubix <Code>label</Code> tied to the control id. <Code>FormControl</Code>{" "}
          links the description and the error message through <Code>aria-describedby</Code> and sets{" "}
          <Code>aria-invalid</Code> while an error is shown. Icon-only content in{" "}
          <Code>beforeLabel</Code> or <Code>afterLabel</Code> needs an <Code>aria-label</Code>; the
          help icons in the examples have one and are mirrored for RTL.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="With Dropdown"
          description="FormItemLayout around a Cubix Dropdown, with FormControl on the trigger."
          code={sources["form-item-layout-with-select"]}
        >
          <FormItemLayoutWithSelect />
        </ExampleSection>

        <ExampleSection
          title="Horizontal layout"
          description="Useful for forms inside a Sheet or side panel."
          code={sources["form-item-layout-with-horizontal"]}
        >
          <FormItemLayoutHorizontal />
        </ExampleSection>

        <ExampleSection
          title="With Switch component"
          description="layout flex with a Cubix Switch and afterLabel text."
          code={sources["form-item-layout-with-switch"]}
        >
          <FormItemLayoutWithSwitch />
        </ExampleSection>

        <ExampleSection
          title="With Checkbox component"
          description="layout flex with a Cubix Checkbox."
          code={sources["form-item-layout-with-checkbox"]}
        >
          <FormItemLayoutWithCheckbox />
        </ExampleSection>

        <ExampleSection
          title="List of items as Checkboxes"
          description="A horizontal item holding nested flex items with hideMessage."
          code={sources["form-item-layout-with-checkbox-list"]}
        >
          <FormItemLayoutWithCheckboxList />
        </ExampleSection>

        <ExampleSection
          title="Before label"
          description="Insert any React node or string before the label with beforeLabel."
          code={sources["form-item-layout-before-label"]}
        >
          <FormItemLayoutBeforeLabel />
        </ExampleSection>

        <ExampleSection
          title="After label"
          description="Insert any React node or string after the label with afterLabel."
          code={sources["form-item-layout-after-label"]}
        >
          <FormItemLayoutAfterLabel />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Inner parts carry the{" "}
            <Code>data-formlayout-id</Code> attributes (labelContainer, label, beforeLabel,
            afterLabel, labelOptional, dataContainer, nonBoxInputContainer, description, message).
            Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">FormItemLayout</h3>
        <PropsTable data={formItemLayoutRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">FormControl</h3>
        <PropsTable data={formControlRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={formItemLayoutTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={formItemLayoutColorRows} />
      </section>
    </article>
  )
}
