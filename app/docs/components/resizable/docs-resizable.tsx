"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaResizable from "@/components/cubix/aria/resizable"
import * as BaseResizable from "@/components/cubix/base/resizable"
import * as RadixResizable from "@/components/cubix/radix/resizable"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function useResizableLib() {
  const pathname = usePathname()
  const base = parseComponentPath(pathname)?.base ?? DEFAULT_BASE
  if (base === "radix") return RadixResizable
  if (base === "aria") return AriaResizable
  return BaseResizable
}

function ResizablePanelGroup(props: ComponentProps<typeof BaseResizable.ResizablePanelGroup>) {
  const R = useResizableLib()
  return <R.ResizablePanelGroup {...props} />
}
function ResizablePanel(props: ComponentProps<typeof BaseResizable.ResizablePanel>) {
  const R = useResizableLib()
  return <R.ResizablePanel {...props} />
}
function ResizableHandle(props: ComponentProps<typeof BaseResizable.ResizableHandle>) {
  const R = useResizableLib()
  return <R.ResizableHandle {...props} />
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
