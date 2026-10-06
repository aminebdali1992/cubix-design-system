"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaLabel from "@/components/cubix/aria/label"
import * as BaseLabel from "@/components/cubix/base/label"
import * as RadixLabel from "@/components/cubix/radix/label"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type LabelProps = {
  className?: string
  htmlFor?: string
  id?: string
  children?: ReactNode
}

function useLabelBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function Label(props: LabelProps) {
  const base = useLabelBase()
  if (base === "radix") return <RadixLabel.Label {...props} />
  if (base === "aria") return <AriaLabel.Label {...props} />
  return <BaseLabel.Label {...props} />
}

export { Label }
export type { LabelProps }
