"use client"

import { AspectRatio } from "../docs-aspect-ratio"

export function AspectRatioPortraitDemo() {
  return (
    <AspectRatio ratio={9 / 16} className="w-44 rounded-lg border bg-muted">
      <div className="absolute inset-0 flex items-center justify-center text-caption text-muted-foreground">
        ۹∶۱۶
      </div>
    </AspectRatio>
  )
}
