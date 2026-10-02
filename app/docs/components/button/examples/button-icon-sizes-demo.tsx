"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Button } from "../docs-button"

export function ButtonIconSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="outline" size="icon-xs" aria-label="آیکون خیلی کوچک">
        <ButtonDemoIcon />
      </Button>
      <Button variant="outline" size="icon-sm" aria-label="آیکون کوچک">
        <ButtonDemoIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="دکمه آیکون">
        <ButtonDemoIcon />
      </Button>
      <Button variant="outline" size="icon-lg" aria-label="آیکون بزرگ">
        <ButtonDemoIcon />
      </Button>
    </div>
  )
}
