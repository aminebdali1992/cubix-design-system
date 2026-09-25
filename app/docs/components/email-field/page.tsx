import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  EmailFieldClearDemo,
  EmailFieldCustomDemo,
  EmailFieldDemo,
  EmailFieldDescriptionDemo,
  EmailFieldDisabledDemo,
  EmailFieldFormDemo,
  EmailFieldIconsDemo,
  EmailFieldInvalidDemo,
  EmailFieldSizesDemo,
} from "@/components/examples/email-field-examples"
import {
  emailFieldClearPropRows,
  emailFieldControlPropRows,
  emailFieldInputPropRows,
  emailFieldPartPropRows,
  emailFieldPropRows,
} from "./email-field-table-data"

const description =
  "A labeled email field with icons, clear, description, and error. type is locked to email with matching autocomplete and inputMode."

export const metadata: Metadata = {
  title: "Email Field",
  description,
}

const usageImport = `import {
  EmailField,
  EmailFieldClear,
  EmailFieldControl,
  EmailFieldDescription,
  EmailFieldError,
  EmailFieldInput,
  EmailFieldLabel,
} from "@/components/cubix/email-field"`

const usageSnippet = `<EmailField>
  <EmailFieldLabel>ایمیل</EmailFieldLabel>
  <EmailFieldControl>
    <Icon data-icon="inline-start" />
    <EmailFieldInput defaultValue="amin@cubix.com" placeholder="example@cubix.com" />
    <EmailFieldClear />
  </EmailFieldControl>
  <EmailFieldDescription>
    برای ورود و بازیابی حساب از این ایمیل استفاده می‌شود.
  </EmailFieldDescription>
</EmailField>`

const compositionSnippet = `EmailField
├── EmailFieldLabel
├── EmailFieldControl
│   ├── Icon data-icon="inline-start" | "inline-end"
│   ├── EmailFieldInput
│   └── EmailFieldClear
├── EmailFieldDescription
└── EmailFieldError`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

