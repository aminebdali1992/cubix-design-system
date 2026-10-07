"use client"

/*
  Cubix Sheet - Radix UI version.

  Persian-first: the portaled panel defaults to dir="rtl" lang="fa" so the
  sheet follows Persian regardless of the portal position. Pass dir="ltr"
  on SheetContent to switch.
*/
import * as React from "react"

const SheetChromeContext = React.createContext({ showCloseButton: true })
import { XIcon } from "lucide-react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { Button } from "@/components/cubix/radix/button"
import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

/*
  render={<Button variant="outline" />} composes the trigger or close with
  another element, the same API as the Base UI and React Aria versions.
  asChild works as well.
*/
type ComposableProps = {
  render?: React.ReactElement<Record<string, unknown>>
}

function SheetTrigger({
  render,
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger> & ComposableProps) {
  return (
    <SheetPrimitive.Trigger
      data-slot="sheet-trigger"
      asChild={asChild || render !== undefined}
      {...props}
    >
      {render
        ? children === undefined
          ? render
          : React.cloneElement(render, undefined, children)
        : children}
    </SheetPrimitive.Trigger>
  )
}

function SheetClose({
  render,
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close> & ComposableProps) {
  return (
    <SheetPrimitive.Close
      data-slot="sheet-close"
      asChild={asChild || render !== undefined}
      {...props}
    >
      {render
        ? children === undefined
          ? render
          : React.cloneElement(render, undefined, children)
        : children}
    </SheetPrimitive.Close>
  )
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-screen isolate bg-overlay-strong duration-100 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
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
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
  dir?: "ltr" | "rtl"
  lang?: string
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        dir={dir}
        lang={dir === "rtl" ? lang : undefined}
        className={cn(
          "group fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-label text-popover-foreground shadow-lg duration-100 data-[side=bottom]:inset-x-0 data-[side=bottom]:w-screen data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:mr-[calc(100%-100vw)] data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:w-screen data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[side=bottom]:data-[state=open]:slide-in-from-bottom-10 data-[side=left]:data-[state=open]:slide-in-from-left-10 data-[side=right]:data-[state=open]:slide-in-from-right-10 data-[side=top]:data-[state=open]:slide-in-from-top-10 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[side=bottom]:data-[state=closed]:slide-out-to-bottom-10 data-[side=left]:data-[state=closed]:slide-out-to-left-10 data-[side=right]:data-[state=closed]:slide-out-to-right-10 data-[side=top]:data-[state=closed]:slide-out-to-top-10",
          className
        )}
        {...props}
      >
        <SheetChromeContext.Provider value={{ showCloseButton }}>
          {children}
        </SheetChromeContext.Provider>
        
      </SheetPrimitive.Content>
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
          <SheetPrimitive.Close data-slot="sheet-close" asChild>
            <Button
              variant="ghost"
              className="shrink-0"
              size="icon-sm"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
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

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
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
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
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
