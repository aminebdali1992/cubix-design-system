"use client"

import { Badge } from "../docs-badge"

export function BadgeVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>جدید</Badge>
      <Badge variant="secondary">پیش‌نویس</Badge>
      <Badge variant="destructive">ناموفق</Badge>
      <Badge variant="outline">در انتظار</Badge>
      <Badge variant="ghost">بایگانی</Badge>
      <Badge variant="link">مشاهده همه</Badge>
    </div>
  )
}
