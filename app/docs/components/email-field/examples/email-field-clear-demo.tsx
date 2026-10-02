"use client"

import {
  EmailField,
  EmailFieldClear,
  EmailFieldControl,
  EmailFieldInput,
  EmailFieldLabel,
} from "../docs-email-field"

export function EmailFieldClearDemo() {
  return (
    <EmailField className="w-full max-w-sm">
      <EmailFieldLabel>ایمیل</EmailFieldLabel>
      <EmailFieldControl>
        <EmailFieldInput defaultValue="amin@cubix.com" placeholder="example@cubix.com" />
        <EmailFieldClear aria-label="پاک کردن" />
      </EmailFieldControl>
    </EmailField>
  )
}
