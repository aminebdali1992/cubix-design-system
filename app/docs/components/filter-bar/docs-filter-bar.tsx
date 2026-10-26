"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaFilterBar from "@/components/cubix/aria/filter-bar"
import * as BaseFilterBar from "@/components/cubix/base/filter-bar"
import * as RadixFilterBar from "@/components/cubix/radix/filter-bar"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function FilterBar(props: ComponentProps<typeof BaseFilterBar.FilterBar>) {
  const base = parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
  if (base === "radix") return <RadixFilterBar.FilterBar {...props} />
  if (base === "aria") return <AriaFilterBar.FilterBar {...props} />
  return <BaseFilterBar.FilterBar {...props} />
}

export { FilterBar }
export type {
  CustomOptionProps,
  FilterBarAction,
  FilterBarProps,
  FilterBarSize,
  FilterCondition,
  FilterGroup,
  FilterProperty,
} from "@/components/cubix/base/filter-bar"
