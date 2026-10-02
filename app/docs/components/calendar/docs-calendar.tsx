"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaCalendar from "@/components/cubix/aria/calendar"
import * as BaseCalendar from "@/components/cubix/base/calendar"
import * as RadixCalendar from "@/components/cubix/radix/calendar"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type CalendarProps = ComponentProps<typeof BaseCalendar.Calendar>

function useCalendarBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Calendar(props: CalendarProps) {
  const base = useCalendarBase()

  if (base === "radix") {
    return <RadixCalendar.Calendar {...props} />
  }

  if (base === "aria") {
    return <AriaCalendar.Calendar {...props} />
  }

  return <BaseCalendar.Calendar {...props} />
}

function CalendarDayButton(props: ComponentProps<typeof BaseCalendar.CalendarDayButton>) {
  const base = useCalendarBase()

  if (base === "radix") {
    return <RadixCalendar.CalendarDayButton {...props} />
  }

  if (base === "aria") {
    return <AriaCalendar.CalendarDayButton {...props} />
  }

  return <BaseCalendar.CalendarDayButton {...props} />
}

export { Calendar, CalendarDayButton }
