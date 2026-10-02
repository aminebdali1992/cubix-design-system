"use client"

import { AspectRatio } from "../docs-aspect-ratio"

export function AspectRatioImageDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="w-full max-w-sm rounded-lg border">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-muted via-muted to-foreground/15"
      />
      <div className="absolute inset-x-0 bottom-0 bg-background/80 p-3 text-start text-caption text-foreground backdrop-blur-sm">
        نمای شهر در غروب
      </div>
    </AspectRatio>
  )
}
