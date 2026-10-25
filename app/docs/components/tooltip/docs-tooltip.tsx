"use client"

import type { ComponentProps, ReactNode } from "react"
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
  /** Visible gap from the arrow tip to the trigger, same in every base */
  gap?: number
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

function TooltipTrigger(props: TooltipTriggerProps) {
  const base = useTooltipBase()
  if (base === "radix") return <RadixTooltip.TooltipTrigger {...props} />
  if (base === "aria") return <AriaTooltip.TooltipTrigger {...props} />
  return <BaseTooltip.TooltipTrigger {...props} />
}

function TooltipContent({ gap, ...rest }: TooltipContentProps) {
  const base = useTooltipBase()
  // Radix already adds the arrow height to sideOffset; Base and Aria do not (arrow is ~5px)
  const props = gap === undefined ? rest : { ...rest, sideOffset: base === "radix" ? gap : gap + 5 }
  if (base === "radix") return <RadixTooltip.TooltipContent {...props} />
  if (base === "aria") return <AriaTooltip.TooltipContent {...props} />
  return <BaseTooltip.TooltipContent {...props} />
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
