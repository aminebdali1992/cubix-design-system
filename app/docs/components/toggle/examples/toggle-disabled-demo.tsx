"use client"

import { Toggle } from "../docs-toggle"

export function ToggleDisabledDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Toggle aria-label="غیرفعال" disabled>
        غیرفعال
      </Toggle>
      <Toggle variant="outline" aria-label="غیرفعال با حاشیه" disabled>
        غیرفعال
      </Toggle>
    </div>
  )
}