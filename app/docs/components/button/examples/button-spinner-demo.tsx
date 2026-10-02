"use client"

import { Spinner } from "@/components/cubix/spinner"
import { Button } from "../docs-button"

export function ButtonSpinnerDemo() {
  return (
    <Button disabled>
      <Spinner data-icon="inline-start" />
      در حال ذخیره
    </Button>
  )
}
