"use client"

import { ArrowUpLeftIcon } from "lucide-react"

import { Badge } from "../docs-badge"

export function BadgeLinkDemo() {
  return (
    <Badge render={<a href="#" />}>
      مشاهده جزئیات
      <ArrowUpLeftIcon data-icon="inline-end" />
    </Badge>
  )
}
