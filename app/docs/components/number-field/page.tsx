import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  NumberFieldCustomDemo,
  NumberFieldDemo,
  NumberFieldDescriptionDemo,
  NumberFieldDisabledDemo,
  NumberFieldFormDemo,
  NumberFieldIconsDemo,
  NumberFieldInvalidDemo,
  NumberFieldSizesDemo,
  NumberFieldStepperDemo,
} from "@/components/examples/number-field-examples"
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

const usageImport = `import {
  NumberField,
  NumberFieldControl,
  NumberFieldDescription,
  NumberFieldError,
  NumberFieldInput,
  NumberFieldLabel,
  NumberFieldStepper,
} from "@/components/cubix/number-field"`

const usageSnippet = `<NumberField>
  <NumberFieldLabel>تعداد</NumberFieldLabel>
  <NumberFieldControl>
    <Icon data-icon="inline-start" />
    <NumberFieldInput defaultValue="۱۲" placeholder="۰" />
    <NumberFieldStepper />
  </NumberFieldControl>
  <NumberFieldDescription>
    فقط عدد وارد کنید. با فلش‌ها مقدار را کم یا زیاد کنید.
  </NumberFieldDescription>
</NumberField>`

const compositionSnippet = `NumberField
├── NumberFieldLabel
├── NumberFieldControl
│   ├── Icon data-icon="inline-start" | "inline-end"
│   ├── NumberFieldInput
│   └── NumberFieldStepper
├── NumberFieldDescription
└── NumberFieldError`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

