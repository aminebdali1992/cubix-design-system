"use client"

import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/docs/components/dropdown-menu/docs-dropdown-menu"
import { ButtonGroup } from "../docs-button-group"

export function ButtonGroupSplitDemo() {
  return (
    <ButtonGroup aria-label="به‌روزرسانی افزونه">
      <Button variant="outline" size="sm">
        به‌روزرسانی
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" size="icon-sm" aria-label="گزینه‌های بیشتر" />}
        >
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>غیرفعال کردن</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">حذف</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
