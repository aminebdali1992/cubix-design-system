"use client"

/*
  Cubix Drawer - Radix/Vaul version.

  Persian-first: the portaled panel defaults to dir="rtl" lang="fa".
  Pass dir="ltr" on DrawerContent to switch.
  Uses vaul for swipe/snap; direction maps to vaul's direction prop.
  Chrome (Header/Footer/Title/Description) matches shadcn Base Drawer.
*/
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

type Direction = "top" | "right" | "bottom" | "left"
type SwipeDirection = "up" | "right" | "down" | "left"

const swipeToDirection: Record<SwipeDirection, Direction> = {
  up: "top",
  down: "bottom",
  left: "left",
  right: "right",
}

const DrawerDirectionContext = React.createContext<Direction>("bottom")

type ComposableProps = {
  render?: React.ReactElement<Record<string, unknown>>
}

function Drawer({
  direction,
  swipeDirection,
  shouldScaleBackground = false,
  showSwipeHandle: _showSwipeHandle,
  disablePointerDismissal: _disablePointerDismissal,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & {
  /** API parity with Base. vaul has no handle slot here; ignored. */
  showSwipeHandle?: boolean
  /** API parity with Base; ignored on Radix (vaul). */
  disablePointerDismissal?: boolean
  direction?: Direction
  /** Alias matching Base UI / shadcn. Maps up→top, down→bottom. */
  swipeDirection?: SwipeDirection
}) {
  const resolvedDirection: Direction =
    direction ?? (swipeDirection ? swipeToDirection[swipeDirection] : "bottom")

  return (
    <DrawerDirectionContext.Provider value={resolvedDirection}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        direction={resolvedDirection}
        shouldScaleBackground={shouldScaleBackground}
        {...props}
      />
    </DrawerDirectionContext.Provider>
  )
}

function DrawerTrigger({
  render,
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger> & ComposableProps) {
  return (
    <DrawerPrimitive.Trigger
      data-slot="drawer-trigger"
      asChild={asChild || render !== undefined}
      {...props}
    >
      {render
        ? children === undefined
          ? render
          : React.cloneElement(render, undefined, children)
        : children}
    </DrawerPrimitive.Trigger>
  )
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  render,
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close> & ComposableProps) {
  return (
    <DrawerPrimitive.Close
      data-slot="drawer-close"
      asChild={asChild || render !== undefined}
      {...props}
    >
      {render
        ? children === undefined
          ? render
          : React.cloneElement(render, undefined, children)
        : children}
    </DrawerPrimitive.Close>
  )
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-screen isolate bg-overlay-strong data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  dir = "rtl",
  lang = "fa",
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & {
  dir?: "ltr" | "rtl"
  lang?: string
}) {
  const direction = React.useContext(DrawerDirectionContext)

  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        data-direction={direction}
        dir={dir}
        lang={dir === "rtl" ? lang : undefined}
        className={cn(
          "group/drawer-content fixed z-50 flex h-auto flex-col bg-popover text-label text-popover-foreground shadow-lg",
          "data-[vaul-drawer-direction=bottom]:inset-x-2 data-[vaul-drawer-direction=bottom]:mx-auto data-[vaul-drawer-direction=bottom]:max-w-sm data-[vaul-drawer-direction=bottom]:bottom-2 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-xl data-[vaul-drawer-direction=bottom]:border data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=top]:inset-x-2 data-[vaul-drawer-direction=top]:mx-auto data-[vaul-drawer-direction=top]:max-w-sm data-[vaul-drawer-direction=top]:top-2 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-xl data-[vaul-drawer-direction=top]:border data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=left]:inset-y-2 data-[vaul-drawer-direction=left]:left-2 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:rounded-xl data-[vaul-drawer-direction=left]:border data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          "data-[vaul-drawer-direction=right]:inset-y-2 data-[vaul-drawer-direction=right]:right-2 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-xl data-[vaul-drawer-direction=right]:border data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-4 hidden h-1 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex shrink-0 flex-col gap-0.5 p-4 pb-0 text-center md:gap-0.5 md:text-start",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex shrink-0 flex-row items-center gap-2 p-4 pt-0 [&>*]:flex-1", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "cn-font-heading text-body font-normal text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-description text-balance text-muted-foreground", className)}
      {...props}
    />
  )
}

/** API parity with Base. Decorative handle; place it inside DrawerContent. */
function DrawerSwipeHandle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      className={cn("mx-auto mt-3 h-1 w-24 shrink-0 rounded-full bg-muted", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerSwipeHandle,
  DrawerDescription,
}
