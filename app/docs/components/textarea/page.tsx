import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  TextareaCustomDemo,
  TextareaDemo,
  TextareaDisabledDemo,
  TextareaFormDemo,
  TextareaHeightDemo,
  TextareaIconsDemo,
  TextareaInvalidDemo,
  TextareaLabelDemo,
} from "@/components/examples/textarea-examples"
import {
  textareaControlPropRows,
  textareaPropRows,
} from "./textarea-table-data"

const description =
  "A multiline text control for longer content - messages, notes, and bios. Pair with Label or Field for accessible forms."

export const metadata: Metadata = {
  title: "Text Area",
  description,
}

const usageImport = `import { Textarea, TextareaControl } from "@/components/cubix/textarea"`

const usageSnippet = `<TextareaControl>
  <Icon data-icon="inline-start" />
  <Textarea placeholder="یادداشت خود را بنویسید..." />
</TextareaControl>`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

export default function TextareaPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Text Area"
        description={description}
        slug="textarea"
      />

      <ComponentPreview
        code={`<div className="grid w-full max-w-sm gap-2">
  <label htmlFor="note" className="text-label font-normal">یادداشت</label>
  <TextareaControl>
    <Icon data-icon="inline-start" />
    <Textarea
      id="note"
      placeholder="یادداشت خود را بنویسید..."
      defaultValue="جلسه فردا ساعت ۱۰ - آماده‌سازی گزارش ماهانه."
    />
  </TextareaControl>
  <p className="text-caption text-muted-foreground">
    یادداشت شما ذخیره می‌شود.
  </p>
</div>`}
      >
        <PreviewShell>
          <TextareaDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="textarea" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With label
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Associate a label and helper text with the control for accessible
            forms. Use Label or Field when those components are available.
          </p>
          <ComponentPreview
            code={`<div className="grid w-full max-w-sm gap-2">
  <label htmlFor="message" className="text-label font-normal">پیام</label>
  <TextareaControl>
    <Textarea id="message" placeholder="پیام خود را بنویسید..." />
  </TextareaControl>
  <p className="text-caption text-muted-foreground">
    پیام شما به تیم پشتیبانی ارسال می‌شود.
  </p>
</div>`}
          >
            <PreviewShell>
              <TextareaLabelDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Icons</h3>
          <p className="leading-relaxed text-muted-foreground">
            Place icons inside{" "}
            <code className="font-mono text-sm">TextareaControl</code> with{" "}
            <code className="font-mono text-sm">
              data-icon=&quot;inline-start&quot;
            </code>{" "}
            like Button and Text Field so spacing follows reading direction.
            Icons stay top-aligned for multiline content.
          </p>
          <ComponentPreview
            code={`<TextareaControl>
  <Icon data-icon="inline-start" />
  <Textarea placeholder="یادداشت خود را بنویسید..." />
</TextareaControl>`}
          >
            <PreviewShell>
              <TextareaIconsDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Custom height
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Default minimum height is{" "}
            <code className="font-mono text-sm">min-h-16</code>. Override with{" "}
            <code className="font-mono text-sm">className</code> for taller
            fields. Height grows with content via{" "}
            <code className="font-mono text-sm">field-sizing-content</code>.
          </p>
          <ComponentPreview
            code={`<TextareaControl className="max-w-sm">
  <Textarea className="min-h-32" placeholder="یادداشت‌های طولانی..." />
</TextareaControl>`}
          >
            <PreviewShell>
              <TextareaHeightDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Invalid
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">aria-invalid</code> to
            apply destructive border and ring styles - no extra prop needed.
          </p>
          <ComponentPreview
            code={`<TextareaControl>
  <Textarea aria-invalid defaultValue="a" placeholder="درباره خودتان بنویسید..." />
</TextareaControl>`}
          >
            <PreviewShell>
              <TextareaInvalidDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Disable the control to block interaction. Uses a muted fill so the
            value stays readable.
          </p>
          <ComponentPreview
            code={`<TextareaControl>
  <Icon data-icon="inline-start" />
  <Textarea disabled defaultValue="این فیلد فعلاً قابل ویرایش نیست." />
</TextareaControl>`}
          >
            <PreviewShell>
              <TextareaDisabledDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            In a form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose Text Area with Button inside a form surface for a complete
            message block.
          </p>
          <ComponentPreview
            previewClassName="bg-muted"
            code={`<form className="grid max-w-xs gap-6 rounded-xl bg-background p-6">
  <div className="space-y-1.5">
    <p className="text-body font-medium">ارسال پیام</p>
    <p className="text-caption text-muted-foreground">
      موضوع درخواست خود را کوتاه توضیح دهید.
    </p>
  </div>
  <div className="grid gap-2">
    <label htmlFor="message" className="text-label font-normal">پیام</label>
    <TextareaControl>
      <Icon data-icon="inline-start" />
      <Textarea id="message" name="message" placeholder="پیام خود را بنویسید..." required />
    </TextareaControl>
    <p className="text-caption text-muted-foreground">حداکثر ۵۰۰ کاراکتر.</p>
  </div>
  <div className="grid grid-cols-2 gap-2">
    <Button type="button" variant="outline">انصراف</Button>
    <Button type="submit">ارسال</Button>
  </div>
</form>`}
          >
            <PreviewShell>
              <TextareaFormDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Custom styling
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Accepts a{" "}
            <code className="font-mono text-sm">className</code> merged with
            the shipped <code className="font-mono text-sm">cn</code> helper.
            Here the field uses a filled surface instead of the default
            outline:
          </p>
          <ComponentPreview
            code={`<TextareaControl className="border-border bg-muted has-[[data-slot=textarea]:focus-visible]:bg-background dark:bg-muted dark:has-[[data-slot=textarea]:focus-visible]:bg-background">
  <Textarea placeholder="ظاهر سفارشی با className" />
</TextareaControl>`}
          >
            <PreviewShell>
              <TextareaCustomDemo />
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
            <code className="font-mono">textarea</code>,{" "}
            <code className="font-mono">textarea-control</code>) for targeting
            in tests and parent selectors. Destructive styles apply when{" "}
            <code className="font-mono">aria-invalid</code> is set.
          </p>
        </div>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Textarea</h3>
        <PropsTable data={textareaPropRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">
          TextareaControl
        </h3>
        <PropsTable data={textareaControlPropRows} />
      </section>
    </article>
  )
}
