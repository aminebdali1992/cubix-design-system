"use client"

/*
  Cubix Checkbox - toggle control for checked, unchecked, and indeterminate.

  Composes with Label via id / htmlFor. Values and states use Cubix tokens.
  indeterminate maps to Radix checked="indeterminate" for API parity with Base UI.
  Set pending while an async save is in flight to replace the box with a spinner.
*/
import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { CheckIcon, Loader2Icon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type CubixCheckboxProps = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  "checked" | "defaultChecked" | "onCheckedChange"
> & {
  checked?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean
  pending?: boolean
  onCheckedChange?: (checked: boolean) => void
}

function Checkbox({
  className,
  checked,
  defaultChecked,
  indeterminate = false,
  pending = false,
  disabled,
  onCheckedChange,
  ...props
}: CubixCheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-pending={pending ? "" : undefined}
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      className={cn(
        "group/checkbox peer relative flex size-[18px] shrink-0 items-center justify-center rounded-[6px] border border-input transition-[background-color,border-color] outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-[state=checked]:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:data-[state=checked]:opacity-50 disabled:data-[state=indeterminate]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:data-[state=checked]:opacity-50 data-[disabled]:data-[state=indeterminate]:opacity-50 dark:bg-input/30 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:focus-visible:ring-primary/20 data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:focus-visible:ring-primary/20 group-has-[:focus-visible]/field-label:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary dark:data-[state=indeterminate]:bg-primary data-[pending]:cursor-wait data-[pending]:border-transparent data-[pending]:bg-transparent data-[pending]:text-muted-foreground data-[pending]:opacity-100 data-[pending]:data-[state=checked]:border-transparent data-[pending]:data-[state=checked]:bg-transparent data-[pending]:data-[state=checked]:text-muted-foreground data-[pending]:data-[state=indeterminate]:border-transparent data-[pending]:data-[state=indeterminate]:bg-transparent data-[pending]:data-[state=indeterminate]:text-muted-foreground dark:data-[pending]:bg-transparent",
        className
      )}
      {...props}
      checked={indeterminate ? "indeterminate" : checked}
      defaultChecked={defaultChecked}
      onCheckedChange={(value) => {
        onCheckedChange?.(value === true)
      }}
    >
      {pending ? (
        <span
          data-slot="checkbox-indicator"
          className="grid place-content-center text-current"
        >
          <Loader2Icon
            absoluteStrokeWidth
            size={18}
            strokeWidth={1.6}
            className="animate-spin"
            aria-hidden
          />
        </span>
      ) : (
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="grid place-content-center text-primary-foreground transition-none"
        >
          {indeterminate ? (
            <MinusIcon absoluteStrokeWidth size={12} strokeWidth={1.6} />
          ) : (
            <CheckIcon absoluteStrokeWidth size={12} strokeWidth={1.6} />
          )}
        </CheckboxPrimitive.Indicator>
      )}
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
