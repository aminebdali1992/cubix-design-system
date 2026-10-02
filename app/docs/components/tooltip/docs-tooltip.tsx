"use client"

import { cloneElement, type ComponentProps, type ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaTooltip from "@/components/cubix/aria/tooltip"
import * as BaseTooltip from "@/components/cubix/base/tooltip"
import * as RadixTooltip from "@/components/cubix/radix/tooltip"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type TooltipProviderProps = {
  delay?: number
  children: ReactNode
}
type TooltipProps = {
  dir?: "ltr" | "rtl"
  delay?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
}
type TooltipTriggerProps = {
  className?: string
  render?: ComponentProps<typeof AriaTooltip.TooltipTrigger>["render"]
  children?: ReactNode
}
type TooltipContentProps = {
  className?: string
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  children?: ReactNode
}

function useTooltipBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function TooltipProvider(props: TooltipProviderProps) {
  const base = useTooltipBase()
  if (base === "radix") return <RadixTooltip.TooltipProvider {...props} />
  if (base === "aria") return <AriaTooltip.TooltipProvider {...props} />
  return <BaseTooltip.TooltipProvider {...props} />
}

function Tooltip(props: TooltipProps) {
  const base = useTooltipBase()
  if (base === "radix") return <RadixTooltip.Tooltip {...props} />
  if (base === "aria") return <AriaTooltip.Tooltip {...props} />
  return <BaseTooltip.Tooltip {...props} />
}

function TooltipTrigger({ render, children, ...props }: TooltipTriggerProps) {
  const base = useTooltipBase()
  if (base === "radix") {
    if (render) {
      return (
        <RadixTooltip.TooltipTrigger asChild {...props}>
          {cloneElement(render, undefined, children)}
        </RadixTooltip.TooltipTrigger>
      )
    }
    return <RadixTooltip.TooltipTrigger {...props}>{children}</RadixTooltip.TooltipTrigger>
  }
  if (base === "aria") {
    return (
      <AriaTooltip.TooltipTrigger render={render} {...props}>
        {children}
      </AriaTooltip.TooltipTrigger>
    )
  }
  return (
    <BaseTooltip.TooltipTrigger render={render} {...props}>
      {children}
    </BaseTooltip.TooltipTrigger>
  )
}

function TooltipContent(props: TooltipContentProps) {
  const base = useTooltipBase()
  if (base === "radix") return <RadixTooltip.TooltipContent {...props} />
  if (base === "aria") return <AriaTooltip.TooltipContent {...props} />
  return <BaseTooltip.TooltipContent {...props} />
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
