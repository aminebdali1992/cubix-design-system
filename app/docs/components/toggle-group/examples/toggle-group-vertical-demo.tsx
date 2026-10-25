"use client"

import { TextBoldIcon, TextItalicIcon, TextUnderlineIcon } from "@/components/docs/empty-icons"

import { ToggleGroup, ToggleGroupItem } from "../docs-toggle-group"

export function ToggleGroupVerticalDemo() {
  return (
    <ToggleGroup multiple orientation="vertical" spacing={1} size="sm" defaultValue={["italic", "bold"]}>
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
