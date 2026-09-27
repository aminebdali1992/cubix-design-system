"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaMenubar from "@/components/cubix/aria/menubar"
import * as BaseMenubar from "@/components/cubix/base/menubar"
import * as RadixMenubar from "@/components/cubix/radix/menubar"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type SlotProps = {
  className?: string
  children?: ReactNode
}

type MenubarProps = SlotProps & {
  dir?: "ltr" | "rtl"
  lang?: string
}

type MenubarContentProps = SlotProps & {
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
  alignOffset?: number
  dir?: "ltr" | "rtl"
  lang?: string
}

type MenubarItemProps = SlotProps & {
  inset?: boolean
  variant?: "default" | "destructive"
  disabled?: boolean
}

type MenubarCheckboxItemProps = SlotProps & {
  checked?: boolean
  defaultChecked?: boolean
  indicator?: "check" | "control"
  inset?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

type MenubarRadioGroupProps = {
  className?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  indicator?: "check" | "control"
  children?: ReactNode
}

type MenubarRadioItemProps = SlotProps & {
  value: string
  indicator?: "check" | "control"
  inset?: boolean
  disabled?: boolean
}

type MenubarLabelProps = SlotProps & {
  inset?: boolean
}

type MenubarSubTriggerProps = SlotProps & {
  inset?: boolean
}

function useMenubarBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Menubar(props: MenubarProps) {
  const base = useMenubarBase()
  if (base === "radix") return <RadixMenubar.Menubar {...props} />
  if (base === "aria") return <AriaMenubar.Menubar {...props} />
  return <BaseMenubar.Menubar {...props} />
}

function MenubarMenu({ children }: { children: ReactNode }) {
  const base = useMenubarBase()
  if (base === "radix") return <RadixMenubar.MenubarMenu>{children}</RadixMenubar.MenubarMenu>
  if (base === "aria") return <AriaMenubar.MenubarMenu>{children}</AriaMenubar.MenubarMenu>
  return <BaseMenubar.MenubarMenu>{children}</BaseMenubar.MenubarMenu>
}

function MenubarTrigger(props: SlotProps) {
  const base = useMenubarBase()
  if (base === "radix") return <RadixMenubar.MenubarTrigger {...props} />
  if (base === "aria") return <AriaMenubar.MenubarTrigger {...props} />
  return <BaseMenubar.MenubarTrigger {...props} />
}

function MenubarContent(props: MenubarContentProps) {
  const base = useMenubarBase()
  if (base === "radix") return <RadixMenubar.MenubarContent {...props} />
  if (base === "aria") return <AriaMenubar.MenubarContent {...props} />
  return <BaseMenubar.MenubarContent {...props} />
}

function MenubarItem(props: MenubarItemProps) {
  const base = useMenubarBase()
  if (base === "radix") return <RadixMenubar.MenubarItem {...props} />
  if (base === "aria") return <AriaMenubar.MenubarItem {...props} />
  return <BaseMenubar.MenubarItem {...props} />
}

function MenubarSeparator(props: { className?: string }) {
  const base = useMenubarBase()
  if (base === "radix") return <RadixMenubar.MenubarSeparator {...props} />
  if (base === "aria") return <AriaMenubar.MenubarSeparator {...props} />
  return <BaseMenubar.MenubarSeparator {...props} />
}

function MenubarLabel(props: MenubarLabelProps) {
  const base = useMenubarBase()
  if (base === "radix") return <RadixMenubar.MenubarLabel {...props} />
  if (base === "aria") return <AriaMenubar.MenubarLabel {...props} />
  return <BaseMenubar.MenubarLabel {...props} />
}

function MenubarShortcut(props: SlotProps) {
  const base = useMenubarBase()
  if (base === "radix") return <RadixMenubar.MenubarShortcut {...props} />
  if (base === "aria") return <AriaMenubar.MenubarShortcut {...props} />
  return <BaseMenubar.MenubarShortcut {...props} />
}

function MenubarGroup(props: SlotProps) {
  const base = useMenubarBase()
  if (base === "radix") return <RadixMenubar.MenubarGroup {...props} />
  if (base === "aria") return <AriaMenubar.MenubarGroup {...props} />
  return <BaseMenubar.MenubarGroup {...props} />
}

function MenubarPortal({ children }: { children?: ReactNode }) {
  const base = useMenubarBase()
  if (base === "radix") {
    return <RadixMenubar.MenubarPortal>{children}</RadixMenubar.MenubarPortal>
  }
  if (base === "aria") {
    return <AriaMenubar.MenubarPortal>{children}</AriaMenubar.MenubarPortal>
  }
  return <BaseMenubar.MenubarPortal>{children}</BaseMenubar.MenubarPortal>
}

function MenubarCheckboxItem(props: MenubarCheckboxItemProps) {
  const base = useMenubarBase()
  if (base === "radix") return <RadixMenubar.MenubarCheckboxItem {...props} />
  if (base === "aria") return <AriaMenubar.MenubarCheckboxItem {...props} />
  return <BaseMenubar.MenubarCheckboxItem {...props} />
}

function MenubarRadioGroup(props: MenubarRadioGroupProps) {
  const base = useMenubarBase()
  if (base === "radix") return <RadixMenubar.MenubarRadioGroup {...props} />
  if (base === "aria") return <AriaMenubar.MenubarRadioGroup {...props} />
  return <BaseMenubar.MenubarRadioGroup {...props} />
}

function MenubarRadioItem(props: MenubarRadioItemProps) {
  const base = useMenubarBase()
  if (base === "radix") return <RadixMenubar.MenubarRadioItem {...props} />
  if (base === "aria") return <AriaMenubar.MenubarRadioItem {...props} />
  return <BaseMenubar.MenubarRadioItem {...props} />
}

function MenubarSub({ children }: { children: ReactNode }) {
  const base = useMenubarBase()
  if (base === "radix") {
    return <RadixMenubar.MenubarSub>{children}</RadixMenubar.MenubarSub>
  }
  if (base === "aria") {
    return <AriaMenubar.MenubarSub>{children}</AriaMenubar.MenubarSub>
  }
  return <BaseMenubar.MenubarSub>{children}</BaseMenubar.MenubarSub>
}

function MenubarSubTrigger(props: MenubarSubTriggerProps) {
  const base = useMenubarBase()
  if (base === "radix") return <RadixMenubar.MenubarSubTrigger {...props} />
  if (base === "aria") return <AriaMenubar.MenubarSubTrigger {...props} />
  return <BaseMenubar.MenubarSubTrigger {...props} />
}

function MenubarSubContent(props: SlotProps) {
  const base = useMenubarBase()
  if (base === "radix") return <RadixMenubar.MenubarSubContent {...props} />
  if (base === "aria") return <AriaMenubar.MenubarSubContent {...props} />
  return <BaseMenubar.MenubarSubContent {...props} />
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
