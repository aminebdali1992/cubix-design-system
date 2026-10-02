"use client"

import { CircleCheckIcon, InfoIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "../docs-alert"

export function AlertDemo() {
  return (
    <div className="grid w-full max-w-xl gap-4">
      <Alert>
        <CircleCheckIcon />
        <AlertTitle>پرداخت موفق</AlertTitle>
        <AlertDescription>
          پرداخت ۲۹٫۹۹ دلاری شما انجام شد. رسید به نشانی ایمیل ارسال شده است.
        </AlertDescription>
      </Alert>
      <Alert>
        <InfoIcon />
        <AlertTitle>قابلیت جدید در دسترس است</AlertTitle>
        <AlertDescription>
          حالت تاریک اضافه شده. می‌توانید آن را از تنظیمات حساب فعال کنید.
        </AlertDescription>
      </Alert>
    </div>
  )
}
