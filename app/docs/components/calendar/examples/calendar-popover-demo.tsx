"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { faIR } from "react-day-picker/locale"

import { Button } from "@/app/docs/components/button/docs-button"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/docs/components/popover/docs-popover"
import { Calendar } from "../docs-calendar"

export function CalendarPopoverDemo() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        <CalendarIcon data-icon="inline-start" />
        {date ? date.toLocaleDateString("fa-IR", { dateStyle: "long" }) : "انتخاب تاریخ"}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={faIR}
          dir="rtl"
          numerals="arabext"
        />
      </PopoverContent>
    </Popover>
  )
}
