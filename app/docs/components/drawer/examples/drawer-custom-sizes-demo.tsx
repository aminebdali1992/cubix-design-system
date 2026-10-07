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

export function DrawerCustomSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Drawer swipeDirection="down">
        <DrawerTrigger render={<Button variant="outline" size="sm" />}>
          ارتفاع سفارشی
        </DrawerTrigger>
        <DrawerContent className="h-[50vh]">
          <DrawerHeader>
            <DrawerTitle>کشو با ارتفاع سفارشی</DrawerTitle>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-4 text-description text-muted-foreground">
            محتوای قابل اسکرول داخل کشوی عمودی.
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>بستن</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer swipeDirection="right">
        <DrawerTrigger render={<Button variant="outline" size="sm" />}>
          عرض سفارشی
        </DrawerTrigger>
        <DrawerContent className="w-96">
          <DrawerHeader>
            <DrawerTitle>کشو با عرض سفارشی</DrawerTitle>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-4 text-description text-muted-foreground">
            محتوای قابل اسکرول داخل کشوی کناری.
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>بستن</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
