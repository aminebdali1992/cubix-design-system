"use client"

/*
  Cubix Checkbox - toggle control for checked, unchecked, and indeterminate.

  Composes with Label via id / htmlFor. Values and states use Cubix tokens.
  Cubix props (checked, indeterminate, disabled, pending) map onto React Aria Checkbox.
  Set pending while an async save is in flight to replace the box with a spinner.
*/
import * as React from "react"
import { Checkbox as AriaCheckbox } from "react-aria-components"
import { CheckIcon, Loader2Icon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type CubixCheckboxProps = Omit<
  React.ComponentProps<typeof AriaCheckbox>,
  | "className"
  | "isSelected"
  | "defaultSelected"
  | "isIndeterminate"
  | "isDisabled"
  | "isInvalid"
  | "onChange"
  | "children"
> & {
  className?: string
  checked?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  pending?: boolean
  invalid?: boolean
  "aria-invalid"?: boolean
  onCheckedChange?: (checked: boolean) => void
  children?: React.ReactNode
}

function Checkbox({
  className,
  checked,
  defaultChecked,
  indeterminate = false,
  disabled,
  pending = false,
  invalid,
  onCheckedChange,
  "aria-invalid": ariaInvalid,
  children,
  ...props
}: CubixCheckboxProps) {
  return (
    <AriaCheckbox
      data-slot="checkbox"
      data-pending={pending ? "" : undefined}
      isSelected={checked}
      defaultSelected={defaultChecked}
      isIndeterminate={indeterminate}
      isDisabled={disabled || pending}
      isInvalid={invalid ?? ariaInvalid === true}
      aria-busy={pending || undefined}
      onChange={onCheckedChange}
      className={cn(
        "group/checkbox peer relative flex size-[18px] shrink-0 items-center justify-center rounded-[6px] border border-input transition-[background-color,border-color] outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:data-[selected]:opacity-50 disabled:data-[indeterminate]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:data-[selected]:opacity-50 data-[disabled]:data-[indeterminate]:opacity-50 dark:bg-input/30 data-[selected]:border-primary data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:focus-visible:ring-primary/20 data-[indeterminate]:border-primary data-[indeterminate]:bg-primary data-[indeterminate]:text-primary-foreground data-[indeterminate]:focus-visible:ring-primary/20 dark:data-[selected]:bg-primary dark:data-[indeterminate]:bg-primary data-[pending]:cursor-wait data-[pending]:border-transparent data-[pending]:bg-transparent data-[pending]:text-muted-foreground data-[pending]:opacity-100 data-[pending]:data-[selected]:border-transparent data-[pending]:data-[selected]:bg-transparent data-[pending]:data-[selected]:text-muted-foreground data-[pending]:data-[indeterminate]:border-transparent data-[pending]:data-[indeterminate]:bg-transparent data-[pending]:data-[indeterminate]:text-muted-foreground dark:data-[pending]:bg-transparent",
        className
      )}
      {...props}
    >
      {({ isSelected, isIndeterminate }) => (
        <>
          <span
            data-slot="checkbox-indicator"
            className="grid place-content-center transition-none"
          >
            {pending ? (
              <Loader2Icon
                absoluteStrokeWidth
                size={18}
                strokeWidth={1.6}
                className="animate-spin text-muted-foreground"
                aria-hidden
              />
            ) : isIndeterminate ? (
              <MinusIcon
                absoluteStrokeWidth
                size={12}
                strokeWidth={1.6}
                className="text-primary-foreground"
              />
            ) : isSelected ? (
              <CheckIcon
                absoluteStrokeWidth
                size={12}
                strokeWidth={1.6}
                className="text-primary-foreground"
              />
            ) : null}
          </span>
          {children}
        </>
      )}
    </AriaCheckbox>
  )
}

export { Checkbox }
