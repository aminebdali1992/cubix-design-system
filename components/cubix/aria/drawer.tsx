"use client"

/*
  Cubix Drawer - React Aria version.

  Persian-first modal drawer (no swipe/snap - solid Dialog/Sheet chrome).
  Defaults to dir="rtl" lang="fa" and direction="bottom".
  Header/Footer/Title/Description chrome matches shadcn Base Drawer.
*/
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useState,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react"
import {
  Button as AriaButton,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
  type ButtonProps,
  type DialogTriggerProps,
  type ModalOverlayProps,
} from "react-aria-components"

import { buttonVariants } from "@/components/cubix/aria/button"
import { cn } from "@/lib/utils"

type Direction = "top" | "right" | "bottom" | "left"
type SwipeDirection = "up" | "right" | "down" | "left"
type RegisterDescription = (id: string) => () => void

const swipeToDirection: Record<SwipeDirection, Direction> = {
  up: "top",
  down: "bottom",
  left: "left",
  right: "right",
}

const DrawerDescriptionContext = createContext<RegisterDescription | null>(null)
const DrawerDirectionContext = createContext<Direction>("bottom")

function CubixDrawer({
  children,
  open,
  defaultOpen,
  onOpenChange,
  direction,
  swipeDirection,
  showSwipeHandle: _showSwipeHandle,
  snapPoints: _snapPoints,
  modal: _modal,
  disablePointerDismissal: _disablePointerDismissal,
  ...props
}: Omit<DialogTriggerProps, "isOpen" | "defaultOpen" | "onOpenChange"> & {
  /** API parity with Base; React Aria has no swipe/snap, so these are ignored. */
  showSwipeHandle?: boolean
  snapPoints?: (number | string)[]
  modal?: boolean | "trap-focus"
  disablePointerDismissal?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  direction?: Direction
  /** Alias matching Base UI / shadcn. Maps up→top, down→bottom. */
  swipeDirection?: SwipeDirection
  children?: ReactNode
}) {
  const resolvedDirection: Direction =
    direction ?? (swipeDirection ? swipeToDirection[swipeDirection] : "bottom")

  return (
    <DrawerDirectionContext.Provider value={resolvedDirection}>
      <DialogTrigger
        data-slot="drawer"
        isOpen={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        {...props}
      >
        {children}
      </DialogTrigger>
    </DrawerDirectionContext.Provider>
  )
}

type TriggerRenderProps = {
  variant?:
    | "default"
    | "foreground"
    | "secondary"
    | "gray"
    | "destructive"
    | "destructive-secondary"
    | "outline"
    | "ghost"
    | "link"
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"
  className?: string
}

type DrawerTriggerButtonProps = Omit<ButtonProps, "children" | "className" | "render"> & {
  render?: ReactElement<TriggerRenderProps>
  className?: string
  children?: ReactNode
}

function CubixDrawerTrigger({ render, className, children, ...props }: DrawerTriggerButtonProps) {
  return (
    <AriaButton
      data-slot="drawer-trigger"
      className={cn(
        buttonVariants({
          variant: render?.props.variant ?? "outline",
          size: render?.props.size ?? "default",
        }),
        render?.props.className,
        className
      )}
      {...props}
    >
      {children}
    </AriaButton>
  )
}

function DrawerPortal({ children }: { children?: ReactNode }) {
  return children
}

function DrawerOverlay({
  className,
  ...props
}: Omit<ModalOverlayProps, "className"> & { className?: string }) {
  return (
    <ModalOverlay
      data-slot="drawer-overlay"
      isDismissable
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-screen isolate bg-overlay-strong duration-100 data-entering:animate-in data-entering:fade-in-0 data-exiting:animate-out data-exiting:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  dir = "rtl",
  lang = "fa",
  children,
  ...props
}: Omit<ModalOverlayProps, "className" | "children"> & {
  className?: string
  dir?: "ltr" | "rtl"
  lang?: string
  children?: ReactNode
}) {
  const direction = useContext(DrawerDirectionContext)
  const [descriptionId, setDescriptionId] = useState<string>()
  const registerDescription = useCallback<RegisterDescription>((id) => {
    setDescriptionId(id)
    return () => setDescriptionId((current) => (current === id ? undefined : current))
  }, [])

  return (
    <DrawerOverlay>
      <Modal
        data-slot="drawer-content"
        data-direction={direction}
        dir={dir}
        lang={dir === "rtl" ? lang : undefined}
        className={cn(
          "group fixed z-50 flex flex-col bg-popover bg-clip-padding text-label text-popover-foreground shadow-lg outline-none duration-100",
          "data-[direction=bottom]:inset-x-2 data-[direction=bottom]:mx-auto data-[direction=bottom]:max-w-sm data-[direction=bottom]:bottom-2 data-[direction=bottom]:w-auto data-[direction=bottom]:max-h-[80vh] data-[direction=bottom]:rounded-xl data-[direction=bottom]:border",
          "data-[direction=top]:inset-x-2 data-[direction=top]:mx-auto data-[direction=top]:max-w-sm data-[direction=top]:top-2 data-[direction=top]:w-auto data-[direction=top]:max-h-[80vh] data-[direction=top]:rounded-xl data-[direction=top]:border ",
          "data-[direction=left]:inset-y-2 data-[direction=left]:left-2 data-[direction=left]:h-auto data-[direction=left]:w-3/4 data-[direction=left]:border data-[direction=left]:sm:max-w-sm",
          "data-[direction=right]:inset-y-2 data-[direction=right]:right-2 data-[direction=right]:h-auto data-[direction=right]:w-3/4 data-[direction=right]:border data-[direction=right]:sm:max-w-sm",
          "data-entering:animate-in data-entering:fade-in-0 data-[direction=bottom]:data-entering:slide-in-from-bottom-10 data-[direction=top]:data-entering:slide-in-from-top-10 data-[direction=left]:data-entering:slide-in-from-left-10 data-[direction=right]:data-entering:slide-in-from-right-10",
          "data-exiting:animate-out data-exiting:fade-out-0 data-[direction=bottom]:data-exiting:slide-out-to-bottom-10 data-[direction=top]:data-exiting:slide-out-to-top-10 data-[direction=left]:data-exiting:slide-out-to-left-10 data-[direction=right]:data-exiting:slide-out-to-right-10",
          className
        )}
        {...props}
      >
        <Dialog role="dialog" aria-describedby={descriptionId} className="contents">
          <DrawerDescriptionContext.Provider value={registerDescription}>
            {children}
          </DrawerDescriptionContext.Provider>
        </Dialog>
      </Modal>
    </DrawerOverlay>
  )
}

function DrawerHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex shrink-0 flex-col gap-0.5 p-4 pb-0 text-start",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex shrink-0 flex-row items-center gap-2 p-4 pt-0 [&>*]:flex-1", className)}
      {...props}
    />
  )
}

