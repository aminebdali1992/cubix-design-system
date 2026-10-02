"use client"

import { CircleAlertIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "../docs-alert"

export function AlertDestructiveDemo() {
  return (
    <Alert variant="destructive" className="w-full max-w-md">
      <CircleAlertIcon />
      <AlertTitle>پرداخت ناموفق بود</AlertTitle>
      <AlertDescription>
        پرداخت شما انجام نشد. لطفاً روش پرداخت را بررسی کنید و دوباره تلاش کنید.
      </AlertDescription>
    </Alert>
  )
}
