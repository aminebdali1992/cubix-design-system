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

const sizes = [
  { size: "default", hint: "ارتفاع ۴۰ پیکسل" },
  { size: "lg", hint: "ارتفاع ۴۸ پیکسل" },
] as const

export function PasswordFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      {sizes.map(({ size, hint }) => (
        <PasswordField key={size} size={size}>
          <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
          <PasswordFieldControl>
            <LockKeyholeIcon data-icon="inline-start" />
            <PasswordFieldInput placeholder="رمز عبور خود را وارد کنید" />
            <PasswordFieldToggle />
          </PasswordFieldControl>
          <PasswordFieldDescription>{hint}</PasswordFieldDescription>
        </PasswordField>
      ))}
    </div>
  )
}
