"use client"

import { PlusIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import { ButtonGroup } from "../docs-button-group"

export function ButtonGroupNestedDemo() {
  return (
    <ButtonGroup aria-label="مدیریت پیام">
      <ButtonGroup>
        <Button variant="outline" size="icon-sm" aria-label="پیام جدید">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          بایگانی
        </Button>
        <Button variant="outline" size="sm">
          گزارش
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
