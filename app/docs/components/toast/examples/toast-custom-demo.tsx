"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Button } from "@/app/docs/components/button/docs-button"

import { toast } from "../docs-toast"

export function ToastCustomDemo() {
  function showToast() {
    const id = toast.add({
      title: "دعوت به رویداد",
      description: "سارا شما را به «جلسه‌ی طراحی» دعوت کرد.",
      data: {
        icon: <ButtonDemoIcon className="size-5 text-primary" />,
        actions: (
          <>
            <Button size="xs" onClick={() => toast.close(id)}>
              پذیرش
            </Button>
            <Button variant="outline" size="xs" onClick={() => toast.close(id)}>
              رد کردن
            </Button>
          </>
        ),
      },
    })
  }

  return (
    <Button variant="outline" size="sm" onClick={showToast}>
      نمایش اعلان سفارشی
    </Button>
  )
}
