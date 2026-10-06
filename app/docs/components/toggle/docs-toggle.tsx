"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaToggle from "@/components/cubix/aria/toggle"
import * as BaseToggle from "@/components/cubix/base/toggle"
import * as RadixToggle from "@/components/cubix/radix/toggle"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type ToggleProps = {
  className?: string
  variant?: "default" | "outline" | "segmented"
  size?: "default" | "sm" | "lg"
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  disabled?: boolean
  "aria-label"?: string
  children?: ReactNode
}

function useToggleBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function Toggle(props: ToggleProps) {
  const base = useToggleBase()
  if (base === "radix") return <RadixToggle.Toggle {...props} />
  if (base === "aria") return <AriaToggle.Toggle {...props} />
  return <BaseToggle.Toggle {...props} />
}

export { Toggle }
export type { ToggleProps }
