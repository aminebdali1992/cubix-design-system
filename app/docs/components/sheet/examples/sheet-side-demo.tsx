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

const SHEET_SIDES = [
  { side: "top", label: "بالا" },
  { side: "right", label: "راست" },
  { side: "bottom", label: "پایین" },
  { side: "left", label: "چپ" },
] as const

export function SheetSideDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {SHEET_SIDES.map(({ side, label }) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline" size="sm" />}>{label}</SheetTrigger>
          <SheetContent
            side={side}
            className="data-[side=bottom]:min-h-[40vh] data-[side=bottom]:max-h-[50vh] data-[side=top]:min-h-[40vh] data-[side=top]:max-h-[50vh]"
          >
            <SheetHeader>
              <SheetTitle>ویرایش پروفایل</SheetTitle>
            </SheetHeader>
            <div className="flex-1" />
            <SheetFooter>
              <Button type="submit">ذخیره تغییرات</Button>
              <SheetClose render={<Button variant="outline" />}>انصراف</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
