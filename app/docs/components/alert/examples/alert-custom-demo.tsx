"use client"

import { TriangleAlertIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "../docs-alert"

export function AlertCustomDemo() {
  return (
    <Alert className="w-full max-w-md border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300">
      <TriangleAlertIcon />
      <AlertTitle>اشتراک شما تا ۳ روز دیگر منقضی می‌شود.</AlertTitle>
      <AlertDescription className="text-amber-700/80 dark:text-amber-300/80">
        برای جلوگیری از قطع سرویس، همین حالا تمدید کنید یا به طرح پولی ارتقا دهید.
      </AlertDescription>
    </Alert>
  )
}
