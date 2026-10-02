"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { ButtonGroup } from "../docs-button-group"

export function ButtonGroupDemo() {
  return (
    <ButtonGroup aria-label="ویرایش">
      <Button variant="outline" size="sm">
        کپی
      </Button>
      <Button variant="outline" size="sm">
        برش
      </Button>
      <Button variant="outline" size="sm">
        چسباندن
      </Button>
    </ButtonGroup>
  )
}
