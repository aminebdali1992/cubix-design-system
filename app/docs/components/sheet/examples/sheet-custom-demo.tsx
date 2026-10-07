"use client"

import { Button } from "@/components/cubix/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../docs-sheet"

export function SheetCustomDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>
        شیت با استایل سفارشی
      </SheetTrigger>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader className="border-b-0">
          <SheetTitle>تنظیمات پیشرفته</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-3 px-4 text-label text-muted-foreground">
          <p>
            هدر و فوتر با <span className="font-mono text-foreground">className</span> بدون خط
            و بدون پس‌زمینهٔ خاکستری.
          </p>
        </div>
        <SheetFooter className="border-t-0 bg-transparent">
          <Button type="submit">اعمال</Button>
          <SheetClose render={<Button variant="outline" />}>بستن</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
