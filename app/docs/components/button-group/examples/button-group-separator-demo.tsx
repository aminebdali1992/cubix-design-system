"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { ButtonGroup, ButtonGroupSeparator } from "../docs-button-group"

export function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup aria-label="کلیپ‌بورد">
      <Button variant="secondary" size="sm">
        کپی
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        چسباندن
      </Button>
    </ButtonGroup>
  )
}
