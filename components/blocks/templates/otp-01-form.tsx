"use client"

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

/* Preview stub: the copied block posts to your verify route instead. */
async function verifyCode(code: string) {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return code.length > 0
}

const CODE_LENGTH = 6

type Status = "idle" | "loading" | "error" | "success"

export function Otp01Form() {
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
                <VerifyCodeDigit index={0} />
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
