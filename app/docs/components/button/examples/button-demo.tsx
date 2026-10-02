"use client"

import { PlusIcon } from "lucide-react"

import { Button } from "../docs-button"

export function ButtonDemo() {
  return (
    <Button>
      <PlusIcon data-icon="inline-start" />
      متن دکمه
      <PlusIcon data-icon="inline-end" />
    </Button>
  )
}
