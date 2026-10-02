"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { ButtonGroup } from "../docs-button-group"

export function ButtonGroupSizeDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ButtonGroup aria-label="گروه کوچک">
        <Button variant="outline" size="sm">
          کوچک
        </Button>
        <Button variant="outline" size="sm">
          دکمه
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="گروه پیش‌فرض">
        <Button variant="outline">پیش‌فرض</Button>
        <Button variant="outline">دکمه</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="گروه بزرگ">
        <Button variant="outline" size="lg">
          بزرگ
        </Button>
        <Button variant="outline" size="lg">
          دکمه
        </Button>
      </ButtonGroup>
    </div>
  )
}
