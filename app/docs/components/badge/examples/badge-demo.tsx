"use client"

import { Badge } from "../docs-badge"

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>نشان</Badge>
      <Badge variant="secondary">ثانویه</Badge>
      <Badge variant="destructive">مخرب</Badge>
      <Badge variant="outline">حاشیه‌دار</Badge>
    </div>
  )
}
