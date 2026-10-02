"use client"

import { ArrowLeftIcon, BadgeCheckIcon } from "lucide-react"

import { Badge } from "../docs-badge"

export function BadgeIconDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>
        <BadgeCheckIcon data-icon="inline-start" />
        تأیید شده
      </Badge>
      <Badge variant="secondary">
        ادامه
        <ArrowLeftIcon data-icon="inline-end" />
      </Badge>
    </div>
  )
}
