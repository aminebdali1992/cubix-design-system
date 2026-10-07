"use client"

/*
  Drawer docs switcher. Mirrors docs-sheet: demo code stays identical while
  the active base (base / radix / aria) resolves from the URL. All three bases
  share the same chrome; Base adds swipeDirection / showSwipeHandle / snapPoints.
*/
import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaDrawer from "@/components/cubix/aria/drawer"
import * as BaseDrawer from "@/components/cubix/base/drawer"
import * as RadixDrawer from "@/components/cubix/radix/drawer"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type Direction = "top" | "right" | "bottom" | "left"
type SwipeDirection = "up" | "right" | "down" | "left"

type DrawerProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  direction?: Direction
  swipeDirection?: SwipeDirection
  showSwipeHandle?: boolean
  snapPoints?: (number | string)[]
  modal?: boolean | "trap-focus"
  disablePointerDismissal?: boolean
  children?: ReactNode
}

type DrawerTriggerProps = {
  render?: ComponentProps<typeof AriaDrawer.DrawerTrigger>["render"]
  className?: string
  children?: ReactNode
}

type DrawerCloseProps = {
  render?: ComponentProps<typeof AriaDrawer.DrawerClose>["render"]
  className?: string
  children?: ReactNode
}

type DrawerContentProps = {
  className?: string
  dir?: "ltr" | "rtl"
  lang?: string
  children?: ReactNode
}

type SlotProps = {
  className?: string
  children?: ReactNode
}

function useDrawerBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Drawer({
  open,
  defaultOpen,
  onOpenChange,
  direction,
  swipeDirection,
  showSwipeHandle,
  snapPoints,
  modal,
  disablePointerDismissal,
  children,
}: DrawerProps) {
  const base = useDrawerBase()

  if (base === "aria") {
    return (
      <AriaDrawer.Drawer
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        direction={direction}
        swipeDirection={swipeDirection}
        showSwipeHandle={showSwipeHandle}
        snapPoints={snapPoints}
        modal={modal}
        disablePointerDismissal={disablePointerDismissal}
      >
        {children}
      </AriaDrawer.Drawer>
    )
  }

  if (base === "radix") {
    return (
      <RadixDrawer.Drawer
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        direction={direction}
        swipeDirection={swipeDirection}
        snapPoints={snapPoints}
        modal={modal === "trap-focus" ? true : modal}
        showSwipeHandle={showSwipeHandle}
        disablePointerDismissal={disablePointerDismissal}
      >
        {children}
      </RadixDrawer.Drawer>
    )
  }

  return (
    <BaseDrawer.Drawer
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      direction={direction}
      swipeDirection={swipeDirection}
      showSwipeHandle={showSwipeHandle}
      snapPoints={snapPoints}
      modal={modal}
      disablePointerDismissal={disablePointerDismissal}
    >
      {children}
    </BaseDrawer.Drawer>
  )
}

function DrawerTrigger(props: DrawerTriggerProps) {
  const base = useDrawerBase()
  if (base === "radix") return <RadixDrawer.DrawerTrigger {...props} />
  if (base === "aria") return <AriaDrawer.DrawerTrigger {...props} />
  return <BaseDrawer.DrawerTrigger {...props} />
}

function DrawerClose(props: DrawerCloseProps) {
  const base = useDrawerBase()
  if (base === "radix") return <RadixDrawer.DrawerClose {...props} />
  if (base === "aria") return <AriaDrawer.DrawerClose {...props} />
  return <BaseDrawer.DrawerClose {...props} />
}

function DrawerContent(props: DrawerContentProps) {
  const base = useDrawerBase()
  if (base === "aria") return <AriaDrawer.DrawerContent {...props} />
  if (base === "radix") return <RadixDrawer.DrawerContent {...props} />
  return <BaseDrawer.DrawerContent {...props} />
}

function DrawerHeader(props: SlotProps) {
  const base = useDrawerBase()
  if (base === "aria") return <AriaDrawer.DrawerHeader {...props} />
  if (base === "radix") return <RadixDrawer.DrawerHeader {...props} />
  return <BaseDrawer.DrawerHeader {...props} />
}

function DrawerFooter(props: SlotProps) {
  const base = useDrawerBase()
  if (base === "aria") return <AriaDrawer.DrawerFooter {...props} />
  if (base === "radix") return <RadixDrawer.DrawerFooter {...props} />
  return <BaseDrawer.DrawerFooter {...props} />
}

function DrawerTitle(props: SlotProps) {
  const base = useDrawerBase()
  if (base === "aria") return <AriaDrawer.DrawerTitle {...props} />
  if (base === "radix") return <RadixDrawer.DrawerTitle {...props} />
  return <BaseDrawer.DrawerTitle {...props} />
}

function DrawerDescription(props: SlotProps) {
  const base = useDrawerBase()
  if (base === "aria") return <AriaDrawer.DrawerDescription {...props} />
  if (base === "radix") return <RadixDrawer.DrawerDescription {...props} />
  return <BaseDrawer.DrawerDescription {...props} />
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
}
