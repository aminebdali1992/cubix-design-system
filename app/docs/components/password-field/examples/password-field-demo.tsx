"use client"

import { LockKeyholeIcon } from "lucide-react"

import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldDescription,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "../docs-password-field"

export function PasswordFieldDemo() {
  return (
    <PasswordField className="w-full max-w-sm">
      <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
      <PasswordFieldControl>
        <LockKeyholeIcon data-icon="inline-start" />
        <PasswordFieldInput defaultValue="CubixPass123!" placeholder="رمز عبور خود را وارد کنید" />
        <PasswordFieldToggle />
      </PasswordFieldControl>
      <PasswordFieldDescription>حداقل ۸ کاراکتر، شامل حرف و عدد.</PasswordFieldDescription>
    </PasswordField>
  )
}
