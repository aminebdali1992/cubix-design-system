"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaChips from "@/components/cubix/aria/chips"
import * as BaseChips from "@/components/cubix/base/chips"
import * as RadixChips from "@/components/cubix/radix/chips"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

/*
  The demos use the props every base shares, so each part renders the
  Base UI, Radix or React Aria source picked in the docs switcher without a
  cast.
*/

type ChipsProps = {
  className?: string
  multiple?: boolean
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  dir?: "ltr" | "rtl"
  lang?: string
  children?: ReactNode
}

type ChipProps = {
  className?: string
  value: string
  icon?: ReactNode
  avatar?: ReactNode
  variant?:
    | "default"
    | "secondary"
    | "gray"
    | "outline"
  size?: "xs" | "sm" | "default" | "lg"
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  children?: ReactNode
}

function useChipsBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Chips(props: ChipsProps) {
  const base = useChipsBase()

  if (base === "aria") {
    return <AriaChips.Chips {...props} />
  }

  if (base === "radix") {
    return <RadixChips.Chips {...props} />
  }

  return <BaseChips.Chips {...props} />
}

function Chip(props: ChipProps) {
  const base = useChipsBase()

  if (base === "aria") {
    return <AriaChips.Chip {...props} />
  }

  if (base === "radix") {
    return <RadixChips.Chip {...props} />
  }

  return <BaseChips.Chip {...props} />
}

export { Chips, Chip }
