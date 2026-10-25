"use client"

import { TextBoldIcon, TextItalicIcon } from "@/components/docs/empty-icons"

import { Toggle } from "../docs-toggle"

export function ToggleOutlineDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Toggle size="sm" variant="outline" aria-label="مورب">
        <TextItalicIcon data-icon="inline-start" className="size-4" />
        مورب
      </Toggle>
      <Toggle size="sm" variant="outline" aria-label="پررنگ">
        <TextBoldIcon data-icon="inline-start" className="size-4" />
        پررنگ
      </Toggle>
    </div>
  )
}
