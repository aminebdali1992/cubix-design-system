"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "../docs-alert"

export function AlertActionDemo() {
  return (
    <Alert className="w-full max-w-md">
      <AlertTitle>حالت تاریک فعال شد</AlertTitle>
      <AlertDescription>برای شروع آن را از تنظیمات پروفایل شخصی‌سازی کنید.</AlertDescription>
      <AlertAction>
        <Button size="xs" variant="default">
          تنظیمات
        </Button>
      </AlertAction>
    </Alert>
  )
}
