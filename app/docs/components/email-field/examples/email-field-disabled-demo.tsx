"use client"

import {
  EmailField,
  EmailFieldDescription,
  EmailFieldInput,
  EmailFieldLabel,
} from "../docs-email-field"

export function EmailFieldDisabledDemo() {
  return (
    <EmailField className="w-full max-w-sm" disabled>
      <EmailFieldLabel>ایمیل</EmailFieldLabel>
      <EmailFieldInput defaultValue="amin@cubix.com" placeholder="example@cubix.com" />
      <EmailFieldDescription>این فیلد فعلاً قابل ویرایش نیست.</EmailFieldDescription>
    </EmailField>
  )
}
