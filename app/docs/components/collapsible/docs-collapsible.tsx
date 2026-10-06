"use client"

import type { ReactElement, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaCollapsible from "@/components/cubix/aria/collapsible"
import * as BaseCollapsible from "@/components/cubix/base/collapsible"
import * as RadixCollapsible from "@/components/cubix/radix/collapsible"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type CollapsibleProps = {
  className?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  children?: ReactNode
}

type CollapsibleTriggerProps = {
  className?: string
  render?: ReactElement<{
    variant?: "default" | "outline" | "ghost" | "link"
    size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"
    className?: string
    "aria-label"?: string
  }>
  children?: ReactNode
}

type CollapsibleContentProps = {
  className?: string
  children?: ReactNode
}

function useCollapsibleBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function Collapsible(props: CollapsibleProps) {
  const base = useCollapsibleBase()
  if (base === "radix") return <RadixCollapsible.Collapsible {...props} />
  if (base === "aria") return <AriaCollapsible.Collapsible {...props} />
  return <BaseCollapsible.Collapsible {...props} />
}

function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  const base = useCollapsibleBase()
  if (base === "radix") return <RadixCollapsible.CollapsibleTrigger {...props} />
  if (base === "aria") return <AriaCollapsible.CollapsibleTrigger {...props} />
  return <BaseCollapsible.CollapsibleTrigger {...props} />
}

function CollapsibleContent(props: CollapsibleContentProps) {
  const base = useCollapsibleBase()
  if (base === "radix") return <RadixCollapsible.CollapsibleContent {...props} />
  if (base === "aria") return <AriaCollapsible.CollapsibleContent {...props} />
  return <BaseCollapsible.CollapsibleContent {...props} />
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
