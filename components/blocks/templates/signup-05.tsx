import Link from "next/link"

import { Button } from "@/components/cubix/button"
import { cn } from "@/lib/utils"
import { buildBlockFiles } from "@/components/blocks/templates/block-source-deps"
import { Signup05Form } from "@/components/blocks/templates/signup-05-form"

const signup05FooterLinks = [
  { href: "/help", label: "راهنما" },
  { href: "/privacy", label: "حریم خصوصی" },
  { href: "/terms", label: "شرایط استفاده" },
] as const

function Signup05View({ className }: { className?: string }) {
  return (
    <div
      lang="fa"
      dir="rtl"
      className={cn(
        "@container relative flex flex-col bg-background px-6 py-8 [--primary:var(--foreground)] [--primary-foreground:var(--background)] @min-[640px]:px-10",
        className
      )}
    >
      <header className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          render={<Link href="/" />}
          nativeButton={false}
          className="font-heading"
        >
          Cubix
        </Button>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center py-12">
        <div className="w-full max-w-88">
          <Signup05Form />
        </div>
      </div>

      <footer>
        <nav
          aria-label="پیوندهای پایین صفحه"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
        >
          {signup05FooterLinks.map((link) => (
            <Button
              key={link.href}
              variant="link"
              size="xs"
              className="h-auto px-0"
              render={<Link href={link.href} />}
              nativeButton={false}
            >
              {link.label}
            </Button>
          ))}
        </nav>
      </footer>
    </div>
  )
}

export function Signup05() {
  return <Signup05View className="min-h-full" />
}

const signup05FormFile = {
  path: "components/signup-form.tsx",
  content: `"use client"

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

type SignupStep = "email" | "details"

function StepHeading({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Badge variant="outline">{step}</Badge>
      <h1 className="mt-3 font-heading text-lead font-semibold">{title}</h1>
      <p className="mt-2 text-description text-muted-foreground">{description}</p>
    </div>
  )
}

function EmailStep({ defaultEmail, onContinue }: { defaultEmail: string; onContinue: (email: string) => void }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = new FormData(event.currentTarget).get("email")
    if (typeof email === "string") onContinue(email.trim())
  }

  return (
    <div>
      <StepHeading step="مرحله ۱ از ۲" title="ایجاد حساب کاربری" description="ایمیل خود را وارد کنید. در قدم بعد اطلاعات حساب را تکمیل می‌کنیم." />
      <form aria-label="ایمیل حساب جدید" className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
        <EmailField>
          <EmailFieldLabel>ایمیل</EmailFieldLabel>
          <EmailFieldControl>
            <EmailFieldInput name="email" autoComplete="username" placeholder="name@example.com" defaultValue={defaultEmail} autoFocus={defaultEmail !== ""} required />
          </EmailFieldControl>
        </EmailField>
        <Button type="submit" variant="foreground" className="w-full">ادامه</Button>
      </form>
      <p className="mt-8 flex items-center justify-center gap-1 text-description text-muted-foreground">
        حساب کاربری دارید؟
        <Button variant="link" size="sm" className="h-auto px-0 text-description" render={<Link href="/login" />} nativeButton={false}>
          وارد شوید
        </Button>
      </p>
    </div>
  )
}

function DetailsStep({ email, onChangeEmail }: { email: string; onChangeEmail: () => void }) {
  return (
    <div>
      <StepHeading step="مرحله ۲ از ۲" title="اطلاعات حساب را تکمیل کنید" description="نام و رمز عبور حساب جدید خود را وارد کنید." />
      <Card size="sm" className="mt-6 flex-row items-center gap-3 px-(--card-spacing) shadow-none">
        <Avatar size="sm">
          <AvatarFallback>{email.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span dir="ltr" className="min-w-0 flex-1 truncate text-end text-description text-foreground">{email}</span>
        <Button variant="link" size="sm" className="h-auto px-0" aria-label="تغییر ایمیل" onClick={onChangeEmail}>تغییر</Button>
      </Card>
      <form action="/api/auth/signup" method="post" aria-label="اطلاعات حساب جدید" className="mt-6 flex flex-col gap-5">
        <input type="hidden" name="email" value={email} />
        <TextField>
          <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
          <TextFieldControl>
            <TextFieldInput name="name" autoComplete="name" placeholder="نام خود را وارد کنید" autoFocus required />
          </TextFieldControl>
        </TextField>
        <PasswordField>
          <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
          <PasswordFieldControl>
            <PasswordFieldInput name="password" autoComplete="new-password" placeholder="یک رمز عبور انتخاب کنید" minLength={8} required />
            <PasswordFieldToggle />
          </PasswordFieldControl>
          <PasswordFieldDescription>حداقل ۸ کاراکتر.</PasswordFieldDescription>
        </PasswordField>
        <Label className="w-fit">
          <Checkbox name="terms" required />
          <span className="flex flex-wrap items-center gap-1">
            <Button variant="link" size="xs" className="h-auto px-0" render={<Link href="/terms" />} nativeButton={false}>شرایط استفاده</Button>
            و
            <Button variant="link" size="xs" className="h-auto px-0" render={<Link href="/privacy" />} nativeButton={false}>حریم خصوصی</Button>
            را می‌پذیرم
          </span>
        </Label>
        <Button type="submit" variant="foreground" className="w-full">ایجاد حساب</Button>
      </form>
    </div>
  )
}

export function SignupForm() {
  const [step, setStep] = useState<SignupStep>("email")
  const [email, setEmail] = useState("")

  if (step === "email") {
    return (
      <EmailStep
        defaultEmail={email}
        onContinue={(value) => {
          setEmail(value)
          setStep("details")
        }}
      />
    )
  }

  return <DetailsStep email={email} onChangeEmail={() => setStep("email")} />
}
`,
}

export const signup05Files = buildBlockFiles(
  "app/signup/page.tsx",
  `import Link from "next/link"

import { Button } from "@/components/cubix/button"
import { SignupForm } from "@/components/signup-form"

const footerLinks = [
  { href: "/help", label: "راهنما" },
  { href: "/privacy", label: "حریم خصوصی" },
  { href: "/terms", label: "شرایط استفاده" },
] as const

export default function SignupPage() {
  return (
    <div lang="fa" dir="rtl" className="flex min-h-svh flex-col bg-background px-6 py-8 [--primary:var(--foreground)] [--primary-foreground:var(--background)] sm:px-10">
      <header className="flex justify-center">
        <Button variant="ghost" size="sm" render={<Link href="/" />} nativeButton={false} className="font-heading">
          Cubix
        </Button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center py-12">
        <div className="w-full max-w-88">
          <SignupForm />
        </div>
      </main>

      <footer>
        <nav aria-label="پیوندهای پایین صفحه" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {footerLinks.map((link) => (
            <Button key={link.href} variant="link" size="xs" className="h-auto px-0" render={<Link href={link.href} />} nativeButton={false}>
              {link.label}
            </Button>
          ))}
        </nav>
      </footer>
    </div>
  )
}
`,
  { extra: [signup05FormFile] }
)
