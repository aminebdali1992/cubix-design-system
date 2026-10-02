"use client"

import { CircleCheckIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "../docs-alert"

export function AlertBasicDemo() {
  return (
    <Alert className="w-full max-w-md">
      <CircleCheckIcon />
      <AlertTitle>اطلاعات حساب به‌روزرسانی شد</AlertTitle>
      <AlertDescription>
        اطلاعات پروفایل شما ذخیره شد. تغییرات بلافاصله اعمال می‌شوند.
      </AlertDescription>
    </Alert>
  )
}