export default function NumberFieldPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Number Field"
        description={description}
        slug="number-field"
      />

      <ComponentPreview
        code={`<NumberField>
  <NumberFieldLabel>تعداد</NumberFieldLabel>
  <NumberFieldControl>
    <Icon data-icon="inline-start" />
    <NumberFieldInput defaultValue="۱۲" placeholder="۰" />
    <NumberFieldStepper />
  </NumberFieldControl>
  <NumberFieldDescription>
    فقط عدد وارد کنید. با فلش‌ها مقدار را کم یا زیاد کنید.
  </NumberFieldDescription>
</NumberField>`}
      >
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
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Same composition as Text Field. Place{" "}
          <code className="font-mono text-sm">NumberFieldStepper</code> inside
          the control for up and down arrows that change the value.{" "}
          <code className="font-mono text-sm">NumberFieldInput</code> uses{" "}
          <code className="font-mono text-sm">inputMode=&quot;numeric&quot;</code>{" "}
          with <code className="font-mono text-sm">type=&quot;text&quot;</code>{" "}
          so values always display as Persian digits, and aligns text to the right.
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
            code={`<NumberField>
  <NumberFieldLabel>تعداد</NumberFieldLabel>
  <NumberFieldInput placeholder="۰" />
  <NumberFieldDescription>
    مقدار باید یک عدد صحیح باشد.
  </NumberFieldDescription>
</NumberField>`}
          >
            <PreviewShell>
              <NumberFieldDescriptionDemo />
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
            code={`<NumberField invalid>
  <NumberFieldLabel>تعداد</NumberFieldLabel>
  <NumberFieldInput defaultValue="" placeholder="۰" />
  <NumberFieldError>یک عدد معتبر وارد کنید.</NumberFieldError>
</NumberField>`}
          >
            <PreviewShell>
              <NumberFieldInvalidDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Disable the field to block interaction. The control and stepper use
            a muted fill; label and description stay readable.
          </p>
          <ComponentPreview
            code={`<NumberField disabled>
  <NumberFieldLabel>تعداد</NumberFieldLabel>
  <NumberFieldControl>
    <Icon data-icon="inline-start" />
    <NumberFieldInput defaultValue="۱۲" placeholder="۰" />
    <NumberFieldStepper />
  </NumberFieldControl>
  <NumberFieldDescription>این فیلد فعلاً قابل ویرایش نیست.</NumberFieldDescription>
</NumberField>`}
          >
            <PreviewShell>
              <NumberFieldDisabledDemo />
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
            code={`<NumberField size="default">
  <NumberFieldLabel>تعداد</NumberFieldLabel>
  <NumberFieldControl>
    <Icon data-icon="inline-start" />
    <NumberFieldInput placeholder="۰" />
    <NumberFieldStepper />
  </NumberFieldControl>
  <NumberFieldDescription>ارتفاع ۴۰ پیکسل</NumberFieldDescription>
</NumberField>
<NumberField size="lg">
  <NumberFieldLabel>تعداد</NumberFieldLabel>
  <NumberFieldControl>
    <Icon data-icon="inline-start" />
    <NumberFieldInput placeholder="۰" />
    <NumberFieldStepper />
  </NumberFieldControl>
  <NumberFieldDescription>ارتفاع ۴۸ پیکسل</NumberFieldDescription>
</NumberField>`}
          >
            <PreviewShell>
              <NumberFieldSizesDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Icons</h3>
          <p className="leading-relaxed text-muted-foreground">
            Place icons inside{" "}
            <code className="font-mono text-sm">NumberFieldControl</code> with{" "}
            <code className="font-mono text-sm">data-icon</code> like Button so
            spacing follows reading direction.
          </p>
          <ComponentPreview
            code={`<NumberField>
  <NumberFieldLabel>تعداد</NumberFieldLabel>
  <NumberFieldControl>
    <Icon data-icon="inline-start" />
    <NumberFieldInput placeholder="۰" />
    <NumberFieldStepper />
  </NumberFieldControl>
</NumberField>`}
          >
            <PreviewShell>
              <NumberFieldIconsDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Stepper</h3>
          <p className="leading-relaxed text-muted-foreground">
            <code className="font-mono text-sm">NumberFieldStepper</code>{" "}
            renders up and down arrows that increase or decrease the value.
            Respects <code className="font-mono text-sm">min</code>,{" "}
            <code className="font-mono text-sm">max</code>, and{" "}
            <code className="font-mono text-sm">step</code> on the input.
          </p>
          <ComponentPreview
            code={`<NumberField>
  <NumberFieldLabel>تعداد</NumberFieldLabel>
  <NumberFieldControl>
    <NumberFieldInput defaultValue="۱۲" placeholder="۰" />
    <NumberFieldStepper />
  </NumberFieldControl>
</NumberField>`}
          >
            <PreviewShell>
              <NumberFieldStepperDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            In a form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose Number Field with Button inside a bordered surface for a
            complete form block.
          </p>
          <ComponentPreview
            previewClassName="bg-muted"
            code={`<form className="grid max-w-xs gap-6 rounded-xl bg-background p-6">
  <div className="space-y-1.5">
    <p className="text-body font-medium">ثبت سفارش</p>
    <p className="text-caption text-muted-foreground">
      تعداد مورد نظر را وارد کنید.
    </p>
  </div>
  <NumberField>
    <NumberFieldLabel>تعداد</NumberFieldLabel>
    <NumberFieldControl>
      <Icon data-icon="inline-start" />
      <NumberFieldInput name="quantity" placeholder="۰" required />
      <NumberFieldStepper />
    </NumberFieldControl>
    <NumberFieldDescription>
      یک عدد معتبر وارد کنید.
    </NumberFieldDescription>
  </NumberField>
  <div className="grid grid-cols-2 gap-2">
    <Button type="button" variant="outline">انصراف</Button>
    <Button type="submit">ادامه</Button>
  </div>
</form>`}
          >
            <PreviewShell>
              <NumberFieldFormDemo />
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
            code={`<NumberField>
  <NumberFieldLabel>تعداد</NumberFieldLabel>
  <NumberFieldInput
    className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
    placeholder="۰"
  />
  <NumberFieldDescription>
    با className می‌توانید ظاهر را سفارشی کنید.
  </NumberFieldDescription>
</NumberField>`}
          >
            <PreviewShell>
              <NumberFieldCustomDemo />
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
            <code className="font-mono">number-field</code>,{" "}
            <code className="font-mono">number-field-label</code>,{" "}
            <code className="font-mono">number-field-control</code>,{" "}
            <code className="font-mono">number-field-input</code>,{" "}
            <code className="font-mono">number-field-stepper</code>,{" "}
            <code className="font-mono">number-field-increment</code>,{" "}
            <code className="font-mono">number-field-decrement</code>,{" "}
            <code className="font-mono">number-field-description</code>,{" "}
            <code className="font-mono">number-field-error</code>) for targeting
            in tests and parent selectors.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          NumberField
        </h3>
        <PropsTable data={numberFieldPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          NumberFieldControl
        </h3>
        <PropsTable data={numberFieldControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          NumberFieldInput
        </h3>
        <PropsTable data={numberFieldInputPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          NumberFieldStepper
        </h3>
        <PropsTable data={numberFieldStepperPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          NumberFieldLabel / Description / Error
        </h3>
        <PropsTable data={numberFieldPartPropRows} />
      </section>
    </article>
  )
}
