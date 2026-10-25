"use client"

import { Badge } from "@/components/cubix/badge"
import { Spinner } from "@/components/cubix/spinner"

export function SpinnerBadgeDemo() {
  return (
    <Badge>
      <Spinner data-icon="inline-start" />
      در حال همگام‌سازی
    </Badge>
  )
}