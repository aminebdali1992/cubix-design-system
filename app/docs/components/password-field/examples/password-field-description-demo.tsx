"use client"

import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldDescription,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "../docs-password-field"

export function PasswordFieldDescriptionDemo() {
  return (
    <PasswordField className="w-full max-w-sm">
      <PasswordFieldLabel>رمز عبور جدید</PasswordFieldLabel>
      <PasswordFieldControl>
        <PasswordFieldInput autoComplete="new-password" placeholder="رمز عبور جدید" />
        <PasswordFieldToggle />
      </PasswordFieldControl>
      <PasswordFieldDescription>
        از ترکیب حروف بزرگ، کوچک، عدد و نماد استفاده کنید.
      </PasswordFieldDescription>
    </PasswordField>
  )
}
