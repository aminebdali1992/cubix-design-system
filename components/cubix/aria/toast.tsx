"use client"

/*
  Cubix Toast - React Aria version.

  Built on UNSTABLE_ToastRegion + ToastQueue from react-aria-components.
  Call toast.add(...) from anywhere and render <Toaster /> once. Persian-first,
  so the stack starts right-to-left. The API (toast.add, toast.close,
  toast.promise, type, actionProps) matches the Base UI and Radix versions.
*/
import * as React from "react"
import {
  Button as AriaButton,
  I18nProvider,
  Text as AriaText,
  UNSTABLE_Toast as AriaToast,
  UNSTABLE_ToastContent as AriaToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as AriaToastRegion,
  type QueuedToast,
} from "react-aria-components"
import {
  CircleCheckIcon,
  InfoIcon,
  LoaderIcon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"

import { buttonVariants } from "@/components/cubix/aria/button"
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

const DEFAULT_TIMEOUT = 5000

const queue = new ToastQueue<ToastOptions>({ maxVisibleToasts: 5 })

function add(options: ToastOptions) {
  return queue.add(options, {
    timeout: options.type === "loading" ? undefined : (options.timeout ?? DEFAULT_TIMEOUT),
    onClose: options.onClose,
  })
}

function close(id: string) {
  queue.close(id)
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
      close(id)
      const next = typeof options.success === "function" ? options.success(data) : options.success
      add({ ...toOptions(next), type: "success" })
    },
    (error) => {
      close(id)
      const next = typeof options.error === "function" ? options.error(error) : options.error
      add({ ...toOptions(next), type: "error" })
    }
  )
  return task
}

const toast = { add, close, promise }

function ToastRegion({
  className,
  ...props
}: Omit<
  React.ComponentProps<typeof AriaToastRegion<ToastOptions>>,
  "queue" | "children" | "className"
> & { className?: string }) {
  return (
    <AriaToastRegion<ToastOptions>
      data-slot="toast-viewport"
      queue={queue}
      className={cn(
        "pointer-events-none fixed start-4 end-4 bottom-4 z-50 mx-auto flex w-auto max-w-sm flex-col gap-2 outline-none sm:start-auto sm:end-4 sm:mx-0 sm:w-full",
        className
      )}
      {...props}
    >
      {({ toast: item }) => <ToastItem item={item} />}
    </AriaToastRegion>
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

function ToastItem({ item }: { item: QueuedToast<ToastOptions> }) {
  const { content } = item
  const closeOnEscape = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return
      function handleKeyDown(event: KeyboardEvent) {
        if (event.key !== "Escape") return
        event.preventDefault()
        queue.close(item.key)
      }
      node.addEventListener("keydown", handleKeyDown)
      return () => node.removeEventListener("keydown", handleKeyDown)
    },
    [item.key]
  )

  return (
    <AriaToast
      ref={closeOnEscape}
      data-slot="toast"
      toast={item}
      className={cn(
        "pointer-events-auto relative flex w-full items-center gap-3 rounded-2xl border bg-popover p-4 text-popover-foreground shadow-lg outline-none select-none",
        "data-[focus-visible]:border-ring data-[focus-visible]:ring-[3px] data-[focus-visible]:ring-ring/50",
        "animate-in fade-in slide-in-from-bottom-6 duration-300",
        content.data?.actions && "items-start",
        content.data?.className
      )}
    >
      <ToastIcon type={content.type} icon={content.data?.icon} />
      <AriaToastContent
        role={content.priority === "high" ? "alert" : "status"}
        className="flex min-w-0 flex-1 flex-col gap-1"
      >
        {content.title ? (
          <AriaText slot="title" data-slot="toast-title" className="text-label">
            {content.title}
          </AriaText>
        ) : null}
        {content.description ? (
          <AriaText
            slot="description"
            data-slot="toast-description"
            className="text-label text-muted-foreground first:text-foreground"
          >
            {content.description}
          </AriaText>
        ) : null}
        {content.data?.actions ? (
          <div data-slot="toast-actions" className="mt-2 flex flex-wrap gap-2">
            {content.data.actions}
          </div>
        ) : null}
      </AriaToastContent>
      {content.actionProps ? (
        <AriaButton
          data-slot="toast-action"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "shrink-0",
            content.actionProps.className
          )}
          onPress={content.actionProps.onClick}
        >
          {content.actionProps.children}
        </AriaButton>
      ) : null}
      <AriaButton
        slot="close"
        data-slot="toast-close"
        aria-label="بستن"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground"
        )}
      >
        <XIcon aria-hidden="true" />
      </AriaButton>
    </AriaToast>
  )
}

function subscribeToQueue(onChange: () => void) {
  return queue.subscribe(onChange)
}

function getVisibleToastCount() {
  return queue.visibleToasts.length
}

function getServerToastCount() {
  return 0
}

function Toaster({ children, dir = "rtl" }: { children?: React.ReactNode; dir?: "ltr" | "rtl" }) {
  /*
    The region only mounts while toasts are visible, and React Aria registers
    it for F6 landmark navigation only when its label changes. Keeping the
    count in the label re-registers the region every time it mounts.
  */
  const count = React.useSyncExternalStore(
    subscribeToQueue,
    getVisibleToastCount,
    getServerToastCount
  )

  return (
    <>
      {children}
      <I18nProvider locale={dir === "rtl" ? "fa-IR" : "en-US"}>
        <ToastRegion
          lang={dir === "rtl" ? "fa" : undefined}
          aria-label={`${count.toLocaleString("fa-IR")} اعلان`}
        />
      </I18nProvider>
    </>
  )
}

export { Toaster, ToastRegion, toast }
export type { ToastData, ToastOptions, ToastType }
