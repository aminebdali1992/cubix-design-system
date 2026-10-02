"use client"

import { PlusIcon } from "lucide-react"

import { Button } from "../docs-button"

export function ButtonIconSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="outline" size="icon-xs" aria-label="آیکون خیلی کوچک">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="آیکون کوچک">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="دکمه آیکون">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon-lg" aria-label="آیکون بزرگ">
        <PlusIcon />
      </Button>
    </div>
  )
}
