import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import { BirthdayDateCustomDemo } from "./examples/birthday-date-custom-demo"
import { BirthdayDateDemo } from "./examples/birthday-date-demo"
import { BirthdayDateDescriptionDemo } from "./examples/birthday-date-description-demo"
import { BirthdayDateDisabledDemo } from "./examples/birthday-date-disabled-demo"
import { BirthdayDateFilledDemo } from "./examples/birthday-date-filled-demo"
import { BirthdayDateFormDemo } from "./examples/birthday-date-form-demo"
import { BirthdayDateInvalidDemo } from "./examples/birthday-date-invalid-demo"
import { BirthdayDateSizesDemo } from "./examples/birthday-date-sizes-demo"
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

const PUBLIC_IMPORT = "@/components/cubix/birthday-date"
const EXAMPLES_DIR = "app/docs/components/birthday-date/examples"

function loadBirthdayDateExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

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

/*
  Persian labels need lang="fa" so the IRANSans Cubix faces apply. Docs
  chrome only - not part of the paste-ready example source.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full min-w-0 justify-center">
      {children}
    </div>
  )
}

function ExampleSection({
  title,
  description,
  code,
  previewClassName,
  children,
}: {
  title: string
  description: ReactNode
  code: string
  previewClassName?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
      <ComponentPreview code={code} previewClassName={previewClassName}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function BirthdayDatePage() {
  const demoSource = loadBirthdayDateExample("birthday-date-demo.tsx")
  const descriptionSource = loadBirthdayDateExample("birthday-date-description-demo.tsx")
  const filledSource = loadBirthdayDateExample("birthday-date-filled-demo.tsx")
  const invalidSource = loadBirthdayDateExample("birthday-date-invalid-demo.tsx")
  const disabledSource = loadBirthdayDateExample("birthday-date-disabled-demo.tsx")
  const sizesSource = loadBirthdayDateExample("birthday-date-sizes-demo.tsx")
  const formSource = loadBirthdayDateExample("birthday-date-form-demo.tsx")
  const customSource = loadBirthdayDateExample("birthday-date-custom-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Birthday Date" description={description} slug="birthday-date" />

      <ComponentPreview code={demoSource}>
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
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Compose label, control, help text, and error under <Code>BirthdayDate</Code>. Inside the
          control, day, month, and year each render as a separate input with{" "}
          <Code>BirthdayDateSeparator</Code> between them. Digits always display in Persian. Filling
          a segment moves focus to the next; Backspace on an empty segment moves back. Paste a full
          date to fill all parts. Use <Code>parseBirthdayDateValue</Code> and{" "}
          <Code>formatBirthdayDateValue</Code> for the combined string.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          Each segment has its own accessible name (day, month, year). Auto-advance and Backspace
          keep keyboard entry on one path without trapping focus.{" "}
          <Code>BirthdayDateDescription</Code> and <Code>BirthdayDateError</Code> are announced
          through <Code>aria-describedby</Code>, and <Code>invalid</Code> sets{" "}
          <Code>aria-invalid</Code> on every segment. Set <Code>name</Code> on the root to submit a
          single hidden value for the full date.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Description"
          description="Add helper text below the control for format hints or guidance."
          code={descriptionSource}
        >
          <BirthdayDateDescriptionDemo />
        </ExampleSection>

        <ExampleSection
          title="Filled"
          description={
            <>
              Pass <Code>defaultValue</Code> on each segment to show a complete date.
            </>
          }
          code={filledSource}
        >
          <BirthdayDateFilledDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              Set <Code>invalid</Code> on the root to apply destructive styles and show{" "}
              <Code>BirthdayDateError</Code>.
            </>
          }
          code={invalidSource}
        >
          <BirthdayDateInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disable the field to block every segment. The control uses a muted fill; label and description stay readable."
          code={disabledSource}
        >
          <BirthdayDateDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description={
            <>
              Two heights ship by default: <Code>default</Code> (40px) and <Code>lg</Code> (48px).
              Use <Code>className</Code> for any other size.
            </>
          }
          code={sizesSource}
        >
          <BirthdayDateSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="In a form"
          description={
            <>
              Set <Code>name</Code> on the root so the combined date is submitted with the form, and
              pair the field with Cubix Button.
            </>
          }
          code={formSource}
          previewClassName="bg-muted"
        >
          <BirthdayDateFormDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Every part accepts a <Code>className</Code> merged with the shipped <Code>cn</Code>{" "}
              helper. Here each segment uses a filled surface instead of the default outline.
            </>
          }
          code={customSource}
        >
          <BirthdayDateCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>birthday-date</Code>, <Code>birthday-date-label</Code>,{" "}
            <Code>birthday-date-control</Code>, <Code>birthday-date-day</Code>,{" "}
            <Code>birthday-date-month</Code>, <Code>birthday-date-year</Code>,{" "}
            <Code>birthday-date-separator</Code>, <Code>birthday-date-description</Code>,{" "}
            <Code>birthday-date-error</Code>) for targeting in tests and parent selectors. Use the
            same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">BirthdayDate</h3>
        <PropsTable data={birthdayDatePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">BirthdayDateControl</h3>
        <PropsTable data={birthdayDateControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">BirthdayDateDay / Month / Year</h3>
        <PropsTable data={birthdayDateSegmentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">BirthdayDateSeparator</h3>
        <PropsTable data={birthdayDateSeparatorPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          BirthdayDateLabel / Description / Error
        </h3>
        <PropsTable data={birthdayDatePartPropRows} />
      </section>
    </article>
  )
}
