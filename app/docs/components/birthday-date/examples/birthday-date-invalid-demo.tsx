"use client"

import {
  BirthdayDate,
  BirthdayDateControl,
  BirthdayDateDay,
  BirthdayDateError,
  BirthdayDateLabel,
  BirthdayDateMonth,
  BirthdayDateSeparator,
  BirthdayDateYear,
} from "../docs-birthday-date"

export function BirthdayDateInvalidDemo() {
  return (
    <BirthdayDate className="w-full max-w-sm" invalid>
      <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
      <BirthdayDateControl>
        <BirthdayDateDay defaultValue="۳۲" />
        <BirthdayDateSeparator />
        <BirthdayDateMonth defaultValue="۱۳" />
        <BirthdayDateSeparator />
        <BirthdayDateYear defaultValue="۱۳۷۰" />
      </BirthdayDateControl>
      <BirthdayDateError>یک تاریخ تولد معتبر وارد کنید.</BirthdayDateError>
    </BirthdayDate>
  )
}
