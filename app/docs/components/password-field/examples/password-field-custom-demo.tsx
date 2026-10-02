"use client"

import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldDescription,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "../docs-password-field"

export function PasswordFieldCustomDemo() {
  return (
    <PasswordField className="w-full max-w-sm">
      <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
      <PasswordFieldControl className="border-border bg-muted has-[[data-slot=password-field-input]:focus-visible]:bg-background dark:bg-muted dark:has-[[data-slot=password-field-input]:focus-visible]:bg-background">
        <PasswordFieldInput placeholder="رمز عبور خود را وارد کنید" />
        <PasswordFieldToggle />
      </PasswordFieldControl>
      <PasswordFieldDescription>
        با className می‌توانید ظاهر را سفارشی کنید.
      </PasswordFieldDescription>
    </PasswordField>
  )
}
