"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaProgress from "@/components/cubix/aria/progress"
import * as BaseProgress from "@/components/cubix/base/progress"
import * as RadixProgress from "@/components/cubix/radix/progress"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type ProgressProps = {
  className?: string
  value: number | null
  "aria-label"?: string
  children?: ReactNode
}

type ProgressPartProps = {
  className?: string
  children?: ReactNode
}

function useProgressBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function Progress(props: ProgressProps) {
  const base = useProgressBase()
  if (base === "radix") return <RadixProgress.Progress {...props} />
  if (base === "aria") return <AriaProgress.Progress {...props} />
  return <BaseProgress.Progress {...props} />
}

function ProgressLabel(props: ProgressPartProps) {
  const base = useProgressBase()
  if (base === "radix") return <RadixProgress.ProgressLabel {...props} />
  if (base === "aria") return <AriaProgress.ProgressLabel {...props} />
  return <BaseProgress.ProgressLabel {...props} />
}

function ProgressValue({ className }: Omit<ProgressPartProps, "children">) {
  const base = useProgressBase()
  if (base === "radix") return <RadixProgress.ProgressValue className={className} />
  if (base === "aria") return <AriaProgress.ProgressValue className={className} />
  return <BaseProgress.ProgressValue className={className} />
}

export { Progress, ProgressLabel, ProgressValue }
