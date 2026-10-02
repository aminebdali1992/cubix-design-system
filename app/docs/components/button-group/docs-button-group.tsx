"use client"

import type { ComponentProps, JSX } from "react"
import { usePathname } from "next/navigation"

import * as AriaButtonGroup from "@/components/cubix/aria/button-group"
import * as BaseButtonGroup from "@/components/cubix/base/button-group"
import * as RadixButtonGroup from "@/components/cubix/radix/button-group"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type Orientation = "horizontal" | "vertical"

type ButtonGroupProps = ComponentProps<"div"> & {
  orientation?: Orientation
}

type ButtonGroupTextProps = ComponentProps<"div"> & {
  render?: JSX.Element
}

type ButtonGroupSeparatorProps = {
  className?: string
  orientation?: Orientation
}

function useButtonGroupBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function ButtonGroup(props: ButtonGroupProps) {
  const base = useButtonGroupBase()
  if (base === "radix") return <RadixButtonGroup.ButtonGroup {...props} />
  if (base === "aria") return <AriaButtonGroup.ButtonGroup {...props} />
  return <BaseButtonGroup.ButtonGroup {...props} />
}

function ButtonGroupText(props: ButtonGroupTextProps) {
  const base = useButtonGroupBase()
  if (base === "radix") return <RadixButtonGroup.ButtonGroupText {...props} />
  if (base === "aria") return <AriaButtonGroup.ButtonGroupText {...props} />
  return <BaseButtonGroup.ButtonGroupText {...props} />
}

function ButtonGroupSeparator(props: ButtonGroupSeparatorProps) {
  const base = useButtonGroupBase()
  if (base === "radix") return <RadixButtonGroup.ButtonGroupSeparator {...props} />
  if (base === "aria") return <AriaButtonGroup.ButtonGroupSeparator {...props} />
  return <BaseButtonGroup.ButtonGroupSeparator {...props} />
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
