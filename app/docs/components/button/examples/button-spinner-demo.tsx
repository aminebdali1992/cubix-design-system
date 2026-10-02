"use client"

import { LoaderIcon } from "lucide-react"

import { Button } from "../docs-button"

export function ButtonSpinnerDemo() {
  return (
    <Button disabled aria-busy="true">
      <LoaderIcon data-icon="inline-start" className="size-4 animate-spin" aria-hidden="true" />
      متن دکمه
    </Button>
  )
}
