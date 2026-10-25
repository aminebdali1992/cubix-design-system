"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import Link from "next/link"
import { CircleCheckIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/cubix/alert"
import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card"
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

/* Preview stub: the copied block posts to your verify route instead. */
async function verifyCode(code: string) {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return code.length > 0
}

const CODE_LENGTH = 6

type Status = "idle" | "loading" | "error" | "success"

const transfer = {
  amount: "۲۵۰٬۰۰۰٬۰۰۰",
  recipient: "سارا محمدی",
  initials: "س‌م",
  card: "۶۰۳۷ •••• •••• ۴۲۱۸",
  fee: "۱۲٬۰۰۰ ریال",
  tracking: "۸۴۷۲۱۹۳۰۵۶",
}

function SummaryRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 text-description">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2 text-foreground">{children}</span>
    </div>
  )
}

export function Otp04Form() {
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
    <Card className="w-full max-w-88 py-6 shadow-xs ring-0">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="font-heading text-lead font-normal">تایید انتقال وجه</CardTitle>
          <Badge variant={status === "success" ? "default" : "outline"}>
            {status === "success" ? "انجام شد" : "کارت به کارت"}
          </Badge>
        </div>
        <CardDescription>
          {status === "success" ? "رسید تراکنش شما" : "جزئیات تراکنش را بررسی و با کد پیامکی تایید کنید."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 rounded-xl bg-muted p-4">
          <div className="flex flex-col gap-1">
            <span className="text-caption text-muted-foreground">مبلغ انتقال</span>
            <span className="font-heading text-heading tabular-nums">
              {transfer.amount} <span className="text-description text-muted-foreground">ریال</span>
            </span>
          </div>
          <Separator />
          <SummaryRow label="گیرنده">
            {transfer.recipient}
          </SummaryRow>
          <SummaryRow label="شماره کارت">
            <span dir="ltr" className="tabular-nums">{transfer.card}</span>
          </SummaryRow>
          <SummaryRow label="کارمزد">{transfer.fee}</SummaryRow>
          {status === "success" && (
            <SummaryRow label="شماره پیگیری">
              <span dir="ltr" className="tabular-nums">{transfer.tracking}</span>
            </SummaryRow>
          )}
        </div>

        {status === "success" ? (
          <>
            <Alert>
              <CircleCheckIcon />
              <AlertTitle>انتقال با موفقیت انجام شد</AlertTitle>
              <AlertDescription>مبلغ به حساب گیرنده واریز شد. رسید در بخش تراکنش‌ها ذخیره شده است.</AlertDescription>
            </Alert>
            <Button className="w-full" render={<Link href="/" />} nativeButton={false}>
              بازگشت به صفحه اصلی
            </Button>
          </>
        ) : (
          <form aria-label="تایید انتقال وجه" className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <VerifyCode
              name="code"
              length={CODE_LENGTH}
              groups={[3, 3]}
              value={code}
              onValueChange={handleChange}
              invalid={status === "error"}
              disabled={status === "loading"}
            >
              <VerifyCodeLabel>کد پیامکی ارسال‌شده به <span dir="ltr">۰۹۱۲***۴۵۶۷</span></VerifyCodeLabel>
              <VerifyCodeControl>
                <VerifyCodeDigit index={0} />
                <VerifyCodeDigit index={1} />
                <VerifyCodeDigit index={2} />
                <VerifyCodeSeparator />
                <VerifyCodeDigit index={3} />
                <VerifyCodeDigit index={4} />
                <VerifyCodeDigit index={5} />
              </VerifyCodeControl>
              <VerifyCodeError>کد وارد‌شده درست نیست یا منقضی شده است.</VerifyCodeError>
              <VerifyCodeResend duration={120} onResend={() => { setCode(""); setStatus("idle") }} />
            </VerifyCode>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1" disabled={status === "loading"} render={<Link href="/" />} nativeButton={false}>
                انصراف
              </Button>
              <Button type="submit" className="flex-1" disabled={!complete || status === "loading"}>
                {status === "loading" ? (
                  <>
                    <Spinner data-icon="inline-start" />
                    در حال پرداخت…
                  </>
                ) : (
                  "تایید و پرداخت"
                )}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
