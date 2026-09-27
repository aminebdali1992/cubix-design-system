import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  RadioGroupDemo,
  RadioGroupDescriptionDemo,
  RadioGroupDisabledDemo,
  RadioGroupHorizontalDemo,
  RadioGroupInvalidDemo,
} from "@/components/examples/radio-group-examples"
import {
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

const usageImport = `import { RadioGroup, RadioGroupItem } from "@/components/cubix/radio-group"
import { Label } from "@/components/cubix/label"`

const usageSnippet = `<RadioGroup defaultValue="comfortable" aria-label="تراکم نمایش">
  <div className="flex items-center gap-2">
    <RadioGroupItem id="default" value="default" />
    <Label htmlFor="default">پیش‌فرض</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem id="comfortable" value="comfortable" />
    <Label htmlFor="comfortable">راحت</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem id="compact" value="compact" />
    <Label htmlFor="compact">فشرده</Label>
  </div>
</RadioGroup>`

const compositionSnippet = `RadioGroup
  RadioGroupItem + Label (htmlFor → id)`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

export default function RadioGroupPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Radio Group"
        description={description}
        slug="radio-group"
      />

      <ComponentPreview code={usageSnippet}>
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
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          RadioGroupItem is the control only. Pair each option with{" "}
          <code className="font-mono text-sm">Label</code> using matching{" "}
          <code className="font-mono text-sm">id</code> and{" "}
          <code className="font-mono text-sm">htmlFor</code>. Only one value can
          be selected in the group at a time.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With description
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose each radio with a title and helper line for plans and
            settings.
          </p>
          <ComponentPreview
            code={`<RadioGroup defaultValue="pro" aria-label="انتخاب طرح">
  <div className="flex items-start gap-2 rounded-lg border p-4">
    <RadioGroupItem id="free" value="free" className="mt-0.5" />
    <Label htmlFor="free" className="grid gap-1.5 leading-none">
      <span>رایگان</span>
      <span className="text-caption text-muted-foreground">
        برای پروژه‌های شخصی و آزمایشی.
      </span>
    </Label>
  </div>
  <div className="flex items-start gap-2 rounded-lg border p-4">
    <RadioGroupItem id="pro" value="pro" className="mt-0.5" />
    <Label htmlFor="pro" className="grid gap-1.5 leading-none">
      <span>حرفه‌ای</span>
      <span className="text-caption text-muted-foreground">
        برای تیم‌هایی که به امکانات بیشتر نیاز دارند.
      </span>
    </Label>
  </div>
</RadioGroup>`}
          >
            <PreviewShell>
              <RadioGroupDescriptionDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Invalid
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">aria-invalid</code> for
            assistive tech when a choice is required and missing. Show the error
            in helper text - the radio itself stays visually unchanged.
          </p>
          <ComponentPreview
            code={`<div className="grid gap-2">
  <RadioGroup aria-label="پذیرش قوانین" aria-invalid>
    <div className="flex items-center gap-2">
      <RadioGroupItem id="accept" value="accept" aria-invalid />
      <Label htmlFor="accept">پذیرش قوانین و شرایط</Label>
    </div>
    <div className="flex items-center gap-2">
      <RadioGroupItem id="decline" value="decline" aria-invalid />
      <Label htmlFor="decline">عدم پذیرش</Label>
    </div>
  </RadioGroup>
  <p className="ps-[26px] text-caption text-destructive">
    برای ادامه باید یک گزینه را انتخاب کنید.
  </p>
</div>`}
          >
            <PreviewShell>
              <RadioGroupInvalidDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Disable the whole group, or a single option.
          </p>
          <ComponentPreview
            code={`<div className="grid gap-6">
  <RadioGroup defaultValue="one" disabled aria-label="قفل‌شده">
    <div className="flex items-center gap-2">
      <RadioGroupItem id="one" value="one" />
      <Label htmlFor="one">همه گزینه‌ها قفل‌اند</Label>
    </div>
  </RadioGroup>
  <RadioGroup defaultValue="email" aria-label="کانال اعلان">
    <div className="flex items-center gap-2">
      <RadioGroupItem id="email" value="email" />
      <Label htmlFor="email">ایمیل</Label>
    </div>
    <div className="flex items-center gap-2">
      <RadioGroupItem id="sms" value="sms" disabled />
      <Label htmlFor="sms">پیامک (در دسترس نیست)</Label>
    </div>
  </RadioGroup>
</div>`}
          >
            <PreviewShell>
              <RadioGroupDisabledDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Horizontal
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set{" "}
            <code className="font-mono text-sm">
              className=&quot;flex flex-row gap-4&quot;
            </code>{" "}
            to place options in a row.
          </p>
          <ComponentPreview
            code={`<RadioGroup defaultValue="center" className="flex flex-row gap-4" aria-label="تراز">
  <div className="flex items-center gap-2">
    <RadioGroupItem id="right" value="right" />
    <Label htmlFor="right">راست</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem id="center" value="center" />
    <Label htmlFor="center">وسط</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem id="left" value="left" />
    <Label htmlFor="left">چپ</Label>
  </div>
</RadioGroup>`}
          >
            <PreviewShell>
              <RadioGroupHorizontalDemo />
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
            <code className="font-mono">radio-group</code>,{" "}
            <code className="font-mono">radio-group-item</code>,{" "}
            <code className="font-mono">radio-group-indicator</code>) for
            targeting in tests and parent selectors.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          RadioGroup
        </h3>
        <PropsTable data={radioGroupPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          RadioGroupItem
        </h3>
        <PropsTable data={radioPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">States</h3>
        <PropsTable data={radioGroupStateRows} />
      </section>
    </article>
  )
}
