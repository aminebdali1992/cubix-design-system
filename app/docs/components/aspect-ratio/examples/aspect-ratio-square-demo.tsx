"use client"

import { AspectRatio } from "../docs-aspect-ratio"

export function AspectRatioSquareDemo() {
  return (
    <AspectRatio ratio={1} className="w-full max-w-xs rounded-lg border bg-muted">
      <div className="absolute inset-0 flex items-center justify-center text-caption text-muted-foreground">
        ۱∶۱
      </div>
    </AspectRatio>
  )
}
