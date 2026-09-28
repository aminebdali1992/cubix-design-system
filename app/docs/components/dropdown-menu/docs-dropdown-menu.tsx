"use client"

import {
  cloneElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"

import * as AriaDropdownMenu from "@/components/cubix/aria/dropdown-menu"
import * as BaseDropdownMenu from "@/components/cubix/base/dropdown-menu"
import * as RadixDropdownMenu from "@/components/cubix/radix/dropdown-menu"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type SlotProps = {
  className?: string
  children?: ReactNode
}

type DropdownMenuProps = {
  dir?: "ltr" | "rtl"
  lang?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
}

type DropdownMenuTriggerProps = SlotProps & {
  render?: ReactElement<{ children?: ReactNode }>
}

type DropdownMenuContentProps = SlotProps & {
  align?: "start" | "center" | "end"
  alignOffset?: number
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  dir?: "ltr" | "rtl"
  lang?: string
}

type DropdownMenuItemProps = SlotProps & {
  inset?: boolean
  variant?: "default" | "destructive"
  disabled?: boolean
}

type DropdownMenuCheckboxItemProps = SlotProps & {
  checked?: boolean
  defaultChecked?: boolean
  indicator?: "check" | "control"
  inset?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

type DropdownMenuRadioGroupProps = {
  className?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  indicator?: "check" | "control"
  children?: ReactNode
}

type DropdownMenuRadioItemProps = SlotProps & {
  value: string
  indicator?: "check" | "control"
  inset?: boolean
  disabled?: boolean
}

type DropdownMenuLabelProps = SlotProps & {
  inset?: boolean
}

type DropdownMenuSubTriggerProps = SlotProps & {
  inset?: boolean
  disabled?: boolean
}

type AriaTriggerProps = ComponentProps<
  typeof AriaDropdownMenu.DropdownMenuTrigger
>

function useDropdownMenuBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function DropdownMenu(props: DropdownMenuProps) {
  const base = useDropdownMenuBase()
  if (base === "radix") return <RadixDropdownMenu.DropdownMenu {...props} />
  if (base === "aria") return <AriaDropdownMenu.DropdownMenu {...props} />
  return <BaseDropdownMenu.DropdownMenu {...props} />
}

function DropdownMenuTrigger({
  render,
  children,
  ...props
}: DropdownMenuTriggerProps) {
  const base = useDropdownMenuBase()
  if (base === "radix") {
    if (render) {
      return (
        <RadixDropdownMenu.DropdownMenuTrigger asChild {...props}>
          {cloneElement(render, undefined, children)}
        </RadixDropdownMenu.DropdownMenuTrigger>
      )
    }
    return (
      <RadixDropdownMenu.DropdownMenuTrigger {...props}>
        {children}
      </RadixDropdownMenu.DropdownMenuTrigger>
    )
  }
  if (base === "aria") {
    return (
      <AriaDropdownMenu.DropdownMenuTrigger
        render={render as AriaTriggerProps["render"]}
        {...props}
      >
        {children}
      </AriaDropdownMenu.DropdownMenuTrigger>
    )
  }
  return (
    <BaseDropdownMenu.DropdownMenuTrigger render={render} {...props}>
      {children}
    </BaseDropdownMenu.DropdownMenuTrigger>
  )
}

function DropdownMenuContent(props: DropdownMenuContentProps) {
  const base = useDropdownMenuBase()
  if (base === "radix") return <RadixDropdownMenu.DropdownMenuContent {...props} />
  if (base === "aria") return <AriaDropdownMenu.DropdownMenuContent {...props} />
  return <BaseDropdownMenu.DropdownMenuContent {...props} />
}

function DropdownMenuGroup(props: SlotProps) {
  const base = useDropdownMenuBase()
  if (base === "radix") return <RadixDropdownMenu.DropdownMenuGroup {...props} />
  if (base === "aria") return <AriaDropdownMenu.DropdownMenuGroup {...props} />
  return <BaseDropdownMenu.DropdownMenuGroup {...props} />
}

function DropdownMenuLabel(props: DropdownMenuLabelProps) {
  const base = useDropdownMenuBase()
  if (base === "radix") return <RadixDropdownMenu.DropdownMenuLabel {...props} />
  if (base === "aria") return <AriaDropdownMenu.DropdownMenuLabel {...props} />
  return <BaseDropdownMenu.DropdownMenuLabel {...props} />
}

function DropdownMenuItem(props: DropdownMenuItemProps) {
  const base = useDropdownMenuBase()
  if (base === "radix") return <RadixDropdownMenu.DropdownMenuItem {...props} />
  if (base === "aria") return <AriaDropdownMenu.DropdownMenuItem {...props} />
  return <BaseDropdownMenu.DropdownMenuItem {...props} />
}

function DropdownMenuSeparator(props: { className?: string }) {
  const base = useDropdownMenuBase()
  if (base === "radix") return <RadixDropdownMenu.DropdownMenuSeparator {...props} />
  if (base === "aria") return <AriaDropdownMenu.DropdownMenuSeparator {...props} />
  return <BaseDropdownMenu.DropdownMenuSeparator {...props} />
}

function DropdownMenuShortcut(props: SlotProps) {
  const base = useDropdownMenuBase()
  if (base === "radix") return <RadixDropdownMenu.DropdownMenuShortcut {...props} />
  if (base === "aria") return <AriaDropdownMenu.DropdownMenuShortcut {...props} />
  return <BaseDropdownMenu.DropdownMenuShortcut {...props} />
}

function DropdownMenuPortal({ children }: { children?: ReactNode }) {
  const base = useDropdownMenuBase()
  if (base === "radix") {
    return <RadixDropdownMenu.DropdownMenuPortal>{children}</RadixDropdownMenu.DropdownMenuPortal>
  }
  if (base === "aria") {
    return <AriaDropdownMenu.DropdownMenuPortal>{children}</AriaDropdownMenu.DropdownMenuPortal>
  }
  return <BaseDropdownMenu.DropdownMenuPortal>{children}</BaseDropdownMenu.DropdownMenuPortal>
}

function DropdownMenuCheckboxItem(props: DropdownMenuCheckboxItemProps) {
  const base = useDropdownMenuBase()
  if (base === "radix") return <RadixDropdownMenu.DropdownMenuCheckboxItem {...props} />
  if (base === "aria") return <AriaDropdownMenu.DropdownMenuCheckboxItem {...props} />
  return <BaseDropdownMenu.DropdownMenuCheckboxItem {...props} />
}

function DropdownMenuRadioGroup(props: DropdownMenuRadioGroupProps) {
  const base = useDropdownMenuBase()
  if (base === "radix") return <RadixDropdownMenu.DropdownMenuRadioGroup {...props} />
  if (base === "aria") return <AriaDropdownMenu.DropdownMenuRadioGroup {...props} />
  return <BaseDropdownMenu.DropdownMenuRadioGroup {...props} />
}

function DropdownMenuRadioItem(props: DropdownMenuRadioItemProps) {
  const base = useDropdownMenuBase()
  if (base === "radix") return <RadixDropdownMenu.DropdownMenuRadioItem {...props} />
  if (base === "aria") return <AriaDropdownMenu.DropdownMenuRadioItem {...props} />
  return <BaseDropdownMenu.DropdownMenuRadioItem {...props} />
}

function DropdownMenuSub({ children }: { children: ReactNode }) {
  const base = useDropdownMenuBase()
  if (base === "radix") {
    return <RadixDropdownMenu.DropdownMenuSub>{children}</RadixDropdownMenu.DropdownMenuSub>
  }
  if (base === "aria") {
    return <AriaDropdownMenu.DropdownMenuSub>{children}</AriaDropdownMenu.DropdownMenuSub>
  }
  return <BaseDropdownMenu.DropdownMenuSub>{children}</BaseDropdownMenu.DropdownMenuSub>
}

function DropdownMenuSubTrigger(props: DropdownMenuSubTriggerProps) {
  const base = useDropdownMenuBase()
  if (base === "radix") return <RadixDropdownMenu.DropdownMenuSubTrigger {...props} />
  if (base === "aria") return <AriaDropdownMenu.DropdownMenuSubTrigger {...props} />
  return <BaseDropdownMenu.DropdownMenuSubTrigger {...props} />
}

function DropdownMenuSubContent(props: SlotProps) {
  const base = useDropdownMenuBase()
  if (base === "radix") return <RadixDropdownMenu.DropdownMenuSubContent {...props} />
  if (base === "aria") return <AriaDropdownMenu.DropdownMenuSubContent {...props} />
  return <BaseDropdownMenu.DropdownMenuSubContent {...props} />
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
