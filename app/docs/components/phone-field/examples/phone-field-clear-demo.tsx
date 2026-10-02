"use client"

import {
  PhoneField,
  PhoneFieldClear,
  PhoneFieldControl,
  PhoneFieldInput,
  PhoneFieldLabel,
} from "../docs-phone-field"

export function PhoneFieldClearDemo() {
  return (
    <PhoneField className="w-full max-w-sm">
      <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
      <PhoneFieldControl>
        <PhoneFieldInput defaultValue="۰۹۱۲۳۴۵۶۷۸۹" placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
        <PhoneFieldClear aria-label="پاک کردن" />
      </PhoneFieldControl>
    </PhoneField>
  )
}
