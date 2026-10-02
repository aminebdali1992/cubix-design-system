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
import { CreditCardCustomDemo } from "./examples/credit-card-custom-demo"
import { CreditCardDemo } from "./examples/credit-card-demo"
import { CreditCardDescriptionDemo } from "./examples/credit-card-description-demo"
import { CreditCardDisabledDemo } from "./examples/credit-card-disabled-demo"
import { CreditCardFilledDemo } from "./examples/credit-card-filled-demo"
import { CreditCardFormDemo } from "./examples/credit-card-form-demo"
import { CreditCardInvalidDemo } from "./examples/credit-card-invalid-demo"
import { CreditCardSizesDemo } from "./examples/credit-card-sizes-demo"
import {
  creditCardControlPropRows,
  creditCardPartPropRows,
  creditCardPropRows,
  creditCardSegmentPropRows,
  creditCardSeparatorPropRows,
} from "./credit-card-table-data"

const description =
  "A labeled card-number field with four digit groups, separators, description, and error. Values always display as Persian digits."

export const metadata: Metadata = {
  title: "Credit Card",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/credit-card"
const EXAMPLES_DIR = "app/docs/components/credit-card/examples"

function loadCreditCardExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `CreditCard
├── CreditCardLabel
├── CreditCardControl
│   ├── CreditCardGroup1
│   ├── CreditCardSeparator
│   ├── CreditCardGroup2
│   ├── CreditCardSeparator
│   ├── CreditCardGroup3
│   ├── CreditCardSeparator
│   └── CreditCardGroup4
├── CreditCardDescription
└── CreditCardError`

/*
  Persian labels need lang="fa" so the IRANSans Cubix faces apply. Docs
  chrome only - not part of the paste-ready example source.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full min-w-0 justify-center">
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

export default function CreditCardPage() {
  const demoSource = loadCreditCardExample("credit-card-demo.tsx")
  const descriptionDemoSource = loadCreditCardExample("credit-card-description-demo.tsx")
  const filledDemoSource = loadCreditCardExample("credit-card-filled-demo.tsx")
  const invalidDemoSource = loadCreditCardExample("credit-card-invalid-demo.tsx")
  const disabledDemoSource = loadCreditCardExample("credit-card-disabled-demo.tsx")
  const sizesDemoSource = loadCreditCardExample("credit-card-sizes-demo.tsx")
  const formDemoSource = loadCreditCardExample("credit-card-form-demo.tsx")
  const customDemoSource = loadCreditCardExample("credit-card-custom-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Credit Card" description={description} slug="credit-card" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <CreditCardDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="credit-card" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          {"Compose label, control, help text, and error under "}
          <Code>CreditCard</Code>
          {". Inside the control, four groups of four digits sit between "}
          <Code>CreditCardSeparator</Code>
          {
            " parts. Digits always display in Persian. Filling a group moves focus to the next; Backspace on an empty group moves back. Paste a full number to fill all groups."
          }
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          {
            "Each group has its own accessible name. Auto-advance and Backspace keep keyboard entry on one path. "
          }
          <Code>CreditCardDescription</Code>
          {" and "}
          <Code>CreditCardError</Code>
          {" are announced through "}
          <Code>aria-describedby</Code>
          {", and "}
          <Code>invalid</Code>
          {" sets "}
          <Code>aria-invalid</Code>
          {" on every group. Set "}
          <Code>name</Code>
          {" on the root to submit a single hidden value for the full card number."}
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Description"
          description="Add helper text below the control for format hints or guidance."
          code={descriptionDemoSource}
        >
          <CreditCardDescriptionDemo />
        </ExampleSection>

        <ExampleSection
          title="Filled"
          description={
            <>
              {"Pass "}
              <Code>defaultValue</Code>
              {" on each group to show a complete card number."}
            </>
          }
          code={filledDemoSource}
        >
          <CreditCardFilledDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              {"Set "}
              <Code>invalid</Code>
              {" on the root to apply destructive styles and show "}
              <Code>CreditCardError</Code>
              {"."}
            </>
          }
          code={invalidDemoSource}
        >
          <CreditCardInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disable the field to block every group. The control uses a muted fill; label and description stay readable."
          code={disabledDemoSource}
        >
          <CreditCardDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description={
            <>
              {"Two heights ship by default: "}
              <Code>default</Code>
              {" (40px) and "}
              <Code>lg</Code>
              {" (48px). Use "}
              <Code>className</Code>
              {" for any other size."}
            </>
          }
          code={sizesDemoSource}
        >
          <CreditCardSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="In a form"
          description={
            <>
              {"Set "}
              <Code>name</Code>
              {
                " on the root so the combined number is submitted with the form, and pair the field with Cubix Button."
              }
            </>
          }
          code={formDemoSource}
          previewClassName="bg-muted"
        >
          <CreditCardFormDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              {"Every part accepts a "}
              <Code>className</Code>
              {" merged with the shipped "}
              <Code>cn</Code>
              {" helper. Here each group uses a filled surface instead of the default outline."}
            </>
          }
          code={customDemoSource}
        >
          <CreditCardCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>credit-card</Code>, <Code>credit-card-label</Code>,{" "}
            <Code>credit-card-control</Code>, <Code>credit-card-group-1</Code>,{" "}
            <Code>credit-card-group-2</Code>, <Code>credit-card-group-3</Code>,{" "}
            <Code>credit-card-group-4</Code>, <Code>credit-card-separator</Code>,{" "}
            <Code>credit-card-description</Code>, <Code>credit-card-error</Code>) for targeting in
            tests and parent selectors. Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">CreditCard</h3>
        <PropsTable data={creditCardPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CreditCardControl</h3>
        <PropsTable data={creditCardControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CreditCardGroup1 / 2 / 3 / 4</h3>
        <PropsTable data={creditCardSegmentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CreditCardSeparator</h3>
        <PropsTable data={creditCardSeparatorPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          CreditCardLabel / Description / Error
        </h3>
        <PropsTable data={creditCardPartPropRows} />
      </section>
    </article>
  )
}
