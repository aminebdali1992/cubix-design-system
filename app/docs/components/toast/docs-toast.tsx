"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaToast from "@/components/cubix/aria/toast"
import * as BaseToast from "@/components/cubix/base/toast"
import * as RadixToast from "@/components/cubix/radix/toast"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type ToastOptions = AriaToast.ToastOptions

type ToastPosition = BaseToast.ToastPosition

const PositionContext = createContext<((position: ToastPosition) => void) | null>(null)

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

function NestedToaster({
  children,
  position,
  setPosition,
}: {
  children?: ReactNode
  position: ToastPosition
  setPosition: (position: ToastPosition) => void
}) {
  useEffect(() => {
    setPosition(position)
  }, [position, setPosition])
  useEffect(() => () => setPosition("bottom-end"), [setPosition])
  return <>{children}</>
}

function Toaster({
  children,
  position: positionProp,
}: {
  children?: ReactNode
  position?: ToastPosition
}) {
  const parentSetPosition = useContext(PositionContext)
  const [position, setPosition] = useState<ToastPosition>("bottom-end")
  const base = useToastBase()

  if (parentSetPosition) {
    return (
      <NestedToaster position={positionProp ?? "bottom-end"} setPosition={parentSetPosition}>
        {children}
      </NestedToaster>
    )
  }

  const current = positionProp ?? position
  const content = <PositionContext.Provider value={setPosition}>{children}</PositionContext.Provider>
  if (base === "radix") {
    return <RadixToast.Toaster position={current}>{content}</RadixToast.Toaster>
  }
  if (base === "aria") {
    return <AriaToast.Toaster position={current}>{content}</AriaToast.Toaster>
  }
  return <BaseToast.Toaster position={current}>{content}</BaseToast.Toaster>
}

export type { ToastPosition }
export { Toaster, toast }
