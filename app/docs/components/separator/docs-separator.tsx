"use client"

import { usePathname } from "next/navigation"

import * as AriaSeparator from "@/components/cubix/aria/separator"
import * as BaseSeparator from "@/components/cubix/base/separator"
import * as RadixSeparator from "@/components/cubix/radix/separator"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type SeparatorProps = {
  className?: string
  orientation?: "horizontal" | "vertical"
  variant?: "solid" | "dashed"
}

function Separator(props: SeparatorProps) {
  const base = parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
  if (base === "radix") return <RadixSeparator.Separator {...props} />
  if (base === "aria") return <AriaSeparator.Separator {...props} />
  return <BaseSeparator.Separator {...props} />
}

export { Separator }