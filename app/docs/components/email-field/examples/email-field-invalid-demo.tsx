"use client"

import { EmailField, EmailFieldError, EmailFieldInput, EmailFieldLabel } from "../docs-email-field"

export function EmailFieldInvalidDemo() {
  return (
    <EmailField className="w-full max-w-sm" invalid>
      <EmailFieldLabel>ایمیل</EmailFieldLabel>
      <EmailFieldInput defaultValue="amin@" placeholder="example@cubix.com" />
      <EmailFieldError>یک آدرس ایمیل معتبر وارد کنید.</EmailFieldError>
    </EmailField>
  )
}
