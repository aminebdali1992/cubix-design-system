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

export function DialogWithoutCloseDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>دیالوگ کوچک</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>فقط یک دیالوگ کوچک</DialogTitle>
          <DialogDescription>
            می‌توانید دکمه بستن داخلی را مخفی کنید و دکمه خودتان را اضافه کنید.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" size="sm" />}>بستن</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
