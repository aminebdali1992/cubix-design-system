"use client"

import type { ComponentProps, ReactElement, ReactNode } from "react"
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

import { buttonVariants } from "@/components/cubix/base/button"
import { cn } from "@/lib/utils"

function AlertDialog({ children, ...props }: DialogTriggerProps) {
  return (
    <DialogTrigger data-slot="alert-dialog" {...props}>
      {children}
    </DialogTrigger>
  )
}

type TriggerRenderProps = {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"
  className?: string
}

type AlertDialogTriggerProps = Omit<ButtonProps, "children" | "className" | "render"> & {
  render?: ReactElement<TriggerRenderProps>
  className?: string
  children?: ReactNode
}

function AlertDialogTrigger({
  render,
  className,
  children,
  ...props
}: AlertDialogTriggerProps) {
  return (
    <AriaButton
      data-slot="alert-dialog-trigger"
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

function AlertDialogPortal({ children }: { children?: ReactNode }) {
  return children
}

function AlertDialogOverlay({
  className,
  ...props
}: Omit<ModalOverlayProps, "className"> & { className?: string }) {
  return (
    <ModalOverlay
      data-slot="alert-dialog-overlay"
      isDismissable={false}
      className={cn(
        "fixed inset-0 isolate z-50 bg-overlay duration-100 supports-backdrop-filter:backdrop-blur-xs data-entering:animate-in data-entering:fade-in-0 data-exiting:animate-out data-exiting:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  children,
  ...props
}: Omit<ModalOverlayProps, "className" | "children"> & {
  className?: string
  size?: "default" | "sm"
  children?: ReactNode
}) {
  return (
    <AlertDialogOverlay>
      <Modal
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95",
          className
        )}
        {...props}
      >
        <Dialog role="alertdialog" className="contents">
          {children}
        </Dialog>
      </Modal>
    </AlertDialogOverlay>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-start sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogMedia({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: ComponentProps<typeof Heading>) {
  return (
    <Heading
      slot="title"
      data-slot="alert-dialog-title"
      className={cn(
        "cn-font-heading text-body font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-dialog-description"
      className={cn(
        "text-caption text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

type AlertDialogButtonProps = Omit<ButtonProps, "className" | "children" | "slot"> & {
  className?: string
  variant?: TriggerRenderProps["variant"]
  size?: TriggerRenderProps["size"]
  children?: ReactNode
}

function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: AlertDialogButtonProps) {
  return (
    <AriaButton
      slot="close"
      data-slot="alert-dialog-action"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </AriaButton>
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  children,
  ...props
}: AlertDialogButtonProps) {
  return (
    <AriaButton
      slot="close"
      data-slot="alert-dialog-cancel"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </AriaButton>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
