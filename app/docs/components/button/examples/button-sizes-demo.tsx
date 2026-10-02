"use client"

import { Button } from "../docs-button"

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button size="xs">متن دکمه</Button>
      <Button size="sm">متن دکمه</Button>
      <Button size="default">متن دکمه</Button>
      <Button size="lg">متن دکمه</Button>
    </div>
  )
}
