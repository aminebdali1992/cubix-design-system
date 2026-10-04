"use client"

import type { ComponentProps, ReactElement, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaButton from "@/components/cubix/aria/button"
import * as BaseButton from "@/components/cubix/base/button"
import * as RadixButton from "@/components/cubix/radix/button"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type ButtonProps = ComponentProps<"button"> & {
  variant?:
    | "default"
    | "foreground"
    | "secondary"
    | "gray"
    | "destructive"
    | "destructive-secondary"
    | "outline"
    | "ghost"
    | "link"
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"
  nativeButton?: boolean
  render?: ReactElement<{ className?: string; children?: ReactNode }>
}

function useButtonBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function Button(props: ButtonProps) {
  const base = useButtonBase()
  if (base === "radix") return <RadixButton.Button {...props} />
  if (base === "aria") return <AriaButton.Button {...props} />
  return <BaseButton.Button {...props} />
}

export { Button }
