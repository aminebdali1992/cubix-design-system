"use client"

import { ToggleGroup, ToggleGroupItem } from "../docs-toggle-group"

export function ToggleGroupSpacingDemo() {
  return (
    <ToggleGroup variant="outline" size="sm" spacing={0} defaultValue={["top"]}>
      <ToggleGroupItem value="top" aria-label="بالا">
        بالا
      </ToggleGroupItem>
      <ToggleGroupItem value="bottom" aria-label="پایین">
        پایین
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="راست">
        راست
      </ToggleGroupItem>
      <ToggleGroupItem value="left" aria-label="چپ">
        چپ
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
