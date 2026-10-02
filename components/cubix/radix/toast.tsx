"use client"

/*
  Cubix Toast - Radix UI version.

  Built on @radix-ui/react-toast. Radix has no imperative API, so a tiny store
  drives it: call toast.add(...) from anywhere and render <Toaster /> once.
  Persian-first, so the stack starts right-to-left. The API (toast.add,
  toast.close, toast.promise, type, actionProps) matches the Base UI and
  React Aria versions.
*/
import * as React from "react"
import { Toast as ToastPrimitive } from "radix-ui"
import {
  CircleCheckIcon,
  InfoIcon,
  LoaderIcon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"

import { buttonVariants } from "@/components/cubix/base/button"
import { cn } from "@/lib/utils"

type ToastType = "success" | "info" | "warning" | "error" | "loading"

type ToastData = {
  /** Replaces the status icon. */
  icon?: React.ReactNode
  /** Extra content, such as buttons, rendered below the description. */
  actions?: React.ReactNode
  /** Extra classes for the toast root. */
  className?: string
}

type ToastOptions = {
  title?: React.ReactNode
  description?: React.ReactNode
  type?: ToastType
  timeout?: number
  priority?: "low" | "high"
  actionProps?: {
    children?: React.ReactNode
    onClick?: () => void
    className?: string
  }
  data?: ToastData
  onClose?: () => void
}

type ToastItem = ToastOptions & { id: string; open: boolean }

/** Matches the Base UI and React Aria toasters, which focus the stack on F6. */
const VIEWPORT_HOTKEY = "F6"

let items: ToastItem[] = []
let counter = 0
const listeners = new Set<() => void>()
const EMPTY: ToastItem[] = []

function emit(next: ToastItem[]) {
  items = next
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function add(options: ToastOptions) {
  const id = `toast-${++counter}`
  emit([...items, { ...options, id, open: true }])
  return id
}

function close(id: string) {
  const item = items.find((entry) => entry.id === id)
  if (!item || !item.open) return
  emit(items.map((entry) => (entry.id === id ? { ...entry, open: false } : entry)))
  item.onClose?.()
  window.setTimeout(() => emit(items.filter((entry) => entry.id !== id)), 300)
}

function update(id: string, options: ToastOptions) {
  emit(items.map((entry) => (entry.id === id ? { ...entry, ...options } : entry)))
}

type PromiseValue<T> = string | ToastOptions | ((data: T) => string | ToastOptions)

function toOptions(value: string | ToastOptions): ToastOptions {
  return typeof value === "string" ? { title: value } : value
}

function promise<T>(
  task: Promise<T>,
  options: {
    loading: string | ToastOptions
    success: PromiseValue<T>
    error: PromiseValue<unknown>
  }
) {
  const id = add({ ...toOptions(options.loading), type: "loading" })
  task.then(
    (data) => {
      const next = typeof options.success === "function" ? options.success(data) : options.success
      update(id, { ...toOptions(next), type: "success" })
    },
    (error) => {
      const next = typeof options.error === "function" ? options.error(error) : options.error
      update(id, { ...toOptions(next), type: "error" })
    }
  )
  return task
}

const toast = { add, close, update, promise }

function ToastViewport({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Viewport>) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "pointer-events-none fixed start-4 end-4 bottom-4 z-50 mx-auto flex w-auto max-w-sm flex-col gap-2 outline-none sm:start-auto sm:end-4 sm:mx-0 sm:w-full",
        className
      )}
      {...props}
    />
  )
}

function Toast({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Root>) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cn(
        "pointer-events-auto relative flex w-full items-center gap-3 rounded-2xl border bg-popover p-4 text-popover-foreground shadow-lg outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-bottom-6 data-[state=open]:duration-300",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-bottom-2 data-[state=closed]:duration-200",
        "data-[swipe=move]:[transform:translateX(var(--radix-toast-swipe-move-x))] data-[swipe=cancel]:[transform:translateX(0)] data-[swipe=cancel]:transition-transform data-[swipe=end]:[transform:translateX(var(--radix-toast-swipe-end-x))] data-[swipe=end]:opacity-0 data-[swipe=end]:transition-all",
        className
      )}
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Title>) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn("text-label", className)}
      {...props}
    />
  )
}

