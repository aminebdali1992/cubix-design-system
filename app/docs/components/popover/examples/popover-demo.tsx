"use client"

import { Button } from "@/components/cubix/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../docs-popover"

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        باز کردن پاپ‌آور
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>ابعاد</PopoverTitle>
          <PopoverDescription>ابعاد این لایه را تنظیم کنید.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}
