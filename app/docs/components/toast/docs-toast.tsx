"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaToast from "@/components/cubix/aria/toast"
import * as BaseToast from "@/components/cubix/base/toast"
import * as RadixToast from "@/components/cubix/radix/toast"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type ToastOptions = AriaToast.ToastOptions

type ToastPromiseValue<T> = string | ToastOptions | ((value: T) => string | ToastOptions)

type ToastPromiseOptions<T> = {
  loading: string | ToastOptions
  success: ToastPromiseValue<T>
  error: ToastPromiseValue<unknown>
}

function useToastBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function currentBase() {
  if (typeof window === "undefined") return DEFAULT_BASE
  return parseComponentPath(window.location.pathname)?.base ?? DEFAULT_BASE
}

const toast = {
  add(options: ToastOptions): string {
    const base = currentBase()
    if (base === "radix") return RadixToast.toast.add(options)
    if (base === "aria") return AriaToast.toast.add(options)
    return BaseToast.toast.add(options)
  },
  close(id: string) {
    const base = currentBase()
    if (base === "radix") return RadixToast.toast.close(id)
    if (base === "aria") return AriaToast.toast.close(id)
    return BaseToast.toast.close(id)
  },
  promise<T>(task: Promise<T>, options: ToastPromiseOptions<T>): Promise<T> {
    const base = currentBase()
    if (base === "radix") return RadixToast.toast.promise(task, options)
    if (base === "aria") return AriaToast.toast.promise(task, options)
    return BaseToast.toast.promise(task, options)
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
