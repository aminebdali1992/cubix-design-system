"use client"

/*
  Cubix Popover - Radix UI version.

  Persian-first: popovers start right-to-left. The trigger reports the closest
  dir on the page and the portaled content shares it. An explicit dir prop on
  Popover always wins. Opening does not steal focus into the panel; users can
  still tab into interactive content.
*/
import * as React from "react"
import { cn } from "@/lib/utils"
import { Direction, Popover as PopoverPrimitive } from "radix-ui"

type Dir = "ltr" | "rtl"

const PopoverDirContext = React.createContext<{
  dir: Dir
  lang?: string
  report: (dir: Dir, lang?: string) => void
}>({ dir: "rtl", report: () => {} })

function Popover({
  dir,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root> & { dir?: Dir }) {
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
      <Direction.Provider dir={resolved}>
        <PopoverPrimitive.Root data-slot="popover" {...props} />
      </Direction.Provider>
    </PopoverDirContext.Provider>
  )
}

/*
  render={<Button variant="outline" />} composes the trigger or close with
  another element, the same API as the Base UI and React Aria versions.
  asChild works as well.
*/
type ComposableProps = {
  render?: React.ReactElement<Record<string, unknown>>
}

function PopoverTrigger({
  ref,
  render,
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger> & ComposableProps) {
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
    <PopoverPrimitive.Trigger
      ref={setRef}
      data-slot="popover-trigger"
      asChild={asChild || render !== undefined}
      {...props}
    >
      {render
        ? children === undefined
          ? render
          : React.cloneElement(render, undefined, children)
        : children}
    </PopoverPrimitive.Trigger>
  )
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  const { dir, lang } = React.useContext(PopoverDirContext)
  const resolvedLang = lang ?? (dir === "rtl" ? "fa" : undefined)

  /*
    Radix positions via floating-ui, which reads the floating element's
    computed direction: with dir on the content, align/alignOffset become
    logical on their own (ابتدا = right edge in RTL). No manual swap.
  */
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        dir={dir}
        lang={resolvedLang}
        align={align}
        sideOffset={sideOffset}
        onOpenAutoFocus={(event) => event.preventDefault()}
        className={cn(
          "z-50 flex w-60 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-label text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverClose({
  render,
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Close> & ComposableProps) {
  return (
    <PopoverPrimitive.Close
      data-slot="popover-close"
      asChild={asChild || render !== undefined}
      {...props}
    >
      {render
        ? children === undefined
          ? render
          : React.cloneElement(render, undefined, children)
        : children}
    </PopoverPrimitive.Close>
  )
}

function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
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

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2 data-slot="popover-title" className={cn("font-medium text-label", className)} {...props} />
  )
}

function PopoverDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-label text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
