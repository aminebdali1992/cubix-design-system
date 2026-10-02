"use client"

import {
  PhoneField,
  PhoneFieldDescription,
  PhoneFieldInput,
  PhoneFieldLabel,
} from "../docs-phone-field"

export function PhoneFieldDescriptionDemo() {
  return (
    <PhoneField className="w-full max-w-sm">
      <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
      <PhoneFieldInput placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
      <PhoneFieldDescription>شماره باید با ۰۹ شروع شود و ۱۱ رقم باشد.</PhoneFieldDescription>
    </PhoneField>
  )
}
