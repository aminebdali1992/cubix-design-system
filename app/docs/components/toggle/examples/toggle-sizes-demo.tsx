"use client"

import { Toggle } from "../docs-toggle"

export function ToggleSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Toggle variant="outline" aria-label="خیلی کوچک" size="xs">
        خیلی کوچک
      </Toggle>
      <Toggle variant="outline" aria-label="کوچک" size="sm">
        کوچک
      </Toggle>
      <Toggle variant="outline" aria-label="پیش‌فرض" size="default">
        پیش‌فرض
      </Toggle>
      <Toggle variant="outline" aria-label="بزرگ" size="lg">
        بزرگ
      </Toggle>
    </div>
  )
}