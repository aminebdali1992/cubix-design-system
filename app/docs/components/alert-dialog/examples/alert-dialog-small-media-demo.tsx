"use client"

import { BluetoothIcon } from "lucide-react"

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

export function AlertDialogSmallMediaDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" size="sm" />}>
        دیالوگ کوچک با آیکن
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <BluetoothIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>اتصال دستگاه جانبی اجازه داده شود؟</AlertDialogTitle>
          <AlertDialogDescription>
            آیا می‌خواهید اجازه دهید دستگاه USB به این دستگاه متصل شود؟
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>اجازه نده</AlertDialogCancel>
          <AlertDialogAction>اجازه بده</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
