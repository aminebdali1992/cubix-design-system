"use client"

import {
  EmailField,
  EmailFieldDescription,
  EmailFieldInput,
  EmailFieldLabel,
} from "../docs-email-field"

export function EmailFieldDescriptionDemo() {
  return (
    <EmailField className="w-full max-w-sm">
      <EmailFieldLabel>ایمیل کاری</EmailFieldLabel>
      <EmailFieldInput placeholder="name@company.com" />
      <EmailFieldDescription>ترجیحاً از ایمیل سازمانی خود استفاده کنید.</EmailFieldDescription>
    </EmailField>
  )
}
