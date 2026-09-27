"use client"

/*
  Cubix Radio Group - single-select control set.

  RadioGroupItem is the control only. Compose with Label via id / htmlFor.
  Values and states use Cubix tokens.
*/
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("group/radio-group grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-[18px] shrink-0 items-center justify-center rounded-full border border-input transition-[background-color,border-color,box-shadow] outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background group-focus-within/radio-group:data-[composite-item-active]:ring-3 group-focus-within/radio-group:data-[composite-item-active]:ring-secondary group-focus-within/radio-group:data-[composite-item-active]:ring-offset-1 group-focus-within/radio-group:data-[composite-item-active]:ring-offset-background disabled:cursor-not-allowed disabled:data-checked:opacity-50 data-disabled:cursor-not-allowed data-disabled:data-checked:opacity-50 dark:bg-input/30 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-checked:focus-visible:ring-primary/20 group-focus-within/radio-group:data-checked:data-[composite-item-active]:ring-primary/20 group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="pointer-events-none absolute top-1/2 left-1/2 block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground"
      />
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
