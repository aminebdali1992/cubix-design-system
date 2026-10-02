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

const sizes = [
  { size: "default", hint: "ارتفاع ۴۰ پیکسل" },
  { size: "lg", hint: "ارتفاع ۴۸ پیکسل" },
] as const

export function PhoneFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      {sizes.map(({ size, hint }) => (
        <PhoneField key={size} size={size}>
          <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
          <PhoneFieldControl>
            <SmartphoneIcon data-icon="inline-start" />
            <PhoneFieldInput placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
            <PhoneFieldClear aria-label="پاک کردن" />
          </PhoneFieldControl>
          <PhoneFieldDescription>{hint}</PhoneFieldDescription>
        </PhoneField>
      ))}
    </div>
  )
}
