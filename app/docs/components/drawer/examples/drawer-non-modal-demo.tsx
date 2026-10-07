"use client"

import { Button } from "@/components/cubix/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../docs-drawer"

export function DrawerNonModalDemo() {
  return (
    <Drawer modal={false} disablePointerDismissal swipeDirection="right">
      <DrawerTrigger render={<Button variant="outline" size="sm" />}>
        غیرمودال
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>کشوی غیرمودال</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 p-4 text-description text-muted-foreground">
          صفحه همچنان قابل تعامل است. با کلیک بیرون بسته نمی‌شود.
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button />}>بستن</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
