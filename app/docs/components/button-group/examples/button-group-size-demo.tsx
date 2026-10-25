"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { ButtonGroup } from "../docs-button-group"

export function ButtonGroupSizeDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ButtonGroup aria-label="بازه زمانی کوچک">
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
      <ButtonGroup aria-label="بازه زمانی پیش‌فرض">
        <Button variant="outline">روزانه</Button>
        <Button variant="outline">هفتگی</Button>
        <Button variant="outline">ماهانه</Button>
      </ButtonGroup>
    </div>
  )
}