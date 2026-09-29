"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaToast from "@/components/cubix/aria/toast"
import * as BaseToast from "@/components/cubix/base/toast"
import * as RadixToast from "@/components/cubix/radix/toast"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type ToastOptions = AriaToast.ToastOptions

function useToastBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function currentBase() {
  if (typeof window === "undefined") return DEFAULT_BASE
  return parseComponentPath(window.location.pathname)?.base ?? DEFAULT_BASE
}

function pick() {
  const base = currentBase()
  if (base === "radix") return RadixToast.toast
  if (base === "aria") return AriaToast.toast
  return BaseToast.toast
}

const toast = {
  add(options: ToastOptions): string {
    return pick().add(options as never) as string
  },
  close(id: string) {
    pick().close(id)
  },
  promise<T>(
    task: Promise<T>,
    options: {
      loading: string
      success: string | ((data: T) => string)
      error: string
    }
  ) {
    const run = pick().promise as unknown as (
      task: Promise<T>,
      options: unknown
    ) => Promise<T>
    return run(task, options)
  },
}

function Toaster({ children }: { children?: ReactNode }) {
  const base = useToastBase()
  if (base === "radix") {
    return <RadixToast.Toaster>{children}</RadixToast.Toaster>
  }
  if (base === "aria") {
    return <AriaToast.Toaster>{children}</AriaToast.Toaster>
  }
  return <BaseToast.Toaster>{children}</BaseToast.Toaster>
}

export { Toaster, toast }