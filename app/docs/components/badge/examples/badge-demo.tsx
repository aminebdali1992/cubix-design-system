"use client"

import { Badge } from "../docs-badge"

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>جدید</Badge>
      <Badge variant="secondary">پیش‌نویس</Badge>
      <Badge variant="destructive">لغو شده</Badge>
      <Badge variant="outline">نسخه ۲٫۱</Badge>
    </div>
  )
}
