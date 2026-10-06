"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"
import { type VariantProps } from "class-variance-authority"

import { toggleVariants } from "@/components/cubix/radix/toggle"
import { cn } from "@/lib/utils"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }
>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
})

type ReadingDir = "ltr" | "rtl"

/*
  Radix ToggleGroup writes dir="ltr" when it gets no dir, which flips a
  Persian row and its arrow keys. The group starts right-to-left (Cubix is
  Persian-first) and then follows the closest dir attribute, or the computed
  direction when no attribute is set. An explicit dir prop wins.
*/
function useReadingDir(dir?: ReadingDir) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [pageDir, setPageDir] = React.useState<ReadingDir>("rtl")

  React.useLayoutEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return
    const attribute = parent.closest("[dir]")?.getAttribute("dir")
    const resolved =
      attribute === "ltr" || attribute === "rtl"
        ? attribute
        : getComputedStyle(parent).direction
    if (resolved === "ltr" || resolved === "rtl") setPageDir(resolved)
  }, [])

  return { ref, dir: dir ?? pageDir }
}

/*
  Same value API as the Base UI and React Aria groups: string arrays, with
  multiple switching from single to multiple selection. Radix single mode
  stores one string, where an empty string means nothing is selected.
*/
type ToggleGroupProps = Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive.Root>,
  "type" | "value" | "defaultValue" | "onValueChange" | "dir" | "ref"
> &
  VariantProps<typeof toggleVariants> & {
    value?: string[]
    defaultValue?: string[]
    onValueChange?: (value: string[]) => void
    multiple?: boolean
    spacing?: number
    orientation?: "horizontal" | "vertical"
    dir?: ReadingDir
  }

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  dir,
  style,
  children,
  ...props
}: ToggleGroupProps) {
  const { ref, dir: resolvedDir } = useReadingDir(dir)
  const shared = {
    ref,
    dir: resolvedDir,
    "data-slot": "toggle-group",
    "data-variant": variant,
    "data-size": size,
    "data-spacing": spacing,
    "data-orientation": orientation,
    orientation,
    style: { "--gap": spacing, ...style } as React.CSSProperties,
    className: cn(
      "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-vertical:flex-col data-vertical:items-stretch data-[variant=segmented]:gap-0 data-[variant=segmented]:bg-muted",
      className
    ),
    ...props,
  }
  const items = (
    <ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>
      {children}
    </ToggleGroupContext.Provider>
  )

  if (multiple) {
    return (
      <ToggleGroupPrimitive.Root
        type="multiple"
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        {...shared}
      >
        {items}
      </ToggleGroupPrimitive.Root>
    )
  }

  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={value === undefined ? undefined : (value[0] ?? "")}
      defaultValue={defaultValue?.[0]}
      onValueChange={(next) => onValueChange?.(next ? [next] : [])}
      {...shared}
    >
      {items}
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
