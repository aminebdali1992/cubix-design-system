"use client"

import { Spinner } from "@/components/cubix/spinner"
import { Badge } from "../docs-badge"

export function BadgeSpinnerDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="destructive">
        <Spinner data-icon="inline-start" />
        در حال حذف
      </Badge>
      <Badge variant="secondary">
        در حال ساخت
        <Spinner data-icon="inline-end" />
      </Badge>
    </div>
  )
}
