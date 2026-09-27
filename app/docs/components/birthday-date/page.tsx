import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  BirthdayDateCustomDemo,
  BirthdayDateDemo,
  BirthdayDateDescriptionDemo,
  BirthdayDateDisabledDemo,
  BirthdayDateFilledDemo,
  BirthdayDateFormDemo,
  BirthdayDateInvalidDemo,
  BirthdayDateSizesDemo,
} from "@/components/examples/birthday-date-examples"
import {
  birthdayDateControlPropRows,
  birthdayDatePartPropRows,
  birthdayDatePropRows,
  birthdayDateSegmentPropRows,
  birthdayDateSeparatorPropRows,
} from "./birthday-date-table-data"

const description =
  "A labeled birthday field with separate day, month, and year inputs. Values always display as Persian digits."

export const metadata: Metadata = {
  title: "Birthday Date",
  description,
}

const usageImport = `import {
  BirthdayDate,
  BirthdayDateControl,
  BirthdayDateDay,
  BirthdayDateDescription,
  BirthdayDateError,
  BirthdayDateLabel,
  BirthdayDateMonth,
  BirthdayDateSeparator,
  BirthdayDateYear,
  formatBirthdayDateValue,
  parseBirthdayDateValue,
} from "@/components/cubix/birthday-date"`

const usageSnippet = `<BirthdayDate>
  <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
  <BirthdayDateControl>
    <BirthdayDateDay />
    <BirthdayDateSeparator />
    <BirthdayDateMonth />
    <BirthdayDateSeparator />
    <BirthdayDateYear />
  </BirthdayDateControl>
  <BirthdayDateDescription>
    لطفاً تاریخ تولد را به‌صورت روز/ماه/سال وارد کنید.
  </BirthdayDateDescription>
</BirthdayDate>`

const compositionSnippet = `BirthdayDate
├── BirthdayDateLabel
├── BirthdayDateControl
│   ├── BirthdayDateDay
│   ├── BirthdayDateSeparator
│   ├── BirthdayDateMonth
│   ├── BirthdayDateSeparator
│   └── BirthdayDateYear
├── BirthdayDateDescription
└── BirthdayDateError`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full min-w-0 justify-center">
      {children}
    </div>
  )
}

