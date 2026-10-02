"use client"

/*
  Cubix Tooltip - React Aria version.

  Built on TooltipTrigger + Tooltip: hover or keyboard focus on the trigger
  opens the tooltip. Persian-first, so it starts right-to-left and follows the
  closest dir on the page. Part names, side / align / sideOffset props and the
  look match the Base UI and Radix versions.
*/
import * as React from "react"
import {
  Button as AriaButton,
  Focusable,
  I18nProvider,
  OverlayArrow,
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
} from "react-aria-components"

import { buttonVariants } from "@/components/cubix/base/button"
import { cn } from "@/lib/utils"

type Dir = "ltr" | "rtl"
type Side = "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
type Align = "start" | "center" | "end"

const TooltipDirContext = React.createContext<{
  dir: Dir
  lang?: string
  report: (dir: Dir, lang?: string) => void
}>({ dir: "rtl", report: () => {} })

const TooltipDelayContext = React.createContext(0)

function TooltipProvider({ delay = 0, children }: { delay?: number; children?: React.ReactNode }) {
  return <TooltipDelayContext.Provider value={delay}>{children}</TooltipDelayContext.Provider>
}

function Tooltip({
  dir,
  delay,
  open,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof AriaTooltipTrigger>,
  "isOpen" | "defaultOpen" | "onOpenChange" | "children"
> & {
  dir?: Dir
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}) {
  const providerDelay = React.useContext(TooltipDelayContext)
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
      <I18nProvider locale={resolved === "rtl" ? "fa-IR" : "en-US"}>
        <AriaTooltipTrigger
          delay={delay ?? providerDelay}
          isOpen={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          {...props}
        >
          {children}
        </AriaTooltipTrigger>
      </I18nProvider>
    </TooltipDirContext.Provider>
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
  "aria-label"?: string
}

/*
  render={<Button variant="outline" />} styles the trigger as a Cubix Button
  (the same API as the Base UI trigger). render={<span />} makes the trigger a
  focusable wrapper, which is how a tooltip is shown on a disabled button.
*/
function TooltipTrigger({
  render,
  className,
  children,
  ref,
  ...props
}: {
  render?: React.ReactElement<TriggerRenderProps>
  className?: string
  children?: React.ReactNode
  ref?: React.Ref<HTMLElement>
} & Omit<React.ComponentProps<typeof AriaButton>, "className" | "children" | "ref" | "render">) {
  const { report } = React.useContext(TooltipDirContext)
  const nodeRef = React.useRef<HTMLElement | null>(null)
  const setRef = React.useCallback(
    (node: HTMLElement | null) => {
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

  const renderProps = React.isValidElement(render)
    ? (render.props as TriggerRenderProps & { className?: string })
    : undefined

  if (React.isValidElement(render) && typeof render.type === "string") {
    return (
      <Focusable>
        {
          React.cloneElement(
            render as React.ReactElement<Record<string, unknown>, string>,
            {
              ref: setRef,
              "data-slot": "tooltip-trigger",
              className: cn(renderProps?.className, className),
            },
            children
          ) as React.ReactElement<React.DOMAttributes<HTMLElement>, string>
        }
      </Focusable>
    )
  }

  return (
    <AriaButton
      ref={setRef as React.Ref<HTMLButtonElement>}
      data-slot="tooltip-trigger"
      aria-label={renderProps?.["aria-label"]}
      className={cn(
        renderProps
          ? buttonVariants({
              variant: renderProps.variant ?? "default",
              size: renderProps.size ?? "default",
            })
          : "outline-hidden select-none",
        renderProps?.className,
        className
      )}
      {...props}
    >
      {children}
    </AriaButton>
  )
}

type Placement = NonNullable<React.ComponentProps<typeof AriaTooltip>["placement"]>

function toPlacement(side: Side, align: Align): Placement {
  const base = side === "inline-start" ? "start" : side === "inline-end" ? "end" : side
  if (align === "center") return base as Placement
  if (base === "top" || base === "bottom") return `${base} ${align}` as Placement
  // Sides run along the vertical axis, so start / end alignment maps to top / bottom.
  return `${base} ${align === "end" ? "bottom" : "top"}` as Placement
}

/*
  alignOffset follows the Base UI / Radix meaning: a positive value moves the
  tooltip away from the aligned edge. React Aria's crossOffset is physical, so
  flip it when the aligned edge is on the right (or bottom).
*/
function toCrossOffset(alignOffset: number, side: Side, align: Align, dir: Dir) {
  if (align === "center" || alignOffset === 0) return alignOffset
  const vertical = side === "top" || side === "bottom"
  if (!vertical) return align === "end" ? -alignOffset : alignOffset
  const leftAligned = (align === "start") === (dir === "ltr")
  return leftAligned ? alignOffset : -alignOffset
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof AriaTooltip>,
  "className" | "placement" | "offset" | "crossOffset" | "children"
> & {
  className?: string
  side?: Side
  sideOffset?: number
  align?: Align
  alignOffset?: number
  children?: React.ReactNode
}) {
  const { dir, lang } = React.useContext(TooltipDirContext)

  return (
    <AriaTooltip
      data-slot="tooltip-content"
      dir={dir}
      lang={lang}
      placement={toPlacement(side, align)}
      offset={sideOffset}
      crossOffset={toCrossOffset(alignOffset, side, align, dir)}
      className={cn(
        "group/tooltip z-50 inline-flex w-fit max-w-xs origin-(--trigger-anchor-point,center) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-caption text-background outline-none has-data-[slot=kbd]:pe-1.5 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[entering]:animate-in data-[entering]:fade-in-0 data-[entering]:zoom-in-95 data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95",
        className
      )}
      {...props}
    >
      {children}
      <OverlayArrow className="absolute size-0 group-data-[placement=bottom]/tooltip:bottom-full group-data-[placement=left]/tooltip:left-full group-data-[placement=right]/tooltip:right-full group-data-[placement=top]/tooltip:top-full">
        <div className="absolute top-0 left-0 z-50 size-2.5 rotate-45 rounded-[2px] bg-foreground group-data-[placement=bottom]/tooltip:-translate-x-1/2 group-data-[placement=bottom]/tooltip:-translate-y-0.5 group-data-[placement=left]/tooltip:-translate-x-2 group-data-[placement=left]/tooltip:-translate-y-1/2 group-data-[placement=right]/tooltip:-translate-x-0.5 group-data-[placement=right]/tooltip:-translate-y-1/2 group-data-[placement=top]/tooltip:-translate-x-1/2 group-data-[placement=top]/tooltip:-translate-y-2" />
      </OverlayArrow>
    </AriaTooltip>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
