import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { KeyboardTable } from "@/components/docs/keyboard-table"
import { PropsTable } from "@/components/docs/props-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import { RadioGroupDemo } from "./examples/radio-group-demo"
import { RadioGroupDescriptionDemo } from "./examples/radio-group-description-demo"
import { RadioGroupDisabledDemo } from "./examples/radio-group-disabled-demo"
import { RadioGroupFormDemo } from "./examples/radio-group-form-demo"
import { RadioGroupHorizontalDemo } from "./examples/radio-group-horizontal-demo"
import { RadioGroupInvalidDemo } from "./examples/radio-group-invalid-demo"
import {
  radioGroupKeyboardRows,
  radioGroupPropRows,
  radioGroupStateRows,
  radioPropRows,
} from "./radio-group-table-data"

const description =
  "A set of checkable buttons where only one can be checked at a time. Compose each option with Label via id and htmlFor."

export const metadata: Metadata = {
  title: "Radio Group",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/radio-group"
const EXAMPLES_DIR = "app/docs/components/radio-group/examples"

function loadRadioGroupExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `RadioGroup
└── div
    ├── RadioGroupItem (id, value)
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

export default function RadioGroupPage() {
  const demoSource = loadRadioGroupExample("radio-group-demo.tsx")
  const descriptionSource = loadRadioGroupExample("radio-group-description-demo.tsx")
  const horizontalSource = loadRadioGroupExample("radio-group-horizontal-demo.tsx")
  const disabledSource = loadRadioGroupExample("radio-group-disabled-demo.tsx")
  const invalidSource = loadRadioGroupExample("radio-group-invalid-demo.tsx")
  const formSource = loadRadioGroupExample("radio-group-form-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Radio Group" description={description} slug="radio-group" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <RadioGroupDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="radio-group" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          <Code>RadioGroupItem</Code> is the control only. Pair each one with a <Code>Label</Code>{" "}
          using matching <Code>id</Code> and <Code>htmlFor</Code>. The group starts right-to-left
          and follows the closest <Code>dir</Code> on the page.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The group renders <Code>role=&quot;radiogroup&quot;</Code>; name it with{" "}
          <Code>aria-label</Code> or point <Code>aria-labelledby</Code> at a visible heading. The
          group is a single tab stop, arrow keys move and select, and horizontal arrows follow the
          reading direction.
        </p>
        <KeyboardTable data={radioGroupKeyboardRows} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="With description"
          description="Wrap each option in a bordered row and add a helper line under the label."
          code={descriptionSource}
        >
          <RadioGroupDescriptionDemo />
        </ExampleSection>

        <ExampleSection
          title="Horizontal"
          description={
            <>
              Lay the options out in a row with <Code>className=&quot;flex&quot;</Code>. In RTL the
              first option sits on the right and ArrowLeft moves to the next one.
            </>
          }
          code={horizontalSource}
        >
          <RadioGroupHorizontalDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description={
            <>
              Set <Code>disabled</Code> on one radio to lock it, or on the group to lock every
              option. Arrow keys skip disabled radios.
            </>
          }
          code={disabledSource}
        >
          <RadioGroupDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              Set <Code>aria-invalid</Code> on the group and its items when a required choice is
              missing. The radios get a destructive border and ring; show the error copy below.
            </>
          }
          code={invalidSource}
        >
          <RadioGroupInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Form"
          description={
            <>
              Give the group a <Code>name</Code> so the selected value is submitted with the form.
            </>
          }
          code={formSource}
          previewClassName="bg-muted"
        >
          <RadioGroupFormDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>radio-group</Code>, <Code>radio-group-item</Code>,{" "}
            <Code>radio-group-indicator</Code>) for targeting in tests and parent selectors. Use the
            same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">RadioGroup</h3>
        <PropsTable data={radioGroupPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">RadioGroupItem</h3>
        <PropsTable data={radioPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">States</h3>
        <PropsTable data={radioGroupStateRows} />
      </section>
    </article>
  )
}
