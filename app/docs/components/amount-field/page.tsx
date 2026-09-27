import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  AmountFieldAmountInWordsDemo,
  AmountFieldCurrencyDemo,
  AmountFieldCustomDemo,
  AmountFieldDemo,
  AmountFieldDescriptionDemo,
  AmountFieldDisabledDemo,
  AmountFieldFormDemo,
  AmountFieldIconsDemo,
  AmountFieldInvalidDemo,
  AmountFieldSizesDemo,
} from "@/components/examples/amount-field-examples"
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

const usageImport = `import {
  AmountField,
  AmountFieldControl,
  AmountFieldCurrency,
  AmountFieldDescription,
  AmountFieldError,
  AmountFieldInput,
  AmountFieldLabel,
  formatAmountFieldValue,
  parseAmountFieldValue,
} from "@/components/cubix/amount-field"`

const usageSnippet = `<AmountField>
  <AmountFieldLabel>مبلغ</AmountFieldLabel>
  <AmountFieldControl>
    <Icon data-icon="inline-start" />
    <AmountFieldInput defaultValue="۱۲۵۰۰۰۰" placeholder="۰" />
    <AmountFieldCurrency unit="تومان" />
  </AmountFieldControl>
  <AmountFieldDescription>
    مبلغ را به تومان وارد کنید. ارقام به‌صورت خودکار گروه‌بندی می‌شوند.
  </AmountFieldDescription>
</AmountField>`

const compositionSnippet = `AmountField
├── AmountFieldLabel
├── AmountFieldControl
│   ├── Icon data-icon="inline-start" | "inline-end"
│   ├── AmountFieldInput
│   └── AmountFieldCurrency
├── AmountFieldDescription
└── AmountFieldError`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

