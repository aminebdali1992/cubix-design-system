"use client"

import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldError,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "../docs-password-field"

export function PasswordFieldInvalidDemo() {
  return (
    <PasswordField className="w-full max-w-sm" invalid>
      <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
      <PasswordFieldControl>
        <PasswordFieldInput defaultValue="123" placeholder="رمز عبور خود را وارد کنید" />
        <PasswordFieldToggle />
      </PasswordFieldControl>
      <PasswordFieldError>رمز عبور باید حداقل ۸ کاراکتر باشد.</PasswordFieldError>
    </PasswordField>
  )
}
