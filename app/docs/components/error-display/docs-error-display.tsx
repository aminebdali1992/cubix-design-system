"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaErrorDisplay from "@/components/cubix/aria/error-display"
import * as BaseErrorDisplay from "@/components/cubix/base/error-display"
import * as RadixErrorDisplay from "@/components/cubix/radix/error-display"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function ErrorDisplay(props: ComponentProps<typeof BaseErrorDisplay.ErrorDisplay>) {
  const base = parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
  if (base === "radix") return <RadixErrorDisplay.ErrorDisplay {...props} />
  if (base === "aria") return <AriaErrorDisplay.ErrorDisplay {...props} />
  return <BaseErrorDisplay.ErrorDisplay {...props} />
}

export { ErrorDisplay }
export type { ErrorDisplayProps } from "@/components/cubix/base/error-display"
