import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  CheckboxDemo,
  CheckboxDescriptionDemo,
  CheckboxDisabledDemo,
  CheckboxInvalidDemo,
  CheckboxPendingDemo,
  CheckboxStatesDemo,
} from "@/components/examples/checkbox-examples"
import { checkboxPropRows, checkboxStateRows } from "./checkbox-table-data"

const description =
  "A control that toggles between checked, unchecked, and indeterminate. Compose with Label via id and htmlFor."

export const metadata: Metadata = {
  title: "Checkbox",
  description,
}

const usageImport = `import { Checkbox } from "@/components/cubix/checkbox"
import { Label } from "@/components/cubix/label"`

const usageSnippet = `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">پذیرش قوانین و شرایط</Label>
</div>`

const compositionSnippet = `Checkbox
Label (htmlFor → Checkbox id)`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

export default function CheckboxPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Checkbox"
        description={description}
        slug="checkbox"
      />

      <ComponentPreview code={usageSnippet}>
        <PreviewShell>
          <CheckboxDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="checkbox" />

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
          Checkbox is the control only. Pair it with{" "}
          <code className="font-mono text-sm">Label</code> using matching{" "}
          <code className="font-mono text-sm">id</code> and{" "}
          <code className="font-mono text-sm">htmlFor</code>. Use{" "}
          <code className="font-mono text-sm">indeterminate</code> for partial
          selection, and <code className="font-mono text-sm">aria-invalid</code>{" "}
          for error states.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">States</h3>
          <p className="leading-relaxed text-muted-foreground">
            Checked, indeterminate, and disabled cover the common conditions.
          </p>
          <ComponentPreview
            code={`<div className="grid gap-3">
  <div className="flex items-center gap-2">
    <Checkbox id="checked" defaultChecked />
    <Label htmlFor="checked">تایید شده</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="indeterminate" indeterminate />
    <Label htmlFor="indeterminate">انتخاب ناقص</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="disabled" disabled />
    <Label htmlFor="disabled">غیرفعال</Label>
  </div>
</div>`}
          >
            <PreviewShell>
              <CheckboxStatesDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With description
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose Checkbox with a title and helper line for consent and
            settings rows.
          </p>
          <ComponentPreview
            code={`<div className="flex items-start gap-3 rounded-lg border p-4">
  <Checkbox id="terms" defaultChecked className="mt-0.5" />
  <Label htmlFor="terms" className="grid gap-1.5 leading-none">
    <span>پذیرش قوانین و شرایط</span>
    <span className="text-caption text-muted-foreground">
      با ادامه، شرایط استفاده و سیاست حریم خصوصی را می‌پذیرید.
    </span>
  </Label>
</div>`}
          >
            <PreviewShell>
              <CheckboxDescriptionDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Invalid
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">aria-invalid</code> for
            assistive tech when the choice is required and missing. Show the
            error in helper text - the checkbox itself stays visually unchanged.
          </p>
          <ComponentPreview
            code={`<div className="grid gap-2">
  <div className="flex items-center gap-2">
    <Checkbox id="terms" aria-invalid />
    <Label htmlFor="terms">پذیرش قوانین و شرایط</Label>
  </div>
  <p className="ps-[26px] text-caption text-destructive">
    برای ادامه باید قوانین را بپذیرید.
  </p>
</div>`}
          >
            <PreviewShell>
              <CheckboxInvalidDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Disabled checkboxes cannot be toggled. Pair with Label for a clear
            unavailable state.
          </p>
          <ComponentPreview
            code={`<div className="grid gap-3">
  <div className="flex items-center gap-2">
    <Checkbox id="email" disabled />
    <Label htmlFor="email">اعلان‌های ایمیلی</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="push" disabled defaultChecked />
    <Label htmlFor="push">اعلان‌های فشاری</Label>
  </div>
</div>`}
          >
            <PreviewShell>
              <CheckboxDisabledDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Pending
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">pending</code> while a save
            is in flight. The square is replaced by a circular spinner and
            interaction is blocked until the request finishes.
          </p>
          <ComponentPreview
            code={`const [checked, setChecked] = React.useState(false)
const [pending, setPending] = React.useState(false)

function handleCheckedChange(next: boolean) {
  setChecked(next)
  setPending(true)
  // await save...
  setPending(false)
}

<div className="flex items-center gap-2">
  <Checkbox
    id="notify"
    checked={checked}
    pending={pending}
    onCheckedChange={handleCheckedChange}
  />
  <Label htmlFor="notify">ذخیره تنظیمات اعلان</Label>
</div>`}
          >
            <PreviewShell>
              <CheckboxPendingDemo />
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
            <code className="font-mono">checkbox</code>,{" "}
            <code className="font-mono">checkbox-indicator</code>) for targeting
            in tests and parent selectors. Use the same{" "}
            <code className="font-mono">indeterminate</code> and{" "}
            <code className="font-mono">pending</code> props on Base UI,
            React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Checkbox</h3>
        <PropsTable data={checkboxPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">States</h3>
        <PropsTable data={checkboxStateRows} />
      </section>
    </article>
  )
}
