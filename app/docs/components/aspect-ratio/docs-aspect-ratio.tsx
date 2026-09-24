"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaAspectRatio from "@/components/cubix/aria/aspect-ratio"
import * as BaseAspectRatio from "@/components/cubix/base/aspect-ratio"
import * as RadixAspectRatio from "@/components/cubix/radix/aspect-ratio"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type AspectRatioProps = {
  ratio: number
  className?: string
  children?: ReactNode
}

function useAspectRatioBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function AspectRatio(props: AspectRatioProps) {
  const base = useAspectRatioBase()

  if (base === "aria") {
    return <AriaAspectRatio.AspectRatio {...props} />
  }

  if (base === "radix") {
    return <RadixAspectRatio.AspectRatio {...props} />
  }

  return <BaseAspectRatio.AspectRatio {...props} />
}

export { AspectRatio }