export default function AmountFieldPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Amount Field"
        description={description}
        slug="amount-field"
      />

      <ComponentPreview
        code={`<AmountField>
  <AmountFieldLabel>مبلغ</AmountFieldLabel>
  <AmountFieldControl>
    <Icon data-icon="inline-start" />
    <AmountFieldInput defaultValue="۱۲۵۰۰۰۰" placeholder="۰" />
    <AmountFieldCurrency unit="تومان" />
  </AmountFieldControl>
  <AmountFieldDescription>
    مبلغ را به تومان وارد کنید. ارقام به‌صورت خودکار گروه‌بندی می‌شوند.
  </AmountFieldDescription>
</AmountField>`}
      >
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
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Same composition as Text Field. Place{" "}
          <code className="font-mono text-sm">AmountFieldCurrency</code> inside
          the control.{" "}
          <code className="font-mono text-sm">AmountFieldInput</code> uses{" "}
          <code className="font-mono text-sm">inputMode=&quot;numeric&quot;</code>{" "}
          with <code className="font-mono text-sm">type=&quot;text&quot;</code>,
          always shows Persian digits with thousand separators (٬), and aligns
          text to the right. Optional{" "}
          <code className="font-mono text-sm">amountInWords</code> on{" "}
          <code className="font-mono text-sm">AmountFieldDescription</code>{" "}
          spells the amount and flips تومان ↔ ریال. Use{" "}
          <code className="font-mono text-sm">parseAmountFieldValue</code> to
          read a numeric amount from the formatted string.
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Description
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Add helper text below the control for format hints or guidance.
          </p>
          <ComponentPreview
            code={`<AmountField>
  <AmountFieldLabel>مبلغ</AmountFieldLabel>
  <AmountFieldInput placeholder="۰" />
  <AmountFieldDescription>
    فقط عدد وارد کنید. جداکننده هزارگان به‌صورت خودکار اضافه می‌شود.
  </AmountFieldDescription>
</AmountField>`}
          >
            <PreviewShell>
              <AmountFieldDescriptionDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Amount in words
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set{" "}
            <code className="font-mono text-sm">amountInWords</code> on{" "}
            <code className="font-mono text-sm">AmountFieldDescription</code>{" "}
            to show the amount spelled in Persian. If the currency is تومان,
            the words use ریال (×10); if ریال, the words use تومان (÷10).
            Without this prop, the description stays a normal help text. When
            the input is empty, children are shown instead (or the description
            hides if there are none).
          </p>
          <ComponentPreview
            code={`<AmountField>
  <AmountFieldLabel>مبلغ</AmountFieldLabel>
  <AmountFieldControl>
    <AmountFieldInput defaultValue="۱۲۵۰۰۰" placeholder="۰" />
    <AmountFieldCurrency unit="تومان" />
  </AmountFieldControl>
  <AmountFieldDescription amountInWords />
</AmountField>
<AmountField>
  <AmountFieldLabel>مبلغ</AmountFieldLabel>
  <AmountFieldControl>
    <AmountFieldInput defaultValue="۱۲۵۰۰۰۰" placeholder="۰" />
    <AmountFieldCurrency unit="ریال" />
  </AmountFieldControl>
  <AmountFieldDescription amountInWords />
</AmountField>`}
          >
            <PreviewShell>
              <AmountFieldAmountInWordsDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Invalid
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">invalid</code> on the root
            to apply destructive styles and show the error message.
          </p>
          <ComponentPreview
            code={`<AmountField invalid>
  <AmountFieldLabel>مبلغ</AmountFieldLabel>
  <AmountFieldInput defaultValue="" placeholder="۰" />
  <AmountFieldError>یک مبلغ معتبر وارد کنید.</AmountFieldError>
</AmountField>`}
          >
            <PreviewShell>
              <AmountFieldInvalidDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Disable the field to block interaction. The control uses a muted
            fill; label and description stay readable.
          </p>
          <ComponentPreview
            code={`<AmountField disabled>
  <AmountFieldLabel>مبلغ</AmountFieldLabel>
  <AmountFieldControl>
    <Icon data-icon="inline-start" />
    <AmountFieldInput defaultValue="۱۲۵۰۰۰۰" placeholder="۰" />
    <AmountFieldCurrency unit="تومان" />
  </AmountFieldControl>
  <AmountFieldDescription>این فیلد فعلاً قابل ویرایش نیست.</AmountFieldDescription>
</AmountField>`}
          >
            <PreviewShell>
              <AmountFieldDisabledDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Sizes</h3>
          <p className="leading-relaxed text-muted-foreground">
            Two heights ship by default:{" "}
            <code className="font-mono text-sm">default</code> (40px) and{" "}
            <code className="font-mono text-sm">lg</code> (48px). Use{" "}
            <code className="font-mono text-sm">className</code> for any other
            size.
          </p>
          <ComponentPreview
            code={`<AmountField size="default">
  <AmountFieldLabel>مبلغ</AmountFieldLabel>
  <AmountFieldControl>
    <Icon data-icon="inline-start" />
    <AmountFieldInput placeholder="۰" />
    <AmountFieldCurrency unit="تومان" />
  </AmountFieldControl>
  <AmountFieldDescription>ارتفاع ۴۰ پیکسل</AmountFieldDescription>
</AmountField>
<AmountField size="lg">
  <AmountFieldLabel>مبلغ</AmountFieldLabel>
  <AmountFieldControl>
    <Icon data-icon="inline-start" />
    <AmountFieldInput placeholder="۰" />
    <AmountFieldCurrency unit="تومان" />
  </AmountFieldControl>
  <AmountFieldDescription>ارتفاع ۴۸ پیکسل</AmountFieldDescription>
</AmountField>`}
          >
            <PreviewShell>
              <AmountFieldSizesDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Icons</h3>
          <p className="leading-relaxed text-muted-foreground">
            Place icons inside{" "}
            <code className="font-mono text-sm">AmountFieldControl</code> with{" "}
            <code className="font-mono text-sm">data-icon</code> like Button so
            spacing follows reading direction.
          </p>
          <ComponentPreview
            code={`<AmountField>
  <AmountFieldLabel>مبلغ</AmountFieldLabel>
  <AmountFieldControl>
    <Icon data-icon="inline-start" />
    <AmountFieldInput placeholder="۰" />
    <AmountFieldCurrency unit="تومان" />
  </AmountFieldControl>
</AmountField>`}
          >
            <PreviewShell>
              <AmountFieldIconsDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Currency
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            <code className="font-mono text-sm">AmountFieldCurrency</code>{" "}
            accepts only تومان or ریال via the{" "}
            <code className="font-mono text-sm">unit</code> prop.
          </p>
          <ComponentPreview
            code={`<AmountField>
  <AmountFieldLabel>مبلغ</AmountFieldLabel>
  <AmountFieldControl>
    <AmountFieldInput defaultValue="۲۵۰۰۰۰" placeholder="۰" />
    <AmountFieldCurrency unit="تومان" />
  </AmountFieldControl>
</AmountField>
<AmountField>
  <AmountFieldLabel>مبلغ</AmountFieldLabel>
  <AmountFieldControl>
    <AmountFieldInput defaultValue="۲۵۰۰۰۰۰" placeholder="۰" />
    <AmountFieldCurrency unit="ریال" />
  </AmountFieldControl>
</AmountField>`}
          >
            <PreviewShell>
              <AmountFieldCurrencyDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            In a form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose Amount Field with Button inside a bordered surface for a
            complete payment block.
          </p>
          <ComponentPreview
            previewClassName="bg-muted"
            code={`<form className="grid max-w-xs gap-6 rounded-xl bg-background p-6">
  <div className="space-y-1.5">
    <p className="text-body font-medium">پرداخت</p>
    <p className="text-caption text-muted-foreground">
      مبلغ قابل پرداخت را وارد کنید.
    </p>
  </div>
  <AmountField>
    <AmountFieldLabel>مبلغ</AmountFieldLabel>
    <AmountFieldControl>
      <Icon data-icon="inline-start" />
      <AmountFieldInput name="amount" placeholder="۰" required />
      <AmountFieldCurrency unit="تومان" />
    </AmountFieldControl>
    <AmountFieldDescription>
      یک مبلغ معتبر به تومان وارد کنید.
    </AmountFieldDescription>
  </AmountField>
  <div className="grid grid-cols-2 gap-2">
    <Button type="button" variant="outline">انصراف</Button>
    <Button type="submit">ادامه</Button>
  </div>
</form>`}
          >
            <PreviewShell>
              <AmountFieldFormDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Custom styling
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Every part accepts a{" "}
            <code className="font-mono text-sm">className</code> merged with
            the shipped <code className="font-mono text-sm">cn</code> helper.
            Here the field uses a filled surface instead of the default
            outline:
          </p>
          <ComponentPreview
            code={`<AmountField>
  <AmountFieldLabel>مبلغ</AmountFieldLabel>
  <AmountFieldInput
    className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
    placeholder="۰"
  />
  <AmountFieldDescription>
    با className می‌توانید ظاهر را سفارشی کنید.
  </AmountFieldDescription>
</AmountField>`}
          >
            <PreviewShell>
              <AmountFieldCustomDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render{" "}
            <code className="font-mono">data-slot</code> attributes (
            <code className="font-mono">amount-field</code>,{" "}
            <code className="font-mono">amount-field-label</code>,{" "}
            <code className="font-mono">amount-field-control</code>,{" "}
            <code className="font-mono">amount-field-input</code>,{" "}
            <code className="font-mono">amount-field-currency</code>,{" "}
            <code className="font-mono">amount-field-description</code>,{" "}
            <code className="font-mono">amount-field-error</code>) for targeting
            in tests and parent selectors. Helpers{" "}
            <code className="font-mono">formatAmountFieldValue</code> and{" "}
            <code className="font-mono">parseAmountFieldValue</code> convert
            between display strings and numbers.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">AmountField</h3>
        <PropsTable data={amountFieldPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AmountFieldControl
        </h3>
        <PropsTable data={amountFieldControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AmountFieldInput
        </h3>
        <PropsTable data={amountFieldInputPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AmountFieldCurrency
        </h3>
        <PropsTable data={amountFieldCurrencyPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AmountFieldLabel / Description / Error
        </h3>
        <PropsTable data={amountFieldPartPropRows} />
      </section>
    </article>
  )
}
