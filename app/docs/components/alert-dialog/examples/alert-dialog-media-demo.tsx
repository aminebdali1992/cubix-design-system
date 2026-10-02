"use client"

import { CircleFadingPlusIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../docs-alert-dialog"

export function AlertDialogMediaDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" size="sm" />}>
        با آیکن
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <CircleFadingPlusIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>قابلیت‌های اضافه فعال شود؟</AlertDialogTitle>
          <AlertDialogDescription>
            این کار ابزارهای اختیاری به فضای کاری شما اضافه می‌کند. بعداً می‌توانید خاموششان کنید.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>فعلاً نه</AlertDialogCancel>
          <AlertDialogAction>فعال‌سازی</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
