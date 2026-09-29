"use client"

import { Button } from "@/components/cubix/button"
import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"
import { toast } from "@/app/docs/components/toast/docs-toast"

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
        onClick={() =>
          toast.add({ type: "success", description: "رویداد ساخته شد." })
        }
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

export function ToastPromiseDemo() {
  function showToast() {
    toast.promise(
      new Promise<{ name: string }>((resolve) => {
        window.setTimeout(() => resolve({ name: "رویداد" }), 2000)
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
export function ToastCustomDemo() {
  function showToast() {
    const id = toast.add({
      title: "دعوت به رویداد",
      description: "سارا شما را به «جلسه‌ی طراحی» دعوت کرد",
      data: {
        icon: <ButtonDemoIcon className="size-5" />,
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
