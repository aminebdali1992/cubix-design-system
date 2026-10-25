import { cn } from "@/lib/utils"
import { buildBlockFiles } from "@/components/blocks/templates/block-source-deps"
import { Otp02Form } from "@/components/blocks/templates/otp-02-form"

function Otp02View({ className }: { className?: string }) {
  const OtpForm = Otp02Form
  return (
    <div lang="fa" dir="rtl" className={cn("@container relative flex overflow-hidden bg-background", className)}>
      <div className="grid min-h-0 flex-1 @min-[800px]:grid-cols-2">
        <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-10">
          <OtpForm />
        </div>
        <div className="relative hidden p-3 @min-[800px]:block">
          <div className="relative size-full overflow-hidden rounded-2xl bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/blocks/404-placeholder.svg" alt="" className="absolute inset-0 size-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Otp02() {
  return <Otp02View className="h-full min-h-0" />
}

const otpFormSource = `"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { CircleCheckIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/cubix/alert"
import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"
import { Separator } from "@/components/cubix/separator"
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
  const response = await fetch("/api/auth/login/verify", {
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
      <Badge variant="outline">مرحله ۲ از ۲</Badge>
      <h1 className="mt-3 font-heading text-lead font-normal">تایید ورود</h1>
      <p className="mt-2 text-description text-muted-foreground">
        برای امنیت حساب، کد ۶ رقمی ارسال‌شده به{" "}
        <span dir="ltr" className="text-foreground tabular-nums">۰۹۱۲ ••• ۶۷۸۹</span>{" "}
        را وارد کنید.
      </p>

      {status === "success" ? (
        <div className="mt-8">
          <Alert>
            <CircleCheckIcon />
            <AlertTitle>ورود تایید شد</AlertTitle>
            <AlertDescription>هویت شما تایید شد. در حال انتقال به داشبورد هستید.</AlertDescription>
          </Alert>
          <Button className="mt-5 w-full" render={<Link href="/dashboard" />} nativeButton={false}>
            رفتن به داشبورد
          </Button>
        </div>
      ) : (
        <form aria-label="تایید ورود دو مرحله‌ای" className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
          <VerifyCode
            name="code"
            length={CODE_LENGTH}
            size="lg"
            value={code}
            onValueChange={handleChange}
            invalid={status === "error"}
            disabled={status === "loading"}
          >
            <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
            <VerifyCodeControl>
              <VerifyCodeDigit index={0} size="lg" autoFocus />
              <VerifyCodeDigit index={1} size="lg" />
              <VerifyCodeDigit index={2} size="lg" />
              <VerifyCodeDigit index={3} size="lg" />
              <VerifyCodeDigit index={4} size="lg" />
              <VerifyCodeDigit index={5} size="lg" />
            </VerifyCodeControl>
            <VerifyCodeError>کد وارد‌شده درست نیست یا منقضی شده است.</VerifyCodeError>
            <VerifyCodeResend duration={120} onResend={() => { setCode(""); setStatus("idle") }} />
          </VerifyCode>
          <Button type="submit" className="w-full" disabled={!complete || status === "loading"}>
            {status === "loading" ? (
              <>
                <Spinner data-icon="inline-start" />
                در حال بررسی…
              </>
            ) : (
              "ورود به حساب"
            )}
          </Button>
        </form>
      )}

      <div className="mt-8 flex items-center gap-3 text-caption text-muted-foreground">
        <Separator className="flex-1" />
        روش دیگر
        <Separator className="flex-1" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button variant="outline" render={<Link href="/login/email-code" />} nativeButton={false}>
          کد با ایمیل
        </Button>
        <Button variant="outline" render={<Link href="/login" />} nativeButton={false}>
          ورود با رمز عبور
        </Button>
      </div>
    </div>
  )
}
`

export const otp02Files = buildBlockFiles(
  "app/verify/page.tsx",
  `import { OtpForm } from "@/components/otp-form"

export default function VerifyPage() {
  return (
    <div lang="fa" dir="rtl" className="grid min-h-svh bg-background min-[800px]:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-10">
        <OtpForm />
      </div>
      <div className="relative hidden p-3 min-[800px]:block">
        <div className="relative size-full overflow-hidden rounded-2xl bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/blocks/404-placeholder.svg" alt="" className="absolute inset-0 size-full object-cover" />
        </div>
      </div>
    </div>
  )
}
`,
  { extra: [{ path: "components/otp-form.tsx", content: otpFormSource }], placeholder: true }
)
