"use client"

import { Button } from "@/app/docs/components/button/docs-button"

import { toast } from "../docs-toast"

export function ToastTypesDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.add({ description: "رویداد ساخته شد." })}
      >
        پیش‌فرض
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.add({ type: "success", description: "رویداد ساخته شد." })}
      >
        موفقیت
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.add({
            type: "info",
            description: "ده دقیقه زودتر از شروع رویداد برسید.",
          })
        }
      >
        اطلاعات
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.add({
            type: "warning",
            description: "رویداد نمی‌تواند قبل از ساعت ۸ صبح شروع شود.",
          })
        }
      >
        هشدار
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.add({
            type: "error",
            description: "ساخت رویداد ناموفق بود.",
            priority: "high",
          })
        }
      >
        خطا
      </Button>
    </div>
  )
}
