"use client"

import { useState } from "react"

import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldDescription,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "../docs-password-field"

export function PasswordFieldControlledDemo() {
  const [visible, setVisible] = useState(false)

  return (
    <PasswordField className="w-full max-w-sm" visible={visible} onVisibleChange={setVisible}>
      <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
      <PasswordFieldControl>
        <PasswordFieldInput defaultValue="CubixPass123!" placeholder="رمز عبور خود را وارد کنید" />
        <PasswordFieldToggle />
      </PasswordFieldControl>
      <PasswordFieldDescription>
        وضعیت: {visible ? "رمز عبور نمایش داده می‌شود" : "رمز عبور مخفی است"}
      </PasswordFieldDescription>
    </PasswordField>
  )
}
