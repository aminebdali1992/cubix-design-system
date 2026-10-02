"use client"

import { SmartphoneIcon } from "lucide-react"

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
        <SmartphoneIcon data-icon="inline-start" />
        <PhoneFieldInput defaultValue="۰۹۱۲۳۴۵۶۷۸۹" placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
        <PhoneFieldClear aria-label="پاک کردن" />
      </PhoneFieldControl>
      <PhoneFieldDescription>
        برای ورود و بازیابی حساب از این شماره استفاده می‌شود.
      </PhoneFieldDescription>
    </PhoneField>
  )
}
