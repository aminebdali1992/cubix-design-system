"use client"

import { Separator } from "../docs-separator"

export function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-1">
        <h4 className="text-label font-normal text-foreground">کیوبیکس</h4>
        <p className="text-description text-muted-foreground">
          کامپوننت‌های آماده که می‌توانید در پروژه‌تان کپی کنید.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-label text-foreground">
        <div>وبلاگ</div>
        <Separator orientation="vertical" />
        <div>مستندات</div>
        <Separator orientation="vertical" />
        <div>کد منبع</div>
      </div>
    </div>
  )
}