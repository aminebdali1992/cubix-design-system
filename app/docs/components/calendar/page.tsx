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
import { calendarPropRows } from "./calendar-table-data"
import { CalendarBookedDemo } from "./examples/calendar-booked-demo"
import { CalendarDemo } from "./examples/calendar-demo"
import { CalendarDropdownDemo } from "./examples/calendar-dropdown-demo"
import { CalendarPopoverDemo } from "./examples/calendar-popover-demo"
import { CalendarRangeDemo } from "./examples/calendar-range-demo"
import { CalendarTimezoneDemo } from "./examples/calendar-timezone-demo"
import { CalendarWeekNumbersDemo } from "./examples/calendar-week-numbers-demo"

const description = "A date picker calendar for selecting a day, several days, or a range."

export const metadata: Metadata = {
  title: "Calendar",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/calendar"
const EXAMPLES_DIR = "app/docs/components/calendar/examples"

function loadCalendarExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Calendar
└── DayPicker (locale, dir, numerals)`

/*
  Persian labels need lang="fa" so the IRANSans Cubix faces apply. Docs
  chrome only - not part of the paste-ready example source. Demos also pass
  dir="rtl" and locale={faIR} on Calendar itself.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

function ExampleSection({
  title,
  description,
  code,
  children,
}: {
  title: string
  description: ReactNode
  code: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
      <ComponentPreview code={code}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function CalendarPage() {
  const demoSource = loadCalendarExample("calendar-demo.tsx")
  const rangeSource = loadCalendarExample("calendar-range-demo.tsx")
  const dropdownSource = loadCalendarExample("calendar-dropdown-demo.tsx")
  const bookedSource = loadCalendarExample("calendar-booked-demo.tsx")
  const weekSource = loadCalendarExample("calendar-week-numbers-demo.tsx")
  const popoverSource = loadCalendarExample("calendar-popover-demo.tsx")
  const timezoneSource = loadCalendarExample("calendar-timezone-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Calendar" description={description} slug="calendar" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <CalendarDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="calendar" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Calendar wraps React DayPicker and styles nav and day cells with the Cubix{" "}
          <Code>Button</Code> of each base. Pass <Code>locale=&#123;faIR&#125;</Code>,{" "}
          <Code>dir=&quot;rtl&quot;</Code> and <Code>numerals=&quot;arabext&quot;</Code> for Persian
          labels and digits. Range corners and chevrons use logical properties and{" "}
          <Code>cn-rtl-flip</Code>. For the Persian Solar Hijri calendar, install{" "}
          <Code>@daypicker/persian</Code> and swap the <Code>DayPicker</Code> import in{" "}
          <Code>calendar.tsx</Code>.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          Day cells are buttons. Arrow keys move through the grid, Enter or Space selects, and the
          previous/next month controls are named by DayPicker. Set <Code>timeZone</Code> on the
          client when the highlighted day looks one day off.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Range"
          description={
            <>
              Use <Code>mode=&quot;range&quot;</Code> with <Code>numberOfMonths=&#123;2&#125;</Code>{" "}
              to pick a start and end date across two months.
            </>
          }
          code={rangeSource}
        >
          <CalendarRangeDemo />
        </ExampleSection>

        <ExampleSection
          title="Month and year selector"
          description={
            <>
              Set <Code>captionLayout=&quot;dropdown&quot;</Code> to jump months and years from the
              caption.
            </>
          }
          code={dropdownSource}
        >
          <CalendarDropdownDemo />
        </ExampleSection>

        <ExampleSection
          title="Booked dates"
          description="Disable dates and mark them with modifiers for a booked look."
          code={bookedSource}
        >
          <CalendarBookedDemo />
        </ExampleSection>

        <ExampleSection
          title="Week numbers"
          description={
            <>
              Use <Code>showWeekNumber</Code> to show ISO week numbers in a leading column.
            </>
          }
          code={weekSource}
        >
          <CalendarWeekNumbersDemo />
        </ExampleSection>

        <ExampleSection
          title="Date picker"
          description="Compose Calendar with Popover to build a date picker field."
          code={popoverSource}
        >
          <CalendarPopoverDemo />
        </ExampleSection>

        <ExampleSection
          title="Timezone"
          description={
            <>
              Pass <Code>timeZone</Code> from the client so the selected day matches the user&apos;s
              local timezone and hydration stays stable.
            </>
          }
          code={timezoneSource}
        >
          <CalendarTimezoneDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> The root renders{" "}
            <Code>data-slot=&quot;calendar&quot;</Code>. Calendar forwards React DayPicker props.
            Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Calendar</h3>
        <PropsTable data={calendarPropRows} />
      </section>
    </article>
  )
}
