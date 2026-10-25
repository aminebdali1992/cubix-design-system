"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import { Toaster, toast } from "@/app/docs/components/toast/docs-toast"
import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeLabel,
  VerifyCodeResend,
} from "../docs-verify-code"

const CODE_LENGTH = 6

function createCode() {
  return Array.from({ length: CODE_LENGTH }, () =>
    Math.floor(Math.random() * 10)
  ).join("")
}

function toLatinDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
}

function toPersianDigits(value: string) {
  return value.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)])
}

type Status = "idle" | "success" | "error"

export function VerifyCodeFormDemo() {
  const [sentCode, setSentCode] = React.useState<string | null>(null)
  const [value, setValue] = React.useState("")
  const [status, setStatus] = React.useState<Status>("idle")
  const [message, setMessage] = React.useState("")

  function sendCode() {
    const code = createCode()
    setSentCode(code)
    setValue("")
    setStatus("idle")
    const id = toast.add({
      title: "کد تایید شما",
      description: toPersianDigits(code),
      actionProps: {
        children: "کپی کد",
        onClick() {
          void navigator.clipboard.writeText(code)
          toast.close(id)
        },
      },
    })
  }

  function handleChange(next: string) {
    setValue(next)
    if (status !== "idle") setStatus("idle")
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const entered = toLatinDigits(value).replace(/\D/g, "")

    if (!sentCode) {
      setStatus("error")
      setMessage("ابتدا روی «دریافت مجدد» بزنید تا کد برایتان ارسال شود.")
      return
    }
    if (entered.length < CODE_LENGTH) {
      setStatus("error")
      setMessage("کد تایید را کامل وارد کنید.")
      return
    }
    if (entered === sentCode) {
      setStatus("success")
      setMessage("کد تایید درست است.")
      return
    }
    setStatus("error")
    setMessage("کد تایید اشتباه است. دوباره تلاش کنید.")
  }

  function handleCancel() {
    setValue("")
    setStatus("idle")
  }

  const statusLabel =
    status === "idle" ? null : (
      <span
        role={status === "error" ? "alert" : "status"}
        className={status === "error" ? "text-destructive" : "inline-flex items-center gap-1 text-success-text"}
      >
        {status === "success" ? <CheckIcon className="size-3.5 shrink-0" /> : null}
        {message}
      </span>
    )

  return (
    <Toaster>
      <form
        className="grid w-full max-w-[328px] gap-6 rounded-xl bg-background p-6"
        onSubmit={handleSubmit}
      >
        <div className="space-y-1.5">
          <p className="text-body leading-none font-medium text-foreground">
            تایید هویت
          </p>
          <p className="text-caption text-muted-foreground">
            روی «دریافت مجدد» بزنید و کد نمایش داده‌شده را وارد کنید.
          </p>
        </div>
        <VerifyCode
          name="verifyCode"
          length={CODE_LENGTH}
          value={value}
          onValueChange={handleChange}
          invalid={status === "error"}
        >
          <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
          <VerifyCodeControl />
          <VerifyCodeResend
            duration={60}
            onResend={sendCode}
            {...(statusLabel ? { waitingLabel: statusLabel, expiredLabel: statusLabel } : {})}
          />
        </VerifyCode>
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            انصراف
          </Button>
          <Button type="submit">تایید</Button>
        </div>
      </form>
    </Toaster>
  )
}
