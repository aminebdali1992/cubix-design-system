"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"

import { Avatar, AvatarFallback } from "@/components/cubix/avatar"
import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"
import { Card } from "@/components/cubix/card"
import { Checkbox } from "@/components/cubix/checkbox"
import {
  EmailField,
  EmailFieldControl,
  EmailFieldInput,
  EmailFieldLabel,
} from "@/components/cubix/email-field"
import { Label } from "@/components/cubix/label"
import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldDescription,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "@/components/cubix/password-field"
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/cubix/text-field"

type Signup05Step = "email" | "details"

function Signup05StepHeading({
  step,
  title,
  description,
}: {
  step: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <Badge variant="outline">{step}</Badge>
      <h1 className="mt-3 font-heading text-lead font-semibold">{title}</h1>
      <p className="mt-2 text-description text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

function Signup05EmailStep({
  defaultEmail,
  onContinue,
}: {
  defaultEmail: string
  onContinue: (email: string) => void
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = new FormData(event.currentTarget).get("email")
    if (typeof email === "string") onContinue(email.trim())
  }

  return (
    <div className="cubix-enter">
      <Signup05StepHeading
        step="مرحله ۱ از ۲"
        title="ایجاد حساب کاربری"
        description="ایمیل خود را وارد کنید. در قدم بعد اطلاعات حساب را تکمیل می‌کنیم."
      />
      <form
        aria-label="ایمیل حساب جدید"
        className="mt-8 flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <EmailField>
          <EmailFieldLabel>ایمیل</EmailFieldLabel>
          <EmailFieldControl>
            <EmailFieldInput
              name="email"
              autoComplete="username"
              placeholder="name@example.com"
              defaultValue={defaultEmail}
              autoFocus={defaultEmail !== ""}
              required
            />
          </EmailFieldControl>
        </EmailField>
        <Button type="submit" variant="foreground" className="w-full">
          ادامه
        </Button>
      </form>
      <p className="mt-8 flex items-center justify-center gap-1 text-description text-muted-foreground">
        حساب کاربری دارید؟
        <Button
          variant="link"
          size="sm"
          className="h-auto px-0 text-description"
          render={<Link href="/login" />}
          nativeButton={false}
        >
          وارد شوید
        </Button>
      </p>
    </div>
  )
}

function Signup05DetailsStep({
  email,
  onChangeEmail,
}: {
  email: string
  onChangeEmail: () => void
}) {
  return (
    <div className="cubix-enter">
      <Signup05StepHeading
        step="مرحله ۲ از ۲"
        title="اطلاعات حساب را تکمیل کنید"
        description="نام و رمز عبور حساب جدید خود را وارد کنید."
      />
      <Card
        size="sm"
        className="mt-6 flex-row items-center gap-3 px-(--card-spacing) shadow-none"
      >
        <Avatar size="sm">
          <AvatarFallback>{email.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span
          dir="ltr"
          className="min-w-0 flex-1 truncate text-end text-description text-foreground"
        >
          {email}
        </span>
        <Button
          variant="link"
          size="sm"
          className="h-auto px-0"
          aria-label="تغییر ایمیل"
          onClick={onChangeEmail}
        >
          تغییر
        </Button>
      </Card>
      <form
        aria-label="اطلاعات حساب جدید"
        className="mt-6 flex flex-col gap-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <input type="hidden" name="email" value={email} />
        <TextField>
          <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
          <TextFieldControl>
            <TextFieldInput
              name="name"
              autoComplete="name"
              placeholder="نام خود را وارد کنید"
              autoFocus
              required
            />
          </TextFieldControl>
        </TextField>
        <PasswordField>
          <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
          <PasswordFieldControl>
            <PasswordFieldInput
              name="password"
              autoComplete="new-password"
              placeholder="یک رمز عبور انتخاب کنید"
              minLength={8}
              required
            />
            <PasswordFieldToggle />
          </PasswordFieldControl>
          <PasswordFieldDescription>حداقل ۸ کاراکتر.</PasswordFieldDescription>
        </PasswordField>
        <Label className="w-fit">
          <Checkbox name="terms" required />
          <span className="flex flex-wrap items-center gap-1">
            <Button
              variant="link"
              size="xs"
              className="h-auto px-0"
              render={<Link href="/terms" />}
              nativeButton={false}
            >
              شرایط استفاده
            </Button>
            و
            <Button
              variant="link"
              size="xs"
              className="h-auto px-0"
              render={<Link href="/privacy" />}
              nativeButton={false}
            >
              حریم خصوصی
            </Button>
            را می‌پذیرم
          </span>
        </Label>
        <Button type="submit" variant="foreground" className="w-full">
          ایجاد حساب
        </Button>
      </form>
    </div>
  )
}

/* Block previews render inside the docs site, so the final submit stays on the page. */
export function Signup05Form() {
  const [step, setStep] = useState<Signup05Step>("email")
  const [email, setEmail] = useState("")

  if (step === "email") {
    return (
      <Signup05EmailStep
        defaultEmail={email}
        onContinue={(value) => {
          setEmail(value)
          setStep("details")
        }}
      />
    )
  }

  return (
    <Signup05DetailsStep email={email} onChangeEmail={() => setStep("email")} />
  )
}