type DrawerCloseProps = Omit<ButtonProps, "className" | "children" | "slot" | "render"> & {
  render?: ReactElement<TriggerRenderProps>
  className?: string
  children?: ReactNode
}

function DrawerClose({ render, className, children, ...props }: DrawerCloseProps) {
  return (
    <AriaButton
      slot="close"
      data-slot="drawer-close"
      className={cn(
        buttonVariants({
          variant: render?.props.variant ?? "outline",
          size: render?.props.size ?? "default",
        }),
        render?.props.className,
        className
      )}
      {...props}
    >
      {children}
    </AriaButton>
  )
}

function DrawerTitle({ className, ...props }: ComponentProps<typeof Heading>) {
  return (
    <Heading
      slot="title"
      data-slot="drawer-title"
      className={cn(
        "cn-font-heading text-body font-normal text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({ id, className, ...props }: ComponentProps<"p">) {
  const generatedId = useId()
  const descriptionId = id ?? generatedId
  const registerDescription = useContext(DrawerDescriptionContext)

  useLayoutEffect(() => registerDescription?.(descriptionId), [registerDescription, descriptionId])

  return (
    <p
      id={descriptionId}
      data-slot="drawer-description"
      className={cn("text-description text-balance text-muted-foreground", className)}
      {...props}
    />
  )
}

/** API parity with Base. Decorative handle; place it inside DrawerContent. */
function DrawerSwipeHandle({ className, ...props }: ComponentProps<"div">) {
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
  CubixDrawer as Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerSwipeHandle,
  CubixDrawerTrigger as DrawerTrigger,
}
