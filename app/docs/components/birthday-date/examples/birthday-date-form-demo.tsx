"use client"

import { Button } from "@/app/docs/components/button/docs-button"
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

export function BirthdayDateFormDemo() {
  return (
    <form
      className="grid w-full max-w-sm gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">ثبت‌نام</p>
        <p className="text-caption text-muted-foreground">
          برای ادامه، تاریخ تولد خود را وارد کنید.
        </p>
      </div>
      <BirthdayDate name="birthday">
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
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ادامه</Button>
      </div>
    </form>
  )
}
