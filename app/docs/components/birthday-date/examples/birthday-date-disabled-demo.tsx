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

export function BirthdayDateDisabledDemo() {
  return (
    <BirthdayDate className="w-full max-w-sm" disabled>
      <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
      <BirthdayDateControl>
        <BirthdayDateDay defaultValue="۱۵" />
        <BirthdayDateSeparator />
        <BirthdayDateMonth defaultValue="۰۶" />
        <BirthdayDateSeparator />
        <BirthdayDateYear defaultValue="۱۳۷۰" />
      </BirthdayDateControl>
      <BirthdayDateDescription>این فیلد فعلاً قابل ویرایش نیست.</BirthdayDateDescription>
    </BirthdayDate>
  )
}
