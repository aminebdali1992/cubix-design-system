"use client"

import { TextBoldIcon, TextItalicIcon, TextUnderlineIcon } from "@/components/docs/empty-icons"

import { ToggleGroup, ToggleGroupItem } from "../docs-toggle-group"

export function ToggleGroupDemo() {
  return (
    <ToggleGroup variant="outline" size="sm" multiple>
      <ToggleGroupItem value="italic" aria-label="مورب">
        <TextItalicIcon data-icon="inline-start" className="size-4" />
        مورب
      </ToggleGroupItem>
      <ToggleGroupItem value="bold" aria-label="پررنگ">
        <TextBoldIcon data-icon="inline-start" className="size-4" />
        پررنگ
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="زیرخط">
        <TextUnderlineIcon data-icon="inline-start" className="size-4" />
        زیرخط
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
