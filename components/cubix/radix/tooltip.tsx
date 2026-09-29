"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Direction, Tooltip as TooltipPrimitive } from "radix-ui"

type Dir = "ltr" | "rtl"
type PhysicalSide = "top" | "right" | "bottom" | "left"
type Side = PhysicalSide | "inline-start" | "inline-end"

/*
  Cubix is Persian-first, so tooltips start right-to-left. The trigger reports
  the closest dir on the page and the portaled content shares it. An explicit
  dir prop on Tooltip always wins. Radix sides are physical, so inline-start
  and inline-end (and start / end alignment) are mapped from the direction.
*/
const TooltipDirContext = React.createContext<{
  dir: Dir
  lang?: string
  report: (dir: Dir, lang?: string) => void
}>({ dir: "rtl", report: () => {} })

const TooltipDelayContext = React.createContext(0)

function TooltipProvider({
  delayDuration = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipDelayContext.Provider value={delayDuration}>
      <TooltipPrimitive.Provider
        data-slot="tooltip-provider"
        delayDuration={delayDuration}
        {...props}
      >
        {children}
      </TooltipPrimitive.Provider>
    </TooltipDelayContext.Provider>
  )
}

function Tooltip({
  dir,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root> & { dir?: Dir }) {
  const delay = React.useContext(TooltipDelayContext)
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
    <TooltipDirContext.Provider value={value}>
      <Direction.Provider dir={resolved}>
        <TooltipPrimitive.Provider delayDuration={delay}>
          <TooltipPrimitive.Root data-slot="tooltip" {...props} />
        </TooltipPrimitive.Provider>
      </Direction.Provider>
    </TooltipDirContext.Provider>
  )
}

function TooltipTrigger({
  ref,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const { report } = React.useContext(TooltipDirContext)
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
    <TooltipPrimitive.Trigger
      ref={setRef}
      data-slot="tooltip-trigger"
      {...props}
    />
  )
}

function toPhysicalSide(side: Side, dir: Dir): PhysicalSide {
  if (side === "inline-start") return dir === "rtl" ? "right" : "left"
  if (side === "inline-end") return dir === "rtl" ? "left" : "right"
  return side
}

function TooltipContent({
  className,
  side = "top",
  align = "center",
  sideOffset = 0,
  children,
  ...props
}: Omit<React.ComponentProps<typeof TooltipPrimitive.Content>, "side"> & {
  side?: Side
}) {
  const { dir, lang } = React.useContext(TooltipDirContext)
  const physicalSide = toPhysicalSide(side, dir)
  const vertical = physicalSide === "top" || physicalSide === "bottom"
  const physicalAlign =
    vertical && dir === "rtl" && align !== "center"
      ? align === "start"
        ? "end"
        : "start"
      : align

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        dir={dir}
        lang={lang}
        side={physicalSide}
        align={physicalAlign}
        sideOffset={sideOffset}
        className={cn(
          "z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-caption text-background has-data-[slot=kbd]:pe-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }