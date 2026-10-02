"use client"

import * as React from "react"
import { addDays } from "date-fns"
import { type DateRange } from "react-day-picker"
import { faIR } from "react-day-picker/locale"

import { Calendar } from "../docs-calendar"

const RANGE_LENGTH_DAYS = 10

export function CalendarRangeDemo() {
  const start = new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: start,
    to: addDays(start, RANGE_LENGTH_DAYS),
  })

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={2}
      locale={faIR}
      dir="rtl"
      numerals="arabext"
      className="rounded-lg border"
    />
  )
}
