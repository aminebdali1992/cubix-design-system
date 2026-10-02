"use client"

import { Badge } from "../docs-badge"

export function BadgeSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>پیش‌فرض</Badge>
      <Badge size="lg">بزرگ</Badge>
      <Badge variant="secondary">پیش‌فرض</Badge>
      <Badge variant="secondary" size="lg">
        بزرگ
      </Badge>
    </div>
  )
}
