"use client"

import { Badge } from "../docs-badge"

export function BadgeSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>جدید</Badge>
      <Badge size="lg">جدید</Badge>
      <Badge variant="secondary">پیش‌نویس</Badge>
      <Badge variant="secondary" size="lg">
        پیش‌نویس
      </Badge>
    </div>
  )
}
