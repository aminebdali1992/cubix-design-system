"use client"

import { useState } from "react"
import { XIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "../docs-alert"

export function AlertDismissibleDemo() {
  const [open, setOpen] = useState(true)

  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        نمایش دوباره هشدار
      </Button>
    )
  }

  return (
    <Alert className="w-full max-w-md">
      <AlertTitle>با موفقیت ذخیره شد</AlertTitle>
      <AlertDescription>تغییرات شما روی سرور ذخیره شد.</AlertDescription>
      <AlertAction>
        <Button variant="ghost" size="icon-sm" aria-label="بستن" onClick={() => setOpen(false)}>
          <XIcon />
        </Button>
      </AlertAction>
    </Alert>
  )
}
