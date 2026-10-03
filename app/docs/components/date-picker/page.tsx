import type { Metadata } from "next"
import Link from "next/link"

import { CodeBlock } from "@/components/docs/code-block"
import { CodeBlockCommand } from "@/components/docs/code-block-command"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentPreview } from "@/components/docs/component-preview"
import {
  DatePickerBasicDemo,
  DatePickerDemo,
  DatePickerDobDemo,
  DatePickerInputDemo,
  DatePickerNaturalLanguageDemo,
  DatePickerRangeDemo,
  DatePickerTimeDemo,
} from "@/components/examples/date-picker-examples"

const description = "A date picker component with range and presets."

export const metadata: Metadata = {
  title: "Date Picker",
  description,
}

const usageSnippet = `"use client"

import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import { Calendar } from "@/components/cubix/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/cubix/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
          />
        }
      >
        {date ? format(date, "PPP") : <span>Pick a date</span>}
        <ChevronDownIcon data-icon="inline-end" />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  )
}`

const compositionSnippet = `Popover
├── PopoverTrigger
└── PopoverContent
    └── Calendar`

const basicSnippet = `<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    {date ? format(date, "PPP") : <span>Pick a date</span>}
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar mode="single" selected={date} onSelect={setDate} />
  </PopoverContent>
</Popover>`

const rangeSnippet = `<Calendar
  mode="range"
  defaultMonth={date?.from}
  selected={date}
  onSelect={setDate}
  numberOfMonths={2}
/>`

const dobSnippet = `<Calendar
  mode="single"
  selected={date}
  captionLayout="dropdown"
  onSelect={(date) => {
    setDate(date)
    setOpen(false)
  }}
/>`

const inputSnippet = `<InputGroup>
  <InputGroupInput value={value} onChange={...} />
  <InputGroupAddon align="inline-end">
    <Popover>
      <PopoverTrigger render={<InputGroupButton size="icon-xs" />}>
        <CalendarIcon />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={...} />
      </PopoverContent>
    </Popover>
  </InputGroupAddon>
</InputGroup>`

const timeSnippet = `<Input
  type="time"
  step="1"
  defaultValue="10:30:00"
  className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden"
/>`

const naturalSnippet = `import { parseDate } from "chrono-node"

const date = parseDate(value)`

export default function DatePickerDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Date Picker"
        description={description}
        slug="date-picker"
      />

      <ComponentPreview code={usageSnippet}>
        <DatePickerDemo />
      </ComponentPreview>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Installation
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          The Date Picker is built using a composition of the{" "}
          <code className="font-mono text-sm">Popover</code> and the{" "}
          <code className="font-mono text-sm">Calendar</code> components.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          See installation instructions for the{" "}
          <Link
            href="/docs/components/popover"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
          >
            Popover
          </Link>{" "}
          and the{" "}
          <Link
            href="/docs/components/calendar"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
          >
            Calendar
          </Link>{" "}
          components.
        </p>
        <CodeBlockCommand
          commands={{
            pnpm: "pnpm dlx cubix-ui@latest add calendar popover",
            npm: "npx cubix-ui@latest add calendar popover",
            yarn: "yarn dlx cubix-ui@latest add calendar popover",
            bun: "bunx --bun cubix-ui@latest add calendar popover",
          }}
        />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageSnippet} title="components/example-date-picker.tsx" />
        <p className="leading-relaxed text-muted-foreground">
          See the{" "}
          <a
            href="https://react-day-picker.js.org"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
            rel="noreferrer"
            target="_blank"
          >
            React DayPicker
          </a>{" "}
          documentation for more information.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          A date picker is built from{" "}
          <code className="font-mono text-sm">Popover</code> and{" "}
          <code className="font-mono text-sm">Calendar</code> (there is no{" "}
          <code className="font-mono text-sm">DatePicker</code> root component):
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Basic</h3>
          <p className="leading-relaxed text-muted-foreground">
            A basic date picker component.
          </p>
          <ComponentPreview code={basicSnippet}>
            <DatePickerBasicDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Range Picker
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            A date picker component for selecting a range of dates.
          </p>
          <ComponentPreview code={rangeSnippet}>
            <DatePickerRangeDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Date of Birth
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            A date picker for selecting a date of birth, with a dropdown caption
            layout for month and year.
          </p>
          <ComponentPreview code={dobSnippet}>
            <DatePickerDobDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Input</h3>
          <p className="leading-relaxed text-muted-foreground">
            A date picker with an input field for selecting a date.
          </p>
          <ComponentPreview code={inputSnippet}>
            <DatePickerInputDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Time Picker
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            A date picker with a time input field for selecting a time.
          </p>
          <ComponentPreview code={timeSnippet}>
            <DatePickerTimeDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Natural Language Picker
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            This component uses the{" "}
            <code className="font-mono text-sm">chrono-node</code> library to
            parse natural language dates.
          </p>
          <CodeBlockCommand
            commands={{
              pnpm: "pnpm add chrono-node",
              npm: "npm install chrono-node",
              yarn: "yarn add chrono-node",
              bun: "bun add chrono-node",
            }}
          />
          <ComponentPreview code={naturalSnippet}>
            <DatePickerNaturalLanguageDemo />
          </ComponentPreview>
        </div>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          See the{" "}
          <Link
            href="/docs/components/calendar"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
          >
            Calendar
          </Link>{" "}
          and{" "}
          <Link
            href="/docs/components/popover"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
          >
            Popover
          </Link>{" "}
          docs, plus the{" "}
          <a
            href="https://react-day-picker.js.org"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
            rel="noreferrer"
            target="_blank"
          >
            React DayPicker
          </a>{" "}
          documentation.
        </p>
      </section>
    </article>
  )
}
