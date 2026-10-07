"use client"

/*
  Cubix Hover Card - Base UI version (PreviewCard).

  Persian-first: the portaled card defaults to dir="rtl" lang="fa" and
  follows the closest dir on the page unless dir is set on HoverCard.
  openDelay / closeDelay live on HoverCard (same API as Radix / React Aria).
  Surface and animation match Cubix Popover.
*/
import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"

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

const HoverCardDelayContext = React.createContext<{ openDelay: number; closeDelay: number }>({
  openDelay: 600,
  closeDelay: 300,
})

function HoverCard({
  dir,
  openDelay = 600,
  closeDelay = 300,
  ...props
}: PreviewCardPrimitive.Root.Props & { dir?: Dir; openDelay?: number; closeDelay?: number }) {
  const value = useDirState(dir)
  const delays = React.useMemo(() => ({ openDelay, closeDelay }), [openDelay, closeDelay])

  return (
    <HoverCardDirContext.Provider value={value}>
      <HoverCardDelayContext.Provider value={delays}>
        <DirectionProvider direction={value.dir}>
          <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
        </DirectionProvider>
      </HoverCardDelayContext.Provider>
    </HoverCardDirContext.Provider>
  )
}

function HoverCardTrigger({ ref, ...props }: PreviewCardPrimitive.Trigger.Props) {
  const { openDelay, closeDelay } = React.useContext(HoverCardDelayContext)
  const [nodeRef, setRef] = useMergedRef<HTMLAnchorElement>(ref as React.Ref<HTMLAnchorElement>)
  useReportDir(nodeRef)

  return (
    <PreviewCardPrimitive.Trigger
      ref={setRef}
      data-slot="hover-card-trigger"
      delay={openDelay}
      closeDelay={closeDelay}
      {...props}
    />
  )
}

function HoverCardContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<PreviewCardPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  const { dir, lang } = React.useContext(HoverCardDirContext)
  /* Keep align logical like Cubix Popover: in RTL, start is the right edge. */
  const flipAlign = dir === "rtl" && align !== "center"
  const logicalAlign = flipAlign ? (align === "start" ? "end" : "start") : align
  const logicalAlignOffset = flipAlign ? -alignOffset : alignOffset
  const resolvedLang = lang ?? (dir === "rtl" ? "fa" : undefined)

  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={logicalAlign}
        alignOffset={logicalAlignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          dir={dir}
          lang={resolvedLang}
          className={cn(
            "z-50 flex w-64 flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-description text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 origin-(--transform-origin) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardContent, HoverCardTrigger }
