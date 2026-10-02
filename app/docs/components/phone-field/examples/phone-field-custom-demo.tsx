"use client"

import {
  PhoneField,
  PhoneFieldDescription,
  PhoneFieldInput,
  PhoneFieldLabel,
} from "../docs-phone-field"

export function PhoneFieldCustomDemo() {
  return (
    <PhoneField className="w-full max-w-sm">
      <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
      <PhoneFieldInput
        className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
        placeholder="۰۹۱۲۰۰۰۰۰۰۰"
      />
      <PhoneFieldDescription>با className می‌توانید ظاهر را سفارشی کنید.</PhoneFieldDescription>
    </PhoneField>
  )
}
