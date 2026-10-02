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

export function BirthdayDateDemo() {
  return (
    <BirthdayDate className="w-full max-w-sm">
      <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
      <BirthdayDateControl>
        <BirthdayDateDay />
        <BirthdayDateSeparator />
        <BirthdayDateMonth />
        <BirthdayDateSeparator />
        <BirthdayDateYear />
      </BirthdayDateControl>
      <BirthdayDateDescription>
        لطفاً تاریخ تولد را به‌صورت روز/ماه/سال وارد کنید.
      </BirthdayDateDescription>
    </BirthdayDate>
  )
}
