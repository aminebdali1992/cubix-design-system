"use client"

/*
  Cubix Dialog - React Aria version.

  Persian-first: the portaled panel defaults to dir="rtl" lang="fa" so the
  dialog follows Persian regardless of the portal position. Pass dir="ltr"
  on DialogContent to switch.
*/
import { XIcon } from "lucide-react"
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
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

/*
  React Aria only links a description to role="alertdialog". DialogDescription
  registers its id here so the dialog is described like the Base UI and Radix
  versions, and only while a description is actually rendered.
*/
type RegisterDescription = (id: string) => () => void

const DialogDescriptionContext = createContext<RegisterDescription | null>(null)

function CubixDialog({
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
      data-slot="dialog"
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

type DialogTriggerButtonProps = Omit<ButtonProps, "children" | "className" | "render"> & {
  render?: ReactElement<TriggerRenderProps>
  className?: string
  children?: ReactNode
}

function CubixDialogTrigger({ render, className, children, ...props }: DialogTriggerButtonProps) {
  return (
    <AriaButton
      data-slot="dialog-trigger"
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

function DialogPortal({ children }: { children?: ReactNode }) {
  return children
}

function DialogOverlay({
  className,
  ...props
}: Omit<ModalOverlayProps, "className"> & { className?: string }) {
  return (
    <ModalOverlay
      data-slot="dialog-overlay"
      isDismissable
      className={cn(
        "fixed inset-0 isolate z-50 bg-overlay duration-100 supports-backdrop-filter:backdrop-blur-xs data-entering:animate-in data-entering:fade-in-0 data-exiting:animate-out data-exiting:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  showCloseButton = true,
  dir = "rtl",
  lang = "fa",
  children,
  ...props
}: Omit<ModalOverlayProps, "className" | "children"> & {
  className?: string
  showCloseButton?: boolean
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
    <DialogOverlay>
      <Modal
        data-slot="dialog-content"
        dir={dir}
        lang={dir === "rtl" ? lang : undefined}
        className={cn(
          "group/dialog-content fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95",
          className
        )}
        {...props}
      >
        <Dialog role="dialog" aria-describedby={descriptionId} className="contents">
          <DialogDescriptionContext.Provider value={registerDescription}>
            {children}
          </DialogDescriptionContext.Provider>
          {showCloseButton ? (
            <AriaButton
              slot="close"
              data-slot="dialog-close"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-sm" }),
                "absolute top-2 end-2"
              )}
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </AriaButton>
          ) : null}
        </Dialog>
      </Modal>
    </DialogOverlay>
  )
}

function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-start", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

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
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 px-4 py-3 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton ? (
        <AriaButton
          slot="close"
          data-slot="dialog-close"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          Close
        </AriaButton>
      ) : null}
    </div>
  )
}

type DialogCloseProps = Omit<ButtonProps, "className" | "children" | "slot" | "render"> & {
  render?: ReactElement<TriggerRenderProps>
  className?: string
  children?: ReactNode
}

function DialogClose({ render, className, children, ...props }: DialogCloseProps) {
  return (
    <AriaButton
      slot="close"
      data-slot="dialog-close"
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

function DialogTitle({ className, ...props }: ComponentProps<typeof Heading>) {
  return (
    <Heading
      slot="title"
      data-slot="dialog-title"
      className={cn("cn-font-heading text-label font-medium", className)}
      {...props}
    />
  )
}

function DialogDescription({ id, className, ...props }: ComponentProps<"p">) {
  const generatedId = useId()
  const descriptionId = id ?? generatedId
  const registerDescription = useContext(DialogDescriptionContext)

  useLayoutEffect(() => registerDescription?.(descriptionId), [registerDescription, descriptionId])

  return (
    <p
      id={descriptionId}
      data-slot="dialog-description"
      className={cn(
        "text-label text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  CubixDialog as Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  CubixDialogTrigger as DialogTrigger,
}
