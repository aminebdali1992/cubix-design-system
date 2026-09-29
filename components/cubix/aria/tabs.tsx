"use client"

/*
  Cubix Tabs - React Aria version.

  Same part names, props and classes as the Base UI and Radix tabs, built on
  React Aria Tabs, TabList, Tab and TabPanel. value / defaultValue /
  onValueChange map onto selectedKey / defaultSelectedKey / onSelectionChange,
  and each trigger and panel takes a value that becomes its id. Arrow keys
  follow the reading direction, so they are mirrored in RTL.
*/
import * as React from "react"
import {
  I18nProvider,
  Tab,
  TabList,
  TabPanel,
  Tabs as AriaTabs,
  type TabListProps,
  type TabPanelProps,
  type TabProps,
  type TabsProps,
} from "react-aria-components"
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
    const closest = ref.current?.parentElement
      ?.closest("[dir]")
      ?.getAttribute("dir")
    if (closest === "ltr" || closest === "rtl") {
      setPageDir(closest)
    }
  }, [])

  return { ref, dir: dir ?? pageDir }
}
type CubixTabsProps = Omit<
  TabsProps,
  | "className"
  | "selectedKey"
  | "defaultSelectedKey"
  | "onSelectionChange"
  | "children"
> & {
  className?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  dir?: "ltr" | "rtl"
  children?: React.ReactNode
}

function Tabs({
  className,
  orientation = "horizontal",
  value,
  defaultValue,
  onValueChange,
  dir,
  children,
  ...props
}: CubixTabsProps) {
  const { ref, dir: resolvedDir } = usePageDir(dir)

  return (
    <I18nProvider locale={resolvedDir === "rtl" ? "fa-IR" : "en-US"}>
      <AriaTabs
        ref={ref}
        dir={resolvedDir}
        data-slot="tabs"
        orientation={orientation}
        selectedKey={value}
        defaultSelectedKey={defaultValue}
        onSelectionChange={
          onValueChange ? (key) => onValueChange(String(key)) : undefined
        }
        className={cn(
          "group/tabs flex gap-2 data-horizontal:flex-col",
          className
        )}
        {...props}
      >
        {children}
      </AriaTabs>
    </I18nProvider>
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
  ...props
}: Omit<TabListProps<object>, "className"> &
  VariantProps<typeof tabsListVariants> & { className?: string }) {
  return (
    <TabList
      data-slot="tabs-list"
      data-variant={variant}
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
  A tab is already a button, so the remove control is a span with
  role="button" and no tab stop (nested buttons are invalid HTML). Keyboard
  users remove the focused tab with Delete or Backspace.
*/
function TabsRemove({ onRemove }: { onRemove: () => void }) {
  return (
    <span
      role="button"
      aria-label="Remove"
      data-slot="tabs-remove"
      onPointerDown={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation()
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
  value,
  disabled,
  children,
  onRemove,
  ...props
}: Omit<TabProps, "className" | "id" | "isDisabled" | "children"> & {
  className?: string
  value: string
  disabled?: boolean
  children?: React.ReactNode
  onRemove?: () => void
}) {
  const tabRef = React.useRef<HTMLDivElement>(null)
  const removeRef = React.useRef(onRemove)
  removeRef.current = onRemove
  React.useEffect(() => {
    const el = tabRef.current
    if (!el) return
    const handle = (event: KeyboardEvent) => {
      if (removeRef.current && (event.key === "Delete" || event.key === "Backspace")) {
        event.preventDefault()
        removeRef.current()
      }
    }
    el.addEventListener("keydown", handle)
    return () => el.removeEventListener("keydown", handle)
  }, [])
  return (
    <Tab
      id={value}
      isDisabled={disabled}
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-label font-normal whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:opacity-50 has-data-[icon=inline-end]:pe-1 has-data-[icon=inline-start]:ps-1 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-selected:shadow-sm group-data-[variant=line]/tabs-list:data-selected:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[22px]",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-selected:bg-transparent dark:group-data-[variant=line]/tabs-list:data-selected:border-transparent dark:group-data-[variant=line]/tabs-list:data-selected:bg-transparent",
        "data-selected:bg-background data-selected:text-primary dark:data-selected:border-input dark:data-selected:bg-input/30 dark:data-selected:text-primary",
        "after:absolute after:bg-primary after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-start-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-selected:after:opacity-100",
        className
      )}
      {...props}
      ref={tabRef}

    >
      {children}
      {onRemove && <TabsRemove onRemove={onRemove} />}
    </Tab>
  )
}

function TabsContent({
  className,
  value,
  ...props
}: Omit<TabPanelProps, "className" | "id"> & {
  className?: string
  value: string
}) {
  return (
    <TabPanel
      id={value}
      data-slot="tabs-content"
      className={cn("flex-1 text-description outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }