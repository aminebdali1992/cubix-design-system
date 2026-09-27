import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  PasswordFieldCustomDemo,
  PasswordFieldDemo,
  PasswordFieldDescriptionDemo,
  PasswordFieldDisabledDemo,
  PasswordFieldFormDemo,
  PasswordFieldIconsDemo,
  PasswordFieldInvalidDemo,
  PasswordFieldSizesDemo,
  PasswordFieldToggleDemo,
} from "@/components/examples/password-field-examples"
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

const usageImport = `import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldDescription,
  PasswordFieldError,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "@/components/cubix/password-field"`

const usageSnippet = `<PasswordField>
  <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
  <PasswordFieldControl>
    <Icon data-icon="inline-start" />
    <PasswordFieldInput defaultValue="CubixPass123" placeholder="رمز عبور خود را وارد کنید" />
    <PasswordFieldToggle />
  </PasswordFieldControl>
  <PasswordFieldDescription>
    حداقل ۸ کاراکتر، شامل حرف و عدد.
  </PasswordFieldDescription>
</PasswordField>`

const compositionSnippet = `PasswordField
├── PasswordFieldLabel
├── PasswordFieldControl
│   ├── Icon data-icon="inline-start" | "inline-end"
│   ├── PasswordFieldInput
│   └── PasswordFieldToggle
├── PasswordFieldDescription
└── PasswordFieldError`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

