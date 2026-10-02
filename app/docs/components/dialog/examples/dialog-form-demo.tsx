"use client"

import { Button } from "@/components/cubix/button"
import {
  EmailField,
  EmailFieldDescription,
  EmailFieldInput,
  EmailFieldLabel,
} from "@/components/cubix/email-field"
import { TextField, TextFieldInput, TextFieldLabel } from "@/components/cubix/text-field"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../docs-dialog"

export function DialogFormDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>ویرایش پروفایل</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش پروفایل</DialogTitle>
          <DialogDescription>
            تغییرات پروفایل را اینجا اعمال کنید. پس از اتمام، ذخیره را بزنید.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 grid gap-4">
          <TextField>
            <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
            <TextFieldInput placeholder="امین ابدالی" />
          </TextField>
          <EmailField>
            <EmailFieldLabel>ایمیل</EmailFieldLabel>
            <EmailFieldInput placeholder="example@cubix.com" />
            <EmailFieldDescription>
              برای ورود و بازیابی حساب از این ایمیل استفاده می‌شود.
            </EmailFieldDescription>
          </EmailField>
        </div>
        <DialogFooter>
          <DialogClose render={<Button type="submit" size="sm" />}>ذخیره تغییرات</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
