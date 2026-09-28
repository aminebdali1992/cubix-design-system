"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaContextMenu from "@/components/cubix/aria/context-menu"
import * as BaseContextMenu from "@/components/cubix/base/context-menu"
import * as RadixContextMenu from "@/components/cubix/radix/context-menu"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type SlotProps = {
  className?: string
  children?: ReactNode
}

type ContextMenuProps = {
  dir?: "ltr" | "rtl"
  lang?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
}

type ContextMenuContentProps = SlotProps & {
  dir?: "ltr" | "rtl"
  lang?: string
}

type ContextMenuItemProps = SlotProps & {
  inset?: boolean
  variant?: "default" | "destructive"
  disabled?: boolean
}

type ContextMenuCheckboxItemProps = SlotProps & {
  checked?: boolean
  defaultChecked?: boolean
  indicator?: "check" | "control"
  inset?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

type ContextMenuRadioGroupProps = {
  className?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  indicator?: "check" | "control"
  children?: ReactNode
}

type ContextMenuRadioItemProps = SlotProps & {
  value: string
  indicator?: "check" | "control"
  inset?: boolean
  disabled?: boolean
}

type ContextMenuLabelProps = SlotProps & {
  inset?: boolean
}

type ContextMenuSubTriggerProps = SlotProps & {
  inset?: boolean
}

function useContextMenuBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function ContextMenu(props: ContextMenuProps) {
  const base = useContextMenuBase()
  if (base === "radix") return <RadixContextMenu.ContextMenu {...props} />
  if (base === "aria") return <AriaContextMenu.ContextMenu {...props} />
  return <BaseContextMenu.ContextMenu {...props} />
}

function ContextMenuTrigger(props: SlotProps) {
  const base = useContextMenuBase()
  if (base === "radix") return <RadixContextMenu.ContextMenuTrigger {...props} />
  if (base === "aria") return <AriaContextMenu.ContextMenuTrigger {...props} />
  return <BaseContextMenu.ContextMenuTrigger {...props} />
}

function ContextMenuContent(props: ContextMenuContentProps) {
  const base = useContextMenuBase()
  if (base === "radix") return <RadixContextMenu.ContextMenuContent {...props} />
  if (base === "aria") return <AriaContextMenu.ContextMenuContent {...props} />
  return <BaseContextMenu.ContextMenuContent {...props} />
}

function ContextMenuItem(props: ContextMenuItemProps) {
  const base = useContextMenuBase()
  if (base === "radix") return <RadixContextMenu.ContextMenuItem {...props} />
  if (base === "aria") return <AriaContextMenu.ContextMenuItem {...props} />
  return <BaseContextMenu.ContextMenuItem {...props} />
}

function ContextMenuSeparator(props: { className?: string }) {
  const base = useContextMenuBase()
  if (base === "radix") return <RadixContextMenu.ContextMenuSeparator {...props} />
  if (base === "aria") return <AriaContextMenu.ContextMenuSeparator {...props} />
  return <BaseContextMenu.ContextMenuSeparator {...props} />
}

function ContextMenuLabel(props: ContextMenuLabelProps) {
  const base = useContextMenuBase()
  if (base === "radix") return <RadixContextMenu.ContextMenuLabel {...props} />
  if (base === "aria") return <AriaContextMenu.ContextMenuLabel {...props} />
  return <BaseContextMenu.ContextMenuLabel {...props} />
}

function ContextMenuShortcut(props: SlotProps) {
  const base = useContextMenuBase()
  if (base === "radix") return <RadixContextMenu.ContextMenuShortcut {...props} />
  if (base === "aria") return <AriaContextMenu.ContextMenuShortcut {...props} />
  return <BaseContextMenu.ContextMenuShortcut {...props} />
}

function ContextMenuGroup(props: SlotProps) {
  const base = useContextMenuBase()
  if (base === "radix") return <RadixContextMenu.ContextMenuGroup {...props} />
  if (base === "aria") return <AriaContextMenu.ContextMenuGroup {...props} />
  return <BaseContextMenu.ContextMenuGroup {...props} />
}

function ContextMenuPortal({ children }: { children?: ReactNode }) {
  const base = useContextMenuBase()
  if (base === "radix") {
    return <RadixContextMenu.ContextMenuPortal>{children}</RadixContextMenu.ContextMenuPortal>
  }
  if (base === "aria") {
    return <AriaContextMenu.ContextMenuPortal>{children}</AriaContextMenu.ContextMenuPortal>
  }
  return <BaseContextMenu.ContextMenuPortal>{children}</BaseContextMenu.ContextMenuPortal>
}

function ContextMenuCheckboxItem(props: ContextMenuCheckboxItemProps) {
  const base = useContextMenuBase()
  if (base === "radix") return <RadixContextMenu.ContextMenuCheckboxItem {...props} />
  if (base === "aria") return <AriaContextMenu.ContextMenuCheckboxItem {...props} />
  return <BaseContextMenu.ContextMenuCheckboxItem {...props} />
}

function ContextMenuRadioGroup(props: ContextMenuRadioGroupProps) {
  const base = useContextMenuBase()
  if (base === "radix") return <RadixContextMenu.ContextMenuRadioGroup {...props} />
  if (base === "aria") return <AriaContextMenu.ContextMenuRadioGroup {...props} />
  return <BaseContextMenu.ContextMenuRadioGroup {...props} />
}

function ContextMenuRadioItem(props: ContextMenuRadioItemProps) {
  const base = useContextMenuBase()
  if (base === "radix") return <RadixContextMenu.ContextMenuRadioItem {...props} />
  if (base === "aria") return <AriaContextMenu.ContextMenuRadioItem {...props} />
  return <BaseContextMenu.ContextMenuRadioItem {...props} />
}

function ContextMenuSub({ children }: { children: ReactNode }) {
  const base = useContextMenuBase()
  if (base === "radix") {
    return <RadixContextMenu.ContextMenuSub>{children}</RadixContextMenu.ContextMenuSub>
  }
  if (base === "aria") {
    return <AriaContextMenu.ContextMenuSub>{children}</AriaContextMenu.ContextMenuSub>
  }
  return <BaseContextMenu.ContextMenuSub>{children}</BaseContextMenu.ContextMenuSub>
}

function ContextMenuSubTrigger(props: ContextMenuSubTriggerProps) {
  const base = useContextMenuBase()
  if (base === "radix") return <RadixContextMenu.ContextMenuSubTrigger {...props} />
  if (base === "aria") return <AriaContextMenu.ContextMenuSubTrigger {...props} />
  return <BaseContextMenu.ContextMenuSubTrigger {...props} />
}

function ContextMenuSubContent(props: SlotProps) {
  const base = useContextMenuBase()
  if (base === "radix") return <RadixContextMenu.ContextMenuSubContent {...props} />
  if (base === "aria") return <AriaContextMenu.ContextMenuSubContent {...props} />
  return <BaseContextMenu.ContextMenuSubContent {...props} />
}

export {
  ContextMenu,
  ContextMenuPortal,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
}
