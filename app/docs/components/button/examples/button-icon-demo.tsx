"use client"

import { PlusIcon } from "lucide-react"

import { Button } from "../docs-button"

export function ButtonIconDemo() {
  return (
    <Button variant="outline" size="icon" aria-label="افزودن">
      <PlusIcon />
    </Button>
  )
}
