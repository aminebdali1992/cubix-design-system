"use client"

/*
  Dialog docs switcher. Mirrors docs-popover: demo code stays identical while
  the active base (base / radix / aria) resolves from the URL. All three bases
  share the same props, including render.
*/
import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaDialog from "@/components/cubix/aria/dialog"
import * as BaseDialog from "@/components/cubix/base/dialog"
import * as RadixDialog from "@/components/cubix/radix/dialog"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type DialogProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
}

type DialogTriggerProps = {
  render?: ComponentProps<typeof AriaDialog.DialogTrigger>["render"]
  className?: string
  children?: ReactNode
}

type DialogCloseProps = {
  render?: ComponentProps<typeof AriaDialog.DialogClose>["render"]
  className?: string
  children?: ReactNode
}

type DialogContentProps = {
  className?: string
  showCloseButton?: boolean
  dir?: "ltr" | "rtl"
  lang?: string
  children?: ReactNode
}

type DialogFooterProps = {
  className?: string
  showCloseButton?: boolean
  children?: ReactNode
}

type SlotProps = {
  className?: string
  children?: ReactNode
}

function useDialogBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Dialog({ open, defaultOpen, onOpenChange, children }: DialogProps) {
  const base = useDialogBase()

  if (base === "aria") {
    return (
      <AriaDialog.Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {children}
      </AriaDialog.Dialog>
    )
  }

  if (base === "radix") {
    return (
      <RadixDialog.Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {children}
      </RadixDialog.Dialog>
    )
  }

  return (
    <BaseDialog.Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </BaseDialog.Dialog>
  )
}

function DialogTrigger(props: DialogTriggerProps) {
  const base = useDialogBase()
  if (base === "radix") return <RadixDialog.DialogTrigger {...props} />
  if (base === "aria") return <AriaDialog.DialogTrigger {...props} />
  return <BaseDialog.DialogTrigger {...props} />
}

function DialogClose(props: DialogCloseProps) {
  const base = useDialogBase()
  if (base === "radix") return <RadixDialog.DialogClose {...props} />
  if (base === "aria") return <AriaDialog.DialogClose {...props} />
  return <BaseDialog.DialogClose {...props} />
}

function DialogContent(props: DialogContentProps) {
  const base = useDialogBase()

  if (base === "aria") {
    return <AriaDialog.DialogContent {...props} />
  }

  if (base === "radix") {
    return <RadixDialog.DialogContent {...props} />
  }

  return <BaseDialog.DialogContent {...props} />
}

function DialogHeader(props: SlotProps) {
  const base = useDialogBase()

  if (base === "aria") {
    return <AriaDialog.DialogHeader {...props} />
  }

  if (base === "radix") {
    return <RadixDialog.DialogHeader {...props} />
  }

  return <BaseDialog.DialogHeader {...props} />
}

function DialogFooter(props: DialogFooterProps) {
  const base = useDialogBase()

  if (base === "aria") {
    return <AriaDialog.DialogFooter {...props} />
  }

  if (base === "radix") {
    return <RadixDialog.DialogFooter {...props} />
  }

  return <BaseDialog.DialogFooter {...props} />
}

function DialogTitle(props: SlotProps) {
  const base = useDialogBase()

  if (base === "aria") {
    return <AriaDialog.DialogTitle {...props} />
  }

  if (base === "radix") {
    return <RadixDialog.DialogTitle {...props} />
  }

  return <BaseDialog.DialogTitle {...props} />
}

function DialogDescription(props: SlotProps) {
  const base = useDialogBase()

  if (base === "aria") {
    return <AriaDialog.DialogDescription {...props} />
  }

  if (base === "radix") {
    return <RadixDialog.DialogDescription {...props} />
  }

  return <BaseDialog.DialogDescription {...props} />
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
}
