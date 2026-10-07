"use client"

/*
  Sheet docs switcher. Mirrors docs-dialog: demo code stays identical while
  the active base (base / radix / aria) resolves from the URL. All three bases
  share the same props, including render.
*/
import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaSheet from "@/components/cubix/aria/sheet"
import * as BaseSheet from "@/components/cubix/base/sheet"
import * as RadixSheet from "@/components/cubix/radix/sheet"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type SheetProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
}

type SheetTriggerProps = {
  render?: ComponentProps<typeof AriaSheet.SheetTrigger>["render"]
  className?: string
  children?: ReactNode
}

type SheetCloseProps = {
  render?: ComponentProps<typeof AriaSheet.SheetClose>["render"]
  className?: string
  children?: ReactNode
}

type SheetContentProps = {
  className?: string
  showCloseButton?: boolean
  side?: "top" | "right" | "bottom" | "left"
  dir?: "ltr" | "rtl"
  lang?: string
  children?: ReactNode
}

type SlotProps = {
  className?: string
  children?: ReactNode
}

function useSheetBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Sheet({ open, defaultOpen, onOpenChange, children }: SheetProps) {
  const base = useSheetBase()

  if (base === "aria") {
    return (
      <AriaSheet.Sheet open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {children}
      </AriaSheet.Sheet>
    )
  }

  if (base === "radix") {
    return (
      <RadixSheet.Sheet open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {children}
      </RadixSheet.Sheet>
    )
  }

  return (
    <BaseSheet.Sheet open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </BaseSheet.Sheet>
  )
}

function SheetTrigger(props: SheetTriggerProps) {
  const base = useSheetBase()
  if (base === "radix") return <RadixSheet.SheetTrigger {...props} />
  if (base === "aria") return <AriaSheet.SheetTrigger {...props} />
  return <BaseSheet.SheetTrigger {...props} />
}

function SheetClose(props: SheetCloseProps) {
  const base = useSheetBase()
  if (base === "radix") return <RadixSheet.SheetClose {...props} />
  if (base === "aria") return <AriaSheet.SheetClose {...props} />
  return <BaseSheet.SheetClose {...props} />
}

function SheetContent(props: SheetContentProps) {
  const base = useSheetBase()

  if (base === "aria") {
    return <AriaSheet.SheetContent {...props} />
  }

  if (base === "radix") {
    return <RadixSheet.SheetContent {...props} />
  }

  return <BaseSheet.SheetContent {...props} />
}

function SheetHeader(props: SlotProps) {
  const base = useSheetBase()

  if (base === "aria") {
    return <AriaSheet.SheetHeader {...props} />
  }

  if (base === "radix") {
    return <RadixSheet.SheetHeader {...props} />
  }

  return <BaseSheet.SheetHeader {...props} />
}

function SheetFooter(props: SlotProps) {
  const base = useSheetBase()

  if (base === "aria") {
    return <AriaSheet.SheetFooter {...props} />
  }

  if (base === "radix") {
    return <RadixSheet.SheetFooter {...props} />
  }

  return <BaseSheet.SheetFooter {...props} />
}

function SheetTitle(props: SlotProps) {
  const base = useSheetBase()

  if (base === "aria") {
    return <AriaSheet.SheetTitle {...props} />
  }

  if (base === "radix") {
    return <RadixSheet.SheetTitle {...props} />
  }

  return <BaseSheet.SheetTitle {...props} />
}

function SheetDescription(props: SlotProps) {
  const base = useSheetBase()

  if (base === "aria") {
    return <AriaSheet.SheetDescription {...props} />
  }

  if (base === "radix") {
    return <RadixSheet.SheetDescription {...props} />
  }

  return <BaseSheet.SheetDescription {...props} />
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
}
