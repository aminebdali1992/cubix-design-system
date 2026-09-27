"use client"

/*
  Cubix Radio Group - single-select control set.

  RadioGroupItem is the control only. Compose with Label via id / htmlFor.
  Values and states use Cubix tokens.
*/
import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("group/radio-group grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-[18px] shrink-0 items-center justify-center rounded-full border border-input transition-[background-color,border-color,box-shadow] outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-[state=checked]:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:data-[state=checked]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:data-[state=checked]:opacity-50 dark:bg-input/30 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:focus-visible:ring-primary/20 group-has-[:focus-visible]/field-label:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="pointer-events-none absolute top-1/2 left-1/2 block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground"
      />
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
