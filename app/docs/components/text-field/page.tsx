import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  TextFieldClearDemo,
  TextFieldCustomDemo,
  TextFieldDemo,
  TextFieldDescriptionDemo,
  TextFieldDisabledDemo,
  TextFieldFormDemo,
  TextFieldIconsDemo,
  TextFieldInvalidDemo,
  TextFieldSizesDemo,
} from "@/components/examples/text-field-examples"
import {
  textFieldClearPropRows,
  textFieldControlPropRows,
  textFieldInputPropRows,
  textFieldPartPropRows,
  textFieldPropRows,
} from "./text-field-table-data"

const description =
  "A labeled plain-text field with optional icons, clear, description, and error - for names, usernames, and other free text. Email, phone, password, and similar inputs are separate components."

export const metadata: Metadata = {
  title: "Text Field",
  description,
}

const usageImport = `import {
  TextField,
  TextFieldClear,
  TextFieldControl,
  TextFieldDescription,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/cubix/text-field"`

const usageSnippet = `<TextField>
  <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
  <TextFieldControl>
    <Icon data-icon="inline-start" />
    <TextFieldInput defaultValue="امین ابدالی" placeholder="امین ابدالی" />
    <TextFieldClear />
  </TextFieldControl>
  <TextFieldDescription>نام کامل خود را وارد کنید.</TextFieldDescription>
</TextField>`

const compositionSnippet = `TextField
├── TextFieldLabel
├── TextFieldControl
│   ├── Icon data-icon="inline-start" | "inline-end"
│   ├── TextFieldInput
│   └── TextFieldClear
├── TextFieldDescription
└── TextFieldError`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