export default function PasswordFieldPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Password Field"
        description={description}
        slug="password-field"
      />

      <ComponentPreview code={usageSnippet}>
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
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Same composition as Text Field. Compose label, control, help text,
          and error as siblings under{" "}
          <code className="font-mono text-sm">PasswordField</code>. Wrap the
          input in{" "}
          <code className="font-mono text-sm">PasswordFieldControl</code> when
          you need icons or the visibility toggle - mark icons with{" "}
          <code className="font-mono text-sm">data-icon</code> like Button so
          spacing follows reading direction.{" "}
          <code className="font-mono text-sm">PasswordFieldInput</code> starts
          as <code className="font-mono text-sm">type=&quot;password&quot;</code>{" "}
          with current-password autocomplete.{" "}
          <code className="font-mono text-sm">PasswordFieldToggle</code> reveals
          or hides the value and updates the input type.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Visibility toggle
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            <code className="font-mono text-sm">PasswordFieldToggle</code>{" "}
            switches between hidden and visible. Pass{" "}
            <code className="font-mono text-sm">defaultVisible</code> or
            controlled{" "}
            <code className="font-mono text-sm">visible</code> /{" "}
            <code className="font-mono text-sm">onVisibleChange</code> on the
            root.
          </p>
          <ComponentPreview
            code={`<PasswordField defaultVisible>
  <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
  <PasswordFieldControl>
    <PasswordFieldInput defaultValue="CubixPass123" placeholder="رمز عبور خود را وارد کنید" />
    <PasswordFieldToggle />
  </PasswordFieldControl>
  <PasswordFieldDescription>
    با دکمه چشم می‌توانید رمز را نمایش یا مخفی کنید.
  </PasswordFieldDescription>
</PasswordField>`}
          >
            <PreviewShell>
              <PasswordFieldToggleDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Description
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Add helper text below the control for strength hints. Use{" "}
            <code className="font-mono text-sm">
              autoComplete=&quot;new-password&quot;
            </code>{" "}
            when creating a password.
          </p>
          <ComponentPreview
            code={`<PasswordField>
  <PasswordFieldLabel>رمز عبور جدید</PasswordFieldLabel>
  <PasswordFieldControl>
    <PasswordFieldInput autoComplete="new-password" placeholder="رمز عبور خود را وارد کنید" />
    <PasswordFieldToggle />
  </PasswordFieldControl>
  <PasswordFieldDescription>
    از ترکیب حروف بزرگ، کوچک و عدد استفاده کنید.
  </PasswordFieldDescription>
</PasswordField>`}
          >
            <PreviewShell>
              <PasswordFieldDescriptionDemo />
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
            code={`<PasswordField invalid>
  <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
  <PasswordFieldControl>
    <PasswordFieldInput defaultValue="123" placeholder="رمز عبور خود را وارد کنید" />
    <PasswordFieldToggle />
  </PasswordFieldControl>
  <PasswordFieldError>رمز عبور باید حداقل ۸ کاراکتر باشد.</PasswordFieldError>
</PasswordField>`}
          >
            <PreviewShell>
              <PasswordFieldInvalidDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Disable the field to block the input and toggle. The control uses a
            muted fill; label and description stay readable.
          </p>
          <ComponentPreview
            code={`<PasswordField disabled>
  <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
  <PasswordFieldControl>
    <PasswordFieldInput defaultValue="CubixPass123" placeholder="رمز عبور خود را وارد کنید" />
    <PasswordFieldToggle />
  </PasswordFieldControl>
  <PasswordFieldDescription>این فیلد فعلاً قابل ویرایش نیست.</PasswordFieldDescription>
</PasswordField>`}
          >
            <PreviewShell>
              <PasswordFieldDisabledDemo />
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
            code={`<PasswordField size="default">
  <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
  <PasswordFieldControl>
    <Icon data-icon="inline-start" />
    <PasswordFieldInput placeholder="رمز عبور خود را وارد کنید" />
    <PasswordFieldToggle />
  </PasswordFieldControl>
  <PasswordFieldDescription>ارتفاع ۴۰ پیکسل</PasswordFieldDescription>
</PasswordField>
<PasswordField size="lg">
  <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
  <PasswordFieldControl>
    <Icon data-icon="inline-start" />
    <PasswordFieldInput placeholder="رمز عبور خود را وارد کنید" />
    <PasswordFieldToggle />
  </PasswordFieldControl>
  <PasswordFieldDescription>ارتفاع ۴۸ پیکسل</PasswordFieldDescription>
</PasswordField>`}
          >
            <PreviewShell>
              <PasswordFieldSizesDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Icons</h3>
          <p className="leading-relaxed text-muted-foreground">
            Place icons inside{" "}
            <code className="font-mono text-sm">PasswordFieldControl</code> with{" "}
            <code className="font-mono text-sm">data-icon</code> like Button so
            spacing follows reading direction. A key mark is the usual start
            icon for password.
          </p>
          <ComponentPreview
            code={`<PasswordField>
  <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
  <PasswordFieldControl>
    <Icon data-icon="inline-start" />
    <PasswordFieldInput placeholder="رمز عبور خود را وارد کنید" />
    <PasswordFieldToggle />
  </PasswordFieldControl>
</PasswordField>`}
          >
            <PreviewShell>
              <PasswordFieldIconsDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            In a form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose Password Field with Button inside a bordered surface for a
            complete sign-in block.
          </p>
          <ComponentPreview
            previewClassName="bg-muted"
            code={`<form className="grid max-w-xs gap-6 rounded-xl bg-background p-6">
  <div className="space-y-1.5">
    <p className="text-body font-medium">ورود به حساب</p>
    <p className="text-caption text-muted-foreground">
      رمز عبور حساب Cubix خود را وارد کنید.
    </p>
  </div>
  <PasswordField>
    <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
    <PasswordFieldControl>
      <Icon data-icon="inline-start" />
      <PasswordFieldInput name="password" placeholder="رمز عبور خود را وارد کنید" required />
      <PasswordFieldToggle />
    </PasswordFieldControl>
    <PasswordFieldDescription>
      حداقل ۸ کاراکتر، شامل حرف و عدد.
    </PasswordFieldDescription>
  </PasswordField>
  <div className="grid grid-cols-2 gap-2">
    <Button type="button" variant="outline">انصراف</Button>
    <Button type="submit">ورود</Button>
  </div>
</form>`}
          >
            <PreviewShell>
              <PasswordFieldFormDemo />
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
            When the toggle sits in the control, style{" "}
            <code className="font-mono text-sm">PasswordFieldControl</code> for
            a filled surface instead of the default outline:
          </p>
          <ComponentPreview
            code={`<PasswordField>
  <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
  <PasswordFieldControl className="border-border bg-muted has-[[data-slot=password-field-input]:focus-visible]:bg-background dark:bg-muted dark:has-[[data-slot=password-field-input]:focus-visible]:bg-background">
    <PasswordFieldInput placeholder="رمز عبور خود را وارد کنید" />
    <PasswordFieldToggle />
  </PasswordFieldControl>
  <PasswordFieldDescription>
    با className می‌توانید ظاهر را سفارشی کنید.
  </PasswordFieldDescription>
</PasswordField>`}
          >
            <PreviewShell>
              <PasswordFieldCustomDemo />
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
            <code className="font-mono">password-field</code>,{" "}
            <code className="font-mono">password-field-label</code>,{" "}
            <code className="font-mono">password-field-control</code>,{" "}
            <code className="font-mono">password-field-input</code>,{" "}
            <code className="font-mono">password-field-toggle</code>,{" "}
            <code className="font-mono">password-field-description</code>,{" "}
            <code className="font-mono">password-field-error</code>) for
            targeting in tests and parent selectors.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PasswordField
        </h3>
        <PropsTable data={passwordFieldPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PasswordFieldControl
        </h3>
        <PropsTable data={passwordFieldControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PasswordFieldInput
        </h3>
        <PropsTable data={passwordFieldInputPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PasswordFieldToggle
        </h3>
        <PropsTable data={passwordFieldTogglePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PasswordFieldLabel / Description / Error
        </h3>
        <PropsTable data={passwordFieldPartPropRows} />
      </section>
    </article>
  )
}
