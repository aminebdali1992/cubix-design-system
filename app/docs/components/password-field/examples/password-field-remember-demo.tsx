"use client"

import { Checkbox } from "@/app/docs/components/checkbox/docs-checkbox"
import { Label } from "@/app/docs/components/label/docs-label"
import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "../docs-password-field"

export function PasswordFieldRememberDemo() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <PasswordField name="password">
        <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
        <PasswordFieldControl>
          <PasswordFieldInput placeholder="رمز عبور خود را وارد کنید" autoComplete="current-password" />
          <PasswordFieldToggle />
        </PasswordFieldControl>
      </PasswordField>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Checkbox id="remember-me" name="remember" />
          <Label htmlFor="remember-me" className="font-normal">
            مرا به خاطر بسپار
          </Label>
        </div>
        <a href="#" className="text-caption text-primary underline-offset-4 hover:underline">
          فراموشی رمز عبور
        </a>
      </div>
    </div>
  )
}