"use client"

import { MobileIcon } from "@/components/docs/empty-icons"

import {
  PhoneField,
  PhoneFieldClear,
  PhoneFieldControl,
  PhoneFieldDescription,
  PhoneFieldInput,
  PhoneFieldLabel,
} from "../docs-phone-field"

export function PhoneFieldDemo() {
  return (
    <PhoneField className="w-full max-w-sm">
      <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
      <PhoneFieldControl>
        <MobileIcon data-icon="inline-start" className="size-6" />
        <PhoneFieldInput defaultValue="۰۹۱۲۳۴۵۶۷۸۹" placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
        <PhoneFieldClear aria-label="پاک کردن" />
      </PhoneFieldControl>
      <PhoneFieldDescription>
        برای ورود و بازیابی حساب از این شماره استفاده می‌شود.
      </PhoneFieldDescription>
    </PhoneField>
  )
}
