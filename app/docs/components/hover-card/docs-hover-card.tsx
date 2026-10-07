"use client"

/*
  Hover Card docs switcher. Mirrors docs-popover: demo code stays identical
  while the active base (base / radix / aria) resolves from the URL. All
  three bases share the same props, including render and open/close delays.
*/
import type { ReactElement, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaHoverCard from "@/components/cubix/aria/hover-card"
import * as BaseHoverCard from "@/components/cubix/base/hover-card"
import * as RadixHoverCard from "@/components/cubix/radix/hover-card"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type HoverCardProps = {
  dir?: "ltr" | "rtl"
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  openDelay?: number
  closeDelay?: number
  children?: ReactNode
}

type HoverCardTriggerProps = {
  render?: ReactElement<Record<string, unknown>>
  href?: string
  className?: string
  children?: ReactNode
}

type HoverCardContentProps = {
  className?: string
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  children?: ReactNode
}

function useHoverCardBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function HoverCard({ onOpenChange, ...props }: HoverCardProps) {
  const base = useHoverCardBase()
  const handleOpenChange = onOpenChange ? (open: boolean) => onOpenChange(open) : undefined
  if (base === "aria") return <AriaHoverCard.HoverCard onOpenChange={handleOpenChange} {...props} />
  if (base === "radix") return <RadixHoverCard.HoverCard onOpenChange={handleOpenChange} {...props} />
  return <BaseHoverCard.HoverCard onOpenChange={handleOpenChange} {...props} />
}

function HoverCardTrigger(props: HoverCardTriggerProps) {
  const base = useHoverCardBase()
  if (base === "aria") return <AriaHoverCard.HoverCardTrigger {...props} />
  if (base === "radix") return <RadixHoverCard.HoverCardTrigger {...props} />
  return <BaseHoverCard.HoverCardTrigger {...props} />
}

function HoverCardContent(props: HoverCardContentProps) {
  const base = useHoverCardBase()
  if (base === "aria") return <AriaHoverCard.HoverCardContent {...props} />
  if (base === "radix") return <RadixHoverCard.HoverCardContent {...props} />
  return <BaseHoverCard.HoverCardContent {...props} />
}

export { HoverCard, HoverCardContent, HoverCardTrigger }
