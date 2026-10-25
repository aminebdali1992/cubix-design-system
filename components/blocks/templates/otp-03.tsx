import { cn } from "@/lib/utils"
import { buildBlockFiles } from "@/components/blocks/templates/block-source-deps"
import { Otp03Form } from "@/components/blocks/templates/otp-03-form"

function Otp03View({ className }: { className?: string }) {
  const OtpForm = Otp03Form
  return (
    <div lang="fa" dir="rtl" className={cn("relative flex flex-col overflow-hidden bg-background", className)}>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10">
        <OtpForm />
      </div>
    </div>
  )
}

export function Otp03() {
  return <Otp03View className="h-full min-h-0" />
}

const otpFormSource = `"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { CircleCheckIcon, MailIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/cubix/alert"
import { Avatar, AvatarFallback } from "@/components/cubix/avatar"
import { Button } from "@/components/cubix/button"
import { Spinner } from "@/components/cubix/spinner"
import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeDescription,
  VerifyCodeDigit,
  VerifyCodeError,
  VerifyCodeLabel,
  VerifyCodeResend,
  VerifyCodeSeparator,
} from "@/components/cubix/verify-code"

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"

async function verifyCode(code: string) {
  const latin = code.replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
  const response = await fetch("/api/auth/email/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: latin }),
  })
  return response.ok
}

const CODE_LENGTH = 6

type Status = "idle" | "loading" | "error" | "success"

export function OtpForm() {
  const [code, setCode] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const complete = code.length === CODE_LENGTH

  async function submit(value: string) {
    if (value.length !== CODE_LENGTH || status === "loading") return
    setStatus("loading")
    const ok = await verifyCode(value)
    setStatus(ok ? "success" : "error")
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void submit(code)
  }

  function handleChange(value: string) {
    setCode(value)
    if (status === "error") setStatus("idle")
  }

  return (
    <div className="w-full max-w-88">
      <div className="flex flex-col items-center text-center">
        <Avatar size="lg">
          <AvatarFallback>
            <MailIcon className="size-5" />
          </AvatarFallback>
        </Avatar>
        <h1 className="mt-4 font-heading text-lead font-normal">ایمیل خود را تایید کنید</h1>
        <p className="mt-2 text-description text-muted-foreground">
          کد تایید به{" "}
          <span dir="ltr" className="text-foreground">nam•••@example.com</span>{" "}
          ارسال شد. اگر ایمیل را نمی‌بینید، پوشه اسپم را بررسی کنید.
        </p>
      </div>

      {status === "success" ? (
        <div className="mt-8">
          <Alert>
            <CircleCheckIcon />
            <AlertTitle>ایمیل شما تایید شد</AlertTitle>
            <AlertDescription>حساب کاربری شما فعال است و می‌توانید ادامه دهید.</AlertDescription>
          </Alert>
          <Button className="mt-5 w-full" render={<Link href="/" />} nativeButton={false}>
            ادامه
          </Button>
        </div>
      ) : (
        <form aria-label="تایید ایمیل" className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
          <VerifyCode
            name="code"
            length={CODE_LENGTH}
            groups={[3, 3]}
            value={code}
            onValueChange={handleChange}
            invalid={status === "error"}
            disabled={status === "loading"}
          >
            <VerifyCodeLabel>کد ۶ رقمی</VerifyCodeLabel>
            <VerifyCodeControl>
              <VerifyCodeDigit index={0} autoFocus />
              <VerifyCodeDigit index={1} />
              <VerifyCodeDigit index={2} />
              <VerifyCodeSeparator />
              <VerifyCodeDigit index={3} />
              <VerifyCodeDigit index={4} />
              <VerifyCodeDigit index={5} />
            </VerifyCodeControl>
            <VerifyCodeError>این کد درست نیست. کد را دوباره وارد کنید یا کد جدید درخواست دهید.</VerifyCodeError>
            <VerifyCodeResend duration={120} onResend={() => { setCode(""); setStatus("idle") }} />
          </VerifyCode>
          <Button type="submit" className="w-full" disabled={!complete || status === "loading"}>
            {status === "loading" ? (
              <>
                <Spinner data-icon="inline-start" />
                در حال بررسی…
              </>
            ) : (
              "تایید ایمیل"
            )}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" render={<Link href="/signup" />} nativeButton={false}>
              تغییر ایمیل
            </Button>
            <Button variant="outline" className="flex-1" render={<Link href="https://mail.google.com" target="_blank" rel="noreferrer" />} nativeButton={false}>
              باز کردن جیمیل
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
`

export const otp03Files = buildBlockFiles(
  "app/verify/page.tsx",
  `import { OtpForm } from "@/components/otp-form"

export default function VerifyPage() {
  return (
    <div lang="fa" dir="rtl" className="flex min-h-svh flex-col items-center justify-center bg-background px-6 py-12">
      <OtpForm />
    </div>
  )
}
`,
  { extra: [{ path: "components/otp-form.tsx", content: otpFormSource }] }
)
