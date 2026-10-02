"use client"

import { Button } from "@/components/cubix/button"
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

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>نمایش دیالوگ</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>آیا کاملاً مطمئن هستید؟</DialogTitle>
          <DialogDescription>
            این کار قابل بازگشت نیست. حساب شما برای همیشه از سرورها حذف می‌شود.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" size="sm" />}>انصراف</DialogClose>
          <Button variant="destructive" size="sm">
            حذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
