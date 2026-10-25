"use client"

import type { ComponentProps, ComponentType } from "react"
import { usePathname } from "next/navigation"

import * as AriaBranch from "@/components/cubix/aria/branch"
import * as BaseBranch from "@/components/cubix/base/branch"
import * as RadixBranch from "@/components/cubix/radix/branch"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function useBranchBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function pick(base: string) {
  if (base === "radix") return RadixBranch
  if (base === "aria") return AriaBranch
  return BaseBranch
}

function Branch(props: BaseBranch.BranchProps) {
  const B = pick(useBranchBase())
  return <B.Branch {...props} />
}

function BranchContent(props: BaseBranch.BranchContentProps) {
  const B = pick(useBranchBase())
  return <B.BranchContent {...props} />
}

function BranchSelector(props: ComponentProps<"div"> & { force?: boolean }) {
  const B = pick(useBranchBase())
  return <B.BranchSelector {...(props as BaseBranch.BranchSelectorProps)} />
}

function BranchPrevious(props: ComponentProps<"button">) {
  const B = pick(useBranchBase())
  const C = B.BranchPrevious as unknown as ComponentType<ComponentProps<"button">>
  return <C {...props} />
}

function BranchNext(props: ComponentProps<"button">) {
  const B = pick(useBranchBase())
  const C = B.BranchNext as unknown as ComponentType<ComponentProps<"button">>
  return <C {...props} />
}

function BranchPage(props: ComponentProps<"div">) {
  const B = pick(useBranchBase())
  const C = B.BranchPage as unknown as ComponentType<ComponentProps<"div">>
  return <C {...props} />
}

/* The base is fixed per route, so the hook order stays stable. */
function useBranch() {
  return pick(useBranchBase()).useBranch()
}

export {
  Branch,
  BranchContent,
  BranchNext,
  BranchPage,
  BranchPrevious,
  BranchSelector,
  useBranch,
}
