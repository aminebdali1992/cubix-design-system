"use client"

import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldDescription,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "../docs-password-field"

export function PasswordFieldDisabledDemo() {
  return (
    <PasswordField className="w-full max-w-sm" disabled>
      <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
      <PasswordFieldControl>
        <PasswordFieldInput defaultValue="CubixPass123!" placeholder="رمز عبور خود را وارد کنید" />
        <PasswordFieldToggle />
      </PasswordFieldControl>
      <PasswordFieldDescription>این فیلد فعلاً قابل ویرایش نیست.</PasswordFieldDescription>
    </PasswordField>
  )
}
