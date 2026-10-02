"use client"

import { Button } from "@/components/cubix/button"
import { EmailField, EmailFieldControl, EmailFieldInput } from "@/components/cubix/email-field"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../docs-popover"

export function PopoverFormDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>باز کردن فرم</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>عضویت در خبرنامه</PopoverTitle>
          <PopoverDescription>جدیدترین مقالات را در ایمیل خود دریافت کنید.</PopoverDescription>
        </PopoverHeader>
        <div className="mt-3 grid gap-3">
          <EmailField>
            <EmailFieldControl>
              <EmailFieldInput placeholder="example@cubix.com" />
            </EmailFieldControl>
          </EmailField>
          <PopoverClose render={<Button className="w-full" />}>عضویت</PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}
