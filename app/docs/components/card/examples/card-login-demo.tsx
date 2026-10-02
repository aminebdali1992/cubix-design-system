"use client"

import { LockKeyholeIcon, MailIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  EmailField,
  EmailFieldControl,
  EmailFieldInput,
  EmailFieldLabel,
} from "@/app/docs/components/email-field/docs-email-field"
import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "@/app/docs/components/password-field/docs-password-field"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../docs-card"

export function CardLoginDemo() {
  return (
    <form className="w-full max-w-sm" onSubmit={(event) => event.preventDefault()}>
      <Card>
        <CardHeader>
          <CardTitle>ورود به حساب</CardTitle>
          <CardDescription>برای ادامه، ایمیل و رمز عبور خود را وارد کنید.</CardDescription>
          <CardAction>
            <Button type="button" variant="link" className="h-auto px-0">
              ثبت‌نام
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="grid gap-4">
          <EmailField name="email">
            <EmailFieldLabel>ایمیل</EmailFieldLabel>
            <EmailFieldControl>
              <MailIcon data-icon="inline-start" />
              <EmailFieldInput placeholder="name@example.com" autoComplete="email" required />
            </EmailFieldControl>
          </EmailField>
          <PasswordField name="password">
            <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
            <PasswordFieldControl>
              <LockKeyholeIcon data-icon="inline-start" />
              <PasswordFieldInput
                placeholder="رمز عبور خود را وارد کنید"
                autoComplete="current-password"
                required
              />
              <PasswordFieldToggle />
            </PasswordFieldControl>
          </PasswordField>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            ورود
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
