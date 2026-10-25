"use client"

/*
  Alert Dialog docs switcher. Mirrors docs-dialog: demo code stays identical
  while the active base (base / radix / aria) resolves from the URL.
*/
import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaAlertDialog from "@/components/cubix/aria/alert-dialog"
import * as BaseAlertDialog from "@/components/cubix/base/alert-dialog"
import * as RadixAlertDialog from "@/components/cubix/radix/alert-dialog"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type AlertDialogProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
}

type AlertDialogTriggerProps = {
  render?: ComponentProps<typeof AriaAlertDialog.AlertDialogTrigger>["render"]
  className?: string
  children?: ReactNode
}

type AlertDialogContentProps = {
  className?: string
  size?: "default" | "sm"
  dir?: "ltr" | "rtl"
  lang?: string
  children?: ReactNode
}

type AlertDialogActionProps = {
  className?: string
  variant?:
    | "default"
    | "secondary"
    | "gray"
    | "destructive"
    | "destructive-secondary"
    | "outline"
    | "ghost"
    | "link"
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"
  children?: ReactNode
}

type SlotProps = {
  className?: string
  children?: ReactNode
}

function useAlertDialogBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function AlertDialog({ open, defaultOpen, onOpenChange, children }: AlertDialogProps) {
  const base = useAlertDialogBase()

  if (base === "aria") {
    return (
      <AriaAlertDialog.AlertDialog
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        {children}
      </AriaAlertDialog.AlertDialog>
    )
  }

  if (base === "radix") {
    return (
      <RadixAlertDialog.AlertDialog
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        {children}
      </RadixAlertDialog.AlertDialog>
    )
  }

  return (
    <BaseAlertDialog.AlertDialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </BaseAlertDialog.AlertDialog>
  )
}

function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  const base = useAlertDialogBase()
  if (base === "radix") return <RadixAlertDialog.AlertDialogTrigger {...props} />
  if (base === "aria") return <AriaAlertDialog.AlertDialogTrigger {...props} />
  return <BaseAlertDialog.AlertDialogTrigger {...props} />
}

function AlertDialogContent(props: AlertDialogContentProps) {
  const base = useAlertDialogBase()

  if (base === "aria") {
    return <AriaAlertDialog.AlertDialogContent {...props} />
  }

  if (base === "radix") {
    return <RadixAlertDialog.AlertDialogContent {...props} />
  }

  return <BaseAlertDialog.AlertDialogContent {...props} />
}

function AlertDialogHeader(props: SlotProps) {
  const base = useAlertDialogBase()

  if (base === "aria") {
    return <AriaAlertDialog.AlertDialogHeader {...props} />
  }

  if (base === "radix") {
    return <RadixAlertDialog.AlertDialogHeader {...props} />
  }

  return <BaseAlertDialog.AlertDialogHeader {...props} />
}

function AlertDialogFooter(props: SlotProps) {
  const base = useAlertDialogBase()

  if (base === "aria") {
    return <AriaAlertDialog.AlertDialogFooter {...props} />
  }

  if (base === "radix") {
    return <RadixAlertDialog.AlertDialogFooter {...props} />
  }

  return <BaseAlertDialog.AlertDialogFooter {...props} />
}

function AlertDialogMedia(props: SlotProps) {
  const base = useAlertDialogBase()

  if (base === "aria") {
    return <AriaAlertDialog.AlertDialogMedia {...props} />
  }

  if (base === "radix") {
    return <RadixAlertDialog.AlertDialogMedia {...props} />
  }

  return <BaseAlertDialog.AlertDialogMedia {...props} />
}

function AlertDialogTitle(props: SlotProps) {
  const base = useAlertDialogBase()

  if (base === "aria") {
    return <AriaAlertDialog.AlertDialogTitle {...props} />
  }

  if (base === "radix") {
    return <RadixAlertDialog.AlertDialogTitle {...props} />
  }

  return <BaseAlertDialog.AlertDialogTitle {...props} />
}

function AlertDialogDescription(props: SlotProps) {
  const base = useAlertDialogBase()

  if (base === "aria") {
    return <AriaAlertDialog.AlertDialogDescription {...props} />
  }

  if (base === "radix") {
    return <RadixAlertDialog.AlertDialogDescription {...props} />
  }

  return <BaseAlertDialog.AlertDialogDescription {...props} />
}

function AlertDialogAction(props: AlertDialogActionProps) {
  const base = useAlertDialogBase()

  if (base === "aria") {
    return <AriaAlertDialog.AlertDialogAction {...props} />
  }

  if (base === "radix") {
    return <RadixAlertDialog.AlertDialogAction {...props} />
  }

  return <BaseAlertDialog.AlertDialogAction {...props} />
}

function AlertDialogCancel(props: AlertDialogActionProps) {
  const base = useAlertDialogBase()

  if (base === "aria") {
    return <AriaAlertDialog.AlertDialogCancel {...props} />
  }

  if (base === "radix") {
    return <RadixAlertDialog.AlertDialogCancel {...props} />
  }

  return <BaseAlertDialog.AlertDialogCancel {...props} />
}

export {
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
}
