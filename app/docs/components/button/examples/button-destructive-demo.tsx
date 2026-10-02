"use client"

import { Button } from "../docs-button"

export function ButtonDestructiveDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="destructive">متن دکمه</Button>
      <Button variant="destructive-secondary">متن دکمه</Button>
    </div>
  )
}
