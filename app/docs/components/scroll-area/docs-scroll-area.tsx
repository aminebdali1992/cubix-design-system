"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaScrollArea from "@/components/cubix/aria/scroll-area"
import * as BaseScrollArea from "@/components/cubix/base/scroll-area"
import * as RadixScrollArea from "@/components/cubix/radix/scroll-area"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function useScrollAreaLib() {
  const pathname = usePathname()
  const base = parseComponentPath(pathname)?.base ?? DEFAULT_BASE
  if (base === "radix") return RadixScrollArea
  if (base === "aria") return AriaScrollArea
  return BaseScrollArea
}

function ScrollArea(props: ComponentProps<typeof BaseScrollArea.ScrollArea>) {
  const S = useScrollAreaLib() as typeof BaseScrollArea
  return <S.ScrollArea {...props} />
}
function ScrollBar(props: ComponentProps<typeof BaseScrollArea.ScrollBar>) {
  const S = useScrollAreaLib() as typeof BaseScrollArea
  return <S.ScrollBar {...props} />
}

export { ScrollArea, ScrollBar }
