"use client"

import { Separator } from "../docs-separator"

export function SeparatorVerticalDemo() {
  return (
    <div className="flex h-5 items-center gap-4 text-label text-foreground">
      <div>وبلاگ</div>
      <Separator orientation="vertical" />
      <div>مستندات</div>
      <Separator orientation="vertical" />
      <div>کد منبع</div>
    </div>
  )
}