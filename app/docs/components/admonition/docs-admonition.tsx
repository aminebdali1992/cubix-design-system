"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaAdmonition from "@/components/cubix/aria/admonition"
import * as BaseAdmonition from "@/components/cubix/base/admonition"
import * as RadixAdmonition from "@/components/cubix/radix/admonition"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type AdmonitionProps = ComponentProps<typeof BaseAdmonition.Admonition>

function Admonition(props: AdmonitionProps) {
  const base = parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
  if (base === "radix") return <RadixAdmonition.Admonition {...props} />
  if (base === "aria") return <AriaAdmonition.Admonition {...props} />
  return <BaseAdmonition.Admonition {...props} />
}

export { Admonition }
