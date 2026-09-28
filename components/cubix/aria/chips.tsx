"use client"

/*
  Cubix Chips - React Aria version.

  Same part names, props and classes as the Base UI and Radix chips, built
  on React Aria's ToggleButtonGroup + ToggleButton. Single mode keeps one
  chip selected and lets the selected chip deselect itself; multiple mode
  keeps any number selected. Both modes take string arrays for value and
  defaultValue, matching Cubix Accordion.
*/
import * as React from "react"
import {
  ToggleButton,
  ToggleButtonGroup,
  type Selection,
  type ToggleButtonGroupProps,
  type ToggleButtonProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

type ChipsProps = Omit<
  ToggleButtonGroupProps,
  "selectionMode" | "selectedKeys" | "defaultSelectedKeys" | "onSelectionChange"
> & {
  multiple?: boolean
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

function toKeySet(value?: string[]) {
  return value === undefined ? undefined : new Set(value)
}

function Chips({
  className,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  ...props
}: ChipsProps) {
  return (
    <ToggleButtonGroup
      data-slot="chips"
      selectionMode={multiple ? "multiple" : "single"}
      selectedKeys={toKeySet(value)}
      defaultSelectedKeys={toKeySet(defaultValue)}
      onSelectionChange={
        onValueChange
          ? (keys: Selection) => {
              onValueChange(
                keys === "all" ? [] : Array.from(keys, (key) => String(key))
              )
            }
          : undefined
      }
      className={cn("flex w-full flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}

/*
  Same filled circle-X as Cubix Text Field's clear button.
*/
function ChipRemoveIcon({ className }: { className?: string }) {
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
  The variant sets how a selected chip looks, using the same colors as the
  matching Cubix Button variant. Unselected chips always stay outlined.
*/
const chipVariants = {
  default: {
    chip: "data-selected:border-transparent data-selected:bg-primary data-selected:text-primary-foreground data-selected:hover:bg-[color-mix(in_oklch,var(--primary),black_10%)] data-selected:group-hover/chip:bg-[color-mix(in_oklch,var(--primary),black_10%)]",
    remove: "peer-data-selected/chip:text-primary-foreground",
  },
  secondary: {
    chip: "data-selected:border-transparent data-selected:bg-primary/10 data-selected:text-primary dark:data-selected:bg-primary/20 data-selected:hover:bg-primary/20 data-selected:group-hover/chip:bg-primary/20",
    remove: "peer-data-selected/chip:text-primary",
  },
  gray: {
    chip: "data-selected:border-transparent data-selected:bg-secondary data-selected:text-secondary-foreground data-selected:hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] data-selected:group-hover/chip:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
    remove: "peer-data-selected/chip:text-secondary-foreground",
  },
  outline: {
    chip: "data-selected:border-border data-selected:bg-transparent data-selected:text-foreground data-selected:hover:bg-muted data-selected:group-hover/chip:bg-muted dark:data-selected:border-input dark:data-selected:hover:bg-input/50 dark:data-selected:group-hover/chip:bg-input/50",
    remove: "peer-data-selected/chip:text-foreground",
  },
} as const

type ChipVariant = keyof typeof chipVariants

/*
  Sizes follow Cubix Button heights. The remove button keeps the same gap
  to the chip's top, bottom and end edges: (height - icon size) / 2.
*/
const chipSizes = {
  xs: {
    chip: "h-7 gap-1 px-2.5 text-caption [&_svg:not([class*='size-'])]:size-3.5",
    removable: "pe-6.5",
    remove: "end-1 [&_svg]:size-3.5",
    avatar: "size-5",
  },
  sm: {
    chip: "h-8 gap-1.5 px-3 text-label [&_svg:not([class*='size-'])]:size-4",
    removable: "pe-7.5",
    remove: "end-1.5 [&_svg]:size-4",
    avatar: "size-6",
  },
  default: {
    chip: "h-10 gap-2 px-4 text-label [&_svg:not([class*='size-'])]:size-5",
    removable: "pe-9",
    remove: "end-2.5 [&_svg]:size-4",
    avatar: "size-8",
  },
  lg: {
    chip: "h-12 gap-2.5 px-6 text-description [&_svg:not([class*='size-'])]:size-6",
    removable: "pe-10.5",
    remove: "end-3.5 [&_svg]:size-4",
    avatar: "size-10",
  },
} as const

type ChipSize = keyof typeof chipSizes

type ChipProps = Omit<ToggleButtonProps, "id" | "children"> & {
  value: string
  icon?: React.ReactNode
  avatar?: React.ReactNode
  variant?: ChipVariant
  size?: ChipSize
  children?: React.ReactNode
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function Chip({
  variant = "default",
  size = "sm",
  className,
  children,
  value,
  icon,
  avatar,
  onRemove,
  ...props
}: ChipProps) {
  const chip = (
    <ToggleButton
      id={value}
      data-slot="chip"
      className={cn(
        "peer/chip inline-flex shrink-0 items-center rounded-full has-data-[slot=chip-avatar]:ps-[3px] border border-border bg-background font-normal whitespace-nowrap text-foreground outline-none transition-colors hover:bg-muted group-hover/chip:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        chipSizes[size].chip,
        chipVariants[variant].chip,
        onRemove && chipSizes[size].removable,
        className
      )}
      {...props}
    >
      {avatar ? (
        <span
          data-slot="chip-avatar"
          aria-hidden="true"
          className={cn(
            "inline-flex shrink-0 [&>[data-slot=avatar]]:size-full",
            chipSizes[size].avatar
          )}
        >
          {avatar}
        </span>
      ) : icon ? (
        <span
          data-slot="chip-icon"
          aria-hidden="true"
          className="inline-flex shrink-0 items-center"
        >
          {icon}
        </span>
      ) : null}
      {children}
    </ToggleButton>
  )

  if (!onRemove) {
    return chip
  }

  /*
    The remove button sits beside the chip instead of inside it, because
    HTML does not allow a button inside another button. It is positioned
    over the chip's end padding so it looks the same.
  */
  return (
    <span
      data-slot="chip-root"
      className="group/chip relative inline-flex shrink-0"
    >
      {chip}
      <button
        type="button"
        data-slot="chip-remove"
        aria-label="Remove"
        tabIndex={-1}
        onClick={(event) => {
          event.stopPropagation()
          onRemove(event)
        }}
        className={cn(
          "absolute top-1/2 inline-flex size-5 -translate-y-1/2 cursor-default items-center justify-center rounded-full text-foreground opacity-70 outline-none transition-opacity duration-200 ease-out hover:opacity-100 focus-visible:opacity-100 peer-disabled/chip:pointer-events-none peer-disabled/chip:opacity-35 peer-data-disabled/chip:pointer-events-none peer-data-disabled/chip:opacity-35 [&_svg]:pointer-events-none",
          chipSizes[size].remove,
          chipVariants[variant].remove
        )}
      >
        <ChipRemoveIcon />
      </button>
    </span>
  )
}

export {
  Chips,
  Chip,
  type ChipsProps,
  type ChipProps,
  type ChipVariant,
  type ChipSize,
}
