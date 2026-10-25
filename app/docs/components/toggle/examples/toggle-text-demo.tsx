"use client"

import { TextItalicIcon } from "@/components/docs/empty-icons"

import { Toggle } from "../docs-toggle"

export function ToggleTextDemo() {
  return (
    <Toggle size="sm" aria-label="مورب">
      <TextItalicIcon data-icon="inline-start" className="size-4" />
      مورب
    </Toggle>
  )
}
