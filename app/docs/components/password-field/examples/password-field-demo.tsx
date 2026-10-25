"use client"

import { LockIcon } from "@/components/docs/empty-icons"

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
        <LockIcon data-icon="inline-start" className="size-6" />
        <PasswordFieldInput defaultValue="CubixPass123!" placeholder="رمز عبور خود را وارد کنید" />
        <PasswordFieldToggle />
      </PasswordFieldControl>
      <PasswordFieldDescription>حداقل ۸ کاراکتر، شامل حرف و عدد.</PasswordFieldDescription>
    </PasswordField>
  )
}