export default function TextFieldPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Text Field"
        description={description}
        slug="text-field"
      />

      <ComponentPreview
        code={`<TextField>
  <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
  <TextFieldControl>
    <Icon data-icon="inline-start" />
    <TextFieldInput defaultValue="امین ابدالی" placeholder="امین ابدالی" />
    <TextFieldClear />
  </TextFieldControl>
  <TextFieldDescription>نام کامل خود را وارد کنید.</TextFieldDescription>
</TextField>`}
      >
        <PreviewShell>
          <TextFieldDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="text-field" />

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
          Compose label, control, help text, and error as siblings under{" "}
          <code className="font-mono text-sm">TextField</code>. Wrap the input
          in{" "}
          <code className="font-mono text-sm">TextFieldControl</code> when you
          need icons or a clear button - mark icons with{" "}
          <code className="font-mono text-sm">data-icon</code> like Button so
          spacing follows reading direction.{" "}
          <code className="font-mono text-sm">TextFieldClear</code> appears
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
            code={`<TextField>
  <TextFieldLabel>نام کاربری</TextFieldLabel>
  <TextFieldInput placeholder="amin" />
  <TextFieldDescription>
    فقط حروف انگلیسی، عدد و زیرخط مجاز است.
  </TextFieldDescription>
</TextField>`}
          >
            <PreviewShell>
              <TextFieldDescriptionDemo />
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
            code={`<TextField invalid>
  <TextFieldLabel>نام کاربری</TextFieldLabel>
  <TextFieldInput defaultValue="amin!" />
  <TextFieldError>فقط حروف انگلیسی، عدد و زیرخط مجاز است.</TextFieldError>
</TextField>`}
          >
            <PreviewShell>
              <TextFieldInvalidDemo />
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
            code={`<TextField disabled>
  <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
  <TextFieldInput defaultValue="امین ابدالی" placeholder="امین ابدالی" />
  <TextFieldDescription>این فیلد فعلاً قابل ویرایش نیست.</TextFieldDescription>
</TextField>`}
          >
            <PreviewShell>
              <TextFieldDisabledDemo />
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
            code={`<TextField size="default">
  <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
  <TextFieldControl>
    <Icon data-icon="inline-start" />
    <TextFieldInput placeholder="امین ابدالی" />
    <TextFieldClear />
  </TextFieldControl>
  <TextFieldDescription>ارتفاع ۴۰ پیکسل</TextFieldDescription>
</TextField>
<TextField size="lg">
  <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
  <TextFieldControl>
    <Icon data-icon="inline-start" />
    <TextFieldInput placeholder="امین ابدالی" />
    <TextFieldClear />
  </TextFieldControl>
  <TextFieldDescription>ارتفاع ۴۸ پیکسل</TextFieldDescription>
</TextField>`}
          >
            <PreviewShell>
              <TextFieldSizesDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Icons</h3>
          <p className="leading-relaxed text-muted-foreground">
            Place icons inside{" "}
            <code className="font-mono text-sm">TextFieldControl</code> with{" "}
            <code className="font-mono text-sm">data-icon</code> like Button so
            spacing follows reading direction.
          </p>
          <ComponentPreview
            code={`<TextField>
  <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
  <TextFieldControl>
    <Icon data-icon="inline-start" />
    <TextFieldInput placeholder="امین ابدالی" />
    <Icon data-icon="inline-end" />
  </TextFieldControl>
</TextField>`}
          >
            <PreviewShell>
              <TextFieldIconsDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Clear</h3>
          <p className="leading-relaxed text-muted-foreground">
            <code className="font-mono text-sm">TextFieldClear</code> appears
            inside the control when the input has a value.
          </p>
          <ComponentPreview
            code={`<TextField>
  <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
  <TextFieldControl>
    <TextFieldInput defaultValue="امین ابدالی" placeholder="امین ابدالی" />
    <TextFieldClear />
  </TextFieldControl>
</TextField>`}
          >
            <PreviewShell>
              <TextFieldClearDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            In a form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose Text Field with Button inside a bordered surface for a
            complete form block.
          </p>
          <ComponentPreview
            previewClassName="bg-muted"
            code={`<form className="grid max-w-xs gap-6 rounded-xl bg-background p-6">
  <div className="space-y-1.5">
    <p className="text-body font-medium">ایجاد حساب</p>
    <p className="text-caption text-muted-foreground">
      برای ادامه، نام کامل خود را وارد کنید.
    </p>
  </div>
  <TextField>
    <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
    <TextFieldControl>
      <Icon data-icon="inline-start" />
      <TextFieldInput name="fullName" placeholder="امین ابدالی" required />
      <TextFieldClear />
    </TextFieldControl>
    <TextFieldDescription>نام کامل خود را وارد کنید.</TextFieldDescription>
  </TextField>
  <div className="grid grid-cols-2 gap-2">
    <Button type="button" variant="outline">انصراف</Button>
    <Button type="submit">ادامه</Button>
  </div>
</form>`}
          >
            <PreviewShell>
              <TextFieldFormDemo />
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
            code={`<TextField>
  <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
  <TextFieldInput
    className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
    placeholder="امین ابدالی"
  />
  <TextFieldDescription>
    با className می‌توانید ظاهر را سفارشی کنید.
  </TextFieldDescription>
</TextField>`}
          >
            <PreviewShell>
              <TextFieldCustomDemo />
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
            <code className="font-mono">text-field</code>,{" "}
            <code className="font-mono">text-field-label</code>,{" "}
            <code className="font-mono">text-field-control</code>,{" "}
            <code className="font-mono">text-field-input</code>,{" "}
            <code className="font-mono">text-field-clear</code>,{" "}
            <code className="font-mono">text-field-description</code>,{" "}
            <code className="font-mono">text-field-error</code>) for targeting
            in tests and parent selectors.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">TextField</h3>
        <PropsTable data={textFieldPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          TextFieldControl
        </h3>
        <PropsTable data={textFieldControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          TextFieldInput
        </h3>
        <PropsTable data={textFieldInputPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          TextFieldClear
        </h3>
        <PropsTable data={textFieldClearPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          TextFieldLabel / Description / Error
        </h3>
        <PropsTable data={textFieldPartPropRows} />
      </section>
    </article>
  )
}
