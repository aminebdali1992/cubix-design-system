import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  PhoneFieldClearDemo,
  PhoneFieldCustomDemo,
  PhoneFieldDemo,
  PhoneFieldDescriptionDemo,
  PhoneFieldDisabledDemo,
  PhoneFieldFormDemo,
  PhoneFieldIconsDemo,
  PhoneFieldInvalidDemo,
  PhoneFieldSizesDemo,
} from "@/components/examples/phone-field-examples"
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

const usageImport = `import {
  PhoneField,
  PhoneFieldClear,
  PhoneFieldControl,
  PhoneFieldDescription,
  PhoneFieldError,
  PhoneFieldInput,
  PhoneFieldLabel,
} from "@/components/cubix/phone-field"`

const usageSnippet = `<PhoneField>
  <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
  <PhoneFieldControl>
    <Icon data-icon="inline-start" />
    <PhoneFieldInput defaultValue="۰۹۱۲ ۳۴۵ ۶۷۸۹" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
    <PhoneFieldClear />
  </PhoneFieldControl>
  <PhoneFieldDescription>
    برای ورود و بازیابی حساب از این شماره استفاده می‌شود.
  </PhoneFieldDescription>
</PhoneField>`

const compositionSnippet = `PhoneField
├── PhoneFieldLabel
├── PhoneFieldControl
│   ├── Icon data-icon="inline-start" | "inline-end"
│   ├── PhoneFieldInput
│   └── PhoneFieldClear
├── PhoneFieldDescription
└── PhoneFieldError`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

