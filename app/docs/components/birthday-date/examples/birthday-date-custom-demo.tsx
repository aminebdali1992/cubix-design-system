"use client"

import {
  BirthdayDate,
  BirthdayDateControl,
  BirthdayDateDay,
  BirthdayDateDescription,
  BirthdayDateLabel,
  BirthdayDateMonth,
  BirthdayDateSeparator,
  BirthdayDateYear,
} from "../docs-birthday-date"

export function BirthdayDateCustomDemo() {
  return (
    <BirthdayDate className="w-full max-w-sm">
      <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
      <BirthdayDateControl>
        <BirthdayDateDay className="border-border bg-muted dark:bg-muted" />
        <BirthdayDateSeparator />
        <BirthdayDateMonth className="border-border bg-muted dark:bg-muted" />
        <BirthdayDateSeparator />
        <BirthdayDateYear className="border-border bg-muted dark:bg-muted" />
      </BirthdayDateControl>
      <BirthdayDateDescription>با className می‌توانید ظاهر را سفارشی کنید.</BirthdayDateDescription>
    </BirthdayDate>
  )
}
