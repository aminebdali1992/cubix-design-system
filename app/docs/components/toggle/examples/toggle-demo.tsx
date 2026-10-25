"use client"

import { BookmarkIcon } from "@/components/docs/empty-icons"

import { Toggle } from "../docs-toggle"

export function ToggleDemo() {
  return (
    <Toggle aria-label="نشان‌گذاری" size="sm" variant="outline">
      <BookmarkIcon data-icon="inline-start" className="size-4 group-aria-pressed/toggle:fill-foreground" />
      نشان‌گذاری
    </Toggle>
  )
}