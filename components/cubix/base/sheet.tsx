"use client"

/*
  Cubix Sheet - Base UI version.

  Persian-first: the portaled panel defaults to dir="rtl" lang="fa" so the
  sheet follows Persian regardless of the portal position. Pass dir="ltr"
  on SheetContent to switch.
*/
import * as React from "react"

const SheetChromeContext = React.createContext({ showCloseButton: true })
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import { cn } from "@/lib/utils"

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-screen isolate bg-overlay-strong duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  dir = "rtl",
  lang = "fa",
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
  dir?: "ltr" | "rtl"
  lang?: string
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        dir={dir}
        lang={dir === "rtl" ? lang : undefined}
        className={cn(
          "group fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-label text-popover-foreground shadow-lg duration-100 data-[side=bottom]:inset-x-0 data-[side=bottom]:w-screen data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:[margin-right:calc(100%-100vw)] data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:w-screen data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10",
          className
        )}
        {...props}
      >
        <SheetChromeContext.Provider value={{ showCloseButton }}>
          {children}
        </SheetChromeContext.Provider>
        
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, children, ...props }: React.ComponentProps<"div">) {
  const { showCloseButton } = React.useContext(SheetChromeContext)
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-row h-14 items-center justify-between gap-2 border-b px-4 text-start",
        className
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">{children}</div>
      {showCloseButton ? (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                className="shrink-0"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        ) : null}
    </div>
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
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
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex flex-row items-center gap-2 border-t bg-muted/50 px-4 py-3 group-data-[side=left]:[&>*]:flex-1 group-data-[side=right]:[&>*]:flex-1 group-data-[side=top]:[&>*]:flex-1 group-data-[side=bottom]:[&>*]:flex-1 group-data-[side=top]:sm:[&>*]:flex-none group-data-[side=bottom]:sm:[&>*]:flex-none group-data-[side=top]:sm:justify-end group-data-[side=bottom]:sm:justify-end",
        className
      )}
      {...props}
      dir="ltr"
    />
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("cn-font-heading text-body font-normal", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn(
        "text-description text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetOverlay,
  SheetPortal,
}
