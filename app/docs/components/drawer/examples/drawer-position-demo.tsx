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

const DRAWER_SIDES = [
  { swipeDirection: "up", label: "بالا" },
  { swipeDirection: "right", label: "راست" },
  { swipeDirection: "down", label: "پایین" },
  { swipeDirection: "left", label: "چپ" },
] as const

export function DrawerPositionDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {DRAWER_SIDES.map(({ swipeDirection, label }) => (
        <Drawer key={swipeDirection} swipeDirection={swipeDirection}>
          <DrawerTrigger render={<Button variant="outline" size="sm" />}>
            {label}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>هدف روزانه</DrawerTitle>
            </DrawerHeader>
            <div className="flex-1 p-4 text-description text-muted-foreground">
              کشو از سمت {label} باز می‌شود.
            </div>
            <DrawerFooter>
              <Button type="submit">تأیید</Button>
              <DrawerClose render={<Button variant="outline" />}>انصراف</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}
