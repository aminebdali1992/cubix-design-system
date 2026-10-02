"use client"

import { MailIcon } from "lucide-react"

import {
  EmailField,
  EmailFieldClear,
  EmailFieldControl,
  EmailFieldDescription,
  EmailFieldInput,
  EmailFieldLabel,
} from "../docs-email-field"

const sizes = [
  { size: "default", hint: "ارتفاع ۴۰ پیکسل" },
  { size: "lg", hint: "ارتفاع ۴۸ پیکسل" },
] as const

export function EmailFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      {sizes.map(({ size, hint }) => (
        <EmailField key={size} size={size}>
          <EmailFieldLabel>ایمیل</EmailFieldLabel>
          <EmailFieldControl>
            <MailIcon data-icon="inline-start" />
            <EmailFieldInput placeholder="example@cubix.com" />
            <EmailFieldClear aria-label="پاک کردن" />
          </EmailFieldControl>
          <EmailFieldDescription>{hint}</EmailFieldDescription>
        </EmailField>
      ))}
    </div>
  )
}
