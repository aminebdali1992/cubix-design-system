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

export function BirthdayDateFilledDemo() {
  return (
    <BirthdayDate className="w-full max-w-sm">
      <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
      <BirthdayDateControl>
        <BirthdayDateDay defaultValue="۱۵" />
        <BirthdayDateSeparator />
        <BirthdayDateMonth defaultValue="۰۶" />
        <BirthdayDateSeparator />
        <BirthdayDateYear defaultValue="۱۳۷۰" />
      </BirthdayDateControl>
      <BirthdayDateDescription>
        لطفاً تاریخ تولد را به‌صورت روز/ماه/سال وارد کنید.
      </BirthdayDateDescription>
    </BirthdayDate>
  )
}
