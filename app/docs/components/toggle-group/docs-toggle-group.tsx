"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaToggleGroup from "@/components/cubix/aria/toggle-group"
import * as BaseToggleGroup from "@/components/cubix/base/toggle-group"
import * as RadixToggleGroup from "@/components/cubix/radix/toggle-group"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type ToggleGroupProps = {
  className?: string
  variant?: "default" | "outline" | "segmented"
  size?: "default" | "sm" | "lg"
  spacing?: number
  orientation?: "horizontal" | "vertical"
  multiple?: boolean
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  children?: ReactNode
}

type ToggleGroupItemProps = {
  className?: string
  value: string
  disabled?: boolean
  "aria-label"?: string
  children?: ReactNode
}

function useToggleGroupBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function ToggleGroup(props: ToggleGroupProps) {
  const base = useToggleGroupBase()
  if (base === "radix") return <RadixToggleGroup.ToggleGroup {...props} />
  if (base === "aria") return <AriaToggleGroup.ToggleGroup {...props} />
  return <BaseToggleGroup.ToggleGroup {...props} />
}

function ToggleGroupItem(props: ToggleGroupItemProps) {
  const base = useToggleGroupBase()
  if (base === "radix") return <RadixToggleGroup.ToggleGroupItem {...props} />
  if (base === "aria") return <AriaToggleGroup.ToggleGroupItem {...props} />
  return <BaseToggleGroup.ToggleGroupItem {...props} />
}

export { ToggleGroup, ToggleGroupItem }
