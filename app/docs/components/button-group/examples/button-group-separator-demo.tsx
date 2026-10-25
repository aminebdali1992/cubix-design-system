"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { ButtonGroup, ButtonGroupSeparator } from "../docs-button-group"

export function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup aria-label="فایل">
      <Button variant="gray" size="sm">
        ذخیره
      </Button>
      <ButtonGroupSeparator />
      <Button variant="gray" size="sm">
        ارسال
      </Button>
    </ButtonGroup>
  )
}
