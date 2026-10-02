"use client"

import { Badge } from "../docs-badge"

export function BadgeVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>پیش‌فرض</Badge>
      <Badge variant="secondary">ثانویه</Badge>
      <Badge variant="destructive">مخرب</Badge>
      <Badge variant="outline">حاشیه‌دار</Badge>
      <Badge variant="ghost">شفاف</Badge>
      <Badge variant="link">پیوند</Badge>
    </div>
  )
}
