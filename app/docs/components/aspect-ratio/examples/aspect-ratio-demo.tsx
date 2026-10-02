"use client"

import { AspectRatio } from "../docs-aspect-ratio"

export function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="w-full max-w-sm rounded-lg border bg-muted">
      <div className="absolute inset-0 flex items-center justify-center text-caption text-muted-foreground">
        ۱۶∶۹
      </div>
    </AspectRatio>
  )
}
