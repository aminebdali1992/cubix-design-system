"use client"

/*
  Cubix Popover - React Aria version.

  React Aria has no PopoverTrigger primitive: the official pattern wraps a
  Button + Popover in a DialogTrigger, which owns the overlay state via
  OverlayTriggerStateContext. We mirror the Base UI / Radix API on top of it:
  Popover (state root) → PopoverTrigger → PopoverContent → PopoverClose.
  Persian-first: the portaled panel follows the closest page dir (default RTL)
  unless an explicit dir is set on Popover. Opening does not steal focus into
  the panel (isNonModal); users can still tab into interactive content.
*/
import * as React from "react"
import {
  Button as AriaButton,
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Heading as AriaHeading,
  I18nProvider,
  Popover as AriaPopover,
  Text as AriaText,
  type ButtonProps,
  type DialogTriggerProps,
} from "react-aria-components"

import { buttonVariants } from "@/components/cubix/aria/button"
import { cn } from "@/lib/utils"

type Dir = "ltr" | "rtl"
type Side = "top" | "right" | "bottom" | "left"
type Align = "start" | "center" | "end"
type Placement = NonNullable<React.ComponentProps<typeof AriaPopover>["placement"]>

const PopoverDirContext = React.createContext<{
  dir: Dir
  lang?: string
  report: (dir: Dir, lang?: string) => void
}>({ dir: "rtl", report: () => {} })

function toPlacement(side: Side, align: Align): Placement {
  if (align === "center") return side as Placement
  return `${side} ${align}` as Placement
}

/*
  alignOffset follows the Base UI / Radix meaning: a positive value moves the
  panel away from the aligned edge. React Aria's crossOffset is physical, so
  flip it when the aligned edge is on the right (or bottom) for vertical sides.
*/
function toCrossOffset(alignOffset: number, side: Side, align: Align, dir: Dir) {
  if (align === "center" || alignOffset === 0) return alignOffset
  const vertical = side === "top" || side === "bottom"
  if (!vertical) return align === "end" ? -alignOffset : alignOffset
  const leftAligned = (align === "start") === (dir === "ltr")
  return leftAligned ? alignOffset : -alignOffset
}

function Popover({
  dir,
  open,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: Omit<DialogTriggerProps, "isOpen" | "defaultOpen" | "onOpenChange"> & {
  dir?: Dir
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}) {
  const [pageDir, setPageDir] = React.useState<Dir>("rtl")
  const [pageLang, setPageLang] = React.useState<string | undefined>()
  const report = React.useCallback((d: Dir, l?: string) => {
    setPageDir(d)
    setPageLang(l)
  }, [])
  const resolved = dir ?? pageDir
  const value = React.useMemo(
    () => ({ dir: resolved, lang: pageLang, report }),
    [resolved, pageLang, report]
  )

  return (
    <PopoverDirContext.Provider value={value}>
      <I18nProvider locale={resolved === "rtl" ? "fa-IR" : "en-US"}>
        <AriaDialogTrigger
          data-slot="popover"
          isOpen={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          {...props}
        >
          {children}
        </AriaDialogTrigger>
      </I18nProvider>
    </PopoverDirContext.Provider>
  )
}

type TriggerRenderProps = {
  variant?:
    | "default"
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

type PopoverTriggerButtonProps = Omit<ButtonProps, "children" | "className" | "render"> & {
  render?: React.ReactElement<TriggerRenderProps>
  className?: string
  children?: React.ReactNode
}

function PopoverTrigger({
  render,
  className,
  children,
  ref,
  ...props
}: PopoverTriggerButtonProps & {
  ref?: React.Ref<HTMLButtonElement>
}) {
  const { report } = React.useContext(PopoverDirContext)
  const nodeRef = React.useRef<HTMLElement | null>(null)
  const setRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      nodeRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  React.useLayoutEffect(() => {
    const parent = nodeRef.current?.parentElement
    const closest = parent?.closest("[dir]")?.getAttribute("dir")
    const lang = parent?.closest("[lang]")?.getAttribute("lang") ?? undefined
    if (closest === "ltr" || closest === "rtl") report(closest, lang)
  }, [report])

  return (
    <AriaButton
      ref={setRef}
      data-slot="popover-trigger"
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

function PopoverContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 4,
  alignOffset = 0,
  dir: dirProp,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof AriaPopover>,
  "className" | "children" | "placement" | "offset" | "crossOffset"
> & {
  className?: string
  side?: Side
  align?: Align
  sideOffset?: number
  alignOffset?: number
  dir?: Dir
  children?: React.ReactNode
}) {
  const { dir: contextDir, lang } = React.useContext(PopoverDirContext)
  const dir = dirProp ?? contextDir
  const resolvedLang = lang ?? (dir === "rtl" ? "fa" : undefined)
  const placement = toPlacement(side, align)
  const crossOffset = toCrossOffset(alignOffset, side, align, dir)

  return (
    <AriaPopover
      data-slot="popover-content"
      isNonModal
      placement={placement}
      offset={sideOffset}
      crossOffset={crossOffset}
      className={cn(
        "z-50 origin-(--trigger-anchor-point) rounded-lg bg-popover p-2.5 text-label text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden entering:animate-in entering:fade-in-0 entering:zoom-in-95 exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95 placement-bottom:slide-in-from-top-2 placement-inline-end:slide-in-from-left-2 placement-inline-start:slide-in-from-right-2 placement-left:slide-in-from-right-2 placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      <AriaDialog
        dir={dir}
        lang={resolvedLang}
        className="flex w-60 flex-col gap-2.5 text-label outline-hidden"
      >
        {children}
      </AriaDialog>
    </AriaPopover>
  )
}

type CloseRenderProps = TriggerRenderProps

type PopoverCloseProps = Omit<ButtonProps, "children" | "className" | "slot" | "render"> & {
  render?: React.ReactElement<CloseRenderProps>
  className?: string
  children?: React.ReactNode
}

function PopoverClose({ render, className, children, ...props }: PopoverCloseProps) {
  return (
    <AriaButton
      slot="close"
      data-slot="popover-close"
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

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-label", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: React.ComponentProps<typeof AriaHeading>) {
  return (
    <AriaHeading
      slot="title"
      data-slot="popover-title"
      className={cn("font-medium text-label", className)}
      {...props}
    />
  )
}

function PopoverDescription({ className, ...props }: React.ComponentProps<typeof AriaText>) {
  return (
    <AriaText
      slot="description"
      data-slot="popover-description"
      className={cn("text-label text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
