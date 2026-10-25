"use client"

import { ToggleGroup, ToggleGroupItem } from "../docs-toggle-group"

export function ToggleGroupOutlineDemo() {
  return (
    <ToggleGroup variant="outline" size="sm" defaultValue={["all"]}>
      <ToggleGroupItem value="all" aria-label="همه">
        همه
      </ToggleGroupItem>
      <ToggleGroupItem value="missed" aria-label="بی‌پاسخ">
        بی‌پاسخ
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
