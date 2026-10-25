"use client"

import { ToggleGroup, ToggleGroupItem } from "../docs-toggle-group"

export function ToggleGroupSegmentedDemo() {
  return (
    <ToggleGroup variant="segmented" size="sm" defaultValue={["preview"]} className="w-64">
      <ToggleGroupItem value="preview" aria-label="پیش‌نمایش" className="flex-1">
        پیش‌نمایش
      </ToggleGroupItem>
      <ToggleGroupItem value="code" aria-label="کد" className="flex-1">
        کد
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
