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

export function DrawerSwipeHandleDemo() {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" size="sm" />}>
        باز کردن با دستگیره
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>کشو</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <div className="rounded-2xl bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-40 group-data-[swipe-axis=y]/drawer-popup:w-full" />
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>بستن</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
