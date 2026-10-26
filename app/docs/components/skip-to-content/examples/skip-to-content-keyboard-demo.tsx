"use client"

import { Button } from "@/components/cubix/button"
import { SkipToContent } from "../docs-skip-to-content"

const navItems = ["خانه", "محصولات", "سفارش‌ها", "گزارش‌ها", "تنظیمات"]

export function SkipToContentKeyboardDemo() {
  return (
    <div dir="rtl" className="relative w-full overflow-hidden rounded-md border border-border bg-background">
      <SkipToContent href="#skip-keyboard-main" onClick={(event) => { event.preventDefault(); const target = document.getElementById("skip-keyboard-main"); if (!target) return; target.focus({ preventScroll: true }); }} className="absolute top-0" />
      <header className="flex flex-wrap items-center gap-1 border-b border-border px-3 py-2">
        {navItems.map((item) => (
          <Button key={item} type="button" variant="ghost" size="xs">
            {item}
          </Button>
        ))}
      </header>
      <main id="skip-keyboard-main" tabIndex={-1} className="space-y-3 p-4 outline-hidden">
        <p className="text-caption text-muted-foreground">
          روی این کادر کلیک کنید و از بالای صفحه Tab بزنید؛ لینک پرش از بالا وارد می‌شود و با Enter فوکوس به این
          بخش می‌آید.
        </p>
        <Button type="button" variant="outline" size="sm">
          ثبت سفارش جدید
        </Button>
      </main>
    </div>
  )
}
