"use client"

import { PlusIcon } from "lucide-react"

import { Button } from "../docs-button"

export function ButtonWithIconDemo() {
  return (
    <Button>
      <PlusIcon data-icon="inline-start" />
      متن دکمه
    </Button>
  )
}
