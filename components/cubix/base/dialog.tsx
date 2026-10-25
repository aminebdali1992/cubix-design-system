"use client"

/*
  Cubix Dialog - Base UI version.

  Persian-first: the portaled panel defaults to dir="rtl" lang="fa" so the
  dialog follows Persian regardless of the portal position. Pass dir="ltr"
  on DialogContent to switch.
*/
import { XIcon } from "lucide-react"
import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { Button } from "@/components/cubix/button"
import { cn } from "@/lib/utils"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-overlay-strong duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

type DialogSize = "tiny" | "small" | "medium" | "large" | "xlarge"

/* Widths follow the Supabase Dialog sizes. */
const dialogSizes: Record<DialogSize, string> = {
  tiny: "sm:max-w-xs",
  small: "sm:max-w-sm",
  medium: "sm:max-w-lg",
  large: "md:max-w-xl",
  xlarge: "md:max-w-3xl",
}

const dialogPadding = {
  small: "px-5 py-4",
  medium: "px-7 py-6",
} as const

function DialogContent({
  className,
  children,
  showCloseButton = true,
  size = "medium",
  dir = "rtl",
  lang = "fa",
  ref,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
  size?: DialogSize
  dir?: "ltr" | "rtl"
  lang?: string
}) {
  /*
    Focus lands on the panel itself, not its first button, so opening stays
    inside the modal for assistive technology without a stray focus ring.
  */
  const popupRef = React.useRef<HTMLDivElement | null>(null)
  const setPopupRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      popupRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        ref={setPopupRef}
        data-slot="dialog-content"
        dir={dir}
        lang={dir === "rtl" ? lang : undefined}
        className={cn(
          "group/dialog-content fixed inset-0 m-auto h-fit z-50 grid w-full max-w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-xl bg-popover p-0 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          dialogSizes[size],
          className
        )}
        initialFocus={popupRef}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-3 end-3"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5 border-b px-5 py-4 pe-14 text-start", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const row = ref.current
    if (!row) return

    const equalize = () => {
      if (!row.isConnected) return
      const controls = Array.from(row.children) as HTMLElement[]
      if (controls.length < 2) return
      controls.forEach((el) => el.style.removeProperty("min-width"))
      const max = Math.max(...controls.map((el) => el.offsetWidth))
      controls.forEach((el) => el.style.setProperty("min-width", `${max}px`))
    }

    equalize()
    document.fonts?.ready.then(equalize)
    const observer = new ResizeObserver(equalize)
    observer.observe(row)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 border-t px-5 py-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton ? (
        <DialogPrimitive.Close render={<Button variant="outline" size="sm" />}>
          Close
        </DialogPrimitive.Close>
      ) : null}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("cn-font-heading text-label font-medium", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-label text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

/* A padded body block; stack several and split them with DialogSectionSeparator. */
function DialogSection({
  className,
  padding = "small",
  ...props
}: React.ComponentProps<"div"> & { padding?: keyof typeof dialogPadding }) {
  return (
    <div
      data-slot="dialog-section"
      className={cn(dialogPadding[padding], "text-label", className)}
      {...props}
    />
  )
}

function DialogSectionSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-section-separator"
      role="separator"
      className={cn("h-px w-full bg-border", className)}
      {...props}
    />
  )
}

export {
  DialogSection,
  DialogSectionSeparator,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

export type { DialogSize }
