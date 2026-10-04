"use client"

import { Button } from "../docs-button"

export function ButtonPrimaryDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button>متن دکمه</Button>
      <Button variant="secondary">متن دکمه</Button>
      <Button variant="foreground">متن دکمه</Button>
    </div>
  )
}
