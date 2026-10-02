"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Button } from "../docs-button"

export function ButtonWithIconDemo() {
  return (
    <Button>
      <ButtonDemoIcon data-icon="inline-start" />
      متن دکمه
    </Button>
  )
}
