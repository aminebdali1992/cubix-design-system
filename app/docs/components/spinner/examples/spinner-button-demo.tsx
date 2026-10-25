"use client"

import { Button } from "@/components/cubix/button"
import { Spinner } from "@/components/cubix/spinner"

export function SpinnerButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        در حال ذخیره
      </Button>
      <Button disabled size="sm" variant="outline">
        <Spinner data-icon="inline-start" />
        در حال ارسال
      </Button>
    </div>
  )
}