export default function BirthdayDatePage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Birthday Date"
        description={description}
        slug="birthday-date"
      />

      <ComponentPreview code={usageSnippet}>
        <PreviewShell>
          <BirthdayDateDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="birthday-date" />

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
          Compose label, control, help text, and error under{" "}
          <code className="font-mono text-sm">BirthdayDate</code>. Inside the
          control, day, month, and year each render as a separate input box with{" "}
          <code className="font-mono text-sm">BirthdayDateSeparator</code>{" "}
          between them. Digits always display in Persian. Filling a segment
          moves focus to the next; Backspace on an empty segment moves back.
          Paste a full date to fill all parts. Use{" "}
          <code className="font-mono text-sm">parseBirthdayDateValue</code> and{" "}
          <code className="font-mono text-sm">formatBirthdayDateValue</code> for
          the combined string.
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
            code={`<BirthdayDate>
  <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
  <BirthdayDateControl>
    <BirthdayDateDay />
    <BirthdayDateSeparator />
    <BirthdayDateMonth />
    <BirthdayDateSeparator />
    <BirthdayDateYear />
  </BirthdayDateControl>
  <BirthdayDateDescription>
    لطفاً تاریخ تولد را به‌صورت روز/ماه/سال وارد کنید.
  </BirthdayDateDescription>
</BirthdayDate>`}
          >
            <PreviewShell>
              <BirthdayDateDescriptionDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With value
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Pass{" "}
            <code className="font-mono text-sm">defaultValue</code> on each
            segment. Latin digits are converted to Persian.
          </p>
          <ComponentPreview
            code={`<BirthdayDate>
  <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
  <BirthdayDateControl>
    <BirthdayDateDay defaultValue="۱۵" />
    <BirthdayDateSeparator />
    <BirthdayDateMonth defaultValue="۰۶" />
    <BirthdayDateSeparator />
    <BirthdayDateYear defaultValue="۱۳۷۰" />
  </BirthdayDateControl>
  <BirthdayDateDescription>
    لطفاً تاریخ تولد را به‌صورت روز/ماه/سال وارد کنید.
  </BirthdayDateDescription>
</BirthdayDate>`}
          >
            <PreviewShell>
              <BirthdayDateFilledDemo />
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
            code={`<BirthdayDate invalid>
  <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
  <BirthdayDateControl>
    <BirthdayDateDay defaultValue="۳۲" />
    <BirthdayDateSeparator />
    <BirthdayDateMonth defaultValue="۱۳" />
    <BirthdayDateSeparator />
    <BirthdayDateYear defaultValue="۱۳۷۰" />
  </BirthdayDateControl>
  <BirthdayDateError>یک تاریخ تولد معتبر وارد کنید.</BirthdayDateError>
</BirthdayDate>`}
          >
            <PreviewShell>
              <BirthdayDateInvalidDemo />
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
            code={`<BirthdayDate disabled>
  <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
  <BirthdayDateControl>
    <BirthdayDateDay defaultValue="۱۵" />
    <BirthdayDateSeparator />
    <BirthdayDateMonth defaultValue="۰۶" />
    <BirthdayDateSeparator />
    <BirthdayDateYear defaultValue="۱۳۷۰" />
  </BirthdayDateControl>
  <BirthdayDateDescription>این فیلد فعلاً قابل ویرایش نیست.</BirthdayDateDescription>
</BirthdayDate>`}
          >
            <PreviewShell>
              <BirthdayDateDisabledDemo />
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
            code={`<BirthdayDate size="default">
  <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
  <BirthdayDateControl>
    <BirthdayDateDay />
    <BirthdayDateSeparator />
    <BirthdayDateMonth />
    <BirthdayDateSeparator />
    <BirthdayDateYear />
  </BirthdayDateControl>
  <BirthdayDateDescription>ارتفاع ۴۰ پیکسل</BirthdayDateDescription>
</BirthdayDate>
<BirthdayDate size="lg">
  <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
  <BirthdayDateControl>
    <BirthdayDateDay />
    <BirthdayDateSeparator />
    <BirthdayDateMonth />
    <BirthdayDateSeparator />
    <BirthdayDateYear />
  </BirthdayDateControl>
  <BirthdayDateDescription>ارتفاع ۴۸ پیکسل</BirthdayDateDescription>
</BirthdayDate>`}
          >
            <PreviewShell>
              <BirthdayDateSizesDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            In a form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">name</code> on the root to
            submit a combined day/month/year value. Compose with Button for a
            complete block.
          </p>
          <ComponentPreview
            previewClassName="bg-muted"
            code={`<form className="grid w-full max-w-sm gap-6 rounded-xl bg-background p-6">
  <BirthdayDate name="birthday">
    <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
    <BirthdayDateControl>
      <BirthdayDateDay />
      <BirthdayDateSeparator />
      <BirthdayDateMonth />
      <BirthdayDateSeparator />
      <BirthdayDateYear />
    </BirthdayDateControl>
    <BirthdayDateDescription>
      لطفاً تاریخ تولد را به‌صورت روز/ماه/سال وارد کنید.
    </BirthdayDateDescription>
  </BirthdayDate>
  <div className="grid grid-cols-2 gap-2">
    <Button type="button" variant="outline">انصراف</Button>
    <Button type="submit">ادامه</Button>
  </div>
</form>`}
          >
            <PreviewShell>
              <BirthdayDateFormDemo />
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
            Here each segment uses a filled surface instead of the default
            outline:
          </p>
          <ComponentPreview
            code={`<BirthdayDate>
  <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
  <BirthdayDateControl>
    <BirthdayDateDay className="border-border bg-muted dark:bg-muted" />
    <BirthdayDateSeparator />
    <BirthdayDateMonth className="border-border bg-muted dark:bg-muted" />
    <BirthdayDateSeparator />
    <BirthdayDateYear className="border-border bg-muted dark:bg-muted" />
  </BirthdayDateControl>
  <BirthdayDateDescription>
    با className می‌توانید ظاهر را سفارشی کنید.
  </BirthdayDateDescription>
</BirthdayDate>`}
          >
            <PreviewShell>
              <BirthdayDateCustomDemo />
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
            <code className="font-mono">birthday-date</code>,{" "}
            <code className="font-mono">birthday-date-label</code>,{" "}
            <code className="font-mono">birthday-date-control</code>,{" "}
            <code className="font-mono">birthday-date-day</code>,{" "}
            <code className="font-mono">birthday-date-month</code>,{" "}
            <code className="font-mono">birthday-date-year</code>,{" "}
            <code className="font-mono">birthday-date-separator</code>,{" "}
            <code className="font-mono">birthday-date-description</code>,{" "}
            <code className="font-mono">birthday-date-error</code>) for targeting
            in tests and parent selectors. Helpers{" "}
            <code className="font-mono">formatBirthdayDateValue</code> and{" "}
            <code className="font-mono">parseBirthdayDateValue</code> convert
            between display strings and day/month/year parts.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          BirthdayDate
        </h3>
        <PropsTable data={birthdayDatePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          BirthdayDateControl
        </h3>
        <PropsTable data={birthdayDateControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          BirthdayDateDay / Month / Year
        </h3>
        <PropsTable data={birthdayDateSegmentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          BirthdayDateSeparator
        </h3>
        <PropsTable data={birthdayDateSeparatorPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          BirthdayDateLabel / Description / Error
        </h3>
        <PropsTable data={birthdayDatePartPropRows} />
      </section>
    </article>
  )
}