export default function PhoneFieldPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Phone Field"
        description={description}
        slug="phone-field"
      />

      <ComponentPreview
        code={`<PhoneField>
  <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
  <PhoneFieldControl>
    <Icon data-icon="inline-start" />
    <PhoneFieldInput defaultValue="۰۹۱۲ ۳۴۵ ۶۷۸۹" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
    <PhoneFieldClear />
  </PhoneFieldControl>
  <PhoneFieldDescription>
    برای ورود و بازیابی حساب از این شماره استفاده می‌شود.
  </PhoneFieldDescription>
</PhoneField>`}
      >
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
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Same composition as Text Field. Compose label, control, help text,
          and error as siblings under{" "}
          <code className="font-mono text-sm">PhoneField</code>. Wrap the input
          in{" "}
          <code className="font-mono text-sm">PhoneFieldControl</code> when you
          need icons or a clear button - mark icons with{" "}
          <code className="font-mono text-sm">data-icon</code> like Button so
          spacing follows reading direction.{" "}
          <code className="font-mono text-sm">PhoneFieldInput</code> always
          renders <code className="font-mono text-sm">type=&quot;tel&quot;</code>{" "}
          with telephone autocomplete and inputMode.{" "}
          <code className="font-mono text-sm">PhoneFieldClear</code> appears
          when the input has a value.
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
            code={`<PhoneField>
  <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
  <PhoneFieldInput placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
  <PhoneFieldDescription>
    شماره باید با ۰۹ شروع شود و ۱۱ رقم باشد.
  </PhoneFieldDescription>
</PhoneField>`}
          >
            <PreviewShell>
              <PhoneFieldDescriptionDemo />
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
            code={`<PhoneField invalid>
  <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
  <PhoneFieldInput defaultValue="۰۹۱۲" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
  <PhoneFieldError>یک شماره همراه معتبر وارد کنید.</PhoneFieldError>
</PhoneField>`}
          >
            <PreviewShell>
              <PhoneFieldInvalidDemo />
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
            code={`<PhoneField disabled>
  <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
  <PhoneFieldInput defaultValue="۰۹۱۲ ۳۴۵ ۶۷۸۹" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
  <PhoneFieldDescription>این فیلد فعلاً قابل ویرایش نیست.</PhoneFieldDescription>
</PhoneField>`}
          >
            <PreviewShell>
              <PhoneFieldDisabledDemo />
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
            code={`<PhoneField size="default">
  <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
  <PhoneFieldControl>
    <Icon data-icon="inline-start" />
    <PhoneFieldInput placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
    <PhoneFieldClear />
  </PhoneFieldControl>
  <PhoneFieldDescription>ارتفاع ۴۰ پیکسل</PhoneFieldDescription>
</PhoneField>
<PhoneField size="lg">
  <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
  <PhoneFieldControl>
    <Icon data-icon="inline-start" />
    <PhoneFieldInput placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
    <PhoneFieldClear />
  </PhoneFieldControl>
  <PhoneFieldDescription>ارتفاع ۴۸ پیکسل</PhoneFieldDescription>
</PhoneField>`}
          >
            <PreviewShell>
              <PhoneFieldSizesDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Icons</h3>
          <p className="leading-relaxed text-muted-foreground">
            Place icons inside{" "}
            <code className="font-mono text-sm">PhoneFieldControl</code> with{" "}
            <code className="font-mono text-sm">data-icon</code> like Button so
            spacing follows reading direction. The phone mark is the usual
            start icon for mobile numbers.
          </p>
          <ComponentPreview
            code={`<PhoneField>
  <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
  <PhoneFieldControl>
    <Icon data-icon="inline-start" />
    <PhoneFieldInput placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
  </PhoneFieldControl>
</PhoneField>`}
          >
            <PreviewShell>
              <PhoneFieldIconsDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Clear</h3>
          <p className="leading-relaxed text-muted-foreground">
            <code className="font-mono text-sm">PhoneFieldClear</code> appears
            inside the control when the input has a value.
          </p>
          <ComponentPreview
            code={`<PhoneField>
  <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
  <PhoneFieldControl>
    <PhoneFieldInput defaultValue="۰۹۱۲ ۳۴۵ ۶۷۸۹" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
    <PhoneFieldClear />
  </PhoneFieldControl>
</PhoneField>`}
          >
            <PreviewShell>
              <PhoneFieldClearDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            In a form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose Phone Field with Button inside a bordered surface for a
            complete form block.
          </p>
          <ComponentPreview
            previewClassName="bg-muted"
            code={`<form className="grid max-w-xs gap-6 rounded-xl bg-background p-6">
  <div className="space-y-1.5">
    <p className="text-body font-medium">ورود با شماره همراه</p>
    <p className="text-caption text-muted-foreground">
      کد تأیید به این شماره ارسال می‌شود.
    </p>
  </div>
  <PhoneField>
    <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
    <PhoneFieldControl>
      <Icon data-icon="inline-start" />
      <PhoneFieldInput name="phone" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" required />
      <PhoneFieldClear />
    </PhoneFieldControl>
    <PhoneFieldDescription>
      یک شماره همراه معتبر وارد کنید.
    </PhoneFieldDescription>
  </PhoneField>
  <div className="grid grid-cols-2 gap-2">
    <Button type="button" variant="outline">انصراف</Button>
    <Button type="submit">ادامه</Button>
  </div>
</form>`}
          >
            <PreviewShell>
              <PhoneFieldFormDemo />
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
            code={`<PhoneField>
  <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
  <PhoneFieldInput
    className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
    placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰"
  />
  <PhoneFieldDescription>
    با className می‌توانید ظاهر را سفارشی کنید.
  </PhoneFieldDescription>
</PhoneField>`}
          >
            <PreviewShell>
              <PhoneFieldCustomDemo />
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
            <code className="font-mono">phone-field</code>,{" "}
            <code className="font-mono">phone-field-label</code>,{" "}
            <code className="font-mono">phone-field-control</code>,{" "}
            <code className="font-mono">phone-field-input</code>,{" "}
            <code className="font-mono">phone-field-clear</code>,{" "}
            <code className="font-mono">phone-field-description</code>,{" "}
            <code className="font-mono">phone-field-error</code>) for targeting
            in tests and parent selectors.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">PhoneField</h3>
        <PropsTable data={phoneFieldPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PhoneFieldControl
        </h3>
        <PropsTable data={phoneFieldControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PhoneFieldInput
        </h3>
        <PropsTable data={phoneFieldInputPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PhoneFieldClear
        </h3>
        <PropsTable data={phoneFieldClearPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PhoneFieldLabel / Description / Error
        </h3>
        <PropsTable data={phoneFieldPartPropRows} />
      </section>
    </article>
  )
}
