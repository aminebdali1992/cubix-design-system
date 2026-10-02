"use client"

import { Button } from "@/components/cubix/button"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../docs-popover"

export function PopoverCloseDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>باز کردن</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>تأیید</PopoverTitle>
          <PopoverDescription>می‌توانید از داخل پنل پاپ‌آور را ببندید.</PopoverDescription>
        </PopoverHeader>
        <PopoverClose render={<Button variant="outline" size="sm" className="mt-2" />}>
          بستن
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
