"use client"

import { Button } from "@/app/docs/components/button/docs-button"

import { toast } from "../docs-toast"

export function ToastDemo() {
  function showToast() {
    const id = toast.add({
      title: "رویداد ساخته شد",
      description: "یکشنبه، ۱۲ آذر ساعت ۹:۰۰ صبح",
      actionProps: {
        children: "بازگردانی",
        onClick() {
          toast.close(id)
        },
      },
    })
  }

  return (
    <Button variant="outline" size="sm" onClick={showToast}>
      نمایش اعلان
    </Button>
  )
}
