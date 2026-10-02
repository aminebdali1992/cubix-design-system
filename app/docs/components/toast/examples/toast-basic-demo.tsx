"use client"

import { Button } from "@/app/docs/components/button/docs-button"

import { toast } from "../docs-toast"

export function ToastBasicDemo() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        toast.add({
          title: "تغییرات ذخیره شد",
          description: "پروفایل شما به‌روزرسانی شد.",
        })
      }
    >
      ذخیره تغییرات
    </Button>
  )
}
