"use client"

/*
  Cubix Toggle - React Aria version.

  Same variants and classes as the Base UI and Radix toggles, built on React
  Aria ToggleButton. Cubix props (pressed, defaultPressed, onPressedChange,
  disabled) map onto isSelected / defaultSelected / onChange / isDisabled.
  React Aria marks the on state with data-selected, which drives the same
  pressed styles as aria-pressed.
*/
import type { ReactNode } from "react"
import { ToggleButton, type ToggleButtonProps } from "react-aria-components"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-description font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-selected:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-muted",
        segmented:
          "border border-transparent bg-transparent bg-clip-padding font-normal text-muted-foreground hover:bg-transparent hover:text-foreground aria-pressed:border-border aria-pressed:bg-card aria-pressed:font-medium aria-pressed:text-foreground data-selected:border-border data-selected:bg-card data-selected:font-medium data-selected:text-foreground",
      },
      size: {
        default:
          "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
        sm: "h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-2.5 text-caption has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ToggleProps = Omit<
  ToggleButtonProps,
  "className" | "children" | "isSelected" | "defaultSelected" | "onChange" | "isDisabled"
> &
  VariantProps<typeof toggleVariants> & {
    className?: string
    children?: ReactNode
    pressed?: boolean
    defaultPressed?: boolean
    onPressedChange?: (pressed: boolean) => void
    disabled?: boolean
  }

function Toggle({
  className,
  variant = "default",
  size = "default",
  pressed,
  defaultPressed,
  onPressedChange,
  disabled,
  ...props
}: ToggleProps) {
  return (
    <ToggleButton
      data-slot="toggle"
      isSelected={pressed}
      defaultSelected={defaultPressed}
      onChange={onPressedChange}
      isDisabled={disabled}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
