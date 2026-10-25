"use client"

import { LoaderIcon } from "lucide-react"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Button } from "../docs-button"

export function ButtonDestructiveDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button size="sm" variant="destructive">ذخیره</Button>
      <Button size="sm" variant="destructive">
        <ButtonDemoIcon data-icon="inline-start" />
        افزودن
      </Button>
      <Button size="sm" variant="destructive">
        ادامه
        <ButtonDemoIcon data-icon="inline-end" />
      </Button>
      <Button size="sm" variant="destructive" disabled aria-busy="true">
        <LoaderIcon data-icon="inline-start" className="size-4 animate-spin" aria-hidden="true" />
        در حال ذخیره
      </Button>
    </div>
  )
}
