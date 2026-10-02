"use client"

import * as React from "react"
import { faIR } from "react-day-picker/locale"

import { Calendar } from "../docs-calendar"

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      locale={faIR}
      dir="rtl"
      numerals="arabext"
      className="rounded-lg border"
    />
  )
}
