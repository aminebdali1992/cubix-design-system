"use client"

import { Button } from "@/app/docs/components/button/docs-button"

import { toast } from "../docs-toast"

const SAVE_DELAY_MS = 2000

export function ToastPromiseDemo() {
  function showToast() {
    toast.promise(
      new Promise<{ name: string }>((resolve) => {
        window.setTimeout(() => resolve({ name: "رویداد" }), SAVE_DELAY_MS)
      }),
      {
        loading: "در حال ساخت رویداد...",
        success: (data) => `${data.name} ساخته شد.`,
        error: "ساخت رویداد ناموفق بود.",
      }
    )
  }

  return (
    <Button variant="outline" size="sm" onClick={showToast}>
      ساخت رویداد
    </Button>
  )
}
