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
import { AmountFieldAmountInWordsDemo } from "./examples/amount-field-amount-in-words-demo"
import { AmountFieldCurrencyDemo } from "./examples/amount-field-currency-demo"
import { AmountFieldCustomDemo } from "./examples/amount-field-custom-demo"
import { AmountFieldDemo } from "./examples/amount-field-demo"
import { AmountFieldDescriptionDemo } from "./examples/amount-field-description-demo"
import { AmountFieldDisabledDemo } from "./examples/amount-field-disabled-demo"
import { AmountFieldFormDemo } from "./examples/amount-field-form-demo"
import { AmountFieldIconsDemo } from "./examples/amount-field-icons-demo"
import { AmountFieldInvalidDemo } from "./examples/amount-field-invalid-demo"
import { AmountFieldSizesDemo } from "./examples/amount-field-sizes-demo"
import {
  amountFieldControlPropRows,
  amountFieldCurrencyPropRows,
  amountFieldInputPropRows,
  amountFieldPartPropRows,
  amountFieldPropRows,
} from "./amount-field-table-data"

const description =
  "A labeled amount field with currency unit, description, and error. Values always display as Persian digits with thousand separators."

export const metadata: Metadata = {
  title: "Amount Field",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/amount-field"
const EXAMPLES_DIR = "app/docs/components/amount-field/examples"

function loadAmountFieldExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `AmountField
├── AmountFieldLabel
├── AmountFieldControl
│   ├── Icon data-icon="inline-start" | "inline-end"
│   ├── AmountFieldInput
│   └── AmountFieldCurrency
├── AmountFieldDescription
└── AmountFieldError`

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

export default function AmountFieldPage() {
  const demoSource = loadAmountFieldExample("amount-field-demo.tsx")
  const descriptionSource = loadAmountFieldExample("amount-field-description-demo.tsx")
  const amountInWordsSource = loadAmountFieldExample("amount-field-amount-in-words-demo.tsx")
  const invalidSource = loadAmountFieldExample("amount-field-invalid-demo.tsx")
  const disabledSource = loadAmountFieldExample("amount-field-disabled-demo.tsx")
  const sizesSource = loadAmountFieldExample("amount-field-sizes-demo.tsx")
  const iconsSource = loadAmountFieldExample("amount-field-icons-demo.tsx")
  const currencySource = loadAmountFieldExample("amount-field-currency-demo.tsx")
  const formSource = loadAmountFieldExample("amount-field-form-demo.tsx")
  const customSource = loadAmountFieldExample("amount-field-custom-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Amount Field" description={description} slug="amount-field" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <AmountFieldDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="amount-field" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Same composition as Text Field, with <Code>AmountFieldCurrency</Code> for the unit.
          <Code>AmountFieldInput</Code> uses <Code>inputMode=&quot;numeric&quot;</Code> with{" "}
          <Code>type=&quot;text&quot;</Code>, converts Latin digits, and inserts thousand separators
          as you type. Use <Code>parseAmountFieldValue</Code> when you need the numeric amount from
          the formatted string.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          Letters are blocked on insert and paste so the field stays numeric.{" "}
          <Code>AmountFieldDescription</Code> and <Code>AmountFieldError</Code> are announced
          through <Code>aria-describedby</Code>, and <Code>invalid</Code> sets{" "}
          <Code>aria-invalid</Code> on the input. When <Code>amountInWords</Code> is on, the spoken
          amount updates as the value changes.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Description"
          description="Add helper text below the input for format hints or guidance."
          code={descriptionSource}
        >
          <AmountFieldDescriptionDemo />
        </ExampleSection>

        <ExampleSection
          title="Amount in words"
          description={
            <>
              Set <Code>amountInWords</Code> on <Code>AmountFieldDescription</Code> to spell the
              amount in Persian. With <Code>تومان</Code>, words use ریال (×10); with{" "}
              <Code>ریال</Code>, words use تومان (÷10).
            </>
          }
          code={amountInWordsSource}
        >
          <AmountFieldAmountInWordsDemo />
        </ExampleSection>

        <ExampleSection
          title="Currency"
          description={
            <>
              Place <Code>AmountFieldCurrency</Code> in the control with <Code>unit</Code> set to{" "}
              <Code>تومان</Code> or <Code>ریال</Code>.
            </>
          }
          code={currencySource}
        >
          <AmountFieldCurrencyDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              Set <Code>invalid</Code> on the root to apply destructive styles and show{" "}
              <Code>AmountFieldError</Code>.
            </>
          }
          code={invalidSource}
        >
          <AmountFieldInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disable the field to block the input. The control uses a muted fill; label and description stay readable."
          code={disabledSource}
        >
          <AmountFieldDisabledDemo />
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
          <AmountFieldSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Icons"
          description={
            <>
              Place icons inside <Code>AmountFieldControl</Code> with <Code>data-icon</Code> like
              Button so spacing follows the reading direction.
            </>
          }
          code={iconsSource}
        >
          <AmountFieldIconsDemo />
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
          <AmountFieldFormDemo />
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
          <AmountFieldCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>amount-field</Code>, <Code>amount-field-label</Code>,{" "}
            <Code>amount-field-control</Code>, <Code>amount-field-input</Code>,{" "}
            <Code>amount-field-currency</Code>, <Code>amount-field-description</Code>,{" "}
            <Code>amount-field-error</Code>) for targeting in tests and parent selectors. Use the
            same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">AmountField</h3>
        <PropsTable data={amountFieldPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AmountFieldControl</h3>
        <PropsTable data={amountFieldControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AmountFieldInput</h3>
        <PropsTable data={amountFieldInputPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AmountFieldCurrency</h3>
        <PropsTable data={amountFieldCurrencyPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AmountFieldLabel / Description / Error
        </h3>
        <PropsTable data={amountFieldPartPropRows} />
      </section>
    </article>
  )
}
