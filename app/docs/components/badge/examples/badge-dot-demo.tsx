"use client"

import { Badge } from "../docs-badge"

export function BadgeDotDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="dot" role="img" aria-label="آنلاین" />
      <Badge variant="dot" size="lg" role="img" aria-label="آنلاین" />
      <Badge variant="dot" role="img" aria-label="آفلاین" className="bg-muted-foreground" />
      <Badge variant="dot" role="img" aria-label="خطا" className="bg-destructive" />
    </div>
  )
}
