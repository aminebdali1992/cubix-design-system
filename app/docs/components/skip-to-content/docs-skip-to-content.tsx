"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaSkipToContent from "@/components/cubix/aria/skip-to-content"
import * as BaseSkipToContent from "@/components/cubix/base/skip-to-content"
import * as RadixSkipToContent from "@/components/cubix/radix/skip-to-content"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function SkipToContent(props: ComponentProps<typeof BaseSkipToContent.SkipToContent>) {
  const base = parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
  if (base === "radix") return <RadixSkipToContent.SkipToContent {...props} />
  if (base === "aria") return <AriaSkipToContent.SkipToContent {...props} />
  return <BaseSkipToContent.SkipToContent {...props} />
}

export { SkipToContent }
export type { SkipToContentProps } from "@/components/cubix/base/skip-to-content"
