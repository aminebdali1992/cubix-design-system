"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  BirthdayDate,
  BirthdayDateControl,
  BirthdayDateDay,
  BirthdayDateDescription,
  BirthdayDateError,
  BirthdayDateLabel,
  BirthdayDateMonth,
  BirthdayDateSeparator,
  BirthdayDateYear,
} from "@/app/docs/components/birthday-date/docs-birthday-date"

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

export function BirthdayDateDescriptionDemo() {
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
      <BirthdayDateDescription>
        این فیلد فعلاً قابل ویرایش نیست.
      </BirthdayDateDescription>
    </BirthdayDate>
  )
}

export function BirthdayDateSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <BirthdayDate size="default">
        <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
        <BirthdayDateControl>
          <BirthdayDateDay />
          <BirthdayDateSeparator />
          <BirthdayDateMonth />
          <BirthdayDateSeparator />
          <BirthdayDateYear />
        </BirthdayDateControl>
        <BirthdayDateDescription>ارتفاع ۴۰ پیکسل</BirthdayDateDescription>
      </BirthdayDate>
      <BirthdayDate size="lg">
        <BirthdayDateLabel>تاریخ تولد</BirthdayDateLabel>
        <BirthdayDateControl>
          <BirthdayDateDay />
          <BirthdayDateSeparator />
          <BirthdayDateMonth />
          <BirthdayDateSeparator />
          <BirthdayDateYear />
        </BirthdayDateControl>
        <BirthdayDateDescription>ارتفاع ۴۸ پیکسل</BirthdayDateDescription>
      </BirthdayDate>
    </div>
  )
}

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

export function BirthdayDateFormDemo() {
  return (
    <form
      className="grid w-full max-w-sm gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">
          ثبت‌نام
        </p>
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
      <BirthdayDateDescription>
        با className می‌توانید ظاهر را سفارشی کنید.
      </BirthdayDateDescription>
    </BirthdayDate>
  )
}
