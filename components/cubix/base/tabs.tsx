"use client"

import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/*
  Cubix is Persian-first, so Tabs start right-to-left and then follow the
  closest dir on the page. An explicit dir prop wins.
*/
function usePageDir(dir?: "ltr" | "rtl") {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [pageDir, setPageDir] = React.useState<"ltr" | "rtl">("rtl")

  React.useLayoutEffect(() => {
    const closest = ref.current?.parentElement?.closest("[dir]")?.getAttribute("dir")
    if (closest === "ltr" || closest === "rtl") {
      setPageDir(closest)
    }
  }, [])

  return { ref, dir: dir ?? pageDir }
}
function Tabs({
  className,
  orientation = "horizontal",
  dir,
  ...props
}: TabsPrimitive.Root.Props & { dir?: "ltr" | "rtl" }) {
  const { ref, dir: resolvedDir } = usePageDir(dir)

  return (
    <DirectionProvider direction={resolvedDir}>
      <TabsPrimitive.Root
        ref={ref}
        dir={resolvedDir}
        data-slot="tabs"
        data-orientation={orientation}
        orientation={orientation}
        className={cn("group/tabs flex gap-2 data-horizontal:flex-col", className)}
        {...props}
      />
    </DirectionProvider>
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-fit group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "line",
    },
  }
)

function TabsList({
  className,
  variant = "line",
  activateOnFocus = true,
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      activateOnFocus={activateOnFocus}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsRemoveIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
    </svg>
  )
}

/*
  Removing the focused tab would drop focus to the page body. Move it to the
  next enabled tab first, or to the previous one when removing the last.
*/
function focusSiblingTab(tab: HTMLElement) {
  const list = tab.closest("[data-slot=tabs-list]")
  if (!list) return
  const tabs = Array.from(
    list.querySelectorAll<HTMLElement>(
      "[data-slot=tabs-trigger]:not(:disabled):not([data-disabled]):not([aria-disabled=true])"
    )
  )
  const index = tabs.indexOf(tab)
  const sibling = tabs[index + 1] ?? tabs[index - 1]
  sibling?.focus()
}

/*
  A tab is already a button, and its children are presentational to
  assistive technology, so the remove control is a pointer-only span hidden
  from it. Keyboard and screen reader users remove the focused tab with
  Delete or Backspace, announced through aria-keyshortcuts on the tab.
*/
function TabsRemove({ onRemove }: { onRemove: () => void }) {
  return (
    <span
      aria-hidden="true"
      data-slot="tabs-remove"
      onPointerDown={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation()
        const tab = event.currentTarget.closest<HTMLElement>("[data-slot=tabs-trigger]")
        if (tab && tab === document.activeElement) {
          focusSiblingTab(tab)
        }
        onRemove()
      }}
      className="inline-flex size-5 shrink-0 cursor-default items-center justify-center rounded-full opacity-70 transition-opacity duration-200 ease-out hover:opacity-100"
    >
      <TabsRemoveIcon className="size-4" />
    </span>
  )
}

function TabsTrigger({
  className,
  children,
  onRemove,
  onKeyDown,
  ...props
}: TabsPrimitive.Tab.Props & { onRemove?: () => void }) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-label font-normal whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pe-1 has-data-[icon=inline-start]:ps-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[22px]",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-primary dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-primary",
        "after:absolute after:bg-primary after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-start-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      aria-keyshortcuts={onRemove ? "Delete Backspace" : undefined}
      {...props}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (!onRemove || event.defaultPrevented) return
        if (event.key !== "Delete" && event.key !== "Backspace") return
        event.preventDefault()
        focusSiblingTab(event.currentTarget)
        onRemove()
      }}
    >
      {children}
      {onRemove && <TabsRemove onRemove={onRemove} />}
    </TabsPrimitive.Tab>
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-description outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
