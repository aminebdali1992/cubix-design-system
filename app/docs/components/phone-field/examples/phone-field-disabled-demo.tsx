"use client"

import {
  PhoneField,
  PhoneFieldDescription,
  PhoneFieldInput,
  PhoneFieldLabel,
} from "../docs-phone-field"

export function PhoneFieldDisabledDemo() {
  return (
    <PhoneField className="w-full max-w-sm" disabled>
      <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
      <PhoneFieldInput defaultValue="۰۹۱۲۳۴۵۶۷۸۹" placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
      <PhoneFieldDescription>این فیلد فعلاً قابل ویرایش نیست.</PhoneFieldDescription>
    </PhoneField>
  )
}
