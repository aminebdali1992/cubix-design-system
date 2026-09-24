import type { Metadata } from "next"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  CalendarBasicDemo,
  CalendarBookedDemo,
  CalendarDropdownDemo,
  CalendarPopoverDemo,
  CalendarRangeDemo,
  CalendarWeekNumbersDemo,
} from "@/components/examples/calendar-examples"
import { calendarPropRows } from "./calendar-table-data"

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "A calendar component that allows users to select a date or a range of dates.",
}

const usageImport = `import { Calendar } from "@/components/cubix/calendar"`

const usageSnippet = `const [date, setDate] = React.useState<Date | undefined>(new Date())

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-lg border"
  />
)`

const rangeSnippet = `<Calendar
  mode="range"
  selected={dateRange}
  onSelect={setDateRange}
  numberOfMonths={2}
  className="rounded-lg border"
/>`

const dropdownSnippet = `<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  captionLayout="dropdown"
  className="rounded-lg border"
/>`

const bookedSnippet = `<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={bookedDates}
  modifiers={{ booked: bookedDates }}
  modifiersClassNames={{
    booked: "[&>button]:line-through opacity-100",
  }}
  className="rounded-lg border"
/>`

const weekSnippet = `<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  showWeekNumber
  className="rounded-lg border"
/>`

const popoverSnippet = `<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    <CalendarIcon data-icon="inline-start" />
    {date ? date.toLocaleDateString() : "Pick a date"}
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar mode="single" selected={date} onSelect={setDate} />
  </PopoverContent>
</Popover>`

const jalaliSnippet = `import { DayPicker } from "react-day-picker/persian"`

const timezoneSnippet = `const [date, setDate] = React.useState<Date | undefined>(undefined)
const [timeZone, setTimeZone] = React.useState<string | undefined>(undefined)

React.useEffect(() => {
  setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
}, [])

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    timeZone={timeZone}
  />
)`

export default function CalendarDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Calendar"
        description="A calendar component that allows users to select a date or a range of dates."
        slug="calendar"
      />

      <ComponentPreview code={usageSnippet}>
        <CalendarBasicDemo />
      </ComponentPreview>

      <ComponentInstall name="calendar" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">About</h2>
        <p className="leading-relaxed text-muted-foreground">
          The Calendar is built on React DayPicker. See the DayPicker docs for
          the full prop surface.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Basic</h3>
          <p className="leading-relaxed text-muted-foreground">
            A single-date calendar.{" "}
            <code className="font-mono text-sm">rounded-lg border</code> gives
            it a panel look.
          </p>
          <ComponentPreview code={usageSnippet}>
            <CalendarBasicDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Range Calendar
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">mode=&quot;range&quot;</code>{" "}
            to select a start and end date.
          </p>
          <ComponentPreview code={rangeSnippet}>
            <CalendarRangeDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Month and Year Selector
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set{" "}
            <code className="font-mono text-sm">
              captionLayout=&quot;dropdown&quot;
            </code>{" "}
            to jump months and years.
          </p>
          <ComponentPreview code={dropdownSnippet}>
            <CalendarDropdownDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Booked dates
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Disable dates and mark them with modifiers for a booked look.
          </p>
          <ComponentPreview code={bookedSnippet}>
            <CalendarBookedDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Week Numbers
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">showWeekNumber</code> to
            show week numbers.
          </p>
          <ComponentPreview code={weekSnippet}>
            <CalendarWeekNumbersDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Date picker
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose Calendar with Popover to build a date picker field.
          </p>
          <ComponentPreview code={popoverSnippet}>
            <CalendarPopoverDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Persian / Jalali
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            To use the Persian calendar, import DayPicker from{" "}
            <code className="font-mono text-sm">
              react-day-picker/persian
            </code>{" "}
            instead of <code className="font-mono text-sm">react-day-picker</code>{" "}
            in <code className="font-mono text-sm">calendar.tsx</code>.
          </p>
          <CodeBlock code={jalaliSnippet} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Selected Date (With TimeZone)
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Pass <code className="font-mono text-sm">timeZone</code> from the
            client so the selected day matches the user&apos;s local timezone.
          </p>
          <CodeBlock code={timezoneSnippet} />
        </div>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Calendar forwards
            React DayPicker props. Set{" "}
            <code className="font-mono">timeZone</code> on the client if the
            highlighted day looks one day off.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Calendar</h3>
        <p className="leading-relaxed text-muted-foreground">
          The calendar that lets users pick a date or a range of dates.
        </p>
        <PropsTable data={calendarPropRows} />
      </section>
    </article>
  )
}
