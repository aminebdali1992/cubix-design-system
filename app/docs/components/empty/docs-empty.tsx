"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaEmpty from "@/components/cubix/aria/empty"
import * as BaseEmpty from "@/components/cubix/base/empty"
import * as RadixEmpty from "@/components/cubix/radix/empty"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type DivProps = ComponentProps<"div">
type MediaProps = DivProps & { variant?: "default" | "icon" | "outline" }

function useEmptyBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function useEmpty() {
  const base = useEmptyBase()
  if (base === "radix") return RadixEmpty
  if (base === "aria") return AriaEmpty
  return BaseEmpty
}

function Empty(props: DivProps) {
  const E = useEmpty()
  return <E.Empty {...props} />
}

function EmptyHeader(props: DivProps) {
  const E = useEmpty()
  return <E.EmptyHeader {...props} />
}

function EmptyMedia(props: MediaProps) {
  const E = useEmpty()
  return <E.EmptyMedia {...props} />
}

function EmptyTitle(props: DivProps) {
  const E = useEmpty()
  return <E.EmptyTitle {...props} />
}

function EmptyDescription(props: DivProps) {
  const E = useEmpty()
  return <E.EmptyDescription {...props} />
}

function EmptyContent(props: DivProps) {
  const E = useEmpty()
  return <E.EmptyContent {...props} />
}

export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle }
