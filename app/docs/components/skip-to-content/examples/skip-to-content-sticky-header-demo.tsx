"use client"

import { Button } from "@/components/cubix/button"
import { SkipToContent } from "../docs-skip-to-content"

const sections = ["فناوری", "اقتصاد", "ورزش"]

export function SkipToContentStickyHeaderDemo() {
  return (
    <div dir="rtl" className="relative h-72 w-full overflow-auto rounded-md border border-border bg-background">
      <SkipToContent href="#skip-sticky-main" onClick={(event) => { event.preventDefault(); const target = document.getElementById("skip-sticky-main"); if (!target) return; target.focus({ preventScroll: true }); const container = event.currentTarget.parentElement; if (container) container.scrollTop = target.offsetTop - 48; }} className="absolute start-4 top-0 z-20">
        رفتن به متن خبر
      </SkipToContent>
      <header className="sticky top-0 z-10 flex h-12 items-center justify-between gap-4 border-b border-border bg-background px-4">
        <span className="text-title text-foreground">روزنامه امروز</span>
        <nav className="flex items-center gap-1">
          {sections.map((item) => (
            <Button key={item} type="button" variant="ghost" size="xs">
              {item}
            </Button>
          ))}
        </nav>
      </header>
      <main id="skip-sticky-main" tabIndex={-1} className="scroll-mt-12 space-y-3 p-4 outline-hidden">
        <p className="text-title text-foreground">رونمایی از نسل جدید پردازنده‌های کم‌مصرف</p>
        <p className="text-caption text-muted-foreground">
          هدر این صفحه هنگام اسکرول بالای صفحه ثابت می‌ماند. با یک بار زدن Tab لینک پرش نمایان می‌شود و Enter شما را
          مستقیم به متن خبر می‌برد، بدون اینکه هدر روی عنوان بیفتد.
        </p>
        <p className="text-caption text-muted-foreground">
          سازندگان می‌گویند مصرف انرژی نسل جدید تا سی درصد کمتر از نسل قبل است و عمر باتری لپ‌تاپ‌ها را به شکل محسوسی
          افزایش می‌دهد.
        </p>
        <p className="text-caption text-muted-foreground">
          نخستین دستگاه‌های مجهز به این پردازنده از ماه آینده به بازار عرضه می‌شوند.
        </p>
        <Button type="button" variant="outline" size="sm">
          ادامه خبر
        </Button>
      </main>
    </div>
  )
}
