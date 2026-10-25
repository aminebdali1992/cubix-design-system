"use client"

import { ToggleGroup, ToggleGroupItem } from "../docs-toggle-group"

export function ToggleGroupSizesDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup variant="outline" size="xs" defaultValue={["top"]}>
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
      <ToggleGroup variant="outline" size="sm" defaultValue={["top"]}>
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
      <ToggleGroup variant="outline" size="default" defaultValue={["top"]}>
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
      <ToggleGroup variant="outline" size="lg" defaultValue={["top"]}>
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
    </div>
  )
}
