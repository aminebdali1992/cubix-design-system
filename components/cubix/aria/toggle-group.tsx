"use client"

/*
  Cubix Toggle Group - React Aria version.

  Same parts, variants and classes as the Base UI and Radix groups, built on
  React Aria ToggleButtonGroup and ToggleButton. value / defaultValue /
  onValueChange use string arrays like Base UI, and multiple switches the
  group from single to multiple selection. Each item's value becomes its key.
  Arrow keys follow the reading direction of the page, so they are mirrored
  in RTL.
*/
import * as React from "react"
import {
  I18nProvider,
  ToggleButton,
  ToggleButtonGroup,
  type Key,
  type ToggleButtonGroupProps,
  type ToggleButtonProps,
} from "react-aria-components"
import { type VariantProps } from "class-variance-authority"

import { toggleVariants } from "@/components/cubix/aria/toggle"
import { cn } from "@/lib/utils"

type ReadingDir = "ltr" | "rtl"

/*
  React Aria reads arrow key direction from its locale, not from CSS. The
  group starts right-to-left (Cubix is Persian-first) and then follows the
  closest dir attribute, or the computed direction when no attribute is set.
  An explicit dir prop wins.
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

type ToggleGroupProps = Omit<
  ToggleButtonGroupProps,
  | "className"
  | "style"
  | "children"
  | "selectionMode"
  | "selectedKeys"
  | "defaultSelectedKeys"
  | "onSelectionChange"
  | "isDisabled"
  | "orientation"
> &
  VariantProps<typeof toggleVariants> & {
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
    value?: string[]
    defaultValue?: string[]
    onValueChange?: (value: string[]) => void
    multiple?: boolean
    disabled?: boolean
    spacing?: number
    orientation?: "horizontal" | "vertical"
    dir?: ReadingDir
  }

function toValues(keys: Set<Key>) {
  return Array.from(keys, String)
}

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  disabled,
  dir,
  children,
  style,
  ...props
}: ToggleGroupProps) {
  const { ref, dir: resolvedDir } = useReadingDir(dir)

  return (
    <I18nProvider locale={resolvedDir === "rtl" ? "fa-IR" : "en-US"}>
      <ToggleButtonGroup
        ref={ref}
        data-slot="toggle-group"
        data-variant={variant}
        data-size={size}
        data-spacing={spacing}
        orientation={orientation}
        selectionMode={multiple ? "multiple" : "single"}
        selectedKeys={value}
        defaultSelectedKeys={defaultValue}
        onSelectionChange={
          onValueChange ? (keys) => onValueChange(toValues(keys)) : undefined
        }
        isDisabled={disabled}
        style={{ "--gap": spacing, ...style } as React.CSSProperties}
        className={cn(
          "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-vertical:flex-col data-vertical:items-stretch data-[variant=segmented]:gap-0 data-[variant=segmented]:bg-muted",
          className
        )}
        {...props}
      >
        <ToggleGroupContext.Provider
          value={{ variant, size, spacing, orientation }}
        >
          {children}
        </ToggleGroupContext.Provider>
      </ToggleButtonGroup>
    </I18nProvider>
  )
}

type ToggleGroupItemProps = Omit<
  ToggleButtonProps,
  "className" | "children" | "id" | "isDisabled"
> &
  VariantProps<typeof toggleVariants> & {
    className?: string
    children?: React.ReactNode
    value: string
    disabled?: boolean
  }

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  value,
  disabled,
  ...props
}: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleButton
      id={value}
      isDisabled={disabled}
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
    </ToggleButton>
  )
}

export { ToggleGroup, ToggleGroupItem }
