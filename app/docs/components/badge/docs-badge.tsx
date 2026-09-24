"use client"

import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"

import * as AriaBadge from "@/components/cubix/aria/badge"
import * as BaseBadge from "@/components/cubix/base/badge"
import * as RadixBadge from "@/components/cubix/radix/badge"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link"

type BadgeProps = {
  className?: string
  variant?: BadgeVariant
  children?: ReactNode
  render?: ReactElement<{ className?: string; children?: ReactNode }>
}

function useBadgeBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Badge({ render, className, children, variant, ...props }: BadgeProps) {
  const base = useBadgeBase()

  if (base === "radix") {
    if (isValidElement(render)) {
      return (
        <RadixBadge.Badge
          asChild
          className={className}
          variant={variant}
          {...props}
        >
          {cloneElement(render, undefined, children ?? render.props.children)}
        </RadixBadge.Badge>
      )
    }
    return (
      <RadixBadge.Badge className={className} variant={variant} {...props}>
        {children}
      </RadixBadge.Badge>
    )
  }

  if (base === "aria") {
    return (
      <AriaBadge.Badge
        className={className}
        variant={variant}
        render={render}
        {...props}
      >
        {children}
      </AriaBadge.Badge>
    )
  }

  return (
    <BaseBadge.Badge
      className={className}
      variant={variant}
      render={render}
      {...props}
    >
      {children}
    </BaseBadge.Badge>
  )
}

export { Badge }
