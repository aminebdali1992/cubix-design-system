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

export function EmailFieldDemo() {
  return (
    <EmailField className="w-full max-w-sm">
      <EmailFieldLabel>ایمیل</EmailFieldLabel>
      <EmailFieldControl>
        <MailIcon data-icon="inline-start" />
        <EmailFieldInput defaultValue="amin@cubix.com" placeholder="example@cubix.com" />
        <EmailFieldClear aria-label="پاک کردن" />
      </EmailFieldControl>
      <EmailFieldDescription>
        برای ورود و بازیابی حساب از این ایمیل استفاده می‌شود.
      </EmailFieldDescription>
    </EmailField>
  )
}