function ToastDescription({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Description>) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("text-label text-muted-foreground first:text-foreground", className)}
      {...props}
    />
  )
}

function ToastAction({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Action>) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0", className)}
      {...props}
    />
  )
}

function ToastClose({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Close>) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="بستن"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-sm" }),
        "relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground",
        className
      )}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </ToastPrimitive.Close>
  )
}

function ToastIcon({
  type,
  icon: custom,
}: {
  type: ToastType | undefined
  icon?: React.ReactNode
}) {
  let icon: React.ReactNode = null

  if (type === "success") icon = <CircleCheckIcon aria-hidden="true" />
  if (type === "info") icon = <InfoIcon aria-hidden="true" />
  if (type === "warning") icon = <TriangleAlertIcon aria-hidden="true" />
  if (type === "error") {
    icon = <OctagonXIcon className="text-destructive" aria-hidden="true" />
  }
  if (type === "loading") {
    icon = <LoaderIcon className="animate-spin" aria-hidden="true" />
  }
  if (custom) icon = custom
  if (!icon) return null

  return (
    <span
      data-slot="toast-icon"
      className="shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4"
    >
      {icon}
    </span>
  )
}

function ToastList({ duration }: { duration: number }) {
  const list = React.useSyncExternalStore(
    subscribe,
    () => items,
    () => EMPTY
  )

  return list.map((item) => (
    <Toast
      key={item.id}
      className={cn(item.data?.actions && "items-start", item.data?.className)}
      open={item.open}
      type={item.priority === "high" ? "foreground" : "background"}
      duration={item.type === "loading" ? Infinity : (item.timeout ?? duration)}
      onOpenChange={(open) => {
        if (!open) close(item.id)
      }}
    >
      <ToastIcon type={item.type} icon={item.data?.icon} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {item.title ? <ToastTitle>{item.title}</ToastTitle> : null}
        {item.description ? <ToastDescription>{item.description}</ToastDescription> : null}
        {item.data?.actions ? (
          <div data-slot="toast-actions" className="mt-2 flex flex-wrap gap-2">
            {item.data.actions}
          </div>
        ) : null}
      </div>
      {item.actionProps ? (
        <ToastAction
          altText={
            typeof item.actionProps.children === "string"
              ? item.actionProps.children
              : "انجام عملیات"
          }
          className={item.actionProps.className}
          onClick={item.actionProps.onClick}
        >
          {item.actionProps.children}
        </ToastAction>
      ) : null}
      <ToastClose />
    </Toast>
  ))
}

function Toaster({
  children,
  dir = "rtl",
  duration = 5000,
  ...props
}: Omit<React.ComponentProps<typeof ToastPrimitive.Provider>, "swipeDirection"> & {
  dir?: "ltr" | "rtl"
}) {
  React.useEffect(() => {
    function keepFocusInPage(event: KeyboardEvent) {
      if (event.key === VIEWPORT_HOTKEY) event.preventDefault()
    }
    document.addEventListener("keydown", keepFocusInPage)
    return () => document.removeEventListener("keydown", keepFocusInPage)
  }, [])

  return (
    <ToastPrimitive.Provider
      label="اعلان ({hotkey})"
      swipeDirection={dir === "rtl" ? "left" : "right"}
      duration={duration}
      {...props}
    >
      {children}
      <ToastList duration={duration} />
      <ToastViewport hotkey={[VIEWPORT_HOTKEY]} dir={dir} lang={dir === "rtl" ? "fa" : undefined} />
    </ToastPrimitive.Provider>
  )
}

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
  toast,
}
export type { ToastData, ToastOptions, ToastType }
