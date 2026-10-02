"use client"

import { Button } from "../docs-button"

export function ButtonCustomDemo() {
  return (
    <Button
      variant="outline"
      className="rounded-md border-border bg-muted/40 ring-1 ring-border ring-offset-2 ring-offset-background transition-colors duration-300 ease-out hover:bg-muted"
    >
      متن دکمه
    </Button>
  )
}
