"use client"

import { Button } from "@/components/cubix/button"
import { TextField, TextFieldInput, TextFieldLabel } from "@/components/cubix/text-field"
import {
  Sheet,
  SheetClose,
  SheetContent,

  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../docs-sheet"

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>ویرایش پروفایل</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>ویرایش پروفایل</SheetTitle>
</SheetHeader>
        <div className="grid gap-4 px-4">
          <TextField>
            <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
            <TextFieldInput placeholder="امین ابدالی" />
          </TextField>
          <TextField>
            <TextFieldLabel>نام کاربری</TextFieldLabel>
            <TextFieldInput placeholder="@amin" />
          </TextField>
        </div>
        <SheetFooter>
          <Button type="submit">
            ذخیره تغییرات
          </Button>
          <SheetClose render={<Button variant="outline" />}>بستن</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}