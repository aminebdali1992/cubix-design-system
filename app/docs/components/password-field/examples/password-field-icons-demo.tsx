"use client"

import { KeyRoundIcon } from "lucide-react"

import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "../docs-password-field"

export function PasswordFieldIconsDemo() {
  return (
    <PasswordField className="w-full max-w-sm">
      <PasswordFieldLabel>کلید دسترسی</PasswordFieldLabel>
      <PasswordFieldControl>
        <KeyRoundIcon data-icon="inline-start" />
        <PasswordFieldInput placeholder="کلید را وارد کنید" />
        <PasswordFieldToggle />
      </PasswordFieldControl>
    </PasswordField>
  )
}
