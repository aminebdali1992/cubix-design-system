"use client"

import { Button } from "../docs-button"

export function ButtonDisabledDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button disabled>متن دکمه</Button>
      <Button variant="outline" disabled>
        متن دکمه
      </Button>
    </div>
  )
}
