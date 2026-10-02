"use client"

/*
  Cubix Popover - Base UI version.

  Persian-first: popovers start right-to-left. The trigger reports the closest
  dir on the page and the portaled content shares it. An explicit dir prop on
  Popover always wins. Opening does not steal focus into the panel (matches
  Radix / React Aria Cubix wrappers); users can still tab into interactive
  content.
*/
import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { cn } from "@/lib/utils"

type Dir = "ltr" | "rtl"

const PopoverDirContext = React.createContext<{
  dir: Dir
  lang?: string
  report: (dir: Dir, lang?: string) => void
}>({ dir: "rtl", report: () => {} })

function Popover({ dir, ...props }: PopoverPrimitive.Root.Props & { dir?: Dir }) {
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
      <DirectionProvider direction={resolved}>
        <PopoverPrimitive.Root data-slot="popover" {...props} />
      </DirectionProvider>
    </PopoverDirContext.Provider>
  )
}

function PopoverTrigger({ ref, ...props }: PopoverPrimitive.Trigger.Props) {
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

  return <PopoverPrimitive.Trigger ref={setRef} data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  const { dir, lang } = React.useContext(PopoverDirContext)

  /*
    Base UI treats align physically (start = left edge), but Cubix keeps the
    logical Persian meaning: in RTL, ابتدا is the right edge. Swap start/end
    and flip alignOffset so it still moves away from the aligned edge.
  */
  const flipAlign = dir === "rtl" && align !== "center"
  const logicalAlign = flipAlign ? (align === "start" ? "end" : "start") : align
  const logicalAlignOffset = flipAlign ? -alignOffset : alignOffset
  const resolvedLang = lang ?? (dir === "rtl" ? "fa" : undefined)

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={logicalAlign}
        alignOffset={logicalAlignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          dir={dir}
          lang={resolvedLang}
          initialFocus={false}
          className={cn(
            "z-50 flex w-60 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-label text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverClose({ ...props }: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />
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

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-medium text-label", className)}
      {...props}
    />
  )
}

function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
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
