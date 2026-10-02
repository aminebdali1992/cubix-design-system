"use client"

import { PhoneField, PhoneFieldError, PhoneFieldInput, PhoneFieldLabel } from "../docs-phone-field"

export function PhoneFieldInvalidDemo() {
  return (
    <PhoneField className="w-full max-w-sm" invalid>
      <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
      <PhoneFieldInput defaultValue="۰۹۱۲" placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
      <PhoneFieldError>یک شماره همراه معتبر وارد کنید.</PhoneFieldError>
    </PhoneField>
  )
}
