"use client"

/*
  Popover docs switcher. Mirrors docs-dialog: the demo code stays
  identical while the active base (base / radix / aria) resolves from
  the URL. Trigger `render` and Content `side`/`align` are normalized
  per library (render prop / asChild / AriaButton render + placement).
*/
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaPopover from "@/components/cubix/aria/popover"
import * as BasePopover from "@/components/cubix/base/popover"
import * as RadixPopover from "@/components/cubix/radix/popover"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type Dir = "ltr" | "rtl"

type TriggerRenderProps = {
  children?: ReactNode
  variant?: string
  size?: string
  className?: string
}

type PopoverProps = {
  dir?: Dir
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
}

type PopoverTriggerProps = {
  render?: ReactElement<TriggerRenderProps>
  className?: string
  children?: ReactNode
}

type PopoverCloseProps = {
  render?: ReactElement<TriggerRenderProps>
  className?: string
  children?: ReactNode
}

type PopoverContentProps = {
  className?: string
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  children?: ReactNode
}

type SlotProps = {
  className?: string
  children?: ReactNode
}

function usePopoverBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Popover({ dir, open, defaultOpen, onOpenChange, children }: PopoverProps) {
  const base = usePopoverBase()

  if (base === "aria") {
    return (
      <AriaPopover.Popover
        dir={dir}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        {children}
      </AriaPopover.Popover>
    )
  }

  if (base === "radix") {
    return (
      <RadixPopover.Popover
        dir={dir}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        {children}
      </RadixPopover.Popover>
    )
  }

  return (
    <BasePopover.Popover
      dir={dir}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {children}
    </BasePopover.Popover>
  )
}

function PopoverTrigger({ render, className, children }: PopoverTriggerProps) {
  const base = usePopoverBase()

  if (base === "radix") {
    if (isValidElement(render)) {
      return (
        <RadixPopover.PopoverTrigger asChild className={className}>
          {cloneElement(render, undefined, children)}
        </RadixPopover.PopoverTrigger>
      )
    }

    return (
      <RadixPopover.PopoverTrigger className={className}>{children}</RadixPopover.PopoverTrigger>
    )
  }

  if (base === "aria") {
    return (
      <AriaPopover.PopoverTrigger className={className} render={render as never}>
        {children}
      </AriaPopover.PopoverTrigger>
    )
  }

  return (
    <BasePopover.PopoverTrigger render={render} className={className}>
      {children}
    </BasePopover.PopoverTrigger>
  )
}

function PopoverClose({ render, className, children }: PopoverCloseProps) {
  const base = usePopoverBase()

  if (base === "radix") {
    if (isValidElement(render)) {
      return (
        <RadixPopover.PopoverClose asChild className={className}>
          {cloneElement(render, undefined, children)}
        </RadixPopover.PopoverClose>
      )
    }

    return <RadixPopover.PopoverClose className={className}>{children}</RadixPopover.PopoverClose>
  }

  if (base === "aria") {
    return (
      <AriaPopover.PopoverClose className={className} render={render as never}>
        {children}
      </AriaPopover.PopoverClose>
    )
  }

  return (
    <BasePopover.PopoverClose render={render} className={className}>
      {children}
    </BasePopover.PopoverClose>
  )
}

function PopoverContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
}: PopoverContentProps) {
  const base = usePopoverBase()

  if (base === "aria") {
    return (
      <AriaPopover.PopoverContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className={className}
      >
        {children}
      </AriaPopover.PopoverContent>
    )
  }

  if (base === "radix") {
    return (
      <RadixPopover.PopoverContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className={className}
      >
        {children}
      </RadixPopover.PopoverContent>
    )
  }

  return (
    <BasePopover.PopoverContent
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      className={className}
    >
      {children}
    </BasePopover.PopoverContent>
  )
}

function PopoverHeader(props: SlotProps) {
  const base = usePopoverBase()

  if (base === "aria") {
    return <AriaPopover.PopoverHeader {...props} />
  }

  if (base === "radix") {
    return <RadixPopover.PopoverHeader {...props} />
  }

  return <BasePopover.PopoverHeader {...props} />
}

function PopoverTitle(props: SlotProps) {
  const base = usePopoverBase()

  if (base === "aria") {
    return <AriaPopover.PopoverTitle {...props} />
  }

  if (base === "radix") {
    return <RadixPopover.PopoverTitle {...props} />
  }

  return <BasePopover.PopoverTitle {...props} />
}

function PopoverDescription(props: SlotProps) {
  const base = usePopoverBase()

  if (base === "aria") {
    return <AriaPopover.PopoverDescription {...props} />
  }

  if (base === "radix") {
    return <RadixPopover.PopoverDescription {...props} />
  }

  return <BasePopover.PopoverDescription {...props} />
}

export {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
