"use client"

import {
  EmailField,
  EmailFieldDescription,
  EmailFieldInput,
  EmailFieldLabel,
} from "../docs-email-field"

export function EmailFieldCustomDemo() {
  return (
    <EmailField className="w-full max-w-sm">
      <EmailFieldLabel>ایمیل</EmailFieldLabel>
      <EmailFieldInput
        className="border-border bg-muted focus-visible:bg-background dark:bg-muted dark:focus-visible:bg-background"
        placeholder="example@cubix.com"
      />
      <EmailFieldDescription>با className می‌توانید ظاهر را سفارشی کنید.</EmailFieldDescription>
    </EmailField>
  )
}
