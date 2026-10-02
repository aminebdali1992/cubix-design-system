"use client"

import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldDescription,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "../docs-password-field"

export function PasswordFieldToggleDemo() {
  return (
    <PasswordField className="w-full max-w-sm" defaultVisible>
      <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
      <PasswordFieldControl>
        <PasswordFieldInput defaultValue="CubixPass123!" placeholder="رمز عبور خود را وارد کنید" />
        <PasswordFieldToggle />
      </PasswordFieldControl>
      <PasswordFieldDescription>
        با دکمه چشم می‌توانید رمز را نمایش یا مخفی کنید.
      </PasswordFieldDescription>
    </PasswordField>
  )
}
