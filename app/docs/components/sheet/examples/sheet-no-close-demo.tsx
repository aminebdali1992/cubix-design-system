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

export function SheetNoCloseDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>بدون دکمه بستن</SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>ویرایش پروفایل</SheetTitle>
        </SheetHeader>
        <div className="px-4 text-label text-muted-foreground">
          این شیت دکمه بستن در هدر ندارد.
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>بستن</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}