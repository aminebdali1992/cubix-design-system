"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { ButtonGroup } from "../docs-button-group"

export function ButtonGroupDemo() {
  return (
    <ButtonGroup aria-label="بازه زمانی">
      <Button variant="outline" size="sm">
        روزانه
      </Button>
      <Button variant="outline" size="sm">
        هفتگی
      </Button>
      <Button variant="outline" size="sm">
        ماهانه
      </Button>
    </ButtonGroup>
  )
}
