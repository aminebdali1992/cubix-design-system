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
            <LockIcon data-icon="inline-start" className="size-6" />
            <PasswordFieldInput placeholder="رمز عبور خود را وارد کنید" />
            <PasswordFieldToggle />
          </PasswordFieldControl>
          <PasswordFieldDescription>{hint}</PasswordFieldDescription>
        </PasswordField>
      ))}
    </div>
  )
}
