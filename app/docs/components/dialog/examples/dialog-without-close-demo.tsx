"use client"

import { Button } from "@/components/cubix/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogTrigger,
} from "../docs-dialog"

export function DialogWithoutCloseDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>دیالوگ کوچک</DialogTrigger>
      <DialogContent size="small" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>فقط یک دیالوگ کوچک</DialogTitle>
        </DialogHeader>
        <DialogSection>
          <p className="text-label text-muted-foreground">
            می‌توانید دکمه بستن داخلی را مخفی کنید و دکمه خودتان را اضافه کنید.
          </p>
        </DialogSection>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" size="sm" />}>بستن</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
