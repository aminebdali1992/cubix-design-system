import { cn } from "@/lib/utils"
import { buildBlockFiles } from "@/components/blocks/templates/block-source-deps"
import { Otp01Form } from "@/components/blocks/templates/otp-01-form"

function Otp01View({ className }: { className?: string }) {
  const OtpForm = Otp01Form
  return (
    <div lang="fa" dir="rtl" className={cn("relative flex flex-col overflow-hidden bg-muted/40", className)}>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10">
        <OtpForm />
      </div>
    </div>
  )
}

export function Otp01() {
  return <Otp01View className="h-full min-h-0" />
}

const otpFormSource = `"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { CircleCheckIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/cubix/alert"
import { Button } from "@/components/cubix/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card"
import { Spinner } from "@/components/cubix/spinner"
import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeDigit,
  VerifyCodeError,
  VerifyCodeLabel,
  VerifyCodeResend,
  VerifyCodeSeparator,
} from "@/components/cubix/verify-code"

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"

async function verifyCode(code: string) {
  const latin = code.replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
  const response = await fetch("/api/auth/otp/verify", {
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
    if (value.length === CODE_LENGTH) void submit(value)
  }

  return (
    <Card className="w-full max-w-88 py-8 shadow-xs ring-0">
      <CardHeader className="justify-items-start text-start">
        <CardTitle className="font-heading text-lead font-normal">تایید شماره موبایل</CardTitle>
        <CardDescription className="flex flex-wrap items-center justify-start gap-x-1">
          کد ۶ رقمی به شماره
          <span dir="ltr" className="text-foreground tabular-nums">۰۹۱۲ ••• ۶۷۸۹</span>
          پیامک شد.
          <Button variant="link" size="sm" className="h-auto px-0" render={<Link href="/login" />} nativeButton={false}>
            ویرایش شماره
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === "success" ? (
          <>
            <Alert>
              <CircleCheckIcon />
              <AlertTitle>شماره شما تایید شد</AlertTitle>
              <AlertDescription>ورود با موفقیت انجام شد و به حساب کاربری منتقل می‌شوید.</AlertDescription>
            </Alert>
            <Button className="mt-5 w-full" render={<Link href="/" />} nativeButton={false}>
              ادامه
            </Button>
          </>
        ) : (
          <form aria-label="تایید شماره موبایل" className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <VerifyCode
              name="code"
              length={CODE_LENGTH}
              groups={[3, 3]}
              value={code}
              onValueChange={handleChange}
              invalid={status === "error"}
              disabled={status === "loading"}
            >
              <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
              <VerifyCodeControl>
                <VerifyCodeDigit index={0} autoFocus />
                <VerifyCodeDigit index={1} />
                <VerifyCodeDigit index={2} />
                <VerifyCodeSeparator />
                <VerifyCodeDigit index={3} />
                <VerifyCodeDigit index={4} />
                <VerifyCodeDigit index={5} />
              </VerifyCodeControl>
              <VerifyCodeError>کد وارد‌شده درست نیست. آن را دوباره بررسی کنید یا کد جدید بگیرید.</VerifyCodeError>
              <VerifyCodeResend duration={120} onResend={() => { setCode(""); setStatus("idle") }} />
            </VerifyCode>
            <Button type="submit" className="w-full" disabled={!complete || status === "loading"}>
              {status === "loading" ? (
                <>
                  <Spinner data-icon="inline-start" />
                  در حال بررسی…
                </>
              ) : (
                "تایید و ورود"
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
`

export const otp01Files = buildBlockFiles(
  "app/verify/page.tsx",
  `import { OtpForm } from "@/components/otp-form"

export default function VerifyPage() {
  return (
    <div lang="fa" dir="rtl" className="flex min-h-svh flex-col items-center justify-center bg-muted/40 px-6 py-12">
      <OtpForm />
    </div>
  )
}
`,
  { extra: [{ path: "components/otp-form.tsx", content: otpFormSource }] }
)
