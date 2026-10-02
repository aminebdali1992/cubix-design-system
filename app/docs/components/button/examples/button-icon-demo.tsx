"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Button } from "../docs-button"

export function ButtonIconDemo() {
  return (
    <Button variant="outline" size="icon" aria-label="افزودن">
      <ButtonDemoIcon />
    </Button>
  )
}
