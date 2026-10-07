"use client"

import * as React from "react"

const SheetChromeContext = React.createContext({ showCloseButton: true })
/*
  Cubix Sheet - React Aria version.

  Persian-first: the portaled panel defaults to dir="rtl" lang="fa" so the
  sheet follows Persian regardless of the portal position. Pass dir="ltr"
  on SheetContent to switch.
*/
import { XIcon } from "lucide-react"
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

type RegisterDescription = (id: string) => () => void

const SheetDescriptionContext = createContext<RegisterDescription | null>(null)

function CubixSheet({
  children,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: Omit<DialogTriggerProps, "isOpen" | "defaultOpen" | "onOpenChange"> & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
}) {
  return (
    <DialogTrigger
      data-slot="sheet"
      isOpen={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
    </DialogTrigger>
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

type SheetTriggerButtonProps = Omit<ButtonProps, "children" | "className" | "render"> & {
  render?: ReactElement<TriggerRenderProps>
  className?: string
  children?: ReactNode
}

function CubixSheetTrigger({ render, className, children, ...props }: SheetTriggerButtonProps) {
  return (
    <AriaButton
      data-slot="sheet-trigger"
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

function SheetPortal({ children }: { children?: ReactNode }) {
  return children
}

function SheetOverlay({
  className,
  ...props
}: Omit<ModalOverlayProps, "className"> & { className?: string }) {
  return (
    <ModalOverlay
      data-slot="sheet-overlay"
      isDismissable
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-screen isolate bg-overlay-strong duration-100 data-entering:animate-in data-entering:fade-in-0 data-exiting:animate-out data-exiting:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  showCloseButton = true,
  side = "right",
  dir = "rtl",
  lang = "fa",
  children,
  ...props
}: Omit<ModalOverlayProps, "className" | "children"> & {
  className?: string
  showCloseButton?: boolean
  side?: "top" | "right" | "bottom" | "left"
  dir?: "ltr" | "rtl"
  lang?: string
  children?: ReactNode
}) {
  const [descriptionId, setDescriptionId] = useState<string>()
  const registerDescription = useCallback<RegisterDescription>((id) => {
    setDescriptionId(id)
    return () => setDescriptionId((current) => (current === id ? undefined : current))
  }, [])

  return (
    <SheetOverlay>
      <Modal
        data-slot="sheet-content"
        data-side={side}
        dir={dir}
        lang={dir === "rtl" ? lang : undefined}
        className={cn(
          "group fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-label text-popover-foreground shadow-lg outline-none duration-100 data-[side=bottom]:inset-x-0 data-[side=bottom]:w-screen data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:mr-[calc(100%-100vw)] data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:w-screen data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-entering:animate-in data-entering:fade-in-0 data-[side=bottom]:data-entering:slide-in-from-bottom-10 data-[side=left]:data-entering:slide-in-from-left-10 data-[side=right]:data-entering:slide-in-from-right-10 data-[side=top]:data-entering:slide-in-from-top-10 data-exiting:animate-out data-exiting:fade-out-0 data-[side=bottom]:data-exiting:slide-out-to-bottom-10 data-[side=left]:data-exiting:slide-out-to-left-10 data-[side=right]:data-exiting:slide-out-to-right-10 data-[side=top]:data-exiting:slide-out-to-top-10",
          className
        )}
        {...props}
      >
        <Dialog role="dialog" aria-describedby={descriptionId} className="contents">
          <SheetDescriptionContext.Provider value={registerDescription}>
            <SheetChromeContext.Provider value={{ showCloseButton }}>
          {children}
        </SheetChromeContext.Provider>
          </SheetDescriptionContext.Provider>
          
        </Dialog>
      </Modal>
    </SheetOverlay>
  )
}

function SheetHeader({ className, children, ...props }: ComponentProps<"div">) {
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
            <AriaButton
              slot="close"
              data-slot="sheet-close"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-sm" }),
                "shrink-0"
              )}
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </AriaButton>
          ) : null}
    </div>
  )
}

function SheetFooter({ className, ...props }: ComponentProps<"div">) {
  const ref = React.useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
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

type SheetCloseProps = Omit<ButtonProps, "className" | "children" | "slot" | "render"> & {
  render?: ReactElement<TriggerRenderProps>
  className?: string
  children?: ReactNode
}

function SheetClose({ render, className, children, ...props }: SheetCloseProps) {
  return (
    <AriaButton
      slot="close"
      data-slot="sheet-close"
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

function SheetTitle({ className, ...props }: ComponentProps<typeof Heading>) {
  return (
    <Heading
      slot="title"
      data-slot="sheet-title"
      className={cn("cn-font-heading text-body font-normal", className)}
      {...props}
    />
  )
}

function SheetDescription({ id, className, ...props }: ComponentProps<"p">) {
  const generatedId = useId()
  const descriptionId = id ?? generatedId
  const registerDescription = useContext(SheetDescriptionContext)

  useLayoutEffect(() => registerDescription?.(descriptionId), [registerDescription, descriptionId])

  return (
    <p
      id={descriptionId}
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
  CubixSheet as Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  CubixSheetTrigger as SheetTrigger,
}
