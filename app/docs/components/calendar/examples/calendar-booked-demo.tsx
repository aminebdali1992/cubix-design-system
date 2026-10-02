"use client"

import * as React from "react"
import { faIR } from "react-day-picker/locale"

import { Calendar } from "../docs-calendar"

const BOOKED_COUNT = 8
const BOOKED_START_DAY = 12

export function CalendarBookedDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(new Date().getFullYear(), 1, 3))
  const bookedDates = Array.from(
    { length: BOOKED_COUNT },
    (_, index) => new Date(new Date().getFullYear(), 1, BOOKED_START_DAY + index)
  )

  return (
    <Calendar
      mode="single"
      defaultMonth={date}
      selected={date}
      onSelect={setDate}
      disabled={bookedDates}
      modifiers={{ booked: bookedDates }}
      modifiersClassNames={{
        booked: "[&>button]:line-through opacity-100",
      }}
      locale={faIR}
      dir="rtl"
      numerals="arabext"
      className="rounded-lg border"
    />
  )
}
