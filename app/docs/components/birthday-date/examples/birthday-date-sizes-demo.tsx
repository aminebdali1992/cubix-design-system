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

const sizes = [
  { size: "default", hint: "ارتفاع ۴۰ پیکسل" },
  { size: "lg", hint: "ارتفاع ۴۸ پیکسل" },
] as const

export function BirthdayDateSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      {sizes.map(({ size, hint }) => (
        <BirthdayDate key={size} size={size}>
          <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
          <BirthdayDateControl>
            <BirthdayDateDay />
            <BirthdayDateSeparator />
            <BirthdayDateMonth />
            <BirthdayDateSeparator />
            <BirthdayDateYear />
          </BirthdayDateControl>
          <BirthdayDateDescription>{hint}</BirthdayDateDescription>
        </BirthdayDate>
      ))}
    </div>
  )
}
