"use client"

/*
  Cubix Hover Card - Radix UI version.

  Persian-first: the portaled card defaults to dir="rtl" lang="fa" and
  follows the closest dir on the page unless dir is set on HoverCard.
  Trigger and content accept render (like Base UI) as well as asChild.
  Surface and animation match Cubix Popover.
*/
import * as React from "react"
import { Direction, HoverCard as HoverCardPrimitive } from "radix-ui"

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

type ComposableProps = {
  render?: React.ReactElement<Record<string, unknown>>
}

function HoverCard({
  dir,
  openDelay = 600,
  closeDelay = 300,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root> & { dir?: Dir }) {
  const value = useDirState(dir)

  return (
    <HoverCardDirContext.Provider value={value}>
      <Direction.Provider dir={value.dir}>
        <HoverCardPrimitive.Root
          data-slot="hover-card"
          openDelay={openDelay}
          closeDelay={closeDelay}
          {...props}
        />
      </Direction.Provider>
    </HoverCardDirContext.Provider>
  )
}

function HoverCardTrigger({
  ref,
  render,
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger> & ComposableProps) {
  const [nodeRef, setRef] = useMergedRef<HTMLAnchorElement>(ref)
  useReportDir(nodeRef)

  return (
    <HoverCardPrimitive.Trigger
      ref={setRef}
      data-slot="hover-card-trigger"
      asChild={asChild || render !== undefined}
      {...props}
    >
      {render
        ? children === undefined
          ? render
          : React.cloneElement(render, undefined, children)
        : children}
    </HoverCardPrimitive.Trigger>
  )
}

function HoverCardContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  const { dir, lang } = React.useContext(HoverCardDirContext)
  const resolvedLang = lang ?? (dir === "rtl" ? "fa" : undefined)

  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        dir={dir}
        lang={resolvedLang}
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className={cn(
          "z-50 flex w-64 flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-description text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 origin-(--radix-hover-card-content-transform-origin) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardContent, HoverCardTrigger }
