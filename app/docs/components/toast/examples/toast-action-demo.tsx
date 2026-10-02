"use client"

import { Button } from "@/app/docs/components/button/docs-button"

import { toast } from "../docs-toast"

export function ToastActionDemo() {
  function archiveMessage() {
    const id = toast.add({
      description: "پیام به بایگانی منتقل شد.",
      actionProps: {
        children: "بازگردانی",
        onClick() {
          toast.close(id)
          toast.add({ type: "success", description: "پیام به صندوق ورودی برگشت." })
        },
      },
    })
  }

  return (
    <Button variant="outline" size="sm" onClick={archiveMessage}>
      بایگانی پیام
    </Button>
  )
}
