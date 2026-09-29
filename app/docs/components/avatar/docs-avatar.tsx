"use client"

import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"

import * as AriaAvatar from "@/components/cubix/aria/avatar"
import * as BaseAvatar from "@/components/cubix/base/avatar"
import * as RadixAvatar from "@/components/cubix/radix/avatar"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type AvatarProps = {
  className?: string
  size?: "default" | "sm" | "lg" | "xl" | "2xl"
  ring?: boolean
  children?: ReactNode
}

type ImageProps = {
  className?: string
  src?: string
  alt?: string
}

type FallbackProps = {
  className?: string
  delay?: number
  children?: ReactNode
}

type BadgeProps = {
  className?: string
  children?: ReactNode
  "aria-label"?: string
  render?: ReactElement<{ className?: string; children?: ReactNode }>
}

type GroupProps = {
  className?: string
  children?: ReactNode
  "aria-label"?: string
}

type SlotProps = {
  className?: string
  children?: ReactNode
}

function useAvatarBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Avatar(props: AvatarProps) {
  const base = useAvatarBase()
  if (base === "aria") return <AriaAvatar.Avatar {...props} />
  if (base === "radix") return <RadixAvatar.Avatar {...props} />
  return <BaseAvatar.Avatar {...props} />
}

function AvatarImage(props: ImageProps) {
  const base = useAvatarBase()
  if (base === "aria") return <AriaAvatar.AvatarImage {...props} />
  if (base === "radix") return <RadixAvatar.AvatarImage {...props} />
  return <BaseAvatar.AvatarImage {...props} />
}

function AvatarFallback(props: FallbackProps) {
  const base = useAvatarBase()
  if (base === "aria") return <AriaAvatar.AvatarFallback {...props} />
  if (base === "radix") return <RadixAvatar.AvatarFallback {...props} />
  return <BaseAvatar.AvatarFallback {...props} />
}

function AvatarBadge({ render, className, children, ...props }: BadgeProps) {
  const base = useAvatarBase()

  if (base === "radix") {
    if (isValidElement(render)) {
      return (
        <RadixAvatar.AvatarBadge asChild className={className} {...props}>
          {cloneElement(render, undefined, children ?? render.props.children)}
        </RadixAvatar.AvatarBadge>
      )
    }
    return (
      <RadixAvatar.AvatarBadge className={className} {...props}>
        {children}
      </RadixAvatar.AvatarBadge>
    )
  }

  if (base === "aria") {
    return (
      <AriaAvatar.AvatarBadge
        className={className}
        render={render}
        {...props}
      >
        {children}
      </AriaAvatar.AvatarBadge>
    )
  }

  return (
    <BaseAvatar.AvatarBadge className={className} render={render} {...props}>
      {children}
    </BaseAvatar.AvatarBadge>
  )
}

function AvatarGroup(props: GroupProps) {
  const base = useAvatarBase()
  if (base === "aria") return <AriaAvatar.AvatarGroup {...props} />
  if (base === "radix") return <RadixAvatar.AvatarGroup {...props} />
  return <BaseAvatar.AvatarGroup {...props} />
}

function AvatarGroupCount(props: SlotProps) {
  const base = useAvatarBase()
  if (base === "aria") return <AriaAvatar.AvatarGroupCount {...props} />
  if (base === "radix") return <RadixAvatar.AvatarGroupCount {...props} />
  return <BaseAvatar.AvatarGroupCount {...props} />
}

export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
}
