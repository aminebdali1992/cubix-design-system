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

type Side = "up" | "right" | "down" | "left"

const DRAWER_SIDES = [
  { swipeDirection: "up", label: "بالا" },
  { swipeDirection: "right", label: "راست" },
  { swipeDirection: "down", label: "پایین" },
  { swipeDirection: "left", label: "چپ" },
] as const

const LEVELS = ["کشو", "کشوی تو‌در‌تو", "کشوی سوم"]

function NestedLevel({ side, level }: { side: Side; level: number }) {
  const isLast = level === LEVELS.length - 1
  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{LEVELS[level]}</DrawerTitle>
      </DrawerHeader>
      <div className="flex-1 p-4">
        <div className="rounded-2xl bg-muted group-data-[swipe-axis=x]/drawer-popup:h-full group-data-[swipe-axis=y]/drawer-popup:aspect-video group-data-[swipe-axis=y]/drawer-popup:w-full" />
      </div>
      <DrawerFooter>
        {!isLast && (
          <Drawer swipeDirection={side} showSwipeHandle>
            <DrawerTrigger render={<Button variant="outline" />}>
              باز کردن {LEVELS[level + 1]}
            </DrawerTrigger>
            <NestedLevel side={side} level={level + 1} />
          </Drawer>
        )}
        <DrawerClose render={<Button variant="outline" />}>بستن</DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  )
}

export function DrawerNestedDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {DRAWER_SIDES.map(({ swipeDirection, label }) => (
        <Drawer key={swipeDirection} swipeDirection={swipeDirection} showSwipeHandle>
          <DrawerTrigger render={<Button variant="outline" size="sm" />}>
            {label}
          </DrawerTrigger>
          <NestedLevel side={swipeDirection} level={0} />
        </Drawer>
      ))}
    </div>
  )
}