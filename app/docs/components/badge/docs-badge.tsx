"use client"

import type { JSX, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaBadge from "@/components/cubix/aria/badge"
import * as BaseBadge from "@/components/cubix/base/badge"
import * as RadixBadge from "@/components/cubix/radix/badge"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type BadgeProps = {
  className?: string
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "dot"
  size?: "default" | "lg"
  role?: string
  "aria-label"?: string
  render?: JSX.Element
  children?: ReactNode
}

function useBadgeBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function Badge(props: BadgeProps) {
  const base = useBadgeBase()
  if (base === "radix") return <RadixBadge.Badge {...props} />
  if (base === "aria") return <AriaBadge.Badge {...props} />
  return <BaseBadge.Badge {...props} />
}

export { Badge }
