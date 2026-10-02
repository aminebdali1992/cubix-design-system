"use client"

import * as React from "react"
import { faIR } from "react-day-picker/locale"

import { Calendar } from "../docs-calendar"

export function CalendarTimezoneDemo() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [timeZone, setTimeZone] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        timeZone={timeZone}
        locale={faIR}
        dir="rtl"
        numerals="arabext"
        className="rounded-lg border"
      />
      <p className="text-center text-description text-muted-foreground">
        {timeZone ? `منطقه زمانی: ${timeZone}` : "در حال تشخیص منطقه زمانی..."}
        {date ? ` · انتخاب‌شده: ${date.toLocaleDateString("fa-IR", { dateStyle: "long" })}` : null}
      </p>
    </div>
  )
}
