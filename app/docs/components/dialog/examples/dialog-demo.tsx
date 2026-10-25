"use client"

import { Button } from "@/components/cubix/button"
import { TextField, TextFieldInput, TextFieldLabel } from "@/components/cubix/text-field"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogTrigger,
} from "../docs-dialog"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>ویرایش پروژه</DialogTrigger>
      <DialogContent size="small">
        <DialogHeader>
          <DialogTitle>ویرایش پروژه</DialogTitle>
          <DialogDescription>نام و نشانی پروژه را به‌روزرسانی کنید.</DialogDescription>
        </DialogHeader>
        <DialogSection className="grid gap-4">
          <TextField>
            <TextFieldLabel>نام پروژه</TextFieldLabel>
            <TextFieldInput defaultValue="کیوبیکس" />
          </TextField>
        </DialogSection>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" size="sm" />}>انصراف</DialogClose>
          <Button size="sm">ذخیره تغییرات</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
