"use client"

import { LockKeyholeIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldDescription,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "../docs-password-field"

export function PasswordFieldFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">ورود به حساب</p>
        <p className="text-caption text-muted-foreground">رمز عبور حساب Cubix خود را وارد کنید.</p>
      </div>
      <PasswordField name="password">
        <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
        <PasswordFieldControl>
          <LockKeyholeIcon data-icon="inline-start" />
          <PasswordFieldInput placeholder="رمز عبور خود را وارد کنید" required />
          <PasswordFieldToggle />
        </PasswordFieldControl>
        <PasswordFieldDescription>حداقل ۸ کاراکتر، شامل حرف و عدد.</PasswordFieldDescription>
      </PasswordField>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ورود</Button>
      </div>
    </form>
  )
}
