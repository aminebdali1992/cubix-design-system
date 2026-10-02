"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Button } from "../docs-button"

export function ButtonDemo() {
  return (
    <Button>
      <ButtonDemoIcon data-icon="inline-start" />
      متن دکمه
      <ButtonDemoIcon data-icon="inline-end" />
    </Button>
  )
}
