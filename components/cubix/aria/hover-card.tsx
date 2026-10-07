"use client"

/*
  Cubix Hover Card - React Aria version.

  React Aria has no hover card primitive (Tooltip cannot hold interactive
  content), so this pairs hover/focus intent timers with a standalone
  non-modal Popover anchored via triggerRef. API mirrors the Base UI / Radix
  Cubix wrappers: HoverCard (openDelay / closeDelay) → HoverCardTrigger →
  HoverCardContent. Persian-first: the card defaults to dir="rtl" lang="fa".
  Surface and animation match Cubix Popover.
*/
import * as React from "react"
import { I18nProvider, Popover as AriaPopover } from "react-aria-components"

import { cn } from "@/lib/utils"

type Dir = "ltr" | "rtl"

const HoverCardDirContext = React.createContext<{
  dir: Dir
  lang?: string
  report: (dir: Dir, lang?: string) => void
}>({ dir: "rtl", report: () => {} })

function useDirState(dir?: Dir) {
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
  return value
}

function useReportDir(nodeRef: React.RefObject<HTMLElement | null>) {
  const { report } = React.useContext(HoverCardDirContext)
  React.useLayoutEffect(() => {
    const parent = nodeRef.current?.parentElement
    const closest = parent?.closest("[dir]")?.getAttribute("dir")
    const lang = parent?.closest("[lang]")?.getAttribute("lang") ?? undefined
    if (closest === "ltr" || closest === "rtl") report(closest, lang)
  }, [nodeRef, report])
}

function useMergedRef<T extends HTMLElement>(ref: React.Ref<T> | undefined) {
  const nodeRef = React.useRef<T | null>(null)
  const setRef = React.useCallback(
    (node: T | null) => {
      nodeRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )
  return [nodeRef, setRef] as const
}

type Side = "top" | "right" | "bottom" | "left"
type Align = "start" | "center" | "end"
type Placement = NonNullable<React.ComponentProps<typeof AriaPopover>["placement"]>

const HoverCardStateContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  schedule: (open: boolean) => void
  cancel: () => void
  triggerRef: React.RefObject<HTMLElement | null>
} | null>(null)

function useHoverCardState() {
  const ctx = React.useContext(HoverCardStateContext)
  if (!ctx) throw new Error("HoverCard parts must be used within <HoverCard>.")
  return ctx
}

function toPlacement(side: Side, align: Align): Placement {
  if (align === "center") return side as Placement
  return `${side} ${align}` as Placement
}

function toCrossOffset(alignOffset: number, side: Side, align: Align, dir: Dir) {
  if (align === "center" || alignOffset === 0) return alignOffset
  const vertical = side === "top" || side === "bottom"
  if (!vertical) return align === "end" ? -alignOffset : alignOffset
  const leftAligned = (align === "start") === (dir === "ltr")
  return leftAligned ? alignOffset : -alignOffset
}

function HoverCard({
  dir,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  openDelay = 600,
  closeDelay = 300,
  children,
}: {
  dir?: Dir
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  openDelay?: number
  closeDelay?: number
  children?: React.ReactNode
}) {
  const dirValue = useDirState(dir)
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolled
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) setUncontrolled(next)
      onOpenChange?.(next)
    },
    [openProp, onOpenChange]
  )
  const cancel = React.useCallback(() => clearTimeout(timer.current), [])
  const schedule = React.useCallback(
    (next: boolean) => {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setOpen(next), next ? openDelay : closeDelay)
    },
    [setOpen, openDelay, closeDelay]
  )
  React.useEffect(() => () => clearTimeout(timer.current), [])

  const state = React.useMemo(
    () => ({ open, setOpen, schedule, cancel, triggerRef }),
    [open, setOpen, schedule, cancel]
  )

  return (
    <HoverCardDirContext.Provider value={dirValue}>
      <HoverCardStateContext.Provider value={state}>
        <I18nProvider locale={dirValue.dir === "rtl" ? "fa-IR" : "en-US"}>{children}</I18nProvider>
      </HoverCardStateContext.Provider>
    </HoverCardDirContext.Provider>
  )
}

type HoverCardTriggerProps = React.ComponentProps<"a"> & {
  render?: React.ReactElement<Record<string, unknown>>
}

function HoverCardTrigger({ ref, render, className, children, ...props }: HoverCardTriggerProps) {
  const { open, schedule, triggerRef } = useHoverCardState()
  const [nodeRef, setRef] = useMergedRef<HTMLAnchorElement>(ref)
  useReportDir(nodeRef)
  const mergedRef = React.useCallback(
    (node: HTMLAnchorElement | null) => {
      setRef(node)
      triggerRef.current = node
    },
    [setRef, triggerRef]
  )

  const triggerProps = {
    ...props,
    ref: mergedRef,
    "data-slot": "hover-card-trigger",
    "data-popup-open": open ? "" : undefined,
    onPointerEnter: (event: React.PointerEvent<HTMLAnchorElement>) => {
      props.onPointerEnter?.(event)
      if (event.pointerType !== "touch") schedule(true)
    },
    onPointerLeave: (event: React.PointerEvent<HTMLAnchorElement>) => {
      props.onPointerLeave?.(event)
      schedule(false)
    },
    onFocus: (event: React.FocusEvent<HTMLAnchorElement>) => {
      props.onFocus?.(event)
      schedule(true)
    },
    onBlur: (event: React.FocusEvent<HTMLAnchorElement>) => {
      props.onBlur?.(event)
      schedule(false)
    },
  }

  if (render) {
    return React.cloneElement(
      render,
      { ...triggerProps, className: cn(render.props.className as string | undefined, className) },
      children === undefined ? (render.props.children as React.ReactNode) : children
    )
  }

  return (
    <a className={className} {...triggerProps}>
      {children}
    </a>
  )
}

function HoverCardContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  dir: dirProp,
  children,
}: {
  className?: string
  side?: Side
  align?: Align
  sideOffset?: number
  alignOffset?: number
  dir?: Dir
  children?: React.ReactNode
}) {
  const { open, setOpen, schedule, cancel, triggerRef } = useHoverCardState()
  const { dir: contextDir, lang } = React.useContext(HoverCardDirContext)
  const dir = dirProp ?? contextDir
  const resolvedLang = lang ?? (dir === "rtl" ? "fa" : undefined)

  return (
    <AriaPopover
      data-slot="hover-card-content"
      triggerRef={triggerRef}
      isOpen={open}
      onOpenChange={setOpen}
      isNonModal
      placement={toPlacement(side, align)}
      offset={sideOffset}
      crossOffset={toCrossOffset(alignOffset, side, align, dir)}
      className={cn(
        "z-50 flex w-64 flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-description text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 origin-(--trigger-anchor-point) entering:animate-in entering:fade-in-0 entering:zoom-in-95 exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95 placement-bottom:slide-in-from-top-2 placement-left:slide-in-from-right-2 placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2",
        className
      )}
    >
      <div
        dir={dir}
        lang={resolvedLang}
        onPointerEnter={cancel}
        onPointerLeave={() => schedule(false)}
        className="-m-2.5 flex flex-col gap-2.5 p-2.5 outline-hidden"
      >
        {children}
      </div>
    </AriaPopover>
  )
}

export { HoverCard, HoverCardContent, HoverCardTrigger }