export default function EmailFieldPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Email Field"
        description={description}
        slug="email-field"
      />

      <ComponentPreview
        code={`<EmailField>
  <EmailFieldLabel>ایمیل</EmailFieldLabel>
  <EmailFieldControl>
    <Icon data-icon="inline-start" />
    <EmailFieldInput defaultValue="amin@cubix.com" placeholder="example@cubix.com" />
    <EmailFieldClear />
  </EmailFieldControl>
  <EmailFieldDescription>
    برای ورود و بازیابی حساب از این ایمیل استفاده می‌شود.
  </EmailFieldDescription>
</EmailField>`}
      >
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
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Same composition as Text Field. Compose label, control, help text,
          and error as siblings under{" "}
          <code className="font-mono text-sm">EmailField</code>. Wrap the input
          in{" "}
          <code className="font-mono text-sm">EmailFieldControl</code> when you
          need icons or a clear button - mark icons with{" "}
          <code className="font-mono text-sm">data-icon</code> like Button so
          spacing follows reading direction.{" "}
          <code className="font-mono text-sm">EmailFieldInput</code> always
          renders <code className="font-mono text-sm">type=&quot;email&quot;</code>{" "}
          with email autocomplete and inputMode.{" "}
          <code className="font-mono text-sm">EmailFieldClear</code> appears
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
            code={`<EmailField>
  <EmailFieldLabel>ایمیل کاری</EmailFieldLabel>
  <EmailFieldInput placeholder="example@cubix.com" />
  <EmailFieldDescription>
    ترجیحاً از ایمیل سازمانی خود استفاده کنید.
  </EmailFieldDescription>
</EmailField>`}
          >
            <PreviewShell>
              <EmailFieldDescriptionDemo />
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
            code={`<EmailField invalid>
  <EmailFieldLabel>ایمیل</EmailFieldLabel>
  <EmailFieldInput defaultValue="amin@" placeholder="example@cubix.com" />
  <EmailFieldError>یک آدرس ایمیل معتبر وارد کنید.</EmailFieldError>
</EmailField>`}
          >
            <PreviewShell>
              <EmailFieldInvalidDemo />
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
            code={`<EmailField disabled>
  <EmailFieldLabel>ایمیل</EmailFieldLabel>
  <EmailFieldInput defaultValue="amin@cubix.com" placeholder="example@cubix.com" />
  <EmailFieldDescription>این فیلد فعلاً قابل ویرایش نیست.</EmailFieldDescription>
</EmailField>`}
          >
            <PreviewShell>
              <EmailFieldDisabledDemo />
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
            code={`<EmailField size="default">
  <EmailFieldLabel>ایمیل</EmailFieldLabel>
  <EmailFieldControl>
    <Icon data-icon="inline-start" />
    <EmailFieldInput placeholder="example@cubix.com" />
    <EmailFieldClear />
  </EmailFieldControl>
  <EmailFieldDescription>ارتفاع ۴۰ پیکسل</EmailFieldDescription>
</EmailField>
<EmailField size="lg">
  <EmailFieldLabel>ایمیل</EmailFieldLabel>
  <EmailFieldControl>
    <Icon data-icon="inline-start" />
    <EmailFieldInput placeholder="example@cubix.com" />
    <EmailFieldClear />
  </EmailFieldControl>
  <EmailFieldDescription>ارتفاع ۴۸ پیکسل</EmailFieldDescription>
</EmailField>`}
          >
            <PreviewShell>
              <EmailFieldSizesDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Icons</h3>
          <p className="leading-relaxed text-muted-foreground">
            Place icons inside{" "}
            <code className="font-mono text-sm">EmailFieldControl</code> with{" "}
            <code className="font-mono text-sm">data-icon</code> like Button so
            spacing follows reading direction. The envelope mark is the usual
            start icon for email.
          </p>
          <ComponentPreview
            code={`<EmailField>
  <EmailFieldLabel>ایمیل</EmailFieldLabel>
  <EmailFieldControl>
    <Icon data-icon="inline-start" />
    <EmailFieldInput placeholder="example@cubix.com" />
  </EmailFieldControl>
</EmailField>`}
          >
            <PreviewShell>
              <EmailFieldIconsDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Clear</h3>
          <p className="leading-relaxed text-muted-foreground">
            <code className="font-mono text-sm">EmailFieldClear</code> appears
            inside the control when the input has a value.
          </p>
          <ComponentPreview
            code={`<EmailField>
  <EmailFieldLabel>ایمیل</EmailFieldLabel>
  <EmailFieldControl>
    <EmailFieldInput defaultValue="amin@cubix.com" placeholder="example@cubix.com" />
    <EmailFieldClear />
  </EmailFieldControl>
</EmailField>`}
          >
            <PreviewShell>
              <EmailFieldClearDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            In a form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose Email Field with Button inside a bordered surface for a
            complete form block.
          </p>
          <ComponentPreview
            previewClassName="bg-muted"
            code={`<form className="grid max-w-xs gap-6 rounded-xl bg-background p-6">
  <div className="space-y-1.5">
    <p className="text-body font-medium">ورود با ایمیل</p>
    <p className="text-caption text-muted-foreground">
      لینک ورود به این آدرس ارسال می‌شود.
    </p>
  </div>
  <EmailField>
    <EmailFieldLabel>ایمیل</EmailFieldLabel>
    <EmailFieldControl>
      <Icon data-icon="inline-start" />
      <EmailFieldInput name="email" placeholder="example@cubix.com" required />
      <EmailFieldClear />
    </EmailFieldControl>
    <EmailFieldDescription>
      یک آدرس ایمیل معتبر وارد کنید.
    </EmailFieldDescription>
  </EmailField>
  <div className="grid grid-cols-2 gap-2">
    <Button type="button" variant="outline">انصراف</Button>
    <Button type="submit">ادامه</Button>
  </div>
</form>`}
          >
            <PreviewShell>
              <EmailFieldFormDemo />
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
            code={`<EmailField>
  <EmailFieldLabel>ایمیل</EmailFieldLabel>
  <EmailFieldInput
    className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
    placeholder="example@cubix.com"
  />
  <EmailFieldDescription>
    با className می‌توانید ظاهر را سفارشی کنید.
  </EmailFieldDescription>
</EmailField>`}
          >
            <PreviewShell>
              <EmailFieldCustomDemo />
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
            <code className="font-mono">email-field</code>,{" "}
            <code className="font-mono">email-field-label</code>,{" "}
            <code className="font-mono">email-field-control</code>,{" "}
            <code className="font-mono">email-field-input</code>,{" "}
            <code className="font-mono">email-field-clear</code>,{" "}
            <code className="font-mono">email-field-description</code>,{" "}
            <code className="font-mono">email-field-error</code>) for targeting
            in tests and parent selectors.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">EmailField</h3>
        <PropsTable data={emailFieldPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          EmailFieldControl
        </h3>
        <PropsTable data={emailFieldControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          EmailFieldInput
        </h3>
        <PropsTable data={emailFieldInputPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          EmailFieldClear
        </h3>
        <PropsTable data={emailFieldClearPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          EmailFieldLabel / Description / Error
        </h3>
        <PropsTable data={emailFieldPartPropRows} />
      </section>
    </article>
  )
}
