"use client"

import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import { ButtonGroup } from "../docs-button-group"

export function ButtonGroupOrientationDemo() {
  return (
    <ButtonGroup orientation="vertical" aria-label="کنترل صدا">
      <Button variant="outline" size="icon-sm" aria-label="افزایش صدا">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="کاهش صدا">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}
