"use client"

/*
  Cubix Chips - a row of selectable pills built on a toggle group.

  Single mode keeps one chip selected and lets the selected chip deselect
  itself; multiple mode keeps any number selected. Both modes take string
  arrays for value and defaultValue, matching Cubix Accordion. Arrow keys
  move focus between the enabled chips of the same group (wrapping at the
  ends), Home and End jump to the first and last one - Radix's toggle group
  native behavior.
*/
import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type ChipsProps = Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive.Root>,
  "type" | "value" | "defaultValue" | "onValueChange"
> & {
  multiple?: boolean
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

/*
  Radix ToggleGroup writes dir="ltr" when it gets no dir, which flips a
  Persian row. Cubix is Persian-first, so the row starts right-to-left and
  then follows the closest dir on the page. An explicit dir prop wins.
*/
function usePageDir(dir: ChipsProps["dir"]) {
  const nodeRef = React.useRef<HTMLDivElement | null>(null)
  const [pageDir, setPageDir] = React.useState<"ltr" | "rtl">("rtl")

  React.useLayoutEffect(() => {
    const closest = nodeRef.current?.parentElement
      ?.closest("[dir]")
      ?.getAttribute("dir")
    if (closest === "ltr" || closest === "rtl") {
      setPageDir(closest)
    }
  }, [])

  return { nodeRef, resolvedDir: dir ?? pageDir }
}

function Chips({
  className,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  dir,
  ref,
  ...props
}: ChipsProps) {
  const { nodeRef, resolvedDir } = usePageDir(dir)
  const setRef = (node: HTMLDivElement | null) => {
    nodeRef.current = node
    if (typeof ref === "function") {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }
  const rootClassName = cn(
    "flex w-full flex-wrap items-center gap-2",
    className
  )

  if (multiple) {
    return (
      <ToggleGroupPrimitive.Root
        data-slot="chips"
        dir={resolvedDir}
        ref={setRef}
        type="multiple"
        className={rootClassName}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        {...props}
      />
    )
  }

  /*
    Single mode stores one string. An empty string means nothing is
    selected, so a controlled empty array stays controlled.
  */
  return (
    <ToggleGroupPrimitive.Root
      data-slot="chips"
      dir={resolvedDir}
      ref={setRef}
      type="single"
      className={rootClassName}
      value={value === undefined ? undefined : (value[0] ?? "")}
      defaultValue={defaultValue?.[0]}
      onValueChange={(next) => {
        onValueChange?.(next ? [next] : [])
      }}
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
    chip: "data-[state=on]:border-transparent data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-[color-mix(in_oklch,var(--primary),black_10%)] data-[state=on]:group-hover/chip:bg-[color-mix(in_oklch,var(--primary),black_10%)]",
    remove: "peer-data-[state=on]/chip:text-primary-foreground",
  },
  secondary: {
    chip: "data-[state=on]:border-transparent data-[state=on]:bg-primary/10 data-[state=on]:text-primary dark:data-[state=on]:bg-primary/20 data-[state=on]:hover:bg-primary/20 data-[state=on]:group-hover/chip:bg-primary/20",
    remove: "peer-data-[state=on]/chip:text-primary",
  },
  gray: {
    chip: "data-[state=on]:border-transparent data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground data-[state=on]:hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] data-[state=on]:group-hover/chip:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
    remove: "peer-data-[state=on]/chip:text-secondary-foreground",
  },
  outline: {
    chip: "data-[state=on]:border-border data-[state=on]:bg-transparent data-[state=on]:text-foreground data-[state=on]:hover:bg-muted data-[state=on]:group-hover/chip:bg-muted dark:data-[state=on]:border-input dark:data-[state=on]:hover:bg-input/50 dark:data-[state=on]:group-hover/chip:bg-input/50",
    remove: "peer-data-[state=on]/chip:text-foreground",
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

type ChipProps = React.ComponentProps<typeof ToggleGroupPrimitive.Item> & {
  icon?: React.ReactNode
  avatar?: React.ReactNode
  variant?: ChipVariant
  size?: ChipSize
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function Chip({
  variant = "default",
  size = "sm",
  className,
  children,
  icon,
  avatar,
  onRemove,
  ...props
}: ChipProps) {
  const chip = (
    <ToggleGroupPrimitive.Item
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
    </ToggleGroupPrimitive.Item>
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
